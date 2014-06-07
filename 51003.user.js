// ==UserScript==
// @name           Twitter Trends Explained
// @fullname       Twitter Trends Explained
// @namespace      http://userscripts.org/scripts/show/51003
// @description    Adds a tooltip to each 'Trending Topic' to let you know what the trend is all about (using the 'What The Trend?' service).
// @include        http://twitter.com/*
// @include        http://search.twitter.com/*
// @version        2009-07-26
// ==/UserScript==

// version used by twitter internally
var TWITTER_JQUERY_SCRIPT = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3.0/jquery.min.js';
var TWITTER_TIPSY_STYLE = ".tipsy{opacity:.8;filter:alpha(opacity=80);background-repeat:no-repeat;padding:5px;}.tipsy-inner{padding:8px 8px;max-width:200px;font:11px 'Lucida Grande',sans-serif;font-weight:bold;-moz-border-radius:4px;-khtml-border-radius:4px;-webkit-border-radius:4px;border-radius:4px;background-color:#000;color:white;text-align:left;}.tipsy-north{background-image:url(http://static.twitter.com/images/tipsy/tipsy-north.gif);background-position:top center;}.tipsy-south{background-image:url(http://static.twitter.com/images/tipsy/tipsy-south.gif);background-position:bottom center;}.tipsy-east{background-image:url(http://static.twitter.com/images/tipsy/tipsy-east.gif);background-position:right center;}.tipsy-west{background-image:url(http://static.twitter.com/images/tipsy/tipsy-west.gif);background-position:left center;}";
var TWITTER_TIPSY_SCRIPT = "http://assets1.twitter.com/javascripts/lib/tipsy/src/javascripts/jquery.tipsy.js";

// search.twitter.com does not inject jQuery, so we need to do
if (document.URL.substring(0,13) == "http://search") {
  var scriptJQuery = document.createElement('script');
  scriptJQuery.type = 'text/javascript';
  scriptJQuery.src = TWITTER_JQUERY_SCRIPT;
  document.getElementsByTagName('head')[0].appendChild(scriptJQuery);
  
  var styleTipsy = document.createElement('style');
  styleTipsy.type = 'text/css';
  styleTipsy.appendChild(document.createTextNode(TWITTER_TIPSY_STYLE));
  document.getElementsByTagName('head')[0].appendChild(styleTipsy);
}

function waitForJQuery() {
  if (typeof unsafeWindow.jQuery == 'undefined') {
    window.setTimeout(waitForJQuery, 100); 
  } else { 
    $ = unsafeWindow.jQuery; 
    execJQuery();
  }
}
unsafeWindow.alert = function alert(message) {}; 
waitForJQuery();

function explainTrends(linkElements, gravity) {
  $(linkElements).each(function(){
    var linkElement = this;
    var trendName = encodeURIComponent($(linkElement).text());
    var trendURL = "http://www.whatthetrend.com/api/trend/getByName/" + trendName + "/jsonp/callback=?";
    $.getJSON(trendURL, function(json){
      var explanation;
      try {
        explanation = (json.api.error) ? json.api.error : json.api.trend.blurb.text;
        if (!explanation) explanation = "Trend not explained yet.";
      } catch(ex) {
        explanation = "Sorry, could not get trend explanation."
      }
      createTooltip(linkElement, explanation, gravity);
    });
  });
}

function createTooltip(linkElement, explanation, gravity) {
  var trendElement = linkElement;
  if ($(trendElement).attr('title') != '') {
    trendElement = $(linkElement).parent();
  }
  $(trendElement).attr('title', explanation);
  $(trendElement).tipsy({gravity: gravity});
}

function execJQuery() {
  // twitter relies on tipsy by itself, but only on the follower page
  $.getScript(TWITTER_TIPSY_SCRIPT, function(){
    explainTrends('#hot p a', 'n');
    explainTrends('#hot li a', 'e');
    explainTrends('.trends-links li a', 'e');
  });
}


