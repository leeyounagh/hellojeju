import React,{useState} from 'react';
import './Search.scss';

const Search = (props) => {
  const [searchTerm,setSearchTerm]= useState('');

        const onChangeSearch = (e) =>{
               e.preventDefault();
               setSearchTerm(e.target.value);
               props.SearchHandler(searchTerm)
               console.log('검색확인')
        }
    return ( 
        <div >
          
       <span >
          <span  >
          <input style={{position:"relative",
          left:"1150px",top:"210px",
          height:"30px"}} type="text" placeholder='검색..'  onChange={(e)=>{
            onChangeSearch(e)
            
          }}></input></span>
        </span>
        <div className='search-border'>
           
        </div>
      </div>
    );
};

export default Search;