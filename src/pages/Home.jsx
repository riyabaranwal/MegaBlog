import React, { useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";
import { useNavigate } from "react-router-dom";

function Home() {
  const [posts, setPosts] = React.useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="text-4xl capitalize font-bold text-center pt-40 ">
        <div
          onClick={() => navigate("/login")}
          className="text-4xl cursor-pointer capitalize  font-bold hover:text-gray-500 duration-300"
        >
          Login to read posts
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
