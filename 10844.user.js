// ==UserScript==
// @name          ustream_watchlist_view
// @namespace     http://zeromemory.sblo.jp/
// @description   Watchlist to MultiView of Ustream.
// @include       http://*ustream.tv/mywatchlist
// @version       0.3.0
// 0.1.0
//   initial version
// 0.3.0
//   add play controller
// Copyright (c) 2007 suVene All rights reserved.
// freely distributable under the terms of an MIT-style license.
// http://www.opensource.jp/licenses/mit-license.html
// ==/UserScript==

(function() {

  GM_addStyle(<><![CDATA[
    div.list div.listItems{
      width: 98% !important;
    }
    div.item {
      width: 240px !important;
      /* height: 260px !important; */ /* info visibled height */
      height: 230px !important;
    }
    div.imgCont {
      width: 240px !important;
      height: 195px !important
    }
    /* comment out when you want 4 cols.
    div.item {
      width: 185px !important;
      height: 185px !important;
    }
    div.imgCont {
      width: 180px !important;
      height: 150px !important;
    }
    */
    .play_controller,
    .toggleInfo {
      cursor: pointer;
    }
  ]]></>);

  var w = window;
  if (typeof unsafeWindow != 'undefined') { w = unsafeWindow; }
  function debug(arguments) { try{ w.console.log(arguments); } catch(e) {} }
  function error(arguments) { try{ w.console.error(arguments); } catch(e) {} }

  var $elFirst = function(xpath, root) {
    var context = ((root == null) ? document : root);
    var resolver = function (prefix) {
      var o = document.createNSResolver(context)(prefix);
      return o ? o : (document.contentType == "text/html") ? "" : "http://www.w3.org/1999/xhtml";
    }
    var exp = document.createExpression(xpath, resolver);
    var result = exp.evaluate(context, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
    return result.singleNodeValue ? result.singleNodeValue : null
  };

  var $elEach = function(xpath, func, root) {
    var context = ((root == null) ? document : root);
    var result = context.evaluate(
      xpath, context, null,
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
    );
    for (var i = 0; i < result.snapshotLength; i++) {
      try { func(result.snapshotItem(i)); } catch(e) { error(e) }
    }
  };

  var UStream = function(){ this.init.apply(this, arguments); };
  UStream.prototype.init = function() {};
  UStream.prototype.viewWatchList = function() {
    var self = this;
    $elEach('//div[@class="imgCont"]', function(imgContainer) {

      var imgEl = $elFirst('a/img', imgContainer);
      imgEl.setAttribute("width", (imgContainer.offsetWidth - 10) + 'px');
      imgEl.setAttribute("height", (imgContainer.offsetHeight - 10) + 'px');

      var liveEl = $elFirst('img[@alt="Live"]', imgContainer);
      if (liveEl != null) {
        var removeEl = $elFirst('p[@class="itemInfo"]/a', imgContainer.parentNode);
        removeEl.href.match(/remove\/(.*)$/);
        var embedid = RegExp.$1;
        var itemEl = removeEl.parentNode;
        
        var playEl = document.createElement('div');
        playEl.innerHTML = '<strong>PLAY</strong>';
        playEl.className = 'play_controller';
        playEl.playing = false;
        itemEl.parentNode.insertBefore(playEl, itemEl);
        
        playEl.addEventListener("click", function() {
          imgContainer.innerHTML = '';

          if (!playEl.playing) {
            var container = document.createElement('div');
            container.className = "container";
            container.id = "list-" + embedid;
            var current_width = imgContainer.parentNode.offsetWidth;
            var el = document.createElement('embed');
            el.width = current_width;
            el.height = current_width * 163 / 200;
            el.src = "http://www.ustream.tv/" + embedid + ".usc";
            el.type = "application/x-shockwave-flash";
            el.wmode = "transparent";
            el.title = embedid;
            container.appendChild(el);
            imgContainer.appendChild(container);
            playEl.innerHTML = '<strong>STOP</strong>';
          } else {
            imgContainer.appendChild(imgEl);
            if (liveEl != null) { imgContainer.appendChild(liveEl); }
            playEl.innerHTML = '<strong>PLAY</strong>';
          }
          
          playEl.playing = !playEl.playing;
        }, false);

      }
      
    });
  };

  var ustream = new UStream();
  ustream.viewWatchList();

})();
