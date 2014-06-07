// ==UserScript==
// @name           Google play QR Creator
// @version        3.2.20131208
// @namespace      http://userscripts.org/users/ppppq
// @author         ppppq
// @description    create QR
// @include        https://play.google.com/store/*
// @grant          none
// ==/UserScript==

(function(d) {
    var bodyContent = d.getElementById('body-content');
    var observer = new MutationObserver(function(aMutations) {
        if (isAppsPage()) {
            var qr = d.getElementById('GM_qr') || null;

            if (qr) {
                return;
            }

            if (bodyContent.querySelector('.details-wrapper.apps')) {
                appendQR();
                return;
            }
        }
    });

    if (isAppsPage()) {
        appendQR();
    }
    observer.observe(bodyContent, {
        childList     : true,
    });



    function appendQR() {
        var l = d.location.href;
        var qrHTML = '<img id="GM_qr" width=120 height=120 src="https://chart.googleapis.com/chart?chs=120&cht=qr&chl=' + encodeURIComponent(l) + '">';
        var qrContainer = bodyContent.getElementsByClassName('info-container')[0] || null;

        if (qrContainer) {
            qrContainer.insertAdjacentHTML('beforeend', qrHTML);
        }
    }
    function isAppsPage() {
        return /^https:\/\/play\.google\.com\/store\/apps\/details\?(?:[^\/#]+?&)?id=/.test(d.location.href);
    }
})(document);