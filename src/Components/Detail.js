import React,{useState,useEffect}from 'react'
import { Link,useParams} from 'react-router-dom';
import axios from 'axios';
function Detail() {
  const {product_id} = useParams();
  const [iditem, setiditem] = useState([]);
useEffect(() => {
  axios.get('http://localhost:3500/orders/'+product_id).then(respon => { 
    setiditem([respon.data]);
    console.log(respon.data);
   }).catch(error => {
    console.log(error);
   });
}, [])

  return (
    <>
     <section>
        <div className='detail_main flex'>
             <h2>Sifaris Detaylari</h2>
          <Link to="/">
             Sifarislere qayit
          </Link>
      {
        iditem.length > 0 ? 
        <>
          {
         iditem.map((product,index)=>{
               return(
                <div className='order_about flex'>
                  <p>Sifaris sirasi <strong>{product.id}</strong></p>                  
                  <p>Xidmet gosteren emekdasimiz <strong>{product.servant}</strong></p>                  
                  <p> Sifarisin masasi <strong>{product.table}</strong></p>                  
                  <p> Sifarisin meblegi <strong>{product.totals} AZN</strong></p>                  
                  <p>Yemek<strong>{product.meal}</strong></p>                                  
                </div>
               )
         })
     }
        </>  :" "
      }
        </div>
     </section>
    </>
  )
}

export default Detail;