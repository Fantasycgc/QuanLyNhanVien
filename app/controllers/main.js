import { Validation } from "./Validation.js";
import { NhanVien } from "../models/NhanVien.js";
import { QLNVServices } from "../services/qlnv.services.js";


const validation = new Validation()
const nhanvien = new NhanVien()
function clearForm() {
    document.getElementById('nhanVienForm').reset()

}

const showEmp = (data) => {


    let htmlContent = ''
    data.forEach((item) => {

        htmlContent += `
        <tr>
            <td>${item.tknv}</td>
            <td>${item.name}</td>
            <td>${item.email}</td>
            <td>${item.datepicker}</td>
            <td>${item.chucvu}</td>
            <td>${Intl.NumberFormat('vn-VN').format(item.totalSalary)}</td>
            <td>${item.empType}</td>
            <td>
                    <button class="btn btn-warning" data-toggle="modal" data-target="#myModal"
                    onclick="editEmp('${item.id}')"
                    >Edit</button>
                    <button class="btn btn-danger" onclick="deleteEmp('${item.id}')">Delete</button>
            </td>
        </tr>
        `
    })
    document.getElementById('tableDanhSach').innerHTML = htmlContent
}

validation.getElement('btnThem').onclick = () => {
    clearForm()
    validation.getElement('header-title').innerHTML = 'Thêm Nhân Viên'
    validation.getElement('btnCapNhat').style.display = 'none'
    validation.getElement('btnThemNV').style.display = 'block'
}

let searchFilter = []
const getEmployee = async () => {
    try {

        const result = await QLNVServices.getEmpList()
        searchFilter = result.data

        showEmp(result.data)
    } catch (error) {
        console.log("error: ", error);

    }
}
getEmployee()

const getUserInput = () => {
    const elements = document.querySelectorAll('#nhanVienForm input, #nhanVienForm select')
    let emp = {}
    elements.forEach((element) => {
        const { id, value } = element
        emp[id] = value
    })

    return new NhanVien(emp.tknv, emp.name, emp.email, emp.password, emp.datepicker, emp.luongCB, emp.chucvu, emp.gioLam)
}


document.getElementById('nhanVienForm').onsubmit = async (ev) => {
    try {
        ev.preventDefault()

        let isValid = true
        const formElement = validation.getElement('nhanVienForm')

        const action = formElement.getAttribute('data-action')

        const _userInput = getUserInput()

        isValid &= validation.required(_userInput.tknv, 'Tài khoản nhân viên không được để trống', 'tbTKNV') && validation.betweenLength(_userInput.tknv, 4, 6, 'Tài khoản phải tối đa 4 - 6 ký tự', 'tbTKNV')
        isValid &= validation.required(_userInput.name, 'Tên nhân viên không được để trống', 'tbTen') && validation.isCharacter(_userInput.name, 'Tên nhân viên phải là chữ', 'tbTen')
        isValid &= validation.isEmail(_userInput.email, 'Địa chỉ email không hợp lệ', 'tbEmail')
        isValid &= validation.required(_userInput.password, 'Mật khẩu không được rỗng', 'tbMatKhau') && validation.isPassword(_userInput.password, 'Mật khẩu phải ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt', 'tbMatKhau')
        isValid &= validation.required(_userInput.datepicker, 'Ngày không được rỗng', 'tbNgay') && validation.isDate(_userInput.datepicker, 'Ngày phải có dịnh dạng mm/dd/yyyy', 'tbNgay')
        isValid &= validation.isNumber(_userInput.luongCB, 'Lương cơ bản phải là số', 'tbLuongCB') && validation.betweenValue(_userInput.luongCB, 1e6, 20e6, 'Lương cơ bản từ 1,000,000 đến 20,000,000', 'tbLuongCB')
        isValid &= validation.isCombobox(_userInput.chucvu, 'Bạn chưa chọn chức vụ', 'tbChucVu')
        isValid &= validation.isNumber(_userInput.gioLam, 'Lương cơ bản phải là số', 'tbGiolam') && validation.betweenValue(_userInput.gioLam, 80, 200, 'Giờ làm trong tháng phải từ 80 dến 200 giờ', 'tbGiolam')

        if (!isValid) return

        if (action === 'edit') {

            const empID = formElement.getAttribute('data-id')
            _userInput.password = await nhanvien.hashPassword(_userInput.password)
            const result = await QLNVServices.editEmp(empID, _userInput)
        }
        if (action !== 'edit') {
            _userInput.password = await nhanvien.hashPassword(_userInput.password)
            const result = await QLNVServices.addEmpList(_userInput)

        }

        getEmployee()

    } catch (error) {
        console.log("error: ", error);
    }

}




window.editEmp = async (empId) => {
    try {

        validation.getElement('btnCapNhat').style.display = 'block'
        document.getElementById('header-title').innerHTML = 'Cập Nhật Thông Tin'
        document.getElementById('nhanVienForm').setAttribute('data-action', 'edit')
        document.getElementById('nhanVienForm').setAttribute('data-id', empId)
        validation.getElement('btnThemNV').style.display = 'none'
        const result = await QLNVServices.getEmpListByID(empId)

        const elements = document.querySelectorAll('#nhanVienForm input, #nhanVienForm select')
        elements.forEach((element) => {
            const { id } = element
            element.value = result.data[id]

        })
    } catch (error) {
        console.log("error: ", error);
    }

}

window.deleteEmp = async (empId) => {

    try {
        if (confirm('Bạn có muốn xóa không?')) {
            await QLNVServices.deleteEmp(empId)
        }

        getEmployee()

    } catch (error) {
        console.log("error: ", error);

    }
}
validation.getElement('btnTimNV').onclick = () => {

    const searchType = validation.getElement('searchName').value
    const resultEmType = searchFilter.filter((arr) => arr.empType === searchType)
    searchType !== '' ? showEmp(resultEmType) : getEmployee()

}
document.addEventListener("contextmenu", function (n) {
    n.preventDefault()
}, !1), document.onkeydown = function (e) {
    e = e || window.event;

    if (
        e.keyCode === 123 ||
        (e.ctrlKey && e.shiftKey && e.keyCode === 73) ||
        (e.ctrlKey && e.keyCode === 85) ||
        (e.ctrlKey && e.key === 's')
    ) {
        e.preventDefault();
        return false;
    }
}

