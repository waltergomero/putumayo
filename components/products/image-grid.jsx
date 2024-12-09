
import React from 'react'
import Image from 'next/image'
import {DeleteImageFromProduct} from './buttons'


const ImageGrid =  ({images}) => {

  return (
    <>
  <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-4">
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-3 xl:columns-4 2xl:columns-5 3xl:columns-6">
    {images && images?.map((item) =>(
      <div className='relative after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight' 
      key={item.image_name}>
          <Image       
          alt={""}
          className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
          style={{ transform: 'translate3d(0, 0, 0)' }}             
          src={ item.path}
          width={720}
          height={480}
          sizes="(max-width: 640px) 100vw,
            (max-width: 1280px) 50vw,
            (max-width: 1536px) 33vw,
            25vw"
        />
        <DeleteImageFromProduct image_id={item._id} image_path={item.path} />
       </div>
    ))
        }
  
    </div>
    </div>
    </>
  )
}

export default ImageGrid