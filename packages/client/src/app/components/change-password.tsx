import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import instant from '../providers/axios.instant';
import { UserUrl } from '../providers/api.constant';

export function ChangePassword() {
  const [oldPassword, setOldPassword] = useState({ password: '' });
  const [newPassword, setNewPassword] = useState({
    password: '',
    confirm_password: '',
  });

  const navigate = useNavigate();
  const { user_id } = useParams();

  function handleOldChange(e: React.ChangeEvent<HTMLInputElement>) {
    setOldPassword({ password: e.target.value });
  }

  function handleNewChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewPassword({ ...newPassword, [e.target.name]: e.target.value });
  }

  async function onSubmit(e: React.FormEvent<EventTarget>) {
    e.preventDefault();
    const newData = { password: newPassword.password };
    const oldData = { password: oldPassword.password };

    const checkPassword = await instant.post(
      UserUrl.checkPassword + user_id,
      oldData
    );

    if (checkPassword.data) {
      const passwordRegex = new RegExp(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*-_])(?=.{8,})'
      );

      if (!passwordRegex.test(newData.password)) {
        alert(
          'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character.'
        );
      } else {
        if (newData.password === newPassword.confirm_password) {
          const token = localStorage.getItem('Token');
          if (token) {
            console.log(newData);

            instant
              .put(UserUrl.updatePassword + user_id, newData, {
                headers: {
                  Authorization: `Bearer ${JSON.parse(token)}`,
                },
              })
              .then(() => alert('change password succeed!!'))
              .then(() => navigate('/*'));
          }
        } else {
          alert("Password doesn't match!!");
        }
      }
    } else {
      alert(`Your Old Password doesn't match`);
    }
  }

  return (
    <div className="flex justify-center bg-sky-950 w-screen h-screen">
      <div className="flex flex-col items-center bg-sky-900 font-bold text-sky-100 rounded-xl w-1/2 h-96 m-20 ">
        <h1 className="mt-14 text-3xl">Change Password</h1>
        <div className="flex justify-center items-center w-full h-full">
          <form onSubmit={onSubmit}>
            <div className="flex items-start w-80 ml-4">
              <span className="mx-3">Old Password </span>
              <input
                id="password"
                className=" pl-2 rounded-md w-32 outline-none border-none text-md font-normal text-black"
                type="password"
                name="password"
                placeholder="************"
                onChange={handleOldChange}
              />
            </div>
            <div className="flex items-start w-80 m-4">
              <span className="mx-3">New Password </span>
              <input
                id="password"
                className=" pl-2 rounded-md w-32 outline-none border-none text-md font-normal text-black"
                type="password"
                name="password"
                placeholder="************"
                onChange={handleNewChange}
              />
            </div>
            <div className="flex items-start w-80 m-4">
              <span className="mx-3">Confirm Password </span>
              <input
                id="confirm_password"
                className=" pl-2 rounded-md w-32 outline-none border-none text-md font-normal text-black"
                type="password"
                name="confirm_password"
                placeholder="************"
                onChange={handleNewChange}
              />
            </div>
            <button
              type="submit"
              className="block w-full bg-cyan-600 mt-6 py-2 rounded-2xl hover:bg-cyan-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
            >
              Change Password
            </button>
            <div className="flex justify-center">
              <Link to={`/update-profile/${user_id}`}>
                <span className="text-sm font-normal hover:underline">
                  back
                </span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
