// ==UserScript==
// @name        AutoPrint 4.2
// @namespace   http://www.userscripts.org
// @description automatically go to the print version of differnet pages
// @version     4.2
// @date        2010-11-22
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

// User Settings
var on_for_wikipedia = false;
var on_for_cracked = true;
var on_for_ign = true;
var on_for_techcrunch = true;
// User Settings

var href = window.location.href;

function goto_print(path) {
  var print = $(path).attr("href");
  if (null != print) {
    if (/http\:\/\//.test(print)) {
      window.location = print;
    } else {
      window.location = "http://" + document.domain + print;
    }
  }
}

function howstuffworks_append(getURL, nextURLPath, contentPath) {
  if (null != getURL) {
    $.get(getURL,
      function(data) {
        $(contentPath).parent().append($(contentPath, data));
        var nextURL = $(nextURLPath, data).attr("href");
        if (null != nextURL) {
          howstuffworks_append(nextURL, nextURLPath, contentPath);
        }
    });
  }
}

switch (true) {
  case /wikipedia.org/.test(href) && on_for_wikipedia:
    goto_print("#t-print > a");
    break;
  case /nytimes.com/.test(href):
    goto_print("#toolsList > li.print > a");
    break;
  case /latimes.com/.test(href):
    goto_print("#articletools-print > a");
    break;
  case /washingtonpost.com/.test(href):
    goto_print("#sidebarColumnPrint > a");
    break;
  case /time.com/.test(href):
    goto_print("li.print > a");
    break;
  case /sfgate.com/.test(href):
    goto_print("#printlink");
    break;
  case /nydailynews.com/.test(href):
    if ($("#nydn_header:visible").length != 0) {
      goto_print("li.print > a");
    }
    break;
  case /rd.com/.test(href):
    goto_print("a[title='Print']");
    break;
  case /nypost.com/.test(href):
    goto_print("a.print_share");
    break;
  case /tdn.com/.test(href):
    goto_print("#story-tools > a");
    break;
  case /newyorker.com/.test(href):
    if ($("#goback").length == 0) {
      goto_print("a.printico");
    }
    break;
  case /pcworld.com/.test(href):
    goto_print("li.print > a");
    break;
  case /chicagotribune.com/.test(href):
    goto_print("#articletools-print > a");
    break;
  case /scientificamerican.com/.test(href):
    goto_print("#printFlair > a");
    break;
  case /marketwatch.com/.test(href):
    goto_print("#printaction");
    break;
  case /thestreet.com/.test(href):
    goto_print("a[title='Print This Article']");
    break;
  case /fool.com/.test(href):
    goto_print("div.print > a");
    break;
  case /politico.com/.test(href):
    goto_print("li.share-print > a");
    break;
  case /salon.com/.test(href):
    if ($("#navwrap").length == 0) {
      goto_print("a.print_link");
    }
    break;
  case /newscientist.com/.test(href):
    if ($("#hdLogo").length != 0) {
      goto_print("#artTools > div > a");
    }
    break;
  case /csmonitor.com/.test(href):
    goto_print("a[title='Print']");
    break;
  case /theatlantic.com/.test(href):
    goto_print("a.print");
    break;
  case /thenation.com/.test(href):
    goto_print("ul.article-actions-bar > li:nth-child(3) > a");
    break;
  case /alternet.org/.test(href):
    goto_print("div.story_tools_print_top > a");
    break;
  case /foxnews.com/.test(href):
    window.location = href + "print";
    break;
  case /bbc.co.uk/.test(href):
    var search = $("#blq-search:visible");
    if (search.length != 0) {
      var print = $("li.print > a");
      if (null != print) {
        window.location = href + "?print=true";
      }
    }
    break;
  case /howstuffworks.com/.test(href):
    if ($("#hpprint").length != 0) {
      goto_print("#hpprint");
    } else {
      var nextURLPath = "a.nextImage";
      var getURL = $(nextURLPath).attr("href");
      //howstuffworks_append(getURL, nextURLPath, "div.articleBody");
    }
    break;
  case /cracked.com/.test(href) && on_for_cracked:
    $("div.Column2").remove();
    $("div.GenericModule1").remove();
    $("#comments_section").remove();
    $("#fb_sliver").remove();
    $("#persistent-share").remove();
    $("div.Footer").remove();
    break;
  case /ign.com/.test(href) && on_for_ign:
    $("#disqus_thread").remove();
    $("#footer").remove();
    $("#LB_Row").remove();
    $("#content-sub").remove();
    $("#hot-box").remove();
    $("#commentsColCenter").remove();
    break;
  case /techcrunch.com/.test(href) && on_for_techcrunch:
    $("#header_nav").remove();
    $("#col2").remove();
    $("#disqus_thread").remove();
    $("div.post_unit").remove();
    break;
  case /reason.com/.test(href):
    goto_print("a.printer");
    break;
  case /guardian.co.uk/.test(href):
    if ($("#printlink:visible").length != 0) {
      goto_print("#printlink");
    }
    break;
}

