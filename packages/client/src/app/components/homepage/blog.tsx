import { BiDotsHorizontalRounded } from 'react-icons/bi';

export function BlogCard() {
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-3 w-screen">
        <div className="flex flex-col items-center bg-sky-900 rounded-3xl drop-shadow-xl w-96 h-64 m-20 ">
          <div className="flex flex-row items-center w-full h-16 rounded-t-3xl bg-sky-800">
            <div className="flex flex-row w-full">
              <div className="w-9 h-9 rounded-full bg-white drop-shadow-lg ml-3 mt-2" />
              <label className="m-3">First Last</label>
            </div>
            <div>
              <BiDotsHorizontalRounded className="mr-4 text-2xl" />
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="m-5">
              <img
                className="drop-shadow-xl w-32 h-32 object-cover"
                src="https://firebasestorage.googleapis.com/v0/b/webprofolio-149.appspot.com/o/Color%20Hunt%20Palette%205671897b8fa1cfb997fad6a5.png?alt=media&token=ac566f29-8991-458f-b093-c601275b7794"
              />
            </div>
            <div className="mt-10">
              <span className="text-sky-300 text-base">Description Blog</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
