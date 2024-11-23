export class NhanVien {
    constructor(_tknv, _name, _email, _password, _datepicker, _luongCB, _chucvu, _gioLam) {
        this.tknv = _tknv
        this.name = _name
        this.email = _email
        this.password = _password
        this.datepicker = _datepicker
        this.luongCB = parseFloat(_luongCB)
        this.chucvu = _chucvu
        this.gioLam = parseInt(_gioLam)
        this.totalSalary = this.calculateTotalSalary()
        this.empType = this.calculateEmpType()
    }
    calculateTotalSalary = () => {

        if (this.chucvu === 'Sếp') {
            return this.luongCB * 3
        }

        if (this.chucvu === 'Trưởng phòng')
            return this.luongCB * 3
        if (this.chucvu === 'Nhân viên')
            return this.luongCB * 1.5
    }
    calculateEmpType = () => {
        if (this.gioLam >= 192)
            return 'Xuất sắc'
        if (this.gioLam >= 176 && this.gioLam < 192)
            return 'Giỏi'
        if (this.gioLam >= 160 && this.gioLam < 176)
            return 'Xuất sắc'
        if (this.gioLam < 160)
            return 'Trung bình'
    }

    async hashPassword(password) {

        return await CryptoJS.MD5(password).toString();
    }

}