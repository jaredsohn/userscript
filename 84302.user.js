// ==UserScript==
// @name          Reddit Reveal Lite
// @author        buddydvd
// @description   Reveal source code for posts on reddit
// @namespace      Reddit Revealer
// @include        http://www.reddit.com/*
// ==/UserScript==
(function () {
  var l = window.document.location,
    h = l.href,
    q = l.search,
    u = h.substring(0, h.length - q.length) + ".json" + q;
  $.getJSON(u, function (json_data) {

    var dom_data = (function () {
      var result = {},
        key;
      $.each($(".thing"), function () {
        var thingDom = this;
        if ($(this).css("display") === "none") {
          return;
        }
        $.each(this.className.split(" "), function () {
          if (this.indexOf("id-") === 0) {
            var thing_type_name = this.substr(3).split("_");
            if (typeof(result[thing_type_name[0]]) === "undefined") {
              result[thing_type_name[0]] = [];
            }
            result[thing_type_name[0]].push({
              name: thing_type_name[1],
              domObj: thingDom
            });
          }
        });
      });
      return result;
    })();

    var json_result = {};

    function gather_data(json_data) {
      var crawl = function (obj) {
        if (obj && obj.length) {
          $.each(obj, function () {
            crawl(this);
          });
        } else if (typeof(obj) === "object") {
          var kind = obj.kind;
          var data = obj.data;
          if (kind) {
            if (kind === "Listing") {
              crawl(data.children);
            } else if (data) {
              if (typeof(json_result[kind]) === "undefined") {
                json_result[kind] = {};
              }
              json_result[kind][data.id] = data;
              if (kind === "t1" && data.replies) {
                crawl(data.replies);
              }
            }
          }
        }
      };
      crawl(json_data);
    }

    gather_data(json_data);

    var enable_source = function (entry, text) {
      if (entry.find(".usertext-edit").size() > 0 || entry.find(".usertext-body").size() === 0) {
        return;
      }
      entry.find(".usertext-body").after("<div class=\"usertext-edit\" style=\"display:none;\"><div><textarea rows=\"1\" cols=\"1\" name=\"text\">" + text + "</textarea></div><div class=\"bottom-area\"><div class=\"usertext-buttons\"><button type=\"button\" class=\"cancel\" onclick=\"cancel_usertext(this)\">hide</button></div></div></div>");
      entry.find(".flat-list.buttons").append("<li><a class=\"edit-usertext\" href=\"javascript:void(0)\" onclick=\"return edit_usertext(this)\">source</a></li>");
    };

    var update_ui = function () {
      if (dom_data.t1) {
        $.each(dom_data.t1, function () {
          var id = this.name;
          var domObj = this.domObj;
          var data = json_result.t1[id];
          if (!data) {
            return;
          }
          var entry = $(domObj).children(".entry");
          //entry.find(".score.likes").after(get_upvote_downvote_html(data));
          enable_source(entry, data.body);
        });
      }

      var update_t3_ui = function (domObj, data) {
        var thing = $(domObj);
        var entry = thing.children(".entry");
        var midcol = thing.children(".midcol");
        var score = data.score;

        // reveal up/down vote score
        entry.find(".reddit-comment-link, .tagline").prepend(get_upvote_downvote_html(data));

        // reveal mark down source
        enable_source(entry, data.selftext);

        // reveal vote score
        if (midcol.hasClass("likes")) {
          score--;
        }
        if (midcol.hasClass("dislikes")) {
          score++;
        }
        midcol.find(".score.likes").text(score + 1);
        midcol.find(".score.unvoted").text(Math.max(0, score)); // min score is 0
        midcol.find(".score.dislikes").text(Math.max(0, score - 1)); // min score is 0
      };

      if (dom_data.t3) {
        $.each(dom_data.t3, function () {
          var name = this.name;
          var domObj = this.domObj;
          var data = json_result.t3[name];
          if (!data) {
            $.getJSON("http://www.reddit.com/by_id/t3_" + name + ".json", function (json_data) {
              update_t3_ui(domObj, json_data.data.children[0].data);
            });
            return;
          } else {
            update_t3_ui(domObj, data);
          }
        });
      }
    };

    var get_upvote_downvote_html = function (data) {
    };

    update_ui();
  })();
})();