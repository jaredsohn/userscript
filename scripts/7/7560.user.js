// ==UserScript==
// @name           Repeat Killer
// @namespace      http://userscripts.org/scripts/show/7560
// @description    Kills repeated words on web pages.
// @include        *
// ==/UserScript==

function fixStyle(css) {

	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);

}

var css = "span.fixed { color: #900000 }";

fixStyle(css);

var xp = document.evaluate("//*[not(*)]", document, null, 6, null);
var re = new RegExp("(.{4,64}?)\\s*((?:\\1\\s*){4,}\\1)");

for (idx = 0; elem = xp.snapshotItem(idx); idx++) {
	var html = elem.innerHTML;

	var match = re.exec(html);
	if (!match) continue;
	var whole = match[0];
	var count = Math.floor((match[2].length/match[1].length)-1);
	var replace = '<span class="fixed" title="' + count + ' skipped">' + match[1] + '</span>';
	html = html.replace(whole, replace);
	elem.innerHTML = html;
}

