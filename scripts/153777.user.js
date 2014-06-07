// ==UserScript==
// @name Rouming browser
// @namespace http://rouming-browser.xpdev-hosted.com
// @description Rouming (http://www.rouming.cz) browser. Left and Right arrows switch between the pictures, Insert key shows hidden 18+ content. Delete key redirects to Google. You can permanently show 18+ content (cookies).
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @require http://rouming-browser.xpdev-hosted.com/js/jquery.cookie.js
// @include *rouming.cz/roumingShow.php*
// @include *rouming.cz/roumingGIF.php*
// @include *rouming.cz/roumingGIFList.php*
// @include *roumenovomaso.cz/masoShow.php*
// @include *roumenovomaso.cz/masoGIF.php*
// @include *roumenovomaso.cz/masoGIFList.php*
// @version 0.6.3
// @author Jirka
// ==/UserScript==

rb = jQuery.noConflict();
rb(document).ready(function () {
    var versionNumber = '0.6.3';
    var prev, next, prevGIFList, nextGIFList, isGL, lastCheck;
    var checkInterval = 1000 * 60 * 60 * 24;
    var prevText = '<<';
    var prevTextGIFList = 'prev';
    var nextText = '>>';
    var nextTextGIFList = 'next';
    var adultText = 'Potvrzuji, že je mi 18 a více let a ze chci vidět tento skrytý obrázek.';
    var bgColor = '#6699CC';
    var ckGifName = 'gifFilter18';
    var ckAutoUpdate = 'rouming-browser-autoupdate';
    var ckLastCheck = 'rouming-browser-autoupdate-lastCheck';
    var adultY = '2';
    var adultN = '0';
    var isAdult = adultN;
    var updateY = '1';
    var updateN = '0';
    var autoUpdate = updateY;
    var versionFile = 'http://rouming-browser.xpdev-hosted.com/js/newestVersion.js';
    var homepage = 'http://rouming-browser.xpdev-hosted.com';
    var leavingPage = 'http://www.google.com';
    var versionAlertText = 'Greasemonkey plugin Rouming browser (v' + versionNumber + ') není aktuální, chcete přejít na ' + homepage + '?';

    prev = rb('span a:contains("' + prevText + '")').css('background-color', bgColor);
    next = rb('span a:contains("' + nextText + '")').css('background-color', bgColor);
    prevGIFList = rb('form input[name="'+ prevTextGIFList +'"]');
    nextGIFList = rb('form input[name="'+ nextTextGIFList +'"]');
    isGL = (rb(prevGIFList).length > 0 || rb(nextGIFList).length > 0);

    rb('body').keydown(function (event) {
        if (event.which == 37) { if(isGL) { rb(prevGIFList).click(); return; } location.href = rb(prev).attr('href'); }
        else if (event.which == 39) { if(isGL) { rb(nextGIFList).click(); return; } location.href = rb(next).attr('href'); }
        else if (event.which == 46) { location.href = leavingPage; }
        else if (event.which == 45) { rb('a strong:contains("' + adultText + '")').click(); }
    });

    var widget = rb('<li><a id="rouming_adult_button" href="" title="18+ obsah">18+</a></li><li><a id="rouming_update_button" href="" title="Automaticky zjišťovat novou verzi">U</a></li>');
    rb('div[class*="Menu"] ul').first().append(widget);

    var bAdult = rb('#rouming_adult_button');
    rb(bAdult).click(function () { isAdult = (isAdult == adultN) ? adultY : adultN; rb.cookie(ckGifName, isAdult);});
    var bUpdate = rb('#rouming_update_button');
    rb(bUpdate).click(function () { autoUpdate = (autoUpdate == updateN) ? updateY : updateN; rb.cookie(ckAutoUpdate, autoUpdate);});

    isAdult = rb.cookie(ckGifName);
    if (isAdult == null) { isAdult = adultN; rb.cookie(ckGifName, isAdult);}
    if (isAdult == adultY) { rb(bAdult).css('background-color', bgColor).css('color', 'white');}

    autoUpdate = rb.cookie(ckAutoUpdate);
    if (autoUpdate == null) { autoUpdate = updateY; rb.cookie(ckAutoUpdate, autoUpdate); }
    if (autoUpdate == updateY) { rb(bUpdate).css('background-color', bgColor).css('color', 'white');
        lastCheck = parseInt(rb.cookie(ckLastCheck));
        if (isNaN(lastCheck)) { lastCheck = rb.now(); rb.cookie(ckLastCheck, lastCheck); }
        if (lastCheck + checkInterval < rb.now()) { rb.getScript(versionFile, function () { rb.cookie(ckLastCheck, rb.now());
            if (versionNumber < newestVersion) { if (confirm(versionAlertText)) location.href = homepage; } }); }
    }
});
