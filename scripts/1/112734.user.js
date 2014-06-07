// ==UserScript==
// @name         Topsy search for twitter
// @namespace    sqt
// @description  Use Topsy for URL search on twitter.
// @version      0.1.1
// @include      http://twitter.com/*
// ==/UserScript==

(function() {

  var source = function() {

    // customize if needed.
    function getTargetUrl(query) {
      if (query.match(/^https?:\/\//)) {
        if (!query.match(/[#\?]/))  // topsy cannot return json for url with '#' or '?'
          return query;
      }
      var sm = query.match(/^#([sn]m\d+)$/);
      if (sm)
        return 'http://www.nicovideo.jp/watch/' + sm[1];
      return null;
    }

    var orig = $.ajax;
    $.ajax = function(options) {
      if (options.url == '/phoenix_search.phoenix') {
        var url = getTargetUrl(options.data.q);
        if (url) {
          return request(url, options);
        }
      }
      return orig.call($, options);
    };

    function request(url, options) {
      return jsonp($.extend($.extend({}, options), {
        url: 'http://otter.topsy.com/trackbacks.js',
        data: {
          url: url,
          nohidden: 1,
          perpage: 20,
          offset: getOffset(url, options.data.max_id),
          sort_method: 'date'
        },
        success: function(data, status, xhr) {
          var d = topsyToTwitter(data, options.data.since_id, options.data.max_id);
          updateOffset(data.request.parameters.url, d.statuses);
          mergeUserInfo(d.statuses, function() {
            if (parseInt(data.request.parameters.offset) != 0 && d.statuses.length) {
              d.statuses.unshift(d.statuses[0]);  // bug?
            }
            options.success(d, status, xhr);
          });
        }
      }));
    }

    function jsonp(options) {
      var callback = 'callback_' + String(new Date().getTime());
      window[callback] = function(data) {
        options.success(data, 'success', { getResponseHeader: $.noop });
      };
      document.body.appendChild($('<script/>').attr({
        type: 'text/javascript',
        src: options.url + '?' + $.param($.extend({
          callback: callback
        }, options.data))
      })[0]);
    }

    var offsets = {};
    function updateOffset(url, statuses) {
      if (!statuses.length) return;
      var o = offsets[url];
      if (!o) {
        o = offsets[url] = {
          minId: '10000000000000000000',
          offset: 0
        };
      }
      for (var i = 0, status; status = statuses[i]; i++) {
        if (twttr.natcompare(o.minId, status.id_str) > 0)
          o.minId = status.id_str;
      }
      o.offset += statuses.length;
    }

    function getOffset(url, maxId) {
      var o = offsets[url];
      if (maxId && o) {
        if (twttr.natcompare(o.minId, maxId) >= 0) {
          return o.offset;
        }
        delete offsets[url];
      }
      return 0;
    }

    function dateToTwitterString(date) {
      var df = date.toUTCString().split(' ');
      return [df[0].slice(0, -1), df[2], df[1], df[4], '+0000', df[3]].join(' ');
    }

    function topsyToTwitter(json, sinceId, maxId) {
      return {
        next_page: null,
        served_by_blender: true,
        error: null,
        statuses: $.map($.grep(json.response.list, function(status) {
          if (status.type != 'tweet') return false;
          var id_str = status.permalink_url.match(/\d+$/)[0];
          if (sinceId && twttr.natcompare(sinceId, id_str) >= 0) return false;
          if (maxId && twttr.natcompare(id_str, maxId) >= 0) return false;
          return true;
        }), function(status) {
          var id_str = status.permalink_url.match(/\d+$/)[0];
          var date = new Date();
          date.setTime(status.date * 1000);
          return {
            favorited: false,
            truncated: false,
            in_reply_to_screen_name: null,
            possibly_sensitive: false,
            retweeted: false,
            in_reply_to_status_id_str: null,
            user: {
              screen_name: status.author.nick
            },
            id_str: id_str,
            in_reply_to_user_id_str: null,
            retweet_count: 0,
            contributors: null,
            source: 'web',
            entities: {
              user_mentions: [],
              urls: [],
              hashtags: []
            },
            geo: null,
            id: parseInt(id_str),
            created_at: dateToTwitterString(date),
            place: null,
            coordinates: null,
            in_reply_to_user_id: null,
            in_reply_to_status_id: null,
            text: status.content,
            result_category: 'relevance'
          };
        })
      };
    }

    function mergeUserInfo(statuses, callback) {
      if(!statuses.length) return callback(statuses);
      twttr.anywhere.api.util.makeRemoteRequest('users/lookup', [{
        screen_name: $.unique($.map(statuses, function(st) { return st.user.screen_name; })).join(',')
      }], {
        success: function(data) {
          var users = {};
          $.each(data, function(i, user) {
            users[user.screen_name.toLowerCase()] = user;
          });
          $.each(statuses, function(i, st) {
            st.user = users[st.user.screen_name.toLowerCase()] || st.user;
          });
          callback(statuses);
        }
      });
    }
  };

  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.innerHTML = '(' + source.toString() + ')();';
  document.body.appendChild(script);

})();