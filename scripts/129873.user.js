// ==UserScript==
// @name           MSDN hide inherited members
// @description    Make inherited members invisible by default with option to show them all.
// @namespace      http://userscripts.org/users/443558
// @include        http://msdn.microsoft.com/*/library/*
// @include        http://msdn.microsoft.com/query/dev*
// ==/UserScript==

GM_addStyle(":not(.showinherited).members [data*=inherited] { display:none; }");
GM_addStyle(".sectionblock-cmd-separator { color: #999; }");
GM_addStyle("\
.members tr[data*=inherited] td { \
    background: #f0f0f0 !important; \
    color: #444; \
} \
");
GM_addStyle(".members tr[data*=inherited] a { color: #888 !important; }");

var members = document.getElementsByClassName("members");
for (var i = 0; i < members.length; i++) {
  var m = members[i];
  var p = m.parentElement;
  
  var inherited = 0;
  var trs = m.getElementsByTagName("tr");
  for (var it = 0; it < trs.length; it++) {
    var tr = trs[it];
    var data = tr.getAttribute('data');
    if (data && data.indexOf('inherited') != -1) {
      inherited++;
    }
  }
  
  var separator = document.createElement("span")
  separator.textContent = " | ";
  separator.classList.add("sectionblock-cmd-separator");
  p.appendChild(separator);
  
  var a = document.createElement("a");
  a.textContent = "Inherited (" + inherited + ")";
  a.href = "javascript:void()";
  a.onclick = function(e) {
    var m = e.target.parentNode.getElementsByClassName("members")[0];
    if (m.classList.contains("showinherited"))
      m.classList.remove("showinherited");
    else
      m.classList.add("showinherited");
  }
  p.appendChild(a);
}
