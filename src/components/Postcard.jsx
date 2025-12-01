import React from 'react'
import appwriteService from '../appwrite/config'
import { Link } from 'react-router-dom'
function Postcard({$id,title ,featuredImage}) {
  return (
   <Link to={`/post/${$id}`}>
    <div className='bg-gray-100 rounded-xl p-4'>
        <div className='width-full justify-center mb-4'>
            <img src={appwriteService.getFilePreview (featuredImage)} alt={title} className='rounded-xl' />
        </div>
    </div>
   </Link>
  )
}

export default Postcard