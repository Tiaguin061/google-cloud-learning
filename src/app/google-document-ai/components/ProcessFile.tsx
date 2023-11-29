'use client';

import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { PageResult } from '../../api/documentai/route';

export function ProcessFile() {
  const [processFileResult, setProcessFileResult] = useState<PageResult[] | null>(null);

  const [loading, setLoading] = useState(false);

  async function submitToProcessFile(file?: File | null) {
    if (!file) {
      return;
    }

    if (file?.type !== 'application/pdf') {
      return toast.error('Apenas o formato [.PDF] é permitido');
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post<{
        error: {
          type: string;
          message: string;
        } | null;
        result: PageResult[] | null
      }>('/api/documentai', formData);


      if (response.data.error) {
        return toast.error(response.data.error.message);
      }

      setProcessFileResult(response.data.result);

      toast.success('Arquivo upado com sucesso');
    } catch (error: any) {
      console.log('error', error)
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center max-w-3xl w-full flex-col gap-4">
      <div className="flex items-center w-full">
        <label className="flex items-center gap-2 justify-center cursor-pointer max-w-[200px] mx-auto w-full text-center relative bg-green-500 p-2 px-4 rounded-md transition-all hover:brightness-110" htmlFor='process-file'>
          <input
            type="file"
            name="file"
            id="process-file"
            disabled={loading}
            className="disabled:opacity-50 disabled:cursor-not-allowed absolute z-10 w-full h-full opacity-0 hidden cursor-pointer"
            onChange={(e) => submitToProcessFile(e.target.files?.item(0))}
          />
          Upar arquivo
          {loading && <Loader2 className='animate-spin' />}
        </label>

        <div className="">
          <span className='font-bold text-lg'>Informações:</span>
          <ul className="">
            <li className="list-disc">
              Apenas .PDF
            </li>
            <li className="list-disc">
              Até 15 páginas
            </li>
          </ul>
        </div>
      </div>

      {loading ? (
        <div className='flex flex-col gap-2 items-center'>
          <Loader2 className='animate-spin' />
          <span className="">Carregando...</span>
        </div>
      ) : (
        <div className="flex flex-col gap-6 max-w-3xl">
          {processFileResult?.length && processFileResult?.map((page, index) => (
            <div className='flex flex-col gap-1 bg-zinc-700 px-4 py-6 rounded-md relative' key={`${page}+${index}`}>
              <div className="text-center flex items-center justify-center h-8 w-8 rounded-full bg-zinc-300 absolute -left-2 -top-4 text-lg">{page.pageNumber}</div>
              {page.pageParagraphs.map(paragraph => (
                <span key={`${paragraph}+${index}`}>
                  {paragraph}
                </span>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}


// authenticates the service account to be used in this context
// const documentai = google.documentai('v1').projects.operations.get({
//   name: '',
// })


// async function test() {
//   try {
//     const response = await axios.post('https://us-documentai.googleapis.com/v1/projects/670086991862/locations/us/processors/2213411578b89edb:process', {});

//     console.log(response.data);
//   } catch (error) {
//     console.log({ error: error.response.data })
//   }
// }

// test();