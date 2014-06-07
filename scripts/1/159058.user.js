// ==UserScript==
// @name           UWS Platformweb Auto-Login
// @include        https://platformweb*.uws.edu.au*
// ==/UserScript==

var uid = document.getElementById('userid');
var pw = document.getElementById('pword');		

uid.value = "REPLACE_THIS_WITH_YOUR_STUDENT_NUMBER";
pw.value = "REPLACE_THIS_WITH_YOUR_PASSWORD";
document.getElementById('submit').click();