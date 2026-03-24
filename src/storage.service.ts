import { supabase } from './supabase.service';

export async function uploadCover(file: File) {

  const fileName = 'cover.jpg';

  const { error } = await supabase.storage
    .from('covers')
    .upload(fileName, file, {
      upsert: true
    });

  if (error) throw error;

  const { data } = supabase.storage
    .from('covers')
    .getPublicUrl(fileName);

  return data.publicUrl;
}
