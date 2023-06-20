import { useStore, actions } from "../../store";
import '../../assets/css/qlsv.css'
import { useState } from "react";

function Qlsv() {
    const [state, dispatch] = useStore();
    const { SinhViens, Khoas } = state;

    const [MaSv, setMasv] = useState('')
    const [TenSv, setTensv] = useState('')
    const [NgaySinh, setNgaysinh] = useState('');
    const [GioiTinh, setGioitinh] = useState('Nam')
    const [MaKhoa, setMakhoa] = useState('CNTT')
    const [arrDelete, setArrDelete] = useState([])
    const [checkedAll, setCheckedAll] = useState(false)
    const [inputSearch, setInputSearch] = useState('')
    const [sinhVienSearch, setSinhVienSearch] = useState([])

    let TenKhoas = {}
    SinhViens.forEach(sv => {
        const index = Khoas.findIndex(khoa => khoa.MaKhoa === sv.MaKhoa)
        TenKhoas[sv.MaSv] = Khoas[index].TenKhoa   
    })
    console.log(TenKhoas)
    const data = {
        MaSv, TenSv, NgaySinh, GioiTinh, MaKhoa
    }
    console.log(data)
    const handleAddSV = () => dispatch(actions.addSinhVien(data))

    const handleDeleteSV = (MaSv) => {
        console.log('xóa')
        dispatch(actions.deleteSinhVien([MaSv]))
    }
    const handleFillInput = (masv) => {
        const sinhvien = SinhViens.filter(sv => sv.MaSv === masv)[0]
        console.log(sinhvien)
        setMasv(sinhvien.MaSv);
        setTensv(sinhvien.TenSv)
        setNgaysinh(sinhvien.NgaySinh)
        setGioitinh(sinhvien.GioiTinh)
        setMakhoa(sinhvien.MaKhoa)
    }
    const handleEditSV = () => dispatch(actions.editSinhVien(data))

    const handleRefresh = () => {
        setMasv('');
        setTensv('')
        setNgaysinh('')
        setGioitinh('Nam')
        setMakhoa('CNTT')
    
    }

    const changeChecked = (masv) => {
        if(arrDelete.includes(masv)) {
            setArrDelete(arrDelete.filter(arr => arr !== masv))
        } else {
            setArrDelete([...arrDelete, masv])
        }
    }
    console.log(arrDelete)

    const changeCheckedAll = () => {
        if(checkedAll) {
            setArrDelete([])
        }
        else {
            const arrMasv = SinhViens.map(sv => sv.MaSv)
            setArrDelete(arrMasv)
            
        }
        setCheckedAll(!checkedAll)
    }
    
    const handleDeleteSVs = () => {
        dispatch(actions.deleteSinhVien(arrDelete))
    }

    const handleSearchSV = () => {
        const newSinhViens = SinhViens.filter(sv => {
            return sv.TenSv.toUpperCase().includes(inputSearch.toUpperCase()) ||
            sv.MaSv.toUpperCase().includes(inputSearch.toUpperCase()) ||
            sv.NgaySinh.toUpperCase().includes(inputSearch.toUpperCase()) ||
            sv.GioiTinh.toUpperCase().includes(inputSearch.toUpperCase()) ||
            sv.MaKhoa.toUpperCase().includes(inputSearch.toUpperCase())
    
        })
        setSinhVienSearch(newSinhViens)       
        console.log(sinhVienSearch)       
    }
    const changeInputSearch = (e) => {
        setInputSearch(e.target.value)
        if(e.target.value === '') {
            setSinhVienSearch([])
        } 
    }

    return (
        <div className="container">
            <h1>Quản lý Sinh viên</h1>
            <div className="search border">
                <span>Từ khóa: </span>
                <input type="text" value={inputSearch} onChange={(e) => changeInputSearch(e)}/>
                <button onClick={() => handleSearchSV()}>Tìm kiếm</button>
            </div>
    
            <div className="display_info border">
                <table border="1">
                    <thead>
                        <tr>
                            <th>
                                <input type="checkbox" checked={checkedAll} onChange={() => changeCheckedAll()}/>
                            </th>
                            <th>Mã SV</th>
                            <th>Tên SV</th>
                            <th>Ngày sinh</th>
                            <th>Giới tính</th>
                            <th>Khoa</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody id="table_sv">
                        {SinhViens &&
                            (sinhVienSearch.length ? sinhVienSearch : SinhViens).map((sinhvien, index) => (
                                <tr key={index}>
                                    <td><input type="checkbox" checked={arrDelete.includes(sinhvien.MaSv)} onChange={() => changeChecked(sinhvien.MaSv)}/></td>
                                    <td>{sinhvien.MaSv}</td>
                                    <td>{sinhvien.TenSv}</td>
                                    <td>{sinhvien.NgaySinh}</td>
                                    <td>{sinhvien.GioiTinh}</td>
                                    <td>{TenKhoas[sinhvien.MaSv]}</td>
                                    <td><i className="bi bi-pen edit" onClick={() => handleFillInput(sinhvien.MaSv)}></i></td>
                                    <td><i className="bi bi-trash3 delete" onClick={() => handleDeleteSV(sinhvien.MaSv)}></i></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>   
            </div>
            <div className="edit_info border" >
                <div className="buttons">
                    <button onClick={() => handleAddSV()}>Thêm mới</button>
                    <button onClick={() => handleEditSV()}>Cập nhật</button>
                    <button onClick={() => handleRefresh()}>Làm mới</button>
                    <button onClick={() => handleDeleteSVs()}>Xóa</button>
                </div>
                <div className="enter_info">
                    <div className="detail_info">
                        <label>Mã SV</label>
                        <input type="text" value={MaSv} onChange={(e) => setMasv(e.target.value)}/>
                    </div>
                    <div className="detail_info">
                        <label>Tên SV</label>
                        <input type="text" value={TenSv} onChange={e => setTensv(e.target.value)}/>
                    </div>
                    <div className="detail_info">
                        <label>Ngày sinh</label>
                        <input type="date" value={NgaySinh} onChange={e => setNgaysinh(e.target.value)}/>
                    </div>
                    <div className="detail_info">
                        <label>Giới tính</label>
                        <div>
                            <label >Nam</label>
                            <input type="radio" value="Nam" name="rdbGioiTinh" checked={GioiTinh==='Nam'} onChange={e => setGioitinh(e.target.value)}/>
                            <label>Nữ</label>
                            <input type="radio" value="Nữ" name="rdbGioiTinh" checked={GioiTinh==='Nữ'} onChange={e => setGioitinh(e.target.value)}/>
                        </div>
                    </div>
                    <div className="detail_info">
                        <label>Khoa</label>
                        <select name="drpKhoa" value={MaKhoa} onChange={e => setMakhoa(e.target.value)}>
                            {Khoas.map((khoa, index) => (
                                <option value={khoa.MaKhoa} key={index}>{khoa.TenKhoa}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Qlsv;