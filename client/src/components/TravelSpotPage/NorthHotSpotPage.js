import axios from 'axios';
import { Card,Row,Col } from 'antd';
import React, { useCallback, useEffect, useMemo, useRef, useState,
    createContext} from 'react';
import './NorthHotSpot.scss';
import RadioBox from './Section/RadioBox'
import {jejuSection} from './Section/data'
import Search from  './Section/Search'
import { FaParachuteBox,FaArrowAltCircleUp } from 'react-icons/fa';



const mainUrl = `http://api.visitjeju.net/vsjApi/contents/searchList?apiKey=sbrr93ynwcggx6br&locale=kr`

const { Meta } = Card;

const NorthHotSpotPage = () => {
    const [loading,setLoading] =useState(false)
    const [data,setData] =useState([]);
    const [test,setTest] =useState([]);
    const [page,setPage] = useState(1);
    const [searchTerm,setSearchTerm]= useState('');
     const [contents,setContents] = useState('c5');
     const [fetching, setFetching] = useState(false);
     let items = []
     const [newImages,setNewImages]= useState(false);
    let PageArray = [1,2,3,4,5,6,7,8,9,10,11];
    const mounted =useRef(false);
     const [navbarposition,setnavbarposition] = useState(0);
     const [searchbool,setSearchbool] =useState(false)
   
    useEffect(()=>{
        axiosData()
    },[contents]);
    useEffect(()=>{
        axiosData()
    },[page]);

  
    
  

    const axiosData = async() =>{
        // setFetching(true);
        setLoading(true);
      
        let urlPage = `&page=${page}`;
        let contentsPage =`&category=${contents}`
        try{
            await axios.get(`${mainUrl}${urlPage}${contentsPage}`)
            .then((response)=>{
             
                filtertest(response.data.items)});
                setLoading(false);
                setFetching(false);
            //  window.scrollTo(0, 0);
           
        }
       catch (error) {
            console.error(error);
            
          }
       
    }
   

    // axios.get('http://api.visitjeju.net/vsjApi/contents/searchList?apiKey=sbrr93ynwcggx6br&locale=kr&page=12&category=c4')
    // .then((response)=>console.log('데이터',response.data))
//    useEffect(()=>{
//     handleFilters();
//     // searchFilters();
    
//    },[]);



    function filtertest(arr){
        let i = 0;
        let newdata = [];
        let copy = [];
        newdata =Array.from(arr);
        
       console.log(page,newdata);
    

        while(i<newdata.length){
            // console.log("들어가니",newdata[i].address)
            if(newdata[i].region1cd.label ==="제주시"){
               
                
                copy.unshift(newdata[i]);
            
              
            }
          
            i++;
           
          
           
        }
     
    
      return setTest((oldphotos)=>{
     
            return [...copy,...oldphotos]
           

           
        

      });
    }


  console.log("page",page)
    useEffect(()=>{
    window.addEventListener('scroll',event);
    setnavbarposition(window.scrollTop)
    return () => window.removeEventListener('scroll',event)
    },[loading])
 
    const event = () => {
      
       
        if(!loading&&window.innerHeight +window.scrollY >= document.documentElement.scrollHeight-500
           ){
            setLoading(true);
            
                setPage((oldPage)=> {return oldPage+1 
                } );
       
          
        }
           

       
    }
        const showFilterResults =(filters)=>{
           // filter =>1이면 관광지만
           //filter =>2면 맛집만 
           setContents('')
         
           console.log('안녕',filters[0],contents)
           if(Number(filters[0]) === 1){
            setContents('')
            let copy = [];
           

            setContents('c1') 
            setTest([...copy]);
            setPage(1)
            
            console.log('안녕',contents)
           }else if(Number(filters[0]) === 2){
            setContents('')
            let copy = [];
            setContents('c2') 
            setTest([...copy]);
            setPage(1)
            console.log('안녕',contents)
           }else if(Number(filters[0]) === 3){
            let copy = [];
            setContents('')
            setTest([...copy]);
            setContents('c3') ;
            setPage(1)
          
            console.log('안녕',contents)
           }else if(Number(filters[0])  === 4){                     
            let copy = [];
            setContents('')
            setTest([...copy]);
            setContents('c4');
            setPage(1)
          
            console.log('안녕',contents)
           }
      


        }

   const handleFilters = (filters) =>{

        
       showFilterResults({...filters})
   }
//   useEffect(()=>{
//     SearchHandler()
//   },[])

    
  const SearchHandler = (Filter) =>{
     


       setSearchTerm(Filter)

       console.log('나야확인',searchTerm,Filter)
       if(Filter===""){
        setSearchTerm("")
       }
    
      // 필터 글씨 받은걸 데이터에서 검색해야됨 && 라디오박스의 결과값과 함께

      // 라디오 박스에서 선택한 결과값에서 찾아야되 (test 에서 찾으면됨)


  
  }
  console.log(searchTerm)
   const scrollTop = () =>{
       return  window.scrollTo(0, 0);
   }

   const onChangeSearch = (e) =>{
    e.preventDefault();
    setSearchTerm(e.target.value);
    // SearchHandler(searchTerm)
    console.log('검색확인')
}
    //제주시
    return (
      
    <div >
        <div className='travel_font'
        style={{position:'relative',top:'150px',left:'50%'}}>
            <h1 className='nav_text' >제주시</h1>
        </div>
    
        <div >
            <RadioBox data={jejuSection} handleFilters={filters=>handleFilters(filters)}></RadioBox>
          </div>
          <div  >
          <span >
          <span  >
          <input className='card_name' style={{position:"relative",
          left:"1150px",top:"220px",width:"150px",
          height:"25px",borderRadius:"25px",paddingLeft:"5px",
        paddingTop:"3px",fontSize:"15px"}} type="text" placeholder='🍳'  onChange={(e)=>{
            onChangeSearch(e)
            
          }}></input></span>
        </span>
          {/* <Search SearchHandler={(filter)=>SearchHandler(filter)}></Search> */}
          </div>

    
         <div style={{position:'absolute', top:'400px',left:'200px',
          }}>

          
              <Row >
         
          {
             
             test.filter((val)=>{
                if(searchTerm==""){
                    return val
                }else if(val.title.toLowerCase().includes(searchTerm.toLowerCase())){
                         return val
                }
            }).map((item,i)=>{
                     return(
                          <div key ={i} style={{ marginRight:'50px',
                          marginBottom:"50px"}}>
                              
        <Col lg={12} sm={24} key={item.contentsid}>
            <Card
            className='card_name'
             hoverable
             style={{ width: 240, height:250 }}
             cover={<a href={`/detail/${item.contentsid}`}><img  
                 width='240px' 
                 height='150px'alt="example" src={item.repPhoto.photoid.thumbnailpath} 
             /></a> } 
         >
             <Meta title={item.title} description={item.repPhoto.descseo} />
         </Card>
         </Col> 
                         </div>
                     )
               })

               
            } 

             
      
          
   
             </Row>
       
           
     </div>
     <div className='heart_all' style={{position:'fixed',top:"1600px",marginTop:"100px",left:'1050px',top:{navbarposition}
  , width:"100px",height:"500px",cursor:'pointer' }}> 
            <div style={{position:"absolute",top:"400px",left:"360px",zIndex:"300"}}>
            <FaArrowAltCircleUp style={{width:"40px",height:"40px"}}onClick={scrollTop}></FaArrowAltCircleUp>
            </div>

            <div class="heart-box">
            <div style={{ height:"500px"}} class="heart">
            <svg width="80" height="80" viewBox="0 0 800 700" xmlns="http://www.w3.org/2000/svg">
                <path d="m263.42 235.15c-66.24 0-120 53.76-120 120 0 134.76 135.93 170.09 228.56 303.31 87.574-132.4 228.56-172.86 228.56-303.31 0-66.24-53.76-120-120-120-48.048 0-89.402 28.37-108.56 69.188-19.161-40.817-60.514-69.188-108.56-69.188z" />
            </svg>
            </div>
            <div class="heart">
            <svg width="70" height="70" viewBox="0 0 800 700" xmlns="http://www.w3.org/2000/svg">
                <path d="m263.42 235.15c-66.24 0-120 53.76-120 120 0 134.76 135.93 170.09 228.56 303.31 87.574-132.4 228.56-172.86 228.56-303.31 0-66.24-53.76-120-120-120-48.048 0-89.402 28.37-108.56 69.188-19.161-40.817-60.514-69.188-108.56-69.188z" />
            </svg>
            </div>
            <div class="heart">
            <svg width="68" height="68" viewBox="0 0 800 700" xmlns="http://www.w3.org/2000/svg">
                <path d="m263.42 235.15c-66.24 0-120 53.76-120 120 0 134.76 135.93 170.09 228.56 303.31 87.574-132.4 228.56-172.86 228.56-303.31 0-66.24-53.76-120-120-120-48.048 0-89.402 28.37-108.56 69.188-19.161-40.817-60.514-69.188-108.56-69.188z" />
            </svg>
            </div>

            </div>



     </div>
        </div>
      

      
    );
};

export default React.memo(NorthHotSpotPage);