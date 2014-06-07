// ==UserScript==
// @name          Enhance Twitter
// @author        Vishal V. Shah
// @homepage      http://vishalshah.org
// @license       Apache 2.0 - http://www.apache.org/licenses/LICENSE-2.0
// @version       2.1 (4/14/2009 - 10:07 AM PST)
// @copyright     2009- Vishal V. Shah (vishal@vishalshah.org)
// @namespace     http://vishalshah.org/projects/greasemonkey/twitter
// @description   Enhance twitter.com by adding a search box with search suggestions to search tweets (uses search.twitter.com)
// @include       http://twitter.com/*
// @include       https://twitter.com/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var gm_debug = false;
if (gm_debug) { GM_log("Using jQuery version: " + $().jquery); }
var suggestionsActive = true;
var timerOn = false;
const twitterUserReferenceRegexp = new RegExp("@(\\S+)", "g");
const topicReferenceRegexp = new RegExp("#(\\S+)", "g");
const urlRegexp = new RegExp("(http://\\S+)", "i");  // [\s|$]
const twitterUrl = "http://twitter.com/";
const searchTwitterTopicUrl = "http://search.twitter.com/search?q=%23";

var header = $("#logo");
var searchBox = '<form id="vshah_searchform" method="get" action="http://search.twitter.com/search" style="display: inline;">';
searchBox += '<input value="Search what\'s happening..." name="q" id="vshah_searchbox" autocomplete="off" maxlength="256" style="width: 180px; position: relative; top: -10px; padding: 4px; border: 3px solid rgb(51,204,255); -moz-border-radius:5px; font-size: 13px; color: #666666" />';
searchBox += '</form>';
header.after(searchBox);
var vshah_searchbox = $("#vshah_searchbox");
vshah_searchbox.focus(function () {
    var currentQuery = $(this).attr("value");
    if (currentQuery == "Search what's happening...") {
        $(this).attr("value", "");
    }
});
vshah_searchbox.blur(function () {
    var currentQuery = $(this).attr("value");
    if (currentQuery == "") {
        $(this).attr("value", "Search what's happening...");
    }
});
vshah_searchbox.keyup(function (event) {
    var kw = $(this).attr("value");
    if (kw.length > 1) {
        if (! timerOn) {
            timerOn = true;
            if (gm_debug) { GM_log("Timer Set: Retrieving suggestions in a second.."); }
            setTimeout(getSearchResults, 1000);  // don't query more than a 1 sec
        }
    } else {
        hideSuggestions();
    }
});

var suggestionsTopPadding = "34px";
var suggestionsLeftPadding = "130px";
var currentUrl = document.location.href;
if (currentUrl == 'http://twitter.com/' || currentUrl == 'http://www.twitter.com/' || currentUrl == 'http://twitter.com' || currentUrl == 'http://www.twitter.com') {
    suggestionsTopPadding = "48px";
    suggestionsLeftPadding = "182px";
}
var suggestionsList = '<ul id="gm_suggestions" style="position: absolute; top: ' + suggestionsTopPadding + '; left: ' + suggestionsLeftPadding + '; width: 256px; padding: 4px; background-color: rgb(160,230,220); font-size: 11px; border: 1px solid #AAAAAA; z-index: 99; -moz-border-radius:10px;"></ul>';
vshah_searchbox.after(suggestionsList);
hideSuggestions();

function getSearchResults() {
    var query = vshah_searchbox.attr("value");
    if (query && query.length > 0) {
        if (gm_debug) { GM_log("Requesting results for query: " + query); }
        GM_xmlhttpRequest({
            method:"GET",
            url:"http://search.twitter.com/search.json?q=" + query,
            headers:{ "User-Agent":"Mozilla/5.0","Accept":"text/x-json" },
            onload:function(response) {
                if (response && response.status == 200 && response.responseText && response.responseText.length > 0) {
                    var responseObj = JSON.parse(response.responseText);
                    var results = responseObj.results;
                    if (gm_debug) { GM_log("==> Response status: " + response.status); }
                    if (results && results.length > 0) {
                        hideSuggestions();
                        if (gm_debug) { GM_log("==> Number of results returned: " + results.length); }
                        var suggestionsList = $("#gm_suggestions");
                        suggestionsList.append("<li id='gm_closeSuggestionsLink' style='padding: 0px; margin: 0px; text-align: right; text-size: 10px; color: #C0C0C0; border-bottom: 1px solid #AAAAAA;'><a href='http://twitter.com'>Close</a></li>");
                        $("#gm_closeSuggestionsLink").click(function() {
                            hideSuggestions();
                            return false;
                        });
                        var userUrl = "", tweet = "", originalTweet = "", userMatches = null, linkedUser = "", linkedTopic = "", linkedUserUrl = "", linkedTopicUrl = "", urlMatches = null, topicMatches = null, matchedUrl = "", linkedUrl = "";
                        jQuery.each(results, function(i, r) {
                            if (i < 7) {
                                userUrl = "http://twitter.com/" + r.from_user;
                                tweet = r.text;
                                if (gm_debug) { GM_log("Updating @user, #topic and url links.."); }
                                urlMatches = urlRegexp.exec(tweet);
                                if (urlMatches && urlMatches.length > 0) {
                                    matchedUrl = urlMatches[0];
                                    linkedUrl =  '<a href="' + matchedUrl + '">' + matchedUrl + '</a>';
                                    tweet = tweet.replace(matchedUrl, linkedUrl);
                                }
                                
                                originalTweet = tweet;
                                userMatches = twitterUserReferenceRegexp.exec(originalTweet);
                                while (userMatches != null) {
                                    if (userMatches && userMatches.length > 0) {
                                        linkedUser = $.trim(userMatches[0]);  // trim since regex includes a trailing space
                                        linkedUserUrl = '<a href="' + (twitterUrl + userMatches[1]) + '">' + linkedUser + '</a>';
                                        tweet = tweet.replace(linkedUser, linkedUserUrl);
                                    }
                                    userMatches = twitterUserReferenceRegexp.exec(originalTweet.substring(originalTweet.lastIndex));
                                }
                                
                                originalTweet = tweet;
                                topicMatches = topicReferenceRegexp.exec(originalTweet);
                                while (topicMatches != null) {
                                    if (topicMatches && topicMatches.length > 0) {
                                        linkedTopic = $.trim(topicMatches[0]);
                                        linkedTopicUrl = '<a href="' + (searchTwitterTopicUrl + topicMatches[1]) + '">' + linkedTopic + '</a>';
                                        tweet = tweet.replace(linkedTopic, linkedTopicUrl);
                                    }
                                    topicMatches = twitterUserReferenceRegexp.exec(originalTweet.substring(originalTweet.lastIndex));
                                }
                                suggestionsList.append("<li class='gm_suggest' style='border-bottom: 1px solid #AAAAAA; padding: 2px;'><a href='" + userUrl + "'><img height='48px' width='48px' style='float: left; padding-right: 4px;' src='" + r.profile_image_url + "' /> " + r.from_user + "</a> " + tweet + "<div style='clear: both;'></div></li>");
                            }
                        });
                        suggestionsList.append("<li id='gm_moreSuggestionsLink' style='padding: 0px; margin: 0px; text-align: right; text-size: 10px; color: #C0C0C0'><a href='http://search.twitter.com/search?q=" + responseObj.query + "'>More...</a></li>");
                        showSuggestions();
                    } else {
                        hideSuggestions();
                    }
                } else {
                    if (gm_debug) { GM_log("Server returned a status other tha 200 *or* response was empty. Server Staus: " + response.status + ". Forwarding to search.twitter.com..."); }
                    document.location.href = "http://search.twitter.com/search?q=" + query;
                }
            }
          });
    }
    if (gm_debug) { GM_log("Timer Reset."); }
    timerOn = false;  // reset timer
}

function hideSuggestions() {
    $("#gm_suggestions").empty();
    if (suggestionsActive) {
        $("#gm_suggestions").hide();
        suggestionsActive = false;
    }
}

function showSuggestions() {
    if (! suggestionsActive) {
        $("#gm_suggestions").show();
        $("li.gm_suggest").hover(
            function () {
                $(this).css({'background-color' : 'rgb(248,248,248)'});
            }, 
            function () {
                $(this).css({'background-color' : 'rgb(160,230,220)'});
            }
        );
        // $("li.gm_suggest:last").css({'border-bottom': 'none'});
        suggestionsActive = true;
    }
}

// json2.js minified - Souce: http://json.org/js.html
if(!this.JSON){JSON={};}
(function(){function f(n){return n<10?'0'+n:n;}
if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(key){return this.getUTCFullYear()+'-'+
f(this.getUTCMonth()+1)+'-'+
f(this.getUTCDate())+'T'+
f(this.getUTCHours())+':'+
f(this.getUTCMinutes())+':'+
f(this.getUTCSeconds())+'Z';};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf();};}
var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}
function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}
if(typeof rep==='function'){value=rep.call(holder,key,value);}
switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}
gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}
v=partial.length===0?'[]':gap?'[\n'+gap+
partial.join(',\n'+gap)+'\n'+
mind+']':'['+partial.join(',')+']';gap=mind;return v;}
if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==='string'){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}
v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+
mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}
if(typeof JSON.stringify!=='function'){JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}
rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}
return str('',{'':value});};}
if(typeof JSON.parse!=='function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}
return reviver.call(holder,key,value);}
cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+
('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}
if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}
throw new SyntaxError('JSON.parse');};}})();