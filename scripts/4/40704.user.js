// ==UserScript==
// @name           HWM_Forum_Adv
// @namespace      http://www.amse.ru/
// @include        http://www.heroeswm.ru/forum_messages.php*
// @include        http://www.heroeswm.ru/forum_thread.php*
// ==/UserScript==

var url_cur = location.href;

var params = url_cur.split("?")[1];
var id = params.split("&")[0].split("=")[1];

var tr_arr;
var tbody_arr = document.getElementsByTagName('tbody');
var tbody_index = 0;

updateReadedMessages();
scrollToFirstUnread();
parseThreadPage();

function scrollToFirstUnread() {
	if (url_cur.indexOf("forum_messages.php") == -1) {return;}
	var t = GM_getValue("scroll", false);
	GM_setValue("scroll", false);
	if (!t) {return;}
	var n = GM_getValue("number", 0);
	GM_setValue("number", 0);
	if (n == 0) {return;}
	scrollToMessage(n);		
}

function parseThreadPage() {
	if (url_cur.indexOf("forum_thread.php") == -1) {return;}
	for (var i = 0; i < tbody_arr.length; i++) {
		if (tbody_arr[i].innerHTML.indexOf("second") != -1) {
			tbody_index = i;
		}
	}
	tr_arr = tbody_arr[tbody_index].getElementsByTagName('tr');
	for (var i = 1; i < tr_arr.length; i++) {
		var td_arr = tr_arr[i].getElementsByTagName('td');
		var a = td_arr[0].getElementsByTagName('a')[0];
		var href = a.href;
		var mid = href.split("=")[1];
		var last_number = td_arr[2].innerHTML;
		var last_number_cur = GM_getValue("m" + mid, "0"); 
		if (parseInt(last_number) > parseInt(last_number_cur)) {
			var new_a = document.createElement('a');
			new_a.innerHTML = "[#]";
			new_a.href = 'javascript: void(0)' ;
			new_a.setAttribute('id', mid);
			new_a.addEventListener( "click", clickEvent , false );
			new_a.title = "\u041a \u043f\u0435\u0440\u0432\u043e\u043c\u0443 \u043d\u0435\u043f\u0440\u043e\u0447\u0438\u0442\u0430\u043d\u043d\u043e\u043c\u0443 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u044e" ;			
			
			insertAfter(td_arr[0], new_a, a);
		}
	}
}

function clickEvent() {
	var mid = this.getAttribute('id');
	var last_number_cur = GM_getValue("m" + mid, "0"); 
	GM_setValue("scroll", true);
	var n = parseInt(last_number_cur) + 1;
	GM_setValue("number", (n - 1) % 20 + 1);
	location.href = "http://www.heroeswm.ru/forum_messages.php?tid="+mid+"&page="+(Math.round((n - 1) / 20 - 0.5));
}

function updateReadedMessages() {
	if (url_cur.indexOf("forum_messages.php") == -1) {return;}
	for (var i = 0; i < tbody_arr.length; i++) {
		if (tbody_arr[i].innerHTML.indexOf("message_footer") != -1) {
			tbody_index = i;
		}
	}
	tr_arr = tbody_arr[tbody_index].getElementsByTagName('tr');
	var last_number = tr_arr[tr_arr.length - 2 - (tr_arr.length - 1) % 3].childNodes[0].childNodes[0].getElementsByTagName('a')[0].innerHTML;
	var last_number_cur = GM_getValue("m" + id, "0");
	if (parseInt(last_number) > parseInt(last_number_cur)) {
		GM_setValue("m" + id, last_number);
	}
}

function scrollToMessage(n)
{
	window.scrollTo(0, 0);
	if (n == 0) {return;}
	var el;
	el = tr_arr[3 * (n - 1)];
	for (var i = 0; i < 7; i++) {
		scrollDown(el.offsetTop);
		el = el.parentNode;
	}
        el = tr_arr[3 * (n - 1)];
	scrollDown(el.clientHeight);
}

function scrollDown(n) {
	window.scrollBy(0, n);
}

function insertAfter(parent, node, referenceNode) {
	parent.insertBefore(node, referenceNode.nextSibling);
}