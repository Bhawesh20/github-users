
import { useEffect, useState } from "react";

type Props = {
  url: String;
};

type UserData = {
  followers: number;
  name: string;
  login: string;
};

const Popup = (props: Props) => {
  const [showLoader, setShowLoader] = useState<Boolean>(false);
  const [userdata, setUserData] = useState<UserData>();
  const [errorMessage, setErrorMessage] = useState<String>("");
  useEffect(() => {
    setShowLoader(true);
    fetch(props?.url?.toString())
      .then((response) => {
        if (response.status == 200) {
          setErrorMessage("");
          return response.json();
        }
        throw new Error("Something went wrong");
      })
      .then((resp) => {
        console.log(resp);
        setUserData(resp);
        setShowLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("Something went wrong");
      });
  }, [props.url]);
  return (
    <div className="text bg-gray-700 text-white rounded p-4">
      {errorMessage ? (
        <div> {errorMessage} </div>
      ) : showLoader ? (
        <div> Loading... </div>
      ) : (
        <div>
          <div> Username : {userdata?.login}</div>
          <div> Followers : {userdata?.followers}</div>
          <div> Full Name : {userdata?.name}</div>
        </div>
      )}
    </div>
  );
};

export default Popup;
