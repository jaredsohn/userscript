// ==UserScript==
// @name           BvS Jutsu Compressor
// @namespace      http://userscripts.org/users/dtkarlsson
// @include        http://www.animecubed.com/billy/bvs/missions/*
// @include        http://animecubed.com/billy/bvs/missions/*
// @require        http://userscripts.org/scripts/source/57756.user.js
// @description    Reduces size of jutsu that can't be used on Billy vs SNAKEMAN missions.
// @licence        MIT; http://www.opensource.org/licenses/mit-license.php
// @copyright      2009, Daniel Karlsson
// @version        1.0.2
// ==/UserScript==

try {
	ScriptUpdater.check(53402, "1.0.2");
}
catch (e) {}

// Grumble...
function jutsuImage()
{
	var img = document.createElement("img");
	img.src = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%1E%00%00%00%0F%08%00%00%00%00%D6%D1%20%40%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%FCIDAT%18%D3m%91!V%04A%10C%3F%BC%16iW-G%8E%9Cu%8B%5C%C7%1E%01n%C098%13%92%23p%05%E4%C8%C1u%B9%8AD%EC%E2%88%AA%F7*%95%97T%20%10%FFB%88%87x%97%3C%0A%DFX%96%01%F5%22%7D%E8%A3%A5%F8%C1%B3%83%04x'%AB%97%95%DBV%7Do%1A3D%60%D1)XeK%B6%9FO%9F%07%CD%93QF%82%C2f%3F4%26k%7F%5B%88%2F%9APY%18%00%C3%F92s%9D%EB%2BY%0Bj%B6e9%E3n63%E4%CB%05%81p%03A%12%B7s%AC%DC%97%EB%86%5DD%D0%FEdu%DF%1F%DE%AEc%02%BD%184%C2%16%D6%81%B1a%7D%3A%0Fz%E5R%5E6%1A%DE%1DY%0BhHC%CB%AA%DD!%95ul4%D9%F1rb%DE%3F%DBgM%85-%F8%91%E2%D1%B1%E9%FB%40%60%DB.%D9t%D28%E4l%91%1A%7B%9E7%7C3h%F0~d%8D%B3%1D%82%E0%96%F1%5E%D3%DF%2C%40%FC%02%AD%04%8E%06a%E6%94_%00%00%00%00IEND%AEB%60%82";
	img.style.height = "15px";
	img.style.width = "30px;"
	return img;
}

function getChakra(node)
{
	var c = node.getElementsByTagName("font");
	for (var i in c) {
		var m = /(\d+) C/.exec(c[i].innerHTML);
		if (m)
			return parseInt(m[1]);
	}
}

function getDescription(node)
{
	var n2 = node.getElementsByTagName("font")[0];
	if (!n2)
		return null;
	return n2.textContent.replace(/- \d+ C/, "").replace(/\(Item.*\)/, "<br/>$&");
}

var rowsnap = document.evaluate("//form[@name='attempt']/table/tbody/tr", document, null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,  null);

for (var i = 0; i < rowsnap.snapshotLength; i++) {
	var node = rowsnap.snapshotItem(i);
	
	var jutsuname = "";
	var disabled = null;
	var jutsuline = node.getElementsByTagName("td");
	if (jutsuline.length == 3) {
		if (jutsuline[2].firstChild)
			jutsuname = jutsuline[2].firstChild.firstChild.nodeValue;
		if (jutsuline[0].firstChild && jutsuline[0].firstChild.getAttribute)
			disabled = jutsuline[0].firstChild.getAttribute("disabled");
	}
	if (jutsuname != "" && disabled != null) {
		var chakra = getChakra(jutsuline[2]);
		var description = getDescription(jutsuline[2]);

		node.innerHTML = "";
		var td = document.createElement("td")
		node.appendChild(td);
		td = document.createElement("td");
		td.appendChild(jutsuImage());
		node.appendChild(td);
		td = document.createElement("td");
		node.appendChild(td);
		var span = document.createElement("span");
		span.setAttribute("style", "color: grey;");
		if (chakra > 0)
			description += "<br/>" + chakra + " Chakra";
		span.setAttribute("title", "header=[" + jutsuname + "] body=[" + description + "]");
		td.appendChild(span);
		span.innerHTML = jutsuname + " - ";
		span = document.createElement("span")
		span.setAttribute("style", "color: #0b6f4a;");
		span.innerHTML = chakra + " C";
		td.appendChild(span);
	}
}
