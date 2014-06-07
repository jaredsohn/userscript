// ==UserScript==
// @name           hotword
// @namespace      panweizeng.com
// @include        http://fanfou.com/home
// ==/UserScript==
(function(){
var YAHOO, $D, $E, $C, elFriends;
var WAIT_MAX = 1000; // 最多尝试次数
var WAIT_TIME = 0; // 尝试计数
var interval = 100;
var intervalId;
function addStyle(){
    GM_addStyle('#friends.hotsect { margin-left:-15px; padding-left:15px; padding-top:1.5em; padding-bottom:0; }');
	GM_addStyle('#friends.hotsect .more { top:1.5em!important; }');
    GM_addStyle('.hotword { margin-bottom:20px; }');
    GM_addStyle('.hotword li { line-height:2em; }');
}
function getEvalRes(o){
	try {
		return eval('('+ o.responseText +')');
	} catch (ex){
		return null;
	}
}
function request(){
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://api.fanfou.com/trends.json',
		headers: {
			'User-Agent': navigator.userAgent,
			'Accept': 'application/json',
		},
		onload: handleResponse 
	});
}
function handleResponse(o){
	var res = getEvalRes(o);
	console.info(res);
	if(res){
		var trends = res.trends;
		var node = document.createElement('div');
		var badge = $D.get('badge-sect');
		var computed = badge.ownerDocument.defaultView.getComputedStyle(badge, '');
		var badgeColor = computed['borderTopColor'];
		node.className = 'hotword';
		node.innerHTML = buildHTML(trends);
		elFriends.style.borderTop = '1px solid '+ badgeColor + '';
		elFriends.className = 'hotsect';
		elFriends.parentNode.insertBefore(node, elFriends);
	}
}
function buildHTML(trends){
	if(!trends || !trends.length) return;
	var html = [];
	html.push('<h2>热门话题</h2>');
	html.push('<ul>');
	for(var i = 0, len = trends.length; i < len; i++){
		var item = trends[i];
		html.push('<li><a href="' + item.url + '" target="_blank">' + item.name + '</a></li>');
	}
	html.push('</ul>');
	return html.join('');
	
}
function init() {
    $D = YAHOO.util.Dom;
    $E = YAHOO.util.Event;
    elFriends = $D.get('friends');
    if(!elFriends) return;
    addStyle();
	request();
}
/**
 * 等待YUI初始化完成
 *
 */
intervalId = window.setInterval(function(){
    if(typeof(YAHOO = unsafeWindow.YAHOO) != "undefined" || WAIT_TIME > WAIT_MAX) {
        window.clearInterval(intervalId);
        init();
    } else {
        WAIT_TIME++;
    }
}, interval);

})();