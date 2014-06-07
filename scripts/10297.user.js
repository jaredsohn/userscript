// ==UserScript==

// @name           RedHotPawn autologin

// @namespace      tag:arandia_t@hotmail.com,2007-06-09:RedHotPawn

// @description    Autologin for RedHotPawn

// @include        http://www.redhotpawn.com/

// ==/UserScript==
// adapted from the gmail autologin script, which was previously stolen from the myspace autologin script
// adaptation by Adriaan, 28/06/2007

var pwFocus = false;

function autoLogin()
{
    if(pwFocus==false)
    {
        if(document.forms[0].elements.namedItem("loginpassword").value.length>1)
          {document.forms[0].submit();}
        else
          {setTimeout(autoLogin,100);}
    }
}

function focusEvent()
{
    pwFocus = true;
}

if(document.forms[0] && document.forms[0].elements.namedItem("loginpassword"))
{
    document.forms[0].elements.namedItem("loginpassword").addEventListener("keypress", focusEvent, false);
    window.addEventListener("load", autoLogin, false);
}
