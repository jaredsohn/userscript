// ==UserScript==
// @name        Remove Jira Header Footer
// @namespace   jira/edited
// @description removes header and footer
// @include     http://jira.corp.synacor.com/secure/Dashboard.jspa#edited
// @version     1
// ==/UserScript==

function removestuff{
document.getElementById('header').style.display = 'none';
document.getElementById('footer').style.display = 'none';
document.getElementById('announcement-banner').style.display = 'none';
}

removestuff();
