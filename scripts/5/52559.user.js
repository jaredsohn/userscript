// ==UserScript==
// @name           Force XPCOM
// @namespace      http://megajosh2.deviantart.com
// @description    Force dAmn to use XPCOM
// @include        http://chat.deviantart.com/chat/*
// ==/UserScript==

force_xpcom = document.createElement('script');
force_xpcom.id = 'ForceXPCOM';
force_xpcom.appendChild(document.createTextNode((<r><![CDATA[

function joinChan()
{
	ns = window.location.toString().split('/')[4];
	if (typeof dAmnChats['chat:'+ns] == "undefined")
	{
		dAmn_Log('Attempting to join #'+ns+'...');
		dAmn_Join('chat:'+ns);
	}
	else
	{
		clearInterval(window.doJoin);
		window.forcedXPCOM = true;
		document.getElementsByTagName('head')[0].removeChild(document.getElementById('ForceXPCOM'));
	}
}

function checkIfConnected()
{
	if (dAmn_Client_State == "connected")
	{
		dAmn_Log("Okay, we're connected!");
		clearInterval(window.check);
		dAmn_Log("Now we log in...");
		dAmn_Client_Username = deviantART.pageData.user.username;
		dAmn_Login(dAmn_Client_Username, dAmn_Client_AuthToken);
		dAmn_Log("Last but not least join your room...");
		window.doJoin = setInterval('joinChan();', 1000);
	}
}

function useXPCOM()
{
	try
	{
		dAmn_Log("Here we go, forcing XPCOM...");
		dAmn_Init("dAmnPluginArea", "XPCOM");
		dAmn_Log("First, serving js function...");
		document.dAmnXPCOM.jsCommand = dAmn_DoCommand;
		dAmn_Log("Okay, let's try to connect...");
		document.dAmnXPCOM.open('chat.deviantart.com', 3900);
		window.check = setInterval('checkIfConnected();', 1000);
	}
	catch(e)
	{
		alert("Oh no!\n" + e);
	}
}

function checkXPCOM()
{
	if (typeof window.document.dAmnXPCOM != "undefined")
	{
		window.foundIt = true;
		dAmn_Log("Found XPCOM!");
		useXPCOM();
		clearInterval(window.doMain);
	}
	else
	{
		window.foundIt = false;
	}
}

function main()
{
	if (window.forcedXPCOM)
	{
		dAmn_Log("Attempting recursion, oh noes!");
		return;
	}
	checkXPCOM();
}

if (dAmn_Client_State != 'loggedin')
{
	window.doMain = setInterval('main();', 500);
}

]]></r>).toString()));

document.getElementsByTagName('head')[0].appendChild(force_xpcom);
