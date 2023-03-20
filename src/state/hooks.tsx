import { Fetcher } from 'swr'

export const fetcher: Fetcher = (url : string) => fetch(url).then((response =>response.json()))

