// ==UserScript==
// @name           Bodymodifications.net enhancements
// @description    Bodymodifications.net enhancements. Version 1.6.0.
// @namespace      http://www.elovirta.com/greasemonkey/
// @include        http://bodymodifications.net/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.js
// ==/UserScript==

var PARAMETER_DEBUG = "debug";
//var PARAMETER_NSFW = "nsfw";
var PARAMETER_GUARD = "guard";

var nsfw;

/**
 * Initialize.
 */
function init() {
    /*
    if (GM_getValue(PARAMETER_NSFW, undefined) === undefined) {
        GM_setValue(PARAMETER_NSFW, window.confirm("Would you like Bodymodifications.net enhancements to work in Not Safe For Work mode? You can change this later on from about:config."));
    }
    nsfw = GM_getValue(PARAMETER_NSFW, false);
    */
}

// Utility methods -----------------------------------------------------

if (document.getElementsByClassName === undefined) {
  document.getElementsByClassName = function(cl) {
    var retnode = [];
    var myclass = new RegExp('(^|\\b)'+cl+'(\\b|$)');
    var elem = this.getElementsByTagName('*');
    for (var i = 0; i < elem.length; i++) {
      var classes = elem[i].className;
      if (myclass.test(classes)) {
        retnode.push(elem[i]);
      }
    }
    return retnode;
  };
}

function clone(src) {
    var res = [];
    for (var i = 0, len = src.length; i < len; i++) {
        res[i] = src[i];
    }
    return res;
}

// Page test methods ---------------------------------------------------

function isOwnProfilePage() {
  var id = getId();
  return id !== undefined && (new RegExp("/member/" + id + "/$")).test(document.location);
}

function isJournalPage() {
    return window.location.href.match(new RegExp("/member/[^/]+/\\d+/$")) !== null;
}

function isGuestbookPage() {
    return window.location.href.match(new RegExp("/member/[^/]+/gbook/$")) !== null;
}

function isJournalUpdatePage() {
    return window.location.href.match(new RegExp("/_journal.php$")) !== null;
}

function isJournalEditPage() {
    return window.location.href.match(new RegExp("/_journal.php\\?jid=\\d+$")) !== null;
}

function isForumReplyPage() {
    return window.location.href.match(new RegExp("/forum/\\d+/(page[0-9]+/)?(#.+)?$")) !== null;
}

function isForumEntryPage() {
    return window.location.href.match(new RegExp("/forum/[^/]+/$")) !== null;
}

function isEventAddPage() {
    return window.location.href.match(new RegExp("/events.php\\?mode=add$")) !== null;
}

// NSFW methods --------------------------------------------------------

/*
function nwsfSetup() {
    if (nsfw) {
        GM_addStyle(".nsfw {opacity: 0.1} .nsfw:hover {opacity: 1} #picture .nsfw {opacity: 1}");   
    }
}
*/

// Edit link methods ---------------------------------------------------

function getId() {
  var header = document.getElementById("header");
  if (header) {
    var uls = header.getElementsByTagName("ul");
    if (uls.length > 1) {
      var aNodeList = uls[1].getElementsByTagName("a");
      if (aNodeList.length > 0) {
        var href = String(aNodeList[0].href);
        var reg = new RegExp("/member/(.+)/");
        var res = reg.exec(href);
        return res[1];
      }
    }
  }
  return undefined;
}

function getJournalNumber(pagelist) {
  var com = pagelist.getElementsByTagName("a");
  if (com.length > 0) {
    var ca = com[0];
    var chref = String(ca.href);
    var creg = new RegExp("/member/[^/]+/(.+)/");
    var cres = creg.exec(chref);
    return cres[1];
  }
  return undefined;
}

function addJournalEditLink() {
  var pagelist = document.getElementsByClassName("pagelist");
  if (pagelist.length > 0) {
    var num = getJournalNumber(pagelist[0]);
    if (num !== undefined) {
      var a = document.createElement("a");
      a.href = "/_journal.php?jid=" + num;
      a.appendChild(document.createTextNode("[edit]"));
      pagelist[0].appendChild(document.createTextNode(" "));
      pagelist[0].appendChild(a);
    }
  }
}

// Media embed methods -------------------------------------------------

function addParams(obj, params) {
  for (var p = 0; p < params.length; p++) {
    var prm = document.createElement("param");
    prm.setAttribute("name", params[p][0]);
    prm.setAttribute("value", params[p][1]);
    obj.appendChild(prm);
  }
}

function addAttributes(obj, params) {
  for (var p = 0; p < params.length; p++) {
    obj.setAttribute(params[p][0], params[p][1]);
  }
}

function inlineMediaLinks() {
  var tube = new RegExp("^http://(www\\.|[a-z]{2}\\.)?youtube.com/watch\\?v=(.+)$");
  var vimeo = new RegExp("^http://(www\\.)?vimeo.com/(\\d+)$");
  var img = new RegExp("\\.(png|jpg|jpeg|gif)$");
  var audio = new RegExp("\\.(mp3)$");
  $("div.wide a").each(function (i) {
    var link = this;
    if (tube.test(link.href)) {
      var video = link.href.replace(tube, "http://www.youtube.com/v/$2");
      var obj = $("<object width='425' height='350'>" +
                    "<param name='movie' value='" + video +"'>" +
                    "<param name='wmode' value='transparent'>" +
                    "<embed src='" + video + "' type='application/x-shockwave-flash' width='425' height='350'>" +
                  "</object>");
      $(link).parent().before(obj);
      $(link).empty();      
    } else if (vimeo.test(link.href)) {
        var video = link.href.replace(vimeo, "http://vimeo.com/moogaloop.swf?clip_id=$2&server=vimeo.com&show_title=1&show_byline=1&show_portrait=0&color=&fullscreen=1");
        var obj = $("<object width='400' height='300'>" +
                      "<param name='allowfullscreen' value='true'>" + 
                      "<param name='allowscriptaccess' value='always'>" +
                      "<embed src='" + video + "' type='application/x-shockwave-flash' allowfullscreen='true' allowscriptaccess='always' width='400' height='300'>" +
                    "</object>");
        $(link).parent().before(obj);
        $(link).empty();
    } else if (img.test(link.href)) {
      var image = $("<img>").attr("src", link.href).css("maxWidth", "100%");
      $(link).parent().before(image);
      $(link).empty();
   } else if (audio.test(link.href)) {
      var src = "http://google.com/reader/ui/3247397568-audio-player.swf?audioUrl=" + escape(link.href);
      var attrs = [
        ["width", "400"],
        ["height", "27"]
      ];       
      var params = [
        ["quality", "best"],
        ["allowScriptAccess", "never"],
        ["wmode", "window"]
      ];
      var obj = document.createElement("object");
      addAttributes(obj, attrs);
      addAttributes(obj, [
        ["align", "middle"],
        ["codebase", "http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0"],
        ["classid", "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"]
      ]);
      addParams(obj, params);
      addParams(obj, [
        ["movie", src]
      ]);
      var embed = document.createElement("embed");
      addAttributes(embed, attrs);
      addAttributes(embed, params);
      addAttributes(embed, [
        ["type", "application/x-shockwave-flash"],
        ["classname", "audio-player-embed"],
        ["pluginspage", "http://www.macromedia.com/go/getflashplayer"],
        ["flashvars", "playerMode=embedded"],
        ["bgcolor", "#ffffff"],
        ["src", src]
      ]);
      obj.appendChild(embed);
      link.parentNode.insertBefore(obj, link);
      link.parentNode.removeChild(link);    
    
    }
  });
}

// Textarea guard methods ----------------------------------------------

var unloadOnSubmit = false;

function unbeforeunloadHandler(event, target, message, previous) {
    if (!unloadOnSubmit) {
        var value = target.value;
        if (value.match(new RegExp("^\\s*$", "gm")) === null ||
                (previous !== undefined && value !== previous)) {
            event.returnValue = message;
        }
    }
}

function textFieldGuard() {
    if (isJournalPage() || isJournalUpdatePage() || isForumReplyPage() || isForumEntryPage() || isGuestbookPage() || isJournalEditPage()) {
        var form = document.getElementById("commentform");
        var textarea;
        var message;
        var previous;
        if (isJournalPage()) {
            textarea = document.getElementById("comment");
            message = "Comment has not been sent.";
        } else if (isJournalUpdatePage()) {
            textarea = document.getElementById("body");
            message = "Journal entry has not been saved.";
        } else if (isForumReplyPage()) {
            textarea = document.getElementById("message");
            message = "Reply has not been sent.";
        } else if (isForumEntryPage() || isGuestbookPage()) {
            textarea = document.getElementById("message");
            message = "Message has not been sent.";
        } else if (isJournalEditPage()) {
            textarea = document.getElementById("body");
            previous = textarea.value;
            message = "Changes to the journal entry have not been saved.";
        }
        form.addEventListener("submit", function (event) {
                unloadOnSubmit = true;
            }, false);
        window.addEventListener("beforeunload", function (event) {
                unbeforeunloadHandler(event, textarea, message, previous);
            }, false);
    }
}

// Event methods -------------------------------------------------------

function addLastfmSource() {
    alert("add");
    alert($("#profile-form"));
    $("#profile-form").prepend($("<p><input class='btn' type='button' value='Last.fm' /></p>"));
}

// Initialize page -----------------------------------------------------

init();
//nwsfSetup();
textFieldGuard();
if (isOwnProfilePage()) {
    addJournalEditLink();
} else if (isEventAddPage()) {
    //addLastfmSource();
}
inlineMediaLinks();
