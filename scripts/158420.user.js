// ==UserScript==
// @name        Ov Image Uploader
// @namespace   https://getsatisfaction.com/pluto/products/pluto_ov_profile_scripts
// @description Upload as many images as you want!
// @include     http://www.onverse.com/profile/addphotos.php*
// @require     http://code.jquery.com/jquery-1.6.2.min.js
// @version     2
// ==/UserScript==
window.index=0;
window.uploading=false;
window.k=function(){
    $('input[type="file"]:visible')
        .css('display','none')
        .after('<input type="file" multiple="multiple" />')
        .parent().parent().find('select:visible')
        .css('display','none')
        .after(window.sel.clone());
    if(!window.uploading)
        window.z();
	return false;
}
window.z = function() {
	window.uploading=true;
    var f=$('input[type="file"]:hidden:first');
    if(f.length==0) {
		window.uploading=false;
        return;
	}
    if(f[0].files.length==window.index) {
        f.remove();
        $('select:hidden:first').remove();
        window.index=0;
        window.z();
        return;
    }
    if(window.index==0)
        $('#progress').append($('<dt>').text($('form select[name="aid"]:first option:selected').text() || 'Photos'));
    var item=f[0].files[window.index];
	if((item.type != 'image/jpeg' && item.type != 'image/png') || item.size > 1024*1024*3.3) {
		$('#progress').append($('<dd>').css('color','red')
            .text(item.name+': Error!'+(item.type != 'image/jpeg' && item.type != 'image/png' ? ' Wrong file type.':'')+(item.size > 1024*1024*3.3?' Too large file.':'')));
        window.index++;
        window.z();
        return;
	}
    var p=$('<progress max="100" value="0"><span class="value">0</span>%</progress>');
    var dat=new FormData();
    dat.append('photo1',item);
    dat.append('aid',$('form select[name="aid"]:first').val() || $('form input[type="hidden"]').val() || 0);
    $.ajax({url:$('form').attr('action') + ($('form select[name="aid"]:first').val() || $('form input[type="hidden"]').val() || 0),type:'POST',xhr:function(){
            var myXhr = $.ajaxSettings.xhr();
            if(myXhr.upload){
                myXhr.upload.addEventListener('progress',function(e){
                    if(e.lengthComputable){
                        p.attr({value:e.loaded,max:e.total});
                        p.find('span').text(Math.floor(100*e.loaded/e.total));
                    }
                }, false);
            }
            return myXhr;
        },success:function(z){
            if($(z).find('.failBar').length) {
                this.error();
                return;
            }
            p=p.parent();
            p.find('progress').replaceWith('Complete!');
            $.ajax({type:'GET',url:$('form a').attr('href').substring(0,$('form a').attr('href').search(/\d+$/))+$('select:hidden:first').val(),success:function(a){
                p.append(' <a href="' + $(a).find('.imgLink:last').attr('href') + '">View</a>');
                window.index++;
                window.z();
            }});
        },error:function(){
            p=p.parent();
            p.css('color','red').find('progress').replaceWith('Error!');
            window.index++;
            window.z();
    },data:dat,cache:false,contentType:false,processData:false});
    $('#progress').append($('<dd>'+item.name+': </dd>').append(p));
}
$('form').before('<dl id="progress" style="margin:0;"></dl>');
$('form div.editFrame:not(:first)').remove();
$('form label:not(:first)').remove();
$('form label').text('Photos');
$('form input[type="file"]').attr('multiple','multiple');
$.ajax({type:'GET',url:'http://www.onverse.com/profile/myphotos.php',success:function(a){
    window.sel='<select name="aid">';
    var d=$(a).find('.listAblums p a');
    for(var i=0;i<d.length;i++) {
        window.sel += '<option value="' + d.eq(i).attr('href').match(/\d+$/)[0];
        if(d.eq(i).attr('href').match(/\d+$/)[0] == $('form').attr('action').match(/\d+$/)[0])
            window.sel += '" selected="selected';
        window.sel += '">';
        window.sel += d.eq(i).text().substring(0,d.eq(i).text().lastIndexOf(' (')) + '</option>';
    }
    window.sel = $(window.sel + '</select>');
	$('form').attr('action',$('form').attr('action').substring(0,$('form').attr('action').search(/\d+$/)));
    $('form .editFrame').after($('<label>').text('Album')
        .after($('<div>').addClass('editFrame').append(window.sel.clone())));
}});
$('form input:submit').click(k);