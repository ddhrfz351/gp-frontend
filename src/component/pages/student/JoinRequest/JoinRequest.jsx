import React from 'react'
import { Link } from 'react-router-dom'
import { Outlet } from 'react-router-dom';


export default function JoinRequest() {

return <>


  
<div className="text-center mt-5">
<p>قم باختيار (قدامى /مستجدين) وملئ بياناتك ثم الموافقه على الاقرار بالأسفل </p>
<p>مع ملاحظة ان الطلاب المستجدين هم طلاب الفرق الاولى او الاعداديه .الطلاب القدامى هم طلاب ما بعد الفرق الاولى او الاعداديه </p>
</div>

<div className="  mt-2 d-flex justify-content-center  ">
  <Link to='old' value='قديم' className='option  black'>قدامى</Link>
  <Link to='new' value='مستجد'  className='option space-between-words black' >مستجدين</Link>
</div>

<div className="col-md-9">
            <Outlet/>
        </div>


</>
}

