const mongoose = require('mongoose')

const Inaktif = new mongoose.Schema({
    NoDefinitif: {
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
        default : false,
    },
    DataPinjam: {
        Nama : {
            type: String
        },
        NIP : {
            type: String
        },
        TanggalPinjam : {
            type: String
        }
    },
    Boks :{
        type :String
    }
})

module.exports = mongoose.model('DataInaktif',Inaktif)
