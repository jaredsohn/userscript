// ==UserScript==
// @name           Formula1
// @namespace      http://webaugmentation.org/
// @description    Complements teams and drivers info of formula1.com with data from wikipedia.
// @include        *
// @include        about:blank?Sticklet
// @require        http://userscripts.org/scripts/source/96602.user.js
// @author         Eneko Mateo
// @example        http://www.formula1.com/teams_and_drivers/teams/182/
// @example        http://www.formula1.com/teams_and_drivers/drivers/822/
// @onekin:sticklet
// @sticklet:facebook
// @sticklet:twitter
// ==/UserScript==
StickletBox([
 Sticklet("Team Wikitable").
  WhenOnWall("*.formula1.com/teams_and_drivers/teams/*").
   SelectBrick("//table[@id='teamDataTable']//tr[1]/td[2]").
   ExtractContent("^(.*)$").As("$name").// text in cell
  InlayLever("link").At("after","$name").
  OnTriggeringLeverBy("click").
  LoadNote("http://en.wikipedia.org/wiki/$name").
   SelectBrick("//table[@class='infobox vcard']/tbody").
   ExtractContent("(.*)").As("$table").// text
  StickNote("<div><table id=\"team\" style=\"width: 22em;\" cellspacing=\"5\"> <tbody>$table</table></div>"),

 Sticklet("Driver Wikitable").
  WhenOnWall("*.formula1.com/teams_and_drivers/drivers/*").
   SelectBrick("//div[@class='articleHeading' and position()=1]/h2").
   ExtractContent("^(.*)$").As("$name").// text
  InlayLever("link").At("after","$name").
  OnTriggeringLeverBy("click").
  LoadNote("http://es.wikipedia.org/wiki/$name").
   SelectBrick("//table[@class='infobox_v2' and position()=1]/tbody").
   ExtractContent("(.*)").As("$table").// text
   StickNote("<div><table id=\"team\" style=\"width: 22em;\" cellspacing=\"5\"> <tbody>$table</table></div>")
]);