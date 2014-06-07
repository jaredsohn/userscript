// ==UserScript==
// @name           HN Tagging Tool
// @namespace      http://www.twitter.com/taitems
// @include        http://news.ycombinator.com/*
// @require       http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

var showOptions = " | <a id='showOptionsLink' style='cursor:pointer;'>tagging</a>";
var tagTemplate = "<div class='tagInstance' style='-moz-border-radius:3px;margin:0px 0px 0px 5px;padding:2px 4px;font-weight:normal;display:inline-block;background:#a5a5a5;color:white;'>{tag}</div>";
var modalBg = "<div id='modalBg' style='display:none;position:fixed;top:0px;left:0px;width:100%;height:100%;background:black;opacity:0.8;'></div>";
var modalContent = "<div id='modalContent' style='display:none;position:fixed;top:0px;width:100%;padding-top:110px;'>";
	modalContent += "<div style='-moz-box-shadow:0px 2px 10px #000000;width:600px;background:#f6f6ef;padding:15px;margin:0px auto;'>";
	modalContent += "<h1 style='margin:0px;font-size:21px;color:rgba(0,0,0,0.8);'>HN Tagging Plugin</h1>";
	modalContent += "<p style='color:rgba(0,0,0,0.7);line-height:20px;'>The tagging plugin was developed to highlight articles that are relevant to you.<br/>Simply enter your interests below separated by a comma.</p>";
	modalContent += "<textarea id='tagInput' style='width:100%;'></textarea>";
	modalContent += "<div style='text-align:right;padding-top:8px;'>";
		modalContent += "<input type='button' id='saveTags' value='Save' style='font-size:8pt;font-weight:bold;margin-right:4px;font-family:Verdana;' />";
		modalContent += "<input type='button' id='cancelTags' value='Cancel' style='font-size:8pt;font-family:Verdana;' />";
	modalContent += "</div>";
	modalContent += "</div>";
	modalContent += "<div style='width:600px;margin:0px auto;text-align:center;padding:10px 0px;color:#FFF;opacity:0.3;font-size:10px;'>";
		modalContent += "Follow Tait Brown on <a href='http://www.twitter.com/taitems' target='_blank' style='color:#FFF !important;text-decoration:underline;'>Twitter</a>";
	modalContent += "</div>";
modalContent += "</div>";
var tags = [];

function loadModal() {
	tags = GM_getValue("tags","");
	$("#tagInput").attr("value",tags);
	$("#modalContent").animate({opacity:"show"},'normal');
	$("#modalBg").animate({opacity:"show"},'normal');
	$("#modalBg").click(function() {
		$("#modalContent").animate({opacity:"hide"},'normal');
		$("#modalBg").animate({opacity:"hide"},"normal");
	});
}

function closeModal(isSaving) {
	if (isSaving) {
		tags = $("#tagInput").val();
		GM_setValue("tags",tags);
		tagLinks();
	}
	$("#modalContent").animate({opacity:"hide"},'normal');
	$("#modalBg").animate({opacity:"hide"},"normal");
}

function tagLinks() {
	if (typeof tags == "string") {
		tags = tags.split(",");
	}
	$("div.tagInstance").remove();
	$("td.title a").each(function() {
		$(this).css("fontWeight","normal");
		for (var i=0; i < tags.length; i++) {
			if(this.innerHTML.toLowerCase().indexOf(tags[i].toLowerCase()) > -1) {
				var tagStr = tagTemplate.replace("{tag}",tags[i]);
				$(this).append(tagStr);
				$(this).css("fontWeight","bold");
			}
		}
	});
}

$(document).ready(function() {
	var isFirstRun = GM_getValue("firstRun","true");
	
	if(isFirstRun == "true") {
		tags = "Google,Apple,Microsoft";
		GM_setValue("tags",tags);
	} else {
		tags = GM_getValue("tags","");
	}
	
	GM_setValue("firstRun","false");
	
	if (tags != "") {
		tagLinks();
	}
	
	$(".pagetop:first").append(showOptions);
	$("body").append(modalBg).append(modalContent);
	$("#showOptionsLink").click(function() {
		loadModal();
	});
	
	$("#saveTags").click(function() {
		closeModal(true);
	});
	$("#cancelTags").click(function() {
		closeModal();
	});
	
	$("#tagInput").blur(function() {
		var stringCalc = this.value;
		if(stringCalc.length > 0) {
			stringCalc = stringCalc.replace(/\, /g,",");
			if(stringCalc.charAt(stringCalc.length-1) == ",") {
				stringCalc = stringCalc.substring(0, stringCalc.length-1);
			}
			this.value = stringCalc;
		}
	});
	
});