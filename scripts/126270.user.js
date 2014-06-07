// ==UserScript==
// @name           MediaMarker2OhtaLibrary
// @version        0.50
// @namespace      http://d.hatena.ne.jp/fuji70/
// @description    Ohta Library Lookup from MediaMarker listings.
// @include        http://mediamarker.net/u/*
// ==/UserScript==

(function () {
  function handle(node) {

    // --->> local rules
    ltitle  = '\u5927\u7530\u533a\u7acb\u56f3\u66f8\u9928';
    llinkname = ltitle + '\u304b\u3089\u691c\u7d22'
    baseurl  = 'http://www.lib.city.ota.tokyo.jp/clis/search?ISBN=';
    //          None,       Exist
    colors  = ["#000099", "#000099"];
    backs   = ["#ccccff", "#ffcccc"];
    coments = ['\u306a\u3057 ', '\u8535\u66f8\u3042\u308a '];
    function checkExist(resp) { // 0:None, 1:Exist
      var isExist = resp.responseText.match(/MSGBOLDL/) ? 0 : 1;
      return isExist;
    }
    // <<---

    var links = getElementsByXPath('.//div[@class="med_detail_block"]', node);
    for (var i = 0; i < links.length; ++i) {
      var link = links[i];
      isbn10 = getISBN10(link);
      isbn13 = getISBN13(link);
      if (isbn10 || isbn13) {
        var geturl  = baseurl + isbn10 + "|" + isbn13;
        var f = function(geturl, link){
          GM_xmlhttpRequest({
            method : 'GET',
            url : geturl,
            onload : function(resp) {
              var isExist = checkExist(resp);
              setLink(geturl, isExist, link);
            }
          });
        }
        link2 = getBlock(link);
        f(geturl, link2);
      }
    }
    

    function setLink(geturl, isExist, block) {
      var link = document.createElement('a');
      link.setAttribute('target', '_blank');
      link.setAttribute('href', geturl );
      link.setAttribute('title', ltitle);
      link.innerHTML =
        '<br />' +
        '<span style=\"font-size:14px; ' + 
        'color:' + colors[isExist] + 
        '; background-color:' + backs[isExist] + '\">' +
        '&raquo; [<b>' +
        coments[isExist] + 
        '</b>] ' +
        llinkname +
        '</span>';
      //block.parentNode.insertBefore(link, block.nextSibling);
      block.appendChild(link);
    }

    function getISBN10(node) {
      if (!node.innerHTML.match(/ASIN\/(\d{9}[\dX])\//))
        return false;
      var isbn10 = RegExp.$1
      return isbn10;
    }

    function getISBN13(node) {
      if (!node.innerHTML.match(/ISBN：(\d{12}[\dX])/))
        return false;
      var isbn13 = RegExp.$1;
      return isbn13;
    }

    function getBlock(node) {
      var block = document.evaluate(
        "div[@class='med_title']", node, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      return block;
    }

    function getElementsByXPath(xpath, node) {
      var node = node || document
      var nodesSnapshot = document.evaluate(xpath, node, null,
        //XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null)
      var data = []
      for (var i = 0; i <nodesSnapshot.snapshotLength; i++) {
        data.push(nodesSnapshot.snapshotItem(i))
      }
      return (data.length>= 1) ? data : null
    }

    function log(message) {
      if (unsafeWindow && unsafeWindow.console) {
        unsafeWindow.console.log(message)
      }
    }
  }

  document.body.addEventListener('AutoPagerize_DOMNodeInserted', function(evt) {
    var node = evt.target;
    //var requestURL = evt.newValue;
    //var parentNode = evt.relatedNode;
    handle(node);
  }, false);
  handle(document.body);
})();
