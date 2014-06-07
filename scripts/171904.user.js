
// ==UserScript==
// @name        Linkyfier Plus For AutoPager
// @namespace   http:// userscripts.org/users/tommy
// @author      .
// @description Turn plain text URLs into links. Supports http, https, ftp, email addresses
// @version     0.0.2
// @include     *
// @exclude     *google.*/*
// @run-at      document-start
// ==/UserScript==

/**configuration**/
var newTab = true,
	hideReferer = false;

var uri = /((((ftp|https?):\/\/)|www\.)((([-_\w])+\.)+[a-z]{2,5}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/([-a-z\d%_.~+=;\(\)])*)*(\?([;&a-z\d%_.~+=-])*)?(\#([-a-z\d_])*)?|\b([a-z0-9_\\.\\-]+)@([\\da-z\\.-]+)\\.([a-z\\.]{2,6})\b)/i,
	filter = /^(textarea|input|button|select|option|meta|link|noscript|a|html|head|object|embed|script|style|frameset|frame|iframe)$/i,
	ua = navigator.userAgent,
	wK = ua.toLowerCase().indexOf('webkit') > -1;

function walker(root) {
	var tW = document.createTreeWalker(
	root,
	NodeFilter.SHOW_TEXT, {
		acceptNode: function(a) {
			if (!filter.test(a.parentNode.localName) && uri.test(a.data)) return NodeFilter.FILTER_ACCEPT;
		}
	},
	false);
	var list = [];
	while (tW.nextNode()) list.push(tW.currentNode);
	return list;
}

function exec(a) {
	var res = walker(a);
	for (var i in res)(function() {
		linky(res[i]);
	})(res[i])
}

function linky(a) {
	var node = [a];
	while (node.length) {
		var cur = node.pop();
		var m = uri.exec(cur.nodeValue);
		if (!m) {
			continue;
		} else if (m.index == 0) {
			var link = m[0].replace(/[\/|\.]*$/, "");
			if (cur.nodeValue.length > link.length) {
				cur.splitText(link.length);
				node.push(cur.nextSibling);
			}
			a = document.createElement('a');
			a.className = 'linkyfier';
			a.href = (link.indexOf('://') == -1 ? ((link.indexOf('@') > -1) ? "mailto:" : "http://") : "") + link;
			if (newTab) a.target = '_blank';
			if (hideReferer) {
				if (wK) a.rel = 'noreferrer';
				else a.href = 'data:text/html, <meta http-equiv="refresh" content="0;URL=' + encodeURIComponent(a.href) + '" charset="utf-8">';
			}
			cur.parentNode.insertBefore(a, cur);
			a.appendChild(cur);
		} else {
			cur.splitText(m.index);
			node.push(cur.nextSibling);
		}
	}
}

function fixAutopager(){
    var _bodyHeight = document.body.clientHeight;
    var observer = new window.MutationObserver(function(mutations){
        if(document.body.clientHeight > _bodyHeight){
            mutations.forEach(function(mutation){
                for (var i = 0; i < mutation.addedNodes.length; i++) {
                    exec(mutation.addedNodes[i]);
                }
            });
            _bodyHeight = document.body.clientHeight;
        }
    });
    observer.observe(document.body, {childList: true, subtree: true});
}

function init() {
	exec(document.body);

    setTimeout(function(){
        fixAutopager();
    }, 1000);
}

addEventListener('DOMContentLoaded', init, false);