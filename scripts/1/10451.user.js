// ==UserScript==
// @name           tumblr_dashboard_blank
// @namespace      http://jmblog.jp
// @description    Adds a target_blank to links
// @include        http://www.tumblr.com/dashboard
// @include        http://www.tumblr.com/dashboard/*
// ==/UserScript==
(function () {
    var all_links = document.links;
    for (var i=0; i < all_links.length; i++){
        if (!all_links[i].href.match(/^http:\/\/www\.tumblr\.com/)){
            all_links[i].target = "_blank";
        }
    }
})();
