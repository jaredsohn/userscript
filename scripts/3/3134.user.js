// ==UserScript==
// @name            GMail Auto-Login
// @namespace       
// @description     Auto-login to GMail, assuming Firefox is set to remember your password. Update: 2006-02-07
// @include         http*://www.google.com/accounts/*
// ==/UserScript==
// Stolen and subsequently adapted from the Myspace autologin script (see http://slashetc.net/code/)

var pwFocus = false;

function autoLogin()
{
    if(pwFocus==false)
    {
        if(document.forms[0].elements.namedItem("Passwd").value.length>1)
          {document.forms[0].submit();}
        else
          {setTimeout(autoLogin,100);}
    }
}

function focusEvent()
{
    pwFocus = true;
}

if(document.forms[0] && document.forms[0].elements.namedItem("Passwd"))
{
    document.forms[0].elements.namedItem("Passwd").addEventListener("keypress", focusEvent, false);
    window.addEventListener("load", autoLogin, false);
}
