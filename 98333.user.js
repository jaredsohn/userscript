// ==UserScript==
// @name           DBLP
// @namespace      http://webaugmentation.org/examples/DBLP
// @description    Augment DBLP publications with information about the same paper in Google and information about the conference in WikiCfp. Required Sticklet extension for Firefox. For more information, go to https://addons.mozilla.org/firefox/addon/Sticklet/.
// @include        *
// @include        about:blank?Sticklet
// @require        http://userscripts.org/scripts/source/96602.user.js
// @onekin:sticklet
// @sticklet:preview   http://dblp.uni-trier.de/pers/hd/d/D=iacute=az:Oscar.html
// @sticklet:facebook
// @sticklet:twitter
// ==/UserScript==
StickletBox([
 Sticklet("Similar articles at Google").  
  WhenOnWall("dblp.uni-trier.de/pers/hd/*"). 
   SelectBrick("//span[@class='title' and position()=2]").ExtractContent("(.*)").As("$mytitle").
  InlayLever("button").At("after","$mytitle").
  OnTriggeringLeverBy("click").
  LoadNote("http://www.google.com/search?q=\"$mytitle\"+site%3Aportal.acm.org").
   SelectBrick("//h3[@class='r']").ExtractContent("(.*)").As("$articles").
  StickNote("<ul><li>$articles</li></ul>"),
  
 Sticklet("CFP").
  WhenOnWall("dblp.uni-trier.de/pers/hd/*"). 
   SelectBrick("//tr[td/@class='c']//div[@class='data']/a[last()]").ExtractContent("([A-Z]*)").As("$confName").
  InlayLever("link").At("upon","$confName").
  OnTriggeringLeverBy("click").  
  LoadNote("http://www.wikicfp.com/cfp/servlet/tool.search?q=$confName&year=a").
   SelectBrick("//div[@class='contsec' and position()=4]/table/tbody/tr[2]/td/table/tbody/tr[2]/td[1]").ExtractContent("(.*)").As("$conference").
  StickNote("$conference")] 
  );