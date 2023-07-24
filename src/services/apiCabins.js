import supabase from '../lib/supabase';
import { uploadFile } from './apiFile';

async function getCabins() {
  let { data: cabins, error } = await supabase.from('cabins').select('*');
  if (error) {
    throw error;
  }
  return cabins;
}

async function deleteCabin(cabinId) {
  const { error, data } = await supabase
    .from('cabins')
    .delete()
    .eq('id', cabinId);
  if (error) {
    throw error;
  }
  return data;
}

async function createCabin(cabinData) {
  const { data, error: imageUploadError } = await uploadFile({
    file: cabinData.image,
    path: `/${cabinData.image.name}`,
  });
  if (imageUploadError) {
    throw new Error('Unable to proceed.Please try again.');
  }
  const imagePath = data?.path
    ? `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/cabins/${
        data.path
      }`
    : null;
  const { error } = await supabase
    .from('cabins')
    .insert([{ ...cabinData, image: imagePath }]);
  if (error) {
    throw error;
  }
}

export { getCabins, deleteCabin, createCabin };
