exports.checkDataAndErr= function (models,data,err){
    if(data != null){
        if (!err)  {
            models.modelWrapper.isSuccessfull=true;
            models.modelWrapper.data ={};
            models.modelWrapper.data=data;

            return models.modelWrapper;
        }else{
            models.modelWrapper.message=err;
            return models.modelWrapper ;
        }
    }   else{
        models.modelWrapper.message='Kayıt Bulunamadı';
        return models.modelWrapper;
    }
}

exports.checkErr = function (models,data,err){
    if (!err)  {
        models.modelWrapper.isSuccessfull=true;
        models.modelWrapper.data ={};
        models.modelWrapper.data=data;

        return models.modelWrapper;
    }else{
        models.modelWrapper.message=err;
        return models.modelWrapper;
    }
}

