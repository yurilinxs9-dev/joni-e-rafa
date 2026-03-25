import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

/*
  ===== CONFIGURAÇÃO DO SUPABASE =====

  1. Crie um projeto em https://supabase.com
  2. Crie um arquivo .env na raiz do projeto:

     VITE_SUPABASE_URL=https://seu-projeto.supabase.co
     VITE_SUPABASE_ANON_KEY=sua-chave-anon

  3. Execute este SQL no SQL Editor do Supabase:

  -- Tabela de confirmações de presença
  CREATE TABLE rsvps (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nome TEXT NOT NULL,
    telefone TEXT NOT NULL,
    confirma_presenca TEXT NOT NULL CHECK (confirma_presenca IN ('Sim', 'Não')),
    created_at TIMESTAMPTZ DEFAULT NOW()
  );

  -- Habilitar RLS
  ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;

  -- Permitir inserção pública (para o formulário do site)
  CREATE POLICY "Permitir inserção pública" ON rsvps
    FOR INSERT WITH CHECK (true);

  -- Permitir leitura apenas para usuários autenticados (admin)
  CREATE POLICY "Leitura apenas para autenticados" ON rsvps
    FOR SELECT USING (auth.role() = 'authenticated');

*/
