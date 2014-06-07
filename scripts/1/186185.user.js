// ==UserScript==
// @name        Font Replacer
// @version     0.2.1
// @description Performs font replacements. By default replaces "cursive" font (which is usually "Comic Sans MS") with "Bad Script".
// @include     *
// ==/UserScript==

// 1. Configure replacement rules.

var replacements = {
    'cursive': 'Bad Script',
};

// 2. Import fonts you need.

WebFontConfig = {
    google: {
        families: ['Bad+Script::latin,cyrillic']
    }
};

(function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
        '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    document.body.appendChild(wf);
})();

// 3. Perform the substitution.

[].forEach.call(document.getElementsByTagName('*'), function(elem) {
    var betterFont = replacements[window.getComputedStyle(elem).fontFamily];
    if (betterFont) {
        elem.style.fontFamily = betterFont;
    }
});
