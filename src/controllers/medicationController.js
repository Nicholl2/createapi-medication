import { MedicationModel } from "../models/medicationModel.js";

export const MedicationController = {
  async getAll(req, res) {
    try {
      const { name, page = 1, limit = 10 } = req.query;
      const meds = await MedicationModel.getAll(
        name,
        parseInt(page),
        parseInt(limit)
      );
      res.json(meds);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const med = await MedicationModel.getById(req.params.id);
      res.json(med);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  },

  async create(req, res) {
    try {
      const payload = req.body;
      const items = Array.isArray(payload) ? payload : [payload];

      for (const item of items) {
        if (item.price == null || item.price <= 0) {
          return res
            .status(400)
            .json({ error: "Price tidak boleh kurang atau sama dengan 0" });
        }
        if (item.quantity == null || item.quantity <= 0) {
          return res
            .status(400)
            .json({ error: "Quantity tidak boleh kurang atau sama dengan 0" });
        }
      }

      const meds = await MedicationModel.create(items);
      res.status(201).json(meds);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const payload = req.body;

      // 🔎 Validasi input tunggal
      if (payload.price == null || payload.price <= 0) {
        return res
          .status(400)
          .json({ error: "Price tidak boleh kurang atau sama dengan 0" });
      }
      if (payload.quantity == null || payload.quantity <= 0) {
        return res
          .status(400)
          .json({ error: "Quantity tidak boleh kurang atau sama dengan 0" });
      }

      const med = await MedicationModel.update(req.params.id, payload);
      res.json(med);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async remove(req, res) {
    try {
      await MedicationModel.remove(req.params.id);
      res.json({ message: "Deleted successfully" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};
