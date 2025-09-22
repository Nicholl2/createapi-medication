import { MedicationModel } from "../models/medicationModel.js";

// Helper function untuk validasi data medication
function validateMedicationData(data) {
  const { quantity, price } = data;

  // Validasi quantity
  if (quantity !== undefined && quantity !== null) {
    const qty = parseFloat(quantity);
    if (isNaN(qty) || qty < 0) {
      return "Quantity must be a valid number and cannot be less than 0";
    }
  }

  // Validasi price
  if (price !== undefined && price !== null) {
    const prc = parseFloat(price);
    if (isNaN(prc) || prc < 0) {
      return "Price must be a valid number and cannot be less than 0";
    }
  }

  return null; // Tidak ada error
}

export const MedicationController = {
  async getAll(req, res) {
    try {
      // Ambil query parameters untuk searching dan pagination
      const { name, page = 1, limit = 10 } = req.query;
      

      // Validasi page dan limit
      const pageNum = parseInt(page);
      const limitNum = parseInt(limit);

      if (pageNum < 1 || limitNum < 1) {
        return res.status(400).json({
          error: "Page and limit must be positive numbers",
        });
      }

      // Hitung offset untuk pagination
      const offset = (pageNum - 1) * limitNum;

      // Panggil model dengan parameter searching dan pagination
      const result = await MedicationModel.getAll({
        name,
        limit: limitNum,
        offset,
      });

      // Response dengan data dan metadata pagination
      res.json({
        data: result.medications,
        pagination: {
          currentPage: pageNum,
          limit: limitNum,
          totalItems: result.totalCount,
          totalPages: Math.ceil(result.totalCount / limitNum),
          hasNext: pageNum < Math.ceil(result.totalCount / limitNum),
          hasPrev: pageNum > 1,
        },
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const med = await MedicationModel.getById(req.params.id);
      if (!med) {
        return res.status(404).json({ error: "Medication not found" });
      }
      res.json(med);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  },

  async getTotal(req, res) {
    try {
      const total = await MedicationModel.getTotal();
      res.json({ total });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  

  async create(req, res) {
    try {
      // Validasi stok dan harga
      const validationError = validateMedicationData(req.body);
      if (validationError) {
        return res.status(400).json({ error: validationError });
      }

      const med = await MedicationModel.create(req.body);
      res.status(201).json(med);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      // Validasi stok dan harga
      const validationError = validateMedicationData(req.body);
      if (validationError) {
        return res.status(400).json({ error: validationError });
      }

      const med = await MedicationModel.update(req.params.id, req.body);
      if (!med) {
        return res.status(404).json({ error: "Medication not found" });
      }
      res.json(med);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async remove(req, res) {
    try {
      const result = await MedicationModel.remove(req.params.id);
      if (!result) {
        return res.status(404).json({ error: "Medication not found" });
      }
      res.json({ message: "Deleted successfully" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};
