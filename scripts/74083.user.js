// ==UserScript==
// @name           Twitter Right to Left++
// @namespace      http://erlichmen.net
// @description    Switches text direction by language on twitter.com
// @include        http://twitter.com/*
// @basedon        twitter_direction
// @version        1.0
// ==/UserScript==

var rtlInitScript = '\
  function doFlip() {\
      function twitterflip_sanitize_text(data) {\
          if (data === null) return "";\
          return data.replace(/@\w+/, "");\
      }\
      \
      function twitterflip_count_it(text, match) {\
          var matches = text.match(new RegExp(match, "g"));\
          return matches != null ? matches.length : 0;\
      }\
      \
      function twitterflip_is_hebrew(text) {\
          text = twitterflip_sanitize_text(text);\
          var count_eng = twitterflip_count_it(text, "[a-zA-Z]");\
          var count_heb = twitterflip_count_it(text, "[\\u05B0-\\u05F4\\uFB1D-\\uFBF4]");\
          var count_arb = twitterflip_count_it(text, "[\\u060C-\\u06FE\\uFB50-\\uFEFC]");\
      \
          return (count_heb + count_arb) > 0;\
      }\
      \
      var tweets = $(".status-body");\
      tweets.each(function() { \
          var tweet = $(this);\
          if (tweet.hasClass("rtl") == false) {\
\
            tweet.addClass("rtl");\
\
            var entry_content = $(".entry-content", tweet);\
            var text = entry_content.html();\
\
            if (twitterflip_is_hebrew(text)) {\
                tweet.css("direction", "rtl");\
                tweet.css("textAlign", "right");\
\
                var actions_hover = $(".entry-meta", tweet);\
                actions_hover.css("direction", "ltr");\
                actions_hover.css("textAlign", "left");\
\
                var tweeter_screen_name = $(".screen-name", tweet);\
                tweeter_screen_name.css("unicodeBidi", "embed");\
            }\
          }\
      });\
  }\
\
  $("body").bind("page-height-changed", this.doFlip);\
  $("body").bind("timeline-changed", this.doFlip);\
  $("body").bind("loaded", this.doFlip);\
  this.doFlip();\
'
var GM_FlipScript = document.createElement('script');
GM_FlipScript.type = 'text/javascript';
GM_FlipScript.text = rtlInitScript;
document.getElementsByTagName('head')[0].appendChild(GM_FlipScript);
