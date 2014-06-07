// ==UserScript==
// @name          Twitter Filter
// @description   Filter Twitter timeline by username or keyword
// @author        Chris (http://chrisyip.im)
// @include       http://twitter.com/*
// @include       https://twitter.com/*
// @version       1.0.2
// ==/UserScript==

;(function(){
  var script = document.createElement('script')
    , style = document.createElement("style")
    , callback

    callback = function ($) {
      var stream_items_id = '#stream-items-id', $filter_list, $filter_list_item, init_list, filter, add_list_item

      $filter_body = $('<div>', {
        class: 'cy-filter-916',
        id: 'cy-filter-916'
      })
      $filter_body
        .append("<input placeholder='Filter...'>")
        .on('keyup', 'input', function (e) {
          if (13 == e.keyCode) {
            var keyword = e.target.value.trim()
            if (0 == keyword.length >>> 0) return;
            if (filter.add(keyword)) add_list_item(keyword)
            e.target.value = ''
          }
        })

      $filter_list = $('<ul>')
      $filter_list
        .on('click', '.remove', function (e) {
          filter.remove(e.target.previousElementSibling.textContent)
          $(e.target).closest('li').remove()
        })
        .appendTo($filter_body)

      $filter_list_item = $('<li>').append($('<span>', {
        class: 'keyword'
      })).append($('<span>', {
        class: 'remove'
      }).text('Remove'))

      add_list_item = function (keywords) {
        if (typeof keywords == 'string') {
          keywords = [keywords]
        } else if (false == keywords instanceof Array) {
          return;
        }
        keywords.forEach(function (keyword, idx) {
          var $node = $filter_list_item.clone()
          $node.find('.keyword').text(keyword)
          $filter_list.append($node)
        })
      }

      init_list = function () {
        var items = filter.items()
        items.username.concat(items.keyword).forEach(function (item, idx) {
          var $node = $filter_list_item.clone()
          $node.find('.keyword').text(item)
          $filter_list_item.find('.input').before($node)
        })
      }

      filter = {
        identifier: 'cy-filter-list-916-324',

        items: function (data) {
          var ret

          if (data) {
            localStorage.setItem(this.identifier, JSON.stringify(data))
          }

          try {
            ret = JSON.parse(localStorage.getItem(this.identifier))
          }
          catch (ex) {}
          finally {
            !ret && (ret = {
              username: [],
              keyword: []
            })
          }
          return ret;
        },

        add: function (keyword) {
          if (typeof keyword != 'string') return;
          var items = filter.items()
            , key = 0 == keyword.indexOf('@') ? 'username' : 'keyword'
            , is_success
          if (0 == items[key].filter(function (item, idx) { return item == keyword }).length) {
            items[key].push(keyword)
            this.items(items)
            this.process()
            is_success = true
          }
          return is_success;
        },

        remove: function (keyword) {
          var items = filter.items()
            , key = 0 == keyword.indexOf('@') ? 'username' : 'keyword'
          items[key] = items[key].filter(function (item, idx) {
            return item != keyword;
          })
          this.items(items)
          this.process()
        },

        process: function (elems) {
          // if not homepage or list page, do nothing
          if (!('/' == location.pathname || (-1 == location.pathname.indexOf('/i/') && /^\/[\w]+\/[-\w]+$/.test(location.pathname)))) return;

          var items = filter.items()
            , username = items.username.length >>> 0 ? (username = new RegExp(items.username.join('|'), 'i')) : null
            , keyword = items.keyword.length >>> 0 ? (keyword = new RegExp(items.keyword.join('|'), 'i')) : null

          if (!elems) {
            elems = document.querySelector(stream_items_id).children
          }

          $(elems).each(function (idx, elem) {
            var $elem = $(elem)
              , author = $elem.find('.username').text()
              , tweet_text = $elem.find('.js-tweet-text').text()

            if ((username && username.test(author)) || (keyword && keyword.test(tweet_text))) {
              $elem.remove()
            }
          })
        }
      }

      $(function(){
        var list = document.querySelector(stream_items_id)
          , items = filter.items()
          , event = function (e) {
            if ('CYNodeInserted' == e.animationName) {
              e.stopPropagation()
              filter.process(e.target)
            }
          }
        list.addEventListener('animationstart', event, false)
        list.addEventListener('webkitAnimationStart', event, false)
        ;[].forEach.call(list.children, function (elem, idx) {
          filter.process(elem)
        })
        add_list_item(items.username.concat(items.keyword))
        $(document.body).append($filter_body)
      })
    }

    style.textContent = '@keyframes CYNodeInserted{from{clip:rect(0px,auto,auto,auto)}to{clip:rect(0px,auto,auto,auto)}}@-moz-keyframes CYNodeInserted{from{clip:rect(0px,auto,auto,auto)}to{clip:rect(0px,auto,auto,auto)}}@-webkit-keyframes CYNodeInserted{from{clip:rect(0px,auto,auto,auto)}to{clip:rect(0px,auto,auto,auto)}}.stream-items>li{-webkit-animation-duration:.001s;-moz-animation-duration:.001s;animation-duration:.001s;-webkit-animation-name:CYNodeInserted;-moz-animation-name:CYNodeInserted;animation-name:CYNodeInserted}.cy-filter-916{width:50px;padding:0 0 30px;position:fixed;bottom:5px;right:5px;z-index:9999;background:#fff;border:1px solid #000;-webkit-transition:width .3s linear;-moz-transition:width .3s linear;transition:width .3s linear}.cy-filter-916:hover{width:250px}.cy-filter-916 ul{width:100%;max-height:400px;display:none;overflow-x:auto}.cy-filter-916:hover ul{display:block}.cy-filter-916 li{padding:2px 5px;position:relative;word-break:break-all}.cy-filter-916 li+li{border-top:1px solid rgba(0,0,0,.2)}.cy-filter-916 .remove{position:absolute;top:0;right:5px;color:#f60;cursor:pointer;font-size:12px;line-height:2}.cy-filter-916 input{height:30px;width:100%;position:absolute;bottom:0;left:0;z-index:9;border-radius:0;box-sizing:border-box}'
    document.head.appendChild(style);

    script.textContent = ";(" + callback.toString() + ")(window.jQuery);"
    document.head.appendChild(script)
})();
