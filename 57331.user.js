// ==UserScript==
// @name           What.CD :: Send torrent to (u/ru/w)Torrent WebUI
// @namespace      idkwhattoputhere
// @include        http*://*what.cd/*
// ==/UserScript==

// What.CD :: Send torrent to uTorrent WebUI by Rain724

// Adding custom site instructions:
// Ok, the system I programed is kind of hard to explain, although it seems like the best way to
// manage mutipal sites with different codebases.
// On to the instructions: 
// The format of siteArray is:
// 1 - Name of site. (If the torrent site you are trying to add is: thetorrentsite.org, the name would be "thetorrentsite" w/o the .org)
// 2 - Strip SSL. (If the site is using an unsinged SSL certificate uTorrent might not like it. If so, set this to "1" for that site. ruTorrent and wTorrent auto-overide this to accept SSL)
// 3 - Use cookies. (Some site require cookies to download torrents, if so, set this to "1")
// 4 - Search String 1 (String of text in every download url, like "action=download" or "download.php")
// 5 - Search String 2 (A string of text that is NOT in every download url.** EXPLAINED BELOW **)
// 6 - Link text (By defualt, "µT " is used on What, although some sites " Send to wUI" looks better. This can be any string of text though)
// 7 - Separation text (Text that will show up before the Link text, if no Separation text is needed, set it to "")
//
// ** SEARCH STRING 2 **
// Some sites have a .torrent download link AND a .zip or .txt download link. If this is the case, set this to ".zip", ".txt", or some other string of text that comes up in every .zip/.txt link.
// If the site you are trying to add to the script DOES NOT have a 2nd download link for .zip/.txt, set Search String 2 to "µ"
var siteArray = []; // << DO NOT EDIT THIS LINE
siteArray[0] = ["what.cd", "0", "0", "action=download", "µ", "µT ", " | "];

/////////////////////////////////
// DO NOT EDIT BELOW THIS POINT//
/////////////////////////////////

//Mode changing:
//Set up "User Script Command"
GM_registerMenuCommand("Setup webUI", function() {	
	var webUIPrompt = window.prompt('What webUI are you using?\n\n1) uTorrent\n2) ruTorrent v2\n3) ruTorrent v3\n4) wTorrent\n\n(Type 1,2, or 3 below)');
	if (webUIPrompt == "1" || webUIPrompt == "2" || webUIPrompt == "3" || webUIPrompt == "4")
	{
		GM_setValue('custom_webUI', webUIPrompt);
		if(webUIPrompt == "4")
		{
			var wTorrent_hostname = window.prompt('What is your wTorrent hostname or ip address? (ex: "1.2.3.4" or "user.seedboxservice.com")');
			var wTorrent_port = window.prompt('What port is your wTorrent running on?');
			var wTorrent_username = window.prompt('What is your wTorrent username?');
			var wTorrent_password = window.prompt('What is your wTorrent password?');
			var wTorrent_ssl = window.prompt('Is your wTorrent running on an ssl encrypted server?\n"1" for yes, "2" for no');
			var wTorrent_pvtAdd = window.prompt('Do you want torrents to be added to wTorrent as private?\n"1" for yes, "2" for no');
			var wTorrent_autostart = window.prompt('Do you want downloaded torrents to autostart?\n"1" for yes, "2" for no');
			var wTorrent_isCorrect = window.prompt('Is this information correct? (Type "Correct" or "Incorrect")\nNote: all of this information has to be correct for the script to work!\n\nHostname: '+wTorrent_hostname+'\nPort: '+wTorrent_port+'\nUsername: '+wTorrent_username+'\nPassword: '+wTorrent_password+'\nSSL: '+wTorrent_ssl+' (1 is yes, 2 is no)\nAutostart: '+wTorrent_autostart+' (1 is yes, 2 is no)');
			if (wTorrent_isCorrect == "Correct")
			{
				GM_setValue('custom_wTorrent_hostname', wTorrent_hostname);
				GM_setValue('custom_wTorrent_port', wTorrent_port);
				GM_setValue('custom_wTorrent_username', wTorrent_username);
				GM_setValue('custom_wTorrent_password', wTorrent_password);
				GM_setValue('custom_wTorrent_ssl', wTorrent_ssl);
				GM_setValue('custom_wTorrent_pvtAdd', wTorrent_pvtAdd);
				GM_setValue('custom_wTorrent_autostart', wTorrent_autostart);
				alert("wTorrent Settings Saved!");
			}
			else {
				alert("Please try entering the information in again.");
			}
		}
		else {
			var setWebIP = window.prompt('What is your hostname and port?\n(Format: "1.2.3.4:5678" or "user.seedboxservice.com")');
			var setruSSL = window.prompt('Do you connect to your webUI over SSL (https)?\n0) No\n1) Yes\nEnter "0" or "1" below, w/o quotes. If you are unsure, enter "0".');
			if (setWebIP != '' && setruSSL != '')
			{
				GM_setValue('custom_webIP', setWebIP);
				GM_setValue('custom_ruSSL', setruSSL);
				alert(setWebIP + " has now been set as your hostname:port");
			}
			else {
				alert("Error. Please try again.");
			}
		}
		location.reload();
	}
	else {
	alert("Malformed entry, please try again.");
}});
//Set webUI mode:
var webUIType = GM_getValue('custom_webUI', "0");
var webIP = GM_getValue('custom_webIP', '');
var ruSSL = GM_getValue('custom_ruSSL', "0");
if (webUIType == "0")
{
	alert('You must run the setup script before using this script.\nTo do this, please right click the Greasemonkey icon > User Script Commands... > Setup WebUI');
}
//if wTorrent
var wtorrent_connect_string;
if (webUIType == "4")
{
	var wHost = GM_getValue('custom_wTorrent_hostname', '');
	var wPort = GM_getValue('custom_wTorrent_port', '');
	var wUser = GM_getValue('custom_wTorrent_username', '');
	var wPass = GM_getValue('custom_wTorrent_password', '');
	var wPvtAdd = GM_getValue('custom_wTorrent_pvtAdd', '');
	var wSSL = GM_getValue('custom_wTorrent_ssl', '');
	var wStart = GM_getValue('custom_wTorrent_autostart', '');
	if (wSSL == "1") { wtorrent_connect_string = 'https://'+wHost+':'+wPort+'/'; } else { wtorrent_connect_string = 'http://'+wHost+':'+wPort+'/'; }
	post(wtorrent_connect_string,'userf='+wUser+'&passwdf='+wPass+'&user_login=Login', function(info) { var isLoggedIn = true });
}

//Rest of script
var useCookie = "0";
var innerSep = "";
var isWhat = "";
var stripssl = "";
if(webUIType == "1" || webUIType == "2" || webUIType == "3")
{
	var ifEventListener = false;
	var iframe = document.createElement('iframe');
	document.body.appendChild(iframe);
	iframe.style.display = "none";
}

start();
function start()
{
	var links = getLinks();
	for (var i=0, link; link = links[i++]; )
	{
		if (match(link.href))
		{
			if (stripssl == "1")
			{
				link.href = link.href.replace(/http?s/, "http");
				if (isWhat == "1")
				{
					link.href = link.href.replace(/ssl/, "www");
				}
			}
			var uTorrentLink = makeUTorrentLink(link);
			link.parentNode.insertBefore(uTorrentLink, link.nextSibling);
			var separator = makeSep();
			link.parentNode.insertBefore(separator, link.nextSibling);
		}
	}
}

function makeUTorrentLink(link) {
	
	var uTorrentLink  = document.createElement('a');
	var theCookie = setCookie();
	var uTorrentFrameSrc = makeWebUILink(webIP, link.href, theCookie);
	var wTorrentTorrentURL = link.href;
	uTorrentLink.href = uTorrentFrameSrc;
	uTorrentLink.id = "uTLINK";
	if (webUIType == "1" || webUIType == "2" || webUIType == "3")
	{
		uTorrentLink.addEventListener("click", 
					function(e) {
					iframe.setAttribute("src", uTorrentFrameSrc);
					if(!ifEventListener) {
						iframe.addEventListener("load", function() {
						window.alert("Torrent added!");
						}, false);
          				ifEventListener = true;
					}
					e.preventDefault();
				}, false);
	}
	if (webUIType == "4")
	{
		var wTorrentRequestURL = 'torrenturl='+encodeURIComponent(wTorrentTorrentURL);
		if (wPvtAdd == "1")
		{
			wTorrentRequestURL = wTorrentRequestURL+'&private=on';
		}
		if (wStart == "1")
		{
			wTorrentRequestURL = wTorrentRequestURL+'&start_now=on';
		}
		uTorrentLink.id = wTorrentRequestURL;
		uTorrentLink.addEventListener("click", function(e) { e.preventDefault(); wTorrentClick(e)}, false);
	}
    uTorrentLink.innerHTML = linkText;
    return uTorrentLink;
}
function makeWebUILink(webIPforLink, linkhref, cookie)
{
	if (webUIType == "1")
	{
		return returnSSL()+"://"+webIPforLink+"/gui/?action=add-url&s="+escape(linkhref)+cookie;
	}
	if (webUIType == "2")
	{
		return returnSSL()+"://"+webIPforLink+"/addtorrent.php?url="+escape(linkhref)+cookie;
	}
	if (webUIType == "3")
	{
		return returnSSL()+"://"+webIPforLink+"/php/addtorrent.php?url="+escape(linkhref)+cookie;
	}
	if (webUIType == "4")
	{
		return 'wtorrent:'+linkhref;
	}
}

function makeSep() {
	var separatorText = document.createElement("text");
	separatorText.innerHTML = innerSep;
	return separatorText;
}

function wTorrentClick(sent)
{
	sent = sent.target.id;
	post(wtorrent_connect_string+'index.php?cls=AddT', sent, function(addedResponce) {
			var match_added = /Torrent added correctly/gmi;
			var already_exists = /Error: File already exists in torrent directory, can't create .torrent/gmi;
			if (addedResponce.match(match_added)) {
					alert('Torrent Successfully Added wTorrent!');
				}
			else if (addedResponce.match(already_exists)) {
				alert('Torrent has already been added to wTorrent!');
			}
			else {
				alert('Something is broken! Verify that you entered your wTorrent details/information correctly!');
			}
 		})
}

function post(url, data, func) {
		GM_xmlhttpRequest({
			method: "POST",
			url: url,
			headers:{'Content-type':'application/x-www-form-urlencoded'},
			data: data,
			onload: function(xhr) { func(xhr.responseText); }
			});
		}

function setCookie() {
	if (useCookie == "1")
	{
		return escape(":COOKIE:") + escape(document.cookie.replace(" ", ""));
	}
	return "";
}

function getLinks()
{
   var doc_links = document.links;
   var links = [];
   for (var i=0, link; link = doc_links[i++];) {
       links.push(link);
   }
   return links;
}

function match(url) {
	for (var i=0;i<siteArray.length;i++)
	{
		if(url.match(siteArray[i][0]) && url.match(siteArray[i][3]) && !url.match(siteArray[i][4]))
		{
			if(siteArray[i][1] == "1" && webUIType != "2" && webUIType != "3") { stripssl = "1"; }
			if(siteArray[i][2] == "1") { useCookie = "1"; }
			if(url.match("ssl.what.cd")) { isWhat = "1"; }
			if(siteArray[i][6] != "") { innerSep = siteArray[i][6]; }
			if(siteArray[i][5] != "") { linkText = siteArray[i][5]; }
			return 1;
		}
	}
}

function returnSSL() {
	if (ruSSL == "1") {
		return "https";
	}
	else {
		return "http";
	}
}