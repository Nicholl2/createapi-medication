import { supabase } from "../config/supabaseClient.js";

export const ReportModel = {
  async getTotals() {
    const { data, error } = await supabase
      .from("medications")
      .select("id, quantity");

    if (error) throw error;

    const totalJenisObat = data.length;
    const totalQuantityObat = data.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    return { totalJenisObat, totalQuantityObat };
  },
};
