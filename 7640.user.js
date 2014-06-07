// ==UserScript==
// @name facebook - blue colour scheme
// @namespace http://userstyles.org
// @description facebook made to look like www.thatnite.com-- new banner added, blue colour scheme implemented, minor layout changes. There are probably some holes in it, as I only played with the home news feed look and profiles, but most other things seem to have fallen into place. Not sure how adverts will look, as they're either adblock'd or greasemonkey'd out for me, but I'm pretty sure I've removed the obvious ones anyhow
// @author znerp
// @homepage http://userstyles.org/style/show/1784
// @include http://facebook.com/*
// @include https://facebook.com/*
// @include http://*.facebook.com/*
// @include https://*.facebook.com/*
// @include http://www.facebook.com/*
// @include https://www.facebook.com/*
// @include http://*.www.facebook.com/*
// @include https://*.www.facebook.com/*
// ==/UserScript==

var css = "@namespace url(http://www.w3.org/1999/xhtml);"+
          "#navigator {"+
          "  background: #77B0F3 url('http://i178.photobucket.com/albums/w277/username112233/top.gif') no-repeat top center !important;"+
          "  height: 100px ! important;"+
          "  width: auto /*748px*/ ! important; }"+

          "#nav li a {"+
          "  background: #BFD3EE ! important;"+
          "  color: #3A4F6C ! important; }"+
           
          "#nav {"+
          "  height: 100% ! important; }"+
          
          ".sponsors {"+
          "  clear: both !important; }"+
           
          "#sidebar {"+
          "  background: #BFD3EE ! important;"+
          "  text-decoration: underline ! important;"+
          "  color: #3A4F6C ! important;"+
          "  height: 100% ! important;"+
          "  border-top: 100px solid #77B0F3 !important; }"+

          "#book {"+
          "  background: #BFD3EE ! important;"+
          "  /*width: 748px ! important;"+
          "  padding-top: 0px ! important;*/"+
          "  height: 100% !important;"+
          "  /*margin: 8px auto 8px auto ! important;*/ }"+

          "#profileActions, #profileActions>a {"+
          "  background: #BFD3EE ! important; }"+

          ".sidebar_item_header h2 {"+
          "  color: #0033CC ! important; "+
          "  font-size: 10px ! important; }"+
           
          ".sidebar_item_body { "+
          "  background: #E4EAF2 ! important;"+
          "  height: 100% ! important; }"+
           
          ".edit {"+
          "  background: #BFD3EE ! important;"+
          "  text-decoration: underline ! important;"+
          "  color: #3A4F6C ! important; }"+
           
          "#ssponsor {"+
          "  background: #BFD3EE ! important;"+
          "  height: 100% ! important; }"+
           
          "#pagebody {"+
          "  margin-left: 0px ! important; }"+
           
          "#header {"+
          "  background: #77B0F3 ! important; "+
          "  color: #0033CC ! important;"+
          "  /*width: 420px ! important;*/ }"+
           
          ".clearfix { background: #BFD3EE ! important; }"+
          
          ".sidebar_item_header, .newsfeed_header {"+
          "  background: #77B0F3 ! important; }"+
           
          ".feed_item {"+
          "  background: #E4EAF2 ! important;"+
          "  border-style: solid ! important; "+
          "  border-width: 1px ! important;"+
          "  border-color: #fff ! important;"+
          "  padding-top: 1px ! important; }"+

          ".feed_date_header {"+
          "  color: #0033CC ! important; "+
          "  font-size: 15px ! important; }"+

          ".flex_header {"+
          "  background: #77B0F3 ! important; "+
          "  color: #0033CC ! important; }"+

          ".date_divider {"+
          "  color: #0033CC ! important; "+
          "  font-size: 10px ! important; }"+

          ".year h2 {"+
          "  color: #0033CC ! important; }"+

          "#content { background: #BFD3EE ! important; }"+

          ".flex_box, .photobox, .story, .extra_media, .headline, .share_and_hide, .body, .userprofile, .header_container, .feed_item h2, .feed_story_wrapper, .feed_story_body, #home_container, .gift_received, .gift_data, .excerpt, .pictures_container, .profile_status, .feed_story_body>.clearfix, .result, .clearfix dl, .feed_icon { "+
          "  background: #E4EAF2 ! important; }"+
           
          ".note_title_share, .actions, .friendtable { background: #f7f7f7 ! important; }"+

          ".edit a {"+
          "  color: #0033CC ! important; "+
          "  font-size: 10px ! important; }"+

          "/*.share_header,*/ .nextstep, .findfriends, .share, .ad_media, .comments_ad_image, .pageheader h1, .madness, #rooster_container, #publicity, .go_home { "+
          "  display: none !important;}"+
           
          ".limited_profile_container { background: #fff !important; }";


if (typeof GM_addStyle != "undefined") {
  GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
  addStyle(css);
} else {
  var heads = document.getElementsByTagName("head");
  if (heads.length > 0) {
    var node = document.createElement("style");
    node.type = "text/css";
    node.innerHTML = css;
    heads[0].appendChild(node);
  }
}