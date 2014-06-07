// ==UserScript==
// @name           Pandagon Reset
// @namespace      axisofevil.net
// @description    Resets Pandagon.
// @include        http://pandagon.net/*
// ==/UserScript==

// Set to false if you want it all.
var sfw = true;


// Change the page title.
if (window.location.href.indexOf("/site/") > -1) {
	document.getElementsByTagName("h2")[0].innerHTML = document.getElementsByTagName("h2")[0].childNodes[0].innerHTML;
	var newTitle = "Pandagon: " + document.getElementsByTagName("h2")[0].innerHTML;
	document.getElementsByTagName("title")[0].innerHTML = newTitle;
}


// CSS code from: http://userscripts.org/scripts/review/3775
var css = new Array();

function writeStyle(css) {
    var style = document.createElement('style');
    style.type = 'text/css';
    if (document.getElementsByTagName) {
        document.getElementsByTagName('head')[0].appendChild(style);
        if (style.sheet && style.sheet.insertRule) {
            for (var i = 0; i < css.length; i++) {
                style.sheet.insertRule(css[i], 0);
            }
        }
    }
}

function addStyle(style) {
    css[css.length] = style;
}

if (sfw) {
	addStyle("img { display: none; }");
}
// Hide pagination on individual posts.
if (window.location.href.indexOf("/site/") > -1) {
	addStyle(".paginate { display: none; }");
}
addStyle("body, #container { background: url(); background-color: #033; }");
addStyle("#blog { background: url(); background-color: #FFF; }");
addStyle("#container, #main, #blog { width: 782px; }");
addStyle("#content { width: 758px; }");
addStyle("blockquote { padding: 0 5px 10px 5px; border: 0px; background-color: #E7E7E7; }");
addStyle(".comment-body1, .comment-body2 { border: 1px dotted #9CF; padding-bottom: 10px; background-color: #FFF; margin-bottom: 20px; }");
addStyle(".comment-body1 p, .comment-body2 p { font-size: 6pt; }");
addStyle("#comment_form { border-top: 1px solid #000; }");
addStyle("h2, .title { padding-left: 13px; color: #444; font-family: 'Trebuchet MS', Verdana, Sans-Serif; font-size: 1.4em; font-weight: normal; letter-spacing: -1px; border: 0px; }");

// Writes CSS to the document
writeStyle(css);


// Get the login/out foo for later.
var allDivs = document.evaluate('//div[@class="sidemembers"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
	var loggingLink = document.createElement("span");
	loggingLink.innerHTML = allDivs.snapshotItem(i).nextSibling.nextSibling.innerHTML;
	loggingLink.setAttribute("style", "font-size: 8pt");
}
loggingLink.appendChild(document.createElement("br"));
loggingLink.appendChild(document.createElement("br"));
var theContent = document.getElementById("content").childNodes[1];
theContent.parentNode.insertBefore(loggingLink, theContent);


// If logged out, hide the comment form.
var tmp = document.getElementById("comment_form");
if (tmp) {
	if (loggingLink.childNodes[0].innerHTML == "Login") {
		// But still leave space to see that it's gone.
		tmp.childNodes[8].style.visibility = "hidden";
		tmp.childNodes[10].style.display = "none";
		tmp.childNodes[12].style.display = "none";
	}
}


// Remove certain items completely.
var elms = new Array("searchbar", "left", "right", "headnav", "features");
for (var x = 0; x < elms.length; x++) {
	var elm = document.getElementById(elms[x]);
	elm.parentNode.removeChild(elm);
}


// Changify the comments.
allComments = document.evaluate('//div[starts-with(@class, "comment-body")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < allComments.snapshotLength; i++) {
	thisComment = allComments.snapshotItem(i);
	allDivs = thisComment.getElementsByTagName("div");

	// If killfile isn't running.
	if (allDivs.length == 1) {
		var commentLine = allDivs[0];

		var tmp = thisComment.getElementsByTagName("a")[0];
		tmp.parentNode.insertBefore(commentLine, tmp);

	// And if it is.
	} else {
		var commentFoo = allDivs[1].childNodes;
		for (var x = 0; x < commentFoo.length; x++) {
			if (commentFoo[x].nodeName == "DIV") {
				if (commentFoo[x].getAttribute("class") == "comment-posted") {
					break;
				}
			} else if (commentFoo[x].nodeName != "#text") {
				commentFoo[x].parentNode.appendChild(commentFoo[x]);
			} else if (commentFoo[x - 1].nodeName == "BLOCKQUOTE") {
				commentFoo[x].parentNode.appendChild(commentFoo[x - 1]);
				x--;
			}
		}
		var commentLine = allDivs[2];
	}

	// Set the comment line info and style.
	commentLine.innerHTML = "<span style=\"font-size: 11pt; padding-top: 18px; font-weight: bold;\">" + commentLine.innerHTML.substr(9);
	var tmp = commentLine.innerHTML.split("&nbsp;on&nbsp;");
	commentLine.innerHTML = tmp[0] + "</span><br /><span style=\"font-size: 8pt;\">on " + tmp[1].substr(1, 5) + ' at ' + tmp[1].substr(22) + "</span>";
	commentLine.setAttribute("style", "text-align: left;");
}


// Add favicon.  From the Google Icon script elsewhere.
var head = document.getElementsByTagName('head')[0];
var vodka = document.createElement('link');
vodka.setAttribute('type', 'image/x-icon');
vodka.setAttribute('rel', 'shortcut icon');
vodka.setAttribute('href', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAgCAMAAACrZuH4AAAABGdBTUEAALGPC/xhBQAAAwBQTFRFAAAAAQEBAAACAgIAAwMCAAAEAQIEAwMGBQUFBAQGBgcEBgYHAAALAwMKBQUIBQQJBAUKBwcJCAgICQkJCAgLCgoLDAkKDQwMDAwNDQ0ODg4PBwgQDAsRDQwSDAoYEAwMFw8QEA8YEBAQERESEREWExMUFRUVFxcXEhEZGhgYGRkZGhoaHBwcHR0dHBweHh4eHx8fIBweICAgISEhIiIiIyMjJiMkJSUlJiYmJycnKCglKSkpKioqKysrLCwtLi0uJiQ5MC4vNSwsPTAvMTAwMTExMjIyMzMzNjEyNjQ1NjY2Nzc3NTQ6ODg4OTo6Ojo7Ojs+Ozw7Oj08PDw9Pz4+QDw9QT0+QD4/Rz4+QUFBQ0NDREFDR0JERUVFR0dHSUpJS0tLTEhJTU1NT09PREJSSEVWTEtTUExMUVFRU1NTUFJUVVVVVldWXFZWWlpaXl9aXFxcXl5eU1FhXl5jXVtuYGBgYmBhYGBiY2ZmZGRkZ2dnampqbGtvbGxsbm5uY2BxZWN0dGtrcXFxcnJzdnZ2eHh4enp6fHx8fX1+f39/bmuAcm+HdnOFg3l5iYB/gYGBg4ODhoaGioqJioyLj4+PkZGRkpKTlZWVmJiYmZmZm5ubn5+foZGRoqKipaWlp6enqqqqq6usrKysra2tr6+vsLCwsLCys7OztLS0tbW2tbe3trW4uLi4urq6vb28vr6+v7+/wbW2yLy7wcHBxMTCxMTExcXFxsbGx8fIxsfLysrKy8vMzs3N0NDQ0tLS09PU0tLV1tbW2NjZ29vb3Nzc3d3d3t7e3djy3+Dj4tz55N/94eHh4+Pj5ubj6Ofp6Ojn6urq6+vr7ezs7u7u6OP/7ej/7vDw8Oz/8PDx8fHy8/Pz9vbz9fT09vb29/f39/f5+fn3+/z2+Pj4+fn5+vr4+/v6+vr7+/v9/Pz4/Pz8/v3//f78/v79////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAF5r8BQAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAAAAYdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My4zNqnn4iUAAAMrSURBVDhPhZP3V9NQHMWfWAWsohZqadzUugBXRUWxtYhWcWKqMUFrFPeoxQ24AcVdESsWpSou3HvhFvcCJ1aqCCYazfdvqEkKHM7Rc3y/5J3z/Zz7Xu59F3n/t9A/gb5hUQNHGXTSzEfYV+XVIV0G8yiKIqk4QzVREK+LiIqM2VPLDBxCkaSZIBJVyySNAwF6arKF0qv31yC9cRIfTyROIFqIJyBvuIkiCULQHOD1Wnusn5Y0j1QmJBLEpEk9+/RxiERfCidwgiTwiNkZdquzhIHSjNHG4bHD2sWeX5ctErigYMbN5JhwJ4iLZXi46dxgbrv9wr7B0inRFuFegoZpozA+nZzrBs8XYfdm6oJtE33/QmCmESQRb8ji4PVSDULm24wA/ILyLrNq/LDERytlulQOzhmRHNMiAi5mOq5/hXtTnLWOHYrMecFBbj0FpsIwmf5UJ4SazX0CJ8btqvHUWgQ8ZCO5Wq0J1QYbaIRQSzT2A8CK+T7X0w5DORQpFBimDfVrpeyv7rxmSZv2/i7gX+ESsToZKplivSwMUwdrF3eIyGs4/ePjQS3Rcqj6lCkRJHCVsAlhKpWqa+HdIPt9tPnpsy2NG6wEPtskEhmOnQ+gXC9TKzsGDEjXrIeqmTPev9vaxO8kwFmjSCT3i3rLMTRSyFWCG1n8z993Rq5d1DqQ+sTxZTaRyMFcwMIxJFMgFJ0Hnm8AR5uiRvUXMt9//Noh3SNuP89yX7J1Xanc5w+ZipLdVm1gqCJAdgmKxgieIe8hTQ64K1l4UcxDWiaUkAgFhYTIZdgd9jVulzR29zrLeqrKhTByDR7mZXckDwoKUSLtDZ71WI9Ljtnyxch5/s3wg/CZOROJ/PwbIvoc/ZCHK7RE5MW5GTHPy0N5tqICiunmqFs6POp3FcC+2vfWY9ycoAEuvIz5WfEb+GsHyyAdmY6cSOte3YZOxwE4gTDOBiFCXpArtCWlpNjmpNZk6wjOuCU+QCeys8KnND+JKqjthq9Rx+b0Imjbzsl7NQlTLPRo3FWnX7Wt3OvYYKQLLXVG1du6vd2RTP4NVPfWN7CG5/+HSNX/A/D+AfRWtK642n+tAAAAAElFTkSuQmCC');
head.appendChild(vodka);


// Set both the Posted By and the Comments lines.
if (window.location.href.indexOf("/site/") > -1) {
	// Get the posted line.
	var postedLine = document.evaluate('//div[@class="posted"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var tmpPost = postedLine.snapshotItem(0).innerHTML.split("</a>");

	var newPosted = document.createElement("div");
	newPosted.style.fontSize = "8pt";
	newPosted.style.color = "#666";
	newPosted.style.paddingLeft = "28px";
	newPosted.innerHTML = tmpPost[0] + "</a>" + tmpPost[1].substr(1, 12);

	var postedCats = document.evaluate('//div[@class="category"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	// Lord knows, there'll be that one day where no category was selected.
	if (postedCats.snapshotLength > 0) {
		var tmpCats = postedCats.snapshotItem(0).innerHTML;
		tmpCats = tmpCats.replace(/\n. <a/g, "<a");
		tmpCats = tmpCats.split("</a>");
		newPosted.innerHTML += " in " + tmpCats[0] + "</a>";
		if (tmpCats.length > 1) {
			for (var z = 1; z < tmpCats.length - 1; z++) {
				newPosted.innerHTML += ", " + tmpCats[z] + "</a>";
			}
		}
		postedCats.snapshotItem(0).parentNode.removeChild(postedCats.snapshotItem(0));
	}
	newPosted.innerHTML += ".";
	var foo = document.getElementsByTagName("h2")[0].nextSibling;
	foo.parentNode.insertBefore(newPosted, foo);

	// Comments line now.
	var newComments = document.createElement("h2");
	newComments.innerHTML = tmpPost[1].substr(18);
	newComments.innerHTML = newComments.innerHTML.split(")")[0];
	newComments.innerHTML += " Responses to \"" + document.getElementsByTagName("h2")[0].innerHTML + "\"";
	newComments.style.padding = "15px 0";

	postedLine.snapshotItem(0).parentNode.removeChild(postedLine.snapshotItem(0));
	allComments.snapshotItem(0).parentNode.insertBefore(newComments, allComments.snapshotItem(0));
}
