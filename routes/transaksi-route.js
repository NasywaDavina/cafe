const express = require(`express`)
const app = express()

app.use(express.json())

const transaksiController = require(`../controllers/transaksi-controller`)

app.get(`/transaksi`, transaksiController.getTransaksi)
app.post(`/transaksi`, transaksiController.addTransaksi)
app.put(`/transaksi/:id_transaksi`, transaksiController.updateTransaksi)
app.delete(`/transaksi/:id_transaksi`, transaksiController.deleteTransaksi)

module.exports = app