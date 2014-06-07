// ==UserScript==
// @name Inviter VK
// @namespace ITproject
// @include  http://vkontakte.ru/club*
// @include  http://vk.com/club*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// ==/UserScript==

$(document).ready(function()
{
	$('.actionspro').prepend('<li><a href="#" id="selectAllNow"><b>Всех друзей в группу</b></a></li>');	
	//$('#privacy_box_friend_list_lookup').before('<a href="#" id="selectAllNow">All</a>');
	$('#selectAllNow').click(function(){
		showInviteBox();		
		$('.actionspro li').eq(4).each(function(){	
			//alert($(this).html());
			var str = $(this);
			$(str + ':first').click();
		});		
		$('.flist_cell').click();
	});
});

function runVK() {
	$('.flist_cell').click();
}