
import prisma from '../../lib/prisma';

export default async function handler(req, res) {
  // --- CREATE A NOTICE (POST) ---
  if (req.method === 'POST') {
    try {
      const { title, body, category, priority } = req.body;

      if (!title || !body || !category || !priority) {
        return res.status(400).json({ error: 'All fields are required.' });
      }

      const newNotice = await prisma.notice.create({
        data: { title, body, category, priority },
      });

      return res.status(201).json(newNotice);
    } catch (error) {
      console.error("Database error:", error);
      return res.status(500).json({ error: 'Failed to create notice.' });
    }
  } 
  
  // --- FETCH ALL NOTICES (GET) ---
  else if (req.method === 'GET') {
    try {
      // Find all notices and order them
      const notices = await prisma.notice.findMany({
        orderBy: [
          { priority: 'desc' }, 
          { createdAt: 'desc' } 
        ]
      });

      return res.status(200).json(notices);
    } catch (error) {
      console.error("Database error:", error);
      return res.status(500).json({ error: 'Failed to fetch notices.' });
    }
  } 
  
  // --- METHOD NOT ALLOWED ---
  else {
    // Update the allowed headers to include GET
    res.setHeader('Allow', ['POST', 'GET']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}