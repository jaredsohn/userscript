// ==UserScript==
// @name          Reddit Reveal
// @author        buddydvd
// @description   Reveal hidden information on reddit
// @namespace      Reddit Revealer
// @include        http://www.reddit.com/*
// ==/UserScript==

function GM_wait(callback) {
   if (typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
   else { $ = unsafeWindow.jQuery; if (callback) { callback(); } }
}

GM_wait(function () {
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

    var get_upvote_downvote_html = function (data) {
      var rv = " (";
      rv += "<span style=\"color:orangeRed\">+" + data.ups + "</span>/";
      rv += "<span style=\"color:#5F99CF\">-" + data.downs + "</span>";
      rv += ") ";
      return rv;
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
          entry.find(".score.likes").after(get_upvote_downvote_html(data));
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

    update_ui();

  });

  (function () {
    var h = {},
      u = [];
    $(".author").each(function () {
      var a = $(this).text();
      if (!h[a]) {
        h[a] = [this];
        u.push(a);
      } else {
        h[a].push(this);
      }
    });
    $.each(u, function () {
      var username = this;
      $(h[this]).hover(
        function () {
          var rev = $(this).next(".revelation");
          if (rev.size() === 0) {
            var tip = $("<span class=\"revelation\" style=\"position:relative;\"/>");
            $(this).after(tip);
            $.getJSON("http://www.reddit.com/user/" + username + "/about.json", function (a) {
              tip.html(
                " (<span style=\"color:#B40404\"><b>" + a.data.link_karma + "</b> link karmas</span>," +
                " <span style=\"color:#04B404\"><b>" + a.data.comment_karma + "</b> comment karmas</span>, " +
                " <span style=\"color:#0404B4\"><b>" + parseInt((((new Date()).getTime() / 1000) - a.data.created_utc) / 86400, 10) + "</b> days</span>) ");
            });
          } else {
            rev.css("display", "");
          }
        },
        function () {
          $(this).next(".revelation").css("display", "none");
        }
      );
    });
  })();
});