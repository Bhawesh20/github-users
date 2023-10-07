import { useState } from 'react'
import { Header } from '../Types'
import Popup from './Popup'

type HeaderProps = {
    headers: Array<Header>
}
const HeaderElem = (headerProps: HeaderProps): JSX.Element => {
    return (
    <>
    <div className= {`w-[100px] border p-1 border-gray-700 font-bold overflow-scroll`}> Sr. No.</div>
    {
        headerProps.headers.map((header:Header, key:number)=>{
            return (
                    <div className='w-[300px] border p-1 border-gray-700 font-bold' key={key}>
                        {header.displayName}
                    </div>
            )
        })
    }
    </>
    )
}

type ColumnProps = {
    headers: Array<Header>
    , content: any
    , currentPage: number
}

const ColumnElem = (columnProps: ColumnProps) => {
    const [popupOn, setPopupOn] = useState<String | undefined>(undefined);

    let timeoutId: ReturnType<typeof setTimeout>; 
    function showPopup(link?:String){
        clearTimeout(timeoutId);
        if(link){ 
            timeoutId = setTimeout(()=>{
                setPopupOn(link);
            }, 500);
            return;
        } else {
            setPopupOn(undefined);
        }
    }
    return columnProps.content.map( (row:any, key: number) => {
        return(
        <>
            <div className='flex'>
                <div className= {`w-[100px] border p-1 border-gray-700 overflow-scroll text-center items-center`}> {(30* (columnProps.currentPage-1)) + key+1}</div>
                {
                    columnProps.headers.map( (header:any, key2:number) => {
                        if(header.type == "link"){
                            return (
                                <div className= {`w-[300px] border p-1 border-gray-700 overflow-scroll hover:underline relative`} >
                                    <a onMouseEnter={() => showPopup(row[header.key])} onMouseLeave={() => showPopup()} href={row[header.key]} key={key2}>
                                        {row[header.key]}
                                    </a>
                                    {popupOn == row[header.key] && ("url" == header.key) ? <div className='fixed z-10'><Popup url={row[header.key]}/></div>: <></>}
                                </div>
                                
                        )
                        } else {
                            return (<div className= {`w-[300px] border p-1 border-gray-700 overflow-scroll`} key={key2}>
                                    {row[header.key]}
                                </div>
                            )
                        }
                    })
                }
            </div>
        </>
)
})
}

type PaginationProp = {
    currentPage: number
    , totalPages: number
    , setCurrentPage: any
}
const Pagination = (paginationProp: PaginationProp) => {
    function updateCurrentPage(val:number){
        if(val === 0 || val === paginationProp.totalPages+1){
        } else {
            paginationProp.setCurrentPage(val);
        }
    }
    return(
        <div className='flex items-center gap-2 p-4 text-center'>
            <div onClick={() => updateCurrentPage(paginationProp.currentPage - 1)} className={'p-1 border border-gray-700 rounded cursor-pointer'}> Previous </div>
            <div className='text items-center text-center'> Showing {paginationProp.currentPage} of {paginationProp.totalPages} </div>
            <div onClick={() => updateCurrentPage(paginationProp.currentPage + 1)} className='p-1 border border-gray-700 rounded cursor-pointer'> Next </div>
        </div>
    )
}

type Props = {
    headers: Array<Header>
    , content: Array<Object>
    , currentPage: number
    , totalPage: number
    , showLoader: Boolean
    , setCurrentPage: any
}

const Table = (props: Props) => {
  return (
    <>
        <div>
            <Pagination currentPage={props.currentPage} totalPages={props.totalPage} setCurrentPage={props.setCurrentPage}/>
        </div>
        <div className='flex'>
            <HeaderElem headers={props.headers}/>
        </div>
        {
            props.showLoader?
                <div> Loading... </div>
            :
            props.content?
            <div>
                <ColumnElem headers={props.headers} content={props.content} currentPage={props.currentPage}/>
            </div>
            :
            <div> No Data to Display </div>
            
        }
    </>
  )
}

export default Table