import supabase from '../lib/supabase';
import {
  extractCabinImagePathFromUrl,
  generateCabinImageStoragePath,
  generateCabinImageUrlPath,
} from '../utils/helpers';
import { deleteFile, uploadFile } from './apiFile';

async function getCabins() {
  let { data: cabins, error } = await supabase.from('cabins').select('*');
  if (error) {
    throw error;
  }
  return cabins;
}

// async function getCabin(cabinId) {
//   const { data, error } = await cabinBaseQuery.select('*').eq('id', cabinId);
//   if (error) {
//     throw error;
//   }
//   return data;
// }

async function deleteCabin(cabinId) {
  const { error, data } = await supabase
    .from('cabins')
    .delete()
    .eq('id', cabinId)
    .select()
    .single();
  if (error) {
    throw error;
  }
  const imagePath = extractCabinImagePathFromUrl(data.image);
  if (imagePath) {
    await deleteFile(imagePath);
  }
  return data;
}

async function createCabin(cabinData) {
  let imagePath = '';
  if (cabinData.image && cabinData.image instanceof File) {
    const { data, error: imageUploadError } = await uploadFile({
      file: cabinData.image,
      path: generateCabinImageStoragePath(cabinData.image.name),
    });
    if (imageUploadError) {
      throw new Error('Unable to proceed.Please try again.');
    }
    imagePath = data?.path ? generateCabinImageUrlPath(data.path) : null;
  } else {
    imagePath = cabinData.image ?? null;
  }
  const { error } = await supabase
    .from('cabins')
    .insert([{ ...cabinData, image: imagePath }]);
  if (error) {
    throw error;
  }
}

async function editCabin({ cabinId, cabinDataToUpdate }) {
  let imageUpdatedData = null;
  const { previousImage, ...dataToUpdate } = cabinDataToUpdate;
  if (cabinDataToUpdate.image instanceof File) {
    const previousImagePath = cabinDataToUpdate.previousImage
      ? extractCabinImagePathFromUrl(cabinDataToUpdate.previousImage)
      : null;
    if (previousImagePath) {
      await deleteFile(previousImagePath);
    }
    const { data, error: imageUploadError } = await uploadFile({
      file: cabinDataToUpdate.image,
      path: generateCabinImageStoragePath(cabinDataToUpdate.image.name),
    });
    imageUpdatedData = data;
    if (imageUploadError) {
      throw new Error('Unable to proceed.Please try again.');
    }
  }
  const imagePath = imageUpdatedData?.path
    ? generateCabinImageUrlPath(imageUpdatedData.path)
    : cabinDataToUpdate.image;
  const { data, error } = await supabase
    .from('cabins')
    .update({
      ...dataToUpdate,
      image: imagePath,
    })
    .eq('id', cabinId)
    .select()
    .single();
  if (error) {
    throw error;
  }
  return data;
}

export { getCabins, deleteCabin, createCabin, editCabin };
