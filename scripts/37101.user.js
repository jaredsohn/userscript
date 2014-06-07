// ==UserScript==
// @name           Digg Login
// @namespace      person.barnes.david
// @include        http://digg.com/*
// ==/UserScript==

// Your digg username:
var username = '';
// Your digg password:
var password = '';

function readCookie(name)
{
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++)
    {
        var c = ca[i];
        while (c.charAt(0) == ' ')
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0)
            return c.substring(nameEQ.length, c.length);
    }
    return null;
}

if (readCookie('loginname') == null)
{
    setTimeout('D.auth.toggleLogin()', 0);
    document.getElementById('side-username').value = username;
    document.getElementById('side-password').value = password;
    var formNode = document.getElementById('side-login');
    var hiddenElement = document.createElement("input");
    hiddenElement.type = 'hidden';
    hiddenElement.name = 'submit';
    hiddenElement.value = 'Go';
    formNode.appendChild(hiddenElement);
    formNode.submit()
}
