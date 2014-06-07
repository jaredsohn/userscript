// ==UserScript==
// @name          buster script
// @description      I <3 Omerta
// @include       http://*.barafranca.com/*
// ==/UserScript==

var sound = false;

try {
    // Parse URL
    var url = document.location.pathname.substr (1);

    //String.prototype.trim = function () { return this.replace (/^\s+|\s+$/g, ''); };

    function load (url) {
        window.addEventListener ('load', function () { document.location.href = url; }, true);
        throw '';
    }

    function dynamictimer (text, url) {
        if (text.data == 'Now') load (url);
        else {
            var explode = text.data.replace ('1 S', '1S');
            explode = explode.split (' ');
            var seconds = explode [explode.length-1];
            var minutes = explode [explode.length-2];
            var firstpart = text.data.substr (0, text.length-seconds.length-minutes.length-1);
            seconds = seconds.substr (0, seconds.length-1)*1;
            minutes = minutes.substr (0, minutes.length-1)*1;
            function counter (item) {
                if (minutes > 0) text.data = firstpart+minutes+'M '+seconds+'S';
                else text.data = firstpart+seconds+'S';
                var t = setTimeout (counter, 1000);
                if (seconds == 0 && minutes == 0) {
                    clearTimeout (t);
                    document.location.href = url;
                }
                seconds = seconds-1;
                if (seconds < 0) { 
                    seconds = 59;
                    minutes -= 1;
                }
            }
            counter (text);
        }
    }

    // Focus OCR
    var ocr = document.getElementsByName ('ver')[0];
    if (ocr) ocr.focus ();

    // Check for errors
    var texts = document.evaluate ('//text()[string-length(normalize-space()) > 0]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    if (texts.snapshotLength > 0) {
        var first = texts.snapshotItem (0).data;
        if (first.match ('MySQL Error')) {
            load (url);
            throw '';
        }
        if (first.match ('You are in jail')) {
            setTimeout ('document.location.reload ()', 15*1000);
            dynamictimer (texts.snapshotItem (0), url);
            var injail = true;
            throw '';
        }
        if (first.match ('You reached your clicklimit')) {
            setTimeout ('document.location.reload ()', 15*1000);
            throw '';
        }
        if (first.match ('The code you') && url != 'sysbul.php' && url != 'jail.php') {
            load (url);
            throw '';
        }
        if (first.match ('You were caught by the cops')) {
            load (url);
            throw '';
        }
        if (first.match ('You bought yourself out')) {
            load ('jail.php');
            throw '';
        }
        if (first.match ('You were caught by the police doing a jailbreak')) {
            load ('cookie.php?buymeout=yes');
            throw '';
        }

    }
    
    // Buy bullets
    if (url == 'sysbul.php' && ocr) { 
        //if (texts.snapshotItem (1).data == ' There are 0 bullets in this factory' || texts.snapshotItem (1).data == ' There are 199 bullets in this factory') document.location.reload ();
        document.getElementsByName ('amount')[0].value = 400;
    }

    // Bust out
    if (url == 'jail.php' && ocr) {
        var family = document.evaluate('//tr[@bgColor="#dbdbdb" or @bgColor="yellow"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        if (family.snapshotLength > 0) {
            var i = Math.round((family.snapshotLength-1)*Math.random());
            family.snapshotItem (i).getElementsByTagName ('input')[0].checked = true;
        }
        else {
            var bust = document.getElementsByName ('bust');
            var i = Math.round((bust.length-1)*Math.random());
            if (bust[i]) bust[i].checked = true;
        }
    }

   if (url == 'jail.php' && !ocr) load ('jail.php');
    } 
    
    catch (e) {
    if (e != '') document.write ('Error: '+e);
}