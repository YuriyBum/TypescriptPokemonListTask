export type pokemonCard = {
    card : {
        name: string,
        url: string
    }
 }

export type numberAction = {
    type: string,
    payload: number
}

export interface pageData {
    page: {
        limit: number,
        offset: number
    }
}
