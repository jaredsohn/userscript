// ==UserScript==
// @name           Bukkit Tag
// @author         Sharkiller
// @namespace      BukkitTag
// @description    Add tag link in comments.
// @include        http://forums.bukkit.org/threads/*
// ==/UserScript==

var unsafeWindow = this['unsafeWindow'];
if(/Opera|Chrome|Chromium|Safari/.test(navigator.userAgent)) {
	unsafeWindow = window;
	if(/Chrome|Chromium|Safari/.test(navigator.userAgent)){
		var div = document.createElement("div");
		div.setAttribute("onclick", "return window;");
		unsafeWindow = div.onclick();
	}
}

var $ = unsafeWindow.jQuery;

$(document).ready(function() {
	$('li.message').each(function(index){
		var name = ' @'+$(this).attr('data-author')+' ';
		var html = '<a class="item control TagLink" href=""><span></span><span class="TagLabel">Tag</span></a>';
		$(this).find('.publicControls').prepend(html).find('.TagLink').click(function(){
			unsafeWindow.tinyMCE.execCommand('mceReplaceContent',false,name);;
			return false;
		});
	});
});