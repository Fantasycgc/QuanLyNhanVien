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
                    <button class="btn btn-danger" onclick="deleteProduct('${item.id}')">Delete</button>
                </td>
        </tr>
        `
    })
    document.getElementById('tableDanhSach').innerHTML = htmlContent
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
    console.log("emp: ", emp);
    return new NhanVien(emp.tknv, emp.name, emp.email, emp.password, emp.datepicker, emp.luongCB, emp.chucvu, emp.gioLam, emp.totalSalary, emp.empType)
}

document.getElementById('nhanVienForm').onsubmit = async (ev) => {
    ev.preventDefault()
    getUserInput()
    getEmployee()
}
// Thêm data-action vào thẻ form
document.getElementById('nhanVienForm').setAttribute('data-action', 'edit')
// Thêm data-id vào thẻ form để xác định id của sp cần edit
document.getElementById('nhanVienForm').setAttribute('data-id', 'edit')

window.editEmp = async (empId) => {

    try {
        console.log("empId: ", empId);
        // gọi API để lấy thông tin sản phẩm dựa vào productid
        // const result = await qlspServices.getProductListByID(productId)
        // console.log("result: ", result);

        // // hiển thị thông tin tiết sản phẩm lên form
        // const elements = document.querySelectorAll('#formSP input, #formSP select')
        // elements.forEach((element) => {
        //     const { id } = element
        //     element.value = result.data[id]
        // })
        // // chỉnh sửa UI
        // // Thêm button cập, ẩn button thêm SP nếu có
        // document.getElementById('btnThemSP').onclick = () => {
        //     document.querySelector('.modal-footer').innerHTML = `
        //         <button type="submit" form="formSP" class="btn btn-success">Cập Nhật</button>
        //     `
        // }

    } catch (error) {
        console.log("error: ", error);

    }

}