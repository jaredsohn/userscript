// ==UserScript==
// @name            Extra buttons for Jira edit
// @include         http://your.jira.host/secure/EditIssue*
// ==/UserScript==


var divcontent = 'Edit issue&nbsp;&nbsp;&nbsp;'
divcontent += '<input class="button" id="issue-edit-submit" name="Update" title="Press Alt+s to submit this form" type="submit" value="Update" />'
divcontent += '<a class="cancel" href="/browse/CIAR-10" id="issue-edit-cancel" title="Press Alt+` to cancel">Cancel</a>'

var extrabuttons = document.createElement("div");
extrabuttons.innerHTML = divcontent


x=document.getElementsByTagName("h2")[1];

x.innerHTML = divcontent

