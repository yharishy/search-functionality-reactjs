import React, { useState } from 'react';
function Searchbox({ defaultKeyword, defaultCategory, categoryDetail, onSearchCb, isProcessing }) {
    const [error, setError] = useState(null);
    const [keyword, setKeyword] = useState(defaultKeyword);
    const [category, setCategory] = useState(defaultCategory);

    
    const submitSearchForm = () => {
      if(keyword=='') {
        setError('Please enter search keyword');
      } else {
        onSearchCb(keyword, category);
      }
    }
    return (
      <React.Fragment>
        <div className='row'>
          Search: <input type="text" value={keyword} onChange={e => setKeyword(e.target.value)} />
          {error && (<span className='error'> {error}</span>)}
        </div>        
        <div className='row'>
          <ul>
          {categoryDetail.map(item => (
            <li key={item.type}><input type="radio" id={item.type} value={item.type} checked={category.type==item.type} onChange={() => setCategory(item)} /><label>{item.type}</label></li>
          ))};  
          </ul>
        </div>
        <div className='row'>
          {(isProcessing==true) ?
            <span className="loading">Loading data...</span>  
            :
            <button onClick={() => submitSearchForm()}>Submit</button>
          }
        </div>
      </React.Fragment>
    );
  }

export default Searchbox;