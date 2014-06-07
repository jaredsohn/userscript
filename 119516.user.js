// ==UserScript==
// @name           JIRA Attach Screenshot
// @namespace      jira
// @description    Add Attach Screenshot action for non IE browser
// @include        *
// ==/UserScript==

var a = document.getElementById("attach-file");
if( a) {
  var ul = a.parentNode.parentNode;
  var li = document.createElement("li");

  li.className = "aui-list-item";
  li.innerHTML = '<a class="aui-list-item-link issueaction-attach-screenshot opsbar-operations" id="attach-screenshot" title="Attach a screenshot to this issue" href="/jira/secure/AttachScreenshot!default.jspa?id=17127">Attach Screenshot</a>';

  ul.appendChild(li);
}

