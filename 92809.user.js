// ==UserScript==
// @name           APRESS.COM ISBN to Amazon link converter
// @namespace      http://userscripts.org/users/jhgoodwin
// @description    Converts ISBN on APRESS.COM to Amazon links
// @include        http://apress.com/*
// ==/UserScript==
// Add jQuery
function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js");
	if (script.addEventListener) {
		script.addEventListener('load', function() {
			var script = document.createElement("script");
			if (typeof(callback) == "string") {
				script.textContent = "jQuery.noConflict();\n" +callback;
			} else {
				script.textContent = "jQuery.noConflict();\n(" + callback.toString() +")();";
			}
			document.body.appendChild(script);
		}, false);
	}
	document.body.appendChild(script);
}

function addAmazonIsbnUrl() {
	var externalAmazonISBNURL = "http://www.amazon.com/dp/{ISBN_PLACEHOLDER}";
	var externalAmazonReviewURL = "http://www.amazon.com/product-reviews/{ISBN_PLACEHOLDER}";
	var serviceAmazonBookURL = "http://ws.easythunder.com/Amazon.asmx/GetBook";
	var isbnRegExp = /\{ISBN_PLACEHOLDER\}/ig;
	var arrISBN13to10 = new Array();
	var arrISBN10to13 = new Array();
	
	function getStarClassFromRating(rating) {
		rating = Math.round(rating * 2);
		switch (rating) {
			case 0:
				return "s_star_0_0";
			case 1:
				return "s_star_0_5";
			case 2:
				return "s_star_1_0";
			case 3:
				return "s_star_1_5";
			case 4:
				return "s_star_2_0";
			case 5:
				return "s_star_2_5";
			case 6:
				return "s_star_3_0";
			case 7:
				return "s_star_3_5";
			case 8:
				return "s_star_4_0";
			case 9:
				return "s_star_4_5";
			case 10:
				return "s_star_5_0";
			default:
				return "";
		}
	}
	function getAmazonBookSuccess (amazonBook) {
		if (typeof(amazonBook.d) != "undefined")
		{
			amazonBook = amazonBook.d;
		}
		
		var newURL = externalAmazonISBNURL.replace(isbnRegExp, amazonBook.ISBN);
		var newReviewsURL = externalAmazonReviewURL.replace(isbnRegExp, amazonBook.ISBN);
		var appendHtml;
		if (amazonBook.StarRating == null) {
			appendHtml = " <a class='amazon-isbn' href='" +newURL +"' target='_blank'>no reviews</a>";
		} else {
			var starClass = getStarClassFromRating(amazonBook.StarRating);
			var newLinkContent = "<span class='swSprite " +starClass +" ' title='" + amazonBook.StarRating +" out of 5 stars'><span><nobr>" + amazonBook.StarRating +" out of 5 stars</nobr></span></span>";
			var newReviewsLinkContent = amazonBook.ReviewCount + " reviews";
			var newLinkUrl = " <a class='amazon-isbn' href='" +newURL +"' target='_blank'>" +newLinkContent +"</a>";
			var newReviewsLinkUrl = " <a href='" +newReviewsURL +"' target='_blank'>" +newReviewsLinkContent +"</a>";
			appendHtml = newLinkUrl + " " +newReviewsLinkUrl;
		}
		var selector = new Array();
		selector.push("a[href*=\\/book\\/view\\/" + amazonBook.ISBN +"]");
		var isbn13 = arrISBN10to13[amazonBook.ISBN];
		if (isbn13) {
			selector.push("a[href*=\\/book\\/view\\/" + isbn13 +"]");
		}
		var linkList = jQuery(selector.join(","));
		if (linkList.filter(":not(:has(img))").length > 0)
			linkList = linkList.filter(":not(:has(img))");
		linkList.each(function(idx, obj) {
			var thisObj = jQuery(this);
			var linkObj = jQuery(appendHtml).insertAfter(thisObj);
		});
	}
	// assumes that isbnBaseNum is a string
	function getIsbn10CheckDigit (isbnBaseNum) {
		if (!isbnBaseNum || isbnBaseNum.length != 9)
			return "";
		var result = String((isbnBaseNum[0] * 1
			+isbnBaseNum[1] * 2
			+isbnBaseNum[2] * 3
			+isbnBaseNum[3] * 4
			+isbnBaseNum[4] * 5
			+isbnBaseNum[5] * 6
			+isbnBaseNum[6] * 7
			+isbnBaseNum[7] * 8
			+isbnBaseNum[8] * 9
			) % 11);
		return (result == "10") ? "X" : result;
	}
	// assumes that isbn13 is a string
	function getIsbn10FromIsbn13 (isbn13) {
		if (!isbn13 || isbn13.length != 13)
			return "";
		// digits 4-12 + isbn checksum = isbn10 number
		var baseNum = isbn13.substring(3,12);
		return baseNum + getIsbn10CheckDigit(baseNum);
	}

	jQuery("head").append("<style>"
		+".amazon-isbn { font-style: italic; background: #fff url(http://www.microsoft.com/library/media/1033/windows/ie/images/searchguide/amazon_16x16.gif) top left no-repeat; padding-left: 18px; margin-left: 4px; font-size: .8em;}"
		+".swSprite { display: -moz-inline-box; display: inline-block; margin: 0;padding: 0; position: relative; overflow: hidden; vertical-align: middle; background: url(http://g-ecx.images-amazon.com/images/G/01/common/sprites/sprite-site-wide-2._V214202442_.png) no-repeat; }"
		+".swSprite span { position: absolute; left: -9999px; }"
		+".amazon-isbn .swSprite { top: -2px; }"
		+".s_star_0_0 { background-position: -95px 0px; width: 65px;height: 13px; }"
		+".s_star_0_5 { background-position: -82px -20px; width: 65px;height: 13px; }"
		+".s_star_1_0 { background-position: -82px 0px; width: 65px;height: 13px; }"
		+".s_star_1_5 { background-position: -69px -20px; width: 65px;height: 13px; }"
		+".s_star_2_0 { background-position: -69px 0px; width: 65px;height: 13px; }"
		+".s_star_2_5 { background-position: -56px -20px; width: 65px;height: 13px; }"
		+".s_star_3_0 { background-position: -56px 0px; width: 65px;height: 13px; }"
		+".s_star_3_5 { background-position: -43px -20px; width: 65px;height: 13px; }"
		+".s_star_4_0 { background-position: -43px 0px; width: 65px;height: 13px; }"
		+".s_star_4_5 { background-position: -30px -20px; width: 65px;height: 13px; }"
		+".s_star_5_0 { background-position: -30px 0px; width: 65px;height: 13px; }"
		+".cBox { position: relative;width:100%; margin-bottom:15px;}"
		+".cBoxInner { padding:9px;}"
		+".cBoxTL, .cBoxTR, .cBoxBL, .cBoxBR { position:absolute; display:block; width:10px; height:10px; z-index:1; }"
		+".cBoxTL { top:-1px; left:-1px; }"
		+".cBoxTR { top:-1px; right:-1px; }"
		+".cBoxBL { bottom:-1px; left:-1px; }"
		+".cBoxBR { bottom:-1px; right:-1px; }"
		+".cBoxR { position:absolute; display:block; width:1px; height:100%; top:-1px; right:-1px; background-color:#C9E1F4; }"
		+".cBoxB { position:absolute; display:block; width:100%; height:1px; bottom:-1px; background-color:#C9E1F4; }"
		+".cBoxTL, .cBoxTR, .cBoxBL, .cBoxBR { background-image:url(http://g-ecx.images-amazon.com/images/G/01/common/sprites/sprite-site-wide-2._V214202442_.png); background-repeat:no-repeat; }"
		+".cBoxTL { background-position: 0px 0px; }"
		+".cBoxTR { background-position: -10px 0px; }"
		+".cBoxBL { background-position: 0px -10px; }"
		+".cBoxBR { background-position: -10px -10px; }"
		+".secondary, .secEyebrow, .primary { border:1px solid #C9E1F4; border-right:none; border-bottom:none; }"
		+".secEyebrow h2 { margin:0; border-bottom:1px solid #E0EFFB; padding:6px 8px 6px 8px; font-size:100%; color:#030303; }"
		+".primary, .secEyebrow h2 { background-color:#EAF3FE; }"
		+".primary .cBoxTL, .secEyebrow .cBoxTL { background-position: 0px -40px; }"
		+".primary .cBoxTR, .secEyebrow .cBoxTR { background-position: -10px -40px; }"
		+".primary .cBoxBL { background-position: 0px -50px; }"
		+".primary .cBoxBR { background-position: -10px -50px; }"
		+"div.crvs { text-align: center; white-space: nowrap; width: 46%; }"
		+".crleft { float: left; }"
		+".crleft { float: right; }"
		+".crclear { clear: both; }"
		+".bookcontainer { height: 181px; }"
		+"</style>"
	);
	
	var lastISBN = "";
	var arrISBN = new Array();
	jQuery("a[href*=\\/book\\/view\\/]").each(function(idx, obj) {
		var thisObj = jQuery(this);
		var linkLoc = thisObj.attr('href');
		var ISBN = linkLoc.substring(linkLoc.lastIndexOf('/') + 1);
		if (ISBN.length == 13) {
			arrISBN13to10[ISBN] = getIsbn10FromIsbn13(ISBN);
			arrISBN10to13[arrISBN13to10[ISBN]] = ISBN;
			ISBN = arrISBN13to10[ISBN];
		}
		if (jQuery.inArray( ISBN, arrISBN ) == -1) { // for now, Amazon won't find the books using the 13 digit ISBN
			// use the following site to convert the number to ISBN 10 http://www.isbn-13.info/
			arrISBN.push(ISBN);
		}
	});
	var maxLen = arrISBN.length;
	for (var i=0; i<maxLen; i++) {
		var ISBN = arrISBN[i];
		jQuery.ajax({
			type: "POST"
			, url: serviceAmazonBookURL
			, data: '{ isbn : "' +ISBN +'" }'
			, contentType: "application/json; charset=utf-8"
			, dataType: "json"
			, success : getAmazonBookSuccess
		});
	}
}
// add our extra code
addJQuery(addAmazonIsbnUrl);