import React, {useState,useEffect,memo} from 'react';
import { Link } from 'react-router-dom';
import axios  from 'axios';

function Home() {
  const [datas, setdatas] = useState([]);
useEffect(() => {
  axios.get('http://localhost:3500/orders').then(response => { 
    setdatas([...response.data]);
  }).catch(error => {
   console.log(error);
  });
}, [])

  var total = 0;
  return (
    <>
        <section>
        <div className='order_list flex'>
          <h2>Qeyde Alinan Sifarisler</h2>
            <table border="1" >
               <thead>
                  <tr>
                    <th>Sira sayi</th>
                    <th>Sifaris masasi</th>
                    <th>Masa xidmetcisi</th>
                    <th>Status</th>
                    <th>Mebleg</th>
                    <th>Sonlanma tarixi</th>
                    <th>Etrafli</th>
                  </tr>
               </thead>
               <tbody>
                {
                  datas.map((product,index)=>{
                    total = total +parseInt(product.totals);
                    return (
                      <tr key={index}>
                         <td>{product.id}</td>
                         <td>{product.table}</td>
                         <td>{product.servant}</td>
                         <td>Hazirlanib</td>
                         <td>{product.totals} AZN</td>
                         <td>15:43</td>
                         <td className='more_row'><Link to={`/detail/${product.id}`}>Bax</Link></td>
                      </tr>
                    )
                  })
                }
               </tbody>
               <tfoot>
                 <tr>
                  <td colSpan="2">
                     <p>Cem mebleg</p>
                  </td>
                  <td colSpan="5">
                     <p>{total} AZN</p>
                  </td>
                 </tr>
               </tfoot>
            </table>
          </div>
        </section>
    </>
  )
}

export default memo(Home);