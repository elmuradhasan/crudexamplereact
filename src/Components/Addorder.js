import React,{memo} from 'react'
import food from '../food';
import { useState,useEffect,useRef } from 'react';
import axios from "axios";
var minute;
function Addorder() {
  minute =4;
  var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();  
  const [input, setinput] = useState({count:"",table:"",price:"",time:time});
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
        data:input,
     }).then(resp => {
    setinput({count:"",table:"",totals:"",price:"",time:time});
    datacallapi();
   select0.current.value = "";
   select1.current.value = "";
   select2.current.value = "";
 }).catch(error => {
     console.log(error);
 });

  }else{
    alert("sifarisin tamligindan emin olun");
  }
}

  useEffect(() => {
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
   const select0 = useRef(); 
   const select1 = useRef(); 
   const select2 = useRef(); 
  return (
    <>
  <section>
       <div className='add_order flex'>
       <div className='part_form_div flex'>
       <form className='part_form flex' onSubmit={addarrayvalue}>
           <h3>Yeni sifariş yaradin</h3>
       <label>Qulluqcu seçin
       <select onChange={addelement} name="servant" ref={select0}>
          <option selected value="" >Qulluqcu secin</option>
          <option value="Ayxan">Ayxan</option>
          <option value="Nuray">Nuray</option>
          <option value="Fidan">Fidan</option>
          <option value="Gunay">Gunay</option>
          <option value="Samil">Samil</option>
         </select>
        </label>
     <label>
      Yemək seçin
      <select onChange={addelement}  name="meal"  ref={select1}>
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
        Seçilən yeməyə  uyğun qiymət seçilməlidi
        <select onChange={addelement} name="price"  ref={select2} >
        <option value="">Uyğunluq zəruridir</option>
         {
              food.map((foo,index)=>{
                return (
                  <option value={foo.price}>{foo.price} Azn</option>
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
            <span className='enter_price'>Məbləği təsdiqlə*</span>
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
                     <th>İndex</th>
                     <th>Məhsul adi</th>
                     <th>Miqdar</th>
                     <th>Cəm məbləğ</th>
                     <th>Sifaris saati</th>
                     <th>Gözləmə</th>
                     <th>#</th>
                     <th>Ləğv et</th>
                   </tr>
               </thead>
               <tbody>
                {
                  
                  alldata.map((element,index)=>{
                    if (minute < 20) {
                      minute = minute +2;
                    }else if(minute == 20){
                      minute = 4;
                    }else{
                      minute  = minute - 2;
                    }
                   
                     return(
                      <tr>
                        <td>{index}</td>
                        <td>{element.meal}</td>
                        <td>{element.count} Ədəd</td>
                        <td>{element.totals} Azn</td>
                        <td>{element.time}</td>
                        <td>{minute} dəqiqə</td>
                        <td><button className='btn btn_given'>Verildi</button></td>
                        <td><button className='btn btn_feed' onClick={()=>deleteitem(element.id)}>geri çэk</button></td>
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