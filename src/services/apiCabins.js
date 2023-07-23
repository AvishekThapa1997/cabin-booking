import supabase from '../lib/supabase';

async function getCabins() {
  let { data: cabins, error } = await supabase.from('cabins').select('*');
  if (error) {
    throw error;
  }
  return cabins;
}

export { getCabins };
