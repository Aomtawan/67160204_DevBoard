import PostCard from "./PostCard";
import PostCount from "./PostCount";

function PostList({ posts }) {
    return (
        <div>
            <h2
                style={{
                    color: "#2d3748",
                    borderBottom: "2px solid #1e40af",
                    paddingBottom: "0.5rem",
                }}
            >
                โพสต์ล่าสุด
            </h2>
            {/* นับจำนวน array */}
            <PostCount count={posts.length} /> 

            {posts.map((post) => (
                <PostCard key={post.id} title={post.title} body={post.body} />
            ))}
        </div>
    );
}

export default PostList;
