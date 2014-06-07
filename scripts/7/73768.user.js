// ==UserScript==
// @name           Ultimate youtube pack
// @namespace      shinydimepoductions
// @include        http://*.youtube.com/*
// @include        http://www.youtube.com/results?*
// @include        http://*youtube.com/*
// @include        http://www.youtube.com/watch*
// @include        http://youtube.com/watch*
// @include        http://*.youtube.com/watch*
// @include        http://*.youtube.com/watch*
// @exclude        http://*.youtube.com/user/*
// ==/UserScript==

var AreaBelow;
var AreaSide;
var AreaSideContent;
var DescBox;
AreaBelow = document.getElementById("watch-panel");
AreaSide = document.getElementById("watch-sidebar");
AreaSideContent = AreaSide.innerHTML;
//DescBox = document.getElementById("watch-info");
DescBox = document.getElementById("watch-description");
document.getElementById("watch-sidebar").innerHTML = "";
document.getElementById("watch-sidebar").appendChild(DescBox);
document.getElementById("watch-sidebar").innerHTML = document.getElementById("watch-sidebar").innerHTML + AreaSideContent;
//alert("test");

(function() {
var css = "#watch-info:not(.expanded) {width:100px !important; display:inline !important; float:right !important; position:relative !important; top:-2px !important; right:1px !important;}\n#watch-info:not(.expanded) + #watch-actions {width:540px !important;}\n#watch-info.expanded #watch-views {margin-bottom:-56px !important;}\n#watch-info.expanded #watch-views .watch-expander-body {display:none !important;}\n\n#watch-description {margin-left:20px !important; background:#EEEEEE !important; border:1px solid #CCCCCC !important; margin-bottom:10px !important;}\n#watch-description .watch-expander-head {display:none !important;}\n#watch-description .watch-expander-body {display:block !important; height:auto !important; padding:0 !important; margin:4px 6px !important; margin-top:2px !important;}\n#watch-description .watch-expander-body #watch-description-body {display:block !important; visibility:visible !important; font-size:0 !important;}\n\n#watch-description .watch-expander-body #watch-description-body * {font-size:12px !important;}\n#watch-description .watch-description-username, #watch-description .watch-video-date {line-height:18px !important; display:block !important; margin-left:52px !important; padding-left:8px !important;}\n#watch-description .watch-video-date {color:#333333 !important;}\n#watch-description .watch-description-username-dash {display:none !important;}\n#watch-description #watch-category {margin:0 !important;}\n#watch-description #watch-category span, #watch-description #watch-tags span {color:#666666 !important; font-weight:normal !important; display:inline !important;}\n#watch-description #watch-tags {padding-top:5px !important; margin:0 !important;}\n#watch-description #watch-tags div {display:inline !important;}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();

function appendJS(strJsFile) {
	document.body.appendChild(document.createElement('script')).src = strJsFile;
}
function insertSiblingBefore(oldSibling, newSibling) {
	oldSibling.parentNode.insertBefore(newSibling, oldSibling);
}
function getOffset(n) {
    switch(Math.round(n*2)/2){
        case 0: return [-75, -110];
        case 0.5: return [-59, -126];
        case 1: return [-59, -110];
        case 1.5: return [-44, -126];
        case 2: return [-44, -110];
        case 2.5: return [-29, -126];
        case 3: return [-29, -110];
        case 3.5: return [-15, -126];
        case 4: return [-15, -110];
        case 4.5: return [0, -126];
        case 5: return [0, -110];
    }
}
unsafeWindow.jsonCallBack = function jsonCallBack(root) {
	var rating = 0;
	var ratingCount = 0;
	var strRatingHTML;	
	try {
		rating = root.feed.entry[0].gd$rating.average;
		ratingCount  = root.feed.entry[0].gd$rating.numRaters;
	} catch(e) {
		rating = -1;
		ratingCount = -1;
	}
	var sibDiv = document.getElementById("watch-actions");
	if (sibDiv) {
		if ( rating >= 0 ) {
			rating = Math.round(rating*10)/10;
			strRatingHTML = '<div style="float: left; background: transparent url(\'http://s.ytimg.com/yt/img/master_watch5-vfl155666.png\') no-repeat ' + getOffset(rating)[0] + 'px ' + getOffset(rating)[1] + 'px; width: 75px; height: 16px; margin: -2px 5px;"></div>';
			strRatingHTML += " &nbsp; Rating: " + rating + " out of 5 &nbsp; &nbsp; Number of Ratings: " + ratingCount;
		} else {
			strRatingHTML = "No Ratings";
		}
		var newDiv = document.createElement("div");
		newDiv.style.margin = '0px 0px 5px 0px';
		newDiv.innerHTML = strRatingHTML;
		insertSiblingBefore(sibDiv, newDiv);
	}
}

function parseId(url) {
	var patt = /[?#&]v=([^&]+)/;
	var result = patt.exec(url);
	return (result!=null && result.length == 2) ? result[1] : '';
}

var strLoc = document.location.href;
var video_id = parseId(strLoc);
if ( video_id != "" ) appendJS("http://gdata.youtube.com/feeds/api/videos?v=2&max-results=1&safeSearch=none&q=" + video_id + "&alt=json-in-script&callback=jsonCallBack");

function appendJS(strJsFile) {
	document.body.appendChild(document.createElement('script')).src = strJsFile;
}

function addCommas(nStr) {
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}

var getElementsByClassName = function (className, tag, elm){
	/*
		Developed by Robert Nyman, http://www.robertnyman.com
		Code/licensing: http://code.google.com/p/getelementsbyclassname/
	*/
	if (document.getElementsByClassName) {
		getElementsByClassName = function (className, tag, elm) {
			elm = elm || document;
			var elements = elm.getElementsByClassName(className),
				nodeName = (tag)? new RegExp("\\b" + tag + "\\b", "i") : null,
				returnElements = [],
				current;
			for(var i=0, il=elements.length; i<il; i+=1){
				current = elements[i];
				if(!nodeName || nodeName.test(current.nodeName)) {
					returnElements.push(current);
				}
			}
			return returnElements;
		};
	}
	else if (document.evaluate) {
		getElementsByClassName = function (className, tag, elm) {
			tag = tag || "*";
			elm = elm || document;
			var classes = className.split(" "),
				classesToCheck = "",
				xhtmlNamespace = "http://www.w3.org/1999/xhtml",
				namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace)? xhtmlNamespace : null,
				returnElements = [],
				elements,
				node;
			for(var j=0, jl=classes.length; j<jl; j+=1){
				classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
			}
			try	{
				elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
			}
			catch (e) {
				elements = document.evaluate(".//" + tag + classesToCheck, elm, null, 0, null);
			}
			while ((node = elements.iterateNext())) {
				returnElements.push(node);
			}
			return returnElements;
		};
	}
	else {
		getElementsByClassName = function (className, tag, elm) {
			tag = tag || "*";
			elm = elm || document;
			var classes = className.split(" "),
				classesToCheck = [],
				elements = (tag === "*" && elm.all)? elm.all : elm.getElementsByTagName(tag),
				current,
				returnElements = [],
				match;
			for(var k=0, kl=classes.length; k<kl; k+=1){
				classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
			}
			for(var l=0, ll=elements.length; l<ll; l+=1){
				current = elements[l];
				match = false;
				for(var m=0, ml=classesToCheck.length; m<ml; m+=1){
					match = classesToCheck[m].test(current.className);
					if (!match) {
						break;
					}
				}
				if (match) {
					returnElements.push(current);
				}
			}
			return returnElements;
		};
	}
	return getElementsByClassName(className, tag, elm);
};

function getSpriteOffset(n) {
	var h = -380;
	var h2 = -396;
    switch(Math.round(n*2)/2){
        case 0: return [-60, h];
        case 0.5: return [-48, h2];
        case 1: return [-48, h];
        case 1.5: return [-36, h2];
        case 2: return [-36, h];
        case 2.5: return [-24, h2];
        case 3: return [-24, h];
        case 3.5: return [-12, h2];
        case 4: return [-12, h];
        case 4.5: return [0, h2];
        case 5: return [0, h];
    }
}
unsafeWindow.jsonCallBackSearchResultsLink = function jsonCallBackSearchResultsLink(root) {
	var rating = 0;
	var ratingCount = 0;
	var id, strRatingHTML, offset, vidlink, newDiv;
	try {
		id = root.feed.entry[0].media$group.yt$videoid.$t;
		rating = root.feed.entry[0].gd$rating.average;
		ratingCount  = root.feed.entry[0].gd$rating.numRaters;
	} catch(e) {
		id = "";
		rating = -1;
		ratingCount = -1;
	}

	if ( rating >= 0 && ! document.getElementById('ratingstars-' + id) ) {
		var viddiv = document.getElementById('video-main-content-' + id);
		
		rating = Math.round(rating*10)/10;
		var offset = getSpriteOffset(rating);
		var starrating = Math.round(rating*2)/2;
		starrating = starrating.toFixed(1);

		var strRatingHTML = '<div style="float: left; background: transparent url(\'http://s.ytimg.com/yt/img/master-vfl159389.png\') no-repeat ' + offset[0] + 'px ' + offset[1] + 'px; width:60px; height:14px;"></div>';
		strRatingHTML += '<span style="color:#bbb;font-size:11px">&nbsp; ' + rating.toFixed(1) + '&nbsp; (' + addCommas(ratingCount) + ' ratings)</span>'; 
		
		var newDiv = document.createElement("div");
		newDiv.id = 'ratingstars-' + id;
		newDiv.innerHTML = strRatingHTML;
		
		viddiv.appendChild(newDiv);
	}
}

function parseId(url) {
	var patt = /[?#&]v=([^&]+)/;
	var result = patt.exec(url);
	return (result!=null && result.length == 2) ? result[1] : '';
}

function getLinkByHref(strHref) {
	var els = document.getElementsByTagName("a");
	for (var i=0; i < els.length; i++) {
		if ( els[i].href.indexOf(strHref) > 0 ) return els[i];
	}
}

window.addEventListener("load", function(e) {
	var video_id;
	var els = getElementsByClassName("video-thumb ux-thumb-128", "a");

	for (var i=0; i < els.length; i++) {
		//if ( els[i].id.indexOf("video-short-title-") == 0 ) {
			video_id = parseId(els[i].href);
			if ( video_id != "" ) appendJS("http://gdata.youtube.com/feeds/api/videos?v=2&max-results=1&safeSearch=none&q=" + video_id + "&alt=json-in-script&callback=jsonCallBackSearchResultsLink");
		//}
	}	
}, false);

