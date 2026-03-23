import { useState, useEffect } from "react";
import PostCard from "./PostCard";
import LoadingSpinner from "./LoadingSpinner";
import { useFavorites } from "../context/FavoritesContext"; // ✅ เพิ่ม

function PostList() {
    const { favorites, toggleFavorite } = useFavorites(); // ✅ ใช้ context
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 10;


    async function fetchPosts() {
        try {
            setLoading(true);
            setError(null);

            const res = await fetch("https://jsonplaceholder.typicode.com/posts");
            if (!res.ok) throw new Error("ดึงข้อมูลไม่สำเร็จ");

            const data = await res.json();
            setPosts(data.slice(0, 20));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        fetchPosts();
    }, []);

 
    const filtered = posts.filter((post) =>
        post.title.toLowerCase().includes(search.toLowerCase())
    );

  
    const startIndex = (currentPage - 1) * postsPerPage;
    const currentPosts = filtered.slice(
        startIndex,
        startIndex + postsPerPage
    );
    const totalPages = Math.ceil(filtered.length / postsPerPage);


    useEffect(() => {
        setCurrentPage(1);
    }, [search]);


    if (loading) return <LoadingSpinner />;


    if (error)
        return (
            <div style={{
                padding: "1.5rem",
                background: "#fff5f5",
                border: "1px solid #fc8181",
                borderRadius: "8px",
                color: "#c53030",
            }}>
                เกิดข้อผิดพลาด: {error}
            </div>
        );

    return (
        <div>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2>โพสต์ล่าสุด</h2>
                <button onClick={fetchPosts}>
                    🔄 โหลดใหม่
                </button>
            </div>

            {/* Search */}
            <input
                type="text"
                placeholder="ค้นหาโพสต์..."
                value={search}
      
              onChange={(e) => setSearch(e.target.value)}
            />

            {/* Posts */}
            {currentPosts.map((post) => (
                <PostCard
                    key={post.id}
                    post={post}
                    isFavorite={favorites.includes(post.id)} // ✅ ตอนนี้ไม่พังแล้ว
                    onToggleFavorite={() => toggleFavorite(post.id)} // ✅ ใช้ context
                />
            ))}

            {/* Pagination */}
            <div>
                <button
                    onClick={() => setCurrentPage((p) => p - 1)}
                    disabled={currentPage === 1}
                >
                    ← ก่อนหน้า
                </button>

                <span>
                    หน้า {currentPage} / {totalPages}
                </span>

                <button
                    onClick={() => setCurrentPage((p) => p + 1)}
                    disabled={currentPage === totalPages}
                >
                    ถัดไป →
                </button>
            </div>
        </div>
    );
}

export default PostList;
