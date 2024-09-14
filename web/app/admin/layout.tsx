import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="admin-layout">
            <nav className="admin-sidebar">
                <ul>
                    <li>
                        <Link href="/admin/products">Manage Products</Link>
                    </li>
                    <li>
                        <Link href="/admin/categories">Manage Categories</Link>
                    </li>
                </ul>
            </nav>
            <main className="admin-content">
                {children}
            </main>
            <style jsx>{`
                .admin-layout {
                    display: flex;
                }
                .admin-sidebar {
                    width: 200px;
                    background: #f4f4f4;
                    padding: 20px;
                }
                .admin-content {
                    flex-grow: 1;
                    padding: 20px;
                }
            `}</style>
        </div>
    );
}
