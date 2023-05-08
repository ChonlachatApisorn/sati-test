import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import instant from '../../providers/axios.instant';
import { UserUrl } from '../../providers/api.constant';

export function SignUp() {
  const [data, setData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    confirm_password: '',
    date_of_birth: '',
  });

  const navigate = useNavigate();

  function handleOnChange(
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  function onSubmit(e: React.FormEvent<EventTarget>) {
    e.preventDefault();
    const dataUser = {
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
      password: data.password,
      date_of_birth: data.date_of_birth,
    };

    if (dataUser.password === data.confirm_password) {
      instant
        .post(UserUrl.create, dataUser)
        .then(() => {
          alert('Sign up succeed!!');
        })
        .then(() => navigate('/sign-in'));
    } else {
      alert("Password doesn't match!!");
    }
  }

  return (
    <div className="h-screen flex">
      <div className="flex w-full justify-around items-center bg-[url(https://homeguru.homepro.co.th/wp-content/uploads/2020/03/covid-19-1200x630px.jpg)] bg-cover bg-no-repeat bg-fixed bg-center">
        <div className="w-full mx-auto px-20 flex-col space-y-6 bg-black opacity-20 h-screen" />
        <div className="flex w-1/2 justify-center items-cente space-y-8 absolute">
          <div className="w-full px-8 md:px-32 lg:px-24">
            <form
              className="bg-white rounded-md shadow-2xl p-5"
              onSubmit={onSubmit}
            >
              <h1 className="text-cyan-700 font-bold text-2xl mb-1">
                You can join us!
              </h1>
              <p className="text-sm font-normal text-cyan-600 mb-8 ml-1">
                Enter your information
              </p>
              <label htmlFor="email" className="text-xs font-semibold ml-2">
                Email
              </label>
              <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
                <input
                  id="email"
                  className=" pl-2 w-full outline-none border-none"
                  type="email"
                  name="email"
                  placeholder="example@example.com"
                  onChange={handleOnChange}
                />
              </div>
              <label
                htmlFor="first_name"
                className="text-xs font-semibold ml-2"
              >
                First Name
              </label>
              <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
                <input
                  id="first_name"
                  className=" pl-2 w-full outline-none border-none"
                  type="text"
                  name="first_name"
                  placeholder="First Name"
                  onChange={handleOnChange}
                />
              </div>
              <label htmlFor="last_name" className="text-xs font-semibold ml-2">
                Last Name
              </label>
              <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
                <input
                  id="last_name"
                  className=" pl-2 w-full outline-none border-none"
                  type="text"
                  name="last_name"
                  placeholder="Last Name"
                  onChange={handleOnChange}
                />
              </div>
              <label htmlFor="password" className="text-xs font-semibold ml-2">
                Password
              </label>
              <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl ">
                <input
                  className="pl-2 w-full outline-none border-none"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="************"
                  onChange={handleOnChange}
                />
              </div>
              <label
                htmlFor="confirm_password"
                className="text-xs font-semibold ml-2"
              >
                Confirm Password
              </label>
              <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl ">
                <input
                  className="pl-2 w-full outline-none border-none"
                  type="password"
                  name="confirm_password"
                  id="confirm_password"
                  placeholder="************"
                  onChange={handleOnChange}
                />
              </div>
              <label
                htmlFor="date_of_birth"
                className="text-xs font-semibold ml-2"
              >
                Your Birthday
              </label>
              <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl ">
                <input
                  className="pl-2 w-full outline-none border-none"
                  type="date"
                  name="date_of_birth"
                  id="date_of_birth"
                  onChange={handleOnChange}
                />
              </div>
              <button
                type="submit"
                className="block w-full bg-cyan-600 mt-5 py-2 rounded-2xl hover:bg-cyan-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
              >
                confirm
              </button>
              <div className="flex justify-center mt-4">
                <a
                  href="sign-in"
                  className="text-sm ml-2 hover:text-cyan-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all"
                >
                  back to Sing In
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
