// ==UserScript==
// @name           Arimaa Forum Auto Login
// @namespace      Arimaa
// @description    Automatically presses the ENTER button for you when Arimaa's forum login site is displayed and the Password Manager filled in a username and password.
// @include        *://arimaa.com/arimaa/gameroom/forumLogin.cgi
// ==/UserScript==

input_els = document.getElementsByTagName("input");
have_username = have_password = false;
for (i=0; i < input_els.length; i++)
{
    if (input_els[i].name == "username"
            && input_els[i] != '')
    {
        have_username = true;
    }
    else if (input_els[i].name == "passwrd"
            && input_els[i] != '')
    {
        have_password = true;
    }
}
if (have_username && have_password)
{
    document.getElementsByTagName("form")[0].submit();
}

