// ==UserScript==
// @name           Google Account Multi-Login
// @namespace      http://www.crappytools.net
// @description    Replaces "Sign Out" link on Google pages with a select box of accounts.
// @include        http://*.google.tld/*
// @include        https://*.google.tld/*
// @include        http://google.tld/*
// @include        https://google.tld/*
// @exclude        http*://mail.google.tld/*ui=1*
// ==/UserScript==

// Begin Script Update Checker code
var SUC_script_num = 16341;
var version_timestamp = 1241062573298; // This is here for the previous version of the updater script to find.
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}
// End Script Update Checker code

if(document.domain.indexOf('google.') == -1)
	return;

// Load persistent user data
if (!GM_getValue)
{
	alert('You need the newest version of Greasemonkey to run this script. Please upgrade.');
	return;
}
usernames = GM_getValue('usernames', '').split(',');
passwords = GM_getValue('passwords', '').split(',');
autologin = GM_getValue('autologin', '');
if (typeof(autologin) == 'boolean') // For backwards compatibility with older versions of the script
{
	var al = new Array(usernames.length);
	for (var i = 0; i < usernames.length; i++)
		al[i] = 'false';
	autologin = al;
	GM_setValue('autologin', al.join(','));
}
else
	autologin = autologin.split(",");

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
			var ct='https://mail.google.com/mail/?nsr=1';
			if(document.domain.indexOf("mail.google") == -1)
				ct=document.location.href.split("#")[0];
			var al = autologin[i];
			var un = usernames[i];
			var pw = passwords[i];
			var d = /.*?@(.*?)$/.exec(un);
			var galx_url='https://accounts.google.com/ServiceLoginAuth';
			if ((d != null) && (d[1] != 'gmail.com') && (d[1] != 'googlemail.com'))
			{
				this.form.action = 'https://www.google.com/a/'+ d[1] +'/LoginAction2';
				ct='https://www.google.com/a/cpanel/'+ d[1] +'/Dashboard';
				galx_url='https://accounts.google.com/a/'+ d[1] +'/ServiceLogin';
				un=un.replace(/@.*$/, '');
				
				if(location.pathname.indexOf(d[1]) == -1)
				{
					this.form.target='_blank';
					this.selectedIndex=0;
				}
			}
			else if(location.pathname.indexOf('/a/') == 0)
			{
				this.form.target='_blank';
				this.selectedIndex=0;
			}
			
			if (pw == '')
				pw = prompt('Password for ' + un + ":");
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
		break;
		case 'add_account':
			var u, p;
			if (((u = prompt('Username:')) != null) && ((p = prompt('Password (leave blank to prompt every time):')) != null))
			{
				if ((u.indexOf(',') != -1) || (p.indexOf(',') != -1))
					alert('Usernames and passwords cannot contain commas.');
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
		break;
		case 'remove_account':
			if (usernames[0] == '')
				alert('No accounts to remove.');
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
		break;
		case 'sign_out':
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
				var s = 'http://www.google.com/accounts/Logout?continue=' + escape(window.location.href.split("#")[0]);
			document.location.href = s;
		break;
		case 'check_for_update':
			updateCheck(true);
			this.selectedIndex=0;
		break;
	}
}

function getSelectBox()
{
	selectBox = document.createElement('span');
	selectBox.innerHTML=
		'<form name="gmLoginForm" action="https://accounts.google.com/ServiceLoginAuth" method="post" style="display:inline;">'+
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

function findLink(p)
{
	var langs = new Array("sign out", "keluar", "surt", "log ud", "abmelden", unescape("logi v%E4lja"), "salir", unescape("d%E9connexion"), "odjava", "odjavite se", "esci", unescape("skr%E1 %FAt"), "iziet", "atsijungti", unescape("i%u0161siregistruoti"), unescape("kil%E9p%E9s"), "logg av", "logg ut", "afmelden", "wyloguj", "sair", unescape("terminar sess%E3o"), "deconectati-va", unescape("ie%u015Fire"), unescape("odhl%E1si%u0165 sa"), "odjava", "kirjaudu ulos", "logga ut", unescape("thoa%u0301t"), unescape("tho%E1t"), unescape("%E7%u0131k%u0131%u015F"), "oturumu kapat", unescape("odhl%E1sit"), unescape("%u03AD%u03BE%u03BF%u03B4%u03BF%u03C2"), unescape("%u0437%u0430%u043A%u043E%u043D%u0447%u0438%u0442%u044C%20%u0440%u0430%u0431%u043E%u0442%u0443"), unescape("%u0432%u044B%u0439%u0442%u0438"), unescape("%u043E%u0434%u0458%u0430%u0432%u0438%u0442%u0435%20%u0441%u0435"), unescape("%u0432%u0438%u0439%u0442%u0438"), unescape("%u0438%u0437%u0445%u043E%u0434"), unescape("%u05D4%u05EA%u05E0%u05EA%u05E7"), unescape("%u05E6%u05D0"), unescape("%u062A%u0633%u062C%u064A%u0644%20%u0627%u0644%u062E%u0631%u0648%u062C"), unescape("%u0938%u093E%u0907%u0928%20%u0906%u0909%u091F%20%u0915%u0930"), unescape("%u0928%u093F%u0930%u094D%u0917%u092E"), unescape("%u0E2D%u0E2D%u0E01%u0E08%u0E32%u0E01%u0E23%u0E30%u0E1A%u0E1A"), unescape("%u767B%u51FA"), unescape("%u9000%u51FA"), unescape("%u30ED%u30B0%u30A2%u30A6%u30C8"), unescape("%uB85C%uADF8%uC544%uC6C3"));
	try
	{
		var links = p.getElementsByTagName("a");
		for (var i = 0; i < links.length; i++)
		{
			//alert(links[i].innerHTML.toLowerCase())
			for (var j = 0; j < langs.length; j++)
			{
				if (links[i].innerHTML.toLowerCase().indexOf(langs[j]) != -1 && /google\..*?logout/i.test(links[i].href))
				{
					sb = getSelectBox();
					links[i].parentNode.replaceChild(sb, links[i]);
					//win.document.forms.namedItem("gmLoginForm").elements.namedItem("gmSelectLogin").addEventListener('change', onSelectChange, true);
					sb.firstChild.elements.namedItem("gmSelectLogin").addEventListener('change', onSelectChange, true);
				}
			}
		}
	}
	catch (e) {}
}

if (unsafeWindow.frames.length == 0)
	{f = new Array(unsafeWindow);}
else
{
	f = new Array(unsafeWindow.frames.length + 1);
	for (var i=0; i < unsafeWindow.frames.length; i++)
		{f[i] = unsafeWindow.frames[i];}
	f[unsafeWindow.frames.length] = unsafeWindow;
}

for (var i=0; i < f.length; i++)
{
	f[i].addEventListener('load', function()
	{
		if ((document.domain.indexOf('mail') != -1) && (unsafeWindow.gmonkey))
		{
			unsafeWindow.gmonkey.load('1.0', function(gmAPI)
			{
				findLink(gmAPI.getMastheadElement().parentNode, unsafeWindow);
			});
		}
		findLink(document, unsafeWindow);
		if (frames.length > 0)
		{
			for (var k = 0; k < frames.length; k++)
				{findLink(frames[k].document, frames[k]);}
		}
		
	}, true);
}
