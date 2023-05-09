import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import instant from '../providers/axios.instant';
import { UserUrl } from '../providers/api.constant';

export function ProfilePage() {
  const [data, setData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    profile_image: '',
    date_of_birth: '',
  });
  const { user_id } = useParams();

  useEffect(() => {
    instant.get(UserUrl.findById + user_id).then((res) => setData(res.data));
  }, [user_id]);
  return (
    <div className="flex justify-center bg-sky-950 w-screen h-screen">
      <div className="flex flex-col items-center bg-sky-900 font-bold text-sky-100 rounded-xl w-1/2 h-1/2 m-20 ">
        {data.profile_image !== '' ? (
          <div className="bg-sky-100 rounded-full w-48 h-48 m-10" />
        ) : (
          <img
            src={data.profile_image}
            alt="profile_image"
            className="rounded-full w-48 h-48 m-10"
          />
        )}
        {/* profile image */}
        <div className="flex items-start w-64 m-2">
          <span className="mx-3">First Name : </span>
          <span>{data.first_name}</span>
        </div>
        <div className="flex items-start w-64 m-2">
          <span className="mx-3">Last Name : </span>
          <span>{data.last_name}</span>
        </div>
        <div className="flex items-start w-64 m-2">
          <span className="mx-3">Email : </span>
          <span>{data.email}</span>
        </div>
        <div className="flex items-start w-64 m-2">
          <span className="mx-3">Birthday : </span>
          <span>{data.date_of_birth}</span>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
