// ==UserScript==
// @name			Remember The Milk + Netvibes Autologin
// @author			James Simm [http://www.jimmahdigital.com]
// @namespace
// @description		Auto-login to RTM on Netvibes.
// @include			http://www.rememberthemilk.com/services/modules/netvibes/*
// @include			http://www.rememberthemilk.com/login/*
// ==/UserScript==

var pwFocus = false;

function autoLogin() 
{
	if ( pwFocus==false ) 
	{
		if ( document.forms[0].elements.namedItem("username").value.length > 1 & document.forms[0].elements.namedItem("password").value.length > 1 )
		{
			document.forms[0].submit();
		}
		else
		{
			setTimeout( autoLogin, 25 );
		}
	}
}

function focusEvent()
{
	pwFocus = true;
}

if ( document.forms[0] && document.forms[0].elements.namedItem("username") && document.forms[0].elements.namedItem("password"))
{
	document.forms[0].elements.namedItem("username").addEventListener("keypress", focusEvent, false);
	document.forms[0].elements.namedItem("password").addEventListener("keypress", focusEvent, false);
	window.addEventListener("load", autoLogin, false);
}