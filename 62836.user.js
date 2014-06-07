// ==UserScript==
// @name	   Bugzilla: classification and product filter
// @namespace      http://www.ucw.cz/
// @description    Adds filters to bugzilla classification and product list
// @include	   https://bugzilla.novell.com/query.cgi*
// ==/UserScript==

function funcToHTML()
{
	var script = document.createElement("script");
	script.setAttribute("type", "text/javascript");
	var str = "";
	for (var i = 0; i < arguments.length; i++) {
		str += arguments[i].toString() + "\n";
	}
	script.innerHTML = str;
	return script;
}

function addFilter(id)
{
	var select = document.getElementById(id);
	if (!select || select.nodeName.toLowerCase() != "select" ||
	    !select.getAttribute("multiple")) {
		return;
	}
	var before = select;
	var container = select.parentNode;
	while (container.nodeName.toLowerCase() == "label") {
		before = container;
		container = container.parentNode;
	}
	var filter = document.createElement("input");
	filter.setAttribute("type", "text");
	filter.setAttribute("id", id + "-filter");
	filter.setAttribute("onkeyup", "filterList('" + id + "');");
	filter.setAttribute("lastvalue", "");
	container.insertBefore(filter, before);
}

function onFilterChange(id)
{
	var select = document.getElementById(id);
	var filter = document.getElementById(id + "-filter");
	var value = filter.value.toLowerCase();
	var last = filter.getAttribute("lastvalue");
	if (value == last) {
		return;
	}
	filter.setAttribute("lastvalue", value);
	if (window.filter_timeouts[id]) {
		window.clearTimeout(window.filter_timeouts[id]);
	}
	window.filter_timeouts[id] =
		window.setTimeout("filterList('" + id + "')", 500);
}

function filterList(id)
{
	var select = document.getElementById(id);
	var filter = document.getElementById(id + "-filter");
	var keywords = filter.value.toLowerCase().split(/\s+/);
	var options = select.options;
	for (var i = 0; i < options.length; i++) {
		var text = options[i].text.toLowerCase();
		if (filterMatch(text, keywords)) {
			options[i].style.display = "block";
		} else {
			options[i].style.display = "none";
		}
	}
}

function filterMatch(text, keywords)
{
	var words = text.split(/\s+/);
	for (var i = 0; i < keywords.length; i++) {
		var found = 0;
		for (var j = 0; j < words.length; j++) {
			if (words[j].indexOf(keywords[i]) != -1) {
				found = 1;
				break;
			}
		}
		if (!found) {
			return 0;
		}
	}
	return 1;
}

document.body.appendChild(funcToHTML(onFilterChange, filterList, filterMatch));
window.filter_timeouts = {};
addFilter("classification");
addFilter("product");


