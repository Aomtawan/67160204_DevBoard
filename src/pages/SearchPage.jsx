import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PostCard from "../components/PostCard";
import LoadingSpinner from "../components/LoadingSpinner";

function SearchPage() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q") || "";

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPosts() {
            setLoading(true);
            const res = await fetch("https://jsonplaceholder.typicode.com/posts");
            const data = await res.json();
            setPosts(data);
            setLoading(false);
        }

        fetchPosts();
    }, []);

    const filtered = posts.filter((post) =>
        post.title.toLowerCase().includes(query.toLowerCase())
    );

    if (loading) return <LoadingSpinner />;

    return (
        <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
            <h2>
                ผลการค้นหา: <span style={{ color: "#1e40af" }}>{query}</span>
            </h2>

            {filtered.length === 0 && <p>ไม่พบข้อมูล</p>}

            {filtered.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    );
}

export default SearchPage;