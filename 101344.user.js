// ==UserScript==
// @name          SafeTropes
// @namespace     urn:bevonn
// @description   Browse TV Tropes safely
// @match         http://tvtropes.org/*
// @version       1.0
// @icon          http://tvtropes.org/favicon.ico
// ==/UserScript==

(function (callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "http://code.jquery.com/jquery-latest.min.js");
    script.addEventListener('load', function() {
        var script = document.createElement("script");
        script.textContent = "(" + callback.toString() + ")();";
        document.body.appendChild(script);
      }, false);
    document.body.appendChild(script);
})(function () {
    function showMsg(msg) {
        var el = jQuery('<div>').css({
            position: 'fixed',
            height: '32px',
            width: '220px',
            marginLeft: '-110px',
            top: '0',
            left: '50%',
            padding: '5px 10px',
            zIndex: 1001,
            fontSize: '12px',
            color: '#222',
            backgroundColor: '#f99'
        }).text(msg);
        jQuery('body').append(el);
        window.setTimeout(function () {
            el.fadeOut('slow', function () {
                jQuery(this).remove();
            });
        }, 3500);
    }

    function removeLinks() {
        jQuery('a').removeAttr('href');
    }

    removeLinks();
    return showMsg('SafeTropes engaged!');
});
