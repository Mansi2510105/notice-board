
import { useState } from 'react';

export default function NoticeForm({ initialData, onSubmit, isSubmitting }) {
  // If initialData exists (we are editing), use it. Otherwise, default to empty/standard values.
  const [title, setTitle] = useState(initialData?.title || '');
  const [body, setBody] = useState(initialData?.body || '');
  const [category, setCategory] = useState(initialData?.category || 'General');
  const [priority, setPriority] = useState(initialData?.priority || 'Normal');

  const handleSubmit = (e) => {
    // Prevent the default HTML form behavior (which refreshes the entire page)
    e.preventDefault();
    
    // Pass the gathered data back up to whatever page is using this form
    onSubmit({ title, body, category, priority });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      
      {/* Title Input */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="shadow-sm appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="E.g., Midterm Exam Schedule"
        />
      </div>

      {/* Body Input */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Notice Details</label>
        <textarea
          required
          rows="5"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="shadow-sm appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Provide the details here..."
        />
      </div>

      {/* Category & Priority Dropdowns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="shadow-sm border border-gray-300 rounded w-full py-2 px-3 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="General">General</option>
            <option value="Event">Event</option>
            <option value="Exam">Exam</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="shadow-sm border border-gray-300 rounded w-full py-2 px-3 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Normal">Normal</option>
            <option value="Urgent">Urgent</option>
          </select>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline transition-colors ${
            isSubmitting 
              ? 'bg-blue-300 cursor-not-allowed text-white' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isSubmitting ? 'Saving...' : 'Save Notice'}
        </button>
      </div>
    </form>
  );
}