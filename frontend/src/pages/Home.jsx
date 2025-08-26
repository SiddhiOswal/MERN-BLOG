import { useState, useEffect } from "react";

function Home() {

  // state to manage post
  const [post, setPost] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // fetch request
        const res = await fetch("/api/post/get-posts",
          {
            method: "GET",
          });
        // res to json
        const result = await res.json();

        setPost(result?.data?.allPosts); //update post state

        
        // manage post state

      } catch (error) {
        console.log("error while fetching post", error);
        return;

      }
    };

    // call function
    fetchPost();

  }, []);

  return (
    <div className=" min-h-screen bg-gray-400">
      <div className="container mx-auto px-4 py-6">
        {post && post.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {post.map((post, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-xl overflow-hidden border hover:shadow-lg transition"
              >
                {post?.postImage && (
                  <img
                    src={post.postImage}
                    alt={post.title}
                    className="w-full h-100 object-cover"
                  />
                )}
                <div className="p-4 space-y-2">
                  <h1 className="text-2xl font-semibold text-gray-800 text-justify">
                    {post.title}
                  </h1>
                  <p className="text-gray-600 text-xl text-justify">{post.content}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <h1 className="text-xl font-semibold text-gray-500">
              No post available
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;


