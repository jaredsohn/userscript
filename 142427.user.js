// ==UserScript==
// @name	OKCupid Image Resizer
// @namespace 	fuck it forums.hipinion.com forums.hipinion.com
// @description	Resizes OKCupid Search Results' Images from small to medium sized.
// @include	http://www.okcupid.com/*
// @include	http://okcupid.com/*
// @include	https://www.okcupid.com/*
// @include	https://okcupid.com/*
// ==/UserScript==

function embiggen() {
    // use Prototype.js from OKC page
    var my$$ = unsafeWindow.$$;
    my$$('img[src*="okccdn.com/php/load_okc_image.php/images/82x82/82x82"]').each(function(img) {
        img.src=img.src.replace("82x82/82x82", "160x160/160x160");
        img.width="160";
        img.height="160";
        var container = img.parentNode;
        container.style.width="160px";
        container.style.height="160px";
    })
};

document.addEventListener("DOMNodeInserted", embiggen, false);