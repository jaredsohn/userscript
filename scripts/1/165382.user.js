// ==UserScript==
// @name        300mblinks.com Ad Bypass
// @namespace   http://userscripts.org/users/42897
// @description Bypass Ads and Uncloack URLs on 300mblinks.com
// @include     http://300mblinks.com/*
// @grant       GM_xmlhttpRequest
// @require     http://code.jquery.com/jquery-latest.min.js
// @version     0.02
// ==/UserScript==
//
// auther:  nick_name{RES}
//
// version: 0.02
// 10:10 PM Sunday, June 23, 2013 (GMT) 
// changes: 
//      + Minor fix to detect the cloaked URL
//
// version: 0.01
// 8:38 AM Saturday, April 20, 2013 (GMT) 
// changes: 
//      + Uncloacks hidden file-hosting links
//	+ Adds IMDB rating
//	+ Removes ads
//	+ Adds custom CSS for beautification
//

DEBUG = true;
function debugLog(msg) {
	if (DEBUG) {
		console.debug(msg);
	}
}

var keyStr = "ABCDEFGHIJKLMNOP" +
             "QRSTUVWXYZabcdef" +
             "ghijklmnopqrstuv" +
             "wxyz0123456789+/" +
             "=";

var tickIcon = 'data:image/png;base64,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';
var spinner_bw = "data:image/gif;base64,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";

$(document).ready(function(){
  uncloackUrl();
  verboseImdb();
  fancifyPage();
});

$(parent.document).scroll(function(){
  uncloackUrl();
  verboseImdb();
  fancifyPage();
});

function fancifyPage() {
	$('div#wrapper, .entry-title').css({
		'font-family' : 'Segoe UI, Frutiger, Lucida Grande, Tahoma, sans-serif',
	});
	$('#branding').remove();
	$('.entry-utility').remove();
	$('.author, .meta-sep').remove();
	$('#site-description + img').remove();
	$('a:contains("About US")').remove();
	$('#___plusone_0').remove();
	$('.twitter-share-button').remove();
	$('.twitter-count-horizontal').remove();
	$('#masthead > div').first().remove();
	
	$('pre').css({'padding' : '5px', 'overflow-x' : 'hidden'});
	$('.widget_search #s').width('100%');
}

function encode64(input) {
 input = escape(input);
 var output = "";
 var chr1, chr2, chr3 = "";
 var enc1, enc2, enc3, enc4 = "";
 var i = 0;

 do {
    chr1 = input.charCodeAt(i++);
    chr2 = input.charCodeAt(i++);
    chr3 = input.charCodeAt(i++);

    enc1 = chr1 >> 2;
    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
    enc4 = chr3 & 63;

    if (isNaN(chr2)) {
       enc3 = enc4 = 64;
    } else if (isNaN(chr3)) {
       enc4 = 64;
    }

    output = output +
       keyStr.charAt(enc1) +
       keyStr.charAt(enc2) +
       keyStr.charAt(enc3) +
       keyStr.charAt(enc4);
    chr1 = chr2 = chr3 = "";
    enc1 = enc2 = enc3 = enc4 = "";
 } while (i < input.length);

 return output;
}

function decode64(input) {
 var output = "";
 var chr1, chr2, chr3 = "";
 var enc1, enc2, enc3, enc4 = "";
 var i = 0;

 // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
 var base64test = /[^A-Za-z0-9\+\/\=]/g;
 if (base64test.exec(input)) {
    debugLog("There were invalid base64 characters in the input text.\n" +
          "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
          "Expect errors in decoding.");
 }
 input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

 do {
    enc1 = keyStr.indexOf(input.charAt(i++));
    enc2 = keyStr.indexOf(input.charAt(i++));
    enc3 = keyStr.indexOf(input.charAt(i++));
    enc4 = keyStr.indexOf(input.charAt(i++));

    chr1 = (enc1 << 2) | (enc2 >> 4);
    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
    chr3 = ((enc3 & 3) << 6) | enc4;

    output = output + String.fromCharCode(chr1);

    if (enc3 != 64) {
       output = output + String.fromCharCode(chr2);
    }
    if (enc4 != 64) {
       output = output + String.fromCharCode(chr3);
    }

    chr1 = chr2 = chr3 = "";
    enc1 = enc2 = enc3 = enc4 = "";

 } while (i < input.length);

 return unescape(output);
}

function rewriteLink(a, href) {
    $(a)[0].href = href;
    $(a).css({'font-family' : 'Monospace', 'font-color' : 'blue'});
    $(a).text(href);
    addTick($(a));
}

function addTick(a) {
	$('<img src=' + tickIcon + '></img>').insertBefore($(a));
}

function verboseImdb() {
  jQuery.each(jQuery("a"), function(i, link){
    if (link.href.indexOf("imdb") >= 0) {
      if ($(link).data("fetched") != 1) {
        addSpinner(link, "imdb" + i);
        setImdbInfoOnElement(link.href, link);
        link.style.fontFamily = 'monospace';
        link.style.color = 'blue';
        $(link).parent().css("text-align", "center");
      }
    }
  });
}

function addSpinner(elem, index) {
  $(elem).append("<span id='spinner_"+ index +"'><img width='16px' height='16px' src='" + spinner_bw + "' alt='Loading...'></span>");
  $(elem).data("fetched", 1);
}

function removeSpinner(index) {
  $("#spinner_" + index).remove();
}

// Source: http://benpickles.github.com/onScreen/
function isOnScreen (elem) {
    var $window = $(window);
    var viewport_top = $window.scrollTop();
    var viewport_height = $window.height();
    var viewport_bottom = viewport_top + viewport_height;
    var $elem = $(elem);
    var top = $elem.offset().top;
    var height = $elem.height();
    var bottom = top + height;

    return (top >= viewport_top && top < viewport_bottom) ||
           (bottom > viewport_top && bottom <= viewport_bottom) ||
           (height > viewport_height && top <= viewport_top && bottom >= viewport_bottom);
}

// Source: http://userscripts.org/scripts/show/133917
function findImdbID(url) {
  var imdbLinkRegex = new RegExp('^http://.*imdb\.com\/title/(tt\\d+)', 'i');
  var imdbID = url.match(imdbLinkRegex);
  if(imdbID.length > 0) return imdbID[1];
  return null;
}

// Source: http://userscripts.org/scripts/show/133917
function extractMovieInfo(content) {
  var ratingMatch = content.match(/<span itemprop="ratingValue">(\d\.\d)<\/span>/);
  var voteCountMatch = content.match(/<span itemprop="ratingCount">([\d,]+)<\/span>/);
  var matched = ratingMatch !== null && ratingMatch.length > 0 && voteCountMatch !== null && voteCountMatch.length > 0;
  var movieInfoResult = {
    success: matched,
    rating: matched ? ratingMatch[1] : "",
    votecount: matched ? voteCountMatch[1] : ""
  };
  debugLog(movieInfoResult);
  return movieInfoResult;
}

// Source: http://userscripts.org/scripts/show/133917
function getMovieInfo(imdb_url, successCallback) {
  GM_xmlhttpRequest({
    method: "GET",
    url: imdb_url,
    onload: function(details) {
      successCallback(extractMovieInfo(details.responseText));
    }
  });
}

// Source: http://userscripts.org/scripts/show/133917
function setImdbInfoOnElement(imdbUrl, link) {
  debugLog("imdbUrl --> " + imdbUrl);
  if(findImdbID(imdbUrl) !== null) {
    debugLog("imdbId --> " + findImdbID(imdbUrl));
    getMovieInfo(imdbUrl, function(movieInfo) {
      if(movieInfo.success) {
        link.innerHTML = "IMDB rating: " + movieInfo.rating + "/10 (" + movieInfo.votecount + " votes)";
        link.href = imdbUrl;
      } else {
        link.innerHTML = "IMDB rating: not found";
      }
    });
  } else {
    link.innerHTML = "IMDB rating: not found";
  }
}

function uncloackUrl() {
	$("a[href*='downloadddd.php']").each(function(i, a){
	    var e = a.href.replace(new RegExp('.*?link='), '');
	    var d = decode64(e);
	    var h = d.replace(new RegExp('http:\/\/.*\/goto\/'), '');
	    rewriteLink(a, h); 
	});

  $("a[href*='download.php']").each(function(i, a){
      var e = a.href.replace(new RegExp('.*?link='), '');
      var d = decode64(e);
      var h = d.replace(new RegExp('http:\/\/.*\/goto\/'), '');
      rewriteLink(a, h); 
  });

	$("a[href*='\/goto\/']").each(function(i, a){
	    var h = a.href.replace(new RegExp('http:\/\/.*\/goto\/'), '');
	    rewriteLink(a, h);
	});
}
