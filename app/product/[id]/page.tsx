import { SearchParamTypes } from '@/types/SearchParams';
import Image from 'next/image'
import formatPrice from '@/util/PriceFormat';
import AddCart from './AddCart';


export default async function Product({searchParams}: SearchParamTypes) {

    return (
        <div className='flex flex-col lg:flex-row justify-between gap-8 border-2 border-teal-400 rounded-lg'>
            <Image
                src={searchParams.image}
                alt={searchParams.name}
                width={500}
                height={500}
                className='w-full lg:w-1/2 aspect-[3/2] object-cover rounded-l-lg'
            />
            <div className='flex flex-col gap-4 justify-between p-4'>
                <div className='flex flex-col gap-2'>
                    <h1 className='text-xl font-bold'>{searchParams.name}</h1>
                    <div className='overflow-auto max-h-28'>                        
                        <p className='text-base font-light'>{searchParams.description}</p>
                    </div>
                    <div className='text-xl font-bold text-teal-500 mt-4'>{searchParams.unit_amount && formatPrice(searchParams.unit_amount)}</div>
                </div>
                <div className='flex'>
                    <AddCart {...searchParams} />
                </div>
            </div>
        </div>
    )
}