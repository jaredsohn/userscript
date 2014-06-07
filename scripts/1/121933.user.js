// ==UserScript==
// @name           Author/reputation hider
// @description    Proof of concept to hide the author/reputation of users until mouseover on Japanese stack exchange
// @include        http://japanese.stackexchange.com/*
// @include        http://meta.japanese.stackexchange.com/*
// ==/UserScript==

var $;

function waitForJQuery() {
    // Wait for jQuery
    if (typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(waitForJQuery, 100);
    } else {
        $ = unsafeWindow.jQuery;
        bindEvents();
    }
}

function bindEvents() {
    var hideCls = '.user-details, .user-gravatar32';

    $(document).find('.post-signature').
        mouseover(function() {
            $(this).find(hideCls).css('visibility', 'visible');
        }).
        mouseout(function() {
            $(this).find(hideCls).css('visibility', 'hidden');
        })//.
        //find(hideCls).css('visibility', 'hidden');
}

function addGlobalStyle(css) {
    try {
        var elmHead, elmStyle;
        elmHead = document.getElementsByTagName('head')[0];
        elmStyle = document.createElement('style');
        elmStyle.type = 'text/css';
        elmHead.appendChild(elmStyle);
        elmStyle.innerHTML = css;
    } catch (e) {
        if (!document.styleSheets.length) {
            document.createStyleSheet();
        }
        document.styleSheets[0].cssText += css;
    }
}

// Hide the user information a bit before jQuery loads using CSS
addGlobalStyle('.user-details, .user-gravatar32 {visibility: hidden;}', 0);

waitForJQuery();
