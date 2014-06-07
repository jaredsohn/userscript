// ==UserScript==
// @name           Alan B-Mail Notifier
// @namespace      Alan B-Mail Notifier
// @description    Alan B-Mail Notifier
// @include        http://bots4.net/*
//
// @author         Alan
// @version 	   7/11/2011 2.0
// ==/UserScript==


function get_time() {
	var body = document.getElementById('content').innerHTML;var str = body.split('<script type="text/javascript">');var dex = str[1].split('</script'); var pieces = dex[0].split('"');var x = 0;var attempts = 0;for(var i = 0; i<=pieces.length;i++) {if(pieces[i] == 'attempts') { if(x>0) { var pull = pieces[i+1].charAt(1); if(!isNaN(pieces[i+1].charAt(2))) { pull += pieces[i+1].charAt(2); } attempts += parseInt(pull) } x++ }}var timeT = parseInt(((parseInt(attempts)+1)*.8)*1000);return timeT;
}
var menu = document.getElementById('left-nav').innerHTML;var str = menu.split('<a href="/post-office">');var dex = str[1].split('</a>');var pieces = dex[0].split('"');var need = pieces[6];var almost = need.split('>');var maybe = almost[1].split('<');
var total_messages = maybe[0];
timeT = get_time();
function check(timeT) {
document.getElementById('battle-header').style.textAlign='left';
	document.getElementById('battle-header').innerHTML = "<font color='yellow'><b>You have "+total_messages+" message(s)!</b></font>";
}
check(timeT);