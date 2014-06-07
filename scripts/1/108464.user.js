// ==UserScript==
// @name           Google Literal Mode
// @author         Kyle Lady <kylelady@umich.edu>
// @version        0.2.1
// @description    For those times when you really want all and only the words you entered.
// @copyright      2011, Kyle Lady
// @license        GPLv3; http://www.gnu.org/licenses/gpl.html
// @include        https://*.google.com/*
// @include        https://google.com/*
// @include        http://*.google.com/*
// @include        http://google.com/*
// ==/UserScript==

var literal_prefix = '&nbsp;&nbsp;<a id="literal-mode" style="float: left;" class="gl nobr" href="';
var literal_suffix = '">Literal Mode</a>';

function quotedSplit(str) {
	var result = new Array();
	var term = new String();
	var in_quotes = false;
	for (var i in str) {
		var ch = str.charAt(i);
		if (ch == ' ' && !in_quotes) {
			if (term.length > 0) {
				result.push(term);
				term = new String();
			}
			continue;
		}
		term += ch;
		if (ch == '"') {
			in_quotes = !in_quotes;
		}
	}
	if (term.length > 0) {
		result.push(term);
	}
	return result;
}

function addPluses(query) {
	terms = quotedSplit(query);
	new_terms = Array();
	for (var i in terms) {
		term = terms[i];
		term = '+' + term;
		term = encodeURIComponent(term);
		new_terms.push(term);
	}
	var new_query = '/search?q=' + new_terms.join('+');
	return new_query;
}

function getQuery() {
	var sftab = document.getElementById('sftab');
	if (!sftab) { return null; }
	var inputs = sftab.getElementsByTagName('input');
	if (!inputs || !inputs[0] || !inputs[0].parentNode) { return null; }
	var query_div = inputs[0].parentNode.childNodes[2];
	if (!query_div) { return null; }
	var query = query_div.innerHTML;
	if (!query) { return null; }
	query = query.replace(/&nbsp;/g, ' ');
	return query;
}

var last_url = '';

function addLiteralMode() {
	var subform_ctrl = document.getElementById('subform_ctrl');
	if (!subform_ctrl) { return; }
	var sbfrm_l = subform_ctrl.childNodes[1];
	var already = document.getElementById('literal-mode');
	var url_changed = document.location != last_url;
	console.log(subform_ctrl);
	if (sbfrm_l && (!already || url_changed)) {
		last_url = document.location;
		query = getQuery();
		if (!query) { return; }
		new_url = addPluses(query);
		link_html = literal_prefix + new_url + literal_suffix;
		var literal_mode_tag = document.createElement('a');
		literal_mode_tag.setAttribute('id', 'literal-mode');
		literal_mode_tag.setAttribute('class', 'gl nobr');
		literal_mode_tag.setAttribute('style', 'float:right');
		literal_mode_tag.setAttribute('href', new_url);
		literal_mode_tag.innerHTML = "Literal Mode";
		result_stats = document.getElementById('resultStats');
		result_stats.setAttribute('style', 'float:left');
		sbfrm_l.appendChild(literal_mode_tag);
	}
	if (!sbfrm_l) {
		last_url = '';
	}
}

document.addEventListener("DOMNodeInserted", addLiteralMode, false);
