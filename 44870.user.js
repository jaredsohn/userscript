// ==UserScript==
// @name           Az_en_index_forumom
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.1/jquery-ui.min.js
// @resource       jqueryuicss http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.1/themes/ui-lightness/jquery-ui.css
// @include        http://forum.index.hu/*
// ==/UserScript==

var igen = true;

// ------------- Változók:

var elrendezesMegvaltoztatasa = igen;
var reklamMentes = igen;
var balMenu = igen;

// ------------- Innentől ne változtass!

var passBoxClass = ".passbox";
var rightBoxId = "#rightcol";
var leftBoxId = "#leftcol";
var rightDataId = "#rightcoltd";
var leftDataId = "#leftcoltd";
var newRightBoxId = "rightbox";
var headerId = "#site_header";

function init() {
	// insert jquery-ui css
	var jquicss = GM_getResourceText("jqueryuicss");
	var absImgPath = "http://jquery-ui.googlecode.com/svn/tags/1.7/themes/ui-lightness/images/";
	var r = new RegExp("images/", "g");
	jquicss = jquicss.replace(r, absImgPath);
	$("head").append('<style>' + jquicss + '</style>');
} // end function init

function moveLoginBox() {
	if (!reklamMentes)
		delAdverts();
	$('<div id="' + newRightBoxId + '"></div>').appendTo(rightDataId);
	newRightBoxId = '#' + newRightBoxId;
	$(newRightBoxId).append($(passBoxClass));
	$(newRightBoxId).append($(leftBoxId));
} // end function moveLoginBox

function delAdverts() {
	$(headerId).remove();
	$(rightBoxId).remove();
} // end function

function createLeftAccordion() {
	if (!moveLoginBox)
		moveLoginBox();
	$('<div id="accordion">\n\
<div><a href="#">Első menü</a></div>\n\
<div><p>Szöveg</p></div>\n\
<div><a href="#">Második menü</a></div>\n\
<div><p>Másvalami...</p></div>\n\
</div>').appendTo(leftDataId);
	$("#accordion").accordion();
} // end function

$(function() {
	init();
	if (reklamMentes) {
		delAdverts();
	} // end if
	if (elrendezesMegvaltoztatasa) {
		moveLoginBox();
	} // end if
	if (balMenu) {
		createLeftAccordion();
	} // end if
});
