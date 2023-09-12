import Image from 'next/image'
import formatPrice from '@/util/PriceFormat'
import { ProductType } from '@/types/ProductType'
import Links from 'next/link'

export default function Product({name, image, description, unit_amount, id, metadata}: ProductType) {

    const { features } = metadata

    return (
        <Links href={ {pathname: `/product/${id}`, query: {name, image, unit_amount, id, description, features} } }>        
            <div className='bg-blur-md bg-teal-50/80 border border-gray-100 hover:border-teal-300 flex flex-col gap-4 rounded-md shadow-lg shadow-teal-900/25 hover:-translate-y-1 duration-300 ease-in-out'>
                <Image
                    src={image}
                    alt={name}
                    width={800}
                    height={800}
                    className="w-full aspect-[3/2] object-cover rounded-t-md"
                />
                <div className='p-4 flex flex-col gap-2 min-h-[128px]'>
                    <h3 className='text-2xl font-bold'>{name}</h3>
                    <div>
                        <h3 className='text-md font-bold'>{unit_amount !== null ? formatPrice(unit_amount) : 'N/A' }</h3>
                    </div>
                </div>
            </div>
        </Links>
    )
}