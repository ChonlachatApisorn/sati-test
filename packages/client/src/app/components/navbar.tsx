import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/auth.context';

type PropType = { children: JSX.Element };

export function Navbar({ children }: PropType) {
  const [dropDown, setDropDown] = useState(false);
  const { user } = useContext(AuthContext);

  const dropDownList = [
    {
      name: 'My Profile',
      path: 'profile',
    },
    {
      name: 'Edit Profile',
      path: 'update-profile',
    },
    {
      name: 'Log Out',
      path: 'sign-in',
    },
  ];

  function refreshPage() {
    window.location.reload();
  }

  function handleLogout(item: string) {
    if (item === 'Log Out') {
      localStorage.removeItem('Token');
      refreshPage();
    }
  }

  return user === true ? (
    <>
      <nav className="flex items-center h-16 bg-sky-950">
        <div className="flex m-5 w-full justify-between">
          <div className="flex items-center">
            <Link to="homepage" className="font-bold text-sky-100 text-2xl">
              HOMEPAGE
            </Link>
          </div>
          <div className="flex font-medium text-sm">
            <Link
              className="mr-3 flex justify-center items-center"
              to="create-post"
            >
              <button className="bg-sky-100 rounded-xl text-sky-600 hover:bg-sky-600 hover:text-sky-100 hover:translate-y-[2px] transition-all w-28 h-8">
                Create Post +
              </button>
            </Link>
            <div
              className="rounded-full w-10 h-10 bg-sky-100 mx-3"
              onMouseEnter={() => setDropDown(true)}
            />
          </div>
          {dropDown && (
            <div className="flex absolute justify-end w-screen m-3 -ml-8">
              <ul
                className="absolute shadow-xl rounded-lg bg-sky-100 w-48 mt-5"
                onMouseLeave={() => setDropDown(false)}
              >
                {dropDownList.map((item, index) => (
                  <li
                    key={index}
                    className="mx-1 my-1 hover:bg-400 hover:px-1 hover:rounded-lg cursor-pointer"
                    onClick={() => handleLogout(item.name)}
                  >
                    <Link to={item.path}>
                      <div className="flex items-center px-4 py-2 text-sky-500 hover:text-sky-800">
                        <span className="text-14 px-2 ">{item.name}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </nav>
      <div>{children}</div>
    </>
  ) : (
    children
  );
}
