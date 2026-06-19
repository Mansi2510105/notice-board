
import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Home() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Automatically fetch notices when the component mounts (loads)
  useEffect(() => {
    async function fetchNotices() {
      try {
        const response = await fetch('/api/notices');
        if (!response.ok) {
          throw new Error('Failed to fetch notices');
        }
        const data = await response.json();
        setNotices(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchNotices();
  }, []); // Empty array means this runs exactly ONCE when the page loads

    const handleDelete = async (id) => {
      // 1. Safety Check
      if (!window.confirm("Are you sure you want to delete this notice?")) return;

      try {
        // 2. Call our DELETE API endpoint
        const response = await fetch(`/api/notices/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete the notice');
        }

        // 3. Update the local React state to remove the deleted item instantly
        setNotices((prevNotices) => prevNotices.filter((notice) => notice.id !== id));

      } catch (err) {
        alert(err.message); // Show a simple browser alert if the database fails
      }
    };

    

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Head>
        <title>Notice Board</title>
      </Head>

      {/* Navigation Bar */}
      <nav className="bg-blue-600 text-white shadow-md">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-wide">Campus Notices</h1>
          <button
            onClick={() => window.location.href = '/notices/new'}
            className="bg-white text-blue-600 px-4 py-2 rounded font-semibold hover:bg-blue-50 transition"
          >
            + Create Notice
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-700">Recent Updates</h2>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-10 text-gray-500 italic">Loading notices...</div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-10 text-red-500 font-medium">{error}</div>
        )}

        {/* Empty State */}
        {!loading && !error && notices.length === 0 && (
          <div className="text-center py-10 text-gray-500 italic bg-white rounded-lg border border-gray-200 shadow-sm">
            No notices posted yet. Be the first to add one!
          </div>
        )}

        {/* Notices Grid */}
        {!loading && !error && notices.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {notices.map((notice) => (
              <div
                key={notice.id}
                className={`bg-white p-6 rounded-lg shadow-sm border ${notice.priority === 'Urgent' ? 'border-l-4 border-l-red-500 border-gray-200' : 'border-gray-200'
                  }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded mr-2">
                      {notice.category}
                    </span>
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded ${notice.priority === 'Urgent' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                      {notice.priority}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(notice.publishDate).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-2">{notice.title}</h3>
                <p className="text-gray-600 whitespace-pre-line break-words">{notice.body}</p>

                
                <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end space-x-3 text-sm font-medium">
                  <button
                    onClick={() => window.location.href = `/notices/${notice.id}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(notice.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}