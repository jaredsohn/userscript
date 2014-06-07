// ==UserScript==
// @name          YouTube Likes (bar version)
// @description	  Displays a bar showing the ratio of likes to dislikes of YouTube videos.
// @namespace     http://turplepurtle.com
// @author        TurplePurtle
// @version       2.0.1
// @include       http://www.youtube.com/*
// @include       https://www.youtube.com/*
// ==/UserScript==


// Utils
function $(s, a, p) {
    p = p || document;
    return a ? p.querySelectorAll(s) : p.querySelector(s);
}
function mkEl(kind, text) {
    return kind === "text" ? document.createTextNode(text) : document.createElement(kind);
}
function contains(str, substr) {
    return str.indexOf(substr) !== -1;
}
function getJson(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) callback(xhr);
    };
    xhr.send();
}

// Hold video-Id => DOM-element pairs
var _vids = {};
var jsonURL = [
    "https://gdata.youtube.com/feeds/api/videos/", null,
    "?v=2&alt=json&fields=yt:rating,media:group(yt:videoid)&_ytl=t",
    Date.now().toString() // prevent caching the script
];

// Handle JSON data and attach likes DOM element
function handleJson(req) {
    var obj = JSON.parse(req.responseText);
    var rating = obj.entry.yt$rating;
    var id = obj.entry.media$group.yt$videoid.$t;

	if (!id) return;
	if (!rating) {
		var likes = 0, dislikes = 0;
	} else {
		var likes = +rating.numLikes,
			dislikes = +rating.numDislikes;
	}

	var total = likes + dislikes;

	var cont = mkEl("div"); //container
	cont.className = "video-extras-sparkbars";
	cont.style.width = "120px";

	if (total > 0)
		cont.style.backgroundColor = "#c00";

	var likesBar = mkEl("div"); //likes
	likesBar.className = "video-extras-sparkbar-likes";
	likesBar.style.width = Math.round(100 * likes / (total || 1)) + "%";
	cont.appendChild(likesBar);

	var likeNums = mkEl("span"),
		ups = mkEl("span"),
		downs = mkEl("span");

	ups.style.color = "#080";
	ups.style.margin = "0";
	ups.style.padding = "0";
	ups.innerHTML = likes;
	downs.style.color = "#c44";
	downs.style.margin = "0px";
	downs.style.padding = "0";
	downs.innerHTML = dislikes;

	likeNums.appendChild(mkEl("text", " ("));
	likeNums.appendChild(ups);
	likeNums.appendChild(mkEl("text", " | "));
	likeNums.appendChild(downs);
	likeNums.appendChild(mkEl("text", ")"));

	var containers = _vids[id]; // where to place the rating on the page

	containers[0].appendChild(likeNums);
	containers[0].appendChild(cont);

	if (containers.length > 1) {
		for (var i=1; i<containers.length; i++) {
			containers[i].appendChild(cont.cloneNode(true))
				.previousElementSibling.appendChild(likeNums.cloneNode(true));
		}
	}
};

// Get element where likes should be placed
// If something breaks, this function is the likely culprit
function findContainer(el) {
    var clist = el.classList;
    var ret = null, desc = null;

    if (clist.contains("related-video")) {
        desc = "video sidebar";
        ret = el;
    } else if (clist.contains("yt-uix-tile-link")) {
        desc = "search results and front page";
        ret = $(".yt-lockup-meta-info", false, el.parentNode.parentNode);
    } else if (clist.contains("content-item-title")) {
        desc = "front page boxes";
        ret = $(".content-item-metadata", false, el.parentNode);
    } else if (clist.contains("vm-video-title-content")) {
        desc = "playlists";
        ret = $(".vm-date-info", false, el.parentNode.parentNode.parentNode);
    } else if (contains(location.href, "youtube.com/user/")) {
        if (clist.contains("yt-ui-ellipsis")) {
            desc = "user / recent activity";
            ret = el.parentNode.parentNode;
        }
    } else if (clist.contains("lohp-video-link")) {
        desc = "logged off front page";
        ret = $(".lohp-video-metadata", false, el.parentNode);
    }

    if (!ret && desc) {
        // Make it easier to know what went wrong
        console.log("section broken: " + desc, ret);
    }

    return ret;
}

// Find all the links to videos in the current page
function listVids(links) {

    var vids = {};

    for (var i=0, n=links.length; i < n; i++) {
        var likesContainer = findContainer(links[i]);

        if (likesContainer) {
            var linkID = links[i].href.replace(/^[^v]+v.(.{11}).*/, "$1");

            if (vids[linkID]) {
                vids[linkID].push(likesContainer);
            } else {
                vids[linkID] = [likesContainer];
            }
        }
    }

    // Only rate videos we haven't rated before
    for (var j in vids) {
        if (j in _vids) {
            delete vids[j];
        } else {
            _vids[j] = vids[j];
        }
    }

    return vids;
}

// Start a request for each video found
function rateVids(vids) {
    jsonURL[3] = Date.now().toString();

    for (var id in vids) {
        jsonURL[1] = id;
        getJson(jsonURL.join(""), handleJson);
    }
}

// Check for new video links every 2 seconds
setInterval(function() {
    rateVids(listVids($('a[href*="/watch?v="]', true)));
}, 2000);
