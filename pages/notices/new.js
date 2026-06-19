
import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import NoticeForm from '../../components/NoticeForm';

export default function CreateNotice() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // This function receives the data from our NoticeForm component
  const handleCreate = async (formData) => {
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/notices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // We must tell the API we are sending JSON
        },
        body: JSON.stringify(formData), // Convert our JavaScript object into a JSON string
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Something went wrong');
      }

      // Success! Redirect the user back to the home page
      router.push('/');
    } catch (err) {
      setError(err.message);
      setIsSubmitting(false); // Stop the loading state so they can try again
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-12">
      <Head>
        <title>Create Notice | Notice Board</title>
      </Head>

      <nav className="bg-blue-600 text-white shadow-md mb-8">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center">
          <button 
            onClick={() => router.push('/')}
            className="mr-4 text-blue-100 hover:text-white transition"
          >
            &larr; Back
          </button>
          <h1 className="text-xl font-bold tracking-wide">Create New Notice</h1>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4">
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded shadow-sm">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}

        <NoticeForm 
          onSubmit={handleCreate} 
          isSubmitting={isSubmitting} 
        />
      </main>
    </div>
  );
}