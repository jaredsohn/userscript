// ==UserScript==
// @name          hwm_forum_no_mult
// @namespace     Demin
// @description   HWM mod - hwm forum no mult by Demin
// @homepage      http://userscripts.org/scripts/show/124597
// @version       1.01
// @include       http://*heroeswm.*/forum_*
// @include       http://178.248.235.15/forum_*
// @include       http://173.231.37.114/forum_*
// @include       http://*freebsd-help.org/forum_*
// @include       http://*heroes-wm.*/forum_*
// @include       http://*hommkingdoms.info/forum_*
// @include       http://*hmmkingdoms.com/forum_*
// @include       http://*герои.рф/forum_*
// @include       http://*lordswm.*/forum_*
// @include       http://*heroeswm.*/new_topic.php*
// @include       http://178.248.235.15/new_topic.php*
// @include       http://173.231.37.114/new_topic.php*
// @include       http://*freebsd-help.org/new_topic.php*
// @include       http://*heroes-wm.*/new_topic.php*
// @include       http://*hommkingdoms.info/new_topic.php*
// @include       http://*hmmkingdoms.com/new_topic.php*
// @include       http://*герои.рф/new_topic.php*
// @include       http://*lordswm.*/new_topic.php*
// ==/UserScript==

// (c) 2012, demin  (http://www.heroeswm.ru/pl_info.php?id=15091)

var version = '1.01';

var script_num = 124597;
var script_name = 'HWM mod - hwm forum no mult by Demin';
var string_upd = /124597=(\d+\.\d+)/;

var url_cur = location.href;
var url = 'http://'+location.hostname+'/';

try {

if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
    this.GM_getValue=function (key,def) {
        return localStorage[key] || def;
    };
    this.GM_setValue=function (key,value) {
        return localStorage[key]=value;
    };
    this.GM_deleteValue=function (key) {
        return delete localStorage[key];
    };
}

if ( (tag('body'))[0] ) {

var els = tag('embed');

var nick = "";
for( var i = 0; i < els.length; i++ ) {
var el = els[i];
if( el.src.match( /heart.swf/ ) ) {
var vs = el.getAttribute( "FlashVars" ).split('|') ;
army_percent = vs[0].split('=')[1];
if (vs[3]) { nick=vs[3]; break; }
}
}

var nick2 = nick;
nick = encodeURIComponent(nick);
var nick_save = 'nick_save';
if (url.match('lordswm')) { nick_save='lords_nick_save'; }

// del form
if ( GM_getValue( nick_save ) && ( GM_getValue( nick_save ) == nick ) ) { }
else {
var all_a = tag('form');
var a_len = all_a.length;
for (var i=a_len; i--;) {
	var a_i = all_a[i];
	if ( a_i.innerHTML.match(/\u0410\u0432\u0442\u043E\u0440/) || a_i.innerHTML.match(/Author/) ) {
		a_i.style.display = 'none';
		break;
	}
}
}

// set nick
var all_a = tag('th');
var a_len = all_a.length;
for (var i=a_len; i--;) {
	var a_i = all_a[i];
	if ( a_i.innerHTML.match(/\u0410\u0432\u0442\u043E\u0440/) || a_i.innerHTML.match(/Author/) ) {
		addEvent(a_i, "contextmenu", set_nick);
		break;
}
}

// del link new topic
if ( location.pathname=='/forum_thread.php' ) {
if ( GM_getValue( nick_save ) && ( GM_getValue( nick_save ) == nick ) ) { }
else {
var all_a = tag('a');
var a_len = all_a.length;
for (var i=a_len; i--;) {
	var a_i = all_a[i];
	if ( a_i.href.match(/new_topic\.php\?id=/) ) {
		a_i.style.display = 'none';
	}
}
}
}

}

} finally { update_n() }

function set_nick(event) {
GM_setValue( nick_save, nick );
event.cancelBubble = true;
event.preventDefault ? event.preventDefault() : (event.returnValue=false);
alert("HWM forum no mult: Set nick - "+nick2);

//show form
var all_a = tag('form');
var a_len = all_a.length;
for (var i=a_len; i--;) {
	var a_i = all_a[i];
	if ( a_i.innerHTML.match(/\u0410\u0432\u0442\u043E\u0440/) || a_i.innerHTML.match(/Author/) ) {
		a_i.style.display = '';
		break;
	}
}
}

function $( id ) { return document.getElementById( id ); }

function tag( id ) { return document.getElementsByTagName( id ); }

function addEvent(elem, evType, fn) {
	if (elem.addEventListener) {
		elem.addEventListener(evType, fn, false);
	}
	else if (elem.attachEvent) {
		elem.attachEvent("on" + evType, fn)
	}
	else {
		elem["on" + evType] = fn
	}
}

function createXMLHttpReq(rndm)
{
	var objXMLHttpReq;
	
	if (window.XMLHttpRequest)
	{
		// Real browsers ;)
		//
		objXMLHttpReq = new XMLHttpRequest();
	}
	else if (window.ActiveXObject)
	{
		// IE
		//
		objXMLHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	return objXMLHttpReq;
}

function update_n() {
if ( (parseInt(GM_getValue('last_update', '0')) + 86400000 <= (new Date().getTime())) || (parseInt(GM_getValue('last_update', '0')) > (new Date().getTime())) ) {
var objXMLHttpReqUpd = createXMLHttpReq(Math.random()* 1000000);
objXMLHttpReqUpd.open('GET', url + 'photo_pl_photos.php?aid=1777' + '&rand=' + (Math.random()* 1000000), true);
objXMLHttpReqUpd.onreadystatechange = function() { update(objXMLHttpReqUpd); }
objXMLHttpReqUpd.send(null);
}
}
function update(obj) {
if (obj.readyState == 4 && obj.status == 200) {
var update_text1 = '\n\n\u0414\u043E\u0441\u0442\u0443\u043F\u043D\u043E \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 Greasemonkey \u0441\u043A\u0440\u0438\u043F\u0442\u0430 "';
var update_text2 = '".\n\u0425\u043E\u0442\u0438\u0442\u0435 \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u043D\u0443\u044E \u0432\u0435\u0440\u0441\u0438\u044E?';
var remote_version, rt;rt=obj.responseText;GM_setValue('last_update', ''+new Date().getTime());remote_version=string_upd.exec(rt)[1];if(version!=-1){if (remote_version > version) setTimeout(function() { if(confirm('There is an update available for the Greasemonkey script "'+script_name+'".\nWould you like to go to the install page now?'+update_text1+script_name+update_text2)){window.open('http://userscripts.org/scripts/show/'+script_num, '_blank')} }, 100) }}
}
