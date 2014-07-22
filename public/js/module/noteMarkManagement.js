noteMarkManagement = {
    Init:function(){
      noteMarkManagement.Action();
    },
    Model:{
        id:'',
        title:'',
        subTitle:'',
        color:'red',
        group:'',
        content:'',
        isLock:'',
        isArchive:'',
        lockUrl:'',
        archiveUrl:'',
        Clear: function(){
            noteMarkManagement.Model.id='';
            noteMarkManagement.Model.title='';
            noteMarkManagement.Model.subTitle='';
            noteMarkManagement.Model.color='';
            noteMarkManagement.Model.group='';
            noteMarkManagement.Model.content='';
            noteMarkManagement.Model.isLock='';
            noteMarkManagement.Model.isArchive='';
            noteMarkManagement.Model.lockUrl='';
            noteMarkManagement.Model.archiveUrl='';
        }
    },
    Modal:{
        Open:function(){
            $('.add-notemark-mdl').show();
        },
        Close:function(){
            $('.add-notemark-mdl').hide();
            noteMarkManagement.FormElement.Clear();
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

        if($('#subTitle').val()=='' || $('#subTitle').val()=='undefined')
        {
            $('#subTitle').css('border','1px solid #FFB2A8');
            success=false;
        }else
        {
            $('#subTitle').css('border','1px solid #ddd');
        }

        if($('#content').val()=='' || $('#content').val()=='undefined')
        {
            $('#content').css('border','1px solid #FFB2A8');
            success=false;
        }else
        {
            $('#content').css('border','1px solid #ddd');
        }

        return success;
    },
    FormElement:{
        Clear:function(){
            $('.add-notemark-mdl ul.group-color li .icon-check').remove();
            $('.add-notemark-mdl ul.group-color li').removeAttr('id', 'selected');
            $('#title').val('');
            $('#subTitle').val('');
            $('#content').val('');
            $('#tag').val('');
        },
        Bind:function(data){
            $('#title').val(data.title);
            $('#subTitle').val(data.subTitle);
            $('#content').val(data.content);
            $('.add-notemark-mdl ul.group-color li'+'.'+data.color ).attr('id', 'selected').html('<i class="icon-check"></i>');
            $('#notemark-id').val(data._id);
        }
    },
    Create: function() {

        NProgress.start();

        $.ajax({
            type: "POST",
            url: '/notemark/create',
            data: noteMarkManagement.Model,
            success: function(data){

                if(data.isSuccessfull){

                    noteMarkManagement.Modal.Close();

                    $('#notemark').append('<div class="three columns group-item delete-notemark" data-id="">'+
                        '<div class="four columns left">'+
                        '<div class="group-icon '+data.data.color+'">'+
                        '<i class="icon-star"></i></div> </div>'+
                        '<div class="eight columns right">'+
                        '       <h3> '+data.data.title+'  </h3>'+
                        '      <p>'+data.data.subTitle+'</p>'+
                        '<div class="item-action"><a href="#" class="delete">Sil</a><a href="#" class="edit">Düzenle</a></div>'+
                        '</div>'+
                        '</div>');


                    $('.group-item').children().find('p').show();
                    $('.group-item').children().find('.item-action').hide();
                    NProgress.done();
                }
            }
        });
    },
    Edit: function() {
        NProgress.start();

        $.ajax({
            type: "GET",
            url: '/noteMark/edit/'+noteMarkManagement.Model.id,
            success: function(data){
                if(data.isSuccessfull)
                {
                    $('#save-notemark').hide();
                    $('#update-notemark').show();
                    console.log(data);
                    noteMarkManagement.FormElement.Bind(data.noteMark);
                    noteMarkManagement.Modal.Open();

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
            url: '/notemark/update/'+noteMarkManagement.Model.id,
            data: noteMarkManagement.Model,
            success: function(data){
                if(data.isSuccessfull)
                {
                    noteMarkManagement.Modal.Close();

                    $('#update-notemark').hide();

                    $('.group-item').children().find('p').show();
                    $('.group-item').children().find('.item-action').hide();

                    NProgress.done();
                }
            }
        });
    },
    Lock: function() {

        NProgress.start();

        var url=noteMarkManagement.Model.lock ? '/noteMark/unlock/' : '/noteMark/lock/';
        $.ajax({
            type: "PUT",
            url: noteMarkManagement.Model.lockUrl +noteMarkManagement.Model.id ,
            data:{isLock:noteMarkManagement.Model.isLock},
            success: function(data){
                if(data.isSuccessfull)
                {
                    NProgress.done();
                }
                else
                {
                    alert('Beklenmeyen bir hata oluştu.')
                }
            }
        });
    },
    ArchiveOrUnArchive: function() {

        NProgress.start();

        $.ajax({
            type: "PUT",
            url: noteMarkManagement.Model.archiveUrl +noteMarkManagement.Model.id ,
            data:{isArchive:noteMarkManagement.Model.isArchive},
            success: function(data){
                if(data.isSuccessfull)
                {
                    NProgress.done();
                }
                else
                {
                    alert('Beklenmeyen bir hata oluştu.')
                }
            }
        });
    },
    SelectAllText: function fnSelect(objId)
    {
        if (document.selection)
            document.selection.empty();
        else if (window.getSelection)
            window.getSelection().removeAllRanges();

        if (document.selection)
        {
            var range = document.body.createTextRange();
            range.moveToElementText(document.getElementById(objId));
            range.select();
        }
        else if (window.getSelection)
        {
            var range = document.createRange();
            range.selectNode(document.getElementById(objId));
            window.getSelection().addRange(range);
        }
    },

    Action:function(){
        $('.back-notemarks').on('click', function(){var thisHref = $(this).attr('href'); window.location.href = thisHref})


        $('.edit-notemark').on('click',function(){
            /*$('.group-item .group-icon').toggleClass('grey');*/
            if($(this).hasClass("cancel-notemark-edit")){
                $(this).removeClass('cancel-notemark-edit').addClass('edit-notemark');
                $(this).children().html('<i class="fa fa-pencil"></i>EDIT');
                $('.group-item').children().find('p').show();
                $('.group-item').children().find('.item-action').hide();
            }
            else{
                $(this).removeClass('edit-notemark').addClass('cancel-notemark-edit')
                $(this).children().html('<i class="fa fa-times"></i>CANCEl');
                $('.group-item').children().find('p').hide();
                $('.group-item').children().find('.item-action').show();
            }
        });

        $('.cancel-notemark-edit').on("click",function(){

            $('.group-item').children().find('.icon-star').removeClass('icon-flash').addClass('icon-star');
            $('.group-item').children().find('p').show();
            $('.group-item').children().find('.item-action').hide();

        });

        $('ul.group-color li').on('click',function(){

            $('ul.group-color li .icon-check').remove();
            $('ul.group-color li').removeAttr('id', 'selected');
            $(this).attr('id', 'selected');
            $(this).html('<i class="icon-check"></i>');

        });

        $('#save-notemark').click(function(){

            if(noteMarkManagement.Validate())
            {
                noteMarkManagement.Model.Clear();
                noteMarkManagement.Model.color = $('ul.group-color li#selected').data('color');
                noteMarkManagement.Model.title = $('#title').val();
                noteMarkManagement.Model.subTitle = $('#subTitle').val();
                noteMarkManagement.Model.group = $('#notemark-group-id').val();
                noteMarkManagement.Model.content = $('#content').val();

                noteMarkManagement.Create();
            }
        });

        $('.edit-group').click(function(){
            var $this = $(this);

            noteMarkManagement.Model.Clear();
            noteMarkManagement.Model.id =$this.data('id');

            noteMarkManagement.Edit();
        });

        $('.cancel-all').click(function(){

            noteMarkManagement.Model.Clear();
            noteMarkManagement.Modal.Close();
        })



        $('.delete-notemark').click(function(){

            var $this = $(this);
            noteMarkManagement.Model.Clear();
            noteMarkManagement.Model.id=$this.data('id');

            noteMarkManagement.Delete();

        })

        $('.add-notemark-btn').click(function(){
            noteMarkManagement.Modal.Open();
            $('#save-notemark').show();
            $('#update-notemarks').hide();
        });

        $('.archive-notemark-btn').bind('click',function(){
            $('.archive-notemark-btn').hide();
            $('.un-archive-notemark-btn').show();
            noteMarkManagement.Model.Clear();
            noteMarkManagement.Model.isArchive = true;
            noteMarkManagement.Model.archiveUrl = '/noteMark/archive/';
            noteMarkManagement.Model.id = $('#notemark-id').val();
            noteMarkManagement.ArchiveOrUnArchive();
        });

        $('.un-archive-notemark-btn').bind('click',function(){
            $('.un-archive-notemark-btn').hide();
            $('.archive-notemark-btn').show();

            noteMarkManagement.Model.Clear();
            noteMarkManagement.Model.isArchive = false;
            noteMarkManagement.Model.archiveUrl = '/noteMark/unarchive/';
            noteMarkManagement.Model.id = $('#notemark-id').val();

            noteMarkManagement.ArchiveOrUnArchive();
        });

        $('.lock').bind('click',function(){
            $('.un-lock-notemark-btn').hide();
            $('.lock-notemark-btn').show();
            $('.sub-un-lock-btn').show();
            $('.sub-lock-btn').hide();
            noteMarkManagement.Model.Clear();
            noteMarkManagement.Model.isLock = true;
            noteMarkManagement.Model.lockUrl = '/noteMark/lock/';
            noteMarkManagement.Model.id = $('#notemark-id').val();
            noteMarkManagement.Lock();
        });



        $('.un-lock').bind('click',function(){
            $('.un-lock-notemark-btn').show();
            $('.lock-notemark-btn').hide();
            $('.sub-un-lock-btn').hide();
            $('.sub-lock-btn').show();
            noteMarkManagement.Model.Clear();
            noteMarkManagement.Model.isLock = false;
            noteMarkManagement.Model.lockUrl = '/noteMark/unlock/';
            noteMarkManagement.Model.id = $('#notemark-id').val();

            noteMarkManagement.Lock();
        });

        $('#update-notemarks').on("click",function(){

            if(noteMarkManagement.Validate())
            {
                noteMarkManagement.Model.Clear();
                noteMarkManagement.Model.id = $('#notemark-id').val();
                noteMarkManagement.Model.color = $('.add-notemark-mdl  ul.group-color li#selected').data('color');
                noteMarkManagement.Model.title = $('#title').val();
                noteMarkManagement.Model.subTitle = $('#subTitle').val();
                noteMarkManagement.Model.group = $('#notemark-group-id').val();
                noteMarkManagement.Model.content = $('#content').val();

                noteMarkManagement.Update();
            }
        })
    }

}

$(document).ready(function () {
    noteMarkManagement.Init();
});