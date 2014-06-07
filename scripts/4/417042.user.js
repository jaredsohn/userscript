// ==UserScript==
// @name        Youtube permanent prefs
// @namespace   discon@gmail.com
// @include     *.youtube.com/*
// @version     1
// @grant       none
// ==/UserScript==
const
    HTML5      = 0x40000000,
    SafetyMode = 0x08000000;

var alwaysOn = [HTML5, SafetyMode];

function getCookie(cookie_name)
{
    var results = document.cookie.match('(^|;) ?' + cookie_name + '=([^;]*)(;|$)');
    if (results)
       return (unescape(results[2]));
    return null;
}

function setCookie(name, value, exp_y, exp_m, exp_d, path, domain, secure)
{
	var cookie_string = name + "=" + /*escape(*/value/*)*/;
	if (exp_y)
	{
		var expires = new Date(exp_y, exp_m, exp_d);
		cookie_string += "; expires=" + expires.toGMTString();
	}

	if (path)
		cookie_string += "; path=" + escape(path);

	if (domain)
		cookie_string += "; domain=" + escape(domain);
  
	if(secure)
		cookie_string += "; secure";
  
	document.cookie = cookie_string;
}

function splitPrefs(prefs)
{
    var o = {};
    if (!prefs)
        return o;

    var p = prefs.split("&");
    for (var i=0; i<p.length; i++)
    {
        var q = p[i].split("=");
        if (q.length == 2)
        {
            o[q[0]] = q[1];
        }
    }
    
    return o;
}

function joinPrefs(prefs)
{
    if (!prefs)
        return "";

    var a = [];
    for (var o in prefs)
    {
        if (prefs.hasOwnProperty(o))
           a.push(o + "=" + prefs[o]);
    }

    return a.join("&");
}


var cookie = getCookie("PREF");
var prefs = splitPrefs(cookie);

var f2 = parseInt(prefs["f2"], 16);
if (isNaN(f2))
    f2 = 0;
for (var i=0; i<alwaysOn.length; i++)
{
    f2 |= alwaysOn[i];
}
prefs["f2"] = f2.toString(16);

/* Other crap you may want */
/*
prefs["f5"] = 30;
prefs["fv"] = "0.0.0";
*/

cookie = joinPrefs(prefs);
setCookie("PREF", cookie, null, null, null, "/", ".youtube.com", false);
