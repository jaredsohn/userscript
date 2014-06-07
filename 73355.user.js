// ==UserScript==
// @name           Youtube: Show Video Rating Stars in Related Videos List
// @description    See the star ratings in the list of related videos that is shown on most video pages.  Avoid bad videos.
// @version        1.0.6
// @require        http://usocheckup.dune.net/73355.js
// @include        http://*youtube.com/*
// ==/UserScript==

function appendJS(strJsFile) {
	document.body.appendChild(document.createElement('script')).src = strJsFile;
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
unsafeWindow.jsonCallBackVideoLink = function jsonCallBackVideoLink(root) {
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
		vidlink = getLinkByHref("v=" + id + "&feature=");
		rating = Math.round(rating*10)/10;
		offset = getSpriteOffset(rating);
		starrating = Math.round(rating*2)/2;
		starrating = starrating.toFixed(1);
//		strRatingHTML = '<button class="master-sprite ratingVS ratingVS-' + starrating + '" title="' + starrating + '"></button>';
		strRatingHTML = '<div style="float: left; background: transparent url(\'http://s.ytimg.com/yt/img/master-vfl159389.png\') no-repeat ' + offset[0] + 'px ' + offset[1] + 'px; width: 60px; height: 14px; margin: -2px 5px;"></div>';
		strRatingHTML += '<span style="color:#bbb;font-size:11px">&nbsp; ' + rating.toFixed(1) + '&nbsp; (' + ratingCount + ' ratings)</span>'; 
		
		newDiv = document.createElement("div");
		newDiv.id = 'ratingstars-' + id;
		newDiv.style.marginLeft = "100px";
		newDiv.innerHTML = strRatingHTML;
		vidlink.appendChild(newDiv);
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
	var els = getElementsByClassName("video-list-item-link", "a");

	for (var i=0; i < els.length; i++) {
		if ( els[i].href.indexOf("feature=") > 1 ) {
			video_id = parseId(els[i].href);
			if ( video_id != "" ) appendJS("http://gdata.youtube.com/feeds/api/videos?v=2&max-results=1&safeSearch=none&q=" + video_id + "&alt=json-in-script&callback=jsonCallBackVideoLink");
		}
	}	
}, false);
