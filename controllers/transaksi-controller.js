const transaksiModel = require(`../models/index`).transaksi
const detailModel = require(`../models/index`).detail_transaksi
const menuModel = require(`../models/index`).menu

exports.addTransaksi = async (request, response) => {
    try {
        let transaksi = {
            tgl_transaksi: request.body.tgl_transaksi,
            id_user: request.body.id_user,
            id_meja: request.body.id_meja,
            nama_pelanggan: request.body.nama_pelanggan,
            status: request.body.status
        }
        let insertTransaksi = await transaksiModel.create(transaksi)

        let transaksiID = insertTransaksi.id_transaksi
        let arrayDetail = request.body.detail_transaksi
        for (let i = 0; i < arrayDetail.length; i++) {
            arrayDetail[i].id_transaksi = transaksiID
            let menu = await menuModel.findOne({ where: { id_menu: arrayDetail[i].id_menu } })
            arrayDetail[i].harga = menu?.harga
        }
        await detailModel.bulkCreate(arrayDetail)
        return response.json({
            status: true,
            message: `Data transaksi berhasil ditambahkan`
        })
    } catch (error) {
        return response.json({
            status: false,
            messsage: error.messsage
        })
    }
}
exports.updateTransaksi = async (request, response) => {
    try {
        let id_transaksi = request.params.id_transaksi
        let newData = {
            tgl_transaksi: request.body.tgl_transaksi,
            id_user: request.body.id_user,
            id_meja: request.body.id_meja,
            nama_pelanggan: request.body.nama_pelanggan,
            status: request.body.status
        }
        await transaksiModel.update(newData, { where: { id_transaksi: id_transaksi } })
        await detailModel.destroy({ where: { id_transaksi: id_transaksi } })
        let arrayDetail = request.body.detail_transaksi
        for (let i = 0; i < arrayDetail.length; i++) {
            arrayDetail[i].id_transaksi = id_transaksi
            let menu = await menuModel.findOne({ where: { id_menu: arrayDetail[i].id_menu } })
            arrayDetail[i].harga = menu?.harga
        }
        await detailModel.bulkCreate(arrayDetail)
        return response.json({
            status: true,
            message: `Data transaksi berhasil diubah`
        })
    } catch (error) {
        return response.json({
            status: false,
            message: error.message
        })
    }
}
exports.deleteTransaksi = async (request, response) => {
    try {
        let id_transaksi = request.params.id_transaksi
        await detailModel.destroy({ where: { id_transaksi: id_transaksi } })
        await transaksiModel.destroy({ where: { id_transaksi: id_transaksi } })
        return response.json({
            status: true,
            message: `Data transaksi berhasil dihapus`
        })
    } catch (error) {
        return response.json({
            status: false,
            message: error.message
        })
    }
}
exports.getTransaksi = async (request, response) => {
    try {
        let result = await transaksiModel.findAll({
            include: [
                "meja", "user", {
                    model: detailModel,
                    as: "detail_transaksi",
                    include: ["menu"]
                }
            ]
        })
        return response.json({
            status: true,
            data: result
        })
    } catch (error) {
        return response.json({
            status: false,
            message: error.message
  })
}
}