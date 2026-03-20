import { useState, useEffect } from "react";
import PostCard from "./PostCard";
import LoadingSpinner from "./LoadingSpinner";

function PostList({ favorites, onToggleFavorite }) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");

    // ✅ Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 10;

    // ✅ fetch function (ใช้ซ้ำได้)
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

    // ✅ โหลดครั้งแรก
    useEffect(() => {
        fetchPosts();
    }, []);

    // ✅ filter search
    const filtered = posts.filter((post) =>
        post.title.toLowerCase().includes(search.toLowerCase()),
    );

    // ✅ คำนวณ pagination
    const startIndex = (currentPage - 1) * postsPerPage;
    const currentPosts = filtered.slice(
        startIndex,
        startIndex + postsPerPage,
    );
    const totalPages = Math.ceil(filtered.length / postsPerPage);

    // ✅ reset หน้าเมื่อ search
    useEffect(() => {
        setCurrentPage(1);
    }, [search]);

    // ✅ loading
    if (loading) return <LoadingSpinner />;

    // ✅ error
    if (error)
        return (
            <div
                style={{
                    padding: "1.5rem",
                    background: "#fff5f5",
                    border: "1px solid #fc8181",
                    borderRadius: "8px",
                    color: "#c53030",
                }}
            >
                เกิดข้อผิดพลาด: {error}
            </div>
        );

    return (
        <div>
            {/* 🔥 Header + Reload */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <h2
                    style={{
                        color: "#2d3748",
                        borderBottom: "2px solid #1e40af",
                        paddingBottom: "0.5rem",
                        margin: 0,
                    }}
                >
                    โพสต์ล่าสุด
                </h2>

                <button
                    onClick={fetchPosts}
                    disabled={loading}
                    style={{
                        border: "1px solid #e2e8f0",
                        background: "white",
                        padding: "0.25rem 0.75rem",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                >
                    {loading ? "⏳ กำลังโหลด..." : "🔄 โหลดใหม่"}
                </button>
            </div>

            {/* 🔍 Search */}
            <input
                type="text"
                placeholder="ค้นหาโพสต์..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                    width: "100%",
                    padding: "0.5rem 0.75rem",
                    border: "1px solid #cbd5e0",
                    borderRadius: "6px",
                    fontSize: "1rem",
                    margin: "1rem 0",
                    boxSizing: "border-box",
                }}
            />

            {/* ❌ ไม่พบ */}
            {filtered.length === 0 && (
                <p style={{ color: "#718096", textAlign: "center", padding: "2rem" }}>
                    ไม่พบโพสต์ที่ค้นหา
                </p>
            )}

            {/* 📄 Post List */}
            {currentPosts.map((post) => (
                <PostCard
                    key={post.id}
                    post={post}
                    isFavorite={favorites.includes(post.id)}
                    onToggleFavorite={() => onToggleFavorite(post.id)}
                />
            ))}

            {/* 🔢 Pagination */}
            {filtered.length > 0 && (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "1rem",
                        marginTop: "1rem",
                    }}
                >
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
            )}
        </div>
    );
}

export default PostList;
