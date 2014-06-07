// ==UserScript==
// @author         rikuo
// @name           HB more threshold
// @namespace      http://d.hatena.ne.jp/rikuo/
// @description    The threshold is added to the Hatena bookmark.
// @include        http://b.hatena.ne.jp/entrylist*
// @include        http://b.hatena.ne.jp/t/*
// @include        http://b.hatena.ne.jp/keyword/*
// @include        http://b.hatena.ne.jp/*/favorite*
// ==/UserScript==


//------------ threshold list ---------------------------------

var menu = [];

menu.entrylist = [ 10,25,50,100 ];	// ex. http://b.hatena.ne.jp/entrylist*

menu.favorite = [ 4,5,8,10 ];		// ex. http://b.hatena.ne.jp/sample/favorite*

//------------ sort no threshold ------------------------------

var eid_sort = true;

//-------------------------------------------------------------

// http://userscripts.org/scripts/show/43636



var _doc = document;
var df = document.createDocumentFragment();
var url = location.href;
var syntaxRE = /(^http:\/\/b.hatena.ne.jp\/(?:[a-z][\w-]{1,30}[a-z0-9]\/(favorite)|[^\?]+))/i;
var type = (syntaxRE.test(url) && RegExp.$2 == 'favorite') ? 'favorite' : 'entrylist' ;
var link = RegExp.$1;
var search = (/[\?&](url\=http[^\?]+)/i.test(url)) ? '&' + RegExp.$1 : '' ;
var threshold = (/[\?&]threshold=([\d]+)/i.test(url)) ? RegExp.$1 : 0 ;
var selector = xpath(_doc, 'descendant::ul[@class="selector" or @class="threshold"][1]').snapshotItem(0);

if(!selector)return;

var ref;

if(type == 'entrylist'){
	ref = xpath( selector, 'li[child::a[contains(@href,"?sort=eid")]]').snapshotItem(0);
}else if(threshold == 0){
	var cookies = _doc.cookie.split('; ');
	for (var i = 0,cl = cookies.length; i < cl; ++i) {
		if(/threshold=(\d+)/.test(cookies[i])){
			threshold = RegExp.$1;
			break;
		}
	}
}


makeMenu(selector, ref, menu[type]);
if(eid_sort && type == 'entrylist') SortNouUser(selector,ref);

function makeMenu(parent,refElm, array){
	for(var i=0,m=array.length;i<m;++i){
		var li = c('li');
		if(array[i] == threshold) li.className = 'selected';
		df.appendChild(li);
		var users = c('a');
		users.href = link + '?sort=hot&threshold=' + array[i] + search;
		users.textContent = array[i] + 'users';
		df.lastChild.appendChild(users);
	}
	parent.insertBefore(df,refElm);
}

function SortNouUser(parent,link){
	df.appendChild(link);
	parent.insertBefore(df,parent.childNodes[2]);
}


function xpath(context, query){
	return _doc.evaluate(query, context, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null)
}
function c(tag_name) {
	return _doc.createElement(tag_name);
}


