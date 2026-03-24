import { supabase } from './supabase.service';

export async function getConfig() {
  const { data, error } = await supabase
    .from('landing_config')
    .select('*')
    .single();

  if (error) throw error;

  return data;
}

export async function updateConfig(id: string, payload: any) {
  const { error } = await supabase
    .from('landing_config')
    .update(payload)
    .eq('id', id);

  if (error) throw error;
}
