type Params = {
    id: string
}

type SearchParams = {
    name: string,
    image: string,
    description: string,
    unit_amount: number | null,
    quantity: number | 1
    id: string
    feachers: string
}

export type SearchParamTypes = {
    params: Params,
    searchParams: SearchParams
}