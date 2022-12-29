import conection from './conection';


const api = {
    /*---------------------------------STRAPI REQUEST TO COLLECTION TYPES---------------------------------------*/
    devicesList: async (pagenum) => {
        return await conection.GET('/api/devices?pagination[pageSize]=100&populate=%2A&pagination[page]='+pagenum);
    },
    departmentsList: async () => {
        return await conection.GET('/api/departments?pagination[pageSize]=300');
    },
    maintenanceList: async () => {
        return await conection.GET('/api/maintenances?pagination[pageSize]=300');
    },
    productionList: async () => {
        return await conection.GET('/api/productions?pagination[pageSize]=300');
    },
    usersList: async () => {
        return await conection.GET('/api/users?pagination[pageSize]=300');
    },
    /*----------------------------------------------------------------------------------------------------------*/
    /*---------------------------------------------ADD REQUEST--------------------------------------------------*/
    addDevice: async (body) =>{
        return await conection.POST('/api/devices?populate=%2A', body);
    },
    addDepartment: async (body) =>{
        return await conection.POST('/api/departments', body);
    },
    addMaintenance: async (body) =>{
        return await conection.POST('/api/maintenances', body);
    },
    addUser: async () => {
        return await conection.POST('/api/users?pagination[pageSize]=300');
    },
    /*----------------------------------------------------------------------------------------------------------*/
    /*---------------------------------------------DELETE REQUEST-----------------------------------------------*/
    deleteDevice: async (id) => {
        return await conection.DELETE('/api/devices/' + id);
    },
    deleteDepartment: async (id) => {
        return await conection.DELETE('/api/departments/' + id);
    },
    deleteMaintenance: async (id) => {
        return await conection.DELETE('/api/maintenances/' + id);
    },
    deleteUser: async () => {
        return await conection.DELETE('/api/users?pagination[pageSize]=300');
    },
    /*----------------------------------------------------------------------------------------------------------*/
    /*---------------------------------------------UPDATE REQUEST-----------------------------------------------*/
    updateDevice: async (id,body) => {
        return await conection.UPDATE('/api/devices/' + id,body);
    },
    updateDepartment: async (id,body) => {
        return await conection.UPDATE('/api/departments/' + id,body);
    },
    updateMaintenance: async (id,body) => {
        return await conection.UPDATE('/api/maintenances/' + id,body);
    },
    updateUser: async () => {
        return await conection.UPDATE('/api/users?pagination[pageSize]=300');
    },
    /*----------------------------------------------------------------------------------------------------------*/

}

export default api;