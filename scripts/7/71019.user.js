
// ==UserScript==
// @name           Sites Secure Tunnel 
// @namespace      http://userscripts.org/users/fuckgfw
// @description    强制以下站点以https打开
// @include        http://www.google.com/
// @include        http://www.google.com/search?*
// @include        http://mail.google.com/*
// @include        http://www.google.com/webmasters/tools/*
// @include        http://www.google.com/voice*
// @include        http://www.google.tld/reader/*
// @include        http://www.google.tld/adsense/*
// @include        http://www.google.tld/contacts*
// @include        http://www.google.tld/bookmarks/*
// @include        http://www.google.tld/calendar/*
// @include        http://www.google.tld/history/*
// @include        http://www.google.tld/notebook/*
// @include        http://www.google.tld/finance*
// @include        http://www.google.tld/dictionary*
// @include        http://www.google.tld/profiles*
// @include        http://docs.google.tld/*
// @include        http://spreadsheets.google.tld/*
// @include        http://groups.google.tld/*
// @include        http://sites.google.tld/*
// @include        http://code.google.com/*
// @include        http://www.google.tld/accounts/ServiceLogin?service=mail*
// @include        http://ssl.scroogle.org
// @include        http://*paypal.com/*
// @include        http://www.evernote.com/*
// @include        http://www.binsearch.info/*
// @include        http://www.adobe.com/*
// @include        http://www.apple.com/*
// @include        http://www.aol.com/*
// @include        http://www.opendns.com/*
// @include        http://eztv.it/*
// @include        http://twitter.com/*
// @include        http://twitpic.com/*
// @include        http://img.ly/*
// @include        http://thepiratebay.org/*
// @include        http://*.zoho.com/*
// @include        http://secure.wikileaks.org/*
// @include        http://www.alipay.com/*
// @include        http://*.xmarks.com/*
// @include        http://*friendfeed.com/*
// @include        http://www.dropbox.com/*
// @include        http://autoproxy.org/*
// @include        http://www.mozilla.tld/*
// @include        http://www.mozillamessaging.com/*
// @include        http://lastpass.com/*

// @copyright      Agantha Riley
// @version        0.5.3
// @license        GNU GPLv3
// ==/UserScript==
/*
Combined lists from the following other scripts and I added a few myself
http://userscripts.org/scripts/show/5951    (Google Secure Pro 修正.*错误)
http://userscripts.org/scripts/show/29090   (Secure connections on sites 修正https://*错误)
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


/*
 0.2.0 - 2010-3-21  - Chang Google Contacts to http://www.google.tld/contacts* change Google Voice to http://www.google.tld/voice*
*/

// 0.3.0 - 2010-3-27   - Add http://www.dropbox.com/* http://autoproxy.org/*
/*
 0.4.0 - 2010-4-2    - Change http://*twitter.com/* to http://twitter.com/* fixed problem forcing http://blog.twitter.com to https://blog.twitter.com
*/

/*
 0.5.0 - 2010-5-16    - add Mozilla sites http://www.mozilla.tld/* & http://www.mozillamessaging.com/*
*/

/*
 0.5.1 - 2010-5-23    - add google ssl search https://www.google.com/*
*/

/*
 0.5.2 - 2010-5-23    - changed google ssl search http://www.google.com/* to http://www.google.com/
*/