// ==UserScript==
// @name           Improve Rex Swain's HTTP Viewer
// @namespace      http://userscripts.org/users/useridnumber
// @description    Adds a list of default user-agents, including Googlebot, to Rex Swain's online HTTP Viewer application.
// @require        http://usocheckup.dune.net/71695.js
// @include        http://www.rexswain.com/httpview.html
// ==/UserScript==

function changeUserAgentBoxValue() {
	userAgentBox.value = sel.value;
}

var sel = document.createElement('select');
sel.id = "userAgentSelect";
addOpt(sel, '(choose a default option from below)');
addOpt(sel, 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)');
addOpt(sel, 'msnbot/1.0 (+http://search.msn.com/msnbot.htm)');
addOpt(sel, 'Mozilla/5.0 (compatible; Yahoo! Slurp; http://help.yahoo.com/help/us/ysearch/slurp)');
addOpt(sel, 'Mozilla/2.0 (compatible; Ask Jeeves/Teoma)');
addOpt(sel, 'Mozilla/5.0 (compatible; ScoutJet; +http://www.scoutjet.com/)');
addOpt(sel, 'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; .NET CLR 2.0.50727)');
addOpt(sel, 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)');
addOpt(sel, 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)');
addOpt(sel, 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.1.1) Gecko/20090715 Firefox/3.5.1');
addOpt(sel, 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US) AppleWebKit/532.5 (KHTML, like Gecko) Chrome/4.0.249.89 Safari/532.5');
addOpt(sel, 'Opera/9.25 (Windows NT 6.0; U; en)');

sel.addEventListener("change", changeUserAgentBoxValue, true);

var userAgentBox = document.getElementsByName('uag')[0];
sel.style.width = userAgentBox.clientWidth;

userAgentBox.parentNode.appendChild(document.createElement('br'));
userAgentBox.parentNode.appendChild(sel);

function addOpt(sel, txt) {
	var opt = document.createElement("option");
	opt.text = txt;
	opt.value = txt;
	if (document.all && !window.opera) sel.add(opt);
	else sel.add(opt, null);
}
