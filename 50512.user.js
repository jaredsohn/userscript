// ==UserScript==
// @name           Ban Button
// @namespace      GLB
// @include        http://goallineblitz.com/game/user_admin.pl?user_id=*
// ==/UserScript==

function ban() {
	var url = 'http://goallineblitz.com/game/user_admin.pl?user_id=' + id + '&active=0&action=Update'
	GM_xmlhttpRequest({
	method: 'GET',
	url: url,
	headers: {'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        	  	'Accept': 'application/atom+xml,application/xml,text/xml'}
	})
	setTimeout("location.reload(true);",500)
}

function unban() {
	var url = 'http://goallineblitz.com/game/user_admin.pl?user_id=' + id + '&active=1&action=Update'
	GM_xmlhttpRequest({
	method: 'GET',
	url: url,
	headers: {'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        	  	'Accept': 'application/atom+xml,application/xml,text/xml'}
	})
	setTimeout("location.reload(true);",500)
}

function reload() {
setTimeout('testLock2', 1000);
}

var id = document.location.href.split('user_id=', 2)[1]
var input = document.getElementsByName('active')[0]
input.setAttribute('type', 'button')
var status = input.getAttribute('value')
if(status == 1) {
	input.setAttribute('value', 'Ban')
	input.addEventListener("click", ban, false)
}
if(status == 0) {
	input.setAttribute('value', 'Unban')
	input.addEventListener("click", unban, false)
}
input.parentNode.removeChild(input.prevSibling.prevSibling)