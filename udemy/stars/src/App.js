import React, { useEffect, useState } from "react";
import "./App.css";

const getGithubRepos = () => {
  return fetch(
    "https://api.github.com/search/repositories?q=stars:>25000+language:javascript&sort=stars&order=desc"
  ).then(response => response.json());
};



function App() {
  const [repo, setRepo] = useState([]);

  useEffect(() => {
    getGithubRepos()
      .then(results => 
        results.items.map(({ full_name, stargazers_count, html_url, id }) => {
          return { full_name, stargazers_count, html_url, id };
        })
      )
      .then(repo => setRepo(repo));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Home</h1>
      </header>
      <div className="container">
        <div style={{width:'100%', textAlign:'center'}}> Github repos with over 25000 stars</div>
        {repo.map(x => {
          
          return (
            <div className="box" key={x.id}>
              
              <div>Full Name: <a href={x.html_url} rel="noopener noreferrer" target="_blank">{x.full_name}</a></div>

              <div>count: {x.stargazers_count}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
