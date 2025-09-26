import { SupplierModel } from "../models/supplierModel.js";

export const SupplierController = {
  async getAll(req, res) {
    try {
      const data = await SupplierModel.getAll();
      res.json(data);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const data = await SupplierModel.getById(req.params.id);
      res.json(data);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async create(req, res) {
    try {
      const suppliers = req.body; // bisa object atau array
      const data = await SupplierModel.create(suppliers);
      res.json({ message: "Insert berhasil", data });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const data = await SupplierModel.update(req.params.id, req.body);
      res.json({ message: "Update berhasil", data });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async remove(req, res) {
    try {
      const result = await SupplierModel.remove(req.params.id);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};
