// ==UserScript==
// @name          Bloglines HAI - Hide Archived Items
// @namespace     http://runeskaug.com/greasemonkey
// @description   Hides your archived items, and adds a separate link to show them.
// @include       http://www.bloglines.com/myblogs_display*
// @include       http://bloglines.com/myblogs_display*
// @author        Rune Skaug (greasemonkey@runeskaug.com)
// ==/UserScript==

(function() {

  function f() {
    var divs = document.getElementsByTagName("div");
    for (var n=0,div;div=divs[n];n++) {
      if (div.className=='header_nav') {
        var uls = div.parentNode.getElementsByTagName("ul");
        var ac = 0;
        var nc = 0;
        for (var i=0, ul; ul = uls[i]; i++) {
          if (ul.className.indexOf("item_nav") > -1) {
            if (ul.getElementsByTagName('li')[0].childNodes[1].checked) {
              var article = ul.parentNode.parentNode;
              article.className = 'archived_item'; 
              article.style.visibility = 'invisible'; 
              article.style.display = 'none'; 
              ac++;
            }
            else {
              var article = ul.parentNode.parentNode;
              article.className = 'new_item'; 
              nc++;
            }
          }
        }
        if (ac>0) {
          var itt = ac+nc>1 ? 'Items':'Item';
          for (var i=0, ul; ul = uls[i]; i++) {
            if (ul.className==""){
              var lis = ul.getElementsByTagName("li");
              for (var j=0; li=lis[j]; j++) { 
                if (li.className.indexOf("hnonlink") > -1) {
                  li.innerHTML = (ac*1+nc*1)+' '+itt+' (<a style=\'border: 0; margin: 0; padding: 0;\' href=\'#\' onClick=\'var tds = this.parentNode.parentNode.parentNode.parentNode.getElementsByTagName("td"); for (var i=0; i < tds.length; i++) { if (tds[i].className.indexOf("article") > -1) { aItem = tds[i].parentNode.parentNode.parentNode.parentNode; if (aItem.className=="new_item") { aItem.style.visibility = "visible"; aItem.style.display = "block"; } else if (aItem.className=="archived_item"){ aItem.style.visibility = "invisible"; aItem.style.display = "none"; }}};return false;\'>'+nc+' New</a>, <a style=\'border: 0; margin: 0; padding: 0;\' href=\'#\' onClick=\'var tds = this.parentNode.parentNode.parentNode.parentNode.getElementsByTagName("td"); for (var i=0; i < tds.length; i++) { if (tds[i].className.indexOf("article") > -1) { aItem = tds[i].parentNode.parentNode.parentNode.parentNode; if (aItem.className=="archived_item") { aItem.style.visibility = "visible"; aItem.style.display = "block"; } else if (aItem.className=="new_item"){ aItem.style.visibility = "invisible"; aItem.style.display = "none"; }}};return false;\'>'+ac+' Archived</a>)';
                }
              }
            }
          } 
        }
      }
    }
  }
  f();
})();