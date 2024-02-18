import { Button, Grid, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import BasicTable from './BasicTable'
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import WavingHandIcon from '@mui/icons-material/WavingHand';
import { logoutUser } from '../../Actions/User';
 
const Home = () => {
  const dispatch = useDispatch();
  const[originalUrl, setOrginalUrl] = useState("");
 
  const {user} = useSelector(state => state.user);


  useEffect(()=>{
    myUrls();  
   },[])
  

   const[arr, setArr] = useState([]);
   
   const myUrls = async()=>{
    try {
      const {data} = await axios.get("/api/v1/my/urls");
      console.log(data.allURL);
      setArr(data.allURL);
     } catch (error) {
      console.log(error);    
     }
  }

  


  const createUser = async()=>{
   try {
     const {data} = await axios.post(`/api/v1/short`,{originalUrl});
      console.log(data);
      setOrginalUrl("");

     myUrls();
   } catch (error) {
    const err = await error.response.data.message;
    alert(err);
   }
  }

  const logoutHandler = ()=>{
    dispatch(logoutUser());
   alert("Logged out successfully");
     } 



     
  return (
    <Box m={'1.7rem'}>

<Typography variant='h5' color={'green'} textAlign={'center'} marginRight={'3.2rem'}>Anchors URL Shortner   
<Button   sx={{ position: 'absolute', top: 7, right: 6 , color:"purple"}} onClick={logoutHandler}>Logout</Button></Typography>

< WavingHandIcon  style={{color:"green", marginTop:'1.7rem'}}bgc='green'/>
<Typography style={{ display: 'inline' }} variant='h6' color='purple' fontWeight='bold'>
  {user.name}
</Typography>


    
    <Grid container   mt={2}  spacing={2}> 
  <Grid item xs={10}>
    
  <TextField id="outlined-basic" label="Enter Long Url here..." fullWidth  variant="outlined" value={originalUrl} onChange={(e)=>setOrginalUrl(e.target.value)}/> 
  </Grid>
  <Grid item xs={2}>
  <Button variant="text" fullWidth    style={{ color: 'green', fontWeight:"bolder", height:"100%", marginRight:"1.2rem"  }} onClick={createUser}>Generate</Button>
  </Grid>
  
</Grid>

<BasicTable myUrls={myUrls}  arr={arr}/>

</Box>
       
    
  )
}

export default Home