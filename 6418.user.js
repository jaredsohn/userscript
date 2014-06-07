// ==UserScript==
// @name           AccuWeather.com 15-Day Forecast Print
// @description    Adds a printable view link and creates the view to AccuWeather.com 15-Day Forecast pages.
// @include        http://*.accuweather.com/world-forecast*
// ==/UserScript==

function printableView(event)
{
	var forecast = document.evaluate("//div[@id='content_column_435']", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	var body = document.body;
	while (body.firstChild) {
		body.removeChild(body.firstChild);
	}
	body.style.backgroundImage = "none";
	forecast.style.cssFloat = "none";
	forecast.style.margin = "0 auto";
	forecast.style.overflow = "visible"; 
	var forecastHeader = document.evaluate(".//div[@id='forecast_header']", forecast, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	var forecastBody = document.evaluate(".//div[@id='content_box_435_fcast15day' or @id='content_box_435_weekendfcast' or @id='content_box_435_all15day']", forecast, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	while (forecast.firstChild) {
		forecast.removeChild(forecast.firstChild);
	}
	forecast.appendChild(forecastHeader);
	forecast.appendChild(forecastBody);
	var currentDate = document.evaluate(".//div[@id='fcst_date']/span[@class='textsmallbold']", forecastHeader, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	currentDate.parentNode.parentNode.replaceChild(currentDate, currentDate.parentNode);
	var navbars = document.evaluate(".//div[@class='content_box_435bluenavbar']", forecastBody, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < navbars.snapshotLength; i++) {
		var navbar = navbars.snapshotItem(i);
		navbar.parentNode.removeChild(navbar);
	}
	var moreInfoLinks = document.evaluate(".//div[@class='forecastHeaderRight' or @class='curconHeaderRight']", forecastBody, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < moreInfoLinks.snapshotLength; i++) {
		var moreInfoLink = moreInfoLinks.snapshotItem(i);
		moreInfoLink.parentNode.removeChild(moreInfoLink);
	}
	var allLinks = document.evaluate(".//a", forecast, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < allLinks.snapshotLength; i++) {
		var someLink = allLinks.snapshotItem(i);
		someLink.parentNode.replaceChild(someLink.firstChild, someLink);
	}
	body.appendChild(forecast);
	event.preventDefault();
}

var forecast = document.evaluate("//div[@id='content_column_435']", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
var printableViewButton = document.createElement("a");
printableViewButton.appendChild(document.createTextNode("Printable View"));
printableViewButton.href = "";
printableViewButton.style.padding = "3px";
printableViewButton.style.position = "absolute";
printableViewButton.style.textDecoration = "none";
printableViewButton.style.fontWeight = "bold";
printableViewButton.style.backgroundColor = "black";
printableViewButton.style.color = "white";
forecast.parentNode.insertBefore(printableViewButton, forecast);
printableViewButton.addEventListener("click", printableView, true);
printableViewButton.style.marginLeft = "-" + window.getComputedStyle(printableViewButton, "").getPropertyValue("width");
