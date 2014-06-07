// ==UserScript==
// @name        SerialZone MyRating
// @namespace   cz.serialzone.myrating
// @include     http://www.serialzone.cz/*
// @version     3
// @author		om467
// @updateURL   https://userscripts.org/scripts/source/288439.meta.js
// @downloadURL https://userscripts.org/scripts/source/288439.user.js
// @grant       unsafeWindow
// @grant       GM_addStyle
// ==/UserScript==

(function()
{
	var $j = unsafeWindow.jQuery;
	var variables = {
		showIdPattern: new RegExp('/serial/([^/]+)/'),
		profileIdPattern: new RegExp('/profil/([^/]+)/'),
		ratingPattern: new RegExp('<ul class="(?:dark|light)">.+?</ul>', 'g'),
		ratingElementsPattern: new RegExp('<ul class="(?:dark|light)">.+?/serial/([^/]+)/.+?>([\\d]+) %<.+?</ul>'),
		averageRatingPattern: new RegExp('([\\d]*0) % \\(([\\d]+) hodnocení\\)', 'g'),
		mutationObserver: window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver,
		profileId: null,
		dataRating: null,
		dataAverageRating: null,
		dataFavorite: null,
		dataLove: null,
		dataWatch: null,
		alias: {
			"shield": "agents-of-shield",
			"ncis-los-angeles": "namorni-vysetrovaci-sluzba-l-a",
			"person-of-interest": "lovci-zlocincu",
			"beauty-and-the-beast": "kraska-a-zvire-2012",
			"raising-hope": "vychovavat-hope",
			"elementary": "jak-proste",
			"last-resort": "posledni-zakladna",
			"fringe": "hranice-nemozneho",
			"homeland": "ve-jmenu-vlasti"
		}
	};

	var engine = {
		init: function ()
		{			
			// check for profile
			var profileLink = $j("div.my-menu").find("a").eq(0).attr("href");
			if (!variables.profileIdPattern.test(profileLink))
				return;
			variables.profileId = variables.profileIdPattern.exec(profileLink)[1];
			
			// styles
			GM_addStyle(" \
				#main span.cz-serialzone-myrating { display:inline-block; cursor:pointer; padding:0px 2px 0px 2px; font-weight:bold; font-size:11px; color:white; border-radius:2px; vertical-align:middle; font-style:normal; margin-right:0px; height:14px; width:30px; text-align:center; line-height:14px; } \
				#main span.cz-serialzone-myrating-none { background-color:#444; } \
				#main span.cz-serialzone-myrating-0 { background-color:#b70717; } \
				#main span.cz-serialzone-myrating-10 { background-color:#ed2e21; } \
				#main span.cz-serialzone-myrating-20 { background-color:#f04a13; } \
				#main span.cz-serialzone-myrating-30 { background-color:#f78807; } \
				#main span.cz-serialzone-myrating-40 { background-color:#fca82c; } \
				#main span.cz-serialzone-myrating-50 { background-color:#ecbd00; } \
				#main span.cz-serialzone-myrating-60 { background-color:#a4d316; } \
				#main span.cz-serialzone-myrating-70 { background-color:#73c02b; } \
				#main span.cz-serialzone-myrating-80 { background-color:#24ad37; } \
				#main span.cz-serialzone-myrating-90 { background-color:#008831; } \
				#main span.cz-serialzone-myrating-100 { background-color:#005723; } \
				#main span.cz-serialzone-myrating.cz-serialzone-myrating-hasicon { border-radius:2px 0px 0px 2px; } \
				#main span.cz-serialzone-myrating.cz-serialzone-myrating-favorite { padding:0px; width:14px; border-left:solid 1px #777; border-radius:0px 2px 2px 0px; background:#444 url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTBDMTIwQzU4MDM1MTFFMzg0QTVDNDA1QTU4REY4QUIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTBDMTIwQzY4MDM1MTFFMzg0QTVDNDA1QTU4REY4QUIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5MEMxMjBDMzgwMzUxMUUzODRBNUM0MDVBNThERjhBQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5MEMxMjBDNDgwMzUxMUUzODRBNUM0MDVBNThERjhBQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pj8xjWEAAAC9SURBVHjatNJBCwFBFMBxs7Yk9js4STk5UkoiV3LwKZTcfbPNh6DkQilxdHEQMv5TY5umndna8upXu2+a996+VkgpC3ki8JyV8lwsY4Wi86YaNUUbdzQd50nH0Ko3QwVTK59MIPRyxliqd3zQQoQbtrrwGQtczVFDzPGW6XFBxxzVnr2Pk3Vph4brG3+xxsHKHbHP2modLzwQ46mfa1kd1RY3GGKAke428XUM0EPVqh6hC2HmxT/+VW98BRgAw7z7bg+WB8gAAAAASUVORK5CYII=) no-repeat center center; } \
				#main span.cz-serialzone-myrating.cz-serialzone-myrating-love { padding:0px; width:14px; border-left:solid 1px #777; border-radius:0px 2px 2px 0px; background:#444 url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzAwNTRENDg4MDM0MTFFM0I1MDE4NEYwQTY1MzY4NzMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzAwNTRENDk4MDM0MTFFM0I1MDE4NEYwQTY1MzY4NzMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDMDA1NEQ0NjgwMzQxMUUzQjUwMTg0RjBBNjUzNjg3MyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDMDA1NEQ0NzgwMzQxMUUzQjUwMTg0RjBBNjUzNjg3MyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pso7V/AAAACASURBVHjaYvz//z8DOYCJgUxAtkYWND4/EJcD8Tcg7oKKgfhcQNwOxJ/gKkF+RMJd/xFgHhDPR+J3IatlRAscQiHFiMuPN/BouonCQ3OqJhC/+48JQGIayGrRNcI0f0LS9AEqxkBIIwjrImnUwaaGEU/KcYLS+7CG0tBJcgABBgD9iM4PIRX5ogAAAABJRU5ErkJggg==) no-repeat center center; } \
				#main span.cz-serialzone-myrating.cz-serialzone-myrating-watch { padding:0px; width:14px; border-left:solid 1px #777; border-radius:0px 2px 2px 0px; background:#444 url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTRFRTZEQzM4MDMzMTFFMzk3ODA4NkM4MkZBM0JBRjIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTRFRTZEQzQ4MDMzMTFFMzk3ODA4NkM4MkZBM0JBRjIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1NEVFNkRDMTgwMzMxMUUzOTc4MDg2QzgyRkEzQkFGMiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1NEVFNkRDMjgwMzMxMUUzOTc4MDg2QzgyRkEzQkFGMiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PnBnyyUAAACmSURBVHjaYvz//z8DOYCJgUxAf40sWMScgbgEiH8DsSAQMwJxBxBvQVEFChwoZgPiif8hYBkQGwCxEBAvh4rNA2IOmHqYpmIgPgBVcBGILaC0OxDzAvE9qNwRIC4D6WFC8iuyf0HOFADiViCWAeLvUPE/QPwPm1OnQU1eCMQmQGwNdTYITAViVph6RiwJwB+Iq4H4K8hcqA2gwNmDrIhxBKQcgAADACAqpFvSUEyEAAAAAElFTkSuQmCC) no-repeat center center; } \
				#main span.cz-serialzone-myrating-clear-button { background-color:#1e3c71; cursor:pointer; margin-left:10px; border-radius:2px; color:white; margin-top:5px; padding:2px; 5px; } \
				#main a.cz-serialzone-myrating-processed { margin-left:3px; } \
				#main div.inside-text * { vertical-align:middle; } \
			");
			
			// real-time changes
			$j(window).bind("load", function ()
			{
				var changeObserver = new variables.mutationObserver(function (mutations)
				{
					for (var i = 0; i < mutations.length; i++)
					{
						if (mutations[i].addedNodes.length > 0)
						{
							engine.injectData();
							return;
						}
					}
				});
				changeObserver.observe(document.querySelector("#main"), { attributes: false, childList: true, subtree: true });
			});
			
			// data
			variables.dataRating = window.localStorage.getItem("cz-serialzone-myrating-" + variables.profileId + "-rating");
			variables.dataAverageRating = window.localStorage.getItem("cz-serialzone-myrating-" + variables.profileId + "-averagerating");
			variables.dataFavorite = window.localStorage.getItem("cz-serialzone-myrating-" + variables.profileId + "-favorite");
			variables.dataLove = window.localStorage.getItem("cz-serialzone-myrating-" + variables.profileId + "-love");
			variables.dataWatch = window.localStorage.getItem("cz-serialzone-myrating-" + variables.profileId + "-watch");
			var lastDownload = parseInt(window.localStorage.getItem("cz-serialzone-myrating-" + variables.profileId + "-lastdownload") || 0);
			if (!variables.dataRating || !variables.dataFavorite || !variables.dataLove || !variables.dataWatch || utils.toDays(new Date(lastDownload)) < utils.toDays(new Date()))
			{
				engine.loadRating();
				engine.loadMyShows();
			}
			else
			{
				variables.dataRating = JSON.parse(variables.dataRating);
				variables.dataFavorite = JSON.parse(variables.dataFavorite);
				variables.dataLove = JSON.parse(variables.dataLove);
				variables.dataWatch = JSON.parse(variables.dataWatch);
			}
			
			engine.injectData();
			
			// clear button in my menu
			engine.renderClearButton();
		},
		loadRating: function()
		{
			$j.ajax({
				"url": "/uzivatele/profil/" + variables.profileId + "/hodnoceni/",
				"dataType": "html",
				"success": function(result)
				{
					engine.parseRating(result);
				}
			});
		},
		loadMyShows: function()
		{
			$j.ajax({
				"url": "/moje-serialy/",
				"dataType": "html",
				"success": function(result)
				{
					engine.parseMyShows(result);
				}
			});
		},
		parseRating: function(result)
		{
			// show rating
			variables.dataRating = {};
			var match;
			while (match = variables.ratingPattern.exec(result))
			{
				var matchElements = variables.ratingElementsPattern.exec(match[0]);
				if (matchElements)
					variables.dataRating[matchElements[1]] = parseInt(matchElements[2]);
			}
			// average rating
			variables.dataAverageRating = 0;
			var averageRating = [];
			while (match = variables.averageRatingPattern.exec(result))
				averageRating.push({ p: parseInt(match[1]), v: parseInt(match[2]) });
			for (var i = 0; i < averageRating.length; i++)
				variables.dataAverageRating += (averageRating[i].p * averageRating[i].v);
			variables.dataAverageRating /= $j(averageRating)
				.map(function() { return this.v; })
				.get()
				.reduce(function(a,b) { return a + b });
			variables.dataAverageRating = Math.floor(variables.dataAverageRating * 100) / 100;
			
			window.localStorage.setItem("cz-serialzone-myrating-" + variables.profileId + "-rating", JSON.stringify(variables.dataRating));
			window.localStorage.setItem("cz-serialzone-myrating-" + variables.profileId + "-averagerating", variables.dataAverageRating);
			window.localStorage.setItem("cz-serialzone-myrating-" + variables.profileId + "-lastdownload", Date.now());
			engine.injectData();
		},
		parseMyShows: function(result)
		{
			var links;
			var page = $j(result);
			
			// watch
			variables.dataWatch = [];
			var startElement = page.find("h2:contains('MOJE SERIÁLY — CHCI VIDĚT')");
			links = startElement.nextUntil("div.cleaner").find("li.watchname2 > a");
			for (var i = 0; i < links.length; i++)
				variables.dataWatch.push(variables.showIdPattern.exec(links.eq(i).attr("href"))[1]);
			// favorite
			variables.dataFavorite = [];
			links = page.find("#oblibene li.watchname2 > a").add(page.find("#ignorovane li.watchname2 > a"));
			for (var i = 0; i < links.length; i++)
				variables.dataFavorite.push(variables.showIdPattern.exec(links.eq(i).attr("href"))[1]);
			// love
			variables.dataLove = [];
			links = page.find("#zamilovane li.watchname2 > a");
			for (var i = 0; i < links.length; i++)
				variables.dataLove.push(variables.showIdPattern.exec(links.eq(i).attr("href"))[1]);
			
			window.localStorage.setItem("cz-serialzone-myrating-" + variables.profileId + "-watch", JSON.stringify(variables.dataWatch));
			window.localStorage.setItem("cz-serialzone-myrating-" + variables.profileId + "-favorite", JSON.stringify(variables.dataFavorite));
			window.localStorage.setItem("cz-serialzone-myrating-" + variables.profileId + "-love", JSON.stringify(variables.dataLove));
			window.localStorage.setItem("cz-serialzone-myrating-" + variables.profileId + "-lastdownload", Date.now());
			engine.injectData();
		},
		injectData: function()
		{
			if (variables.dataRating && variables.dataWatch && variables.dataFavorite && variables.dataLove)
			{
				var links = engine.getLinks();
				
				for (var i = 0; i < links.length; i++)
				{
					var link = links.eq(i);
					var showid = variables.showIdPattern.exec(link.attr("href"))[1];
					if (variables.alias[showid])
						showid = variables.alias[showid];
					var rating = variables.dataRating[showid];
					var watch = variables.dataWatch.indexOf(showid);
					var favorite = variables.dataFavorite.indexOf(showid);
					var love = variables.dataLove.indexOf(showid);
					
					link.addClass("cz-serialzone-myrating-processed");
					
					var ratingElement = $j('<span/>')
						.addClass("cz-serialzone-myrating cz-serialzone-myrating-" + (rating != undefined ? rating : "none"))
						.addClass(favorite > -1 || love > -1 || watch > -1 ? "cz-serialzone-myrating-hasicon" : "")
						.text(rating != undefined ? rating + " %" : "---")
						.attr("title", rating != undefined ? rating + " %" : "---")
						.insertBefore(link);
					if (favorite > -1)
						$j('<span/>').addClass("cz-serialzone-myrating cz-serialzone-myrating-favorite").attr("title", "Oblíbené").insertAfter(ratingElement);
					if (love > -1)
						$j('<span/>').addClass("cz-serialzone-myrating cz-serialzone-myrating-love").attr("title", "Zamilované").insertAfter(ratingElement);
					if (watch > -1)
						$j('<span/>').addClass("cz-serialzone-myrating cz-serialzone-myrating-watch").attr("title", "Chci vidět").insertAfter(ratingElement);
				}
			}
		},
		getLinks: function()
		{
			return $j("#main a").filter(function()
			{
				var that = $j(this);
				var linkUrl = that.attr("href") || "";
				return variables.showIdPattern.exec(linkUrl) != null // url match
					&& that.text() != "" // only links having a text, not image links
					&& linkUrl.indexOf("#") == -1 // watchlist page... links to subtitles
					&& !that.hasClass("cz-serialzone-myrating-processed") // already injected links
					&& parseFloat(that.css("font-size")) > 10.0 // only links with bigger font... small font is used for unimportant links, thus not needed
					&& !that.parent().hasClass("watchinfo") // watchlist page... second column, not needed
					&& !(variables.showIdPattern.exec(document.location.pathname) != null && linkUrl.indexOf("/serial/" + variables.showIdPattern.exec(document.location.pathname)[1] + "/") > -1); // tv show detail... links that link to the same tv show
			});
		},
		renderClearButton: function()
		{
			var link = $j('<a/>')
				.text("Obnovit hodnocení (" + (variables.dataAverageRating || "---") + " %)")
				.attr("href", "javascript:;")
				.bind("click", function()
				{
					window.localStorage.removeItem("cz-serialzone-myrating-" + variables.profileId + "-rating");
					window.localStorage.removeItem("cz-serialzone-myrating-" + variables.profileId + "-averagerating");
					window.localStorage.removeItem("cz-serialzone-myrating-" + variables.profileId + "-watch");
					window.localStorage.removeItem("cz-serialzone-myrating-" + variables.profileId + "-favorite");
					window.localStorage.removeItem("cz-serialzone-myrating-" + variables.profileId + "-love");
					document.location.reload();
				})
				.insertBefore("div.my-menu > a:contains('Giftshop')");
			link.after(document.createTextNode(" | "));
		}
	};
	
	var utils = {
		toDays: function(dateObj)
		{
			return Math.floor(dateObj.getTime() / 1000 / 60 / 60 / 24);
		}
	};

	engine.init();
})();