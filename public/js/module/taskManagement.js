taskManagement = {
    Model:{
        id:'',
        title:'',
        note:'',
        color:'red',
        taskGroup:'',
        endDate:'',
        Clear:function(){
            taskManagement.Model.id='';
            taskManagement.Model.title='';
            taskManagement.Model.note='';
            taskManagement.Model.color='';
            taskManagement.Model.taskGroup='';
            taskManagement.Model.endDate='';
        }
    },
    Modal:{
        Open:function(){
            $('.add-task-mdl').show();
        },
        Close:function(){
            $('.add-task-mdl').hide();
            taskManagement.FormElement.Clear();
        }
    },
    Validate:function(){
        var success=true;

        if($('#title').val()=='' || $('#title').val()=='undefined')
        {
            $('#title').css('border','1px solid #FFB2A8');
            success=false;
        }else
        {
            $('#title').css('border','1px solid #ddd');
        }

        if($('#note').val()=='' || $('#note').val()=='undefined')
        {
            $('#note').css('border','1px solid #FFB2A8');
            success=false;
        }else
        {
            $('#note').css('border','1px solid #ddd');
        }

        if($('#endDate').val()=='' || $('#endDate').val()=='undefined')
        {
            $('#endDate').css('border','1px solid #FFB2A8');
            success=false;
        }else
        {
            $('#endDate').css('border','1px solid #ddd');
        }

        return success;
    },
    FormElement:{
        Clear:function(){
            $('.add-task-mdl ul.taskGroup-color li .icon-check').remove();
            $('.add-task-mdl ul.taskGroup-color li').removeAttr('id', 'selected');
            $('#title').val('');
            $('#note').val('');
            $('#endDate').val('');
            $('#tag').val('');
        },
        Bind:function(data){
            $('#title').val(data.title);
            $('#note').val(data.note);
            $('#endDate').val(data.endDate);
            $('.add-task-mdl ul.taskGroup-color li'+'.'+data.color ).attr('id', 'selected').html('<i class="icon-check"></i>');
            $('#notemark-id').val(data._id);
        }
    },
    Create: function() {

        NProgress.start();

        $.ajax({
            type: "POST",
            url: '/task/create',
            data: taskManagement.Model,
            success: function(data){

                if(data.isSuccessfull){

                    taskManagement.Modal.Close();

                    $('#notemark').append('<div class="three columns taskGroup-item delete-notemark" data-id="">'+
                        '<div class="four columns left">'+
                        '<div class="taskGroup-icon '+data.data.color+'">'+
                        '<i class="icon-star"></i></div> </div>'+
                        '<div class="eight columns right">'+
                        '       <h3> '+data.data.title+'  </h3>'+
                        '      <p>'+data.data.note+'</p>'+
                        '<div class="item-action"><a href="#" class="delete">Sil</a><a href="#" class="edit">Düzenle</a></div>'+
                        '</div>'+
                        '</div>');

                    NProgress.done();
                }
            }
        });
    },
    Edit: function() {
        NProgress.start();

        $.ajax({
            type: "GET",
            url: '/task/edit/'+taskManagement.Model.id,
            success: function(data){
                if(data.isSuccessfull)
                {
                    $('#save-notemark').hide();
                    $('#update-notemark').show();
                    console.log(data);
                    taskManagement.FormElement.Bind(data.noteMark);
                    taskManagement.Modal.Open();

                    NProgress.done();
                }else
                {
                    alert('Beklenmeyen bir hata oluştu.')
                }
            }
        });
    },
    Update: function() {

        NProgress.start();

        $.ajax({
            type: "PUT",
            url: '/task/update/'+taskManagement.Model.id,
            data: taskManagement.Model,
            success: function(data){
                if(data.isSuccessfull)
                {
                    taskManagement.Modal.Close();

                    $('#update-notemark').hide();

                    NProgress.done();
                }
            }
        });
    },
    Delete: function() {
        NProgress.start();
        $.ajax({
            type: "DELETE",
            url: '/task/'+taskManagement.Model.id,
            success: function(data){
                if(data.isSuccessfull)
                {
                    $this.parent().parent().hide();
                    NProgress.done();
                }
            }
        });
    }
}