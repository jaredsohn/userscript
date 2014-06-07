// ==UserScript==
// @name        Dardanos - Postretter
// @namespace   http://milkau.name/2013/greasemonkey-ns/dardanos/rescue
// @include     http://*.proxy.milkau.name/*
// @include     http://*.dardanos-logd.de/*
// @exclude     http://*.proxy.milkau.name/forum/*
// @exclude     http://*.dardanos-logd.de/forum/*
// @exclude     http://*.proxy.milkau.name/index.php*
// @exclude     http://*.dardanos-logd.de/index.php*
// @exclude     http://*.proxy.milkau.name/
// @exclude     http://*.dardanos-logd.de
// @version     1.0
// ==/UserScript==

function default_submit()
{
    return true; 
}

function safe_submit(e, old_submit)
{
    var req = new XMLHttpRequest();
    var form = this;
    
    req.open('get', 'mail.php', false);
    req.send(null);
    
    if (req.status !== 200 || req.responseText.match( /Sessionzeit ist abgelaufen. Bitte neu einloggen./ ))
    {
        if (!confirm('Achtung, du bist vermutlich ausgeloggt! Wirklich absenden?'))
        {
            return false;
        }
    }
    
    return old_submit(e);
}

var forms = document.getElementsByTagName('form');
for (var i = 0; i < forms.length; i++)
{
    var form = forms[i];
    var old_submit = forms.onsubmit;
    if (!old_submit) old_submit = default_submit;
    
    (function (old_submit)
    {
        form.onsubmit = function(e)
        {
            return safe_submit(e, old_submit);
        }
    }
    )(old_submit);
}