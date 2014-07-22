taskGroupManagement = {
    Model:{
        id:'',
        title:'',
        subTitle:'',
        color:'red',
        Clear:function(){
            taskGroupManagement.Model.id='';
            taskGroupManagement.Model.title='';
            taskGroupManagement.Model.subTitle='';
            taskGroupManagement.Model.color='';
        }
    },
    Validate:function(){
        var success=true;

        if($('#title').val()=='' || $('#title').val()=='undefined')
        {
            $('#title').css('border','1px solid red');
            success=false;
        }else
        {
            $('#title').css('border','1px solid #ddd');
        }

        if($('#subTitle').val()=='' || $('#subTitle').val()=='undefined')
        {
            $('#subTitle').css('border','1px solid red');
            success=false;
        }else
        {
            $('#subTitle').css('border','1px solid #ddd');
        }

        return success;
    },
    FormElement:{
        Clear:function(){
            $('#title').val('');
            $('#subTitle').val('');
            $('ul.group-color li .icon-check').remove();
            $('ul.group-color li').removeAttr('id', 'selected');
            $('#subTitle-edit').val('')
            $('#title-edit').val('')
            $('#modalEditGroup ul.group-color li .icon-check').remove();
            $('#modalEditGroup ul.group-color li').removeAttr('id', 'selected');
        }
    },
    PostUrl : 'http://apidreamdays365.aws.af.cm/api/category',
    Create: function() {


        NProgress.start();
        $.ajax({
            type: "POST",
            url: '/taskgroup/create',
            data: taskGroupManagement.Model,
            success: function(data){

                if(data.isSuccessfull){

                    taskGroupManagement.FormElement.Clear();

                    $("#modal1 .close").click();

                    $('#taskGroups').append('<div class="three columns group-item delete-group" data-id="">'+
                        '<div class="four columns left">'+
                        '<div class="group-icon '+data.data.color+'">'+
                        '<i class="icon-star"></i></div> </div>'+
                        '<div class="eight columns right">'+
                        '       <h3> '+data.data.title+'  </h3>'+
                        '      <p>'+data.data.subTitle+'</p>'+
                        '<div class="item-action"><a href="#" class="delete">Sil</a><a href="#" class="edit">Düzenle</a></div>'+
                        '</div>'+
                        '</div>')

                    NProgress.done();
                }
            }
        });
    },
    Edit: function() {
        NProgress.start();
        $.ajax({
            type: "GET",
            url: '/taskgroup/edit/'+taskGroupManagement.Model.id,
            success: function(data){
                if(data.isSuccessfull)
                {
                    taskGroupManagement.FormElement.Clear();

                    $('#modalEditGroup ul.group-color li'+'.' + data.group.color ).attr('id', 'selected').html('<i class="icon-check"></i>');

                    $('#title-edit').val(data.group.title);
                    $('#subTitle-edit').val(data.group.subTitle);
                    $('#edit-group-id').val(data.group._id);

                    $(".edit-group-btn.switch").click();
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
                url: '/taskgroup/update/'+taskGroupManagement.Model.id,
                data: taskGroupManagement.Model,
                success: function(data){
                    if(data.isSuccessfull)
                    {
                        taskGroupManagement.FormElement.Clear();

                        $("#modalEditGroup .close").click();

                        NProgress.done();
                    }
                }
            });
    },
    Delete: function() {
        NProgress.start();
        $.ajax({
            type: "DELETE",
            url: '/taskgroups/'+taskGroupManagement.Model.id,
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