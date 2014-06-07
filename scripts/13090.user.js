// ==UserScript==
// @name           Hide Who's Online in Myspace Messages
// @namespace      mark
// @description    gets rid of the new "Who's Online" box on the right side of your Myspace message box...
// @include        http://messaging.myspace.com/index.cfm?fuseaction=mail*
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

addGlobalStyle('div.whosOnline, div.whosOnlineRounded {display:none;}');