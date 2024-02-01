import { useModal } from '@/hooks/use-modal-store'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { createPhoto } from '@/actions/createPhoto'
import { CreatePhotoSchema } from '@/schemas'
import getImageExifInfo from '@/lib/getImageExifInfo'

import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,  
} from "@/components/ui/dialog"
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import ImageUpload from '@/components/ImageUpload'
import FormError from '@/components/form-error'
import FormSuccess from '@/components/form-success'
import { Upload } from 'lucide-react'

import { getExifData } from '@/lib/getExifData'
import { getImageSize } from '@/lib/getImageSize'
import { uploadFiles } from '@/actions/uploadPhoto'

type Schema = z.infer<typeof CreatePhotoSchema>

const CreatePhotoModal = () => {
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()
  const [isPending, startTransition] = useTransition()

  const { onClose, isOpen, type, data } = useModal()
  const router = useRouter()

  const isModalOpen = isOpen && type === 'createPhoto'

  const form = useForm<Schema>({
    resolver: zodResolver(CreatePhotoSchema),
    defaultValues: {
      imageUrl: '',
    }
  })

  const onSubmit = async (values: Schema) => {
    setError('')
    setSuccess('')
    const albumId = data.id ? data.id : null

    const exif = await getImageExifInfo(values.imageUrl).catch((error) => {
      console.log(error);

      return {};
    }) as Object

    const v = {
      ...values,
      ...exif,
      albumId
    }

    startTransition(() => {
      createPhoto(v)
      .then((data) => {
        setError(data?.error)
        setSuccess(data?.success)
      })
    })

    form.reset()
    router.refresh()
    onClose()
  }


  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-center text-3xl'>
            Upload Photo
          </DialogTitle>
          <DialogDescription className='text-center'>
            Upload photo to Uploadthing
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={async (e) => {
            e.preventDefault();

            const fd = new FormData(e.target as HTMLFormElement);
            const uploadedFiles = await uploadFiles(fd);

            console.log(uploadedFiles);
          }}
        >
          <input 
            name="files" 
            type="file" 
            multiple 
            accept='image/*'
          />
          <Button type='submit'>Upload</Button>
        </form>
 
      </DialogContent>
    </Dialog>
  )
}

export default CreatePhotoModal
