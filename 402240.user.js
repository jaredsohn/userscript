// ==UserScript==
// @name        Jira GUI Enhancements
// @namespace   kec
// @version     1.1
// @include     */issues/*
// @include     */browse/*
// @include     */secure/*
// @require http://code.jquery.com/jquery-latest.js
// @require https://gist.github.com/raw/2625891/waitForKeyElements.js
// ==/UserScript==

waitForKeyElements ("#viewissuesidebar", actionIssueSidebar);
waitForKeyElements ("#dashboard > .tabs.vertical li a", actionDashboardSidebar);

// set left column width
function actionIssueSidebar(jNode) {
    jNode.css("width", "23%");
}

// reduce padding on dasboard list to fit more dashboards on screen
function actionDashboardSidebar(jNode) {
    jNode.css("padding", "4px 10px");
}