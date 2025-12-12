import { createClient } from '@supabase/supabase-js';

// Configuração do Supabase
// Usamos as chaves fornecidas para conectar ao seu projeto.
const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || "https://xpdjsuuodoievwvkgiru.supabase.co";
const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhwZGpzdXVvZG9pZXZ3dmtnaXJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU0MjE4MDQsImV4cCI6MjA4MDk5NzgwNH0.eP65TKYfjrLAkPKdgaFkpCAUxCrZJBiLOO-E0eHyi30";

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("ERRO CRÍTICO: Credenciais do Supabase não encontradas.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);