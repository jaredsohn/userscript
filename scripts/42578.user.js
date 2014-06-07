// ==UserScript==
// @name           lamdaChooserUndEinloggen
// @namespace      lamdaChooserUndEinloggen
// @include        http://*.ikariam.de/
// @include        http://ikariam.de/
// ==/UserScript==

var q = window.document.getElementById("universe");
q.options[10].selected = true;
var loginForm  = window.document.getElementById("loginForm");
var url = "http://" +q.options[10].value + "/index.php?action=loginAvatar&function=login";
loginForm.action  = url;
loginForm.submit();
