// @ts-ignore
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY as string;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface LeadData {
  nome: string;
  empresa: string;
  whatsapp: string;
  email: string;
  faturamento: string;
  desafio: string;
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { nome, empresa, whatsapp, email, faturamento, desafio }: LeadData = req.body;

  if (!nome || !empresa || !whatsapp || !email || !faturamento || !desafio) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const { data, error } = await supabase
      .from('leads')
      .insert([
        {
          nome,
          empresa,
          whatsapp,
          email,
          faturamento,
          desafio,
        },
      ]);

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Failed to insert lead' });
    }

    res.status(200).json({ success: true, data });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}