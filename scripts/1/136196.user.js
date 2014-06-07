// ==UserScript==
// @name           Microsoft Academic with CFP and IF
// @namespace      http://webaugmentation.org/examples/MsAcademic
// @description    Augment MS Academic publications with information about the conference in WikiCfp or journal impact factor. Required Sticklet extension for Firefox. For more information, go to https://addons.mozilla.org/firefox/addon/Sticklet/.
// @include        *
// @include        about:blank?Sticklet
// @require        http://userscripts.org/scripts/source/96602.user.js
// @onekin:sticklet
// @sticklet:preview   http://academic.research.microsoft.com/Detail?entitytype=2&searchtype=2&id=2456426
// @sticklet:facebook
// @sticklet:twitter
// ==/UserScript==
StickletBox([
 Sticklet("CFP").
  WhenOnWall("academic.research.microsoft.com/Detail*"). 
   SelectBrick("//div[@class='conference' and position()=5]/a").ExtractContent("^(.*) -").As("$confName").
  InlayLever("link").At("after","$confName").
  OnTriggeringLeverBy("click").  
  LoadNote("http://www.google.com/search?q=site:www.wikicfp.com/cfp $confName").
   SelectBrick("//li[@class='g' and position()=1]//a[@class='l']/@href").ExtractContent("(.*)").As("$cfpLink").
  LoadNote("$cfpLink").
   SelectBrick("//div[@class='contsec' and position()=4]").ExtractContent("(.*)").As("$cfp").   
  StickNote("$cfp"),     
 Sticklet("IF").
  WhenOnWall("academic.research.microsoft.com/Detail*"). 
   SelectBrick("//div[@class='conference' and position()=6]/a").ExtractContent("^(.*) -").As("$journalName").
  InlayLever("link").At("after","$journalName").
  OnTriggeringLeverBy("click"). 
  LoadNote("http://www.google.com/search?q=site:www.bioxbio.com/if $journalName").
   SelectBrick("//li[@class='g' and position()=1]//a[@class='l']/@href").ExtractContent("(.*)").As("$ifLink").   
  LoadNote("$ifLink").
   SelectBrick("//tr[2]/td[2]").ExtractContent("(.*)$").As("$if").
  StickNote("<b>Impact Factor:</b> $if") ] 
  );