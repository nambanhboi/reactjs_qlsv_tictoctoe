const SinhViensDefault = [
    {
        MaSv: '1',
        TenSv: 'Vu Hai Nam',
        NgaySinh: '2003-10-18',
        GioiTinh: 'Nam',
        MaKhoa: 'CNTT'
    },
    {
        MaSv: '2',
        TenSv: 'Pham Thi Kim Dung',
        NgaySinh: '2002-04-14',
        GioiTinh: 'Nữ',
        MaKhoa: 'KT'
    },
]

const KhoasDefault = [
    {
        MaKhoa: 'CNTT',
        TenKhoa: 'Công nghệ thông tin'
    },
    {
        MaKhoa: 'KT',
        TenKhoa: "Kinh tế"
    },
    {
        MaKhoa: 'DTVT',
        TenKhoa: 'Điện tử viễn thông'
    }
]

export default {
    getSinhViens() {
        return JSON.parse(localStorage.getItem('SinhViens')) || SinhViensDefault
    },
    setSinhViens(SinhViens) {
        return localStorage.setItem('SinhViens', JSON.stringify(SinhViens))
    },
    getKhoas() {
        return JSON.parse(localStorage.getItem('Khoas')) || KhoasDefault
    }
}