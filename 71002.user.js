// ==UserScript==
// @name           Secure the Tubes!
// @namespace      http://userscripts.org/users/23652
// @description    Forces the following list of sites to use a secure connection.
// @include        http://addons.mozilla.org/*
// @include        http://alipay.com/*
// @include        http://*amazon.com/*
// @include        https://*amazon.com/*
// @include        http://*amazon.co.uk/*
// @include        https://*amazon.co.uk/*
// @include        http://*binsearch.info/*
// @include        http://*binsearch.net/*
// @include        http://www.dropbox.com/*
// @include        http://*evernote.com/*
// @include        http://eztv.it/*
// @include        http://*.facebook.com/*
// @include        http://*friendfeed.com/*
// @include        http://futz.me/*
// @include        http://login.live.com/
// @include        http://mail.google.com/*
// @include        http://www.google.*/calendar/*
// @include        http://docs.google.*/*
// @include        http://spreadsheets.google.*/*
// @include        http://www.google.*/reader/*
// @include        http://www.google.*/bookmarks/*
// @include        http://www.google.*/history/*
// @include        http://groups.google.*/*
// @include        http://sites.google.*/*
// @include        http://knol.google.*/*
// @include        http://www.google.*/notebook/*
// @include        http://www.google.*/webmasters/tools/*
// @include        http://www.google.*/contacts
// @include        http://www.google.*/voice/*
// @include        http://www.google.*/finance*
// @include        http://www.google.*/dictionary*
// @include        http://www.irctc.co.in/*
// @include        http://*isohunt.com/*
// @include        http://passport.nic.in/*
// @include        http://www.opendns.com/*
// @include        http://orkut.com/*
// @include        http://*.outlook.com/*
// @include        http://www.orkut.co.in/*
// @include        http://*paypal.com/*
// @include        http://ssl.scroogle.org/*
// @include        http://thepiratebay.org/*
// @include        http://twitpic.com/*
// @include        http://*twitter.com/*
// @include        http://help.ubuntu.com/*
// @include        http://*.wikileaks.org/*
// @include        http://*.wordpress.com/*
// @include        http://*.zoho.com/*
// @include        http://*.xmarks.com/*
// @include        https://*
// @copyright      PhiTheNumber
// @version        1.0.0
// @license        Creative Commons Attribution-Noncommercial-Share Alike 3.0 United States License
// ==/UserScript==
/*
Combined lists from the following other scripts and I added a few myself
http://userscripts.org/scripts/show/5951
http://userscripts.org/scripts/show/66704
http://userscripts.org/scripts/show/29090
*/

(
function()
{
        var url = window.location.href;

        if(url.indexOf("http://")==0) 
        {
                window.location.replace(location.href.replace(url.substring(0,7), "https://"));
        }

        if(url.indexOf("https://")==0)
        {
        for(var i=0,link; (link=document.links[i]); i++) 
        {
                if(link.href.indexOf("http://")==0) 
                {
                link.href = link.href.replace(link.href.substring(0,7), "https://");
                }
        }
}
}
)
();