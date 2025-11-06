"use client"
import React, { useState } from 'react'
import Loading from '../loading/page'

export default function MainHome() {
  const [isLoading , setLoading]=useState(true)


  if(isLoading){
    return <Loading onFinish={()=>setLoading(false)}/>
  }
  return (
    <div>
      <h3>Home</h3>
    </div>
  )
}


