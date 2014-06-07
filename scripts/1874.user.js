// ==UserScript==
// @name          Userscripts.org Favorites
// @author	  ankut
// @include       http://userscripts.org/*
// @include       http://*.userscripts.org/*
// @description	  Allows users to store and view their favorite scripts on userscripts.org
// ==/UserScript==

//******************************************************************
// Version History
// ---------------
//
// Version 0.1 - Initial release
// Version 0.2 - Fixed the multi-add bug pointed out by Wiser. 
// Version 0.3 - Added import/export feature
//******************************************************************

//GM_setValue("favorites", "");

var nav = document.evaluate("//ul[@id='menu']/li[5]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if (nav.snapshotLength == 0) return;

var fav = document.createElement("LI");
fav.innerHTML = "<a href=# onclick='return false;' id='favorite_link'>Favorites</a>";
fav.addEventListener(
	"click", 
	function(event) { 
		var content = document.getElementById("content");
		content.innerHTML = "<h2>Favorite Scripts</h2><p>Here are the scripts you've added to your favorites.</p>";
		var favorites = GM_getValue("favorites");

		var out = "";
		if (favorites != null && favorites.length > 0) {
			var list = favorites.split("|");
			var item;

			out = "<table cellspacing=0 id='scriptList' width='100%'>";
			for (i = 0; i < list.length; i++) {
				item = list[i].split("**");
				out += "<tr><td class='links'><div class='name'>" + 
					"<img style='cursor: pointer;' id='remove_me' src=data:image/gif,GIF89a%17%00%0F%00%B3%0F%00R%84%BC%CB%DA%EB%F5%F8%FB%E0%E9%F3%D7%E3%F0j%95%C6%B1%C7%E1K%7F%BA%9B%B8%D8%81%A5%CF%E9%EF%F7%5C%8B%C1%F0%F4%F9%FF%FF%FFCy%B7%FF%FF%FF!%F9%04%01%00%00%0F%00%2C%00%00%00%00%17%00%0F%00%00%04~%F0%C9%F9%98)%C7%B9S%0C%A3%E0%14%2CZY.AH%05%80%96%14%25%40%02%A9%CA%C0N%D20%E42%0C%AD%C2'dp5%8E%8A%04%E3H%C8%18T%09%CD%81p%AC%22I%09%15I%03%A0Z%81%9A%85%CA%E4%40X%1B%5B%8D%B6d87%C0%0Eq(Z%B6.%99.U%D1%01%18%1C%11%0B%0A%0D%028O!%0Ct%81%89%038J*%0F%23dd(%8F%12%018%92%055%95%15%17%19%1B%1DC%14%11%00%3B>" + 
        				"<a class='view-source' href='/scripts/source/" + item[1] + ".user.js' title='install script'>" + 
					"<img alt='Source' border='0' src='/images/source.png' /></a> " + 
					"<a href='/scripts/show/" + item[1] + "'>" + item[0] + "</a>" + 
					"</div></td></tr>";		
			}
			out += "</table>";
		} else {
			out += "No scripts added yet!";
		}
		out += "<p><b><a href='javascript:show_newcomment()'>click to export or import favorites...</a></b><br />";
		out += "<div id='new_comment' style='display:none;'>";
		out += "The text area below contains your favorites (if any) in a delimitered format. You can copy this text ";
		out += "and store it elsewhere (text file, email, etc.) and then paste it back into the box below, at a later ";
		out += "time to import your favorites into the script for a new browser installation or script version.<p>";
		out += "<textarea cols='79' id='favorites' name='favorites' rows='4'>" + favorites + "</textarea>";
		out += "<p align='right'><input name='commit' type='button' style='border: 1px solid rgb(195,195,195);' value='Import Favorites' />";
		out += "</div>";
		content.innerHTML += out;

		var commit = document.evaluate("//input[@name='commit']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		commit.snapshotItem(0).addEventListener(
			"click",
			function(event) {
				var favorites = document.getElementById("favorites").value;
				if (!favorites.match(/^(([^|]+\*\*[0-9]+)(\|[^|]+\*\*[0-9]+)*)$/g)) {
					alert("Invalid favorites string.");
				} else {
					GM_setValue("favorites", favorites);
					alert("Successfully imported favorites!");

					// refresh the favorites view
					var evt = document.createEvent("MouseEvents");
					evt.initMouseEvent("click", false, false, null, 0, 0, 0, 0, 0, false, false, false, false, 1, document.getElementById("favorite_link"));
					document.getElementById("favorite_link").dispatchEvent(evt);
				}
			}, true);

		var remove = document.evaluate("//img[@id='remove_me']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if (remove.snapshotLength > 0) { 
			for (i = 0; i < remove.snapshotLength; i++) { 
				remove.snapshotItem(i).addEventListener(
					"click",
					function(event) {
						var url = event.target.nextSibling.href.replace(/^.*\/source\/([0-9]+).*/, "$1");

						var favorites = GM_getValue("favorites");
						var list = favorites.split("|");
						favorites = [];
						for (i = 0; i < list.length; i++) { 
							if (list[i].indexOf("**" + url) < 0) favorites.push(list[i]);
						}
						favorites = favorites.join("|");

						GM_setValue("favorites", favorites);
						document.getElementById("favorites").value = favorites;

						event.target.parentNode.parentNode.parentNode.parentNode.removeChild(event.target.parentNode.parentNode.parentNode);
					}, false);
			}
		}
	}, true);

nav.snapshotItem(0).parentNode.insertBefore(fav, nav.snapshotItem(0));

if (unescape(document.location.href).match(/scripts\/show\/[0-9]+/i)) { 
	var link = document.evaluate("//div[@id='content']/div[@id='name']/a[1]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var script = link.snapshotItem(0);
	
	var name = script.innerHTML;
	var url = document.location.href.replace(/^.*\/show\/([0-9]+).*/, "$1");

	var store = name + "**" + url;
	var add = document.createElement("img");
	add.align = "left";
	add.style.paddingRight = "3px";
	add.src = "data:image/jpeg,%FF%D8%FF%E0%00%10JFIF%00%01%01%00%00%01%00%01%00%00%FF%DB%00C%00%08%06%06%07%06%05%08%07%07%07%09%09%08%0A%0C%14%0D%0C%0B%0B%0C%19%12%13%0F%14%1D%1A%1F%1E%1D%1A%1C%1C%20%24.'%20%22%2C%23%1C%1C(7)%2C01444%1F'9%3D82%3C.342%FF%DB%00C%01%09%09%09%0C%0B%0C%18%0D%0D%182!%1C!22222222222222222222222222222222222222222222222222%FF%C0%00%11%08%00%19%00%19%03%01%22%00%02%11%01%03%11%01%FF%C4%00%1B%00%00%02%01%05%00%00%00%00%00%00%00%00%00%00%00%00%06%07%00%02%03%04%05%08%FF%C4%00-%10%00%00%05%03%02%03%06%07%00%00%00%00%00%00%00%00%01%02%03%04%11%00%05%12%06!%141A%13%15Qaqr245BRS%91%FF%C4%00%16%01%01%01%01%00%00%00%00%00%00%00%00%00%00%00%00%00%04%02%05%FF%C4%00%20%11%00%02%01%03%04%03%00%00%00%00%00%00%00%00%00%00%01%02%03%00%111%04%05%12A%13!%A1%FF%DA%00%0C%03%01%00%02%11%03%11%00%3F%00e_5P*%FD%C5%B9%9B%A1A6%E6%C1e%D3%8C%8Cn%A5(%8F(%EA%3E%3E%95%8A%AD%B5%8A6dn%C0%BB%B02%A7%808%3BS)%DFy%CB%CA%81%AC%0E%AC%8D%9F%DC%89%A9x%AE%D0U%1C%7B)%F8%A4r%98%EB%CA%98%8F%1D%E9%82%E8fk%2F%C4%F7%40%A8%00%94e%9ERn%7D%7CkjX%BC%05Q%01%C8%C0%CF%AF%B5%8D%14%BEp%CE%E4w%9E%BD%FC%A9c%D5%98%3FB%DA%FD%C9V%22%D2T%1C%1A%00%D9%07%DAh%D8v%EB%B5%1AR%13R%3D%B0%AC%E9%88%E9%EE%2C%04%86%C9ATF%26B%22w%9Et%7F%DF%17%1F%11%FEP%B5%D0%88%CA%B0%16%BFT%CD%0C%C6%40%CAM%ED%DDj%F5%FE%83%5D%C3%C3%DD%ED%08%E6*I%9C%20%03%B8%9B%F2%2F%AFP%A0%F7%97%F7%8B%E9%26%BAqF%02N%19%5C%FBQ%99%1Ep%11%1Bs%1A%E8%0A%09%BA%FDP%7D%D5q%EE.%AA%15%80kb%A2M%B9%19%8B)%2B%7C%D0F%8C%D1.%EE%AF%D3r%ED!M%9Ab%06%110F%5EANN%EFk%FAKU%B4%F9D%BD%A1W%A8%B3%CE%F3%BF7%CD*%08%12%04%E0%98%AF%FF%D9";

	var favorites = GM_getValue("favorites");
	if (favorites != null && favorites.indexOf("**" + url) != -1) { 
		add.style.opacity = .3;
	} else {
		add.style.cursor = "pointer";
		add.addEventListener(
			"click",
			function(event) { 
				var button = event.target;
				if (button.style.opacity != .3) { 
					var favorites = GM_getValue("favorites");
					GM_setValue("favorites", (favorites ? store + "|" + favorites : store));
					button.style.opacity = .3;
					button.style.cursor = "auto";
				}
			}, true);
	}
	script.parentNode.insertBefore(add, script);
}


