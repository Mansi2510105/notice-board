
import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import NoticeForm from '../../components/NoticeForm';
import prisma from '../../lib/prisma'; // We can use Prisma directly on the server!

export default function EditNotice({ notice }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // The function to handle the PUT request
  const handleUpdate = async (formData) => {
    setIsSubmitting(true);
    setError('');

    try {
      // Notice the method is PUT, and we are targeting the specific notice ID
      const response = await fetch(`/api/notices/${notice.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update notice');
      }

      // Success! Send them back home
      router.push('/');
    } catch (err) {
      setError(err.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-12">
      <Head>
        <title>Edit Notice | Notice Board</title>
      </Head>

      <nav className="bg-blue-600 text-white shadow-md mb-8">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center">
          <button 
            onClick={() => router.push('/')}
            className="mr-4 text-blue-100 hover:text-white transition"
          >
            &larr; Back
          </button>
          <h1 className="text-xl font-bold tracking-wide">Edit Notice</h1>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4">
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded shadow-sm">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}

        {/* We pass the existing notice data into initialData! */}
        <NoticeForm 
          initialData={notice}
          onSubmit={handleUpdate} 
          isSubmitting={isSubmitting} 
        />
      </main>
    </div>
  );
}

// --- SERVER-SIDE CODE ---
// This function runs on the server BEFORE the page renders
export async function getServerSideProps(context) {
  const { id } = context.params; // Get the ID from the URL

  // Talk directly to the database
  const notice = await prisma.notice.findUnique({
    where: { id: String(id) },
  });

  // If the notice doesn't exist (e.g., someone typed a fake ID in the URL), return a 404 page
  if (!notice) {
    return { notFound: true };
  }

  // Pass the data to our React component
  return {
    props: {
      notice: {
        ...notice,
        // Convert Date objects to strings
        publishDate: notice.publishDate.toISOString(),
        createdAt: notice.createdAt.toISOString(),
        updatedAt: notice.updatedAt.toISOString(),
      }
    }
  };
}