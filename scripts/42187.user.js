// Copyright (C) 2008 - 2013 by Lars-Olof Krause
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2, or (at your option)
// any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// ==UserScript==
// @name           WEB.de - One-Click-Login
// @namespace      LOK-Soft - Lars-Olof Krause
// @description    One-Click-Login to Web.de-Freemail
// @include        http://web.de/*
// @include        http://*.web.de/*
// @include        https://freemailng*.web.de/msg/logoff.htm*
// @include        https://*.web.de/logout*
// @version        2.3
// ==/UserScript==

if(document.location.toString().indexOf("web.de/msg/logoff.htm") != -1 || document.location.toString().indexOf("web.de/logout") != -1){
	document.location.href="http://logout.webde.uimserv.net/?p=TG9nb3V0QWRQcm94eS5zZXJ2aWNlPXNraW5uYWJsZWxvZ291dCZzaXRlPXdlYmRlJnNlY3Rpb249Z20xL21haWwvbG9nb3V0L2FkX2R5bmFtaXNjaCZyZWdpb249ZGU="; 
}

var email_conf = GM_getValue('webemail');
var password_conf = GM_getValue('webpassword');

var email_form = document.getElementById('inpFreemailLoginUsername');
var password_form = document.getElementById('inpFreemailLoginPassword');

GM_registerMenuCommand('Account-Informationen festlegen', setYourLogin);
GM_registerMenuCommand('Account-Informationen zuruecksetzen', clearYourLogin);


function setYourLogin()
{
	var email_prompt = prompt('Bitte geben Sie Ihren Web.de-Benutzernamen (E-Mail-Adresse) ein:', (email_conf ? email_conf : ''));
	if(email_prompt)
	{
		GM_setValue('webemail', email_prompt);
	
		var password_prompt = prompt('Bitte geben Sie Ihr Web.de-Passwort ein:');
		if(password_prompt)
			GM_setValue('webpassword', password_prompt);
	}
}

function clearYourLogin()
{
	GM_setValue('webemail', '');
	GM_setValue('webpassword', '');
	
	alert('Ihre Daten wurden geloescht!');
}

function login(){
	if(document.getElementById('inpFreemailLoginUsername')){
		if(!email_conf) {
			alert("Sie haben noch keine Login-Informationen gespeichert!");
			setYourLogin();
			location.reload();
		} else {
			email_form.value = email_conf;
			password_form.value = password_conf;

			if((document.getElementById('inpFreemailLoginUsername').value.length > 0)&&(document.getElementById('inpFreemailLoginPassword').value.length > 0)) {
			    document.getElementById('formFreemailLogin').submit();
			}
		}
	}
}

function addOCLButton(){
  var mm = document.createElement("li");
  mm.id = "oneClickLogin";
  var mm1 = document.createElement("a");
  mm1.href="/?";
  mm1.className = "hasIcon icon-freemail";
  var texno = document.createTextNode("One-Click-Login");
  mm1.appendChild(texno);
  mm.appendChild(mm1);
  var pn = document.getElementById('loginsearch-header-ad').parentNode.getElementsByTagName('ul')[0];
  pn.appendChild(mm);
}

if(document.location == "http://web.de/?" || document.location == "http://www.web.de/?"){
 login();
}else{
 addOCLButton();
}


//Update Check by Jarett (http://userscripts.org/scripts/show/20145)
var SUC_script_num = 42187; // Change this to the number given to the script by userscripts.org (check the address bar)

 GM_registerMenuCommand('WEB.de - One-Click-Login - Check for Updates', function(){updateCheck(true);});


try
{
	function updateCheck(forced)
	{
		if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))) // Checks once a day (24 h * 60 m * 60 s * 1000 ms)
		{
			try
			{
				GM_xmlhttpRequest(
				{
					method: 'GET',
					url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),
					headers: {'Cache-Control': 'no-cache'},
					onload: function(resp)
					{
						var local_version, remote_version, rt, script_name;
						
						rt=resp.responseText;
						GM_setValue('SUC_last_update', new Date().getTime()+'');
						remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);
						local_version=parseInt(GM_getValue('SUC_current_version', '-1'));
						if(local_version!=-1)
						{
							script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];
							GM_setValue('SUC_target_script_name', script_name);
							if (remote_version > local_version)
							{
								if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?'))
								{
									GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);
									GM_setValue('SUC_current_version', remote_version);
								}
							}
							else if (forced)
								alert('No update is available for "'+script_name+'."');
						}
						else
							GM_setValue('SUC_current_version', remote_version+'');
					}
				});
			}
			catch (err)
			{
				if (forced)
					alert('An error occurred while checking for updates:\n'+err);
			}
		}
	}

	updateCheck(false);
}
catch(err)
{}