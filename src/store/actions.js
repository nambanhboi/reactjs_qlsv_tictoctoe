import { ADD_SINH_VIEN, DELETE_SINH_VIEN, EDIT_SINH_VIEN } from "./constants";

export const addSinhVien = payload => ({
    type: ADD_SINH_VIEN,
    payload
})

export const deleteSinhVien = payload => ({
    type: DELETE_SINH_VIEN,
    payload
})

export const editSinhVien = payload => ({
    type: EDIT_SINH_VIEN,
    payload
})