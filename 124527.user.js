// ==UserScript==
// @name           hwm_auction_back
// @namespace      Demin
// @description    HWM mod - Auction back (by Demin)
// @homepage       http://userscripts.org/scripts/show/124527
// @version        2.00
// @include        http://*heroeswm.*/auction*new_lot.php*
// @include        http://178.248.235.15/auction*new_lot.php*
// @include        http://*.lordswm.*/auction*new_lot.php*
// @include        http://*герои.рф/?15091
// ==/UserScript==

// (c) 2012, demin  (http://www.heroeswm.ru/pl_info.php?id=15091)

var version = '2.00';

var only_back = '0';
var delay = '3000'; // milli seconds

var url_cur = location.href;
var url = 'http://'+location.hostname+'/';

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

if ( Number(delay) && Number(delay)>450 ) { delay = Number(delay) } else { delay = 3000 }

var accept_lot = '\u041B\u043E\u0442 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0432\u044B\u0441\u0442\u0430\u0432\u043B\u0435\u043D';
var to_auction = 'Возврат на рынок';
if (url.match('lordswm')) {
accept_lot = 'Lot posted successfully';
to_auction = 'Return to market';
}

if ( (tag('body'))[0] ) {

if ( location.pathname=='/auction_new_lot.php' && document.referrer && only_back=='0' ) {
	if ( !document.referrer.match('auction_new_lot.php') ) {
		GM_setValue("referrer", '');
	}
	if ( document.referrer.split('?')[1] ) {
		GM_setValue("referrer", document.referrer.split('?')[1]);
	}
}

if ( location.pathname=='/auction_accept_new_lot.php' ) {
var b = (tag('body'))[0];
if ( b.innerHTML.match( accept_lot ) ) {

var all_a = tag('a');
var a_len = all_a.length;
for (var i=a_len; i--;) {
	var a_i = all_a[i];
	if ( a_i.href.match('auction.php') && a_i.parentNode.innerHTML.match(accept_lot) ) {

	var bt = document.createElement('span');
	bt.innerHTML = '';
	a_i.parentNode.insertBefore(bt, a_i.nextSibling);
	bt.id = Math.round(delay/1000);

	var st = document.createElement('span');
	if ( only_back=='0' && GM_getValue("referrer") ) {
	var aa = url+'auction.php?'+GM_getValue("referrer");
	} else {
	var aa = url+'auction.php';
	}
	st.innerHTML = '<br><br><a href="'+aa+'">'+to_auction+'</a>&nbsp;'+loaderr()+'&nbsp;';
	a_i.parentNode.insertBefore(st, a_i.nextSibling);

	reload_time(bt);
	break;
}
}
}
}

}

function reload_time(res) {
var id = res.id;
if ( id > 0 ) {
res.innerHTML += '&nbsp;<font color=red><b>'+id+'</b></font>..';
res.id = Number(id-1);
}
if ( id == 1) {

if ( only_back=='0' && GM_getValue("referrer") ) {
setTimeout(function() { window.location=url+'auction.php?'+GM_getValue("referrer"); }, 999);
} else {
setTimeout(function() { window.location=url+'auction.php'; }, 999);
}

return;
}
setTimeout(function() { reload_time(res); }, 999);
}

function loaderr() {
return '<img border="0" src="data:image/gif;base64,R0lGODlhEAAQAMQAAP///+7u7t3d3bu7u6qqqpmZmYi'+
'IiHd3d2ZmZlVVVURERDMzMyIiIhEREQAR'+
'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'+
'fySDhGYQdDWGQyUhADs=">';
}

function $( id ) { return document.getElementById( id ); }

function tag( id ) { return document.getElementsByTagName( id ); }
