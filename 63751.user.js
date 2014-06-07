// ==UserScript==
// @name           Travian Login Manager
// @namespace      nijtram1@userscripts
// @description    Add multiple accounts to login screen!
// @include        http://*.travian.*/login.php
// @include        http://*.travian.*/dorf1.php
// ==/UserScript==

function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('TLM_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/63751.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('TLM_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('TLM_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('TLM_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to install it now?')){GM_openInTab('http://userscripts.org/scripts/source/63751.user.js');GM_setValue('TLM_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('TLM_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('TLM_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);

var tbody = document.getElementById('login_form').getElementsByTagName('tbody')[0];
if(tbody)
{
	var users = Array();
	function addUser(un, pw, ex, sn)
	{
		users[users.length] = Array();
		users[users.length - 1][0] = un;
		users[users.length - 1][1] = pw;
		users[users.length - 1][2] = ex;
		users[users.length - 1][3] = sn;
	}
	addUser("username", "password", "langcode", "servernumber");

	var scriptElement = document.createElement('script');
	scriptElement.type = 'text/javascript';
	scriptElement.innerHTML += 'var users = new Array(';
	var x;
	for(x in users)
	{
	scriptElement.innerHTML += 'new Array("';
	scriptElement.innerHTML += users[x][0];
	scriptElement.innerHTML += '","';
	scriptElement.innerHTML += users[x][1];
	scriptElement.innerHTML += '","';
	scriptElement.innerHTML += users[x][3];
	scriptElement.innerHTML += '","';
	scriptElement.innerHTML += users[x][2];
	scriptElement.innerHTML += '"),';
	}
	scriptElement.innerHTML = scriptElement.innerHTML.slice(0, -1);
	scriptElement.innerHTML += ');\n';
	scriptElement.innerHTML += 'function loginto(e) { document.getElementById("username").value = users[e][0]; document.getElementById("password").value = users[e][1]; document.getElementById("login_form").parentNode.action="http://s" + users[e][2] + ".travian." + users[e][3] + "/dorf1.php"; document.getElementById("login_form").parentNode.submit();}';

	document.getElementById('login_form').getElementsByTagName('tr')[1].className = "";
	document.getElementById('login_form').getElementsByTagName('input')[0].id = "username";
	document.getElementById('login_form').getElementsByTagName('input')[1].id = "password";
	for(x in users)
	{
		if(tr) tr.className = "";
		var tr = document.createElement('tr');
		tr.className = "btm";
		if(!th)
		{
			var th = document.createElement('th');
			th.innerHTML = "Vooraf ingesteld";
			tr.appendChild(th);
		} else {
			var th = document.createElement('th');
			th.innerHTML = "";
			tr.appendChild(th);
		}
		var td = document.createElement('td');
		var btn = document.createElement('a');
		btn.href = "javascript:void 0;";
		btn.innerHTML = users[x][0] + " at " + users[x][2] + users[x][3];
		btn.id = "login_" + x;
		btn.setAttribute('onclick', "loginto('" + x + "');");
		td.appendChild(btn);
		tr.appendChild(td);
		tbody.appendChild(tr);
	}
	document.getElementsByTagName("head")[0].appendChild(scriptElement);
}