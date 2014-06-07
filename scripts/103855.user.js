// ==UserScript==
// @name           GOnline Account Switcher
// @author	   V5 at GOnline Version Five at Gaia
// @description    Allows you to easily switch accounts on GOnline. Based off of Gaia's Mule Switching Script. Thanks!
// @include        http://www.gonline.com/*
// @include        http://gonline.com/*
// ==/UserScript==

// Begin Script Update Checker code
var version_scriptURL = "http://userscripts.org/scripts/source/14966.user.js"; // Change this URL to point to a permanent copy of your own script.
var version_timestamp = 1200535653968; // Used to differentiate one version of the script from an older one. Use the Date.getTime() function to get a value for this.
if(parseInt(GM_getValue("lastUpdate","0"))+86400000<=(new Date().getTime())){GM_xmlhttpRequest({method:"GET",url:version_scriptURL+"?"+new Date().getTime(),headers:{'Cache-Control':'no-cache'},onload:function(xhrResponse){GM_setValue("lastUpdate",new Date().getTime()+"");if(parseInt(/version_timestamp\s*=\s*([0-9]+)/.exec(xhrResponse.responseText)[1])>version_timestamp){if(confirm("There is an update available for the Greasemonkey script \""+xhrResponse.responseText.split("@name")[1].split("\n")[0].replace(/^\s+|\s+$/g,"")+".\"\nWould you like to go to the install page now?")){GM_openInTab(version_scriptURL);}}}});}
// End Script Update Checker code

// Load persistent user data
if (!GM_getValue)
	{alert("You need the newest version of Greasemonkey to run this script. Please upgrade."); return;}
usernames = GM_getValue("usernames", "").split(",");
passwords = GM_getValue("passwords", "").split(",");
autologin = GM_getValue("autologin", "");
if (typeof(autologin) == "boolean") // For backwards compatibility with older versions of the script
{
	var al = new Array(usernames.length);
	for (var i = 0; i < usernames.length; i++)
		{al[i] = "false";}
	autologin = al;
	GM_setValue("autologin", al.join(","));
}
else
	{autologin.split(",");}

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

function onSelectChange()
{
	var i = this.selectedIndex - 2;
	var len = this.length;
	if ((i < len - 5) && ( i >= 0))
	{
		var un = usernames[i];
		var pw = passwords[i];
		var al = autologin[i];
		if (pw == "")
			{pw = prompt('Password for ' + un + ":");}
		if (pw != null)
		{
			this.parentNode.username.value = un;
			this.parentNode.password.value = pw;
			this.parentNode.autologin.value = al;
			this.parentNode.submit();
		}
	}
	else if (i == len - 5)
	{
		var u = prompt('Username:');
		if (u != null)
			{var p = prompt('Password (leave blank to prompt every time):');}
		if ((u != null) && (p != null))
		{
			if ((u.indexOf(',') != -1) || (p.indexOf(',') != -1))
				{alert('Usernames and passwords cannot contain commas.');}
			else
			{
				var a = confirm('Turn on autologin for this account?') + "";
				if ((usernames[0] == "") || (GM_getValue("usernames", "") == ""))
					{var u2 = u; var p2 = p; var a2 = a;}
				else
				{
					var u2 = GM_getValue('usernames') + ',' + u;
					var p2 = GM_getValue('passwords') + ',' + p;
					var a2 = GM_getValue('autologin') + ',' + a;
				}
				GM_setValue('usernames', u2); usernames = u2.split(',');
				GM_setValue('passwords', p2); passwords = p2.split(',');
				GM_setValue('autologin', a2); autologin = a2.split(',');
				for (var j = 0; j < 4; j++)
					{this.options[len - j] = new Option(this.options[len-j-1].text);}
				this.options[len-4] = new Option(u);
				this.options[len-3].disabled = "disabled";
				alert('Account added.');
			}
		}
		this.selectedIndex = 0;
	}
	else if (i == len - 4)
	{
		if (usernames[0] == "")
			{alert("No accounts to remove.");}
		else
		{
			u = parseInt(prompt('Enter the number of the account to be removed:' + makeUserList("\n", "", true)));
			if (isNaN(u)) {}
			else if ((u < 1) || (u > usernames.length))
				{alert('Invalid option.')}
			else
			{
				u = usernames[u-1];
				var un = GM_getValue('usernames').split(',');
				var pw = GM_getValue('passwords').split(',');
				var al = GM_getValue('autologin').split(',');
				var j = -1;
				for (var k = 0; k < un.length; k++)
					{if(un[k]==u) j=k;}
				if (j == -1)
					{alert('Account appears to have already been removed. Refresh the page to update account list.');}
				else
				{
					un.splice(j, 1);
					pw.splice(j, 1);
					al.splice(j, 1);
					GM_setValue('usernames', un.join(',')); usernames = un;
					GM_setValue('passwords', pw.join(',')); passwords = pw;
					GM_setValue('autologin', al.join(',')); autologin = al;
					this.remove(j+2);
					alert('Account removed.');
				}
			}
		}
		this.selectedIndex = 0;
	}
	else if (i == len - 3)
		{document.location.href = logoutURL;}
}

function initialize()
{
	if (document.getElementsByTagName('li')[1].innerHTML.toLowerCase().indexOf("logout") != -1)
	{
		logoutURL = document.getElementsByTagName('li')[1].innerHTML.split('"')[1].replace(/&amp;/g, "&");
		document.getElementsByTagName('li')[1].innerHTML = '<form name="gmLoginForm" action="http://login.gaiaonline.com/gaia/login.php" method="post"><select style="font-size:7pt;padding:0px;height:13px;" name="gmSelectLogin" "><option>Change User...</option><option disabled="disabled">&#8212;&#8212;</option>' + makeUserList('<option>', '</option>', false) + '<option disabled="disabled">&#8212;&#8212;</option><option>Add Account...</option><option>Remove Account...</option><option>Logout</option></select><input type = "hidden" name="redirect" value="' + document.URL.substr(document.URL.indexOf('.com') + 4) + '"><input type="hidden" name="autologin"><input type="hidden" name="username"><input type="hidden" name="password"></form>';
	}
	
	unsafeWindow.document.gmLoginForm.gmSelectLogin.addEventListener('change', onSelectChange, true);
}

window.addEventListener('load', initialize, true);