const baseUrl = 'https://6728d9216d5fa4901b6b30ff.mockapi.io'

export const QLNVServices = {
    getEmpList: () => {
        return axios({
            method: 'GET',
            // url: 'https://6728d91d6d5fa4901b6b30da.mockapi.io/QLNV'
            url: `${baseUrl}/QLNV`
        })
    },
    getEmpListByID: (empId) => {
        return axios({
            method: 'GET',
            // url: 'https://6728d91d6d5fa4901b6b30da.mockapi.io/QLNV'
            url: `${baseUrl}/QLNV/${empId}`
        })
    },
    editEmp: (empId, payload) => {
        return axios({
            method: 'PUT',
            // url: 'https://6728d91d6d5fa4901b6b30da.mockapi.io/QLNV'
            url: `${baseUrl}/QLNV/${empId}`,
            data: payload
        })
    },
    addEmpList: (payload) => {
        return axios({
            method: 'POST',
            // url: 'https://6728d91d6d5fa4901b6b30da.mockapi.io/QLNV'
            url: `${baseUrl}/QLNV`,
            data: payload
        })
    },

    deleteEmp: (empId) => {
        return axios({
            method: 'DELETE',
            // url: `https://6728d91d6d5fa4901b6b30da.mockapi.io/QLNV/${empId}`
            url: `${baseUrl}/QLNV/${empId}`
        })
    }
}