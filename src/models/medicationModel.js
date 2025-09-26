import { supabase } from "../config/supabaseClient.js";

export const MedicationModel = {
  async getAll(name, page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const to = offset + (limit - 1);

    let query = supabase
      .from("medications")
      .select(
        "id, sku, name, description, price, quantity, category_id, supplier_id",
        { count: "exact" }
      );

    if (name) {
      query = query.ilike("name", `%${name}%`);
    }
    const start = (page - 1) * limit;
    const end = start + limit - 1;

    const { data, error, count } = await query.range(start, end); // count sudah ada

    if (error) throw error;
    return {
      data,
      pagination: {
        total: count || 0,
        page,
        limit,
        totalPages: count ? Math.ceil(count / limit) : 0,
      },
    };
  },

  async getById(id) {
    const { data, error } = await supabase
      .from("medications")
      .select(
        `id, sku, name, description, price, quantity, 
         categories ( id, name ), 
         suppliers ( id, name, email, phone )`
      )
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  },

  async create(payload) {
    // bisa array atau object
    const items = Array.isArray(payload) ? payload : [payload];

    const { data, error } = await supabase
      .from("medications")
      .insert(items)
      .select();

    if (error) throw error;
    return data;
  },

  async update(id, payload) {
    const { data, error } = await supabase
      .from("medications")
      .update(payload)
      .eq("id", id)
      .select();
    if (error) throw error;
    return data[0];
  },

  async remove(id) {
    const { error } = await supabase.from("medications").delete().eq("id", id);
    if (error) throw error;
    return { success: true };
  },
};
