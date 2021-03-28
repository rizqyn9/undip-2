const mongoose = require('mongoose')

const Inaktif = new mongoose.Schema({
    NoArsip: {
        type: String
    },
    TanggalInput: {
        type: String
    },
    PenciptaArsip: {
        type: String
    },
    UnitPengelolah: {
        type: String
    },
    Indeks: {
        type: String
    },
    NoItemArsip: {
        type: String
    },
    KodeKlasifikasi: {
        type: String
    },
    TanggalSurat: {
        type: String
    },
    Uraian: {
        type: String
    },
    RetensiAktif: {
        type: String
    },
    RetensiInaktif: {
        type: String
    },
    BokArsip: {
        type: String
    },
    Keterangan : {
        type :String
    },
    TingkatPerkembangan : {
        Data1 : {
            type :String
        },
        Data2 : {
            type: String
        },
        Data3 : {
            type: String
        }
    },
    Created_At : {
        type: Date,
        default : Date.now
    },
    Pinjam : {
        type: Boolean,
        default : false
    }
})

module.exports = mongoose.model('DataInaktif',Inaktif)
