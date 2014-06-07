// ==UserScript==
// @name           Manager.co.th XL Style
// @namespace      http://diveintogreasemonkey.org/download
// @description    Make text in Manager.co.th more readable
// @version        3.1.20091226.06
// @include        http://manager.co.th/*
// @include        http://www.manager.co.th/*
// @exclude        *ViewBrowse*
// @exclude        *.asp
// @exclude        *.aspx
// @exclude        */default.html
// @exclude        */Lite/*
// @exclude        */Mobile/*
// @exclude        *VoteComment*
// @exclude        */preload*
// ==/UserScript==

// ********** Remove logo & banners
// ********** tableTag[0] to tableTag[4] locate at the header
// ********** tableTag[tableTag.length - 4] locates at the footer
function removeBanners(){
	var tableTag = document.getElementsByTagName("table");
	var iCount, maxCount;

	// Remove logo & banners
	switch (document.title){
		case "Manager Online":
			maxCount = 1; break;
		case "Daily News - Manager Online":
			maxCount = 4; break;
		default:
			maxCount = 3;
	}

	for (iCount = 0; iCount <= maxCount; iCount++) tableTag[iCount].innerHTML = " ";
	tableTag[eval(tableTag.length - 4)].innerHTML = " ";

	// Remove Ad badges
	if (document.title == "Manager Online"){
		document.getElementById("tblSectionMain").innerHTML = " ";
		document.getElementById("result300x250_1").src = " ";
		document.getElementById("Banner600x250").src = " ";
		document.getElementById("result300x250_2").src = " ";
	}

	return true;
}

removeBanners();



// ********** Apply Extra Large style
function applyStyle(extCSS){
	var css = "@import url('" + extCSS + "');";
	if (typeof GM_addStyle != "undefined"){
		GM_addStyle(css);
	}
	else if (typeof addStyle != "undefined"){
		addStyle(css);
	}
	else {
		var heads = document.getElementsByTagName("head");
		if (heads.length > 0){
			var node = document.createElement("style");
			node.type = "text/css";
			node.innerHTML = css;
			heads[0].appendChild(node);
		}
	}
	return true;
}

applyStyle("http://www.manager.co.th/css/css_XL.css");



// ********** Remove Side Headlines
function removeSideNews(){
	var tdTag = document.getElementsByTagName("td");
	var iCount;
	var removedCount = 0;
	
	if (document.title != "Manager Online"){
		for (iCount = 0; iCount < tdTag.length; iCount++){
			if (tdTag[iCount].width == 300){
				tdTag[iCount].innerHTML = " ";
				removedCount++;
			}
			if (removedCount == 2) break;
		}
	}
	return true;
}

removeSideNews();