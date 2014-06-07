// ==UserScript==
// @name        FIMFiction - Meta Checker (A/N, IMG, URL)
// @namespace   Selbi
// @include     http*://fimfiction.net/story/*
// @include     http*://www.fimfiction.net/story/*
// @version     1.0
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==

var URLx = (document.URL).slice(0,(document.URL).indexOf("/",32));
var readstax = [];
var chapterstotal = 0;
var words, int, intx, chaptersource, churl, chaptercontent, readstatus;
var alluls = document.getElementsByTagName('ul');
var yAN = '<span style="color:black"><b>A/N</b></span>';
var nAN = '<span style="font-size:75%"><i><s>A/N</s></i></span>';
var yIMG = '<span style="color:black"><b>IMG</b></span>';
var nIMG = '<span style="font-size:75%"><i><s>IMG</s></i></span>';
var yURL = '<span style="color:black"><b>URL</b></span>';
var nURL = '<span style="font-size:75%"><i><s>URL</s></i></span>';
var progImage = '<img src="http://www.fimfiction-static.net/images/icons/spinner_dark_16.gif">';
	var totalAN=0, totalIMG=0, totalURL=0;
var AllMetaButtonInside = 'Meta: <a href="#" onclick="getAllMetaInfo();return false;">All</a> / <a href="#" onclick="getAllMetaInfoUnread();return false;">Unread</a>';
var AllMetaButton = '<hr><span style="font-size:80%;font-style:italic;text-align:right;font-weight:bold;" id="allMeta">' + AllMetaButtonInside + '</span>';

unsafeWindow.getMetaInfo = function(btnID, chapterID) {
	$("#info_" + chapterID).html(progImage);

	var AN = nAN, IMG = nIMG, URL = nURL;
	$("#" + btnID).before('<div id="result' + btnID + '" style="display:none"></div>');
	$("#result" + btnID).load(URLx + "/" + chapterID + " .chapter", function(){
		if ($("#result" + btnID + " .chapter_content .authors-note").length != 0) {
			//AN = yAN;
			AN = '<span style="color:black;" onmouseover="$(\'div\', this).show()" onmouseout="$(\'div\', this).hide()"><b>A/N</b><div style="z-index:10;display:none;background:#F8F8F8;border:5px solid #DFDFDF;width:650px;white-space:pre-line;position:absolute;padding-left:10px;">' + $("#result" + btnID + " .chapter_content .authors-note").html() + '</div></span>';
			totalAN++;
		}
		if ($("#result" + btnID + " .chapter_content #chapter_container img").length != 0) {
			IMG = '<acronym title="' + $("#result" + btnID + " #chapter_container img").length + '">' + yIMG + '</acronym>';
			totalIMG++;
		}
		if ($("#result" + btnID + " .chapter_content #chapter_container a").length != 0) {
			URL = '<acronym title="' + $("#result" + btnID + " #chapter_container a").length + '">' + yURL + '</acronym>';
			totalURL++;
		}

		var regx = /[0-9,]+/;
		var viewCount = '<span style="font-size:80%">(' + regx.exec($("#result" + btnID + " .chapter_footer").html().toString()) + ')</i></span>';
		$("#" + btnID).replaceWith('<span id="' + btnID + '">' + viewCount + "&nbsp;&nbsp;" + AN + "&nbsp;&nbsp;" + IMG + "&nbsp;&nbsp;" + URL + '</span>');

		//$("#" + btnID).hide();
		$("#result" + btnID).remove();
		
		var regex = /[ ]+\d+[ ]+/g;
		var matches = $(".chapters").html().toString().match(regex);
		if (readstax[chapterID-1] == false) {
			unsafeWindow.ToggleRead(parseInt(matches[chapterID-1]));
		}
		//$("#allMeta").empty().html(AllMetaButtonInside + '&nbsp;&nbsp;&nbsp;&nbsp;<span style="font-size:90%;">A/N</span> <b>' + totalAN + '</b>&nbsp;&nbsp;<span style="font-size:90%;">IMG</span> <b>' + totalIMG + '</b>&nbsp;&nbsp;<span style="font-size:90%;">URL</span> <b>' + totalURL + '</b>');
	});
}

unsafeWindow.getAllMetaInfo = function() {
	for (int=1;int<=chapterstotal;int++) {
		unsafeWindow.getMetaInfo("info_" + int, int);
	}
}
unsafeWindow.getAllMetaInfoUnread = function() {
	for (int=1;int<=chapterstotal;int++) {
		if (readstax[int-1] == false) {
			unsafeWindow.getMetaInfo("info_" + int, int);
		}
	}
}

for (var int=0; int<alluls.length; int++) {
	if (alluls[int].className == "chapters") {
	//	storyID[sIDp] = $(".chapters .chapter_link").attr('href').match(/\d+/)[0];
		churl = document.getElementsByClassName('story')[0].value;
		readstatus = alluls[int].getElementsByTagName('img');
		words = alluls[int].getElementsByClassName('word_count');
		for (intx=0; intx<(words.length-1);intx++) {
			words[intx].innerHTML = '<a href="#" id="info_' + (intx+1) + '" onclick="getMetaInfo(\'info_' + (intx+1) + '\', \'' + (intx+1) + '\');return false;">m</a>&nbsp;&nbsp;' + words[intx].innerHTML;
		}
		//$(AllMetaButton).insertBefore("." + alluls[int].className);
		//$(".description").append(AllMetaButton);
	}
}

$(".chapter-read-icon").each(function() {
	if ($(this).hasClass("chapter-read")) {
		readstax[chapterstotal] = true;
		chapterstotal++;
	} else {
		readstax[chapterstotal] = false;
		chapterstotal++;
	}
});