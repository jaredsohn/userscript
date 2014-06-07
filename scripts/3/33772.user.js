// ==UserScript==
// @name           PixivAutoPager
// @version        1.6
// @namespace      http://www.pixiv.net/
// @author         Suiren
// @include        http://www.pixiv.net/*
// @description    Add autoloading for next page to Pixiv search result. DblClick to enable/disable it.
// @license        GPL version 3 or any later version
// ==/UserScript==
//
// !! LICENSE !!
// Released under the GPL license
//  http://www.gnu.org/copyleft/gpl.html
//
// !! SPECIAL THANKS !!
// Thanks to JavaScript Function "insertAfter" !!
//  http://d.hatena.ne.jp/javascripter/20080608/1212938217
//  -> http://d.hatena.ne.jp/javascripter/20080709/1215576976
//  Thank you JavaScriptor !!
// 
// Thanks to REGEX in JavaScript !!
//  replace(/(_s|_m)/, "")   ->  replace(/_[ms]\./, ".")
//  Thank you hentaku !!
//
//
// !! NOTICE !!
// This JavaScript works only in Character "UTF-8".
// If this is not "UTF-8" , You should change Character-Set. 
//
// ver 0.1 @ 2008-09-15
//  experimental release
// ver 0.2 @ 2008-09-15
//  Support new Address
//   member_illust.php
// ver 0.3 @ 2008-09-15
//  Support new Address
//   new_illust.php,tags.php
// ver 0.4 @ 2008-09-16
//  Support new Address
//   new_illust_r18.php
//  Fixed bug
//   not AutoPaging for IE7.0 in member_illust.php
// ver 0.5 @ 2008-09-16
//  Update JavaScript Function "insertAfter".
//  Thanks to Javascripter !
// ver 0.6 @ 2008-09-22
//  Support new Address
//   bookmark.php
// ver 0.7 @ 2008-10-18
//   bookmark_new_illust.php
// ver 0.8 @ 2008-11-07
//   adds Comiket Tag
// ver 1.0 @ 2008-11-21
//   Create New Logic !
// ver 1.1 @ 2008-11-26
//  adds Link [F].
// ver 1.2 @ 2008-11-30
//  Bug Fix - If Search Result is Only One page, it will appear Link [F]
// ver 1.3 @ 2008-12-29
//  Bug Fix - When profile's with "_s" or "_m" in their name would cause the direct image link to 404
// ver 1.4 @ 2009-01-05
//  Sorry I didn't fix Bug in ver 1.3.
//  Bug Fix - When profile's with "_s" or "_m" in their name would cause the direct image link to 404
// ver 1.5 @ 2010-07-21
//  Because Pixiv redesigned web-page, I did changes with it.
//  But Ranking-Page is not supported. I will support next version.
// ver 1.6 @ 2010-10-01
//  Pixiv re-redesigned web-page, I did changes with it.
//  Sorry, Ranking-Page is not supported. It is too difficult.

(function(){
  // Change the following "true" to "false" if you don't want to enable it automatically.
  var PIXIV_AUTO_PAGER_DEFAULT_ENABLE = true;
  
  var address    = location.href;
  var site       = location.pathname;
  var usePager   = false;
  var CLASS_LIST = ["search_a2_result",
                    "display_works",
                    "list_box",
                    "circleImg",
                    "novel_listview"
                   ];
  var RANK_LIST  = ["rankingCenter"];
  var DIV_ID     = "PixivAutoPager_GM";
  var NEXT_CLASS = "pager_ul_next";
  
  var searchPagerClassByName = function(classList) {
    var classByName  = null;
    var elements     = document.getElementsByTagName("div");
    for (var i = 0; i < elements.length; i++) {
      for (var j = 0; j < classList.length; j++) {
        if (elements[i].className.match(classList[j])) {
          classByName = elements[i].className;
          elements[i].id = DIV_ID;
          break;
        }
      }
    }
    return classByName;
  };
  
  var searchNextClassByName = function() {
    var nextClass;
    var elements = document.getElementsByTagName("li");
    for (var i = 0; i < elements.length; i++) {
      if (elements[i].className == NEXT_CLASS) {
        nextClass = elements[i];
        break;
      }
    }
    return nextClass;
  };
  
  var locate    = searchPagerClassByName(CLASS_LIST);
  var nextClass = searchNextClassByName();

  var set_links_target = function (list) {
    if (!list) {
      list = document.getElementById(DIV_ID);
    } else {
      var oldList = document.getElementById(DIV_ID);
      oldList.id  = null;
    }
    var links = list.getElementsByTagName('a');
    var full_img;
    for (var i = 0; i < links.length; ++i) {
      links[i].setAttribute('target', '_blank');
      if (links[i].firstChild && links[i].firstChild.tagName == "IMG") {
        full_img             = document.createElement("a");
        full_img.href        = links[i].firstChild.src.replace(/_[ms]\./, ".");
        full_img.innerHTML   = "[F]";
        full_img.style.color = "#258FB8";
        links[i].parentNode.appendChild(document.createElement("br"));
        links[i].parentNode.appendChild(full_img);
      }
    }
  };
  
  if (nextClass && locate) {
    if ((nextClass.innerHTML.match(/(次へ)/))) {
      usePager = true;
    } else {
      set_links_target();
    }
  } else if (locate) {
    set_links_target();
  } else if (nextClass) {
    // Unknown Pattern
  } else {
    locate = searchPagerClassByName(RANK_LIST);
    if (locate) {
      set_links_target();
    }
  }
  

  var base = "http://"+location.host+site;
  var offset;
  var num;
  var query;
  var insertPoint;
  var Enable = PIXIV_AUTO_PAGER_DEFAULT_ENABLE ? 1 : -1;
  var pointEnd;
  
  var Remain = {
    valueOf: function () {
      var sc     = document.documentElement.scrollTop;
      var wh     = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight;
      var total  = (document.body.scrollHeight - wh);
      var remain = total - sc;
      return remain
    }
  };
  
  var watch_scroll = function () {
    if (Remain < 500 && Enable == 1) {
      do_request();
    }
    var self = arguments.callee;
    setTimeout(self, 100);
  };
  
  var appendSearchResult = function (pixivResult) {
    var html = '';
    var list = pixivResult.getElementsByTagName('*');
    var isNextExist = false;
    for (var i = 0; i < list.length; ++i) {
      if (list[i].className == locate) {
        set_links_target(list[i]);
        html += list[i].innerHTML;
      }
      if (list[i].className == nextClass.className) {
        if (list[i].innerHTML.match(/(次へ)/)) {
           isNextExist = true;
        }
      }
    }

    var div       = document.createElement('div');
    div.id        = DIV_ID;
    div.className = locate;
    div.innerHTML = html;
    insertPoint.parentNode.insertBefore(div, insertPoint);
    
    var clear       = document.createElement('div');
    clear.className = "clear";
    div.parentNode.insertBefore(clear, div);
    
    if (isNextExist){
      offset++;
    }
  };
  
  var do_request = function(){
    if (this.requested == offset) {
      return;
    }
    var xmlhttp;
    this.requested = offset;
    try {
      try {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      }
      catch (e) {
        xmlhttp = new XMLHttpRequest();
      }
      xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
          var pixivResult = document.createElement('div');
          pixivResult.innerHTML += xmlhttp.responseText;
          appendSearchResult(pixivResult);
        } 
      };
      xmlhttp.open("GET", base+query.replace(/p=\d*/, "p=" + offset), true);
      xmlhttp.send(null);
    }
    catch (e) {
      GM_xmlhttpRequest({
        method: "GET",
        url: base + query.replace(/p=\d*/,"p=" + offset),
        onload: function (details) {
          var pixivResult = document.createElement('div');
          pixivResult.innerHTML += details.responseText;
          appendSearchResult(pixivResult);
        }
      });
    }
  };
  
  var init_autopager = function () {
    insertPoint = document.getElementById("pointEnd");
    if (address.indexOf("?") != -1) {
      query = address.substr(address.indexOf("?"));
    } else {
      query = "?";
    }
    
    if (query.indexOf("p=") == -1) {
      query += "&p=1";
    }
    if (address.indexOf("/new_illust.php") != -1) {
      query += "&mode=new";
    }
    offset = (query.match(/p=(\d*)/))[1] - 0;
    offset++;
  };
  
  var insertAfter = function (newNode, node) {
    node.parentNode.insertBefore(newNode, node.nextSibling);
  };
  
  // init 
  if (address.indexOf(base) != -1 && usePager) {
    if (document.body.attachEvent) {
      document.body.attachEvent(
        'ondblclick',function () {
          Enable *= -1;
          window.status = (Enable == 1) ? "Enabled" : "Disabled";
        }
      );
    }
    else{
      document.body.addEventListener(
        'dblclick', function () {
          Enable *= -1;
          window.status = (Enable == 1) ? "Enabled" : "Disabled";
        },true
      );
    }
    if (!pointEnd) {
      var pointEnd = document.createElement('div');
      pointEnd.id = "pointEnd";
      insertAfter(pointEnd, document.getElementById(DIV_ID));
    }
    init_autopager();
    set_links_target();
    watch_scroll();
  }
})();
