// ==UserScript==
// @name       Youtube - logo link to subs
// @homepage       http://userscripts.org/scripts/show/153664
// @updateURL      https://userscripts.org/scripts/source/153664.meta.js
// @namespace  DazZ
// @version    0.3.8.2
// @description  Links the youtube logo to subscrions instead of "what to watch".
// @include        http://*youtube.com*
// @include        https://*youtube.com*

// ==/UserScript==
function main(){    
    //Standard Logo
    document.getElementById('logo-container').setAttribute('href', 'http://www.youtube.com/feed/subscriptions');
}
main();
