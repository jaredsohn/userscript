// ==UserScript==
// @name           DisableSnowStorm
// @namespace      DisableSnowStorm
// @description    Disable snowflakes of doom
// @include        *
// @copyright      Fabián E. Gallina
// @license        Do What The Fuck You Want To Public License: http://sam.zoy.org/wtfpl/
// ==/UserScript==

// stolen from http://www.w3schools.com/JS/js_cookies.asp
function setCookie(c_name,value,expiredays)
{
    var exdate=new Date();
    exdate.setDate(exdate.getDate()+expiredays);
    document.cookie=c_name+ "=" +escape(value)+
        ((expiredays==null) ? "" : ";expires="+exdate.toUTCString());
}

// Recover 98% of your CPU back.
setCookie('isSnowing', '0');
var script = document.createElement('script');
script.innerHTML = 'try { window.snowStorm.stop() } catch (e) {};';
document.getElementsByTagName('head')[0].appendChild(script);
