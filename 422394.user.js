// ==UserScript==
// @name           hwm_forum_spam_filter
// @namespace      Demin
// @description    HWM mod - Udalenie soobshhenij personazhej na forume (by Demin)
// @homepage       http://userscripts.org/scripts/show/92571
// @version        1.2
// @include        http://*heroeswm.ru/forum*
// @include        http://178.248.235.15/forum*
// @include        http://209.200.152.144/forum*
// @include        http://*lordswm.com/forum*
// ==/UserScript==

// (c) 2014, demin  ( http://www.heroeswm.ru/pl_info.php?id=15091 )

(function() {

var version = '1.2';


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


var script_num = 422394;
var script_name = "HWM mod - Udalenie soobshhenij personazhej na forume (by Demin)";
update_n(version,script_num,script_name);

var url_cur = location.href;
var url = 'http://'+location.hostname+'/';


if ( document.querySelector("body") ) {

//GM_deleteValue( "nicks" ); GM_deleteValue( "forums_moder" );
if ( !GM_getValue( "nicks" ) ) GM_setValue( "nicks" , '{"5335714":[],"196562":[],"563418":[],"688546":[],"1549891":[],"1357848":[]}' );
if ( !GM_getValue( "forums_moder" ) ) GM_setValue( "forums_moder" , '{}' );
var non_del = GM_getValue( "non_del", '0' );
var nicks = JSON.parse( GM_getValue( "nicks", '{}' ) );
var forums_moder = JSON.parse( GM_getValue( "forums_moder", '{}' ) );
//alert( decodeURIComponent( GM_getValue( "nicks" ) ) + "\n\n" + GM_getValue( "forums_moder" ) );

if ( url.match('lordswm') ) {
	var message_sett = "Settings script";
	var message = "[Post deleted";
	var message2 = " by spam filter // ";
	var ban_message = "Add nickname to spam list";
} else {
	var message_sett = "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0441\u043A\u0440\u0438\u043F\u0442\u0430";
	var message = "[\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u0443\u0434\u0430\u043B\u0435\u043D\u043E";
	var message2 = " \u0441\u043F\u0430\u043C-\u0444\u0438\u043B\u044C\u0442\u0440\u043E\u043C // ";
	var ban_message = "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0438\u0433\u0440\u043E\u043A\u0430 \u0432 \u0441\u043F\u0430\u043C-\u043B\u0438\u0441\u0442";
}

if ( location.pathname=='/forum_messages.php' ) {

// if moder
var forum_id = document.querySelector("td > a[href*='forum_thread.php?id=']");
if ( forum_id ) {
	forum_id = /id=(\d+)/.exec( forum_id )[1];
	if ( document.querySelector("a[href*='forum_ban.php'],a[href*='forum_messages.php'][href*='md=']") ) {
		non_del = '1';
		if ( !forums_moder[forum_id] ) { forums_moder[forum_id] = "1"; GM_setValue( "forums_moder", JSON.stringify(forums_moder) ); }
	} else if ( forums_moder[forum_id] ) {
		delete forums_moder[forum_id];  GM_setValue( "forums_moder", JSON.stringify(forums_moder) );
	}
}

del_posts();

add_settings();

// add plus
var add_plus = document.querySelector("th");
if ( add_plus.parentNode.nextSibling.nextSibling.querySelector("a[href*='forum_messages.php?tid=']") ) {
	var add_plus_a = document.createElement("span");
	add_plus_a.title = ban_message;
	add_plus_a.innerHTML = ' &radic;';
	addEvent( add_plus_a, "click", add_plus_f );
	add_plus.appendChild( add_plus_a );
}

}
else if ( location.pathname=='/forum_thread.php' ) {

// if moder
var forum_id = document.querySelector("td > a[href*='forum_thread.php?id=']");
if ( forum_id ) {
	forum_id = /id=(\d+)/.exec( forum_id )[1];
	if ( forums_moder[forum_id] ) { non_del = '1'; }
}

del_posts();

add_settings();

}
else if ( location.pathname=='/forum.php' ) {

del_posts();

}

}


function del_posts() {

var pers = document.querySelectorAll("a[href*='pl_info.php?id='][style*='text-decoration']");
for ( var i=pers.length; i--; ) {
	var pers_now = pers[i];
	var pers_now_id = /id=(\d+)/.exec( pers_now )[1];
	var pers_now_parent = pers_now.parentNode;
	while ( pers_now_parent.tagName.toLowerCase()!='td' ) { pers_now_parent = pers_now_parent.parentNode; }

	if ( !nicks[pers_now_id] ) { continue; }
	if ( !nicks[pers_now_id][0] ) { nicks[pers_now_id][0] = encodeURIComponent( pers_now.innerHTML ); GM_setValue( "nicks", JSON.stringify(nicks) ); }

if ( location.pathname=='/forum_messages.php' ) {
	// tr -> next tr
	var pers_now_next_tr = pers_now_parent.parentNode.nextSibling;

if ( non_del != '1' ) {

	if ( pers_now_next_tr.innerHTML.indexOf( message )!=-1 ) {
			// del nick
			var clone_a = pers_now.cloneNode(true);
			clone_a.innerHTML = "Spam";
			clone_a.href = "javascript:void(0);";
			pers_now_parent.innerHTML = "<b></b>"; // td
			pers_now_parent.firstChild.appendChild( clone_a );
	} else {
		if ( i == 0 ) {
			// del nick & replace post
			var clone_a = pers_now.cloneNode(true);
			clone_a.innerHTML = "Spam";
			clone_a.href = "javascript:void(0);";
			pers_now_parent.innerHTML = "<b></b>"; // td
			pers_now_parent.firstChild.appendChild( clone_a );

			pers_now_next_tr.firstChild.innerHTML = "<i>" + message + message2 + "]</i>"; // -> td
		} else {
			// full remove nick & post
			pers_now_parent = pers_now_parent.parentNode; // tr
			pers_now_parent.parentNode.removeChild( pers_now_next_tr ); // next tr
			pers_now_parent.parentNode.removeChild( pers_now_parent ); // tr
		}
	}

} else {

	if ( pers_now_next_tr.innerHTML.indexOf( message )==-1 ) {
		var add_td = pers_now_next_tr.firstChild.cloneNode(true); // td
		add_td.innerHTML = "<i>" + message + message2 + "]</i>";
		// hide message
		pers_now_next_tr.firstChild.style.display = 'none';
		// add message
		pers_now_next_tr.appendChild( add_td );
		addEvent( pers_now_next_tr.lastChild, "click", show_message );
	}

}
}
else if ( location.pathname=='/forum_thread.php' ) {
if ( non_del != '1' ) {
	if ( pers_now_parent.innerHTML.indexOf( "forum_messages.php" )==-1 ) {
		// del all
		pers_now_parent.innerHTML = "Spam"; // td
	} else {
		// del only nick & clan
		var clone_a = pers_now_parent.childNodes[0].cloneNode(true); // link
		var clone_b = pers_now_parent.childNodes[1].cloneNode(true); // textNode
		pers_now_parent.innerHTML = "Spam"; // td
		pers_now_parent.insertBefore( clone_a, pers_now_parent.lastChild );
		pers_now_parent.insertBefore( clone_b, pers_now_parent.lastChild );
	}
}
}
else if ( location.pathname=='/forum.php' ) {
	// neobhodimo udaljat', t.k. visjat obrabotchiki sobytij drugih scriptov
	var clone_a = pers_now.cloneNode(true);
	clone_a.innerHTML = "Spam";
	clone_a.href = "javascript:void(0);";

	pers_now.parentNode.insertBefore( clone_a, pers_now );
	pers_now.parentNode.removeChild( pers_now );
}

}

}

function show_message(event) {
	event = event || window.event;
	event.preventDefault ? event.preventDefault() : (event.returnValue=false);
	event = event.target || event.srcElement;
	while ( event.tagName.toLowerCase()!='td' ) { event = event.parentNode; }

	event.parentNode.firstChild.style.display = '';
	event.parentNode.removeChild( event );
}

function add_plus_f(event) {
	event = event || window.event;
	event.preventDefault ? event.preventDefault() : (event.returnValue=false);
	event = event.target || event.srcElement;
	event.parentNode.removeChild( event );

var pers = document.querySelectorAll("a[href*='pl_info.php?id='][style*='text-decoration']");
nicks = JSON.parse( GM_getValue( "nicks", '{}' ) );
for ( var i=pers.length; i--; ) {
	var pers_now = pers[i];
	var pers_now_id = /id=(\d+)/.exec( pers_now )[1];

	if ( !nicks[pers_now_id] ) {
	// add plus
	var add_plus_a = document.createElement("span");
	add_plus_a.title = ban_message;
	add_plus_a.innerHTML = ' <font style="font-size:11px; color:#696156">[+]</font>';
	addEvent( add_plus_a, "click", add_nick_f );
	pers_now.parentNode.appendChild( add_plus_a );
	}
}
del_posts();
}

function add_nick_f(event) {
	// add nick to spam list
	event = event || window.event;
	event.preventDefault ? event.preventDefault() : (event.returnValue=false);
	event = event.target || event.srcElement;
	var temp_ev = event;
	while ( event.tagName.toLowerCase()!='td' ) { event = event.parentNode; }

	event = event.querySelector("a[href*='pl_info.php?id=']");
	var event_id = /id=(\d+)/.exec( event )[1];

	nicks = JSON.parse( GM_getValue( "nicks", '{}' ) );
	nicks[event_id] = [ encodeURIComponent( event.innerHTML ) ]; GM_setValue( "nicks", JSON.stringify(nicks) );

	temp_ev.parentNode.removeChild( temp_ev );
	del_posts();
}

function add_settings() {
var add_sett = document.querySelector("th");
if ( add_sett.parentNode.nextSibling.nextSibling.querySelector("a[href*='forum_messages.php?tid=']") ) {
	var add_sett_a = document.createElement("span");
	add_sett_a.title = message_sett;
	add_sett_a.innerHTML = ' &#9650;';
	addEvent( add_sett_a, "click", settings );
	add_sett.appendChild( add_sett_a );
}
}

function settings_close()
{
	var bg = $('bgOverlay');
	var bgc = $('bgCenter');
	bg.parentNode.removeChild(bg);
	bgc.parentNode.removeChild(bgc);
}

function settings()
{
	var bg = $('bgOverlay');
	var bgc = $('bgCenter');
	var bg_height = ScrollHeight();

	if ( !bg )
	{
		bg = document.createElement('div');
		document.body.appendChild( bg );

		bgc = document.createElement('div');
		document.body.appendChild( bgc );
	}

		bg.id = 'bgOverlay';
		bg.style.position = 'absolute';
		bg.style.left = '0px';
		bg.style.width = '100%';
		bg.style.background = "#000000";
		bg.style.opacity = "0.5";
		bg.style.zIndex = "7";

		bgc.id = 'bgCenter';
		bgc.style.position = 'absolute';
		bgc.style.left = ( ( ClientWidth() - 650 ) / 2 ) + 'px';
		bgc.style.width = '650px';
		bgc.style.background = "#F6F3EA";
		bgc.style.zIndex = "8";

	addEvent(bg, "click", settings_close);

if ( url.match('lordswm') ) {

var st_author = 'Script writer';
var st_not_del = 'Do not delete messages (hide)';
var st_add = 'Add nickname to spam list (enter id)';
var st_rem = 'Remove nickname from spam list (enter id)';
var st_cl = 'Clear spam list';
var st_cl_forums = 'Clear array of forums';

} else {

var st_author = '\u0410\u0432\u0442\u043E\u0440 \u0441\u043A\u0440\u0438\u043F\u0442\u0430';
var st_not_del = '\u041D\u0435 \u0443\u0434\u0430\u043B\u044F\u0442\u044C \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F (\u0441\u043A\u0440\u044B\u0432\u0430\u0442\u044C)';
var st_add = '\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0438\u0433\u0440\u043E\u043A\u0430 \u0432 \u0441\u043F\u0430\u043C-\u043B\u0438\u0441\u0442 (\u0432\u0432\u0435\u0434\u0438\u0442\u0435 id)';
var st_rem = '\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0438\u0433\u0440\u043E\u043A\u0430 \u0438\u0437 \u0441\u043F\u0430\u043C-\u043B\u0438\u0441\u0442\u0430 (\u0432\u0432\u0435\u0434\u0438\u0442\u0435 id)';
var st_cl = '\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u0441\u043F\u0430\u043C-\u043B\u0438\u0441\u0442';
var st_cl_forums = '\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u043C\u0430\u0441\u0441\u0438\u0432 \u0444\u043E\u0440\u0443\u043C\u043E\u0432';

}

var bgc_temp = '<div style="border:1px solid #abc;padding:5px;margin:2px;"><div style="float:right;border:1px solid #abc;width:15px;height:15px;text-align:center;cursor:pointer;" id="bt_close_tr" title="Close">x</div>'+

'<table><tr><td>'+st_not_del+': <input type="checkbox"'+( GM_getValue( "non_del", '0' )=="1" ? " checked" : "" )+' id="non_del_id"><br><br></td></tr></table>'+

'<table><tr><td>'+st_add+': </td><td><input id="st_add_id" value="" size="9" maxlength="9"> <input type="submit" id="st_add_ok" value="ok"></td><td id="st_status_add"></td></tr>'+
'<tr><td>'+st_rem+': </td><td><input id="st_rem_id" value="" size="9" maxlength="9"> <input type="submit" id="st_rem_ok" value="ok"></td><td id="st_status_rem"></td></tr></table>'+

'<table><tr><td><br><input type="submit" id="clear_list" value="'+st_cl+'"> <input type="submit" id="clear_forums" value="'+st_cl_forums+'"><br><br></td></tr></table>';

bgc_temp += '<div style="width: 100%; max-height: 154px; overflow: scroll; overflow-x: hidden;"><table width="100%" cellpadding="0" cellspacing="0" style="border: 1px #5D413A solid; border-bottom: none;" id="st_mass">'+
'</table></div>';

bgc_temp += '<table width=100%>'+
'<tr><td style="text-align:right">'+st_author+': <a href="pl_info.php?id=15091">Demin</a> <a href="javascript:void(0);" id="open_transfer_id">?</a></td></tr>'+
'</table></div>';

	bgc.innerHTML = bgc_temp;

	nicks = JSON.parse( GM_getValue( "nicks", '{}' ) );
	st_mass_f();

	addEvent($("bt_close_tr"), "click", settings_close);
	addEvent($("non_del_id"), "click", non_del_f);
	addEvent($("st_add_ok"), "click", st_add_f);
	addEvent($("st_rem_ok"), "click", st_rem_f);
	addEvent($("clear_list"), "click", clear_list_f);
	addEvent($("clear_forums"), "click", clear_forums_f);
	addEvent($("open_transfer_id"), "click", open_transfer_f);

	bg.style.top = '0px';
	bg.style.height = bg_height + 'px';
	bgc.style.top = ( window.pageYOffset + 150 ) + 'px';
	bg.style.display = '';
	bgc.style.display = '';
}

function st_mass_f() {
	var nicks_temp = "";
	for (var i in nicks) {
		nicks_temp += "<tr><td style='border-bottom:1px solid #5D413A; width: 40%'>" + i + "</td>";
		nicks_temp += "<td style='border-bottom:1px solid #5D413A; border-left:1px solid #5D413A'>" + ( nicks[i][0] ? decodeURIComponent( nicks[i][0] ) : "&nbsp;" ) + "</td></tr>";
	}
	$("st_mass").innerHTML = nicks_temp;
}

function non_del_f() {
	if ( GM_getValue( "non_del", '0' ) == 0 ) {
		GM_setValue( "non_del", '1' );
		non_del = '1';
	} else {
		GM_setValue( "non_del", '0' );

// if moder
var forum_id = document.querySelector("td > a[href*='forum_thread.php?id=']");
if ( forum_id ) {
	forum_id = /id=(\d+)/.exec( forum_id )[1];
	if ( forums_moder[forum_id] ) { non_del = '1'; }
		else { non_del = '0'; }
}

	}
}

function st_add_f() {
	var temp_id = Number( $("st_add_id").value );
	nicks = JSON.parse( GM_getValue( "nicks", '{}' ) );
	if ( temp_id > 0 && !nicks[temp_id] ) {
		nicks[temp_id] = []; GM_setValue( "nicks", JSON.stringify(nicks) );
		$("st_status_add").innerHTML = "<i> Ok</i>";
		del_posts();
	} else {
		$("st_status_add").innerHTML = "<i> Error</i>";	
	}
	st_mass_f();
}

function st_rem_f() {
	var temp_id = Number( $("st_rem_id").value );
	nicks = JSON.parse( GM_getValue( "nicks", '{}' ) );
	if ( temp_id > 0 && nicks[temp_id] ) {
		delete nicks[temp_id]; GM_setValue( "nicks", JSON.stringify(nicks) );
		$("st_status_rem").innerHTML = "<i> Ok</i>";
	} else {
		$("st_status_rem").innerHTML = "<i> Error</i>";	
	}
	st_mass_f();
}

function clear_list_f() {
	GM_deleteValue( "nicks" );
	GM_setValue( "nicks" , '{"5335714":[],"196562":[],"563418":[],"688546":[],"1549891":[],"1357848":[]}' );
	nicks = JSON.parse( GM_getValue( "nicks", '{}' ) );
	settings_close();
	settings();
}

function clear_forums_f() {
	GM_deleteValue( "forums_moder" );
	GM_setValue( "forums_moder" , '{}' );
	forums_moder = JSON.parse( GM_getValue( "forums_moder", '{}' ) );
}

function open_transfer_f()
{
	if ( location.href.match('lordswm') )
	{
		window.location = "transfer.php?nick=demin&shortcomment=Transferred 10000 Gold 5 Diamonds";
	} else {
		window.location = "transfer.php?nick=demin&shortcomment=%CF%E5%F0%E5%E4%E0%ED%EE%2010000%20%C7%EE%EB%EE%F2%EE%205%20%C1%F0%E8%EB%EB%E8%E0%ED%F2%FB";
	}
}

function ClientHeight() {
	return document.compatMode=='CSS1Compat' && document.documentElement?document.documentElement.clientHeight:document.body.clientHeight;
}

function ClientWidth() {
	return document.compatMode=='CSS1Compat' && document.documentElement?document.documentElement.clientWidth:document.body.clientWidth;
}

function ScrollHeight() {
	return Math.max(document.documentElement.scrollHeight,document.body.scrollHeight);
}

function $(id) { return document.querySelector("#"+id); }

function addEvent(elem, evType, fn) {
	if (elem.addEventListener) {
		elem.addEventListener(evType, fn, false);
	}
	else if (elem.attachEvent) {
		elem.attachEvent("on" + evType, fn);
	}
	else {
		elem["on" + evType] = fn;
	}
}

function update_n(a,b,c,d,e){if(e){e++}else{e=1;d=(Number(GM_getValue('last_update_script','0'))||0)}if(e>3){return}var f=new Date().getTime();var g=$('update_demin_script');if(g){if((d+86400000<f)||(d>f)){g=g.innerHTML;if(/100000=1.1/.exec(g)){var h=new RegExp(b+'=(\\d+\\.\\d+)').exec(g);if(a&&h){if(Number(h[1])>Number(a))setTimeout(function(){if(confirm('\u0414\u043E\u0441\u0442\u0443\u043F\u043D\u043E \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u0441\u043A\u0440\u0438\u043F\u0442\u0430: "'+c+'".\n\u0423\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u043D\u0443\u044E \u0432\u0435\u0440\u0441\u0438\u044E \u0441\u0435\u0439\u0447\u0430\u0441?\n\nThere is an update available for the script: "'+c+'".\nWould you like install the script now?')){if(typeof GM_openInTab=='function'){GM_openInTab('http://userscripts.org/scripts/show/'+b)}else{window.open('http://userscripts.org/scripts/show/'+b,'_blank')}window.location='http://userscripts.org/scripts/source/'+b+'.user.js'}},500)}GM_setValue('last_update_script',''+f)}else{setTimeout(function(){update_n(a,b,c,d,e)},1000)}}}else{var i=document.querySelector('body');if(i){var j=GM_getValue('array_update_script');if(e==1&&((d+86400000<f)||(d>f)||!j)){if(j){GM_deleteValue('array_update_script')}setTimeout(function(){update_n(a,b,c,d,e)},1000);return}var k=document.createElement('div');k.id='update_demin_script';k.setAttribute('style','position: absolute; width: 0px; height: 0px; top: 0px; left: 0px; display: none;');k.innerHTML='';i.appendChild(k);if((d+86400000<f)||(d>f)||!j){var l=new XMLHttpRequest();l.open('GET','photo_pl_photos.php?aid=1777'+'&rand='+(Math.random()*100),true);l.onreadystatechange=function(){update(l,a,b,c,d,e)};l.send(null)}else{$('update_demin_script').innerHTML=j;setTimeout(function(){update_n(a,b,c,d,e)},10)}}}}function update(a,b,c,d,e,f){if(a.readyState==4&&a.status==200){a=a.responseText;var g=/(\d+=\d+\.\d+)/g;var h='';var i;while((i=g.exec(a))!=null){if(h.indexOf(i[1])==-1){h+=i[1]+' '}};GM_setValue('array_update_script',''+h);var j=$('update_demin_script');if(j){j.innerHTML=h;setTimeout(function(){update_n(b,c,d,e,f)},10)}}}

})();
