groupManagement = {
    Model:{
        id:'',
        title:'',
        link:'',
        icon:'red',
        Clear:function(){
            groupManagement.Model.id='';
            groupManagement.Model.title='';
            groupManagement.Model.link='';
            groupManagement.Model.icon='';
        }
    },
    Validate:function(){
        var success=true;

        if($('#title').val()=='' || $('#title').val()=='undefined')
        {
            $('#title').css('border','1px solid #ff6a7d');
            success=false;
        }else
        {
            $('#title').css('border','1px solid #ebebeb');
        }

        if($('#link').val()=='' || $('#link').val()=='undefined')
        {
            $('#link').css('border','1px solid #ff6a7d');
            success=false;
        }else
        {
            $('#link').css('border','1px solid #ebebeb');
        }

        return success;
    },
    FormElement:{
        Clear:function(){
            $('#title').val('');
            $('#link').val('');

            $('#link-edit').val('')
            $('#title-edit').val('')
            $('#search-key').val('');



        }
    },
    Paginate:function(skip){
        $('.paginations li').each(function(){
            if($(this).hasClass("active"))
            {
                $(this).removeClass("active")
            }

            if($(this).data('id')==skip)
            {
                $(this).addClass("active")
            }
        });
        $(this).addClass("selected");



            $.ajax({
                type: "GET",
                url: '/goygoy/page/' + skip,
                success: function (data) {
                    if (data.isSuccessfull) {

                        $('.note-ul').text('');

                        $.each(data.data, function (index, element) {

                            $('.note-ul').append('<li><i  class="fa fa-dot-circle-o pink"></i> <a href="'+element.link+'" data-id="'+element._id+'" target="_blank" class="title">  ' + element.title + '</a>' +

                                '<div class="action-detail">' +
                                ' <ul>' +
                                '    <li><p class="date">' + element.date + '</p></li>' +
                                '   <li><p class="date">-</p></li>' +
                                '  <li><p class="user"> ' + element.source + '</p></li>' +
                                ' <li><p class="date">-</p></li>' +
									' <li><p class="date">'+element.viewCount+' Views</p></li>' +
                                ' </ul>' +
                                '</div>' +

                                '</li>')

                        });
                    }
                }
            });

    },
    Search: function() {

        if(groupManagement.Model.title!='') {

            $('#search-key').css('border','1px solid #ebebeb');

            $.ajax({
                type: "GET",
                url: '/goygoy/search/' + groupManagement.Model.title,
                success: function (data) {
                    if (data.isSuccessfull) {

                        $('.note-ul').text('');

                        $.each(data.data, function (index, element) {

                            $('.note-ul').append('<li><i  class="fa fa-dot-circle-o pink"></i> <a href="'+element.link+'" data-id="'+element._id+'" target="_blank" class="title">  ' + element.title + '</a>' +

                                '<div class="action-detail">' +
                                ' <ul>' +
                                '    <li><p class="date">' + element.date + '</p></li>' +
                                '   <li><p class="date">-</p></li>' +
                                '  <li><p class="user"> ' + element.source + '</p></li>' +
                                ' <li><p class="date">-</p></li>' +
									' <li><p class="date">'+element.viewCount+' Views</p></li>' +
                                ' </ul>' +
                                '</div>' +

                                '</li>')

                        });
                    }
                }
            });
        }else{

            $('#search-key').css('border','1px solid #ff6a7d');
        }
    },
	View:function(id){
		 $.ajax({
            type: "GET",
            url: '/goygoy/view/'+id,
            success: function(data){
                if(data.isSuccessfull){
                    groupManagement.FormElement.Clear();
                }
            }
        });
	},
    Create: function() {
        NProgress.start();
        if(groupManagement.Validate()){

        $.ajax({
            type: "POST",
            url: '/goygoy/create',
            data: groupManagement.Model,
            success: function(data){

                if(data.isSuccessfull){

                    groupManagement.FormElement.Clear();

                    $('#save-goygoy').hide();
                    NProgress.done();

                    $('.create-form').hide();
                    $('.note-ul').append( '<li><i  class="fa fa-dot-circle-o pink"></i> <a class="title">  '+ data.data.title +'</a>'+

                        '<div class="action-detail">'+
                        ' <ul>'+
                        '    <li><p class="date">'+ data.data.date +'</p></li>'+
                        '   <li><p class="date">-</p></li>'+
                        '  <li><p class="user"> '+ data.data.source +'</p></li>'+
                        ' <li><p class="date">-</p></li>'+

                        ' </ul>'+
                        '</div>'+

                        '</li>')
                }
            }
        });
    }},
    Edit: function() {
        NProgress.start();
        $.ajax({
            type: "GET",
            url: '/goygoy/edit/'+groupManagement.Model.id,
            success: function(data){
                if(data.isSuccessfull)
                {
                    groupManagement.FormElement.Clear();

                    $('#title-edit').val(data.group.title);
                    $('#link-edit').val(data.group.link);
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
                url: '/goygoy/update/'+groupManagement.Model.id,
                data: groupManagement.Model,
                success: function(data){
                    if(data.isSuccessfull)
                    {
                        groupManagement.FormElement.Clear();

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
            url: '/goygoy/'+groupManagement.Model.id,
            success: function(data){
                if(data.isSuccessfull)
                {

                    NProgress.done();
                }
            }
        });
    }
   
}