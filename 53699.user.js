// ==UserScript==
// @name           Twitter Reload Timeline
// @namespace      http://4kwh.net/
// @license        The MIT License: http://www.opensource.org/licenses/mit-license.php
// @description    Reload twitter timeline automatically.
// @version        0.0.3
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @exclude        http://twitter.com/#search?q=*
// @exclude        https://twitter.com/#search?q=*
// ==/UserScript==

// TODO:
//    fix cant-get-maxId bug (infinite loop?)
//    fix #search page behavior.
//    check many situation such as displaying #search result, and fix bugs
//    impl "less" button
//    smooth behavior when reloading
//    asyncronous reloading

// HISTORY:
//    16-06-09: Statuses will be in order when reloaded. It can be implemented by asyncronous logic, and will be more faster (0.0.3)
//    15-06-09: Reload more button. Now it works even when 20+ status are loaded. (0.0.2)
//    14-06-09: First version, uploaded to userscripts.org. (0.0.1)

var interval = 60; //sec
var statElem = ".hentry";
var statsPerPage = 20;
var tlElem = "ol#timeline";
var moreElem = "a#more";

var $ = unsafeWindow.jQuery;

var countStatuses = function() {
    return $(statElem).size();
};
var countPages = function() {
    return countStatuses()/statsPerPage; //=> can get from more button url
};
var getMaxId = function() {
    var strId = $(statElem + ":first-child").attr("id");
    return strId.match(/\d+/);
};
var getUrl = function() {
    return location.href;  
};
var getPageUrl = function(loc, id, n) {
    return loc + "?max_id=" + id + "&page=" + n;
};
// There must be smarter logic..hmm
var pagen = 2;
var appendStatus = function(twUrl, maxId, maxPagen) {
    if(maxPagen < pagen) {
        pagen = 2;
        return;
    }
    var pageUrl = getPageUrl(twUrl, maxId, pagen);
    pagen++;
    $.get(pageUrl, function(res) {
              $(tlElem).append($(res).find(statElem));
              $(moreElem).replaceWith($(res).find(moreElem));
              appendStatus(twUrl, maxId, maxPagen);
          });
};
var reloadTimeline = function() {
    var maxPagen = countPages();
    var twUrl = getUrl();
    $.get(twUrl, function(res) {
//              console.log(res);
              $(tlElem).replaceWith($(res).find(tlElem));
              $(moreElem).replaceWith($(res).find(moreElem));
              //for when there are more than 2 pages
              var maxId = getMaxId();
              appendStatus(twUrl, maxId, maxPagen);
          });
};

$(window.setInterval(function(){reloadTimeline();}, 1000 * interval));

