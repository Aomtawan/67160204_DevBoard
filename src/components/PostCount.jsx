function PostCount({ count }) {
    return (
        <p
        style={{
            margin: "0.5rem 0 1rem",
            color: "#4a5568",
            fontSize: "0.9rem",
        }}
        >
            โพสต์ทั้งหมด: {count} รายการ
        </p>
    );
}

export default PostCount;