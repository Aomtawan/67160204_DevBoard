import { useState } from "react";

function AddPostForm({ onAddPost }) {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const maxLength = 100;
    const remaining = maxLength - title.length;

    function handleSubmit(e) {
        e.preventDefault();
        if (!title.trim() || !body.trim()) return;

        onAddPost({ title, body });
        setTitle("");
        setBody("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>เพิ่มโพสต์ใหม่</h3>

            <input
                type="text"
                placeholder="หัวข้อโพสต์"
                value={title}
                maxLength={maxLength}
                onChange={(e) => setTitle(e.target.value)}
            />

            <div
                style={{
                    textAlign: "right",
                    fontSize: "0.8rem",
                    color: remaining < 10 ? "#e53e3e" : "#718096",
                }}
            >
                {title.length}/{maxLength}
            </div>

            <textarea
                placeholder="เนื้อหาโพสต์"
                value={body}
                onChange={(e) => setBody(e.target.value)}
            />

            <button type="submit">โพสต์</button>
        </form>
    );
}

export default AddPostForm;
