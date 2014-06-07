// ==UserScript==
// @name           Google Results Filter
// @namespace      http://www.djordjeungar.com
// @description    Filters out blacklisted sites from Google results
// @include        http://www.google.com/search*
// @require        http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

$(document).ready(function () {
    // Icons
    var imgXpertWarn = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAjUlEQVQ4Ea1RiwqAIAyc1ef4IUHfG/Qh/k6Yq2anDcYoQdzjvDs2or9PXmLOI9Vr8Q8WwOq7CE53xSGSTpiY8ZZMSAPgWWBBZoO1gIkWI0nY6YV3zUAT+EzQWEK7ooa2uY85Y6oDXpF8krcHc73HVQLyruhWeQhE1vn+SDBHp/YF1x0UMm2AXAtrajZ3AAefKfLLNwXRAAAAAElFTkSuQmCC";
    var imgXtrnlWarn = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAApElEQVQYGWNkQANXzI3+owlhcjca6//fk572Hx2ANDMhK/c/e5FR4sIZhk0mBsjCYDbLel1NDKus0jIxFDKAFMIAyIrXM2eAuSAa5BQQQLH6qoUxg3hSGoNIWjrDm1kzGV7Om8WgzMLMsDcjHWw63I0gRRfPnYMruv3tO4POyXOMX8+cBNMoVoOsA1kDAhhuR3YjWAWUQFfIAnLABj0tTF+iiQAA1iiHNqNqLyIAAAAASUVORK5CYII="

    var blacklistedSites = new Array();
    blacklistedSites.push('http://www.experts-exchange.com/'); // douchebags
    // add as many sites as you want, but as the list grows it'll add weight (execution time) to the script
    function isBlacklisted(href) {
        for (var i = 0; i < blacklistedSites.length; ++i) {
            if (href.indexOf(blacklistedSites[i]) != -1) return true;
        }
        return false;
    }

    function injectCSSStyle(cssdata) {
        head = document.getElementsByTagName("head")[0];
        style = document.createElement("style");
        style.setAttribute("type", 'text/css');
        style.innerHTML = cssdata;
        head.appendChild(style);
    }
    injectCSSStyle([
        ".gm_blacklisted {padding-left:16px; background: url(" + imgXpertWarn + ") left top no-repeat;}", 
        ".gm_blacklisted h3 a {color:red !important}", 
        ".gm_hide div.s {display:none}", 
        ".gm_external img {border:none; outline:none}"
        ].join("\n"));

    function removeGoogleOnMouseDowns() {
        var links = document.getElementsByTagName('a');

        for (var i = 0; i < links.length; i++) {
            links[i].removeAttribute('onmousedown');
        }
    }
    removeGoogleOnMouseDowns();

    jQuery('div#res li.g').each(function () {
        var $this = $(this);
        var href = $this.find('h3 a').attr('href');
        if (isBlacklisted(href)) {
            $outgoing = jQuery('<a>[<img src="' + imgXtrnlWarn + '"/>]</a>').attr('href', href).addClass('gm_external');
            $this.find('h3').append($outgoing);

            $this.addClass('gm_blacklisted gm_hide').find('a').click(function (evt) {
                evt.preventDefault();
                $this.toggleClass('gm_hide');
            });
        }
    });

});