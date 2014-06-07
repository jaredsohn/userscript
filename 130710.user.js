// ==UserScript==
// @name           douban friends search
// @namespace      hxgdzyuyi
// @include        http://www.douban.com/*
// ==/UserScript==

GM_wait();
var searchFriendShip = null
  , TIPS =
    { NOTHING : '没有找到任何匹配的人'
    , HELP : '输入好友uid或者名字的第一个字符开始搜索'
    }

function GM_wait() {
  if (typeof unsafeWindow.jQuery == 'undefined') {
    window.setTimeout(GM_wait, 100);
  } else {
    $ = unsafeWindow.jQuery;
    run();
  }
}

function run(){
  bindSearchEvents()
}

function bindSearchEvents(){
  var causeSearchChar = '@'
    , searchInput = $('input[name="search_text"]')
    , searhForm = searchInput.closest('form')
    , key =
      { isCauseSearch: function(e){
          var r = false
          if(e.keyCode === 50 && e.shiftKey === true){
            r = true
          }
          return r
        }
      , down: 40
      , up: 38
      , enter: 13
      , esc: 27
      }

  if(searchInput){
    searchInput.bind('input', function(e){
      handleSearchInput(searchInput, causeSearchChar)
    })
    searhForm.submit(function(e){
      searchFriendShip && searchFriendShip.panelHasShow && e.preventDefault()
    })
   searchInput.bind('keydown', function(e){
      if(searchFriendShip && searchFriendShip.panelHasShow){
        switch(e.keyCode){
          case key.down:
            searchFriendShip.nextItem()
            break;
          case key.up:
            e.preventDefault()
            searchFriendShip.prevItem()
            break;
          case key.enter:
            searchFriendShip.enterUserHome()
            break;
          case key.esc:
            searchFriendShip.hidePanel()
            break;
        }
      }
    })
  }
}

function handleSearchInput(searchInput, causeSearchChar){
  var text = searchInput.val()
  if(text.indexOf(causeSearchChar) === -1){
    searchFriendShip
      && searchFriendShip.panelHasShow && searchFriendShip.hidePanel()
    return
  }
  var t = text.split('@')[1]
    , friendName
  l = t.indexOf(' ')
  friendName = (l === -1) ? t : t.substr(0, l)
  !searchFriendShip
    && (searchFriendShip = new SearchFriendShip(searchInput))
  searchFriendShip.search(friendName)
}

var SearchFriendShip = function(el){
    this.el = el
    this.param =
        { count: 10
        , alt: 'xd'
        , word: ''
        }
    this.url = 'https://api.douban.com/shuo/in/complete?callback=?&'
    this.tmpl =
        { userItem: '<li class="y-item" data-uid="{uid}" data-index="{index}">\
            <img class="y-pic"src="{avatar}"/>{username}\
            <span class="y-uid">{nickname}</span></li>'
        , userList: '<ul class="y-user-list"></ul>'
        }
    this.init()
}

SearchFriendShip.prototype = {
  init:function(){
    var self = this
    this.panel = $(this.tmpl.userList)
    this.el.after(this.panel)
    this.panel.hide()
    this.panel.css({ width: this.el.outerWidth()
      , top: this.el.outerHeight() + 10
      , left: 0 })
    this.panel.delegate('.y-item', 'mouseenter', function(){
      self.index = $(this).attr('data-index')
      self.selectUserAsIndex()
    })
    this.panel.delegate('.y-item', 'click', function(){
      self.enterUserHome()
    })
    this.panelHasShow = false
  }
, search: function(word){
    var self = this
    if(word.length === 0){
      this.el.attr('autocomplete', 'off')
      this.showPanel()
      this.tip(TIPS.HELP)
      return
    }
    this.param.word = word
    $.getJSON(this.url + $.param(this.param), function(data){
      if(data.users.length > 0){
        self.updatePanel(data.users)
      }else{
        self.tip(TIPS.NOTHING)
      }
    })
  }
, updatePanel: function(users){
    var self = this
    this.showPanel()
    this.panel.html('')
    this.index = -1
    $.each(users, function(k, user){
      var t = self.tmpl.userItem
        .replace('{username}', user.username)
        .replace('{avatar}', user.avatar)
        .replace('{nickname}', user.uid)
        .replace('{uid}', user.uid.replace(/<\/?b>/g, ''))
        .replace('{index}', k)

      self.panel.append(t)
    })
    this.items = this.panel.find('.y-item')
    if(this.items.length !== 0){
      this.maxIndex = this.items.length - 1
      this.index = 0
      this.selectUserAsIndex()
    }
  }
, hidePanel: function(){
    this.panelHasShow = false
    this.el.attr('autocomplete', 'on')
    this.panel && this.panel.hide()
  }
, showPanel: function(){
    this.panelHasShow = true
    this.el.attr('autocomplete', 'off')
    this.panel.show()
  }
, nextItem: function(){
    (this.index === this.maxIndex) ? this.index = 0 : this.index++
    this.selectUserAsIndex()
  }
, prevItem: function(){
    (this.index === 0) ? this.index = this.maxIndex : this.index--
    this.selectUserAsIndex()
  }
, selectUserAsIndex: function(){
    this.curSelectedUser = this.items.eq(this.index)
    if(this.preSelectedUser && this.index === this.preSelectedUser.attr('data-index')){
      return
    }
    this.curSelectedUser.addClass('on')
    if(this.preSelectedUser){
      this.preSelectedUser.removeClass('on')
    }
    this.preSelectedUser = this.curSelectedUser
  }
, enterUserHome: function(){
    var uid = this.items.eq(this.index).attr('data-uid')
    window.location = 'http://www.douban.com/people/' + uid
  }
, tip: function(text){
    this.panel.html('')
    this.panel.append('<span class="y-tip">' + text + '</span>')
  }
}

GM_addStyle("\
  #db-nav-main .inp>span { position: relative; display: block; }\
  .y-user-list { position: absolute; background: white; z-index: 10000; border: 1px solid #999; padding: 4px 0px; border-radius: 4px; }\
  .y-item { overflow: hidden; line-height: 40px; cursor: pointer; text-overflow:ellipsis; white-space:nowrap; }\
  .y-item.on { background: #e9f0f8; }\
  .y-tip { padding: 4px 8px; color: #666; }\
  .y-pic { float: left;  height: 32px; width: 32px; vertical-align: middle; padding: 4px; }\
")