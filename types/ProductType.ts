export type ProductType = {
    name: string
    image: string
    description: string | null
    unit_amount: number | null
    quantity?: number | 1
    id: string
    metadata: MetadataType
}

type MetadataType = {
    features: string
}