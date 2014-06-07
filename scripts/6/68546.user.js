// ==UserScript==
// @name           Wrap mail.python.org messages
// @namespace      tag:wingusr@gmail.com,2010-02-10:MailPythonOrg
// @description    Wraps long mail.python.org messages automatically
// @include        http://mail.python.org/pipermail/*
// ==/UserScript==

function addGlobalStyle(css) {
    try {
	var elmHead, elmStyle;
	elmHead = document.getElementsByTagName('head')[0];
	elmStyle = document.createElement('style');
	elmStyle.type = 'text/css';
	elmHead.appendChild(elmStyle);
	elmStyle.innerHTML = css;
    } catch (e) {
	if (!document.styleSheets.length) {
	    document.createStyleSheet();
	}
	document.styleSheets[0].cssText += css;
    }
}

addGlobalStyle("pre { white-space: pre-wrap; }");
