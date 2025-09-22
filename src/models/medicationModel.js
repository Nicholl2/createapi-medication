import { supabase } from "../config/supabaseClient.js";

export const MedicationModel = {
  async getAll(options = {}) {
    const { name, limit = 10, offset = 0 } = options;
    
    try {
      // Query untuk mengambil data dengan filtering dan pagination
      let query = supabase
        .from("medications")
        .select(
          "id, sku, name, description, price, quantity, category_id, supplier_id",
          { count: 'exact' }
        );

      // Jika ada parameter name untuk searching
      if (name) {
        query = query.ilike('name', `%${name}%`);
      }

      // Tambahkan ordering, limit dan offset untuk pagination
      query = query
        .order('name', { ascending: true })
        .range(offset, offset + limit - 1);

      const { data, error, count } = await query;

      if (error) throw error;

      return {
        medications: data || [],
        totalCount: count || 0
      };
    } catch (error) {
      throw new Error(`Failed to fetch medications: ${error.message}`);
    }
  },

  async getTotal() {
    try {
      const { count, error } = await supabase
        .from("medications")
        .select("*", { count: "exact", head: true });
  
      if (error) throw error;
  
      return count || 0;
    } catch (error) {
      throw new Error(`Failed to fetch total medications: ${error.message}`);
    }
  },
  

  async getById(id) {
    const { data, error } = await supabase
      .from("medications")
      .select(
        `
        id, sku, name, description, price, quantity,
        categories ( id, name ),
        suppliers ( id, name, email, phone )
      `
      )
      .eq("id", id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        return null; // Data tidak ditemukan
      }
      throw error;
    }
    return data;
  },

  async create(payload) {
    const { data, error } = await supabase
      .from("medications")
      .insert([payload])
      .select();
    if (error) throw error;
    return data[0];
  },

  async update(id, payload) {
    const { data, error } = await supabase
      .from("medications")
      .update(payload)
      .eq("id", id)
      .select();
    
    if (error) throw error;
    
    // Jika tidak ada data yang diupdate, berarti ID tidak ditemukan
    if (!data || data.length === 0) {
      return null;
    }
    
    return data[0];
  },

  async remove(id) {
    const { data, error } = await supabase
      .from("medications")
      .delete()
      .eq("id", id)
      .select('id');
    
    if (error) throw error;
    
    // Jika tidak ada data yang dihapus, berarti ID tidak ditemukan
    if (!data || data.length === 0) {
      return null;
    }
    
    return { success: true };
  },
};
