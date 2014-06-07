// ==UserScript==
// @name           Multi-Login in Google Account !!
// @namespace      http://orkutsharing.blogspot.com
// @description    Now you can get a select box of accounts instead of "Sign Out" link on Google pages.

// @exclude        http*://mail.google.tld/*ui=1*

// @include        http://*.google.tld/*
// @include        https://*.google.tld/*
// @include        http://google.tld/*
// @include        https://google.tld/*


// ==/user script==

if (document.domain.indexOf("google.") == -1) return;


if (!GM_getValue)
	{alert("Please upgrade Greasemonkey'w newest version to use this script, from https://addons.mozilla.org/en-Us/firefox/addon/748."); return;}
usernames = GM_getValue("usernames", "").split(",");
passwords = GM_getValue("passwords", "").split(",");
autologin = GM_getValue("autologin", "");
if (typeof(autologin) == "boolean")
{
	var al = new Array(usernames.length);
	for (var i = 0; i < usernames.length; i++)
		{al[i] = "false";}
	autologin = al;
	GM_setValue("autologin", al.join(","));
}
else
	{autologin = autologin.split(",");}


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
	if (document.domain.indexOf("docs.google") != -1)
		{return "writely";}
	else if (document.location.href.indexOf("/webmasters/") != -1)
		{return "sitemaps";}
	else if (document.location.href.indexOf("/calendar/") != -1)
		{return "cl";}
	else if (document.domain.indexOf("picasaweb.google") != -1)
		{return "lh2";}
	else
		{return "mail";}
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
		var d = /.*?@(.*?)$/.exec(un);
		if ((d != null) && (d[1] != "gmail.com") && (d[1] != "googlemail.com"))
			{alert(d); this.parentNode.action = 'https://www.google.com/a/' + d + '/LoginAction2';}
		if (pw == "")
			{pw = prompt('Password for ' + un + ":");}
		if (pw != null)
		{
			this.parentNode.Email.value = un;
			this.parentNode.Passwd.value = pw;
			this.parentNode.PersistentCookie.value = al;
			this.parentNode.submit();
		}
	}
	else if (i == len - 5)
	{
		var u, p;
		if (((u = prompt('Please Enter your Gmail Id:')) != null) && ((p = prompt('Password for the given Id (Leave it blank to enter the password every time):')) != null))
		{
			if ((u.indexOf(',') != -1) || (p.indexOf(',') != -1))
				{alert('Usernames and passwords cannot contain commas.');}
			else
			{
				var a = confirm('Turn-on Auto-login for this account?') + "";
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
				alert('New Account has been added.');
			}
		}
		this.selectedIndex = 0;
	}
	else if (i == len - 4)
	{
		if (usernames[0] == "")
			{alert("There is no account to remove, Please Add NewAccont first to get them removed !!!");}
		else
		{
			u = parseInt(prompt('Enter the NUMBER of the account which you wish to remove:' + makeUserList("\n", "", true)));
			if (isNaN(u)) {}
			else if ((u < 1) || (u > usernames.length))
				{alert('Invalid NUMBER !! Please enter any one of the number which is been displayed.')}
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
					{alert('This Account have already been removed. So please refresh the page to update account list.');}
				else
				{
					un.splice(j, 1);
					pw.splice(j, 1);
					al.splice(j, 1);
					GM_setValue('usernames', un.join(',')); usernames = un;
					GM_setValue('passwords', pw.join(',')); passwords = pw;
					GM_setValue('autologin', al.join(',')); autologin = al;
					this.remove(j+2);
					alert('Account has been removed.');
				}
			}
		}
		this.selectedIndex = 0;
	}
	else if (i == len - 3)
	{
		var d = /google\.[^\/]*?\/a\/(.*?)\//.exec(document.location.href);
		if (d != null)
			{var s = 'https://www.google.com/a/' + d[1] + '/Logout';}
		else if (document.domain.indexOf("mail.google") != -1)
			{var s = 'https://mail.google.com/mail/?logout';}
		else if (document.domain.indexOf("docs.google") != -1)
			{var s = 'https://docs.google.com/logout';}
		else if (document.location.href.indexOf("/calendar/") != -1)
			{var s = 'https://www.google.com/calendar/logout';}
		else if (document.domain.indexOf("picasaweb.google") != -1)
			{var s = 'http://picasaweb.google.com/bye?continue=https%3A%2F%2Fwww.google.com%2Faccounts%2FLogout%3Fcontinue%3Dhttp%253A%252F%252Fpicasaweb.google.com';}
		else
			{var s = 'http://www.google.com/accounts/Logout?continue=' + escape(window.location.href.split("#")[0]);}
		document.location.href = s;
	}
}

function getSelectBox()
{
	selectBox = document.createElement("span");
	selectBox.innerHTML = '<form name="gmLoginForm" action="https://www.google.com/accounts/ServiceLoginAuth" method="post" style="display:inline;"><select style="font-family:arial,san-serif; font-size:7pt; position:relative; top:2px; padding:0px; height:13px;" name="gmSelectLogin"><option>Switch User !!</option><option disabled="disabled">&#8212;&#8212;</option>' + makeUserList('<option>', '</option>', false) + '<option disabled="disabled">&#8212;&#8212;</option><option>Add NewAccount </option><option>Remove Account </option><option>Sign Out</option></select><input type = "hidden" name="continue" value="' + ((document.domain.indexOf("mail.google") != -1)?"https://mail.google.com/mail/?nsr=1":document.location.href.split("#")[0]) + '" /><input type="hidden" name="PersistentCookie" /><input type="hidden" name="Email" /><input type="hidden" name="Passwd" /><input type="hidden" name="service" value="' + getService() + '" /></form>';
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
	catch (e) {;}
}

if (frames.length == 0)
	{f = new Array(window);}
else
{
	f = new Array(frames.length + 1);
	for (var i=0; i < frames.length; i++)
		{f[i] = frames[i];}
	f[frames.length] = window;
}

for (var i=0; i < f.length; i++)
{
	f[i].addEventListener('load', function()
	{
		if ((document.domain.indexOf("mail") != -1) && (unsafeWindow.gmonkey))
		{
			unsafeWindow.gmonkey.load("1.0", function(gmAPI)
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