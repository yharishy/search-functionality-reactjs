import React, { useState } from 'react';
function Searchresult({ response }) {
  const { data, keyword, category } = response;
    return (
      <React.Fragment>
        <div className="searchTitle">
          <span>Searched Keyword</span>: {keyword} <br />
          <span>Searched By</span>: {category.type} <br />
        </div>
        <br />
        <table width="100%">
          <thead>
          <tr className="tblTitle" key={'mainheader'}>
            <th key="mh-th1" width="10%">ID</th>
            <th key="mh-th2" width="20%">Title / Name</th>
            <th key="mh-th3" width="50%">Description</th>
            <th key="mh-th4" width="10%">Image</th>
          </tr>
          </thead>
          <tbody>
          {data.results.map(item => (
            <tr className='row' key={item.id}>
              <td key={`${item.id}-td1`}>{item.id}</td>
              <td key={`${item.id}-td2`}>{item.name ? item.name : item.title}</td>
              <td key={`${item.id}-td3`}>{item.description}</td>
              <td key={`${item.id}-td4`}>{item.thumbnail.path && item.thumbnail.extension && (<img width="50px"  height="50px" src={`${item.thumbnail.path}.${item.thumbnail.extension}`} />)}</td>
            </tr>
          ))}
          </tbody>        
        </table>
      </React.Fragment>
    );
  }

export default Searchresult;