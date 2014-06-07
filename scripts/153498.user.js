// ==UserScript==
// @name                [TS] Blogger NCR
// @namespace           TimidScript
// @description         Redirects blogspot to COM TLD + Skips Content Warning
// @include             http://*.blogspot.*/*
// @version             1.0.6
// @run-at              document-start
// @require             http://userscripts.org/scripts/source/159301.user.js
// @resource  meta      http://userscripts.org/scripts/source/153498.meta.js
// @icon                data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAD/ElEQVR42sWXXUwUVxTH/zN3v0AxyDZboCAWKZWWWq2midbYmCo01GZ5QGqqQVJIMdG2D20aX0ztU1OMsWlSHzTG+CCNFY2CENLWxEZtUrWJUahERPwgrRRLrcAuu7Mz13vv7M7OsgvsDlD/yWTm7E7u+d1z75x7joSnLMls/FCFvCW5qJtjR6mdwD6TjhQVyqiCztsPcaiiCf1xAG2bUbGqAMccBHP1f2RImQWQ0j3smb1GVUBTQcN3JLhTs80vNcA8+9lg1AAJqhj59S7ee+co2g0APvOyYtywh51LOctBisog2dPYeGyQUPhSg6DirtvGfxHb9Mzvwg6NMQhfHMRPN1FS3Yx+AdD9Eb7Iz8Ru/iwXvQ35uRUTDhzndDyg+X8txPxqCZfk/n/YvfhbfCkA+j/F8fnpqJKefQXk+bWJnZocUeYIE0FN4tSsIR+a8/diowB48DlOZbiIl7y8Uay9Eb64cCZyymA0JSmnZg0HcDq7EZVRAHe2l+SuiJkNNYVWzlkGOfc1wDlP35R8+/CNKhPQwDC0exegdrfoEbACMM+zwCtl5IRnbgpxWhYc3oMgea9POaj2dxcCTZWgQ7csRCDL45UcGbHhZ2F11V+AnP1q0qHVhnox9t2S8M5PBWBuuheyjc08sqYqSOkmOKu/T2ltuYJntiN0aX+KAE7Ja/5WuXjobcvro7Mb6ETwVB2ofwgCll/EAdvSGthXfmK8F+o6juCx6lQB4B3/knNzK8iLGww7cLIW6tUjCYaTkLZzkGVNt7DUvnMIHF47AwA1HSwjlhu2cuUAlJaGePfzC+H6uBsS0Y8PtfcsAkfWzQBA7c8ghW/F/KYNXAcdeSA+NyqSDgVZsJrNPiv6zuANhFik1O5W0ME/pgHwwS8gC9fAqjhg8EQN1OvxGzk5gPqLbHarLAOIaAz/ibE9eRi/wZMD+PC3pBLQVPI15gB82VIFcG37XU+/YYW6ToivQNQECSWJk9T+5i6RoiPy7ysE/bfPAsCOLsiel8QzDY7C/5Vbz5BTyLGlDbbiiijAN0UsPfdOE0BVxEzwuH9S5/yAcjZcBjFFzteYy5bgr9QBnFt/BFm03rC1R/eg9rTr5dYE4ktG8lcaNh19CP/XHljahLY3PoOjfM+UIZ9MCjsTFHY2jFdSAPzsd22/BpkVp1ZERwbg37807gtIHoBJchfDuakZMivXUpGoDdiBNK1MGKUgrFgtAylgKXdOtl62JXbL1nwQ6t3z0Ho69BJ9AsUARIpSS3G2qJii1FyW/1+KKct5Y7KeNSZGVzTL4o3JpTsoKW8KNyZcca3ZLDq/yFqzDebWLKLW95H3wjOz2JwG0dnzDw69m6g5fVp6As2DgD9ZJr3kAAAAAElFTkSuQmCC
// @versioninfo         Added Feature: Skips Content Warning
// ==/UserScript==

/*
********************************************************************************************
Copyright © TimidScript
TimidScript's Homepage:         http://userscripts.org/users/100610
Script's Homepage:              http://userscripts.org/scripts/show/153498

------------------------------------
 Version History
------------------------------------
Version 1.0.6
 - Skips Content Warning
Version 1.0.5
 - Disabled the script from running in iframes.
Version 1.0.4
 - Bug Fixes provided by aaferrari. Supports com.ar and fix to do with 
 back history.
Version 1.0.3
 - runs at the document start.
 - picks up redirect http status 302 and acts accordingly
Version 1.0.2
 - Icon update
 - Altered update script
Version 1.0.1
 - Bug fix. Handle more blogspot urls.
********************************************************************************************/

(function ()
{
    SkipWarning(0);

    if (window.self === window.top)
    {
        var host = document.location.hostname;
        var parts = host.split(/\./);
        var i = parts.length - 1;


        if (parts[i].toLowerCase() != 'com')
        {
            var url = 'http://';
            for (var j = 0; j <= i - 1; j++)
            {

                if (parts[j] != "co" && parts[j] != "com") url += parts[j] + '.';
            }
            url += 'com/ncr' + document.location.pathname;
            document.location.replace(url);
        }
        else
        {
            xhr = XMLHttpRequest();
            xhr.open("head", document.URL, false);
            xhr.send(null);
            if (xhr.status == 302)
            {
                document.location.href.replace('/ncr' + document.location.pathname);
            }
        }        
    }
}());



function SkipWarning(i)
{    
    var a = document.getElementsByClassName("maia-button-primary")[0];    
    if (a)
    {
        window.open(a.href, "_parent");        
    }
    else if (i < 10)
    {
        setTimeout(function ()
        {
            SkipWarning(++i)
        }, 100);
    }
}