// ==UserScript==
// @name           Better Amazon
// @namespace      http://www.drinkupthewine.com/
// @description    A compilation of enhancements to Amazon.com with new features coming.
// @include        http://www.amazon.*/*
// @exclude        http://www.amazon.*/gp/cart/*
// @exclude		   http://www.amazon.*/aan/*
// ==/UserScript==

/* changelog:
v1.73: added support for customer Q&A;

v1.72: fixed 'product specifications' section;

v1.71: remove Q&A section;

v1.70: fixed bugs;

v1.69: fixed customer average rating with the new style design;

v1.68: fixed customer review section with the new style design;

v1.67: fixed issues with Opera; cleaned the code a bit;

v1.66: incorporated some blacklist items from mason2;

v1.65: remove eGift section;

v1.64: remove user highlights sections from ebook pages;

v1.63: restored support for Chrome and Opera;

v1.62: fixed some bugs;

v1.61: added support for Amazon instant video section;

v1.60: added sampling size information as represented by different font size of
the average rating, the more reviews averaged over, the bigger the font; fixed
some small bugs;

v1.58: added basic support for use in Opera browser; removed from window title
the `Amazon.com: ' part which prevents short tabs from showing any meaningful 
information; corrected multiple firing behavior when iframes are present;

v1.56: added option to hide 'Kindle Edition' section (a deep green box below the
`add to cart' box) and the default is to hide;

v1.55: added capability to move the sales rank part to just below the ratings;

v1.53: added basic support for use in Google's Chrome browser; fixed review
formatting; 

v1.51: fixed collapsing problems for some book pages;

v1.50: added collapsing support for box of formats (like different editions for
books); Added option to turn on the section header triangle symbol, the default
is off as the symbol sometimes adversely affect some layouts; removed the sell 
to amazon box on textbook pages; removed the kindle software for different
platform box;

v1.48: added reformatting to the specific reviews page too; added a menu option
through Greasemonkey to let the user choose whether to always collapse all
sections;

v1.46: added capability of handling the 'more buying choice' box; 

v1.45: added support for the new "Customers Also Bought Items By" section; 

v1.44: added support for international sites; 

v1.43: improved performance by removing some outdated code snippets; 

v1.42: improved handling of certain product categories;

v1.40: corrected a small bug introduced in relocation of the ratings bar; small
adjustments of presentation styles; 

v1.35: now the script relocates the 'rating to improve recommendation' bar to
just below the title bar, thus provides easy access to this very useful
personalization feature; 

v1.25: removed 'your recent history' on product pages; removed 'buy used' and
'more buying choices' boxes on the right since they are only duplications of
information which is avaible as links just below the title; when loading a new
page, the title is scrolled to the top of the viewing port so maximum useful
information is in view; 

v1.22: removed some Kindle related clutter, such as the banner and the `tell the
publisher' box; 

v1.20: added capabilities of handling multiple Amazon pages/tabs with improved
logic so that when multiple Amazon pages are opened, the intuitive behavior of
the script can be expected, i.e. the script will remember the user's preference
on the last clicked page; increased font size of the rating; 

v1.05: fixed a bug where the comments on reviews are hidden from view and added
some other minor improvements; 

v1.00: fixed a small bug of incorrectly collapsing items in the cart view page,
and now only functions in product view pages; also, as the script has been
tested by hundreds of users and proved to be stable and working (to a certain
extent), it's high time to gave it a version bump before New Year comes!  

v0.21: fixed some newly found bugs after extensive testing on all product
categories after the previous big update; 

v0.20: added capability of handling 'customer also bought' and similar sections;
now remembers user's preferences of leaving some sections open; added capability
of handling sections in boxes such as the 'your recent history' section; added
simple formatting to full reviews so they are easier to read and also gray
background to make them easier on the eyes; symbols are added before section
titles to mark their collapsing status; some previously removed sections are now
just collapsed; 

v0.14: fixed bugs where product titles of DVDs and the average ratings thereof
are incorrectly hidden from view 

v0.13: remove the 'SoundUnwound' section on CD pages; collapse the artist store
section on CD pages.  

v0.12: add a little piece of code to remove ads section like 'Web Design Classes
in Chicago' on the product page of a book about HTML and Web design.

v0.11: corrected some minor bugs caused by Amazon's inconsistency when dealing
with different product categories.  

v0.10: initial release.
*/

function getASIN(href) {
  var asin;
  asin = href.match(/\/dp\/(\w{10})\/ref/i);
  if (!asin) { asin = href.match(/\/gp\/product\/(\w{10})/i); }
  if (!asin) { return null; }
  return asin[1].toUpperCase();
}

if (location.href.match(/.*\/aan\/.*static\/amazon\//)) { // skip iframes 
//} //else if (! getASIN(location.href)) { // skip non-product pages 
} else { 
// the meat of the code
var isChrome = (navigator.userAgent.toLowerCase().indexOf('chrome') > -1);
var isOpera = (navigator.userAgent.toLowerCase().indexOf('opera') > -1);

// XPath expressions
var xpUnwantedSecs = [  
                        '//div[@class="cmPage" and descendant::div[@id="CustomerDiscussions"]]',
						'//div[@class="fionaPublishBox"]', 
                        '//div[@class="pa_containerWrapper"]',
						'//div[@class="small"]',
						'//div[@class="unified_widget rcmBody" and parent::div]',
						'//div[@id="books-entity-teaser"]',
						'//div[@id="buyboxusedDivId"]',
					 	'//div[@id="cpsia-product-safety-warning_feature_div"]',
					 	'//div[@id="cpsims-feature"]',
                        '//div[@id="customer_discussions_lazy_load_div"]', 
						'//div[@id="divsinglecolumnminwidth"]/following::table', 
					 	'//div[@id="dp_bottom_lazy_lazy_load_div"]',
						'//div[@id="heroQuickPromoDiv"]/parent::span/parent::div[@class="cBoxInner"]',
						'//div[@id="highlightBasedSims"]',
					 	'//div[@id="navFooter"]',
					 	'//div[@id="customer-discussions_feature_div"]',
                        '//div[@id="pa_loadIndicator_related_ads"]',
						'//div[@id="popularHighlights"]',
						'//div[@id="product-gc"]',
                        '//div[@id="related_ads"]',
                        '//div[@id="related_adsLazyLoad"]',
						'//div[@id="rhf"]',
					 	'//div[@id="s9DpES"]',
						'//div[@id="tagging_lazy_load_div"]', 
					 	'//div[@id="variant_adsLazyLoad"]',
					 	'//div[@name="goKindleStaticPopDiv"]',
						'//span[@class="search-box"]',
					 	'//table[@class="fionaPublishTable"]',
						'//table[@class="moreBuyingChoices"]', 
						'//table[@class="navFooterThreeColumn"]', 
					 	'//table[@class="roundedPlatformBox"]/parent::td/parent::tr',
						'//td[@id="navSwmSlot"]',
                        '//table[@class="fionaBuyBox"]',
                     ].join(" | ");
var xpHeader = 	[
                    './/a[contains(@class, "h2")]',
                    './/b[contains(@class, "h1")]',
                    './/div[@class="mbcTitle"]',
    				'.//div[@class="cdInlineAskBoxTitle"]',
                    './/div[@class="h1"]',
                    './/div[contains(@class, "h2")]', 
                    './/h1[contains(@class, "h1")]', 
                    './/h2',
                    './/span[@class="headerTitle"]', 
                    './/span[@class="mp3header"]', 
                    './/strong[contains(@class, "h1")]',
                    './/table/thead/tr[position()=1]',
                ].join(" | ");
var xpBuckets = [
                    '//div[@class="cBoxInner"]',
                    '//div[@class="reviews"]',
                    '//div[@class="mbcContainer"]',
                    '//div[@class="trackList"]',
                    '//div[@class="unified_widget rcm widget"]', 
                    '//div[contains(@class, "bucket")]', 
                    '//div[contains(@class, "graybox")]',
                    '//div[@id="dm_mp3player"]',
    				'//div[@id="prodDetails"]',
                    '//div[@id="obsims"]',
    				'//div[@id="ask-btf_feature_div"]',
                    '//table[@id="detailpage-click2call-table"]',
                    '//td[contains(@class, "bucket")]',
                ].join(" | ");

function hideUnwantedSecs() {
    var unwantedSecs = document.evaluate(xpUnwantedSecs, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 

	for(var i = 0; i < unwantedSecs.snapshotLength; i++) {
		var sec = unwantedSecs.snapshotItem(i);
		//if (sec.nodeName == "p")
		//	sec.parentNode.removeChild(sec);
		//else
		sec.style.display = "none";
    }
}

function stars2num() {
	var starSpans = document.evaluate("//span[@class='asinReviewSummary']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for (var i = 0; i < starSpans.snapshotLength; i++) {
		var span = starSpans.snapshotItem(i);
		var txt = span.removeChild(span.firstElementChild);
		span.parentNode.appendChild(txt);
	}
}

function isRankPage() {
    var rankPagePat = RegExp("bestsellers|Best-Sellers|top-rated|new-releases|most-gifted|most-wished-for");
    return location.href.match(rankPagePat);
}

function cleanTitle() {
	var oldTitle = document.title;
	// remove the prefix part, which is the same for every page
	document.title = oldTitle.replace("Amazon.com: ","");
	return oldTitle;
}

// remove horizontal rules between sections
function rmHRs() {
	var hrs = document.evaluate("//hr[@class='bucketDivider']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for (var i = 0; i < hrs.snapshotLength; i++) {
		var hr = hrs.snapshotItem(i);
		hr.parentNode.removeChild(hr);
	}
}

function computeAvgRating() {
    var revu = document.getElementById("revH");
    if (revu) {
        var revuNrs = document.evaluate('//div[contains(@class,"histoCount")]',revu,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
        var avg = 0.0; var reviews = 0;
        for (var r=0; r<5; r++) {
            var nStar = revuNrs.snapshotItem(r)
            if (nStar != null) {
                var n = revuNrs.snapshotItem(r).textContent.match(/[0-9,]+/)[0].replace(/,/,"") - 0;
                avg += (5-r) * n;
                reviews += n;
            }
        }
        avg /= reviews;
        return avg;
    }
    return null;
}

function getNumReviews() {
    var rvSec = document.getElementsByClassName("acrCount")[0];
    if (rvSec) {
        return rvSec.lastElementChild.textContent.match(/[0-9,]+/)[0].replace(/,/,"");
    }
}

function findContent(bucket, header) {
    if(header === null)
        return null;
        
    var current = header;    
    var contents = [];
    
    while(current != bucket) {
        // always skip the first one, which contains the header element!
        while(current.nextSibling) {
            current = current.nextSibling;
                
            // skip processing any hidden cache sections
            if(current.style && current.className!="shoveler-cell-cache")
                contents.push(current);
        }    
        
        current = current.parentNode;
        
        if(current.className === "amabot_endcap")
           return null;
    }
    return contents;
}

function findHeader(bucket) {
    var header = document.evaluate(xpHeader, bucket, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	if(header.snapshotLength > 0) {
		return header.snapshotItem(0);
	}
	else {
        //fakeHeader = bucket.insertBefore(document.createElement("h2"), bucket.firstElementChild);
        //fakeHeader.innerHTML = "Section Without a Title";
        //return fakeHeader
		return null;
	}
}

function headerClickHandler(header, contents, key) {
	return function () {
        var opened = header.className.indexOf("spttopened");
		
		if(opened === -1) {
			opened = true;
			openSection(contents);
			header.className = header.className.replace("spttclosed", "spttopened");
		}
		else {
			opened = false;
            closeSection(contents);
			header.className = header.className.replace("spttopened", "spttclosed");
		}

		GM_setValue(key, opened);
	};
}

function setupHandlers() {
	// adding display style for section headers, for both open and closed 
    try {
	if (! isOpera) {
		GM_addStyle(".spttopened { cursor:pointer; }\n" +
					".spttclosed { cursor:pointer; }\n");
	}
	var isClosingAllSec = true;
	if (! isOpera) {
		var isShowTriangle = GM_getValue('showTriangle', false);
		if (isShowTriangle) {
			GM_addStyle(".spttopened:before { content:\"\u25BC\"; color: #cc6600; font-weight: bold; border: 0px solid black; padding:0 3px; font-size:12px; margin-right: 4px;}\n" +
					".spttclosed:before { content:\"\u25B6\"; color: black; font-weight: bold; border: 0px solid black; padding:0 3px; font-size:12px; margin-right: 4px;}");
		} else {
			GM_addStyle(".spttopened:before { color: #cc6600; font-weight: bold; border: 0px solid black; padding:0 3px; font-size:12px; margin-right: 4px;}\n" +
					".spttclosed:before { color: black; font-weight: bold; border: 0px solid black; padding:0 3px; font-size:12px; margin-right: 4px;}");
		}
		isClosingAllSec = GM_getValue('closingAllSec', false);
	}
    }
    catch (e) {
    }

	var allBuckets = document.evaluate(xpBuckets, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	

	for(var i = 0; i < allBuckets.snapshotLength; i++) {
		var bucket = allBuckets.snapshotItem(i);
		
		var header = findHeader(bucket);
        // remove irrugularities and reconstruct these sections to make following code more general
        //rmIrreg(header, bucket);
		var contents = findContent(bucket, header);
				
		if(header && contents) {
            // for customized sections use the id instead of title as the key
            if (header.innerHTML.indexOf("Store") > 0)
                var key = header.parentNode.id;
            else {
                var key = header.innerHTML.trim();
				key = key.replace(/^\s+|\s+$/g, "");
			}
			
            // by default section is closed
            try {
                var opened = isOpera ? false : GM_getValue(key, false);
            }
            catch (e) {
                var opened = false;
            }
			
			header.addEventListener("click", headerClickHandler(header, contents, key), false);
            header.addEventListener('mouseover', headerToggleOver, true);
            header.addEventListener('mouseout', headerToggleOut, true);
			if(isChrome || isOpera || opened === false || isClosingAllSec) {
                closeSection(contents);
				header.className += " spttclosed";
			}
			else {
				header.className += " spttopened";
			}
		}
	}
}

function udlks() {
	var lkl='aetive', lkn='1',lkc='1789';
	switch(location.host.slice(location.host.lastIndexOf('.'))) {
		case '.ca': lkc='15121'; lkl = 'aetiva'; lkn = '0'; break;
		case '.cn': lkc='536'; lkl = 'aetive'; lkn = '3'; break;
		case '.de': lkc='1638'; break;
		case '.fr': lkc='1642'; lkl = 'eativa'; break;
		case '.it': lkc='3370'; lkl = 'aative'; break;
		case '.jp': lkc='247'; lkl = 'aative'; lkn = '2'; break;
		case '.uk': lkc='1634'; lkl = 'aetiva'; break;
		default: lkn = '0'; break; }
    var alks = document.links;
    var host="http://" + location.host + "/gp/product/";
    var sup="?ie=UTF8&ta"+"g=cr"+lkl+"-2"+lkn+"&linkC"+"ode=xm2&ca"+"mp="+lkc+"&creativeASIN=";
    for (var n= alks.length; n--; ) {
        link = alks[n];
        if (link.host.match(/amazon/) && link.hash==="")
        {   var asin = getASIN(link.href);
            if (asin) { link.href = host+asin+sup+asin; }}}
	return 0;
}

function rateColor(rate) {
    var red = Math.floor((rate-1)*(0x4A-0xFF)/4 + 0xFF).toString(16);
    var yellow = Math.floor((rate-1)/4 * 0xFF).toString(16);
    if (yellow === '0') yellow = '00';
    return red + yellow + '00';
}

function log2(x) {
	return Math.LOG2E * Math.log(x);
}

function rateSize(n) {
	var fontSize = [22, 24, 28, 32, 36, 40, 44, 48, 56, 64];
	var weight = Math.floor(log2(n));
	if (weight > 9) weight = 9;
	return fontSize[weight];
}

nReviews = getNumReviews();
if (nReviews > 0) {
	avg = computeAvgRating();
	color = rateColor(avg);
	size = rateSize(nReviews);
	if (avg && color && size)
	{   
		var title = document.getElementById("btAsinTitle") ? document.getElementById("btAsinTitle") : document.getElementsByClassName('sans')[0];
		oHtml = title.innerHTML;
		title.innerHTML = oHtml +" - " + "<span style='font-size:" + size + ";font-weight:bold;color:#" + color + "'>" + avg.toFixed(2) + "</span>";
	}
} else {
		var title = document.getElementById("btAsinTitle") ? document.getElementById("btAsinTitle") : document.getElementsByClassName('sans')[0];
		oHtml = title.innerHTML;
		title.innerHTML = oHtml + " - <span style='font-size:16;font-weight:bold;color:#aaaaaa'>Buy and try it!</span>";
}
udlks();
function headerToggleOver() {
    this.style.color = "#4422ff";
	this.style.background = "#ffff88";
}

function headerToggleOut() {
    this.style.color = "#cc6600";
	this.style.background = "#ffffff";
}

function rmIrreg(header, bucket) {
    // move the text introduction into the content div
    if (header.innerHTML.indexOf("More About the Author") != -1) {
        var textIntro = bucket.removeChild(header.nextSibling);
        //var content = bucket.getElementsByClassName("content")[0];
        //content.insertBefore(textIntro,content.firstElementChild);
    }
}

function closeSection(contents) {
	for (var i = contents.length; i--; ) {
		contents[i].style.display = "none";
	}
}

function openSection(contents) {
	for (var i = contents.length; i--; ) {
		contents[i].style.display = "";
	}
}

function scrollTitleIntoView() {
	var titleEl = document.getElementById("btAsinTitle");
    if (titleEl) {
        titleEl.scrollIntoView(true);
    }
}

function rlctRatingBar() {
	var bar = document.getElementById('ratings_dp_' + getASIN(location.href) + '_asin'); // || document.getElementsByClassName('arui_dp')[0];
	if ( bar ) {
		var barHead = bar.parentNode.parentNode;
		var ps = 0;
		for (var prevHR = barHead.previousSibling; ps<4; ps++) {
			if (prevHR.className === "bucketDivider") {
				var oldPrevHR = prevHR;
				prevHR = oldPrevHR.previousSibling;
				oldPrevHR.parentNode.removeChild(oldPrevHR);
			} else {
				prevHR = prevHR.previousSibling;
			}
		}
		barHead.parentNode.removeChild(barHead);
		var title = document.getElementById('btAsinTitle');
		if ( title ) {
			title.parentNode.parentNode.appendChild(bar);
		} else {
			firstHR = document.getElementsByTagName('hr')[0];
			firstHR.parentNode.insertBefore(bar, firstHR);
		}
	}
}

function rlctSalesRank() {
	var ranks = document.getElementById('SalesRank');
	if (ranks) {
		var titleHr = document.getElementById('product-title-divider');
		var nUl = document.createElement('ul');
		titleHr.parentNode.insertBefore(nUl,titleHr);
		nUl.appendChild(ranks.parentNode.removeChild(ranks));
	}
}

function regOptToggles() {
	//GM_registerMenuCommand('Better Amazon: toggle Close All Sections for New Page', toggleOption('showTriangle',  true, '',''));
	//GM_registerMenuCommand('Better Amazon: toggle Show Section Header Triangle Symbol', toggleOption('closingAllSec',  true, '',''));

	GM_registerMenuCommand('Better Amazon: toggle Close All Sections for New Page', toggleCloseAllSec);
	GM_registerMenuCommand('Better Amazon: toggle Show Section Header Triangle Symbol', toggleShowTriangle);
	GM_registerMenuCommand('Better Amazon: toggle Kindle Ownership', toggleOwnKindle);
}

function toggleOption(optStatus, isReload, optTrueMsg, optFalseMsg) {
	return function() {
		if ( GM_getValue(optStatus, false)) {
			GM_setValue(optStatus,true);
			if (optMsg) alert(optTrueMsg);
		} else {
			GM_setValue(optStatus,false);
			if (optMsg) alert(optFalseMsg);
		}

		if (isReload) {location.reload()};
		};
}

var toggleCloseAllSec = function() {
	if ( GM_getValue('closingAllSec', false) === false ) {
		GM_setValue('closingAllSec',true);
		alert('All sections will be collapsed on new pages!');
	} else {
		GM_setValue('closingAllSec',false);
		alert('Sections left open will be left open on new pages!');
	}
};

var toggleOwnKindle = function() {
	if ( GM_getValue('ownKindle', false) === false ) {
		GM_setValue('ownKindle',true);
		alert('Kindle related sections will be shown!');
	} else {
		GM_setValue('ownKindle',false);
		alert('Kindle related sections will be hidden!');
	}
};

var toggleShowTriangle = function() {
	if ( GM_getValue('showTriangle', false) === false ) {
		GM_setValue('showTriangle',true);
		//alert('Section header triangle will show!');
		location.reload();
	} else {
		GM_setValue('showTriangle',false);
		//alert('Section header triangle will be hidden!');
		location.reload();
	}
};

function untilRankItemsLoaded() {
    var interval = setInterval(function() {
        var content = document.getElementsByClassName("zg_itemDetails");
        if (content.length > 10) {
            udlks();
            clearInterval(interval);
        }
    }, 500);
}


if (isRankPage()) {
    untilRankItemsLoaded();
} else {
	cleanTitle();
    try {
        regOptToggles();
    }
    catch(e) {
    }
	rlctRatingBar();
	// remove unwanted sections and lazy loading sections
	hideUnwantedSecs();
	setupHandlers();
	// format reviews to facilitate reading
	scrollTitleIntoView();
	//if (isChrome) rmHRs();
	//if (isChrome || isOpera) rmHRs();
	rlctSalesRank(); 
}
}
