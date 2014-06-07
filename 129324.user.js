// ==UserScript==
// @name           addon for deezer.com
// @author	   Asier Gil, Daniel Hernández
// @namespace      http://mydeezerconfig.com
// @description    Augment deezer with artist's biography from wikipedia.org and songs lyrics from azlyrics.com
// @include        *
// @include        about:blank?Sticklet
// @require        http://userscripts.org/scripts/source/96602.user.js
// @onekin:sticklet
// @sticklet:preview http://www.deezer.com/en/music/akon/freedom-395161
// @sticklet:facebook
// @sticklet:twitter
// ==/UserScript==
StickletBox([
Sticklet("Bio").
  WhenOnWall("*.deezer.com/*").
   SelectBrick("//div[@class='head_informations' and @id='naboo_album_artist']/a").ExtractContent("(.*)").As("$artist"). 
   InlayLever("link").At("after","$artist"). 
  OnTriggeringLeverBy("click"). 
  LoadNote("http://es.wikipedia.org/wiki/$artist").
   SelectBrick("//table[@class='infobox_v2' and position()=1]").ExtractContent("(.*)").As("$bio").
  StickNote("$bio")] 
 );