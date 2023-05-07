export function UpdateProfilePage() {
  return (
    <div className="flex justify-center bg-sky-950 w-screen h-screen">
      <div className="flex flex-col items-center bg-sky-900 font-bold text-sky-100 rounded-xl w-1/2 h-1/2 m-20 ">
        <form>
          <input
            type="file"
            className="hidden"
            id="profile_image"
            name="profile_image"
          />
          <label htmlFor="profile_image">
            <div className="bg-sky-100 rounded-full w-48 h-48 m-10" />
          </label>
          {/* profile image */}
          <div className="flex items-start w-64 m-2">
            <span className="mx-3">First Name : </span>
            <input
              id="first_name"
              className=" pl-2 rounded-md w-32 outline-none border-none text-md font-normal text-black"
              type="text"
              name="first_name"
              placeholder="First Name"
            />
          </div>
          <div className="flex items-start w-64 m-2">
            <span className="mx-3">Last Name : </span>
            <input
              id="last_name"
              className=" pl-2 rounded-md w-32 outline-none border-none text-md font-normal text-black"
              type="text"
              name="last_name"
              placeholder="Last Name"
            />
          </div>
          <div className="flex items-start w-64 m-2">
            <span className="mx-3">Email : </span>
            <input
              id="email"
              className=" pl-2 rounded-md w-[168px] outline-none border-none text-md font-normal text-black"
              type="email"
              name="email"
              placeholder="email"
            />
          </div>
          <div className="flex items-start w-64 m-2">
            <span className="mx-3">Birthday : </span>
            <input
              id="date_of_birth"
              className=" pl-2 rounded-md w-[142px] outline-none border-none text-md font-normal text-black"
              type="text"
              name="date_of_birth"
              placeholder="xx/xx/xxxx"
            />
          </div>
          <button
            type="submit"
            className="block w-full bg-cyan-600 mt-6 py-2 rounded-2xl hover:bg-cyan-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfilePage;
