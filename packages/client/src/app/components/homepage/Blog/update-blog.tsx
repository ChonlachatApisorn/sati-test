import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import instant from '../../../providers/axios.instant';
import { BlogUrl } from '../../../providers/api.constant';

export function UpdateBlogPage() {
  const [data, setData] = useState({
    description: '',
    image: '',
  });
  const [preview, setPreview] = useState({ url: '' });
  const { blog_id } = useParams();
  const navigate = useNavigate();

  function handleChange(
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setData({
        ...data,
        [e.target.name]: e.target.files[0],
      });
      setPreview({ url: URL.createObjectURL(e.target.files[0]) });
    }
  }

  function onDelete() {
    const token = localStorage.getItem('Token');
    if (token) {
      instant
        .delete(BlogUrl.dalete + blog_id, {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        })
        .then(() => alert('Delete post succeed!!'))
        .then(() => navigate('*'));
    }
  }

  function onSubmit(e: React.FormEvent<EventTarget>) {
    e.preventDefault();
    const dataBlog = {
      description: data.description,
      image: data.image,
    };
    const token = localStorage.getItem('Token');
    if (token) {
      instant
        .put(BlogUrl.update + blog_id, dataBlog, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        })
        .then(() => alert('Update succeed!!'))
        .then(() => navigate('*'));
    }
  }

  useEffect(() => {
    instant.get(BlogUrl.findById + blog_id).then((res) => setData(res.data));
  }, [blog_id]);

  return (
    <div className="flex justify-center w-screen h-screen bg-sky-950">
      <div className="bg-sky-900 rounded-xl w-1/2 h-[700px] m-20">
        <div className=" flex justify-center">
          <h1 className="font-bold text-2xl text-sky-100 mt-5">Update Blog</h1>
        </div>
        <form
          className="flex flex-col justify-center items-center p-5 m-10"
          onSubmit={onSubmit}
        >
          <textarea
            name="description"
            id="description"
            className="rounded-xl w-[400px] h-56 p-2"
            value={data.description}
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
          <div>
            <label htmlFor="image">
              {data.image === '' || preview.url !== '' ? (
                <img
                  src={preview.url}
                  alt="blog_image"
                  className="drop-shadow-xl rounded-lg w-[400px] h-48 object-cover m-5"
                />
              ) : (
                <img
                  src={data.image}
                  alt="blog_image"
                  className="drop-shadow-xl rounded-lg w-[400px] h-48 object-cover m-5"
                />
              )}
            </label>
          </div>
          <div className="flex w-[400px] mt-3">
            <button
              type="submit"
              className="w-1/2 h-12 rounded-md bg-sky-700 text-sky-100 hover:bg-sky-600 hover:text-sky-200 hover:translate-y-[2px] transition-all m-1"
            >
              Update
            </button>
            <div
              className="flex justify-center items-center w-1/2 h-12 rounded-md bg-red-600 cursor-pointer text-sky-100 hover:bg-red-800 hover:text-sky-200 hover:translate-y-[2px] transition-all m-1"
              onClick={onDelete}
            >
              Delete
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
