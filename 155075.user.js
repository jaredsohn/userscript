// ==UserScript==
// @name        OneClickMoviez Ad Bypass
// @namespace   http://userscripts.org/users/42897
// @description Bypass ads on OneClickMoviez.com
// @include     http*://*oneclickmoviez.com/*
// @grant       GM_xmlhttpRequest
// @require     http://code.jquery.com/jquery-latest.min.js
// @version     0.12
// @updateURL   https://userscripts.org/scripts/source/155075.user.js
// ==/UserScript==
//
// auther:  nick_name{RES}
//
// version: 0.12
// 7:30 AM Friday, February 22, 2013 (GMT) 
// changes: + Uncloaks megaline.co urls
//
// version: 0.11
// 9:48 AM Saturday, February 9, 2013 (GMT)
// changes: + Fixed a bug that'll force the search-box to always 
//            lose focus.
//          + Minor UI change.
//
// version: 0.10
// date: 12:50 PM Saturday, January 19, 2013 (GMT)
// changes: + Uncloacks miniurl.co urls
//          + Blocks clicksor ads
//
// version: 0.9
// date: 4:32 PM Friday, January 11, 2013 (GMT)
// changes: + Minor bug fixed in uncloaking linkbucks.com
//
// version: 0.8
// date: 11:27 AM Thursday, January 10, 2013 (GMT)
// changes: + Added support linkbucks.com redirects
//          + Added support for pastebay.net multiple links
//          + Fixed some bugs.
//
// version: 0.7
// date: 9:40 AM Wednesday, January 2, 2013 (GMT)
// changes: + Added support for pages with both cloaked and non-cloaked links.
//
// version: 0.6
// date: 6:29 AM Monday, December 31, 2012 (GMT)
// changes: + Placed the search-box on top (was mistakenly hidden before).
//
// version: 0.5
// date: 6:40 PM Sunday, December 30, 2012 (GMT)
// changes: + Firefox freezing issue solved. Links are fetched as they are visible on the screen.
//          + commented out screenshot fetching code. User can uncomment if wishes to.
//
// version: 0.4
// date: 11:55 AM Sunday, December 30, 2012 (GMT)
// changes: + added timeout to minimize freezing of Firefox on large number of links (issue needs more investigation)
//
// version: 0.3
// date: 11:05 AM Sunday, December 30, 2012 (GMT)
// changes: + added spinner to notify link fetching in the background
//
// version: 0.2
// date: 4:53 PM Saturday, December 29, 2012 (GMT)
// changes: + support for multiple links per one-click site
//          + add IMDB rating
//          + fetch screenshots
//
// version: 0.1
// date: 3:06 PM Thursday, December 27, 2012 (GMT)
// changes: + first version.
//

var DEBUG = true;
var spinner_bw = "data:image/gif;base64,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";

$(document).ready(function(){
  uncloackUrl();
  verboseImdb();
  loopCleanAds();
});

$(parent.document).scroll(function(){
  uncloackUrl();
  verboseImdb();
});

function loopCleanAds() {
  if ($("input#s").is(":focus") == false) {
    fancifyPage();
    disableClicksorAds();
  }
  window.setTimeout(loopCleanAds, 1000)
}

function debugLog(msg) {
  if(DEBUG == true) {
    console.debug(msg);
  }
}

function verboseImdb() {
  jQuery.each(jQuery("a"), function(i, link){
    if (link.href.indexOf("imdb") >= 0) {
      if (isOnScreen(link) && $(link).data("fetched") != 1) {
        addSpinner(link, "imdb" + i);
        setImdbInfoOnElement(link.href, link);
        link.style.fontFamily = 'monospace';
        link.style.color = 'blue';
      }
    }
  });
}

function fetchScreenshot() {
  regex = new RegExp('/.*/', 'i');
  $.each($("a[href*='screenshots.oneclickmoviez.com']"), function(i, link) {
    if (document.location.pathname.search(regex) >=0) {
      if ($(link).data("fetched") != 1) {
        $(link).data("fetched", 1);
        GM_xmlhttpRequest({
          method: "GET",
          url: link.href,
          onload: function(response) {
            img = $("div.separator > img", response.responseText);
            $(link).append(img);
          }
        });
      }
    }
  });
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

function fancifyPage() {
  $("#searchform").appendTo("#myslides");

  $("[src*='anonymize.js']").remove();
  $("script[src*='clicksor']").remove();
  $("noscript").remove();
  $(".top").remove();
  $(".ad").remove();
  $(".sidebar").remove();
  $("#comments").remove();
  $("textarea").remove();
  $("#footer").remove();
  $("#topbar").remove();
  $("#bug.surrogate").remove();
  $('[href*="trendcounter.com"]').remove();
  $('[src*="clicksor"]').remove();

  $("#content").css("float", "none");
  $("#content").css("margin-left", "auto");
  $("#content").css("margin-right", "auto");
  $(".content > img").css("margin-left", "auto");
  $(".content > img").css("margin-right", "auto");
}

function addSpinner(elem, index) {
  $(elem).append("<span id='spinner_"+ index +"'><img width='16px' height='16px' src='" + spinner_bw + "' alt='Loading...'></span>");
  $(elem).data("fetched", 1);
}

function removeSpinner(index) {
  $("#spinner_" + index).remove();
}

function uncloackUrl() {
  var links = $("a[href*='oneclickmoviez.com/dws/']");

  for(var k = 0; k < links.length; k++) {
    if (isOnScreen($(links[k])) && $(links[k]).data("fetched") != 1) {
      console.debug('fetching --> ' + links[k].href);
      addSpinner($(links[k]), k);

      GM_xmlhttpRequest({
        method: "HEAD",
        url: links[k] + "?_" + new Date().getTime(),
        onload: function (response) {
          var request_url = this.url.split('?')[0];
          debugLog("response.finalUrl --> " + response.finalUrl + " input:" + request_url);
          // debugLog("response.responseText --> " + response.responseText);
          // debugLog("response.responseHeaders --> " + response.responseHeaders);

          var html = response.responseText;

          if (response.finalUrl.indexOf("wplc_redirector.php") >= 0) {
            debugLog("inside wplc_redirector ...");
            var redir_url = html.replace(new RegExp('.* SRC="(.*)" width=.*', 'i'), '$1');
            var hidden_url = redir_url.split('?')[1];
            debugLog("hidden_url --> " + hidden_url);
            var cloaked_url_id = response.finalUrl.replace(new RegExp('.*cloaked_url=(.*).*', 'i'), '$1');
            debugLog("cloaked_url_id --> " + cloaked_url_id);
            link = $('a[href*="' + cloaked_url_id + '"]')[0];
            debugLog("FOUND -->" + link.href);
          }

          else if (response.finalUrl.indexOf("linkbucks.com") >= 0) {
            debugLog("inside linkbucks ... request_url: " + request_url, true);
            var hidden_url = response.finalUrl.replace(new RegExp(".*linkbucks.com/url/(.*)", "i"), "$1");
            debugLog("hidden_url --> " + hidden_url);
            var cloaked_url_id = request_url.replace(new RegExp(".*oneclickmoviez.com/(.*)", "i"), "$1");
            debugLog("cloaked_url_id --> " + cloaked_url_id);
            link = $('a[href*="' + cloaked_url_id + '"]')[0];
            debugLog("FOUND -->" + link.href);
          }

          else if (response.finalUrl.indexOf("miniurls.co") >= 0) {
            debugLog("inside miniurls.co ... request_url: " + request_url, true);
            var hidden_url = response.finalUrl.replace(new RegExp(".*miniurls.co/verify/url/(.*)", "i"), "$1");
            debugLog("hidden_url --> " + hidden_url);
            var cloaked_url_id = request_url.replace(new RegExp(".*oneclickmoviez.com/(.*)", "i"), "$1");
            debugLog("cloaked_url_id --> " + cloaked_url_id);
            link = $('a[href*="' + cloaked_url_id + '"]')[0];
            debugLog("FOUND -->" + link.href);
          }

          else if (response.finalUrl.indexOf("megaline.co") >= 0) {
            debugLog("inside megaline.co ... request_url: " + request_url, true);
            var hidden_url = response.finalUrl.replace(new RegExp(".*megaline.co/url/(.*)", "i"), "$1");
            debugLog("hidden_url --> " + hidden_url);
            var cloaked_url_id = request_url.replace(new RegExp(".*oneclickmoviez.com/(.*)", "i"), "$1");
            debugLog("cloaked_url_id --> " + cloaked_url_id);
            link = $('a[href*="' + cloaked_url_id + '"]')[0];
            debugLog("FOUND -->" + link.href);
          }

          else {
            var request_url = this.url.split('?')[0];
            debugLog("inside generic ... ");
            var hidden_url = response.finalUrl;
            var link =  $('a[href*="' + request_url + '"]')[0];
            debugLog("FOUND -->" + link.href);
          }

          link.href = hidden_url;
          link.text = link.text; // + " - " + hidden_url;
          link.style.fontFamily = 'monospace';
          link.style.color = 'blue';

          // if (hidden_url.search(new RegExp('pastebay', 'i')) >= 0) {
          //   uncloakPastebay(hidden_url, link);
          // }

          if (hidden_url.search(new RegExp('imdb', 'i')) >= 0) {
            setImdbInfoOnElement(hidden_url, link);
          }

          $(link).data("fetched", 1);
          removeSpinner(k);
        }
      });
    }
  }
}

function uncloakPastebay(pastebay_url, link) {
  debugLog("uncloakPastebay() --> pastebay_url:" + pastebay_url + " " + link.href);
  GM_xmlhttpRequest({
  method: "GET",
  url: pastebay_url + "?_" + new Date().getTime(),
  onload: function (response) {
      pastebay_code = $("textarea#code", $(response.responseText));
      debugLog("uncloakPastebay() --> " + $(pastebay_code).text());
      $(link).parent().append( "<br /> <code>" + $(pastebay_code).text() + "</code>");
    }
  });
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

function disableClicksorAds() {
  document.cookie = "clicksorPop=yes";

  $("body[id*='Yinterstitial']").remove();
  $("body").css("display", "block");
  unsafeWindow.clicksor_enable_inter = false;
  unsafeWindow.clicksor_enable_adhere = false;
  unsafeWindow.clicksor_enable_pop = false;
  unsafeWindow.clicksor_enable_text_link = false;
  unsafeWindow.clicksor_enable_VideoAd = false;
  unsafeWindow.clicksor_layer_banner = false;
  unsafeWindow.clicksor_frequencyCap = 0;
  unsafeWindow.clicksor_hourcap = 0;
  unsafeWindow.clicksor_showcap = 0;
  unsafeWindow.clicksor_maxad = 0;
}