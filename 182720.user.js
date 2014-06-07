// ==UserScript==
// @name		Bitbucket issues multi-attach
// @description		Enable multi-file attachments on bitbucket issues.
// @include		https://bitbucket.org/*/issue-edit/*
// @include		https://bitbucket.org/*/issues/new
// @copyright		2013 BestPig (http://www.bestpig.fr)
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version		1.0.2
// @grant		none
// ==/UserScript==

function add_new_upload_button() {
    $('#attachments').append('<input class="input_attachments" type="file" name="attachments" multiple="multiple" style="width: 545px">');
}

function add_new_upload() {
	$('.input_attachments').unbind( "change" );
	$('#attachments').append('<span class="aui-icon aui-icon-small aui-iconfont-remove"></span><hr style="width: 70%;margin:2px 0 5px" />');
	add_new_upload_button();
	$('.input_attachments').last().change(add_new_upload);
	$('.aui-iconfont-remove').last().click(function(){
		$(this).prev('input').remove();
		$(this).next('hr').remove();
		$(this).remove();
	});
}

add_new_upload_button();
$('#id_attachments').remove();
$('.input_attachments').change(add_new_upload);
