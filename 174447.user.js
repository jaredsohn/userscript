// goodreads_on_amazon.user.js
// version 1.0 
// 2013-07-27
// Copyright (c) 2013, Stefan Schmitt <selevt@selevt.com>
// Released under the GPL license v2
// http://www.gnu.org/copyleft/gpl.html
//
// Roughly based on the Amazon-to-Goodreads script by Giacomo Lacava
//
// ==UserScript==
// @namespace     http://www.selevt.com/userscripts
// @name          Goodreads on Amazon
// @description   Shows the Goodreads rating on Amazon pages and add a link to the Goodreads page
// @version       1.0
// @match       *://www.amazon.at/*
// @match       *://www.amazon.fr/*
// @match       *://www.amazon.cn/*
// @match       *://www.amazon.co.jp/*
// @match       *://www.amazon.com/*
// @match       *://www.amazon.ca/*
// @match       *://www.amazon.de/*
// @match       *://www.amazon.es/*
// @match       *://www.amazon.it/*
// @match       *://www.amazon.co.uk/*
// @match       *://www.goodreads.com/search*
// ==/UserScript==

// Match ASIN on Amazon URL (2: ISBN/ASIN)
var RE_ASIN_URL = /\/(dp|product)\/(\w+)\//i;
// Goodreads Images CSS (1: URL)
var RE_CSS_IMG = /"(.*?common_images-.*?.css)"/;
// Goodreads Common CSS (1: URL)
var RE_CSS_GR = /"(.*?goodreads-.*?.css)"/;
// Link to a Goodreads book
var RE_GR_BOOK_LINK = /<a\shref="(.*)"\sclass="bookTitle"/gmi;

// thx http://stackoverflow.com/a/577002
function loadCss(cssUrl) {
    var head  = document.getElementsByTagName('head')[0],
        link  = document.createElement('link');
    link.id   = 'goodreadsImages';
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = cssUrl;
    link.media = 'all';
    head.appendChild(link);
}

function getData(pageResult) {
    var grLinks = RE_GR_BOOK_LINK.exec(pageResult),
        div = document.createElement('div');

    div.innerHTML = pageResult;

    var meta = div.querySelector('#bookMeta');
    // 1. search redirected directly on bookpage (on isbn search)
    if (meta) {
        // remove not needed data ("rating details", broken links)
        meta.removeChild(meta.querySelector("#rating_details"));
        meta.removeChild(meta.querySelector(".greyText"));
        meta.innerHTML = meta.innerHTML.replace(/<\s*\/?\s*a.*?actionLinkLite.*?>/g, '');
        meta.style.marginBottom = "0";

        return {
            "link": div.querySelector('link[rel="canonical"]').href,
            "rating": meta
        };
    }

    // 2. on search page (on asin search)
    if (grLinks) {
        return {
            "link": "//www.goodreads.com" + grLinks[1],
            "rating": div.getElementsByClassName("minirating")[0]
        };
    }

    return null;
}

function injectGoodreadsData(responseDetails) {
    var amzPriceBlock = document.getElementById('btAsinTitle').parentNode.parentNode.nextSibling,
        data = getData(responseDetails.responseText);

    if (data) {
        var grLink = document.createElement("a");
        grLink.innerHTML = '<a href="' + data.link + '" target="_blank">See reviews on GoodReads</a><br />';
        amzPriceBlock.parentNode.insertBefore(grLink, amzPriceBlock);

        // load the goodreads CSS to show the pretty stars and the moon
        var grImgCss = RE_CSS_IMG.exec(responseDetails.responseText),
            grCommonCss = RE_CSS_GR.exec(responseDetails.responseText);
        loadCss(grImgCss[1]);
        loadCss(grCommonCss[1]);

        amzPriceBlock.parentNode.insertBefore(data.rating, amzPriceBlock);
    } else {
        var noGr = document.createElement("div");
        noGr.innerHTML = "(not found on Goodreads)";
        amzPriceBlock.parentNode.insertBefore(noGr, amzPriceBlock);
    }
}


// do only when on a product page
if (RE_ASIN_URL.test(location.href)) {
    var searchUrl = '//www.goodreads.com/search?query=' + RegExp.$2;

    GM_xmlhttpRequest({
        method: 'GET',
        url: searchUrl,
        onload: injectGoodreadsData
    });
}
