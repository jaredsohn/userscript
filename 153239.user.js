// ==UserScript==
// @name           GetLyric
// @namespace      http://webaugmentation.org/examples/GetLyric
// @description    go to https://addons.mozilla.org/firefox/addon/Sticklet/.
// @include        *
// @include        about:blank?Sticklet
// @require        http://userscripts.org/scripts/source/96602.user.js
// @author Leticia Montalvillo-Mendizabal
// @onekin:sticklet
// @sticklet:preview http://www.youtube.com/watch?v=FYH8DsU2WCk
// @sticklet:facebook
// @sticklet:twitter
// ==/UserScript==
StickletBox([
 Sticklet("Get Lyric").
  WhenOnWall("*.youtube.com/*").
  SelectBrick("//span[contains(@class,'yt-uix-expander-head')]").ExtractContent("- (.*)").As("$song").
  SelectBrick("//span[contains(@class,'yt-uix-expander-head')]").ExtractContent("([^>\\n]*)(?:</a>)? -").As("$artist").
  InlayLever("link").At("after","$song").
  OnTriggeringLeverBy("click").
  LoadNote ("http://www.absolutelyrics.com/lyrics/view/$artist/$song").
  SelectBrick("//p[@id='view_lyrics']").ExtractContent("(.*)").As("$lyric").
  StickNote("<h1>$song</h1> <br> $lyric")]);
