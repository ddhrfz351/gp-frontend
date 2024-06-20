import'./Navbar.css';
import React from 'react';
export default function Navbar(){
    return(
        <nav className="tab">
            <a href="/appointment"> <button className="tablinks" id='active'>مواعيد التقديم</button></a>
           <a href="/instruction"><button className="tablinks" >الارشادات</button></a>  
           <a href="/users"><button className="tablinks" >المستخدمين</button></a>  
           <a href="/rooms"><button className="tablinks" >الغرف</button></a>  
        </nav>
    )
}