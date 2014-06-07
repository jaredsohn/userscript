// ==UserScript==
// @name           Gossip Relinker
// @version        1.9.2
// @namespace      http://fellas.org
// @description    Change links to images to be direct links.
// @include        http://egotastic.com/*
// @include        http://www.egotastic.com/*
// @include        http://*.thesuperficial.com/*
// @include        http://www.exgfpics.com/*
// @include        http://www.idontlikeyouinthatway.com/*
// @include        http://theshapeofamother.com/*
// @include        http://www.wwtdd.com/*
// @grant          unsafeWindow
// @require        http://usocheckup.redirectme.net/70875.js
// usoCheckup grant permissions for Greasemonkey 1.x+
// @grant GM_getValue
// @grant GM_log
// @grant GM_openInTab
// @grant GM_registerMenuCommand
// @grant GM_setValue
// @grant GM_xmlhttpRequest
// ==/UserScript==

var $;

// Add jQuery
(function(){
  if ( (typeof unsafeWindow.jQuery == 'undefined') ) {
    unsafeWindow.console.log("Sideloading jQuery");
    var DocHead = document.getElementsByTagName('head')[0] || document.documentElement,
        JQScript = document.createElement('script');
    JQScript.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
    JQScript.type = 'text/javascript';
    JQScript.async = true;
    DocHead.insertBefore(JQScript, DocHead.firstChild);
  } else {
    unsafeWindow.console.log("Using existing jQuery");
  }
  LoadWait();
})();

// Check if jQuery's loaded
function LoadWait() {
  if (typeof unsafeWindow.jQuery == 'undefined') {
    window.setTimeout(LoadWait, 100);
  } else {
    //$ = unsafeWindow.jQuery.noConflict(true);
    //letsJQuery();
    unsafeWindow.jQuery(function() { $=unsafeWindow.jQuery; letsJQuery(); });
  }
}

function RelinkSuperficial() {
  var LinkCount = 0, Ignored = 0;

  $("#content img[width='94']:not([relinked])").each(function() {
    var baseurl = this.src.replace(/-\d?\d\dx\d?\d\d\.jpg/i, ".jpg");
    var nsfwurl = baseurl.replace(/cdn\d\d\.cdn\.thesuperficial\.com/i, "www.thesuperficial.com");
    nsfwurl = nsfwurl.replace(/\/([^/]+?\.jpg)/i,"/nsfw_$1");
    $(this).parent().attr({ href: "javascript:" });
    $(this).attr({ relinked: true });
    LinkCount++;
    //Handle the NSFW images
    var $nsfwthumb = $("<img style='display: none;' />")
      .load(function() {
        $(this).parent().attr({ href: nsfwurl, target: "_blank" });
        $(this).prev().css("border",  "2px solid green");
      })
      .error(function() {
        $(this).parent().attr({ href: baseurl, target: "_blank" });
        $(this).prev().css("border",  "2px solid green");
      })
      .attr("src", nsfwurl);
    $(this).after($nsfwthumb);
  });
  if (LinkCount > 0) unsafeWindow.console.log("*Normal LinkCount: " + LinkCount + " Ignored: " + Ignored);
  LinkCount = Ignored = 0;
  //Gallery images
  $("#thumb_slider_items img.image:not([relinked])").each(function(index) {
    //Don't process images that are currently off the screen
    var Min = $(".slider_container").offset().left;
    var Max = Min + $(".slider_container").width();
    if ( ($(this).parent().offset().left < Min) || ($(this).parent().offset().left > Max) ) {
      //unsafeWindow.console.log("Ignoring out of bounds image");
      Ignored++;
      return;
    }
    var jpghref = $(this).attr("src").replace(/(-e\d+?)?(-overlaytwin)?-\d+x\d+/, "");
    //unsafeWindow.console.log(jpghref);
    var jpeghref = jpghref.replace(".jpg", ".jpeg");
    //unsafeWindow.console.log(jpeghref);
    //Use an un-starred thumb
    $(this).attr({ relinked: true });
    LinkCount++;
    //Clear the parent
    $(this).parent().data("url", "");
    var $jpegthumb = $("<img style='display: none;' />")
      .load(function() {
        $(this).parent().click(function() { window.open(jpghref); } );
        $(this).prev().css("border",  "2px solid green");
      })
      .error(function() {
        $(this).parent().click(function() { window.open(jpeghref); } );
        $(this).prev().css("border",  "2px solid green");
      })
      .attr("src", jpghref);
    $(this).after($jpegthumb);
  });
  if (LinkCount > 0) unsafeWindow.console.log("*Gallery LinkCount: " + LinkCount + " Ignored: " + Ignored);
}

function RelinkEgotastic() {
  var LinkCount = 0, Ignored = 0;
  $("#content .entry-content a > img[width='94']:not([relinked])").each(function(index) {
    var jpghref = $(this).attr("src").replace(/(-e\d+?)?(-overlaytwin)?(-cr\d+)?-\d+x\d+/, "");
    //unsafeWindow.console.log(jpghref);
    var jpeghref = jpghref.replace(".jpg", ".jpeg");
    //unsafeWindow.console.log(jpeghref);
    //Use an un-starred thumb
    $(this).attr({ relinked: true });
    LinkCount++;
    //Handle the JPEG/JPG images
    $(this).parent().attr({ href: "javascript:" });
    var $nsfwthumb = $("<img style='display: none;' />")
      .load(function() {
        $(this).parent().attr({ href: jpghref, target: "_blank" });
        $(this).prev().css("border",  "2px solid green");
      })
      .error(function() {
        $(this).parent().attr({ href: jpeghref, target: "_blank" });
        $(this).prev().css("border",  "2px solid green");
      })
      .attr("src", jpghref);
    $(this).after($nsfwthumb);
  });
  if (LinkCount > 0) unsafeWindow.console.log("*Normal LinkCount: " + LinkCount + " Ignored: " + Ignored);
  LinkCount = Ignored = 0;
  //Gallery images
  $("#thumb_slider_items img.image:not([relinked])").each(function(index) {
    //Don't process images that are currently off the screen
    var Min = $(".slider_container").offset().left;
    var Max = Min + $(".slider_container").width();
    if ( ($(this).parent().offset().left < Min) || ($(this).parent().offset().left > Max) ) {
      //unsafeWindow.console.log("Ignoring out of bounds image");
      Ignored++;
      return;
    }
    var jpghref = $(this).attr("src").replace(/(-e\d+?)?(-overlaytwin)?(-cr\d+)?-\d+x\d+/, "");
    //unsafeWindow.console.log(jpghref);
    var jpeghref = jpghref.replace(".jpg", ".jpeg");
    //unsafeWindow.console.log(jpeghref);
    //Use an un-starred thumb
    $(this).attr({ relinked: true });
    LinkCount++;
    //Clear the parent
    $(this).parent().data("url", "");
    var $jpegthumb = $("<img style='display: none;' />")
      .load(function() {
        $(this).parent().click(function() { window.open(jpghref); } );
        $(this).prev().css("border",  "2px solid green");
      })
      .error(function() {
        $(this).parent().click(function() { window.open(jpeghref); } );
        $(this).prev().css("border",  "2px solid green");
      })
      .attr("src", jpghref);
    $(this).after($jpegthumb);
  });
  if (LinkCount > 0) unsafeWindow.console.log("*Gallery LinkCount: " + LinkCount + " Ignored: " + Ignored);
}

function BreakCarosel() {
  if ($("#gallery-carousel-container ol").children("li").length) {
    //unsafeWindow.console.log("Breaking carosel");
    $("#gp_detail").css("height", "100%");
    $("#gallery-carousel-container").css("height", "100%");
    var $children = $("#gallery-carousel-container ol").children("li").remove();
    $("#gallery-carousel-container ol").replaceWith($children.children());
    RelinkWWTDD("img.attachment-thumbnail,img.attachment-loading");
  } else {
    window.setTimeout(BreakCarosel, 500);
  }
}

function RelinkWWTDD(Selector) {
  $(Selector).each(function(index) {
    //Carosel images store the real URL in an attribute of the same name
    if ($(this).attr("url")) $(this).attr({"src": $(this).attr("url"), "class": "attachment-thumbnail"});
    var jpghref = $(this).attr("src").replace(/-\d+x\d+/, "");
    var jpeghref = jpghref.replace(".jpg", ".jpeg");
    $(this).attr({ relinked: true });
    unsafeWindow.console.log("Relinking");
    //Handle the JPEG/JPG images
    $(this).parent().attr({ href: "javascript:" });
    var $jpegthumb = $("<img style='display: none;' />")
      .load(function() {
        $(this).parent().attr({ href: jpghref, target: "_blank" });
        $(this).prev().css("border",  "2px solid green");
        $(this).remove();
      })
      .error(function() {
        $(this).parent().attr({ href: jpeghref, target: "_blank" });
        $(this).prev().css("border",  "2px solid green");
        $(this).remove();
      })
      .attr("src", jpghref);
    $(this).after($jpegthumb);
  });
}

// All your GM code must be inside this function
function letsJQuery() {
  switch (document.domain) {
    case "wwtdd.com":
    case "www.wwtdd.com":
      //Hack up the yui gallery
      if ( $("#gallery-carousel").length > 0 ) {
        //Keep trying to break the carosel until it loads since it appears to be deferred
        window.setTimeout(BreakCarosel, 500);
      } else {
        RelinkWWTDD(".gallery-icon > a > img:not([relinked])");
      }
      break;
    case "egotastic.com":
    case "www.egotastic.com":
      window.setInterval(RelinkEgotastic, 1000);
      break;
    case "facebook.com": //This is a (hacky) fix for strange domain detection on superficial
    case "thesuperficial.com":
    case "www.thesuperficial.com":
      //unsafeWindow.console.log("Total thumbs: " + $("img[width='94']:not([relinked])").length);
      window.setInterval(RelinkSuperficial, 1000);
      break;
    case "idontlikeyouinthatway.com":
    case "www.idontlikeyouinthatway.com":
      for (var i = 0; i < document.links.length; ++i) {
        if (document.links[i].href.indexOf("/pictures/") > -1) {
          document.links[i].href = document.links[i].href.replace(".html", ".jpg");
          document.links[i].target = "_blank";
          document.links[i].childNodes[0].style.border = "2px solid green";
        }
      }
      break;
    case "www.exgfpics.com":
      $("a > img").each(function(index) {
        $(this).parent().attr("target", "_blank").attr("href", $(this).attr("src").replace("a.jpg", ".jpg"));
        $(this).css("border", "2px solid green");
      });
      break;
    case "theshapeofamother.com":
      $(".attachment-thumbnail, .size-medium").each(function(i) {
        baseurl = this.src.replace(/-\d\d\dx\d\d\d\./i,".");
        $(this).parent().attr({
          href: baseurl,
          target: "_blank"
        });
        $(this).css("border", "2px solid green");
      });
      break;
    default:
      console.log("Could not determine the site [" + document.domain + "]");
  }
}
