const express = require(`express`)
const app = express()

app.use(express.json())

const mejaController = require(`../controllers/meja-controller`)

app.get(`/meja`, mejaController.getMeja)
app.get(`/available`, mejaController.availableMeja)
app.post(`/meja`, mejaController.addMeja)
app.put(`/meja/:id_meja`, mejaController.updateMeja)
app.delete(`/meja/:id_meja`, mejaController.deleteMeja)

module.exports = app