import React, { useEffect, useState } from 'react';
import axios from 'axios';

import LandingMain from './LandingMain/LandingMain';
import { useNavigate } from 'react-router-dom';
import LandingMiddle from './LandingMain/LandingMiddle';
import LandingBottom from './LandingMain/LandingBottom';
import LandingFooter from'./LandingMain/LandingFooter';

const LandingPage = (props) => {
  let [userName,setuserName] = useState('')


  // if(props.user.userData){
  //   // setuserName(props.user.userData.name)
  
  //  console.log(props.user.userData.name,userName)
  //  setuserName(props.user.userData.name)
  // }


    useEffect(()=>{
      axios.get('/api/hello')
      .then(response=>console.log(response.data))
    },[])

  const LandingFooterHandler = () =>{
    if(props.user.userData){
      return (
        <div style={{background: '#89a6ae'}}>
   <LandingFooter userdata={props.user.userData} ></LandingFooter>
        </div>
      )
    }
 
  }

    return (
        <div style={{overflowX:"none",background:'#e8f8ff'
          
        }}>
          
<LandingMain></LandingMain>
          
{/* <LandingMiddle></LandingMiddle> */}
      <LandingBottom></LandingBottom>
     {LandingFooterHandler()}

        </div>
    );
};

export default LandingPage;