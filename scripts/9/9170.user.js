// $Id: nf_okcupid.user.js,v 1.11 2009/03/28 07:10:45 noah Exp $
//
// ==UserScript==
// @name	nf_okcupid.user.js
// @namespace	http://www.splode.com/~friedman/software/greasemonkey/src
// @description	remove annoyances on okcupid.com
// @include	http://*.okcupid.com/*
// ==/UserScript==

(function() {
  function add_css(text) {
      var head, style;
      head = document.getElementsByTagName('head')[0];
      if (!head) { return; }
      style           = document.createElement('style');
      style.type      = 'text/css';
      style.innerHTML = ("\n/* Added by nf_okcupid greasemonkey script */\n"
                         + text.join("\n "));
      head.appendChild(style);
  }

  function css_hide_elts(elts) {
      add_css ([elts.join(", ")
                + " { display: none !important; height: 0px; width: 0px; }"]);
  }

  css_hide_elts (['div#ad',
                  'div#ad_wrap',
                  'div#topAdWrap',
                  'div#topAd',
                  'div#lsAd',
                  'div#homeAdWrap',
                  'div#homeAd',
                  'div#profileAdWrap',
                  'div#profileAd',
                  'div#bottomSponsors',
                  'div#bottomSponsorsBot',
                  'div#getLuckyDiv',
//                  'div#lsPointsContent',
                  'div#fb-promo',
                  'div#bookmark',
                  'div#hq-announcement-wrapper',
                  'div#homeSiteNews',
                  'div#homeSiteNewsClip',
                  'div#homeFeaturedTests',
                  'div#homeFeaturedTestsClip',
                  'div#lsQuickSearchContent',
                  'h5#lsQuickSearch',
                  "div#leftSidebar div#leftSidebarInfo span.seperator",

                  'div.ad',
                  'div.advertisement',
                  'div.featured_tests',
                  'div.user_welcome',
                  'div.contest',
                  'div.quick_search',

                  // As of 2008-11-20 below

                  '.text_advertisement',
                  'div.main_column p.profile_image',
                  'div.main_column h3.greet',
                  'div.main_column ul.user_action',
                  'div.main_column > h3.ribbon',

                  'div.sub_column p#progress_bar',
                  'div.sub_column p.suggestions',

                  'div.sub_column ul#test_navigation',
                  'div.sub_column p#test_playpause',
                  'div.sub_column ul#test_slideshow',
                  ]);

  add_css (["#userInfoWrap  { width:300px; }",
            "#userInfoLeft  { width:200px; }",
            "span#userInfoUser br { display: none; }",
            // Adapted from wbdfibhr's chrome
            ".journalCommentText { \
                color: black !important; \
                background-color: #FFF !important; \
             }",
            ".journalCommentInfo { background-color: #FFF !important; }",
            ]);
})();

// eof
