import { useContext, useEffect, useState } from 'react';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import instant from '../../../providers/axios.instant';
import { BlogUrl } from '../../../providers/api.constant';
import { IBlog } from '../../../providers/interface';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/auth.context';

export function BlogCard() {
  const [dataBlog, setDataBlog] = useState([]);
  const { data } = useContext(AuthContext);

  useEffect(() => {
    instant.get(BlogUrl.list).then((res) => setDataBlog(res.data));
  }, []);

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-3 w-screen">
        {dataBlog.map((item: IBlog) => (
          <div className="flex flex-col items-center bg-sky-900 rounded-3xl drop-shadow-xl w-96 h-64 mx-20 mt-20">
            <div className="flex flex-row items-center w-full h-16 rounded-t-3xl bg-sky-800">
              <div className="flex flex-row w-full">
                <img
                  className="w-9 h-9 rounded-full drop-shadow-lg ml-3 mt-2 object-cover"
                  src={item.user_id.profile_image}
                  alt={item.user_id.first_name}
                />
                <label className="m-3 text-sky-50">
                  {item.user_id.first_name} {item.user_id.last_name}
                </label>
              </div>
              <div>
                {data._id === item.user_id._id.toString() ? (
                  <Link to={`update-blog/${item._id}`}>
                    <BiDotsHorizontalRounded className="mr-4 text-sky-50 text-2xl" />
                  </Link>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="m-5">
                <img
                  className="drop-shadow-xl w-32 h-32 object-cover"
                  src={item.image}
                  alt={item.user_id.first_name}
                />
              </div>
              <div className="mt-10">
                <span className="text-sky-300 text-base">
                  {item.description}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogCard;
