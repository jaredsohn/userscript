// ==UserScript==
// @name	itcafe.hu : article : recolor
// @namespace	http://www.itcafe.hu/
// @include	http://www.itcafe.hu/hir/*
// @include	http://itcafe.hu/hir/*
// ==/UserScript==
function addGlobalStyle(css)
{
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head)
		return;

	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}

addGlobalStyle('.flc { background: transparent !important; }');
addGlobalStyle('.artrel, .opcio { background: #ffffff !important; padding: 10px !important; }');
addGlobalStyle('h2.level2, span.l2span { background: #ffffff !important; padding: 5px !important; }');
addGlobalStyle('h3 span { background: transparent !important; }');
