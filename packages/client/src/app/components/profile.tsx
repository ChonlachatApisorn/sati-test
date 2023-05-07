export function ProfilePage() {
  return (
    <div className="flex justify-center bg-sky-950 w-screen h-screen">
      <div className="flex flex-col items-center bg-sky-900 font-bold text-sky-100 rounded-xl w-1/2 h-1/2 m-20 ">
        <div className="bg-sky-100 rounded-full w-48 h-48 m-10" />
        {/* profile image */}
        <div className="flex items-start w-64 m-2">
          <span className="mx-3">First Name : </span>
          <span>first_name</span>
        </div>
        <div className="flex items-start w-64 m-2">
          <span className="mx-3">Last Name : </span>
          <span>last_name</span>
        </div>
        <div className="flex items-start w-64 m-2">
          <span className="mx-3">Email : </span>
          <span>email@email.com</span>
        </div>
        <div className="flex items-start w-64 m-2">
          <span className="mx-3">Birthday : </span>
          <span>xx/xx/xxxx</span>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
