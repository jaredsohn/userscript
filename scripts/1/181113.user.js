// ==UserScript==
// @name           SoundCloud Queue
// @namespace      http://polygonpla.net/
// @description    Add track to queue in SoundCloud
// @include        http*://soundcloud.com/*
// @author         polygon planet
// @version        1.0.7
// @updateURL      https://userscripts.org/scripts/source/181113.meta.js
// @downloadURL    https://userscripts.org/scripts/source/181113.user.js
// @grant          unsafeWindow
// @grant          GM_log
// @grant          GM_addStyle
// ==/UserScript==
(function() {
'use strict';

var BASE_URL = 'https://soundcloud.com';

var Queue = {
  key: '__soundcloud_queue_user.js:queue_tracks',
  playlistPanelKey: '__soundcloud_queue_user.js:playlist_panel',
  playlistPanel: null,
  queueButton: null,
  lastItem: null,

  getItems: function() {
    return JSON.parse(win.localStorage.getItem(this.key)) || [];
  },
  setItems: function(items) {
    win.localStorage.setItem(this.key, JSON.stringify(items || []));
  },
  has: function() {
    return this.getItems().length > 0;
  },
  add: function(item) {
    var items = this.getItems();
    items.push(item);
    this.setItems(items);
  },
  remove: function(item) {
    var items = this.getItems();
    var newItems = [];
    var found = false;
    for (var i = items.length - 1; i >= 0; i--) {
      if (!found && items[i].url === item.url) {
        found = true;
        continue;
      }
      newItems.unshift(items[i]);
    }
    this.setItems(newItems);
  },
  clear: function() {
    this.setItems([]);
  },
  shift: function() {
    var items = this.getItems();
    var item = items.shift();
    this.lastItem = item;
    this.setItems(items);
    return item;
  },
  head: function() {
    var items = this.getItems();
    return items.length ? items[0] : null;
  },

  getPlaylistPanelData: function() {
    return JSON.parse(win.localStorage.getItem(this.playlistPanelKey)) || {};
  },
  setPlaylistPanelData: function(data) {
    win.localStorage.setItem(this.playlistPanelKey, JSON.stringify(data || {}));
  },

  sortingObserver: {
    starting: false,
    inElement: false,
    changeCursor: function(remove) {
      var item = $('.' + Queue.QUEUE_LIST_SORTING_CN);
      var body = $('body');

      if (!remove && this.inElement) {
        item.addClass(Queue.QUEUE_LIST_SORTING_IN_ELEM_CN);
      } else {
        item.removeClass(Queue.QUEUE_LIST_SORTING_IN_ELEM_CN);
      }

      if (remove || this.inElement) {
        body.removeClass(Queue.QUEUE_LIST_SORT_DEL_CN);
      } else {
        body.addClass(Queue.QUEUE_LIST_SORT_DEL_CN);
      }
    },
    start: function() {
      $(doc).on('mousemove', this.onMouseMove);
      this.starting = true;
    },
    stop: function() {
      $(doc).off('mousemove', this.onMouseMove);
      this.starting = false;
      this.changeCursor(true);
    },
    onMouseMove: function(ev) {
      Queue.sortingObserver.inElement = cursorInElement(Queue.playlistPanel, ev);
      Queue.sortingObserver.changeCursor();
    }
  },

  QUEUE_LIST_PANEL_CN: 'sc-queue-userjs-queuelist-panel',
  QUEUE_LIST_SORT_DEL_CN: 'sc-queue-userjs-sortable-delete',
  QUEUE_LIST_SORTING_CN: 'sc-queue-userjs-sortable-sorting-item',
  QUEUE_LIST_SORTING_IN_ELEM_CN: 'sc-queue-userjs-sortable-sorting-item-in-element',
  createQueueList: function() {
    var that = this;
    var items = this.getItems();

    var ol = $('<ol>')
      .addClass(this.QUEUE_LIST_PANEL_CN)
      .sortable(function() {
        function stop(ev, ui) {
          ui.item.removeClass(that.QUEUE_LIST_SORTING_CN);

          if (!that.sortingObserver.inElement) {
            that.remove(ui.item.data('item'));
            ui.item.remove();
          }
          if (that.sortingObserver.starting) {
            that.sortingObserver.stop();
          }
          $('body').removeClass(that.QUEUE_LIST_SORT_DEL_CN);
          ui.item.removeClass(that.QUEUE_LIST_SORTING_IN_ELEM_CN);
          that.setQueueButtonStyle();
        }
        return {
          placeholder: 'sc-queue-userjs-sortable-placeholder',
          start: function(ev, ui) {
            ui.item.addClass(that.QUEUE_LIST_SORTING_CN);
            if (!that.sortingObserver.starting) {
              that.sortingObserver.start();
            }
          },
          stop: stop,
          update: function(ev, ui) {
            stop.apply(this, arguments);

            var lists = [];
            ol.find('li').each(function() {
              lists.push($(this).data('item'));
            });
            that.setItems(lists);
            that.setQueueButtonStyle();
          }
        };
      }());

    for (var i = 0, l = items.length; i < l; i++) {
      $('<li>')
        .addClass('sc-queue-userjs-playlist-text')
        .text(format(items[i]))
        .data('item', items[i])
        .appendTo(ol);
    }
    this.playlistPanel.find('.' + this.PLAYLIST_CONTENT_CN).empty().append(ol);
    this.setQueueButtonStyle();
  },

  PLAYLIST_HEADER_CN: 'sc-queue-userjs-queue-panel-header',
  PLAYLIST_CONTENT_CN: 'sc-queue-userjs-playlist-content',
  PLAYLIST_PANEL_CN: 'sc-queue-userjs-playlist-panel',
  appendPlaylistPanel: function() {
    var that = this;

    if ($('.' + this.PLAYLIST_PANEL_CN).length) {
      return;
    }

    var data = this.getPlaylistPanelData();
    if (!data.top) {
      data.top = '52px';
    }
    if (!data.right) {
      data.right = '5px';
    }

    if (!data.width || !data.height) {
      data.width = '350px';
      data.height = '400px';
    }

    if (data.top && parseInt(data.top, 10) <= -90) {
      data.top = '54px';
    }
    if (data.left && parseInt(data.left, 10) <= -90) {
      data.left = '6px';
    }

    var shadowClass = 'sc-queue-userjs-box-shadow';

    var panel = $('<div>')
      .addClass(this.PLAYLIST_PANEL_CN)
      .addClass('sc-queue-userjs-unselectable')
      .addClass('sc-queue-userjs-button')
      .addClass('sc-queue-userjs-panel')
      .addClass(shadowClass)
      .css(function() {
        var css = {
          position: 'fixed',
          textAlign: 'left',
          width: data.width,
          height: data.height,
          top: data.top
        };
        if (data.left) {
          css.left = data.left;
        } else {
          css.right = data.right;
        }
        return css;
      }())
      .resizable({
        minWidth: 100,
        minHeight: 100,
        stop: function(ev, ui) {
          that.toggleResizeGrip();
          panel.css({ position: 'fixed' });
          that.setPlaylistPanelData(function() {
            var data = that.getPlaylistPanelData();

            if (data.top && parseInt(data.top, 10) <= -90) {
              data.top = '54px';
            }
            if (data.left && parseInt(data.left, 10) <= -90) {
              data.left = '6px';
            }

            data.width = panel.width();
            data.height = panel.height();
            return data;
          }());
        }
      })
      .draggable({
        handle: '.' + this.PLAYLIST_HEADER_CN,
        opacity: 0.75,
        start: function(ev, ui) {
          panel.removeClass(shadowClass);
          panel.children('div').hide();
        },
        stop: function(ev, ui) {
          panel.addClass(shadowClass);
          panel.children('div').show();
          that.removeBodyCursorStyle();
          that.setPlaylistPanelData(function() {
            var data = that.getPlaylistPanelData();

            if (data.top && parseInt(data.top, 10) <= -90) {
              data.top = '54px';
            }
            if (data.left && parseInt(data.left, 10) <= -90) {
              data.left = '6px';
            }

            if (panel.css('left')) {
              data.left = panel.css('left');
            } else {
              data.right = panel.css('right');
            }
            data.top = panel.css('top');
            return data;
          }());
        }
      })
      .hide()
      .appendTo('#content');

    var header = $('<div>')
      .addClass(this.PLAYLIST_HEADER_CN)
      .css({
        cursor: 'move'
      })
      .text('Queue Playlist')
      .appendTo(panel);

    var content = $('<div>')
      .addClass(this.PLAYLIST_CONTENT_CN)
      .css({
        marginTop: 32,
        overflowX: 'hidden',
        overflowY: 'auto',
        width: '100%',
        height: 'calc(100% - 32px)'
      })
      .appendTo(panel);

    this.playlistPanel = panel;
  },

  QUEUE_BUTTON_CN: 'sc-queue-userjs-header-button',
  QUEUE_BUTTON_ON_CN: 'sc-queue-userjs-header-button-on',
  QUEUE_BUTTON_ON_EMPTY_CN: 'sc-queue-userjs-header-button-on-empty-queue',
  appendPlaylistButton: function() {
    var that = this;

    if ($('.' + this.QUEUE_BUTTON_CN).length) {
      return;
    }

    var li = $('<li>');

    var button = $('<a>')
      .attr({
        href: 'javascript:void(0)',
        title: 'Queue'
      })
      .addClass('sc-button')
      .addClass(this.QUEUE_BUTTON_CN)
      .addClass('sc-queue-userjs-unselectable')
      .text('Queue')
      .on('click', function() {
        if (that.playlistPanel.is(':visible')) {
          that.playlistPanel.hide();
        } else {
          that.createQueueList();
          that.playlistPanel.show();
        }
        that.setQueueButtonStyle();
      });

    this.queueButton = button;

    li.append(button).prependTo('.header ul.header__userMenu');
  },
  setQueueButtonStyle: function() {
    if (this.queueButton && this.playlistPanel) {
      this.queueButton
        .removeClass(this.QUEUE_BUTTON_ON_CN)
        .removeClass(this.QUEUE_BUTTON_ON_EMPTY_CN);

      if (this.playlistPanel.is(':visible')) {
        if (this.has()) {
          this.queueButton.addClass(this.QUEUE_BUTTON_ON_CN);
        } else {
          this.queueButton.addClass(this.QUEUE_BUTTON_ON_EMPTY_CN);
        }
      }
    }
  },
  toggleResizeGrip: function() {
    if (!this.playlistPanel) {
      return;
    }

    var grip = this.playlistPanel.find('.ui-icon-gripsmall-diagonal-se');
    var content = this.playlistPanel.find('.' + this.PLAYLIST_CONTENT_CN);

    if (hasScrollBar(content)) {
      grip.css({ opacity: 0 });
    } else {
      grip.css({ opacity: 1 });
    }
  },
  removeBodyCursorStyle: function() {
    $('body').css({ cursor: '' });
  },

  ADD_BUTTON_CN: 'sc-queue-userjs-add-button',
  appendAddButton: function() {
    var that = this;

    if ($('.soundTitle__playButton').length === $('.soundTitle__playButton .' + this.ADD_BUTTON_CN).length) {
      return;
    }

    var expr;
    var fullPage = false;
    var searchPage = false;
    var pageUrl = currentURL();
    var basicExpr = '.soundList__item';
    var searchListExpr = '.searchList__item';
    var fullListExpr = '.listen-content.l-fullwidth';

    if ($(searchListExpr).length && /\/search/.test(pageUrl)) {
      searchPage = true;
      expr = searchListExpr;
    } else if ($(fullListExpr).length && /^https?:\/+[^\/]+\/[^\/]+\/[^\/]+$/.test(pageUrl)) {
      fullPage = true;
      expr = fullListExpr;
    } else {
      expr = basicExpr;
    }

    $(expr).each(function() {
      var self = $(this);

      if (self.find('.soundTitle__playButton .' + that.ADD_BUTTON_CN).length) {
        return;
      }

      var path, url, playButtonExpr, title, username;

      if (fullPage) {
        path = pageUrl.replace(/^[^\/]+\/+[^\/]+/, '');
        playButtonExpr = expr + ' .soundTitle__playButton .sc-button-play';
      } else {
        var coverArtHref = self.find('.sound__coverArt').attr('href');

        path = self.find('.sc-media-content .soundTitle__title').attr('href');
        playButtonExpr = '.soundList__item a[href="' + coverArtHref + '"] + .sound__header .sc-button-play';
      }

      title = $.trim(self.find('.soundTitle__title').text());
      username = $.trim(self.find('.soundTitle__username').text());
      url = BASE_URL + path;

      that.wrapPlayButton.call(self);

      var item = {
        path: path,
        url: url,
        playButtonExpr: playButtonExpr,
        title: title,
        username: username
      };

      var button = $('<button>')
        .addClass(that.ADD_BUTTON_CN)
        .addClass('sc-queue-userjs-unselectable')
        .addClass('sc-queue-userjs-button')
        .attr({
          title: 'Add to queue',
          type: 'button'
        })
        .css({
          width: 20,
          height: 20,
          display: 'inline-block',
          position: 'absolute',
          top: fullPage ? '28px' : '18px',
          left: '34px',
          fontSize: '17px',
          cursor: 'pointer'
        })
        .text('+')
        .on('click', function() {
          that.add(item);
          that.createQueueList();
          that.notify('Added to queue:', format(item));
        });

      self.find('.soundTitle__playButton').append(button);
    });
  },
  wrapPlayButton: function() {
    var button = this.find('button.sc-button-play');
    if (!button.length) {
      return;
    }

    var pos = button.position();
    var size = {
      width: button.width() + 2,
      height: button.height() + 2
    };

    var wrap = $('<div>')
      .attr({ title: button.attr('title') })
      .addClass('sc-queue-userjs-sc-button-play-wrap')
      .css({
        top: pos.top,
        left: pos.left,
        width: size.width,
        height: size.height
      })
      .on('click', function(ev) {
        cancel(ev);
        Player.withSoundChangeIgnored(function() {
          button.click();
        });
        return false;
      })
      .appendTo(button.parent());
  },

  SIZED_BUTTON_WRAPPER_CN_PRE: 'sc-queue-userjs-sc-button-play-wrap-',
  wrapSizedPlayButton: function() {
    var that = this;

    function append(size) {
      var className = that.SIZED_BUTTON_WRAPPER_CN_PRE + size;
      var buttons = $('button.sc-button-play.sc-button-' + size);

      buttons.each(function() {
        var button = $(this);
        var group = button.parent();
        var toolbar = group.parent();
        var action = toolbar.parent();
        var isSoundBadgeList = false;
        var actionHidden = false;

        if (button.length && group.find('.' + className).length === 0) {

          if (group.hasClass('sc-button-group-small') &&
              group.hasClass('sc-button-group') &&
              toolbar.hasClass('soundActions__small') &&
              toolbar.hasClass('soundActions') &&
              toolbar.hasClass('sc-button-toolbar') &&
              action.hasClass('soundBadge__actions')
          ) {
            isSoundBadgeList = true;
            group.css({
              position: 'relative'
            });
          }

          if (isSoundBadgeList && !action.is(':visible')) {
            actionHidden = true;
            action.show();
          }

          var pos = button.position();
          var size = {
            width: button.width() + 2,
            height: button.height() + 2
          };

          var wrap = $('<div>')
            .attr({ title: button.attr('title') })
            .addClass(className)
            .css({
              top: pos.top,
              left: pos.left,
              width: size.width,
              height: size.height
            })
            .on('click', function(ev) {
              cancel(ev);
              Player.withSoundChangeIgnored(function() {
                button.click();
              });
              return false;
            })
            .appendTo(group);

          if (actionHidden) {
            action.css({
              display: ''
            });
          }
        }
      });
    }

    append('small'), append('large');
  },

  STYLE_CN: 'sc-queue-userjs-css',
  addStyle: function() {
    if ($('.' + this.STYLE_CN).length) {
      return;
    }

    var style = doc.createElement('style');
    style.type = 'text/css';
    style.className = this.STYLE_CN;

    /*!
     * jQuery UI Resizable 1.10.2
     * http://jqueryui.com
     *
     * Copyright 2013 jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://docs.jquery.com/UI/Resizable#theming
     */
    var jQueryUICSS = '.ui-resizable{position:relative}.ui-resizable-handle{position:absolute;font-size:.1px;display:block}' +
    '.ui-resizable-disabled .ui-resizable-handle,.ui-resizable-autohide .ui-resizable-handle{display:none}' +
    '.ui-resizable-n{cursor:n-resize;height:7px;width:100%;top:-5px;left:0}.ui-resizable-s{cursor:s-resize;height:7px;width:100%;bottom:-5px;left:0}' +
    '.ui-resizable-e{cursor:e-resize;width:7px;right:-5px;top:0;height:100%}.ui-resizable-w{cursor:w-resize;width:7px;left:-5px;top:0;height:100%}' +
    '.ui-resizable-se{cursor:se-resize;width:12px;height:12px;right:1px;bottom:1px}' +
    '.ui-resizable-sw{cursor:sw-resize;width:9px;height:9px;left:-5px;bottom:-5px}' +
    '.ui-resizable-nw{cursor:nw-resize;width:9px;height:9px;left:-5px;top:-5px}' +
    '.ui-resizable-ne{cursor:ne-resize;width:9px;height:9px;right:-5px;top:-5px}' +
    '.ui-icon-gripsmall-diagonal-se{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4jWNgGAUDA+54M' +
    'vwHYYoM2GlLgQH0B+h+JjkM0P08BMKAkJ8JhgEhP1M1DAAd1TJH67YKPgAAAABJRU5ErkJggg==) no-repeat 0 0 transparent;width:16px;height:16px}';

    var css = '.sc-queue-userjs-unselectable {' +
      '-moz-user-select: none; -webkit-user-select: none; -ms-user-select: none; user-select: none;' +
    '}' +
    '.sc-queue-userjs-playlist-text {' +
      'border-bottom: 1px dashed #FF8833; font-size: 13px; cursor: default;' +
      'margin: 2px 0 2px 11px; padding-bottom: 5px; text-shadow: 1px 1px #AAA;' +
    '}' +
    '.sc-queue-userjs-playlist-text:last-child {' +
      'border-bottom: none;' +
    '}' +
    '.sc-queue-userjs-sortable-placeholder {' +
      'border: 1px dashed #e87f26; background-color: #e8a0e8; height: 20px; padding: 2px 4px; opacity: .8;' +
    '}' +
    '.sc-queue-userjs-queuelist-panel {' +
      'padding-top: 5px;' +
    '}' +
    '.sc-queue-userjs-sortable-sorting-item {' +
      'list-style: none; border: none; cursor: inherit;' +
    '}' +
    '.sc-queue-userjs-sortable-sorting-item-in-element {' +
      'cursor: default;' +
    '}' +
    '.sc-queue-userjs-box-shadow {' +
      'box-shadow: #555 1px 1px 5px;' +
    '}' +
    '.sc-queue-userjs-sortable-delete,' +
    'html body.sc-queue-userjs-sortable-delete,' +
    'html body.sc-queue-userjs-sortable-delete #app,' +
    'html body.sc-queue-userjs-sortable-delete #app #content {' +
      'cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAfklEQVQ4jWNgoBH4jwMTp/H' +
                  'w4e9wGplNyKD/t279Bitcu/YzXozNELDmsLAwMMalESY/bdp7DENQbIYpRMcbN/4Ha25oeI1pAAyDFODCSBqxhgN6QGHF' +
                  '2JyPYgAsDJDDAuZ8XP4fbgYga0Jn44pCFEMYcEQloSjEahAWTH0AABlhZX95nCwBAAAAAElFTkSuQmCC), auto;' +
    '}' +
    '.sc-queue-userjs-button {' +
      'background-color: #FF6600; ' +
      'background-image: linear-gradient(rgba(255, 153, 0, 0.6), rgba(255, 102, 0, 0.6) 40%, rgba(255, 17, 0, 0.6));' +
      'border-color: rgba(255, 102, 0, 0.75) rgba(255, 51, 0, 0.25) rgba(255, 17, 0, 0.25);' +
      'border-radius: 50%; border-top-width: 0; box-shadow: 0 0 2px rgba(255, 51, 0, 0.35),' +
      ' 0 -1px 3px rgba(255, 51, 0, 0.45) inset,' +
      ' 0 0 3px rgba(0, 0, 0, 0.15), 0 1px 0 rgba(102, 51, 0, 0.2) inset,' +
      ' 0 2px 2px rgba(255, 255, 255, 0.25) inset, 0 -2px 2px rgba(255, 255, 255, 0.2) inset;' +
      'text-shadow: none; color: #fff; font-weight: bold; text-align: center;' +
    '}' +
    '.sc-queue-userjs-panel {' +
      'display: block; position: absolute; top: 70px; right: 5px; background-color: #FEBA96; border: 2px solid #FF6600; ' +
      'border-radius: 0px; opacity: 0.88; z-index: 999;' +
    '}' +
    '.sc-queue-userjs-queue-panel-header {' +
      'height: 30px; text-align: center; font-size: 15px; line-height: 2; overflow: hidden;' +
      'background: radial-gradient(rgba(255, 153, 0, 0.5), rgba(255, 102, 0, 0.5) 50%,' +
      ' rgba(255, 17, 0, 0.5)) repeat scroll 0px 0px rgba(255, 150, 150, 0.5); border-bottom: 2px solid rgba(255, 90, 15, 0.7);' +
      'display: block; position: absolute; width: 100%; text-shadow: 1px 1px 1px rgb(204, 204, 204); color: rgba(50, 50, 255, 0.6);' +
    '}' +
    '.header .header__userMenu .sc-queue-userjs-header-button {' +
      'height: 25px; padding: 0px; position: relative; text-align: center; top: 10px; width: 60px;' +
      'background-image: linear-gradient(rgba(155, 155, 155, 0.4), rgba(65, 65, 65, 0.7), rgba(40, 40, 40, 0.5));' +
      'left: -8px; margin: 0px;' +
    '}' +
    '.header ul.header__userMenu .sc-queue-userjs-header-button-on {' +
      'color: #FF6633;' +
    '}' +
    '.header ul.header__userMenu .sc-queue-userjs-header-button-on-empty-queue {' +
      'color: #BB6633;' +
    '}' +
    '.sc-queue-userjs-control-button-wrap {' +
      'position: absolute; height: 45px; background: #ff9999; cursor: pointer; opacity: 0; position: absolute; zIndex: 99999;' +
    '}' +
    '.sc-queue-userjs-sc-button-play-wrap {' +
      'border: 1px solid #000000; border-radius: 15px; cursor: pointer; height: 29px; left: 0px; opacity: 0; position: absolute;' +
      'top: 10px; width: 29px; z-index: 999999;' +
    '}' +
    '.sc-queue-userjs-sc-button-play-wrap-small {' +
      'border: 1px solid #000000; border-radius: 15px; cursor: pointer; height: 20px; left: 19px; opacity: 0; position: absolute;' +
      'top: 0px; width: 20px; z-index: 999999;' +
    '}' +
    '.sc-queue-userjs-sc-button-play-wrap-large {' +
      'border: 1px solid #000000; border-radius: 20px; cursor: pointer; height: 39px; left: 0px; opacity: 0; position: absolute;' +
      'top: 0; width: 39px; z-index: 999999;' +
    '}' +
    'div.sound.streamContext a.soundTitle__username {' +
      'margin-left: 60px;' +
    '}' +
    '.soundTitle__title {' +
      'margin-left: 26px;' +
    '}' +
    'header .headerSearch .quicksearch {' +
      'max-width: 300px!important;' +
    '}';

    var cssText = jQueryUICSS + css;

    if (style.styleSheet) {
      style.styleSheet.cssText = cssText;
    } else {
      style.appendChild(doc.createTextNode(cssText));
    }
    doc.head.appendChild(style);
  },
  addButtons: function() {
    if ($('.sc-button-play').length) {
      this.addStyle();
      this.appendPlaylistPanel();
      this.appendPlaylistButton();
      this.appendAddButton();
      this.wrapSizedPlayButton();
    }
  },

  notifyBoard: null,
  createNotifyBoard: function() {
    var board = $('<div>')
      .addClass('sc-queue-userjs-button')
      .addClass('sc-queue-userjs-panel')
      .css({
        width: 300,
        height: 'auto',
        position: 'fixed',
        top: '50px',
        textAlign: 'center',
        cursor: 'default',
        fontSize: '13px',
        padding: '5px',
        textShadow: '1px 1px #AAA',
        backgroundImage: 'linear-gradient(rgba(255, 153, 0, 0.5), rgba(255, 102, 0, 0.5) 55%, rgba(255, 17, 0, 0.5))',
        borderBottom: '1px solid #FF5522',
        borderRadius: '3px',
        boxShadow: '#777 1px 1px 5px'
      })
      .hide()
      .appendTo('body');

    var title = $('<div>')
      .css({
        fontWeight: 'bold',
        marginBottom: 3,
        borderBottom: '1px dashed #FF6633',
        color: '#5577FF',
        paddingBottom: 4,
        textShadow: '1px 1px 5px #FFF'
      })
      .appendTo(board);

    var content = $('<div>').appendTo(board);

    this.notifyBoard = {
      board: board,
      title: title,
      content: content
    };
  },
  notifyFadeOutTimer: null,
  notify: function(title, msg) {
    var that = this;

    if (this.notifyBoard) {
      this.notifyBoard.title.text(title);
      this.notifyBoard.content.text(msg);

      if (this.notifyFadeOutTimer) {
        clearWait(this.notifyFadeOutTimer);
        this.notifyFadeOutTimer = null;
      }
      this.notifyBoard.board.show();

      this.notifyFadeOutTimer = wait(function() {
        if (that.notifyFadeOutTimer) {
          that.notifyBoard.board.fadeOut('fast').promise().then(function() {
            that.notifyBoard.board.hide();
            that.notifyFadeOutTimer = null;
          });
        }
      }, 3500);
    }
  }
};


var Player = {
  playControl: null,
  playbackTitle: null,
  skipControlPrevious: null,
  skipControlNext: null,
  playControlWrappers: null,
  ignoreChangeCurrentSound: false,
  initialPlay: false,
  prevSound: null,
  currentSound: null,
  currentVolume: null,

  init: function() {
    var that = this;

    this.playControl = $('.playControl');
    this.playbackTitle = $('.playbackTitle');
    this.skipControlPrevious = $('.skipControl__previous');
    this.skipControlNext = $('.skipControl__next');

    playManager.on('change:currentSound', function() {
      that.onSoundChange.apply(that, arguments);
    });
  },
  isPlaying: function() {
    //TODO: playManager.isPlaying
    return this.playControl.hasClass('playing');
  },
  stop: function() {
    if (this.isPlaying()) {
      this.playControl.click();
    }
  },
  play: function() {
    if (!this.isPlaying()) {
      this.playControl.click();
    }
  },
  toggle: function() {
    this.playControl.click();
  },

  withSoundChangeIgnored: function(fn) {
    var that = this;

    this.ignoreChangeCurrentSound = true;
    var ret = fn.call(this);
    if (ret && typeof ret.then === 'function') {
      ret.then(function() {
        that.ignoreChangeCurrentSound = false;
      });
    } else {
      this.ignoreChangeCurrentSound = false;
    }
  },
  onSoundChange: function(sounds) {
    if (!this.initialPlay || this.ignoreChangeCurrentSound) {
      return;
    }
    this.currentVolume = audioManager._volume;
    audioManager.setVolume(0);

    var volume = this.currentVolume;
    var restoreVolume = function() {
      audioManager.setVolume(volume);
    };

    this.prevSound = sounds.prev;
    this.currentSound = sounds.current;

    if (Queue.has()) {
      this.stop();
      this.playNext().then(function() {
        restoreVolume();
      });
    } else {
      restoreVolume();
    }
    wait(cleanUserStreamItems, 200);
  },
  trapPlayControl: function() {
    var that = this;
    var className = 'sc-queue-userjs-control-button-wrap';

    var prev = $('<div>')
      .addClass(className)
      .css({
        left: '0px',
        top: '0px',
        width: 25
      })
      .on('click', function(ev) {
        cancel(ev);
        that.skipControlPrevious.click();
        return false;
      });

    var play = $('<div>')
      .addClass(className)
      .css({
        left: '25px',
        top: '0px',
        width: 22
      })
      .on('click', function(ev) {
        cancel(ev);
        that.onPlayPushed();
        return false;
      });

    var next = $('<div>')
      .addClass(className)
      .css({
        left: '47px',
        top: '0px',
        width: 20
      })
      .on('click', function(ev) {
        cancel(ev);
        that.skipNext();
        return false;
      });

    var title = $('<div>')
      .addClass(className)
      .css({
        left: '1px',
        top: '0px',
        width: 147
      })
      .on('click', function(ev) {
        cancel(ev);
        try {
          var permalink = playManager.getCurrentSound().attributes.permalink_url;
          var path = permalink.replace(/^https?:\/+[^\/]+/, '');

          if (path) {
            navigate(path);
            return false;
          }
          throw false;
        } catch (e) {
          that.playbackTitle.click();
        }
        return false;
      });

    var wrapper = this.playControl.parent();
    wrapper.append(prev).append(play).append(next);

    var titleWrapper = this.playbackTitle.parent();
    titleWrapper.append(title);

    this.playControlWrappers = {
      prev: prev,
      play: play,
      next: next,
      title: title
    };
  },

  skipNext: function() {
    var that = this;

    if (Queue.has()) {
      this.withSoundChangeIgnored(function() {
        this.stop();
        return this.playNext();
      });
    } else {
      this.withSoundChangeIgnored(function() {
        this.skipControlNext.click();
      });
    }
  },
  onPlayPushed: function() {
    if (this.isPlaying()) {
      this.stop();
    } else {
      if (!this.initialPlay && Queue.has()) {
        this.playNext();
      } else {
        this.withSoundChangeIgnored(this.toggle);
      }
    }
  },
  playNext: function() {
    var that = this;
    var d = $.Deferred();

    if (!Queue.has()) {
      return;
    }
    var item = Queue.shift();
    Queue.createQueueList();

    if (item) {
      //FIXME: Bug: 二重で再生されてしまう..
      //var playButton = $(item.playButtonExpr);
      //if (playButton.length) {
      //  this.withSoundChangeIgnored(function() {
      //    playButton.click();
      //  });
      //  d.resolve();
      //} else {
        getSound(item.path).then(function(sound) {
          if (!sound) {
            Queue.notify('Error', "Can't play track. Failed to create sound object.");
            d.reject();
          } else {
            that.withSoundChangeIgnored(function() {
              if (!this.initialPlay) {
                playManager.setInitialSource(sound);
              }
              playManager.playSource(sound, playManager);
            });
            d.resolve();
          }
        });
      //}
    }
    return d;
  },

  observe: function() {
    var that = this;

    observe(function() {
      if (!that.initialPlay && $.trim(that.playbackTitle.text()).length > 0) {
        that.initialPlay = true;
      }

      if (Math.random() * 10 > 3) {
        Queue.addButtons();
        Queue.setQueueButtonStyle();
        Queue.toggleResizeGrip();
        Queue.removeBodyCursorStyle();
      }
    }, 250);
  }
};


var win, doc, $, defaultTitle, elemTitle;
var config, model, modelSound, playManager, backbone, playlist, audioManager;


window.addEventListener('load', onLoad, false);


function onLoad() {
  win = unsafeWindow;
  doc = win.document;

  var loaded = false;

  (function loading() {
    if (!doc.head || !doc.body || !win.jQuery) {
      return wait(loading, 13);
    }
    if (!loaded) {
      loaded = true;
      initialize();
    }
  }());

  function initialize() {
    $ = win.jQuery;

    $('<script>')
      .attr({ src: '//ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js' })
      .appendTo('head');

    till(function() {
      return !!(win.require && $('<div>').draggable);
    }).then(function() {

      config = win.require('config');
      model = win.require('lib/model');
      modelSound = win.require('models/sound');
      playManager = win.require('lib/play-manager');
      backbone = win.require('lib/backbone');
      playlist = win.require('models/playlist').getNewInstance();
      win.require('models/playlist').instances.add(playlist);//XXX: how to create new playlist
      audioManager = win.require('lib/audiomanager');

      elemTitle = $('head title');
      defaultTitle = getTitle();

      Player.init();
      init();
    });
  }
}


function init() {
  Queue.createNotifyBoard();
  Queue.addButtons();
  Player.trapPlayControl();
  Player.observe();
}


function cleanUserStreamItems() {
  var forms = $('.commentForm.commentForm__transition.visible');

  forms.each(function() {
    var that = $(this);
    if (that.children().length === 0) {
      that.removeClass('visible');
    }
  });
}


function getTrackId(path) {
  var baseUrl = 'https://soundcloud.com';
  var apiBaseUrl = 'https://api.soundcloud.com';
  var d = $.Deferred();
  var client_id = config.get('client_id');
  var usertitle = path.replace(/^\/+/, '');
  var param = 'url=' + encodeURIComponent(baseUrl + '/' + usertitle) + '&client_id=' + client_id;
  var url = apiBaseUrl + '/resolve.json?' + param;

  http(url, {
    method: 'GET'
  }).then(function(req) {
    var data = JSON.parse(req.responseText);
    d.resolve(data.id);
  });
  return d;
}


function getSound(path) {
  var d = $.Deferred();
  getTrackId(path).then(function(id) {
    var sound = modelSound.instances.get(modelSound.hashFn({
      id: id,
      resource_type: 'sound'
    }));

    if (!sound) {
      sound = new modelSound({
        id: id,
        resource_id: null //XXX: counter?
      });
    }
    d.resolve(sound);
  });
  return d;
}


function http(url, params) {
  var d = $.Deferred();
  var req = new XMLHttpRequest();
  req.open(params.method, url, true);
  req.addEventListener('readystatechange', function() {
    if (req.readyState === 4) {
      if (params.prepare) {
        params.prepare(req);
      }
      if (req.status >= 200 && req.status < 300) {
        d.resolve(req);
      } else {
        d.reject(req);
      }
    }
  }, false);
  if (params.data) {
    req.send(data);
  } else {
    req.send(null);
  }
  return d;
}


function isSound(x) {
  return x != null && x.resource_type === 'sound';
}


function makeTitle(item) {
  if (item) {
    return '\u25B6 ' + item.title + ' by ' + item.username;
  }
  return false;
}


function getTitle() {
  return elemTitle.text();
}


function setTitle(item) {
  var text = makeTitle(item);
  if (text) {
    elemTitle.text(text);
  } else {
    elemTitle.text(defaultTitle);
  }
}


function till(cond) {
  var d = $.Deferred();
  var interval = 13;

  wait(function till() {
    var time = Date.now();
    try {
      if (cond && !cond()) {
        wait(function() {
          till();
        }, Math.min(1000, interval + (Date.now() - time)));
      } else {
        d.resolve();
      }
    } catch (e) {
      d.reject(e);
    }
  }, 0);

  return d;
}


function observe(func, delay) {
  wait(function observe() {
    var time = Date.now();
    func();
    wait(function() {
      observe();
    }, Math.min(1000, delay + (Date.now() - time)));
  }, 0);
}


function navigate(path) {
  config.get('router').navigate(path, true);
}


function currentURL() {
  return doc.URL;
}


function wait(fn, delay) {
  return win.setTimeout(fn, delay || 0);
}


function clearWait(id) {
  return win.clearTimeout(id);
}


function format(item) {
  return [item.username, item.title].join(' - ');
}


function cursorInElement(elem, ev) {
  var offset = $(elem).offset();
  var top = offset.top;
  var left = offset.left;
  var right = left + $(elem).outerWidth();
  var bottom = top + $(elem).outerHeight();

  var mouseX = ev.pageX;
  var mouseY = ev.pageY;

  if (mouseX >= left && mouseY >= top &&
      mouseX <= right && mouseY <= bottom) {
    return true;
  }
  return false;
}

function isScrollable(el) {
  var scrolls = { scroll: true, auto: true },
      overflows = ['overflow', 'overflow-x', 'overflow-y'];

  var len = overflows.length, i = 0, val;

  len = overflows.length;
  for (; i < len; i++) {
    val = '' + $(el).css(overflows[i]);
    if (scrolls[val] === true) {
      return true;
    }
  }
  return false;
}


function hasScrollBar(el) {
  return isScrollable(el) && !!($(el).get(0).scrollHeight > $(el).innerHeight());
}


function cancel(ev) {
  ev.preventDefault();
  ev.stopPropagation();
  return false;
}


}());
