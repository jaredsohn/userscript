// ==UserScript==
// @name           Test Blog to GLB
// @namespace      GLB
// @include        http://goallineblitz.com/game/forum_thread_list.pl?forum_id=4
// @include        http://goallineblitz.com/game/forum_thread_list.pl?forum_id=4&*
// ==/UserScript==

var url = 'http://goallineblitz.com/game/forum_thread_list.pl?forum_id=3'

GM_xmlhttpRequest({
method: 'GET',
url: url,
headers: {
'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
'Accept': 'application/atom+xml,application/xml,text/xml',
},
onload: function(blog) {
var response1=blog.responseText;
var test1=response1.split('<tr class="alternating_color2 forum">');
var test2=test1[5].split('</tr')[0];
var test2 = '<tr class="alternating_color2 forum">' + test2 + '</tr>';
var container = document.getElementsByTagName('tbody')[0];
container.innerHTML = container.innerHTML + test2;
}

});