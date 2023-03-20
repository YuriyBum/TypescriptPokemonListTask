import { createReducer, createAction, combineReducers } from '@reduxjs/toolkit';
import { numberAction } from 'types'
import * as config from 'config'

const actionNames = {
    pageSize: "PAGE_SIZE",
    pageNumber: "PAGE_NUMBER",
    totalCount: "TOTAL_COUNT"
}

export const actions = {
    setPageSize: createAction<number>(actionNames.pageSize),
    setPageNumber: createAction<number>(actionNames.pageNumber),
    setTotalCount: createAction<number>(actionNames.totalCount)
}

const UpdatePageSize = (state = config.defaultPageSize, action: numberAction) => {
    switch(action.type) {
        case actionNames.pageSize : 
          return action.payload || state
        default :
          return state
      }
}

const UpdatePageNumber = (state = 0, action: numberAction) => {
    switch(action.type) {
        case actionNames.pageNumber : 
          return action.payload >= 0 ? action.payload : state
        default :
          return state
      }
}

const UpdateTotalCount = (state = config.defaultPageSize, action: numberAction) => {
    switch(action.type) {
        case actionNames.totalCount : 
          return action.payload >= 0 ? action.payload : state
        default :
          return state
      }
}

export const RootReducer = combineReducers ({
    pageSize: UpdatePageSize,
    pageNumber: UpdatePageNumber,
    totalCount: UpdateTotalCount
})

export type RootState = ReturnType<typeof RootReducer>