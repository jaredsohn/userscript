// ==UserScript==
// @name           News
// @namespace      http://webaugmentation.org/examples/News
// @description    Augment USAToday news with news from The New York Times and Nature. Required Sticklet extension for Firefox. For more information, go to https://addons.mozilla.org/firefox/addon/Sticklet/.
// @include        *
// @include        about:blank?Sticklet
// @require        http://userscripts.org/scripts/source/96602.user.js
// @onekin:sticklet
// @sticklet:preview   http://www.usatoday.com/
// @sticklet:preview   http://yourlife.usatoday.com/health/index
// @sticklet:facebook
// @sticklet:twitter
// ==/UserScript==
StickletBox([
 Sticklet("USAToday: News At The New York Times").
  WhenOnWall("www.usatoday.com/*"). 
   SelectBrick("//ul[contains(@class,'headlines')]/li/a").ExtractContent("(.*)").As("$newstitle").
  InlayLever("link").At("after","$newstitle").
  OnTriggeringLeverBy("click").  
  LoadNote("http://query.nytimes.com/search/sitesearch?query=$newstitle&less=multimedia&more=past_1").
   SelectBrick("//ul[@class='results']").ExtractContent("(.*)").As("$relatedNews").
  StickNote("<ul><li>$relatedNews</li></ul>"),
  
 Sticklet("USAToday: News At Nature").
  WhenOnWall("yourlife.usatoday.com/health/*"). 
   SelectBrick("//div[@class='DCHLmod_content']//a").ExtractContent("(.*)").As("$newstitle").
  InlayLever("link").At("after","$newstitle").
  OnTriggeringLeverBy("click").
  LoadNote("http://www.nature.com/search/executeSearch?sp-q=$newstitle").
   SelectBrick("//h2[@class='atl']").ExtractContent("(.*)").As("$relatedNews").
  StickNote("<ul><li>$relatedNews</li></ul>")]
  );
  