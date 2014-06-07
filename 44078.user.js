// ==UserScript==
// @name           Starbucks! WiFi Auto-Login
// @description    Homogenized! And ready to give the lactose-intolerant volcanic diarrhea.
// @namespace      http://userscripts.org/users/23652
// @namespace      http://userscripts.org/users/28920
// @include        http://*.wayport.net/*
// @copyright      The JoeSimmons and The Huey
// ==/UserScript==

var username = GM_getValue('user', '');
var password = GM_getValue('pass', '');
var roamRelm = GM_getValue('roam', '4');

function main()
{
    if(username=='' || password=='') {options();}
    else
    {
        starbucks();
        var f = document.evaluate("//form[@name='login_form']",document,null,9,null).singleNodeValue,
        n = document.getElementById('username'),
        p = document.getElementById('passwd');
        if(!f || !n || !p) {return;}
        else
        {
            if(n) {n.value = username;}
            if(p) {p.value = password;}
            f.submit();
            return true;
        }
    }
}

function options() {
var user = prompt('Username to remember');
var pass = prompt('Password to remember');
if(user && pass && user!='' && pass!='') {
GM_setValue('user', user);
GM_setValue('pass', pass);
if(confirm('Reload to apply changes?')) {window.location.reload();}
} else {alert('Invalid username or password');}
return true;
}

// Nuller by JoeSimmons. Nulls out all the elements you put as the arguments.
// Syntax: nuller(someElement,anotherElement,moreElements);
function nuller() {
	for(x in arguments)
		if(x) {
			x=null;
			delete x;
		}
}

function leakAvoider() {
nuller(username,password,n,p,f,user,pass);
window.removeEventListener('load', main, false);
document.removeEventListener('unload', leakAvoider, false);
return true;
}

window.addEventListener('load', main, false);
window.addEventListener('unload', leakAvoider, false);
GM_registerMenuCommand('Yahoo Auto Login Options', options);


function starbucks()
{
    if (username.length > 0 && password.length > 0 && roamRelm.length > 0)
    {
        document.getElementById('username').value = username;
        document.getElementById('roamRealm').selectedIndex = roamRelm;
        document.getElementById('password').value = password;
        document.getElementById('aupAgree').checked = true;
        document.getElementById('MEMBERLOGIN').submit();
    }
    else
    {
        var formEl = document.getElementById('login');
        var mem = document.getElementById('aupAgree');

        mem.addEventListener
        (
            'click', function (event)
            {
                alert('foo');
                var u = document.getElementById('username');
                var p = document.getElementById('password');
                var r = document.getElementById('roamRealm');
                if (u.value.length > 0)
                {
                    GM_setValue('user', u.value);
                }
                if (p.value.length > 0)
                {
                    GM_setValue('pass', p.value);
                }
                if (r.selectedIndex > 0)
                {
                    GM_setValue('roam', r.selectedIndex);
                }
            }
        );
    }
}
