// ==UserScript==
// @name            Exbii Forum Post Navigator
// @author          Sonu Joshi
// @namespace       http://www.example.url/to/your-web-site/
// @description     Helps you to fap with ease. One finger navigation.
// @license         Creative Commons Attribution License
// @version	        0.1
// @include         http://www.exbii.com/*
// @released        2013-06-03
// @updated         2013-03-03
// @compatible      Greasemonkey
// ==/UserScript==
function nextlink(name, path) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(path);
    if (results == null)
        return "";
    else
        return parseInt(results[1]);
}
function checkKey(e) {
    e = e || window.event;
    if (e.keyCode == '37') {
        navigate = 'http://www.exbii.com/showthread.php?t='+nextlink('t',url)+'&page='+(gotopage-2);
        top.location.href = navigate;
    }
    else if (e.keyCode == '39') {
        navigate = 'http://www.exbii.com/showthread.php?t='+nextlink('t',url)+'&page='+(gotopage);
        top.location.href = navigate;
    }
}
var url = document.URL;
if(url.contains('http://www.exbii.com/showthread.php?t=')){
	if(url.contains('&page=')){
		gotopage = nextlink('page',url)+1;
	}
	else{
		gotopage = 1;
		gotopage++;
	}
	document.onkeydown = checkKey;
}