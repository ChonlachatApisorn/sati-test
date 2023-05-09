import { useContext, useState } from 'react';
import { AuthContext } from '../../../contexts/auth.context';
import instant from '../../../providers/axios.instant';
import { BlogUrl } from '../../../providers/api.constant';
import { useNavigate } from 'react-router-dom';
import { RiImageAddFill } from 'react-icons/ri';

export function CreatePostForm() {
  const { data } = useContext(AuthContext);
  const [dataInput, setDataInput] = useState({
    description: '',
    image: '',
    user_id: data._id,
  });

  const navigate = useNavigate();
  function handleChange(
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    setDataInput({
      ...dataInput,
      [e.target.name]: e.target.value,
    });
  }
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setDataInput({
        ...dataInput,
        [e.target.name]: e.target.files[0],
      });
    }
  }

  function onSubmit(e: React.FormEvent<EventTarget>) {
    e.preventDefault();
    const data = {
      description: dataInput.description,
      image: dataInput.image,
      user_id: dataInput.user_id,
    };
    const token = localStorage.getItem('Token');
    if (token) {
      instant
        .post(BlogUrl.create, data, {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(() => alert('Post succeed!!'))
        .then(() => navigate('/*'));
    }
  }

  return (
    <div className="flex justify-center w-screen h-screen bg-sky-950">
      <div className="bg-sky-900 rounded-xl w-1/2 h-[680px] m-20">
        <form
          className="flex flex-col justify-center items-center p-5 m-10"
          onSubmit={onSubmit}
        >
          <textarea
            name="description"
            id="description"
            className="rounded-xl w-[400px] h-56 p-2"
            placeholder="Your Text"
            onChange={handleChange}
          />
          <input
            type="file"
            name="image"
            id="image"
            accept="image/png, image/jpeg"
            className="m-5 hidden"
            onChange={handleFileChange}
          />
          <label htmlFor="image">
            <div className="flex justify-center items-center">
              <div className="flex flex-col justify-center items-center absolute">
                <RiImageAddFill className="z-10 text-3xl" />
                <span className="z-10">Add Your Image</span>
              </div>
              <div className="rounded-xl w-[400px] h-56 p-2 bg-sky-50  m-10 hover:bg-sky-100 hover:opacity-80 cursor-pointer" />
            </div>
          </label>

          <button
            type="submit"
            className="w-[400px] h-12 rounded-md bg-sky-700 text-sky-100 hover:bg-sky-600 hover:text-sky-200 hover:translate-y-[2px] transition-all"
          >
            Post Now
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePostForm;
