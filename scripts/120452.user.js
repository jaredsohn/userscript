Metadata(<><![CDATA[
// ==UserScript==
// @name           Goolicious Mobile
// @namespace      http://webaugmentation.org/examples/GooliciousMobile
// @description    Augment Google search result urls with information about the same url in Delicious. Required Sticklet extension for Firefox. For more information, go to https://addons.mozilla.org/firefox/addon/Sticklet/.
// @include        *
// @include        about:blank?Sticklet
// @require        http://dl.dropbox.com/u/20318901/96604.user.js
// @author         Iñigo Illan
// @onekin:sticklet
// @sticklet:preview   http://www.google.com/search?q=mashup  
// @sticklet:facebook
// @sticklet:twitter
// ==/UserScript==
]]></>);
StickletBox([
 Sticklet("Tagged as ...").
  WhenOnWall("http://www.google.*/m\?*").
   SelectBrick("//*[name()='a' and @class='p']/@href").ExtractContent("(.*)").As("$link").
  InlayLever("link").At("after","$link").
  OnTriggeringLeverBy("click").
  LoadNote("http://www.delicious.com/url?url=$link").
   SelectBrick("//div[@id='tagcloud']").ExtractContent("(.*)").As("$tagcloud"). 
  StickNote("$tagcloud")]);