import React, { useContext } from 'react'
import { authContext } from '../../context/authentication'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({children}) {

    const {token}= useContext(authContext)
   if(localStorage.getItem("tkn") !== null){
 return<>
     {children}

 </>
   }
  else{
    return <Navigate to= "/Login"/>

  }
    return <>
    
    {children}
    </>
}