// ==UserScript==
// @name           NoveList Link Fixer
// @namespace      http://freecog.net/2006/
// @description    Turns javascript: links on EBSCO NoveList into real ones, so that they can be middle-clicked, etc.
// @include        http://novelst*.epnet.com*
// @version        0.3
// ==/UserScript==


function res_value(name) {
	return encodeURIComponent(document.forms.namedItem('results')
	       .elements.namedItem(name).value);
}


function jump_to_real_url(s) {
	s = s.replace(/<\/?b>/g, '');
	s = s.replace(/=(The|An|Or|And|Not)\+/, '=');
	var sid = res_value('sid');
	if (s.indexOf('rid=') > -1) {
		return 'results.aspx?sid=' + sid + '&control=tr&' + s;
	} else if (s.indexOf('author=') > -1) {
		return 'results.aspx?sid=' + sid +
			'&control=br&searchtype=qbs&tag1=ST&prox=-3&' + s;
	} else {
		return 'results.aspx?sid=' + sid + 
			'&control=br&from=treedoc&searchtype=tree&' + s;
	}
}

function details_to_real_url(js) {
	var m = js.match(/Detail\(\s*'(\d+)',\s*'(\d+)'\s*\)/);
	ui = m[1];
	hitnum = m[2];
	return 'results.aspx?control=bd&sid=' + res_value('sid')
		+ '&booleantext=' + res_value('ctl1:booleanText')
		+ '&fuzzytext=' + res_value('ctl1:fuzzyText')
		+ '&hitnum=' + hitnum + '&ui=' + ui
		+ '&prox=' + res_value('ctl1:prox')
		+ '&sort=' + res_value('ctl1:sort')
		+ '&totalhits=' + res_value('ctl1:totalHits')
		+ '&starthit=' + res_value('ctl1:startHit')
		+ '&displayText=' + res_value('ctl1:displayText')
		+ '&frm=' + res_value('frm');
}

var unhandled = 0;
var a, as = Array.slice(document.getElementsByTagName('a'));
while ((a = as.pop())) {
	if (a.href.indexOf('javascript:jumpToURL(') == 0) {
		var q = a.href.slice(22, -3);
		a.href = jump_to_real_url(q);
	} else if (a.href.match(/^javascript:Detail\(/i)) {
		a.href = details_to_real_url(a.href);
	} else if (a.href.match(/javascript:openDialog\(/i)) {
		a.setAttribute('onclick', a.getAttribute('href').slice(11) + " return false;");
		var m = a.href.match(/openDialog\(('.*?')/);
		try {
			a.href = m[1].slice(1, -1);
		} catch(e) {
			GM_log('Error matching openDialog: ' + e);
		}
	} else if (a.href.match(/javascript:/) &&
	 !a.href.match(/^javascript:AddOneRec\(/) && // The search "folder" is
	 !a.href.match(/^javascript:AddAllRecs\(/)) { // totally JavaScript, and can't be fixed
		GM_log('Unhandled link! -- ' + a.href);
		unhandled++;
	}
}

if (unhandled) {
	GM_log('***  The NoveList Link Fixer found ' + unhandled + ' javascript link(s)');
	GM_log('***  that it can\'t handle.  Please notify me at');
	GM_log('***  http://freecog.net/contact/');
}


// Replace triple question marks in Publishers Weekly reviews
// with em dashes.
const EM_DASH = '\u2014';
const REPLACE = /\?\?\?/g;

function replace_triples(el) {
	var n, ns = Array.slice(el.childNodes);
	while (n = ns.pop()) {
		if (n.nodeType == 1) { // Element
			replace_triples(n);
		} else if (n.nodeType == 3) {
			n.nodeValue = n.nodeValue.replace(REPLACE, EM_DASH);
		} // else: pass
	}
}

var p, ps = Array.slice(document.getElementsByTagName('p'));
while ((p = ps.pop())) {
	if (p.textContent.match(/Publishers Weekly/i)) {
		replace_triples(p);
		break;
	}
}

// Changes:
// 0.3 - "???" now converted em dashes on Publishers Weekly reviews
// 0.2 - "details" links now fixed
// 0.1 - Initial release
