// ==UserScript==
// @name           Bot Thing
// @namespace      none
// @description    Add original link
// @include        http://nik.bot.nu/*
// ==/UserScript==
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = document.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}
addGlobalStyle('div.p6{background:#000;color:#FFF;display:none;font-size:12px;opacity:0.9;position:absolute;padding:0px;top:20px;left:0px;width:40px;z-index:2;cursor:help}');
var cod, newdiv;
var p4 = new Array();
p4 = getElementsByClass('p4','document','div');
for(i=0;i<p4.length;i++)
{
	cod = p4[i].getAttribute("x");
	newdiv = document.createElement("div");
	newdiv.setAttribute("class", "p6");
	newdiv.innerHTML = '<a href="/o'+cod+'">full</a>';
	p4[i].parentNode.insertBefore(newdiv, p4[i].nextSibling);
}