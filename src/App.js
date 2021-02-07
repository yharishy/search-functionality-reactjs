import MD5 from "crypto-js/md5";
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Searchbox from "./components/Searchbox";
import Searchresult from "./components/Searchresult";

const categoryDetail = [ 
  {type: "characters", field: 'nameStartsWith'},
  {type: "series", field: 'titleStartsWith'},
  {type: "comics", field: 'titleStartsWith'}
];

function App() {
  const [recentSearches, setRecentSearches] = useState([]);
  const [status, setStatus] = useState({isProcessing: false, data: {}});
  const onSearchCb = (keyword, category) => {
    if(status.data && status.data.ctimestamp) {
      recentSearches.unshift({...status.data});
      if(recentSearches.length>5) {
        recentSearches.pop();
      }
      setRecentSearches(recentSearches);
    }
    setStatus({ isProcessing: true, data: {keyword, category} });
  }

  useEffect(async () => { 
    if (status.isProcessing==true) {
      const privateKey = process.env.REACT_APP_MARVEL_PRIVATE_KEY;
      const publicKey = process.env.REACT_APP_MARVEL_PUBLIC_KEY;
      const ctimestamp = Date.now();
      const md5Hash = MD5(ctimestamp+privateKey+publicKey);
      const apiEndpoint = `http://gateway.marvel.com/v1/public/${status.data.category.type}?ts=${ctimestamp}&apikey=${publicKey}&hash=${md5Hash}`;  
      axios.get(`${apiEndpoint}&${status.data.category.field}=${status.data.keyword}`).then(response => {                
        try {
          setStatus({isProcessing: false, data: {...status.data, data: response.data.data, ctimestamp }});
        }
        catch(err) {
          setStatus({isProcessing: false, data: { error: 'Something went wrong. please try again' }});
        }        
      }).catch(error => {
        setStatus({isProcessing: false, data: { error: 'Something went wrong. please try again' }});
      });
    }
  }, [status]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Search Functionality in ReactJs</h1>
      </header>
      <main id="main">
        <div className='wrapper'>
            <h2>Search Box</h2>
            <Searchbox defaultKeyword={''} defaultCategory={categoryDetail[0]} categoryDetail={categoryDetail} onSearchCb={onSearchCb} isProcessing={status.isProcessing} />
            {(recentSearches.length>0) && [
              <h4 key='title'>Recent Searches</h4>,
              recentSearches.map(item => <div className='recentsearch' key={item.ctimestamp}><a><span className='keyword'>{item.keyword}</span> in <span>{item.category.type}</span></a> </div>)
            ]}
            {status && status.data && status.data.error && (              
              <div className="error">{status.data.error}</div>
            )}
        </div>
      </main> 
      <section>
        <div className='wrapper searchresult'> 
          <h3>Search Results</h3>
          {status && status.isProcessing==true ? <div>Data loading...</div> : (status && status.data && status.data.data && status.data.data.count > 0 ? <Searchresult response={status.data} /> : <div>No content</div>)}
        </div>
      </section>  
      <a className="skip-link" href="#main">Skip to main</a>
    </div>
  );
}

export default App;
