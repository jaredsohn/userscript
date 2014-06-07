// ==UserScript==
// @name           twitter.AutoPager
// @namespace      http://ss-o.net/
// @version        0.10
// @description    AutoPager for Twitter (Greasemonkey, Opera9.5+ and Google Chrome 2+)
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==

(function autopager(win,loaded){
	if (!loaded && window.opera && document.readyState === 'interactive') {
		document.addEventListener('DOMContentLoaded', function(){autopager(window,true);}, false);
		return;
	}
	if (this.chrome) {
		document.addEventListener('AutoPatchWork.initialized', function(evt){
			var ev = document.createEvent('Event');
			ev.initEvent('AutoPatchWork.terminated', true, true);
			document.dispatchEvent(ev);
		}, false);
	}
	if (window.opera && window.AutoPagerize && AutoPagerize.AutoPagerObject) {
		AutoPagerize.AutoPagerObject.terminate();
	}
	var State = true;
	var HTML_NAMESPACE = 'http://www.w3.org/1999/xhtml';
	var BASE_REMAIN_HEIGHT = 400;
	var FORCE_TARGET_WINDOW = false;
	var TARGET_WINDOW_NAME = '_blank';
	var loading = false;
	var COLOR = {
		on         : '#00ff00',
		off        : '#cccccc',
		loading    : '#00ffff',
		terminated : '#0000ff',
		error      : '#ff00ff'
	};
	var filters = [];
	if (!win.AutoPagerize) {
		win.AutoPagerize = {
			addFilter:function(f) {
				filters.push(f);
			}
		};
	}
	if (FORCE_TARGET_WINDOW)
		filters.push(target_rewrite);
	var ev = document.createEvent('Event');
	ev.initEvent('GM_AutoPagerizeLoaded', true, false);
	document.dispatchEvent(ev);
	var last = get_last_line();
	document.addEventListener('GM_AutoPagerizeNextPageLoaded',function(){
		loading = false;
		icon.style.background = COLOR.on;
		var docs = get_inserted_line(last.id);
		docs.forEach(function(n){
			var ev = document.createEvent('MutationEvent');
			ev.initMutationEvent('AutoPagerize_DOMNodeInserted', true, false, n.parentNode, null, next.href, null, null);
			n.dispatchEvent(ev);
		});
		filters.forEach(function(f){
			f(docs);
		});
		last = get_last_line();
	},false);

	var handle_next, next, insert_point, insert_parent;
	if (get_more()) {
		handle_next = click_more;
	} else if (document.getElementById('pagination')) {
		handle_next = next_page_load;
		next = get_next(document);
		var last_element = get_next_elements(document).pop();
		if (!next || !last_element) return error();
		insert_point = last_element.nextSibling;
		insert_parent = last_element.parentNode;
	} else {
		return;
	}
	window.addEventListener('scroll', function(){
		if (loading) return;
		var remain = document.documentElement.scrollHeight - window.innerHeight - window.pageYOffset;
		if (State && remain < BASE_REMAIN_HEIGHT)
			handle_next();
	}, false);
	var icon = icon_init();

	function click_more(){
		loading = true;
		icon.style.background = COLOR.loading;
		var event = document.createEvent('MouseEvents');
		event.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		if ( (next = get_more()) )
			next.dispatchEvent(event);
		else
			error();
		var f = function(){
			if (next != get_more()) {
				var ev = document.createEvent('Event');
				ev.initEvent('GM_AutoPagerizeNextPageLoaded', true, false);
				document.dispatchEvent(ev);
			} else {
				setTimeout(f,100);
			}
		};
		f();
	}
	// Thx! id:Constellation
	function get_more(){
		return document.getElementById('more') || document.getElementById('search_more');
	}
	function get_last_line(){
		return document.evaluate('id("timeline")/li[last()]|id("lists_table")/tbody/tr[last()]',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	}
	function get_inserted_line(id){
		var x = 'id("timeline")/li[preceding-sibling::li[@id="'+id+'"]]';
		var r = document.evaluate(x,document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
		for (var i = 0,l = r.snapshotLength, res = new Array(l);i<l;i++) res[i] = r.snapshotItem(i);
		return res;
	}
	function error(){
		icon.className += ' error';
		icon.style.background = COLOR.error;
		State = false;
	}
	function terminate(){
		icon.className += ' terminated';
		icon.style.background = COLOR.terminated;
		State = false;
	}
	function target_rewrite(docs){
		docs.forEach(function(doc){
			var as = doc.getElementsByTagName('a');
			for (var i = 0, l = as.length;i < l;i++){
				var a = as[i], _a = a.getAttribute('href');
				if (_a && !/^javascript:/.test(_a) && !/^#/.test(_a))
					a.setAttribute('target',TARGET_WINDOW_NAME);
			}
		});
	}
	function toggle_state(){
		if (State) {
			State = false;
			icon.style.background = COLOR.off;
			icon.style.opacity = 0.5;
		} else {
			State = true;
			icon.style.background = COLOR.on;
			icon.style.opacity = 0.8;
		}
		var className = icon.className || '';
		icon.className = className + ' change';
		setTimeout(function(){
			icon.className = className;
		},500);
	}
	function next_page_load(){
		loading = true;
		icon.style.background = COLOR.loading;
		var url = next.getAttribute('href');
		var x = new XMLHttpRequest();
		x.onload = function() {
			if (x.status <= 200 && x.status < 300) {
				load(x);
			} else {
				error();
			}
		};
		x.open('GET', url, true);
		x.send(null);
	}
	function load(x){
		var html = x.responseText.replace(/<script(?:[ \t\r\n][^>]*)?>[\S\s]*?<\/script[ \t\r\n]*>|<\/?(?:i?frame|html|script|object)(?:[ \t\r\n][^<>]*)?>/gi, ' ');
		var htmlDoc;
		if (document.implementation.createHTMLDocument) {
			htmlDoc = document.implementation.createHTMLDocument('hogehoge')
		} else {
			htmlDoc = document.cloneNode(false);
			if (htmlDoc) {
				htmlDoc.appendChild(htmlDoc.importNode(document.documentElement, false));
			} else {
				htmlDoc = document.implementation.createDocument(null, 'html', null);
			}
		}
		var range = document.createRange();
		range.selectNodeContents(document.documentElement);
		htmlDoc.documentElement.appendChild(range.createContextualFragment(html));
		next = get_next(htmlDoc);
		var docs = get_next_elements(htmlDoc);
		if (!docs.length) return error();
		docs = docs.map(function(doc){
			return insert_parent.insertBefore(document.importNode(doc, true), insert_point);
		});
		loading = false;
		icon.style.background = COLOR.on;
		filters.forEach(function(f){
			f(docs);
		});
		if (!next) return terminate();
	}
	function get_next(doc){
		return doc.evaluate('id("pagination")/a[contains(@rel,"next")]',doc,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	}
	function get_next_elements(doc){
		var r = doc.evaluate('id("follow_grid")/table',doc,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
		for (var i = 0,l = r.snapshotLength, res = new Array(l);i<l;i++) res[i] = r.snapshotItem(i);
		return res;
	}
	function icon_init(){
		var icon = document.createElementNS(HTML_NAMESPACE, 'div');
		icon.id = 'autopagerize_icon';
		var ICON_SIZE = 10;
		var css = [
			'#autopagerize_help {'
				,'margin:0px;'
				,'padding:0 5px;'
				,'font-size:10px;'
				,'background:#ffffff;'
				,'border:none;'
				,'color:#000000;'
				,'text-align:left;'
				,'font-weight:normal;'
				,'line-height:120%;'
				,'font-family:verdana;'
				,'display:none;'
			,'}'
			,'#autopagerize_help p{'
				,'margin:0;'
				,'padding:0 0 3px;'
				,'line-height:1.2;'
			,'}'
			,'#autopagerize_help .toggle{'
				,'float:right;padding:8px;'
			,'}'
			,'#autopagerize_help .autopagerize_status {'
				,'min-width:' + (140 + ICON_SIZE) + 'px;margin:0;padding:3px 0;list-style:none;text-align:left;'
			,'}'
			,'#autopagerize_help .autopagerize_status li{'
				,'margin:3px 0;padding:0;border:none;'
			,'}'
			,'#autopagerize_help .autopagerize_status li span{'
				,'display:inline-block;'
				,'vertical-align:middle;'
				,'margin:0 3px 0 0;'
			,'}'
			,'#autopagerize_help .autopagerize_status li span.autopagerize_icons{'
				,'width:12px;'
				,'height:12px;'
			,'}'
			,'#autopagerize_icon {'
				,'font-size:12px;'
				,'position:fixed;'
				,'top:3px;'
				,'right:3px;'
				,'background:',( State ? COLOR['on'] : COLOR['off']),';'
				,'color:#fff;'
				,'width:',ICON_SIZE,'px;'
				,'height:',ICON_SIZE,'px;'
				,'z-index:1024;'
				,'opacity:0.8;'
				,'overflow:hidden;'
				,'margin:0;'
				,'padding:0;'
			,'}'
			,'#autopagerize_icon:hover {'
				,'overflow:visible;'
				,'width:auto;'
				,'height:auto;'
				,'border:1px solid #cccccc;'
			,'}'
			,'#autopagerize_icon.error:hover,#autopagerize_icon.change:hover {'
				,'overflow:hidden;'
				,'width:',ICON_SIZE,'px;'
				,'height:',ICON_SIZE,'px;'
				,'border:none;'
			,'}'
			,'#autopagerize_icon:hover #autopagerize_help {'
				,'display:block;'
			,'}'
			,'#autopagerize_icon.error:hover #autopagerize_help,#autopagerize_icon.change:hover #autopagerize_help {'
				,'display:none;'
			,'}'
		].join('');
		addCSS(css);
		var helpDiv = document.createElementNS(HTML_NAMESPACE, 'div');
		helpDiv.id = 'autopagerize_help';
		var toggleDiv = document.createElementNS(HTML_NAMESPACE, 'div');
		toggleDiv.className = 'toggle';
		var a = document.createElementNS(HTML_NAMESPACE, 'a');
		a.className = 'autopagerize_link';
		a.textContent = 'on/off';
		a.href = 'javascript:void 0';
		a.addEventListener('click', toggle_state, false);
		toggleDiv.appendChild(a);
		var ul = document.createElementNS(HTML_NAMESPACE, 'ul');
		ul.className = 'autopagerize_status';
		for (var i in COLOR) {
			var li = document.createElementNS(HTML_NAMESPACE, 'li');
			var span = document.createElementNS(HTML_NAMESPACE, 'span');
			var text = document.createElementNS(HTML_NAMESPACE, 'span');
			span.className = 'autopagerize_icons';
			span.style.background = COLOR[i];
			text.textContent = i;
			li.appendChild(span);
			li.appendChild(text);
			ul.appendChild(li);
		}
		helpDiv.appendChild(toggleDiv);
		helpDiv.appendChild(ul);
		icon.appendChild(helpDiv);
		document.body.appendChild(icon);
		return icon;
	}
	function addCSS (css){
		var style = document.createElementNS(HTML_NAMESPACE, 'style');
		style.className = 'userscript_style';
		style.type = 'text/css';
		var root = document.getElementsByTagName('head')[0] || document.body || document.documentElement;
		style.appendChild(document.createTextNode(css));
		return root.appendChild(style);
	}
})(window,0);