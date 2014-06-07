/*

Title:
	Del.icio.us 2.0

Description:
	This is a Greasemonkey user script for Firefox and Opera browsers.

	This script changes the appearance of del.icio.us and is based largely 
	on the script "del.icio.us.ness" by Kreg Wallace (http://userscripts.org/scripts/show/747)
Author:
	Theron Parlin, mail: tparlin at geezeo dot com

Last Updated:
	March 13, 2007

*/

// ==UserScript==
// @name		Del.icio.us 2.0
// @description		a skin for del.icio.us
// @include		http://del.icio.us/*
// ==/UserScript==

(function() {

// gives rows alternating colors based on div.className
function setAltRowColor(divClass, color1, color2) {
	var divTags = document.getElementsByTagName("div");
	var rowNumber = 1;
	for (i=0; i<divTags.length; i++) { 
		if (divTags[i].className == divClass) {
			var currentRow = divTags[i];
			rowNumber++;
			if (rowNumber % 2) {
				currentRow.style.backgroundColor = color1;
			}
			else {
				currentRow.style.backgroundColor = color2;
			}
		}
	}
}

// adds new stylesheet to page header
function insertCSS(css) {
	var head = document.getElementsByTagName("head")[0];
	var styleTag = document.createElement("style");
	styleTag.setAttribute("type", 'text/css');
	styleTag.innerHTML = css;
	head.appendChild(styleTag);
}

// handles cases where div classnames are used inconsistently on various pages
// and takes care of stuff I couldn't figure out how to access with CSS
function runHacksForSpecifcPages() {
	var divTags = document.getElementsByTagName("div");
	var url = document.location.href;

	// pages that should not have alternating row colors
	var noRowColors = new Array;
	noRowColors[0] = "del.icio.us/doc/about";
	noRowColors[1] = "del.icio.us/settings";
	noRowColors[2] = "del.icio.us/new";

	// home page uses both "post" and "delPost" classes
	// "delPost" rows on this page should not alternate colors
	if (url == "http://del.icio.us/") {
		setAltRowColor('post', '#edf3ff', '#ffffff');
	}
	// color the rows for pages not specified in noRowColors[]
	else {
		var dontColorMe = 0;
		for (i=0; i<noRowColors.length; i++) {
			if (url.indexOf(noRowColors[i]) != -1) {
				dontColorMe++;
				break;
			}
		}
		if (dontColorMe == 0) {
			setAltRowColor('post', '#edf3ff', '#ffffff');
			setAltRowColor('delPost', '#edf3ff', '#ffffff');
		}
	}

	// fixes probelem of text falling behind the banner on pages that don't have delPage
	// by switching banner style from fixed to relative
	if (url == "http://del.icio.us/tag/" || url == "http://del.icio.us/logout" || url == "http://del.icio.us/login" || url == "http://del.icio.us/register") {
		for (i=0; i<divTags.length; i++) {
			if (divTags[i].className == "banner") {
				divTags[i].style.position = "relative";
			}
		}
	}

	// changes styles on new bookmark page
	if(url.indexOf("del.icio.us/new") != -1) {
		for (i=0; i<divTags.length; i++) { 
			if (divTags[i].className == "delPost") {
				divTags[i].style.marginLeft = "0px";
				divTags[i].style.marginRight = "10%";
			}
		}
	}

}

// sets the blue stipe image as the delBanner background
// the unreadable stuff is the content of the PNG file, encoded as base64
var divs = document.getElementsByTagName("div"); 
for (i=0; i<divs.length; i++) { 
	if (divs[i].className == "banner") {
		divs[i].style.backgroundImage = "url('data:image/png;base64,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')";
	}
}

// replacement for the default css styles on del.icio.us
var cssStyles =	'body { font-family: lucida grande,arial,sans-serif; font-size: 1em; }' +
		' .cloud.right { float: left; background-color: transparent !important; margin: 67px 0 0 0; font-size: 11px; }' +
		' .cloud.right + script + hr + .delPage + hr + h2 + .pager { margin-left: 30%; }' +
		' .cloud.right + script + hr + .delPage + hr + h2 + .pager + #posts { margin-left: 30%; }' +
		' .cloud.right + script + hr + .delPage + hr + h2 + .pager + #posts + .pager { margin-left: 30%; }' +
		' .cloud.right + script + hr + .delPage + hr + h2 + .pager + #posts + .pager + hr + .section { margin-left: 30%; }' +
		' .cloud.right + script + hr + .delPage + hr + h2 + .pager + #posts + .pager + hr + .section + .section { margin-left: 30%; }' +
		'a:hover { text-decoration: none; }' +
		'.banner { padding: 9px !important; background-color: #ccc !important; background-position: 0 0 ; background-repeat: repeat-x; height: 25px; position: fixed; left: 0; top: 0; width: 100%; }' +
		'.banner h1 { background: url(http://del.icio.us/img/delicious.gif) no-repeat !important; }' +
		'.banner h1, .banner h1 a { font-weight: bold !important; font-size: 17px; color: #fff; }' +
		'.nav { padding-right: 15px; }' +
		'.nav li { border-left: 1px solid #fff;  padding: 0 5px 0 5px; }' +
		'.nav li, .nav li a { font-size: 13px; font-weight: bold; color: #fff; }' +
		'.creator, .creator a { color: #fff; font-size: 13px; }' +
		'.right, #posts { padding-top: 40px !important; }' +
		'.postui, .delMain { padding-top: 60px !important; }' +
		'.right.list { float: left; background-color: #fff; width: 160px; border-right: 1px solid #ccc; margin: 0; padding: 0; font-size: 11px; }' +
		'#posts, DIV.section, DIV.pager, .delMain { padding: 10px 0 10px 0; margin-left: 160px; border-left: 1px solid #ccc; }' +
		'.section, .pager { padding-left: 10px !important; }' +
		'.delMain .pager { margin-left: -1px; }' +
		'.post, .section, .pager { padding-left: 10px; margin: 0; }' +
		'h4.desc, h4.desc a { font-size: 16px; font-weight: bold; color: #333; padding-top: 8px !important; }' +
		'h4.desc a:hover { font-size: 16px; font-weight: bold; color: #ff0099; padding-top: 8px !important; }' +
		'h3.desc, h3.desc a { font-size: 16px; font-weight: bold; color: #333; padding-top: 8px !important; }' +
		'h3.desc a:hover { font-size: 16px; font-weight: bold; color: #ff0099; padding-top: 8px !important; }' +
		'.meta { padding: 5px 0 8px 15px; color: #333; }' +
		'.meta a {background-color: transparent !important; font-size: 11px !important; }' +
		'.meta a.tag:hover{color:#ff0099;}'+
		'.meta a.pop{background-color:#f5f5f5 !important;}'+
		'.meta a.pop:hover{color:#ff0099;}'+
		'.delPage { padding: 45px 10px 5px 0 !important; text-align: right; }' +
		'.delPage, .delPage form a, .delPage a { color: #666 !important; font-size: 12px !important; font-weight: bold; }' +
		'.delPage form input{ width: 250px; font-size: 12px; padding: 0; }' +
		'.right.list a, .right.list a:visited { color: #88f; }' +
		'.right.list + .right.list + script + hr + .delPage + hr + h2 + .pager { margin-left: 321px !important; }' +
		'.right.list + .right.list + script + hr + .delPage + hr + h2 + .pager + #posts { margin-left: 321px !important; }' +
		'.right.list + .right.list + script + hr + .delPage + hr + h2 + .pager + #posts + .pager { margin-left: 321px !important; }' +
		'.right.list + .right.list + script + hr + .delPage + hr + h2 + .pager + #posts + .pager + hr + .section { margin-left: 321px !important; }' +
		'.right.list + .right.list + script + hr + .delPage + hr + h2 + .pager + #posts + .pager + hr + .section + .section { margin-left: 321px !important; }' +
		'.right.list div, .delPostInfo { padding-left: 10px !important; }' +
		'.right.list #sidebar, .delRightTitle, .right.list h2 { font-size: 12px !important; padding: 5px 0 5px 10px !important; background-color: #eee; color: #666; }' +
		'.delMain form {padding-left: 10px; }' +
		'table { padding: 5px; margin: 10px; width: 500px; border: 1 px solid #333; border-collapse: collapse; }' +
		'th { background-color: #3d80df; color: #fff; padding: 5px; }' +
		'td { padding: 5px; }' +
		'#infobar{background:#333;color:#fff;}'+
		'.sidebar-inner{background:#333;color:#fff;}'+
		'.date { display:block;float: none !important; color: #ccc; font-weight: normal; padding: 0px 0 0px 0px; font-size: 12px !important; }' +
		'.by-url .post { margin-left: 0 !important; }' +
		'#sidebar li {color:#999;}'+
		'#sidebar a{color:#fff;}'+
		'#sidebar a:visited{color:#fff;}'+
		'#sidebar a:hover{color:#ff0099;}'+
		'#sidebar h3 {color:#ff0099;}'+
		'.commands a.edit:hover{color:#ff0099;}'+
		'.commands a.rm:hover{color:#ff0099;}'+
		'#header h1.auth-h1 a {color:#000;}'+
		'#header h1.auth-h1 a:hover {color:#ff0099;}'+
		'.posts{padding-top:20px;}'+
		'.historylist span {background-color:#555;color:#000;}'+
		'#infobar a {color:#ff0099 !important;}'+
		'#infobar a:hover {color:#fff !important; text-decoration:underline !important;}'+
		'#sidebar .cur{background:#ffff00;color:#000 !important;}'+
		'#sidebar .cur:hover{color:#ff0099 !important;}'+
		'#header-l {background:transparent url(data:image/gif;base64,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%3D) no-repeat scroll left bottom;float:left;min-height:42px;padding:0pt 0pt 0pt 42px;}'+
		'.delMain #posts, .delMain .section { margin-left: -1px; }'; //hack to fix missing </div> for delMain on front page

insertCSS(cssStyles);
runHacksForSpecifcPages();
})();