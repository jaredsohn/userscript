// ==UserScript==
// @name           Gmail Multi-Login with Domain Apps Support
// @namespace      http://robwilkerson.org
// @description    Replaces "Sign Out" link on Google pages with a select box of accounts.  A relatively minor update 
//                 of Jarett's script available at http://userscripts.org/scripts/show/16341.  Changes include:
// 			- Streamlined to Gmail only - no other app support
// 			- Support for Gmail domain accounts
// 			- Modest UI tweaks
// @include        http://mail.google.tld/*
// @include        https://mail.google.tld/*
// @exclude        http*://mail.google.tld/*ui=1*
// ==/UserScript==

if (document.domain.indexOf("google.") == -1) return;

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
	var i = this.selectedIndex - 1;	// there is 1 disabled option that must be accounted for
	var len = this.length;

	switch ( this.options[this.selectedIndex].value.toLowerCase() ) {
		case "":
			return false;
			break;

		case "add account":
			addAccount ( this, len );
			break;

		case "remove account":
			removeAccount ( this );
			break;

		case "sign out":
			signOut();
			break;
		
		default:
			switchAccount ( this, i );
	}
}

function switchAccount ( input, i ) {
	var un = usernames[i];
	var pw = passwords[i];
	var al = autologin[i];

	if (pw == "")
		{pw = prompt('Password for ' + un + ":");}
	if (pw != null) {
		input.parentNode.Email.value = un;
		input.parentNode.Passwd.value = pw;
		input.parentNode.PersistentCookie.value = al;

		// Begin support for domains 
		var md = input.parentNode.Email.value.split ( '@' )[1];

		if ( md != "gmail.com" ) {
			input.parentNode.action = 'https://mail.google.com/a/' + md;
		}
		// End support for domains

		input.parentNode.submit();
	}
}

function addAccount ( input, len ) {
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

			for (var j = 0; j < 4; j++) { 
				input.options[len - j] = new Option(input.options[len - j - 1].text)
			}

			input.options[len-4] = new Option(u);
			input.options[len-3].disabled = "disabled";
			alert ( 'Added ' + u + ' to the accounts list' );
		}
	}
	input.selectedIndex = 0;
}

function removeAccount ( input ) {
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
			for (var k = 0; k < un.length; k++) { 
				if(un[k]==u) j=k;
			}
			if (j == -1) {
				alert('The ' + u + ' account appears to have already been removed. Refresh the page to update the account list.' );
			}
			else{
				un.splice(j, 1);
				pw.splice(j, 1);
				al.splice(j, 1);
				GM_setValue('usernames', un.join(',')); usernames = un;
				GM_setValue('passwords', pw.join(',')); passwords = pw;
				GM_setValue('autologin', al.join(',')); autologin = al;
				input.remove(j+1);
				alert ( 'Removed ' + u + ' from the accounts list' );
			}
		}
	}
	input.selectedIndex = 0;
}

function signOut() {
	document.location.href = 
		document.location.href.indexOf ( 'mail.google.com/a/' ) == -1 ?
			'https://mail.google.com/mail/?logout' :
			escape ( document.location.href.split ( "#" )[0] ) + '?logout&hl=en';
}

function initialize()
{
	selectBox = document.createElement("span");
	selectBox.innerHTML = '<form name="gmLoginForm" action="https://www.google.com/accounts/ServiceLoginAuth" method="post" style="display:inline;"><label for="gmSelectLogin">Account: </label><select style="font-family:arial,san-serif; font-size:8pt; position:relative; padding:0;" id="gmSelectLogin" name="gmSelectLogin"><option></option>' + makeUserList('<option>', '</option>', false) + '<option disabled="disabled">&#8212;&#8212;</option><option>Add Account</option><option>Remove Account</option><option>Sign Out</option></select><input type = "hidden" name="continue" value="' + ((document.domain.indexOf("mail.google") != -1)?"https://mail.google.com/mail/?nsr=1":document.location.href.split("#")[0]) + '" /><input type="hidden" name="PersistentCookie" /><input type="hidden" name="Email" /><input type="hidden" name="Passwd" /></form>';
	
	if (frames.length == 0)
		{var f = new Array(window);}
	else
	{
		var f = new Array(frames.length + 1);
		for (var k = 0; k < frames.length; k++)
			{f[k] = frames[k];}
		f[f.length] = window;
	}
	for (var j = 0; j < f.length; j++)
	{
		try
		{
			var links = f[j].document.getElementsByTagName("a");
			for (var i = 0; i < links.length; i++)
			{
				if (links[i].innerHTML.toLowerCase().indexOf("sign out") != -1)
				{
					links[i].parentNode.replaceChild(selectBox, links[i]);
					f[j].document.forms.namedItem("gmLoginForm").elements.namedItem("gmSelectLogin").addEventListener('change', onSelectChange, true);
				}
			}
		}
		catch (err) {}
	}
}

window.addEventListener('load', initialize, false);
