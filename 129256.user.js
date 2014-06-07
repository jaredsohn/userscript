// ==UserScript==
// @name           Twitter
// @namespace      http://webaugmentation.org/examples/Twitter
// @description    Augment Twitter with the grade of the suggested users.
// @include        *
// @include        about:blank?Sticklet
// @require        http://userscripts.org/scripts/source/96602.user.js
// @onekin:sticklet
// @sticklet:preview https://twitter.com
// @sticklet:facebook
// @sticklet:twitter
// ==/UserScript==
StickletBox([
 Sticklet("Ranking global").
  WhenOnWall("*twitter.com*").
   SelectBrick("//span[@class='username']").
   ExtractContent("<s>@</s>(.*)").As("$user").// text after "@"
  InlayLever("link").At("after","$user").
  OnTriggeringLeverBy("click").
  LoadNote("http://tweet.grader.com/$user").
   SelectBrick("//li[@class='rank' and position()=1]").
   ExtractContent("(.*)").As("$info").// text in list element
  StickNote("$info")]);
