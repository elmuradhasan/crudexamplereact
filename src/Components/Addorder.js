import React,{memo} from 'react'
import food from '../food';
import { useState,useEffect } from 'react';
import axios from "axios";
function Addorder() {
 
  const [input, setinput] = useState({count:"",table:"",price:""});
  const [alldata, setalldata] = useState([]);

  const addelement  = (e)=>{
      const {name,value} = e.target;
      setinput({...input,[name]:value});  
  }
  const datacallapi = ()=>{
    axios.get('http://localhost:3500/orders').then(response => { 
      setalldata([...response.data]);
   }).catch(error => {
     console.log(error);
   });
  }
  const addarrayvalue  = (e)=>{
    e.preventDefault();
       if(input.totals !=undefined && input.totals != 0){
      axios({
        method:"POST",
        url:"http://localhost:3500/orders",
        data:input
     }).then(resp => {
    setinput({count:"",table:"",totals:"",price:"",servant:""});
    datacallapi();
 }).catch(error => {
     console.log(error);
 });

  }else{
    alert("sifarisin tamligindan emin olun");
  }
}

  useEffect(  () => {
    datacallapi();
  }, []);
  const deleteitem =(orderid)=>{
    if (window.confirm(`${orderid}-idli sifarisi silmek isteyirsiz?`)) {
      axios.delete(`http://localhost:3500/orders/${orderid}`)
    .then(resp => {
        console.log(resp.data);
        datacallapi();
    }).catch(error => {
        console.log(error);
    });
    }
  }
  return (
    <>
  <section>
       <div className='add_order flex'>
       <div className='part_form_div flex'>
       <form className='part_form flex' onSubmit={addarrayvalue}>
           <h3>Yeni sifaris yaradin</h3>
       <label>Qulluqcu secin
       <select onChange={addelement} name="servant" selected>
          <option value="" >Qulluqcu secin</option>
          <option value="Ayxan">Ayxan</option>
          <option value="Nuray">Nuray</option>
          <option value="Fidan">Fidan</option>
          <option value="Gunay">Gunay</option>
          <option value="Samil">Samil</option>
         </select>
        </label>
     <label>
      Yemek secin
      <select onChange={addelement} name="meal" selected>
          <option value="">Yemek secin</option>
             {
              food.map((foo,index)=>{
                return (
                  <option value={foo.meat}>{foo.meat } {foo.price} Azn</option>
                )
              })
             }
         </select>
     </label>
        <label>
        Secilen yemeye  uygun qiymeti secilmelidi
        <select onChange={addelement} name="price" >
        <option value="">Uygunluq zeruridir</option>
         {
              food.map((foo,index)=>{
                return (
                  <option value={foo.price}>{foo.price}Azn</option>
                )
              })
             }
         </select>
        </label>
         <label>Miqdar girin
         <input type="number" name="count" value={input.count} onChange={addelement} />
         </label>
         <label>Hansi masa
         <input type="text" name="table" value={input.table } onChange={addelement}   />
         </label>    
           <p className='total_meb'>Cem mebleg {input.price * input.count} Azn</p>
           <label>
           <input type="text" name="totals" value={input.price * input.count} onFocus={addelement} className="check"  />
            <span className='enter_price'>Meblegi tesdiqle*</span>
           </label>
         <button>Sifaris yarat</button> 
    </form>
       </div>
      {
        alldata.length > 0 ? 
        <>
          <div className='part_table_div flex'>
          <table  border="1" className='order_table'>
               <thead>
                   <tr>
                     <th>Index</th>
                     <th>Mehsul adi</th>
                     <th>Miqdar</th>
                     <th>mebleg</th>
                     <th>Sifaris saati</th>
                     <th>Gozleme</th>
                     <th>#</th>
                     <th>Geri</th>
                   </tr>
               </thead>
               <tbody>
                {
                  alldata.map((element,index)=>{

                     return(
                      <tr>
                        <td>{index}</td>
                        <td>{element.meal}</td>
                        <td>{element.count} Eded</td>
                        <td>{element.totals} Azn</td>
                        <td>15:40</td>
                        <td>12deq</td>
                        <td><button className='btn btn_given'>Verildi</button></td>
                        <td><button className='btn btn_feed' onClick={()=>deleteitem(element.id)}>geri cek</button></td>
                      </tr>
                     )
                  })
                }
               </tbody>
          </table>
    </div>
        </> : <div className='part_table_div flex load'> <p>Yuklenir</p> </div>
      }
       </div>
     </section>
    </>
  )
}

export default memo(Addorder);