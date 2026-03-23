import { Link } from "react-router-dom";

function NotFoundPage() {
    return (
        <div
            style={{
                textAlign: "center",
                marginTop: "4rem",
            }}
        >
            <h1 style={{ fontSize: "3rem", color: "#e53e3e" }}>404</h1>
            <p style={{ fontSize: "1.2rem", color: "#4a5568" }}>
                ไม่พบหน้าที่คุณต้องการ
            </p>

            <Link
                to="/"
                style={{
                    display: "inline-block",
                    marginTop: "1rem",
                    color: "#1e40af",
                    textDecoration: "none",
                }}
            >
                ← กลับหน้าหลัก
            </Link>
        </div>
    );
}

export default NotFoundPage;