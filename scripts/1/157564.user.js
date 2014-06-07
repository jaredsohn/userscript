// ==UserScript==
// @name        redboxaddratings
// @namespace   compressedtime.com
// @grant          GM_getValue
// @grant          GM_addStyle
// @include     https://www.redbox.com/*
// @include     http://www.redbox.com/*
// @version     1.04
// ==/UserScript==

/**
 * Copyright 2011,2012 Emery Lapinski
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

if(typeof unsafeWindow.$ == 'undefined')	// need jquery
	return;

var $ = unsafeWindow.$;	// use the jquery on the page

var DEBUG = GM_getValue("DEBUG", false);

var GM_log;
if(unsafeWindow.console) {
    GM_log = function()
    {
        unsafeWindow.console.log.apply(unsafeWindow.console, arguments);    //YYY using "this" was causing problems in chrome
    }
}
else
    GM_log = function(){};

GM_log("redboxaddratings $Revision: 336 $");

GM_addStyle(".redboxaddratings {position:absolute; top:0px; right:0px; z-index:99; font-weight:bold;}");

function setRating(key, rating)
{
	var obj = {
		rating: rating,	// localStorage wants strings
		timestamp: new Date().getTime(),
	};

	var objJSON = JSON.stringify(obj);

	localStorage.setItem(key, objJSON);
}

function getRating(key)
{
	var ratingObjJSON = localStorage.getItem(key);

	if(ratingObjJSON == null)
		return null;

	var ratingObj = $.parseJSON(ratingObjJSON);

	if(ratingObj.timestamp < new Date().getTime() - 1000 * 60 * 60)	// 1 hour?
	{
		localStorage.removeItem(key);
		return null;
	}

	return ratingObj.rating;
}
		
function fetchRating(key, callback)
{
	GM_log("fetchRating() key=" + key);

	var url = 'http://pluck.redbox.com/ver1.0/sdk/js/tags/REL-5.2.5?jsonRequest={"Envelopes":[{"Payload":{"ArticleKey":{"Key":"Title' + key + '","ObjectType":"Models.External.ExternalResourceKey"},"ObjectType":"Requests.External.ArticleRequest"},"PayloadType":"Requests.External.ArticleRequest"}],"Metadata":null,"ObjectType":"Requests.RequestBatch"}&cb=?';

	$.getJSON(url, function(obj)
	{
		var objJSON = JSON.stringify(obj);

		var rating = objJSON.toString().match(/"AverageRating":([\d\.]+)/);

		if(rating == null)
		{
			callback(null);
			return;
		}

		rating = rating[1];

		rating = Math.round(rating * 10) / 100;

		if(rating == 0)	//XXX some have 0 here, then show up as 5 stars or something, where is that number coming from?
		{
			callback(null);
			return;
		}

		GM_log("fetchRating() key=" + key + " rating=" + rating);
		callback(rating);
	})
	.error(function(jqXHR, textStatus, errorThrown) 
	{
		GM_log("textStatus=" + textStatus + " errorThrown=" + errorThrown);
		callback(null);
	});
}

function doit()
{
	var elements = $(".box-wrapper:not(.redboxaddratingsdone)");
	if(elements.length == 0)
		return;

	GM_log("elements.length=", elements.length, " elements=", elements);

	elements.each(function(index, element)
	{
		element = $(element);
		element.addClass("redboxaddratingsdone");

		var name = element.attr('name');
		var key = element.attr('key');

		function appendRating(rating)
		{
			element.append("<div class='redboxaddratings'>" + rating + "</div>");
		}


		var rating = getRating(key);

		if(rating != null)
		{
			appendRating(rating);
			return;	// continue
		}

		fetchRating(key, function(rating)
		{
			if(rating == null)
				return;

			setRating(key, rating);
			appendRating(rating);
		});
	});
}

/* some pages, like changing the G/PG/R rating, dynamically update the page so watch for changes */
setInterval(doit, 1000);
