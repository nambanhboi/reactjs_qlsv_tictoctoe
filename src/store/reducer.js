
import storage from "../utils/storage";
import { ADD_SINH_VIEN, DELETE_SINH_VIEN, EDIT_SINH_VIEN } from "./constants";

const Khoas = storage.getKhoas()
const SinhViens = storage.getSinhViens();

const initState = {
    SinhViens,
    Khoas,
}

let newSinhViens;
function reducer(state, action) {
    switch (action.type) {
        default:
            throw new Error('invalid action')
        case ADD_SINH_VIEN:
            newSinhViens = [...state.SinhViens, action.payload]
            storage.setSinhViens(newSinhViens)
            return {
                ...state,
                SinhViens: newSinhViens
            }
        case DELETE_SINH_VIEN:
            newSinhViens = state.SinhViens.filter(sv => {
                return !action.payload.includes(sv.MaSv)
            })
            storage.setSinhViens(newSinhViens)       
            return {
                ...state,
                SinhViens: newSinhViens
            }
        case EDIT_SINH_VIEN:
            state.SinhViens.forEach(sv => {
                return sv.MaSv === action.payload.MaSv && (
                    sv.TenSv = action.payload.TenSv,
                    sv.NgaySinh = action.payload.NgaySinh,
                    sv.GioiTinh = action.payload.GioiTinh,
                    sv.MaKhoa = action.payload.MaKhoa
                )
            }) 
            storage.setSinhViens(state.SinhViens)
            return {
                ...state,
                SinhViens
            }

    }
}

export { initState };
export default reducer;