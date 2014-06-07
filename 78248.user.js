// ==UserScript==
// @name           Quick Delete
// @namespace      Personoid
// @description    Adds a delete post link to the search page
// @include        http://*.zerozaku.com/search.php?*
// @include        https://*.zerozaku.com/search.php?*
// @require        http://github.com/kvz/phpjs/raw/master/functions/strings/explode.js
// @require        http://github.com/kvz/phpjs/raw/master/functions/strings/stristr.js
// @require        http://github.com/kvz/phpjs/raw/master/functions/strings/str_ireplace.js
// ==/UserScript==

var li_arr = document.getElementsByTagName("li");
var post_arr, postid_arr, replace_str;
for (var i in li_arr) {
	if (stristr(li_arr[i].innerHTML, 'Jump to post')) {
		post_arr     = explode('&amp;', str_ireplace('">Jump to post</a>', '', str_ireplace('<a href="./viewtopic.php?', '', li_arr[i].innerHTML)));
		postid_arr   = explode('#', post_arr[2]);
		replace_str  = str_ireplace('Jump to post', 'Jump', li_arr[i].innerHTML);
		replace_str += '<a target="_blank" href="./posting.php?mode=delete&' + post_arr[0] + '&' + post_arr[1] + '&' + postid_arr[0] + '">Delete</a>';
		document.getElementsByTagName("li")[i].innerHTML = replace_str;
	}
}