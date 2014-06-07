// ==UserScript==
// @name UHC Autologin
// @version 0.1.0
// @include  http://myuhc2.advscvs.ciscoeos.com/kiosk/
// @author Michael Borisov
// ==/UserScript==

var email = "email";
var password = "password";

function $$(id) 
{
    return document.getElementById(id);
}

$$("cmsgData[emailAddress]").value = email;
$$("cmsgData[password]").value = password;
$$("submit").click();
