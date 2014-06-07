// ==UserScript==
// @name           YouTube Thumb Likes Dislikes
// @namespace      YTTLD
// @description    Adds the likes/dislikes light-saber to YouTube thumbnails, so you can avoid watching crap videos.  Activates when mouse passes over a thumbnail.
// @include        http://youtube.com/*
// @include        https://youtube.com/*
// @include        http://*.youtube.com/*
// @include        https://*.youtube.com/*
// For thumbnails when google is presenting video search - but probably fails from XSS
// @include        http://www.google.co.uk/search?q=*&tbm=vid&*
// @include        https://www.google.co.uk/search?q=*&tbm=vid&*
// ==/UserScript==

// Some YouTube videos get lots of views even though they are rubbish, maybe
// even Rick Rolls.  This may be because they have some enticing screenshot
// and title that was part of an older or existing trend.

// However, it is fairly easy to filter these out, if we can see the video has
// significantly more dislikes than likes!



// == Configuration == //

var addCountsToTooltip = false;           // Shows likes/dislikes when
                                          // (re-)hovering a thumbail/link.

var addCountsToThumbnail = true;          // Display likes/dislikes next to the
                                          // thumbnail.

var addLightSaberBarToThumbnail = true;   // The lightsaber is the green/red
                                          // bar, easier than reading numbers!

var addVideoDescriptionToTooltip = true;  // The "tooltip" is actually the
                                          // alt/title of a link, which
                                          // browsers display on hover.

var spamYouTube = false;   // Automatically looks up data for ALL the thumbnails on the page.
                           // Normally it waits for a mouseover before doing a lookup.



// BUG: It only triggers when we move our mouse *off* the link.  Why is that?!



// Some other scripts like this:
// http://userscripts.org/scripts/search?q=youtube+likes+dislikes&submit=Search

function suitableLink(link) {
	return (
		link.tagName == "A"
		&& link.pathname.indexOf("/watch")==0
		// But not if it's the same page:
		&& link.href.replace(/#.*/,'') != document.location.href.replace(/#.*/,'')
	);
}

function fakeGetElementById(root, id) {
	var allElems = root.getElementsByTagName("*");
	for (var i=0;i<allElems.length;i++) {
		if (allElems[i].id == id) {
			return allElems[i];
		}
	}
	return null;
}

// Sometimes the element hovered is not the one we want to modify to show extra info.  We need to find a nearby element with a title attribute we can add to.
function findClosestLinkElem(orig) {
	var startFrom = orig;
	while (startFrom != null) {
		if (startFrom.tagName == "A") {
			return startFrom;
		}
		var descendents = startFrom.getElementsByTagName("A");
		for (var i=0;i<descendents.length;i++) {
			if (true) {
				return descendents[i];
			}
		}
		startFrom = startFrom.parentNode;
	}
	return orig;
}

// Display likes/dislikes on links to other videos
function checkLikesDislikes(evt) {
	var target = evt.target || evt.srcElement;
	if (suitableLink(target) && !target.doneLikesDislikes) {
		target.doneLikesDislikes = true;

		function gotTargetPage(response) {
			var content = response.responseText;
			GM_log("GOT CONTENT LENGTH: "+content.length);
			if (content) {
				var lePage = document.createElement("div");
				lePage.innerHTML = content;
				var infoElem = lePage.getElementsByClassName("watch-likes-dislikes")[0];
				infoElem = infoElem || lePage.getElementsByClassName("video-extras-likes-dislikes")[0]; // Oct 2012
				GM_log("GOT INFOELEM: "+infoElem);
				if (infoElem) {
					var infoText = infoElem.textContent.trim();

					// Find suitable element for adding tooltip info.
					var elemWithTitle = findClosestLinkElem(target);
					// On sidebar thumbnails this tends to be the containing <A> rather
					// than the <span> holding the video title, which is what I usually
					// mouseover!  However on YT's front page it does find the title.

					if (addCountsToTooltip) {
						elemWithTitle.title += " ("+infoText+")";
					}

					if (addCountsToThumbnail) {
						var span = document.createElement("div");
						span.className = "stat";
						span.appendChild(document.createTextNode(infoText));
						target.appendChild(span);
					}

					if (addLightSaberBarToThumbnail) {

						var lightSaber = lePage.getElementsByClassName("watch-sparkbars")[0];
						lightSaber = lightSaber || lePage.getElementsByClassName("video-extras-sparkbars")[0]; // Oct 2012
						if (lightSaber) {
							// Pictures are easier to read than words:
							target.appendChild(lightSaber);
							// It often falls on the line below the thumbnail, aligned left
							// Here is a dirty fix to align it right, with all the other info.
							if (document.location.pathname === "/watch") { // not on search results
								lightSaber.style.marginLeft = '124px';
							}
							// Bars are unneccessarily wide on search results pages, so:
							if (lightSaber.clientWidth > 150) {
								lightSaber.style.maxWidth = '120px';
							}
						} else {
							elemWithTitle.title += " [No likes/dislikes available]";
						}

					}

					if (addVideoDescriptionToTooltip) {
						// Uncaught TypeError: Object #<HTMLDivElement> has no method 'getElementById'
						// var descrElem = lePage.getElementById("watch-description-text");
						var descrElem = fakeGetElementById(lePage,"watch-description-text");
						if (descrElem) {
							elemWithTitle.title += " ::: " + descrElem.textContent.trim();
						}
					}

				}
			}
		}

		GM_log("Requesting: "+target.href);
		GM_xmlhttpRequest({
			method: "GET",
			url: target.href,
			headers: {
				// "Reason": "I want to display watch-likes-dislikes, watch-sparkbars and watch-description-text by this thumbnail"
			},
			onload: gotTargetPage,
			onerror: function(err){
				GM_log("Got error requesting YT page: "+err);
			}
		});

	}
}
document.body.addEventListener("mouseover",checkLikesDislikes,false);

if (spamYouTube) {
	function queueLink(link,when) {
		GM_log("In "+(when/1000|0)+" seconds will do "+link);
		setTimeout(function(){
			checkLikesDislikes({target:link});
		},when);
	}
	var ls = document.getElementsByTagName("A");
	var lastUrlDone = "";
	var num = 0;
	for (var i=0;i<ls.length;i++) {
		var link = ls[i];
		if (link.href != lastUrlDone && suitableLink(link)) {
			num++;
			queueLink(link, 1000 * Math.pow(1.2 + 1.2*num,1.7) );
			lastUrlDone = link.href;
		}
	}
}

// TODO:
// On search results pages, why does feature not active/work when we hover over
// thumbs, only when we hover over the text/title links?

// BUG TODO: Not all information is appearing on Feed pages, guess it's
// appending to the wrong place.

