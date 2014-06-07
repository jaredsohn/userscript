Metadata(<><![CDATA[
// ==UserScript==
// @name           News Mobile
// @namespace      http://webaugmentation.org/examples/News
// @description    Augment USAToday news with news from The New York Times and Nature. Required Sticklet extension for Firefox. For more information, go to https://addons.mozilla.org/firefox/addon/Sticklet/.
// @include        *
// @include        about:blank?Sticklet
// @require        http://dl.dropbox.com/u/20318901/96604.user.js
// @onekin:sticklet
// @sticklet:preview   http://m.usatoday.com/
// @sticklet:preview   http://m.usatoday.com/yourlife
// @sticklet:facebook
// @sticklet:twitter
// @sticklet:mobile
// ==/UserScript==
]]></>);
StickletBox([
 Sticklet("USAToday: News At The New York Times").
  WhenOnWall("m.usatoday.com/*"). 
   SelectBrick("//div[@class='main-menu']//a[@class='article-link']").ExtractContent("((.|\n)*)").As("$newstitle").
  InlayLever("link").At("after","$newstitle").
  OnTriggeringLeverBy("click").  
  LoadNote("http://query.nytimes.com/search/sitesearch?query=$newstitle&less=multimedia&more=past_1").
   SelectBrick("//ul[@class='results']").ExtractContent("(.*)").As("$relatedNews").
  StickNote("<ul><li>$relatedNews</li></ul>"),
  
 Sticklet("USAToday: News At Nature").
  WhenOnWall("m.usatoday.com/yourlife"). 
   SelectBrick("//div[@class='article-item']//a[@class='article-link']").ExtractContent("((.|\n)*)").As("$newstitle").
  InlayLever("link").At("after","$newstitle").
  OnTriggeringLeverBy("click").
  LoadNote("http://www.nature.com/search/executeSearch?sp-q=$newstitle").
   SelectBrick("//h2[@class='atl']").ExtractContent("(.*)").As("$relatedNews").
  StickNote("<ul><li>$relatedNews</li></ul>")]
  );