// ==UserScript==
// @name         Telkku.com login
// @description  Kirjautuu telkku.comiin automaattisesti.
// @include      http://www.telkku.com/*
// @include      http://telkku.com/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

$(function()
{
    var form = $("form#loginForm:first");

    if (form.length == 0)
    { GM_log("Login form not found on this page."); return; }

    var input1 = $("input[type='text'][name='username']", form);
    var input2 = $("input[type='password'][name='password']", form);
    var input3 = $("input[type='checkbox'][name='persistent']", form);

    if (input1.length == 0 || input2.length == 0 || input3.length == 0)
    { GM_log("Login fields not found."); return; }

    var cred = getCredentials();
    if (cred == null)
    { GM_log("Could not get login credentials."); return; }

    input1.val(cred.username);
    input2.val(cred.password);
    input3.attr("checked", true);
    form.submit();
});

function getCredentials()
{
    var cred =
    {
        username: null,
        password: null
    };

    for (var i in cred)
        cred[i] = GM_getValue(i);

    if (cred.username == null || cred.password == null)
        for (var i in cred)
            if ((cred[i] = prompt("Telkku.com " + i)) == null)
                return null;

    for (var i in cred)
        GM_setValue(i, cred[i]);

    return cred;
}
