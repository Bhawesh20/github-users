import { useEffect, useState } from 'react'
import './App.css';
import Search from './components/Search';
import Table from './components/Table';
import { Header } from './Types';



function App() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [searchName, setSearchName] = useState<String>("");
  const [users, setUsers] = useState([]);
  const [showLoader, setShowLoader] = useState<Boolean>(false);
  const headers:Array<Header> = [
    {
      key: "id"
      , displayName: "ID"
      , type: "text"
    },
    {
      key: "login"
      , displayName: "Login ID"
      , type: "text"
    },
    {
      key: "followers_url"
      , displayName: "Followers Url"
      , type: "link"
    },
    {
      key: "html_url"
      , displayName: "Profile Link"
      , type: "link"
    },
    {
      key: "url"
      , displayName: "Profile Details"
      , type: "link"
    }
  ];

  useEffect(()=>{
    setShowLoader(true);
    fetch(`https://api.github.com/search/users?q=fullname:${searchName}&sort=followers&order=desc&page=${currentPage}`)
      .then(response => response.json())
      .then(data =>{
        setUsers(data.items);
        setTotalPage(Math.ceil(data.total_count/30));
        setShowLoader(false);
      });
    
  },[currentPage, searchName])

  async function getUsers(val:String){
    setCurrentPage(1);
    setSearchName(val);
  };
  return (
    <>
      <div className='text p-3'>
        <Search getUsers={getUsers}/>
        {
          users.length>0?
          <div className='pt-10'>
            <Table headers={headers} content={users} totalPage={totalPage} currentPage={currentPage} setCurrentPage={setCurrentPage} showLoader={showLoader}/>
          </div>
          :
          <div> No Users with this name </div>
        }
      </div>
    </>
  )
}

export default App
