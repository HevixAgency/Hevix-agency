import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' })
  }

  try {
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY
    )

    const { nome, empresa, whatsapp, email, faturamento, desafio } = req.body

    const { error } = await supabase
      .from('leads')
      .insert([
        {
          nome,
          empresa,
          whatsapp,
          email,
          faturamento,
          desafio
        }
      ])

    if (error) {
      console.error(error)
      return res.status(500).json({ error: error.message })
    }

    return res.status(200).json({ message: 'Lead salvo com sucesso' })

  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Erro interno' })
  }
}