import supabase from '../lib/supabase';

export async function uploadFile({ file, path = '/' }) {
  const { data, error } = await supabase.storage
    .from('cabins')
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false,
    });
  if (error) {
    throw new Error('Unable to proceed.Please try again later.');
  }
  return { data, error };
}

export async function deleteFile(...filePaths) {
  const { error } = await supabase.storage.from('cabins').remove(filePaths);
  if (error) {
    throw error;
  }
}
