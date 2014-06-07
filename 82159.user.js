// ==UserScript==
// @name           Twitter/Brizzly Tools Palette by @paul_shinn
// @description    A script that adds extra features to Twitter and Brizzly. See http://www.meklarian.com/mekfavelet/twitter-bookmarklets.html for more details.
//
// @include        http://www.twitter.com/*
// @include        http://twitter.com/*
// @include        http://www.brizzly.com/*
// @include        http://brizzly.com/*
//
// @version        0.01
//
// @history        0.01 Initial Translation from Bookmarklet
//
// ==/UserScript==

/* Adds handy features to Twitter / Brizzly to toggle and do neat stuff */
(function(){
$ = unsafeWindow.jQuery;
// Die quietly if no jQuery.
if($ === null){return;}

var paletteExists = $("#wtogglepalette").size();
if(paletteExists > 0){return;}
var twitterHeading = $("div#timeline_heading");
var isTwitter = twitterHeading.size();
var brizzlyHeading = $("div#nav");
var isBrizzly = brizzlyHeading.size();
var toggleReplies = function ()
  {
    var x=window._wtoggle||false;
    var y=$("li.status").filter(function (){return /@\w/.test($(this).text());});
    var z=$("div.notification-bar-container").filter(function (){return /@\w/.test($(this).text());});
    var q=$("a#xwtogglereplies");
    if(x!==true)
      {y.hide();z.hide();window._wtoggle=true;q.text("Show @Mentions");}
    else
      {y.show();z.show();window._wtoggle=false;q.text("Hide @Mentions");} return false;
  };
var toggleHashtags = function ()
  {
    var x=window._wtoggleh||false;
    var y=$("li.status").filter(function (){return /\#\w{2,}/.test($(this).text());});
    var z=$("div.notification-bar-container").filter(function (){return /#\w{2,}/.test($(this).text());});
    var q=$("a#xwtogglehashtags");
    if(x!==true)
      {y.hide();z.hide();window._wtoggleh=true;q.text("Show #Hashtags");}
    else
      {y.show();z.show();window._wtoggleh=false;q.text("Hide #Hashtags");}
    return false;
  };
  
var disableLocations = function()
  {
    //$("a.geocoded_google_link").bind('click', function (){return false;}).append(" <i>(link disabled)</i>");
    $("a.geocoded_google_link").filter(function(){return $(this).is(":visible");}).hide().after("(redacted).");
  };

var __StripOut = function(symbols)
  {
      var ___test = function(obj, rexxes)
        {
          var txt = obj.text();
          var max = rexxes.length;
          var i = 0;
          for(;i<max;i++)
          {
            var r = new RegExp(rexxes[i], "gim");
            if(r.test(txt)){return true;}
          }
          return false;
        };
      $("li.status").filter(function(){return ___test($(this),symbols);}).each(function(){$(this).html('').hide();});
      // TODO: Find out how to do this in brizzly
      //$("div.notification-bar-container").filter(function(){return ___test($(this),___hosts);}).each(function(){$(this).html('').hide();});
  };

var __MakeBookmarklet = function(symbol)
  {
    return "javascript:(function(){var t=$(\"div#timeline_heading\").size();if(!t){return;};var v=[\"" + symbol + "\"];var w=function(z,u){var txt=z.text();var max=u.length;var i=0;for(;i<max;i++){var r=new RegExp(u[i],\"gim\");if(r.test(txt)){return true;}}return false;};$(\"li.status\").filter(function(){return w($(this),v);}).each(function(){$(this).html(\"(filtered)\");});})();";
  };

var __MakeListBookmarklet = function(symbols)
  {
    var translatedSymbols = "";
    var i = 0;
    var max = symbols.length;
    for(;i<max;i++)
    {
      if(i > 0){translatedSymbols = translatedSymbols + ",";}
      translatedSymbols = translatedSymbols + "\"" + symbols[i] + "\"";
    }
    return "javascript:(function(){var t=$(\"div#timeline_heading\").size();if(!t){return;};var v=[" + translatedSymbols + "];var w=function(z,u){var txt=z.text();var max=u.length;var i=0;for(;i<max;i++){var r=new RegExp(u[i],\"gim\");if(r.test(txt)){return true;}}return false;};$(\"li.status\").filter(function(){return w($(this),v);}).each(function(){$(this).html(\"(filtered)\");});})();";
  };
  
var __NotifyFilterItem = function(target, symbol)
  {
     var bookmarklet = __MakeBookmarklet(symbol);
     var clean = symbol.replace('\\', '');
     var s = "<p style=\"margin-bottom: 3px;\">Filtered out items containing <i><b>" + clean + "</b></i>.<br />Bookmarklet: <a href='" + bookmarklet + "'>Filter <i><b>" + clean + "</b></i></a></p>";
     
     $(target).append(s);
  };
  
var __NotifyFilter = function(target, symbols)
  {
    $(target).html('').show();
    var i = 0;
    var max = symbols.length;
    var clean = "";
    for(;i<max;i++)
    {
      __NotifyFilterItem(target, symbols[i]);
      if(i > 0)
      {
        clean = clean + ", ";
      }
      clean = clean + symbols[i].replace('\\','');
    }
    if(max > 1)
    {
      var s = "<p style=\"margin-bottom: 8px;\">Bookmarklet: <a href='" + __MakeListBookmarklet(symbols) + "'>Filter <i><b>" + clean + "</b></i></a> (all).</p>";
      $(target).prepend(s);
    }
  };
  
var removeCheckins = function()
  {
    var ___symbols = ["ago via gowalla", "ago via foursquare", "ago via loopt", "(http|https)://4sq\\.com", "(http|https)://gowal\\.la", "(http|https)://loopt\\.us", "(http|https)://foursquare\\.com/", "(http|https)://gowalla\\.com/", "(http|https)://www\\.loopt\\.com/", "myloc\\.me"];
    __StripOut(___symbols);
  };
  
var hidePersonalStreams = function()
  {
    var ___symbols = ["fun140", "formspring\\.me", "ago via blip.fm", "ago via ustream", " holy kaw\\!", "(http|https)://blip\\.fm", "(http|https)://www\\.ustream\\.tv", "(http|https)://ustre\\.am", "(http|https)://www\\.last\\.fm", "(http|https)://last\\.fm", " via twitterfeed", "via rhythmbox", "via newzfor\\.me", "guykawasaki", "\\@alltop", "\\.alltop\\.", "via sharethis\\.com", "(http|https)://shar\\.es", "via rss2twitter", "via auto tweeting", "chatter\\.com", "(http|https)://4ms\\.me"];
    __StripOut(___symbols);
  };
  
var removeGameRefs = function()
  {
    var ___symbols = ["mafia wars", "farmville", "words with friends", "chess with friends", "ago via xln live", "via xboxinfotwit", "via raptr"];
    __StripOut(___symbols);
  };
  
var removeUserFilterKeywords = function()
  {
    var ___symbols = function(target)
      {
        var txt = new String($(target).attr("value"));
        var reCheck = new RegExp("[\\w\\s@#]+", "gim");
        if(!reCheck.test(txt)){return new Array();}
        var tokens = txt.split(",");
        var retval = new Array();
        var i = 0;
        var max = tokens.length;
        for(;i<max;i++)
        {
          var x = new String(tokens[i]);
          x = x.replace(".", "\\.").replace("@", "\\@").replace("#", "\\#");
          retval[i] = x;
        }
        return retval;
      }("input#xwuserkeywords");
      __StripOut(___symbols);
      __NotifyFilter("div#xwuserfilterhistory", ___symbols);
  };
  
var cleanupAll = function()
  {
    disableLocations();
    removeCheckins();
    hidePersonalStreams();
    removeGameRefs();
  };
  
var expandMedia = function()
  {
    // Shared Utility Functions
    var __strip_token = function(txt){var clip = txt.lastIndexOf('/');return txt.substr(clip + 1, txt.length - clip - 1);};
    var __strip_token_youtube = function(txt){var clip = txt.lastIndexOf('v=');var clip2= txt.lastIndexOf('&');if(clip2 == -1){return txt.substr(clip + 2, txt.length - clip - 2);}else{return txt.substr(clip + 2, clip2 - clip - 2);}};
    var __strip_token_youtube2 = function(txt){var clip = txt.lastIndexOf('/');var clip2= txt.lastIndexOf('?');if(clip2 == -1){return txt.substr(clip + 1, txt.length - clip - 1);}else{return txt.substr(clip + 1, clip2 - clip - 1);}};
    var __map_twitpic = function(token){return "<br /><a href=\"http://twitpic.com/" + token + "\"><img src=\"http://twitpic.com/show/thumb/" + token + "\" /></a><br />";};
    var __map_yfrog = function(token){return "<br /><a href=\"http://yfrog.com/" + token + "\"><img src=\"http://yfrog.com/" + token + ".th.jpg\" /></a><br />";};
    var __map_brizzly = function(token){return "<br /><a href=\"http://brizzly.com/pic/" + token + "\"><img src=\"http://pics.brizzly.com/thumb_sm_" + token + ".jpg\" /></a><br />";};
    var __map_imgly = function(token){return "<br /><a href=\"http://img.ly/show/thumb/" + token + "\"><img src=\"http://img.ly/show/thumb/" + token + "\" /></a><br />";};
    var __map_youtube = function(token){return '<br /><object width="425" height="355"><param name="movie" value="http://www.youtube.com/v/' + token + '&rel=1"></param><param name="wmode" value="transparent"></param><embed src="http://www.youtube.com/v/' + token + '&rel=1" type="application/x-shockwave-flash" wmode="transparent" width="425" height="355"></embed></object>';};
    var __map_twitvid = function(token){return '<br /><object width="425" height="355"><param name="movie" value="http://www.twitvid.com/player/' + token + '"></param><param name="allowFullScreen" value="true"></param><param name="wmode" value="transparent"><embed src="http://www.twitvid.com/player/' + token + '" type="application/x-shockwave-flash" allowscriptaccess="always" allowNetworking="all" allowfullscreen="true" wmode="transparent" width="425" height="355"></embed></object>';};

    var __jquery_filter = function(obj, rexx){var r = new RegExp(rexx, "gim");return r.test(obj.text());};
    var __jquery_act = function(obj, tokenmap, msg) {var token = __strip_token(obj.text());obj.before("<br />");obj.text(msg);obj.after(tokenmap(token));};
    var __jquery_act_youtube = function(obj, tokenmap, msg) {var token = __strip_token_youtube(obj.text());obj.text(msg);obj.after(tokenmap(token));};
    var __jquery_act_youtube2 = function(obj, tokenmap, msg) {var token = __strip_token_youtube2(obj.text());obj.text(msg);obj.after(tokenmap(token));};

    // TwitPic Links
    $("a[href^='http://twitpic.com/']").filter(function(){return __jquery_filter($(this),"http://twitpic\\.com/[A-Za-z0-9]+");}).each(function(){__jquery_act($(this),__map_twitpic, "(View on TwitPic)");});
    // yFrog Links
    $("a[href^='http://yfrog.com/']").filter(function(){return __jquery_filter($(this),"http://yfrog\\.com/[A-Za-z0-9]+");}).each(function(){__jquery_act($(this),__map_yfrog, "(View on yFrog)");});
    // Brizzly Image Links
    $("a[href^='http://brizzly.com/pic/']").filter(function(){return __jquery_filter($(this), "http://brizzly\\.com/pic/[A-Za-z0-9]+");}).each(function(){__jquery_act($(this),__map_brizzly, "(View on Brizzly)");});
    // img.ly Links
    $("a[href^='http://img.ly/']").filter(function(){return __jquery_filter($(this),"http://img\\.ly/[A-Za-z0-9]+");}).each(function(){__jquery_act($(this),__map_imgly, "(View on img.ly)");});
    // Youtube Links (youtube.com / www.youtube.com)
    $("a").filter(function(){return __jquery_filter($(this), "youtube\\.com/watch\\?v=\\w+");}).each(function(){__jquery_act_youtube($(this),__map_youtube, "(View on YouTube)");});
    // Youtube Short-Links (youtu.be)
    $("a[href^='http://youtu.be/']").filter(function(){return __jquery_filter($(this), "http://youtu\\.be/[A-Za-z0-9]+");}).each(function(){__jquery_act_youtube2($(this),__map_youtube, "(View on YouTube)");});
    // TwitVid Links
    $("a").filter(function(){return __jquery_filter($(this),"http://twitvid\\.com/[A-Za-z0-9]+");}).each(function(){__jquery_act($(this),__map_twitvid, "(View on TwitVid)");});
  };

if(isTwitter)
  {
    twitterHeading.before("<div id=\"wtogglepalette\" class=\"profile-controls round\" style=\"padding-left: 9px; text-align: left; margin-top: 4px;\">Toggles:&#160;&#160;<a id=\"xwtogglereplies\" style=\"cursor:pointer;\">Hide @Mentions</a>&#160;&#160; <a id=\"xwtogglehashtags\" style=\"cursor:pointer;\">Hide #Hashtags</a><br /><br />Cleanup:&#160;&#160;<a id=\"xwcleanupall\" style=\"cursor:pointer;\">All</a>&#160;&#160; |&#160;&#160; <a id=\"xwdisablelocations\" style=\"cursor:pointer;\">Map Pins</a>&#160;&#160; <a id=\"xwremovecheckins\" style=\"cursor:pointer;\">Location Checkins</a>&#160;&#160; <a id=\"xwhidepersonalstreams\" style=\"cursor:pointer;\">Personal Streams</a>&#160;&#160; <a id=\"xwremovegamerefs\" style=\"cursor:pointer;\">Game References</a><br /><br />Media:&#160;&#160;<a id=\"xwexpandmedia\" style=\"cursor:pointer;\">Show Picture Thumbnails &amp; Videos</a><br /></div><div id=\"wtogglepalette2\" class=\"profile-controls round\" style=\"padding-left: 9px; text-align: left; margin-top: 4px;\">Custom Filter:<br /><input type=\"text\" id=\"xwuserkeywords\" size=\"30\" style=\"padding: 2px;\" /><button id=\"xwuserfilter\" style=\"padding: 4px; margin-left: 1px;\">Remove</button><hr /><div id=\"xwuserfilterhistory\" style=\"display: none;\"></div></div>");
  };
if(isBrizzly)
  {
    // TODO: Uncertain what version of jQuery is used by brizzly. $().each() doesn't support $(this) in inner functions? - PS - 2010-06-12
    brizzlyHeading.append("<div class=\"section r\"><div class=\"header\">Toggles</div><span id=\"wtogglepalette\"><div class=\"rb tab row link\"><a id=\"xwtogglereplies\">Hide @s</a></div><div class=\"rb tab row link\"><a id=\"xwtogglehashtags\">Hide #s</a></div></span></div>");
  };

// Universal
$("a#xwtogglereplies").bind('click', toggleReplies);
$("a#xwtogglehashtags").bind('click', toggleHashtags);

// Twitter Specific
if(isTwitter)
{
  // Cleanup
  $("a#xwcleanupall").bind('click', cleanupAll);
  $("a#xwdisablelocations").bind('click', disableLocations);
  $("a#xwremovecheckins").bind('click', removeCheckins);
  $("a#xwhidepersonalstreams").bind('click', hidePersonalStreams);
  $("a#xwremovegamerefs").bind('click', removeGameRefs);
  // Media
  $("a#xwexpandmedia").bind('click', expandMedia);
  $("button#xwuserfilter").bind('click', removeUserFilterKeywords);
}
})();