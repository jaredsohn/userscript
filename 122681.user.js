Metadata(<><![CDATA[
// ==UserScript==
// @name           Weather Forecast
// @namespace      http://webaugmentation.org/examples/WeatherForecast
// @description    Augment NorcalOutdoorSupply with weather information from WorldWeatherOnline. Required Sticklet extension for Firefox. For more information, go to https://addons.mozilla.org/firefox/addon/Sticklet/.
// @include        *
// @include        about:blank?Sticklet
// @require        http://dl.dropbox.com/u/20318901/96604.user.js
// @onekin:sticklet
// @sticklet:preview    http://www.norcaloutdoorsupply.com/humboldt-county-backpacking-camping-hiking
// @sticklet:facebook
// @sticklet:twitter
// ==/UserScript==
]]></>);
StickletBox([
 Sticklet("Weather Forecast").
  WhenOnWall("www.norcaloutdoorsupply.com/*").  
   SelectBrick("//div[@class='panel']//li").ExtractContent("(.*)").As("$campground").// in list element  
   SelectBrick("$campground").ExtractContent("Latitude: (-?\\d{1,3}\\.\\d{3,6})").As("$lat").// text and/or number after "Latitude: " 
   SelectBrick("$campground").ExtractContent("Longitude: (-?\\d{1,3}\\.\\d{3,6})").As("$lon").// text and/or number after "Longitude: "        
  InlayLever("link").At("after","$campground").
  OnTriggeringLeverBy("click").
  LoadNote("http://maps.google.com/maps?q=$lat $lon").
   SelectBrick("//span[@class='pp-headline-item pp-headline-address']/span").ExtractContent("(\\d+)").As("$zip").// number
  LoadNote("http://www.worldweatheronline.com/weather.aspx?q=$zip").
   SelectBrick("//div[@class='observationBox']").ExtractContent("(.*)").As("$weather").// text
  StickNote("$weather")]);