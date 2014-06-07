// ==UserScript==
// @name           hwm_forum_extension
// @namespace      Demin
// @description    HWM mod - Forum extension by Demin
// @homepage       http://userscripts.org/scripts/show/147542
// @version        1.00
// @include        http://*heroeswm.*/forum_thread.php*
// @include        http://178.248.235.15/forum_thread.php*
// @include        http://*герои.рф/?15091
// ==/UserScript==

// (c) 2012, demin  (http://www.heroeswm.ru/pl_info.php?id=15091)

var version = '1.00';

var script_num = 147542;
var script_name = 'HWM mod - Forum extension by Demin';
var string_upd = /147542=(\d+\.\d+)/;

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

var hide = 1;

var table3 = cls('table3')[0];
var page_load = (/page=(\d+)/).exec(url_cur);
if ( page_load ) page_load = page_load[1]; else page_load = 0;
var forum_id = /forum_thread\.php\?id=(\d+)/.exec(url_cur)[1];

if ( forum_id==22 ) {
var check_oruz = GM_getValue('check_oruz', '1');
var check_kyzn = GM_getValue('check_kyzn', '0');
var check_kyzn_90 = GM_getValue('check_kyzn_90', '1');

// tablica nastroek
var table_n = document.createElement('table');
table_n.innerHTML = '<tr><td>&nbsp;<label for=check_oruz style="cursor:pointer;">Удалять оружейников</label><input type=checkbox '+(check_oruz==1?'checked':'')+' id=check_oruz>&nbsp;&nbsp;</td>'+
'<td>&nbsp;<label for=check_kyzn style="cursor:pointer;">Удалять кузнецов, кроме 90%</label><input type=checkbox '+(check_kyzn==1?'checked':'')+' id=check_kyzn>&nbsp;&nbsp;</td>'+
'<td>&nbsp;<label for=check_kyzn_90 style="cursor:pointer;">Удалять кузнецов 90%</label><input type=checkbox '+(check_kyzn_90==1?'checked':'')+' id=check_kyzn_90></td></tr>';
table3.parentNode.insertBefore(table_n, table3);

addEvent($("check_oruz"), "click", check_forum_22);
addEvent($("check_kyzn"), "click", check_forum_22);
addEvent($("check_kyzn_90"), "click", check_forum_22);
}

if ( forum_id==23 ) {
var check_23_uslugi = GM_getValue('check_23_uslugi', '1');
var check_23_kuply = GM_getValue('check_23_kuply', '0');

// tablica nastroek
var table_n = document.createElement('table');
table_n.innerHTML = '<tr><td>&nbsp;<label for=check_23_uslugi style="cursor:pointer;">Удалять услуги</label><input type=checkbox '+(check_23_uslugi==1?'checked':'')+' id=check_23_uslugi>&nbsp;&nbsp;</td>'+
'<td>&nbsp;<label for=check_23_kuply style="cursor:pointer;">Удалять покупки</label><input type=checkbox '+(check_23_kuply==1?'checked':'')+' id=check_23_kuply>&nbsp;&nbsp;</td></tr>';
table3.parentNode.insertBefore(table_n, table3);

addEvent($("check_23_uslugi"), "click", check_forum_23);
addEvent($("check_23_kuply"), "click", check_forum_23);
}

// zagruzit' novyu stranizy
var new_page = document.createElement('center');
new_page.setAttribute('style', 'cursor:pointer;');
new_page.setAttribute('id', 'new_page');
new_page.innerHTML = '<ins>Загрузить следующую страницу</ins><span style="display:none" id=page_load>'+page_load+'</span>';
table3.parentNode.insertBefore(new_page, table3.nextSibling);

addEvent($("new_page"), "click", load_page);

hide_tr(table3);

}

} finally { update_n() }

function check_forum_22()
{
if ( $('check_oruz').checked==true ) check_oruz = '1'; else check_oruz = '0';
if ( $('check_kyzn').checked==true ) check_kyzn = '1'; else check_kyzn = '0';
if ( $('check_kyzn_90').checked==true ) check_kyzn_90 = '1'; else check_kyzn_90 = '0';
GM_setValue("check_oruz", check_oruz);
GM_setValue("check_kyzn", check_kyzn);
GM_setValue("check_kyzn_90", check_kyzn_90);

hide_tr(cls('table3')[0]);
}

function check_forum_23()
{
if ( $('check_23_uslugi').checked==true ) check_23_uslugi = '1'; else check_23_uslugi = '0';
if ( $('check_23_kuply').checked==true ) check_23_kuply = '1'; else check_23_kuply = '0';
GM_setValue("check_23_uslugi", check_23_uslugi);
GM_setValue("check_23_kuply", check_23_kuply);

hide_tr(cls('table3')[0]);
}

function load_page()
{
$("new_page").style.display = 'none';
var page_load = Number($('page_load').innerHTML) + 1;
$('page_load').innerHTML = page_load;
var forum_id = /forum_thread\.php\?id=(\d+)/.exec(url_cur)[1];

var objXMLHttpReqPage = createXMLHttpReq(Math.random()* 1000000);
objXMLHttpReqPage.open('GET', url + 'forum_thread.php?id=' + forum_id + '&page=' + page_load + '&rand=' + (Math.random()* 1000000), true);
objXMLHttpReqPage.overrideMimeType('text/plain; charset=windows-1251');
objXMLHttpReqPage.onreadystatechange = function() { handleHttpResponsePage(objXMLHttpReqPage); }
objXMLHttpReqPage.send(null);
}

function handleHttpResponsePage(obj) {
if (obj.readyState == 4 && obj.status == 200) {
$("new_page").style.display = '';
var forum_id = /forum_thread\.php\?id=(\d+)/.exec(url_cur)[1];
var table3 = obj.responseText;
var page = (/<b><font color=.?red.?>(\d+)<\/font><\/b>\|<a/).exec(table3)[1];
table3 = (/(<tr.*><td><a href=.?forum_messages\.php\?tid=.+<\/a><\/td><\/tr>)/).exec(table3);
cls('table3')[0].innerHTML = cls('table3')[0].innerHTML + '<tr><td colspan=2><hr></td><td><a href=forum_thread.php?id='+forum_id+
				'&page='+(page-1)+'><b><font color=red>'+page+'</font></b></a></td><td colspan=2><hr></td></tr>' + table3[1];
hide_tr(cls('table3')[0]);

// udalenie ssylok dlya zagryzennyh straniz
var regexp_p = new RegExp('(<a href=.?forum_thread\\.php\\?id='+forum_id+'.{0,6}page='+(page-1)+'.?>'+page+'</a>)');
var all_a = tag('center');
var a_len = all_a.length;
for (var i=a_len; i--;) {
var a_i = all_a[i];
if ( a_i.innerHTML.indexOf("<center")!=-1 ) {continue;}
if ( regexp_p.exec(a_i.innerHTML) ) {
a_i.innerHTML = a_i.innerHTML.split(regexp_p.exec(a_i.innerHTML)[1]).join('<b><font color="red">'+page+'</font></b>');
break;
}
}

}
}

function hide_tr(table3)
{
var forum_id = /forum_thread\.php\?id=(\d+)/.exec(url_cur)[1];
var second = 0;
var all_a = table3.getElementsByTagName('tr');
var a_len = all_a.length;
for (var i=0; i<a_len; i++) {
var a_i = all_a[i];
if ( a_i.innerHTML.indexOf("<tr")!=-1 ) {continue;}
if ( a_i.innerHTML.match(/forum_messages\.php\?tid=/) ) {
var td_first = a_i.firstChild.innerHTML.toLowerCase();

// kuznezy, oruzeiniki
if ( forum_id==22 ) {
if ( check_oruz == '1' ) {
if ( ( td_first.indexOf("крафт")!=-1 || td_first.indexOf("kрафт")!=-1 ) && td_first.indexOf("ремонт")==-1 ) {
if ( hide==1 ) a_i.style.display = 'none'; else a_i.style.background = '#DCBD87';
continue;
}
}
if ( check_kyzn == '1' ) {
if ( td_first.indexOf("ремонт")!=-1 && td_first.indexOf("крафт")==-1 && td_first.indexOf("90%")==-1 && td_first.indexOf("90 %")==-1 && td_first.indexOf("90 за")==-1 ) {
if ( hide==1 ) a_i.style.display = 'none'; else a_i.style.background = '#DCBD87';
continue;
}
}
if ( check_kyzn_90 == '1' ) {
if ( ( td_first.indexOf("90%")!=-1 || td_first.indexOf("90 %")!=-1 || td_first.indexOf("90 за")!=-1 ) && td_first.indexOf("крафт")==-1 ) {
if ( hide==1 ) a_i.style.display = 'none'; else a_i.style.background = '#DCBD87';
continue;
}
}
}

// pgv, uslugi
if ( forum_id==23 ) {
if ( check_23_uslugi == '1' ) {
if ( td_first.indexOf("услуги")!=-1 ) {
if ( hide==1 ) a_i.style.display = 'none'; else a_i.style.background = '#DCBD87';
continue;
}
}
if ( check_23_kuply == '1' ) {
if ( td_first.indexOf("куплю")!=-1 || td_first.indexOf("kуплю")!=-1 ) {
if ( hide==1 ) a_i.style.display = 'none'; else a_i.style.background = '#DCBD87';
continue;
}
}
}

if ( second == 1 ) { a_i.className = "second"; second = 0; } else { a_i.className = ""; second = 1; }
if ( hide==1 ) a_i.style.display = ''; else a_i.style.background = '';
}

// dlya dobavlyaemyh <hr>
else if ( a_i.innerHTML.match(/<td colspan=.?2.?><hr><\/td>/) ) {
if ( second == 1 ) { a_i.className = "second"; second = 0; } else { a_i.className = ""; second = 1; }
}

}
}

function $( id ) { return document.getElementById( id ); }

function tag( id ) { return document.getElementsByTagName( id ); }

function cls( id ) { return document.getElementsByClassName( id ); }

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
