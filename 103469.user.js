// ==UserScript==
// @name           fixedHead
// @namespace      fnx
// @include        http://klavogonki.ru*
// @author         Fenex
// @version        1.2.0
// @icon           http://www.gravatar.com/avatar.php?gravatar_id=d9c74d6be48e0163e9e45b54da0b561c&r=PG&s=48&default=identicon
// ==/UserScript==
function changePin() {
	if(getPrefCookie("userpanel_pinned")) {
		deletePrefCookie("userpanel_pinned");
		$$(".userpanel").last().style.position="static";
		$("pin").removeClassName("active");
		$("userpanel-dummy").hide();
		$("userpanel-dummy-fh").hide();
		$('head').style.position = "static";
		$$('.bar').first().style.position = "static";
	} else {
		var a=new Date();
		a.setTime(a.getTime()+3*365*24*3600*1000);
		setPrefCookie("userpanel_pinned","1");
		$$(".userpanel").last().style.position="fixed";
		$("pin").addClassName("active");
		$("userpanel-dummy").show();
		$("userpanel-dummy-fh").show();
		$('head').style.position = "fixed";
		$$('.bar').first().style.position = "fixed";
	}
}
function init_pinned() {
	var e = document.createElement('div');
	e.id = "userpanel-dummy-fh";
	e.style.display = 'none';
	$('head').parentNode.insertBefore(e, $('head').nextSibling);
	if(getPrefCookie("userpanel_pinned")) {
		$('head').style.position = "fixed";
		$("userpanel-dummy-fh").show();
		$$('.bar').first().style.position = "fixed";
	}
}
var s = document.createElement('script');
s.innerHTML = init_pinned+changePin+'init_pinned();';
document.body.appendChild(s);
s = document.createElement('style');
s.innerHTML = ".banner-back{display:none !important;}#head{width:100%;z-index:50;background:white url(http://klavogonki.ru/img/top_back.gif) repeat-x 0 0}#userpanel-dummy-fh{height:113px;}.bar{z-index:50}";
document.body.appendChild(s);