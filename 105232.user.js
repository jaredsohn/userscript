// ==UserScript==
// @name           Google Account Multi-Login
// @namespace      DSXC
// @description    Show a selection box of accounts that you have configured.
// @version        1.0
// @revision - Fixes for how the drop down box is displayed, should be more consistent.
// @include        http://*.google.tld/*
// @include        https://*.google.tld/*
// @include        http://google.tld/*
// @include        https://google.tld/*
// ==/UserScript==

if (!GM_getValue)
{
	alert('You need the newest version of Greasemonkey to run this script. Please upgrade.');
	return;
}

var SCRIPT = {
	scripturl:   'http://userscripts.org/scripts/source/105232.user.js',
	version:     '1.0',
	versionurl:  'http://userscripts.org/scripts/source/105232.meta.js',
	lastupdate:  GM_getValue('Update - Script', 'never')
}

usernames = GM_getValue('usernames', '').split(',');
passwords = GM_getValue('passwords', '').split(',');
autologin = GM_getValue('autologin', '').split(',');

function makeUserList(prefix, suffix, numbered)
{
	if (usernames[0] == "")
		return "";
	a = "";
	for (i = 0; i < usernames.length; i++)
	{
		a += prefix;
		if (numbered)
			a += (i+1) + ") "
		a += usernames[i] + suffix;
	}
	return a;
}

function getService()
{
	if (document.domain.indexOf('docs.google') != -1)
		return 'writely';
	else if (document.location.href.indexOf('/webmasters/') != -1)
		return 'sitemaps';
	else if (document.location.href.indexOf('/calendar/') != -1)
		return 'cl';
	else if (document.domain.indexOf('picasaweb.google') != -1)
		return 'lh2';
	else
		return 'mail';
}

function onSelectChange()
{
	var i = this.selectedIndex - 2;
	var len = this.length;
	
	switch(this.value)
	{
		case 'change_account':
		{
			var ct='https://mail.google.com/mail/';
			
			if (document.domain.indexOf("mail.google") == -1)
			{
				ct = document.location.href.split("#")[0];
			}
			
			var al = autologin[i];
			var un = usernames[i];
			var pw = passwords[i];
			var d = /.*?@(.*?)$/.exec(un);
			var galx_url='https://accounts.google.com/ServiceLoginAuth';
			
			if(location.pathname.indexOf('/a/') == 0)
			{
				this.form.target='_blank';
				this.selectedIndex=0;
			}
			
			if (pw == '')
			{
				pw = prompt('Password for ' + un + ":");
			}
			
			if (pw != null)
			{
				var form=this.form;
				GM_xmlhttpRequest(
				{
					method: 'GET',
					url: galx_url,
					onload: function(resp)
					{
						var matches;
						
						// For some reason I can't refer to the form elements by their names; probably has to do with the XPCNativeWrapper nonsense.
						form.elements[1].value = ct;
						form.elements[2].value = al;
						form.elements[3].value = un;
						form.elements[4].value = pw;
						
						matches=/name="GALX"[\n\s]+value="(.*?)"/im.exec(resp.responseText);
						if(matches != null)
							form.elements[5].value = matches[1];
						
						form.submit();
					}
				});
			}
		} break;
		
		case 'add_account':
		{
			var u, p;
			if (((u = prompt('Username:')) != null) && ((p = prompt('Password (leave blank to prompt every time):')) != null))
			{
				if ((u.indexOf(',') != -1) || (p.indexOf(',') != -1))
				{
					alert('Usernames and passwords cannot contain commas.');
				}
				else
				{
					var a = confirm('Turn on autologin for this account?') + '';
					if ((usernames[0] == '') || (GM_getValue('usernames', '') == ''))
					{
						var u2 = u;
						var p2 = p;
						var a2 = a;
					}
					else
					{
						var u2 = GM_getValue('usernames') +','+ u;
						var p2 = GM_getValue('passwords') +','+ p;
						var a2 = GM_getValue('autologin') +','+ a;
					}
					GM_setValue('usernames', u2); usernames = u2.split(',');
					GM_setValue('passwords', p2); passwords = p2.split(',');
					GM_setValue('autologin', a2); autologin = a2.split(',');
					var j=0;
					while(this.options[j].value!='_accounts_end' && j<this.options.length-1)
						j++;
					this.add(new Option(u, 'change_account'), this.options[j]);
					alert('Account added.');
				}
			}
			this.selectedIndex = 0;
		} break;
		
		case 'remove_account':
		{
			if (usernames[0] == '')
			{
				alert('No accounts to remove.');
			}
			else
			{
				u = parseInt(prompt('Enter the number of the account to be removed:' + makeUserList("\n", '', true)));
				if (isNaN(u)) {}
				else if ((u < 1) || (u > usernames.length))
					alert('Invalid option.');
				else
				{
					u = usernames[u-1];
					var un = GM_getValue('usernames').split(',');
					var pw = GM_getValue('passwords').split(',');
					var al = GM_getValue('autologin').split(',');
					var j = -1;
					for (var k = 0; k < un.length; k++)
					{
						if(un[k]==u)
							j=k;
					}
					if (j == -1)
						alert('Account appears to have already been removed. Refresh the page to update account list.');
					else
					{
						un.splice(j, 1);
						pw.splice(j, 1);
						al.splice(j, 1);
						GM_setValue('usernames', un.join(',')); usernames = un;
						GM_setValue('passwords', pw.join(',')); passwords = pw;
						GM_setValue('autologin', al.join(',')); autologin = al;
						for(k=0; k<this.options.length; k++)
						{
							if(this.options[k].value=='_accounts_begin')
							{
								this.remove(j+k+1);
								break;
							}
						}
						alert('Account removed.');
					}
				}
			}
			this.selectedIndex = 0;
		} break;
		
		case 'sign_out':
		{
			var d = /google\.[^\/]*?\/a\/cpanel\/(.*?)\//.exec(document.location.href);
			if (d != null)
				var s = 'https://www.google.com/a/cpanel/'+ d[1] +'/cpanelLogout?continue=https://www.google.com/a/'+ d[1];
			else if (document.domain.indexOf("mail.google") != -1)
				var s = 'https://mail.google.com/mail/?logout';
			else if (document.domain.indexOf("docs.google") != -1)
				var s = 'https://docs.google.com/logout';
			else if (document.location.href.indexOf("/calendar/") != -1)
				var s = 'https://www.google.com/calendar/logout';
			else if (document.domain.indexOf("picasaweb.google") != -1)
				var s = 'http://picasaweb.google.com/bye?continue=https%3A%2F%2Fwww.google.com%2Faccounts%2FLogout%3Fcontinue%3Dhttp%253A%252F%252Fpicasaweb.google.com';
			else
				var s = 'http://accounts.google.com/Logout?continue=' + escape(window.location.href.split("#")[0]);
			document.location.href = s;
		} break;
		
		case 'check_for_update':
		{
			updateCheck(true);
			this.selectedIndex=0;
		} break;
	}
}

function getSelectBox()
{
	var selectBox = document.createElement('span');
	
	selectBox.innerHTML = '<form id="DSXC_userChange" name="gmLoginForm" action="https://accounts.google.com/ServiceLoginAuth" method="post" style="display:inline;">'+
		'<select style="font-family:arial,san-serif; font-size:7pt; padding:0px; height:16px;" name="gmSelectLogin">'+
		'<option value="">Change User...</option>'+
		'<option value="_accounts_begin" disabled="disabled">&#8212;&#8212;</option>'+
		makeUserList('<option value="change_account">', '</option>', false) +
		'<option value="_accounts_end" disabled="disabled">&#8212;&#8212;</option>'+
		'<option value="add_account">Add Account...</option>'+
		'<option value="remove_account">Remove Account...</option>'+
		'<option value="sign_out">Sign Out</option>'+
		'<option disabled="disabled">&#8212;&#8212;</option>'+
		'<option value="check_for_update">Check for Script Update</option>'+
		'</select>'+
		'<input type="hidden" name="continue" />'+ // Keep these hidden inputs in this order. See comment in onSelectChange() for details.
		'<input type="hidden" name="PersistentCookie" />'+
		'<input type="hidden" name="Email" />'+
		'<input type="hidden" name="Passwd" />'+
		'<input type="hidden" name="GALX" value="" />'+
		'<input type="hidden" name="service" value="'+ getService() +'" />'+
	'</form>';
	
	return selectBox;
}

function Initialize()
{
	if (GM_getValue('ready'))
		return;
	
	var found = false;
	var item = getElementById("gbg");

	GM_log('GAM v' + SCRIPT.version + ' - startup');
	
	if (item != null)
	{
		var items = getElementsByClass("gbtc", item);
	
		if (items.length > 0)
		{
			var newText = '<li id="DSXC_UserChange" class="gbt"></li>\n<li class="gbt gbtb"><span class="gbts"></span></li>\n';
			items[0].innerHTML = newText + items[0].innerHTML;
			
			var changer = getElementById("DSXC_UserChange");

			var sb = getSelectBox();
			changer.appendChild(sb);
			sb.firstChild.elements.namedItem("gmSelectLogin").addEventListener('change', onSelectChange, true);
			
			found = true;
		}
	}
	
	if (!found)
	{
		GM_log(' - failed, retry in 1 second');
		setTimeout(Initialize, 1000);
	}
	else
	{
		GM_setValue('ready', true);
		GM_log(' - success');
		UpdateCheck();
	}
}

// start system 1sec after init
GM_setValue('ready', false);
setTimeout(Initialize, 1000);


// Monitor functions

function UpdateCheck()
{
	CheckForUpdate();
	
	setTimeout(UpdateCheck, 30000);
}

// Update script functions

function UpdateScript()
{
	window.location = SCRIPT.scripturl;
}

function CheckForUpdate()
{
	var szPageText;
	var szOnlineVersion = 'none';
	var fCurrentVersion, fOnlineVersion, fLastVersion;
	
	// check for an update every 30 minutes
	if (CheckTimeout('Update - Script', 30) == 0)
	{
		ResetTimeout('Update - Script');
		
		var today = new Date();
		var current_time = today.getTime();	
		
		Get(SCRIPT.versionurl + '?' + current_time, function(text) {
			szPageText = text;
			
			szOnlineVersion = text.substring(text.indexOf('@version') + 13, text.indexOf('@version') + 17);
			
			fLastVersion = parseFloat(GM_getValue('Script - Last Revision', '0.0'));
			fOnlineVersion = parseFloat(szOnlineVersion);
			fCurrentVersion = parseFloat(SCRIPT.version);
	
			if (fOnlineVersion > fCurrentVersion && fOnlineVersion != fLastVersion)
			{
				GM_setValue('Script - Last Revision', szOnlineVersion);
				var szMessageText = 'Google Account Multi-Login (' + szOnlineVersion + ') is available!\n\n';
				
				var iStartPos = text.indexOf('@revision');
				var iEndPos;
				
				while (iStartPos != -1)
				{
					iEndPos = text.indexOf('//', iStartPos);
					szMessageText = szMessageText + text.substring(iStartPos + 10, iEndPos);
					
					iStartPos = text.indexOf('@revision', iEndPos);
				}
	
				szMessageText = szMessageText + '\nDo you want to upgrade now?';
				
				if (window.confirm(szMessageText))
				{
					UpdateScript();
				}
			}
		});
	}
}

// General DOM functions

function getElementById(search, node, tag)
{
	var FoundElement = null;
	
	if (node == null) node = document;
	if (tag == null) tag = '*';
	
	var AllElements = node.getElementsByTagName(tag);
	
	for (count = 0; count < AllElements.length && FoundElement == null; count++)
	{
		if (AllElements[count].id != null)
		{
			if (AllElements[count].id.indexOf(search) != -1)
			{
				FoundElement = AllElements[count];
			}
		}
	}
	
	return FoundElement;
}

function getElementsByPartialId(search, node, tag)
{
	var FoundElements = new Array();
	
	if (node == null) node = document;
	if (tag == null) tag = '*';
	
	var AllElements = node.getElementsByTagName(tag);
	
	for (count = 0; count < AllElements.length; count++)
	{
		if (AllElements[count].id != null)
		{
			if (AllElements[count].id.indexOf(search) != -1)
			{
				FoundElements.push(AllElements[count]);
			}
		}
	}
	
	return FoundElements;
}

function getElementsByClass(search, node, tag)
{
	var FoundElements = new Array();
	
	if (node == null) node = document;
	if (tag == null) tag = '*';
	
	var AllElements = node.getElementsByTagName(tag);
	
	for (count = 0; count < AllElements.length; count++)
	{
		if (AllElements[count].className != null)
		{
			if (AllElements[count].className == search)
			{
				FoundElements.push(AllElements[count]);
			}
		}
	}
	
	return FoundElements;
}

function getElementsByPartialClass(search, node, tag)
{
	var FoundElements = new Array();
	
	if (node == null) node = document;
	if (tag == null) tag = '*';
	
	var AllElements = node.getElementsByTagName(tag);
	
	for (count = 0; count < AllElements.length; count++)
	{
		if (AllElements[count].className != null)
		{
			if (AllElements[count].className.indexOf(search) != -1)
			{
				FoundElements.push(AllElements[count]);
			}
		}
	}
	
	return FoundElements;
}
