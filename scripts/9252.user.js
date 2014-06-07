// ==UserScript==
// @name           Tumblr - Pagebar
// @namespace      http://userscripts.org/users/7010
// @include        http://www.tumblr.com/dashboard*
// ==/UserScript==

(function(){

if( ! $x('//*[@class="only_me"]').length)
	return;

GM_addStyle(<><![CDATA[
	#GM_pagebar{
		border-collapse : collapse;
		margin : 10px 0px 6px 0px;
		width : 100%;
		border-left : 10px solid #F3F3F3;
		background-color : #C6C6C6;
		font-weight : bold;
	}
	#GM_pagebar *{
		margin : 0 !important;
		padding : 0 !important;
		border : none !important;
	}
	#GM_pagebar td{
		text-align : center !important;
		line-height : 26px;
		width : 100px;
	}
	#GM_pagebar .GM_current{
		background-color : #FFFFFF !important;
		color : #222222 !important;
		font-size : 13px;
	}
	#GM_pagebar a{
		cursor : pointer;
		display : block !important;
		
		color : #C6C6C6 !important;
		font-size : 1pt;
		text-decoration : none;
	}
	#GM_pagebar a:hover{
		background-color : #639DD2 !important;
		
		color : #fff !important;
		text-decoration : underline;
		font-size : 13px;
	}
]]></>);


// ----[Application]-------------------------------------------------
var MAX = 30;

getTotalPosts(insertPagebar);

function insertPagebar(totalPosts){
	var current = getCurrentPage();
	var totalPages = Math.ceil(totalPosts/10);
	var step = totalPages<MAX ? 1 : totalPages/MAX;
	
	var tds = <></>;
	var pages = {};
	for(var i=1 ; i<totalPages ; i+=step)
		pages[Math.ceil(i)]=true;
	pages[current] = pages[totalPages] = true;
	
	keys(pages).sort(function(a,b){return a-b}).forEach(function(page){
		if(page==current){
			tds+=<td class="GM_current">{page}</td>
		}else{
			tds+=<td class={(page==1 || page==totalPages)? 'GM_edge' : ''}><a href={'/dashboard/'+page}>{page}</a></td>
		}
	})
	
	insertBefore($x('id("posts")//li[1]')[0], dom(
		<table id="GM_pagebar"><tr>{tds}</tr></table>
	));
}

function getTotalPosts(callback){
	var id = getID();
	
	GM_xmlhttpRequest({
		method : 'get',
		url : 'http://' + id + '.tumblr.com/api/read?num=1',
		onload : function(res){
			if(res.status != 200) return;
			
			callback(xml(res.responseText).getElementsByTagName('posts')[0].getAttribute('total'));
		}
	})
}

function getCurrentPage(){
	return 1 * location.href.split('/').pop() || 1;
}

function getID(){
	return $x('(id("controls")//a)[1]')[0].textContent.split('.').shift();
}

// ----[Utility]-------------------------------------------------
function keys(obj){
	var res=[];
	for(var key in obj)
		res.push(key);
	return res;
}

function dom(xml){
	var elm = document.createElement('span');
	elm.innerHTML = xml.toXMLString();
	return elm.childNodes[0];
}

function xml(text){
	return (new DOMParser).parseFromString(text, "application/xml");
}
function log() {
	unsafeWindow.console.log.apply(unsafeWindow.console, Array.slice(arguments))
};

function insertBefore(target, node){
	return target.parentNode.insertBefore(node, target)
}

function insertAfter(target, node){
	return target.parentNode.insertBefore(node, target.nextSibling)
}

// cho45 http://lowreal.net/
function $x(exp, context) {
	if (!context) context = document;
	var resolver = function (prefix) {
		var o = document.createNSResolver(context)(prefix);
		return o ? o : (document.contentType == "text/html") ? "" : "http://www.w3.org/1999/xhtml";
	}
	var exp = document.createExpression(exp, resolver);

	var result = exp.evaluate(context, XPathResult.ANY_TYPE, null);
	switch (result.resultType) {
		case XPathResult.STRING_TYPE : return result.stringValue;
		case XPathResult.NUMBER_TYPE : return result.numberValue;
		case XPathResult.BOOLEAN_TYPE: return result.booleanValue;
		case XPathResult.UNORDERED_NODE_ITERATOR_TYPE: {
			result = exp.evaluate(context, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			var ret = [];
			for (var i = 0, len = result.snapshotLength; i < len ; i++) {
				ret.push(result.snapshotItem(i));
			}
			return ret;
		}
	}
	return null;
}

})()
