// ==UserScript==
// @name           Jira-mod
// @namespace      com.zme.jiramod
// @description    jira mod
// @include https://*jira*/secure/TaskBoard.jspa*
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
if(document.getElementById('issueDisplay').innerHTML == 'summary') {
    addGlobalStyle('.gh-issue { height: 9.7em !important; }');
    addGlobalStyle('.gh-issue-inner { height: 9.7em !important; }');
}