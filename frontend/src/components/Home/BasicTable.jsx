import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

 

 

export default function BasicTable({myUrls, arr}) {


 


  const goToUrl = async (shortCode) => {
    try {
      const { data } = await axios.get(`/api/v1/short/${shortCode}`);
      window.open(data.originalUrl, '_blank');
      myUrls();
    } catch (error) {
      console.log(error);
    }
  }

const deleteUrl = async(id)=>{
    try {
      await axios.delete(`/api/v1/delete/${id}`);
      myUrls();
    } catch (error) {
      console.log(error);
    }
  }







  return (
    <TableContainer sx={{ marginTop: '2.5rem' }} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
      <TableRow>
        <TableCell sx={{ fontSize: '16px' }}>LongUrl</TableCell>
        <TableCell align="right" sx={{ fontSize: '16px' }}>ShortUrl</TableCell>
        <TableCell align="right" sx={{ fontSize: '16px' }}>Click</TableCell>
        <TableCell align="right" sx={{ fontSize: '16px' }}>Delete</TableCell>
      </TableRow>
    </TableHead>
        <TableBody>
          {arr.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.originalUrl}
              </TableCell>
              <TableCell align="right" sx={{ cursor: 'pointer' }} onClick={()=>goToUrl(row.shortUrl)}>{row.shortUrl}</TableCell>
              <TableCell align="right" >{row.click}</TableCell>
              <TableCell align="right"> <DeleteIcon sx={{color:"crimson", cursor:"pointer"}} onClick={()=>deleteUrl(row._id)}/> </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
