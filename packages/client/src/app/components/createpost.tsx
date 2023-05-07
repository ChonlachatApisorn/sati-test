export function CreatePostForm() {
  return (
    <div className="flex justify-center w-screen h-screen bg-sky-950">
      <div className="bg-sky-50 rounded-xl w-1/2 h-1/2 m-20">
        <form className="flex flex-col justify-center items-center p-5 m-10">
          <textarea
            name="description"
            id="description"
            className="rounded-xl w-[400px] h-56 p-2"
          />
          <input type="file" className="m-5" />
          <button
            type="submit"
            className="w-full h-12 rounded-md bg-sky-700 text-sky-100 hover:bg-sky-900 hover:text-sky-200 hover:translate-y-[2px] transition-all"
          >
            Post Now
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePostForm;
