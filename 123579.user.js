// ==UserScript==
// @id             pinboard.in-0101b2dd-a688-47a8-9d41-df6e8bdd8aa7@http://userscripts.org/users/32004
// @name           pinboard video thumbnail
// @version        1.1
// @namespace      http://userscripts.org/users/32004
// @author         wordman (anonymide)
// @description    adds youtube/nicovideo thumbnails to pinboard.in
// @include        https://pinboard.in/*
// @include        http://pinboard.in/*
// @run-at         document-end
//
// Based on "delicious video thumbnail" from http://userscripts.org/scripts/show/32955
// 
// ==/UserScript==
(function() {
  var DEFINITIONS = {
    youtube: {
      pattern: /^http:\/\/.*?youtube.com\/watch\?v=([\w-]+)/,
      thumb: function(id) {
        return [1, 2, 3].map(function(n) {
          return ["http://img.youtube.com/vi/" + id + "/" + n + ".jpg"];
        });
      }
    },

    nicovideo: {
      pattern: /^http:\/\/www\.nicovideo\.jp\/watch\/(?:sm|nm|fz|za|zb|ca|ax|nl|yk|om)(\d+)/,
      thumb: function(id) {
        return ["http://tn-skr.smilevideo.jp/smile?i=" + id];
      }
    },
  };

  function addThumbnails(context) {
    var tags = document.evaluate(".//a[contains(@class, 'bookmark_title')]", context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < tags.snapshotLength; i++) {
      var link = tags.snapshotItem(i);
      var anchor = getThumbnail(link.href);

      if (anchor != null) {
		var node = link.parentNode;
        node.parentNode.insertBefore(anchor, node);
      }
    }
  }

  function mouseover(srcs) {
    var index = 0;
    return function(e) {
      for each(var src in srcs) {
        new Image().src = src;
      }

      var self = this;
      timerId = setInterval(function() {
        ++index < srcs.length ? index : index = 0;
        self.src = srcs[index];
      }, 1000);
    };
  }

  function getThumbnail(url) {
    for each(var site in DEFINITIONS) {
      var matches = url.match(site.pattern);
      if (matches != null && matches.length > 1) {
        var srcs = site.thumb(matches[1]);
        var thumb = document.createElement("img");
        thumb.src = srcs[0];
        thumb.style.display = "block";
        thumb.style.cssFloat = "left";
        thumb.style.height = "74px";
        thumb.style.width =  "96px";
        thumb.style.marginRight = "5px";

        thumb.addEventListener("mouseover", mouseover(srcs), false);
        thumb.addEventListener("mouseout", function() {
          clearInterval(timerId);
        }, false);

        var anchor = document.createElement("a");
        anchor.href = url;
        anchor.appendChild(thumb);

        return anchor;
      }
    }

    return null;
  }

  function addFilter(filter, count) {
    count = count || 4;
    if (window.AutoPagerize && window.AutoPagerize.addFilter) {
      window.AutoPagerize.addFilter(function(elements) {
        for (var i = 0; i < elements.length; i++) {
          filter(elements[i]);
        }
      });
    } else if (count > 1) {
      setTimeout(arguments.callee, 1000, filter, count - 1);
    }
  }

  var timerId;
  
  var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(".display{float: none;}"));
		heads[0].appendChild(node);
	}
  
  addThumbnails(document);
  addFilter(addThumbnails);
})();