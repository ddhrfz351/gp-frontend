import React from 'react'
import { Link } from 'react-router-dom'
import { Outlet } from 'react-router-dom';


export default function EditJoinRequest() {

return <>


  
<div className="text-center mt-5">
<p>هل ترغب في تعديل بياناتك ؟  </p>
</div>

<div className="  mt-2 d-flex justify-content-center  ">
  <Link to='editOld' className='option ms-5 black'>قدامى</Link>
  <Link to='editNew'  className='option mx-5 black' >مستجدين</Link>
</div>

<div className="col-md-9">
            <Outlet/>
        </div>


</>
}