
import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  // Extract the ID directly from the URL (e.g., /api/notices/123)
  const { id } = req.query;

  // --- UPDATE A NOTICE (PUT) ---
  if (req.method === 'PUT') {
    try {
      const { title, body, category, priority } = req.body;

      // Update the specific notice in the database
      const updatedNotice = await prisma.notice.update({
        where: { id: String(id) },
        data: { title, body, category, priority },
      });

      return res.status(200).json(updatedNotice);
    } catch (error) {
      console.error("Update error:", error);
      return res.status(500).json({ error: 'Failed to update notice.' });
    }
  } 
  
  // --- DELETE A NOTICE (DELETE) ---
  else if (req.method === 'DELETE') {
    try {
      // Delete the specific notice
      await prisma.notice.delete({
        where: { id: String(id) },
      });

      // 204 means "No Content" (successfully deleted, nothing to return)
      return res.status(204).end();
    } catch (error) {
      console.error("Delete error:", error);
      return res.status(500).json({ error: 'Failed to delete notice.' });
    }
  } 
  
  // --- METHOD NOT ALLOWED ---
  else {
    res.setHeader('Allow', ['PUT', 'DELETE']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}