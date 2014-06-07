// ==UserScript==
// @name          24ur.com - Brez oglasov in reklam
// @namespace     http://userscripts.org/scripts/show/57025
// @author        Janez
// @description   Vas motijo video oglasi na 24ur.com ali poptv.si? Nič več. Vse video vsebine postanejo brez nadležnih oglasov, in hitra ter čista stran brez reklam.
// @run-at        document-end
// @grant         none
// @match         *://24ur.com/*
// @match         *://*.24ur.com/*
// @exclude       htt*://*/adserver/*
// ==/UserScript==


var hide_all_ads = true;
var scroll_to_title = true;


/* config ends, code below */
(function () {
  window.loadXMLDoc = function(url) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, false);
    xhttp.send();
    return xhttp.responseXML;
  }

  window.getVideoURL = function(media_id) {
    var xml = loadXMLDoc('http://www.24ur.com/bin/player/?mod=serve&media_id=' + media_id + '&section_id=2');
    var item = xml.childNodes[0].getElementsByTagName('item')[0];
    if (item.getAttribute("type") == "video") {
      var src = item.getAttribute("src"), server = item.getAttribute("server"), ext = item.getAttribute("mimetype");
      return 'http://vid0' + server + '.24ur.com' + src.substring(1) + '-1.' + ext;
    }
  }

  window.load_next_video = function(id) {
    var url = getVideoURL(id);
    var html;
    if (window.chrome)
      html = '<video width="620" height="360" controls><source id="new_video_frame" src="' + url + '" type="video/mp4"></video>';
    else
      html = '<iframe id="new_video_frame" width="620" height="360" frameborder="0" src="' + url + '"></iframe>';
    document.getElementById('new_video_frame').innerHTML = html;
  }

  if (hide_all_ads) {
    /* hide banner ads by CSS */
    if (document.styleSheets)
      document.styleSheets[0].insertRule("div[id*=banner], div[class*=banner], div[id*=Banner], div[id*=phpads], .maxtvPoptvsi, #horoscope, div[id*=div_tvlisting_live], div[id*=svet], div[id*=teaser], div[class*=PromoArticle] {display:none}", document.styleSheets[0].cssRules.length);
    else {  /* else hide banner ads by XPath/DOM */
      var xpr = document.evaluate("//div[contains(@id, 'banner')] | //div[contains(@class, 'banner')] | //div[contains(@id, 'Banner')] | //div[contains(@id, 'phpads')] | //div[@class='maxtvPoptvsi'] | //div[@id='horoscope'] | //div[@id='div_tvlisting_live'] | //div[@id='svet'] | //div[contains(@id, 'teaser')] | //div[contains(@class, 'PromoArticle')]",
        document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
      for (var d, i = xpr.snapshotLength; d = xpr.snapshotItem(--i) ;) {
        d.style.display = "none";  //d.innerHTML = "";
      }
    }
  }

  if (scroll_to_title) document.getElementById('article').scrollIntoView();
  
  /* replace current video */
  var el, count=0;
  if (window.media_id) {
    interval = setInterval(function() {
      ++count; if (count >= 50) clearInterval(interval);
      if (el = document.getElementById("mediacenter2")) {
        var id = (el.getAttribute("flashvars").match("media_id=[^&]+") + "").substring(9);
        var p = el.parentNode;
        p.removeChild(el);
        // html5 video in chrome, iframe in firefox
        p.innerHTML+='<div id="new_video_frame"></div>';
        clearInterval(interval);
        load_next_video(id);
      }
    }, 20);
  }

  /* replace additional video links */
  var xpr = document.evaluate("//div[@id='more_video_content']//a", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i = xpr.snapshotLength; el = xpr.snapshotItem(--i) ;) {
    el.setAttribute("onclick", "load_next_video(" + el.getAttribute("onclick").match("[0-9]+") + ");return false;");
  }
})();
