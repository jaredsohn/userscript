// ==UserScript==
// @name VKQuickBan
// @namespace http://nope
// @description One click ban.
// @author Maxim Nasonov
// @include http://vkontakte.ru/*
// @require http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==

function ban(ban_string) {
var id = ban_string.attr('name');
$.ajax ({
	url: 'http://vkontakte.ru/settings.php',
	data: {act: 'addToBlackList', uid: id },
	dataType: 'text',
	success: function(data) {
		ban_string.replaceWith('<span style="color: red">Banned</span>');
	}
});

}

	/*$.ajax(
	{
		url: 'http://vkontakte.ru/settings.php',
		data: {act: 'blacklist'},
		dataType: 'html',
		type: 'get',
		success: function(data) {
			$('.editorPanel .clearFix').children('div:first').next().children('div:first').each( function() {
				banned_users[] = $(this).children('div:first').children('a').attr('href');
			});
		}
	});*/


$('.name').each( function() {
	var id = $(this).children('a').attr('href');
	$(this).parent().parent().children('.messageActions').children('div:first').append('<br/><br/><a class="ban_btn" name="' + id + '" href="#">Ban</a>');
});

$('.ban_btn').click(function() {
	ban($(this));
	return false;
});

