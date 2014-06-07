// ==UserScript==
// @name       		5trick3n's PUREddit for battlelog
// @namespace  		http://userscripts.org/scripts/show/293056
// @version    		0.04
// @description  	Displays r/purebattlefield on battlelog
// @match      		http://battlelog.battlefield.com/bf4*
// @require    		http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @require    		https://gist.github.com/raw/2625891/waitForKeyElements.js
// @downloadURL		http://userscripts.org/scripts/source/293056.user.js
// @grant GM_addStyle
// ==/UserScript==

/*
 *Change Log
 * 0.04 added weekly post colors
 * 0.03 Fixed null author flair values being displayed
 * 0.02 Added styles for event-flaired posts
 */

/*
 * Lib
 */

//function that sets elements display: none via class
GM_addStyle("\
.hideThis {\
	display:none !important;}\
");

function hideThis(jNode) {
    $(jNode).addClass("hideThis");
}

//display XHR results in cosole
function sampleXHR(pageURL) {
    GM_xmlhttpRequest({
        method: "GET",
        url: pageURL,
        onload: function (response) {
            console.log(pageURL, "Success:", "\n Status:", response.status, response.statusText);
            console.log(response.responseText);
        }
    });
}

/**
 * Timeago is a jQuery plugin that makes it easy to support automatically
 * updating fuzzy timestamps (e.g. "4 minutes ago" or "about 1 day ago").
 *
 * @name timeago
 * @version 1.3.1
 * @requires jQuery v1.2.3+
 * @author Ryan McGeary
 * @license MIT License - http://www.opensource.org/licenses/mit-license.php
 *
 * For usage and examples, visit:
 * http://timeago.yarp.com/
 *
 * Copyright (c) 2008-2013, Ryan McGeary (ryan -[at]- mcgeary [*dot*] org)
 */

(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], factory);
  } else {
    // Browser globals
    factory(jQuery);
  }
}(function ($) {
  $.timeago = function(timestamp) {
    if (timestamp instanceof Date) {
      return inWords(timestamp);
    } else if (typeof timestamp === "string") {
      return inWords($.timeago.parse(timestamp));
    } else if (typeof timestamp === "number") {
      return inWords(new Date(timestamp));
    } else {
      return inWords($.timeago.datetime(timestamp));
    }
  };
  var $t = $.timeago;

  $.extend($.timeago, {
    settings: {
      refreshMillis: 60000,
      allowFuture: false,
      localeTitle: false,
      cutoff: 0,
      strings: {
        prefixAgo: null,
        prefixFromNow: null,
        suffixAgo: "ago",
        suffixFromNow: "from now",
        seconds: "less than a minute",
        minute: "about a minute",
        minutes: "%d minutes",
        hour: "about an hour",
        hours: "about %d hours",
        day: "a day",
        days: "%d days",
        month: "about a month",
        months: "%d months",
        year: "about a year",
        years: "%d years",
        wordSeparator: " ",
        numbers: []
      }
    },
    inWords: function(distanceMillis) {
      var $l = this.settings.strings;
      var prefix = $l.prefixAgo;
      var suffix = $l.suffixAgo;
      if (this.settings.allowFuture) {
        if (distanceMillis < 0) {
          prefix = $l.prefixFromNow;
          suffix = $l.suffixFromNow;
        }
      }

      var seconds = Math.abs(distanceMillis) / 1000;
      var minutes = seconds / 60;
      var hours = minutes / 60;
      var days = hours / 24;
      var years = days / 365;

      function substitute(stringOrFunction, number) {
        var string = $.isFunction(stringOrFunction) ? stringOrFunction(number, distanceMillis) : stringOrFunction;
        var value = ($l.numbers && $l.numbers[number]) || number;
        return string.replace(/%d/i, value);
      }

      var words = seconds < 45 && substitute($l.seconds, Math.round(seconds)) ||
        seconds < 90 && substitute($l.minute, 1) ||
        minutes < 45 && substitute($l.minutes, Math.round(minutes)) ||
        minutes < 90 && substitute($l.hour, 1) ||
        hours < 24 && substitute($l.hours, Math.round(hours)) ||
        hours < 42 && substitute($l.day, 1) ||
        days < 30 && substitute($l.days, Math.round(days)) ||
        days < 45 && substitute($l.month, 1) ||
        days < 365 && substitute($l.months, Math.round(days / 30)) ||
        years < 1.5 && substitute($l.year, 1) ||
        substitute($l.years, Math.round(years));

      var separator = $l.wordSeparator || "";
      if ($l.wordSeparator === undefined) { separator = " "; }
      return $.trim([prefix, words, suffix].join(separator));
    },
    parse: function(iso8601) {  //hacked for unix timestamp
  if ((iso8601 - 0) == iso8601 && iso8601.length > 0) { // Checks if iso8601 is a unix timestamp  
    var s = new Date(iso8601);  
    if (isNaN(s.getTime())) { // Checks if iso8601 is formatted in milliseconds  
      var s = new Date(iso8601 * 1000); //if not, add milliseconds 
    }
    return s;  
  }  

  var s = $.trim(iso8601);
  s = s.replace(/-/,"/").replace(/-/,"/");
  s = s.replace(/T/," ").replace(/Z/," UTC");
  s = s.replace(/([\+-]\d\d)\:?(\d\d)/," $1$2"); // -04:00 -> -0400
  return new Date(s);
},
    datetime: function(elem) {
      var iso8601 = $t.isTime(elem) ? $(elem).attr("datetime") : $(elem).attr("title");
      return $t.parse(iso8601);
    },
    isTime: function(elem) {
      // jQuery's `is()` doesn't play well with HTML5 in IE
      return $(elem).get(0).tagName.toLowerCase() === "time"; // $(elem).is("time");
    }
  });

  // functions that can be called via $(el).timeago('action')
  // init is default when no action is given
  // functions are called with context of a single element
  var functions = {
    init: function(){
      var refresh_el = $.proxy(refresh, this);
      refresh_el();
      var $s = $t.settings;
      if ($s.refreshMillis > 0) {
        this._timeagoInterval = setInterval(refresh_el, $s.refreshMillis);
      }
    },
    update: function(time){
      var parsedTime = $t.parse(time);
      $(this).data('timeago', { datetime: parsedTime });
      if($t.settings.localeTitle) $(this).attr("title", parsedTime.toLocaleString());
      refresh.apply(this);
    },
    updateFromDOM: function(){
      $(this).data('timeago', { datetime: $t.parse( $t.isTime(this) ? $(this).attr("datetime") : $(this).attr("title") ) });
      refresh.apply(this);
    },
    dispose: function () {
      if (this._timeagoInterval) {
        window.clearInterval(this._timeagoInterval);
        this._timeagoInterval = null;
      }
    }
  };

  $.fn.timeago = function(action, options) {
    var fn = action ? functions[action] : functions.init;
    if(!fn){
      throw new Error("Unknown function name '"+ action +"' for timeago");
    }
    // each over objects here and call the requested function
    this.each(function(){
      fn.call(this, options);
    });
    return this;
  };

  function refresh() {
    var data = prepareData(this);
    var $s = $t.settings;

    if (!isNaN(data.datetime)) {
      if ( $s.cutoff == 0 || distance(data.datetime) < $s.cutoff) {
        $(this).text(inWords(data.datetime));
      }
    }
    return this;
  }

  function prepareData(element) {
    element = $(element);
    if (!element.data("timeago")) {
      element.data("timeago", { datetime: $t.datetime(element) });
      var text = $.trim(element.text());
      if ($t.settings.localeTitle) {
        element.attr("title", element.data('timeago').datetime.toLocaleString());
      } else if (text.length > 0 && !($t.isTime(element) && element.attr("title"))) {
        element.attr("title", text);
      }
    }
    return element.data("timeago");
  }

  function inWords(date) {
    return $t.inWords(distance(date));
  }

  function distance(date) {
    return (new Date().getTime() - date.getTime());
  }

  // fix for IE6 suckage
  document.createElement("abbr");
  document.createElement("time");
}));


/*
*
*END timeago
*/
//=====================purebattlefield reddit

//==Make room for new widget

//$("#top-tiles .topstory").addClass("hideThis");

//restyles
//GM_addStyle("\
//#top-tiles {\
//    width: 321px;\
//    margin-left: 0;\
//    float: right;\
//}\
//#top-tiles .span2 {\
//    width: 321px;\
//}\
//.main-header .suggestions .suggestion {\
//    width: 105px;\
//}\
//");
//new styles
GM_addStyle("\
#top-tiles {\
    margin-bottom: 8px;\
}\
");
GM_addStyle("\
#pure-reddit{\
    margin-top: 1px;\
    width: 100%;\
    }\
.pure-thing {\
    background-color: rgba(7,7,7,0.5);\
    margin-top: 1px;\
    padding-top: 8px;\
    padding-bottom: 8px;\
    color: rgb(168, 168, 168);\
    overflow: auto;\
    }\
.pure-votes {\
    float: left;\
    margin-top: 17px;\
    width: 50px;\
    text-align: center;\
    font-size: 16px;\
    font-family: Purista,sans-serif;\
    }\
.pure-thumbnail{\
    float: left;\
    width: 70px;\
    display: block;\
    text-align: center;\
    }\
.pure-thumbnail svg path{\
    fill:rgba(171, 206, 240, 0.9);\
    }\
.pure-domain{\
    font-size: 10px;\
    color: rgb(168, 168, 168);\
    }\
a.pure-title{\
    color: rgb(213, 221, 229);\
    font-size: 18px;\
    font-family: Purista, sans-serif;\
    }\
a.pure-title:visited{\
    color: rgb(162, 162, 162);\
    }\
.pure-entry {\
    overflow: hidden;\
    display: block;\
    padding-left: 13px;\
    }\
.pure-time {\
    font-size: 10px;\
            }\
.pure-author {\
    font-size: x-small;\
    color: rgb(213, 221, 229);\
            }\
.pure-comments {\
    font-size: 11px;\
    font-weight: bold;\
    color: rgb(168, 168, 168);\
            }\
.pure-flair{\
    font-size: 10px;\
    font-weight: bold;\
    \
    }\
");

//special post classes (announce etc) must go after defaults to override

GM_addStyle("\
.pure-thing.announce{\
    background-color: rgba(9, 34, 11, 0.52);\
    }\
.pure-thing.announce a.pure-title{\
    color: rgb(75, 206, 57);\
    }\
.pure-thing.announce svg path{\
    fill: rgb(24, 196, 0);\
    }\
.pure-thing.event{\
    background-color: rgba(53, 53, 22, 0.66);\
    }\
.pure-thing.event a.pure-title{\
    color: #ECEC69;\
    }\
.pure-thing.event svg path{\
    fill: #ECEC69;\
    }\
.pure-thing.weekly{\
    background-color: rgba(0, 52, 162, 0.22);\
    }\
.pure-thing.weekly a.pure-title{\
    color: rgb(65, 189, 238);\
    }\
.pure-thing.weekly svg path{\
    fill: rgb(24, 190, 255);\
    }\
");


//==post icon SVGs

var svgSelfPost = '<svg version="1.1" preserverAspectRatio="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\
\
	 width="50px" height="50px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve">\
\
<path id="speech-bubble-3-icon" fill="" d="M256,65.353c-108.81,0-206,73.248-206,173.431c0,35.533,12.684,70.421,35.135,97.493\
\
	C86.083,368,67.583,413.5,50.918,446.647c44.665-8.147,108.165-26.147,136.963-43.95C346.438,441.636,462,343.677,462,238.783\
\
	C462,138.051,364.132,65.353,256,65.353z M180.527,270.028c-15.188,0-27.5-12.312-27.5-27.5s12.312-27.5,27.5-27.5\
\
	s27.5,12.312,27.5,27.5S195.716,270.028,180.527,270.028z M262.527,270.028c-15.188,0-27.5-12.312-27.5-27.5s12.312-27.5,27.5-27.5\
\
	s27.5,12.312,27.5,27.5S277.716,270.028,262.527,270.028z M343.527,270.028c-15.188,0-27.5-12.312-27.5-27.5s12.312-27.5,27.5-27.5\
\
	s27.5,12.312,27.5,27.5S358.716,270.028,343.527,270.028z"/>\
\
</svg>\
';
var svgDefaultPost = '<svg version="1.1" preserverAspectRatio="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\
\
	 width="50px" height="50px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve">\
\
<path id="help-5-icon" d="M256,65.353c-108.81,0-206,73.248-206,173.431c0,35.533,12.684,70.421,35.135,97.493\
\
	C86.083,368,67.583,413.5,50.918,446.647c44.665-8.147,108.165-26.147,136.963-43.95C346.438,441.636,462,343.677,462,238.783\
\
	C462,138.051,364.132,65.353,256,65.353z M261.707,343.211c-12.264,0-22.21-9.947-22.21-22.215c0-12.262,9.946-22.205,22.21-22.205\
\
	c12.268,0,22.211,9.943,22.211,22.205C283.918,333.264,273.975,343.211,261.707,343.211z M279.17,277.562v3.994c0,0-33.3,0-36.613,0\
\
	v-3.994c0-11.307,1.65-25.809,14.775-38.418c13.127-12.61,29.53-23.027,29.53-38.78c0-17.415-12.085-26.627-27.325-26.627\
\
	c-25.393,0-27.051,26.335-27.677,32.134h-35.61C197.199,178.41,208.805,140,259.75,140c44.15,0,64,29.568,64,57.296\
\
	C323.75,241.431,279.17,249.097,279.17,277.562z"/>\
\
</svg>\
';
var svgAnnounce = '<svg version="1.1" preserverAspectRatio="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\
\
	 width="50px" height="50px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve">\
\
<path id="speech-bubble-11-icon" d="M50,64.991v293.682h64.501v88.336l131.978-88.336H462V64.991H50z M256,283.567H121.841v-30H256\
\
	V283.567z M391.841,223.567h-270v-30h270V223.567z M391.841,163.567h-270v-30h270V163.567z"/>\
\
</svg>\
';
var svgAnnounce2 ='<svg version="1.1" preserverAspectRatio="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\
\
	 width="50px" height="50px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve">\
\
<path id="warning-4-icon" d="M228.55,134.812h54.9v166.5h-54.9V134.812z M256,385.188c-16.362,0-29.626-13.264-29.626-29.625\
\
	c0-16.362,13.264-29.627,29.626-29.627c16.361,0,29.625,13.265,29.625,29.627C285.625,371.924,272.361,385.188,256,385.188z M256,90\
\
	c91.742,0,166,74.245,166,166c0,91.741-74.245,166-166,166c-91.742,0-166-74.245-166-166C90,164.259,164.245,90,256,90z M256,50\
\
	C142.229,50,50,142.229,50,256s92.229,206,206,206s206-92.229,206-206S369.771,50,256,50z"/>\
\
</svg>';

//==Add HTML
waitForKeyElements("#content .base-middle-content .span8 nav", function () {
    $("#bottom-tiles").addClass("hideThis");
    $(".main-header .playbar").addClass("hideThis");

    
    $("#content .base-middle-content .span8 nav li:first")
    .removeClass("active")
    .before('\
        <li id="pure-feed" class="active"><a>Pure Battlefield</a></li>\
        \
        ')
    .closest("ul").attr("id", "uf-feednav");

$("#main-loggedin-feed")
    .css("display", "none")
    .before('\
<div id="pure-reddit"></div>\
');

//==Fill it in

/*var avatarURL = function(battlelogName, size) {
    var url = "http://battlelog.battlefield.com/bf4/user/" + battlelogName;
};*/



pureDFD = $.Deferred();
$.ajax({
    url: "http://www.reddit.com/r/purebattlefield/hot.json",
    dataType: "json",
    data: {
        sort: "new"
        }
    })
    .fail(function () {
        console.log("get pure reddit data failed");
        })
    .done(function (redditData) {
      
        //add each thing
      
        var posts = redditData.data.children;
        var postNum = 0;
        $(posts).each(function () {
            var thing = this.data;
            $("#pure-reddit").append('\
                <div class="pure-thing p'+postNum+' '+thing.link_flair_css_class+'">\
                    <div class="pure-votes">' + thing.score + '</div>\
                    <a class="pure-thumbnail" href="' + thing.url + '">\
                        </a>\
                    <div class="pure-entry">\
                        <p class="pure-title">\
                            <a class="pure-title" href="'+thing.url+'">'+thing.title+'</a>\
                            <span class="pure-domain">\
                                ('+thing.domain+')\
                                </span>\
                            </p>\
                        <p class="pure-tagline">\
                            <time class="pure-time timeago" datetime="'+ thing.created_utc +'">' +
                                thing.created_utc +
                                '</time>\
                            <a class="pure-author" href="http://www.reddit.com/user/'+thing.author+'">' +
                                thing.author +
                                '</a>\
                            <span class="pure-flair">\
                                </span>\
                            </p>\
                        <ul class="pure-buttons">\
                            <li><a class="pure-comments" href="http://reddit.com'+thing.permalink+'">' +
                                thing.num_comments +
                                ' comments </a></li>\
                            </ul>\
                        </div>\
                    </div>\
                ');
            
            //author flair
          
            var thispost = ".pure-thing.p" + postNum;
            if (thing.author_flair_text) {
                $(thispost + " .pure-flair").html(
                    '<a href="http://battlelog.battlefield.com/bf4/user/'+thing.author_flair_text+'">' +
                                     thing.author_flair_text +
                                     '</a>');
            }
          
            //post image
          
            if(thing.link_flair_css_class) {
                $(thispost + " .pure-thumbnail").addClass("selfThumb").html(svgAnnounce2);
            }
            else if (thing.thumbnail === "self") {
                $(thispost + " .pure-thumbnail").addClass("selfThumb").html(svgSelfPost);
            }
            else if (thing.thumbnail === "default") {
                $(thispost + " .pure-thumbnail").addClass("defaultThumb").html(svgDefaultPost);
            }
            else {
                $(thispost + " .pure-thumbnail").html('<img src="' + thing.thumbnail + '"/>');
            }
            
            postNum++;
            });
        $("time.timeago").timeago(); //convert timestamps to timeago
        pureDFD.resolve();
    });

//==add new events for nav, done in deffered to get around 200 codeline function limit
pureDFD.done(function () {
    $("#uf-feednav #pure-feed").click(function(){
        $("#pure-reddit").css("display", "block");
        $("#main-loggedin-feed").css("display", "none");
        $("#main-loggedin-gameactivity").css("display", "none");
        });
    $('#uf-feednav li[data-target="feed"]').click(function(){
        $("#pure-reddit").css("display", "none");
        $("#main-loggedin-feed").css("display", "block");
        $("#main-loggedin-gameactivity").css("display", "none");
        });
    $('#uf-feednav li[data-target="gameactivity"]').click(function(){
        $("#pure-reddit").css("display", "none");
        $("#main-loggedin-feed").css("display", "none");
        $("#main-loggedin-gameactivity").css("display", "block");
        });
});
});





        


//=====================END purebattlefield reddit