import { Validation } from "./Validation.js";
import { NhanVien } from "../models/NhanVien.js";
import { QLNVServices } from "../services/qlnv.services.js";


const validation = new Validation()

const showEmp = (data) => {

    let htmlContent = ''
    data.forEach((item, index) => {
        htmlContent += `
        <tr>
            <td style="display: none;">${item + 1}</td>
            <td>${item.tknv}</td>
            <td>${item.name}</td>
            <td>${item.email}</td>
            <td>${item.datepicker}</td>
            <td>${item.chucvu}</td>
            <td>${item.totalSalary}</td>
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
    validation.getElement('btnCapNhat').style.display = 'none'
    validation.getElement('btnThemNV').style.display = 'block'
}
const getEmployee = async () => {
    try {
        const result = await QLNVServices.getEmpList()
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
    // console.log("emp: ", emp);
    return new NhanVien(emp.tknv, emp.name, emp.email, emp.password, emp.datepicker, emp.luongCB, emp.chucvu, emp.gioLam, emp.totalSalary, emp.empType)
}

document.getElementById('nhanVienForm').onsubmit = async (ev) => {
    try {
        ev.preventDefault()
        const formElement = validation.getElement('nhanVienForm')
        const action = formElement.getAttribute('data-action')
        const _userInput = getUserInput()

        if (action === 'edit') {
            const empID = formElement.getAttribute('data-id')
            const result = await QLNVServices.editEmp(empID, _userInput)
            console.log("result: ", result);

        }
        if (action !== 'edit') {
            const result = await QLNVServices.addEmpList(_userInput)

        }

        getEmployee()
        console.log("result 1: ", result);
    } catch (error) {
        console.log("error: ", error);

    }

}




window.editEmp = async (empId) => {


    try {

        validation.getElement('btnCapNhat').style.display = 'block'

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

