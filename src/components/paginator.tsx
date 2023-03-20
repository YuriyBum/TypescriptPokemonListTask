import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { RootState, actions } from 'state/reducer';
import * as config from 'config'
import { Button, styled } from '@mui/material';


const Paginator = ({ itemCount  }) => {

    const State = useSelector((state: RootState) => {
        return state
      })
    const dispatch = useDispatch()

    const totalCount = Number(itemCount) || State.pageSize
    const currentPage : number = Number(State.pageNumber)
    const diapasone : number = config.pageDiapasone
    const totalPages = Math.ceil(totalCount / State.pageSize)
    const [newAmountOnPage, uodateAmountOnPage] = useState<number>(State.pageSize) 

    let pagesList : any[] = []

    const MoveToPage = (event : any) => {
        const act = event.target.dataset.action 
        const page = event.target.dataset.page

        if (act) {
            switch (act) {
                case "prev" :
                dispatch(actions.setPageNumber(currentPage - 1))
                break;
                case "next" :
                dispatch(actions.setPageNumber(currentPage + 1))
                break;
            }

            return true
        }

        if (page) {
            dispatch(actions.setPageNumber(page))
        }
    }

    const OnPageOnChange = (event : any) => {
        uodateAmountOnPage(event.target.value)
    }

    const SubmitOnPageValue = () => {
        dispatch(actions.setPageSize(newAmountOnPage))
    }

    if (currentPage > diapasone) {
        pagesList.push(
            <div key="pbp" onClick={MoveToPage}
            className="page--btn page--prev" data-action="prev">
                Previous
            </div>
        )
    }

    for (let i = (currentPage - diapasone); i < (currentPage + diapasone); i++) {
        // console.log(i)
        if (i >= 0 && i < totalPages)
        pagesList.push(
            <div key={"pb".concat(String(i*1.4))} onClick={MoveToPage}
            className="page--btn page--prev" data-page={i}>
                {i+1}
            </div>
        )
    }

    if (currentPage < totalPages - diapasone) {
        pagesList.push(
            <div key="pbn"  onClick={MoveToPage}
            className="page--btn page--prev" data-action="next">
                Next
            </div>
        )
    }

    const SubmitBtn = styled(Button)`
       margin: 20px;
       color: #c6bea7;
       border-color: #c6bea7;
    `

    // console.log(totalCount)

    return(
        <div className="app--paginator">
            <div className="page--limit--input">
                <p>Show on page : </p>
                <input type="number" value={newAmountOnPage} onChange={OnPageOnChange} />
                <SubmitBtn variant="outlined"
                onClick={SubmitOnPageValue}>Apply</SubmitBtn>
            </div>
            <div className="paginator--body">
                {pagesList}
            </div>
        </div>
    )
}

export default Paginator