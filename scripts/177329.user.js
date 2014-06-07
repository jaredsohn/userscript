// ==UserScript==
// @name		Kyberia-v31
// @description	Makes kyberia.sk more fun
// @version		1.64
// @match		http://kyberia.sk/*
// @match		https://kyberia.sk/*
// @include		http://kyberia.sk*
// @include		https://kyberia.sk*
// @run-at		document-start
// @downloadURL	https://userscripts.org/scripts/source/177329.user.js
// @updateURL	https://userscripts.org/scripts/source/177329.meta.js
// @icon		http://p.brm.sk/kyberia-v31-userscript/icon.png
// ==/UserScript==


(function() {

// Auto-combined file, created at 2014-02-18 10:11:01
// From files:
// 	options_html.js (2014-02-18 10:11:01)
// 	../kyberia-v31/jquery2.js (2014-01-17 07:14:06)
// 	../kyberia-v31/analytics.js (2013-09-07 03:25:27)
// 	../kyberia-v31/kyberia-utils.js (2014-02-18 10:09:43)
// 	../kyberia-v31/kyberia-v31.js (2014-01-17 07:30:05)
// 	../kyberia-v31/features/AutoUpdater.js (2014-01-17 07:30:26)
// 	../kyberia-v31/features/ExtensionOptions.js (2013-10-24 08:00:26)
// 	../kyberia-v31/features/ChatBox.js (2014-02-18 09:54:02)
// 	../kyberia-v31/features/Jargoniser.js (2014-02-18 07:58:22)
// 	../kyberia-v31/features/FeatureMix.js (2014-02-14 03:31:08)
// 	../kyberia-v31/features/AjaxButtons.js (2013-09-06 01:32:20)
// 	../kyberia-v31/features/ShowKGivers.js (2014-01-17 07:29:18)
// 	../kyberia-v31/features/FlashUnloader.js (2014-01-07 01:31:17)
// 	../kyberia-v31/features/HideAvatars.js (2013-08-27 22:52:25)
// 	../kyberia-v31/features/HideMoods.js (2013-08-30 22:43:31)
// 	../kyberia-v31/features/QuickReply.js (2013-12-20 15:46:42)
// 	../kyberia-v31/features/LimitNodeHeight.js (2014-01-05 14:32:11)
// 	../kyberia-v31/features/LimitNodeWidth.js (2013-10-05 12:16:31)
// 	../kyberia-v31/features/Desocializer.js (2013-08-30 14:56:15)
// 	../kyberia-v31/features/StopAvatars.js (2013-08-30 14:57:08)
// 	../kyberia-v31/features/DeleteButton.js (2013-10-25 12:22:20)
// 	../kyberia-v31/features/TagUsers.js (2014-01-18 23:47:19)
// 	../kyberia-v31/features/MailUpgrade.js (2014-01-18 23:54:18)
// 	../kyberia-v31/features/InplaceEditing.js (2014-01-04 13:33:23)
// 	../kyberia-v31/features/Cyrilliser.js (2014-02-18 07:12:03)
// 	../kyberia-v31/features/Hiraganiser.js (2014-02-18 07:11:45)
// 	../kyberia-v31/features/CompactMode.js (2014-01-13 09:08:37)


// File: options_html.js (2014-02-18 10:11:01)

// Auto-generated options_html.js from options.html 
window.KYBERIA_V31_USERSCRIPT_VERSION = '1.64';
function OPTIONS_HTML() { return "\
<style>\
	#kyberia_v31				{ padding: 10px 20px; max-width: 400px; margin: 0 auto; }\
	#kyberia_v31 input			{ color: white; background: #000; border: 1px solid #6dae42;\
									padding: 2px 4px; font-family: monospace; font-size: 9pt; }\
	#kyberia_v31 .infotext		{ color: #555; text-align: center; margin-bottom: 0; }\
\
	#kyberia_v31 section		{ margin-left: 10px; clear: both; padding: 5px 0; }\
	#kyberia_v31 section>div	{ margin-left: 110px; margin-top: 10px; }\
	#kyberia_v31 input[type=\"checkbox\"] { cursor: pointer; height: 12px; }\
	#kyberia_v31 input			{ margin-right: 10px; }\
	#kyberia_v31 input.wide		{ width: 90%; }\
	#kyberia_v31 h2				{ float: left; width: 100px; color: #555; }\
	#kyberia_v31 div			{ display: block; margin-bottom: 1px; }\
	#kyberia_v31 .disabled		{ opacity: 0.3; pointer-events: none; }\
	#kyberia_v31 div p			{ margin-left: 30px; color: #555; margin-top: 0px; margin-bottom: 2px; }\
	#kyberia_v31 .ls.nah		{ background: red; }\
	#kyberia_v31 .saved 		{ display: none; float: right; color: red; font-weight: bold; }\
\
	.toggle-bug-report			{ float: left; }\
	.bug-report					{ margin: 15px 0; }\
	.bug-report input[type=submit] { float: right; }\
\
</style>\
\
<div id=\"kyberia_v31\">\
\
	<h1>Kyberia v3.1 features <sup class=\"v31_version\"></sup>&nbsp; (<a href=\"http://kyberia.sk/id/7313222\" style=\"font-size: 20px;\">forum</a>)</h1>\
	<hr>\
	<button class=\"toggle-bug-report\">bug report</button>\
	<b class=\"saved\">SAVED!</b>\
	<p class=\"infotext\">changes are automatically saved</p>\
\
	<div class=\"bug-report\">\
		<form action=\"/id/7313222/\" method=\"POST\" name=\"formular\">\
			<input type=\"hidden\" name=\"node_name\">\
			<input type=\"hidden\" name=\"node_parent\" value=\"7313222\">\
			<input type=\"hidden\" name=\"template_id\" value=\"4\">\
			<textarea name=\"node_content\"></textarea>\
			<br>\
\
			prida sa ako prispevok do <a href=\"http://kyberia.sk/id/7313222\" target=\"_blank\">fora</a>\
			<input type=\"submit\" name=\"event\" value=\"add\">\
		</form>\
	</div>\
\
	<section>\
		<h2>Users</h2>\
		<div>\
			<div>\
				<label><input type=\"checkbox\" name=\"StopAvatars\" class=\"ls\"> stop avatar animation</label>\
			</div>\
			<div>\
				<label><input type=\"checkbox\" name=\"HideAvatars\" class=\"ls\"> hide avatars</label>\
			</div>\
			<div>\
				<label><input type=\"checkbox\" name=\"Desocializer\" class=\"ls\"> desocializer - hide avatars &amp; names</label>\
			</div>\
			<div>\
				<label><input type=\"checkbox\" name=\"TagUsers\" class=\"ls\"> tag users</label>\
				<p>\
					<input type=\"text\" name=\"TagUsers\" class=\"ls wide\"><br>\
					773:memfer -&gt; memfer<sup>changed_name</sup><br>\
					separate with spaces: \"1:name 2:name 3:name\"\
				</p>\
			</div>\
\
		</div>\
	</section>\
\
	<section>\
		<h2>Nodes</h2>\
		<div>\
			<div>\
				<label><input type=\"checkbox\" name=\"HideMoods\" class=\"ls\"> hide mood messages</label>\
			</div>\
			<div>\
				<label><input type=\"checkbox\" name=\"LimitNodeHeight\" class=\"ls\"> limit node height</label>\
				<p>long nodes\'s content becomes scrollable</p>\
			</div>\
			<div>\
				<label><input type=\"checkbox\" name=\"LimitNodeWidth\" class=\"ls\"> limit node width</label>\
				<p>sets max for node/image width in Knew</p>\
			</div>\
			<div>\
				<label><input type=\"checkbox\" name=\"CompactMode\" class=\"ls\"> compact mode</label>\
				<p>check description and picture <a href=\"http://kyberia.sk/id/7313226/\">here</a></p>\
			</div>\
			<div>\
				<label><input type=\"checkbox\" name=\"InplaceEditing\" class=\"ls\"> inplace editing</label>\
				<p>allows you to edit node without opening it</p>\
			</div>\
			<div>\
				<label><input type=\"checkbox\" name=\"QuickReply\" class=\"ls\"> quick reply</label>\
				<p>adds \'reply\' button for quick reply</p>\
			</div>\
		</div>\
	</section>\
\
	<section>\
		<h2>UI fix</h2>\
		<div>\
			<div>\
				<label><input type=\"checkbox\" name=\"AjaxButtons\" class=\"ls\"> K, FOOK, BOOK without refresh</label>\
				<p>+ FOOKs in background, and hides the node</p>\
				<p>+ BOOKs in background</p>\
				<p>+ K! in background, K! button in every node</p>\
			</div>\
			<div>\
				<label><input type=\"checkbox\" name=\"DeleteButton\" class=\"ls\"> DELETE to recycle node to 123456</label>\
			</div>\
			<!--\
			<div>\
				<label><input type=\"checkbox\" name=\"KeyShortcuts\" class=\"ls\"> keyboard shortcuts</label>\
				<p>B/N - previous/next submission</p>\
			</div>\
			-->\
		</div>\
	</section>\
\
	<section>\
		<h2>Misc</h2>\
		<div>\
			<div>\
				<label><input type=\"checkbox\" name=\"MailUpgrade\" class=\"ls\"> mail upgrade</label>\
					(<a href=\"http://kyberia.sk/id/6505157\">about</a>)\
				<p>+ show last mailed users, click to filter</p>\
				<p>+ online status</p>\
			</div>\
			<div>\
				<label><input type=\"checkbox\" name=\"FlashUnloader\" class=\"ls\"> unload youtube videos</label>\
				<p>convert to youtube player by clicking</p>\
			</div>\
			<div>\
				<label><input type=\"checkbox\" name=\"Cyrilliser\" class=\"ls\"> cyrilliser</label>\
				<p>convert all text to Cyrillic (азбука)</p>\
			</div>\
			<div>\
				<label><input type=\"checkbox\" name=\"Hiraganiser\" class=\"ls\"> hiraganiser</label>\
				<p>\
					convert all text to Hiragana (ひらがな)<br>\
					<input type=\"text\" name=\"Hiraganiser\" class=\"ls wide\"><br>\
					optionally, you can insert specific characters that you want to learn (<a href=\"http://kyberia.sk/id/7436089/\" target=\"_blank\">table</a>)\
				</p>\
			</div>\
			<!--\
			<div>\
				<label><input type=\"checkbox\" name=\"Jargoniser\" class=\"ls\"> jargoniser</label>\
				<p>\
					convert words to stupid language<br>\
					niaký, krástne, euri, blava, hamba...\
				</p>\
			</div>\
			-->\
			<div>\
				<label><input type=\"checkbox\" name=\"ChatBox\" class=\"ls\"> facebook-like chat</label>\
				<p>chat in a small window in corner, like on facebook\
					(<a href=\"#\" target=\"_blank\">screenshot</a>)</p>\
			</div>\
			<div>\
				<label><input type=\"checkbox\" name=\"FeatureMix\" class=\"ls\"> feature mix</label>\
				<p>- fix imgur link on paste</p>\
				<p>- hilight low K in k_wallet</p>\
				<p>- editable pagination offset</p>\
				<p>- remember login type (nick/id)</p>\
				<p>- remove autoplay</p>\
			</div>\
		</div>\
	</section>\
\
	<br>\
\
	<hr>\
</div>\
";
}



// File: ../kyberia-v31/jquery2.js (2014-01-17 07:14:06)

/*! jQuery v2.0.3 | (c) 2005, 2013 jQuery Foundation, Inc. | jquery.org/license
//@ sourceMappingURL=jquery-2.0.3.min.map
*/
(function(e,undefined){var t,n,r=typeof undefined,i=e.location,o=e.document,s=o.documentElement,a=e.jQuery,u=e.$,l={},c=[],p="2.0.3",f=c.concat,h=c.push,d=c.slice,g=c.indexOf,m=l.toString,y=l.hasOwnProperty,v=p.trim,x=function(e,n){return new x.fn.init(e,n,t)},b=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,w=/\S+/g,T=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,C=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,k=/^-ms-/,N=/-([\da-z])/gi,E=function(e,t){return t.toUpperCase()},S=function(){o.removeEventListener("DOMContentLoaded",S,!1),e.removeEventListener("load",S,!1),x.ready()};x.fn=x.prototype={jquery:p,constructor:x,init:function(e,t,n){var r,i;if(!e)return this;if("string"==typeof e){if(r="<"===e.charAt(0)&&">"===e.charAt(e.length-1)&&e.length>=3?[null,e,null]:T.exec(e),!r||!r[1]&&t)return!t||t.jquery?(t||n).find(e):this.constructor(t).find(e);if(r[1]){if(t=t instanceof x?t[0]:t,x.merge(this,x.parseHTML(r[1],t&&t.nodeType?t.ownerDocument||t:o,!0)),C.test(r[1])&&x.isPlainObject(t))for(r in t)x.isFunction(this[r])?this[r](t[r]):this.attr(r,t[r]);return this}return i=o.getElementById(r[2]),i&&i.parentNode&&(this.length=1,this[0]=i),this.context=o,this.selector=e,this}return e.nodeType?(this.context=this[0]=e,this.length=1,this):x.isFunction(e)?n.ready(e):(e.selector!==undefined&&(this.selector=e.selector,this.context=e.context),x.makeArray(e,this))},selector:"",length:0,toArray:function(){return d.call(this)},get:function(e){return null==e?this.toArray():0>e?this[this.length+e]:this[e]},pushStack:function(e){var t=x.merge(this.constructor(),e);return t.prevObject=this,t.context=this.context,t},each:function(e,t){return x.each(this,e,t)},ready:function(e){return x.ready.promise().done(e),this},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(0>e?t:0);return this.pushStack(n>=0&&t>n?[this[n]]:[])},map:function(e){return this.pushStack(x.map(this,function(t,n){return e.call(t,n,t)}))},end:function(){return this.prevObject||this.constructor(null)},push:h,sort:[].sort,splice:[].splice},x.fn.init.prototype=x.fn,x.extend=x.fn.extend=function(){var e,t,n,r,i,o,s=arguments[0]||{},a=1,u=arguments.length,l=!1;for("boolean"==typeof s&&(l=s,s=arguments[1]||{},a=2),"object"==typeof s||x.isFunction(s)||(s={}),u===a&&(s=this,--a);u>a;a++)if(null!=(e=arguments[a]))for(t in e)n=s[t],r=e[t],s!==r&&(l&&r&&(x.isPlainObject(r)||(i=x.isArray(r)))?(i?(i=!1,o=n&&x.isArray(n)?n:[]):o=n&&x.isPlainObject(n)?n:{},s[t]=x.extend(l,o,r)):r!==undefined&&(s[t]=r));return s},x.extend({expando:"jQuery"+(p+Math.random()).replace(/\D/g,""),noConflict:function(t){return e.$===x&&(e.$=u),t&&e.jQuery===x&&(e.jQuery=a),x},isReady:!1,readyWait:1,holdReady:function(e){e?x.readyWait++:x.ready(!0)},ready:function(e){(e===!0?--x.readyWait:x.isReady)||(x.isReady=!0,e!==!0&&--x.readyWait>0||(n.resolveWith(o,[x]),x.fn.trigger&&x(o).trigger("ready").off("ready")))},isFunction:function(e){return"function"===x.type(e)},isArray:Array.isArray,isWindow:function(e){return null!=e&&e===e.window},isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},type:function(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?l[m.call(e)]||"object":typeof e},isPlainObject:function(e){if("object"!==x.type(e)||e.nodeType||x.isWindow(e))return!1;try{if(e.constructor&&!y.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(t){return!1}return!0},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},error:function(e){throw Error(e)},parseHTML:function(e,t,n){if(!e||"string"!=typeof e)return null;"boolean"==typeof t&&(n=t,t=!1),t=t||o;var r=C.exec(e),i=!n&&[];return r?[t.createElement(r[1])]:(r=x.buildFragment([e],t,i),i&&x(i).remove(),x.merge([],r.childNodes))},parseJSON:JSON.parse,parseXML:function(e){var t,n;if(!e||"string"!=typeof e)return null;try{n=new DOMParser,t=n.parseFromString(e,"text/xml")}catch(r){t=undefined}return(!t||t.getElementsByTagName("parsererror").length)&&x.error("Invalid XML: "+e),t},noop:function(){},globalEval:function(e){var t,n=eval;e=x.trim(e),e&&(1===e.indexOf("use strict")?(t=o.createElement("script"),t.text=e,o.head.appendChild(t).parentNode.removeChild(t)):n(e))},camelCase:function(e){return e.replace(k,"ms-").replace(N,E)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,t,n){var r,i=0,o=e.length,s=j(e);if(n){if(s){for(;o>i;i++)if(r=t.apply(e[i],n),r===!1)break}else for(i in e)if(r=t.apply(e[i],n),r===!1)break}else if(s){for(;o>i;i++)if(r=t.call(e[i],i,e[i]),r===!1)break}else for(i in e)if(r=t.call(e[i],i,e[i]),r===!1)break;return e},trim:function(e){return null==e?"":v.call(e)},makeArray:function(e,t){var n=t||[];return null!=e&&(j(Object(e))?x.merge(n,"string"==typeof e?[e]:e):h.call(n,e)),n},inArray:function(e,t,n){return null==t?-1:g.call(t,e,n)},merge:function(e,t){var n=t.length,r=e.length,i=0;if("number"==typeof n)for(;n>i;i++)e[r++]=t[i];else while(t[i]!==undefined)e[r++]=t[i++];return e.length=r,e},grep:function(e,t,n){var r,i=[],o=0,s=e.length;for(n=!!n;s>o;o++)r=!!t(e[o],o),n!==r&&i.push(e[o]);return i},map:function(e,t,n){var r,i=0,o=e.length,s=j(e),a=[];if(s)for(;o>i;i++)r=t(e[i],i,n),null!=r&&(a[a.length]=r);else for(i in e)r=t(e[i],i,n),null!=r&&(a[a.length]=r);return f.apply([],a)},guid:1,proxy:function(e,t){var n,r,i;return"string"==typeof t&&(n=e[t],t=e,e=n),x.isFunction(e)?(r=d.call(arguments,2),i=function(){return e.apply(t||this,r.concat(d.call(arguments)))},i.guid=e.guid=e.guid||x.guid++,i):undefined},access:function(e,t,n,r,i,o,s){var a=0,u=e.length,l=null==n;if("object"===x.type(n)){i=!0;for(a in n)x.access(e,t,a,n[a],!0,o,s)}else if(r!==undefined&&(i=!0,x.isFunction(r)||(s=!0),l&&(s?(t.call(e,r),t=null):(l=t,t=function(e,t,n){return l.call(x(e),n)})),t))for(;u>a;a++)t(e[a],n,s?r:r.call(e[a],a,t(e[a],n)));return i?e:l?t.call(e):u?t(e[0],n):o},now:Date.now,swap:function(e,t,n,r){var i,o,s={};for(o in t)s[o]=e.style[o],e.style[o]=t[o];i=n.apply(e,r||[]);for(o in t)e.style[o]=s[o];return i}}),x.ready.promise=function(t){return n||(n=x.Deferred(),"complete"===o.readyState?setTimeout(x.ready):(o.addEventListener("DOMContentLoaded",S,!1),e.addEventListener("load",S,!1))),n.promise(t)},x.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(e,t){l["[object "+t+"]"]=t.toLowerCase()});function j(e){var t=e.length,n=x.type(e);return x.isWindow(e)?!1:1===e.nodeType&&t?!0:"array"===n||"function"!==n&&(0===t||"number"==typeof t&&t>0&&t-1 in e)}t=x(o),function(e,undefined){var t,n,r,i,o,s,a,u,l,c,p,f,h,d,g,m,y,v="sizzle"+-new Date,b=e.document,w=0,T=0,C=st(),k=st(),N=st(),E=!1,S=function(e,t){return e===t?(E=!0,0):0},j=typeof undefined,D=1<<31,A={}.hasOwnProperty,L=[],q=L.pop,H=L.push,O=L.push,F=L.slice,P=L.indexOf||function(e){var t=0,n=this.length;for(;n>t;t++)if(this[t]===e)return t;return-1},R="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",M="[\\x20\\t\\r\\n\\f]",W="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",$=W.replace("w","w#"),B="\\["+M+"*("+W+")"+M+"*(?:([*^$|!~]?=)"+M+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+$+")|)|)"+M+"*\\]",I=":("+W+")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|"+B.replace(3,8)+")*)|.*)\\)|)",z=RegExp("^"+M+"+|((?:^|[^\\\\])(?:\\\\.)*)"+M+"+$","g"),_=RegExp("^"+M+"*,"+M+"*"),X=RegExp("^"+M+"*([>+~]|"+M+")"+M+"*"),U=RegExp(M+"*[+~]"),Y=RegExp("="+M+"*([^\\]'\"]*)"+M+"*\\]","g"),V=RegExp(I),G=RegExp("^"+$+"$"),J={ID:RegExp("^#("+W+")"),CLASS:RegExp("^\\.("+W+")"),TAG:RegExp("^("+W.replace("w","w*")+")"),ATTR:RegExp("^"+B),PSEUDO:RegExp("^"+I),CHILD:RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+M+"*(even|odd|(([+-]|)(\\d*)n|)"+M+"*(?:([+-]|)"+M+"*(\\d+)|))"+M+"*\\)|)","i"),bool:RegExp("^(?:"+R+")$","i"),needsContext:RegExp("^"+M+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+M+"*((?:-\\d)?\\d*)"+M+"*\\)|)(?=[^-]|$)","i")},Q=/^[^{]+\{\s*\[native \w/,K=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,Z=/^(?:input|select|textarea|button)$/i,et=/^h\d$/i,tt=/'|\\/g,nt=RegExp("\\\\([\\da-f]{1,6}"+M+"?|("+M+")|.)","ig"),rt=function(e,t,n){var r="0x"+t-65536;return r!==r||n?t:0>r?String.fromCharCode(r+65536):String.fromCharCode(55296|r>>10,56320|1023&r)};try{O.apply(L=F.call(b.childNodes),b.childNodes),L[b.childNodes.length].nodeType}catch(it){O={apply:L.length?function(e,t){H.apply(e,F.call(t))}:function(e,t){var n=e.length,r=0;while(e[n++]=t[r++]);e.length=n-1}}}function ot(e,t,r,i){var o,s,a,u,l,f,g,m,x,w;if((t?t.ownerDocument||t:b)!==p&&c(t),t=t||p,r=r||[],!e||"string"!=typeof e)return r;if(1!==(u=t.nodeType)&&9!==u)return[];if(h&&!i){if(o=K.exec(e))if(a=o[1]){if(9===u){if(s=t.getElementById(a),!s||!s.parentNode)return r;if(s.id===a)return r.push(s),r}else if(t.ownerDocument&&(s=t.ownerDocument.getElementById(a))&&y(t,s)&&s.id===a)return r.push(s),r}else{if(o[2])return O.apply(r,t.getElementsByTagName(e)),r;if((a=o[3])&&n.getElementsByClassName&&t.getElementsByClassName)return O.apply(r,t.getElementsByClassName(a)),r}if(n.qsa&&(!d||!d.test(e))){if(m=g=v,x=t,w=9===u&&e,1===u&&"object"!==t.nodeName.toLowerCase()){f=gt(e),(g=t.getAttribute("id"))?m=g.replace(tt,"\\$&"):t.setAttribute("id",m),m="[id='"+m+"'] ",l=f.length;while(l--)f[l]=m+mt(f[l]);x=U.test(e)&&t.parentNode||t,w=f.join(",")}if(w)try{return O.apply(r,x.querySelectorAll(w)),r}catch(T){}finally{g||t.removeAttribute("id")}}}return kt(e.replace(z,"$1"),t,r,i)}function st(){var e=[];function t(n,r){return e.push(n+=" ")>i.cacheLength&&delete t[e.shift()],t[n]=r}return t}function at(e){return e[v]=!0,e}function ut(e){var t=p.createElement("div");try{return!!e(t)}catch(n){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function lt(e,t){var n=e.split("|"),r=e.length;while(r--)i.attrHandle[n[r]]=t}function ct(e,t){var n=t&&e,r=n&&1===e.nodeType&&1===t.nodeType&&(~t.sourceIndex||D)-(~e.sourceIndex||D);if(r)return r;if(n)while(n=n.nextSibling)if(n===t)return-1;return e?1:-1}function pt(e){return function(t){var n=t.nodeName.toLowerCase();return"input"===n&&t.type===e}}function ft(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e}}function ht(e){return at(function(t){return t=+t,at(function(n,r){var i,o=e([],n.length,t),s=o.length;while(s--)n[i=o[s]]&&(n[i]=!(r[i]=n[i]))})})}s=ot.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?"HTML"!==t.nodeName:!1},n=ot.support={},c=ot.setDocument=function(e){var t=e?e.ownerDocument||e:b,r=t.defaultView;return t!==p&&9===t.nodeType&&t.documentElement?(p=t,f=t.documentElement,h=!s(t),r&&r.attachEvent&&r!==r.top&&r.attachEvent("onbeforeunload",function(){c()}),n.attributes=ut(function(e){return e.className="i",!e.getAttribute("className")}),n.getElementsByTagName=ut(function(e){return e.appendChild(t.createComment("")),!e.getElementsByTagName("*").length}),n.getElementsByClassName=ut(function(e){return e.innerHTML="<div class='a'></div><div class='a i'></div>",e.firstChild.className="i",2===e.getElementsByClassName("i").length}),n.getById=ut(function(e){return f.appendChild(e).id=v,!t.getElementsByName||!t.getElementsByName(v).length}),n.getById?(i.find.ID=function(e,t){if(typeof t.getElementById!==j&&h){var n=t.getElementById(e);return n&&n.parentNode?[n]:[]}},i.filter.ID=function(e){var t=e.replace(nt,rt);return function(e){return e.getAttribute("id")===t}}):(delete i.find.ID,i.filter.ID=function(e){var t=e.replace(nt,rt);return function(e){var n=typeof e.getAttributeNode!==j&&e.getAttributeNode("id");return n&&n.value===t}}),i.find.TAG=n.getElementsByTagName?function(e,t){return typeof t.getElementsByTagName!==j?t.getElementsByTagName(e):undefined}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){while(n=o[i++])1===n.nodeType&&r.push(n);return r}return o},i.find.CLASS=n.getElementsByClassName&&function(e,t){return typeof t.getElementsByClassName!==j&&h?t.getElementsByClassName(e):undefined},g=[],d=[],(n.qsa=Q.test(t.querySelectorAll))&&(ut(function(e){e.innerHTML="<select><option selected=''></option></select>",e.querySelectorAll("[selected]").length||d.push("\\["+M+"*(?:value|"+R+")"),e.querySelectorAll(":checked").length||d.push(":checked")}),ut(function(e){var n=t.createElement("input");n.setAttribute("type","hidden"),e.appendChild(n).setAttribute("t",""),e.querySelectorAll("[t^='']").length&&d.push("[*^$]="+M+"*(?:''|\"\")"),e.querySelectorAll(":enabled").length||d.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),d.push(",.*:")})),(n.matchesSelector=Q.test(m=f.webkitMatchesSelector||f.mozMatchesSelector||f.oMatchesSelector||f.msMatchesSelector))&&ut(function(e){n.disconnectedMatch=m.call(e,"div"),m.call(e,"[s!='']:x"),g.push("!=",I)}),d=d.length&&RegExp(d.join("|")),g=g.length&&RegExp(g.join("|")),y=Q.test(f.contains)||f.compareDocumentPosition?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)while(t=t.parentNode)if(t===e)return!0;return!1},S=f.compareDocumentPosition?function(e,r){if(e===r)return E=!0,0;var i=r.compareDocumentPosition&&e.compareDocumentPosition&&e.compareDocumentPosition(r);return i?1&i||!n.sortDetached&&r.compareDocumentPosition(e)===i?e===t||y(b,e)?-1:r===t||y(b,r)?1:l?P.call(l,e)-P.call(l,r):0:4&i?-1:1:e.compareDocumentPosition?-1:1}:function(e,n){var r,i=0,o=e.parentNode,s=n.parentNode,a=[e],u=[n];if(e===n)return E=!0,0;if(!o||!s)return e===t?-1:n===t?1:o?-1:s?1:l?P.call(l,e)-P.call(l,n):0;if(o===s)return ct(e,n);r=e;while(r=r.parentNode)a.unshift(r);r=n;while(r=r.parentNode)u.unshift(r);while(a[i]===u[i])i++;return i?ct(a[i],u[i]):a[i]===b?-1:u[i]===b?1:0},t):p},ot.matches=function(e,t){return ot(e,null,null,t)},ot.matchesSelector=function(e,t){if((e.ownerDocument||e)!==p&&c(e),t=t.replace(Y,"='$1']"),!(!n.matchesSelector||!h||g&&g.test(t)||d&&d.test(t)))try{var r=m.call(e,t);if(r||n.disconnectedMatch||e.document&&11!==e.document.nodeType)return r}catch(i){}return ot(t,p,null,[e]).length>0},ot.contains=function(e,t){return(e.ownerDocument||e)!==p&&c(e),y(e,t)},ot.attr=function(e,t){(e.ownerDocument||e)!==p&&c(e);var r=i.attrHandle[t.toLowerCase()],o=r&&A.call(i.attrHandle,t.toLowerCase())?r(e,t,!h):undefined;return o===undefined?n.attributes||!h?e.getAttribute(t):(o=e.getAttributeNode(t))&&o.specified?o.value:null:o},ot.error=function(e){throw Error("Syntax error, unrecognized expression: "+e)},ot.uniqueSort=function(e){var t,r=[],i=0,o=0;if(E=!n.detectDuplicates,l=!n.sortStable&&e.slice(0),e.sort(S),E){while(t=e[o++])t===e[o]&&(i=r.push(o));while(i--)e.splice(r[i],1)}return e},o=ot.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(1===i||9===i||11===i){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=o(e)}else if(3===i||4===i)return e.nodeValue}else for(;t=e[r];r++)n+=o(t);return n},i=ot.selectors={cacheLength:50,createPseudo:at,match:J,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(nt,rt),e[3]=(e[4]||e[5]||"").replace(nt,rt),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||ot.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&ot.error(e[0]),e},PSEUDO:function(e){var t,n=!e[5]&&e[2];return J.CHILD.test(e[0])?null:(e[3]&&e[4]!==undefined?e[2]=e[4]:n&&V.test(n)&&(t=gt(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(nt,rt).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=C[e+" "];return t||(t=RegExp("(^|"+M+")"+e+"("+M+"|$)"))&&C(e,function(e){return t.test("string"==typeof e.className&&e.className||typeof e.getAttribute!==j&&e.getAttribute("class")||"")})},ATTR:function(e,t,n){return function(r){var i=ot.attr(r,e);return null==i?"!="===t:t?(i+="","="===t?i===n:"!="===t?i!==n:"^="===t?n&&0===i.indexOf(n):"*="===t?n&&i.indexOf(n)>-1:"$="===t?n&&i.slice(-n.length)===n:"~="===t?(" "+i+" ").indexOf(n)>-1:"|="===t?i===n||i.slice(0,n.length+1)===n+"-":!1):!0}},CHILD:function(e,t,n,r,i){var o="nth"!==e.slice(0,3),s="last"!==e.slice(-4),a="of-type"===t;return 1===r&&0===i?function(e){return!!e.parentNode}:function(t,n,u){var l,c,p,f,h,d,g=o!==s?"nextSibling":"previousSibling",m=t.parentNode,y=a&&t.nodeName.toLowerCase(),x=!u&&!a;if(m){if(o){while(g){p=t;while(p=p[g])if(a?p.nodeName.toLowerCase()===y:1===p.nodeType)return!1;d=g="only"===e&&!d&&"nextSibling"}return!0}if(d=[s?m.firstChild:m.lastChild],s&&x){c=m[v]||(m[v]={}),l=c[e]||[],h=l[0]===w&&l[1],f=l[0]===w&&l[2],p=h&&m.childNodes[h];while(p=++h&&p&&p[g]||(f=h=0)||d.pop())if(1===p.nodeType&&++f&&p===t){c[e]=[w,h,f];break}}else if(x&&(l=(t[v]||(t[v]={}))[e])&&l[0]===w)f=l[1];else while(p=++h&&p&&p[g]||(f=h=0)||d.pop())if((a?p.nodeName.toLowerCase()===y:1===p.nodeType)&&++f&&(x&&((p[v]||(p[v]={}))[e]=[w,f]),p===t))break;return f-=i,f===r||0===f%r&&f/r>=0}}},PSEUDO:function(e,t){var n,r=i.pseudos[e]||i.setFilters[e.toLowerCase()]||ot.error("unsupported pseudo: "+e);return r[v]?r(t):r.length>1?(n=[e,e,"",t],i.setFilters.hasOwnProperty(e.toLowerCase())?at(function(e,n){var i,o=r(e,t),s=o.length;while(s--)i=P.call(e,o[s]),e[i]=!(n[i]=o[s])}):function(e){return r(e,0,n)}):r}},pseudos:{not:at(function(e){var t=[],n=[],r=a(e.replace(z,"$1"));return r[v]?at(function(e,t,n,i){var o,s=r(e,null,i,[]),a=e.length;while(a--)(o=s[a])&&(e[a]=!(t[a]=o))}):function(e,i,o){return t[0]=e,r(t,null,o,n),!n.pop()}}),has:at(function(e){return function(t){return ot(e,t).length>0}}),contains:at(function(e){return function(t){return(t.textContent||t.innerText||o(t)).indexOf(e)>-1}}),lang:at(function(e){return G.test(e||"")||ot.error("unsupported lang: "+e),e=e.replace(nt,rt).toLowerCase(),function(t){var n;do if(n=h?t.lang:t.getAttribute("xml:lang")||t.getAttribute("lang"))return n=n.toLowerCase(),n===e||0===n.indexOf(e+"-");while((t=t.parentNode)&&1===t.nodeType);return!1}}),target:function(t){var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){return e===f},focus:function(e){return e===p.activeElement&&(!p.hasFocus||p.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeName>"@"||3===e.nodeType||4===e.nodeType)return!1;return!0},parent:function(e){return!i.pseudos.empty(e)},header:function(e){return et.test(e.nodeName)},input:function(e){return Z.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||t.toLowerCase()===e.type)},first:ht(function(){return[0]}),last:ht(function(e,t){return[t-1]}),eq:ht(function(e,t,n){return[0>n?n+t:n]}),even:ht(function(e,t){var n=0;for(;t>n;n+=2)e.push(n);return e}),odd:ht(function(e,t){var n=1;for(;t>n;n+=2)e.push(n);return e}),lt:ht(function(e,t,n){var r=0>n?n+t:n;for(;--r>=0;)e.push(r);return e}),gt:ht(function(e,t,n){var r=0>n?n+t:n;for(;t>++r;)e.push(r);return e})}},i.pseudos.nth=i.pseudos.eq;for(t in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})i.pseudos[t]=pt(t);for(t in{submit:!0,reset:!0})i.pseudos[t]=ft(t);function dt(){}dt.prototype=i.filters=i.pseudos,i.setFilters=new dt;function gt(e,t){var n,r,o,s,a,u,l,c=k[e+" "];if(c)return t?0:c.slice(0);a=e,u=[],l=i.preFilter;while(a){(!n||(r=_.exec(a)))&&(r&&(a=a.slice(r[0].length)||a),u.push(o=[])),n=!1,(r=X.exec(a))&&(n=r.shift(),o.push({value:n,type:r[0].replace(z," ")}),a=a.slice(n.length));for(s in i.filter)!(r=J[s].exec(a))||l[s]&&!(r=l[s](r))||(n=r.shift(),o.push({value:n,type:s,matches:r}),a=a.slice(n.length));if(!n)break}return t?a.length:a?ot.error(e):k(e,u).slice(0)}function mt(e){var t=0,n=e.length,r="";for(;n>t;t++)r+=e[t].value;return r}function yt(e,t,n){var i=t.dir,o=n&&"parentNode"===i,s=T++;return t.first?function(t,n,r){while(t=t[i])if(1===t.nodeType||o)return e(t,n,r)}:function(t,n,a){var u,l,c,p=w+" "+s;if(a){while(t=t[i])if((1===t.nodeType||o)&&e(t,n,a))return!0}else while(t=t[i])if(1===t.nodeType||o)if(c=t[v]||(t[v]={}),(l=c[i])&&l[0]===p){if((u=l[1])===!0||u===r)return u===!0}else if(l=c[i]=[p],l[1]=e(t,n,a)||r,l[1]===!0)return!0}}function vt(e){return e.length>1?function(t,n,r){var i=e.length;while(i--)if(!e[i](t,n,r))return!1;return!0}:e[0]}function xt(e,t,n,r,i){var o,s=[],a=0,u=e.length,l=null!=t;for(;u>a;a++)(o=e[a])&&(!n||n(o,r,i))&&(s.push(o),l&&t.push(a));return s}function bt(e,t,n,r,i,o){return r&&!r[v]&&(r=bt(r)),i&&!i[v]&&(i=bt(i,o)),at(function(o,s,a,u){var l,c,p,f=[],h=[],d=s.length,g=o||Ct(t||"*",a.nodeType?[a]:a,[]),m=!e||!o&&t?g:xt(g,f,e,a,u),y=n?i||(o?e:d||r)?[]:s:m;if(n&&n(m,y,a,u),r){l=xt(y,h),r(l,[],a,u),c=l.length;while(c--)(p=l[c])&&(y[h[c]]=!(m[h[c]]=p))}if(o){if(i||e){if(i){l=[],c=y.length;while(c--)(p=y[c])&&l.push(m[c]=p);i(null,y=[],l,u)}c=y.length;while(c--)(p=y[c])&&(l=i?P.call(o,p):f[c])>-1&&(o[l]=!(s[l]=p))}}else y=xt(y===s?y.splice(d,y.length):y),i?i(null,s,y,u):O.apply(s,y)})}function wt(e){var t,n,r,o=e.length,s=i.relative[e[0].type],a=s||i.relative[" "],l=s?1:0,c=yt(function(e){return e===t},a,!0),p=yt(function(e){return P.call(t,e)>-1},a,!0),f=[function(e,n,r){return!s&&(r||n!==u)||((t=n).nodeType?c(e,n,r):p(e,n,r))}];for(;o>l;l++)if(n=i.relative[e[l].type])f=[yt(vt(f),n)];else{if(n=i.filter[e[l].type].apply(null,e[l].matches),n[v]){for(r=++l;o>r;r++)if(i.relative[e[r].type])break;return bt(l>1&&vt(f),l>1&&mt(e.slice(0,l-1).concat({value:" "===e[l-2].type?"*":""})).replace(z,"$1"),n,r>l&&wt(e.slice(l,r)),o>r&&wt(e=e.slice(r)),o>r&&mt(e))}f.push(n)}return vt(f)}function Tt(e,t){var n=0,o=t.length>0,s=e.length>0,a=function(a,l,c,f,h){var d,g,m,y=[],v=0,x="0",b=a&&[],T=null!=h,C=u,k=a||s&&i.find.TAG("*",h&&l.parentNode||l),N=w+=null==C?1:Math.random()||.1;for(T&&(u=l!==p&&l,r=n);null!=(d=k[x]);x++){if(s&&d){g=0;while(m=e[g++])if(m(d,l,c)){f.push(d);break}T&&(w=N,r=++n)}o&&((d=!m&&d)&&v--,a&&b.push(d))}if(v+=x,o&&x!==v){g=0;while(m=t[g++])m(b,y,l,c);if(a){if(v>0)while(x--)b[x]||y[x]||(y[x]=q.call(f));y=xt(y)}O.apply(f,y),T&&!a&&y.length>0&&v+t.length>1&&ot.uniqueSort(f)}return T&&(w=N,u=C),b};return o?at(a):a}a=ot.compile=function(e,t){var n,r=[],i=[],o=N[e+" "];if(!o){t||(t=gt(e)),n=t.length;while(n--)o=wt(t[n]),o[v]?r.push(o):i.push(o);o=N(e,Tt(i,r))}return o};function Ct(e,t,n){var r=0,i=t.length;for(;i>r;r++)ot(e,t[r],n);return n}function kt(e,t,r,o){var s,u,l,c,p,f=gt(e);if(!o&&1===f.length){if(u=f[0]=f[0].slice(0),u.length>2&&"ID"===(l=u[0]).type&&n.getById&&9===t.nodeType&&h&&i.relative[u[1].type]){if(t=(i.find.ID(l.matches[0].replace(nt,rt),t)||[])[0],!t)return r;e=e.slice(u.shift().value.length)}s=J.needsContext.test(e)?0:u.length;while(s--){if(l=u[s],i.relative[c=l.type])break;if((p=i.find[c])&&(o=p(l.matches[0].replace(nt,rt),U.test(u[0].type)&&t.parentNode||t))){if(u.splice(s,1),e=o.length&&mt(u),!e)return O.apply(r,o),r;break}}}return a(e,f)(o,t,!h,r,U.test(e)),r}n.sortStable=v.split("").sort(S).join("")===v,n.detectDuplicates=E,c(),n.sortDetached=ut(function(e){return 1&e.compareDocumentPosition(p.createElement("div"))}),ut(function(e){return e.innerHTML="<a href='#'></a>","#"===e.firstChild.getAttribute("href")})||lt("type|href|height|width",function(e,t,n){return n?undefined:e.getAttribute(t,"type"===t.toLowerCase()?1:2)}),n.attributes&&ut(function(e){return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")})||lt("value",function(e,t,n){return n||"input"!==e.nodeName.toLowerCase()?undefined:e.defaultValue}),ut(function(e){return null==e.getAttribute("disabled")})||lt(R,function(e,t,n){var r;return n?undefined:(r=e.getAttributeNode(t))&&r.specified?r.value:e[t]===!0?t.toLowerCase():null}),x.find=ot,x.expr=ot.selectors,x.expr[":"]=x.expr.pseudos,x.unique=ot.uniqueSort,x.text=ot.getText,x.isXMLDoc=ot.isXML,x.contains=ot.contains}(e);var D={};function A(e){var t=D[e]={};return x.each(e.match(w)||[],function(e,n){t[n]=!0}),t}x.Callbacks=function(e){e="string"==typeof e?D[e]||A(e):x.extend({},e);var t,n,r,i,o,s,a=[],u=!e.once&&[],l=function(p){for(t=e.memory&&p,n=!0,s=i||0,i=0,o=a.length,r=!0;a&&o>s;s++)if(a[s].apply(p[0],p[1])===!1&&e.stopOnFalse){t=!1;break}r=!1,a&&(u?u.length&&l(u.shift()):t?a=[]:c.disable())},c={add:function(){if(a){var n=a.length;(function s(t){x.each(t,function(t,n){var r=x.type(n);"function"===r?e.unique&&c.has(n)||a.push(n):n&&n.length&&"string"!==r&&s(n)})})(arguments),r?o=a.length:t&&(i=n,l(t))}return this},remove:function(){return a&&x.each(arguments,function(e,t){var n;while((n=x.inArray(t,a,n))>-1)a.splice(n,1),r&&(o>=n&&o--,s>=n&&s--)}),this},has:function(e){return e?x.inArray(e,a)>-1:!(!a||!a.length)},empty:function(){return a=[],o=0,this},disable:function(){return a=u=t=undefined,this},disabled:function(){return!a},lock:function(){return u=undefined,t||c.disable(),this},locked:function(){return!u},fireWith:function(e,t){return!a||n&&!u||(t=t||[],t=[e,t.slice?t.slice():t],r?u.push(t):l(t)),this},fire:function(){return c.fireWith(this,arguments),this},fired:function(){return!!n}};return c},x.extend({Deferred:function(e){var t=[["resolve","done",x.Callbacks("once memory"),"resolved"],["reject","fail",x.Callbacks("once memory"),"rejected"],["notify","progress",x.Callbacks("memory")]],n="pending",r={state:function(){return n},always:function(){return i.done(arguments).fail(arguments),this},then:function(){var e=arguments;return x.Deferred(function(n){x.each(t,function(t,o){var s=o[0],a=x.isFunction(e[t])&&e[t];i[o[1]](function(){var e=a&&a.apply(this,arguments);e&&x.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[s+"With"](this===r?n.promise():this,a?[e]:arguments)})}),e=null}).promise()},promise:function(e){return null!=e?x.extend(e,r):r}},i={};return r.pipe=r.then,x.each(t,function(e,o){var s=o[2],a=o[3];r[o[1]]=s.add,a&&s.add(function(){n=a},t[1^e][2].disable,t[2][2].lock),i[o[0]]=function(){return i[o[0]+"With"](this===i?r:this,arguments),this},i[o[0]+"With"]=s.fireWith}),r.promise(i),e&&e.call(i,i),i},when:function(e){var t=0,n=d.call(arguments),r=n.length,i=1!==r||e&&x.isFunction(e.promise)?r:0,o=1===i?e:x.Deferred(),s=function(e,t,n){return function(r){t[e]=this,n[e]=arguments.length>1?d.call(arguments):r,n===a?o.notifyWith(t,n):--i||o.resolveWith(t,n)}},a,u,l;if(r>1)for(a=Array(r),u=Array(r),l=Array(r);r>t;t++)n[t]&&x.isFunction(n[t].promise)?n[t].promise().done(s(t,l,n)).fail(o.reject).progress(s(t,u,a)):--i;return i||o.resolveWith(l,n),o.promise()}}),x.support=function(t){var n=o.createElement("input"),r=o.createDocumentFragment(),i=o.createElement("div"),s=o.createElement("select"),a=s.appendChild(o.createElement("option"));return n.type?(n.type="checkbox",t.checkOn=""!==n.value,t.optSelected=a.selected,t.reliableMarginRight=!0,t.boxSizingReliable=!0,t.pixelPosition=!1,n.checked=!0,t.noCloneChecked=n.cloneNode(!0).checked,s.disabled=!0,t.optDisabled=!a.disabled,n=o.createElement("input"),n.value="t",n.type="radio",t.radioValue="t"===n.value,n.setAttribute("checked","t"),n.setAttribute("name","t"),r.appendChild(n),t.checkClone=r.cloneNode(!0).cloneNode(!0).lastChild.checked,t.focusinBubbles="onfocusin"in e,i.style.backgroundClip="content-box",i.cloneNode(!0).style.backgroundClip="",t.clearCloneStyle="content-box"===i.style.backgroundClip,x(function(){var n,r,s="padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box",a=o.getElementsByTagName("body")[0];a&&(n=o.createElement("div"),n.style.cssText="border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px",a.appendChild(n).appendChild(i),i.innerHTML="",i.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%",x.swap(a,null!=a.style.zoom?{zoom:1}:{},function(){t.boxSizing=4===i.offsetWidth}),e.getComputedStyle&&(t.pixelPosition="1%"!==(e.getComputedStyle(i,null)||{}).top,t.boxSizingReliable="4px"===(e.getComputedStyle(i,null)||{width:"4px"}).width,r=i.appendChild(o.createElement("div")),r.style.cssText=i.style.cssText=s,r.style.marginRight=r.style.width="0",i.style.width="1px",t.reliableMarginRight=!parseFloat((e.getComputedStyle(r,null)||{}).marginRight)),a.removeChild(n))}),t):t}({});var L,q,H=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,O=/([A-Z])/g;function F(){Object.defineProperty(this.cache={},0,{get:function(){return{}}}),this.expando=x.expando+Math.random()}F.uid=1,F.accepts=function(e){return e.nodeType?1===e.nodeType||9===e.nodeType:!0},F.prototype={key:function(e){if(!F.accepts(e))return 0;var t={},n=e[this.expando];if(!n){n=F.uid++;try{t[this.expando]={value:n},Object.defineProperties(e,t)}catch(r){t[this.expando]=n,x.extend(e,t)}}return this.cache[n]||(this.cache[n]={}),n},set:function(e,t,n){var r,i=this.key(e),o=this.cache[i];if("string"==typeof t)o[t]=n;else if(x.isEmptyObject(o))x.extend(this.cache[i],t);else for(r in t)o[r]=t[r];return o},get:function(e,t){var n=this.cache[this.key(e)];return t===undefined?n:n[t]},access:function(e,t,n){var r;return t===undefined||t&&"string"==typeof t&&n===undefined?(r=this.get(e,t),r!==undefined?r:this.get(e,x.camelCase(t))):(this.set(e,t,n),n!==undefined?n:t)},remove:function(e,t){var n,r,i,o=this.key(e),s=this.cache[o];if(t===undefined)this.cache[o]={};else{x.isArray(t)?r=t.concat(t.map(x.camelCase)):(i=x.camelCase(t),t in s?r=[t,i]:(r=i,r=r in s?[r]:r.match(w)||[])),n=r.length;while(n--)delete s[r[n]]}},hasData:function(e){return!x.isEmptyObject(this.cache[e[this.expando]]||{})},discard:function(e){e[this.expando]&&delete this.cache[e[this.expando]]}},L=new F,q=new F,x.extend({acceptData:F.accepts,hasData:function(e){return L.hasData(e)||q.hasData(e)},data:function(e,t,n){return L.access(e,t,n)},removeData:function(e,t){L.remove(e,t)},_data:function(e,t,n){return q.access(e,t,n)},_removeData:function(e,t){q.remove(e,t)}}),x.fn.extend({data:function(e,t){var n,r,i=this[0],o=0,s=null;if(e===undefined){if(this.length&&(s=L.get(i),1===i.nodeType&&!q.get(i,"hasDataAttrs"))){for(n=i.attributes;n.length>o;o++)r=n[o].name,0===r.indexOf("data-")&&(r=x.camelCase(r.slice(5)),P(i,r,s[r]));q.set(i,"hasDataAttrs",!0)}return s}return"object"==typeof e?this.each(function(){L.set(this,e)}):x.access(this,function(t){var n,r=x.camelCase(e);if(i&&t===undefined){if(n=L.get(i,e),n!==undefined)return n;if(n=L.get(i,r),n!==undefined)return n;if(n=P(i,r,undefined),n!==undefined)return n}else this.each(function(){var n=L.get(this,r);L.set(this,r,t),-1!==e.indexOf("-")&&n!==undefined&&L.set(this,e,t)})},null,t,arguments.length>1,null,!0)},removeData:function(e){return this.each(function(){L.remove(this,e)})}});function P(e,t,n){var r;if(n===undefined&&1===e.nodeType)if(r="data-"+t.replace(O,"-$1").toLowerCase(),n=e.getAttribute(r),"string"==typeof n){try{n="true"===n?!0:"false"===n?!1:"null"===n?null:+n+""===n?+n:H.test(n)?JSON.parse(n):n}catch(i){}L.set(e,t,n)}else n=undefined;return n}x.extend({queue:function(e,t,n){var r;return e?(t=(t||"fx")+"queue",r=q.get(e,t),n&&(!r||x.isArray(n)?r=q.access(e,t,x.makeArray(n)):r.push(n)),r||[]):undefined},dequeue:function(e,t){t=t||"fx";var n=x.queue(e,t),r=n.length,i=n.shift(),o=x._queueHooks(e,t),s=function(){x.dequeue(e,t)
};"inprogress"===i&&(i=n.shift(),r--),i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,s,o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return q.get(e,n)||q.access(e,n,{empty:x.Callbacks("once memory").add(function(){q.remove(e,[t+"queue",n])})})}}),x.fn.extend({queue:function(e,t){var n=2;return"string"!=typeof e&&(t=e,e="fx",n--),n>arguments.length?x.queue(this[0],e):t===undefined?this:this.each(function(){var n=x.queue(this,e,t);x._queueHooks(this,e),"fx"===e&&"inprogress"!==n[0]&&x.dequeue(this,e)})},dequeue:function(e){return this.each(function(){x.dequeue(this,e)})},delay:function(e,t){return e=x.fx?x.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,n){var r=setTimeout(t,e);n.stop=function(){clearTimeout(r)}})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,t){var n,r=1,i=x.Deferred(),o=this,s=this.length,a=function(){--r||i.resolveWith(o,[o])};"string"!=typeof e&&(t=e,e=undefined),e=e||"fx";while(s--)n=q.get(o[s],e+"queueHooks"),n&&n.empty&&(r++,n.empty.add(a));return a(),i.promise(t)}});var R,M,W=/[\t\r\n\f]/g,$=/\r/g,B=/^(?:input|select|textarea|button)$/i;x.fn.extend({attr:function(e,t){return x.access(this,x.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){x.removeAttr(this,e)})},prop:function(e,t){return x.access(this,x.prop,e,t,arguments.length>1)},removeProp:function(e){return this.each(function(){delete this[x.propFix[e]||e]})},addClass:function(e){var t,n,r,i,o,s=0,a=this.length,u="string"==typeof e&&e;if(x.isFunction(e))return this.each(function(t){x(this).addClass(e.call(this,t,this.className))});if(u)for(t=(e||"").match(w)||[];a>s;s++)if(n=this[s],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(W," "):" ")){o=0;while(i=t[o++])0>r.indexOf(" "+i+" ")&&(r+=i+" ");n.className=x.trim(r)}return this},removeClass:function(e){var t,n,r,i,o,s=0,a=this.length,u=0===arguments.length||"string"==typeof e&&e;if(x.isFunction(e))return this.each(function(t){x(this).removeClass(e.call(this,t,this.className))});if(u)for(t=(e||"").match(w)||[];a>s;s++)if(n=this[s],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(W," "):"")){o=0;while(i=t[o++])while(r.indexOf(" "+i+" ")>=0)r=r.replace(" "+i+" "," ");n.className=e?x.trim(r):""}return this},toggleClass:function(e,t){var n=typeof e;return"boolean"==typeof t&&"string"===n?t?this.addClass(e):this.removeClass(e):x.isFunction(e)?this.each(function(n){x(this).toggleClass(e.call(this,n,this.className,t),t)}):this.each(function(){if("string"===n){var t,i=0,o=x(this),s=e.match(w)||[];while(t=s[i++])o.hasClass(t)?o.removeClass(t):o.addClass(t)}else(n===r||"boolean"===n)&&(this.className&&q.set(this,"__className__",this.className),this.className=this.className||e===!1?"":q.get(this,"__className__")||"")})},hasClass:function(e){var t=" "+e+" ",n=0,r=this.length;for(;r>n;n++)if(1===this[n].nodeType&&(" "+this[n].className+" ").replace(W," ").indexOf(t)>=0)return!0;return!1},val:function(e){var t,n,r,i=this[0];{if(arguments.length)return r=x.isFunction(e),this.each(function(n){var i;1===this.nodeType&&(i=r?e.call(this,n,x(this).val()):e,null==i?i="":"number"==typeof i?i+="":x.isArray(i)&&(i=x.map(i,function(e){return null==e?"":e+""})),t=x.valHooks[this.type]||x.valHooks[this.nodeName.toLowerCase()],t&&"set"in t&&t.set(this,i,"value")!==undefined||(this.value=i))});if(i)return t=x.valHooks[i.type]||x.valHooks[i.nodeName.toLowerCase()],t&&"get"in t&&(n=t.get(i,"value"))!==undefined?n:(n=i.value,"string"==typeof n?n.replace($,""):null==n?"":n)}}}),x.extend({valHooks:{option:{get:function(e){var t=e.attributes.value;return!t||t.specified?e.value:e.text}},select:{get:function(e){var t,n,r=e.options,i=e.selectedIndex,o="select-one"===e.type||0>i,s=o?null:[],a=o?i+1:r.length,u=0>i?a:o?i:0;for(;a>u;u++)if(n=r[u],!(!n.selected&&u!==i||(x.support.optDisabled?n.disabled:null!==n.getAttribute("disabled"))||n.parentNode.disabled&&x.nodeName(n.parentNode,"optgroup"))){if(t=x(n).val(),o)return t;s.push(t)}return s},set:function(e,t){var n,r,i=e.options,o=x.makeArray(t),s=i.length;while(s--)r=i[s],(r.selected=x.inArray(x(r).val(),o)>=0)&&(n=!0);return n||(e.selectedIndex=-1),o}}},attr:function(e,t,n){var i,o,s=e.nodeType;if(e&&3!==s&&8!==s&&2!==s)return typeof e.getAttribute===r?x.prop(e,t,n):(1===s&&x.isXMLDoc(e)||(t=t.toLowerCase(),i=x.attrHooks[t]||(x.expr.match.bool.test(t)?M:R)),n===undefined?i&&"get"in i&&null!==(o=i.get(e,t))?o:(o=x.find.attr(e,t),null==o?undefined:o):null!==n?i&&"set"in i&&(o=i.set(e,n,t))!==undefined?o:(e.setAttribute(t,n+""),n):(x.removeAttr(e,t),undefined))},removeAttr:function(e,t){var n,r,i=0,o=t&&t.match(w);if(o&&1===e.nodeType)while(n=o[i++])r=x.propFix[n]||n,x.expr.match.bool.test(n)&&(e[r]=!1),e.removeAttribute(n)},attrHooks:{type:{set:function(e,t){if(!x.support.radioValue&&"radio"===t&&x.nodeName(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},propFix:{"for":"htmlFor","class":"className"},prop:function(e,t,n){var r,i,o,s=e.nodeType;if(e&&3!==s&&8!==s&&2!==s)return o=1!==s||!x.isXMLDoc(e),o&&(t=x.propFix[t]||t,i=x.propHooks[t]),n!==undefined?i&&"set"in i&&(r=i.set(e,n,t))!==undefined?r:e[t]=n:i&&"get"in i&&null!==(r=i.get(e,t))?r:e[t]},propHooks:{tabIndex:{get:function(e){return e.hasAttribute("tabindex")||B.test(e.nodeName)||e.href?e.tabIndex:-1}}}}),M={set:function(e,t,n){return t===!1?x.removeAttr(e,n):e.setAttribute(n,n),n}},x.each(x.expr.match.bool.source.match(/\w+/g),function(e,t){var n=x.expr.attrHandle[t]||x.find.attr;x.expr.attrHandle[t]=function(e,t,r){var i=x.expr.attrHandle[t],o=r?undefined:(x.expr.attrHandle[t]=undefined)!=n(e,t,r)?t.toLowerCase():null;return x.expr.attrHandle[t]=i,o}}),x.support.optSelected||(x.propHooks.selected={get:function(e){var t=e.parentNode;return t&&t.parentNode&&t.parentNode.selectedIndex,null}}),x.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){x.propFix[this.toLowerCase()]=this}),x.each(["radio","checkbox"],function(){x.valHooks[this]={set:function(e,t){return x.isArray(t)?e.checked=x.inArray(x(e).val(),t)>=0:undefined}},x.support.checkOn||(x.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})});var I=/^key/,z=/^(?:mouse|contextmenu)|click/,_=/^(?:focusinfocus|focusoutblur)$/,X=/^([^.]*)(?:\.(.+)|)$/;function U(){return!0}function Y(){return!1}function V(){try{return o.activeElement}catch(e){}}x.event={global:{},add:function(e,t,n,i,o){var s,a,u,l,c,p,f,h,d,g,m,y=q.get(e);if(y){n.handler&&(s=n,n=s.handler,o=s.selector),n.guid||(n.guid=x.guid++),(l=y.events)||(l=y.events={}),(a=y.handle)||(a=y.handle=function(e){return typeof x===r||e&&x.event.triggered===e.type?undefined:x.event.dispatch.apply(a.elem,arguments)},a.elem=e),t=(t||"").match(w)||[""],c=t.length;while(c--)u=X.exec(t[c])||[],d=m=u[1],g=(u[2]||"").split(".").sort(),d&&(f=x.event.special[d]||{},d=(o?f.delegateType:f.bindType)||d,f=x.event.special[d]||{},p=x.extend({type:d,origType:m,data:i,handler:n,guid:n.guid,selector:o,needsContext:o&&x.expr.match.needsContext.test(o),namespace:g.join(".")},s),(h=l[d])||(h=l[d]=[],h.delegateCount=0,f.setup&&f.setup.call(e,i,g,a)!==!1||e.addEventListener&&e.addEventListener(d,a,!1)),f.add&&(f.add.call(e,p),p.handler.guid||(p.handler.guid=n.guid)),o?h.splice(h.delegateCount++,0,p):h.push(p),x.event.global[d]=!0);e=null}},remove:function(e,t,n,r,i){var o,s,a,u,l,c,p,f,h,d,g,m=q.hasData(e)&&q.get(e);if(m&&(u=m.events)){t=(t||"").match(w)||[""],l=t.length;while(l--)if(a=X.exec(t[l])||[],h=g=a[1],d=(a[2]||"").split(".").sort(),h){p=x.event.special[h]||{},h=(r?p.delegateType:p.bindType)||h,f=u[h]||[],a=a[2]&&RegExp("(^|\\.)"+d.join("\\.(?:.*\\.|)")+"(\\.|$)"),s=o=f.length;while(o--)c=f[o],!i&&g!==c.origType||n&&n.guid!==c.guid||a&&!a.test(c.namespace)||r&&r!==c.selector&&("**"!==r||!c.selector)||(f.splice(o,1),c.selector&&f.delegateCount--,p.remove&&p.remove.call(e,c));s&&!f.length&&(p.teardown&&p.teardown.call(e,d,m.handle)!==!1||x.removeEvent(e,h,m.handle),delete u[h])}else for(h in u)x.event.remove(e,h+t[l],n,r,!0);x.isEmptyObject(u)&&(delete m.handle,q.remove(e,"events"))}},trigger:function(t,n,r,i){var s,a,u,l,c,p,f,h=[r||o],d=y.call(t,"type")?t.type:t,g=y.call(t,"namespace")?t.namespace.split("."):[];if(a=u=r=r||o,3!==r.nodeType&&8!==r.nodeType&&!_.test(d+x.event.triggered)&&(d.indexOf(".")>=0&&(g=d.split("."),d=g.shift(),g.sort()),c=0>d.indexOf(":")&&"on"+d,t=t[x.expando]?t:new x.Event(d,"object"==typeof t&&t),t.isTrigger=i?2:3,t.namespace=g.join("."),t.namespace_re=t.namespace?RegExp("(^|\\.)"+g.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,t.result=undefined,t.target||(t.target=r),n=null==n?[t]:x.makeArray(n,[t]),f=x.event.special[d]||{},i||!f.trigger||f.trigger.apply(r,n)!==!1)){if(!i&&!f.noBubble&&!x.isWindow(r)){for(l=f.delegateType||d,_.test(l+d)||(a=a.parentNode);a;a=a.parentNode)h.push(a),u=a;u===(r.ownerDocument||o)&&h.push(u.defaultView||u.parentWindow||e)}s=0;while((a=h[s++])&&!t.isPropagationStopped())t.type=s>1?l:f.bindType||d,p=(q.get(a,"events")||{})[t.type]&&q.get(a,"handle"),p&&p.apply(a,n),p=c&&a[c],p&&x.acceptData(a)&&p.apply&&p.apply(a,n)===!1&&t.preventDefault();return t.type=d,i||t.isDefaultPrevented()||f._default&&f._default.apply(h.pop(),n)!==!1||!x.acceptData(r)||c&&x.isFunction(r[d])&&!x.isWindow(r)&&(u=r[c],u&&(r[c]=null),x.event.triggered=d,r[d](),x.event.triggered=undefined,u&&(r[c]=u)),t.result}},dispatch:function(e){e=x.event.fix(e);var t,n,r,i,o,s=[],a=d.call(arguments),u=(q.get(this,"events")||{})[e.type]||[],l=x.event.special[e.type]||{};if(a[0]=e,e.delegateTarget=this,!l.preDispatch||l.preDispatch.call(this,e)!==!1){s=x.event.handlers.call(this,e,u),t=0;while((i=s[t++])&&!e.isPropagationStopped()){e.currentTarget=i.elem,n=0;while((o=i.handlers[n++])&&!e.isImmediatePropagationStopped())(!e.namespace_re||e.namespace_re.test(o.namespace))&&(e.handleObj=o,e.data=o.data,r=((x.event.special[o.origType]||{}).handle||o.handler).apply(i.elem,a),r!==undefined&&(e.result=r)===!1&&(e.preventDefault(),e.stopPropagation()))}return l.postDispatch&&l.postDispatch.call(this,e),e.result}},handlers:function(e,t){var n,r,i,o,s=[],a=t.delegateCount,u=e.target;if(a&&u.nodeType&&(!e.button||"click"!==e.type))for(;u!==this;u=u.parentNode||this)if(u.disabled!==!0||"click"!==e.type){for(r=[],n=0;a>n;n++)o=t[n],i=o.selector+" ",r[i]===undefined&&(r[i]=o.needsContext?x(i,this).index(u)>=0:x.find(i,this,null,[u]).length),r[i]&&r.push(o);r.length&&s.push({elem:u,handlers:r})}return t.length>a&&s.push({elem:this,handlers:t.slice(a)}),s},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return null==e.which&&(e.which=null!=t.charCode?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,t){var n,r,i,s=t.button;return null==e.pageX&&null!=t.clientX&&(n=e.target.ownerDocument||o,r=n.documentElement,i=n.body,e.pageX=t.clientX+(r&&r.scrollLeft||i&&i.scrollLeft||0)-(r&&r.clientLeft||i&&i.clientLeft||0),e.pageY=t.clientY+(r&&r.scrollTop||i&&i.scrollTop||0)-(r&&r.clientTop||i&&i.clientTop||0)),e.which||s===undefined||(e.which=1&s?1:2&s?3:4&s?2:0),e}},fix:function(e){if(e[x.expando])return e;var t,n,r,i=e.type,s=e,a=this.fixHooks[i];a||(this.fixHooks[i]=a=z.test(i)?this.mouseHooks:I.test(i)?this.keyHooks:{}),r=a.props?this.props.concat(a.props):this.props,e=new x.Event(s),t=r.length;while(t--)n=r[t],e[n]=s[n];return e.target||(e.target=o),3===e.target.nodeType&&(e.target=e.target.parentNode),a.filter?a.filter(e,s):e},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==V()&&this.focus?(this.focus(),!1):undefined},delegateType:"focusin"},blur:{trigger:function(){return this===V()&&this.blur?(this.blur(),!1):undefined},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&x.nodeName(this,"input")?(this.click(),!1):undefined},_default:function(e){return x.nodeName(e.target,"a")}},beforeunload:{postDispatch:function(e){e.result!==undefined&&(e.originalEvent.returnValue=e.result)}}},simulate:function(e,t,n,r){var i=x.extend(new x.Event,n,{type:e,isSimulated:!0,originalEvent:{}});r?x.event.trigger(i,null,t):x.event.dispatch.call(t,i),i.isDefaultPrevented()&&n.preventDefault()}},x.removeEvent=function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)},x.Event=function(e,t){return this instanceof x.Event?(e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||e.getPreventDefault&&e.getPreventDefault()?U:Y):this.type=e,t&&x.extend(this,t),this.timeStamp=e&&e.timeStamp||x.now(),this[x.expando]=!0,undefined):new x.Event(e,t)},x.Event.prototype={isDefaultPrevented:Y,isPropagationStopped:Y,isImmediatePropagationStopped:Y,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=U,e&&e.preventDefault&&e.preventDefault()},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=U,e&&e.stopPropagation&&e.stopPropagation()},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=U,this.stopPropagation()}},x.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(e,t){x.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,o=e.handleObj;return(!i||i!==r&&!x.contains(r,i))&&(e.type=o.origType,n=o.handler.apply(this,arguments),e.type=t),n}}}),x.support.focusinBubbles||x.each({focus:"focusin",blur:"focusout"},function(e,t){var n=0,r=function(e){x.event.simulate(t,e.target,x.event.fix(e),!0)};x.event.special[t]={setup:function(){0===n++&&o.addEventListener(e,r,!0)},teardown:function(){0===--n&&o.removeEventListener(e,r,!0)}}}),x.fn.extend({on:function(e,t,n,r,i){var o,s;if("object"==typeof e){"string"!=typeof t&&(n=n||t,t=undefined);for(s in e)this.on(s,t,n,e[s],i);return this}if(null==n&&null==r?(r=t,n=t=undefined):null==r&&("string"==typeof t?(r=n,n=undefined):(r=n,n=t,t=undefined)),r===!1)r=Y;else if(!r)return this;return 1===i&&(o=r,r=function(e){return x().off(e),o.apply(this,arguments)},r.guid=o.guid||(o.guid=x.guid++)),this.each(function(){x.event.add(this,e,r,n,t)})},one:function(e,t,n,r){return this.on(e,t,n,r,1)},off:function(e,t,n){var r,i;if(e&&e.preventDefault&&e.handleObj)return r=e.handleObj,x(e.delegateTarget).off(r.namespace?r.origType+"."+r.namespace:r.origType,r.selector,r.handler),this;if("object"==typeof e){for(i in e)this.off(i,t,e[i]);return this}return(t===!1||"function"==typeof t)&&(n=t,t=undefined),n===!1&&(n=Y),this.each(function(){x.event.remove(this,e,n,t)})},trigger:function(e,t){return this.each(function(){x.event.trigger(e,t,this)})},triggerHandler:function(e,t){var n=this[0];return n?x.event.trigger(e,t,n,!0):undefined}});var G=/^.[^:#\[\.,]*$/,J=/^(?:parents|prev(?:Until|All))/,Q=x.expr.match.needsContext,K={children:!0,contents:!0,next:!0,prev:!0};x.fn.extend({find:function(e){var t,n=[],r=this,i=r.length;if("string"!=typeof e)return this.pushStack(x(e).filter(function(){for(t=0;i>t;t++)if(x.contains(r[t],this))return!0}));for(t=0;i>t;t++)x.find(e,r[t],n);return n=this.pushStack(i>1?x.unique(n):n),n.selector=this.selector?this.selector+" "+e:e,n},has:function(e){var t=x(e,this),n=t.length;return this.filter(function(){var e=0;for(;n>e;e++)if(x.contains(this,t[e]))return!0})},not:function(e){return this.pushStack(et(this,e||[],!0))},filter:function(e){return this.pushStack(et(this,e||[],!1))},is:function(e){return!!et(this,"string"==typeof e&&Q.test(e)?x(e):e||[],!1).length},closest:function(e,t){var n,r=0,i=this.length,o=[],s=Q.test(e)||"string"!=typeof e?x(e,t||this.context):0;for(;i>r;r++)for(n=this[r];n&&n!==t;n=n.parentNode)if(11>n.nodeType&&(s?s.index(n)>-1:1===n.nodeType&&x.find.matchesSelector(n,e))){n=o.push(n);break}return this.pushStack(o.length>1?x.unique(o):o)},index:function(e){return e?"string"==typeof e?g.call(x(e),this[0]):g.call(this,e.jquery?e[0]:e):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){var n="string"==typeof e?x(e,t):x.makeArray(e&&e.nodeType?[e]:e),r=x.merge(this.get(),n);return this.pushStack(x.unique(r))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}});function Z(e,t){while((e=e[t])&&1!==e.nodeType);return e}x.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return x.dir(e,"parentNode")},parentsUntil:function(e,t,n){return x.dir(e,"parentNode",n)},next:function(e){return Z(e,"nextSibling")},prev:function(e){return Z(e,"previousSibling")},nextAll:function(e){return x.dir(e,"nextSibling")},prevAll:function(e){return x.dir(e,"previousSibling")},nextUntil:function(e,t,n){return x.dir(e,"nextSibling",n)},prevUntil:function(e,t,n){return x.dir(e,"previousSibling",n)},siblings:function(e){return x.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return x.sibling(e.firstChild)},contents:function(e){return e.contentDocument||x.merge([],e.childNodes)}},function(e,t){x.fn[e]=function(n,r){var i=x.map(this,t,n);return"Until"!==e.slice(-5)&&(r=n),r&&"string"==typeof r&&(i=x.filter(r,i)),this.length>1&&(K[e]||x.unique(i),J.test(e)&&i.reverse()),this.pushStack(i)}}),x.extend({filter:function(e,t,n){var r=t[0];return n&&(e=":not("+e+")"),1===t.length&&1===r.nodeType?x.find.matchesSelector(r,e)?[r]:[]:x.find.matches(e,x.grep(t,function(e){return 1===e.nodeType}))},dir:function(e,t,n){var r=[],i=n!==undefined;while((e=e[t])&&9!==e.nodeType)if(1===e.nodeType){if(i&&x(e).is(n))break;r.push(e)}return r},sibling:function(e,t){var n=[];for(;e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n}});function et(e,t,n){if(x.isFunction(t))return x.grep(e,function(e,r){return!!t.call(e,r,e)!==n});if(t.nodeType)return x.grep(e,function(e){return e===t!==n});if("string"==typeof t){if(G.test(t))return x.filter(t,e,n);t=x.filter(t,e)}return x.grep(e,function(e){return g.call(t,e)>=0!==n})}var tt=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,nt=/<([\w:]+)/,rt=/<|&#?\w+;/,it=/<(?:script|style|link)/i,ot=/^(?:checkbox|radio)$/i,st=/checked\s*(?:[^=]|=\s*.checked.)/i,at=/^$|\/(?:java|ecma)script/i,ut=/^true\/(.*)/,lt=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,ct={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ct.optgroup=ct.option,ct.tbody=ct.tfoot=ct.colgroup=ct.caption=ct.thead,ct.th=ct.td,x.fn.extend({text:function(e){return x.access(this,function(e){return e===undefined?x.text(this):this.empty().append((this[0]&&this[0].ownerDocument||o).createTextNode(e))},null,e,arguments.length)},append:function(){return this.domManip(arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=pt(this,e);t.appendChild(e)}})},prepend:function(){return this.domManip(arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=pt(this,e);t.insertBefore(e,t.firstChild)}})},before:function(){return this.domManip(arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return this.domManip(arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},remove:function(e,t){var n,r=e?x.filter(e,this):this,i=0;for(;null!=(n=r[i]);i++)t||1!==n.nodeType||x.cleanData(mt(n)),n.parentNode&&(t&&x.contains(n.ownerDocument,n)&&dt(mt(n,"script")),n.parentNode.removeChild(n));return this},empty:function(){var e,t=0;for(;null!=(e=this[t]);t++)1===e.nodeType&&(x.cleanData(mt(e,!1)),e.textContent="");return this},clone:function(e,t){return e=null==e?!1:e,t=null==t?e:t,this.map(function(){return x.clone(this,e,t)})},html:function(e){return x.access(this,function(e){var t=this[0]||{},n=0,r=this.length;if(e===undefined&&1===t.nodeType)return t.innerHTML;if("string"==typeof e&&!it.test(e)&&!ct[(nt.exec(e)||["",""])[1].toLowerCase()]){e=e.replace(tt,"<$1></$2>");try{for(;r>n;n++)t=this[n]||{},1===t.nodeType&&(x.cleanData(mt(t,!1)),t.innerHTML=e);t=0}catch(i){}}t&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(){var e=x.map(this,function(e){return[e.nextSibling,e.parentNode]}),t=0;return this.domManip(arguments,function(n){var r=e[t++],i=e[t++];i&&(r&&r.parentNode!==i&&(r=this.nextSibling),x(this).remove(),i.insertBefore(n,r))},!0),t?this:this.remove()},detach:function(e){return this.remove(e,!0)},domManip:function(e,t,n){e=f.apply([],e);var r,i,o,s,a,u,l=0,c=this.length,p=this,h=c-1,d=e[0],g=x.isFunction(d);if(g||!(1>=c||"string"!=typeof d||x.support.checkClone)&&st.test(d))return this.each(function(r){var i=p.eq(r);g&&(e[0]=d.call(this,r,i.html())),i.domManip(e,t,n)});if(c&&(r=x.buildFragment(e,this[0].ownerDocument,!1,!n&&this),i=r.firstChild,1===r.childNodes.length&&(r=i),i)){for(o=x.map(mt(r,"script"),ft),s=o.length;c>l;l++)a=r,l!==h&&(a=x.clone(a,!0,!0),s&&x.merge(o,mt(a,"script"))),t.call(this[l],a,l);if(s)for(u=o[o.length-1].ownerDocument,x.map(o,ht),l=0;s>l;l++)a=o[l],at.test(a.type||"")&&!q.access(a,"globalEval")&&x.contains(u,a)&&(a.src?x._evalUrl(a.src):x.globalEval(a.textContent.replace(lt,"")))}return this}}),x.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){x.fn[e]=function(e){var n,r=[],i=x(e),o=i.length-1,s=0;for(;o>=s;s++)n=s===o?this:this.clone(!0),x(i[s])[t](n),h.apply(r,n.get());return this.pushStack(r)}}),x.extend({clone:function(e,t,n){var r,i,o,s,a=e.cloneNode(!0),u=x.contains(e.ownerDocument,e);if(!(x.support.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||x.isXMLDoc(e)))for(s=mt(a),o=mt(e),r=0,i=o.length;i>r;r++)yt(o[r],s[r]);if(t)if(n)for(o=o||mt(e),s=s||mt(a),r=0,i=o.length;i>r;r++)gt(o[r],s[r]);else gt(e,a);return s=mt(a,"script"),s.length>0&&dt(s,!u&&mt(e,"script")),a},buildFragment:function(e,t,n,r){var i,o,s,a,u,l,c=0,p=e.length,f=t.createDocumentFragment(),h=[];for(;p>c;c++)if(i=e[c],i||0===i)if("object"===x.type(i))x.merge(h,i.nodeType?[i]:i);else if(rt.test(i)){o=o||f.appendChild(t.createElement("div")),s=(nt.exec(i)||["",""])[1].toLowerCase(),a=ct[s]||ct._default,o.innerHTML=a[1]+i.replace(tt,"<$1></$2>")+a[2],l=a[0];while(l--)o=o.lastChild;x.merge(h,o.childNodes),o=f.firstChild,o.textContent=""}else h.push(t.createTextNode(i));f.textContent="",c=0;while(i=h[c++])if((!r||-1===x.inArray(i,r))&&(u=x.contains(i.ownerDocument,i),o=mt(f.appendChild(i),"script"),u&&dt(o),n)){l=0;while(i=o[l++])at.test(i.type||"")&&n.push(i)}return f},cleanData:function(e){var t,n,r,i,o,s,a=x.event.special,u=0;for(;(n=e[u])!==undefined;u++){if(F.accepts(n)&&(o=n[q.expando],o&&(t=q.cache[o]))){if(r=Object.keys(t.events||{}),r.length)for(s=0;(i=r[s])!==undefined;s++)a[i]?x.event.remove(n,i):x.removeEvent(n,i,t.handle);q.cache[o]&&delete q.cache[o]}delete L.cache[n[L.expando]]}},_evalUrl:function(e){return x.ajax({url:e,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})}});function pt(e,t){return x.nodeName(e,"table")&&x.nodeName(1===t.nodeType?t:t.firstChild,"tr")?e.getElementsByTagName("tbody")[0]||e.appendChild(e.ownerDocument.createElement("tbody")):e}function ft(e){return e.type=(null!==e.getAttribute("type"))+"/"+e.type,e}function ht(e){var t=ut.exec(e.type);return t?e.type=t[1]:e.removeAttribute("type"),e}function dt(e,t){var n=e.length,r=0;for(;n>r;r++)q.set(e[r],"globalEval",!t||q.get(t[r],"globalEval"))}function gt(e,t){var n,r,i,o,s,a,u,l;if(1===t.nodeType){if(q.hasData(e)&&(o=q.access(e),s=q.set(t,o),l=o.events)){delete s.handle,s.events={};for(i in l)for(n=0,r=l[i].length;r>n;n++)x.event.add(t,i,l[i][n])}L.hasData(e)&&(a=L.access(e),u=x.extend({},a),L.set(t,u))}}function mt(e,t){var n=e.getElementsByTagName?e.getElementsByTagName(t||"*"):e.querySelectorAll?e.querySelectorAll(t||"*"):[];return t===undefined||t&&x.nodeName(e,t)?x.merge([e],n):n}function yt(e,t){var n=t.nodeName.toLowerCase();"input"===n&&ot.test(e.type)?t.checked=e.checked:("input"===n||"textarea"===n)&&(t.defaultValue=e.defaultValue)}x.fn.extend({wrapAll:function(e){var t;return x.isFunction(e)?this.each(function(t){x(this).wrapAll(e.call(this,t))}):(this[0]&&(t=x(e,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstElementChild)e=e.firstElementChild;return e}).append(this)),this)},wrapInner:function(e){return x.isFunction(e)?this.each(function(t){x(this).wrapInner(e.call(this,t))}):this.each(function(){var t=x(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=x.isFunction(e);return this.each(function(n){x(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(){return this.parent().each(function(){x.nodeName(this,"body")||x(this).replaceWith(this.childNodes)}).end()}});var vt,xt,bt=/^(none|table(?!-c[ea]).+)/,wt=/^margin/,Tt=RegExp("^("+b+")(.*)$","i"),Ct=RegExp("^("+b+")(?!px)[a-z%]+$","i"),kt=RegExp("^([+-])=("+b+")","i"),Nt={BODY:"block"},Et={position:"absolute",visibility:"hidden",display:"block"},St={letterSpacing:0,fontWeight:400},jt=["Top","Right","Bottom","Left"],Dt=["Webkit","O","Moz","ms"];function At(e,t){if(t in e)return t;var n=t.charAt(0).toUpperCase()+t.slice(1),r=t,i=Dt.length;while(i--)if(t=Dt[i]+n,t in e)return t;return r}function Lt(e,t){return e=t||e,"none"===x.css(e,"display")||!x.contains(e.ownerDocument,e)}function qt(t){return e.getComputedStyle(t,null)}function Ht(e,t){var n,r,i,o=[],s=0,a=e.length;for(;a>s;s++)r=e[s],r.style&&(o[s]=q.get(r,"olddisplay"),n=r.style.display,t?(o[s]||"none"!==n||(r.style.display=""),""===r.style.display&&Lt(r)&&(o[s]=q.access(r,"olddisplay",Rt(r.nodeName)))):o[s]||(i=Lt(r),(n&&"none"!==n||!i)&&q.set(r,"olddisplay",i?n:x.css(r,"display"))));for(s=0;a>s;s++)r=e[s],r.style&&(t&&"none"!==r.style.display&&""!==r.style.display||(r.style.display=t?o[s]||"":"none"));return e}x.fn.extend({css:function(e,t){return x.access(this,function(e,t,n){var r,i,o={},s=0;if(x.isArray(t)){for(r=qt(e),i=t.length;i>s;s++)o[t[s]]=x.css(e,t[s],!1,r);return o}return n!==undefined?x.style(e,t,n):x.css(e,t)},e,t,arguments.length>1)},show:function(){return Ht(this,!0)},hide:function(){return Ht(this)},toggle:function(e){return"boolean"==typeof e?e?this.show():this.hide():this.each(function(){Lt(this)?x(this).show():x(this).hide()})}}),x.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=vt(e,"opacity");return""===n?"1":n}}}},cssNumber:{columnCount:!0,fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(e,t,n,r){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var i,o,s,a=x.camelCase(t),u=e.style;return t=x.cssProps[a]||(x.cssProps[a]=At(u,a)),s=x.cssHooks[t]||x.cssHooks[a],n===undefined?s&&"get"in s&&(i=s.get(e,!1,r))!==undefined?i:u[t]:(o=typeof n,"string"===o&&(i=kt.exec(n))&&(n=(i[1]+1)*i[2]+parseFloat(x.css(e,t)),o="number"),null==n||"number"===o&&isNaN(n)||("number"!==o||x.cssNumber[a]||(n+="px"),x.support.clearCloneStyle||""!==n||0!==t.indexOf("background")||(u[t]="inherit"),s&&"set"in s&&(n=s.set(e,n,r))===undefined||(u[t]=n)),undefined)}},css:function(e,t,n,r){var i,o,s,a=x.camelCase(t);return t=x.cssProps[a]||(x.cssProps[a]=At(e.style,a)),s=x.cssHooks[t]||x.cssHooks[a],s&&"get"in s&&(i=s.get(e,!0,n)),i===undefined&&(i=vt(e,t,r)),"normal"===i&&t in St&&(i=St[t]),""===n||n?(o=parseFloat(i),n===!0||x.isNumeric(o)?o||0:i):i}}),vt=function(e,t,n){var r,i,o,s=n||qt(e),a=s?s.getPropertyValue(t)||s[t]:undefined,u=e.style;return s&&(""!==a||x.contains(e.ownerDocument,e)||(a=x.style(e,t)),Ct.test(a)&&wt.test(t)&&(r=u.width,i=u.minWidth,o=u.maxWidth,u.minWidth=u.maxWidth=u.width=a,a=s.width,u.width=r,u.minWidth=i,u.maxWidth=o)),a};function Ot(e,t,n){var r=Tt.exec(t);return r?Math.max(0,r[1]-(n||0))+(r[2]||"px"):t}function Ft(e,t,n,r,i){var o=n===(r?"border":"content")?4:"width"===t?1:0,s=0;for(;4>o;o+=2)"margin"===n&&(s+=x.css(e,n+jt[o],!0,i)),r?("content"===n&&(s-=x.css(e,"padding"+jt[o],!0,i)),"margin"!==n&&(s-=x.css(e,"border"+jt[o]+"Width",!0,i))):(s+=x.css(e,"padding"+jt[o],!0,i),"padding"!==n&&(s+=x.css(e,"border"+jt[o]+"Width",!0,i)));return s}function Pt(e,t,n){var r=!0,i="width"===t?e.offsetWidth:e.offsetHeight,o=qt(e),s=x.support.boxSizing&&"border-box"===x.css(e,"boxSizing",!1,o);if(0>=i||null==i){if(i=vt(e,t,o),(0>i||null==i)&&(i=e.style[t]),Ct.test(i))return i;r=s&&(x.support.boxSizingReliable||i===e.style[t]),i=parseFloat(i)||0}return i+Ft(e,t,n||(s?"border":"content"),r,o)+"px"}function Rt(e){var t=o,n=Nt[e];return n||(n=Mt(e,t),"none"!==n&&n||(xt=(xt||x("<iframe frameborder='0' width='0' height='0'/>").css("cssText","display:block !important")).appendTo(t.documentElement),t=(xt[0].contentWindow||xt[0].contentDocument).document,t.write("<!doctype html><html><body>"),t.close(),n=Mt(e,t),xt.detach()),Nt[e]=n),n}function Mt(e,t){var n=x(t.createElement(e)).appendTo(t.body),r=x.css(n[0],"display");return n.remove(),r}x.each(["height","width"],function(e,t){x.cssHooks[t]={get:function(e,n,r){return n?0===e.offsetWidth&&bt.test(x.css(e,"display"))?x.swap(e,Et,function(){return Pt(e,t,r)}):Pt(e,t,r):undefined},set:function(e,n,r){var i=r&&qt(e);return Ot(e,n,r?Ft(e,t,r,x.support.boxSizing&&"border-box"===x.css(e,"boxSizing",!1,i),i):0)}}}),x(function(){x.support.reliableMarginRight||(x.cssHooks.marginRight={get:function(e,t){return t?x.swap(e,{display:"inline-block"},vt,[e,"marginRight"]):undefined}}),!x.support.pixelPosition&&x.fn.position&&x.each(["top","left"],function(e,t){x.cssHooks[t]={get:function(e,n){return n?(n=vt(e,t),Ct.test(n)?x(e).position()[t]+"px":n):undefined}}})}),x.expr&&x.expr.filters&&(x.expr.filters.hidden=function(e){return 0>=e.offsetWidth&&0>=e.offsetHeight},x.expr.filters.visible=function(e){return!x.expr.filters.hidden(e)}),x.each({margin:"",padding:"",border:"Width"},function(e,t){x.cssHooks[e+t]={expand:function(n){var r=0,i={},o="string"==typeof n?n.split(" "):[n];for(;4>r;r++)i[e+jt[r]+t]=o[r]||o[r-2]||o[0];return i}},wt.test(e)||(x.cssHooks[e+t].set=Ot)});var Wt=/%20/g,$t=/\[\]$/,Bt=/\r?\n/g,It=/^(?:submit|button|image|reset|file)$/i,zt=/^(?:input|select|textarea|keygen)/i;x.fn.extend({serialize:function(){return x.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=x.prop(this,"elements");return e?x.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!x(this).is(":disabled")&&zt.test(this.nodeName)&&!It.test(e)&&(this.checked||!ot.test(e))}).map(function(e,t){var n=x(this).val();return null==n?null:x.isArray(n)?x.map(n,function(e){return{name:t.name,value:e.replace(Bt,"\r\n")}}):{name:t.name,value:n.replace(Bt,"\r\n")}}).get()}}),x.param=function(e,t){var n,r=[],i=function(e,t){t=x.isFunction(t)?t():null==t?"":t,r[r.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};if(t===undefined&&(t=x.ajaxSettings&&x.ajaxSettings.traditional),x.isArray(e)||e.jquery&&!x.isPlainObject(e))x.each(e,function(){i(this.name,this.value)});else for(n in e)_t(n,e[n],t,i);return r.join("&").replace(Wt,"+")};function _t(e,t,n,r){var i;if(x.isArray(t))x.each(t,function(t,i){n||$t.test(e)?r(e,i):_t(e+"["+("object"==typeof i?t:"")+"]",i,n,r)});else if(n||"object"!==x.type(t))r(e,t);else for(i in t)_t(e+"["+i+"]",t[i],n,r)}x.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){x.fn[t]=function(e,n){return arguments.length>0?this.on(t,null,e,n):this.trigger(t)}}),x.fn.extend({hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)},bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)
},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)}});var Xt,Ut,Yt=x.now(),Vt=/\?/,Gt=/#.*$/,Jt=/([?&])_=[^&]*/,Qt=/^(.*?):[ \t]*([^\r\n]*)$/gm,Kt=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Zt=/^(?:GET|HEAD)$/,en=/^\/\//,tn=/^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,nn=x.fn.load,rn={},on={},sn="*/".concat("*");try{Ut=i.href}catch(an){Ut=o.createElement("a"),Ut.href="",Ut=Ut.href}Xt=tn.exec(Ut.toLowerCase())||[];function un(e){return function(t,n){"string"!=typeof t&&(n=t,t="*");var r,i=0,o=t.toLowerCase().match(w)||[];if(x.isFunction(n))while(r=o[i++])"+"===r[0]?(r=r.slice(1)||"*",(e[r]=e[r]||[]).unshift(n)):(e[r]=e[r]||[]).push(n)}}function ln(e,t,n,r){var i={},o=e===on;function s(a){var u;return i[a]=!0,x.each(e[a]||[],function(e,a){var l=a(t,n,r);return"string"!=typeof l||o||i[l]?o?!(u=l):undefined:(t.dataTypes.unshift(l),s(l),!1)}),u}return s(t.dataTypes[0])||!i["*"]&&s("*")}function cn(e,t){var n,r,i=x.ajaxSettings.flatOptions||{};for(n in t)t[n]!==undefined&&((i[n]?e:r||(r={}))[n]=t[n]);return r&&x.extend(!0,e,r),e}x.fn.load=function(e,t,n){if("string"!=typeof e&&nn)return nn.apply(this,arguments);var r,i,o,s=this,a=e.indexOf(" ");return a>=0&&(r=e.slice(a),e=e.slice(0,a)),x.isFunction(t)?(n=t,t=undefined):t&&"object"==typeof t&&(i="POST"),s.length>0&&x.ajax({url:e,type:i,dataType:"html",data:t}).done(function(e){o=arguments,s.html(r?x("<div>").append(x.parseHTML(e)).find(r):e)}).complete(n&&function(e,t){s.each(n,o||[e.responseText,t,e])}),this},x.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){x.fn[t]=function(e){return this.on(t,e)}}),x.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:Ut,type:"GET",isLocal:Kt.test(Xt[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":sn,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":x.parseJSON,"text xml":x.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?cn(cn(e,x.ajaxSettings),t):cn(x.ajaxSettings,e)},ajaxPrefilter:un(rn),ajaxTransport:un(on),ajax:function(e,t){"object"==typeof e&&(t=e,e=undefined),t=t||{};var n,r,i,o,s,a,u,l,c=x.ajaxSetup({},t),p=c.context||c,f=c.context&&(p.nodeType||p.jquery)?x(p):x.event,h=x.Deferred(),d=x.Callbacks("once memory"),g=c.statusCode||{},m={},y={},v=0,b="canceled",T={readyState:0,getResponseHeader:function(e){var t;if(2===v){if(!o){o={};while(t=Qt.exec(i))o[t[1].toLowerCase()]=t[2]}t=o[e.toLowerCase()]}return null==t?null:t},getAllResponseHeaders:function(){return 2===v?i:null},setRequestHeader:function(e,t){var n=e.toLowerCase();return v||(e=y[n]=y[n]||e,m[e]=t),this},overrideMimeType:function(e){return v||(c.mimeType=e),this},statusCode:function(e){var t;if(e)if(2>v)for(t in e)g[t]=[g[t],e[t]];else T.always(e[T.status]);return this},abort:function(e){var t=e||b;return n&&n.abort(t),k(0,t),this}};if(h.promise(T).complete=d.add,T.success=T.done,T.error=T.fail,c.url=((e||c.url||Ut)+"").replace(Gt,"").replace(en,Xt[1]+"//"),c.type=t.method||t.type||c.method||c.type,c.dataTypes=x.trim(c.dataType||"*").toLowerCase().match(w)||[""],null==c.crossDomain&&(a=tn.exec(c.url.toLowerCase()),c.crossDomain=!(!a||a[1]===Xt[1]&&a[2]===Xt[2]&&(a[3]||("http:"===a[1]?"80":"443"))===(Xt[3]||("http:"===Xt[1]?"80":"443")))),c.data&&c.processData&&"string"!=typeof c.data&&(c.data=x.param(c.data,c.traditional)),ln(rn,c,t,T),2===v)return T;u=c.global,u&&0===x.active++&&x.event.trigger("ajaxStart"),c.type=c.type.toUpperCase(),c.hasContent=!Zt.test(c.type),r=c.url,c.hasContent||(c.data&&(r=c.url+=(Vt.test(r)?"&":"?")+c.data,delete c.data),c.cache===!1&&(c.url=Jt.test(r)?r.replace(Jt,"$1_="+Yt++):r+(Vt.test(r)?"&":"?")+"_="+Yt++)),c.ifModified&&(x.lastModified[r]&&T.setRequestHeader("If-Modified-Since",x.lastModified[r]),x.etag[r]&&T.setRequestHeader("If-None-Match",x.etag[r])),(c.data&&c.hasContent&&c.contentType!==!1||t.contentType)&&T.setRequestHeader("Content-Type",c.contentType),T.setRequestHeader("Accept",c.dataTypes[0]&&c.accepts[c.dataTypes[0]]?c.accepts[c.dataTypes[0]]+("*"!==c.dataTypes[0]?", "+sn+"; q=0.01":""):c.accepts["*"]);for(l in c.headers)T.setRequestHeader(l,c.headers[l]);if(c.beforeSend&&(c.beforeSend.call(p,T,c)===!1||2===v))return T.abort();b="abort";for(l in{success:1,error:1,complete:1})T[l](c[l]);if(n=ln(on,c,t,T)){T.readyState=1,u&&f.trigger("ajaxSend",[T,c]),c.async&&c.timeout>0&&(s=setTimeout(function(){T.abort("timeout")},c.timeout));try{v=1,n.send(m,k)}catch(C){if(!(2>v))throw C;k(-1,C)}}else k(-1,"No Transport");function k(e,t,o,a){var l,m,y,b,w,C=t;2!==v&&(v=2,s&&clearTimeout(s),n=undefined,i=a||"",T.readyState=e>0?4:0,l=e>=200&&300>e||304===e,o&&(b=pn(c,T,o)),b=fn(c,b,T,l),l?(c.ifModified&&(w=T.getResponseHeader("Last-Modified"),w&&(x.lastModified[r]=w),w=T.getResponseHeader("etag"),w&&(x.etag[r]=w)),204===e||"HEAD"===c.type?C="nocontent":304===e?C="notmodified":(C=b.state,m=b.data,y=b.error,l=!y)):(y=C,(e||!C)&&(C="error",0>e&&(e=0))),T.status=e,T.statusText=(t||C)+"",l?h.resolveWith(p,[m,C,T]):h.rejectWith(p,[T,C,y]),T.statusCode(g),g=undefined,u&&f.trigger(l?"ajaxSuccess":"ajaxError",[T,c,l?m:y]),d.fireWith(p,[T,C]),u&&(f.trigger("ajaxComplete",[T,c]),--x.active||x.event.trigger("ajaxStop")))}return T},getJSON:function(e,t,n){return x.get(e,t,n,"json")},getScript:function(e,t){return x.get(e,undefined,t,"script")}}),x.each(["get","post"],function(e,t){x[t]=function(e,n,r,i){return x.isFunction(n)&&(i=i||r,r=n,n=undefined),x.ajax({url:e,type:t,dataType:i,data:n,success:r})}});function pn(e,t,n){var r,i,o,s,a=e.contents,u=e.dataTypes;while("*"===u[0])u.shift(),r===undefined&&(r=e.mimeType||t.getResponseHeader("Content-Type"));if(r)for(i in a)if(a[i]&&a[i].test(r)){u.unshift(i);break}if(u[0]in n)o=u[0];else{for(i in n){if(!u[0]||e.converters[i+" "+u[0]]){o=i;break}s||(s=i)}o=o||s}return o?(o!==u[0]&&u.unshift(o),n[o]):undefined}function fn(e,t,n,r){var i,o,s,a,u,l={},c=e.dataTypes.slice();if(c[1])for(s in e.converters)l[s.toLowerCase()]=e.converters[s];o=c.shift();while(o)if(e.responseFields[o]&&(n[e.responseFields[o]]=t),!u&&r&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),u=o,o=c.shift())if("*"===o)o=u;else if("*"!==u&&u!==o){if(s=l[u+" "+o]||l["* "+o],!s)for(i in l)if(a=i.split(" "),a[1]===o&&(s=l[u+" "+a[0]]||l["* "+a[0]])){s===!0?s=l[i]:l[i]!==!0&&(o=a[0],c.unshift(a[1]));break}if(s!==!0)if(s&&e["throws"])t=s(t);else try{t=s(t)}catch(p){return{state:"parsererror",error:s?p:"No conversion from "+u+" to "+o}}}return{state:"success",data:t}}x.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(e){return x.globalEval(e),e}}}),x.ajaxPrefilter("script",function(e){e.cache===undefined&&(e.cache=!1),e.crossDomain&&(e.type="GET")}),x.ajaxTransport("script",function(e){if(e.crossDomain){var t,n;return{send:function(r,i){t=x("<script>").prop({async:!0,charset:e.scriptCharset,src:e.url}).on("load error",n=function(e){t.remove(),n=null,e&&i("error"===e.type?404:200,e.type)}),o.head.appendChild(t[0])},abort:function(){n&&n()}}}});var hn=[],dn=/(=)\?(?=&|$)|\?\?/;x.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=hn.pop()||x.expando+"_"+Yt++;return this[e]=!0,e}}),x.ajaxPrefilter("json jsonp",function(t,n,r){var i,o,s,a=t.jsonp!==!1&&(dn.test(t.url)?"url":"string"==typeof t.data&&!(t.contentType||"").indexOf("application/x-www-form-urlencoded")&&dn.test(t.data)&&"data");return a||"jsonp"===t.dataTypes[0]?(i=t.jsonpCallback=x.isFunction(t.jsonpCallback)?t.jsonpCallback():t.jsonpCallback,a?t[a]=t[a].replace(dn,"$1"+i):t.jsonp!==!1&&(t.url+=(Vt.test(t.url)?"&":"?")+t.jsonp+"="+i),t.converters["script json"]=function(){return s||x.error(i+" was not called"),s[0]},t.dataTypes[0]="json",o=e[i],e[i]=function(){s=arguments},r.always(function(){e[i]=o,t[i]&&(t.jsonpCallback=n.jsonpCallback,hn.push(i)),s&&x.isFunction(o)&&o(s[0]),s=o=undefined}),"script"):undefined}),x.ajaxSettings.xhr=function(){try{return new XMLHttpRequest}catch(e){}};var gn=x.ajaxSettings.xhr(),mn={0:200,1223:204},yn=0,vn={};e.ActiveXObject&&x(e).on("unload",function(){for(var e in vn)vn[e]();vn=undefined}),x.support.cors=!!gn&&"withCredentials"in gn,x.support.ajax=gn=!!gn,x.ajaxTransport(function(e){var t;return x.support.cors||gn&&!e.crossDomain?{send:function(n,r){var i,o,s=e.xhr();if(s.open(e.type,e.url,e.async,e.username,e.password),e.xhrFields)for(i in e.xhrFields)s[i]=e.xhrFields[i];e.mimeType&&s.overrideMimeType&&s.overrideMimeType(e.mimeType),e.crossDomain||n["X-Requested-With"]||(n["X-Requested-With"]="XMLHttpRequest");for(i in n)s.setRequestHeader(i,n[i]);t=function(e){return function(){t&&(delete vn[o],t=s.onload=s.onerror=null,"abort"===e?s.abort():"error"===e?r(s.status||404,s.statusText):r(mn[s.status]||s.status,s.statusText,"string"==typeof s.responseText?{text:s.responseText}:undefined,s.getAllResponseHeaders()))}},s.onload=t(),s.onerror=t("error"),t=vn[o=yn++]=t("abort"),s.send(e.hasContent&&e.data||null)},abort:function(){t&&t()}}:undefined});var xn,bn,wn=/^(?:toggle|show|hide)$/,Tn=RegExp("^(?:([+-])=|)("+b+")([a-z%]*)$","i"),Cn=/queueHooks$/,kn=[An],Nn={"*":[function(e,t){var n=this.createTween(e,t),r=n.cur(),i=Tn.exec(t),o=i&&i[3]||(x.cssNumber[e]?"":"px"),s=(x.cssNumber[e]||"px"!==o&&+r)&&Tn.exec(x.css(n.elem,e)),a=1,u=20;if(s&&s[3]!==o){o=o||s[3],i=i||[],s=+r||1;do a=a||".5",s/=a,x.style(n.elem,e,s+o);while(a!==(a=n.cur()/r)&&1!==a&&--u)}return i&&(s=n.start=+s||+r||0,n.unit=o,n.end=i[1]?s+(i[1]+1)*i[2]:+i[2]),n}]};function En(){return setTimeout(function(){xn=undefined}),xn=x.now()}function Sn(e,t,n){var r,i=(Nn[t]||[]).concat(Nn["*"]),o=0,s=i.length;for(;s>o;o++)if(r=i[o].call(n,t,e))return r}function jn(e,t,n){var r,i,o=0,s=kn.length,a=x.Deferred().always(function(){delete u.elem}),u=function(){if(i)return!1;var t=xn||En(),n=Math.max(0,l.startTime+l.duration-t),r=n/l.duration||0,o=1-r,s=0,u=l.tweens.length;for(;u>s;s++)l.tweens[s].run(o);return a.notifyWith(e,[l,o,n]),1>o&&u?n:(a.resolveWith(e,[l]),!1)},l=a.promise({elem:e,props:x.extend({},t),opts:x.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:xn||En(),duration:n.duration,tweens:[],createTween:function(t,n){var r=x.Tween(e,l.opts,t,n,l.opts.specialEasing[t]||l.opts.easing);return l.tweens.push(r),r},stop:function(t){var n=0,r=t?l.tweens.length:0;if(i)return this;for(i=!0;r>n;n++)l.tweens[n].run(1);return t?a.resolveWith(e,[l,t]):a.rejectWith(e,[l,t]),this}}),c=l.props;for(Dn(c,l.opts.specialEasing);s>o;o++)if(r=kn[o].call(l,e,c,l.opts))return r;return x.map(c,Sn,l),x.isFunction(l.opts.start)&&l.opts.start.call(e,l),x.fx.timer(x.extend(u,{elem:e,anim:l,queue:l.opts.queue})),l.progress(l.opts.progress).done(l.opts.done,l.opts.complete).fail(l.opts.fail).always(l.opts.always)}function Dn(e,t){var n,r,i,o,s;for(n in e)if(r=x.camelCase(n),i=t[r],o=e[n],x.isArray(o)&&(i=o[1],o=e[n]=o[0]),n!==r&&(e[r]=o,delete e[n]),s=x.cssHooks[r],s&&"expand"in s){o=s.expand(o),delete e[r];for(n in o)n in e||(e[n]=o[n],t[n]=i)}else t[r]=i}x.Animation=x.extend(jn,{tweener:function(e,t){x.isFunction(e)?(t=e,e=["*"]):e=e.split(" ");var n,r=0,i=e.length;for(;i>r;r++)n=e[r],Nn[n]=Nn[n]||[],Nn[n].unshift(t)},prefilter:function(e,t){t?kn.unshift(e):kn.push(e)}});function An(e,t,n){var r,i,o,s,a,u,l=this,c={},p=e.style,f=e.nodeType&&Lt(e),h=q.get(e,"fxshow");n.queue||(a=x._queueHooks(e,"fx"),null==a.unqueued&&(a.unqueued=0,u=a.empty.fire,a.empty.fire=function(){a.unqueued||u()}),a.unqueued++,l.always(function(){l.always(function(){a.unqueued--,x.queue(e,"fx").length||a.empty.fire()})})),1===e.nodeType&&("height"in t||"width"in t)&&(n.overflow=[p.overflow,p.overflowX,p.overflowY],"inline"===x.css(e,"display")&&"none"===x.css(e,"float")&&(p.display="inline-block")),n.overflow&&(p.overflow="hidden",l.always(function(){p.overflow=n.overflow[0],p.overflowX=n.overflow[1],p.overflowY=n.overflow[2]}));for(r in t)if(i=t[r],wn.exec(i)){if(delete t[r],o=o||"toggle"===i,i===(f?"hide":"show")){if("show"!==i||!h||h[r]===undefined)continue;f=!0}c[r]=h&&h[r]||x.style(e,r)}if(!x.isEmptyObject(c)){h?"hidden"in h&&(f=h.hidden):h=q.access(e,"fxshow",{}),o&&(h.hidden=!f),f?x(e).show():l.done(function(){x(e).hide()}),l.done(function(){var t;q.remove(e,"fxshow");for(t in c)x.style(e,t,c[t])});for(r in c)s=Sn(f?h[r]:0,r,l),r in h||(h[r]=s.start,f&&(s.end=s.start,s.start="width"===r||"height"===r?1:0))}}function Ln(e,t,n,r,i){return new Ln.prototype.init(e,t,n,r,i)}x.Tween=Ln,Ln.prototype={constructor:Ln,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||"swing",this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(x.cssNumber[n]?"":"px")},cur:function(){var e=Ln.propHooks[this.prop];return e&&e.get?e.get(this):Ln.propHooks._default.get(this)},run:function(e){var t,n=Ln.propHooks[this.prop];return this.pos=t=this.options.duration?x.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):Ln.propHooks._default.set(this),this}},Ln.prototype.init.prototype=Ln.prototype,Ln.propHooks={_default:{get:function(e){var t;return null==e.elem[e.prop]||e.elem.style&&null!=e.elem.style[e.prop]?(t=x.css(e.elem,e.prop,""),t&&"auto"!==t?t:0):e.elem[e.prop]},set:function(e){x.fx.step[e.prop]?x.fx.step[e.prop](e):e.elem.style&&(null!=e.elem.style[x.cssProps[e.prop]]||x.cssHooks[e.prop])?x.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},Ln.propHooks.scrollTop=Ln.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},x.each(["toggle","show","hide"],function(e,t){var n=x.fn[t];x.fn[t]=function(e,r,i){return null==e||"boolean"==typeof e?n.apply(this,arguments):this.animate(qn(t,!0),e,r,i)}}),x.fn.extend({fadeTo:function(e,t,n,r){return this.filter(Lt).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=x.isEmptyObject(e),o=x.speed(t,n,r),s=function(){var t=jn(this,x.extend({},e),o);(i||q.get(this,"finish"))&&t.stop(!0)};return s.finish=s,i||o.queue===!1?this.each(s):this.queue(o.queue,s)},stop:function(e,t,n){var r=function(e){var t=e.stop;delete e.stop,t(n)};return"string"!=typeof e&&(n=t,t=e,e=undefined),t&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,i=null!=e&&e+"queueHooks",o=x.timers,s=q.get(this);if(i)s[i]&&s[i].stop&&r(s[i]);else for(i in s)s[i]&&s[i].stop&&Cn.test(i)&&r(s[i]);for(i=o.length;i--;)o[i].elem!==this||null!=e&&o[i].queue!==e||(o[i].anim.stop(n),t=!1,o.splice(i,1));(t||!n)&&x.dequeue(this,e)})},finish:function(e){return e!==!1&&(e=e||"fx"),this.each(function(){var t,n=q.get(this),r=n[e+"queue"],i=n[e+"queueHooks"],o=x.timers,s=r?r.length:0;for(n.finish=!0,x.queue(this,e,[]),i&&i.stop&&i.stop.call(this,!0),t=o.length;t--;)o[t].elem===this&&o[t].queue===e&&(o[t].anim.stop(!0),o.splice(t,1));for(t=0;s>t;t++)r[t]&&r[t].finish&&r[t].finish.call(this);delete n.finish})}});function qn(e,t){var n,r={height:e},i=0;for(t=t?1:0;4>i;i+=2-t)n=jt[i],r["margin"+n]=r["padding"+n]=e;return t&&(r.opacity=r.width=e),r}x.each({slideDown:qn("show"),slideUp:qn("hide"),slideToggle:qn("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){x.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),x.speed=function(e,t,n){var r=e&&"object"==typeof e?x.extend({},e):{complete:n||!n&&t||x.isFunction(e)&&e,duration:e,easing:n&&t||t&&!x.isFunction(t)&&t};return r.duration=x.fx.off?0:"number"==typeof r.duration?r.duration:r.duration in x.fx.speeds?x.fx.speeds[r.duration]:x.fx.speeds._default,(null==r.queue||r.queue===!0)&&(r.queue="fx"),r.old=r.complete,r.complete=function(){x.isFunction(r.old)&&r.old.call(this),r.queue&&x.dequeue(this,r.queue)},r},x.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2}},x.timers=[],x.fx=Ln.prototype.init,x.fx.tick=function(){var e,t=x.timers,n=0;for(xn=x.now();t.length>n;n++)e=t[n],e()||t[n]!==e||t.splice(n--,1);t.length||x.fx.stop(),xn=undefined},x.fx.timer=function(e){e()&&x.timers.push(e)&&x.fx.start()},x.fx.interval=13,x.fx.start=function(){bn||(bn=setInterval(x.fx.tick,x.fx.interval))},x.fx.stop=function(){clearInterval(bn),bn=null},x.fx.speeds={slow:600,fast:200,_default:400},x.fx.step={},x.expr&&x.expr.filters&&(x.expr.filters.animated=function(e){return x.grep(x.timers,function(t){return e===t.elem}).length}),x.fn.offset=function(e){if(arguments.length)return e===undefined?this:this.each(function(t){x.offset.setOffset(this,e,t)});var t,n,i=this[0],o={top:0,left:0},s=i&&i.ownerDocument;if(s)return t=s.documentElement,x.contains(t,i)?(typeof i.getBoundingClientRect!==r&&(o=i.getBoundingClientRect()),n=Hn(s),{top:o.top+n.pageYOffset-t.clientTop,left:o.left+n.pageXOffset-t.clientLeft}):o},x.offset={setOffset:function(e,t,n){var r,i,o,s,a,u,l,c=x.css(e,"position"),p=x(e),f={};"static"===c&&(e.style.position="relative"),a=p.offset(),o=x.css(e,"top"),u=x.css(e,"left"),l=("absolute"===c||"fixed"===c)&&(o+u).indexOf("auto")>-1,l?(r=p.position(),s=r.top,i=r.left):(s=parseFloat(o)||0,i=parseFloat(u)||0),x.isFunction(t)&&(t=t.call(e,n,a)),null!=t.top&&(f.top=t.top-a.top+s),null!=t.left&&(f.left=t.left-a.left+i),"using"in t?t.using.call(e,f):p.css(f)}},x.fn.extend({position:function(){if(this[0]){var e,t,n=this[0],r={top:0,left:0};return"fixed"===x.css(n,"position")?t=n.getBoundingClientRect():(e=this.offsetParent(),t=this.offset(),x.nodeName(e[0],"html")||(r=e.offset()),r.top+=x.css(e[0],"borderTopWidth",!0),r.left+=x.css(e[0],"borderLeftWidth",!0)),{top:t.top-r.top-x.css(n,"marginTop",!0),left:t.left-r.left-x.css(n,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var e=this.offsetParent||s;while(e&&!x.nodeName(e,"html")&&"static"===x.css(e,"position"))e=e.offsetParent;return e||s})}}),x.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(t,n){var r="pageYOffset"===n;x.fn[t]=function(i){return x.access(this,function(t,i,o){var s=Hn(t);return o===undefined?s?s[n]:t[i]:(s?s.scrollTo(r?e.pageXOffset:o,r?o:e.pageYOffset):t[i]=o,undefined)},t,i,arguments.length,null)}});function Hn(e){return x.isWindow(e)?e:9===e.nodeType&&e.defaultView}x.each({Height:"height",Width:"width"},function(e,t){x.each({padding:"inner"+e,content:t,"":"outer"+e},function(n,r){x.fn[r]=function(r,i){var o=arguments.length&&(n||"boolean"!=typeof r),s=n||(r===!0||i===!0?"margin":"border");return x.access(this,function(t,n,r){var i;return x.isWindow(t)?t.document.documentElement["client"+e]:9===t.nodeType?(i=t.documentElement,Math.max(t.body["scroll"+e],i["scroll"+e],t.body["offset"+e],i["offset"+e],i["client"+e])):r===undefined?x.css(t,n,s):x.style(t,n,r,s)},t,o?r:undefined,o,null)}})}),x.fn.size=function(){return this.length},x.fn.andSelf=x.fn.addBack,"object"==typeof module&&module&&"object"==typeof module.exports?module.exports=x:"function"==typeof define&&define.amd&&define("jquery",[],function(){return x}),"object"==typeof e&&"object"==typeof e.document&&(e.jQuery=e.$=x)})(window);

// File: ../kyberia-v31/analytics.js (2013-09-07 03:25:27)



function sendAnalyticsInfo(arrEnabledFeatures) {

	var u = AutoUpdater.is_userscript();
	var v = AutoUpdater.version();
	var features = arrEnabledFeatures.join(', ');
	var header = localStorage['KYBERIA_V31_HEADER_TEMPLATE'];
	if (header)
		features = 'header:'+header+', '+features;

	v += u?'u':'';

	// /kyberia-v31/1.23u/header:1235673, feature2, feature3..
	var path = '/kyberia-v31/'+v+'/'+features;

	gaTrack('UA-31675559-1', 'kyberia-v31', path);
}





/**
 * Google Analytics JS v1
 * http://code.google.com/p/google-analytics-js/
 * Copyright (c) 2009 Remy Sharp remysharp.com / MIT License
 * $Date: 2009-02-25 14:25:01 +0000 (Wed, 25 Feb 2009) $
 */
function gaTrack(urchinCode, domain, url) {

	function rand(min, max) {
		return min + Math.floor(Math.random() * (max - min));
	}

	var i=1000000000,
		utmn=rand(i,9999999999), //random request number
		cookie=rand(10000000,99999999), //random cookie number
		random=rand(i,2147483647), //number under 2147483647
		today=(new Date()).getTime(),
		win = window.location.host + window.location.pathname,	// FIX: without '#...'
		img = new Image(),
		urchinUrl = 'http://www.google-analytics.com/__utm.gif?utmwv=1.3&utmn='
			+utmn+'&utmsr=-&utmsc=-&utmul=-&utmje=0&utmfl=-&utmdt=-&utmhn='
			+domain+'&utmr='+win+'&utmp='
			+url+'&utmac='
			+urchinCode+'&utmcc=__utma%3D'
			+cookie+'.'+random+'.'+today+'.'+today+'.'
			+today+'.2%3B%2B__utmb%3D'
			+cookie+'%3B%2B__utmc%3D'
			+cookie+'%3B%2B__utmz%3D'
			+cookie+'.'+today
			+'.2.2.utmccn%3D(referral)%7Cutmcsr%3D' + window.location.host + '%7Cutmcct%3D' + window.location.pathname + '%7Cutmcmd%3Dreferral%3B%2B__utmv%3D'
			+cookie+'.-%3B';

	// trigger the tracking
	img.src = urchinUrl;
}


// File: ../kyberia-v31/kyberia-utils.js (2014-02-18 10:09:43)


var $ = jQuery.noConflict();

var g_features = [];	// all extensions are instantiated into this list

var g_defaultFeatures = {
	'TagUsers': 1,
	'HideMoods': 1,
	'AjaxButtons': 1,
	'MailUpgrade': 1,
	'DeleteButton': 1,
	'LimitNodeHeight': 1,
	'LimitNodeWidth': 1,
	'InplaceEditing': 1,
	'QuickReply': 1,
	'ShowKGivers': 1,
	'FeatureMix': 1,
	//'ChatBox': 1,	// tmp for debug..
	//'Jargoniser': 1,
};

var g_defaultFeatureValues = {
	'TagUsers': '773:memfer',
};

RegExp.escape= function(s) {
	return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};


function getWindowUid()
{
	var GUID = function () {
	    var S4 = function () {
	        return(
	                Math.floor(
	                        Math.random() * 0x10000 /* 65536 */
	                    ).toString(16)
	            );
	    };
	    return (
	            S4() + S4() + "-" +
	            S4() + "-" +
	            S4() + "-" +
	            S4() + "-" +
	            S4() + S4() + S4()
	        );
	};

	if (!window.name.match(/^GUID-/)) {
	    window.name = "GUID-" + GUID();
	}
	return window.name;
}


function avatarSrc(id)
{
	if (!id) return 'http://kyberia.sk/images/nodes///.gif';
	var id = ''+id;
	return 'http://kyberia.sk/images/nodes/'+id[0]+'/'+id[1]+'/'+id+'.gif'
}


function isfeatureAvailable(name)
{
	for (var i=0; i < g_features.length; i++)
		if (g_features[i].name == name)
			return true;
	return false;
}

function setFeatureEnabled(name, b)
{
	if (!name) return;
	var lsKey = '_kyberia_v31_feature_enabled_'+name;
	localStorage[lsKey] = b ? 'yes' : 'no';
}
function isFeatureEnabled(name)
{
	if (!name) return;
	if (name=='ExtensionOptions' || name=='AutoUpdater') return true;

	var lsKey = '_kyberia_v31_feature_enabled_'+name;
	var enabled = localStorage[lsKey];
	if (typeof enabled == 'undefined')
		enabled = g_defaultFeatures[name] ? 'yes' : 'no';

	if (enabled=='yes') return true;
	if (enabled=='no') return false;
	return false
}

function setFeatureValue(name, val)
{
	if (!name) return;
	var lsKey = '_kyberia_v31_feature_value_'+name;
	localStorage[lsKey] = val;
}
function getFeatureValue(name)
{
	if (!name) return;

	var lsKey = '_kyberia_v31_feature_value_'+name;
	var val = localStorage[lsKey];
	if (typeof val == 'undefined')
		val = g_defaultFeatureValues[name];

	return val;
}


function userId() {	// TODO: could be cached, and could be in some utils.js or kyberia-api.js
	var confs = $('a[href$="1961033"]');
	var setup = confs.filter(":contains('nastavenie'),:contains('setup')");
	if (!setup.length)
		setup = confs.eq(0);

	var href = setup.eq(0).attr('href');
	if (!href)
		return;

	var m = href.match(/\/id\/([0-9]+)/);
	if (!m || m.length != 2) return;
	return m[1];
}

function idFromAction(action)
{
	if (action instanceof jQuery) action = action.attr('action');
	if (!action) return;

	var m = action.match(/\/id\/([0-9]+)/);
	if (!m || !m[1]) return;
	return m[1];
}
function idFromHref(href)
{
	if (href instanceof jQuery) href = href.attr('href');
	if (!href) return;

	var m = href.match(/\/id\/([0-9]+)/);
	if (!m || !m[1]) return;
	return m[1];
}

function scrollToHref(href, off)
{
	if (!href) return;
	if (href[0] == '#') href = href.substr(1);
	var elem = $('[name="'+href+'"]');

	scrollToElem(elem, off);
}
function getElemByHref(href)
{
	if (!href) return;
	if (href[0] == '#')
		href = href.substr(1);
	return $('[name="'+href+'"]');
}

function scrollToElem($node, off)
{
	if (!$node || !$node.length) return;
	if (!off) off = 0;

	var pos = $node.offset().top + off;
	animScrollTop(pos);
}
function animScrollTop(pos, dt)
{
	if (typeof dt == 'undefined') dt = 500;
	$('html, body').stop().animate({scrollTop: pos}, dt);
}

function animScrollTop_ToNext(curr, next, dt)
{
	if (!curr.offset() || !next.offset())
		return;

	var posNow = curr.offset().top;
	var scrNow = $('body').scrollTop();
	var posWant = next.offset().top;
	var scrWant = posWant + (scrNow-posNow);
	animScrollTop( scrWant, dt );
}

function moveCaretToEnd(el) {
	el = $(el)[0];
    if (typeof el.selectionStart == "number") {
        el.selectionStart = el.selectionEnd = el.value.length;
    } else if (typeof el.createTextRange != "undefined") {
        el.focus();
        var range = el.createTextRange();
        range.collapse(false);
        range.select();
    }
}

function getHeaderTemplate()
{
	var id = $('[name=header_id]:eq(0)').val();
	if (!id) return '?';
	return id;
}

function getBrowserInfo()	// http://www.javascripter.net/faq/browsern.htm
{
	var nVer = navigator.appVersion;
	var nAgt = navigator.userAgent;
	var browserName  = navigator.appName;
	var fullVersion  = ''+parseFloat(navigator.appVersion);
	var majorVersion = parseInt(navigator.appVersion,10);
	var nameOffset,verOffset,ix;

	// In Opera, the true version is after "Opera" or after "Version"
	if ((verOffset=nAgt.indexOf("Opera"))!=-1) {
	 browserName = "Opera";
	 fullVersion = nAgt.substring(verOffset+6);
	 if ((verOffset=nAgt.indexOf("Version"))!=-1)
	   fullVersion = nAgt.substring(verOffset+8);
	}
	// In MSIE, the true version is after "MSIE" in userAgent
	else if ((verOffset=nAgt.indexOf("MSIE"))!=-1) {
	 browserName = "Microsoft Internet Explorer";
	 fullVersion = nAgt.substring(verOffset+5);
	}
	// In Chrome, the true version is after "Chrome"
	else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
	 browserName = "Chrome";
	 fullVersion = nAgt.substring(verOffset+7);
	}
	// In Safari, the true version is after "Safari" or after "Version"
	else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {
	 browserName = "Safari";
	 fullVersion = nAgt.substring(verOffset+7);
	 if ((verOffset=nAgt.indexOf("Version"))!=-1)
	   fullVersion = nAgt.substring(verOffset+8);
	}
	// In Firefox, the true version is after "Firefox"
	else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
	 browserName = "Firefox";
	 fullVersion = nAgt.substring(verOffset+8);
	}
	// In most other browsers, "name/version" is at the end of userAgent
	else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) <
	          (verOffset=nAgt.lastIndexOf('/')) )
	{
	 browserName = nAgt.substring(nameOffset,verOffset);
	 fullVersion = nAgt.substring(verOffset+1);
	 if (browserName.toLowerCase()==browserName.toUpperCase()) {
	  browserName = navigator.appName;
	 }
	}
	// trim the fullVersion string at semicolon/space if present
	if ((ix=fullVersion.indexOf(";"))!=-1)
	   fullVersion=fullVersion.substring(0,ix);
	if ((ix=fullVersion.indexOf(" "))!=-1)
	   fullVersion=fullVersion.substring(0,ix);

	majorVersion = parseInt(''+fullVersion,10);
	if (isNaN(majorVersion)) {
	 fullVersion  = ''+parseFloat(navigator.appVersion);
	 majorVersion = parseInt(navigator.appVersion,10);
	}

	return browserName+' '+fullVersion;
}



function time()	// php-like seconds
{
	return (new Date().getTime())/1000;
}
function ago(t)
{
	if (isNaN(t)) return time();
	return time() - t;
}


////////////////////////////////////////////////////////
function alphabetConversionAllHtml(map, bRemoveDiacritics, bReplaceY, bWordsOnly)
{
	var arrFrom = [];
	for (var k in map)
		arrFrom.push( k );

	arrFrom.sort(function(a, b) { return b.length - a.length; });

	var reMatch;
	if (bWordsOnly)
		reMatch = '(?:\\b'+arrFrom.join('\\b|\\b')+'\\b)';
	else
		reMatch = '(?:'+arrFrom.join('|')+')';

	var fromRE = new RegExp(reMatch, 'g');

	var arr = $('body');//:not(textarea,input):visible');
	for (var ni=0; ni < arr.length; ni++)
	{
		var t = $( arr[ni] );

		var textNodes = getTextNodesIn( t[0] );
		for (var i=0; i < textNodes.length; i++)
		{
			var TEXT_NODE = textNodes[i];
			var bef = TEXT_NODE.textContent
			var aft = bef;
			if (bRemoveDiacritics)
				aft = removeDiacritics(aft);
			if (bReplaceY)
				aft = aft.replace(/y/gi, 'i');

			var bAnyChanges = false;
			var lastPos = 0;
			var title = '';
			aft = aft.toLowerCase();
			aft = aft.replace(fromRE, function (m, pos)
			{
				if (!map[m]) return m;
				bAnyChanges = 1;

				title += aft.substr(lastPos, pos-lastPos)+'\n';
				lastPos = pos+m.length;
				title += m+'\t'+map[m]+'\n';
				return map[m];
			});
			title += aft.substr(lastPos);
			aft = aft.copyCasingFrom(bef);
			if (!bAnyChanges)
				aft = bef;

			TEXT_NODE.textContent = aft;
			var childless = $(TEXT_NODE.parentNode).filter(function(){ return !$(this).children().length; });
			childless.attr('title', title);
		}
	}
}

function getTextNodesIn(node, includeWhitespaceNodes) {
    var textNodes = [], nonWhitespaceMatcher = /\S/;

    function getTextNodes(node) {
        if (node.nodeType == 3) {
            if (includeWhitespaceNodes || nonWhitespaceMatcher.test(node.nodeValue)) {
                textNodes.push(node);
            }
        } else {
           for (var i = 0, len = node.childNodes.length; i < len; ++i) {
           	if (!$(node.childNodes[i]).is('textarea,input'))
				getTextNodes(node.childNodes[i]);
           }
        }
    }

    getTextNodes(node);
    return textNodes;
}

var defaultDiacriticsRemovalMap = [
    {'base':'A', 'letters':/[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g},
    {'base':'AA','letters':/[\uA732]/g},
    {'base':'AE','letters':/[\u00C6\u01FC\u01E2]/g},
    {'base':'AO','letters':/[\uA734]/g},
    {'base':'AU','letters':/[\uA736]/g},
    {'base':'AV','letters':/[\uA738\uA73A]/g},
    {'base':'AY','letters':/[\uA73C]/g},
    {'base':'B', 'letters':/[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g},
    {'base':'C', 'letters':/[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g},
    {'base':'D', 'letters':/[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g},
    {'base':'DZ','letters':/[\u01F1\u01C4]/g},
    {'base':'Dz','letters':/[\u01F2\u01C5]/g},
    {'base':'E', 'letters':/[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g},
    {'base':'F', 'letters':/[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g},
    {'base':'G', 'letters':/[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g},
    {'base':'H', 'letters':/[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g},
    {'base':'I', 'letters':/[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g},
    {'base':'J', 'letters':/[\u004A\u24BF\uFF2A\u0134\u0248]/g},
    {'base':'K', 'letters':/[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g},
    {'base':'L', 'letters':/[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g},
    {'base':'LJ','letters':/[\u01C7]/g},
    {'base':'Lj','letters':/[\u01C8]/g},
    {'base':'M', 'letters':/[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g},
    {'base':'N', 'letters':/[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g},
    {'base':'NJ','letters':/[\u01CA]/g},
    {'base':'Nj','letters':/[\u01CB]/g},
    {'base':'O', 'letters':/[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g},
    {'base':'OI','letters':/[\u01A2]/g},
    {'base':'OO','letters':/[\uA74E]/g},
    {'base':'OU','letters':/[\u0222]/g},
    {'base':'P', 'letters':/[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g},
    {'base':'Q', 'letters':/[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g},
    {'base':'R', 'letters':/[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g},
    {'base':'S', 'letters':/[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g},
    {'base':'T', 'letters':/[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g},
    {'base':'TZ','letters':/[\uA728]/g},
    {'base':'U', 'letters':/[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g},
    {'base':'V', 'letters':/[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g},
    {'base':'VY','letters':/[\uA760]/g},
    {'base':'W', 'letters':/[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g},
    {'base':'X', 'letters':/[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g},
    {'base':'Y', 'letters':/[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g},
    {'base':'Z', 'letters':/[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g},
    {'base':'a', 'letters':/[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g},
    {'base':'aa','letters':/[\uA733]/g},
    {'base':'ae','letters':/[\u00E6\u01FD\u01E3]/g},
    {'base':'ao','letters':/[\uA735]/g},
    {'base':'au','letters':/[\uA737]/g},
    {'base':'av','letters':/[\uA739\uA73B]/g},
    {'base':'ay','letters':/[\uA73D]/g},
    {'base':'b', 'letters':/[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g},
    {'base':'c', 'letters':/[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g},
    {'base':'d', 'letters':/[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g},
    {'base':'dz','letters':/[\u01F3\u01C6]/g},
    {'base':'e', 'letters':/[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g},
    {'base':'f', 'letters':/[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g},
    {'base':'g', 'letters':/[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g},
    {'base':'h', 'letters':/[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g},
    {'base':'hv','letters':/[\u0195]/g},
    {'base':'i', 'letters':/[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g},
    {'base':'j', 'letters':/[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g},
    {'base':'k', 'letters':/[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g},
    {'base':'l', 'letters':/[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g},
    {'base':'lj','letters':/[\u01C9]/g},
    {'base':'m', 'letters':/[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g},
    {'base':'n', 'letters':/[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g},
    {'base':'nj','letters':/[\u01CC]/g},
    {'base':'o', 'letters':/[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g},
    {'base':'oi','letters':/[\u01A3]/g},
    {'base':'ou','letters':/[\u0223]/g},
    {'base':'oo','letters':/[\uA74F]/g},
    {'base':'p','letters':/[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g},
    {'base':'q','letters':/[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g},
    {'base':'r','letters':/[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g},
    {'base':'s','letters':/[\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g},
    {'base':'t','letters':/[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g},
    {'base':'tz','letters':/[\uA729]/g},
    {'base':'u','letters':/[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g},
    {'base':'v','letters':/[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g},
    {'base':'vy','letters':/[\uA761]/g},
    {'base':'w','letters':/[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g},
    {'base':'x','letters':/[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g},
    {'base':'y','letters':/[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g},
    {'base':'z','letters':/[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g}
];
var changes;
function removeDiacritics (str) {
    if(!changes) {
        changes = defaultDiacriticsRemovalMap;
    }
    for(var i=0; i<changes.length; i++) {
        str = str.replace(changes[i].letters, changes[i].base);
    }
    return str;
}

////////////////////////////////////////////////////////

String.prototype.copyCasingFrom = function(s)
{
	for (var i=0; i < Math.min(this.length, s.length); i++)
	{
		var toUp = (s[i] == s[i].toUpperCase());
		if (toUp)
			this[i] = this[i].toUpperCase();
	}
	return this;
}
$.fn.filterByData = function(prop, val) {
    return this.filter(
        function() { return $(this).data(prop)==val; }
    );
}
$.addStyle = function(style)
{
	$('<style>').html(style).appendTo('head');
}

// File: ../kyberia-v31/kyberia-v31.js (2014-01-17 07:30:05)

// main content script

function onReady()
{
	var arrTimes = [];

	var arrEnabledFeatures = [];
	for (var i=0; i < g_features.length; i++)
	{
		var feature = g_features[i];
		if (!isFeatureEnabled(feature.name)) continue;

		arrEnabledFeatures.push( feature.name );	// for analytics

		var t = time();
		feature.onLoad();

		arrTimes.push({ dt:(time() - t), name:feature.name });
	}

	if (localStorage['kyberia_v31_show_performance'])
	{
		arrTimes.sort(function(a,b) { return b.dt-a.dt; });
		for (var i=0; i < arrTimes.length; i++)
		{
			var x = arrTimes[i];
			console.log(x.dt+' s\t'+x.name);
		}
	}

	if (analyticsOnceADay())
		sendAnalyticsInfo( arrEnabledFeatures );

	// not necessary, but very useful for debugging.. breaks stuff in firefox, so just chrome..
	if (window.chrome)
		$('<script src="http://code.jquery.com/jquery-2.0.3.min.js">').appendTo('body');
}

function analyticsOnceADay()
{
	var lsKey = '_kyberia_v31_last_analytics';
	var last = localStorage[lsKey];
	if (last && ago(last) < 24*60*60)
		return false;

	localStorage[lsKey] = time();
	return true;
}


$(function() {
	onReady();
});


// File: ../kyberia-v31/features/AutoUpdater.js (2014-01-17 07:30:26)


/*
	1. include version.js (once a 24h)
		localStorage['KYBERIA_V31_USERSCRIPT_LAST_VERSION'] = '1.23';

	2. if last != current
		show download link
*/
function AutoUpdater()
{
	this.name = 'AutoUpdater';
	this.onLoad = function() {
		return;

/*
		if (!window.KYBERIA_V31_USERSCRIPT_VERSION) return;

		if (window.chrome)
			chromeShouldntUseUserscript();

		if (onceADay()) checkForUpdate();

		if (isNewVersion() && shouldRemind())
			message().prependTo('body');
*/
	}
/*
	var urlBase = 'http://p.brm.sk/kyberia-v31-userscript';
	//var urlBase = 'http://l/kyberia-v31-userscript';
	var urlVersion = urlBase+'/version.js';
	var urlDownload = urlBase+'/kyberia-v31.user.js';
	var urlChangelog = 'https://github.com/idpsycho/kyberia-v31/commits/master';
	var urlChrome = 'https://chrome.google.com/webstore/detail/kyberia-v31-features/icjomacohfdgbijhlhkhfomoeolncgia';

	function chromeShouldntUseUserscript() {
		var div = $('<div>');
		div.css({'text-align': 'center', 'font-weight': 'bold', 'color': 'red', 'padding-top': '40px'});
		var msgChrome = 'Seems like you\'re using chrome, install chrome extension from ';
		var aChrome = $('<a target="_blank">').attr('href', urlChrome).text('here');
		div.append( $('<div>').text(msgChrome).append(aChrome) );

		div.prependTo('body');
	}

	function message() {
		var last  = lastVersion();
		var curr  = currVersion();
		var div = $('<div>').css({'text-align': 'center', 'font-weight': 'bold', 'color': 'red',
									'padding-top': '40px'});

		var later = $('<a href="#">').text('LATER').attr('title', 'remind me after 24 hours');
		var install = $('<a target="_blank">').text('INSTALL').attr('href', urlDownload);
		var changelog = $('<a target="_blank">').text('what changed?').attr('href', urlChangelog);
		var space = $('<span>').html('&nbsp; - &nbsp;');

		later.click(function() {
			div.slideUp();
			localStorage['KYBERIA_V31_USERSCRIPT_LAST_REMIND'] = time();
			return false;
		});

		div.html('Kyberia extension - new version is out '+last+' (you have '+curr+')<br>');
		div.append(install).append(space).append(later).append(space.clone()).append(changelog);

		return div;
	}

	function shouldRemind() {
		var last_remind = localStorage['KYBERIA_V31_USERSCRIPT_LAST_REMIND'];
		if (!last_remind) return true;

		var aDay = 24*60*60;
		return ago(last_remind) > aDay;
	}

	function onceADay() {
		var last_check = localStorage['KYBERIA_V31_USERSCRIPT_LAST_VERSION_CHECK'];
		if (!last_check) return true;

		var aDay = 24*60*60;
		return ago(last_check) > aDay;
	}
	function checkForUpdate() {
		localStorage['KYBERIA_V31_USERSCRIPT_LAST_VERSION_CHECK'] = time();
		var operaFuckYouFix = '?'+Math.random();
		$('<script>').attr('src', urlVersion+operaFuckYouFix).appendTo('body');
	}
	function lastVersion() { return localStorage['KYBERIA_V31_USERSCRIPT_LAST_VERSION']; }
	function currVersion() { return window.KYBERIA_V31_USERSCRIPT_VERSION; }
	function isNewVersion() {
		var last = lastVersion();
		var curr = currVersion();
		if (!last || !curr) return false;
		return last != curr;
	}
	*/
}

/*
AutoUpdater.checkForUpdateNow = function() {
	localStorage['KYBERIA_V31_USERSCRIPT_LAST_VERSION_CHECK'] = 0;
	(new AutoUpdater()).onLoad();
};
*/

AutoUpdater.version = function() {
	if (window.KYBERIA_V31_USERSCRIPT_VERSION)
		return window.KYBERIA_V31_USERSCRIPT_VERSION;
	if (window.chrome)
		return window.chrome.runtime.getManifest().version;
	return '???';
}
AutoUpdater.is_userscript = function() {
	return !!window.KYBERIA_V31_USERSCRIPT_VERSION;
}


g_features.push( new AutoUpdater() );



// File: ../kyberia-v31/features/ExtensionOptions.js (2013-10-24 08:00:26)


function ExtensionOptions()
{
	this.name = 'ExtensionOptions';
	this.onLoad = function() {
		if (inConfigureUserinfo())
			addExtensionOptions();

	}
	////////////////////////////////////////////////////////////
	function inConfigureUserinfo() {
		var id = userId();
		if (!id) return;
		id = RegExp.escape( id );
		var re = new RegExp('\/id\/'+id+'\/1961033.*$')	// http://kyberia.sk/id/1297258
		return window.location.href.match(re);
	}

	function getOptionsHtml(fn)
	{
		if (!window.KYBERIA_V31_USERSCRIPT_VERSION && window.chrome)
		{
			var url = window.chrome.extension.getURL("options.html");
			$.get(url, fn, 'html');
		}
		else
		{
			fn( OPTIONS_HTML() );
		}
	}
	function addExtensionOptions()
	{
		localStorage['KYBERIA_V31_HEADER_TEMPLATE'] = getHeaderTemplate();	// remember

		getOptionsHtml(function(html) {
			var options = $(html).insertBefore('#configure');

			$('.bug-report').hide();
			$('.toggle-bug-report').click(function() {
				var b = $('.bug-report').slideToggle().is(':visible');
				prepareBugReport(options);
				return false;
			});

			applyOptionsJavascript();
		});
	}
	function prepareBugReport(options)
	{
		var v = AutoUpdater.version();
		var u = AutoUpdater.is_userscript() ? ' (userscript)' : '';
		var browser = getBrowserInfo();
		var header_template = getHeaderTemplate();
		var bug = '';
		bug += 'bug report, v'+v+u+', '+browser+'\n';
		bug += 'header '+header_template+'\n';
		bug += 'link kde to robi: \n';
		bug += '\n';
		bug += 'popis: ';
		var ta = options.find('.bug-report textarea').css({ width: '100%' });
		ta.val(bug).focus();

		$('[name=node_name]').val('bug report, v'+v+u);
		moveCaretToEnd(ta);
	}
	function applyOptionsJavascript()
	{
		var v = AutoUpdater.version();
		$('#kyberia_v31 .v31_version').text('v'+v);
		var features = $('#kyberia_v31 .ls');
		for (var i=0; i < features.length; i++)
		{
			var feature = $(features[i]);
			var name = feature.attr('name');

			if (feature.is('[type=checkbox]'))
			{
				var b = isFeatureEnabled(name);
				feature.prop('checked', b);
			}
			else
			if (feature.is('[type=text]'))
			{
				var val = getFeatureValue(name);
				feature.val(val);
			}

			if (!isfeatureAvailable(name))
			{
				var label = feature.parent();
				label.addClass('disabled');
				label.parent().attr('title', 'not available yet');
			}
		}

		$('#kyberia_v31 .ls').change(function()
		{
			var t = $(this);
			var name = t.attr('name');
			if (t.is('input[type=checkbox]'))
			{
				//alert(name+' changed to '+t.prop('checked'));
				setFeatureEnabled(name, t.prop('checked'));
				$('#kyberia_v31 .saved').stop(true, true).show().fadeOut(2000);
			}
			else
			if (t.is('input[type=text]'))
			{
				//alert(name+' changed to '+t.val())
				setFeatureValue(name, t.val());
				$('#kyberia_v31 .saved').stop(true, true).show().fadeOut(2000);
			}
		});
	}
}

g_features.push( new ExtensionOptions() );



// File: ../kyberia-v31/features/ChatBox.js (2014-02-18 09:54:02)


function ChatBox()
{
	this.name = 'ChatBox';
	this.onLoad = function()
	{
		if (!isLoggedIn())
			return;

		MailReader.ifInMail_ParseMails();

		ChatUi.init();
		ChatUi.keepUpdating();
	}
	////////////////////////////////////////////////////////////

	function _soundPuk()
	{
		var a = $('audio.v31_hangout_puk')
		if (!a.length) {
			a = $('<audio class="v31_hangout_puk" src="http://p.brm.sk/puk.wav">');
			a.appendTo('body');
		}
		if (a[0]) a[0].play();
	}

	function isLoggedIn()
	{
		return $('input[type=submit][value=logout]').length > 0;
	}

	var ChatUi = new function()
	{
		var ChatUi = this;
		ChatUi.$chats = null;

		ChatUi.init = function()
		{
			MailReader.onNewMail = ChatUi.onNewMail;
			MailReader.onNewChecked = ChatUi.onNewChecked;
			MailReader.onMailLoad = ChatUi.onMailLoad;
			_createHtml();

			var users = ChatsOpen.map();
			for (var username in users)
			{
				if (users[username].windowUid != getWindowUid())
					continue;

				ChatUi.startChatWith( username );
			}

			_friendlistUpgrade();
		}

		function _friendlistUpgrade()
		{
			$.addStyle('\
				.v31_hangout_search { display: block; padding: 5px 8px; margin: 4px; width: 70%;\
									 font-size: 11px; height: 24px !important; border: none;\
									 margin-left: 30px; }\
				.v31_hangout_latest	{ background: #333; vertical-align: top; }\
				.v31_hangout_latest>div	{ padding: 1px; vertical-align: middle; line-height: 30px; }\
				.v31_hangout_latest>div:hover { background: #555; cursor: pointer; }\
				.v31_hangout_latest	img { width: 23px; height: 23px; margin-right: 10px; }\
				.v31_hangout_start	{ float: left; background: #6dae42; opacity: 0.2; color: black;\
									height: 23px; line-height: 23px; width: 23px; text-align: center;\
									margin-right: 4px; }\
				.v31_hangout_start:hover	{ opacity: 1; cursor: pointer; }\
			');
			var $search = $('<input type="text" placeholder="Chat with.." class="v31_hangout_search">');
			var $latest = $('<div class="v31_hangout_latest">');
			$search.insertBefore('.active_friend.u:eq(0)');
			$latest.insertAfter($search);
			$search.keydown(function(e) {
				if (e.which==13) {
					ChatUi.startChatWith( $search.val() );
					$search.val('');
				}
			});
			$search.blur(function() { setTimeout(function() { $latest.html('').hide(); }, 100); });
			$search.focus(function() {
				$latest.html('').show();
				var users = MailReader.getUsers();
				for (var i=0; i < users.length; i++)
				{
					var u = users[i];
					var e = $('<div><img><span>');
					e.find('img').attr('src', avatarSrc(u.id));
					e.find('span').text( u.name );
					e.addClass(u.online ? 'online' : '');
					e.appendTo($latest);
					e.data('user', u.name).click(function() {
						ChatUi.startChatWith($(this).data('user'));
					});
				}
			});

			$('.active_friend.u').each(function() {
				$('<div class="v31_hangout_start">').text('+').prependTo(this).click(function() {
					var username = $(this).parent().find('a:eq(0)').attr('title');
					ChatUi.startChatWith(username);
				});
			});
		}

		function _createHtml()
		{
			$.addStyle('\
				.v31_hangout	{ position: fixed; bottom: 0; right: 20px; }\
				.v31_hangout_receive	{ float: right; padding: 10px; background: red; border-radius: 5px;\
										 color: black; font-weight: bold; margin-bottom: -5px; }\
				.v31_hangout_receive:hover { opacity: 0.9; cursor: pointer; }\
			');
			ChatUi.$chats = $('<div class="v31_hangout">').appendTo('body');

			ChatUi.$openUnread = $('<div class="v31_hangout_receive">').text('open new mails');
			ChatUi.$openUnread.appendTo(ChatUi.$chats);
			ChatUi.$openUnread.click(function() {
				MailReader.getMails('reload');
				ChatUi.$openUnread.hide();
			});
		}
		ChatUi.startChatWith = function(u)
		{
			var ch = new ChatWindow;
			ch.init(u);
			return ch;
		}

		ChatUi.updateBtnOpenUnread = function()
		{
			var b = MailReader.numUnread() && !ChatUi.numOpen();
			if (b)
				ChatUi.$openUnread.show();
			else
				ChatUi.$openUnread.hide();
		}

		ChatUi.keepUpdating = function()
		{
			ChatUi.updateBtnOpenUnread();

			$('.v31_hangout_window>.reload').toggleClass('new', MailReader.numUnread()>0);

			for (var u in ChatWindow.map)
				if (!ChatsOpen.getStateOf(u))
					ChatWindow.map[u].close();

			setTimeout(function() {
				ChatUi.keepUpdating();
			}, 5*1000);
		}
		ChatUi.onNewMail = function(m)
		{
			var win = ChatWindow.map[m.username_from];
			if (!win)
				win = ChatUi.startChatWith(m.username_from);
			else
				win.refresh();
		}
		ChatUi.onMailLoad = function(mails)
		{
			$.each(ChatWindow.map, function(i, e) {
				e.onMailLoad(mails);
			});
		}
		ChatUi.numOpen = function() {
			return $('.v31_hangout_window').length;
		}
		ChatUi.onNewChecked = function(nUnread)
		{
			ChatUi.updateBtnOpenUnread();

			$.each(ChatWindow.map, function(i, e) {
				e.onNewChecked(nUnread);
			});
		}
	}

	var ChatWindow = function()
	{
		var t = this;
		var $win;
		t.username = '';	// target user
		t.userid = '';		// target user

		t.init = function(username)
		{
			t.username = username;
			_createHtml();
			ChatWindow.map[username] = t;

			_renderMails( MailReader.getMails() );
		}
		t.onMailLoad = function(mails) { _renderMails(mails); }
		t.onNewChecked = function(nUnread) {
			$win.find('.reload').toggleClass('new', nUnread>0);
		}
		t.refresh = function()
		{
			var mails = MailReader.getMails();//With(t.username);
			_renderMails(mails);
		}
		t.close = function()
		{
			ChatsOpen.remove(t.username);
			delete ChatWindow.map[t.username];
			$win.remove();
			//$win.fadeOut(function() { $win.remove(); });
		}
		t.toggle = function()
		{
			if ($win.height() > 150) {
				$win.animate({height: '150px'});
				ChatsOpen.set(t.username, 'mini');
			}
			else {
				$win.animate({height: '380px'});
				ChatsOpen.set(t.username, 'normal');
			}
		}
		t.send = function()
		{
			var ta = $win.find('textarea');
			ta.prop('disabled', true).addClass('sending').removeClass('error');
			MailReader.sendMail(t.username, ta.val(), function() {
				ta.prop('disabled', false).removeClass('sending');
				ta.val('');
			}, function() {
				ta.prop('disabled', false).removeClass('sending').addClass('error');
			});
			ta.val();
		}

		function _createHtml()
		{
			if (!ChatWindow._styleAdded)
			{
				ChatWindow._styleAdded = 1;
				$.addStyle('\
.v31_hangout_window				{ width: 260px; height: 380px; margin-right: 5px; display: inline-block;\
								 vertical-align: bottom; position: relative; box-shadow: 0 0 5px #000;\
								 background: #222; }\
.v31_hangout_window .head		{ height: 35px; line-height: 35px; cursor: pointer;\
								 background: #6dae42; color: #000; font-size: 13px; }\
.v31_hangout_window .resize		{ float: left; width: 34px; height: 34px; cursor: nw-resize; }\
.v31_hangout_window .close		{ float: right; padding: 0 13px; }\
.v31_hangout_window .close:hover{ background: rgba(255, 255, 255, 0.2); cursor: pointer; }\
.v31_hangout_window .messages	{ position: absolute; top: 35px; bottom: 65px; left: 0; right: 0;\
								overflow-y: scroll; padding: 8px; line-height: 18px;\
								word-break: break-word; }\
.v31_hangout_window >.reload	{ position: absolute; bottom: 35px; left: 0; right: 0; text-align: center;\
									background: black; color: #6dae42; cursor: pointer;\
									height: 30px; line-height: 30px; opacity: 0.5; }\
.v31_hangout_window >.reload.new { background: red; color: black; font-weight: bold; }\
.v31_hangout_window >.reload:hover	{ opacity: 1; }\
.v31_hangout_window >textarea	{ position: absolute; bottom: 0; left: 0; display: block;\
								border: 1px solid #6dae42; width: 100%; height: 35px; }\
.v31_hangout_window >textarea.sending { opacity: 0.7; }\
.v31_hangout_window >textarea.error	{ color: red; }\
\
.v31_message					{ padding: 3px; clear: both; overflow: hidden; }\
.v31_message>.icon				{ width: 34px; height: 34px; }\
.v31_message.me>.icon			{ float: right; }\
.v31_message.em>.icon			{ float: left; }\
.v31_message>.bubble			{ max-width: 70%; background: #000; color: #6dae42; padding: 5px 8px; }\
.v31_message.me>.bubble			{ float: right; }\
.v31_message.em>.bubble			{ float: left; }\
.v31_message .timestamp			{ opacity: 0.4; }\
.v31_message>.icon.seen			{ opacity: 0.3; width: 20px; height: 20px; }\
				');
			}

			var html = '\
			<div class="v31_hangout_window">\
				<div class="head">\
					<div class="resize"></div>\
					<div class="close"> X </div>\
					<div class="user">username</div>\
				</div>\
				<div class="messages"></div>\
				<div class="reload">reload</div>\
				<textarea></textarea>\
			</div>\
			';
			$win = $(html);
			$win.data('username', t.username)
			$win.find('.user').text(t.username);
			$win.find('.reload').click(function() { MailReader.getMails('reload'); });
			$win.find('.close').click(function() { t.close(); });
			$win.find('.head').click(function(e) { if ($(e.target).is('.user')) t.toggle(); });
			$win.find('textarea').keydown(function(e) {
				if (e.which==13 && !e.ctrlKey && !e.shiftKey) t.send(); });
			$win.appendTo( ChatUi.$chats );
			$win.find('textarea').focus();

			$win.find('.resize').mousedown(function(e) { $win.addClass('resizing'); return false; });
			$(document).mouseup(function(e) {
				if ($win.is('.resizing')) {
					$win.removeClass('resizing');
					return false; }
			});
			$(document).mousemove(function(e) { _resize(e); });


			var state = ChatsOpen.getStateOf(t.username);
			if (state == 'mini')
				$win.height(150);

			ChatsOpen.set(t.username, state?state:'normal');
		}

		function _resize(e)
		{
			if (!$win.is('.resizing')) return;

			var o = $win.offset();
			var w = $win.width() + (o.left-e.pageX)+17;
			var h = $win.height() + (o.top-e.pageY)+17;
			$win.width( Math.max(170, w) );
			$win.height( Math.max(170, h) );
		}

		function _renderMails(mails)
		{
			$win.find('.reload').removeClass('new');
			$win.find('.messages').html('');
			$win.addClass();
			for (var i=0; i < mails.length; i++)
			{
				var m = mails[i];
				if (m.username_from!=t.username && m.username_to!=t.username) continue;

				t.userid = m.isMe ? m.userid_to : m.userid_from;
				_renderMail( m );
			}
			_renderSeen();
		}
		function _renderMail(m)
		{
			var html = '\
			<div class="v31_message">\
				<img class="icon">\
				<div class="bubble">\
					<div class="content"></div>\
					<div class="timestamp"></div>\
				</div>\
			</div>\
			';
			var $msg = $(html).addClass(m.isMe?'me':'em');
			$msg.find('.icon').attr('src', avatarSrc(m.userid_from)).attr('title', m.username_from);
			$msg.find('.content').html(m.content);
			$msg.find('.timestamp').text(_niceTimestamp(m.timestamp));
			if (m.isUnread) $msg.addClass('unread');

			var $msgs = $('.messages', $win);
			var atBottom = _isAtBottom($msgs);
			$msg.appendTo($msgs);
			if (atBottom) $msgs.scrollTop(9999999);
		}
		function _niceTimestamp(t)
		{
			//t = '09:07:58 - 17.01.2014';
			var a = t.match(/([\d]+).([\d]+).([\d]+)...([\d]+).([\d]+).([\d]+)/);
			var h = parseInt(a[1])
			var m = a[2];
			return h+':'+m;
		}
		function _renderSeen()
		{
			var $seen = $('<div class="v31_message em"><img class="icon seen">');
			$seen.find('.icon').attr('src', avatarSrc(t.userid));

			var $msgs = $('.messages', $win);
			var atBottom = _isAtBottom($msgs);

			var unread = $msgs.find('.unread:eq(0)');
			if (!unread.length)
				$msgs.append($seen);
			else
				unread.before($seen);


			if (atBottom) $msgs.scrollTop(9999999);
		}

		function _isAtBottom(e)
		{
			var height = e.outerHeight();
			var scrollHeight = e[0].scrollHeight;
			var scrollTop = e.scrollTop();
			return (scrollTop+height > scrollHeight-10);
		}

	}
	ChatWindow.map = {};	// this is map with users..


	// cross-tab state inside localStorage
	var ChatsOpen = new function()
	{
		var ChatsOpen = this;

		ChatsOpen.remove = function(username)
		{
			var a = ChatsOpen.map();
			delete a[username];
			localStorage['v31_hangout_chats'] = JSON.stringify(a);
		}
		ChatsOpen.set = function(username, state)
		{
			var a = ChatsOpen.map();
			a[username] = {username:username, state:state, windowUid: getWindowUid()};
			localStorage['v31_hangout_chats'] = JSON.stringify(a);
		}
		ChatsOpen.getStateOf = function(username)
		{
			var a = ChatsOpen.map();
			a = a[username];
			if (a) return a.state;
		}
		ChatsOpen.map = function(username, state)
		{
			var a = localStorage['v31_hangout_chats'];
			if (a) return JSON.parse(a);
			return {};
		}
	}


	// loaduje maily do localStoragu, aby sa nacitali len raz pre vsetky taby..
	var MailReader = new function()
	{
		var MailReader = this;
		MailReader.mapUsers = {};
		MailReader.onNewMail = function(username) {};
		MailReader.onNewChecked = function(nUnread) {};
		MailReader.onMailLoad = function(mails) {};

		MailReader.getMailsWith = function(username)
		{
			var mails = MailReader.getMails();

			var out = [];
			for (var i=0; i < mails.length; i++)
			{
				var m = mails[i];
				if (m.username_from==username ||
					m.username_to==username)
					out.push(m)
			}
			return out;
		}
		MailReader.sendMail = function(username, content, fnSuccess, fnFail)
		{
			var data = {mail_to:username, mail_to_type:'name', mail_text:content, event:'send'};
			$.post('/id/24', data)
			.success(function(html) {
				_parseMails(html);
				if (fnSuccess) fnSuccess();
			})
			.fail(function() {
				if (fnFail) fnFail();
			});
		}
		MailReader.getUsers = function()
		{
			var users = localStorage['v31_hangout_users'];
			if (users) return JSON.parse( users )
			return [];
		}

		MailReader.getMails = function(bReload)
		{
			if (bReload)
				_loadMails();

			/*
			if (MailReader.isNewMail() || !localStorage['v31_hangout_mails'])
			{
				if (ago(localStorage['v31_hangout_lastLoadMail']) > 5)
				{
					localStorage['v31_hangout_lastLoadMail'] = time();
					_loadMails();
				}
			}
			*/

			var mails = localStorage['v31_hangout_mails'];
			if (mails) return JSON.parse( mails )
			return [];
		}
		MailReader.ifInMail_ParseMails = function()
		{
			if (window.location.pathname == '/id/24' ||
				window.location.pathname == '/id/24/')
				_parseMails( $('body') );
		}

		/////////////////////////////////////////
		function _loadMails()
		{
			$.get('/id/24', function(html) {
				MailReader.numUnreadNull();
				_parseMails(html);
			});
		}
		function _clearUsers()
		{
			MailReader.mapUsers = {};
			MailReader.arrUsers = [];
		}
		function _addUser(m)
		{
			if (!MailReader.mapUsers[m.userid_from])
			{
				MailReader.mapUsers[m.userid_from] = 1;
				MailReader.arrUsers.push( {id:m.userid_from, name:m.username_from, online:m.userlive_from} );
			}
			if (!MailReader.mapUsers[m.userid_to])
			{
				MailReader.mapUsers[m.userid_to] = 1;
				MailReader.arrUsers.push( {id:m.userid_to, name:m.username_to, online:m.userlive_to} );
			}
		}
		function _parseMails(html)
		{
			var mails = [];		// {userid_from, userid_to, timestamp, unread, new, content}

			_clearUsers();
			var $mails = $(html).find('#formular .message');//.get().reverse();
			$.each($mails, function(i, e) {
				var m = _extractMailFromElement(e);
				mails.push( m );

				_addUser(m);

				if (m.isNew)
					MailReader.onNewMail(m);
			});

			mails.reverse();
			localStorage['v31_hangout_mails'] = JSON.stringify( mails );
			localStorage['v31_hangout_users'] = JSON.stringify( MailReader.arrUsers );

			MailReader.onMailLoad( mails );
		}
		function _extractMailFromElement(e)
		{
			e=$(e);
			var $from		= e.find('a[href^=javascript]:eq(0)');
			var $to			= e.find('a[href^=javascript]:eq(1)');

			var m = {};
			m.userid_from	= parseInt( $from.attr('href').match(/[\d]+\'\)$/)[0] );
			m.userid_to		= parseInt( $to.attr('href').match(/[\d]+\'\)$/)[0] );
			m.username_from = $from.text();
			m.username_to	= $to.text();
			m.userlive_from	= !!$from[0].nextSibling.data.match('location');
			m.userlive_to	= !!$to[0].nextSibling.data.match('location');

			m.timestamp	= $.trim(e.find('.mail_checkbox')[0].nextSibling.nextSibling.nextSibling.data);
			m.important	= $.trim(e.find('.header .most_important').text()).toLowerCase();
			m.isUnread	= (m.important=='unread');
			m.isNew		= (m.important=='new');
			m.content	= e.find('.content').html();
			m.id		= parseInt( e.find('.mail_checkbox').attr('name').match(/[\d]+/)[0] );
			m.isMe		= m.userid_from == 1297258;
			return m;
		}

		MailReader.numUnreadNull = function()	// when loading mails, we reset this
		{
			localStorage['v31_hangout_numUnread'] = 0;
			localStorage['v31_hangout_lastCheckMail'] = time();
		}
		MailReader.numUnread = function()
		{
			if (ago(localStorage['v31_hangout_lastCheckMail']) > 10) {
				localStorage['v31_hangout_lastCheckMail'] = time();
				_checkNewMail();
			}

			return parseInt(localStorage['v31_hangout_numUnread']);
		}

		function _checkNewMail()
		{
			$.get('/ajax/check_new_mail.php', function(resp) {
				var nUnread = parseInt(resp);//(resp[0]!='0') ? resp.substr(2) : '';
				localStorage['v31_hangout_numUnread'] = nUnread;

				if (nUnread && resp != localStorage['v31_hangout_lastPukResp']) {
					_soundPuk();
					MailReader.onNewChecked(nUnread);
				}

				localStorage['v31_hangout_lastPukResp'] = resp;
			})
		}
	};
};




g_features.push( new ChatBox() );



// File: ../kyberia-v31/features/Jargoniser.js (2014-02-18 07:58:22)



function Jargoniser()
{
	this.name = 'Jargoniser';
	this.onLoad = function()
	{
		var map = {
			'krasne':		'krástne',
			'krasny':		'krástny',
			'krasna':		'krástna',
			'krasni':		'krástni',
			'klavesnica':	'klávestnica',
			'klavesnici':	'klávestnici',

			'eur':			'euri',
			'euro':			'euri',
			'eura':			'euri',

			'nejake':		'niaké',
			'nejaky':		'niaký',
			'nejaki':		'niakí',
			'nejaka':		'niaká',

			'bratislava':	'blava',
			'bratislave':	'blave',
			'bratislavy':	'blavy',

			'hanba':		'hamba',
			'hanbi':		'hambi',
			'hanbu':		'hambu',

			'vianoce':		'vjanky',
			'bolo treba':	'trebalo',
			'puzzle':		'pucle',
			'dakujem':		'ďakovala',
			'ahoj':			'ahojky',
			'cau':			'cauky',
			'palacinka':	'palačinka',
			'nie je':		'neni',
			'neviem':		'nevím',
			'nie':			'ne',

			'spolubyvajuca':'spolubydla',
			'spolubyvajuci':'spolubydla',

			'chladnicka':	'ladnička',
			'chladnicke':	'ladničke',
			'chladnicky':	'ladničky',

			'kybca':		'kypča',
			'kybcan':		'kypčan',

			'nechapem to':	'nechapem tomu',
			'nechape to':	'nechape tomu',
			'nechapes to':	'nechapes tomu',
			'to nechapem':	'tomu nechapem',
			'to nechape':	'tomu nechape',
			'to nechapes':	'tomu nechapes',

			'napadlo mi':	'napadlo ma',
			'napadlo mu':	'napadlo ho',
			'napadlo nam':	'napadlo nás',
			'mi napadlo':	'ma napadlo',
			'mu napadlo':	'ho napadlo',
			'nam napadlo':	'nás napadlo',
			'nenapadlo mi':	'nenapadlo ma',
			'nenapadlo mu':	'nenapadlo ho',
			'nenapadlo nam':'nenapadlo nás',
			'mi nenapadlo':	'ma nenapadlo',
			'mu nenapadlo':	'ho nenapadlo',
			'nam nenapadlo':'nás nenapadlo',

			'alebo':		'aneb',
		};

		alphabetConversionAllHtml(map, 'remove diacritics', false, 'words only');
	}
}

g_features.push( new Jargoniser() );



// File: ../kyberia-v31/features/FeatureMix.js (2014-02-14 03:31:08)


function FeatureMix()
{
	this.name = 'FeatureMix';
	this.onLoad = function()
	{
		// localStorage['v31_amie_mirrorize'] = 1
		if (localStorage['v31_amie_mirrorize'])
			mirrorize();

		// prevent annoying bug in panel.js, that fucks up error-reporting functionality
		$('<div id="sidebar_node">').append('<a href="#">').appendTo('body');
		document.captureEvents = function() {};

		fix_imgur();

		custom_pagination_offset();

		hilight_low_k();

		remember_login_type();

		remove_autoplay();

		people_custom_sorting();
	}
	////////////////////////////////////////////////////////////

	function mirrorize() {
		$('body').css({
			'-webkit-transform': 'scale(-1, 1)',	// Chrome, Safari 3.1+
			'transform': 'scale(-1, 1)',			// Firefox 16+, IE 10+, Opera 12.10+
		});
	}

	function fix_imgur() {
		$('body').on('keyup', 'textarea:focus', function(e) {
			if (!e.ctrlKey || e.which!=86) return;

			var orig = $(this).val();
			var fixed = orig.replace(/\/\/i\.imgur\.com\//g, '//img.imgur.com/');
			if (orig != fixed)
				$(this).val(fixed);
		});
	}

	function custom_pagination_offset() {
		$('input[name="get_children_offset"]').attr('type', 'text').css('width', '40px');
	}

	function remove_autoplay()
	{
		$('object[data*="autoplay=1"]').remove();
	}
	function hilight_low_k() {
		var elems = $('.add_k_cmnt');
		elems = elems.add('.module_k_wallet .current_user_k');
		elems.each(function() {
			var e = $(this);
			var s = $.trim(e.text());
			if (!s) return;
			s = s.match(/[0-9]+$/)[0];
			var numK = parseInt(s);
			if (numK <= 3)
				e.addClass('most_important');
		});
	}

	function remember_login_type() {
		$('#login_type_id, #login_type_name').change(function() {
			if ($(this).prop('checked'))
				localStorage['KYBERIA_V31_last-login-type'] = $(this).attr('id');
		});

		var login_type = localStorage['KYBERIA_V31_last-login-type'];
		if (login_type=='login_type_id' || login_type=='login_type_name')
			$('#'+login_type).prop('checked', true);
	}

	function people_custom_sorting()
	{
		$('.v31-sortable').show();

		$.fn.sortChildrenBy = function(fnSort)
		{
			this.each(function() {
				var kids = $(this).find('>*');
				kids.sort(fnSort);
				$(this).html(kids);
			});
		}

		function sortByIdle()
		{
			localStorage['people-sort-by-idle'] = 'yep';
			$('.user-list').sortChildrenBy(function(a,b) {
				a = parseInt($(a).data('idle'));
				b = parseInt($(b).data('idle'));
				return a-b;
			});
		}
		function sortByName()
		{
			localStorage['people-sort-by-idle'] = '';
			$('.user-list').sortChildrenBy(function(a,b) {
				a = $(a).text();
				b = $(b).text();
				return a<b ? -1 : (a>b ? 1 : 0);
			});
		}

		$(function() {
			if (localStorage['people-sort-by-idle'])
				sortByIdle();

			$('.v31-sortable .sort-by-name').click(function() {
				sortByName();
				return false;
			});
			$('.v31-sortable .sort-by-idle').click(function() {
				sortByIdle();
				return false;
			});
		});
	}
}


g_features.push( new FeatureMix() );



// File: ../kyberia-v31/features/AjaxButtons.js (2013-09-06 01:32:20)


function AjaxButtons()
{
	this.name = 'AjaxButtons';
	this.onLoad = function()
	{
		var style = "button:hover, input[type=submit]:hover { cursor: pointer; opacity: 0.5; }";
		$('<style>').text(style).appendTo('body');

		addButtonsToCONS();

		addKtoEveryNode();

		ajaxifyButtons();
	}
	////////////////////////////////////////////////////////////

	function addButtonsToCONS()
	{
		if (!window.location.href.match(/\/id\/5286347$/))
			return;

		$('a[title=skip]').each(function() {
			var bordered = $(this).parents('table.bordered:eq(0)');
			var header = bordered.find('td.header:eq(0)');
			var node_link = header.find('a:eq(0)').attr('href');

			$(this).after( makeButton(node_link, 'fook') );
			//$(this).after( makeButton(node_link, 'book') );
			$(this).after( makeButton(node_link, 'K') );
		});
	}
	function makeButton(node_link, value)
	{
		var form = $('<form method="POST">').attr('action', node_link);
		var submit = $('<input name="event" type="submit">').val(value);
		return form.append(submit);
	}
	function addKtoEveryNode()
	{
		$('.node_content').each(function() {
			var header = $(this).find('.node_header');
			var link = header.find('.node_header_title_nodename').attr('href');

			var kform = $('<form class="quickK" method="POST">').attr('action', link);
			kform.append('<input type="submit" name="event" value="K">');
			kform.css({position: 'absolute', right: '1px', top: '2px', margin: 0});

			$(this).append(kform);
		});
	}

	function ajaxifyButtons()
	{
		Ks().on('click', function() {
			var btn = $(this);
			var action = actionOf(btn);
			var data = {event: 'K'};
			var node_chosen = nodeChosenOf(btn);
			if (node_chosen)
				data.node_chosen = node_chosen;

			btn.hide();
			$.post(action, data, function() {
				if (!node_chosen)
					btn.css({color: 'red', 'font-weight':'bold', border:'none'})
				btn.fadeIn();
			});
			return false;
		});

		fooks().add(unfooks()).on('click', function() {
			var btn = $(this);
			var val = btn.val();
			var newVal = val=='fook'?'unfook':'fook';
			$.post(actionOf(btn), {'event':val}, function() {
				btn.val( newVal );
				var fooked = btn.parents('table.bordered').eq(0);
				if (fooked && val=='fook')
					$('<div>').insertAfter(fooked).append(fooked).slideUp(500);
			});
			return false;
		});

		books().add(unbooks()).on('click', function() {
			var btn = $(this);
			var val = btn.val();
			var cat = btn.parents('form:eq(0)').find('[name=bookcat_id]').val();
			var newVal = val=='book'?'unbook':'book';
			$.post(actionOf(btn), {event:val, bookcat_id:cat}, function() {
				btn.val( newVal );
			});
			return false;
		});

		skips().each(function() {
			var t = $(this);
			t.prepend( $('<div>skip</div>') );
			t.siblings('a:contains(skip)').hide();

			var p = t.parent('td');
			p.add(t).attr('title', 'skip').css({'cursor':'s-resize'});
			p.click(function() { t.trigger('click'); });
		});

		skips().click(function() {
			var curr = $(this).parents('.bordered:eq(0)');
			var next = getElemByHref( $(this).attr('href') );
			animScrollTop_ToNext( curr, next );
			return false;
		});
	}


	function actionOf(btn) { return btn.parents('form').eq(0).attr('action'); }
	function nodeChosenOf(btn) {
		var form = btn.parents('form:eq(0)');
		var choser = form.find('input[name="node_chosen[]"]');
		if (!choser.length) return;

		var node_chosen = [];
		choser.filter(':checked').each(function() {
			node_chosen.push( $(this).val() );
		});

		return node_chosen;
	}

	function fooks() { return $('input[type=submit][value=fook]'); }
	function unfooks() { return $('input[type=submit][value=unfook]'); }
	function books() { return $('input[type=submit][value=book]'); }
	function unbooks() { return $('input[type=submit][value=unbook]'); }
	function Ks() { return $('input[type=submit][value=K]'); }
	function skips() { return $('a[title=skip]'); }

}

g_features.push( new AjaxButtons() );



// File: ../kyberia-v31/features/ShowKGivers.js (2014-01-17 07:29:18)


function ShowKGivers()
{
	var waitBeforeLoad = 500;

	this.name = 'ShowKGivers';
	this.onLoad = function() {

		// first set NODE_ID and class K_value to all K values
		$('td > span.most_important', 'table.bordered').each(function() {
			var k = $(this);
			var bordered = k.parents('table.bordered:eq(0)');
			var id = idFromAction( bordered.find('form:eq(0)') );
			if (!id) return;

			k.addClass('K_value').data('node_id', id);
		});

		$('.node_header_k').each(function() {
			var k = $(this);
			var content = k.parents('.node_content:eq(0)');
			var id = idFromHref( content.find('a.node_header_title_nodename') );
			if (!id) return;
			k.addClass('K_value').data('node_id', id);
		});

		$('.node_info2 > .most_important:eq(0)').each(function() {
			var k = $(this);
			var id = idFromHref( $('#sidebar_node a:eq(0)') );
			if (!id) return;
			k.addClass('K_value').data('node_id', id);
		});

		// now go through all valid found K_values
		$('.K_value').each(function() {
			var k = $(this);
			var id = k.data('node_id');
			if (!id) return;

			k.css({ cursor: 'pointer' })
			k.mouseenter(function() {
				var t = time();
				k.data('entered', t).data('left', 0);
				//console.log('entered: '+t);

				if (showK_list(k)) return;

				setTimeout(function() {
					if (k.data('entered') == t) loadK_list(k, id);
				}, waitBeforeLoad);
			});

			k.mouseleave(function() {
				var t = time();
				k.data('left', t).data('entered', 0);
				//console.log('left: '+t);
				setTimeout(function() {
					if (k.data('left') == t) hideK_list(k);
				}, waitBeforeLoad);
			});
		});

		$(document).click(function() {
			$('.K_value .K_list:visible').fadeOut();
		});
	}
	function showK_list(k) {
		k.stop(true, true).css({opacity: 1});
		var K_list = k.find('.K_list');
		K_list.stop(true, true).fadeIn();
		//K_list.show();
		return K_list.length;
	}
	function hideK_list(k) {
		var K_list = k.find('.K_list');
		K_list.stop(true, true).fadeOut();
		//K_list.hide();
	}
	function loadK_list(k, id) {
		if (showK_list(k))
			return;

		var url = '/id/'+id+'/1908499';
		$.get(url, function(resp) {
			var trs = $(resp).find('table.bordered:last tr');
			var list = $();
			trs.each(function() {
				var gaveK = $(this).text();
				if (gaveK) gaveK = gaveK.match(/K , [0-9]+ visitz[ ]*$/);
				if (!gaveK)
					return false;

				var icon = $(this).find('img:eq(0)').css('vertical-align', 'middle');
				var nick = $(this).find('a:eq(0)').css({ 'text-transform': 'none', 'font-weight': 'normal' });
				var Ksymbol = $('<b>').text('K').css({ color:'red', margin: '0 10px' });
				var num = $('<span>').html( (list.length+1)+'.&nbsp;' ).css({ color: '#6dae42', 'font-weight': 'normal' });
				var line = $('<div>').append(icon).append(Ksymbol).append(num).append(nick);
				line.css({ margin: '2px' })
				list = list.add( line );
			});
			addK_list(k, list);
		});
	}
	function addK_list(k, list) {
		k.css({position: 'relative'});
		var K_list = $('<div class="K_list">').append(list).hide().prependTo(k);
		K_list.css({ position: 'absolute', left: '50px', top: 0, border: '1px solid #6dae42',
						background: '#111', padding: '5px 10px', 'z-index': 99, 'min-width': '200px',
						'text-align': 'left', 'margin-bottom': '50px' });

		showK_list(k);
	}
	////////////////////////////////////////////////////////////

}

g_features.push( new ShowKGivers() );



// File: ../kyberia-v31/features/FlashUnloader.js (2014-01-07 01:31:17)

jQuery.fn.outerHTML = function(s) {
    return s
        ? this.before(s).remove()
        : jQuery("<p>").append(this.eq(0).clone()).html();
};

function FlashUnloader()
{
	this.name = 'FlashUnloader';
	this.onLoad = function() {
		$('.youtube-player').each(function() {
			var t = $(this);
			var w = t.width();
			var h = t.height();
			var id = t.attr('src').match(/\/embed\/([a-z0-9\-_]+)/i);
			if (id) id = id[1];
			if (!id) return;
			var url = 'http://img.youtube.com/vi/'+id+'/0.jpg';

			var div = $('<div>').css({ position: 'relative' });
			var img = $('<img>').attr('src', url).appendTo(div);
			var title = $('<div>').text('load youtube').appendTo(div);
			title.css({ position: 'absolute', padding: '10px 20px', top: '5px', left: '5px',
							background: 'rgba(123, 123, 123, 0.3)', color: 'white', cursor: 'pointer' });
			img.css({ cursor: 'pointer', width: w+'px', height: h+'px', 'max-width': '100%' });

			var html = t.outerHTML();
			t.after(div).remove();
			img.add(title).click(function() {
				div.after( $(html) ).remove();
			});
		});
	}
	////////////////////////////////////////////////////////////

}

g_features.push( new FlashUnloader() );



// File: ../kyberia-v31/features/HideAvatars.js (2013-08-27 22:52:25)


function HideAvatars()
{
	this.name = 'HideAvatars';
	this.onLoad = function() {
		avatars().hide();
	}
	////////////////////////////////////////////////////////////

	function avatars() { return $('.node_avatar'); }

}

g_features.push( new HideAvatars() );



// File: ../kyberia-v31/features/HideMoods.js (2013-08-30 22:43:31)


function HideMoods()
{
	this.name = 'HideMoods';
	this.onLoad = function() {
		moods().hide().prev().filter('br').hide();
	}
	////////////////////////////////////////////////////////////

	function moods() { return $('small.mood'); }

}

g_features.push( new HideMoods() );



// File: ../kyberia-v31/features/QuickReply.js (2013-12-20 15:46:42)


function QuickReply()
{
	this.name = 'QuickReply';
	this.onLoad = function()
	{
		$('<style>').text('div.node_body { padding-bottom: 18px; }').appendTo('body');

		$('div.node_content').each(function()
		{
			var t = $(this);
			var add = $('<button class="btn_QuickReply">').text('reply');
			add.css({
				'position': 'absolute',
				'top': '2px',
				'right': '24px',
				'margin': '0',
				'vertical-align': 'middle'
			});
			add.appendTo(t);

			add.click(function() {
				var form = t.next('.QuickReply');
				if (form.length) removeForm(form);
				else addForm(t);
				return false;
			});
		});
	};
	///////////////////////////////////////////////

	function removeForm(form)
	{
		form.slideUp(function() {
			form.remove();
		});
	}
	function addForm(content)
	{
		var body = content.find('.node_body');
		var link = content.find('.node_header_title_nodename').attr('href');
		var form = $('<div class="QuickReply">');
		form.css({display: 'block', 'margin-bottom': '50px',
					'margin-top': '10px', 'margin-left': body.css('margin-left')});

		var id = link.match('[0-9]+$');
		if (id) id = id[0];
		if (!id) return;

		var ta = $('<textarea tabindex="1" name="node_content">').appendTo(form);
		ta.css({width: '100%', border: '1px solid #6dae42', height: '50px', 'margin-bottom': '2px'});
		ta.keydown(function(e) {
			if (e.ctrlKey && e.which==13) {
				sendForm(ta, id, body);
				return false;
			}
		});

		var cancel = $('<button tabindex="3">').text('cancel');
		var add = $('<button tabindex="2">').text('add');

		add.click(function() {
			sendForm(ta, id, body);
			return false;
		});

		cancel.add(add).appendTo(form).css({float: 'right'});
		form.append( $('.add_k_cmnt:eq(0)').clone().append('<span> K</span>') );

		form.hide().insertAfter(content).slideDown();
		ta.focus();

		cancel.click(function() { removeForm(form); return false; });
	}
	function sendForm(ta, id, body)
	{
		if (ta.data('sending')) return;
		ta.data('sending', 'yep');

		var data = {node_content: ta.val(), node_parent: id, template_id: 4, event: 'add'};
		ta.prop('disabled', true);
		$.post('/id/'+id, data, function(resp) {
			var html = ta.val();
			var wrap = ta.parent();
			wrap.removeClass('QuickReply').children().remove();

			html = html.replace(/\n/g, '<br>');

			//var html = $(resp).find('#topic').html();
			var node = $('<div>').html(html).appendTo(wrap);
			node.css('border', '1px solid #6dae42');
			node.css('padding', body.css('padding'));
		});
	}

}


g_features.push( new QuickReply() );



// File: ../kyberia-v31/features/LimitNodeHeight.js (2014-01-05 14:32:11)


function LimitNodeHeight()
{
	this.name = 'LimitNodeHeight';
	var arrNodes;
	var checkFor30secs = 30;	// nodes keep loading, so their size also changes..
	this.onLoad = function()
	{
		arrNodes = nodes();
		checkForLongNodes();
	}

	function checkForLongNodes()
	{
		nodes().each(fixLongNode);

		if (checkFor30secs-- > 0)
			setTimeout(checkForLongNodes, 1000);
	}

	function fixLongNode()
	{
		var t=$(this);
		var h = t.height();
		if (h < 1400) return;

		if (t.data('islong')) return;
		if (t.find('textarea').length) return;
		t.data('islong', 1);

		if (t.is('td'))
		{
			var div = $('<div>').append( t.contents() );
			t.append(div);
			t = div;

		}

		t.height(700);

		if (0 && 'UGLY SCROLLBAR')
		{
			t.css('overflow-y', 'scroll');
		}
		if ('SHOW MORE BUTTON')
		{
			var nMore = (h/1000).toFixed(0)*1;
			var expand = $('<div class="kyberia-v31-show-more-button">').html('show '+(nMore>1?nMore+'x':'')+' more');

			expand.css({ position:'absolute', bottom:0, left:0, right: 0, 'text-align':'center',
							'line-height':'40px', cursor:'pointer', background:'#6dae42', color:'#fff',
							'box-shadow': '0 0 10px #000',
			});
			expand.click(function() {
				expand.hide();
				t.css('height', 'auto');
			});

			t.append(expand).css({ position:'relative', overflow: 'hidden' });
		}
	}
	////////////////////////////////////////////////////////////

	function nodes() {
		var nodes = $('.node_body, .k_new_node_body, .k_node_content');
		/*if (!nodes.length)
		{
			$('table.bordered>tbody').each(function() {
				nodes = nodes.add( $(this).find('tr:eq(1)>td:eq(0)[valign=top]') );
			});
		}*/
		return nodes;
	}

}

g_features.push( new LimitNodeHeight() );



// File: ../kyberia-v31/features/LimitNodeWidth.js (2013-10-05 12:16:31)


function LimitNodeWidth()
{
	this.name = 'LimitNodeWidth';
	this.onLoad = function() {
		$('<style>').text('table.bordered { max-width: 800px; } ').appendTo('body');
		$('<style>').text('table.bordered img { max-width: 800px; height: auto !important; } ').appendTo('body');

		// http://kyberia.sk/id/5898094
		$('<style>').text('.item.bordered .content img { max-width: 100%; } ').appendTo('body');
	}

}

g_features.push( new LimitNodeWidth() );



// File: ../kyberia-v31/features/Desocializer.js (2013-08-30 14:56:15)


function Desocializer()
{
	this.name = 'Desocializer';
	this.onLoad = function() {
		avatars().hide();
		usernames().hide();
	}
	/////////////////////////////////////////////////////////

	function avatars() { return $('.node_avatar').add('img[src^="/images/nodes/"]'); }
	function usernames() {
		var a = $('a.node_login').add('tr#sidebar_owner a');
		var inK = $('a:eq(2)', 'table.bordered td.header');
		return a.add(inK);
	}

}

g_features.push( new Desocializer() );



// File: ../kyberia-v31/features/StopAvatars.js (2013-08-30 14:57:08)


function StopAvatars()
{
	this.name = 'StopAvatars';
	this.onLoad = function() {
		avatars().freezeGif();
	}
	////////////////////////////////////////////////////////////

	function avatars() { return $('.node_avatar').add('img[src^="/images/nodes/"]'); }

	$.fn.freezeGif = function()
	{
		this.load(function(e) {
			var t = $(this)[0];
			freezeGif(t);
		});
		return this;
	}

	function freezeGif(gifElem)
	{
		if (!gifElem.complete) console.log('yep');
		var i = gifElem;
	    var c = document.createElement('canvas');
	    var w = c.width = i.width;
	    var h = c.height = i.height;
	    c.getContext('2d').drawImage(i, 0, 0, w, h);
	    try
	    {
	        i.src = c.toDataURL("image/gif"); // if possible, retain all css aspects
	    }
	    catch(e)
	    {
	    	// cross-domain -- mimic original with all its tag attributes
	        for (var j = 0, a; a = i.attributes[j]; j++)
	            c.setAttribute(a.name, a.value);

	        i.parentNode.replaceChild(c, i);
	    }
	}
}

g_features.push( new StopAvatars() );



// File: ../kyberia-v31/features/DeleteButton.js (2013-10-25 12:22:20)


function DeleteButton()
{
	this.name = 'DeleteButton';
	this.onLoad = function()
	{
		$('[value=delete]').click(function() {
			if (!confirm('su veci na ktore mas pravo, are you sure?')) return false;

			var btn = $(this);
			var nodes = $('[name="node_chosen[]"]:checked');
			var arrIds = [];

			if (nodes.length)
			{
				nodes.each(function() {
					arrIds.push( $(this).val() );
				});
			}
			else
			{
				var id = idFromHref(window.location.href);
				if (!id) return;
				arrIds.push( id );
			}


			var data = {new_parent:123456, 'event':'set_parent', 'node_chosen':arrIds};
			$.post(actionOf(btn), data, function()
			{
				if (nodes.length) {
					nodes.each(function() {
						$(this).prop('checked', false).parents('.lvl').eq(0).slideUp();
					});
				}
				else {
					window.location = window.location;
				}
			});

			return false;
		});
	}
	////////////////////////////////////////////////////////////

	function actionOf(btn) { return btn.parents('form').eq(0).attr('action'); }

}

g_features.push( new DeleteButton() );



// File: ../kyberia-v31/features/TagUsers.js (2014-01-18 23:47:19)


function TagUsers()
{
	this.name = 'TagUsers';
	this.onLoad = function() {
		taglist_loader();
		tag_users();
	}
	////////////////////////////////////////////////////////////

	function taglist_loader() {
		var btnLoad = $('a.v31-tagusers-list');
		if (!btnLoad.length) return;
		btnLoad.click(function() {
			var list = $('div.v31-tagusers-list').text().replace(/[ \t\n\r]+/g, ' ');
			list = $.trim(list);

			var orig = getFeatureValue('TagUsers');
			var list = orig+' '+list;

			var msg = 'Do you want to append new tagged users?\n'+
						'Original tag-list: '+orig+'\n\n'+
						'You can customize the new tag-list below:';
			if (list = prompt(msg, list))
				setFeatureValue('TagUsers', list);
		});

	}

	function tag_users() {
		var filter = getFeatureValue('TagUsers');
		if (!filter) return;
		var names = filter.split(/[ \t\n\r]/);
		for (var i=0; i < names.length; i++)
		{
			var name = $.trim(names[i]);
			if (!name) continue;
			var arr = name.split(':', 2);
			var id = arr[0];
			var user = arr[1];

			usernames().each(function() {
				var href = $(this).attr('href');
				if (!href) return;

				var re = new RegExp('\/id\/'+RegExp.escape(id)+'$');
				var re2 = new RegExp("'"+RegExp.escape(id)+"'");
				if (href.match(re) || href.match(re2)) {
					var changed_nick = $(this).text();
					$(this).html( user ).append( $('<sup class="v31_original_name">').text(changed_nick) );
				}
			});
		}
	}
	function usernames() {
		var a = $();
		a = a.add('a.node_login, a.node_creator, tr#sidebar_owner a');

		var inK = $('a:eq(2)', 'table.bordered td.header');
		a = a.add(inK);

		var inMail = $('a:eq(0), a:eq(1)', '#formular .message .header');
		a = a.add(inMail);

		return a;
	}
}

g_features.push( new TagUsers() );



// File: ../kyberia-v31/features/MailUpgrade.js (2014-01-18 23:54:18)


function MailUpgrade()
{
	this.name = 'MailUpgrade';
	this.onLoad = function() {
		MailUpgrade_OLD_BORDEL();
	}
	////////////////////////////////////////////////////////////

}

function MailUpgrade_OLD_BORDEL()
{

	var in_mail_24 = window.location.pathname.match(/^\/id\/24\/?$/);

	if (in_mail_24) ready();

///////////////////////////////////////////////////////////////////////////////////////////
function ready()
{
	Array.prototype.swap = function(a, b)
	{
		var tmp = this[a];
		this[a] = this[b];
		this[b] = tmp;
	}

	Array.prototype.addUnique = function(e, fn)
	{
		for (var i=0; i < this.length; i++)
		{
			if (this[i] == e)
				return;
		}
		this.push(e);
		if (fn) fn(e);
	}
	Array.prototype.bringToFront = function(e)
	{
		var pos = this.indexOf(e);
		this.splice(pos, 1);
		this.splice(0, 0, e);
	}

	$.fn.firstN = function(n)
	{
		return this.slice(0, n);
	}

	$.fn.csss = function(s)
	{
		var arr = s.split(';');
		var a = {};
		for (var i=0; i < arr.length; i++)
		{
			var name_val = arr[i];
			name_val = name_val.split(':');
			if (name_val.length!=2)
				continue;

			var name = $.trim( name_val[0] );
			var val = $.trim( name_val[1] );

			if (!name || !name.length)
				continue;

			a[name] = val;
		}
		return this.css( a );
	}

	var voSvojomProfile = (window.location.pathname == '/id/'+My_ID());

	// check only visible, and prevent default checking functionality
	$('input[value*="check_all"]').removeAttr('onclick')
	$('input[value*="check_all"]').click( function(e)
	{
		var check = ($(this).val() == 'check_all');

		var visible_checkboxes = $('.message:visible .mail_checkbox');
		visible_checkboxes.prop('checked', check);		// nechapem celkom preco to tu je prevratene

		$(this).val( check ? 'uncheck_all' : 'check_all' );

		e.preventDefault();
	});

	// prevent any accidents of deleting hidden messages
	$('input[value="delete_mail"]').click( function(e)
	{
		var hidden_checks = $('.message:hidden .mail_checkbox:checked');
		if (hidden_checks.length)
		{
			if( !confirm("Some of the hidden messages are selected. Are you sure you want them removed too?\n(press 'cancel' to reveal all checked mails)"))
			{
				hidden_checks.parents('.message').show();
				e.preventDefault();
			}
		}
	});

	var arr=[];
	var online=[];
	var nicks=[];

	$('.message').each( function()
	{
		var msg = $(this);
		var n = getNicks( msg );

		// save nicknames for chngto(..)
		nicks['_'+n[0]] = n[2];
		nicks['_'+n[1]] = n[3];

		function checkOnline_() { checkOnline(msg, online); }

		arr.addUnique( n[0], checkOnline_ );
		arr.addUnique( n[1], checkOnline_ );

		msg.addClass( 'mailing_'+n[0] );
		msg.addClass( 'mailing_'+n[1] );

	});


	var icons = $('<div id="mailing_icons">').csss('clear: both; overflow: hidden; margin: 0 0 10px 60px;');
	$('#mail_form').after( icons );

	// online users go first
	$.each(online.reverse(), function()
	{
		var id = this+'';
		arr.bringToFront(id);
	});

	// user's own id goes totally first
	arr.bringToFront( My_ID() );
	online.push( My_ID() );	// show as online

	$.each(arr, function()
	{
		var id = this + '';
		var img = getImg( id );
		icons.append(img);

		img.click( function()
		{
			chngto_(nicks['_'+id], id);

			$('.message').hide();
			$('.message.mailing_'+id).show();
		});

		img.hover(
			function() { $(this).csss('margin-top: 2px; margin-bottom: -2px'); },
			function() { $(this).csss('margin-top: 0; margin-bottom: 0;'); }
		);

		if ($.inArray(id, online) >= 0)
			img.csss('border-top: 6px solid #6dae42;');
		else
			img.csss('border-top: 6px solid #a00;');
	});

}
//////////////////////////////////////////////////////////////////////////////



function checkOnline(msg, online)
{
	var a = msg.find('a').firstN(4);

	var loc = a.filter('a[title]');
	if (!loc || !loc.length)
		return;

	for (var i=0; i < loc.length; i++)
	{
		var L = $(loc[i]);
		var id = extractHrefId( L.prev('a') );
		online.addUnique(id);
	}
}



function getImg(id)
{
	var src = '/images/nodes/' + id.substr(0, 1) + '/' + id.substr(1, 1)+'/' + id + '.gif';
	var i = $('<img width="50" src="'+src+'" class="mail_avatar" style="float:left; margin-left:5px;">');
	i.css('cursor', 'pointer');
	return i;
}

function extractHrefId(anchor)
{
	return anchor.attr('href').match(/([0-9]+)\'\)$/)[1];
}
function getNicks(msg)
{
	var a = msg.find('.header a:not([title])');
	var id1 = extractHrefId( a.eq(0) );
	var id2 = extractHrefId( a.eq(1) );
	var $nick1 = a.eq(0);
	var $nick2 = a.eq(1);
	var nick1 = $nick1.text();
	var nick2 = $nick2.text();
	$nick1 = $nick1.find('sup.v31_original_name');
	$nick2 = $nick2.find('sup.v31_original_name');

	if ($nick1.length) nick1 = $nick1.text();
	if ($nick2.length) nick2 = $nick2.text();

	return [id1, id2, nick1, nick2];
}


//////////////////////////////////////////////////////////////////////////////////////////
// from kybca, but using jquery coz it didnt work for some reason..
function chngto_(name,id) {

    $('#formular input[name="mail_to"]').val( name );
	var src = '/images/nodes/' + id.substr(0, 1) + '/' + id.substr(1, 1)+'/' + id + '.gif';
    $('.icoImg[name="fricon"]').attr(src);
}
//////////////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

function My_ID()
{
	// vytiahnut z headera, v ktorom by mala byt pouzita templata 'configure'
	var href = $('a[href$="1961033"]').not('[href^="/id/19"]').eq(0).attr('href');
	var id = href.match(/\/([0-9]+)\/[0-9]+$/)[1];
	return id;
}

function ASSERT(b, err)
{
	if (!b) alert(err?err:'');
}






}
g_features.push( new MailUpgrade() );



// File: ../kyberia-v31/features/InplaceEditing.js (2014-01-04 13:33:23)


function InplaceEditing()
{
	this.name = 'InplaceEditing';
	this.onLoad = function() {
		$('.node_header_title_conf').each(function()
		{
			var conf = $(this);
			var content = conf.parents('.node_content:eq(0)');
			var body = content.find('.node_body');
			$('<style>').text('.node_body { padding-bottom: 18px; }').appendTo('body');

			var link = content.find('.node_header_title_nodename').attr('href');
			var buttons = $('<div class="InplaceEdit">').appendTo(content);
			buttons.css({position: 'absolute', bottom: '1px', right: '50px'})
			var edit = $('<button onclick="return false">').text('edit');
			var save = $('<button tabindex="2">').text('save').hide();
			var cancel = $('<a href="#" tabindex="3">').html('&nbsp; cancel').hide();

			buttons.append(edit).append(save).append(cancel);

			edit.click(function() {
				editNodeBody(body);
				save.add(cancel).show();
				edit.hide();
				return false;
			});
			save.click(function() {
				saveNodeBody(body, link);
				save.add(cancel).hide();
				edit.show();
				return false;
			});
			cancel.click(function() {
				cancelNodeBody(body);
				save.add(cancel).hide();
				edit.show();
				return false;
			});
		});
	}
	////////////////////////////////////////////////////////////

	function editNodeBody(body)
	{
		var ta = $('<textarea tabindex="1">');
		var w = body.width();
		var h = body.height() * 1.1 + 40;
		ta.add(body).width(w).height(h);

		ta.css('font-family', body.css('font-family'));
		ta.css('font-size', body.css('font-size'));
		ta.css('color', body.css('color'));
		ta.css('background', body.css('background'));
		ta.css('border', body.css('border'));
		ta.css('margin-top', '15px');
		ta.css('margin-bottom', '25px');

		body.data('orig-padding', body.css('padding'));
		body.css('padding', '0');

		body.find('.kyberia-v31-show-more-button').remove();
		body.data('orig-html', body.html());
		var html = body.html().replace(/<br>\n/g, '\n');
		ta.val( $.trim(html) );
		body.html('');
		body.append(ta);
		ta.focus();
	}

	function cancelNodeBody(body)
	{
		body.find('textarea').remove();
		body.html( body.data('orig-html') );
		body.css({width: 'auto', height: 'auto', padding: body.data('orig-padding')});
	}
	function saveNodeBody(body, link)
	{
		var ta = body.find('textarea');
		var html = ta.val();
		$.post(link, {event: 'configure_content', node_content: html}, function(resp) {
			ta.remove();
			var html = $(resp).find('#topic').html();
			body.html(html);
			body.css({width: 'auto', height: 'auto', padding: body.data('orig-padding')});
		});
	}

}


g_features.push( new InplaceEditing() );



// File: ../kyberia-v31/features/Cyrilliser.js (2014-02-18 07:12:03)



function Cyrilliser()
{
	this.name = 'Cyrilliser';
	this.onLoad = function()
	{
		var cyrillic = '';
		var latin	= '';

		cyrillic	+= '	ю	я	ю	я	х	г';
		latin		+= '	ju	ja	iu	ia	ch	h';

		cyrillic	+= '	а	б	в	г	д	е	ё	ж	з	и	й	к	л	м	н	о	п';
		latin		+= '	a	b	v	g	d	e	ë	ž	z	i	j	k	l	m	n	o	p';

		cyrillic	+= '	р	с	т	у	ф	х	ц	ч	ш	щ	ъ	ы	ь	э';
		latin		+= '	r	s	t	u	f	x	c	č	š	šč	´	y	´	è'

		cyrillic	+= '	и	д	л	л	нь	р	рь	ть	у	у	у	у	ы';
		latin		+= '	í	ď	ĺ	ľ	ň	ŕ	ř	ť	ú	ü	ű	ů	ý'

		cyrillic	= $.trim(cyrillic).split('\t');
		latin		= $.trim(latin).split('\t');

		var map = {};
		for (var i=0; i < latin.length; i++)
			map[ latin[i] ] = cyrillic[i];

		alphabetConversionAllHtml(map);
	}
}

g_features.push( new Cyrilliser() );



// File: ../kyberia-v31/features/Hiraganiser.js (2014-02-18 07:11:45)


function Hiraganiser()
{
	this.name = 'Hiraganiser';
	this.onLoad = function()
	{
		/*
			ch	č
			sh	š
			ky	kj
			ny	nj
			my	mj
			ry	rj
			gy	gj
			by	bj
			py	pj
			ts	c
		*/
		var map = {
			'shi':	'し',	'sha':	'しゃ',	'shu':	'しゅ',	'sho':	'しょ',
			'chi':	'ち',	'cha':	'ちゃ',	'chu':	'ちゅ',	'cho':	'ちょ',
							'kya':	'きゃ',	'kyu':	'きゅ',	'kyo':	'きょ',
							'nya':	'にゃ',	'nyu':	'にゅ',	'nyo':	'にょ',
							'hya':	'ひゃ',	'hyu':	'ひゅ',	'hyo':	'ひょ',
							'mya':	'みゃ',	'myu':	'みゅ',	'myo':	'みょ',
							'rya':	'りゃ',	'ryu':	'りゅ',	'ryo':	'りょ',
							'gya':	'ぎゃ',	'gyu':	'ぎゅ',	'gyo':	'ぎょ',
							'bya':	'びゃ',	'byu':	'びゅ',	'byo':	'びょ',
							'pya':	'ぴゃ',	'pyu':	'ぴゅ',	'pyo':	'ぴょ',
											'tsu':	'つ',

			'ka':	'か',	'ki':	'き',	'ku':	'く',		'ke':	'け',	'ko':	'こ',
			'na':	'な',	'ni':	'に',	'nu':	'ぬ',	'ne':	'ね',	'no':	'の',
			'ma':	'ま',	'mi':	'み',	'mu':	'む',	'me':	'め',	'mo':	'も',
			'ra':	'ら',	'ri':	'り',	'ru':	'る',	're':	'れ',	'ro':	'ろ',
			'ga':	'が',	'gi':	'ぎ',	'gu':	'ぐ',	'ge':	'げ',	'go':	'ご',
			'ba':	'ば',	'bi':	'び',	'bu':	'ぶ',	'be':	'べ',	'bo':	'ぼ',
			'pa':	'ぱ',	'pi':	'ぴ',	'pu':	'ぷ',	'pe':	'ぺ',	'po':	'ぽ',
			'sa':	'さ',					'su':	'す',	'se':	'せ',	'so':	'そ',
			'wa':	'わ',	'wi':	'ゐ',					'we':	'ゑ',	'wo':	'を',
			'ha':	'は',	'hi':	'ひ',					'he':	'へ',	'ho':	'ほ',
			'za':	'ざ',					'zu':	'ず',	'ze':	'ぜ',	'zo':	'ぞ',
			'ja':	'じゃ',	'ji':	'じ',	'ju':	'じゅ',					'jo':	'じょ',
			'ta':	'た',									'te':	'て',	'to':	'と',
			'ya':	'や',									'yu':	'ゆ',	'yo':	'よ',
			'da':	'だ',									'de':	'で',	'do':	'ど',
											'fu':	'ふ',

			'a':	'あ',	'i':	'い',	'u':	'う',	'e':	'え',	'o':	'お',

			// FAKES
			// tsu
			'c':	'つ',
			// fu
			'f':	'ふ',
			// *o
			'k':	'こ',
			'n':	'の',
			'm':	'も',
			'r':	'ろ',
			'l':	'ろ',
			'g':	'ご',
			'b':	'ぼ',
			'p':	'ぽ',
			's':	'そ',
			'w':	'を',
			'v':	'を',
			'h':	'ほ',
			'z':	'ぞ',
			'j':	'よ',	// yo
			't':	'と',
			'y':	'よ',
			'd':	'ど',
		};

		function copyAllKeysByValue(mapFrom, mapTo, val) {
			for (var k in mapFrom)
				if (mapFrom.hasOwnProperty(k) && mapFrom[k]===val)
					mapTo[k] = val;
		}
		var chars = getFeatureValue('Hiraganiser');
		chars = $.trim(chars);
		chars = chars.split(' ');
		if (chars.length)	// only those characters will be used..
		{
			var mapSubset = {};
			for (var i=0; i < chars.length; i++)
				copyAllKeysByValue(map, mapSubset, chars[i]);

			map = mapSubset;
		}

		alphabetConversionAllHtml(map, 'remove diacritics', 'replace y');
	}
}

g_features.push( new Hiraganiser() );



// File: ../kyberia-v31/features/CompactMode.js (2014-01-13 09:08:37)


function CompactMode()
{
	this.name = 'CompactMode';
	this.onLoad = function()
	{
		applyCompactMode();
		applyFlatThreads();
	}
	////////////////////////////////////////////////////////////


	// FLAT THREADS
	function applyFlatThreads()
	{
		$('.node_body').css({background: 'none'});
		$('.lvl > ul').each(function() {
			var li = $(this).find('> li');
			if (li.length == 1)
				li.addClass('FlatThreads-chat');
			else
				li.addClass('FlatThreads-post');
		});

		var style = "\
			.FlatThreads-chat					{ padding-left: 0 !important; }\
			.FlatThreads-chat > .node_content	{ border: 1px solid #333; margin-top: -1px; }\
			.FlatThreads-post > .node_content	{ margin-top: 20px; margin-bottom: 0px; }\
		";
		$('<style>').text(style).appendTo('body');
	}


	// COMPACT MDOE
	function applyCompactMode()
	{
		var style = "\
			.compact-mode.header_skip	{ position: absolute; width: 50px;\
											left: -53px; top: 0; bottom: 0; cursor: s-resize; }\
			.compact-mode.header_skip:hover { background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAVCAYAAAAElr0/AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sDExYsLKJjHGIAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAABMUlEQVRYw+2W0XLCIBBF726ICUH//z/bIGDA7YuNZjSWOuJQpzuzDxkgh1x2uSEAgjcIBoCdMTcHdd8/DVSawfcGnffFlXwWQ10+DFojHA5IKWFrDJgIH+O4UPUoAmaGcw4xpZsv7bsOrVKYYoQPAa9g8OURT9OEdFo4WguRZfsQEfbOYbQWfdetqtMqhU9rrz6iJIMBgJjRNM2Pxycic4JodZ4PAWYYsGnb8wYLMxgA5HicFaA7ECKaE7J+2U0xwu736Dab8wYLMxY94kKAPtWw7ns0TYOtMfDeI6YEEcGg9Vy/a2GGAUyEKcbr5i7IkNzcGSO/mf9IPspgvEnQWzl7zY6dyyhWWq/+K1C1O3Yug2t37FwG1+7YuQyu3bFzGepbrZodO4eB2h3739n/anwBxaTrznAxNmsAAAAASUVORK5CYII=); }\
			.compact-mode.header_bg		{ background: #333; position: absolute; width: 105px;\
											left: 1px; top: 1px; bottom: 1px; }\
			.compact-mode.node_header	{ float: left; width: 95px; margin: 0; background: none;\
											padding-left: 8px; padding-top: 5px; }\
			x.compact-mode.node_header	{ position: absolute; width: 95px; margin: 0; background: #333;\
											top: 1px; bottom: 1px; left: 1px;\
											padding-left: 8px; padding-top: 5px; }\
			.compact-mode.node_body		{ margin-left: 110px; padding: 10px 5px; position: relative; }\
			.compact-mode.node_body img	{ max-width: 100%; }\
			.compact-mode.node_content	{ margin-bottom: 0; margin-top: 0; display: block; \
											clear: both; }\
			.compact-mode.node_avatar	{ top: 0; left: 0; position: static; vertical-align: middle; \
											width: 25px; max-height: 25px; }\
			.compact-mode.lvl			{ padding-top: 0; border-left: none; }\
			.compact-mode.level1		{ border-bottom: none; margin-top: 20px; }\
			.compact-mode.hidden_header	{ position: absolute; top: -2px; left: 110px; font-size: 10px; \
											color: #555; z-index: 1; }\
			.node_header_title			{ position: absolute; right: 70px; top: -2px; }\
			.node_header_title_nodename { font-size: 10px; }\
			.quickK						{ position: absolute; right: -1px; top: 0; }\
			.quickK input				{ margin: 0; }\
			.node_header .node_login	{ word-break: break-word; }\
			iframe.youtube-player		{ max-width: 100%; }\
		";
		$('<style>').text(style).appendTo('body');
		$('.node_header, .node_body, div.node_content').addClass('compact-mode');
		$('.node_avatar, .node_avatar, .lvl, .level1').addClass('compact-mode');

		// remove useless elements
		$('.vector, .descendants_link, .node_header_level').hide();
		$('.actionToggleThread').remove();	// hide didnt work

		// header - hidden elements
		$('.node_header').each(function()
		{
			var header = $(this);
			var content = header.parent();
			var body = content.find('.node_body');

			var bg = $('<div>').addClass('compact-mode header_bg').prependTo(content);	// just bg color
			var skip = $('<div>').addClass('compact-mode header_skip').prependTo(content);
			skip.attr('title', 'skip');

			var hidden = $('<div>').prependTo(content);
			hidden.addClass('compact-mode hidden_header')

			$('input[type=checkbox], .node_header_created, .node_header_modified, .childVector', header).appendTo(hidden);
			var hover = $('.node_header_title', header).appendTo(content);

			hover = hover.add(hidden).add('.InplaceEdit, .quickK, .btn_QuickReply', content);
			hover.hide();

			content.mouseenter(function() { hover.show(); });
			content.mouseleave(function() { hover.hide(); });

			skip.click(function(e) {
				var next = content.parents('.lvl:eq(0)').next();
				animScrollTop_ToNext(content, next);
			});
			content.append('<div style="clear: left; height: 0; line-height: 0;">');
		});
	}

}

g_features.push( new CompactMode() );





})();