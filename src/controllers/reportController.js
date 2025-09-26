import { ReportModel } from "../models/reportModel.js";

export const ReportController = {
  async getTotal(req, res) {
    try {
      const result = await ReportModel.getTotals();
      res.json({
        message: "Berhasil diambil",
        data: result,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
