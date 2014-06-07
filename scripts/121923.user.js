// ==UserScript==
// @name           Don't track me Google
// @namespace      Rob W
// @description    Removes the annoying link-conversion at Google Search/maps/... The Referrer is also hidden to improve your privacy. Designed for Firefox and Google Chrome.
// @version        3.6
// @match    *://*.google.com/*
// @match    *://*.google.ad/*
// @match    *://*.google.ae/*
// @match    *://*.google.com.af/*
// @match    *://*.google.com.ag/*
// @match    *://*.google.com.ai/*
// @match    *://*.google.am/*
// @match    *://*.google.co.ao/*
// @match    *://*.google.com.ar/*
// @match    *://*.google.as/*
// @match    *://*.google.at/*
// @match    *://*.google.com.au/*
// @match    *://*.google.az/*
// @match    *://*.google.ba/*
// @match    *://*.google.com.bd/*
// @match    *://*.google.be/*
// @match    *://*.google.bf/*
// @match    *://*.google.bg/*
// @match    *://*.google.com.bh/*
// @match    *://*.google.bi/*
// @match    *://*.google.bj/*
// @match    *://*.google.com.bn/*
// @match    *://*.google.com.bo/*
// @match    *://*.google.com.br/*
// @match    *://*.google.bs/*
// @match    *://*.google.co.bw/*
// @match    *://*.google.by/*
// @match    *://*.google.com.bz/*
// @match    *://*.google.ca/*
// @match    *://*.google.cd/*
// @match    *://*.google.cf/*
// @match    *://*.google.cg/*
// @match    *://*.google.ch/*
// @match    *://*.google.ci/*
// @match    *://*.google.co.ck/*
// @match    *://*.google.cl/*
// @match    *://*.google.cm/*
// @match    *://*.google.cn/*
// @match    *://*.google.com.co/*
// @match    *://*.google.co.cr/*
// @match    *://*.google.com.cu/*
// @match    *://*.google.cv/*
// @match    *://*.google.com.cy/*
// @match    *://*.google.cz/*
// @match    *://*.google.de/*
// @match    *://*.google.dj/*
// @match    *://*.google.dk/*
// @match    *://*.google.dm/*
// @match    *://*.google.com.do/*
// @match    *://*.google.dz/*
// @match    *://*.google.com.ec/*
// @match    *://*.google.ee/*
// @match    *://*.google.com.eg/*
// @match    *://*.google.es/*
// @match    *://*.google.com.et/*
// @match    *://*.google.fi/*
// @match    *://*.google.com.fj/*
// @match    *://*.google.fm/*
// @match    *://*.google.fr/*
// @match    *://*.google.ga/*
// @match    *://*.google.ge/*
// @match    *://*.google.gg/*
// @match    *://*.google.com.gh/*
// @match    *://*.google.com.gi/*
// @match    *://*.google.gl/*
// @match    *://*.google.gm/*
// @match    *://*.google.gp/*
// @match    *://*.google.gr/*
// @match    *://*.google.com.gt/*
// @match    *://*.google.gy/*
// @match    *://*.google.com.hk/*
// @match    *://*.google.hn/*
// @match    *://*.google.hr/*
// @match    *://*.google.ht/*
// @match    *://*.google.hu/*
// @match    *://*.google.co.id/*
// @match    *://*.google.ie/*
// @match    *://*.google.co.il/*
// @match    *://*.google.im/*
// @match    *://*.google.co.in/*
// @match    *://*.google.iq/*
// @match    *://*.google.is/*
// @match    *://*.google.it/*
// @match    *://*.google.je/*
// @match    *://*.google.com.jm/*
// @match    *://*.google.jo/*
// @match    *://*.google.co.jp/*
// @match    *://*.google.co.ke/*
// @match    *://*.google.com.kh/*
// @match    *://*.google.ki/*
// @match    *://*.google.kg/*
// @match    *://*.google.co.kr/*
// @match    *://*.google.com.kw/*
// @match    *://*.google.kz/*
// @match    *://*.google.la/*
// @match    *://*.google.com.lb/*
// @match    *://*.google.li/*
// @match    *://*.google.lk/*
// @match    *://*.google.co.ls/*
// @match    *://*.google.lt/*
// @match    *://*.google.lu/*
// @match    *://*.google.lv/*
// @match    *://*.google.com.ly/*
// @match    *://*.google.co.ma/*
// @match    *://*.google.md/*
// @match    *://*.google.me/*
// @match    *://*.google.mg/*
// @match    *://*.google.mk/*
// @match    *://*.google.ml/*
// @match    *://*.google.mn/*
// @match    *://*.google.ms/*
// @match    *://*.google.com.mt/*
// @match    *://*.google.mu/*
// @match    *://*.google.mv/*
// @match    *://*.google.mw/*
// @match    *://*.google.com.mx/*
// @match    *://*.google.com.my/*
// @match    *://*.google.co.mz/*
// @match    *://*.google.com.na/*
// @match    *://*.google.com.nf/*
// @match    *://*.google.com.ng/*
// @match    *://*.google.com.ni/*
// @match    *://*.google.ne/*
// @match    *://*.google.nl/*
// @match    *://*.google.no/*
// @match    *://*.google.com.np/*
// @match    *://*.google.nr/*
// @match    *://*.google.nu/*
// @match    *://*.google.co.nz/*
// @match    *://*.google.com.om/*
// @match    *://*.google.com.pa/*
// @match    *://*.google.com.pe/*
// @match    *://*.google.com.ph/*
// @match    *://*.google.com.pk/*
// @match    *://*.google.pl/*
// @match    *://*.google.pn/*
// @match    *://*.google.com.pr/*
// @match    *://*.google.ps/*
// @match    *://*.google.pt/*
// @match    *://*.google.com.py/*
// @match    *://*.google.com.qa/*
// @match    *://*.google.ro/*
// @match    *://*.google.ru/*
// @match    *://*.google.rw/*
// @match    *://*.google.com.sa/*
// @match    *://*.google.com.sb/*
// @match    *://*.google.sc/*
// @match    *://*.google.se/*
// @match    *://*.google.com.sg/*
// @match    *://*.google.sh/*
// @match    *://*.google.si/*
// @match    *://*.google.sk/*
// @match    *://*.google.com.sl/*
// @match    *://*.google.sn/*
// @match    *://*.google.so/*
// @match    *://*.google.sm/*
// @match    *://*.google.st/*
// @match    *://*.google.com.sv/*
// @match    *://*.google.td/*
// @match    *://*.google.tg/*
// @match    *://*.google.co.th/*
// @match    *://*.google.com.tj/*
// @match    *://*.google.tk/*
// @match    *://*.google.tl/*
// @match    *://*.google.tm/*
// @match    *://*.google.tn/*
// @match    *://*.google.to/*
// @match    *://*.google.com.tr/*
// @match    *://*.google.tt/*
// @match    *://*.google.com.tw/*
// @match    *://*.google.co.tz/*
// @match    *://*.google.com.ua/*
// @match    *://*.google.co.ug/*
// @match    *://*.google.co.uk/*
// @match    *://*.google.com.uy/*
// @match    *://*.google.co.uz/*
// @match    *://*.google.com.vc/*
// @match    *://*.google.co.ve/*
// @match    *://*.google.vg/*
// @match    *://*.google.co.vi/*
// @match    *://*.google.com.vn/*
// @match    *://*.google.vu/*
// @match    *://*.google.ws/*
// @match    *://*.google.rs/*
// @match    *://*.google.co.za/*
// @match    *://*.google.co.zm/*
// @match    *://*.google.co.zw/*
// @match    *://*.google.cat/*
// @grant    GM_getValue
// ==/UserScript==

// Chrome extension:
// https://chrome.google.com/webstore/detail/dont-track-me-google/gdbofhhdmcladcmmfjolgndfkpobecpg

// Technical details at:
// Userscripts.org: http://userscripts.org/scripts/show/121923
// Preserving link: http://webapps.stackexchange.com/a/22339/15957
// Hiding referrer: http://stackoverflow.com/q/a/8957778/938089

// @history   31-dec-2011 Release
// @history   03-jan-2012 Patched History behaviour
// @history   08-jan-2012 Changed script injection method @Chromium 17
// @history   08-jan-2012 Added doNotTrack method to disable referrer
// @history   17-jan-2012 Improved doNotTrack referrer-hiding, 100% for Chrome
// @history   21-jan-2012 Published a 100% referrer-hiding method for Firefox
// @history   21-jan-2012 Modified match rules to reduce file size.
// @history   24-jan-2012 Extended support: Firefox 2+ (previously 4+)
// @history   06-feb-2012 The rewrite for existing URLs has been fixed
// @history   15-feb-2012 [FF] Fixed ASCII-url bug.
// @history   15-feb-2012 [FF] Added option to disable referrer hiding for downloadables.
// @history   18-feb-2012 [FF] Fixed detection to ignore non-search pages and links.
// @history   18-feb-2012 [FF,CR] Moved guide from source code to USO.
// @history   18-feb-2012 [FF] Added persistent settings feature
// @history   18-feb-2012 [FF,CR] Corrected URL decoding for existing Google-URLs
// @history   26-feb-2012 [FF,CR] Added support for subdomains: ipv6, maps, ditu
// @history   13-aug-2012 [CR] Updated to manifest version 2
// @history   15-nov-2012 [FF] Ignore non-link anchors
// @history   15-nov-2012 [FF,CR] Implemented support for Google Maps and Ditu redirection URLs
// @history   15-nov-2012 [FF,CR] UX improvement: Clean URL on hover
// @history   15-nov-2012 [CR] Published Chrome extension
// @history   25-apr-2013 [FF,CR] Restructured code
// @history   25-apr-2013 [FF] Added very short-lived observer to ensure that href does not change
// @history   25-apr-2013 [FF,CR] Remove <a ping> to avoid tracking

// ### ### ### Configuration ### ### ###
/* Track removal level. See http://userscripts.org/topics/97940#row-418831
 **** Recommended value for Firefox: 3 or 1
 *  Level 0 - Only remove Google's URL redirect. The referrer is NOT Hidden!
 *  Level 1 - Also hide the referrer on left and middle click
 *  Level 3 - Adds referrer-hiding for right-click (contextmenu)
 *  Level 5/7 Also hide referrer for downloadables (hide all referrers)
 */

var HIDE_REFERRER_LEVEL = 3;

/* 
 * Greasemonkey persistent setting OVERRIDES the HIDE_REFERRER_LEVEL variable.
 * This preference can be modified manually by visiting about:config
 *  greasemonkey.scriptvals.Rob W/Don't track me Google.HIDE_REFERRER_LEVEL
 * This feature is fully covered at: http://userscripts.org/topics/97940
 */
if (typeof GM_getValue === 'function') {
    var user_pref = GM_getValue('HIDE_REFERRER_LEVEL');
    if (+user_pref === user_pref || /^\d+$/.test(user_pref)) {
        HIDE_REFERRER_LEVEL = user_pref & 3;
    }
}


/* Very strict pattern to match Google search URI. Last update: 188 domains*/
var google_pattern =
/*protocol */"^https?:\\/\\/" + 
/*subdomain*/"((www|encrypted|news|groups|maps|ditu|video|images|ipv6)\\.)?" + 
/*domain   */   "google\\.(com|" +
/* .tld    */"(a[demstz]|b[aefgijsy]|c[adfghilmnvz]|d[ejkmz]|e[es]|" +
                "f[imr]|g[aeglmpry]|h[nrtu]|i[emqst]|j[eo]|k[igz]|" +
                "l[aiktuv]|m[degklnsuvw]|n[eloru]|p[lnst]|r[ouw]|" +
                "s[cehiknomt]|t[dgklmnot]|v[gu]|ws|rs|cat)" +
/* .com.tld*/"|com\\.(a[fgiru]|b[dhnorz]|c[ouy]|do|e[cgt]|fj|g[hit]|hk" +
                "|jm|k[hw]|l[by]|m[txy]|n[afgip]|om|p[aehkry]" +
                "|qa|s[abglv]|t[jrw]|u[ay]|v[cn])" +
/* .co.tld */"|co\\.(ao|bw|c[kr]|i[dln]|jp|k[er]|ls|m[az]|nz" +
                "|t[hz]|u[gkz]|v[ei]|z[amw])" +
             ")(\\/|$)";
google_pattern = RegExp(google_pattern, 'i');

function main() {
    // Activate the features on known Google domains.
    if (!google_pattern.test(location.href)) return;
    
    preventURLRewrites();
    // Cleans links on hover to show a clear URL in the statusbar
    bind_cleanOnHover();
    // 
    if ('MozBoxSizing' in document.documentElement.style ||
        typeof opera !== 'undefined') {
        // Firefox or Opera detected. <a rel=noreferrer> not supported
        bind_referrerHider_firefox();
    } else {
        bind_referrerHider_webkit();
    }
}


function preventURLRewrites() {
    // To be inserted in the page itself
    function injectedFunction() {
        'use strict';
        // This part disables the UGLY URI-converting
        if (Object.defineProperty) { // FF 4+, Chrome 5+
            Object.defineProperty(window, 'rwt', {
              value: function() {return true;},
              writable: false, configurable: false
            });
        } else { // FF (2-3.6), Chrome 1-4
            window.__defineGetter__('rwt', function() {
              return function() {return true;};
            });
        }
    }
    /* Create script tag to inject in Google Search page */
    var s = document.createElement('script');
    s.textContent = '(' + injectedFunction + ')()';
    (document.head||document.documentElement).appendChild(s);
    s.parentNode.removeChild(s);
}
// This method makes sure that the URL "looks good",
// ie replaces http://google.com/url?=<url> with <url>
// Returns false if a referrer hiding method is needed.
function noTracks(a) {
    var url;
    // Not a link? Bye!
    if (!a.href) return true;
    // Not on a search page? Don't bother changing the URL,
    // as it may have unexpected side effects
    if (!document.querySelector('[name=q]')) return true;
    // A non-common http scheme? Don't try to redirect to avoid conflicts.
    if (!/^(https?|ftps?):$/.test(a.protocol)) return true;
    // <a href="#"> is an internal link/anchor, so referrer hiding is not needed
    if (a.hash && a.href.split('#')[0] == location.href.split('#')[0]) return true;
    
    if (!google_pattern.test(a.href)) {
        // Target URL is not Google..
        // Google shall not know that I visit a site
        if (a.ping) a.ping = null;
        return false;
    }
    
    // At this point, the URL is a Google link.
    // Try to extract the target URL:
    url = /[&?]url=([^&]+)/.exec(a.search);
    if (url && /\/url$/.test(a.pathname)) {
        a.href = decodeURIComponent(url[1]);
        return false;
    }
    // Google Maps / Ditu
    url = /[&?]q=(http[^&]+)/.exec(a.search);
    if (url && /^\/local_url$/.test(a.pathname)) {
        a.href = decodeURIComponent(url[1]);
        return false;
    }
    return true;
}
function bind_cleanOnHover() {
   // This part deals with already-converted URIs, by
   // Replacing http://www.google.nl/url?url=<URI> with <URI>.
   // Clean URL on hover (visual purposes only)
   function cleanURL(e) {
      var a = e.target, depth = 7;
      while (a && a.tagName !== 'A' && --depth > 0) a = a.parentNode;
      if (a && a.tagName === 'A') noTracks(a);
   }
   document.addEventListener('mouseover', cleanURL, true);
}



// Referrer hiding functionality for those which do not support
// rel="noreferrer", such as Firefox
function bind_referrerHider_firefox() {
    function isSpecialPage(a) {
        // Disable referrer hiding for downloadables
        if (HIDE_REFERRER_LEVEL & 4) return false;
        return a &&
              (a = a.parentNode) &&
              (a = a.parentNode) &&
              a.children && (a = a.children[0]) &&
              a.style && a.style.cssFloat === 'left' &&
              a.textContent.trim(); // Non-empty string, e.g.: [PDF]
    }
    // Change URL to data-URI to wipe referrer
    function doNotTrack(u) {
        u = encodeURIComponent(u);
        u = '<!DOCTYPE html><meta charset=utf-8><title>Redirect</title>' +
            '<a href="' + u + '" style="color:blue">' + u + '</a>' +
            '<meta http-equiv=refresh content="0;url=' + u + '">';
        return 'data:text/html,' + u;
    }
    // Note: The strings in doNotTrack('') itself does not contain any
    // special RegExp characters, so it's safe to pass the string to
    // the RegExp constructor without escaping anything.
    var doNotTrackPattern = new RegExp('^' + doNotTrack('([^"]+?)') + '$');
    function undoDoNotTrack(a) {
        var url = doNotTrackPattern.exec(a.href);
        if (url) a.href = decodeURIComponent(a[1]);
    }
    
    // Google tries really hard to change the URL...
    // These href mutation observers are used to ensure that the href
    // of an anchor does not change to something unexpected during a
    // short interval after click (4 milliseconds).
    var bindHrefMutationObserver, freeHrefMutationObserver;
    if (typeof MutationObserver !== 'undefined') {
        bindHrefMutationObserver = function(a, cleanHref) {
            var observer = new MutationObserver(function(mutations) {
                for (var i=0; i<mutations.length; ++i) {
                    var mutation = mutations[i];
                    if (mutation.type === 'attributes' &&
                        mutation.attributeName === 'href') {
                        freeHrefMutationObserver(a, observer);
                        a.href = cleanHref;
                        return;
                    }
                }
            });
            observer.observe(a, { attributes: true });
            return observer;
        };
        freeHrefMutationObserver = function(a, observer) {
            observer.disconnect();
        };
    } else {
        bindHrefMutationObserver = function(a, cleanHref) {
            var listener = function(e) {
                if (e.attrName === 'href') {
                    freeHrefMutationObserver(a, listener);
                    a.href = cleanHref;
                    return;
                }
            };
            return listener;
        };
        freeHrefMutationObserver = function(a, observer) {
            a.removeEventListener('DOMAttrModified', observer, false);
        };
    }
    
    function hideRefer(e) {
        var a = e.target, depth = 7;
        while (a && a.tagName !== 'A' && --depth > 0) a = a.parentNode;
        if (a && a.tagName === 'A') {
            if (e.type === 'contextmenu' || e.button < 2) {
              undoDoNotTrack(a);
              // Ignore internal Google links
              if (noTracks(a)) return;
              if (isSpecialPage(a)) return;
              var realHref = a.href;
              // Temporary change URL to hide referrer
              var cleanHref = doNotTrack(a.href);
              // Ensure that the href is nice:
              a.href = cleanHref;
              var observer = bindHrefMutationObserver(a, cleanHref);
              
              // Restore original URL
              setTimeout(function() {
                freeHrefMutationObserver(a, observer);
                a.href = realHref;
              }, 4);
            }
        }
    }
    if (HIDE_REFERRER_LEVEL & 1) {
        // Left / middle click, [Enter] key on link
        document.addEventListener('click', hideRefer, true);
    }
    if (HIDE_REFERRER_LEVEL & 2) {
        // Contextmenu (right-click / keyboard)
        document.addEventListener('contextmenu', hideRefer, true);
    }
}

// <a rel=noreferrer> is supported in Webkit only.
function bind_referrerHider_webkit() {
   function hideRefer(e) {
      var a = e.target;
      if (a && a.tagName !== 'A') a = a.parentNode;
      if (a && a.tagName === 'A') {
         a.rel = 'noreferrer';
         noTracks(a);
      }
   }
   // Left / middle / right (any) click
   window.addEventListener('mousedown',hideRefer,true);
   // Tab-tab-tab-Enter
   window.addEventListener('keydown', hideRefer, true);
}


main();