// ==UserScript==
// @name            /r/tf2trade flair
// @author          cXhristian
// @namespace       steamcommunity.com/id/cxhristian
// @description     Turns the flair on /r/tf2trade into links.
// @license         Commons, CC-BY-SA
// @version	    2.0
// @include         http://reddit.com/r/tf2trade*
// @include         http://www.reddit.com/r/tf2trade*
// @match           http://www.reddit.com/r/tf2trade*
// @released        2011-09-09
// @updated         2012-04-01
// @compatible      Greasemonkey, Chrome, Opera
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==

/*
 Based on zedadex's flair script.
 Updated and improved by cXhristian
 */

$.extend({
	distinct:function (anArray) {
		var result = [];
		$.each(anArray, function (i, v) {
			if ($.inArray(v, result) == -1) result.push(v);
		});
		return result;
	}
});

$(function () {
	function updatePlayerStatus(steamIDs) {
		playerStatus = "Profile";
		GM_xmlhttpRequest({
			method:"GET",
			//synchronous: "TRUE",
			url:"http://tf2tw.com/parser.php?steamid=" + steamIDs,
			onload:function (response) {
				pageContents = response.responseText;
				var json = jQuery.parseJSON(pageContents);
				ids = json.response.players;
				$.each(ids, function (property, value) {
					var spanId = $(".player" + value.steamid);
					console.log(value);
					if (value.gameid !== undefined) {
						$(spanId).html("<span style='color:#8cb359;'>In-Game</span>");
						$(spanId).parent().parent().css("background-image", "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAgCAMAAAAsVwj+AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OEY4MzE4M0U3QzFGMTFFMUFERDZGMkM1N0Q4RTY3QjMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OEY4MzE4M0Y3QzFGMTFFMUFERDZGMkM1N0Q4RTY3QjMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4RjgzMTgzQzdDMUYxMUUxQURENkYyQzU3RDhFNjdCMyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4RjgzMTgzRDdDMUYxMUUxQURENkYyQzU3RDhFNjdCMyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtEEtnMAAABXUExURY20WqrRd8rxl8Lpj9f+pK3Uem2UOn+mTNL5n7fehJi/Zd3/rrTbgWiPNWGILrrhh4ivVZrBZ3uiSDphB5S7YY61W4yzWS1OAS9SAStKAYuyWPz/+P7//AthY3UAAAEjSURBVHjaNE/blsQgCKO112ln9oIIAv//nYvW9fgAIYQEXqqFtJSS85SLvkCVipLCtJjZEkWMg0B5MSKypQA9jGww+5xNoSkENBm5OdkKpTPK5dQZKwQlbiS3gwhuKzCVAqEw3lrA7DyP0aZcCHqVG3SGGOgDWLYla3cE8wC03wuntF7rceSrBWqZAl8t5+vsC6ShouVrWc7cxxpAxA9r8P9f8KmVpTIz4hu5fqBW4SpV3sndk1SIcRAEk4uIJwZ5GOgy+YTO0BQCervEivgG3Bk8D8YWKxw3svsdGr+x8mYWRh9vY3Df96/R/iAL9AobtPdzD+DoCWt3BNMAnmPBkG3e7hvnFqhlCh+bI857XwhWhOPvlHbs41prjz/ctv/5E2AAwVMp9zPLYa8AAAAASUVORK5CYII=)");
					}
					else if (value.personastate >= 1) {
						$(spanId).html("<span style='color:#86b5d9;'>Online</span>");
						$(spanId).parent().parent().css("background-image", "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAgCAMAAAAsVwj+AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTBBNUQwODA3QzFGMTFFMTg2RTlFNUVDOTc4MTQ1MzkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTBBNUQwODE3QzFGMTFFMTg2RTlFNUVDOTc4MTQ1MzkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBMEE1RDA3RTdDMUYxMUUxODZFOUU1RUM5NzgxNDUzOSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBMEE1RDA3RjdDMUYxMUUxODZFOUU1RUM5NzgxNDUzOSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Po5YvjsAAABXUExURXmozLHd/5bF6b/j/9bt/5nI7FmIrKPS9s3p/2uavt7w/018oKDP84Sz11SDp6bV+XSjx2eWuoa12SZVeYCv03qpzXinyxdGahpJbRRDZ/z9/3emyv7+/x33jkcAAAEjSURBVHjaNE/blsQgCMPe2+nMXhBB4P+/c9G6Hh8ghJDA26yQlVJynnKxN5hRMTKYFlVdoohxECgvSkS6FKCHkRVmn7MaNIWAJiVXJ12hdEa5nDpjhaDEjeR6EMGtBaZSIBTGWwuo7vsx2pQLQa9yg/YQA3sAzbpk645gHoD1e+GU1ms9jny1QC1T4KvmfO19gSxUrHwty5772AKI+GEN/v8bXrWyVGZG/CDXF9QqXKXKJ7l7kgoxDoJgchHxxCAPA10mn9AZmkJAH5dYEd+AO4PnwdhiheNGdr9D4ydWPszC6ONtDO7n+TXaX2SBXmGDzn7uARw9Ye2OYBrAcywYss3bfePcArVM4WNzxPnsC8GKcPyd0ol9XGvt8Yfb9l9/AgwAxAsp9xXHXCcAAAAASUVORK5CYII=)");
					}
					else if (value.personastate == 0) {
						$(spanId).html("<span style='color:#a6a4a1;'>Offline</span>");
						$(spanId).parent().parent().css("background-image", "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAgCAMAAAAsVwj+AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MEU4RTM4OEM3QzIwMTFFMTlDQjNGNDY2RjcxMDJCNjUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MEU4RTM4OEQ3QzIwMTFFMTlDQjNGNDY2RjcxMDJCNjUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowRThFMzg4QTdDMjAxMUUxOUNCM0Y0NjZGNzEwMkI2NSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowRThFMzg4QjdDMjAxMUUxOUNCM0Y0NjZGNzEwMkI2NSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pj00eroAAABgUExURYSEhMTKxOLi4q2trVxaXKSunLm5udvb23RydNHR0czWxExMTKmpqVRWVJKSkrS2tOXl5by+vMfHx5SWjHx+fGxubBwaHI2NjYWFhYODgwQGDAwKDAQCBIGBgf39/fz+/ImFk/8AAAEoSURBVHjaNE/bloQwCKPqqOPo6OyFUmjh//9yae329AFCCAm8S0lUUkox7jGVN5RCqVCBfVDVwQsfO4HioESkQwK6GVHhac+oBaqCQ7uSqZGOkBojXUaNMYJT/MaX6UIEpybYUwJX6G9MoDrPS2+/YiJoVazQ7GJQbkCjDrE0R/DsQGn33CmN17gs8aqBaibHR43xmtsCFVcp6TMMc2zj4oDHd2vw/9/wypklMzPigZxfkLNwlixHMLMgGXzsBMFgImKBQW4GmjzsgcZQFRw6THxFbAJuDN46Y/IV9hvR7HSNX185mIXR+psYzNb109tvZIFWYYXWdu4GDC1gbo7g0YH7mDNk2qbzxK0Gqpncx2SI29oWnOXh+CeEFds459zid7f1v/4EGACoAC9l+Bs5AAAAAABJRU5ErkJggg==)");
					}
					$(spanId).parent().parent().css("background-repeat", "no-repeat");
					if ($(spanId).parent().parent().hasClass("flair-trusted") != true || !$(spanId).parent().parent().hasClass("flair-valuablemember") != true) {
						$(spanId).parent().parent().css("background-position", "0px 0px");
					}
				});
			}
		});
		return playerStatus;
	}

	var steamID = "";
	var steamURL = "";
	var flairArray = [];
	var i = 0;
	$('.flair').each(function () {
		steamURL = $(this).html();
		steamID = steamURL.replace("http://steamcommunity.com/profiles/", "");
		if (jQuery.inArray(steamID, flairArray) == -1) {
			flairArray.push(steamID);
		}
		dev = "";
		if (steamID == "76561198013620583") {
			dev = ", <a href='http://redd.it/kaucc'>Feedback</a>"
		}
		$(this).html("&nbsp;&nbsp;&nbsp;&nbsp;<a href='" + steamURL + "'><span class='player" + steamID + "'>" + "Profile" + "</span></a> [<a title='Add (must have steam running)' href='steam://friends/add/" + steamID + "'>+</a>,<a title='Message (must have steam running)' href='steam://friends/message/" + steamID + "'>m</a>], <a href='http://tf2b.com/tf2/" + steamID + "'>Backpack</a>" + dev);
		// updatePlayerStatus(steamID, i);
		i++;
	});
	var flairIDs = flairArray.join(",");
	updatePlayerStatus(flairIDs);

});
