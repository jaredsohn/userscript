// ==UserScript==
// @name        NY Times: load full article
// @namespace   http://twitter.com/depositado
// @description Load full articles on New York Times (nytimes.com) without redirect & replaceState
// @include     http://www.nytimes.com/*
// @version     1.0
// @updateURL   http://userscripts.org/scripts/source/176544.meta.js
// @grant       none
// ==/UserScript==

if (typeof console == "undefined") {
    window.console = {
        log: function () {}
    };
}

console.log('userscript loaded: "NY Times: load full article"');

jQuery(function(){
    
    var fullArticleLink,
        fullArticleLinkSelector  = 'div#article ul.shareToolsList li.shareToolsItemSinglepage a';
        articleContainerSelector = 'div#article',
        canonicalLink            = jQuery('link[rel=canonical]').attr('href');
        
    // check if on article page AND if there is a full article link
    if ((jQuery(articleContainerSelector).length > 0) && (fullArticleLinkSelector.length > 0)) {    
        jQuery(articleContainerSelector).load(canonicalLink+' #article > *', function() {
            console.log('NY Times: full article loaded');
            window.history.replaceState( {page: this.href}, '', canonicalLink);
        });
    }
    
});