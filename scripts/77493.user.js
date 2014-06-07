// ==UserScript==
// @name           Bugzilla - AssignToMe
// @namespace      SL
// @include        http://wi/show_record.cgi?id*
// ==/UserScript==

var logout_re = /[\s\S]*Log.*out.*[\s]\s*(.*)\s/m;
var links = document.getElementById('footer').getElementsByClassName('links')[0].getElementsByTagName('li');
var user_name = links[links.length - 1].textContent.replace(logout_re, '$1');
if (document.getElementById('assigned_to').value != user_name)
	{
	var button = document.createElement('input');
	button.setAttribute('type', 'button');
	button.setAttribute('value', 'Assign to me');
	button.addEventListener("click", onclick, false);
	document.getElementById('bz_assignee_edit_container').appendChild(button);
	}

function onclick()
{
    var evt = document.createEvent('MouseEvents');
    evt.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    document.getElementById('bz_assignee_edit_action').dispatchEvent(evt);
    document.getElementById('assigned_to').value = user_name;
	// document.getElementById('bug_status').selectedIndex = '1';
	document.getElementById('bug_status').value = 'ASSIGNED';
    document.getElementById('commit_top').click();
}