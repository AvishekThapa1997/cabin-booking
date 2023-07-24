import supabase from '../lib/supabase';

export async function uploadFile({ file, path = '/' }) {
  console.log(path);
  const { data, error } = await supabase.storage
    .from('cabins')
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false,
    });
  if (error) {
    console.log(error);
    throw error;
  }
  return { data, error };
}
