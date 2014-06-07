// ==UserScript==
// @name        Invisible Ignore List
// @namespace   IIL
// @description Makes users on your ignore list completely invisible in threads.
// @include     http://www.wickedfire.com/*
// @version     1.5
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js
// @grant		GM_getValue
// @grant		GM_setValue
// ==/UserScript==


//removes all ignored user's posts from a thread
$("div.smallfont:contains('This message is hidden because')").parents('.page').each(function(){ $(this).parent().hide()});

//removes all threads started by an ignored user from forum index pages
var ignore_list_url = "http://www.wickedfire.com/profile.php?do=ignorelist";
var ignored_users = [];
var last_ignored = GM_getValue('last_ignored');
var current_time =  Math.round(new Date().getTime() / 1000);

if(last_ignored < current_time - 300 || !last_ignored){
	$.get(ignore_list_url, function(page) {  
	
		$(page).find("ul#ignorelist li a").each(function(){
			ignored_users.push($(this).text());
		});
		strip_threads(ignored_users);
		GM_setValue('last_ignored', current_time);
		
		if(ignored_users[0]){
			GM_setValue('ignore_list', ignored_users.join());
		}else{
			GM_setValue('ignore_list', false);
		}
		
	});
}else{
	ignored_users = GM_getValue('ignore_list');
	if(ignored_users)
		strip_threads(ignored_users.split(','));
}

function strip_threads(user_list){
	var threads = $("[id*='td_threadtitle'] .smallfont span");
	threads.each(function(){
		if($.inArray($(this).text(), user_list) > -1)
			$(this).parents('tr').hide();
	});

}