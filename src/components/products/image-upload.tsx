'use client'

import { useState } from 'react'
import Image from 'next/image'
import { CldUploadWidget } from 'next-cloudinary'
import { TbPhotoPlus } from 'react-icons/tb'

export const ImageUpload = () => {
  const [image, setImage] = useState('')
  return (
    <CldUploadWidget
      uploadPreset="tm3o1tpr"
      options={{ maxFiles: 1 }}
      onSuccess={(result, { widget }) => {
        if (result.event === 'success') {
          // @ts-ignore
          setImage(result.info?.secure_url)
          widget.close()
        }
      }}
    >
      {({ open }) => (
        <>
          <div className="space-y-2">
            <label className="text-slate-800">Imagen Producto</label>
            <div
              onClick={() => open()}
              className="relative cursor-pointer hover:opacity-70 transition p-10 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600 bg-slate-100"
            >
              <TbPhotoPlus size={50} className="text-slate-800" />
              <p className="text-lg font-semibold">Agregar Imagen</p>

              {image && (
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    fill
                    style={{ objectFit: 'contain' }}
                    src={image}
                    alt="Imagen Producto"
                  />
                </div>
              )}
            </div>
          </div>
          <input type="hidden" name="image" value={image} />
        </>
      )}
    </CldUploadWidget>
  )
}
