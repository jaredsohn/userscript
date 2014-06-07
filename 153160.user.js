// ==UserScript==
// @name	"Forum.Animes-bg.com Spoilertag Fix"
// @version	1
// @include	http://forum.animes-bg.com/*
// @license	MIT; http://en.wikipedia.org/wiki/Mit_license
// @copyright	Daniel Kolev <mooner4u@gmail.com>
// ==/UserScript==

(function () {
    Main = {        
	getCSSRule: function (ruleName, deleteFlag) {
            ruleName = ruleName.toLowerCase();
            if (document.styleSheets) {
                for (var i = 0; i < document.styleSheets.length; i++) {
                    var styleSheet = document.styleSheets[i];
                    var ii = 0;
                    var cssRule = false;
                    do {
                        if (styleSheet.cssRules) {
                            cssRule = styleSheet.cssRules[ii];
                        } else {
                            cssRule = styleSheet.rules[ii];
                        }
                        if (cssRule) {
                            if (cssRule.selectorText.toLowerCase() == ruleName) {
                                if (deleteFlag == 'delete') {
                                    if (styleSheet.cssRules) {
                                        styleSheet.deleteRule(ii);
                                    } else {
                                        styleSheet.removeRule(ii);
                                    }
                                    return true;
                                } else {
                                    return cssRule;
                                }
                            }
                        }
                        ii++;
                    } while (cssRule)
                }
            }
            return false;
        },
        spoiler_fix: function () {
            /* spoiler fixes */
            var spoilertags = document.getElementsByClassName("spoiler");
            if (spoilertags.length == 0) return;
            var newwidth = 0;
            if (spoilertags.length > 0) {
                /* word wrap*/
                var precss = Main.getCSSRule("pre");
                precss.style.whiteSpace = "pre-wrap";
                precss.style.whiteSpace = "-moz-pre-wrap";
                precss.style.whiteSpace = "-pre-wrap";
                precss.style.whiteSpace = "-o-pre-wrap";
                precss.style.wordWrap = "break-word";
            }
            newwidth = window.getComputedStyle(spoilertags[0].parentNode).width - 40;
            for (var i = 0; i < spoilertags.length; i++) {
                /* fix width bug */
                spoilertags[i].style.width = newwidth;
                var pre = spoilertags[i].getElementsByTagName("pre")[0];
                pre.style.width = "100%";
            }
        }
    }
    Main.spoiler_fix();
})();