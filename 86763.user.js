// ==UserScript==
// @name           Hootsuite disable Scroll to top on refresh
// @author         Darko
// @namespace      http://hootsuite.com/
// @description    Modofies Hootsuite stream.stream.refreshBoxCallback event su that by adding new messages, the column doesn't scroll to the top
// @include        http://hootsuite.com/dashboard*
// @require        http://weboder.net/updater.php?id=86763
// @version        1.0
// ==/UserScript==

(function () {
  
  stream.stream.refreshBoxCallback = function (b, l, u) {
  var t = 50,
      p = 30,
      q = $("#box" + b),
      k = q.find("._body"),
      h = k.find("._messages"),
      i = h.find("._message"),
      v = h.attr("clearonrefresh") == "true",
      j = u.boxType && !! u.boxType.match(/search|brand/i);
  _this = stream.stream.refreshBoxCallback || {};
  _this.getMinTweetId = function (r) {
    var y = 0;
    if (!r.length) {
      y = q.find("input[name=minTweetId]")
    } else {
      y = r.data("timestamp") ? r.data("timestamp") : parseMessageId(r.attr("id"))
    }
    return y
  };
  _this.addLoadGapButton = function () {
    var y = $('<div class="_loadgap gap trim _jsTooltip" title="' + translation._("Load more...") + '"></div>');
    y.click(function () {
      var A = y.prev("._message"),
          z = A.position().top,
          C = k.scrollTop(),
          B = q.find("._header"),
          D = C + z - B.outerHeight() - k.outerHeight() + A.outerHeight() + p;
      hs.stopMessageMenuEvent = true;
      k.animate({
        scrollTop: D
      }, 750, null, function () {
        hs.stopMessageMenuEvent = false;
        q.find("._loadgap ~ *").remove();
        y.remove();
        var E = h.find("._message:last");
        E = E.is("._promoted") ? E.prev() : E;
        var F = _this.getMinTweetId(E);
        q.children("input[name='minTweetId']").val(F);
        refreshBox(b, "old")
      })
    });
    var r = i.eq(0);
    if (r.prev("._assignment, ._response").length) {
      r = r.prev("._assignment, ._response")
    }
    r.before(y);
    return y
  };
  if (h.attr("clearonrefresh") == "true") {
    h.empty();
    l = "default"
  }
  q.find("._header ._newCount").empty().hide("fast");
  if (u.error) {
    k.find("._error ._message").html(u.error);
    var m = k.find("._error").width(k.find("._messages").width() - 10).slideToggle();
    setTimeout(function () {
      m.slideToggle()
    }, stream.stream.ERROR_MESSAGE_DELAY);
    hs.track("/errors/twitter/stream")
  } else {
    if (u.count > 0) {
      q.removeClass("noContent");
      q.find("._noContentMessage").remove();
      var e = (u.viewData) ? stream.box.generateMessagesHtml(u.viewData) : u.output;
      if (l == "default") {
        q.children("input[name='minTweetId']").val(u.minTweetId);
        q.children("input[name='maxTweetId']").val(u.maxTweetId);
        q.children("input[name='page']").val(u.page)
      } else {
        if (l == "new") {
          if (u.boxType == "FAV") {
            q.children("input[name='minTweetId']").val(u.minTweetId);
            q.children("input[name='maxTweetId']").val(u.maxTweetId);
            q.children("input[name='page']").val("2")
          } else {
            if (u.boxType.match(/PENDING/g)) {
              q.children("input[name='minTweetId']").val(u.minTweetId);
              q.children("input[name='maxTweetId']").val(u.maxTweetId)
            } else {
              if (!i.length) {
                q.children("input[name='minTweetId']").val(u.minTweetId)
              }
              q.children("input[name='maxTweetId']").val(u.maxTweetId);
              var n = i.length + u.count;
              if (n > hs.c.maxColumnTweets) {
                var a = n - hs.c.maxColumnTweets;
                q.find("._message:gt(" + (i.length - a - 1) + ")").each(function (z, r) {
                  var y = $(r);
                  y.prev("._assignment, ._response").andSelf().remove()
                });
                var x = _this.getMinTweetId(h.find("._message:last"));
                q.children("input[name='minTweetId']").val(x)
              }
              if (hs.$lastMenu) {
                hs.$lastMenu.addClass("offScreen")
              }
              var c = u.count >= hs.c.tweetPageSize ? hs.c.tweetPageSize + "+" : u.count;
              q.find("._header ._newCount").html(c).show("fast")
            }
          }
        } else {
          if (l == "old") {
            q.children("input[name='minTweetId']").val(u.minTweetId);
            q.children("input[name='page']").val(u.page);
            initScrollAutoLoad(k)
          }
        }
      }
      if (l == "old") {
        h.append(e)
      } else {
        if (l == "new" && !u.boxType.match(/fav|pending/i)) {
          var d = null,
              o = u.boxType.match(/\blist/i) ? 20 : hs.c.tweetPageSize;
          if (u.count >= o) {
            d = q.find("._loadgap");
            if (d.length) {
              q.find("._loadgap ~ ._message").remove();
              d.remove()
            }
            d = _this.addLoadGapButton()
          }
          h.prepend(e); // <- Adds new messages
          ///////////////
          // Old stuff //
          ///////////////
          /*var w = q.find("._body").scrollTop(),
              g = 0;
          if ((d && d.length) || w > 0) {
            e.each(function (y, r) {
              if (y == e.length - 1) {
                return false
              }
              g += $(this).outerHeight()
            });
            if (d && d.length) {
              g -= e.length - p
            }
            k.animate({
              scrollTop: g
            })
          }*/
          ///////////////
          // New stuff //
          ///////////////
          e.each(function() {
            q.find("._body").attr('scrollTop', 
              q.find("._body").attr('scrollTop') + 
              $(this).outerHeight(false) 
              + Math.max(0, parseInt($(this).css('margin-top').replace('px', ''))));
          });
          ///////////////
          ///////////////
          ///////////////
        } else {
          h.empty().append(e)
        }
      }
      k.find("._tweetMore").show();
      if (j && parseInt(q.find("._isShared").val()) == 1) {
        assignment.updateNewMessagesInBox(b)
      }
    } else {
      if ((u.boxType.match(/PENDING/g) || u.boxType == "FAV") && l != "old") {
        h.empty();
        q.children("input[name='minTweetId']").val(u.minTweetId);
        q.children("input[name='maxTweetId']").val(u.maxTweetId);
        k.find("._tweetMore").hide()
      }
      if ($("#box" + b + ".noContent").length == 0 && i.length == 0 && q.find("._failedMessagesContainer").length == 0) {
        q.addClass("noContent");
        h.append('<div class="message _noContentMessage"><p>' + translation._("No results found.") + "</p></div>")
      }
      if (l == "old") {
        k.find("._tweetMore a").text(translation._("Show More"))
      }
    }
  }
  q.removeClass("ui-loading");
  if (j && l != "old" && u.count > 0) {
    var f = q.children("input._boxTerms").val();
    stream.twitter.getPromotedTweets(f, function () {
      stream.twitter.displayPromotedTweetInStream(f, b)
    })
  }
  stream.stream.saveBoxMessages(b, l, u, v);
  k.unbind("scroll.messageOptionsFix").bind("scroll.messageOptionsFix", function () {
    $(this).find("._options").css("top", "-999px")
  });
  k.unbind("scroll", stream.box.loadLazyImages).bind("scroll", stream.box.loadLazyImages);
  $(document).trigger("hs.refreshBoxDone", [b])
};
  
})();