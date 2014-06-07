// ==UserScript==
// @name           Boards.ie - Admin User Nav
// @namespace      http://userscripts.org/users/436255
// @description    Navigate between users in the Admin CP
// @version        1.0
// @icon           http://s3.amazonaws.com/uso_ss/icon/125952/large.png
// @include        http://www.boards.ie/admin/u.php*
// ==/UserScript==

function getParameterByName(name)
{
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.search);
  if(results == null)
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}

var userid = parseInt(getParameterByName("u"));

var prev = document.createElement("a");
prev.innerHTML = "Previous";
prev.href = "http://www.boards.ie/admin/u.php?do=edit&u=" + (userid - 1);
var next = document.createElement("a");
next.innerHTML = "Next";
next.href = "http://www.boards.ie/admin/u.php?do=edit&u=" + (userid + 1);
document.body.insertBefore(next, document.body.firstChild);
document.body.insertBefore(prev, document.body.firstChild);

window.addEventListener('keydown', pageNav, true);

function pageNav(key)
{
	if(key.keyCode == 39 && (document.activeElement.nodeName != 'TEXTAREA' && document.activeElement.nodeName != 'INPUT'))
		location.href = next.href;
	else if(key.keyCode == 37 && (document.activeElement.nodeName != 'TEXTAREA' && document.activeElement.nodeName != 'INPUT'))
		location.href = prev.href;
}