// ==UserScript==
// @name           JIRA 4.0 Limit Horizontal Scrolling
// @namespace      http://userscripts.org/scripts/show/68084
// @description    add a table-layout: fixed to all tables
// @include        http://jira.atlassian.com/browse/*
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

addGlobalStyle('table { table-layout: fixed; }');
addGlobalStyle('.jiraform { table-layout: auto; }');
addGlobalStyle('.tt_inner { table-layout: auto; }');
addGlobalStyle('.action-body table { table-layout: auto; }');
addGlobalStyle('#issueDetailsTable table  { table-layout: auto; }');
addGlobalStyle('#components_panel { table-layout: auto; }');
addGlobalStyle('#issue_header { table-layout: auto; }');
addGlobalStyle('#issuetable { table-layout: auto; }');



