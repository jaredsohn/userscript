Metadata(<><![CDATA[
// ==UserScript==
// @name           Remove Banner
// @namespace      http://webaugmentation.org/RemoveBanner
// @description    Hide banners
// @include        *
// @include        about:blank?Sticklet
// @require        http://dl.dropbox.com/u/20318901/96604.user.js
// @onekin:sticklet
// @sticklet:facebook
// @sticklet:twitter
// ==/UserScript==
]]></>);
StickletBox([
 Sticklet("==Removed==").
  WhenOnWall("www.wordreference.com/*").
   SelectBrick("//div[starts-with(@id,'ad') or starts-with(@id,'amg')]").ExtractContent("(.*)").As("$banner").  
  InlayLever("link").At("upon","$banner").
  OnTriggeringLeverBy("click").
  LoadNote("about:blank").
   SelectBrick("$note").ExtractContent("(.*)").As("$blank"). 
  StickNote("$blank")]);