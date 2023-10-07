import { GetUsers} from '../Types';



type Props = {
    getUsers: GetUsers
}

const Search = (props: Props) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    function updateSearch(e:any){
        clearTimeout(timeoutId);
        timeoutId = setTimeout(()=> {
            props.getUsers(e.target.value);

        },500)
    };
    return (
        <>
            <div className='flex gap-5'>
                <div className='w-full'>
                    <input className='border border-gray-700 p-2 rounded w-full' type="text" onChange={updateSearch}/>
                </div>
            </div>
        </>
    )
}

export default Search