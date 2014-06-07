// ==UserScript==
// @name        Scholar on Google Search
// @description Adds a link to Google Scholar just before the "more" button, on Google Search.
// @namespace   http://userscripts.org/users/122653
// @include     http*://google.*
// @include     http*://www.google.*
// @include     https://encrypted.google.*
// @version     1.0
// @author      sergio91pt
// @license     GPLv3
// @grant       none
// @downloadURL http://userscripts.org/scripts/source/348941.user.js
// @updateURL   http://userscripts.org/scripts/source/348941.meta.js
// ==/UserScript==

var scholarUrl = 'http://scholar.google.com/scholar?q=';
var scholarEleId = 'hdtb_us_scholar';

var createScholarElement = function() {
    var wrapper = document.createElement('div');
    wrapper.id = scholarEleId;
    wrapper.classList.add('hdtb_mitem');

    var anchor = document.createElement('a');
    var anchorClasses = anchor.classList;
    anchorClasses.add('q');
    anchorClasses.add('qs');
    anchor.textContent = 'Scholar';
    
    wrapper.appendChild(anchor);
    return wrapper;
};

var getSearchQuery = function(href) {
    var results = /[\\?&]q=([^&#]*)/.exec(href);
    return (results) ? results[1] : '';
};

var updateScholarHref = function(wrapper, scholorEle) {
    var otherHref = wrapper.querySelector('a').getAttribute('href');
    var query = getSearchQuery(otherHref);
    var anchor = scholorEle.firstChild;
    anchor.setAttribute('href', scholarUrl + query);
};

var addScholarLink = function() {
    var moreEle = document.getElementById('hdtb_more');
    if (moreEle) {
        var scholarEle = createScholarElement();
        var wrapper = moreEle.parentNode;
        updateScholarHref(wrapper, scholarEle);
        wrapper.insertBefore(scholarEle, moreEle);
    }
};

var watchScholarLink = function() {
    // Whenever the query changes without changing the window href, our node
    // is removed, so use a MutationObserver to update and put us back.
    new MutationObserver(function(mutations) {
        var len = mutations.length;
        for (var i = 0; i < len; i++) {
            // Normally the link bar is removed then added, along 
            // with search results, so just check additions.
            if (mutations[i].addedNodes) {
                if (!document.getElementById(scholarEleId)) {
                    addScholarLink();
                }
                break;
            }
        }
    }).observe(document.body, {'childList': true, 'subtree': true});
};

addScholarLink();
watchScholarLink();
