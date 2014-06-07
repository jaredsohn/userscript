// ==UserScript==
// @name        Ov Comments Quick Reply
// @namespace   https://getsatisfaction.com/pluto/products/pluto_ov_profile_scripts
// @description Reply to comments quickly without having to visit the other user's profile!
// @include     http://www.onverse.com/profile/myprofile.php
// @include     http://www.onverse.com/profile/profile.php*
// @require     http://code.jquery.com/jquery-1.6.2.min.js
// @version     1
// ==/UserScript==
window.replyTo=function(el,id){
	console.log('here');
	var x=$('#postcmt').clone();
	console.log(x);
	x.find('textarea').val('');
	x.find('input[name="toid"]').val(id);
	x.find('.submit input').click(function(){
		var i=$(this).parents('form');
		$.post(i.attr('action'),i.serialize()).success(function(){
			$('#'+el).append($('<div>').text('Replied!'));
		}).error(function(){
			$('#'+el).append($('<div>').text('Error!'));
		});
		i.parents('.dataFrameHLFB').remove();
		return false;
	});
	$('#'+el).after(x.removeClass('hidden').attr('id',''));
	x.find('textarea').focus();
}
window.replyButtons=function(tim){
	if(!window.timeLast)
		window.timeLast=Date.now();
	else if(tim.timeStamp-window.timeLast > 50)
		window.timeLast=tim.timeStamp;
	else
		return;
	var x=$('#moreDropGroup .dataFrame .commentCell');
	var item,i;
	for(var z=0; z<x.length; z++) {
		i=x[z];
		if($(i).text().indexOf(String.fromCharCode(8658))>-1)
			continue;
		item=$('<a>').attr('href','javascript:replyTo(\''+$(i).parents('.dataFrame').attr('id')+'\','+$(i).prev().find('a').attr('href').match(/\d+$/)[0]+');');
		$(i).children().first().after(item.clone().addClass('delbutton').css({"line-height":1.25,"margin-right":'5px'}).html('&rArr;'));
		$(i).children().last().append(' - ').append(item.clone().text('Reply'));
	}
}
replyButtons();
$('#moreDropGroup').bind("DOMSubtreeModified",replyButtons);