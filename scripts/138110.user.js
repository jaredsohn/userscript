// ==UserScript==
// @name			HJID
// @description		HANDJOB Identifier. Replaces the torrent icons (☐/☑/✿) with HANDJOB specific ones. Icons lovingly created by dwagonfwy.
// @include			https://tls.passthepopcorn.me/*
// @include			http://passthepopcorn.me/*
// @copyright		DevilsAdv0cate
// @version			1.0.0
// @license			GNU GPL v3 <http://www.gnu.org/copyleft/gpl.html>
// ==/UserScript==

// Configuration
var enabled = true; // Turns the script on or off
var editWiki = true; // Modify this wiki page? wiki.php?action=article&id=26
//

// Global regular expression variables
var findFilesRegExp = /<div id="files_(\d+)"[\w"= ]+?>[\s\S]+?<\/tr><tr><td>([\s\S]+?)<\/td><td>[\s\S]+?<span id="submanager_\d+/ig;
var findIdRegExp = /\?id=(\d+)/i;
var findImageStuffRegExp = "<a href=\"torrents\\.php\\?id=@@@LOLID@@@&amp;torrentid=@@@LOLTID@@@\" title=\"Permalink\">PL</a>\\s+]</span>\\s+<a href=\"wiki\\.php\\?action=article&amp;id=26\">(<img style=\"width: 12px; height: 12px\" (?:height=\"12\" width=\"12\" )?src=\"https?://static\\.passthepopcorn\\.me/static/common/(x|check|quality)\\.(?:png|gif)\" alt=\"[\\u2610\\u2611\\u273F]\" title=\"(?:Torrent has not yet been approved by staff|Torrent has been approved by staff|High quality torrent)\"(?: height=\"12\" width=\"12\")?>)</a>";
var replaceWikiInternalRegExp = /<\/blockquote><br>\s+?<\/div>/;

// Return all pattern matches with captured groups
RegExp.prototype.execAll = function(string) {
    var match = null;
    var matches = new Array();
    while (match = this.exec(string)) {
        var matchArray = [];
        for (i in match) {
            if (parseInt(i) == i) {
                matchArray.push(match[i]);
            }
        }
        matches.push(matchArray);
    }
    return matches;
}

// Where it all begins
if(enabled) {
	delegateWork();
}

// Hand out the work to the respective functions
function delegateWork() {
	switch(window.location.pathname) {
		case "/torrents.php":
			if(window.location.search.indexOf("?id=") != -1) {
				doWorkOnTorrentGroup();
				return;
			}
			break;
		case "/wiki.php":
			if(editWiki) {
				doWorkOnWiki();
			}
			break;
	}
}

// Handles icons on torrent group pages
function doWorkOnTorrentGroup() {
	// If we store everything we take apart, we can paste it back together!
	// Crude but effective!
	var body = document.getElementsByTagName("body")[0].innerHTML;
	var bodySplit1 = body.split("<div class=\"main_column\">");
	var bodySplit2 = bodySplit1[1].split("<div class=\"head\"><strong>Synopsis</strong></div>");
	var match = findFilesRegExp.execAll(bodySplit2[0]);
	if(match == null) {
		alert("HJID: findFilesRegExp failed...");
		return false;
	}
	// Loop over every torrent on the page
	for(var i in match) {
		var tid = match[i][1]; // Lazy
		var file = match[i][2]; // Lazy x2
		if(file.indexOf("-HANDJOB") == -1) {
			// Not a HANDJOB
			continue;
		}
		// We have a HANDJOB on our... hands.
		var id = findIdRegExp.exec(window.location.search)[1]; // Gets group ID from query string
		var match2 = new RegExp(findImageStuffRegExp.replace("@@@LOLID@@@", id).replace("@@@LOLTID@@@", tid), "i").exec(bodySplit2[0]);
		if(match2 == null) {
			alert("HJID: Failed to find torrent header...");
			return false;
		}
		// Replace the modified HTML and paste the spliced HTML back together.
		var step1 = bodySplit2[0].replace(match2[0], match2[0].replace(match2[1], iconHtml(match2[2])));
		var step2 = step1 + "<div class=\"head\"><strong>Synopsis</strong></div>" + bodySplit2[1];
		var step3 = bodySplit1[0] + "<div class=\"main_column\">" + step2;
		// Introduce our new and improved body element into the page.
		document.getElementsByTagName("body")[0].innerHTML = step3;
	}
}

// Convenience function to generate the required HTML for a certain type of upload
function iconHtml(type) {
	var src = "";
	var title = "";
	var alt = "";
	// Substitute values for the status of the torrent 
	switch(type) {
		case "x":
			src = "http://ptpimg.me/471yul.png";
			title = "Unchecked HANDJOB";
			alt = "&#9744;";
			break;
		case "check":
			src = "http://ptpimg.me/6wb6f8.png";
			title = "Checked HANDJOB";
			alt = "&#9745;";
			break;
		case "quality":
			src = "http://ptpimg.me/dd0z5d.png";
			title = "High quality HANDJOB";
			alt = "&#10047;";
			break;
	}
	return "<img src=\""+src+"\" alt=\""+alt+"\" title=\""+title+"\">";
}

// Handles any modifications to the wiki
function doWorkOnWiki() {
	// There should really be more IDs where there are classes...
	var html = document.getElementsByClassName("main_column")[0].innerHTML;
	switch(window.location.search) {
		case "?action=article&id=26":
			html = html.replace("- The Golden Popcorn", "- "+iconHtml("quality")+" - The Golden Popcorn");
			html = html.replace("- Means that", "- "+iconHtml("check")+"- Means that");
			html = html.replace("- Indicates that", "- "+iconHtml("x")+" - Indicates that");
			document.getElementsByClassName("main_column")[0].innerHTML = html;
			break;
		case "?action=article&id=161":
			html = html.replace(replaceWikiInternalRegExp, "</blockquote>"+
				"HANDJOB encodes can be identified using these icons: "+
				iconHtml("x")+' '+iconHtml("check")+' '+iconHtml("quality")+"</div>");
			document.getElementsByClassName("main_column")[0].innerHTML = html;
			break;
	}
}