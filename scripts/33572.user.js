// Written by Dave Child
// http://www.addedbytes.com
// http://code.google.com/p/addedbytes-userscripts/
//
// Click on the red box to make it go away.
// Note, some of Google's services fail to work with this, hence excluded.
// If you only want to enable this on secure pages, add an include for https://*
//
// ==UserScript==
// @name          XSS Alarm
// @namespace     http://addedbytes.com/
// @description   Popup warning if script loaded from third party.
// @exclude       http://mail.google.com/*
// @exclude       http://www.google.com/calendar/*
// ==/UserScript==

(function() {

    var xss_alarm_strDomain = document.domain.replace(/(www|forums|news)\./,'');
    var xss_alarm_box = document.getElementById("XSSAlarmBox");

    // Ignore current domain as well as common tracking or advertising URLs.
    // I say common ... I really mean common for me.
    // I recommend you add or remove to reflect your own browsing habits.
    var arrExclude = new Array(
            xss_alarm_strDomain // Domain being viewed
        // Tracking
            ,'google-analytics.com' // Google analytics
            ,'reinvigorate.net' // Reinvigorate
            ,'yimg.com' // Yahoo
            ,'co2stats.com' // CO2Stats.com (HN)
            ,'sitemeter.com' // Sitemeter
            ,'statcounter.com' // StatCounter
            ,'hittail.com' // HitTail
            ,'quantserve.com' // Quantcast
            ,'woopra.com' // Woopra
            ,'atdmt.com' // Atlas
            ,'addfreestats.com' // AddFreeStats
            ,'stats.wordpress.com' // WP Sites
            ,'overture.com' // Overture
        // Advertising
            ,'intellitxt.com' // I hate you, intellitxt
            ,'googlesyndication.com' // Google adsense
            ,'googleadservices.com' // Google adsense
            ,'doubleclick.net' // Doubleclick
            ,'2mdn.net' // Doubleclick
            ,'smartadserver.net' // Smart AdServer
            ,'affinity.com' // Affinity
        // Generic but throws up common notice
            ,'bbc.co.uk' // BBC
            ,'googleapis.com' // Google APIs
            ,'yahoo.com' // Yahoo
            ,'google.com' // Google
            ,'amazon.com' // Amazon
            ,'fbcdn.net' // Facebook
            ,'turner.com' // CNN etc
            ,'msn.com' // MSN
            ,'live.com' // More MSN
            ,'gmodules.com' // More Google
        // Social Bookmark Buttons
            ,'digg.com' // "Digg This" button
            ,'reddit.com' // Reddit. Better than Digg.
            ,'addthis.com' // Button for lots of services
    );

    function xss_alarm(){
        // Check third party URLs being loaded. Script first
        var arrWarnings = new Array();
        var arrElements = document.getElementsByTagName("script");
        var intElementCount = arrElements.length;
        for (i = 0; i < intElementCount; i++) {
            if (xss_alarm_url_warning(arrElements[i].src) == false) {
                arrWarnings.push(arrElements[i].src);
            }
        }
        // Then iframes
        arrElements = document.getElementsByTagName("iframe");
        intElementCount = arrElements.length;
        for (i = 0; i < intElementCount; i++) {
            if (xss_alarm_url_warning(arrElements[i].src) == false) {
                arrWarnings.push(arrElements[i].src);
            }
        }
        xss_alarm_show_box(arrWarnings);
    }

    function xss_alarm_url_warning(strURL) {
        if ((strURL == '') || (strURL == 'about:blank')) { // Ignore - blank URL
            return true;
        }
        var intExclude = arrExclude.length;
        for (j = 0; j < intExclude; j++) {
            var intDomainLocation = strURL.indexOf('.' + arrExclude[j]);
            if ((intDomainLocation > -1) && (intDomainLocation < 20)) {
                return true;
            }
            intDomainLocation = strURL.indexOf('/' + arrExclude[j]);
            if ((intDomainLocation > -1) && (intDomainLocation < 20)) {
                return true;
            }
        }
        return false;
    }

    function xss_alarm_hide_box() {
        xss_alarm_box.style.display = 'none';
    }

    function xss_alarm_show_box(arrWarnings) {
        var intWarnings = arrWarnings.length;
        if ((intWarnings > 0) && (!xss_alarm_box)) {
            xss_alarm_box = document.createElement("div");
            xss_alarm_box.setAttribute("id","XSSAlarmBox");
            xss_alarm_box.setAttribute("style","position: absolute; z-index: 100000; text-align: left; top: 20px; right: 20px; padding: 10px 10px 5px 10px; background: #f00; color: #fff; max-width: 30%; min-width: 200px;");

            var aTotal = document.createElement("div");
            aTotal.setAttribute("style","background: #f66; border-left: 2px solid #fff; margin: 0 0 5px 0; padding-left: 5px; color: #fff;");
            aTotal.innerHTML = intWarnings + ' unrecognised third party scripts found.';
            xss_alarm_box.appendChild(aTotal);

            for (i = 0; i < intWarnings; i++) {
                if (arrExclude.indexOf(arrWarnings[i]) == -1) {
                    var aWarning = document.createElement("div");
                    aWarning.setAttribute("style","border-left: 2px solid #fff; margin: 0 10px 5px 0; padding-left: 5px; color: #fff;");
                    aWarning.innerHTML = arrWarnings[i];
                    xss_alarm_box.appendChild(aWarning);
                }
            }
            document.body.appendChild(xss_alarm_box);
            xss_alarm_box.addEventListener("click", xss_alarm_hide_box, false);
            return true;
        }
    }
    
    // Originally used an on load listener but that could easily be overwritten by an attacking script.
    xss_alarm();

})();