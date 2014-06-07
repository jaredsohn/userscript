// ==UserScript==
// @name           LDR - subscribe
// @namespace      http://d.hatena.ne.jp/keijir/
// @include        http://*
// @include        https://*
// @exclude        http://reader.livedoor.com/reader/
// @exclude        http://member.livedoor.com/*
// @exclude        http://reader.livedoor.com/subscribe/*
// @exclude        https://mail.google.com/*
// @exclude        http://mail.google.com/*
// @exclude        http://www.google.*/*
// @exclude        http://www.rememberthemilk.com/*
// @exclude        http://localhost:10010/*
// ==/UserScript==
// auther : keijir http://d.hatana.ne.jp/keijir/
// last updated : 2009/06/14-23:43:07
// version : 0.2.1
//
// this script based on
// Jasper's Google Reader subscribe <http://userscripts.org/scripts/show/2571> and 
// Google Reader Subscribers Count <http://userscripts.org/scripts/show/21909>.
// this script utility functions borrowed from
// AutoPagerize <http://userscripts.org/scripts/show/8551>.
//

//settings
var CACHE = true;
var CACHE_DAY = 365 ;
var MESSAGE = {
    nocache: ' NEW! ',
    nologin: 'ログインしてないよ',
    noldr:   'LDRにないよ'
}
var COLOR = {
    subscribe:   'red',
    unsubscribe: 'black'
}
//settings end

var VERSION = '0.2.1';
var URL = 'http://reader.livedoor.com/subscribe/' + window.location.href;
var CACHE_EXPIRE = 24 * 60 * 60 * 1000 * CACHE_DAY;
var XPATH = {
    feed: '//link[@rel="alternate"][' +
	'contains(@type, "rss") or ' +
	'contains(@type, "atom") or ' + 
	'contains(@type, "rdf")]',
    lilist: '//li[contains(@class, "list") or contains(@class, "list list-first")]',
    login: '//div[@id="loginContent"]'
}

var FEEDS = getElementsByXPath(XPATH['feed'],document);
var SUBSCRIBE = false;
var USERS ='';
var CACHE_HIT = false;
var CACHE_DATE_OK = true;
var message ='';

/////////////////////////////////////////////////////////////////////////

var callback = function(responseDetails) {
    var responseHTML = createHTMLDocumentByString(responseDetails.responseText);
    var lilist = getElementsByXPath(XPATH['lilist'], responseHTML);
    var loginitems = getElementsByXPath(XPATH['login'], responseHTML);

    if(lilist.length > 0 ){
	for(var i in lilist){
	    var child = lilist[i].childNodes;
	    var subs = false;
	    for(var j in child) {
		if(child[j].hasAttributes()) {
		    var classname = child[j].getAttribute("class");
		    if(classname == "subscriber_count"){
			if(child[j].childNodes[1]){
			    users = child[j].childNodes[1].innerHTML;
			}
			else
			    users = child[j].innerHTML;
			}
		    else if(classname == "subscribed")
			subs = true ;
		    else if(classname == "feedlink")
			url = child[j].href;
		}
	    }
	    cacheInfo[url] = {
		users: users,
		subs: subs,
		expire: new Date(new Date().getTime() + CACHE_EXPIRE)
	    }
	}
	loadCache();
	message = MESSAGE['nocache'] + message ;
    }
    else {
	if(loginitems.length > 0){ message = MESSAGE['nologin']; }
	else { message = MESSAGE['noldr']; }
    }
    GM_setValue('cacheInfo', cacheInfo.toSource());
    appendLDRS();
}

var appendLDRS = function(){
    var icondata = 'data:image/x-icon;base64,'+
	'AAABAAIAEBAAAAEACABoBQAAJgAAACAgAAABAAgAqAgAAI4FAAAoAAAAEAAAACAAAAABAAgAAAAA'+
	'AEABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///wD/RxMA/0oUAP9NFQBAFQUA/1IVAP9WFwD/WhgA'+
	'QBYGAEAYBgD/XhkA/2IaAEAZBwD/ZhsA/2ocAEAaBwD/bh0A/3IfAEAdCAD/dx8A/3ogAP99IQD/'+
	'gCIA////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
	'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
	'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
	'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
	'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
	'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
	'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
	'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
	'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
	'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
	'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
	'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
	'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
	'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
	'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
	'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
	'AAAAAAAAAAAAAAAAAAAAAAAAAAACAgICAgICAgICAgICAgADAwMDAwMDAwMDAwMDAwMDBAQEBAQE'+
	'BAQEBAQEBAQEBAYGBgYFBQUFBgYFBQUGBgYHBwcHAQEBAQcJAQEBBwcHCAgICAgBAQgIAQEICAgI'+
	'CAsLCwsLAQELCgEBCwsLCwsMDAwMDAEBDQEBDAwMDAwMDg4ODg4BAQEBARAODg4ODg8PDw8PAQEP'+
	'DwEBDw8PDw8REREREQEBEREBAREREREREhISEhMBARMTAQESEhISEhQUFBQBAQEBAQEUFBQUFBQV'+
	'FRUVFRUVFRUVFRUVFRUVFhYWFhYWFhYWFhYWFhYWFgAXFxcXFxcXFxcXFxcXFwCAAQAAAAAAAAAA'+
	'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAQAAKAAA'+
	'ACAAAABAAAAAAQAIAAAAAACABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///8A/wAAAP8CAQDXAgEA'+
	'/y8vAF9cXAD08/MA8fDwAP8FAQD/BgIA/QYCAP8NBQD/DgYA/2VgAP8LAAD/FAUA/yATAP0cCAD/'+
	'GwEA/xsEANcaBwD/HQAA/x8AAMMYAAD/IQEA/yUEAP9MMQD/ZlEA9ubkAPwlBAD/KwkA2icKAP8w'+
	'DwD/Mw8A/TMPAHUZCAD/PxwA5jgdAP9GJgD/UzcA/1k7AP9eQgD/ZUoA6mZRANgxEAD/OhMAyTER'+
	'AP8+FgD9PBYA1jMTAJ4mDgD/Xj0A/2JDAPSvoQD89/YARRQIAP9JHgD9SR4A7UQcANY9GgD/aUMA'+
	'HRUTAP9IGQDWRx4A/1UnAP9WKAD9VigA/VUoAG05KgBRQz8A/1okAP9kMgD8YzIAKhMMAFAyKQD/'+
	'VhwA+2MwAP9nMwD+cTwA/3RFAPTe1gD/cjwA/2YiAP1lIgD1YiEA/2kjANZZIAD/aScA/24sAP5w'+
	'MgD/dTgA/4BGAP+CSAD/hUwAAwEAAP+ESQD/hUoA/4pNAPeJVADTvbIA//38AP9wJQDbZSEA/3Un'+
	'AP92JwD9dCcA+XImAP91KQD/ey8A/340AP+GQQD/h0cA/4xPAOF8RgD/j1AA/5JTAP+RUwD/l1sA'+
	'/51lAP+RUQDMekYA/5lYAOWQXgDllWMA+q5+AP3PtAD+9O4A7+rnAP99KQD/mVEA/5VRAP+fXQDz'+
	'ml0A5ZpmAPyDKwD7gysA/4QsAPN/KgDacyYA7H0rAMNpJwD/jDkA/5JAAP+XSAD/mlAA/5tTAP+d'+
	'VQD/nlkA/6FeAP+mYgDNh1QAvX9QAOWfagDNpIYAaFxTAPXl2QD/iy4A/5U+AP+gVQD/rGYA86Rh'+
	'AOWkbQCxg14A872QAPzp2gD/kTAA2XspAMJxJQD/lDQA/6ZWAP+sZQDUm2YAw3IlAMFxJQD/mDIA'+
	'yoA6AMR9OgD/q1YA/6xZAP+zawDzq2YAimE6AP+4dQArIhkA/Pv6AP+fNADZhy0A/7pwAP+lNwD/'+
	'pj8A/7RbAOGgVgD/wHQA/8mIAP/hvgD/qjgA/609AP/FeAD/u10A/8NwAP/LfQD/sToA2ZcyAP+6'+
	'SAD/ynYA/8t7AP/04wD/tz0A/7k+AP+3PgD/xGEA/9GBAP+9PgDepjsA/8JJAP/OagD/wkAA/8NC'+
	'AP/JWADtxGsA/9eFAP/HQgD/yUcA/8tRAP/NVAD/0F0A/9RvAP/ciQD/3Y0A/+GXAP/02QD/+OcA'+
	'/9+JAP/figD/4YwA/+COAP/lnwD/6rAA//rrAP/bYgD/77kA/+2kAK+vrgD8/PwA9vb2APPz8wDe'+
	'3t4Az8/PAMjIyACMjIwAdXV1AG9vbwA8PDwADAwMAAAAAAAAAKywraioqKioqKioqKioqKioqKio'+
	'qKioqKiusawAAACMjIiJiYmJiYmJiY6PkJKTlZWVlZWUkZCOiYeKi40Ad2toaGhoaGhsbm9zdXV1'+
	'dXV1dXV1dXV1dXVzb2xqZ5dcVFNTU1NYW1xdXV1dXV1dXV1dXV1dXV1dXV1dXFpVV1BMTExHTlJS'+
	'UlJSUlJSUlJSUlJSUlJSUlJSUlJST01APT8/QkhISEhISEhISEhISEhISEhISEhISEhISEhISUA0'+
	'JUFCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkNEQDU5OTk5OTk/OTk5OTk5OTk5OTk6OzMkOEo8'+
	'OTk5Ojo8NTAwMDAwMCZfAAAAAAAAAC8wLjM+BvrzUTQwMDAwMTIpIiIiIiIiJ2UBAQEBAQEBKh8z'+
	'/PYBATcrIiIiIiIjICgfHx8fHx8fHygHAQEBLCEfIAYBAQFlDgwMDQ0NEBIVGxoaGhoUGhoaGggB'+
	'AQEmGhlLCAEBATYDCgoKCgoKCwQbEAkDAwMTGRkZCAEBASYWJPkBAQEdEQMDAwMDAwMDBAUCAgIC'+
	'Ag8XFxcIAQEBJhj6AQEBARwXFgICAgICAgIENC4uLi4uJUJCQggBAQFFRvQBAQF+REJCQiUuLi4u'+
	'Li1eVlZWVlZZYWFhCAEBAWSAAQEBgGNhYWFhYFlWVlZWV2JmZmZmZmxxcXEIAQEBNn5/AfTzSnJx'+
	'cXFxcGZmZmZXc2lpaWlpaXh0dAgBAQF7dHZRAQH3S3R0dHR0bWlpaWeDgYGBgYGBg3p6CAEBAXx6'+
	'en0BAQH5eXp6enqOgYGBZ5KJiYmJiYmChIQIAQEBhoSEhQEBAQGjhISEhI+JiYmLn52dnZ2dnZ+W'+
	'lggBAQGZlpaYAQEBAZqWlpaWnp2dnYuqpqampqamqqCgCAEBAaKgoZsBAQEBpKCgoKuppqamp7Ov'+
	'r6+vr6+ztZcIAQEBo7a4+AEBAbm3tLS0sq+vr6+nv7q6urq6usD+/fUBAQEG+/cBAQEBfry8vLy+'+
	'urq6uru/vb29vb29xgEBAQEBAQEBAc/Pw8LBwcHBx729vb29u8fExMTExMTIxsbGxsbGxsbGxsbG'+
	'xsbGxsjFxMTExMTLx8rKysrKys3JycnJycnJycnJycnJycnOzMrKysrKysvT0tDQ0NDR1NTU1NTU'+
	'1NTU1NTU1NTU1NvQ0NDQ0NDQy9jX1dXV1dfd3d3d3d3d3d3d3d3d3d3i1dXV1dXV1dXW5tjZ2dnZ'+
	'4eTk5OTk5OTk5OTk5OTk8NnZ2dnZ2dnZ2twA5ePg397w6+vr6+vr6+vr6+vr6vDe3t7e3t7e3+Hh'+
	'AAAA7ubq6fLx8fHx8fHx8fHx8fHy6enp6enp6ens7QAAwAAAA4AAAAEAAAAAAAAAAAAAAAAAAAAA'+
	'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
	'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAcAAAAM=';
    
    if(SUBSCRIBE){
	GM_addStyle('#LDRS_body { border: 2px solid ' + COLOR['subscribe'] + '; }');
    }
    else{
	GM_addStyle('#LDRS_body { border: 1px solid ' + COLOR['unsubscribe'] + '; }');
    }
    GM_addStyle('#LDRS_body { left:0pt; bottom:0pt; position:fixed; display:block; z-index:10000; background:white; padding: 2px;}');
    GM_addStyle('#LDRS_mes {position:relative; left:2px; top:-2px; }');
    GM_addStyle('#LDRS_mes > a {font-family:"ＭＳ Ｐゴシック","ヒラギノ Pro W3",Osaka,sans-serif !important; font-size: 14px !important; color: #0000DD !important; font-style:normal !important; font-weight:normal !important;}');
 
    var LDRS_body = myCreateSpan('LDRS_body', '');
    var LDRS_icon = myCreateImg('LDRS_icon', icondata);
    var LDRS_mes = myCreateSpan('LDRS_mes', '');
    var LDRS_a = myCreateA('LDRS_a', URL, message, resetCache);
    document.body.appendChild(LDRS_body); 
    LDRS_body.appendChild(LDRS_icon);
    LDRS_body.appendChild(LDRS_mes);
    LDRS_mes.appendChild(LDRS_a);
}


var clearCache = function() {
    GM_setValue('cacheInfo', '')
}
var getCache = function() {
    return eval(GM_getValue('cacheInfo')) || {}
}

var loadCache = function(){
    for (var i in FEEDS ) {
	url = FEEDS[i].href;
	if(cacheInfo[url]){
	    if(i == 0) USERS = cacheInfo[url].users
	    else USERS += ' + ' +cacheInfo[url].users;
	    if(cacheInfo[url].subs) SUBSCRIBE = true;
	}
    }
    message = USERS;
}

var resetCache = function(){
    for (var i in FEEDS ) {
	url = FEEDS[i].href;
	if(cacheInfo[url]){
	    cacheInfo[url] = {
		users: cacheInfo[url].users,
		subs: cacheInfo[url].subs,
		expire: new Date()
	    }
	}
    }
    GM_setValue('cacheInfo', cacheInfo.toSource());
}
//////////////////////////////////////////////////////////////////////////
// main
var cacheInfo = getCache();
GM_registerMenuCommand('LDR subscribe - clear cache', clearCache)
if(!FEEDS.length > 0){
    return;
}
else {
    for (var i in FEEDS ) {
	url = FEEDS[i].href;
	if(cacheInfo[url]){
	    CACHE_HIT = true;
	    if(cacheInfo[url].expire < new Date() ){
		CACHE_DATE_OK = false;
	    }
	}
    }
    if( CACHE && CACHE_HIT && CACHE_DATE_OK){
	loadCache();
	appendLDRS();
    }
    else{
	GM_xmlhttpRequest( { method: 'GET', url: URL, onload: callback } );
    }
 }
return;

//////////////////////////////////////////////////////////////////////////
// my utility functions.
function myCreateSpan(id, text) {
    var element = document.createElement('span');
    element.setAttribute('id', id);
    element.innerHTML += text;
    return element;
}
function myCreateImg(id, data) {
    var element = document.createElement('img');
    element.setAttribute('id', id);
    element.src = data;
    return element;
}
function myCreateA(id, url, mes, func) {
    var element = document.createElement('a');
    element.setAttribute('id', id);
    element.href = url;
    element.innerHTML = mes;
    element.addEventListener('click', func, false);
    return element;
}
/////////////////////////////////////////////////////////////////////////
// borrowed from AutoPagerize <http://userscripts.org/scripts/show/8551>.
// utility functions.
function createHTMLDocumentByString(str) {
    if (document.documentElement.nodeName != 'HTML') {
        return new DOMParser().parseFromString(str, 'application/xhtml+xml')
    }
    var html = strip_html_tag(str)
    var htmlDoc = document.implementation.createDocument(null, 'html', null)
    var fragment = createDocumentFragmentByString(html)
    try {
        fragment = htmlDoc.adoptNode(fragment)
    } catch(e) {
        fragment = htmlDoc.importNode(fragment, true)
    }
    htmlDoc.documentElement.appendChild(fragment)
    return htmlDoc
}

function getElementsByXPath(xpath, node) {
    var nodesSnapshot = getXPathResult(xpath, node,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE)
    var data = []
    for (var i = 0; i < nodesSnapshot.snapshotLength; i++) {
        data.push(nodesSnapshot.snapshotItem(i))
    }
    return data
}

function getXPathResult(xpath, node, resultType) {
    var node = node || document
    var doc = node.ownerDocument || node
    var resolver = doc.createNSResolver(node.documentElement || node)
    // Use |node.lookupNamespaceURI('')| for Opera 9.5
    var defaultNS = node.lookupNamespaceURI(null)
    if (defaultNS) {
        const defaultPrefix = '__default__'
        xpath = addDefaultPrefix(xpath, defaultPrefix)
        var defaultResolver = resolver
        resolver = function (prefix) {
            return (prefix == defaultPrefix)
                ? defaultNS : defaultResolver.lookupNamespaceURI(prefix)
        }
    }
    return doc.evaluate(xpath, node, resolver, resultType, null)
}

function addDefaultPrefix(xpath, prefix) {
    const tokenPattern = /([A-Za-z_\u00c0-\ufffd][\w\-.\u00b7-\ufffd]*|\*)\s*(::?|\()?|(".*?"|'.*?'|\d+(?:\.\d*)?|\.(?:\.|\d+)?|[\)\]])|(\/\/?|!=|[<>]=?|[\(\[|,=+-])|([@$])/g
    const TERM = 1, OPERATOR = 2, MODIFIER = 3
    var tokenType = OPERATOR
    prefix += ':'
    function replacer(token, identifier, suffix, term, operator, modifier) {
        if (suffix) {
            tokenType =
                (suffix == ':' || (suffix == '::' &&
                 (identifier == 'attribute' || identifier == 'namespace')))
                ? MODIFIER : OPERATOR
        }
        else if (identifier) {
            if (tokenType == OPERATOR && identifier != '*') {
                token = prefix + token
            }
            tokenType = (tokenType == TERM) ? OPERATOR : TERM
        }
        else {
            tokenType = term ? TERM : operator ? OPERATOR : MODIFIER
        }
        return token
    }
    return xpath.replace(tokenPattern, replacer)
}

function createDocumentFragmentByString(str) {
    var range = document.createRange()
    range.setStartAfter(document.body)
    return range.createContextualFragment(str)
}

function log(message) {
    if (typeof console == 'object') {
        console.log(message)
    }
    else {
        GM_log(message)
    }
}

function strip_html_tag(str) {
    var re = /^[\s\S]*?<html(?:[ \t\r\n][^>]*)?>|<\/html[ \t\r\n]*>[\w\W]*$/ig
    return str.replace(re, '')
}