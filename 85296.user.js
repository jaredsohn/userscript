// ==UserScript==
// @name           FrontierVille Filter
// @author         http://www.dorffweb.com/
// @version        0.5.1
// @namespace      http://userscripts.org/scripts/show/85296
// @description    FontierVille Filter - hide all non-FrontierVille Facebook entries.
// @include        *facebook.com*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

$(document).ready(function() {
    var filterButton = $('#kcdFrVFilterAnchor');
    var pageNav = $("#pageNav");
    if (filterButton.length == 0 && pageNav.length == 1) {
        pageNav.prepend("<li><a href='#' id='kcdFrVFilterAnchor'>FrontierVille Filter</a></li>");
        $("#kcdFrVFilterAnchor").click(function() {
            Filter_Facebook_Stories();
        });
    }
});

function Filter_Facebook_Stories() {
    $('.uiUnifiedStory').each(function(index) {
        var text = $(this).text();
        var keepStory = true;
        if (text.indexOf("via Frontier") == -1) {
            keepStory = false;
        } else {
            if (text.indexOf("Get Tool") != -1) {
                keepStory = false;
            } else if (text.indexOf("Gimme a chick") != -1) {
                keepStory = false;
            } else if (text.indexOf("Send items") != -1) {
                keepStory = false;
            } else if (text.indexOf("Go see my gift") != -1) {
                keepStory = false;
            } else if (text.indexOf("Go Play FrontierVille") != -1) {
                keepStory = false;
            }
        }
        if (!keepStory) {
            $(this).remove();
        }
    });

    $('.confirm').each(function(index) {
        var text = $(this).text();
        var keepStory = true;
        if (text.indexOf(" sent a request using FrontierVille:") == -1) {
            $(this).hide();
        } else {
            $(this).show();
        }
    });
}

/** Google Analytics. See where the script is being used and how often. */
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-13257696-9']);
_gaq.push(['_trackPageview']);
(function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = 'https://ssl.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
