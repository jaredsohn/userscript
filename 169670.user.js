// ==UserScript==
// @name           MAL Top List Highlighter
// @version        1.4.1
// @description    Highlights already seen shows based on the last viewed anime list, automatically appends pages when scrolled to top list end.
// @license        Public Domain; http://creativecommons.org/publicdomain/zero/1.0/
// @include        http://myanimelist.net/topanime.php*
// @include        http://myanimelist.net/animelist/*
// ==/UserScript==

/* global $ */

(function() {
	"use strict";
	
	var x$ = null;
	var malMarker = { seenList : null, depCount : 0, prevPageLast : null, lastElement : null, listIndex : null, listType : null, pageLoading : true, settings : null, loadingList : false, pageType : null, clubFilterList : null, endReached : false };
	
	malMarker.seenStatusText = ["Unknown", "Currently watching", "Completed", "On hold", "Dropped", "Planning to watch"];

	malMarker.loadScript = function(url, callback) {
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.src = url;
		script.onload = callback;
		document.getElementsByTagName("head")[0].appendChild(script);
	};
	
	malMarker.loadCSS = function() {
		x$(
			"<style>" +
			"	.x2 { background: #cccccc; }" + 
			"	.x1 { background: #e5e5e5; }" + 
			"	.msRating { width: 250px; float: right; }" +
			"	.hiddenLine { display: none; }" +
			"</style>"
		).appendTo("head");
	};
	
	malMarker.safeAlert = function(text) {
		if("alert" in window && typeof window.alert === "function") {
			window.alert(text);
		}
		else if("console" in window && typeof window.console === "object") {
			window.console.log(text);
		}
	};
	
	malMarker.resetLists = function() {
		malMarker.seenList = {};
	};
	
	malMarker.dummyRatingElement = {text : function() { return "-"; }};
	
	malMarker.addLineToLists = function(element, animeStatus, ratingColumn) {
		var idElement = x$(element).find("a[id^=\"xmenu\"]");
		
		if(idElement.length < 1) {
			return;
		}
		
		var animeId = parseInt(idElement[0].id.substr(5), 10);
		
		if(isNaN(animeId)) {
			return;
		}
		
		var ratingElement = x$(element).find("span[id^=\"scoreval\"]");
		
		if(ratingElement.length < 1) {
			if(ratingColumn === null) {
				ratingElement = malMarker.dummyRatingElement;
			}
			else {
				ratingElement = x$(element).find("td:nth-of-type(" + (ratingColumn+1) + ")");
			}
		}
		
		var animeRating = parseInt(ratingElement.text(), 10);
		
		if(isNaN(animeRating)) {
			animeRating = -1;
		}
		
		malMarker.seenList[animeId] = {status : animeStatus, rating : animeRating};
	};
	
	malMarker.findColumnIdByName = function(element, columnName) {
		var columnIndex = null;
	
		x$(element).find("td").each( function(index) {
			var scoreLink = x$(this).find(".table_headerLink");
			
			if(scoreLink.length > 0 && x$(scoreLink[0]).text() === columnName) {
				columnIndex = index;
				return false;
			}
		});
		
		return columnIndex;
	};
	
	malMarker.collectRatingsFromElement = function(element) {
		malMarker.resetLists();
		
		var currentStatus = null;
		var ratingColumn = null;
	
		x$(element).find("#list_surround > table").each( function() {
			if(this.className !== "") {
				currentStatus = ["header_cw", "header_completed", "header_onhold", "header_dropped", "header_ptw"].indexOf(this.className) + 1;
				
				if(currentStatus < 1) {
					return false;
				}
				
				ratingColumn = -1;
			}
			else if(currentStatus !== null) {
				if(ratingColumn === -1) {
					ratingColumn = malMarker.findColumnIdByName(this, "Score");
				}
				else {
					malMarker.addLineToLists(this, currentStatus, ratingColumn);
				}
			}
		} );
	};
	
	malMarker.markOneLine = function(element, info) {
		x$(element).removeClass("x1 x2 x3 x4 x5").addClass("x" + info.status);
		
		var statusText = "";
		
		if(malMarker.seenList === null) {
			statusText += "Seen";
		}
		else {
			statusText += malMarker.seenStatusText[info.status];
		}
		
		if(malMarker.settings.skipCompleted && info.status === 2) {
			x$(element).css("display", "none");
		}
		
		if(info.rating >= 0) {
			statusText += "<br />Rated " + info.rating;
		}
		
		x$(element).find(".spaceit_pad").prepend("<div class=\"msRating\">" + statusText + "</div>");
	};
	
	malMarker.getSeenInfo = function(element, animeId) {
		if(isNaN(animeId)) {
			return null;
		}
		else if(malMarker.seenList !== null) {
			if(malMarker.seenList.hasOwnProperty(animeId)) {
				return malMarker.seenList[animeId];
			}
		}
		else if(x$(element).find(".button_edit").length > 0) {
			return {status : 2, rating : -1};
		}
		
		return null;
	};
	
	malMarker.markAreaElementList = function(elements) {
		if(!malMarker.settings.useLists) {
			return false;
		}
	
		malMarker.prevPageLast = malMarker.lastElement;
	
		elements.each( function() {
			var animeId = parseInt(this.id.substr(4), 10);
			var element = x$(this).parents().eq(1);
			var seenInfo = malMarker.getSeenInfo(element, animeId);
			
			if(seenInfo !== null) {
				malMarker.markOneLine(element, seenInfo);
			}
			
			if(malMarker.clubFilterList !== null && !malMarker.clubFilterList.hasOwnProperty(animeId)) {
				x$(element).addClass("hiddenLine");
			}
			
			malMarker.lastElement = this;
		});
		
		if(malMarker.prevPageLast === null) {
			malMarker.prevPageLast = malMarker.lastElement;
		}
	};
	
	malMarker.clearListTweaks = function() {
		x$(".x2").css("display", "");
		x$(".x1, .x2, .x3, .x4, .hiddenLine").removeClass("x1 x2 x3 x4 hiddenLine");
		x$(".msRating").remove();
	};
	
	malMarker.markFirstPage = function() {
		malMarker.markAreaElementList(x$("div[id^=area]"));
		
		malMarker.pageLoading = false;
	};
	
	malMarker.getPageType = function() {
		var url = window.location.href;
		
		if(/animelist\/[^&]/i.test(url)) {
			return "animelist";
		}
		else if(/topanime\.php/i.test(url)) {
			return "toplist";
		}
	};
	
	malMarker.getCurrentUser = function() {
		if(malMarker.pageType === "animelist") {
			var nameElement = x$("#mal_cs_listinfo a > strong");
			
			return (nameElement.length === 0) ? null : nameElement.text();
		}
		else if(malMarker.pageType === "toplist") {
			var nameLink = x$("#nav a[href^=\"/profile/\"]");
			
			if(nameLink.length === 0) {
				return null;
			}
			
			var linkHref = nameLink.attr("href");
			var namePos = linkHref.lastIndexOf("/");
			
			return (namePos === -1) ? null : linkHref.substr(namePos + 1);
		}
		
		return null;
	};
	
	malMarker.getCurrentListOwner = function() {
		var namePos = window.location.pathname.lastIndexOf("/");
		
		if(namePos === -1) {
			return null;
		}
		
		var endPart = window.location.pathname.substr(namePos + 1);
		var andPos = endPart.indexOf("&");
		
		return (andPos === -1) ? endPart : endPart.substr(0, andPos);
	};
	
	malMarker.isCurrentUserList = function() {
		return malMarker.getCurrentListOwner() === malMarker.getCurrentUser();
	};
	
	malMarker.checkLineAgainstFilter = function(element, filterParts, typeColumn) {
		var typeElement = x$(element).find("td:nth-of-type(" + (typeColumn+1) + ")");
		
		if(typeElement.length === 0) {
			return;
		}
		
		var typeName = typeElement.text();
		
		if(filterParts.indexOf(typeName) === -1) {
			x$(element).addClass("hiddenLine");
		}
	};
	
	malMarker.applyAnimeListTypeFilter = function(filterName) {
		x$("table.hiddenLine").removeClass("hiddenLine");
		
		window.location.hash = filterName;
		
		var currentStatus = null;
		var typeColumn = null;
		
		if(filterName === "All") {
			return;
		}
		
		var filterParts = null;
		
		if(filterName === "No specials") {
			filterParts = ["TV", "OVA", "ONA", "Movie"];
		}
		else if(filterName === "Series") {
			filterParts = ["TV", "OVA", "ONA"];
		}
		else {
			filterParts = filterName.split("+");
		}
	
		x$("#list_surround > table").each( function() {
			if(this.className !== "") {
				currentStatus = ["header_cw", "header_completed", "header_onhold", "header_dropped", "header_ptw"].indexOf(this.className) + 1;
				
				if(currentStatus < 1) {
					return false;
				}
				
				typeColumn = -1;
			}
			else if(currentStatus !== null) {
				if(typeColumn === -1) {
					typeColumn = malMarker.findColumnIdByName(this, "Type");
					
					if(typeColumn === null) {
						return false;
					}
				}
				else {
					malMarker.checkLineAgainstFilter(this, filterParts, typeColumn);
				}
			}
		} );
	};
	
	malMarker.findAnimeListSettingPlacement = function() {
		return x$("#list_surround > table:nth-of-type(1)");
	};
	
	malMarker.createAnimeListSettingHtml = function() {
		var wrapperForm = x$("<form method=\"get\" action=\"#\" />");
		var selectBox = x$("<select id=\"filterByType\" />");
		var typeOptions = ["All", "Series", "No specials", "Movie", "TV", "OVA", "ONA"];
		
		wrapperForm.append("<span>Filter by type: </span>");
		wrapperForm.append(selectBox);
		
		for(var i = 0; i < typeOptions.length; i++) {
			x$("<option />", {value: typeOptions[i], text: typeOptions[i]}).appendTo(selectBox);
		}
		
		selectBox.change( function() {
			malMarker.applyAnimeListTypeFilter(x$(this).val());
		});
		
		var hash = window.location.hash.substr(1);
		
		if(typeOptions.indexOf(hash) !== -1) {
			malMarker.applyAnimeListTypeFilter(hash);
			selectBox.val(hash);
		}
		
		malMarker.findAnimeListSettingPlacement().after(wrapperForm);
	};
	
	malMarker.saveRatings = function() {
		localStorage.setItem("malMarkerSeenList", JSON.stringify(malMarker.seenList));
	};
	
	malMarker.initForAnimeList = function() {
		malMarker.loadSettings();
		malMarker.loadCSS();
		
		if(malMarker.settings.typeFilterInAnimeList) {
			malMarker.createAnimeListSettingHtml();
		}
		
		var currentUser = malMarker.getCurrentUser();
		
		if(malMarker.settings.useLists) {
			if(malMarker.settings.switchLists || currentUser === null || malMarker.getCurrentListOwner() === currentUser) {
				malMarker.settings.lastUpdate = (new Date()).getTime();
				malMarker.settings.listOwner = malMarker.getCurrentListOwner();
				
				malMarker.collectRatingsFromElement(document);
				malMarker.saveRatings();
				malMarker.saveSettings();
			}
		}
	};
	
	malMarker.loadUserList = function(username) {
		if(malMarker.loadingList) {
			return;
		}
		
		malMarker.loadingList = true;
		
		var listLink = "/animelist/" + username + "&status=7&order=0";
		
		x$.ajax(listLink, {dataType: "text", timeout: 5000}).done( function(data) {
			malMarker.settings.lastUpdate = (new Date()).getTime();
			malMarker.settings.listOwner = username;
			
			var dom = malMarker.domFromFullHtml(data);
			malMarker.collectRatingsFromElement(dom);
			
			malMarker.saveRatings();
			malMarker.saveSettings();
			
			malMarker.clearListTweaks();
			malMarker.markFirstPage();
			
			malMarker.loadingList = false;
		}).fail( function() {
			malMarker.loadingList = false;
			
			malMarker.safeAlert("Failed to update list.");
		});
	};
	
	malMarker.loadRatings = function() {
		malMarker.seenList = malMarker.loadStorageItem("malMarkerSeenList");
	};
	
	malMarker.getUrlParam = function(paramName) {
		return decodeURIComponent((new RegExp(paramName + "=" + "(.+?)(&|$)").exec(window.location.search) || [, ""])[1]);
	};
	
	malMarker.getNextPageUrl = function() {
		if(malMarker.listIndex === null) {
			malMarker.listIndex = parseInt(malMarker.getUrlParam("limit"), 10);
			
			if(isNaN(malMarker.listIndex)) {
				malMarker.listIndex = 0;
			}
			
			malMarker.listIndex += 30;
			malMarker.listType = malMarker.getUrlParam("type");
		}
		
		return "/topanime.php?type=" + malMarker.listType + "&limit=" + malMarker.listIndex;
	};
	
	malMarker.domFromFullHtml = function(html) {
		return x$("<div id=\"fakebody\">" + html.replace(/^[\s\S]*<body.*?>|<\/body>[\s\S]*$/g, "") + "</div>");
	};
	
	malMarker.loadNextTopPage = function() {
		if(malMarker.endReached) {
			return;
		}
		
		var url = malMarker.getNextPageUrl();
		
		malMarker.pageLoading = true;
		
		x$.ajax(url, {dataType: "text", timeout: 5000}).done( function(data) {
			var dom = malMarker.domFromFullHtml(data);
			
			malMarker.markAreaElementList(dom.find("div[id^=area]"));
			
			var domLines = dom.find("#content > div:nth-of-type(2) > table > tbody > tr");
			
			if(domLines.length === 0) {
				malMarker.endReached = true;
			}
			
			x$("#content > div:nth-of-type(2) > table > tbody").append( domLines );
			
			malMarker.listIndex += 30;
			malMarker.pageLoading = false;
			
			setTimeout(malMarker.checkScroll, 500);
		}).fail( function() {
			malMarker.safeAlert("Failed to fetch next page.");
			
			malMarker.pageLoading = false;
			
			setTimeout(malMarker.checkScroll, 500);
		});
	};
	
	malMarker.checkScroll = function() {
		if(!malMarker.settings.autoPaging) {
			return;
		}
	
		var windowEndPos = x$(window).height() + x$(window).scrollTop();
	
		if(!malMarker.pageLoading && malMarker.prevPageLast !== null && x$(malMarker.prevPageLast).offset().top < windowEndPos) {
			malMarker.loadNextTopPage();
		}
	};
	
	malMarker.setupPaging = function() {
		x$(window).scroll( malMarker.checkScroll );
	};
	
	malMarker.collectAnimeListFromClubPage = function(dom) {
		var subHeaders = dom.find(".normal_header");
		
		if(subHeaders.length === 0) {
			return false;
		}
		
		var relation = null;
		
		x$.each(subHeaders, function(index, element) {
			if(x$(element).text().trim() === "Anime Relations") {
				relation = x$(element);
			}
		});
		
		if(relation === null) {
			return true;
		}
		
		malMarker.clubFilterList = {};
		
		while((relation = relation.next("div")) !== null && relation.hasClass("borderClass")) {
			var animeLink = relation.children("a").prop("href");
			var idPosition = animeLink.indexOf("?id=");
			
			if(idPosition !== -1) {
				var animeId = parseInt(animeLink.substr(idPosition + 4), 10);
				
				malMarker.clubFilterList[animeId] = 1;
			}
		}
		
		return true;
	};
	
	malMarker.retrieveClubData = function(justSelected) {
		malMarker.clubFilterList = null;
		
		if(malMarker.settings.clubFilter === null) {
			malMarker.clearListTweaks();
			malMarker.markFirstPage();
			return;
		}
	
		x$.ajax("http://myanimelist.net/clubs.php?cid=" + malMarker.settings.clubFilter, {dataType: "text", timeout: 5000}).done( function(data) {
			var dom = malMarker.domFromFullHtml(data);
			
			if(!malMarker.collectAnimeListFromClubPage(dom) && justSelected) {
				malMarker.settings.clubFilter = null;
				malMarker.saveSettings();
				malMarker.safeAlert("Invalid club ID.");
			}
			
			malMarker.clearListTweaks();
			malMarker.markFirstPage();
			malMarker.checkScroll();
		}).fail( function() {
			malMarker.safeAlert("Failed to get club data.");
		});
	};
	
	malMarker.saveSettings = function() {
		localStorage.setItem("malMarkerSettings", JSON.stringify(malMarker.settings));
		
		malMarker.settingsUpdated();
	};
	
	malMarker.appendWrappedLink = function(element, text, callback) {
		element.append(" (");
		
		var linkElement = x$("<a>");
		linkElement.attr("href", "#");
		linkElement.click(callback);
		linkElement.html(text);
		
		element.append(linkElement);
		element.append(")");
	};
	
	malMarker.getMinutesSince = function(stamp) {
		return Math.floor(((new Date()).getTime() - stamp) / 60000);
	};
	
	malMarker.buildSettingsHtml = function(element) {
		var currentUser = malMarker.getCurrentUser();
		
		element.html("");
		
		if(malMarker.settings.useLists) {
			element.append("Lists enabled");
			
			malMarker.appendWrappedLink(element, "disable", function() {
				malMarker.settings.useLists = false;
				malMarker.clearListTweaks();
				malMarker.saveSettings();
				return false;
			});
			
			element.append(". ");
		
			if(malMarker.seenList === null) {
				element.append("No anime list loaded");
				
				if(currentUser !== null) {
					malMarker.appendWrappedLink(element, "use your list", function() { 
						malMarker.loadUserList(currentUser);
						return false;
					});
				}
				
				element.append(". ");
			}
			else if(malMarker.settings.listOwner !== null) {
				if(malMarker.settings.listOwner === currentUser) {
					element.append("Your anime list loaded");
				}
				else {
					element.append("Using anime list of " + malMarker.settings.listOwner);
					
					if(currentUser !== null) {
						malMarker.appendWrappedLink(element, "use your list", function() { 
							malMarker.loadUserList(currentUser);
							return false;
						});
					}
				}
				
				element.append(", last updated " + malMarker.getMinutesSince(malMarker.settings.lastUpdate) + " minutes ago");
				
				malMarker.appendWrappedLink(element, "update", function() { 
					malMarker.loadUserList(malMarker.settings.listOwner);
					return false;
				});
				
				element.append(". ");
			}
			
			element.append("Skip-completed " + (malMarker.settings.skipCompleted ? "enabled" : "disabled"));
			
			if(malMarker.settings.skipCompleted) {
				malMarker.appendWrappedLink(element, "disable", function() {
					malMarker.settings.skipCompleted = false;
					malMarker.saveSettings();
					
					x$(".x2").css("display", "");
					return false;
				});
			}
			else {
				malMarker.appendWrappedLink(element, "enable", function() {
					malMarker.settings.skipCompleted = true;
					malMarker.saveSettings();
					
					x$(".x2").css("display", "none");
					return false;
				});
			}
			
			element.append(". ");
			
			if(malMarker.settings.clubFilter === null) {
				element.append("Club filter disabled.");
			}
			else {
				element.append("Club filter set to " + malMarker.settings.clubFilter);
			}
			
			malMarker.appendWrappedLink(element, "change", function() {
				malMarker.settings.clubFilter = parseInt(window.prompt("Enter club ID"), 10);
				
				if(malMarker.settings.clubFilter === 0 || isNaN(malMarker.settings.clubFilter)) {
					malMarker.settings.clubFilter = null;
				}
				
				malMarker.saveSettings();
				malMarker.retrieveClubData(true);
				
				x$(".x2").css("display", "");
				return false;
			});
			
			element.append(". ");
			
			element.append("List switching " + (malMarker.settings.switchLists ? "enabled" : "disabled"));
			
			if(malMarker.settings.switchLists) {
				malMarker.appendWrappedLink(element, "disable", function() {
					malMarker.settings.switchLists = false;
					malMarker.saveSettings();
					return false;
				});
			}
			else {
				malMarker.appendWrappedLink(element, "enable", function() {
					malMarker.settings.switchLists = true;
					malMarker.saveSettings();
					return false;
				});
			}
			
			element.append(". ");
		}
		else {
			element.append("Lists disabled");
			
			malMarker.appendWrappedLink(element, "enable", function() {
				malMarker.settings.useLists = true;
				malMarker.saveSettings();
				malMarker.markFirstPage();
				return false;
			});
			
			element.append(". ");
		}
		
		element.append("Page autoloading " + (malMarker.settings.autoPaging ? "enabled" : "disabled"));
		
		if(malMarker.settings.autoPaging) {
			malMarker.appendWrappedLink(element, "disable", function() {
				malMarker.settings.autoPaging = false;
				malMarker.saveSettings();
				return false;
			});
		}
		else {
			malMarker.appendWrappedLink(element, "enable", function() {
				malMarker.settings.autoPaging = true;
				malMarker.saveSettings();
				return false;
			});
		}
		
		element.append(". ");
		
		element.append("Type filter on anime lists " + (malMarker.settings.typeFilterInAnimeList ? "enabled" : "disabled"));
		
		if(malMarker.settings.typeFilterInAnimeList) {
			malMarker.appendWrappedLink(element, "disable", function() {
				malMarker.settings.typeFilterInAnimeList = false;
				malMarker.saveSettings();
				return false;
			});
		}
		else {
			malMarker.appendWrappedLink(element, "enable", function() {
				malMarker.settings.typeFilterInAnimeList = true;
				malMarker.saveSettings();
				return false;
			});
		}
		
		element.append(". ");
	};
	
	malMarker.settingsUpdated = function() {
		if(malMarker.pageType === "toplist") {
			var settingsInfoElem = x$("#malMarkerSettings");
			
			if(settingsInfoElem.length === 0) {
				settingsInfoElem = x$(document.createElement("div"));
				settingsInfoElem.attr("id", "malMarkerSettings");
				
				x$("#content > div:nth-of-type(2)").prepend(settingsInfoElem);
			}
			
			malMarker.buildSettingsHtml(settingsInfoElem);
		}
	};
	
	malMarker.loadStorageItem = function(itemName) {
		var storageItem = localStorage.getItem(itemName);
		
		return (storageItem === null) ? null : JSON.parse(storageItem);
	};
	
	malMarker.loadSettings = function() {
		malMarker.settings = malMarker.loadStorageItem("malMarkerSettings");
		
		if(malMarker.settings === null) {
			malMarker.settings = {};
			malMarker.settings.useLists = true;
			malMarker.settings.lastUpdate = (new Date()).getTime();
			malMarker.settings.listOwner = null;
			malMarker.settings.switchLists = true;
			malMarker.settings.autoPaging = true;
			malMarker.settings.skipCompleted = false;
			malMarker.settings.typeFilterInAnimeList = false;
			malMarker.settings.clubFilter = null;
			malMarker.saveSettings();
		}
		else {
			malMarker.settingsUpdated();
		}
	};
	
	malMarker.initForTopList = function() {
		malMarker.loadRatings();
		malMarker.loadSettings();
		malMarker.setupPaging();
		malMarker.loadCSS();
		malMarker.markFirstPage();
		malMarker.retrieveClubData(false);
		
		setTimeout(malMarker.checkScroll, 500);
	};
	
	malMarker.init = function() {
		malMarker.pageType = malMarker.getPageType();
		
		if(malMarker.pageType === "animelist") {
			malMarker.initForAnimeList();
		}
		else if(malMarker.pageType === "toplist") {
			malMarker.initForTopList();
		}
	};
	
	malMarker.loadCallback = function() {
		malMarker.depCount++;
		
		if(malMarker.depCount === 2) {
			x$(document).ready( malMarker.init );
		}
	};
	
	malMarker.preinit = function() {
		malMarker.loadScript("//cdnjs.cloudflare.com/ajax/libs/json3/3.2.4/json3.min.js", malMarker.loadCallback);
		malMarker.loadScript("//ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.min.js", function() {
			x$ = $.noConflict(true);
			malMarker.loadCallback();
		});
	};
	
	malMarker.preinit();
	
})();
