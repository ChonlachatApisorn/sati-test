import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { UserUrl } from '../providers/api.constant';
import instant from '../providers/axios.instant';
import { AuthContext } from '../contexts/auth.context';

export function UpdateProfilePage() {
  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    profile_image: '',
    date_of_birth: '',
  });
  const [preview, setPreview] = useState({ url: '' });
  const { data } = useContext(AuthContext);
  const { user_id } = useParams();
  const navigate = useNavigate();

  function handleChange(
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  }
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setUserData({
        ...userData,
        [e.target.name]: e.target.files[0],
      });
      setPreview({ url: URL.createObjectURL(e.target.files[0]) });
    }
  }

  useEffect(() => {
    instant
      .get(UserUrl.findById + user_id)
      .then((res) => setUserData(res.data));
  }, [user_id]);

  function onSubmit(e: React.FormEvent<EventTarget>) {
    e.preventDefault();
    const dataUser = {
      first_name: userData.first_name,
      last_name: userData.last_name,
      email: userData.email,
      profile_image: userData.profile_image,
      date_of_birth: userData.date_of_birth,
    };

    const token = localStorage.getItem('Token');
    if (token) {
      instant
        .put(UserUrl.update + user_id, dataUser, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        })
        .then(() => alert('Update Profile succeed!!'))
        .then(() => navigate('/*'));
    }
  }

  return (
    <div className="flex justify-center bg-sky-950 w-screen h-screen">
      <div className="flex flex-col items-center bg-sky-900 font-bold text-sky-100 rounded-xl w-1/2 h-[520px] m-20 ">
        <form onSubmit={onSubmit}>
          <input
            type="file"
            className="hidden"
            id="profile_image"
            name="profile_image"
            accept="image/png, image/jpeg"
            onChange={handleFileChange}
          />
          <label htmlFor="profile_image">
            {userData.profile_image === '' || preview.url !== '' ? (
              <img
                src={preview.url}
                alt="preview"
                className="rounded-full w-48 h-48 m-10 bg-sky-100 object-cover hover:bg-sky-200 hover:opacity-80 cursor-pointer"
              />
            ) : (
              <img
                src={userData.profile_image}
                className="rounded-full w-48 h-48 m-10 hover:bg-sky-200 hover:opacity-80 cursor-pointer object-cover"
                alt="profile_image"
              />
            )}
          </label>
          <div className="flex items-start w-64 m-2">
            <span className="mx-3">First Name : </span>
            <input
              id="first_name"
              className=" pl-2 rounded-md w-32 outline-none border-none text-md font-normal text-black"
              type="text"
              name="first_name"
              value={userData.first_name}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-start w-64 m-2">
            <span className="mx-3">Last Name : </span>
            <input
              id="last_name"
              className=" pl-2 rounded-md w-32 outline-none border-none text-md font-normal text-black"
              type="text"
              name="last_name"
              value={userData.last_name}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-start w-64 m-2">
            <span className="mx-3">Email : </span>
            <input
              id="email"
              className=" pl-2 rounded-md w-[168px] outline-none border-none text-md font-normal text-black"
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-start w-64 m-2">
            <span className="mx-3">Birthday : </span>
            <input
              id="date_of_birth"
              className=" pl-2 rounded-md w-[142px] outline-none border-none text-md font-normal text-black"
              type="date"
              name="date_of_birth"
              value={userData.date_of_birth}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="block w-full bg-cyan-600 mt-6 py-2 rounded-2xl hover:bg-cyan-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
          >
            Update Profile
          </button>
          <div className="flex justify-center">
            <Link to={`/change-password/${data._id}`}>
              <span className="text-sm font-normal hover:underline">
                change password ?
              </span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfilePage;
