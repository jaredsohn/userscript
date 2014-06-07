// ==UserScript==
// @name           No Google Search Redirect
// @version        1.4
// @author         danei
// @run-at         document-start
// @grant          GM_addStyle
// @grant          GM_getValue
// @grant          GM_setValue
// @include        http://www.google.*/*
// @include        https://www.google.*/*
// @include        http://ipv6.google.*/*
// @include        https://ipv6.google.*/*
// @include        http://encrypted.google.com/*
// @include        https://encrypted.google.com/*
// @include        http://news.google.*/*
// @include        https://news.google.*/*
// @include        http://maps.google.*/*
// @include        https://maps.google.*/*
// @include        http://ditu.google.*/*
// @include        https://ditu.google.*/*
// @include        http://mail.google.*/*
// @include        https://mail.google.*/*
// ==/UserScript==

window.setTimeout(function() {
	if (GM_getValue('open_in_new_tab') === undefined) {
		GM_setValue('open_in_new_tab', true);
	}
}, 0);

function Hash(str) {
	var hash = 0,
		i, char;
	if (str.length == 0) return hash;
	for (i = 0; i < str.length; ++i) {
		char = str.charCodeAt(i);
		hash = ((hash << 5) - hash) + char;
		hash = hash & hash; // Convert to 32bit integer
	}
	return hash;
}
var Id2Funcs = {};

function DomNodeInserted(selector, func) {
	var id = 'nodeInserted' + Hash(selector);
	if (id in Id2Funcs) {
		ls = Id2Funcs[id].push(func);
	} else {
		var css = "@keyframes " + id + "{\
			from{clip: rect(1px, auto, auto, auto);}\
			to{clip: rect(0px, auto, auto, auto);}\
		}"
		GM_addStyle(css);
		css = selector + "{\
			animation-duration: 0.001s;\
			animation-name:" + id + ";\
		}";
		GM_addStyle(css);
		Id2Funcs[id] = [func];
	}
}
document.addEventListener('animationstart', function(evt) {
	if (evt.animationName in Id2Funcs) {
		var id = evt.animationName;
		for (var i = 0; i < Id2Funcs[id].length; ++i) {
			Id2Funcs[id][i](evt.target);
		}
	}
}, false);

function endsWith(str, suffix) {
	return str && str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function startWith(str, prefix) {
	return str && str.indexOf(prefix) == 0;
}

function contain(str, p) {
	return str && str.indexOf(p) !== -1;
}

function open_in_new_tab(node) {
	window.setTimeout(function() {
		if (GM_getValue('open_in_new_tab')) {
			// console.log('in!',node.href);
			if (!node.hasAttribute('target')) node.setAttribute('target', '_blank');
		}
	}, 0);
}

function splitURL(href) {
	var result = {};
	href.replace(/:\/\/([^\/?#]+)([^?#]*\/)([^?#]*)/, function(m, domain, path, file) {
		result.domain = domain, result.path = path, result.file = file;
	});
	return result;
}

function getQueryParams(query) {
	var vars = {};
	query.replace(/[?&]+([^=&]+)=([^&]*)/g, function(m, key, value) {
		vars[key] = decodeURIComponent(value);
	});
	return vars;
}

function trim_params(href) {
	return href.replace(/\?.+$/, '');
}

function test_url(href) {
	return href && href.indexOf("://") !== -1;
}

function stop(e) {
	e.stopPropagation();
	e.stopImmediatePropagation();
}

function clear(node, domain_pattern, path_pattern, file_pattern, param_pattern) {
	if (node.getAttribute('onmousedown')) {
		node.removeAttribute('onmousedown');
		open_in_new_tab(node);
	}
	var k = splitURL(node.href);
	var domain = k.domain,
		path = k.path,
		file = k.file;
	if (domain && path && file && node.href && domain.match(domain_pattern) && path == path_pattern && file == file_pattern) {
		var realhref = getQueryParams(node.href)[param_pattern];
		if (realhref && test_url(realhref)) {
			//console.log(node.href);
			node.href = realhref;
			open_in_new_tab(node);
		}
	}
}

function trim_search() {
	function run(node) {
		clear(node, /\.google\./, '/', 'url', 'url');
		clear(node, /\.google\./, '/', 'url', 'q');
		clear(node, /\.google\./, '/', 'interstitial', 'url');
	}
	document.addEventListener("DOMContentLoaded", function() {
		if (document.body && !document.body.hasAttribute("id")) {
			var list = document.querySelectorAll('body a');
			for (var i = 0; i < list.length; ++i) {
				run(list[i]);
			}
		}
	}, false);
	DomNodeInserted("#ires a,#rhs_block a", run);
}
var pic_map = {};

function trim_image() {
	var run = function(node) {
		var h = node.href;
		if (h) {
			var k = getQueryParams(h);
			var orihref = k.imgurl,
				refhref = k.imgrefurl;
			if (orihref && refhref) pic_map[orihref] = refhref;
		}
		clear(node, /\.google\./, '/', 'imgres', 'imgurl');
	}
	document.addEventListener("DOMContentLoaded", function() {
		if (document.body && !document.body.hasAttribute("id")) {
			var list = document.querySelectorAll('body a');
			for (var i = 0; i < list.length; ++i) {
				run(list[i]);
			}
		}
	}, false);
	var clear_trim = function(event) {
		var node = event.target;
		if (event.attrName == 'href') node.href = trim_params(node.href);
	}
	DomNodeInserted('#rg_hta,#rg_hl', function(node) {
		node.addEventListener('DOMAttrModified', clear_trim, false);
	});
	//	mordern 2

	function fix(node) {
		// console.log(node.href,'fixed');
		clear(node, /\.google\./, '/', 'url', 'url');
		clear(node, /\.google\./, '/', 'imgres', 'imgurl');
		if (node.hasAttribute('replaced')) return;
		var newnode = node.cloneNode(true);
		open_in_new_tab(newnode);
		// if(/*GM_getValue('open_in_new_tab') &&*/ !newnode.hasAttribute('target'))newnode.setAttribute('target','_blank')
		// console.log(node.href,'replaced!');
		newnode.addEventListener("click", stop);
		newnode.addEventListener("mousedown", stop);
		newnode.addEventListener("keydown", stop);
		newnode.addEventListener("blur", stop);
		newnode.addEventListener('DOMAttrModified', function() {
			// console.log(this.href,'modified!');
			fix(this);
		})
		newnode.setAttribute('replaced', '1');
		node.parentNode.replaceChild(newnode, node);
	}
	DomNodeInserted("#irc_mil,#irc_itl,#irc_hol,#irc_vpl,#irc_fsl,#ires a.irc_fsl,#ires a.irc_vpl,#ires a.irc_itl", fix);
}

function add_link() {
	var parser_link = function(attachnode, orinode) {
		var n = attachnode.getElementsByTagName('a');
		if (n.length == 0) {
			var url = attachnode.innerHTML;
			attachnode.innerHTML = '<a>' + url + '</a>';
			open_in_new_tab(attachnode);
		}
		var r = getQueryParams(orinode.href).imgurl || orinode.href;
		var refhref = (r && pic_map[r]) || ('http://' + n[0].innerHTML);
		attachnode.getElementsByTagName('a')[0].href = refhref;
	}
	document.addEventListener("DOMContentLoaded", function() {
		var classic_pic_url = document.querySelectorAll('a+font>font')
		for (var i = 0; i < classic_pic_url.length; ++i) {
			var n = classic_pic_url[i];
			var ahref = n.parentNode.parentNode.firstChild;
			if (ahref.tagName == 'A') parser_link(n, ahref);
		}
		var classic_pic_url = document.querySelectorAll('#ires cite')
		for (var i = 0; i < classic_pic_url.length; ++i) {
			var n = classic_pic_url[i];
			var ahref = n.parentNode.firstChild;
			if (ahref.tagName == 'A') parser_link(n, ahref);
		}
	}, false);
	DomNodeInserted('#rg_hr', function() {
		var highlight = document.getElementById('rg_hr'),
			pop = document.getElementById('rg_hta');
		if (highlight && pop && !highlight.onmouseover) {
			highlight.onmouseover = function() {
				parser_link(highlight, pop);
				highlight.onmouseover = null;
			};
		}
	});
}

function trim_news() {
	if (window.location.hostname.match(/news\.google\./) || (window.location.hostname.match(/\.google\./) && startWith(window.location.pathname, '/news'))) {
		var run = function(node) {
			if (node.getAttribute("originalhref")) {
				node.href = node.getAttribute("originalhref");
			}
		}
		DomNodeInserted('a', function(node) {
			if (test_url(node.href)) {
				run(node);
				node.addEventListener("click", stop);
				node.addEventListener("DOMAttrModified", function() {
					run(this);
				});
			}
		});
	}
}

function trim_mail() {
	if (window.location.hostname.match(/mail\.google\./)) {
		document.addEventListener("DOMContentLoaded", function() {
			var list = document.querySelectorAll(".msg a");
			for (var i = list.length - 1; i >= 0; i--) {
				clear(list[i], /\.google\./, '/', 'url', 'q');
			}
		}, false);

		DomNodeInserted('.h7.ie.nH.oy8Mbf a', function(node) {
			if (test_url(node.href)) {
				node.addEventListener("click", stop);
			}
		});
	}
}

function trim_map() {
	if (window.location.hostname.match(/maps|ditu\.google\./)) {
		DomNodeInserted('#page a', function(node) {
			clear(node, /maps|ditu\.google\./, '/', 'local_url', 'q');
			clear(node, /maps|ditu\.google\./, '/', 'aclk', 'adurl');
		});
	}
}
trim_search();
trim_image();
add_link();
trim_map();
trim_news();
trim_mail();