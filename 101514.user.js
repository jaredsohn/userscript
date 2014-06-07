// ==UserScript==
// @name           AutoSubReblogize
// @namespace      http://polygonplanet.tumblr.com/
// @description    Script which eases ReBlog from subaccounts on Tumblr
// @include        http://*.tumblr.com/
// @exclude        http://www.tumblr.com/
// @exclude        http://staff.tumblr.com/
// @exclude        http://developers.tumblr.com/
// @version        1.05
// ==/UserScript==
/**
 * AutoSubReblogize
 *
 * Tumblrで複数のアカウントを使ってる人専用。
 * ボタン一発でサブ垢からメインにリブログしてくれるスクリプト。
 * 設定で既にリブログしてるPOSTはスキップ可。
 * なお、Tumblr API を使ってるのでメアドとパスの設定が必要。
 *
 * アドオンバー/ステータスバー/ツールバーにある、
 * Greasemonkeyアイコンから「ユーザスクリプトコマンド(C)」に
 * 「AutoSubReblogize - Settings」というメニューが追加されるので
 * まずはそこから設定。
 *
 */
(function(undefined) {

const AUTO_SUB_REBLOGIZE_VERSION = '1.05';


// define jQuery
var jQuery = getjQuery(), $ = jQuery, Pot;


$(function() {
  
  // 汎用オブジェクト
  Pot = {
    id: toUniqId('pot'),
    likeImage: null,
    loadedNotes: {},
    autoReblog: {},
    overlay: {},
    isAutoPagerize: false,
    permalinkPattern: /^https?:\/+[\w.-]+\/posts?\/\d+/i,
    secretKeyId: null,
    tumblrSubURLKey: 'PotTumblrSubURL',
    tumblrAccountsKey: 'PotTumblrAccounts',
    tumblrEmailKey: 'PotTumblrEmail',
    tumblrPasswordKey: 'PotTumblrPassword',
    inited: false,
    init: function() {
      if (Pot.inited) {
        return;
      }
      Pot.generateSecretKey();
      Pot.Deferred.call(Pot.dialog.init);
      Pot.initSecretKey();
      Pot.registerMenuCommand();
      if (!Pot.dialog.isEnableSiteURL()) {
        return;
      }
      $.each(['autoReblog', 'overlay'], function(i, v) {
        try {
          Pot.Deferred.call(Pot[v].init);
        } catch (e) {}
      });
      //
      // オートページングのライブラリに沿うよう各イベントを切り替える
      // --------------------------------------------------------------------
      // AutoPager:
      //   doc.documentElement.setAttribute("autopagerVersion","xxx")
      //   event.initEvent("AutoPagerBeforeInsert", true, true);
      //   event.initEvent("AutoPagerAfterInsert", true, true);
      // --------------------------------------------------------------------
      // AutoPagerize:
      //   ev.initEvent('GM_AutoPagerizeNextPageLoaded', true, false)
      //   ev.initEvent('AutoPagerize_DOMNodeInserted', ...)
      // --------------------------------------------------------------------
      // Other: ...
      // --------------------------------------------------------------------
      Pot.Deferred.wait(1.5).next(function() {
        var name;
        $(window).bind('scroll', function() {
          if (window.AutoPagerize) {
            Pot.isAutoPagerize = true;
            name = 'AutoPagerize_DOMNodeInserted';
            window.addEventListener(name, function(ev) {
              onNodeInserted(ev);
            }, true);
          } else {
            name = 'DOMNodeInserted';
            document.body.addEventListener(name, function(ev) {
              onNodeInserted(ev);
            }, true);
          }
          $(window).unbind('scroll', arguments.callee);
        });
      });
      Pot.Deferred.wait(0.75).next(function() {
        Pot.Deferred.call(onAllNodeInserted, $('#content').get(0));
      });
      Pot.inited = true;
    },
    initSecretKey: function() {
      var key, map, val, len, i, c;
      if (GM_getValue(Pot.secretKeyId, undefined) === undefined) {
        key = Pot.restoreSecretKey();
        map = (new Pot.RC4(toUniqId(Pot.AlphamericString.encode(key)))).
          encrypt(toUniqId(key, toUniqId(toUniqId('{#INTERNAL}')))).
          split(/[^\x20-\x7E]+/).map(function(s) {
            return toUniqId(String.fromCharCode(rand(0x20, 0x7e)), s);
          }).join(String.fromCharCode(rand(0x20, 0x7e))).
          replace(/(\d{2,})/g, function(m) {
            return m.slice(-2);
          }).split('');
        key = Pot.secretKeyId;
        val = [];
        len = 64;
        i = 0;
        if (map.length <= len) {
          val = map.join('');
        } else {
          while (val.length < len) {
            do {
              i = rand(0, map.length - 1);
              c = map[i];
            } while (!c);
            val.push(c);
            map[i] = null;
          }
          val = val.join('');
        }
        GM_setValue(key, val);
      }
    },
    generateSecretKey: function() {
      Pot.secretKeyId = (function(a, b, c, d) {
        d = new Array(arguments.length + 1).join([a, b, c].join('(+)'));
        do {
          d = Pot.AlphamericString.encode(d);
        } while (!/^[a-z]/i.test(d));
        return d;
      })('Pot', 'AutoReblogize', 'SecretKey');
      return Pot.secretKeyId;
    },
    restoreSecretKey: function() {
      var result = Pot.secretKeyId, limit = 10;
      do {
        result = Pot.AlphamericString.decode(result);
      } while (--limit >= 0 && result.indexOf('t(+)A') === -1);
      return result;
    },
    registerMenuCommand: function() {
      GM_registerMenuCommand(
        'AutoSubReblogize - Settings',
        Pot.dialog.openTumblrSubURLInputDialog
      );
    },
    data: {},
    dialog: {},
    // Deferred via JSDeferred
    Deferred: D(),
    // AlphamericString via AlphamericHTML
    AlphamericString: defineAlphamericString(),
    // Define RC4 encryption algorithm
    RC4: defineRC4()
  };
  //---------------------------------------------------------------------------
  // Object type distinction
  //---------------------------------------------------------------------------
  (function() {
    
    // typeof | is* functions
    var toString = Object.prototype.toString, types = {};
    'Boolean Number String Function Array Date RegExp Object'.
      split(' ').forEach(function(type) {
        types[type] = '[object ' + type + ']';
    });
    
    // define methods
    $.each(types, function(name, type) {
      Pot['is' + name] = function(o) {
        return toString.call(o) === type;
      };
    });
    
    if (Pot.isArray([]) !== true || Pot.isObject({}) !== true) {
      throw new Error('Failed to object type definition.');
    }
  })();
  //---------------------------------------------------------------------------
  // define data (URI)
  //---------------------------------------------------------------------------
  (function() {
    var make = function(uri, id) {
      return $('<img/>')
        .addClass(id)
        .css({
          border: '0 none',
          display: 'inline',
          MozUserSelect: 'none',
          userSelect: 'none',
          verticalAlign: 'middle',
          margin: 0,
          padding: 0
        })
        .attr({
          src: uri
        });
    };
    $.extend(Pot.data, {
      URI: defineMediaData(),
      image: {
        transparentId: toUniqId('dataImageTransparent'),
        closeGrayId: toUniqId('dataCloseGray'),
        loadingSnakeId: toUniqId('dataImageLoadingSnake'),
        reblogIconId: toUniqId('dataImageReblogIcon'),
        loadingWiiBoxId: toUniqId('dataImageLoadingWiiBox')
      }
    });
    $.extend(Pot.data.image, {
      transparent: make(Pot.data.URI.transparent,
                        Pot.data.image.transparentId),
      closeGray: make(Pot.data.URI.closeGray,
                      Pot.data.image.closeGrayId),
      loadingSnake: make(Pot.data.URI.loadingSnake,
                         Pot.data.image.loadingSnakeId),
      reblogIcon: make(Pot.data.URI.reblogIcon,
                       Pot.data.image.reblogIconId),
      loadingWiiBox: make(Pot.data.URI.loadingWiiBox,
                          Pot.data.image.loadingWiiBoxId)
    });
  })();
  //---------------------------------------------------------------------------
  // autoReblog
  //---------------------------------------------------------------------------
  $.extend(Pot.autoReblog, {
    buttonId: toUniqId('autoReblogButton'),
    button: null,
    titleId: toUniqId('autoReblogTitle'),
    title: null,
    statusId: toUniqId('autoReblogStatus'),
    status: null,
    progressboxId: toUniqId('autoReblogProgressbox'),
    progressbox: null,
    progressbarId: toUniqId('autoReblogProgressbar'),
    progressbar: null,
    starting: false,
    msg: {
      stop: {
        text: 'Start Auto ReBlog',
        title: '自動でリブログを開始します'
      },
      starting: {
        text: 'Click to Stop',
        title: '処理を止めます'
      }
    },
    params: [],
    toStartButtonFace: function(startNumber) {
      if (Pot.autoReblog.starting === false) {
        Pot.autoReblog.processor.userInfo = {
          accounts: (function() {
            var accounts = {};
            Pot.dialog.loadAccounts().forEach(function(name) {
              accounts[name] = name;
            });
            return accounts;
          })(),
          email: Pot.dialog.loadEmail(),
          pass: Pot.dialog.loadPassword()
        };
        if (!Pot.autoReblog.processor.userInfo.email) {
          raiseError('メールアドレスまたはパスワードが設定されてません');
        } else {
          Pot.autoReblog.starting = true;
          setTimeout(function(){
            startAutoReblog(startNumber);
          }, 100);
          Pot.data.image.reblogIcon.hide();
          Pot.data.image.loadingWiiBox.fadeIn();
          Pot.autoReblog.status
            .text('Processing...')
            .show('slow');
          $('.' + Pot.autoReblog.titleId)
            .attr({
              title: Pot.autoReblog.msg.starting.title
            })
            .text(Pot.autoReblog.msg.starting.text);
          Pot.autoReblog.progressbox.show('slow');
          Pot.autoReblog.setProgress(0, 0);
        }
      }
    },
    toStopButtonFace: function() {
      if (Pot.autoReblog.starting) {
        Pot.autoReblog.starting = null;
        Pot.autoReblog.processor.forceStop = true;
        Pot.autoReblog.processor.userInfo = {};
        Pot.data.image.loadingWiiBox.hide();
        Pot.data.image.reblogIcon.fadeIn();
        Pot.autoReblog.status.hide('slow');
        Pot.autoReblog.progressbox.hide('slow', function() {
          Pot.autoReblog.setProgress(0, 0);
        });
        $('.' + Pot.autoReblog.titleId)
          .attr({
            title: Pot.autoReblog.msg.stop.title
          })
          .text(Pot.autoReblog.msg.stop.text);
        Pot.overlay.modalPanel.fadeOut('slow');
        setTimeout(function() {
          Pot.autoReblog.starting = false;
        }, 1500);
      }
    },
    setProgress: function(current, total) {
      var percent = 0;
      if (isNumeric(current) && isNumeric(total)) {
        if (current == total) {
          percent = total == 0 ? 0 : 100;
        } else {
          percent = Math.floor(current / total * 100);
        }
        Pot.autoReblog.progressbar
          .css({
            width: sprintf('%d%%', percent)
          });
        Pot.autoReblog.progressbox
          .attr({
            title: sprintf('%d%%', percent)
          });
      }
    },
    init: function() {
      var frame, title, iconFrame;
      
      // 自動リブログ開始ボタン
      Pot.autoReblog.button = $('<div/>')
        .addClass(Pot.autoReblog.buttonId)
        .css({
          position: 'absolute',
          left: 5,
          top: 5,
          maxWidth: Math.floor(getScreenInfo('width') * 0.4),
          maxHeight: Math.floor(getScreenInfo('height') * 0.6),
          background: '#c8cbff',
          border: '1px solid #556699',
          color: '#334488',
          fontSize: '11px',
          fontFamily: 'verdana, sans-serif',
          textShadow: 'none',
          padding: 5,
          MozBorderRadius: '5px',
          borderRadius: '5px',
          MozBoxShadow: '1px 1px 5px #333',
          boxShadow: '1px 1px 5px #333',
          wordWrap: 'break-word',
          cursor: 'pointer',
          zIndex: 89999,
          opacity: 0.75
        })
        .hover(
          function() {
            $(this)
              .css({
                opacity: 1,
                background: '#8899ff',
                borderColor: '#334488',
                color: '#223377',
                cursor: 'pointer'
              })
          },
          function() {
            $(this)
              .css({
                opacity: 0.75,
                background: '#c8cbff',
                borderColor: '#556699',
                color: '#334488',
                MozBoxShadow: '1px 1px 5px #333',
                boxShadow: '1px 1px 5px #333',
                cursor: 'default'
              })
          }
        )
        .mousedown(function() {
          $(this)
            .css({
              opacity: 1,
              background: '#8899dd',
              borderColor: '#334466',
              color: '#223355',
              MozBoxShadow: 'none',
              boxShadow: 'none',
              cursor: 'pointer'
            })
        })
        .mouseup(function() {
          $(this)
            .css({
              opacity: 0.75,
              background: '#c8cbff',
              borderColor: '#556699',
              color: '#334488',
              MozBoxShadow: '1px 1px 5px #333',
              boxShadow: '1px 1px 5px #333',
              cursor: 'default'
            })
        })
        .click(function() {
          var start;
          if (Pot.autoReblog.starting === false) {
            Pot.dialog.openSimpleInputDialog({
              onBeforeShow: function() {
                try {
                  $(sprintf('.%s', Pot.dialog.classNames.simpleInputId)).val(
                    isNumeric(Pot.dialog.storage.simpleInput.start) ?
                              Pot.dialog.storage.simpleInput.start  : 0
                  );
                } catch (e) {
                  Pot.dialog.storage.simpleInput = {};
                }
              },
              onShow: function() {
                var func = function() {
                  try {
                    $(sprintf('.%s', Pot.dialog.classNames.simpleInputId))
                      .get(0)
                      .focus();
                  } catch (e) {}
                };
                [250, 500, 750].forEach(function(time) {
                  setTimeout(func, time);
                });
              },
              onClose: function(event, type) {
                if (lower(type) === 'ok') {
                  Pot.dialog.storage.simpleInput.start = $(sprintf('.%s',
                    Pot.dialog.classNames.simpleInputId)).val();
                  if (!isNumeric(Pot.dialog.storage.simpleInput.start)) {
                    alert('数値じゃないので 0 から始まります');
                    Pot.dialog.storage.simpleInput.start = 0;
                  }
                  Pot.autoReblog.toStartButtonFace(
                    Number(Pot.dialog.storage.simpleInput.start)
                  );
                }
              }
            });
          } else if (Pot.autoReblog.starting) {
            Pot.autoReblog.toStopButtonFace();
          }
        })
        .show()
        .appendTo('body');
      
      frame = $('<div/>');
      iconFrame = $('<div/>')
        .css({
          display: 'inline-block',
          fontFamily: 'verdana, sans-serif',
          textShadow: 'none',
          margin: 5,
          padding: 0,
          verticalAlign: 'middle',
          MozUserSelect: 'none',
          userSelect: 'none'
        })
      Pot.data.image.reblogIcon
        .css({
          border: '1px solid #6655cc',
          fontFamily: 'verdana, sans-serif',
          textShadow: 'none',
          MozBorderRadius: '2px',
          borderRadius: '2px',
          display: 'inline',
          MozUserSelect: 'none',
          userSelect: 'none',
          verticalAlign: 'middle',
          margin: 0,
          padding: 0
        })
        .show()
        .appendTo(iconFrame);
      
      Pot.data.image.loadingWiiBox
        .css({
          border: '1px solid #6655cc',
          fontFamily: 'verdana, sans-serif',
          textShadow: 'none',
          MozBorderRadius: '2px',
          borderRadius: '2px',
          display: 'inline',
          MozUserSelect: 'none',
          userSelect: 'none',
          verticalAlign: 'middle',
          margin: 0,
          padding: 0,
          background: 'transparent'
        })
        .hide()
        .appendTo(iconFrame);
      
      iconFrame.appendTo(frame);
      
      title = $('<span/>')
        .addClass(Pot.autoReblog.titleId)
        .css({
          margin: 0,
          fontFamily: 'verdana, sans-serif',
          textShadow: 'none',
          padding: '5px 5px 5px 0',
          display: 'inline-block',
          verticalAlign: 'middle'
        })
        .attr({
          title: Pot.autoReblog.msg.stop.title
        })
        .text(Pot.autoReblog.msg.stop.text)
        .appendTo(frame);
      
      frame.appendTo(Pot.autoReblog.button);
      
      Pot.autoReblog.status = $('<div/>')
        .addClass(Pot.autoReblog.statusId)
        .css({
          background: '#ddffee',
          border: '1px solid #669955',
          fontFamily: 'verdana, sans-serif',
          textShadow: 'none',
          color: '#559933',
          fontSize: '11px',
          margin: 5,
          padding: 5,
          wordWrap: 'break-word'
        })
        .hide()
        .appendTo(Pot.autoReblog.button);
      
      Pot.autoReblog.progressbar = $('<div/>')
        .addClass(Pot.autoReblog.progressbarId)
        .css({
          border: '0 none',
          fontFamily: 'verdana, sans-serif',
          textShadow: 'none',
          margin: 0,
          padding: 0,
          background: '#99bbff',
          height: 10,
          width: 0
        });
      
      Pot.autoReblog.progressbox = $('<div/>')
        .addClass(Pot.autoReblog.progressboxId)
        .css({
          border: '1px solid #6699ff',
          background: '#cfdfff',
          fontFamily: 'verdana, sans-serif',
          textShadow: 'none',
          margin: 5,
          marginTop: 10,
          padding: 0,
          height: 10
        })
        .append(Pot.autoReblog.progressbar)
        .hide()
        .appendTo(Pot.autoReblog.button);
    }
  });
  //---------------------------------------------------------------------------
  // autoReblog interface
  //---------------------------------------------------------------------------
  $.extend(Pot.autoReblog, {
    processor: {
      total: null,
      currentNumber: null,
      forceStop: false,
      userInfo: {},
      rebloggedIds: {},
      stopProcess: function(msg) {
        this.total = null;
        this.currentNumber = 0;
        this.forceStop = false;
        this.rebloggedIds = {};
        if (msg) {
          Pot.overlay.log('Stopped.');
        }
      },
      startProcess: function(startNumber) {
        var self = this, d, loopCounts;
        this.stopProcess(false);
        Pot.overlay.clearLog();
        Pot.overlay.showLog(sprintf('AutoSubReblogize %s',
          AUTO_SUB_REBLOGIZE_VERSION), {
            fontWeight: 'bold',
            marginBottom: 10
        });
        Pot.overlay.log('自動リブログを開始します');
        this.currentNumber = 0;
        this.action(true).error(function(err) {
          if (err !== 'duplicate') {
            if (err !== 'skip') {
              self.forceStop = true;
              if (err !== 'end') {
                self.error('Error! %s', err);
              } else {
                Pot.overlay.log('End.');
              }
            }
          }
        }).next(function() {
          loopCounts = {
            begin: Number(isNumeric(startNumber) ? startNumber : 0),
            end: Math.max(0, Number(self.total) - 1)
          };
          Pot.overlay.log(sprintf('Total: %d', self.total));
          d = Pot.Deferred.loop(loopCounts, function(idx) {
            var looper = new Pot.Deferred();
            Pot.autoReblog.status.text(sprintf(
              'Processing... %d/%d',
              idx, loopCounts.end + 1
            ));
            self.currentNumber = idx;
            Pot.autoReblog.setProgress(
              self.currentNumber,
              Math.max(0, self.total - 1)
            );
            Pot.dialog.storage.simpleInput.start = Math.max(
              0, Number(self.currentNumber) - 1
            );
            if (self.forceStop || Pot.autoReblog.starting === false) {
              self.raise(d, 'Stop!!', 'Stopped.', 'cancel');
            } else {
              self.action(false, looper).error(function(er) {
                if (er !== 'skip') {
                  if (er !== 'end') {
                    self.error('Error! %s', er);
                  } else {
                    Pot.overlay.log('End.');
                  }
                  self.forceStop = true;
                }
              });
            }
            return looper;
          }).next(function() {
            self.raise(d, 'End.', 'Complete!', 'end');
          });
        });
      },
      raise: function(d, log, status, error) {
        var self = this;
        Pot.overlay.log(log);
        Pot.autoReblog.status.text(status);
        setTimeout(function() {
          Pot.autoReblog.toStopButtonFace();
        }, 6500);
        self.stopProcess(true);
        throw error;
      },
      error: function(format) {
        var msg, args = toArray(arguments);
        args.shift();
        args = args.map(function(a) {
          var r;
          if (a && a.message) {
            r = a.message;
            if (!/#\d+/.test(r) && (a.lineNumber || a.number || a.line)) {
              r += '#' + (a.lineNumber || a.number || a.line);
            }
          } else {
            r = a;
          }
          return r;
        });
        args.unshift(format);
        msg = sprintf.apply(null, args);
        Pot.overlay.logError(msg);
        throw new Error(msg);
      },
      action: function(first, looper) {
        var self = this, ps = {}, data = {};
        if (Pot.autoReblog.starting === false) {
          self.raise(null, 'Stop!!', 'Stopped.', 'cancel');
        }
        return self.getXMLFromAPI().next(function(xmls) {
          if (self.total <= 0) {
            throw 'end';
          }
          if (first) {
            throw 'skip';
          }
          return self.getPostInfoFromXML(xmls);
        }).error(function(err) {
          if (err !== 'end' && err !== 'skip') {
            self.error('不明なエラー: %s', err);
          }
          if (err === 'skip') {
            throw 'skip';
          }
          return succeed().cancel();
        }).next(function(infos) {
          ps = infos.postInfo;
          Pot.overlay.log(sprintf('%d. [%s] %s',
            self.currentNumber,
            ps.type,
            getDate(ps.date)
          ));
          if (ps && ps.postId) {
            if (ps.postId in self.rebloggedIds) {
              Pot.overlay.log(sprintf('PostId: %d: 重複のためスキップ',
                ps.postId
              ));
              throw 'duplicate';
            }
            self.rebloggedIds[ps.postId] = 'doit';
          }
          Pot.overlay.log(ps.permalink);
          return (function() {
            return self.showPostContent(infos.xml, infos.postInfo);
          })();
        }).next(function() {
          return succeed(ps);
        }).next(function(postInfo) {
          return self.getHTMLFromPermalink(postInfo);
        }).next(function(html) {
          return self.isRebloggedByNotes(html, ps);
        }).next(function(reblogged) {
          Pot.overlay.log(sprintf('-- %s.',
            reblogged ? 'Skip' : 'ReBlog -- OK'
          ));
          Pot.overlay.log('\n');
          return Pot.Deferred.call(function() {
            var d = reblogged ? succeed(reblogged) : self.reblogPost(ps);
            return Pot.Deferred.wait(rand(1.75, 2.55)).next(function() {
              try {
                looper.call();
              } catch (e) {}
              return d;
            });
          });
        }).next(function(skip) {
          return Pot.Deferred.wait(0.5).next(function() {
            return succeed(skip);
          });
        });
      },
      getBaseURI: function() {
        var uri, re;
        try {
          re = new RegExp('^(http://[^/]+/)');
          uri = stringify(location.href).match(re)[1];
        } catch (e) {
          self.error('URLの生成に失敗: %s', uri);
        }
        return uri;
      },
      buildURL: function(params) {
        var self = this, result;
        try {
          result = [
            self.getBaseURI(),
            'api/read?',
            $.param($.extend({ filter: 'text' }, params || {}))
          ].join('');
        } catch (e) {
          self.error('URLが変です: %s', e);
        }
        return result;
      },
      getXMLFromAPI: function() {
        var self = this, total, url, xml, callback, limit, permalink, d;
        d = new Pot.Deferred();
        url = this.buildURL({
          start: this.currentNumber,
          num: 1,
          random: toUniqId('noCache')
        });
        limit = 6;
        callback = function(url) {
          return Pot.Deferred.wait(rand(3, 5)).next(function() {
            return Pot.Deferred.xhttp.get(url).error(function(err) {
              self.error('Error! %s', err && err.status || err);
            }).next(function(res) {
              xml = res.responseText;
              if (self.total === null) {
                total = $(xml).find('posts').attr('total');
                if (!isNumeric(total)) {
                  self.error('totalが取得できません: %n', total);
                } else {
                  self.total = total;
                }
              }
              permalink = $(xml).find('post').first().attr('url');
              if (!Pot.permalinkPattern.test(stringify(permalink))) {
                self.error('permalinkが取得できません: %s', permalink);
              }
              d.call({
                xml: xml,
                permalink: permalink
              });
            }).error(function(err) {
              if (--limit >= 0) {
                Pot.overlay.log('Retry request limit: ' + limit);
                return callback(url);
              }
              throw err;
            });
          });
        };
        callback.call(this, url);
        return d;
      },
      getPostInfoFromXML: function(xmls) {
        var self = this, result, permalink, reblogKey, postId,
            date, type, post, xml;
        try {
          xml = xmls.xml;
          post = $(xml).find('post').first();
          permalink = stringify(post.attr('url'));
          reblogKey = stringify(post.attr('reblog-key'));
          postId = stringify(post.attr('id'));
          date = stringify(post.attr('date'));
          type = stringify(post.attr('type'));
        } catch (e) {
          self.error('理不尽なエラー: %s', e);
        }
        if (!Pot.permalinkPattern.test(permalink)) {
          permalink = xmls.permalink;
          if (!Pot.permalinkPattern.test(permalink)) {
            if (isNumeric(postId)) {
              permalink = sprintf('%spost/%d',
                self.getBaseURI(),
                postId
              );
            }
            if (!Pot.permalinkPattern.test(permalink)) {
              self.error('Permalinkが変です: %s', permalink);
            }
          }
        }
        result = {
          permalink: permalink,
          reblogKey: reblogKey,
          postId: postId,
          date: date,
          type: type
        };
        $.each(result, function(key, val) {
          if (!val) {
            self.error('パラメータ %q が取得できません %q', key, val);
          }
        });
        return {
          xml: xml,
          postInfo: result
        };
      },
      showPostContent: function(xml, postInfo) {
        var self = this, d, url, text, setDialog;
        setDialog = function(nuisance, trigger, callback) {
          Pot.overlay.prevDialogTypes = {
            nuisance: nuisance,
            trigger: trigger
          };
          return callback();
        };
        switch (lower(postInfo.type)) {
          case 'photo':
              url = trim( $(xml).find('photo-url[max-width="500"]').html() );
              if (!url) {
                url = trim( $(xml).find('photo-url').first().html() );
              }
              if (!url) {
                Pot.overlay.log('Cannot parse photo URL.');
              }
              d = setDialog(
                Pot.overlay.dialogContent,
                Pot.overlay.dialogImage,
                function() {
                  return Pot.overlay.setDialogImage(url);
              });
              break;
          case 'quote':
              text = br([
                $(xml).find('quote-text').html(),
                '\n',
                $(xml).find('quote-source').html()
              ].join('\n'));
              d = setDialog(
                Pot.overlay.dialogImage,
                Pot.overlay.dialogContent,
                function() {
                  return Pot.overlay.setDialogContent(text);
              });
              break;
          case 'regular':
              text = br([
                $(xml).find('regular-title').html(),
                '\n',
                $(xml).find('regular-body').html()
              ].join('\n'));
              d = setDialog(
                Pot.overlay.dialogImage,
                Pot.overlay.dialogContent,
                function() {
                  return Pot.overlay.setDialogContent(text);
              });
              break;
          case 'video':
              text = [
                br([
                  $(xml).find('video-caption').html(),
                  '\n'
                ].join('\n')),
                $(xml).find('video-player').html(),
                '\n',
                $(xml).find('video-source').html()
              ].join('');
              d = setDialog(
                Pot.overlay.dialogImage,
                Pot.overlay.dialogContent,
                function() {
                  return Pot.overlay.setDialogContent(text);
              });
              break;
          case 'link':
              text = [
                $('<div/>')
                  .html(
                    $('<a/>')
                      .attr({
                        href: $(xml).find('link-url').html()
                      })
                      .text( $(xml).find('link-text').html() )
                  )
                  .html(),
                '\n',
                br( $(xml).find('link-description').html() )
              ].join('');
              d = setDialog(
                Pot.overlay.dialogImage,
                Pot.overlay.dialogContent,
                function() {
                  return Pot.overlay.setDialogContent(text);
              });
              break;
          case 'audio':
              text = [
                $(xml).find('audio-caption').html(),
                $(xml).find('audio-player').html(),
                '\n',
                [
                  $(xml).find('id3-artist').html(),
                  '-',
                  $(xml).find('id3-title').html()
                ].join(' ')
              ].join('\n');
              d = setDialog(
                Pot.overlay.dialogImage,
                Pot.overlay.dialogContent,
                function() {
                  return Pot.overlay.setDialogContent(text);
              });
              break;
          case 'conversation':
              text = [];
              $(xml).find('conversation line').each(function() {
                text.push([
                  trim( $(this).attr('label') ),
                  trim( $(this).html() )
                ].join(' '));
              });
              d = setDialog(
                Pot.overlay.dialogImage,
                Pot.overlay.dialogContent,
                function() {
                  return Pot.overlay.setDialogContent(text.join('\n'));
              });
              break;
          default:
              Pot.overlay.logError(sprintf('Not supported type: [%s]',
                postInfo.type));
              d = setDialog(
                Pot.overlay.dialogImage,
                Pot.overlay.dialogContent,
                function() {
                  return Pot.overlay.setDialogContent(sprintf(
                    'Not supported type: %s', postInfo.type));
              });
              break;
        }
        return Pot.Deferred.wait(1).next(function() {
            return maybeDeferred(d);
        });
      },
      getHTMLFromPermalink: function(postInfo) {
        return Pot.Deferred.xhttp.get(postInfo.permalink).next(function(res) {
          return succeed(res.responseText);
        });
      },
      isRebloggedByNotes: function(html, postInfo) {
        var self = this, reblogged = false, selector, notes, note, re;
        // Redux テンプレート用
        selector = '.notecontainer li.note.reblog .tumblelog';
        notes = $(html).find(selector);
        if (!notes || !notes.length) {
          $.each(self.userInfo.accounts, function(name, v) {
            selector = sprintf('.tumblelog_%s', name);
            notes = $(html).find(selector);
            if (notes && notes.length) {
              return false;
            } else {
              selector = lower(selector);
              notes = $(html).find(selector);
              if (notes && notes.length) {
                return false;
              }
            }
          });
          if (!notes || !notes.length) {
            $.each([
              // 他のテンプレート全てのパターンは難しいので
              // (カスタマイズしてたら無理)
              // ありそうなパターンを探す
              '.notes',
              '.note',
              '.without_commentary',
              '.post-note',
              '.post-notes',
              '#notes',
              '#note'
            ], function(i, v) {
              selector = v;
              notes = $(html).find(selector);
              if (notes && notes.length) {
                return false;
              }
            });
          }
        }
        return Pot.Deferred.loop(notes.length, function(idx) {
          var current, user, parent;
          current = $(notes.get(idx));
          user = trim(current.text());
          if (user in self.userInfo.accounts) {
            reblogged = true;
            throw 'skip';
          }
          if (selector.indexOf('notecontainer') !== -1) {
            selector = '.notecontainer';
            parent = $(html).find(selector);
          } else {
            parent = $(current).parent();
          }
          parent.each(function() {
            note = lower($(this).text()).replace(/^|[\s\u3000]+|$/g, ' ');
            $.each(self.userInfo.accounts, function(name, v) {
              if (note.indexOf(lower(name) + ' reblogged') !== -1) {
                reblogged = true;
                return false;
              }
            });
          });
          if (reblogged) {
            throw 'skip';
          }
        }).error(function(err) {
          if (err !== 'skip') {
            self.error('謎のエラー: %s', err);
          }
        }).next(function() {
          return succeed(reblogged);
        });
      },
      reblogPost: function(postInfo) {
        var self = this, stop = false, url = [
          'http://www.tumblr.com/api/reblog',
          $.param({
            email: Pot.autoReblog.processor.userInfo.email,
            password: Pot.autoReblog.processor.userInfo.pass,
            'post-id': postInfo.postId,
            'reblog-key': postInfo.reblogKey
          })
        ].join('?');
        return Pot.Deferred.xhttp.get(url).error(function(err) {
          var errmsg, errors = [], errobj;
          errobj = typeof err === 'object' ? err : {error: err};
          stop = true;
          $.each(errobj, function(key, val) {
            errors.push(sprintf('%s: %s', key, val));
          });
          errmsg = errors.join('\n');
          self.error('Error!\n%s', errmsg);
          return stop;
        }).next(function(res) {
          self.rebloggedIds[postInfo.postId] = 'done';
          stop = false;
          return succeed(stop);
        });
      }
    }
  });
  //---------------------------------------------------------------------------
  // Overlay
  //---------------------------------------------------------------------------
  $.extend(Pot.overlay, {
    dialogBoxId: toUniqId('overlayDialogBox'),
    dialogFrameId: toUniqId('overlaydialogFrame'),
    dialogImageId: toUniqId('overlayDialogImage'),
    dialogContentId: toUniqId('overlayDialogContent'),
    dialogStatusId: toUniqId('overlayDialogStatus'),
    modalPanelId: toUniqId('overlayModalPanel'),
    dialogBox: null,
    dialogFrame: null,
    dialogImage: null,
    dialogContent: null,
    dialogStatus: null,
    modalPanel: null,
    dialogImageAttrs: {},
    dialogImageLoaded: false,
    prevDialogTypes: {
      nuisance: null,
      trigger: null
    },
    init: function() {
      Pot.overlay.modalPanel = $('<div/>')
        .addClass(Pot.overlay.modalPanelId)
        .css({
          position: 'absolute',
          top: 0,
          left: 0,
          width: Math.floor( getScreenInfo('width') ),
          height: Math.floor(
            Math.max(
              getScreenInfo('height'),
              screen && screen.height || 3200
            )
          ),
          fontFamily: 'verdana, sans-serif',
          textShadow: 'none',
          background: '#555',
          border: '0 none',
          zIndex: 89990,
          opacity: 0.98
        })
        .click(function(ev) {
          ev.preventDefault();
          ev.stopPropagation();
          return false;
        })
        .hide();
      
      Pot.overlay.dialogBox = $('<div/>')
        .addClass(Pot.overlay.dialogBoxId)
        .css({
          position: 'absolute',
          left: -999999,
          top: -999999,
          width: Math.floor(getScreenInfo('width') / 1.28),
          height: Math.floor(getScreenInfo('availHeight') / 1.28),
          maxWidth: getScreenInfo('width'),
          maxHeight: getScreenInfo('availHeight'),
          background: '#e0e0e0',
          border: '2px solid #777',
          MozBorderRadius: '5px',
          borderRadius: '5px',
          MozBoxShadow: '1px 1px 8px #333',
          boxShadow: '1px 1px 8px #333',
          color: '#555',
          fontSize: '13px',
          fontFamily: 'verdana, sans-serif',
          textShadow: 'none',
          padding: 6,
          margin: 0,
          textAlign: 'center',
          verticalAlign: 'middle',
          zIndex: 91000,
          opacity: 1
        });
      
      Pot.overlay.dialogStatus = $('<div/>')
        .addClass(Pot.overlay.dialogStatusId)
        .css({
          display: 'block',
          background: '#eee',
          border: '1px solid #666',
          color: '#555',
          fontSize: '13px',
          fontFamily: 'verdana, sans-serif',
          textShadow: 'none',
          MozBorderRadius: '3px',
          borderRadius: '3px',
          padding: 5,
          margin: 10,
          textAlign: 'left',
          width: Math.floor(
            parseInt(Pot.overlay.dialogBox.css('width')) * 0.35),
          height: Math.floor(
            parseInt(Pot.overlay.dialogBox.css('height')) - 30),
          overflow: 'auto',
          wordWrap: 'break-word',
          lineHeight: 1.35,
          zIndex: 91001,
          opacity: 1,
          float: 'right'
        });
      
      Pot.overlay.dialogFrame = $('<div/>')
        .addClass(Pot.overlay.dialogFrameId)
        .css({
          display: 'block',
          background: 'transparent',
          border: '0 none',
          padding: 5,
          margin: '10px 5px',
          fontFamily: 'verdana, sans-serif',
          textShadow: 'none',
          textAlign: 'center',
          verticalAlign: 'middle',
          zIndex: 91002,
          opacity: 1,
          float: 'left'
        });
      
      Pot.overlay.dialogImageAttrs = {
        css: {
          display: 'inline',
          background: 'transparent',
          border: '5px solid #aaa',
          fontFamily: 'verdana, sans-serif',
          textShadow: 'none',
          MozBorderRadius: '5px',
          borderRadius: '5px',
          maxWidth: Math.floor(
            parseInt(Pot.overlay.dialogBox.css('width')) * 0.56),
          maxHeight: Math.floor(
            parseInt(Pot.overlay.dialogBox.css('height')) - 30),
          padding: 0,
          margin: 0,
          zIndex: 91003,
          opacity: 1
        },
        attr: {
          src: Pot.data.URI.transparent,
          width: Math.floor(
            parseInt(Pot.overlay.dialogBox.css('width')) * 0.55),
          height: Math.floor(
            parseInt(Pot.overlay.dialogBox.css('height')) - 32)
        }
      };
      
      Pot.overlay.dialogImage = $('<img/>')
        .addClass(Pot.overlay.dialogImageId)
        .css(Pot.overlay.dialogImageAttrs.css)
        .attr(Pot.overlay.dialogImageAttrs.attr);
      
      Pot.overlay.dialogContent = $('<div/>')
        .addClass(Pot.overlay.dialogContentId)
        .css({
          display: 'block',
          background: 'transparent',
          border: '5px solid #aaa',
          color: '#555',
          MozBorderRadius: '5px',
          borderRadius: '5px',
          fontFamily: 'verdana, sans-serif',
          lineHeight: 1.4,
          textShadow: 'none',
          maxWidth: Math.floor(
            parseInt(Pot.overlay.dialogBox.css('width')) * 0.52),
          maxHeight: Math.floor(
            parseInt(Pot.overlay.dialogBox.css('height')) - 66),
          width: Math.floor(
            parseInt(Pot.overlay.dialogBox.css('width')) * 0.52 - 2),
          height: Math.floor(
            parseInt(Pot.overlay.dialogBox.css('height')) - 68),
          padding: 15,
          margin: 0,
          overflow: 'auto',
          wordWrap: 'break-word',
          zIndex: 91004,
          opacity: 1
        })
        .hide();
      
      Pot.overlay.dialogContent.appendTo(Pot.overlay.dialogFrame);
      Pot.overlay.dialogImage.appendTo(Pot.overlay.dialogFrame);
      Pot.overlay.dialogFrame.appendTo(Pot.overlay.dialogBox);
      Pot.overlay.dialogStatus.appendTo(Pot.overlay.dialogBox);
      Pot.overlay.dialogBox.appendTo(Pot.overlay.modalPanel);
      $('<div/>').css({ clear: 'both' }).appendTo(Pot.overlay.modalPanel);
      Pot.overlay.modalPanel.insertAfter('body');
    },
    setDialogImage: function(url) {
      var d = new Pot.Deferred(), callback, loading;
      Pot.overlay.prevDialogTypes.nuisance.fadeOut();
      Pot.overlay.dialogImage.removeAttr('width');
      Pot.overlay.dialogImage.removeAttr('height');
      callback = function() {
        loading = Pot.data.image.loadingSnake
          .clone()
          .css({
            display: 'inline-block',
            backgroundColor: 'transparent',
            fontFamily: 'verdana, sans-serif',
            textShadow: 'none',
            margin: '0 auto',
            marginTop: Math.floor(
              Pot.overlay.dialogImageAttrs.css.maxHeight * 0.9 / 2),
            zIndex: 91002,
            opacity: 0.5
          });
        Pot.overlay.dialogFrame.empty().append(loading);
        Pot.overlay.dialogFrame
          .css({
            width: Math.floor(
              Pot.overlay.dialogImageAttrs.css.maxWidth * 0.92),
            height: Math.floor(
              Pot.overlay.dialogImageAttrs.css.maxHeight * 0.92)
          });
        Pot.overlay.dialogImageLoaded = false;
        Pot.overlay.dialogImage.remove();
        Pot.overlay.dialogImage = null;
        Pot.overlay.dialogImage = $('<img/>')
          .addClass(Pot.overlay.dialogImageId)
          .css(Pot.overlay.dialogImageAttrs.css)
          .css({
            border: '0 none',
            fontFamily: 'verdana, sans-serif',
            textShadow: 'none'
          })
          .load(function() {
            var self = $(this);
            loading.remove();
            Pot.overlay.dialogFrame
              .css({
                width: 'auto',
                height: 'auto'
              });
            self
              .css({
                opacity: 0,
                border: '5px solid #aaa'
              })
              .removeAttr('width')
              .removeAttr('height')
              .animate({
                opacity: 1
              }, {
                duration: 500,
                easing: 'linear',
                step: function() {
                  $(self).css({
                    opacity: Number($(self).css('opacity')) + 0.05
                  });
                },
                complete: function() {
                  loading.remove();
                  $(self)
                    .css({
                      opacity: 1
                    });
                  Pot.overlay.dialogImageLoaded = true;
                  Pot.overlay.prevDialogTypes = {
                    nuisance: Pot.overlay.dialogContent,
                    trigger: Pot.overlay.dialogImage
                  };
                  setTimeout(function() {
                    d.call();
                  }, rand(2500, 3500));
                }
              });
          })
          .attr({
            width: 1,
            height: 1,
            src: url
          })
          .appendTo(Pot.overlay.dialogFrame);
      };
      Pot.overlay.prevDialogTypes.trigger.fadeOut('normal', callback);
      return d;
    },
    setDialogContent: function(content) {
      var d = new Pot.Deferred(), callback, extraTime, loading;
      extraTime = (function() {
        var r = 1, i, len = content.length;
        for (i = 0; i < 5; i++) {
          try {
            if ((len /= 250) > 250) {
              r += 0.525;
            }
          } catch (e) {
            break;
          }
        }
        return r;
      })();
      callback = function() {
        loading = Pot.data.image.loadingSnake
          .clone()
          .css({
            display: 'inline-block',
            backgroundColor: 'transparent',
            fontFamily: 'verdana, sans-serif',
            textShadow: 'none',
            margin: '0 auto',
            marginTop: Math.floor(
              Pot.overlay.dialogImageAttrs.css.maxHeight * 0.9 / 2),
            zIndex: 91002,
            opacity: 0.5
          });
        Pot.overlay.dialogFrame.empty().append(loading);
        Pot.overlay.dialogFrame
          .css({
            width: Math.floor(
              Pot.overlay.dialogImageAttrs.css.maxWidth * 0.9),
            height: Math.floor(
              Pot.overlay.dialogImageAttrs.css.maxHeight * 0.86)
          });
        Pot.Deferred.wait(rand(1.25, 2.56)).next(function() {
          var self = Pot.overlay.dialogContent;
          loading.remove();
          Pot.overlay.dialogFrame
            .css({
              width: 'auto',
              height: 'auto'
            });
          $(self)
            .empty()
            .html(
              toLink(br(unescapeHTML(
                shrinkLineBreak(normalizeSpace(content))
              )))
            )
            .css({
              opacity: 0,
              textAlign: 'left',
              background: '#f2f2ff',
              color: '#555'
            })
            .show()
            .appendTo(Pot.overlay.dialogFrame)
            .animate({
              opacity: 1
            }, {
              duration: 650,
              easing: 'linear',
              step: function() {
                $(self).css({
                  opacity: Number($(self).css('opacity')) + 0.05
                });
              },
              complete: function() {
                loading.remove();
                $(self)
                  .css({
                    opacity: 1
                  });
                Pot.overlay.prevDialogTypes = {
                  nuisance: Pot.overlay.dialogImage,
                  trigger: Pot.overlay.dialogContent
                };
                setTimeout(function() {
                  d.call();
                }, rand(3250, 5250) + extraTime);
              }
            });
        });
      };
      Pot.overlay.prevDialogTypes.trigger.fadeOut('normal', callback);
      return d;
    },
    showLog: function(msg, css) {
      stringify(msg).split(/(?:\r\n|\r|\n)/).forEach(function(s) {
        var div, scroll = function() {
          try {
            with (Pot.overlay.dialogStatus.get(0)) {
              scrollTop = scrollHeight;
            }
          } catch (e) {}
        };
        if (trim(s)) {
          div = $('<div/>').hide().text(s);
          div.html(toLink(div.text(), true));
          div.find('a[href][target="_blank"]').click(function(event) {
            event.preventDefault();
            window.open( $(this).attr('href'), '_blank' );
            return false;
          });
          if (css) {
            div.css(css);
          }
          div.appendTo(Pot.overlay.dialogStatus).show(10, function() {
            $.each([10, 50, rand(100, 200)], function(i, time) {
              setTimeout(scroll, time);
            });
          });
        }
      });
    },
    log: function(msg) {
      Pot.overlay.showLog(msg);
    },
    logError: function(msg) {
      Pot.overlay.showLog(msg, { color: '#cc5544' });
    },
    clearLog: function() {
      Pot.overlay.dialogStatus.text('');
    }
  });
  //---------------------------------------------------------------------------
  // Dialog
  //---------------------------------------------------------------------------
  $.extend(Pot.dialog, {
    classNames: {
      dialoguiId: toUniqId('PotDialogDialogUI'),
      titlebarId: toUniqId('PotDialogTitlebar'),
      titleId: toUniqId('PotDialogTitle'),
      closeBtnId: toUniqId('PotDialogCloseBtn'),
      contentId: toUniqId('PotDialogContent'),
      footerId: toUniqId('PotDialogFooter'),
      cancelBtnId: toUniqId('PotDialogCancelBtn'),
      okBtnId: toUniqId('PotDialogOkBtn'),
      textareaId: toUniqId('PotDialogTextarea'),
      accountsId: toUniqId('PotDialogAccounts'),
      emailId: toUniqId('PotDialogEmail'),
      passwordId: toUniqId('PotDialogPassword'),
      simpleInputId: toUniqId('PotDialogSimpleInput')
    },
    elements: {
      dialogui: null,
      titlebar: null,
      title: null,
      closeBtn: null,
      content: null,
      footer: null,
      cancelBtn: null,
      okBtn: null
    },
    defaults: {
      caption: '',
      content: '',
      width: 400,
      height: 300,
      onClose: function() {},
      onBeforeClose: function() {},
      onShow: function() {},
      onBeforeShow: function() {}
    },
    storage: {
      simpleInput: {}
    },
    showing: false,
    options: {},
    init: function() {
      if ( $(sprintf('.%s', Pot.dialog.classNames.dialoguiId)).length ) {
        return;
      }
      Pot.dialog.elements.dialogui = $('<div/>')
        .addClass(Pot.dialog.classNames.dialoguiId)
        .css({
          position: 'absolute',
          left: -99999,
          top: -99999,
          margin: 0,
          padding: 5,
          width: Pot.dialog.defaults.width,
          height: Pot.dialog.defaults.height,
          overflow: 'hidden',
          wordWrap: 'break-word',
          border: '2px solid #999',
          background: '#f8f8ff',
          color: '#555',
          fontSize: '13px',
          fontFamily: 'verdana, sans-serif',
          textShadow: 'none',
          fontWeight: 'normal',
          MozBorderRadius: '5px',
          borderRadius: '5px',
          MozBoxShadow: '2px 2px 2px #333',
          boxShadow: '2px 2px 2px #333',
          zIndex: 9999999
        })
        .hide();
      
      Pot.dialog.elements.titlebar = $('<div/>')
        .addClass(Pot.dialog.classNames.titlebarId)
        .css({
          position: 'relative',
          marginBottom: 5,
          padding: 4,
          border: '1px solid #999',
          fontFamily: 'verdana, sans-serif',
          textShadow: 'none',
          background: '#ccc',
          MozBorderRadius: '3px',
          borderRadius: '3px',
          height: 25,
          cursor: 'move'
        })
        .appendTo(Pot.dialog.elements.dialogui);
      
      Pot.dialog.elements.title = $('<div/>')
        .addClass(Pot.dialog.classNames.titleId)
        .css({
          position: 'absolute',
          left: 8,
          top: 8,
          margin: 0,
          padding: 0,
          display: 'block',
          color: '#444',
          fontFamily: 'verdana, sans-serif',
          textShadow: 'none',
          fontSize: '13px',
          lineHeight: 1.2,
          maxHeight: 18,
          overflow: 'hidden',
          verticalAlign: 'middle',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          wordWrap: 'break-word',
          width: Pot.dialog.elements.dialogui.width() - 46
        })
        .appendTo(Pot.dialog.elements.titlebar);
      
      Pot.dialog.elements.closeBtn = $('<div/>')
        .addClass(Pot.dialog.classNames.closeBtnId)
        .css({
          position: 'absolute',
          right: 5,
          top: 5,
          width: 18,
          height: 18,
          margin: 1,
          padding: 1,
          fontFamily: 'verdana, sans-serif',
          textShadow: 'none',
          MozUserSelect: 'none',
          userSelect: 'none',
          MozBorderRadius: '5px',
          borderRadius: '5px',
          border: '1px solid #666',
          backgroundColor: '#e8e8ee',
          backgroundImage: sprintf('url(%s)', Pot.data.URI.closeGray),
          backgroundRepeat: 'no-repeat',
          backgroundPosition: '2px 2px',
          backgroundAttachment: 'scroll',
          verticalAlign: 'middle',
          opacity: 0.9,
          cursor: 'pointer'
        })
        .hover(
          function() {
            $(this)
              .css({
                backgroundColor: '#f6f6f6',
                opacity: 0.75
              });
          },
          function() {
            $(this)
              .css({
                backgroundColor: '#e8e8ee',
                opacity: 0.9
              });
          }
        )
        .mousedown(function() {
          $(this).css({
            backgroundColor: '#d0d0d8',
            opacity: 0.99
          });
        })
        .mouseup(function() {
          $(this).css({
            backgroundColor: '#e8e8ee',
            opacity: 0.9
          });
        })
        .attr({
          title: '閉じる'
        })
        .click(function(event) {
          if ($.isFunction(Pot.dialog.options.onBeforeClose)) {
            Pot.dialog.options.onBeforeClose.call($(this), event, 'close');
          }
          Pot.dialog.elements.dialogui.hide();
          Pot.dialog.showing = false;
          if ($.isFunction(Pot.dialog.options.onClose)) {
            Pot.dialog.options.onClose.call($(this), event, 'close');
          }
        })
        .appendTo(Pot.dialog.elements.titlebar);
      
      Pot.dialog.elements.content = $('<div/>')
        .addClass(Pot.dialog.classNames.contentId)
        .css({
          position: 'relative',
          border: '0 none',
          height: Math.floor(Pot.dialog.elements.dialogui.height() - 65),
          padding: 5,
          background: '#f8f8ff',
          overflow: 'auto',
          wordWrap: 'break-word',
          fontSize: '13px',
          fontFamily: 'verdana, sans-serif',
          textShadow: 'none',
          lineHeight: 1.2,
          color: '#555'
        })
        .appendTo(Pot.dialog.elements.dialogui);
      
      Pot.dialog.elements.footer = $('<div/>')
        .addClass(Pot.dialog.classNames.footerId)
        .css({
          display: 'block',
          position: 'absolute',
          right: 0,
          bottom: 0,
          height: 30,
          margin: 5,
          fontFamily: 'verdana, sans-serif',
          textShadow: 'none',
          textAlign: 'right'
        })
        .appendTo(Pot.dialog.elements.dialogui);
      
      Pot.dialog.elements.cancelBtn = $('<button/>')
        .css({
          display: 'inline-block',
          margin: 5,
          padding: '2px 4px',
          fontSize: '12px',
          fontFamily: 'verdana, sans-serif',
          textShadow: 'none',
          fontWeight: 'bold',
          MozUserSelect: 'none',
          userSelect: 'none',
          MozBorderRadius: '5px',
          borderRadius: '5px',
          border: '1px solid #666',
          background: '#e8e8ee',
          color: '#444',
          opacity: 0.9,
          cursor: 'pointer',
          outline: 'none'
        })
        .hover(
          function() {
            $(this)
              .css({
                backgroundColor: '#f6f6f6',
                opacity: 0.75
              });
          },
          function() {
            $(this)
              .css({
                backgroundColor: '#e8e8ee',
                opacity: 0.9
              });
          }
        )
        .mousedown(function() {
          $(this).css({
            backgroundColor: '#d0d0d8',
            opacity: 0.99
          });
        })
        .mouseup(function() {
          $(this).css({
            backgroundColor: '#e8e8ee',
            opacity: 0.9
          });
        });
      
      Pot.dialog.elements.okBtn = Pot.dialog.elements.cancelBtn.clone(true)
        .addClass(Pot.dialog.classNames.okBtnId)
        .text('OK')
        .attr({
          title: 'OKﾃﾞｽｶ?'
        })
        .click(function(event) {
          if ($.isFunction(Pot.dialog.options.onBeforeClose)) {
            Pot.dialog.options.onBeforeClose.call($(this), event, 'ok');
          }
          Pot.dialog.elements.dialogui.hide();
          Pot.dialog.showing = false;
          if ($.isFunction(Pot.dialog.options.onClose)) {
            Pot.dialog.options.onClose.call($(this), event, 'ok');
          }
        })
        .appendTo(Pot.dialog.elements.footer);
      
      Pot.dialog.elements.cancelBtn
        .addClass(Pot.dialog.classNames.cancelBtnId)
        .text('Cancel')
        .attr({
          title: 'キャンセル'
        })
        .click(function(event) {
          if ($.isFunction(Pot.dialog.options.onBeforeClose)) {
            Pot.dialog.options.onBeforeClose.call($(this), event, 'cancel');
          }
          Pot.dialog.elements.dialogui.hide();
          Pot.dialog.showing = false;
          if ($.isFunction(Pot.dialog.options.onClose)) {
            Pot.dialog.options.onClose.call($(this), event, 'cancel');
          }
        })
        .appendTo(Pot.dialog.elements.footer);
      
      Pot.dialog.elements.dialogui.draggable({
        cursor: 'move',
        scroll: false,
        handle: sprintf('.%s', Pot.dialog.classNames.titlebarId),
        cancel: sprintf('.%s', Pot.dialog.classNames.closeBtnId),
        start: function() {
          Pot.dialog.elements.dialogui.css({
            MozBoxShadow: 'none',
            boxShadow: 'none'
          });
        },
        stop: function() {
          Pot.dialog.elements.dialogui.css({
            MozBoxShadow: '2px 2px 2px #333',
            boxShadow: '2px 2px 2px #333'
          });
        }
      }).hide().appendTo('body');
    },
    /**
     * ダイアログをこわす
     */
    //FIXME: unload 時に実行
    destroy: function() {
      try {
        Pot.dialog.elements.dialogui.hide().draggable('destroy');
        Pot.dialog.elements.dialogui.empty().remove();
        Pot.dialog.elements.dialogui.remove();
      } catch (e) {
        try {
          Pot.dialog.elements.dialogui.empty().remove();
          Pot.dialog.elements.dialogui.remove();
        } catch (e) {}
      }
      Pot.dialog.elements.dialogui = null;
    },
    /**
     * ダイアログを開く
     */
    openDialog: function(options) {
      var ops, defaults;
      if (Pot.dialog.showing) {
        return;
      }
      defaults = $.extend({}, Pot.dialog.defaults);
      ops = $.extend({}, defaults,
                      typeof options === 'object' ? options : {});
      Pot.dialog.options = ops;
      Pot.dialog.elements.dialogui
        .css({
          width: ops.width,
          height: ops.height
        });
      Pot.dialog.elements.title.css({
        width: Pot.dialog.elements.dialogui.width() - 46
      });
      Pot.dialog.elements.content.css({
        height: Math.floor(Pot.dialog.elements.dialogui.height() - 65)
      });
      Pot.dialog.elements.title.empty().append(ops.caption || '');
      Pot.dialog.elements.content.empty().append(ops.content || '');
      
      if (ops && $.isFunction(ops.onBeforeShow)) {
        ops.onBeforeShow.call(Pot.dialog.elements.dialogui);
      }
      // 中央に表示
      toCenterMiddle(Pot.dialog.elements.dialogui).show();
      Pot.dialog.showing = true;
      
      if (ops && $.isFunction(ops.onShow)) {
        ops.onShow.call(Pot.dialog.elements.dialogui);
      }
      return Pot.dialog.elements.dialogui;
    },
    /**
     * 簡単な入力ダイアログ
     */
    openSimpleInputDialog: function(ops) {
      var options = $.extend({}, ops || {}), defaults;
      defaults = {
        caption: '',
        content: '<input/>',
        width: 400,
        height: 265,
        onClose: function() {},
        onBeforeClose: function() {},
        onShow: function() {},
        onBeforeShow: function() {}
      };
      $.extend(options, defaults, ops || {});
      options.caption = options.caption || 'リブログを開始する位置を設定';
      $.extend(options, {
        content: $('<div/>')
          .append(
            $('<div/>')
              .css({
                fontFamily: 'verdana, sans-serif',
                textShadow: 'none'
              })
              .html(br([
                'リブログを開始するインデックス番号を入力してください。',
                '',
                ' 一番新しい POST の番号は 0 です。',
                ' 省略すると 0 から始まります。',
                ''
              ].join('\n')))
              .append(
                $('<div/>')
                  .css({
                    margin: 5,
                    color: '#666',
                    fontSize: '12px',
                    fontFamily: 'verdana, sans-serif',
                    textShadow: 'none'
                  })
                  .html(
                    '途中で止めない限り、' +
                    '最後 (最も古い POST) まで実行します。'
                  )
              )
          )
          .append(
            $('<div/>')
              .css({
                margin: 5,
                marginTop: 15,
                color: '#555',
                fontFamily: 'verdana, sans-serif',
                textShadow: 'none',
                fontSize: '12px'
              })
              .html('インデックス番号:')
          )
          .append(
            $('<input/>')
              .addClass(Pot.dialog.classNames.simpleInputId)
              .attr({
                type: 'text'
              })
              .css({
                width: 372,
                fontSize: '13px',
                fontFamily: '"MS Gothic",monospace',
                textShadow: 'none',
                lineHeight: 1.2,
                background: '#fff',
                color: '#444',
                border: '1px solid #999',
                MozBorderRadius: '3px',
                borderRadius: '3px',
                textAlign: 'right',
                margin: 5,
                padding: 3
              })
              .val(0)
          )
      });
      return Pot.dialog.openDialog(options);
    },
    /**
     * Tumblrサブ垢のURLを入力する設定ダイアログ
     */
    openTumblrSubURLInputDialog: function(ops) {
      var options = $.extend({}, ops || {}), defaults, urlList;
      defaults = {
        caption: '',
        content: '<textarea></textarea>',
        width: 600,
        height: 510,
        onClose: function() {},
        onBeforeClose: function() {},
        onShow: function() {},
        onBeforeShow: function() {}
      };
      $.extend(options, defaults, ops || {});
      options.caption = options.caption || 'Tumblrアカウント等の設定';
      options.onShow = (function() {
        var result, func;
        func = Pot.isFunction(options.onShow) ?
                              options.onShow  : (function() {});
        return function() {
          result = func.call(this);
          try {
            $('.' + Pot.dialog.classNames.textareaId).get(0).focus();
          } catch (e) {}
          return result;
        };
      })();
      options.onClose = (function() {
        var result, func;
        func = Pot.isFunction(options.onClose) ?
                              options.onClose  : (function() {});
        return function(event, type) {
          result = func.call($(this), event, type);
          Pot.dialog.onCloseTumblrSubURLInputDialog(event, type);
          return result;
        };
      })();
      urlList = Pot.dialog.loadTumblrSubURL() || [];
      $.extend(options, {
        content: $('<div/>')
          .append(
            $('<div/>')
              .css({
                fontFamily: 'verdana, sans-serif',
                textShadow: 'none'
              })
              .html('サブアカウントの URL を' +
                    ' 1 行ごとに入力してください (改行区切り)。'
              )
              .append(
                $('<div/>')
                  .css({
                    margin: '5px 0 10px 0',
                    color: '#666',
                    fontFamily: 'verdana, sans-serif',
                    textShadow: 'none',
                    fontSize: '12px',
                    lineHeight: 1.4
                  })
                  .html(br([
                    '入力した URL 以外は実行されなくなります。',
                    '例) http://polygonplanet2.tumblr.com/'
                  ].join('\n')))
              )
          )
          .append(
            $('<textarea/>')
              .addClass(Pot.dialog.classNames.textareaId)
              .css({
                width: 572,
                //height: 313,
                height: 80,
                fontSize: '13px',
                fontFamily: '"MS Gothic",monospace',
                textShadow: 'none',
                lineHeight: 1.2,
                background: '#fff',
                color: '#444',
                border: '1px solid #999',
                MozBorderRadius: '3px',
                borderRadius: '3px',
                margin: 5,
                padding: 5
              })
              .val(urlList.join('\n'))
          )
          .append(
            $('<div/>')
              .css({
                fontFamily: 'verdana, sans-serif',
                textShadow: 'none',
                marginTop: 10
              })
              .html(
                'リブログから除外するアカウント名:'
              )
          )
          .append(
            $('<div/>')
              .css({
                fontFamily: 'verdana, sans-serif',
                textShadow: 'none',
                margin: '10px 0'
              })
              .append(
                $('<div/>')
                  .css({
                    fontFamily: 'verdana, sans-serif',
                    textShadow: 'none',
                    fontSize: '12px',
                    color: '#666',
                    lineHeight: 1.4
                  })
                  .html(br([
                    '入力したアカウントが既にリブログしてた場合' +
                    ' スキップされます。',
                    '複数のアカウントを適応する場合は、空白区切りで入力。',
                    '例) polygonplanet'
                  ].join('\n')))
              )
          )
          .append(
            $('<input/>')
              .addClass(Pot.dialog.classNames.accountsId)
              .attr({
                type: 'text'
              })
              .css({
                width: 572,
                fontSize: '13px',
                fontFamily: '"MS Gothic",monospace',
                textShadow: 'none',
                lineHeight: 1.2,
                background: '#fff',
                color: '#444',
                border: '1px solid #999',
                MozBorderRadius: '3px',
                borderRadius: '3px',
                margin: 5,
                padding: 3
              })
              .val(Pot.dialog.loadAccounts().join(' '))
          )
          .append(
            $('<div/>')
              .css({
                fontFamily: 'verdana, sans-serif',
                textShadow: 'none',
                margin: '10px 0'
              })
              .append(
                $('<div/>')
                  .css({
                    fontFamily: 'verdana, sans-serif',
                    textShadow: 'none',
                    fontSize: '12px',
                    color: '#666'
                  })
                  .html(
                    'Tumblr API を使用するため' +
                    ' E-Mail とパスワードが必要です。'
                  )
              )
          )
          .append(
            $('<div/>')
              .css({
                fontFamily: 'verdana, sans-serif',
                textShadow: 'none',
                display: 'block',
                width: 588
              })
              .append(
                $('<span/>')
                  .css({
                    display: 'inline-block',
                    width: 200,
                    verticalAlign: 'middle',
                    fontFamily: 'verdana, sans-serif',
                    textShadow: 'none',
                    marginTop: 8,
                    marginRight: 10,
                    float: 'left'
                  })
                  .html(
                    'メインアカウントのメールアドレス:'
                  )
              )
              .append(
                $('<input/>')
                  .addClass(Pot.dialog.classNames.emailId)
                  .attr({
                    type: 'text'
                  })
                  .css({
                    width: 350,
                    float: 'right',
                    display: 'inline-block',
                    fontSize: '13px',
                    fontFamily: '"MS Gothic",monospace',
                    textShadow: 'none',
                    lineHeight: 1.2,
                    background: '#fff',
                    color: '#444',
                    border: '1px solid #999',
                    MozBorderRadius: '3px',
                    borderRadius: '3px',
                    margin: 5,
                    padding: 3
                  })
                  .val(Pot.dialog.loadEmail())
              )
          )
          .append(
            $('<div/>')
              .css({
                clear: 'both'
              })
          )
          .append(
            $('<div/>')
              .css({
                fontFamily: 'verdana, sans-serif',
                textShadow: 'none',
                display: 'block',
                width: 588
              })
              .append(
                $('<span/>')
                  .css({
                    display: 'inline-block',
                    width: 200,
                    fontFamily: 'verdana, sans-serif',
                    textShadow: 'none',
                    verticalAlign: 'middle',
                    marginTop: 8,
                    marginRight: 10,
                    float: 'left'
                  })
                  .html(
                    'メインアカウントのパスワード:'
                  )
              )
              .append(
                $('<input/>')
                  .addClass(Pot.dialog.classNames.passwordId)
                  .attr({
                    type: 'text'
                  })
                  .css({
                    width: 350,
                    float: 'right',
                    fontSize: '13px',
                    fontFamily: '"MS Gothic",monospace',
                    textShadow: 'none',
                    lineHeight: 1.2,
                    background: '#fff',
                    color: '#444',
                    border: '1px solid #999',
                    MozBorderRadius: '3px',
                    borderRadius: '3px',
                    margin: 5,
                    padding: 3
                  })
                  .val(Pot.dialog.loadPassword())
              )
          )
          .append(
            $('<div/>')
              .css({
                clear: 'both'
              })
          )
          .append(
            $('<div/>')
              .css({
                fontFamily: 'verdana, sans-serif',
                textShadow: 'none',
                margin: '8px 0',
                color: '#777',
                fontSize: '12px'
              })
              .html('これらは暗号化されます。')
          )
      });
      return Pot.dialog.openDialog(options);
    },
    isEnableSiteURL: function(siteURL) {
      var urlList, enable, current;
      urlList = Pot.dialog.loadTumblrSubURL();
      current = trim(lower(siteURL || location.href));
      enable = false;
      $.each(urlList || [], function(i, url) {
        if (current.indexOf(trim(lower(url))) >= 0) {
          enable = true;
          return false;
        }
      });
      return enable;
    },
    saveTumblrSubURL: function(text) {
      var urlList = [], json;
      try {
        if (typeof text === 'string') {
          $.each(trim(text).split(/[\s\u00A0\u3000]+/), function(i, url) {
            url = trim(url);
            if (url && url.length) {
              urlList.push(url);
            }
          });
        } else if (Pot.isArray(text)) {
          urlList = text.map(function(s) {
            return trim(s);
          }).filter(function(s) {
            return s && s.length > 0;
          });
        } else {
          throw new Error(sprintf('Invalid type [%s]', (typeof text)));
        }
        json = JSON.stringify({data: urlList});
        GM_setValue(Pot.tumblrSubURLKey, json);
      } catch (e) {
        throw e;
      }
    },
    loadTumblrSubURL: function() {
      var result, json;
      try {
        json = GM_getValue(Pot.tumblrSubURLKey);
        result = JSON.parse(json).data;
      } catch (e) {
        result = [];
      }
      return Pot.isArray(result) && result || [];
    },
    saveAccounts: function(text) {
      var accounts = [], json;
      try {
        if (typeof text === 'string') {
          $.each(trim(text).split(/[\s\u00A0\u3000]+/), function(i, account) {
            account = trim(account);
            if (account && account.length) {
              accounts.push(account);
            }
          });
        } else if (Pot.isArray(text)) {
          accounts = text.map(function(s) {
            return trim(s);
          }).filter(function(s) {
            return s && s.length > 0;
          });
        } else {
          throw new Error(sprintf('Invalid type [%s]', (typeof text)));
        }
        json = JSON.stringify({data: accounts});
        GM_setValue(Pot.tumblrAccountsKey, json);
      } catch (e) {
        throw e;
      }
    },
    loadAccounts: function() {
      var result, json;
      try {
        json = GM_getValue(Pot.tumblrAccountsKey);
        result = JSON.parse(json).data;
      } catch (e) {
        result = [];
      }
      return Pot.isArray(result) && result || [];
    },
    saveEmail: function(email) {
      var key, val;
      try {
        key = GM_getValue(Pot.secretKeyId, undefined);
        if (key === undefined) {
          throw new Error('Secret key is undefined.');
        }
        val = Pot.AlphamericString.encode(
          (new Pot.RC4(key)).encrypt(stringify(email))
        );
        key = null;
        GM_setValue(Pot.tumblrEmailKey, val);
      } catch (e) {
        throw e;
      }
    },
    loadEmail: function() {
      var key, email;
      try {
        key = GM_getValue(Pot.secretKeyId, undefined);
        if (key === undefined) {
          throw new Error('Unexpected value of the secret key.');
        }
        email = (new Pot.RC4(key)).decrypt(
          Pot.AlphamericString.decode(
            stringify(GM_getValue(Pot.tumblrEmailKey))
          )
        );
        key = null;
      } catch (e) {
        throw e;
      }
      return stringify(email);
    },
    savePassword: function(password) {
      var key, val;
      try {
        key = GM_getValue(Pot.secretKeyId, undefined);
        if (key === undefined) {
          throw new Error('Unexpected value of the secret key.');
        }
        val = Pot.AlphamericString.encode(
          (new Pot.RC4(key)).encrypt(stringify(password))
        );
        key = null;
        GM_setValue(Pot.tumblrPasswordKey, val);
      } catch (e) {
        throw e;
      }
    },
    loadPassword: function() {
      var key, password;
      try {
        key = GM_getValue(Pot.secretKeyId, undefined);
        if (key === undefined) {
          throw new Error('Unexpected value of the secret key.');
        }
        password = (new Pot.RC4(key)).decrypt(
          Pot.AlphamericString.decode(
            stringify(GM_getValue(Pot.tumblrPasswordKey))
          )
        );
        key = null;
      } catch (e) {
        throw e;
      }
      return stringify(password);
    },
    onCloseTumblrSubURLInputDialog: function(event, type) {
      if (lower(type) === 'ok') {
        try {
          Pot.dialog.saveTumblrSubURL(
            $(sprintf('.%s', Pot.dialog.classNames.textareaId)).val()
          );
          Pot.dialog.saveAccounts(
            $(sprintf('.%s', Pot.dialog.classNames.accountsId)).val()
          );
          Pot.dialog.saveEmail(
            $(sprintf('.%s', Pot.dialog.classNames.emailId)).val()
          );
          Pot.dialog.savePassword(
            $(sprintf('.%s', Pot.dialog.classNames.passwordId)).val()
          );
        } catch (e) {
          throw e;
        }
      }
    }
  });
  //---------------------------------------------------------------------------
  // Execute
  //---------------------------------------------------------------------------
  
  // 実行
  Pot.Deferred.call(Pot.init);
  
  //---------------------------------------------------------------------------
  // AutoReBlog
  //---------------------------------------------------------------------------
  function startAutoReblog(startNumber) {
    if (Pot.autoReblog.starting) {
      Pot.overlay.dialogBox.hide();
      Pot.overlay.modalPanel.fadeIn('slow', function() {
        toCenterMiddle(Pot.overlay.dialogBox);
        Pot.overlay.dialogBox.fadeIn('slow', function() {
          Pot.Deferred.wait(0.2).next(function() {
            Pot.autoReblog.processor.startProcess(startNumber || 0);
          });
        });
      });
    }
  }
  
  
  //---------------------------------------------------------------------------
  // Fix Nodes
  //---------------------------------------------------------------------------
  function onNodeInserted(ev) {
    var element = ev.target;
    if (element) {
      if ((!Pot.isAutoPagerize &&
           element.id === 'content') || $(element).hasClass('post')) {
        setTimeout(function() {
          Pot.Deferred.call(onAllNodeInserted, element);
        }, 750);
      }
    }
    return Pot.Deferred.wait(rand(1, 5) / 100);
  }


  function onAllNodeInserted(element) {
    var elems = $(element).parent().find('.post');
    return Pot.Deferred.loop(elems.length, function(idx) {
      var self, a, img, permalink, attr, notice;
      self = $(elems.get(idx));
      notice = 'Error! Cannot get permalink.';
      return getNotes(self).next(function() {
        a = self.find('.media a');
        img = a.find('img');
        permalink = self.children('a').attr('href');
        if (!permalink) {
          permalink = self.find('.for_permalink a').attr('href');
        }
        a.attr({
          href: permalink,
          target: '_blank'
        });
        if ($.trim(permalink).length === 0 ||
            !Pot.permalinkPattern.test(permalink)) {
          raisePermalinkError(a, img, permalink, notice);
        }
        attr = Pot.id + 'hovered';
        if (String(img.attr(attr) || '').toLowerCase() !== 'true') {
          img.hover(
            function() { $(this).css({ opacity: 0.55 }) },
            function() { $(this).css({ opacity: 1 })    }
          );
          img.attr(attr, 'true');
        }
        return getNotes(self).next(function() {
          setNoteEvent( $(self).find('.notes').first() );
        });
      });
    });
  }


  function raisePermalinkError(a, img, permalink, notice) {
    a.attr({
        href: permalink || 'javascript:void(0)'
      })
      .removeAttr('target')
      .css({
        display: 'inline-block',
        border: '8px dotted #ff8866',
        margin: 10,
        padding: 0
      })
      .click(function(ev) {
        ev.preventDefault();
        ev.stopPropagation();
        alert(notice);
        return false;
      })
      .after(
        $('<div/>')
          .css({
            color: '#ff7755',
            margin: 10,
            padding: 10,
            fontSize: '180%',
            fontWeight: 'bold',
            display: 'block'
          })
          .text(notice)
      );
    img.css({
      maxWidth: Math.floor(
          (parseInt(img.css('max-width')) || img.width() || 500) * 0.65
        )
      });
  }


  function setNoteEvent(notes) {
    var post, target = $(notes), attr, sec, done = false;
    attr = Pot.id + 'notesclicked';
    if (target.hasClass('notes')) {
      if (String(target.children('a').attr('href') || '').length) {
        target = target.children('a');
      } else {
        target = target.parent().parent('a');
      }
    } else {
      if (String(target.get(0).tagName || '').toLowerCase() !== 'a') {
        target = target.find('a').first();
      }
    }
    post = target.parents('.post').first();
    if (String(post.attr(attr) || '').toLowerCase() === 'true') {
      done = true;
    }
    sec = rand(1, 8) / 100;
    return done ? succeed() : Pot.Deferred.wait(sec).next(function() {
      $(target).bind('click', function(ev) {
        ev.preventDefault();
        ev.stopPropagation();
        if (post.has('.notecontainer').length === 0) {
          getNotes($(post));
        }
        $(target).unbind('click', arguments.callee);
        return false;
      });
      post.attr(attr, 'true');
    });
  }


  // まれにこの変なパターンがあるから直す
  function fixNotes(links) {
    var elems = links || [], stop = false;
    return Pot.Deferred.loop(elems.length, function(idx) {
      var self = $(elems.get(idx)), post = self.parents('.post');
      if (post.has('.notecontainer').length !== 0) {
        stop = true;
      } else {
        if ($.trim(self.html()).length === 0) {
          self.remove();
        }
      }
      return stop ? [] : post.find('.notes a').first();
    }).next(function(a) {
      $('.notecontainer + .notecontainer img.' +
                      Pot.data.image.loadingSnakeId)
        .parent('.notecontainer')
        .remove();
      return (a && a.length) ? cleanNotes(a) : succeed();
    });
  }


  function cleanNotes(link) {
    var url, reject, text, parent, value, attr, cleaned = false;
    attr = Pot.id + 'fixednotes';
    value = String($(link).parents('.post').attr(attr) || '').toLowerCase();
    if (value !== 'true') {
      $.each(['.date', '.notes'], function(i, name) {
        reject = $(link).parents('.post').find(name + ' a');
        if (reject.length) {
          parent = reject.parents(name);
          url = reject.attr('href');
          text = reject.text();
          reject.remove();
          parent.text(text);
        }
      });
      if (parent && parent.length) {
        parent.parents('.post')
          .attr(attr, 'true')
          .find('.for_permalink')
          .wrapAll( $('<a/>').attr({ href: url }) );
        cleaned = true;
        setTimeout(function() {
          var post = $(link).parents('.post');
          if (post.has('.notecontainer').length === 0) {
            getNotes(post);
          }
        }, 1500);
      }
    }
    return Pot.Deferred.wait(rand(1, 7) / 100);
  }


  // notes を取得
  function getNotes(elem) {
    var elems = $(elem).hasClass('post') && $(elem).find('a') || [];
    return fixNotes(elems).loop(elems.length, function(idx) {
      var self = $(elems.get(idx)), notes, noteCount, url, attr;
      notes = self.find('.notes');
      noteCount = notes.text().replace(/[^0-9]+/g, '') - 0;
      url = self.attr('href');
      attr = Pot.id + 'noteloaded';
      if (url && !(url in Pot.loadedNotes) &&
          String(self.attr(attr)).toLowerCase() !== 'true' &&
          !isNaN(noteCount) && noteCount > 0 &&
          self.parent().has('.notecontainer').length === 0) {
        Pot.loadedNotes[url] = true;
        self.after(
          $('<div/>')
            .addClass('notecontainer')
            .css({
              textAlign: 'center',
              padding: 10,
              background: 'transparent'
            })
            .append(
              Pot.data.image.loadingSnake.clone()
            )
        );
        return requestNotes(self, url, attr);
      }
    });
  }


  function requestNotes(link, url, attr) {
    return Pot.Deferred.xhttp.get(url).next(function(res) {
      link.nextUntil('.notecontainer').remove();
      link.after( $('.notecontainer', res.responseText).hide() );
      link.attr(attr, 'true');
      link.parent().find('.notecontainer').show('normal');
    }).error(function(err) {
      link.nextUntil('.notecontainer').remove();
      link.removeAttr(attr);
      link.append( $('<strong/>').css({ color: '#ff5555' }).text('Error!') );
    });
  }


  function raiseError(format) {
    var msg, args = toArray(arguments);
    args.shift();
    args = args.map(function(a) {
      var r;
      if (a && a.message) {
        r = a.message;
        if (a.lineNumber || a.number || a.line) {
          r += '#' + (a.lineNumber || a.number || a.line);
        }
      } else {
        r = a;
      }
      return r;
    });
    args.unshift(format);
    msg = sprintf.apply(null, args);
    alert(msg);
    throw new Error(msg);
  }


  function sprintf(format) {
    var msg, args = toArray(arguments).slice(1), re;
    re = /%(?:\d*[.]|)(\d*)([%a-z])/gi;
    msg = stringify(format).replace(re, function(m0, m1, m2) {
      var result, arg = args.shift();
      switch (stringify(m2)) {
        case 's':
            result = stringify(arg);
            if (m1) {
              result = result.slice(0, m1);
            }
            break;
        case 'q':
            result = stringify(arg);
            if (m1) {
              result = result.slice(0, m1);
            }
            if ((arg + format).indexOf('"') === -1) {
              result = '"' + result + '"';
            } else {
              result = "'" + result + "'";
            }
            break;
        case 'b':
            result = stringify(arg).split('').map(function(c) {
              return c.charCodeAt(0).toString(2);
            }).join('');
            break;
        case 'c':
            result = String.fromCharCode(parseInt(stringify(arg)) & 0xff);
            break;
        case 'n':
            result = parseInt(trim(stringify(arg)).
                      replace(/^.*?(0x[a-f0-9]+|\d+).*$/gi, '$1'));
            if (!isNumeric(result)) {
              result = 0;
            }
            break;
        case 'd':
            result = parseInt(stringify(arg));
            break;
        case 'u':
            result = parseInt(stringify(arg)) >>> 0;
            break;
        case 'f':
            result = parseFloat(stringify(arg));
            if (m1) {
              result = result.toFixed(m1);
            }
            break;
        case 'e':
            result = parseFloat(stringify(arg)).toExponential(m1);
            break;
        case 'o':
            result = parseInt(stringify(arg)).toString(8);
            break;
        case 'x':
            result = stringify(arg).split('').map(function(c) {
              return c.charCodeAt(0).toString(16).toLowerCase();
            }).join('');
            break;
        case 'X':
            result = stringify(arg).split('').map(function(c) {
              return c.charCodeAt(0).toString(16).toUpperCase();
            }).join('');
            break;
        case '%':
            args.unshift(arg);
            result = '%';
            break;
        default:
            break;
      }
      return result;
    });
    return msg;
  }


  function succeed(value) {
    return Pot.Deferred.call(function() {
      return value;
    });
  }


  function maybeDeferred(value) {
    return Pot.Deferred.isDeferred(value) ? value : succeed(value);
  }


  function toArray(a) {
    return Array.prototype.slice.call(a, 0);
  }


  function toUniqId(prefix, suffix) {
    var random = Math.random().toString(36).split('.').pop();
    return [
      String(prefix || 'pot' + random),
      (new Date).getTime(),
      random,
      String(suffix || '')
    ].join('');
  }


  function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  function isNumeric(n) {
    return (n == null || n === '' ||
                  typeof n === 'object') ? false : !isNaN(n - 0);
  }


  function lower(s) {
    return stringify(s).toLowerCase();
  }


  function upper(s) {
    return stringify(s).toUpperCase();
  }


  function trim(s) {
    return stringify(s).replace(/^[\s\u00A0\u3000]+|[\s\u00A0\u3000]+$/g, '');
  }


  function normalizeSpace(s) {
    return stringify(s).
      replace(/[\u3000\u00A0]/g, ' ').
      replace(/[\u0009]/g, '  ');
  }


  function shrinkLineBreak(s) {
    return stringify(s).replace(/(?:(\r\n|\r|\n)[\u0009\u0020]?){2,}/g, '$1');
  }


  function br(s, tag) {
    return stringify(s).split(/(?:\r\n|\r|\n)/).map(function(c) {
      return c + (tag || '<br />');
    }).join('\n');
  }


  function toLink(text, target) {
    var result, tags = [], chr = String.fromCharCode, attr, patterns;
    attr = '';
    if (target) {
      attr = [
        ' target="', /^\w+$/.test(target) ? target : '_blank', '"'].join('');
    }
    patterns = [
      {
        by: /[\u0000-\u0001]+/g,
        to: ''
      },
      {
        by: /(<\s*(\w+)\b[^>]*>[^<>]*?<\s*\/\s*\2\s*>|<\s*\w+\b[^>]*>)/gi,
        to: function(m0, m1, m2) {
          tags.push(m1);
          return [
            chr(0),
            Array(tags.length + 1).join(chr(1)),
            chr(0)
          ].join('');
        }
      },
      {
        by: /(https?:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:@&=+$,%#]+)/gi,
        to: '<a href="$1"' + attr + '>$1</a>'
      },
      {
        by: /[\u0000]([\u0001]+)[\u0000]/g,
        to: function(m0, m1) {
          return tags[m1.length - 1];
        }
      }
    ];
    result = stringify(text);
    patterns.forEach(function(re) {
      result = result.replace(re.by, re.to);
    });
    return result;
  }


  function escapeRegExp(s) {
    return stringify(s).replace(/([.*+?^${}()|[\]\/\\])/g, '\\$1');
  }


  function stringify(x) {
    var result = '';
    if (x !== null) {
      switch (typeof x) {
        case 'string':
            result = x;
            break;
        case 'xml':
        case 'number':
            result = x.toString();
            break;
        case 'boolean':
            result = x ? 1 : '';
            break;
        default:
            break;
      }
    }
    return String(result);
  }


  function unescapeHTML(s) {
    return stringify(s).
      replace(/&lt;/g, '<').
      replace(/&gt;/g, '>').
      replace(/&quot;/gi, '"').
      replace(/&apos;/gi, "'").
      replace(/&amp;/gi, '&')
      replace(/&#(x[0-9a-f]+|[0-9]+);/gi, function(m) {
          var n = m.toLowerCase(), r;
          try {
              r = String.fromCharCode(n.charAt(0) === 'x' ? ('0' + n) : n);
          } catch (e) {
              r = '';
          }
          return r;
      });
  }


  function pack(s, all) {
    var text = (s && s.toString && s.toString() || String(s));
    return all ? text.replace(/[\s\u3000]+/g, '') :
          text.split(/[\r\n]+/).map(function(c) {
            return c.replace(/[\u3000]/g, ' ').
                     replace(/^\s+|\s+$/g, '').
                     replace(/^(\w)/g, ' $1').
                     replace(/(\w)$/g, '$1 ');
          }).filter(function(c) {
            return c && c.length > 0;
          }).join('').replace(/\s{2,}/g, ' ');
  }


  function getDate(timestamp, part) {
    var d = new Date(timestamp),
        days = '日月火水木金土'.split(''), get = 'get';
    return part ? (function() {
        get += String(part).toLowerCase().replace(/^./, function(m) {
            return m.toUpperCase();
        });
        return d[get] ? d[get]() + (get.slice(-1) === 'h' ? 1 : 0) : null;
    })() : union(' (' + days[d.getDay()] + ') ',
        union('/',
            d.getFullYear(),
            padZero(d.getMonth() + 1),
            padZero(d.getDate())
        ),
        union(':',
            padZero(d.getHours()),
            padZero(d.getMinutes())
        )
    );
  }


  function union() {
    var args = toArray(arguments), separator = args.shift();
    return args.join(separator);
  }


  function padZero(n) {
    return String(Number(n) < 10 ? '0' + n : n);
  }


  function getScreenInfo(key) {
    var d, de, db, sc, win, info;
    d = document || {};
    de = d.documentElement || {};
    db = d.body  || {};
    win = window || {};
    sc = win.sc  || {};
    info = {
      width: db.clientWidth || de.clientWidth || sc.availWidth ||
             win.innerWidth || win.width      || sc.width      || 800,
      height: db.clientHeight || db.scrollHeight || de.clientHeight ||
              sc.availHeight  || win.innerHeight || win.height ||
              sc.height || 600,
      availHeight: de.clientHeight || sc.availHeight || 600,
      x: db.scrollLeft || de.scrollLeft || 0,
      y: db.scrollTop  || de.scrollTop  || 0
    };
    return (key && (key in info)) ? info[key] : info;
  }


  function toCenterMiddle(elem) {
    var info = getScreenInfo(), left, top;
    if (elem) {
      if (elem.jquery) {
        left = elem.width();
        top = elem.height();
      } else {
        left = elem.style && parseInt(elem.style.width);
        if (isNaN(left - 0)) {
          left = elem.clientWidth;
        }
        top = elem.style && parseInt(elem.style.height);
        if (isNaN(top - 0)) {
          top = elem.clientHeight;
        }
      }
      if (!isNaN(Number(left)) && !isNaN(Number(top))) {
        left = Math.floor(info.x + (info.width  / 2) - (left / 2));
        top = Math.floor(info.y  + (info.availHeight / 2) - (top  / 2));
        if (elem.jquery) {
          elem.css({ left: left, top: top });
        } else {
          elem.style.left = left + 'px';
          elem.style.top  = top  + 'px';
        }
      }
    }
    return elem;
  }


  // $X | $x | XPath via Tombloo library
  function $x(expr, context, multi) {
    const XUL_NS  = 'http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul';
    const HTML_NS = 'http://www.w3.org/1999/xhtml';
    var result, doc, toValue, nodes, i, len;
    context = context || document;
    doc = context.ownerDocument || context;
    expr = doc.createExpression(expr, {
      lookupNamespaceURI: function(prefix) {
        var ns;
        switch (String(prefix).toLowerCase()) {
          case 'xul':
              ns = XUL_NS;
              break;
          case 'html':
          case 'xhtml':
              ns = HTML_NS;
              break;
          default:
              ns = '';
              break;
        }
        return ns;
      }
    });
    toValue = function(node) {
      var ret;
      if (node) {
        switch (node.nodeType) {
          case Node.ELEMENT_NODE:
              ret = node;
              break;
          case Node.ATTRIBUTE_NODE:
          case Node.TEXT_NODE:
              ret = node.textContent;
              break;
          default:
              ret = null;
              break;
        }
      }
      return ret;
    };
    result = expr.evaluate(context, XPathResult.ANY_TYPE, null);
    switch (result.resultType) {
      case XPathResult.STRING_TYPE:
          result = result.stringValue;
          break;
      case XPathResult.NUMBER_TYPE:
          result = result.numberValue;
          break;
      case XPathResult.BOOLEAN_TYPE:
          result = result.booleanValue;
          break;
      case XPathResult.UNORDERED_NODE_ITERATOR_TYPE:
          if (!multi) {
            result = toValue(result.iterateNext());
          } else {
            result = expr.evaluate(
              context, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            nodes = [];
            for (i = 0, len = result.snapshotLength; i < len ; i++) {
              nodes.push(toValue(result.snapshotItem(i)));
            }
            result = nodes;
          }
          break;
      default:
          result = null;
          break;
    }
    return result;
  }


  // via AutoPagerize
  function createHTMLDocumentByString(s) {
    var result, html, doc, fragment, re;
    if (document.documentElement.nodeName !== 'HTML') {
      html = String(s || '');
      result = new DOMParser().parseFromString(html, 'application/xhtml+xml');
    } else {
      re = /<!DOCTYPE\b[^>]*>|<html\b[^>]*>|<\/html\s*>[\s\S]*/gi;
      html = String(s || '').replace(re, '');
      try {
        doc = document.cloneNode(false);
        doc.appendChild(doc.importNode(document.documentElement, false));
      } catch(e) {
        doc = document.implementation.createDocument(null, 'html', null);
      }
      fragment = createDocumentFragmentByString(html);
      try {
        fragment = doc.adoptNode(fragment);
      } catch(e) {
        fragment = doc.importNode(fragment, true);
      }
      doc.documentElement.appendChild(fragment);
      result = doc;
    }
    return result;
  }


  // via AlphamericHTML
  function defineAlphamericString() {
    const ALPHAMERIC_BASE63TBL =
          '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_';
    var AlphamericString = {
      encode: function(s) {
        var a = '', c, i = 1014, j, K, k, L, l = -1, p, t = ' ',
            A = ALPHAMERIC_BASE63TBL.split(a);
        for (; i < 1024; i++) {
          t += t;
        }
        t += s;
        s = null;
        while (p = t.substr(i, 64)) {
          for (j = 2; j <= p.length; j++) {
            if (-1 === (k = t.substring(i - 819, i + j - 1).
                             lastIndexOf(p.substring(0, j)))) {
              break;
            }
            K = k;
          }
          if (2 === j || 3 === j && L === l) {
            L = l;
            if ((c = t.charCodeAt(i++)) < 128) {
              if (L !== (l = (c - (c %= 32)) / 32 + 64)) {
                a += A[l - 32];
              }
              a += A[c];
            } else if (12288 <= c && c < 12544){
              if (L !== (l = ((c -= 12288) - (c %= 32)) / 32 + 68)) {
                a += A[l - 32];
              }
              a += A[c];
            } else if (65280 <= c && c < 65440) {
              if (L !== (l = ((c -= 65280) - (c %= 32)) / 32 + 76)) {
                a += A[l - 32];
              }
              a += A[c];
            } else {
              if (L !== (l = (c - (c %= 1984)) / 1984)) {
                a += 'n' + A[l];
              }
              a += A[(c - (c %= 62)) / 62] + A[c];
            }
          } else {
            a += A[(K - (K %= 63)) / 63 + 50] + A[K] + A[j - 3];
            i += j - 1;
          }
        }
        return a;
      },
      decode: function(a) {
        var C = {}, c, i = 0, j, k, l, m, p, s = '    ', w;
        for (; i < 63; i++) {
          C[ALPHAMERIC_BASE63TBL.charAt(i)] = i;
        }
        while (i -= 7) {
          s += s;
        }
        while ((c = C[a.charAt(i++)]) < 63) {
          if (c < 32) {
            s += String.fromCharCode(
              m ? l * 32 + c : (l * 32 + c) * 62 + C[a.charAt(i++)]
            );
          } else if (c < 49) {
            l = (c < 36) ? c - 32 : (c < 44) ? c + 348 : c + 1996;
            m = 1;
          } else if (c < 50) {
            l = C[a.charAt(i++)];
            m = 0;
          } else {
            if (p = (w = s.slice(-819)).substring(
                        k = (c - 50) * 63 + C[a.charAt(i++)],
                        j = k + C[a.charAt(i++)] + 2)) {
              while (w.length < j) {
                w += p;
              }
            }
            s += w.substring(k, j);
          }
        }
        return s.slice(1024);
      }
    };
    return AlphamericString;
  }


  function defineMediaData() {
    var data = {};
    
    data.transparent = [
      'data:image/gif;base64,',
      'R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='
    ].join('');
    
    data.closeGray = [
      'data:image/png;base64,',
      'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAXElEQVQ4jWNgGH7Ay8vrA',
      'B65t4Q0vwXi/9gMAYp9xCWHrvAzukKiNWMx5DgQPyRJM5Ihz6AaQfgSSZqhBjxBMoBk2+',
      'F+JtkL2AIMW8Di0owvGok2BKcCgglpaAIAgfpUeuUrUv8AAAAASUVORK5CYII='
    ].join('');
    
    data.loadingSnake = [
      'data:image/gif;base64,',
      'R0lGODlhEAAQAPUAAAYGBgoKCg4ODhYWFhgYGBwcHCQkJCgoKDAwMDc3Nzo6Oj8/P0BAQ',
      'EVFRVFRUV1dXWFhYWdnZ2lpaW9vb3Nzc3l5eX19fYODg4iIiI6OjpWVlZ6enqSkpKampq',
      'qqqrCwsLKysri4uLy8vL6+vsLCwsjIyMzMzNDQ0NLS0tbW1tra2uDg4OTk5Obm5urq6u/',
      'v7/Ly8vj4+Pz8/P7+/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5',
      'BAEKADQAIf4aQ3JlYXRlZCB3aXRoIGFqYXhsb2FkLmluZm8AIf8LTkVUU0NBUEUyLjADA',
      'QAAACwAAAAAEAAQAAAGfECacEgsFlGYRsFY5CgEAYBQRm0aBhKQaxqDyYYpZcYog72+NI',
      '2BwqTBWjAh5CBqx1ZbGgMRb6dUQg0KfWQoKEITCyRtMCYpQhwNY0woIi1CKxIOHkYpICa',
      'EIg8PGygwMSokHB6XRCIWERMVFxoaHitMLSIaGBkeoG3BQ0EAIfkEAQoAMgAsAAAAABAA',
      'EACFCgoKDg4OEhISGBgYHh4eJCQkKCgoLS0tMzMzNTU1PT09Q0NDRUVFTU1NUlJSWVlZY',
      'WFhZ2dna2trd3d3fHx8g4ODiIiIioqKj4+PlZWVnp6epKSkpqamrKyssLCwtLS0tra2vL',
      'y8wMDAxsbGysrKzs7O0tLS2NjY3Nzc4ODg4+Pj5ubm7Ozs7+/v8vLy9vb2/Pz8/v7+AAA',
      'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABntAmXBILBZPmcfB',
      '0LCYjDKPw1AgDAQBhKb4WSAooVbLIwEIiCiIYlu0FDkMN1QWG1Iaozm9LoM4XHougDISD',
      'y96YkIWESVzMSstQh8SHHMsKoMrFhMiRi0nKnwyJBYVH6EvnyQmkUQlGhgZGx0fISUsUC',
      '0kH7QjKod6wUEAIfkEAQoAMgAsAAAAABAAEACFBgYGDAwMEBAQGBgYIiIiKCgoMDAwNzc',
      '3Pz8/RUVFS0tLTU1NV1dXY2NjZWVla2trb29vc3Nzd3d3fHx8f39/hYWFioqKjo6OkZGR',
      'l5eXoKCgpKSkpqamrKyssLCwtLS0uLi4ubm5vr6+wsLCxsbGzMzM0NDQ1NTU2NjY3Nzc3',
      '9/f5OTk7Ozs8fHx9fX19vb2+/v7/v7+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      'AAAAAAAAAAAAAAAAAABoFAmXBILBZVnIgi4cicjDIRZJFIHAwFBac4cjAwo1ZLJCEUtsL',
      'VxOExYgYJkzD00EBlj4BFmIk8oR8BCkIVEy93LAADQhcVh3dEHRYqkEQlGCJ3MDBDLR0a',
      'f0QwL49CKh0dJSwxMS8sLC2cRCoiISMkJicqLLJFLyonJScrL72VUEEAIfkEAQoAMwAsA',
      'AAAABAAEACFBAQECgoKEBAQFhYWHBwcIiIiJycnKCgoMDAwNTU1Pz8/Q0NDSUlJT09PUl',
      'JSV1dXX19fY2NjZ2dna2trb29vfHx8fX19hYWFiIiIi4uLj4+Pl5eXnJycoKCgp6ensLC',
      'wtLS0uLi4vLy8wsLCyMjIzMzM0NDQ1NTU2NjY2tra39/f5OTk5ubm7Ozs7+/v8vLy9vb2',
      '+/v7/v7+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABoDAmXBIL',
      'BZZoc1EUvGkjLMShiKBPBqMCKhowjRPsBcJo1h8hq3ORWTsJBzPqCYEnVUOGyFoo6qLCg',
      '9CHh0xdS0EB0IfHjKGA4kzIx8sdSACDUIpICd1EQEYQi8lI5RGAAgmaCUlKzBCMrAzHEU',
      'tKSkqKy0vMYVQMS0tLC28dcVEQQAh+QQBCgAvACwAAAAAEAAQAIUGBgYMDAwVFRUeHh4n',
      'JycuLi43Nzc5OTk/Pz9FRUVJSUlPT09dXV1lZWVpaWlzc3N1dXV8fHyDg4OFhYWLi4uOj',
      'o6UlJSVlZWcnJyenp6kpKSnp6ewsLC0tLS5ubm8vLzAwMDCwsLIyMjQ0NDU1NTY2Njf39',
      '/j4+Pm5ubs7Ozx8fH19fX4+Pj7+/v+/v4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGf8CXcEgsFlMjzoWC+aCML1MHs5xEIJNQ8cTZ',
      'hEwsVknjcGiFqxCHZOwwHiahycOGXhYbISmUgr5EChBCIyIufioIC3ojLIcGCXIljVAhB',
      'Q1CKiYqfhAEF0IsKCiTRBQDCSVDLikppB0NAgR5RCwrYUIAAQezRi6GLwkTdX7EL0EAIf',
      'kEAQoAMQAsAAAAABAAEACFCAgIDAwMEhISGBgYHh4eJycnKCgoLi4uMzMzPz8/Q0NDS0t',
      'LUlJSV1dXW1tbY2NjZWVlb29vd3d3g4ODiIiIioqKj4+PlJSUnJycnp6epKSkpqamrKys',
      'sLCwtLS0uLi4ubm5wMDAwsLCysrK0NDQ0tLS2NjY3Nzc4ODg4+Pj6Ojo7Ozs8fHx8vLy+',
      'Pj4/Pz8/v7+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      'AABnnAmHBILBZdpxHIAyqxjLFVSbTkaDCaUpFVGp1Wr1dKZLFoheLSyjiaXFRC1hca40h',
      'AwlXKRS9FLnlwdCwPEnFPgw4QQi4tL3QjDBNoLo9QFgsaQ2FQGAkQJ0YQHCsrIBIICh5G',
      'BwABAgMEBgwcUCUUCwazFyZ0vkNBACH5BAEKADAALAAAAAAQABAAhQYGBgoKChISEhgYG',
      'CIiIicnJy4uLjc3Nz8/P0NDQ0VFRUlJSVVVVV9fX2NjY2VlZW1tbXFxcXl5eYODg4WFhY',
      'uLi46OjpSUlJeXl56enqGhoaysrLCwsLS0tLi4uLy8vL6+vsTExMjIyNDQ0NTU1NbW1tz',
      'c3N/f3+Tk5Obm5urq6vHx8fLy8vj4+Pv7+/7+/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZ3QJhwSCwWX6tUaYlyGWEuFepUGolColTRt',
      'VKtnMiSp3Micp3F06azEr5caKMoM3LHjSkM52l0WS58WxMWQgoAe08lEhlCFAEPfBoQH0',
      'IlBwIVRhwOE1pCGgQDER9eIRYMDyFFGgkEBQYHCQuTiRcNCAoQGmWBvUEAIfkEAQoANwA',
      'sAAAAABAAEACFBgYGCgoKDg4OEhISGBgYHh4eJCQkKCgoLS0tMDAwOTk5PT09Q0NDSUlJ',
      'TU1NUlJSV1dXW1tbX19fY2NjZWVlb29vdXV1eXl5fX19iIiIi4uLjo6OlJSUl5eXnJycn',
      'p6epKSkp6enrKysrq6usrKyuLi4ubm5vr6+xMTEzMzM0NDQ1NTU2NjY3Nzc39/f4+Pj6O',
      'jo7Ozs8fHx9fX1+Pj4/Pz8/v7+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABnzAm3B',
      'ILBprtZlMNqsZhzWaEvZ6zYofI03GYsmGqgTgGVOtaMJMYPK8uVAvoUNAastOKaFhEGvX',
      'SCZCBwQwfiJ1NxEFgU8uIIwcBhZtJh0qQiwOCFlFKBsgfUIiCwoZKDMzKSAYGStFJBEMD',
      'Q8RFBYbl0aOGLUbJoVtwUJBADs='].join(''),
    data.reblogIcon = [
      'data:image/png;base64,',
      'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAMFBMVEVkWvz8/vxsYvxsW',
      'vw9IEAEADmVABt8AABoYADw7gAXEgAAAABJAA6qAACAAAB8AABltFzHAAAASUlEQVR42l',
      'XNUQrAIAwD0LITGD1B3QV0uf/dbIbdMB/lUQIx7pjOaIm6QTTamFAORBO3EM1SBSdduED',
      'G1/h2P/RAR2554vnXlQWt/BRKHLwwKgAAAABJRU5ErkJggg=='].join('');
    data.loadingWiiBox = [
      'data:image/gif;base64,',
      'R0lGODlhEAAQAPcAAAAAAEpKSouLi4qKioKCgiQkJImJif////Hx8UNDQ/X19fLy8uXl5',
      'T8/P0RERBEREQcHB21tbQYGBoCAgH9/f3d3dyEhIQ4ODsrKygsLC319ferq6t3d3T09PQ',
      '0NDb+/v/T09HZ2duHh4d7e3tLS0jo6OgMDAzU1NSAgID4+PhAQEElJSQUFBWRkZHV1dXR',
      '0dG5ubh4eHoiIiAoKCrm5uXNzc9fX18vLyzg4OIGBga+vr+Dg4M/Pz8zMzMHBwSMjIzEx',
      'MTk5OcDAwM3NzQwMDH5+flxcXGpqamlpaWNjYxsbGwkJCaqqqmdnZ8LCwre3tzMzM6Gho',
      'c7OzmJiYrq6uri4uK6urjAwMAICAi0tLTQ0NLCwsLy8vKCgoAQEBFJSUjIyMl9fX15eXl',
      'lZWRkZGQgICJqaml1dXaSkpC4uLpGRkVhYWKenp6WlpZycnCsrKygoKBgYGKKioqurq62',
      'trVtbW5OTk2xsbGhoaCwsLFNTU05OThYWFpKSkqamppSUlCYmJhUVFSkpKYeHh0FBQUhI',
      'SBMTE3p6ekdHR4aGhnh4eBISEoODg4yMjDw8PHFxcWtra2VlZRwcHHt7e3x8fCcnJ1paW',
      'lVVVVRUVBcXFwEBAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      'AAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/i1NYWRlIGJ5IEtyYXNpbWlyYSBOZWpjaGV2',
      'YSAod3d3LmxvYWRpbmZvLm5ldCkAIfkEAQoAEAAsAAAAABAAEAAABSYgBIxkaZ5oqq5s6',
      '75wLM9wIAxEwRrHgSS73o9FUCwYDVbBkWg8QgAh+QQBCgABACwAAAAAEAAQAAAGQ8AAYE',
      'gsGo/IpHLJbDqf0Kh0qoREBIKIJDGhVCzGC+ZwwGQ0mw2nEx6Xz+m10fMBgT6ZkGhEKhl',
      'NJwkJJyYoKR0lKkEAIfkEAQoAAQAsAAAAABAAEAAAB16AAQCDhIWGh4iJiouMjY6PkJGS',
      'k4UFBAMCKywtExMtEikuLzAxCQgHBzIzNBsbNDM1NjY3OKaoqqyusLK0DQwLCjkzOjs7O',
      'jMRPD0+Jw8NCQ4/JkAdHUAmMUE4JxeBACH5BAEKAAEALAAAAAAQABAAAAd2gAEAg4SFho',
      'eIiYqLjI0AJh4XFxCMJ0I3QxGMCQgHBwabnZ+Vl5mMJhkZRBKMFiFFFAksRi4uRiw4R0h',
      'JSh0cGxtFS0w2NkxLTU5OT1C+wMLExsjKzCUkIyIVS1FSUlFLU1RVVlcqJR0pKFhZODhZ',
      'JkpaUFcegQAh+QQBCgABACwAAAAAEAAQAAAHloABAIOEhYaHiImKi4yNACZEHh4SABkXF',
      'xmHQFtUXElLXUNDXZmFHRwbGxoZGAcHGBeGp6mrra+xhZudn6GjpYQmMzMZlEtEREuHMR',
      'EvLyleX0hIXyxgYWJjZDg3NjY1ZWZOTmZLZ1ZWaGnb3d/h4+Xn6Sc+PTwRZWpUVGpLa2x',
      'tbt5cOIEjSAwscKBAgYMlTpo0b4gEAgAh+QQBCgACACwAAAAAEAAQAAAIvAAFABhIsKDB',
      'gwgTKlzIsCEAExmIEJEAYIYHDzMAQLhwwYOJLHLm0KlTxg4XLnbK3BlyQ8gJHDds2Kgxg',
      '8aGDTRmyDhwAEECmDJp2sSpk6dPkCJJmkSpkqVLE0uWzGABYInEJQAkEMmQwYSSKXiQ4P',
      'ASQIyYAF7y6NGzhw+UJ06cIIEwwIqVAWW+mDHTB87buHPr3s27t+8VK1WoJIFAwI8fAmX',
      '2/OkzAJCHK1C0KMFSIE2aAlgCCYIDaEZAACH5BAEKAAEALAAAAAAQABAAAAjTAAMAGEiw',
      'YAEHCRo8KMhwIAEFCxg0aMjQwIEDCBJQLGgRo8aNA1cMMJCjAJYZGTKwALCECJElAFhkm',
      'DHDBJw+Ztx8KTOIDp1BEFpwobIFCJQnTpw0WcLEhg0mS4ps2MChw9GkS5s+jTq16s2cO3',
      'v+DDq0KJYlaFeWSVkGgAQiKU2QWXNGDBgvhPToIeQF0IpCDgylQWPFyhkJh8yYOQQBUaJ',
      'EFH4MLnw48eLGjyO/cdOGzRgJNezYqQHBQQ4KiiwQeZMmTRwsKODAQYFlUYEfFpYEBAAh',
      '+QQBCgAEACwAAAAAEAAQAAAI6gAJABgIwMSJBAlOmECRokMJFQQHevgAAsSHDCFEjCBRI',
      'iKACxgOHMCQQcOGDRw6eAQpkqRJlCojQrgzYMAdCQkmUKhgAcuSGTNYAJCwZIkEACxmFM',
      'VSgJGARgEgHHLj5hCEOnTmyMmSBo0VK2eWmHHixEyZGjZs3MDR9WvYsWXPpl3b9GnUqVW',
      'vZt2KpYxfLwAgAIUwNANQE3z26NGTx0SQFSuCLOzQIYgKOH3MmNEj4UiiREckOHr0CFIM',
      'zJo5ewYtmrRpQAP6/NkjocWECS0kBIkAKZKkGYDgCAqERdKPH5KwqIgRQ1KZgAAh+QQBC',
      'gABACwAAAAAEAAQAAAI+QAfNEjg4IcJIB06ADERIwiOExcaMFigIMcMHTt26JgRgUcPHy',
      'cSIDhwQMYMGhs20JhRw4aNGzhEkjSJUiVLlzAL5DAwYAWLFhMmtJCQ4sWLCDGwSFhqIoC',
      'EMmUkAPCyBCoWFC8mUSIkIUKjRhEk6HFjpg8cOH3MmPlSZoAVKwMgIHHi5AkUtGrZuoUr',
      'l65drFq5egUrlqxZLBASewEAYckSCABYzHBswpCDQisqmbiS8IoJJVCgXPHwg0KiRIVYW',
      'Hr0yBILMGLEjCFT+nTq1a1fx55tQRGFHA5YXLpz5xKLK5bGYMq0xMKPAoY0ZYoRI5MmD2',
      'TIZJIQEAAh+QQBCgABACwAAAAAEAAQAAAI7AAfNEjg4IcJIB06ADERIwiOExcaMFigIMc',
      'MHTt26JgRgUcPHycSIDhwQMYMGhs20JhRw4aNGzhEkjSJUiVLlzAL5DAwYAWLFhMmtJCQ',
      '4sWLCDGwSFhqIoCEMmUkAPCyBCoWFC8mUSIkIUKjRhEk6HFjpg8cOH3MmPlSZoAVKwMgI',
      'HHi5AkUtGrZuoUrl65drFq5egUrlqxZLBASewEAYckSCABYZMgwA4shB4VWVDJxJeEVEw',
      'BCh/5BIVGiQiwsPXpkSapoAKRNo1bN2rVoC4oo5HDA4tKdO5dsh15i4UcBQ5oyxYiRSdN',
      'rAAEBACH5BAEKAAEALAAAAAAQABAAAAjTAB80SODghwkgHToAMREjCI4TFxowWKAgxwwd',
      'O3bomBGBRw8fJxIgOHBAxgwaGzbQmFHDho0bOESSNIlSJUuXMAvkMDBgBYsWEya0kJDix',
      'YsIMbBIWGoigIQyZSQA8LIEKhYULyZRIiQhQqNGESTocWOmDxw4fcyY+VJmgBUrAyAgce',
      'LkCRS0atm6hSuXrl2sWrl6BSuWrFksEBJ7AVBmxowyAFhkyDADiyEHhVYAAsC5s2cAPyg',
      'kSlTos+nQo0ub9mxBEYUcDlZ7XmLhRwFDsjsHBAAh+QQBCgABACwAAAAAEAAQAAAIuQAf',
      'NEjg4IcJIB06ADERIwiOExcaMFigIMcMHTt26JgRgUcPHycSIDhwQMYMGhs20JhRw4aNG',
      'zhEkjSJUiVLlzAL5DAwYAWLFhMmtJCQ4sWLCDGwSFhqIoCEMmUkAPCyBCoWFC8mUSIkIU',
      'KjRhEk6HFjpg8cOH3MmPlSZoAVKwMgIHHi5AkUtGrZuoUrl65drFq5egUrlqxZLFDLeAF',
      'QZsaMMgBYZMgwAwuAy5gza97MubPnz6BDXw4IACH5BAEKAAEALAAAAAAQABAAAAimAB80',
      'SODghwkgHToAMREjCI4TFxowWKAgxwwdO3bomBGBRw8fJxIgOHBAxgwaGzbQmFHDho0bO',
      'ESSNIlSJUuXMAsQGCBgBYsWEya0kJDixYsIMQIAWLpUQpkyEgB4WfIUC9OlZSI0ahRBgh',
      '43ZvrAuQpgxgArVgZAQOLEyRMoZM2iVcvWLdyrWbd2/Rp2LNkyM2aUAcAiQ4YZVskqXsy',
      '4sePHkB8HBAAh+QQBCgABACwAAAAAEAAQAAAHeoAPDQkOPyZAHR1AJjFBOCcXDQwLCjkz',
      'Ojs7OjMRPD0+JwkIBwcyMzQbGzQzNTY2NziipKaoqqyusAUEAwIrLC0TEy0SKS8vETEBA',
      'MvMzV5LZWVYzdTLem5mfXDV1HhOTk9Q3M3e4OLj1tja6MssGRkz0+zz9PX2982BACH5BA',
      'EKAAEALAAAAAAQABAAAAdegA8NCQ4/JkAdHUAmMUE4JxcNDAsKOTM6Ozs6MxE8PT4nCQg',
      'HBzIzNBsbNDM1NjY3OKKkpqiqrK6wBQQDAissLRMTLRIpLi8wMQEAy8zNzs/Q0dLT1NXW',
      '19jZ2tvNgQAh+QQBCgABACwAAAAAEAAQAAAHTYAPDQkOPyZAHR1AJgEAjgANDAsKOTM6O',
      'zs6RI+OCQgHBzIzNBsbNB6cAJ6goqSmqJwFBAMCKywtExMtEqm9vr/AwcLDxMXGx8jJyg',
      'CBACH5BAEKABAALAAAAAAQABAAAAUp4NMkTgEBaKo2zKIQaowmyHEYckzbeJ4WhIEg4Cs',
      'aj8ikcslsOp/QWAgAIfkEAQoAAQAsAAAAABAAEAAAB0+AKiUdKRYBAIiJiiUkIyIVipGI',
      'HRwbG0WSkZSWmJmJFiFFFAmeiSYZGUQSpYgnQjdDEawACQgHBwaztbe5rK6wsqwmHhcXE',
      'LPIycrLzKyBACH5BAEKAAEALAAAAAAQABAAAAdigBcnOEExAQCIiYonPj08MIqRiDg3Nj',
      'YvkpGUlpiZiTERLy8pnokmMzMZEqWIQFtUXC2sAB0cGxtFs7W3uayusLKsp6ksswU5BgM',
      'rswkIBwcGzM7Qsw0MCwoEsw8NCQ4Fs4EAIfkEAQoAAQAsAAAAABAAEAAAB32AHldQWkoB',
      'AIiJildWVVRJipGIUE9OTniSkZSWmJmJSlN4SDieiSZLSzMspYhZcnN0RqwAODc2Ni+zt',
      'be5rK6wsqxYqKqzFhUUEwkSEQICERCRHRwbGxoZGAcHGBfS1NbY2tyRJSQjIiEZHyAgHx',
      '6RKiUdKSgmJwkJJyaRgQAh+QQBCgABACwAAAAAEAAQAAAHmoBEb2lpZAEAiImKb25tbGO',
      'KkYhpaFZWZ5KRlJaYmYlka2diYJ6JWEuoLAAZFxcZknB9Zm5fS11DQ12vilBPTk5NGRgH',
      'BxgXkb2/wcPFx4qxs7W3ubumZWVLXgBLRERLkjERLy8pEkkUFEkSkTg3NjY1MzQbGzQe7',
      'O7w8vT2kSc+PXhEmKFjxw4dRCJdOIEjSAwTQDp0AGIiUiAAIfkEAQoABAAsAAAAABAAEA',
      'AACMMAZwCCIyiQiRMJEpwwQQCAQwCABvT5syfDBxAgPnh46BBOHzNmvmTAcOAAhgscAXg',
      'EKZKkSZQc+ezRoyePhDsDBtyBkBJLmZ9eAJTJkKFMSgAFGAloFGCJHS5c7MxImQaNFStn',
      'MtDYsIHGRo5Vr2bd2vXrw6RLmz6NOpUjFggQygQdWvSopCRIjuBgUefFizoSUkJ54sRJk',
      'yVMbNhgQkQwYcOIFTNOecVKFSpTlkSRIiVKhpQerkDRosREFhw4sphIGRAAIfkEAQoAAQ',
      'AsAAAAABAAEAAACNcAl1j4UWCRCSAdOgAx8cNBggYPLCiikMNBBh07duiYkUPBAgYNflB',
      'IlAhRBhobNtCYIePAAQQJRJI0iVIlS5cwDTkotAKQhBYTJrRgsULAAAIFsEBY6iUAhBkz',
      'IACYShXFi0mUCJUZRIfOoCVUp8LpY8bMlxlMbNhgQiQsgLFlz6Zd2zasVaxauXoFGxaLB',
      'AkQvAAoA7WMWwBkxogJA4bFFyRIvrBwmwaNFStnlphx4sRMBsqWMWvm7NntGzdt2KxZoo',
      'YKFTUz3BJ5kyZNHCxwoECBg8VtQAAh+QQBCgACACwAAAAAEAAQAAAI6ADLSIoRQ4WJLDh',
      'wZMGCIkWHEiokRYIUIciMKFKkRFlSQcQIEiViQHr0yNEMJjZsMFlSZMMGDh1EkjSJUiVL',
      'lzBVBOnQAYWEOi9e1GGRgEKREBawSJAAwYQACEuWQAAggUiGDCYkQroTBMIhN24OSbgz5',
      'IaQEz8oJEqEaIkZJ07MlJFx4ACCBGnXtn0bd27du1q5egUrlqzZE0qXmgAAVSrjCxc8mO',
      'CzRw+mPF4CiBETgAWAz5/h9DFj5kuZAVasDJgBOvTo0qdTr24NANCAPn/2lCHgxw+BJbR',
      'nAIIjKBCWAmnSFMBCOyAAIfkEAQoAAQAsAAAAABAAEAAACPYAJWQiQ8aDCThQoMDBEiMI',
      'jhMXMmEaY+nKEjVUqKgpE4FHDx8nyIwRIwbMEjNOnJgpU8OGjRs4RJI0iVIlS5cwPVxJq',
      'ISFniNH9HhJ8eJFhBiaWLCQYCKAhDJlJACQkGHGDBOZLlmqcwVChEaNIkhowYXKFiAxID',
      '165KjMACtWBkAosmEDhw5p17Z9G3du3btZt3b9GnZs2bNJlZqYClUqi6pXDTlYsQKQF0J',
      '69BAysWKAgRwFflBIlAgRhENmzBySIOPAAQQJRJM2jVo1a9ewLSiikMMBhBp27NSQkEPB',
      'AgYNllj4UWARFhRw4KDA8sNBggYPAgIAIfkEAQoAAQAsAAAAABAAEAAACOgAAwAYCAALH',
      'ChQ4GCJEQTHiQsEB85QQ4WKmjIRePTwcSIigAxmnDgxU6aGDRs3cHgEKZKkSZQqI7LQc+',
      'SIHi8pXryIEEOThJ8mAEgoU0aC0AwzZpjIdMlSnSsQIjRqFEFCCy5UtgCJAenRI0dlBli',
      'xMgBCkQ0bOHTg6hWsWLJm0apl6hSqVKpWsWrVxKJv0KFFAbBAqtSQgxUrAHkhpEcPIRMr',
      'BhjIUeAHhUSJEEE4ZMbMIQkyDhxAkMAyZs2cPYMWTdqCIgo5HECoYcdODQk5FCxg0GCJh',
      'R8FFmFBAQcOCiw/HCRo8CAgACH5BAEKAAEALAAAAAAQABAAAAjUAAMAGAgACxwoUOBgiR',
      'EEx4kLBAfOUEOFipoyEXj08HEiIoAMZpw4MVOmhg0bN3B4BCmSpEmUKiOy0HPkiB4vKV6',
      '8iBDDIwAJZcpI+JlhxgwTHjE2ahRBQgsuVLYA8ThjgBUrAyAU2bCBQweqVrFq5eo1aYSl',
      'TZ9GneoRqFAALIoeNeRgxQpAXgjp0UPIxIoBBnIU+EEhUSJEEA6ZMXNIgowDBxAkIGwYs',
      'WLGjiFLtqCIQg4HEGrYsVNDQg4FCxg0WGLhR4FFWFDAgYMCyw8HCRo8CAgAIfkEAQoAAQ',
      'AsAAAAABAAEAAACL0AAwAYCAALHChQ4GCJEQTHiQsEB85QQ4WKmjIRePTwcSIigAxmnDg',
      'xU6aGDRs3cHgEKZKkSZQqI7LQc+SIHi8pXryIEMMjAAllykj4mWHGDBMeMTZqFEFCCy5U',
      'tgDxOGOAFSsDIBTZsIFDB6pWsWrl6jVphKVNn0ad6hGoUAAsih716IWQHj2ETKwYYCBHg',
      'aSHzJg5JEHGgQMIEgAWTNgwYsURS9qxU0NCDgULGDTwiAUFHDgosPxwkKDBg4AAIfkEAQ',
      'oAAQAsAAAAABAAEAAACKgAAwAYCAALHChQ4GCJEQTHiQsEB85QQ4WKmjIRePTwcSIigAx',
      'mnDgxU6aGDRs3cHgEKZKkSZQqI7LQc+SIHi8pXryIEMMjAAllykj4mWHGDBMeMTZqFEFC',
      'Cy5UtgDxOGOAFSsDIBTZsIFDB6pWsWrl6jVphKVNn0admtRoGQAsih716XHFAAM5CtCNa',
      'ODAAQQJ9hLs+zewYAAEFCxg0OAwgAIOEjR4EBAAIfkEAQoAAQAsAAAAABAAEAAAB32AAQ',
      'CDAFhwUFBwWDFBOCcXhIMzalRUamURPD0+J5EAGWZOTmZlNTY2NzieoKKkpqiqkSx6R0d',
      '6XikvLxExnr4SGTMzJr6eLVxUW0DFkUUbGxwdzITO0NLTAMfJy9gswcPYACsDBjkF4QYH',
      'BwgJ6Ors4QQKCwwN4QUOCQ0PgQAh+QQBCgABACwAAAAAEAAQAAAHYYABAIOEhTFBOCcXh',
      'YyDMDw9PieNjC82Njc4lIWWmJqbgykvLxExoIMSGTMzJqcALVxUW0CuRRsbHB21t7musL',
      'K0pyyqrK4rAwY5Ba4GBwcICczO0K4ECgsMDa4FDgkND4EAIfkEAQoAAQAsAAAAABAAEAA',
      'AB0iAAQCDhIWGh4iJiouMjY0SHh5EJowtXFRbQIxFGxscHZudn5WXmYwsGTMzlIsrAwY5',
      'BYwGBwcICbO1t4wECgsMDYwFDgkND4EAOw=='].join('');
    return data;
  }
});
//-----------------------------------------------------------------------------
// RC4
//-----------------------------------------------------------------------------
/**
 * RC4 symmetric cipher encryption/decryption
 *
 * Version 1.00, 2011-04-17
 * Copyright (c) 2011 polygon planet <polygon.planet@gmail.com>
 * Dual licensed under the MIT or GPL v2 licenses.
 */
function defineRC4(target) {
  var RC4 = (function(undefined) {
    /**
     * Constructor
     */
    function RC4(key) {
      return new RC4.prototype.init(key);
    }
    RC4.prototype = {
      /**
       * @internal
       */
      constructor: RC4,
      table: [],
      key: null,
      /**
       * Initialize
       *
       * @param  {String} key  - secret key for encryption
       * @return {Object} RC4
       */
      init: function(key) {
        if (key !== undefined) {
          this.setKey(key);
        }
        this.initTable();
        return this;
      },
      /**
       * @internal
       */
      initTable: function() {
        var i;
        this.table = [];
        for (i = 0; i < 256; i++) {
          this.table[i] = i;
        }
      },
      /**
       * Set the secret key string for encryption.
       *
       * @param  {String} key  - secret key for encryption
       * @return {Object} RC4
       */
      setKey: function(key) {
        this.key = utf8Encode(key);
        return this;
      },
      /**
       * Encrypt given plain text using the key with RC4 algorithm.
       * All parameters and return value are in binary format.
       *
       * @param  {String} text - plain text to be encrypted
       * @return {String}
       */
      encrypt: function(text) {
        return rc4Crypt(utf8Encode(text), this.key, this.table);
      },
      /**
       * Decrypt given cipher text using the key with RC4 algorithm.
       * All parameters and return value are in binary format.
       *
       * @param  {String} text - cipher text to be decrypted
       * @return {String}
       */
      decrypt: function(text) {
        return utf8Decode(rc4Crypt(text, this.key, this.table));
      }
    };
    RC4.prototype.init.prototype = RC4.prototype;
    
    // UTF8 octets encode/decode
    function utf8Encode(string) {
      var result, s = new String(string), re, callback;
      try {
        result = unescape(encodeURI(s));
      } catch (e) {
        try {
          re = /%(..)/g;
          callback = function(m0, m1) {
            return String.fromCharCode('0x' + m1);
          };
          result = encodeURI(s).replace(re, callback);
        } catch (e) {
          result = '';
        }
      }
      return result;
    }
    
    function utf8Decode(string) {
      var result, s = new String(string), re, callback;
      try {
        result = decodeURIComponent(escape(s));
      } catch (e) {
        try {
          re = /[%\x80-\xFF]/g;
          callback = function(m) {
            return '%' + m.charCodeAt(0).toString(16);
          };
          result = decodeURIComponent(s.replace(re, callback));
        } catch (e) {
          result = '';
        }
      }
      return result;
    }
    
    function rc4Crypt(text, key, table) {
      var a = table, i, j = 0, x, y, result = [],
          t = new String(text), k = new String(key), len = k.length;
      for (i = 0; i < 256; i++) {
        j = (j + a[i] + k.charCodeAt(i % len)) % 256;
        x = a[i];
        a[i] = a[j];
        a[j] = x;
      }
      i = j = 0;
      len = t.length;
      for (y = 0; y < len; y++) {
        i = (i + 1) % 256;
        j = (j + a[i]) % 256;
        x = a[i];
        a[i] = a[j];
        a[j] = x;
        result[result.length] = t.charCodeAt(y) ^ a[(a[i] + a[j]) % 256];
      }
      return String.fromCharCode.apply(null, result);
    }
    return RC4;
  })();
  if (target) {
    target.RC4 = RC4;
  }
  return RC4;
}
//-----------------------------------------------------------------------------
// JSDeferred
//-----------------------------------------------------------------------------
/**
 * JSDeferred
 *
 * Usage:: with (D()) { your code }
 *
 * JSDeferred 0.4.0 Copyright (c) 2007 cho45 ( www.lowreal.net )
 *
 * See http://github.com/cho45/jsdeferred
 * http://cho45.stfuawsc.com/jsdeferred/
 *
 * Fixed.
 */
function D() {
  function Deferred() {
      return (this instanceof Deferred) ? this.init() : new Deferred();
  }
  Deferred.ok = function(x) { return x };
  Deferred.ng = function(x) { throw  x };
  Deferred.prototype = {
    _id: 0xe38286e381ae,
    init: function() {
      this._next = null;
      this.callback = {
          ok: Deferred.ok,
          ng: Deferred.ng
      };
      return this;
    },
    next: function(fun) { return this._post("ok", fun) },
    error: function(fun) { return this._post("ng", fun) },
    call: function(val) { return this._fire("ok", val) },
    fail: function(err) { return this._fire("ng", err) },
    cancel: function() {
      (this.canceller || function() {})();
      return this.init();
    },
    _post: function(okng, fun) {
      this._next = new Deferred();
      this._next.callback[okng] = fun;
      return this._next;
    },
    _fire: function(okng, value) {
      var next = "ok";
      try {
        value = this.callback[okng].call(this, value);
      } catch (e) {
        next = "ng";
        value = e;
        if (Deferred.onerror) {
          Deferred.onerror(e);
        }
      }
      if (Deferred.isDeferred(value)) {
        value._next = this._next;
      } else {
        if (this._next) {
          this._next._fire(next, value);
        }
      }
      return this;
    }
  };
  Deferred.isDeferred = function(obj) {
    return !!(obj && obj._id == Deferred.prototype._id);
  };
  Deferred.next_default = function(fun) {
    var d = new Deferred();
    var id = setTimeout(function() { d.call() }, 0);
    d.canceller = function() { clearTimeout(id) };
    if (fun) {
      d.callback.ok = fun;
    }
    return d;
  };
  Deferred.next_faster_way_readystatechange = 
    ((typeof window === 'object') && (location.protocol == "http:") &&
    !window.opera && /\bMSIE\b/.test(navigator.userAgent)) && function(fun) {
    var d = new Deferred();
    var t = new Date().getTime();
    if (t - arguments.callee._prev_timeout_called < 150) {
      var cancel = false;
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src  = "data:text/javascript,";
      script.onreadystatechange = function() {
        if (!cancel) {
          d.canceller();
          d.call();
        }
      };
      d.canceller = function() {
        if (!cancel) {
          cancel = true;
          script.onreadystatechange = null;
          document.body.removeChild(script);
        }
      };
      document.body.appendChild(script);
    } else {
      arguments.callee._prev_timeout_called = t;
      var id = setTimeout(function() { d.call() }, 0);
      d.canceller = function() { clearTimeout(id) };
    }
    if (fun) {
      d.callback.ok = fun;
    }
    return d;
  };
  Deferred.next_faster_way_Image = 
    ((typeof window === 'object') && (typeof(Image) != "undefined") &&
    !window.opera && document.addEventListener) && function(fun) {
    var d = new Deferred();
    var img = new Image();
    var handler = function() {
      d.canceller();
      d.call();
    };
    img.addEventListener("load", handler, false);
    img.addEventListener("error", handler, false);
    d.canceller = function() {
      img.removeEventListener("load", handler, false);
      img.removeEventListener("error", handler, false);
    };
    img.src = "data:image/png," + Math.random();
    if (fun) {
      d.callback.ok = fun;
    }
    return d;
  };
  Deferred.next_tick =
    (typeof process === 'object' &&
     typeof process.nextTick === 'function') && function(fun) {
    var d = new Deferred();
    process.nextTick(function() { d.call() });
    if (fun) {
      d.callback.ok = fun;
    }
    return d;
  };
  Deferred.next = Deferred.next_faster_way_readystatechange ||
                Deferred.next_faster_way_Image ||
                Deferred.next_tick ||
                Deferred.next_default;
  Deferred.chain = function() {
    var chain = Deferred.next();
    for (var i = 0, len = arguments.length; i < len; i++) (function(obj) {
      switch (typeof obj) {
        case "function":
          var name = null;
          try {
            name = obj.toString().match(/^\s*function\s+([^\s()]+)/)[1];
          } catch (e) {}
          if (name != "error") {
            chain = chain.next(obj);
          } else {
            chain = chain.error(obj);
          }
          break;
        case "object":
          chain = chain.next(function() { return Deferred.parallel(obj) });
          break;
        default:
          throw "unknown type in process chains";
      }
    })(arguments[i]);
    return chain;
  };
  Deferred.wait = function(n) {
    var d = new Deferred(), t = new Date();
    var id = setTimeout(function() {
      d.call((new Date).getTime() - t.getTime());
    }, n * 1000);
    d.canceller = function() { clearTimeout(id) };
    return d;
  };
  Deferred.call = function(fun) {
    var args = Array.prototype.slice.call(arguments, 1);
    return Deferred.next(function() {
        return fun.apply(this, args);
    });
  };
  Deferred.parallel = function(dl) {
    if (arguments.length > 1) {
      dl = Array.prototype.slice.call(arguments);
    }
    var ret = new Deferred(), values = {}, num = 0;
    for (var i in dl) if (dl.hasOwnProperty(i)) (function(d, i) {
      if (typeof d == "function") d = Deferred.next(d);
      d.next(function(v) {
        values[i] = v;
        if (--num <= 0) {
          if (dl instanceof Array) {
            values.length = dl.length;
            values = Array.prototype.slice.call(values, 0);
          }
          ret.call(values);
        }
      }).error(function (e) {
        ret.fail(e);
      });
      num++;
    })(dl[i], i);
    if (!num) Deferred.next(function() { ret.call() });
    ret.canceller = function() {
        for (var i in dl) if (dl.hasOwnProperty(i)) {
          dl[i].cancel();
        }
    };
    return ret;
  };
  Deferred.earlier = function(dl) {
    if (arguments.length > 1) {
      dl = Array.prototype.slice.call(arguments);
    }
    var ret = new Deferred(), values = {}, num = 0;
    for (var i in dl) if (dl.hasOwnProperty(i)) (function(d, i) {
      d.next(function(v) {
        values[i] = v;
        if (dl instanceof Array) {
          values.length = dl.length;
          values = Array.prototype.slice.call(values, 0);
        }
        ret.canceller();
        ret.call(values);
      }).error(function(e) {
        ret.fail(e);
      });
      num++;
    })(dl[i], i);
    if (!num) Deferred.next(function() { ret.call() });
    ret.canceller = function() {
      for (var i in dl) if (dl.hasOwnProperty(i)) {
        dl[i].cancel();
      }
    };
    return ret;
  };
  Deferred.loop = function(n, fun) {
    var o = {
      begin: n.begin || 0,
      end: (typeof n.end == "number") ? n.end : n - 1,
      step: n.step  || 1,
      last: false,
      prev: null
    };
    var ret, step = o.step;
    return Deferred.next(function() {
      function _loop(i) {
        if (i <= o.end) {
          if ((i + step) > o.end) {
            o.last = true;
            o.step = o.end - i + 1;
          }
          o.prev = ret;
          ret = fun.call(this, i, o);
          if (Deferred.isDeferred(ret)) {
            return ret.next(function (r) {
              ret = r;
              return Deferred.call(_loop, i + step);
            });
          } else {
            return Deferred.call(_loop, i + step);
          }
        } else {
          return ret;
        }
      }
      return (o.begin <= o.end) ? Deferred.call(_loop, o.begin) : null;
    });
  };
  Deferred.repeat = function(n, fun) {
    var i = 0, end = {}, ret = null;
    return Deferred.next(function() {
      var t = (new Date()).getTime();
      divide: {
        do {
          if (i >= n) break divide;
          ret = fun(i++);
        } while ((new Date()).getTime() - t < 20);
        return Deferred.call(arguments.callee);
      }
      return null;
    });
  };
  Deferred.register = function(name, fun) {
    this.prototype[name] = function() {
      var a = arguments;
      return this.next(function() {
        return fun.apply(this, a);
      });
    };
  };
  Deferred.register("loop", Deferred.loop);
  Deferred.register("wait", Deferred.wait);
  Deferred.connect = function(funo, options) {
    var target, func, obj;
    if (typeof arguments[1] == "string") {
      target = arguments[0];
      func = target[arguments[1]];
      obj = arguments[2] || {};
    } else {
      func = arguments[0];
      obj = arguments[1] || {};
      target = obj.target;
    }
    var partialArgs = obj.args ? Array.prototype.slice.call(obj.args, 0) : [];
    var callbackArgIndex = isFinite(obj.ok) ? obj.ok : 
                                   obj.args ? obj.args.length : undefined;
    var errorbackArgIndex = obj.ng;
    return function() {
      var d = new Deferred().next(function(args) {
        var next = this._next.callback.ok;
        this._next.callback.ok = function() {
          return next.apply(this, args.args);
        };
      });
      var args = partialArgs.concat(Array.prototype.slice.call(arguments, 0));
      if (!(isFinite(callbackArgIndex) && callbackArgIndex !== null)) {
        callbackArgIndex = args.length;
      }
      var callback = function() {
        d.call(new Deferred.Arguments(arguments))
      };
      args.splice(callbackArgIndex, 0, callback);
      if (isFinite(errorbackArgIndex) && errorbackArgIndex !== null) {
        var errorback = function() { d.fail(arguments) };
        args.splice(errorbackArgIndex, 0, errorback);
      }
      Deferred.next(function() { func.apply(target, args) });
      return d;
    }
  };
  Deferred.Arguments = function(args) {
    this.args = Array.prototype.slice.call(args, 0);
  };
  Deferred.retry = function (retryCount, funcDeferred, options) {
    if (!options) options = {};
    var wait = options.wait || 0;
    var d = new Deferred();
    var retry = function() {
      var m = funcDeferred(retryCount);
      m.next(function (mes) {
          d.call(mes);
        }).
        error(function(e) {
          if (--retryCount <= 0) {
            d.fail(['retry failed', e]);
          } else {
            setTimeout(retry, wait * 1000);
          }
        });
    };
    setTimeout(retry, 0);
    return d;
  };
  Deferred.methods = [
    "parallel", "wait", "next", "call", "loop", "repeat", "chain"
  ];
  Deferred.define = function (obj, list) {
    if (!list) list = Deferred.methods;
    if (!obj)  obj  = (function getGlobal() { return this })();
    for (var i = 0; i < list.length; i++) {
      var n = list[i];
      obj[n] = Deferred[n];
    }
    return Deferred;
  };
  this.Deferred = Deferred;
  function http(opts) {
    var d = Deferred();
    var req = new XMLHttpRequest();
    req.open(opts.method, opts.url, true);
    if (opts.headers) {
      for (var k in opts.headers) if (opts.headers.hasOwnProperty(k)) {
        req.setRequestHeader(k, opts.headers[k]);
      }
    }
    req.onreadystatechange = function() {
      if (req.readyState == 4) d.call(req);
    };
    req.send(opts.data || null);
    d.xhr = req;
    return d;
  }
  http.get = function(url) {
    return http({method: "get",  url: url});
  };
  http.post = function(url, data) {
    return http({
      method: "post",
      url: url, 
      data: data, 
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
  };
  http.jsonp = function(url, params) {
    if (!params) params = {};
    var Global = (function() { return this })();
    var d = Deferred();
    var cbname = params["callback"];
    if (!cbname) do {
      cbname = "callback" + String(Math.random()).slice(2);
    } while (typeof(Global[cbname]) != "undefined");
    params["callback"] = cbname;
    url += (url.indexOf("?") == -1) ? "?" : "&";
    for (var name in params) if (params.hasOwnProperty(name)) {
      url = url + encodeURIComponent(name) + "=" + 
                  encodeURIComponent(params[name]) + "&";
    }
    var script = document.createElement('script');
    script.type = "text/javascript";
    script.charset = "utf-8";
    script.src = url;
    document.body.appendChild(script);
    Global[cbname] = function callback(data) {
      delete Global[cbname];
      document.body.removeChild(script);
      d.call(data);
    };
    return d;
  };
  function xhttp(opts) {
    var d = Deferred();
    if (opts.onload)  d = d.next(opts.onload);
    if (opts.onerror) d = d.error(opts.onerror);
    opts.onload = function(res) {
      d.call(res);
    };
    opts.onerror = function(res) {
      d.fail(res);
    };
    setTimeout(function() {
      GM_xmlhttpRequest(opts);
    }, 0);
    return d;
  }
  xhttp.get = function(url) {
    return xhttp({method: "get", url: url});
  };
  xhttp.post = function(url, data) {
    return xhttp({
      method: "post",
      url: url,
      data: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
  };
  Deferred.Deferred = Deferred;
  Deferred.http = http;
  Deferred.xhttp = (typeof(GM_xmlhttpRequest) == 'undefined') ? http : xhttp;
  return Deferred;
}
//-----------------------------------------------------------------------------
// End of JSDeferred
//-----------------------------------------------------------------------------
/*!
 * jQuery JavaScript Library v1.5.2
 * http://jquery.com/
 *
 * Copyright 2011, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2011, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Thu Mar 31 15:28:23 2011 -0400
 */
/*
 * Localized.
 */
function getjQuery() {
return (function( window, undefined ) {

// Use the correct document accordingly with window argument (sandbox)
var document = window.document;
var jQuery = (function() {

// Define a local copy of jQuery
var jQuery = function( selector, context ) {
    // The jQuery object is actually just the init constructor 'enhanced'
    return new jQuery.fn.init( selector, context, rootjQuery );
  },

  // Map over jQuery in case of overwrite
  _jQuery = window.jQuery,

  // Map over the $ in case of overwrite
  _$ = window.$,

  // A central reference to the root jQuery(document)
  rootjQuery,

  // A simple way to check for HTML strings or ID strings
  // (both of which we optimize for)
  quickExpr = /^(?:[^<]*(<[\w\W]+>)[^>]*$|#([\w\-]+)$)/,

  // Check if a string has a non-whitespace character in it
  rnotwhite = /\S/,

  // Used for trimming whitespace
  trimLeft = /^\s+/,
  trimRight = /\s+$/,

  // Check for digits
  rdigit = /\d/,

  // Match a standalone tag
  rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,

  // JSON RegExp
  rvalidchars = /^[\],:{}\s]*$/,
  rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
  rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
  rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,

  // Useragent RegExp
  rwebkit = /(webkit)[ \/]([\w.]+)/,
  ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/,
  rmsie = /(msie) ([\w.]+)/,
  rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/,

  // Keep a UserAgent string for use with jQuery.browser
  userAgent = navigator.userAgent,

  // For matching the engine and version of the browser
  browserMatch,

  // The deferred used on DOM ready
  readyList,

  // The ready event handler
  DOMContentLoaded,

  // Save a reference to some core methods
  toString = Object.prototype.toString,
  hasOwn = Object.prototype.hasOwnProperty,
  push = Array.prototype.push,
  slice = Array.prototype.slice,
  trim = String.prototype.trim,
  indexOf = Array.prototype.indexOf,

  // [[Class]] -> type pairs
  class2type = {};

jQuery.fn = jQuery.prototype = {
  constructor: jQuery,
  init: function( selector, context, rootjQuery ) {
    var match, elem, ret, doc;

    // Handle $(""), $(null), or $(undefined)
    if ( !selector ) {
      return this;
    }

    // Handle $(DOMElement)
    if ( selector.nodeType ) {
      this.context = this[0] = selector;
      this.length = 1;
      return this;
    }

    // The body element only exists once, optimize finding it
    if ( selector === "body" && !context && document.body ) {
      this.context = document;
      this[0] = document.body;
      this.selector = "body";
      this.length = 1;
      return this;
    }

    // Handle HTML strings
    if ( typeof selector === "string" ) {
      // Are we dealing with HTML string or an ID?
      match = quickExpr.exec( selector );

      // Verify a match, and that no context was specified for #id
      if ( match && (match[1] || !context) ) {

        // HANDLE: $(html) -> $(array)
        if ( match[1] ) {
          context = context instanceof jQuery ? context[0] : context;
          doc = (context ? context.ownerDocument || context : document);

          // If a single string is passed in and it's a single tag
          // just do a createElement and skip the rest
          ret = rsingleTag.exec( selector );

          if ( ret ) {
            if ( jQuery.isPlainObject( context ) ) {
              selector = [ document.createElement( ret[1] ) ];
              jQuery.fn.attr.call( selector, context, true );

            } else {
              selector = [ doc.createElement( ret[1] ) ];
            }

          } else {
            ret = jQuery.buildFragment( [ match[1] ], [ doc ] );
            selector = (ret.cacheable ? jQuery.clone(ret.fragment) : ret.fragment).childNodes;
          }

          return jQuery.merge( this, selector );

        // HANDLE: $("#id")
        } else {
          elem = document.getElementById( match[2] );

          // Check parentNode to catch when Blackberry 4.6 returns
          // nodes that are no longer in the document #6963
          if ( elem && elem.parentNode ) {
            // Handle the case where IE and Opera return items
            // by name instead of ID
            if ( elem.id !== match[2] ) {
              return rootjQuery.find( selector );
            }

            // Otherwise, we inject the element directly into the jQuery object
            this.length = 1;
            this[0] = elem;
          }

          this.context = document;
          this.selector = selector;
          return this;
        }

      // HANDLE: $(expr, $(...))
      } else if ( !context || context.jquery ) {
        return (context || rootjQuery).find( selector );

      // HANDLE: $(expr, context)
      // (which is just equivalent to: $(context).find(expr)
      } else {
        return this.constructor( context ).find( selector );
      }

    // HANDLE: $(function)
    // Shortcut for document ready
    } else if ( jQuery.isFunction( selector ) ) {
      return rootjQuery.ready( selector );
    }

    if (selector.selector !== undefined) {
      this.selector = selector.selector;
      this.context = selector.context;
    }

    return jQuery.makeArray( selector, this );
  },

  // Start with an empty selector
  selector: "",

  // The current version of jQuery being used
  jquery: "1.5.2",

  // The default length of a jQuery object is 0
  length: 0,

  // The number of elements contained in the matched element set
  size: function() {
    return this.length;
  },

  toArray: function() {
    return slice.call( this, 0 );
  },

  // Get the Nth element in the matched element set OR
  // Get the whole matched element set as a clean array
  get: function( num ) {
    return num == null ?

      // Return a 'clean' array
      this.toArray() :

      // Return just the object
      ( num < 0 ? this[ this.length + num ] : this[ num ] );
  },

  // Take an array of elements and push it onto the stack
  // (returning the new matched element set)
  pushStack: function( elems, name, selector ) {
    // Build a new jQuery matched element set
    var ret = this.constructor();

    if ( jQuery.isArray( elems ) ) {
      push.apply( ret, elems );

    } else {
      jQuery.merge( ret, elems );
    }

    // Add the old object onto the stack (as a reference)
    ret.prevObject = this;

    ret.context = this.context;

    if ( name === "find" ) {
      ret.selector = this.selector + (this.selector ? " " : "") + selector;
    } else if ( name ) {
      ret.selector = this.selector + "." + name + "(" + selector + ")";
    }

    // Return the newly-formed element set
    return ret;
  },

  // Execute a callback for every element in the matched set.
  // (You can seed the arguments with an array of args, but this is
  // only used internally.)
  each: function( callback, args ) {
    return jQuery.each( this, callback, args );
  },

  ready: function( fn ) {
    // Attach the listeners
    jQuery.bindReady();

    // Add the callback
    readyList.done( fn );

    return this;
  },

  eq: function( i ) {
    return i === -1 ?
      this.slice( i ) :
      this.slice( i, +i + 1 );
  },

  first: function() {
    return this.eq( 0 );
  },

  last: function() {
    return this.eq( -1 );
  },

  slice: function() {
    return this.pushStack( slice.apply( this, arguments ),
      "slice", slice.call(arguments).join(",") );
  },

  map: function( callback ) {
    return this.pushStack( jQuery.map(this, function( elem, i ) {
      return callback.call( elem, i, elem );
    }));
  },

  end: function() {
    return this.prevObject || this.constructor(null);
  },

  // For internal use only.
  // Behaves like an Array's method, not like a jQuery method.
  push: push,
  sort: [].sort,
  splice: [].splice
};

// Give the init function the jQuery prototype for later instantiation
jQuery.fn.init.prototype = jQuery.fn;

jQuery.extend = jQuery.fn.extend = function() {
  var options, name, src, copy, copyIsArray, clone,
    target = arguments[0] || {},
    i = 1,
    length = arguments.length,
    deep = false;

  // Handle a deep copy situation
  if ( typeof target === "boolean" ) {
    deep = target;
    target = arguments[1] || {};
    // skip the boolean and the target
    i = 2;
  }

  // Handle case when target is a string or something (possible in deep copy)
  if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
    target = {};
  }

  // extend jQuery itself if only one argument is passed
  if ( length === i ) {
    target = this;
    --i;
  }

  for ( ; i < length; i++ ) {
    // Only deal with non-null/undefined values
    if ( (options = arguments[ i ]) != null ) {
      // Extend the base object
      for ( name in options ) {
        src = target[ name ];
        copy = options[ name ];

        // Prevent never-ending loop
        if ( target === copy ) {
          continue;
        }

        // Recurse if we're merging plain objects or arrays
        if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
          if ( copyIsArray ) {
            copyIsArray = false;
            clone = src && jQuery.isArray(src) ? src : [];

          } else {
            clone = src && jQuery.isPlainObject(src) ? src : {};
          }

          // Never move original objects, clone them
          target[ name ] = jQuery.extend( deep, clone, copy );

        // Don't bring in undefined values
        } else if ( copy !== undefined ) {
          target[ name ] = copy;
        }
      }
    }
  }

  // Return the modified object
  return target;
};

jQuery.extend({
  noConflict: function( deep ) {
    window.$ = _$;

    if ( deep ) {
      window.jQuery = _jQuery;
    }

    return jQuery;
  },

  // Is the DOM ready to be used? Set to true once it occurs.
  isReady: false,

  // A counter to track how many items to wait for before
  // the ready event fires. See #6781
  readyWait: 1,

  // Handle when the DOM is ready
  ready: function( wait ) {
    // A third-party is pushing the ready event forwards
    if ( wait === true ) {
      jQuery.readyWait--;
    }

    // Make sure that the DOM is not already loaded
    if ( !jQuery.readyWait || (wait !== true && !jQuery.isReady) ) {
      // Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
      if ( !document.body ) {
        return setTimeout( jQuery.ready, 1 );
      }

      // Remember that the DOM is ready
      jQuery.isReady = true;

      // If a normal DOM Ready event fired, decrement, and wait if need be
      if ( wait !== true && --jQuery.readyWait > 0 ) {
        return;
      }

      // If there are functions bound, to execute
      readyList.resolveWith( document, [ jQuery ] );

      // Trigger any bound ready events
      if ( jQuery.fn.trigger ) {
        jQuery( document ).trigger( "ready" ).unbind( "ready" );
      }
    }
  },

  bindReady: function() {
    if ( readyList ) {
      return;
    }

    readyList = jQuery._Deferred();

    // Catch cases where $(document).ready() is called after the
    // browser event has already occurred.
    if ( document.readyState === "complete" ) {
      // Handle it asynchronously to allow scripts the opportunity to delay ready
      return setTimeout( jQuery.ready, 1 );
    }

    // Mozilla, Opera and webkit nightlies currently support this event
    if ( document.addEventListener ) {
      // Use the handy event callback
      document.addEventListener( "DOMContentLoaded", DOMContentLoaded, false );

      // A fallback to window.onload, that will always work
      window.addEventListener( "load", jQuery.ready, false );

    // If IE event model is used
    } else if ( document.attachEvent ) {
      // ensure firing before onload,
      // maybe late but safe also for iframes
      document.attachEvent("onreadystatechange", DOMContentLoaded);

      // A fallback to window.onload, that will always work
      window.attachEvent( "onload", jQuery.ready );

      // If IE and not a frame
      // continually check to see if the document is ready
      var toplevel = false;

      try {
        toplevel = window.frameElement == null;
      } catch(e) {}

      if ( document.documentElement.doScroll && toplevel ) {
        doScrollCheck();
      }
    }
  },

  // See test/unit/core.js for details concerning isFunction.
  // Since version 1.3, DOM methods and functions like alert
  // aren't supported. They return false on IE (#2968).
  isFunction: function( obj ) {
    return jQuery.type(obj) === "function";
  },

  isArray: Array.isArray || function( obj ) {
    return jQuery.type(obj) === "array";
  },

  // A crude way of determining if an object is a window
  isWindow: function( obj ) {
    return obj && typeof obj === "object" && "setInterval" in obj;
  },

  isNaN: function( obj ) {
    return obj == null || !rdigit.test( obj ) || isNaN( obj );
  },

  type: function( obj ) {
    return obj == null ?
      String( obj ) :
      class2type[ toString.call(obj) ] || "object";
  },

  isPlainObject: function( obj ) {
    // Must be an Object.
    // Because of IE, we also have to check the presence of the constructor property.
    // Make sure that DOM nodes and window objects don't pass through, as well
    if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
      return false;
    }

    // Not own constructor property must be Object
    if ( obj.constructor &&
      !hasOwn.call(obj, "constructor") &&
      !hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
      return false;
    }

    // Own properties are enumerated firstly, so to speed up,
    // if last one is own, then all properties are own.

    var key;
    for ( key in obj ) {}

    return key === undefined || hasOwn.call( obj, key );
  },

  isEmptyObject: function( obj ) {
    for ( var name in obj ) {
      return false;
    }
    return true;
  },

  error: function( msg ) {
    throw msg;
  },

  parseJSON: function( data ) {
    if ( typeof data !== "string" || !data ) {
      return null;
    }

    // Make sure leading/trailing whitespace is removed (IE can't handle it)
    data = jQuery.trim( data );

    // Make sure the incoming data is actual JSON
    // Logic borrowed from http://json.org/json2.js
    if ( rvalidchars.test(data.replace(rvalidescape, "@")
      .replace(rvalidtokens, "]")
      .replace(rvalidbraces, "")) ) {

      // Try to use the native JSON parser first
      return window.JSON && window.JSON.parse ?
        window.JSON.parse( data ) :
        (new Function("return " + data))();

    } else {
      jQuery.error( "Invalid JSON: " + data );
    }
  },

  // Cross-browser xml parsing
  // (xml & tmp used internally)
  parseXML: function( data , xml , tmp ) {

    if ( window.DOMParser ) { // Standard
      tmp = new DOMParser();
      xml = tmp.parseFromString( data , "text/xml" );
    } else { // IE
      xml = new ActiveXObject( "Microsoft.XMLDOM" );
      xml.async = "false";
      xml.loadXML( data );
    }

    tmp = xml.documentElement;

    if ( ! tmp || ! tmp.nodeName || tmp.nodeName === "parsererror" ) {
      jQuery.error( "Invalid XML: " + data );
    }

    return xml;
  },

  noop: function() {},

  // Evalulates a script in a global context
  globalEval: function( data ) {
    if ( data && rnotwhite.test(data) ) {
      // Inspired by code by Andrea Giammarchi
      // http://webreflection.blogspot.com/2007/08/global-scope-evaluation-and-dom.html
      var head = document.head || document.getElementsByTagName( "head" )[0] || document.documentElement,
        script = document.createElement( "script" );

      if ( jQuery.support.scriptEval() ) {
        script.appendChild( document.createTextNode( data ) );
      } else {
        script.text = data;
      }

      // Use insertBefore instead of appendChild to circumvent an IE6 bug.
      // This arises when a base node is used (#2709).
      head.insertBefore( script, head.firstChild );
      head.removeChild( script );
    }
  },

  nodeName: function( elem, name ) {
    return elem.nodeName && elem.nodeName.toUpperCase() === name.toUpperCase();
  },

  // args is for internal usage only
  each: function( object, callback, args ) {
    var name, i = 0,
      length = object.length,
      isObj = length === undefined || jQuery.isFunction(object);

    if ( args ) {
      if ( isObj ) {
        for ( name in object ) {
          if ( callback.apply( object[ name ], args ) === false ) {
            break;
          }
        }
      } else {
        for ( ; i < length; ) {
          if ( callback.apply( object[ i++ ], args ) === false ) {
            break;
          }
        }
      }

    // A special, fast, case for the most common use of each
    } else {
      if ( isObj ) {
        for ( name in object ) {
          if ( callback.call( object[ name ], name, object[ name ] ) === false ) {
            break;
          }
        }
      } else {
        for ( var value = object[0];
          i < length && callback.call( value, i, value ) !== false; value = object[++i] ) {}
      }
    }

    return object;
  },

  // Use native String.trim function wherever possible
  trim: trim ?
    function( text ) {
      return text == null ?
        "" :
        trim.call( text );
    } :

    // Otherwise use our own trimming functionality
    function( text ) {
      return text == null ?
        "" :
        text.toString().replace( trimLeft, "" ).replace( trimRight, "" );
    },

  // results is for internal usage only
  makeArray: function( array, results ) {
    var ret = results || [];

    if ( array != null ) {
      // The window, strings (and functions) also have 'length'
      // The extra typeof function check is to prevent crashes
      // in Safari 2 (See: #3039)
      // Tweaked logic slightly to handle Blackberry 4.7 RegExp issues #6930
      var type = jQuery.type(array);

      if ( array.length == null || type === "string" || type === "function" || type === "regexp" || jQuery.isWindow( array ) ) {
        push.call( ret, array );
      } else {
        jQuery.merge( ret, array );
      }
    }

    return ret;
  },

  inArray: function( elem, array ) {
    if ( array.indexOf ) {
      return array.indexOf( elem );
    }

    for ( var i = 0, length = array.length; i < length; i++ ) {
      if ( array[ i ] === elem ) {
        return i;
      }
    }

    return -1;
  },

  merge: function( first, second ) {
    var i = first.length,
      j = 0;

    if ( typeof second.length === "number" ) {
      for ( var l = second.length; j < l; j++ ) {
        first[ i++ ] = second[ j ];
      }

    } else {
      while ( second[j] !== undefined ) {
        first[ i++ ] = second[ j++ ];
      }
    }

    first.length = i;

    return first;
  },

  grep: function( elems, callback, inv ) {
    var ret = [], retVal;
    inv = !!inv;

    // Go through the array, only saving the items
    // that pass the validator function
    for ( var i = 0, length = elems.length; i < length; i++ ) {
      retVal = !!callback( elems[ i ], i );
      if ( inv !== retVal ) {
        ret.push( elems[ i ] );
      }
    }

    return ret;
  },

  // arg is for internal usage only
  map: function( elems, callback, arg ) {
    var ret = [], value;

    // Go through the array, translating each of the items to their
    // new value (or values).
    for ( var i = 0, length = elems.length; i < length; i++ ) {
      value = callback( elems[ i ], i, arg );

      if ( value != null ) {
        ret[ ret.length ] = value;
      }
    }

    // Flatten any nested arrays
    return ret.concat.apply( [], ret );
  },

  // A global GUID counter for objects
  guid: 1,

  proxy: function( fn, proxy, thisObject ) {
    if ( arguments.length === 2 ) {
      if ( typeof proxy === "string" ) {
        thisObject = fn;
        fn = thisObject[ proxy ];
        proxy = undefined;

      } else if ( proxy && !jQuery.isFunction( proxy ) ) {
        thisObject = proxy;
        proxy = undefined;
      }
    }

    if ( !proxy && fn ) {
      proxy = function() {
        return fn.apply( thisObject || this, arguments );
      };
    }

    // Set the guid of unique handler to the same of original handler, so it can be removed
    if ( fn ) {
      proxy.guid = fn.guid = fn.guid || proxy.guid || jQuery.guid++;
    }

    // So proxy can be declared as an argument
    return proxy;
  },

  // Mutifunctional method to get and set values to a collection
  // The value/s can be optionally by executed if its a function
  access: function( elems, key, value, exec, fn, pass ) {
    var length = elems.length;

    // Setting many attributes
    if ( typeof key === "object" ) {
      for ( var k in key ) {
        jQuery.access( elems, k, key[k], exec, fn, value );
      }
      return elems;
    }

    // Setting one attribute
    if ( value !== undefined ) {
      // Optionally, function values get executed if exec is true
      exec = !pass && exec && jQuery.isFunction(value);

      for ( var i = 0; i < length; i++ ) {
        fn( elems[i], key, exec ? value.call( elems[i], i, fn( elems[i], key ) ) : value, pass );
      }

      return elems;
    }

    // Getting an attribute
    return length ? fn( elems[0], key ) : undefined;
  },

  now: function() {
    return (new Date()).getTime();
  },

  // Use of jQuery.browser is frowned upon.
  // More details: http://docs.jquery.com/Utilities/jQuery.browser
  uaMatch: function( ua ) {
    ua = ua.toLowerCase();

    var match = rwebkit.exec( ua ) ||
      ropera.exec( ua ) ||
      rmsie.exec( ua ) ||
      ua.indexOf("compatible") < 0 && rmozilla.exec( ua ) ||
      [];

    return { browser: match[1] || "", version: match[2] || "0" };
  },

  sub: function() {
    function jQuerySubclass( selector, context ) {
      return new jQuerySubclass.fn.init( selector, context );
    }
    jQuery.extend( true, jQuerySubclass, this );
    jQuerySubclass.superclass = this;
    jQuerySubclass.fn = jQuerySubclass.prototype = this();
    jQuerySubclass.fn.constructor = jQuerySubclass;
    jQuerySubclass.subclass = this.subclass;
    jQuerySubclass.fn.init = function init( selector, context ) {
      if ( context && context instanceof jQuery && !(context instanceof jQuerySubclass) ) {
        context = jQuerySubclass(context);
      }

      return jQuery.fn.init.call( this, selector, context, rootjQuerySubclass );
    };
    jQuerySubclass.fn.init.prototype = jQuerySubclass.fn;
    var rootjQuerySubclass = jQuerySubclass(document);
    return jQuerySubclass;
  },

  browser: {}
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(i, name) {
  class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

browserMatch = jQuery.uaMatch( userAgent );
if ( browserMatch.browser ) {
  jQuery.browser[ browserMatch.browser ] = true;
  jQuery.browser.version = browserMatch.version;
}

// Deprecated, use jQuery.browser.webkit instead
if ( jQuery.browser.webkit ) {
  jQuery.browser.safari = true;
}

if ( indexOf ) {
  jQuery.inArray = function( elem, array ) {
    return indexOf.call( array, elem );
  };
}

// IE doesn't match non-breaking spaces with \s
if ( rnotwhite.test( "\xA0" ) ) {
  trimLeft = /^[\s\xA0]+/;
  trimRight = /[\s\xA0]+$/;
}

// All jQuery objects should point back to these
rootjQuery = jQuery(document);

// Cleanup functions for the document ready method
if ( document.addEventListener ) {
  DOMContentLoaded = function() {
    document.removeEventListener( "DOMContentLoaded", DOMContentLoaded, false );
    jQuery.ready();
  };

} else if ( document.attachEvent ) {
  DOMContentLoaded = function() {
    // Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
    if ( document.readyState === "complete" ) {
      document.detachEvent( "onreadystatechange", DOMContentLoaded );
      jQuery.ready();
    }
  };
}

// The DOM ready check for Internet Explorer
function doScrollCheck() {
  if ( jQuery.isReady ) {
    return;
  }

  try {
    // If IE is used, use the trick by Diego Perini
    // http://javascript.nwbox.com/IEContentLoaded/
    document.documentElement.doScroll("left");
  } catch(e) {
    setTimeout( doScrollCheck, 1 );
    return;
  }

  // and execute any waiting functions
  jQuery.ready();
}

// Expose jQuery to the global object
return jQuery;

})();


var // Promise methods
  promiseMethods = "then done fail isResolved isRejected promise".split( " " ),
  // Static reference to slice
  sliceDeferred = [].slice;

jQuery.extend({
  // Create a simple deferred (one callbacks list)
  _Deferred: function() {
    var // callbacks list
      callbacks = [],
      // stored [ context , args ]
      fired,
      // to avoid firing when already doing so
      firing,
      // flag to know if the deferred has been cancelled
      cancelled,
      // the deferred itself
      deferred  = {

        // done( f1, f2, ...)
        done: function() {
          if ( !cancelled ) {
            var args = arguments,
              i,
              length,
              elem,
              type,
              _fired;
            if ( fired ) {
              _fired = fired;
              fired = 0;
            }
            for ( i = 0, length = args.length; i < length; i++ ) {
              elem = args[ i ];
              type = jQuery.type( elem );
              if ( type === "array" ) {
                deferred.done.apply( deferred, elem );
              } else if ( type === "function" ) {
                callbacks.push( elem );
              }
            }
            if ( _fired ) {
              deferred.resolveWith( _fired[ 0 ], _fired[ 1 ] );
            }
          }
          return this;
        },

        // resolve with given context and args
        resolveWith: function( context, args ) {
          if ( !cancelled && !fired && !firing ) {
            // make sure args are available (#8421)
            args = args || [];
            firing = 1;
            try {
              while( callbacks[ 0 ] ) {
                callbacks.shift().apply( context, args );
              }
            }
            finally {
              fired = [ context, args ];
              firing = 0;
            }
          }
          return this;
        },

        // resolve with this as context and given arguments
        resolve: function() {
          deferred.resolveWith( this, arguments );
          return this;
        },

        // Has this deferred been resolved?
        isResolved: function() {
          return !!( firing || fired );
        },

        // Cancel
        cancel: function() {
          cancelled = 1;
          callbacks = [];
          return this;
        }
      };

    return deferred;
  },

  // Full fledged deferred (two callbacks list)
  Deferred: function( func ) {
    var deferred = jQuery._Deferred(),
      failDeferred = jQuery._Deferred(),
      promise;
    // Add errorDeferred methods, then and promise
    jQuery.extend( deferred, {
      then: function( doneCallbacks, failCallbacks ) {
        deferred.done( doneCallbacks ).fail( failCallbacks );
        return this;
      },
      fail: failDeferred.done,
      rejectWith: failDeferred.resolveWith,
      reject: failDeferred.resolve,
      isRejected: failDeferred.isResolved,
      // Get a promise for this deferred
      // If obj is provided, the promise aspect is added to the object
      promise: function( obj ) {
        if ( obj == null ) {
          if ( promise ) {
            return promise;
          }
          promise = obj = {};
        }
        var i = promiseMethods.length;
        while( i-- ) {
          obj[ promiseMethods[i] ] = deferred[ promiseMethods[i] ];
        }
        return obj;
      }
    } );
    // Make sure only one callback list will be used
    deferred.done( failDeferred.cancel ).fail( deferred.cancel );
    // Unexpose cancel
    delete deferred.cancel;
    // Call given func if any
    if ( func ) {
      func.call( deferred, deferred );
    }
    return deferred;
  },

  // Deferred helper
  when: function( firstParam ) {
    var args = arguments,
      i = 0,
      length = args.length,
      count = length,
      deferred = length <= 1 && firstParam && jQuery.isFunction( firstParam.promise ) ?
        firstParam :
        jQuery.Deferred();
    function resolveFunc( i ) {
      return function( value ) {
        args[ i ] = arguments.length > 1 ? sliceDeferred.call( arguments, 0 ) : value;
        if ( !( --count ) ) {
          // Strange bug in FF4:
          // Values changed onto the arguments object sometimes end up as undefined values
          // outside the $.when method. Cloning the object into a fresh array solves the issue
          deferred.resolveWith( deferred, sliceDeferred.call( args, 0 ) );
        }
      };
    }
    if ( length > 1 ) {
      for( ; i < length; i++ ) {
        if ( args[ i ] && jQuery.isFunction( args[ i ].promise ) ) {
          args[ i ].promise().then( resolveFunc(i), deferred.reject );
        } else {
          --count;
        }
      }
      if ( !count ) {
        deferred.resolveWith( deferred, args );
      }
    } else if ( deferred !== firstParam ) {
      deferred.resolveWith( deferred, length ? [ firstParam ] : [] );
    }
    return deferred.promise();
  }
});




(function() {

  jQuery.support = {};

  var div = document.createElement("div");

  div.style.display = "none";
  div.innerHTML = "   <link/><table></table><a href='/a' style='color:red;float:left;opacity:.55;'>a</a><input type='checkbox'/>";

  var all = div.getElementsByTagName("*"),
    a = div.getElementsByTagName("a")[0],
    select = document.createElement("select"),
    opt = select.appendChild( document.createElement("option") ),
    input = div.getElementsByTagName("input")[0];

  // Can't get basic test support
  if ( !all || !all.length || !a ) {
    return;
  }

  jQuery.support = {
    // IE strips leading whitespace when .innerHTML is used
    leadingWhitespace: div.firstChild.nodeType === 3,

    // Make sure that tbody elements aren't automatically inserted
    // IE will insert them into empty tables
    tbody: !div.getElementsByTagName("tbody").length,

    // Make sure that link elements get serialized correctly by innerHTML
    // This requires a wrapper element in IE
    htmlSerialize: !!div.getElementsByTagName("link").length,

    // Get the style information from getAttribute
    // (IE uses .cssText insted)
    style: /red/.test( a.getAttribute("style") ),

    // Make sure that URLs aren't manipulated
    // (IE normalizes it by default)
    hrefNormalized: a.getAttribute("href") === "/a",

    // Make sure that element opacity exists
    // (IE uses filter instead)
    // Use a regex to work around a WebKit issue. See #5145
    opacity: /^0.55$/.test( a.style.opacity ),

    // Verify style float existence
    // (IE uses styleFloat instead of cssFloat)
    cssFloat: !!a.style.cssFloat,

    // Make sure that if no value is specified for a checkbox
    // that it defaults to "on".
    // (WebKit defaults to "" instead)
    checkOn: input.value === "on",

    // Make sure that a selected-by-default option has a working selected property.
    // (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
    optSelected: opt.selected,

    // Will be defined later
    deleteExpando: true,
    optDisabled: false,
    checkClone: false,
    noCloneEvent: true,
    noCloneChecked: true,
    boxModel: null,
    inlineBlockNeedsLayout: false,
    shrinkWrapBlocks: false,
    reliableHiddenOffsets: true,
    reliableMarginRight: true
  };

  input.checked = true;
  jQuery.support.noCloneChecked = input.cloneNode( true ).checked;

  // Make sure that the options inside disabled selects aren't marked as disabled
  // (WebKit marks them as diabled)
  select.disabled = true;
  jQuery.support.optDisabled = !opt.disabled;

  var _scriptEval = null;
  jQuery.support.scriptEval = function() {
    if ( _scriptEval === null ) {
      var root = document.documentElement,
        script = document.createElement("script"),
        id = "script" + jQuery.now();

      // Make sure that the execution of code works by injecting a script
      // tag with appendChild/createTextNode
      // (IE doesn't support this, fails, and uses .text instead)
      try {
        script.appendChild( document.createTextNode( "window." + id + "=1;" ) );
      } catch(e) {}

      root.insertBefore( script, root.firstChild );

      if ( window[ id ] ) {
        _scriptEval = true;
        delete window[ id ];
      } else {
        _scriptEval = false;
      }

      root.removeChild( script );
    }

    return _scriptEval;
  };

  // Test to see if it's possible to delete an expando from an element
  // Fails in Internet Explorer
  try {
    delete div.test;

  } catch(e) {
    jQuery.support.deleteExpando = false;
  }

  if ( !div.addEventListener && div.attachEvent && div.fireEvent ) {
    div.attachEvent("onclick", function click() {
      // Cloning a node shouldn't copy over any
      // bound event handlers (IE does this)
      jQuery.support.noCloneEvent = false;
      div.detachEvent("onclick", click);
    });
    div.cloneNode(true).fireEvent("onclick");
  }

  div = document.createElement("div");
  div.innerHTML = "<input type='radio' name='radiotest' checked='checked'/>";

  var fragment = document.createDocumentFragment();
  fragment.appendChild( div.firstChild );

  // WebKit doesn't clone checked state correctly in fragments
  jQuery.support.checkClone = fragment.cloneNode(true).cloneNode(true).lastChild.checked;

  // Figure out if the W3C box model works as expected
  // document.body must exist before we can do this
  jQuery(function() {
    var div = document.createElement("div"),
      body = document.getElementsByTagName("body")[0];

    // Frameset documents with no body should not run this code
    if ( !body ) {
      return;
    }

    div.style.width = div.style.paddingLeft = "1px";
    body.appendChild( div );
    jQuery.boxModel = jQuery.support.boxModel = div.offsetWidth === 2;

    if ( "zoom" in div.style ) {
      // Check if natively block-level elements act like inline-block
      // elements when setting their display to 'inline' and giving
      // them layout
      // (IE < 8 does this)
      div.style.display = "inline";
      div.style.zoom = 1;
      jQuery.support.inlineBlockNeedsLayout = div.offsetWidth === 2;

      // Check if elements with layout shrink-wrap their children
      // (IE 6 does this)
      div.style.display = "";
      div.innerHTML = "<div style='width:4px;'></div>";
      jQuery.support.shrinkWrapBlocks = div.offsetWidth !== 2;
    }

    div.innerHTML = "<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>";
    var tds = div.getElementsByTagName("td");

    // Check if table cells still have offsetWidth/Height when they are set
    // to display:none and there are still other visible table cells in a
    // table row; if so, offsetWidth/Height are not reliable for use when
    // determining if an element has been hidden directly using
    // display:none (it is still safe to use offsets if a parent element is
    // hidden; don safety goggles and see bug #4512 for more information).
    // (only IE 8 fails this test)
    jQuery.support.reliableHiddenOffsets = tds[0].offsetHeight === 0;

    tds[0].style.display = "";
    tds[1].style.display = "none";

    // Check if empty table cells still have offsetWidth/Height
    // (IE < 8 fail this test)
    jQuery.support.reliableHiddenOffsets = jQuery.support.reliableHiddenOffsets && tds[0].offsetHeight === 0;
    div.innerHTML = "";

    // Check if div with explicit width and no margin-right incorrectly
    // gets computed margin-right based on width of container. For more
    // info see bug #3333
    // Fails in WebKit before Feb 2011 nightlies
    // WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
    if ( document.defaultView && document.defaultView.getComputedStyle ) {
      div.style.width = "1px";
      div.style.marginRight = "0";
      jQuery.support.reliableMarginRight = ( parseInt(document.defaultView.getComputedStyle(div, null).marginRight, 10) || 0 ) === 0;
    }

    body.removeChild( div ).style.display = "none";
    div = tds = null;
  });

  // Technique from Juriy Zaytsev
  // http://thinkweb2.com/projects/prototype/detecting-event-support-without-browser-sniffing/
  var eventSupported = function( eventName ) {
    var el = document.createElement("div");
    eventName = "on" + eventName;

    // We only care about the case where non-standard event systems
    // are used, namely in IE. Short-circuiting here helps us to
    // avoid an eval call (in setAttribute) which can cause CSP
    // to go haywire. See: https://developer.mozilla.org/en/Security/CSP
    if ( !el.attachEvent ) {
      return true;
    }

    var isSupported = (eventName in el);
    if ( !isSupported ) {
      el.setAttribute(eventName, "return;");
      isSupported = typeof el[eventName] === "function";
    }
    return isSupported;
  };

  jQuery.support.submitBubbles = eventSupported("submit");
  jQuery.support.changeBubbles = eventSupported("change");

  // release memory in IE
  div = all = a = null;
})();



var rbrace = /^(?:\{.*\}|\[.*\])$/;

jQuery.extend({
  cache: {},

  // Please use with caution
  uuid: 0,

  // Unique for each copy of jQuery on the page
  // Non-digits removed to match rinlinejQuery
  expando: "jQuery" + ( jQuery.fn.jquery + Math.random() ).replace( /\D/g, "" ),

  // The following elements throw uncatchable exceptions if you
  // attempt to add expando properties to them.
  noData: {
    "embed": true,
    // Ban all objects except for Flash (which handle expandos)
    "object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
    "applet": true
  },

  hasData: function( elem ) {
    elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];

    return !!elem && !isEmptyDataObject( elem );
  },

  data: function( elem, name, data, pvt /* Internal Use Only */ ) {
    if ( !jQuery.acceptData( elem ) ) {
      return;
    }

    var internalKey = jQuery.expando, getByName = typeof name === "string", thisCache,

      // We have to handle DOM nodes and JS objects differently because IE6-7
      // can't GC object references properly across the DOM-JS boundary
      isNode = elem.nodeType,

      // Only DOM nodes need the global jQuery cache; JS object data is
      // attached directly to the object so GC can occur automatically
      cache = isNode ? jQuery.cache : elem,

      // Only defining an ID for JS objects if its cache already exists allows
      // the code to shortcut on the same path as a DOM node with no cache
      id = isNode ? elem[ jQuery.expando ] : elem[ jQuery.expando ] && jQuery.expando;

    // Avoid doing any more work than we need to when trying to get data on an
    // object that has no data at all
    try {
      if ( (!id || (pvt && id && !cache[ id ][ internalKey ])) && getByName && data === undefined ) {
        return;
      }
    } catch (e) {
      return;
    }

    if ( !id ) {
      // Only DOM nodes need a new unique ID for each element since their data
      // ends up in the global cache
      if ( isNode ) {
        elem[ jQuery.expando ] = id = ++jQuery.uuid;
      } else {
        id = jQuery.expando;
      }
    }

    try {
      if ( !cache[ id ] ) {
        cache[ id ] = {};
      }
    } catch (e) {
      try {
        cache[ id ] = {};
      } catch (e) {
        return;
      }
    }


    if ( !cache[ id ] ) {
      cache[ id ] = {};

      // TODO: This is a hack for 1.5 ONLY. Avoids exposing jQuery
      // metadata on plain JS objects when the object is serialized using
      // JSON.stringify
      if ( !isNode ) {
        cache[ id ].toJSON = jQuery.noop;
      }
    }

    // An object can be passed to jQuery.data instead of a key/value pair; this gets
    // shallow copied over onto the existing cache
    if ( typeof name === "object" || typeof name === "function" ) {
      if ( pvt ) {
        cache[ id ][ internalKey ] = jQuery.extend(cache[ id ][ internalKey ], name);
      } else {
        cache[ id ] = jQuery.extend(cache[ id ], name);
      }
    }

    thisCache = cache[ id ];

    // Internal jQuery data is stored in a separate object inside the object's data
    // cache in order to avoid key collisions between internal data and user-defined
    // data
    if ( pvt ) {
      if ( !thisCache[ internalKey ] ) {
        thisCache[ internalKey ] = {};
      }

      thisCache = thisCache[ internalKey ];
    }

    if ( data !== undefined ) {
      thisCache[ name ] = data;
    }

    // TODO: This is a hack for 1.5 ONLY. It will be removed in 1.6. Users should
    // not attempt to inspect the internal events object using jQuery.data, as this
    // internal data object is undocumented and subject to change.
    if ( name === "events" && !thisCache[name] ) {
      return thisCache[ internalKey ] && thisCache[ internalKey ].events;
    }

    return getByName ? thisCache[ name ] : thisCache;
  },

  removeData: function( elem, name, pvt /* Internal Use Only */ ) {
    if ( !jQuery.acceptData( elem ) ) {
      return;
    }

    var internalKey = jQuery.expando, isNode = elem.nodeType,

      // See jQuery.data for more information
      cache = isNode ? jQuery.cache : elem,

      // See jQuery.data for more information
      id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

    // If there is already no cache entry for this object, there is no
    // purpose in continuing
    try {
      if ( !cache[ id ] ) {
        return;
      }
    } catch (e) {
      return;
    }

    if ( name ) {
      var thisCache = pvt ? cache[ id ][ internalKey ] : cache[ id ];

      if ( thisCache ) {
        delete thisCache[ name ];

        // If there is no data left in the cache, we want to continue
        // and let the cache object itself get destroyed
        if ( !isEmptyDataObject(thisCache) ) {
          return;
        }
      }
    }

    // See jQuery.data for more information
    if ( pvt ) {
      delete cache[ id ][ internalKey ];

      // Don't destroy the parent cache unless the internal data object
      // had been the only thing left in it
      if ( !isEmptyDataObject(cache[ id ]) ) {
        return;
      }
    }

    var internalCache = cache[ id ][ internalKey ];

    // Browsers that fail expando deletion also refuse to delete expandos on
    // the window, but it will allow it on all other JS objects; other browsers
    // don't care
    if ( jQuery.support.deleteExpando || cache != window ) {
      delete cache[ id ];
    } else {
      cache[ id ] = null;
    }

    // We destroyed the entire user cache at once because it's faster than
    // iterating through each key, but we need to continue to persist internal
    // data if it existed
    if ( internalCache ) {
      cache[ id ] = {};
      // TODO: This is a hack for 1.5 ONLY. Avoids exposing jQuery
      // metadata on plain JS objects when the object is serialized using
      // JSON.stringify
      if ( !isNode ) {
        cache[ id ].toJSON = jQuery.noop;
      }

      cache[ id ][ internalKey ] = internalCache;

    // Otherwise, we need to eliminate the expando on the node to avoid
    // false lookups in the cache for entries that no longer exist
    } else if ( isNode ) {
      // IE does not allow us to delete expando properties from nodes,
      // nor does it have a removeAttribute function on Document nodes;
      // we must handle all of these cases
      if ( jQuery.support.deleteExpando ) {
        delete elem[ jQuery.expando ];
      } else if ( elem.removeAttribute ) {
        elem.removeAttribute( jQuery.expando );
      } else {
        elem[ jQuery.expando ] = null;
      }
    }
  },

  // For internal use only.
  _data: function( elem, name, data ) {
    return jQuery.data( elem, name, data, true );
  },

  // A method for determining if a DOM node can handle the data expando
  acceptData: function( elem ) {
    if ( elem.nodeName ) {
      var match = jQuery.noData[ elem.nodeName.toLowerCase() ];

      if ( match ) {
        return !(match === true || elem.getAttribute("classid") !== match);
      }
    }

    return true;
  }
});

jQuery.fn.extend({
  data: function( key, value ) {
    var data = null;

    if ( typeof key === "undefined" ) {
      if ( this.length ) {
        data = jQuery.data( this[0] );

        if ( this[0].nodeType === 1 ) {
          var attr = this[0].attributes, name;
          for ( var i = 0, l = attr.length; i < l; i++ ) {
            name = attr[i].name;

            if ( name.indexOf( "data-" ) === 0 ) {
              name = name.substr( 5 );
              dataAttr( this[0], name, data[ name ] );
            }
          }
        }
      }

      return data;

    } else if ( typeof key === "object" ) {
      return this.each(function() {
        jQuery.data( this, key );
      });
    }

    var parts = key.split(".");
    parts[1] = parts[1] ? "." + parts[1] : "";

    if ( value === undefined ) {
      data = this.triggerHandler("getData" + parts[1] + "!", [parts[0]]);

      // Try to fetch any internally stored data first
      if ( data === undefined && this.length ) {
        data = jQuery.data( this[0], key );
        data = dataAttr( this[0], key, data );
      }

      return data === undefined && parts[1] ?
        this.data( parts[0] ) :
        data;

    } else {
      return this.each(function() {
        var $this = jQuery( this ),
          args = [ parts[0], value ];

        $this.triggerHandler( "setData" + parts[1] + "!", args );
        jQuery.data( this, key, value );
        $this.triggerHandler( "changeData" + parts[1] + "!", args );
      });
    }
  },

  removeData: function( key ) {
    return this.each(function() {
      jQuery.removeData( this, key );
    });
  }
});

function dataAttr( elem, key, data ) {
  // If nothing was found internally, try to fetch any
  // data from the HTML5 data-* attribute
  if ( data === undefined && elem.nodeType === 1 ) {
    data = elem.getAttribute( "data-" + key );

    if ( typeof data === "string" ) {
      try {
        data = data === "true" ? true :
        data === "false" ? false :
        data === "null" ? null :
        !jQuery.isNaN( data ) ? parseFloat( data ) :
          rbrace.test( data ) ? jQuery.parseJSON( data ) :
          data;
      } catch( e ) {}

      // Make sure we set the data so it isn't changed later
      jQuery.data( elem, key, data );

    } else {
      data = undefined;
    }
  }

  return data;
}

// TODO: This is a hack for 1.5 ONLY to allow objects with a single toJSON
// property to be considered empty objects; this property always exists in
// order to make sure JSON.stringify does not expose internal metadata
function isEmptyDataObject( obj ) {
  for ( var name in obj ) {
    if ( name !== "toJSON" ) {
      return false;
    }
  }

  return true;
}




jQuery.extend({
  queue: function( elem, type, data ) {
    if ( !elem ) {
      return;
    }

    type = (type || "fx") + "queue";
    var q = jQuery._data( elem, type );

    // Speed up dequeue by getting out quickly if this is just a lookup
    if ( !data ) {
      return q || [];
    }

    if ( !q || jQuery.isArray(data) ) {
      q = jQuery._data( elem, type, jQuery.makeArray(data) );

    } else {
      q.push( data );
    }

    return q;
  },

  dequeue: function( elem, type ) {
    type = type || "fx";

    var queue = jQuery.queue( elem, type ),
      fn = queue.shift();

    // If the fx queue is dequeued, always remove the progress sentinel
    if ( fn === "inprogress" ) {
      fn = queue.shift();
    }

    if ( fn ) {
      // Add a progress sentinel to prevent the fx queue from being
      // automatically dequeued
      if ( type === "fx" ) {
        queue.unshift("inprogress");
      }

      fn.call(elem, function() {
        jQuery.dequeue(elem, type);
      });
    }

    if ( !queue.length ) {
      jQuery.removeData( elem, type + "queue", true );
    }
  }
});

jQuery.fn.extend({
  queue: function( type, data ) {
    if ( typeof type !== "string" ) {
      data = type;
      type = "fx";
    }

    if ( data === undefined ) {
      return jQuery.queue( this[0], type );
    }
    return this.each(function( i ) {
      var queue = jQuery.queue( this, type, data );

      if ( type === "fx" && queue[0] !== "inprogress" ) {
        jQuery.dequeue( this, type );
      }
    });
  },
  dequeue: function( type ) {
    return this.each(function() {
      jQuery.dequeue( this, type );
    });
  },

  // Based off of the plugin by Clint Helfers, with permission.
  // http://blindsignals.com/index.php/2009/07/jquery-delay/
  delay: function( time, type ) {
    time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
    type = type || "fx";

    return this.queue( type, function() {
      var elem = this;
      setTimeout(function() {
        jQuery.dequeue( elem, type );
      }, time );
    });
  },

  clearQueue: function( type ) {
    return this.queue( type || "fx", [] );
  }
});




var rclass = /[\n\t\r]/g,
  rspaces = /\s+/,
  rreturn = /\r/g,
  rspecialurl = /^(?:href|src|style)$/,
  rtype = /^(?:button|input)$/i,
  rfocusable = /^(?:button|input|object|select|textarea)$/i,
  rclickable = /^a(?:rea)?$/i,
  rradiocheck = /^(?:radio|checkbox)$/i;

jQuery.props = {
  "for": "htmlFor",
  "class": "className",
  readonly: "readOnly",
  maxlength: "maxLength",
  cellspacing: "cellSpacing",
  rowspan: "rowSpan",
  colspan: "colSpan",
  tabindex: "tabIndex",
  usemap: "useMap",
  frameborder: "frameBorder"
};

jQuery.fn.extend({
  attr: function( name, value ) {
    return jQuery.access( this, name, value, true, jQuery.attr );
  },

  removeAttr: function( name, fn ) {
    return this.each(function(){
      jQuery.attr( this, name, "" );
      if ( this.nodeType === 1 ) {
        this.removeAttribute( name );
      }
    });
  },

  addClass: function( value ) {
    if ( jQuery.isFunction(value) ) {
      return this.each(function(i) {
        var self = jQuery(this);
        self.addClass( value.call(this, i, self.attr("class")) );
      });
    }

    if ( value && typeof value === "string" ) {
      var classNames = (value || "").split( rspaces );

      for ( var i = 0, l = this.length; i < l; i++ ) {
        var elem = this[i];

        if ( elem.nodeType === 1 ) {
          if ( !elem.className ) {
            elem.className = value;

          } else {
            var className = " " + elem.className + " ",
              setClass = elem.className;

            for ( var c = 0, cl = classNames.length; c < cl; c++ ) {
              if ( className.indexOf( " " + classNames[c] + " " ) < 0 ) {
                setClass += " " + classNames[c];
              }
            }
            elem.className = jQuery.trim( setClass );
          }
        }
      }
    }

    return this;
  },

  removeClass: function( value ) {
    if ( jQuery.isFunction(value) ) {
      return this.each(function(i) {
        var self = jQuery(this);
        self.removeClass( value.call(this, i, self.attr("class")) );
      });
    }

    if ( (value && typeof value === "string") || value === undefined ) {
      var classNames = (value || "").split( rspaces );

      for ( var i = 0, l = this.length; i < l; i++ ) {
        var elem = this[i];

        if ( elem.nodeType === 1 && elem.className ) {
          if ( value ) {
            var className = (" " + elem.className + " ").replace(rclass, " ");
            for ( var c = 0, cl = classNames.length; c < cl; c++ ) {
              className = className.replace(" " + classNames[c] + " ", " ");
            }
            elem.className = jQuery.trim( className );

          } else {
            elem.className = "";
          }
        }
      }
    }

    return this;
  },

  toggleClass: function( value, stateVal ) {
    var type = typeof value,
      isBool = typeof stateVal === "boolean";

    if ( jQuery.isFunction( value ) ) {
      return this.each(function(i) {
        var self = jQuery(this);
        self.toggleClass( value.call(this, i, self.attr("class"), stateVal), stateVal );
      });
    }

    return this.each(function() {
      if ( type === "string" ) {
        // toggle individual class names
        var className,
          i = 0,
          self = jQuery( this ),
          state = stateVal,
          classNames = value.split( rspaces );

        while ( (className = classNames[ i++ ]) ) {
          // check each className given, space seperated list
          state = isBool ? state : !self.hasClass( className );
          self[ state ? "addClass" : "removeClass" ]( className );
        }

      } else if ( type === "undefined" || type === "boolean" ) {
        if ( this.className ) {
          // store className if set
          jQuery._data( this, "__className__", this.className );
        }

        // toggle whole className
        this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
      }
    });
  },

  hasClass: function( selector ) {
    var className = " " + selector + " ";
    for ( var i = 0, l = this.length; i < l; i++ ) {
      if ( (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) > -1 ) {
        return true;
      }
    }

    return false;
  },

  val: function( value ) {
    if ( !arguments.length ) {
      var elem = this[0];

      if ( elem ) {
        if ( jQuery.nodeName( elem, "option" ) ) {
          // attributes.value is undefined in Blackberry 4.7 but
          // uses .value. See #6932
          var val = elem.attributes.value;
          return !val || val.specified ? elem.value : elem.text;
        }

        // We need to handle select boxes special
        if ( jQuery.nodeName( elem, "select" ) ) {
          var index = elem.selectedIndex,
            values = [],
            options = elem.options,
            one = elem.type === "select-one";

          // Nothing was selected
          if ( index < 0 ) {
            return null;
          }

          // Loop through all the selected options
          for ( var i = one ? index : 0, max = one ? index + 1 : options.length; i < max; i++ ) {
            var option = options[ i ];

            // Don't return options that are disabled or in a disabled optgroup
            if ( option.selected && (jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) &&
                (!option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" )) ) {

              // Get the specific value for the option
              value = jQuery(option).val();

              // We don't need an array for one selects
              if ( one ) {
                return value;
              }

              // Multi-Selects return an array
              values.push( value );
            }
          }

          // Fixes Bug #2551 -- select.val() broken in IE after form.reset()
          if ( one && !values.length && options.length ) {
            return jQuery( options[ index ] ).val();
          }

          return values;
        }

        // Handle the case where in Webkit "" is returned instead of "on" if a value isn't specified
        if ( rradiocheck.test( elem.type ) && !jQuery.support.checkOn ) {
          return elem.getAttribute("value") === null ? "on" : elem.value;
        }

        // Everything else, we just grab the value
        return (elem.value || "").replace(rreturn, "");

      }

      return undefined;
    }

    var isFunction = jQuery.isFunction(value);

    return this.each(function(i) {
      var self = jQuery(this), val = value;

      if ( this.nodeType !== 1 ) {
        return;
      }

      if ( isFunction ) {
        val = value.call(this, i, self.val());
      }

      // Treat null/undefined as ""; convert numbers to string
      if ( val == null ) {
        val = "";
      } else if ( typeof val === "number" ) {
        val += "";
      } else if ( jQuery.isArray(val) ) {
        val = jQuery.map(val, function (value) {
          return value == null ? "" : value + "";
        });
      }

      if ( jQuery.isArray(val) && rradiocheck.test( this.type ) ) {
        this.checked = jQuery.inArray( self.val(), val ) >= 0;

      } else if ( jQuery.nodeName( this, "select" ) ) {
        var values = jQuery.makeArray(val);

        jQuery( "option", this ).each(function() {
          this.selected = jQuery.inArray( jQuery(this).val(), values ) >= 0;
        });

        if ( !values.length ) {
          this.selectedIndex = -1;
        }

      } else {
        this.value = val;
      }
    });
  }
});

jQuery.extend({
  attrFn: {
    val: true,
    css: true,
    html: true,
    text: true,
    data: true,
    width: true,
    height: true,
    offset: true
  },

  attr: function( elem, name, value, pass ) {
    // don't get/set attributes on text, comment and attribute nodes
    if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || elem.nodeType === 2 ) {
      return undefined;
    }

    if ( pass && name in jQuery.attrFn ) {
      return jQuery(elem)[name](value);
    }

    var notxml = elem.nodeType !== 1 || !jQuery.isXMLDoc( elem ),
      // Whether we are setting (or getting)
      set = value !== undefined;

    // Try to normalize/fix the name
    name = notxml && jQuery.props[ name ] || name;

    // Only do all the following if this is a node (faster for style)
    if ( elem.nodeType === 1 ) {
      // These attributes require special treatment
      var special = rspecialurl.test( name );

      // Safari mis-reports the default selected property of an option
      // Accessing the parent's selectedIndex property fixes it
      if ( name === "selected" && !jQuery.support.optSelected ) {
        var parent = elem.parentNode;
        if ( parent ) {
          parent.selectedIndex;

          // Make sure that it also works with optgroups, see #5701
          if ( parent.parentNode ) {
            parent.parentNode.selectedIndex;
          }
        }
      }

      // If applicable, access the attribute via the DOM 0 way
      // 'in' checks fail in Blackberry 4.7 #6931
      if ( (name in elem || elem[ name ] !== undefined) && notxml && !special ) {
        if ( set ) {
          // We can't allow the type property to be changed (since it causes problems in IE)
          if ( name === "type" && rtype.test( elem.nodeName ) && elem.parentNode ) {
            jQuery.error( "type property can't be changed" );
          }

          if ( value === null ) {
            if ( elem.nodeType === 1 ) {
              elem.removeAttribute( name );
            }

          } else {
            elem[ name ] = value;
          }
        }

        // browsers index elements by id/name on forms, give priority to attributes.
        if ( jQuery.nodeName( elem, "form" ) && elem.getAttributeNode(name) ) {
          return elem.getAttributeNode( name ).nodeValue;
        }

        // elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
        // http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
        if ( name === "tabIndex" ) {
          var attributeNode = elem.getAttributeNode( "tabIndex" );

          return attributeNode && attributeNode.specified ?
            attributeNode.value :
            rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
              0 :
              undefined;
        }

        return elem[ name ];
      }

      if ( !jQuery.support.style && notxml && name === "style" ) {
        if ( set ) {
          elem.style.cssText = "" + value;
        }

        return elem.style.cssText;
      }

      if ( set ) {
        // convert the value to a string (all browsers do this but IE) see #1070
        elem.setAttribute( name, "" + value );
      }

      // Ensure that missing attributes return undefined
      // Blackberry 4.7 returns "" from getAttribute #6938
      if ( !elem.attributes[ name ] && (elem.hasAttribute && !elem.hasAttribute( name )) ) {
        return undefined;
      }

      var attr = !jQuery.support.hrefNormalized && notxml && special ?
          // Some attributes require a special call on IE
          elem.getAttribute( name, 2 ) :
          elem.getAttribute( name );

      // Non-existent attributes return null, we normalize to undefined
      return attr === null ? undefined : attr;
    }
    // Handle everything which isn't a DOM element node
    if ( set ) {
      elem[ name ] = value;
    }
    return elem[ name ];
  }
});




var rnamespaces = /\.(.*)$/,
  rformElems = /^(?:textarea|input|select)$/i,
  rperiod = /\./g,
  rspace = / /g,
  rescape = /[^\w\s.|`]/g,
  fcleanup = function( nm ) {
    return nm.replace(rescape, "\\$&");
  };

/*
 * A number of helper functions used for managing events.
 * Many of the ideas behind this code originated from
 * Dean Edwards' addEvent library.
 */
jQuery.event = {

  // Bind an event to an element
  // Original by Dean Edwards
  add: function( elem, types, handler, data ) {
    if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
      return;
    }

    // TODO :: Use a try/catch until it's safe to pull this out (likely 1.6)
    // Minor release fix for bug #8018
    try {
      // For whatever reason, IE has trouble passing the window object
      // around, causing it to be cloned in the process
      if ( jQuery.isWindow( elem ) && ( elem !== window && !elem.frameElement ) ) {
        elem = window;
      }
    }
    catch ( e ) {}

    if ( handler === false ) {
      handler = returnFalse;
    } else if ( !handler ) {
      // Fixes bug #7229. Fix recommended by jdalton
      return;
    }

    var handleObjIn, handleObj;

    if ( handler.handler ) {
      handleObjIn = handler;
      handler = handleObjIn.handler;
    }

    // Make sure that the function being executed has a unique ID
    if ( !handler.guid ) {
      handler.guid = jQuery.guid++;
    }

    // Init the element's event structure
    var elemData = jQuery._data( elem );

    // If no elemData is found then we must be trying to bind to one of the
    // banned noData elements
    if ( !elemData ) {
      return;
    }

    var events = elemData.events,
      eventHandle = elemData.handle;

    if ( !events ) {
      elemData.events = events = {};
    }

    if ( !eventHandle ) {
      elemData.handle = eventHandle = function( e ) {
        // Handle the second event of a trigger and when
        // an event is called after a page has unloaded
        return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
          jQuery.event.handle.apply( eventHandle.elem, arguments ) :
          undefined;
      };
    }

    // Add elem as a property of the handle function
    // This is to prevent a memory leak with non-native events in IE.
    eventHandle.elem = elem;

    // Handle multiple events separated by a space
    // jQuery(...).bind("mouseover mouseout", fn);
    types = types.split(" ");

    var type, i = 0, namespaces;

    while ( (type = types[ i++ ]) ) {
      handleObj = handleObjIn ?
        jQuery.extend({}, handleObjIn) :
        { handler: handler, data: data };

      // Namespaced event handlers
      if ( type.indexOf(".") > -1 ) {
        namespaces = type.split(".");
        type = namespaces.shift();
        handleObj.namespace = namespaces.slice(0).sort().join(".");

      } else {
        namespaces = [];
        handleObj.namespace = "";
      }

      handleObj.type = type;
      if ( !handleObj.guid ) {
        handleObj.guid = handler.guid;
      }

      // Get the current list of functions bound to this event
      var handlers = events[ type ],
        special = jQuery.event.special[ type ] || {};

      // Init the event handler queue
      if ( !handlers ) {
        handlers = events[ type ] = [];

        // Check for a special event handler
        // Only use addEventListener/attachEvent if the special
        // events handler returns false
        if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
          // Bind the global event handler to the element
          if ( elem.addEventListener ) {
            elem.addEventListener( type, eventHandle, false );

          } else if ( elem.attachEvent ) {
            elem.attachEvent( "on" + type, eventHandle );
          }
        }
      }

      if ( special.add ) {
        special.add.call( elem, handleObj );

        if ( !handleObj.handler.guid ) {
          handleObj.handler.guid = handler.guid;
        }
      }

      // Add the function to the element's handler list
      handlers.push( handleObj );

      // Keep track of which events have been used, for global triggering
      jQuery.event.global[ type ] = true;
    }

    // Nullify elem to prevent memory leaks in IE
    elem = null;
  },

  global: {},

  // Detach an event or set of events from an element
  remove: function( elem, types, handler, pos ) {
    // don't do events on text and comment nodes
    if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
      return;
    }

    if ( handler === false ) {
      handler = returnFalse;
    }

    var ret, type, fn, j, i = 0, all, namespaces, namespace, special, eventType, handleObj, origType,
      elemData = jQuery.hasData( elem ) && jQuery._data( elem ),
      events = elemData && elemData.events;

    if ( !elemData || !events ) {
      return;
    }

    // types is actually an event object here
    if ( types && types.type ) {
      handler = types.handler;
      types = types.type;
    }

    // Unbind all events for the element
    if ( !types || typeof types === "string" && types.charAt(0) === "." ) {
      types = types || "";

      for ( type in events ) {
        jQuery.event.remove( elem, type + types );
      }

      return;
    }

    // Handle multiple events separated by a space
    // jQuery(...).unbind("mouseover mouseout", fn);
    types = types.split(" ");

    while ( (type = types[ i++ ]) ) {
      origType = type;
      handleObj = null;
      all = type.indexOf(".") < 0;
      namespaces = [];

      if ( !all ) {
        // Namespaced event handlers
        namespaces = type.split(".");
        type = namespaces.shift();

        namespace = new RegExp("(^|\\.)" +
          jQuery.map( namespaces.slice(0).sort(), fcleanup ).join("\\.(?:.*\\.)?") + "(\\.|$)");
      }

      eventType = events[ type ];

      if ( !eventType ) {
        continue;
      }

      if ( !handler ) {
        for ( j = 0; j < eventType.length; j++ ) {
          handleObj = eventType[ j ];

          if ( all || namespace.test( handleObj.namespace ) ) {
            jQuery.event.remove( elem, origType, handleObj.handler, j );
            eventType.splice( j--, 1 );
          }
        }

        continue;
      }

      special = jQuery.event.special[ type ] || {};

      for ( j = pos || 0; j < eventType.length; j++ ) {
        handleObj = eventType[ j ];

        if ( handler.guid === handleObj.guid ) {
          // remove the given handler for the given type
          if ( all || namespace.test( handleObj.namespace ) ) {
            if ( pos == null ) {
              eventType.splice( j--, 1 );
            }

            if ( special.remove ) {
              special.remove.call( elem, handleObj );
            }
          }

          if ( pos != null ) {
            break;
          }
        }
      }

      // remove generic event handler if no more handlers exist
      if ( eventType.length === 0 || pos != null && eventType.length === 1 ) {
        if ( !special.teardown || special.teardown.call( elem, namespaces ) === false ) {
          jQuery.removeEvent( elem, type, elemData.handle );
        }

        ret = null;
        delete events[ type ];
      }
    }

    // Remove the expando if it's no longer used
    if ( jQuery.isEmptyObject( events ) ) {
      var handle = elemData.handle;
      if ( handle ) {
        handle.elem = null;
      }

      delete elemData.events;
      delete elemData.handle;

      if ( jQuery.isEmptyObject( elemData ) ) {
        jQuery.removeData( elem, undefined, true );
      }
    }
  },

  // bubbling is internal
  trigger: function( event, data, elem /*, bubbling */ ) {
    // Event object or event type
    var type = event.type || event,
      bubbling = arguments[3];

    if ( !bubbling ) {
      event = typeof event === "object" ?
        // jQuery.Event object
        event[ jQuery.expando ] ? event :
        // Object literal
        jQuery.extend( jQuery.Event(type), event ) :
        // Just the event type (string)
        jQuery.Event(type);

      if ( type.indexOf("!") >= 0 ) {
        event.type = type = type.slice(0, -1);
        event.exclusive = true;
      }

      // Handle a global trigger
      if ( !elem ) {
        // Don't bubble custom events when global (to avoid too much overhead)
        event.stopPropagation();

        // Only trigger if we've ever bound an event for it
        if ( jQuery.event.global[ type ] ) {
          // XXX This code smells terrible. event.js should not be directly
          // inspecting the data cache
          jQuery.each( jQuery.cache, function() {
            // internalKey variable is just used to make it easier to find
            // and potentially change this stuff later; currently it just
            // points to jQuery.expando
            var internalKey = jQuery.expando,
              internalCache = this[ internalKey ];
            if ( internalCache && internalCache.events && internalCache.events[ type ] ) {
              jQuery.event.trigger( event, data, internalCache.handle.elem );
            }
          });
        }
      }

      // Handle triggering a single element

      // don't do events on text and comment nodes
      if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 ) {
        return undefined;
      }

      // Clean up in case it is reused
      event.result = undefined;
      event.target = elem;

      // Clone the incoming data, if any
      data = jQuery.makeArray( data );
      data.unshift( event );
    }

    event.currentTarget = elem;

    // Trigger the event, it is assumed that "handle" is a function
    var handle = jQuery._data( elem, "handle" );

    if ( handle ) {
      handle.apply( elem, data );
    }

    var parent = elem.parentNode || elem.ownerDocument;

    // Trigger an inline bound script
    try {
      if ( !(elem && elem.nodeName && jQuery.noData[elem.nodeName.toLowerCase()]) ) {
        if ( elem[ "on" + type ] && elem[ "on" + type ].apply( elem, data ) === false ) {
          event.result = false;
          event.preventDefault();
        }
      }

    // prevent IE from throwing an error for some elements with some event types, see #3533
    } catch (inlineError) {}

    if ( !event.isPropagationStopped() && parent ) {
      jQuery.event.trigger( event, data, parent, true );

    } else if ( !event.isDefaultPrevented() ) {
      var old,
        target = event.target,
        targetType = type.replace( rnamespaces, "" ),
        isClick = jQuery.nodeName( target, "a" ) && targetType === "click",
        special = jQuery.event.special[ targetType ] || {};

      if ( (!special._default || special._default.call( elem, event ) === false) &&
        !isClick && !(target && target.nodeName && jQuery.noData[target.nodeName.toLowerCase()]) ) {

        try {
          if ( target[ targetType ] ) {
            // Make sure that we don't accidentally re-trigger the onFOO events
            old = target[ "on" + targetType ];

            if ( old ) {
              target[ "on" + targetType ] = null;
            }

            jQuery.event.triggered = event.type;
            target[ targetType ]();
          }

        // prevent IE from throwing an error for some elements with some event types, see #3533
        } catch (triggerError) {}

        if ( old ) {
          target[ "on" + targetType ] = old;
        }

        jQuery.event.triggered = undefined;
      }
    }
  },

  handle: function( event ) {
    var all, handlers, namespaces, namespace_re, events,
      namespace_sort = [],
      args = jQuery.makeArray( arguments );

    event = args[0] = jQuery.event.fix( event || window.event );
    event.currentTarget = this;

    // Namespaced event handlers
    all = event.type.indexOf(".") < 0 && !event.exclusive;

    if ( !all ) {
      namespaces = event.type.split(".");
      event.type = namespaces.shift();
      namespace_sort = namespaces.slice(0).sort();
      namespace_re = new RegExp("(^|\\.)" + namespace_sort.join("\\.(?:.*\\.)?") + "(\\.|$)");
    }

    event.namespace = event.namespace || namespace_sort.join(".");

    events = jQuery._data(this, "events");

    handlers = (events || {})[ event.type ];

    if ( events && handlers ) {
      // Clone the handlers to prevent manipulation
      handlers = handlers.slice(0);

      for ( var j = 0, l = handlers.length; j < l; j++ ) {
        var handleObj = handlers[ j ];

        // Filter the functions by class
        if ( all || namespace_re.test( handleObj.namespace ) ) {
          // Pass in a reference to the handler function itself
          // So that we can later remove it
          event.handler = handleObj.handler;
          event.data = handleObj.data;
          event.handleObj = handleObj;

          var ret = handleObj.handler.apply( this, args );

          if ( ret !== undefined ) {
            event.result = ret;
            if ( ret === false ) {
              event.preventDefault();
              event.stopPropagation();
            }
          }

          if ( event.isImmediatePropagationStopped() ) {
            break;
          }
        }
      }
    }

    return event.result;
  },

  props: "altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),

  fix: function( event ) {
    if ( event[ jQuery.expando ] ) {
      return event;
    }

    // store a copy of the original event object
    // and "clone" to set read-only properties
    var originalEvent = event;
    event = jQuery.Event( originalEvent );

    for ( var i = this.props.length, prop; i; ) {
      prop = this.props[ --i ];
      event[ prop ] = originalEvent[ prop ];
    }

    // Fix target property, if necessary
    if ( !event.target ) {
      // Fixes #1925 where srcElement might not be defined either
      event.target = event.srcElement || document;
    }

    // check if target is a textnode (safari)
    if ( event.target.nodeType === 3 ) {
      event.target = event.target.parentNode;
    }

    // Add relatedTarget, if necessary
    if ( !event.relatedTarget && event.fromElement ) {
      event.relatedTarget = event.fromElement === event.target ? event.toElement : event.fromElement;
    }

    // Calculate pageX/Y if missing and clientX/Y available
    if ( event.pageX == null && event.clientX != null ) {
      var doc = document.documentElement,
        body = document.body;

      event.pageX = event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
      event.pageY = event.clientY + (doc && doc.scrollTop  || body && body.scrollTop  || 0) - (doc && doc.clientTop  || body && body.clientTop  || 0);
    }

    // Add which for key events
    if ( event.which == null && (event.charCode != null || event.keyCode != null) ) {
      event.which = event.charCode != null ? event.charCode : event.keyCode;
    }

    // Add metaKey to non-Mac browsers (use ctrl for PC's and Meta for Macs)
    if ( !event.metaKey && event.ctrlKey ) {
      event.metaKey = event.ctrlKey;
    }

    // Add which for click: 1 === left; 2 === middle; 3 === right
    // Note: button is not normalized, so don't use it
    if ( !event.which && event.button !== undefined ) {
      event.which = (event.button & 1 ? 1 : ( event.button & 2 ? 3 : ( event.button & 4 ? 2 : 0 ) ));
    }

    return event;
  },

  // Deprecated, use jQuery.guid instead
  guid: 1E8,

  // Deprecated, use jQuery.proxy instead
  proxy: jQuery.proxy,

  special: {
    ready: {
      // Make sure the ready event is setup
      setup: jQuery.bindReady,
      teardown: jQuery.noop
    },

    live: {
      add: function( handleObj ) {
        jQuery.event.add( this,
          liveConvert( handleObj.origType, handleObj.selector ),
          jQuery.extend({}, handleObj, {handler: liveHandler, guid: handleObj.handler.guid}) );
      },

      remove: function( handleObj ) {
        jQuery.event.remove( this, liveConvert( handleObj.origType, handleObj.selector ), handleObj );
      }
    },

    beforeunload: {
      setup: function( data, namespaces, eventHandle ) {
        // We only want to do this special case on windows
        if ( jQuery.isWindow( this ) ) {
          this.onbeforeunload = eventHandle;
        }
      },

      teardown: function( namespaces, eventHandle ) {
        if ( this.onbeforeunload === eventHandle ) {
          this.onbeforeunload = null;
        }
      }
    }
  }
};

jQuery.removeEvent = document.removeEventListener ?
  function( elem, type, handle ) {
    if ( elem.removeEventListener ) {
      elem.removeEventListener( type, handle, false );
    }
  } :
  function( elem, type, handle ) {
    if ( elem.detachEvent ) {
      elem.detachEvent( "on" + type, handle );
    }
  };

jQuery.Event = function( src ) {
  // Allow instantiation without the 'new' keyword
  if ( !this.preventDefault ) {
    return new jQuery.Event( src );
  }

  // Event object
  if ( src && src.type ) {
    this.originalEvent = src;
    this.type = src.type;

    // Events bubbling up the document may have been marked as prevented
    // by a handler lower down the tree; reflect the correct value.
    this.isDefaultPrevented = (src.defaultPrevented || src.returnValue === false ||
      src.getPreventDefault && src.getPreventDefault()) ? returnTrue : returnFalse;

  // Event type
  } else {
    this.type = src;
  }

  // timeStamp is buggy for some events on Firefox(#3843)
  // So we won't rely on the native value
  this.timeStamp = jQuery.now();

  // Mark it as fixed
  this[ jQuery.expando ] = true;
};

function returnFalse() {
  return false;
}
function returnTrue() {
  return true;
}

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
  preventDefault: function() {
    this.isDefaultPrevented = returnTrue;

    var e = this.originalEvent;
    if ( !e ) {
      return;
    }

    // if preventDefault exists run it on the original event
    if ( e.preventDefault ) {
      e.preventDefault();

    // otherwise set the returnValue property of the original event to false (IE)
    } else {
      e.returnValue = false;
    }
  },
  stopPropagation: function() {
    this.isPropagationStopped = returnTrue;

    var e = this.originalEvent;
    if ( !e ) {
      return;
    }
    // if stopPropagation exists run it on the original event
    if ( e.stopPropagation ) {
      e.stopPropagation();
    }
    // otherwise set the cancelBubble property of the original event to true (IE)
    e.cancelBubble = true;
  },
  stopImmediatePropagation: function() {
    this.isImmediatePropagationStopped = returnTrue;
    this.stopPropagation();
  },
  isDefaultPrevented: returnFalse,
  isPropagationStopped: returnFalse,
  isImmediatePropagationStopped: returnFalse
};

// Checks if an event happened on an element within another element
// Used in jQuery.event.special.mouseenter and mouseleave handlers
var withinElement = function( event ) {
  // Check if mouse(over|out) are still within the same parent element
  var parent = event.relatedTarget;

  // Firefox sometimes assigns relatedTarget a XUL element
  // which we cannot access the parentNode property of
  try {

    // Chrome does something similar, the parentNode property
    // can be accessed but is null.
    if ( parent && parent !== document && !parent.parentNode ) {
      return;
    }
    // Traverse up the tree
    while ( parent && parent !== this ) {
      parent = parent.parentNode;
    }

    if ( parent !== this ) {
      // set the correct event type
      event.type = event.data;

      // handle event if we actually just moused on to a non sub-element
      jQuery.event.handle.apply( this, arguments );
    }

  // assuming we've left the element since we most likely mousedover a xul element
  } catch(e) { }
},

// In case of event delegation, we only need to rename the event.type,
// liveHandler will take care of the rest.
delegate = function( event ) {
  event.type = event.data;
  jQuery.event.handle.apply( this, arguments );
};

// Create mouseenter and mouseleave events
jQuery.each({
  mouseenter: "mouseover",
  mouseleave: "mouseout"
}, function( orig, fix ) {
  jQuery.event.special[ orig ] = {
    setup: function( data ) {
      jQuery.event.add( this, fix, data && data.selector ? delegate : withinElement, orig );
    },
    teardown: function( data ) {
      jQuery.event.remove( this, fix, data && data.selector ? delegate : withinElement );
    }
  };
});

// submit delegation
if ( !jQuery.support.submitBubbles ) {

  jQuery.event.special.submit = {
    setup: function( data, namespaces ) {
      if ( this.nodeName && this.nodeName.toLowerCase() !== "form" ) {
        jQuery.event.add(this, "click.specialSubmit", function( e ) {
          var elem = e.target,
            type = elem.type;

          if ( (type === "submit" || type === "image") && jQuery( elem ).closest("form").length ) {
            trigger( "submit", this, arguments );
          }
        });

        jQuery.event.add(this, "keypress.specialSubmit", function( e ) {
          var elem = e.target,
            type = elem.type;

          if ( (type === "text" || type === "password") && jQuery( elem ).closest("form").length && e.keyCode === 13 ) {
            trigger( "submit", this, arguments );
          }
        });

      } else {
        return false;
      }
    },

    teardown: function( namespaces ) {
      jQuery.event.remove( this, ".specialSubmit" );
    }
  };

}

// change delegation, happens here so we have bind.
if ( !jQuery.support.changeBubbles ) {

  var changeFilters,

  getVal = function( elem ) {
    var type = elem.type, val = elem.value;

    if ( type === "radio" || type === "checkbox" ) {
      val = elem.checked;

    } else if ( type === "select-multiple" ) {
      val = elem.selectedIndex > -1 ?
        jQuery.map( elem.options, function( elem ) {
          return elem.selected;
        }).join("-") :
        "";

    } else if ( elem.nodeName.toLowerCase() === "select" ) {
      val = elem.selectedIndex;
    }

    return val;
  },

  testChange = function testChange( e ) {
    var elem = e.target, data, val;

    if ( !rformElems.test( elem.nodeName ) || elem.readOnly ) {
      return;
    }

    data = jQuery._data( elem, "_change_data" );
    val = getVal(elem);

    // the current data will be also retrieved by beforeactivate
    if ( e.type !== "focusout" || elem.type !== "radio" ) {
      jQuery._data( elem, "_change_data", val );
    }

    if ( data === undefined || val === data ) {
      return;
    }

    if ( data != null || val ) {
      e.type = "change";
      e.liveFired = undefined;
      jQuery.event.trigger( e, arguments[1], elem );
    }
  };

  jQuery.event.special.change = {
    filters: {
      focusout: testChange,

      beforedeactivate: testChange,

      click: function( e ) {
        var elem = e.target, type = elem.type;

        if ( type === "radio" || type === "checkbox" || elem.nodeName.toLowerCase() === "select" ) {
          testChange.call( this, e );
        }
      },

      // Change has to be called before submit
      // Keydown will be called before keypress, which is used in submit-event delegation
      keydown: function( e ) {
        var elem = e.target, type = elem.type;

        if ( (e.keyCode === 13 && elem.nodeName.toLowerCase() !== "textarea") ||
          (e.keyCode === 32 && (type === "checkbox" || type === "radio")) ||
          type === "select-multiple" ) {
          testChange.call( this, e );
        }
      },

      // Beforeactivate happens also before the previous element is blurred
      // with this event you can't trigger a change event, but you can store
      // information
      beforeactivate: function( e ) {
        var elem = e.target;
        jQuery._data( elem, "_change_data", getVal(elem) );
      }
    },

    setup: function( data, namespaces ) {
      if ( this.type === "file" ) {
        return false;
      }

      for ( var type in changeFilters ) {
        jQuery.event.add( this, type + ".specialChange", changeFilters[type] );
      }

      return rformElems.test( this.nodeName );
    },

    teardown: function( namespaces ) {
      jQuery.event.remove( this, ".specialChange" );

      return rformElems.test( this.nodeName );
    }
  };

  changeFilters = jQuery.event.special.change.filters;

  // Handle when the input is .focus()'d
  changeFilters.focus = changeFilters.beforeactivate;
}

function trigger( type, elem, args ) {
  // Piggyback on a donor event to simulate a different one.
  // Fake originalEvent to avoid donor's stopPropagation, but if the
  // simulated event prevents default then we do the same on the donor.
  // Don't pass args or remember liveFired; they apply to the donor event.
  var event = jQuery.extend( {}, args[ 0 ] );
  event.type = type;
  event.originalEvent = {};
  event.liveFired = undefined;
  jQuery.event.handle.call( elem, event );
  if ( event.isDefaultPrevented() ) {
    args[ 0 ].preventDefault();
  }
}

// Create "bubbling" focus and blur events
if ( document.addEventListener ) {
  jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {
  
    // Attach a single capturing handler while someone wants focusin/focusout
    var attaches = 0;
    
    jQuery.event.special[ fix ] = {
      setup: function() {
        if ( attaches++ === 0 ) {
          document.addEventListener( orig, handler, true );
        }
      },
      teardown: function() {
        if ( --attaches === 0 ) {
          document.removeEventListener( orig, handler, true );
        }
      }
    };

    function handler( donor ) {
      // Donor event is always a native one; fix it and switch its type.
      // Let focusin/out handler cancel the donor focus/blur event.
      var e = jQuery.event.fix( donor );
      e.type = fix;
      e.originalEvent = {};
      jQuery.event.trigger( e, null, e.target );
      if ( e.isDefaultPrevented() ) {
        donor.preventDefault();
      }
    }
  });
}

jQuery.each(["bind", "one"], function( i, name ) {
  jQuery.fn[ name ] = function( type, data, fn ) {
    // Handle object literals
    if ( typeof type === "object" ) {
      for ( var key in type ) {
        this[ name ](key, data, type[key], fn);
      }
      return this;
    }

    if ( jQuery.isFunction( data ) || data === false ) {
      fn = data;
      data = undefined;
    }

    var handler = name === "one" ? jQuery.proxy( fn, function( event ) {
      jQuery( this ).unbind( event, handler );
      return fn.apply( this, arguments );
    }) : fn;

    if ( type === "unload" && name !== "one" ) {
      this.one( type, data, fn );

    } else {
      for ( var i = 0, l = this.length; i < l; i++ ) {
        jQuery.event.add( this[i], type, handler, data );
      }
    }

    return this;
  };
});

jQuery.fn.extend({
  unbind: function( type, fn ) {
    // Handle object literals
    if ( typeof type === "object" && !type.preventDefault ) {
      for ( var key in type ) {
        this.unbind(key, type[key]);
      }

    } else {
      for ( var i = 0, l = this.length; i < l; i++ ) {
        jQuery.event.remove( this[i], type, fn );
      }
    }

    return this;
  },

  delegate: function( selector, types, data, fn ) {
    return this.live( types, data, fn, selector );
  },

  undelegate: function( selector, types, fn ) {
    if ( arguments.length === 0 ) {
        return this.unbind( "live" );

    } else {
      return this.die( types, null, fn, selector );
    }
  },

  trigger: function( type, data ) {
    return this.each(function() {
      jQuery.event.trigger( type, data, this );
    });
  },

  triggerHandler: function( type, data ) {
    if ( this[0] ) {
      var event = jQuery.Event( type );
      event.preventDefault();
      event.stopPropagation();
      jQuery.event.trigger( event, data, this[0] );
      return event.result;
    }
  },

  toggle: function( fn ) {
    // Save reference to arguments for access in closure
    var args = arguments,
      i = 1;

    // link all the functions, so any of them can unbind this click handler
    while ( i < args.length ) {
      jQuery.proxy( fn, args[ i++ ] );
    }

    return this.click( jQuery.proxy( fn, function( event ) {
      // Figure out which function to execute
      var lastToggle = ( jQuery._data( this, "lastToggle" + fn.guid ) || 0 ) % i;
      jQuery._data( this, "lastToggle" + fn.guid, lastToggle + 1 );

      // Make sure that clicks stop
      event.preventDefault();

      // and execute the function
      return args[ lastToggle ].apply( this, arguments ) || false;
    }));
  },

  hover: function( fnOver, fnOut ) {
    return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
  }
});

var liveMap = {
  focus: "focusin",
  blur: "focusout",
  mouseenter: "mouseover",
  mouseleave: "mouseout"
};

jQuery.each(["live", "die"], function( i, name ) {
  jQuery.fn[ name ] = function( types, data, fn, origSelector /* Internal Use Only */ ) {
    var type, i = 0, match, namespaces, preType,
      selector = origSelector || this.selector,
      context = origSelector ? this : jQuery( this.context );

    if ( typeof types === "object" && !types.preventDefault ) {
      for ( var key in types ) {
        context[ name ]( key, data, types[key], selector );
      }

      return this;
    }

    if ( jQuery.isFunction( data ) ) {
      fn = data;
      data = undefined;
    }

    types = (types || "").split(" ");

    while ( (type = types[ i++ ]) != null ) {
      match = rnamespaces.exec( type );
      namespaces = "";

      if ( match )  {
        namespaces = match[0];
        type = type.replace( rnamespaces, "" );
      }

      if ( type === "hover" ) {
        types.push( "mouseenter" + namespaces, "mouseleave" + namespaces );
        continue;
      }

      preType = type;

      if ( type === "focus" || type === "blur" ) {
        types.push( liveMap[ type ] + namespaces );
        type = type + namespaces;

      } else {
        type = (liveMap[ type ] || type) + namespaces;
      }

      if ( name === "live" ) {
        // bind live handler
        for ( var j = 0, l = context.length; j < l; j++ ) {
          jQuery.event.add( context[j], "live." + liveConvert( type, selector ),
            { data: data, selector: selector, handler: fn, origType: type, origHandler: fn, preType: preType } );
        }

      } else {
        // unbind live handler
        context.unbind( "live." + liveConvert( type, selector ), fn );
      }
    }

    return this;
  };
});

function liveHandler( event ) {
  var stop, maxLevel, related, match, handleObj, elem, j, i, l, data, close, namespace, ret,
    elems = [],
    selectors = [],
    events = jQuery._data( this, "events" );

  // Make sure we avoid non-left-click bubbling in Firefox (#3861) and disabled elements in IE (#6911)
  if ( event.liveFired === this || !events || !events.live || event.target.disabled || event.button && event.type === "click" ) {
    return;
  }

  if ( event.namespace ) {
    namespace = new RegExp("(^|\\.)" + event.namespace.split(".").join("\\.(?:.*\\.)?") + "(\\.|$)");
  }

  event.liveFired = this;

  var live = events.live.slice(0);

  for ( j = 0; j < live.length; j++ ) {
    handleObj = live[j];

    if ( handleObj.origType.replace( rnamespaces, "" ) === event.type ) {
      selectors.push( handleObj.selector );

    } else {
      live.splice( j--, 1 );
    }
  }

  match = jQuery( event.target ).closest( selectors, event.currentTarget );

  for ( i = 0, l = match.length; i < l; i++ ) {
    close = match[i];

    for ( j = 0; j < live.length; j++ ) {
      handleObj = live[j];

      if ( close.selector === handleObj.selector && (!namespace || namespace.test( handleObj.namespace )) && !close.elem.disabled ) {
        elem = close.elem;
        related = null;

        // Those two events require additional checking
        if ( handleObj.preType === "mouseenter" || handleObj.preType === "mouseleave" ) {
          event.type = handleObj.preType;
          related = jQuery( event.relatedTarget ).closest( handleObj.selector )[0];
        }

        if ( !related || related !== elem ) {
          elems.push({ elem: elem, handleObj: handleObj, level: close.level });
        }
      }
    }
  }

  for ( i = 0, l = elems.length; i < l; i++ ) {
    match = elems[i];

    if ( maxLevel && match.level > maxLevel ) {
      break;
    }

    event.currentTarget = match.elem;
    event.data = match.handleObj.data;
    event.handleObj = match.handleObj;

    ret = match.handleObj.origHandler.apply( match.elem, arguments );

    if ( ret === false || event.isPropagationStopped() ) {
      maxLevel = match.level;

      if ( ret === false ) {
        stop = false;
      }
      if ( event.isImmediatePropagationStopped() ) {
        break;
      }
    }
  }

  return stop;
}

function liveConvert( type, selector ) {
  return (type && type !== "*" ? type + "." : "") + selector.replace(rperiod, "`").replace(rspace, "&");
}

jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
  "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
  "change select submit keydown keypress keyup error").split(" "), function( i, name ) {

  // Handle event binding
  jQuery.fn[ name ] = function( data, fn ) {
    if ( fn == null ) {
      fn = data;
      data = null;
    }

    return arguments.length > 0 ?
      this.bind( name, data, fn ) :
      this.trigger( name );
  };

  if ( jQuery.attrFn ) {
    jQuery.attrFn[ name ] = true;
  }
});


/*!
 * Sizzle CSS Selector Engine
 *  Copyright 2011, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
(function(){

var chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
  done = 0,
  toString = Object.prototype.toString,
  hasDuplicate = false,
  baseHasDuplicate = true,
  rBackslash = /\\/g,
  rNonWord = /\W/;

// Here we check if the JavaScript engine is using some sort of
// optimization where it does not always call our comparision
// function. If that is the case, discard the hasDuplicate value.
//   Thus far that includes Google Chrome.
[0, 0].sort(function() {
  baseHasDuplicate = false;
  return 0;
});

var Sizzle = function( selector, context, results, seed ) {
  results = results || [];
  context = context || document;

  var origContext = context;

  if ( context.nodeType !== 1 && context.nodeType !== 9 ) {
    return [];
  }
  
  if ( !selector || typeof selector !== "string" ) {
    return results;
  }

  var m, set, checkSet, extra, ret, cur, pop, i,
    prune = true,
    contextXML = Sizzle.isXML( context ),
    parts = [],
    soFar = selector;
  
  // Reset the position of the chunker regexp (start from head)
  do {
    chunker.exec( "" );
    m = chunker.exec( soFar );

    if ( m ) {
      soFar = m[3];
    
      parts.push( m[1] );
    
      if ( m[2] ) {
        extra = m[3];
        break;
      }
    }
  } while ( m );

  if ( parts.length > 1 && origPOS.exec( selector ) ) {

    if ( parts.length === 2 && Expr.relative[ parts[0] ] ) {
      set = posProcess( parts[0] + parts[1], context );

    } else {
      set = Expr.relative[ parts[0] ] ?
        [ context ] :
        Sizzle( parts.shift(), context );

      while ( parts.length ) {
        selector = parts.shift();

        if ( Expr.relative[ selector ] ) {
          selector += parts.shift();
        }
        
        set = posProcess( selector, set );
      }
    }

  } else {
    // Take a shortcut and set the context if the root selector is an ID
    // (but not if it'll be faster if the inner selector is an ID)
    if ( !seed && parts.length > 1 && context.nodeType === 9 && !contextXML &&
        Expr.match.ID.test(parts[0]) && !Expr.match.ID.test(parts[parts.length - 1]) ) {

      ret = Sizzle.find( parts.shift(), context, contextXML );
      context = ret.expr ?
        Sizzle.filter( ret.expr, ret.set )[0] :
        ret.set[0];
    }

    if ( context ) {
      ret = seed ?
        { expr: parts.pop(), set: makeArray(seed) } :
        Sizzle.find( parts.pop(), parts.length === 1 && (parts[0] === "~" || parts[0] === "+") && context.parentNode ? context.parentNode : context, contextXML );

      set = ret.expr ?
        Sizzle.filter( ret.expr, ret.set ) :
        ret.set;

      if ( parts.length > 0 ) {
        checkSet = makeArray( set );

      } else {
        prune = false;
      }

      while ( parts.length ) {
        cur = parts.pop();
        pop = cur;

        if ( !Expr.relative[ cur ] ) {
          cur = "";
        } else {
          pop = parts.pop();
        }

        if ( pop == null ) {
          pop = context;
        }

        Expr.relative[ cur ]( checkSet, pop, contextXML );
      }

    } else {
      checkSet = parts = [];
    }
  }

  if ( !checkSet ) {
    checkSet = set;
  }

  if ( !checkSet ) {
    Sizzle.error( cur || selector );
  }

  if ( toString.call(checkSet) === "[object Array]" ) {
    if ( !prune ) {
      results.push.apply( results, checkSet );

    } else if ( context && context.nodeType === 1 ) {
      for ( i = 0; checkSet[i] != null; i++ ) {
        if ( checkSet[i] && (checkSet[i] === true || checkSet[i].nodeType === 1 && Sizzle.contains(context, checkSet[i])) ) {
          results.push( set[i] );
        }
      }

    } else {
      for ( i = 0; checkSet[i] != null; i++ ) {
        if ( checkSet[i] && checkSet[i].nodeType === 1 ) {
          results.push( set[i] );
        }
      }
    }

  } else {
    makeArray( checkSet, results );
  }

  if ( extra ) {
    Sizzle( extra, origContext, results, seed );
    Sizzle.uniqueSort( results );
  }

  return results;
};

Sizzle.uniqueSort = function( results ) {
  if ( sortOrder ) {
    hasDuplicate = baseHasDuplicate;
    results.sort( sortOrder );

    if ( hasDuplicate ) {
      for ( var i = 1; i < results.length; i++ ) {
        if ( results[i] === results[ i - 1 ] ) {
          results.splice( i--, 1 );
        }
      }
    }
  }

  return results;
};

Sizzle.matches = function( expr, set ) {
  return Sizzle( expr, null, null, set );
};

Sizzle.matchesSelector = function( node, expr ) {
  return Sizzle( expr, null, null, [node] ).length > 0;
};

Sizzle.find = function( expr, context, isXML ) {
  var set;

  if ( !expr ) {
    return [];
  }

  for ( var i = 0, l = Expr.order.length; i < l; i++ ) {
    var match,
      type = Expr.order[i];
    
    if ( (match = Expr.leftMatch[ type ].exec( expr )) ) {
      var left = match[1];
      match.splice( 1, 1 );

      if ( left.substr( left.length - 1 ) !== "\\" ) {
        match[1] = (match[1] || "").replace( rBackslash, "" );
        set = Expr.find[ type ]( match, context, isXML );

        if ( set != null ) {
          expr = expr.replace( Expr.match[ type ], "" );
          break;
        }
      }
    }
  }

  if ( !set ) {
    set = typeof context.getElementsByTagName !== "undefined" ?
      context.getElementsByTagName( "*" ) :
      [];
  }

  return { set: set, expr: expr };
};

Sizzle.filter = function( expr, set, inplace, not ) {
  var match, anyFound,
    old = expr,
    result = [],
    curLoop = set,
    isXMLFilter = set && set[0] && Sizzle.isXML( set[0] );

  while ( expr && set.length ) {
    for ( var type in Expr.filter ) {
      if ( (match = Expr.leftMatch[ type ].exec( expr )) != null && match[2] ) {
        var found, item,
          filter = Expr.filter[ type ],
          left = match[1];

        anyFound = false;

        match.splice(1,1);

        if ( left.substr( left.length - 1 ) === "\\" ) {
          continue;
        }

        if ( curLoop === result ) {
          result = [];
        }

        if ( Expr.preFilter[ type ] ) {
          match = Expr.preFilter[ type ]( match, curLoop, inplace, result, not, isXMLFilter );

          if ( !match ) {
            anyFound = found = true;

          } else if ( match === true ) {
            continue;
          }
        }

        if ( match ) {
          for ( var i = 0; (item = curLoop[i]) != null; i++ ) {
            if ( item ) {
              found = filter( item, match, i, curLoop );
              var pass = not ^ !!found;

              if ( inplace && found != null ) {
                if ( pass ) {
                  anyFound = true;

                } else {
                  curLoop[i] = false;
                }

              } else if ( pass ) {
                result.push( item );
                anyFound = true;
              }
            }
          }
        }

        if ( found !== undefined ) {
          if ( !inplace ) {
            curLoop = result;
          }

          expr = expr.replace( Expr.match[ type ], "" );

          if ( !anyFound ) {
            return [];
          }

          break;
        }
      }
    }

    // Improper expression
    if ( expr === old ) {
      if ( anyFound == null ) {
        Sizzle.error( expr );

      } else {
        break;
      }
    }

    old = expr;
  }

  return curLoop;
};

Sizzle.error = function( msg ) {
  throw "Syntax error, unrecognized expression: " + msg;
};

var Expr = Sizzle.selectors = {
  order: [ "ID", "NAME", "TAG" ],

  match: {
    ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
    CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
    NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
    ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
    TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
    CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
    POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
    PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
  },

  leftMatch: {},

  attrMap: {
    "class": "className",
    "for": "htmlFor"
  },

  attrHandle: {
    href: function( elem ) {
      return elem.getAttribute( "href" );
    },
    type: function( elem ) {
      return elem.getAttribute( "type" );
    }
  },

  relative: {
    "+": function(checkSet, part){
      var isPartStr = typeof part === "string",
        isTag = isPartStr && !rNonWord.test( part ),
        isPartStrNotTag = isPartStr && !isTag;

      if ( isTag ) {
        part = part.toLowerCase();
      }

      for ( var i = 0, l = checkSet.length, elem; i < l; i++ ) {
        if ( (elem = checkSet[i]) ) {
          while ( (elem = elem.previousSibling) && elem.nodeType !== 1 ) {}

          checkSet[i] = isPartStrNotTag || elem && elem.nodeName.toLowerCase() === part ?
            elem || false :
            elem === part;
        }
      }

      if ( isPartStrNotTag ) {
        Sizzle.filter( part, checkSet, true );
      }
    },

    ">": function( checkSet, part ) {
      var elem,
        isPartStr = typeof part === "string",
        i = 0,
        l = checkSet.length;

      if ( isPartStr && !rNonWord.test( part ) ) {
        part = part.toLowerCase();

        for ( ; i < l; i++ ) {
          elem = checkSet[i];

          if ( elem ) {
            var parent = elem.parentNode;
            checkSet[i] = parent.nodeName.toLowerCase() === part ? parent : false;
          }
        }

      } else {
        for ( ; i < l; i++ ) {
          elem = checkSet[i];

          if ( elem ) {
            checkSet[i] = isPartStr ?
              elem.parentNode :
              elem.parentNode === part;
          }
        }

        if ( isPartStr ) {
          Sizzle.filter( part, checkSet, true );
        }
      }
    },

    "": function(checkSet, part, isXML){
      var nodeCheck,
        doneName = done++,
        checkFn = dirCheck;

      if ( typeof part === "string" && !rNonWord.test( part ) ) {
        part = part.toLowerCase();
        nodeCheck = part;
        checkFn = dirNodeCheck;
      }

      checkFn( "parentNode", part, doneName, checkSet, nodeCheck, isXML );
    },

    "~": function( checkSet, part, isXML ) {
      var nodeCheck,
        doneName = done++,
        checkFn = dirCheck;

      if ( typeof part === "string" && !rNonWord.test( part ) ) {
        part = part.toLowerCase();
        nodeCheck = part;
        checkFn = dirNodeCheck;
      }

      checkFn( "previousSibling", part, doneName, checkSet, nodeCheck, isXML );
    }
  },

  find: {
    ID: function( match, context, isXML ) {
      if ( typeof context.getElementById !== "undefined" && !isXML ) {
        var m = context.getElementById(match[1]);
        // Check parentNode to catch when Blackberry 4.6 returns
        // nodes that are no longer in the document #6963
        return m && m.parentNode ? [m] : [];
      }
    },

    NAME: function( match, context ) {
      if ( typeof context.getElementsByName !== "undefined" ) {
        var ret = [],
          results = context.getElementsByName( match[1] );

        for ( var i = 0, l = results.length; i < l; i++ ) {
          if ( results[i].getAttribute("name") === match[1] ) {
            ret.push( results[i] );
          }
        }

        return ret.length === 0 ? null : ret;
      }
    },

    TAG: function( match, context ) {
      if ( typeof context.getElementsByTagName !== "undefined" ) {
        return context.getElementsByTagName( match[1] );
      }
    }
  },
  preFilter: {
    CLASS: function( match, curLoop, inplace, result, not, isXML ) {
      match = " " + match[1].replace( rBackslash, "" ) + " ";

      if ( isXML ) {
        return match;
      }

      for ( var i = 0, elem; (elem = curLoop[i]) != null; i++ ) {
        if ( elem ) {
          if ( not ^ (elem.className && (" " + elem.className + " ").replace(/[\t\n\r]/g, " ").indexOf(match) >= 0) ) {
            if ( !inplace ) {
              result.push( elem );
            }

          } else if ( inplace ) {
            curLoop[i] = false;
          }
        }
      }

      return false;
    },

    ID: function( match ) {
      return match[1].replace( rBackslash, "" );
    },

    TAG: function( match, curLoop ) {
      return match[1].replace( rBackslash, "" ).toLowerCase();
    },

    CHILD: function( match ) {
      if ( match[1] === "nth" ) {
        if ( !match[2] ) {
          Sizzle.error( match[0] );
        }

        match[2] = match[2].replace(/^\+|\s*/g, '');

        // parse equations like 'even', 'odd', '5', '2n', '3n+2', '4n-1', '-n+6'
        var test = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(
          match[2] === "even" && "2n" || match[2] === "odd" && "2n+1" ||
          !/\D/.test( match[2] ) && "0n+" + match[2] || match[2]);

        // calculate the numbers (first)n+(last) including if they are negative
        match[2] = (test[1] + (test[2] || 1)) - 0;
        match[3] = test[3] - 0;
      }
      else if ( match[2] ) {
        Sizzle.error( match[0] );
      }

      // TODO: Move to normal caching system
      match[0] = done++;

      return match;
    },

    ATTR: function( match, curLoop, inplace, result, not, isXML ) {
      var name = match[1] = match[1].replace( rBackslash, "" );
      
      if ( !isXML && Expr.attrMap[name] ) {
        match[1] = Expr.attrMap[name];
      }

      // Handle if an un-quoted value was used
      match[4] = ( match[4] || match[5] || "" ).replace( rBackslash, "" );

      if ( match[2] === "~=" ) {
        match[4] = " " + match[4] + " ";
      }

      return match;
    },

    PSEUDO: function( match, curLoop, inplace, result, not ) {
      if ( match[1] === "not" ) {
        // If we're dealing with a complex expression, or a simple one
        if ( ( chunker.exec(match[3]) || "" ).length > 1 || /^\w/.test(match[3]) ) {
          match[3] = Sizzle(match[3], null, null, curLoop);

        } else {
          var ret = Sizzle.filter(match[3], curLoop, inplace, true ^ not);

          if ( !inplace ) {
            result.push.apply( result, ret );
          }

          return false;
        }

      } else if ( Expr.match.POS.test( match[0] ) || Expr.match.CHILD.test( match[0] ) ) {
        return true;
      }
      
      return match;
    },

    POS: function( match ) {
      match.unshift( true );

      return match;
    }
  },
  
  filters: {
    enabled: function( elem ) {
      return elem.disabled === false && elem.type !== "hidden";
    },

    disabled: function( elem ) {
      return elem.disabled === true;
    },

    checked: function( elem ) {
      return elem.checked === true;
    },
    
    selected: function( elem ) {
      // Accessing this property makes selected-by-default
      // options in Safari work properly
      if ( elem.parentNode ) {
        elem.parentNode.selectedIndex;
      }
      
      return elem.selected === true;
    },

    parent: function( elem ) {
      return !!elem.firstChild;
    },

    empty: function( elem ) {
      return !elem.firstChild;
    },

    has: function( elem, i, match ) {
      return !!Sizzle( match[3], elem ).length;
    },

    header: function( elem ) {
      return (/h\d/i).test( elem.nodeName );
    },

    text: function( elem ) {
      var attr = elem.getAttribute( "type" ), type = elem.type;
      // IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc) 
      // use getAttribute instead to test this case
      return "text" === type && ( attr === type || attr === null );
    },

    radio: function( elem ) {
      return "radio" === elem.type;
    },

    checkbox: function( elem ) {
      return "checkbox" === elem.type;
    },

    file: function( elem ) {
      return "file" === elem.type;
    },
    password: function( elem ) {
      return "password" === elem.type;
    },

    submit: function( elem ) {
      return "submit" === elem.type;
    },

    image: function( elem ) {
      return "image" === elem.type;
    },

    reset: function( elem ) {
      return "reset" === elem.type;
    },

    button: function( elem ) {
      return "button" === elem.type || elem.nodeName.toLowerCase() === "button";
    },

    input: function( elem ) {
      return (/input|select|textarea|button/i).test( elem.nodeName );
    }
  },
  setFilters: {
    first: function( elem, i ) {
      return i === 0;
    },

    last: function( elem, i, match, array ) {
      return i === array.length - 1;
    },

    even: function( elem, i ) {
      return i % 2 === 0;
    },

    odd: function( elem, i ) {
      return i % 2 === 1;
    },

    lt: function( elem, i, match ) {
      return i < match[3] - 0;
    },

    gt: function( elem, i, match ) {
      return i > match[3] - 0;
    },

    nth: function( elem, i, match ) {
      return match[3] - 0 === i;
    },

    eq: function( elem, i, match ) {
      return match[3] - 0 === i;
    }
  },
  filter: {
    PSEUDO: function( elem, match, i, array ) {
      var name = match[1],
        filter = Expr.filters[ name ];

      if ( filter ) {
        return filter( elem, i, match, array );

      } else if ( name === "contains" ) {
        return (elem.textContent || elem.innerText || Sizzle.getText([ elem ]) || "").indexOf(match[3]) >= 0;

      } else if ( name === "not" ) {
        var not = match[3];

        for ( var j = 0, l = not.length; j < l; j++ ) {
          if ( not[j] === elem ) {
            return false;
          }
        }

        return true;

      } else {
        Sizzle.error( name );
      }
    },

    CHILD: function( elem, match ) {
      var type = match[1],
        node = elem;

      switch ( type ) {
        case "only":
        case "first":
          while ( (node = node.previousSibling) )   {
            if ( node.nodeType === 1 ) { 
              return false; 
            }
          }

          if ( type === "first" ) { 
            return true; 
          }

          node = elem;

        case "last":
          while ( (node = node.nextSibling) )   {
            if ( node.nodeType === 1 ) { 
              return false; 
            }
          }

          return true;

        case "nth":
          var first = match[2],
            last = match[3];

          if ( first === 1 && last === 0 ) {
            return true;
          }
          
          var doneName = match[0],
            parent = elem.parentNode;
  
          if ( parent && (parent.sizcache !== doneName || !elem.nodeIndex) ) {
            var count = 0;
            
            for ( node = parent.firstChild; node; node = node.nextSibling ) {
              if ( node.nodeType === 1 ) {
                node.nodeIndex = ++count;
              }
            } 

            parent.sizcache = doneName;
          }
          
          var diff = elem.nodeIndex - last;

          if ( first === 0 ) {
            return diff === 0;

          } else {
            return ( diff % first === 0 && diff / first >= 0 );
          }
      }
    },

    ID: function( elem, match ) {
      return elem.nodeType === 1 && elem.getAttribute("id") === match;
    },

    TAG: function( elem, match ) {
      return (match === "*" && elem.nodeType === 1) || elem.nodeName.toLowerCase() === match;
    },
    
    CLASS: function( elem, match ) {
      return (" " + (elem.className || elem.getAttribute("class")) + " ")
        .indexOf( match ) > -1;
    },

    ATTR: function( elem, match ) {
      var name = match[1],
        result = Expr.attrHandle[ name ] ?
          Expr.attrHandle[ name ]( elem ) :
          elem[ name ] != null ?
            elem[ name ] :
            elem.getAttribute( name ),
        value = result + "",
        type = match[2],
        check = match[4];

      return result == null ?
        type === "!=" :
        type === "=" ?
        value === check :
        type === "*=" ?
        value.indexOf(check) >= 0 :
        type === "~=" ?
        (" " + value + " ").indexOf(check) >= 0 :
        !check ?
        value && result !== false :
        type === "!=" ?
        value !== check :
        type === "^=" ?
        value.indexOf(check) === 0 :
        type === "$=" ?
        value.substr(value.length - check.length) === check :
        type === "|=" ?
        value === check || value.substr(0, check.length + 1) === check + "-" :
        false;
    },

    POS: function( elem, match, i, array ) {
      var name = match[2],
        filter = Expr.setFilters[ name ];

      if ( filter ) {
        return filter( elem, i, match, array );
      }
    }
  }
};

var origPOS = Expr.match.POS,
  fescape = function(all, num){
    return "\\" + (num - 0 + 1);
  };

for ( var type in Expr.match ) {
  Expr.match[ type ] = new RegExp( Expr.match[ type ].source + (/(?![^\[]*\])(?![^\(]*\))/.source) );
  Expr.leftMatch[ type ] = new RegExp( /(^(?:.|\r|\n)*?)/.source + Expr.match[ type ].source.replace(/\\(\d+)/g, fescape) );
}

var makeArray = function( array, results ) {
  array = Array.prototype.slice.call( array, 0 );

  if ( results ) {
    results.push.apply( results, array );
    return results;
  }
  
  return array;
};

// Perform a simple check to determine if the browser is capable of
// converting a NodeList to an array using builtin methods.
// Also verifies that the returned array holds DOM nodes
// (which is not the case in the Blackberry browser)
try {
  Array.prototype.slice.call( document.documentElement.childNodes, 0 )[0].nodeType;

// Provide a fallback method if it does not work
} catch( e ) {
  makeArray = function( array, results ) {
    var i = 0,
      ret = results || [];

    if ( toString.call(array) === "[object Array]" ) {
      Array.prototype.push.apply( ret, array );

    } else {
      if ( typeof array.length === "number" ) {
        for ( var l = array.length; i < l; i++ ) {
          ret.push( array[i] );
        }

      } else {
        for ( ; array[i]; i++ ) {
          ret.push( array[i] );
        }
      }
    }

    return ret;
  };
}

var sortOrder, siblingCheck;

if ( document.documentElement.compareDocumentPosition ) {
  sortOrder = function( a, b ) {
    if ( a === b ) {
      hasDuplicate = true;
      return 0;
    }

    if ( !a.compareDocumentPosition || !b.compareDocumentPosition ) {
      return a.compareDocumentPosition ? -1 : 1;
    }

    return a.compareDocumentPosition(b) & 4 ? -1 : 1;
  };

} else {
  sortOrder = function( a, b ) {
    var al, bl,
      ap = [],
      bp = [],
      aup = a.parentNode,
      bup = b.parentNode,
      cur = aup;

    // The nodes are identical, we can exit early
    if ( a === b ) {
      hasDuplicate = true;
      return 0;

    // If the nodes are siblings (or identical) we can do a quick check
    } else if ( aup === bup ) {
      return siblingCheck( a, b );

    // If no parents were found then the nodes are disconnected
    } else if ( !aup ) {
      return -1;

    } else if ( !bup ) {
      return 1;
    }

    // Otherwise they're somewhere else in the tree so we need
    // to build up a full list of the parentNodes for comparison
    while ( cur ) {
      ap.unshift( cur );
      cur = cur.parentNode;
    }

    cur = bup;

    while ( cur ) {
      bp.unshift( cur );
      cur = cur.parentNode;
    }

    al = ap.length;
    bl = bp.length;

    // Start walking down the tree looking for a discrepancy
    for ( var i = 0; i < al && i < bl; i++ ) {
      if ( ap[i] !== bp[i] ) {
        return siblingCheck( ap[i], bp[i] );
      }
    }

    // We ended someplace up the tree so do a sibling check
    return i === al ?
      siblingCheck( a, bp[i], -1 ) :
      siblingCheck( ap[i], b, 1 );
  };

  siblingCheck = function( a, b, ret ) {
    if ( a === b ) {
      return ret;
    }

    var cur = a.nextSibling;

    while ( cur ) {
      if ( cur === b ) {
        return -1;
      }

      cur = cur.nextSibling;
    }

    return 1;
  };
}

// Utility function for retreiving the text value of an array of DOM nodes
Sizzle.getText = function( elems ) {
  var ret = "", elem;

  for ( var i = 0; elems[i]; i++ ) {
    elem = elems[i];

    // Get the text from text nodes and CDATA nodes
    if ( elem.nodeType === 3 || elem.nodeType === 4 ) {
      ret += elem.nodeValue;

    // Traverse everything else, except comment nodes
    } else if ( elem.nodeType !== 8 ) {
      ret += Sizzle.getText( elem.childNodes );
    }
  }

  return ret;
};

// Check to see if the browser returns elements by name when
// querying by getElementById (and provide a workaround)
(function(){
  // We're going to inject a fake input element with a specified name
  var form = document.createElement("div"),
    id = "script" + (new Date()).getTime(),
    root = document.documentElement;

  form.innerHTML = "<a name='" + id + "'/>";

  // Inject it into the root element, check its status, and remove it quickly
  root.insertBefore( form, root.firstChild );

  // The workaround has to do additional checks after a getElementById
  // Which slows things down for other browsers (hence the branching)
  if ( document.getElementById( id ) ) {
    Expr.find.ID = function( match, context, isXML ) {
      if ( typeof context.getElementById !== "undefined" && !isXML ) {
        var m = context.getElementById(match[1]);

        return m ?
          m.id === match[1] || typeof m.getAttributeNode !== "undefined" && m.getAttributeNode("id").nodeValue === match[1] ?
            [m] :
            undefined :
          [];
      }
    };

    Expr.filter.ID = function( elem, match ) {
      var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");

      return elem.nodeType === 1 && node && node.nodeValue === match;
    };
  }

  root.removeChild( form );

  // release memory in IE
  root = form = null;
})();

(function(){
  // Check to see if the browser returns only elements
  // when doing getElementsByTagName("*")

  // Create a fake element
  var div = document.createElement("div");
  div.appendChild( document.createComment("") );

  // Make sure no comments are found
  if ( div.getElementsByTagName("*").length > 0 ) {
    Expr.find.TAG = function( match, context ) {
      var results = context.getElementsByTagName( match[1] );

      // Filter out possible comments
      if ( match[1] === "*" ) {
        var tmp = [];

        for ( var i = 0; results[i]; i++ ) {
          if ( results[i].nodeType === 1 ) {
            tmp.push( results[i] );
          }
        }

        results = tmp;
      }

      return results;
    };
  }

  // Check to see if an attribute returns normalized href attributes
  div.innerHTML = "<a href='#'></a>";

  if ( div.firstChild && typeof div.firstChild.getAttribute !== "undefined" &&
      div.firstChild.getAttribute("href") !== "#" ) {

    Expr.attrHandle.href = function( elem ) {
      return elem.getAttribute( "href", 2 );
    };
  }

  // release memory in IE
  div = null;
})();

if ( document.querySelectorAll ) {
  (function(){
    var oldSizzle = Sizzle,
      div = document.createElement("div"),
      id = "__sizzle__";

    div.innerHTML = "<p class='TEST'></p>";

    // Safari can't handle uppercase or unicode characters when
    // in quirks mode.
    if ( div.querySelectorAll && div.querySelectorAll(".TEST").length === 0 ) {
      return;
    }
  
    Sizzle = function( query, context, extra, seed ) {
      context = context || document;

      // Only use querySelectorAll on non-XML documents
      // (ID selectors don't work in non-HTML documents)
      if ( !seed && !Sizzle.isXML(context) ) {
        // See if we find a selector to speed up
        var match = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec( query );
        
        if ( match && (context.nodeType === 1 || context.nodeType === 9) ) {
          // Speed-up: Sizzle("TAG")
          if ( match[1] ) {
            return makeArray( context.getElementsByTagName( query ), extra );
          
          // Speed-up: Sizzle(".CLASS")
          } else if ( match[2] && Expr.find.CLASS && context.getElementsByClassName ) {
            return makeArray( context.getElementsByClassName( match[2] ), extra );
          }
        }
        
        if ( context.nodeType === 9 ) {
          // Speed-up: Sizzle("body")
          // The body element only exists once, optimize finding it
          if ( query === "body" && context.body ) {
            return makeArray( [ context.body ], extra );
            
          // Speed-up: Sizzle("#ID")
          } else if ( match && match[3] ) {
            var elem = context.getElementById( match[3] );

            // Check parentNode to catch when Blackberry 4.6 returns
            // nodes that are no longer in the document #6963
            if ( elem && elem.parentNode ) {
              // Handle the case where IE and Opera return items
              // by name instead of ID
              if ( elem.id === match[3] ) {
                return makeArray( [ elem ], extra );
              }
              
            } else {
              return makeArray( [], extra );
            }
          }
          
          try {
            return makeArray( context.querySelectorAll(query), extra );
          } catch(qsaError) {}

        // qSA works strangely on Element-rooted queries
        // We can work around this by specifying an extra ID on the root
        // and working up from there (Thanks to Andrew Dupont for the technique)
        // IE 8 doesn't work on object elements
        } else if ( context.nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
          var oldContext = context,
            old = context.getAttribute( "id" ),
            nid = old || id,
            hasParent = context.parentNode,
            relativeHierarchySelector = /^\s*[+~]/.test( query );

          if ( !old ) {
            context.setAttribute( "id", nid );
          } else {
            nid = nid.replace( /'/g, "\\$&" );
          }
          if ( relativeHierarchySelector && hasParent ) {
            context = context.parentNode;
          }

          try {
            if ( !relativeHierarchySelector || hasParent ) {
              return makeArray( context.querySelectorAll( "[id='" + nid + "'] " + query ), extra );
            }

          } catch(pseudoError) {
          } finally {
            if ( !old ) {
              oldContext.removeAttribute( "id" );
            }
          }
        }
      }
    
      return oldSizzle(query, context, extra, seed);
    };

    for ( var prop in oldSizzle ) {
      Sizzle[ prop ] = oldSizzle[ prop ];
    }

    // release memory in IE
    div = null;
  })();
}

(function(){
  var html = document.documentElement,
    matches = html.matchesSelector || html.mozMatchesSelector || html.webkitMatchesSelector || html.msMatchesSelector;

  if ( matches ) {
    // Check to see if it's possible to do matchesSelector
    // on a disconnected node (IE 9 fails this)
    var disconnectedMatch = !matches.call( document.createElement( "div" ), "div" ),
      pseudoWorks = false;

    try {
      // This should fail with an exception
      // Gecko does not error, returns false instead
      matches.call( document.documentElement, "[test!='']:sizzle" );
  
    } catch( pseudoError ) {
      pseudoWorks = true;
    }

    Sizzle.matchesSelector = function( node, expr ) {
      // Make sure that attribute selectors are quoted
      expr = expr.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");

      if ( !Sizzle.isXML( node ) ) {
        try { 
          if ( pseudoWorks || !Expr.match.PSEUDO.test( expr ) && !/!=/.test( expr ) ) {
            var ret = matches.call( node, expr );

            // IE 9's matchesSelector returns false on disconnected nodes
            if ( ret || !disconnectedMatch ||
                // As well, disconnected nodes are said to be in a document
                // fragment in IE 9, so check for that
                node.document && node.document.nodeType !== 11 ) {
              return ret;
            }
          }
        } catch(e) {}
      }

      return Sizzle(expr, null, null, [node]).length > 0;
    };
  }
})();

(function(){
  var div = document.createElement("div");

  div.innerHTML = "<div class='test e'></div><div class='test'></div>";

  // Opera can't find a second classname (in 9.6)
  // Also, make sure that getElementsByClassName actually exists
  if ( !div.getElementsByClassName || div.getElementsByClassName("e").length === 0 ) {
    return;
  }

  // Safari caches class attributes, doesn't catch changes (in 3.2)
  div.lastChild.className = "e";

  if ( div.getElementsByClassName("e").length === 1 ) {
    return;
  }
  
  Expr.order.splice(1, 0, "CLASS");
  Expr.find.CLASS = function( match, context, isXML ) {
    if ( typeof context.getElementsByClassName !== "undefined" && !isXML ) {
      return context.getElementsByClassName(match[1]);
    }
  };

  // release memory in IE
  div = null;
})();

function dirNodeCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
  for ( var i = 0, l = checkSet.length; i < l; i++ ) {
    var elem = checkSet[i];

    if ( elem ) {
      var match = false;

      elem = elem[dir];

      while ( elem ) {
        if ( elem.sizcache === doneName ) {
          match = checkSet[elem.sizset];
          break;
        }

        if ( elem.nodeType === 1 && !isXML ){
          elem.sizcache = doneName;
          elem.sizset = i;
        }

        if ( elem.nodeName.toLowerCase() === cur ) {
          match = elem;
          break;
        }

        elem = elem[dir];
      }

      checkSet[i] = match;
    }
  }
}

function dirCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
  for ( var i = 0, l = checkSet.length; i < l; i++ ) {
    var elem = checkSet[i];

    if ( elem ) {
      var match = false;
      
      elem = elem[dir];

      while ( elem ) {
        if ( elem.sizcache === doneName ) {
          match = checkSet[elem.sizset];
          break;
        }

        if ( elem.nodeType === 1 ) {
          if ( !isXML ) {
            elem.sizcache = doneName;
            elem.sizset = i;
          }

          if ( typeof cur !== "string" ) {
            if ( elem === cur ) {
              match = true;
              break;
            }

          } else if ( Sizzle.filter( cur, [elem] ).length > 0 ) {
            match = elem;
            break;
          }
        }

        elem = elem[dir];
      }

      checkSet[i] = match;
    }
  }
}

if ( document.documentElement.contains ) {
  Sizzle.contains = function( a, b ) {
    return a !== b && (a.contains ? a.contains(b) : true);
  };

} else if ( document.documentElement.compareDocumentPosition ) {
  Sizzle.contains = function( a, b ) {
    return !!(a.compareDocumentPosition(b) & 16);
  };

} else {
  Sizzle.contains = function() {
    return false;
  };
}

Sizzle.isXML = function( elem ) {
  // documentElement is verified for cases where it doesn't yet exist
  // (such as loading iframes in IE - #4833) 
  var documentElement = (elem ? elem.ownerDocument || elem : 0).documentElement;

  return documentElement ? documentElement.nodeName !== "HTML" : false;
};

var posProcess = function( selector, context ) {
  var match,
    tmpSet = [],
    later = "",
    root = context.nodeType ? [context] : context;

  // Position selectors must be done after the filter
  // And so must :not(positional) so we move all PSEUDOs to the end
  while ( (match = Expr.match.PSEUDO.exec( selector )) ) {
    later += match[0];
    selector = selector.replace( Expr.match.PSEUDO, "" );
  }

  selector = Expr.relative[selector] ? selector + "*" : selector;

  for ( var i = 0, l = root.length; i < l; i++ ) {
    Sizzle( selector, root[i], tmpSet );
  }

  return Sizzle.filter( later, tmpSet );
};

// EXPOSE
jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.filters;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;


})();


var runtil = /Until$/,
  rparentsprev = /^(?:parents|prevUntil|prevAll)/,
  // Note: This RegExp should be improved, or likely pulled from Sizzle
  rmultiselector = /,/,
  isSimple = /^.[^:#\[\.,]*$/,
  slice = Array.prototype.slice,
  POS = jQuery.expr.match.POS,
  // methods guaranteed to produce a unique set when starting from a unique set
  guaranteedUnique = {
    children: true,
    contents: true,
    next: true,
    prev: true
  };

jQuery.fn.extend({
  find: function( selector ) {
    var ret = this.pushStack( "", "find", selector ),
      length = 0;

    for ( var i = 0, l = this.length; i < l; i++ ) {
      length = ret.length;
      jQuery.find( selector, this[i], ret );

      if ( i > 0 ) {
        // Make sure that the results are unique
        for ( var n = length; n < ret.length; n++ ) {
          for ( var r = 0; r < length; r++ ) {
            if ( ret[r] === ret[n] ) {
              ret.splice(n--, 1);
              break;
            }
          }
        }
      }
    }

    return ret;
  },

  has: function( target ) {
    var targets = jQuery( target );
    return this.filter(function() {
      for ( var i = 0, l = targets.length; i < l; i++ ) {
        if ( jQuery.contains( this, targets[i] ) ) {
          return true;
        }
      }
    });
  },

  not: function( selector ) {
    return this.pushStack( winnow(this, selector, false), "not", selector);
  },

  filter: function( selector ) {
    return this.pushStack( winnow(this, selector, true), "filter", selector );
  },

  is: function( selector ) {
    return !!selector && jQuery.filter( selector, this ).length > 0;
  },

  closest: function( selectors, context ) {
    var ret = [], i, l, cur = this[0];

    if ( jQuery.isArray( selectors ) ) {
      var match, selector,
        matches = {},
        level = 1;

      if ( cur && selectors.length ) {
        for ( i = 0, l = selectors.length; i < l; i++ ) {
          selector = selectors[i];

          if ( !matches[selector] ) {
            matches[selector] = jQuery.expr.match.POS.test( selector ) ?
              jQuery( selector, context || this.context ) :
              selector;
          }
        }

        while ( cur && cur.ownerDocument && cur !== context ) {
          for ( selector in matches ) {
            match = matches[selector];

            if ( match.jquery ? match.index(cur) > -1 : jQuery(cur).is(match) ) {
              ret.push({ selector: selector, elem: cur, level: level });
            }
          }

          cur = cur.parentNode;
          level++;
        }
      }

      return ret;
    }

    var pos = POS.test( selectors ) ?
      jQuery( selectors, context || this.context ) : null;

    for ( i = 0, l = this.length; i < l; i++ ) {
      cur = this[i];

      while ( cur ) {
        if ( pos ? pos.index(cur) > -1 : jQuery.find.matchesSelector(cur, selectors) ) {
          ret.push( cur );
          break;

        } else {
          cur = cur.parentNode;
          if ( !cur || !cur.ownerDocument || cur === context ) {
            break;
          }
        }
      }
    }

    ret = ret.length > 1 ? jQuery.unique(ret) : ret;

    return this.pushStack( ret, "closest", selectors );
  },

  // Determine the position of an element within
  // the matched set of elements
  index: function( elem ) {
    if ( !elem || typeof elem === "string" ) {
      return jQuery.inArray( this[0],
        // If it receives a string, the selector is used
        // If it receives nothing, the siblings are used
        elem ? jQuery( elem ) : this.parent().children() );
    }
    // Locate the position of the desired element
    return jQuery.inArray(
      // If it receives a jQuery object, the first element is used
      elem.jquery ? elem[0] : elem, this );
  },

  add: function( selector, context ) {
    var set = typeof selector === "string" ?
        jQuery( selector, context ) :
        jQuery.makeArray( selector ),
      all = jQuery.merge( this.get(), set );

    return this.pushStack( isDisconnected( set[0] ) || isDisconnected( all[0] ) ?
      all :
      jQuery.unique( all ) );
  },

  andSelf: function() {
    return this.add( this.prevObject );
  }
});

// A painfully simple check to see if an element is disconnected
// from a document (should be improved, where feasible).
function isDisconnected( node ) {
  return !node || !node.parentNode || node.parentNode.nodeType === 11;
}

jQuery.each({
  parent: function( elem ) {
    var parent = elem.parentNode;
    return parent && parent.nodeType !== 11 ? parent : null;
  },
  parents: function( elem ) {
    return jQuery.dir( elem, "parentNode" );
  },
  parentsUntil: function( elem, i, until ) {
    return jQuery.dir( elem, "parentNode", until );
  },
  next: function( elem ) {
    return jQuery.nth( elem, 2, "nextSibling" );
  },
  prev: function( elem ) {
    return jQuery.nth( elem, 2, "previousSibling" );
  },
  nextAll: function( elem ) {
    return jQuery.dir( elem, "nextSibling" );
  },
  prevAll: function( elem ) {
    return jQuery.dir( elem, "previousSibling" );
  },
  nextUntil: function( elem, i, until ) {
    return jQuery.dir( elem, "nextSibling", until );
  },
  prevUntil: function( elem, i, until ) {
    return jQuery.dir( elem, "previousSibling", until );
  },
  siblings: function( elem ) {
    return jQuery.sibling( elem.parentNode.firstChild, elem );
  },
  children: function( elem ) {
    return jQuery.sibling( elem.firstChild );
  },
  contents: function( elem ) {
    return jQuery.nodeName( elem, "iframe" ) ?
      elem.contentDocument || elem.contentWindow.document :
      jQuery.makeArray( elem.childNodes );
  }
}, function( name, fn ) {
  jQuery.fn[ name ] = function( until, selector ) {
    var ret = jQuery.map( this, fn, until ),
      // The variable 'args' was introduced in
      // https://github.com/jquery/jquery/commit/52a0238
      // to work around a bug in Chrome 10 (Dev) and should be removed when the bug is fixed.
      // http://code.google.com/p/v8/issues/detail?id=1050
      args = slice.call(arguments);

    if ( !runtil.test( name ) ) {
      selector = until;
    }

    if ( selector && typeof selector === "string" ) {
      ret = jQuery.filter( selector, ret );
    }

    ret = this.length > 1 && !guaranteedUnique[ name ] ? jQuery.unique( ret ) : ret;

    if ( (this.length > 1 || rmultiselector.test( selector )) && rparentsprev.test( name ) ) {
      ret = ret.reverse();
    }

    return this.pushStack( ret, name, args.join(",") );
  };
});

jQuery.extend({
  filter: function( expr, elems, not ) {
    if ( not ) {
      expr = ":not(" + expr + ")";
    }

    return elems.length === 1 ?
      jQuery.find.matchesSelector(elems[0], expr) ? [ elems[0] ] : [] :
      jQuery.find.matches(expr, elems);
  },

  dir: function( elem, dir, until ) {
    var matched = [],
      cur = elem[ dir ];

    while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
      if ( cur.nodeType === 1 ) {
        matched.push( cur );
      }
      cur = cur[dir];
    }
    return matched;
  },

  nth: function( cur, result, dir, elem ) {
    result = result || 1;
    var num = 0;

    for ( ; cur; cur = cur[dir] ) {
      if ( cur.nodeType === 1 && ++num === result ) {
        break;
      }
    }

    return cur;
  },

  sibling: function( n, elem ) {
    var r = [];

    for ( ; n; n = n.nextSibling ) {
      if ( n.nodeType === 1 && n !== elem ) {
        r.push( n );
      }
    }

    return r;
  }
});

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, keep ) {
  if ( jQuery.isFunction( qualifier ) ) {
    return jQuery.grep(elements, function( elem, i ) {
      var retVal = !!qualifier.call( elem, i, elem );
      return retVal === keep;
    });

  } else if ( qualifier.nodeType ) {
    return jQuery.grep(elements, function( elem, i ) {
      return (elem === qualifier) === keep;
    });

  } else if ( typeof qualifier === "string" ) {
    var filtered = jQuery.grep(elements, function( elem ) {
      return elem.nodeType === 1;
    });

    if ( isSimple.test( qualifier ) ) {
      return jQuery.filter(qualifier, filtered, !keep);
    } else {
      qualifier = jQuery.filter( qualifier, filtered );
    }
  }

  return jQuery.grep(elements, function( elem, i ) {
    return (jQuery.inArray( elem, qualifier ) >= 0) === keep;
  });
}




var rinlinejQuery = / jQuery\d+="(?:\d+|null)"/g,
  rleadingWhitespace = /^\s+/,
  rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
  rtagName = /<([\w:]+)/,
  rtbody = /<tbody/i,
  rhtml = /<|&#?\w+;/,
  rnocache = /<(?:script|object|embed|option|style)/i,
  // checked="checked" or checked
  rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
  wrapMap = {
    option: [ 1, "<select multiple='multiple'>", "</select>" ],
    legend: [ 1, "<fieldset>", "</fieldset>" ],
    thead: [ 1, "<table>", "</table>" ],
    tr: [ 2, "<table><tbody>", "</tbody></table>" ],
    td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
    col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
    area: [ 1, "<map>", "</map>" ],
    _default: [ 0, "", "" ]
  };

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// IE can't serialize <link> and <script> tags normally
if ( !jQuery.support.htmlSerialize ) {
  wrapMap._default = [ 1, "div<div>", "</div>" ];
}

jQuery.fn.extend({
  text: function( text ) {
    if ( jQuery.isFunction(text) ) {
      return this.each(function(i) {
        var self = jQuery( this );

        self.text( text.call(this, i, self.text()) );
      });
    }

    if ( typeof text !== "object" && text !== undefined ) {
      return this.empty().append( (this[0] && this[0].ownerDocument || document).createTextNode( text ) );
    }

    return jQuery.text( this );
  },

  wrapAll: function( html ) {
    if ( jQuery.isFunction( html ) ) {
      return this.each(function(i) {
        jQuery(this).wrapAll( html.call(this, i) );
      });
    }

    if ( this[0] ) {
      // The elements to wrap the target around
      var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

      if ( this[0].parentNode ) {
        wrap.insertBefore( this[0] );
      }

      wrap.map(function() {
        var elem = this;

        while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
          elem = elem.firstChild;
        }

        return elem;
      }).append(this);
    }

    return this;
  },

  wrapInner: function( html ) {
    if ( jQuery.isFunction( html ) ) {
      return this.each(function(i) {
        jQuery(this).wrapInner( html.call(this, i) );
      });
    }

    return this.each(function() {
      var self = jQuery( this ),
        contents = self.contents();

      if ( contents.length ) {
        contents.wrapAll( html );

      } else {
        self.append( html );
      }
    });
  },

  wrap: function( html ) {
    return this.each(function() {
      jQuery( this ).wrapAll( html );
    });
  },

  unwrap: function() {
    return this.parent().each(function() {
      if ( !jQuery.nodeName( this, "body" ) ) {
        jQuery( this ).replaceWith( this.childNodes );
      }
    }).end();
  },

  append: function() {
    return this.domManip(arguments, true, function( elem ) {
      if ( this.nodeType === 1 ) {
        this.appendChild( elem );
      }
    });
  },

  prepend: function() {
    return this.domManip(arguments, true, function( elem ) {
      if ( this.nodeType === 1 ) {
        this.insertBefore( elem, this.firstChild );
      }
    });
  },

  before: function() {
    if ( this[0] && this[0].parentNode ) {
      return this.domManip(arguments, false, function( elem ) {
        this.parentNode.insertBefore( elem, this );
      });
    } else if ( arguments.length ) {
      var set = jQuery(arguments[0]);
      set.push.apply( set, this.toArray() );
      return this.pushStack( set, "before", arguments );
    }
  },

  after: function() {
    if ( this[0] && this[0].parentNode ) {
      return this.domManip(arguments, false, function( elem ) {
        this.parentNode.insertBefore( elem, this.nextSibling );
      });
    } else if ( arguments.length ) {
      var set = this.pushStack( this, "after", arguments );
      set.push.apply( set, jQuery(arguments[0]).toArray() );
      return set;
    }
  },

  // keepData is for internal use only--do not document
  remove: function( selector, keepData ) {
    for ( var i = 0, elem; (elem = this[i]) != null; i++ ) {
      if ( !selector || jQuery.filter( selector, [ elem ] ).length ) {
        if ( !keepData && elem.nodeType === 1 ) {
          jQuery.cleanData( elem.getElementsByTagName("*") );
          jQuery.cleanData( [ elem ] );
        }

        if ( elem.parentNode ) {
          elem.parentNode.removeChild( elem );
        }
      }
    }

    return this;
  },

  empty: function() {
    for ( var i = 0, elem; (elem = this[i]) != null; i++ ) {
      // Remove element nodes and prevent memory leaks
      if ( elem.nodeType === 1 ) {
        jQuery.cleanData( elem.getElementsByTagName("*") );
      }

      // Remove any remaining nodes
      while ( elem.firstChild ) {
        elem.removeChild( elem.firstChild );
      }
    }

    return this;
  },

  clone: function( dataAndEvents, deepDataAndEvents ) {
    dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
    deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

    return this.map( function () {
      return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
    });
  },

  html: function( value ) {
    if ( value === undefined ) {
      return this[0] && this[0].nodeType === 1 ?
        this[0].innerHTML.replace(rinlinejQuery, "") :
        null;

    // See if we can take a shortcut and just use innerHTML
    } else if ( typeof value === "string" && !rnocache.test( value ) &&
      (jQuery.support.leadingWhitespace || !rleadingWhitespace.test( value )) &&
      !wrapMap[ (rtagName.exec( value ) || ["", ""])[1].toLowerCase() ] ) {

      value = value.replace(rxhtmlTag, "<$1></$2>");

      try {
        for ( var i = 0, l = this.length; i < l; i++ ) {
          // Remove element nodes and prevent memory leaks
          if ( this[i].nodeType === 1 ) {
            jQuery.cleanData( this[i].getElementsByTagName("*") );
            this[i].innerHTML = value;
          }
        }

      // If using innerHTML throws an exception, use the fallback method
      } catch(e) {
        this.empty().append( value );
      }

    } else if ( jQuery.isFunction( value ) ) {
      this.each(function(i){
        var self = jQuery( this );

        self.html( value.call(this, i, self.html()) );
      });

    } else {
      this.empty().append( value );
    }

    return this;
  },

  replaceWith: function( value ) {
    if ( this[0] && this[0].parentNode ) {
      // Make sure that the elements are removed from the DOM before they are inserted
      // this can help fix replacing a parent with child elements
      if ( jQuery.isFunction( value ) ) {
        return this.each(function(i) {
          var self = jQuery(this), old = self.html();
          self.replaceWith( value.call( this, i, old ) );
        });
      }

      if ( typeof value !== "string" ) {
        value = jQuery( value ).detach();
      }

      return this.each(function() {
        var next = this.nextSibling,
          parent = this.parentNode;

        jQuery( this ).remove();

        if ( next ) {
          jQuery(next).before( value );
        } else {
          jQuery(parent).append( value );
        }
      });
    } else {
      return this.length ?
        this.pushStack( jQuery(jQuery.isFunction(value) ? value() : value), "replaceWith", value ) :
        this;
    }
  },

  detach: function( selector ) {
    return this.remove( selector, true );
  },

  domManip: function( args, table, callback ) {
    var results, first, fragment, parent,
      value = args[0],
      scripts = [];

    // We can't cloneNode fragments that contain checked, in WebKit
    if ( !jQuery.support.checkClone && arguments.length === 3 && typeof value === "string" && rchecked.test( value ) ) {
      return this.each(function() {
        jQuery(this).domManip( args, table, callback, true );
      });
    }

    if ( jQuery.isFunction(value) ) {
      return this.each(function(i) {
        var self = jQuery(this);
        args[0] = value.call(this, i, table ? self.html() : undefined);
        self.domManip( args, table, callback );
      });
    }

    if ( this[0] ) {
      parent = value && value.parentNode;

      // If we're in a fragment, just use that instead of building a new one
      if ( jQuery.support.parentNode && parent && parent.nodeType === 11 && parent.childNodes.length === this.length ) {
        results = { fragment: parent };

      } else {
        results = jQuery.buildFragment( args, this, scripts );
      }

      fragment = results.fragment;

      if ( fragment.childNodes.length === 1 ) {
        first = fragment = fragment.firstChild;
      } else {
        first = fragment.firstChild;
      }

      if ( first ) {
        table = table && jQuery.nodeName( first, "tr" );

        for ( var i = 0, l = this.length, lastIndex = l - 1; i < l; i++ ) {
          callback.call(
            table ?
              root(this[i], first) :
              this[i],
            // Make sure that we do not leak memory by inadvertently discarding
            // the original fragment (which might have attached data) instead of
            // using it; in addition, use the original fragment object for the last
            // item instead of first because it can end up being emptied incorrectly
            // in certain situations (Bug #8070).
            // Fragments from the fragment cache must always be cloned and never used
            // in place.
            results.cacheable || (l > 1 && i < lastIndex) ?
              jQuery.clone( fragment, true, true ) :
              fragment
          );
        }
      }

      if ( scripts.length ) {
        jQuery.each( scripts, evalScript );
      }
    }

    return this;
  }
});

function root( elem, cur ) {
  return jQuery.nodeName(elem, "table") ?
    (elem.getElementsByTagName("tbody")[0] ||
    elem.appendChild(elem.ownerDocument.createElement("tbody"))) :
    elem;
}

function cloneCopyEvent( src, dest ) {

  if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
    return;
  }

  var internalKey = jQuery.expando,
    oldData = jQuery.data( src ),
    curData = jQuery.data( dest, oldData );

  // Switch to use the internal data object, if it exists, for the next
  // stage of data copying
  if ( (oldData = oldData[ internalKey ]) ) {
    var events = oldData.events;
        curData = curData[ internalKey ] = jQuery.extend({}, oldData);

    if ( events ) {
      delete curData.handle;
      curData.events = {};

      for ( var type in events ) {
        for ( var i = 0, l = events[ type ].length; i < l; i++ ) {
          jQuery.event.add( dest, type + ( events[ type ][ i ].namespace ? "." : "" ) + events[ type ][ i ].namespace, events[ type ][ i ], events[ type ][ i ].data );
        }
      }
    }
  }
}

function cloneFixAttributes(src, dest) {
  // We do not need to do anything for non-Elements
  if ( dest.nodeType !== 1 ) {
    return;
  }

  var nodeName = dest.nodeName.toLowerCase();

  // clearAttributes removes the attributes, which we don't want,
  // but also removes the attachEvent events, which we *do* want
  dest.clearAttributes();

  // mergeAttributes, in contrast, only merges back on the
  // original attributes, not the events
  dest.mergeAttributes(src);

  // IE6-8 fail to clone children inside object elements that use
  // the proprietary classid attribute value (rather than the type
  // attribute) to identify the type of content to display
  if ( nodeName === "object" ) {
    dest.outerHTML = src.outerHTML;

  } else if ( nodeName === "input" && (src.type === "checkbox" || src.type === "radio") ) {
    // IE6-8 fails to persist the checked state of a cloned checkbox
    // or radio button. Worse, IE6-7 fail to give the cloned element
    // a checked appearance if the defaultChecked value isn't also set
    if ( src.checked ) {
      dest.defaultChecked = dest.checked = src.checked;
    }

    // IE6-7 get confused and end up setting the value of a cloned
    // checkbox/radio button to an empty string instead of "on"
    if ( dest.value !== src.value ) {
      dest.value = src.value;
    }

  // IE6-8 fails to return the selected option to the default selected
  // state when cloning options
  } else if ( nodeName === "option" ) {
    dest.selected = src.defaultSelected;

  // IE6-8 fails to set the defaultValue to the correct value when
  // cloning other types of input fields
  } else if ( nodeName === "input" || nodeName === "textarea" ) {
    dest.defaultValue = src.defaultValue;
  }

  // Event data gets referenced instead of copied if the expando
  // gets copied too
  dest.removeAttribute( jQuery.expando );
}

jQuery.buildFragment = function( args, nodes, scripts ) {
  var fragment, cacheable, cacheresults,
    doc = (nodes && nodes[0] ? nodes[0].ownerDocument || nodes[0] : document);

  // Only cache "small" (1/2 KB) HTML strings that are associated with the main document
  // Cloning options loses the selected state, so don't cache them
  // IE 6 doesn't like it when you put <object> or <embed> elements in a fragment
  // Also, WebKit does not clone 'checked' attributes on cloneNode, so don't cache
  if ( args.length === 1 && typeof args[0] === "string" && args[0].length < 512 && doc === document &&
    args[0].charAt(0) === "<" && !rnocache.test( args[0] ) && (jQuery.support.checkClone || !rchecked.test( args[0] )) ) {

    cacheable = true;
    cacheresults = jQuery.fragments[ args[0] ];
    if ( cacheresults ) {
      if ( cacheresults !== 1 ) {
        fragment = cacheresults;
      }
    }
  }

  if ( !fragment ) {
    fragment = doc.createDocumentFragment();
    jQuery.clean( args, doc, fragment, scripts );
  }

  if ( cacheable ) {
    jQuery.fragments[ args[0] ] = cacheresults ? fragment : 1;
  }

  return { fragment: fragment, cacheable: cacheable };
};

jQuery.fragments = {};

jQuery.each({
  appendTo: "append",
  prependTo: "prepend",
  insertBefore: "before",
  insertAfter: "after",
  replaceAll: "replaceWith"
}, function( name, original ) {
  jQuery.fn[ name ] = function( selector ) {
    var ret = [],
      insert = jQuery( selector ),
      parent = this.length === 1 && this[0].parentNode;

    if ( parent && parent.nodeType === 11 && parent.childNodes.length === 1 && insert.length === 1 ) {
      insert[ original ]( this[0] );
      return this;

    } else {
      for ( var i = 0, l = insert.length; i < l; i++ ) {
        var elems = (i > 0 ? this.clone(true) : this).get();
        jQuery( insert[i] )[ original ]( elems );
        ret = ret.concat( elems );
      }

      return this.pushStack( ret, name, insert.selector );
    }
  };
});

function getAll( elem ) {
  if ( "getElementsByTagName" in elem ) {
    return elem.getElementsByTagName( "*" );
  
  } else if ( "querySelectorAll" in elem ) {
    return elem.querySelectorAll( "*" );

  } else {
    return [];
  }
}

jQuery.extend({
  clone: function( elem, dataAndEvents, deepDataAndEvents ) {
    var clone = elem.cloneNode(true),
        srcElements,
        destElements,
        i;

    if ( (!jQuery.support.noCloneEvent || !jQuery.support.noCloneChecked) &&
        (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {
      // IE copies events bound via attachEvent when using cloneNode.
      // Calling detachEvent on the clone will also remove the events
      // from the original. In order to get around this, we use some
      // proprietary methods to clear the events. Thanks to MooTools
      // guys for this hotness.

      cloneFixAttributes( elem, clone );

      // Using Sizzle here is crazy slow, so we use getElementsByTagName
      // instead
      srcElements = getAll( elem );
      destElements = getAll( clone );

      // Weird iteration because IE will replace the length property
      // with an element if you are cloning the body and one of the
      // elements on the page has a name or id of "length"
      for ( i = 0; srcElements[i]; ++i ) {
        cloneFixAttributes( srcElements[i], destElements[i] );
      }
    }

    // Copy the events from the original to the clone
    if ( dataAndEvents ) {
      cloneCopyEvent( elem, clone );

      if ( deepDataAndEvents ) {
        srcElements = getAll( elem );
        destElements = getAll( clone );

        for ( i = 0; srcElements[i]; ++i ) {
          cloneCopyEvent( srcElements[i], destElements[i] );
        }
      }
    }

    // Return the cloned set
    return clone;
},
  clean: function( elems, context, fragment, scripts ) {
    context = context || document;

    // !context.createElement fails in IE with an error but returns typeof 'object'
    if ( typeof context.createElement === "undefined" ) {
      context = context.ownerDocument || context[0] && context[0].ownerDocument || document;
    }

    var ret = [];

    for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) {
      if ( typeof elem === "number" ) {
        elem += "";
      }

      if ( !elem ) {
        continue;
      }

      // Convert html string into DOM nodes
      if ( typeof elem === "string" && !rhtml.test( elem ) ) {
        elem = context.createTextNode( elem );

      } else if ( typeof elem === "string" ) {
        // Fix "XHTML"-style tags in all browsers
        elem = elem.replace(rxhtmlTag, "<$1></$2>");

        // Trim whitespace, otherwise indexOf won't work as expected
        var tag = (rtagName.exec( elem ) || ["", ""])[1].toLowerCase(),
          wrap = wrapMap[ tag ] || wrapMap._default,
          depth = wrap[0],
          div = context.createElement("div");

        // Go to html and back, then peel off extra wrappers
        div.innerHTML = wrap[1] + elem + wrap[2];

        // Move to the right depth
        while ( depth-- ) {
          div = div.lastChild;
        }

        // Remove IE's autoinserted <tbody> from table fragments
        if ( !jQuery.support.tbody ) {

          // String was a <table>, *may* have spurious <tbody>
          var hasBody = rtbody.test(elem),
            tbody = tag === "table" && !hasBody ?
              div.firstChild && div.firstChild.childNodes :

              // String was a bare <thead> or <tfoot>
              wrap[1] === "<table>" && !hasBody ?
                div.childNodes :
                [];

          for ( var j = tbody.length - 1; j >= 0 ; --j ) {
            if ( jQuery.nodeName( tbody[ j ], "tbody" ) && !tbody[ j ].childNodes.length ) {
              tbody[ j ].parentNode.removeChild( tbody[ j ] );
            }
          }

        }

        // IE completely kills leading whitespace when innerHTML is used
        if ( !jQuery.support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
          div.insertBefore( context.createTextNode( rleadingWhitespace.exec(elem)[0] ), div.firstChild );
        }

        elem = div.childNodes;
      }

      if ( elem.nodeType ) {
        ret.push( elem );
      } else {
        ret = jQuery.merge( ret, elem );
      }
    }

    if ( fragment ) {
      for ( i = 0; ret[i]; i++ ) {
        if ( scripts && jQuery.nodeName( ret[i], "script" ) && (!ret[i].type || ret[i].type.toLowerCase() === "text/javascript") ) {
          scripts.push( ret[i].parentNode ? ret[i].parentNode.removeChild( ret[i] ) : ret[i] );

        } else {
          if ( ret[i].nodeType === 1 ) {
            ret.splice.apply( ret, [i + 1, 0].concat(jQuery.makeArray(ret[i].getElementsByTagName("script"))) );
          }
          fragment.appendChild( ret[i] );
        }
      }
    }

    return ret;
  },

  cleanData: function( elems ) {
    var data, id, cache = jQuery.cache, internalKey = jQuery.expando, special = jQuery.event.special,
      deleteExpando = jQuery.support.deleteExpando;

    for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) {
      if ( elem.nodeName && jQuery.noData[elem.nodeName.toLowerCase()] ) {
        continue;
      }

      id = elem[ jQuery.expando ];

      if ( id ) {
        try {
          data = cache[ id ] && cache[ id ][ internalKey ];
        } catch (e) {}
        
        if ( data && data.events ) {
          for ( var type in data.events ) {
            if ( special[ type ] ) {
              jQuery.event.remove( elem, type );

            // This is a shortcut to avoid jQuery.event.remove's overhead
            } else {
              jQuery.removeEvent( elem, type, data.handle );
            }
          }

          // Null the DOM reference to avoid IE6/7/8 leak (#7054)
          if ( data.handle ) {
            data.handle.elem = null;
          }
        }

        if ( deleteExpando ) {
          delete elem[ jQuery.expando ];

        } else if ( elem.removeAttribute ) {
          elem.removeAttribute( jQuery.expando );
        }

        delete cache[ id ];
      }
    }
  }
});

function evalScript( i, elem ) {
  if ( elem.src ) {
    jQuery.ajax({
      url: elem.src,
      async: false,
      dataType: "script"
    });
  } else {
    jQuery.globalEval( elem.text || elem.textContent || elem.innerHTML || "" );
  }

  if ( elem.parentNode ) {
    elem.parentNode.removeChild( elem );
  }
}




var ralpha = /alpha\([^)]*\)/i,
  ropacity = /opacity=([^)]*)/,
  rdashAlpha = /-([a-z])/ig,
  // fixed for IE9, see #8346
  rupper = /([A-Z]|^ms)/g,
  rnumpx = /^-?\d+(?:px)?$/i,
  rnum = /^-?\d/,

  cssShow = { position: "absolute", visibility: "hidden", display: "block" },
  cssWidth = [ "Left", "Right" ],
  cssHeight = [ "Top", "Bottom" ],
  curCSS,

  getComputedStyle,
  currentStyle,

  fcamelCase = function( all, letter ) {
    return letter.toUpperCase();
  };

jQuery.fn.css = function( name, value ) {
  // Setting 'undefined' is a no-op
  if ( arguments.length === 2 && value === undefined ) {
    return this;
  }

  return jQuery.access( this, name, value, true, function( elem, name, value ) {
    return value !== undefined ?
      jQuery.style( elem, name, value ) :
      jQuery.css( elem, name );
  });
};

jQuery.extend({
  // Add in style property hooks for overriding the default
  // behavior of getting and setting a style property
  cssHooks: {
    opacity: {
      get: function( elem, computed ) {
        if ( computed ) {
          // We should always get a number back from opacity
          var ret = curCSS( elem, "opacity", "opacity" );
          return ret === "" ? "1" : ret;

        } else {
          return elem.style.opacity;
        }
      }
    }
  },

  // Exclude the following css properties to add px
  cssNumber: {
    "zIndex": true,
    "fontWeight": true,
    "opacity": true,
    "zoom": true,
    "lineHeight": true
  },

  // Add in properties whose names you wish to fix before
  // setting or getting the value
  cssProps: {
    // normalize float css property
    "float": jQuery.support.cssFloat ? "cssFloat" : "styleFloat"
  },

  // Get and set the style property on a DOM Node
  style: function( elem, name, value, extra ) {
    // Don't set styles on text and comment nodes
    if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
      return;
    }

    // Make sure that we're working with the right name
    var ret, origName = jQuery.camelCase( name ),
      style = elem.style, hooks = jQuery.cssHooks[ origName ];

    name = jQuery.cssProps[ origName ] || origName;

    // Check if we're setting a value
    if ( value !== undefined ) {
      // Make sure that NaN and null values aren't set. See: #7116
      if ( typeof value === "number" && isNaN( value ) || value == null ) {
        return;
      }

      // If a number was passed in, add 'px' to the (except for certain CSS properties)
      if ( typeof value === "number" && !jQuery.cssNumber[ origName ] ) {
        value += "px";
      }

      // If a hook was provided, use that value, otherwise just set the specified value
      if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value )) !== undefined ) {
        // Wrapped to prevent IE from throwing errors when 'invalid' values are provided
        // Fixes bug #5509
        try {
          style[ name ] = value;
        } catch(e) {}
      }

    } else {
      // If a hook was provided get the non-computed value from there
      if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
        return ret;
      }

      // Otherwise just get the value from the style object
      return style[ name ];
    }
  },

  css: function( elem, name, extra ) {
    // Make sure that we're working with the right name
    var ret, origName = jQuery.camelCase( name ),
      hooks = jQuery.cssHooks[ origName ];

    name = jQuery.cssProps[ origName ] || origName;

    // If a hook was provided get the computed value from there
    if ( hooks && "get" in hooks && (ret = hooks.get( elem, true, extra )) !== undefined ) {
      return ret;

    // Otherwise, if a way to get the computed value exists, use that
    } else if ( curCSS ) {
      return curCSS( elem, name, origName );
    }
  },

  // A method for quickly swapping in/out CSS properties to get correct calculations
  swap: function( elem, options, callback ) {
    var old = {};

    // Remember the old values, and insert the new ones
    for ( var name in options ) {
      old[ name ] = elem.style[ name ];
      elem.style[ name ] = options[ name ];
    }

    callback.call( elem );

    // Revert the old values
    for ( name in options ) {
      elem.style[ name ] = old[ name ];
    }
  },

  camelCase: function( string ) {
    return string.replace( rdashAlpha, fcamelCase );
  }
});

// DEPRECATED, Use jQuery.css() instead
jQuery.curCSS = jQuery.css;

jQuery.each(["height", "width"], function( i, name ) {
  jQuery.cssHooks[ name ] = {
    get: function( elem, computed, extra ) {
      var val;

      if ( computed ) {
        if ( elem.offsetWidth !== 0 ) {
          val = getWH( elem, name, extra );

        } else {
          jQuery.swap( elem, cssShow, function() {
            val = getWH( elem, name, extra );
          });
        }

        if ( val <= 0 ) {
          val = curCSS( elem, name, name );

          if ( val === "0px" && currentStyle ) {
            val = currentStyle( elem, name, name );
          }

          if ( val != null ) {
            // Should return "auto" instead of 0, use 0 for
            // temporary backwards-compat
            return val === "" || val === "auto" ? "0px" : val;
          }
        }

        if ( val < 0 || val == null ) {
          val = elem.style[ name ];

          // Should return "auto" instead of 0, use 0 for
          // temporary backwards-compat
          return val === "" || val === "auto" ? "0px" : val;
        }

        return typeof val === "string" ? val : val + "px";
      }
    },

    set: function( elem, value ) {
      if ( rnumpx.test( value ) ) {
        // ignore negative width and height values #1599
        value = parseFloat(value);

        if ( value >= 0 ) {
          return value + "px";
        }

      } else {
        return value;
      }
    }
  };
});

if ( !jQuery.support.opacity ) {
  jQuery.cssHooks.opacity = {
    get: function( elem, computed ) {
      // IE uses filters for opacity
      return ropacity.test((computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "") ?
        (parseFloat(RegExp.$1) / 100) + "" :
        computed ? "1" : "";
    },

    set: function( elem, value ) {
      var style = elem.style;

      // IE has trouble with opacity if it does not have layout
      // Force it by setting the zoom level
      style.zoom = 1;

      // Set the alpha filter to set the opacity
      var opacity = jQuery.isNaN(value) ?
        "" :
        "alpha(opacity=" + value * 100 + ")",
        filter = style.filter || "";

      style.filter = ralpha.test(filter) ?
        filter.replace(ralpha, opacity) :
        style.filter + ' ' + opacity;
    }
  };
}

jQuery(function() {
  // This hook cannot be added until DOM ready because the support test
  // for it is not run until after DOM ready
  if ( !jQuery.support.reliableMarginRight ) {
    jQuery.cssHooks.marginRight = {
      get: function( elem, computed ) {
        // WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
        // Work around by temporarily setting element display to inline-block
        var ret;
        jQuery.swap( elem, { "display": "inline-block" }, function() {
          if ( computed ) {
            ret = curCSS( elem, "margin-right", "marginRight" );
          } else {
            ret = elem.style.marginRight;
          }
        });
        return ret;
      }
    };
  }
});

if ( document.defaultView && document.defaultView.getComputedStyle ) {
  getComputedStyle = function( elem, newName, name ) {
    var ret, defaultView, computedStyle;

    name = name.replace( rupper, "-$1" ).toLowerCase();

    if ( !(defaultView = elem.ownerDocument.defaultView) ) {
      return undefined;
    }

    if ( (computedStyle = defaultView.getComputedStyle( elem, null )) ) {
      ret = computedStyle.getPropertyValue( name );
      if ( ret === "" && !jQuery.contains( elem.ownerDocument.documentElement, elem ) ) {
        ret = jQuery.style( elem, name );
      }
    }

    return ret;
  };
}

if ( document.documentElement.currentStyle ) {
  currentStyle = function( elem, name ) {
    var left,
      ret = elem.currentStyle && elem.currentStyle[ name ],
      rsLeft = elem.runtimeStyle && elem.runtimeStyle[ name ],
      style = elem.style;

    // From the awesome hack by Dean Edwards
    // http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

    // If we're not dealing with a regular pixel number
    // but a number that has a weird ending, we need to convert it to pixels
    if ( !rnumpx.test( ret ) && rnum.test( ret ) ) {
      // Remember the original values
      left = style.left;

      // Put in the new values to get a computed value out
      if ( rsLeft ) {
        elem.runtimeStyle.left = elem.currentStyle.left;
      }
      style.left = name === "fontSize" ? "1em" : (ret || 0);
      ret = style.pixelLeft + "px";

      // Revert the changed values
      style.left = left;
      if ( rsLeft ) {
        elem.runtimeStyle.left = rsLeft;
      }
    }

    return ret === "" ? "auto" : ret;
  };
}

curCSS = getComputedStyle || currentStyle;

function getWH( elem, name, extra ) {
  var which = name === "width" ? cssWidth : cssHeight,
    val = name === "width" ? elem.offsetWidth : elem.offsetHeight;

  if ( extra === "border" ) {
    return val;
  }

  jQuery.each( which, function() {
    if ( !extra ) {
      val -= parseFloat(jQuery.css( elem, "padding" + this )) || 0;
    }

    if ( extra === "margin" ) {
      val += parseFloat(jQuery.css( elem, "margin" + this )) || 0;

    } else {
      val -= parseFloat(jQuery.css( elem, "border" + this + "Width" )) || 0;
    }
  });

  return val;
}

if ( jQuery.expr && jQuery.expr.filters ) {
  jQuery.expr.filters.hidden = function( elem ) {
    var width = elem.offsetWidth,
      height = elem.offsetHeight;

    return (width === 0 && height === 0) || (!jQuery.support.reliableHiddenOffsets && (elem.style.display || jQuery.css( elem, "display" )) === "none");
  };

  jQuery.expr.filters.visible = function( elem ) {
    return !jQuery.expr.filters.hidden( elem );
  };
}




var r20 = /%20/g,
  rbracket = /\[\]$/,
  rCRLF = /\r?\n/g,
  rhash = /#.*$/,
  rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
  rinput = /^(?:color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
  // #7653, #8125, #8152: local protocol detection
  rlocalProtocol = /^(?:about|app|app\-storage|.+\-extension|file|widget):$/,
  rnoContent = /^(?:GET|HEAD)$/,
  rprotocol = /^\/\//,
  rquery = /\?/,
  rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
  rselectTextarea = /^(?:select|textarea)/i,
  rspacesAjax = /\s+/,
  rts = /([?&])_=[^&]*/,
  rucHeaders = /(^|\-)([a-z])/g,
  rucHeadersFunc = function( _, $1, $2 ) {
    return $1 + $2.toUpperCase();
  },
  rurl = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,

  // Keep a copy of the old load method
  _load = jQuery.fn.load,

  /* Prefilters
   * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
   * 2) These are called:
   *    - BEFORE asking for a transport
   *    - AFTER param serialization (s.data is a string if s.processData is true)
   * 3) key is the dataType
   * 4) the catchall symbol "*" can be used
   * 5) execution will start with transport dataType and THEN continue down to "*" if needed
   */
  prefilters = {},

  /* Transports bindings
   * 1) key is the dataType
   * 2) the catchall symbol "*" can be used
   * 3) selection will start with transport dataType and THEN go to "*" if needed
   */
  transports = {},

  // Document location
  ajaxLocation,

  // Document location segments
  ajaxLocParts;

// #8138, IE may throw an exception when accessing
// a field from document.location if document.domain has been set
try {
  ajaxLocation = document.location.href;
} catch( e ) {
  // Use the href attribute of an A element
  // since IE will modify it given document.location
  ajaxLocation = document.createElement( "a" );
  ajaxLocation.href = "";
  ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

  // dataTypeExpression is optional and defaults to "*"
  return function( dataTypeExpression, func ) {

    if ( typeof dataTypeExpression !== "string" ) {
      func = dataTypeExpression;
      dataTypeExpression = "*";
    }

    if ( jQuery.isFunction( func ) ) {
      var dataTypes = dataTypeExpression.toLowerCase().split( rspacesAjax ),
        i = 0,
        length = dataTypes.length,
        dataType,
        list,
        placeBefore;

      // For each dataType in the dataTypeExpression
      for(; i < length; i++ ) {
        dataType = dataTypes[ i ];
        // We control if we're asked to add before
        // any existing element
        placeBefore = /^\+/.test( dataType );
        if ( placeBefore ) {
          dataType = dataType.substr( 1 ) || "*";
        }
        list = structure[ dataType ] = structure[ dataType ] || [];
        // then we add to the structure accordingly
        list[ placeBefore ? "unshift" : "push" ]( func );
      }
    }
  };
}

//Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR,
    dataType /* internal */, inspected /* internal */ ) {

  dataType = dataType || options.dataTypes[ 0 ];
  inspected = inspected || {};

  inspected[ dataType ] = true;

  var list = structure[ dataType ],
    i = 0,
    length = list ? list.length : 0,
    executeOnly = ( structure === prefilters ),
    selection;

  for(; i < length && ( executeOnly || !selection ); i++ ) {
    selection = list[ i ]( options, originalOptions, jqXHR );
    // If we got redirected to another dataType
    // we try there if executing only and not done already
    if ( typeof selection === "string" ) {
      if ( !executeOnly || inspected[ selection ] ) {
        selection = undefined;
      } else {
        options.dataTypes.unshift( selection );
        selection = inspectPrefiltersOrTransports(
            structure, options, originalOptions, jqXHR, selection, inspected );
      }
    }
  }
  // If we're only executing or nothing was selected
  // we try the catchall dataType if not done already
  if ( ( executeOnly || !selection ) && !inspected[ "*" ] ) {
    selection = inspectPrefiltersOrTransports(
        structure, options, originalOptions, jqXHR, "*", inspected );
  }
  // unnecessary when only executing (prefilters)
  // but it'll be ignored by the caller in that case
  return selection;
}

jQuery.fn.extend({
  load: function( url, params, callback ) {
    if ( typeof url !== "string" && _load ) {
      return _load.apply( this, arguments );

    // Don't do a request if no elements are being requested
    } else if ( !this.length ) {
      return this;
    }

    var off = url.indexOf( " " );
    if ( off >= 0 ) {
      var selector = url.slice( off, url.length );
      url = url.slice( 0, off );
    }

    // Default to a GET request
    var type = "GET";

    // If the second parameter was provided
    if ( params ) {
      // If it's a function
      if ( jQuery.isFunction( params ) ) {
        // We assume that it's the callback
        callback = params;
        params = undefined;

      // Otherwise, build a param string
      } else if ( typeof params === "object" ) {
        params = jQuery.param( params, jQuery.ajaxSettings.traditional );
        type = "POST";
      }
    }

    var self = this;

    // Request the remote document
    jQuery.ajax({
      url: url,
      type: type,
      dataType: "html",
      data: params,
      // Complete callback (responseText is used internally)
      complete: function( jqXHR, status, responseText ) {
        // Store the response as specified by the jqXHR object
        responseText = jqXHR.responseText;
        // If successful, inject the HTML into all the matched elements
        if ( jqXHR.isResolved() ) {
          // #4825: Get the actual response in case
          // a dataFilter is present in ajaxSettings
          jqXHR.done(function( r ) {
            responseText = r;
          });
          // See if a selector was specified
          self.html( selector ?
            // Create a dummy div to hold the results
            jQuery("<div>")
              // inject the contents of the document in, removing the scripts
              // to avoid any 'Permission Denied' errors in IE
              .append(responseText.replace(rscript, ""))

              // Locate the specified elements
              .find(selector) :

            // If not, just inject the full result
            responseText );
        }

        if ( callback ) {
          self.each( callback, [ responseText, status, jqXHR ] );
        }
      }
    });

    return this;
  },

  serialize: function() {
    return jQuery.param( this.serializeArray() );
  },

  serializeArray: function() {
    return this.map(function(){
      return this.elements ? jQuery.makeArray( this.elements ) : this;
    })
    .filter(function(){
      return this.name && !this.disabled &&
        ( this.checked || rselectTextarea.test( this.nodeName ) ||
          rinput.test( this.type ) );
    })
    .map(function( i, elem ){
      var val = jQuery( this ).val();

      return val == null ?
        null :
        jQuery.isArray( val ) ?
          jQuery.map( val, function( val, i ){
            return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
          }) :
          { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
    }).get();
  }
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( "ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split( " " ), function( i, o ){
  jQuery.fn[ o ] = function( f ){
    return this.bind( o, f );
  };
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
  jQuery[ method ] = function( url, data, callback, type ) {
    // shift arguments if data argument was omitted
    if ( jQuery.isFunction( data ) ) {
      type = type || callback;
      callback = data;
      data = undefined;
    }

    return jQuery.ajax({
      type: method,
      url: url,
      data: data,
      success: callback,
      dataType: type
    });
  };
} );

jQuery.extend({

  getScript: function( url, callback ) {
    return jQuery.get( url, undefined, callback, "script" );
  },

  getJSON: function( url, data, callback ) {
    return jQuery.get( url, data, callback, "json" );
  },

  // Creates a full fledged settings object into target
  // with both ajaxSettings and settings fields.
  // If target is omitted, writes into ajaxSettings.
  ajaxSetup: function ( target, settings ) {
    if ( !settings ) {
      // Only one parameter, we extend ajaxSettings
      settings = target;
      target = jQuery.extend( true, jQuery.ajaxSettings, settings );
    } else {
      // target was provided, we extend into it
      jQuery.extend( true, target, jQuery.ajaxSettings, settings );
    }
    // Flatten fields we don't want deep extended
    for( var field in { context: 1, url: 1 } ) {
      if ( field in settings ) {
        target[ field ] = settings[ field ];
      } else if( field in jQuery.ajaxSettings ) {
        target[ field ] = jQuery.ajaxSettings[ field ];
      }
    }
    return target;
  },

  ajaxSettings: {
    url: ajaxLocation,
    isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
    global: true,
    type: "GET",
    contentType: "application/x-www-form-urlencoded",
    processData: true,
    async: true,
    /*
    timeout: 0,
    data: null,
    dataType: null,
    username: null,
    password: null,
    cache: null,
    traditional: false,
    headers: {},
    */

    accepts: {
      xml: "application/xml, text/xml",
      html: "text/html",
      text: "text/plain",
      json: "application/json, text/javascript",
      "*": "*/*"
    },

    contents: {
      xml: /xml/,
      html: /html/,
      json: /json/
    },

    responseFields: {
      xml: "responseXML",
      text: "responseText"
    },

    // List of data converters
    // 1) key format is "source_type destination_type" (a single space in-between)
    // 2) the catchall symbol "*" can be used for source_type
    converters: {

      // Convert anything to text
      "* text": window.String,

      // Text to html (true = no transformation)
      "text html": true,

      // Evaluate text as a json expression
      "text json": jQuery.parseJSON,

      // Parse text as xml
      "text xml": jQuery.parseXML
    }
  },

  ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
  ajaxTransport: addToPrefiltersOrTransports( transports ),

  // Main method
  ajax: function( url, options ) {

    // If url is an object, simulate pre-1.5 signature
    if ( typeof url === "object" ) {
      options = url;
      url = undefined;
    }

    // Force options to be an object
    options = options || {};

    var // Create the final options object
      s = jQuery.ajaxSetup( {}, options ),
      // Callbacks context
      callbackContext = s.context || s,
      // Context for global events
      // It's the callbackContext if one was provided in the options
      // and if it's a DOM node or a jQuery collection
      globalEventContext = callbackContext !== s &&
        ( callbackContext.nodeType || callbackContext instanceof jQuery ) ?
            jQuery( callbackContext ) : jQuery.event,
      // Deferreds
      deferred = jQuery.Deferred(),
      completeDeferred = jQuery._Deferred(),
      // Status-dependent callbacks
      statusCode = s.statusCode || {},
      // ifModified key
      ifModifiedKey,
      // Headers (they are sent all at once)
      requestHeaders = {},
      // Response headers
      responseHeadersString,
      responseHeaders,
      // transport
      transport,
      // timeout handle
      timeoutTimer,
      // Cross-domain detection vars
      parts,
      // The jqXHR state
      state = 0,
      // To know if global events are to be dispatched
      fireGlobals,
      // Loop variable
      i,
      // Fake xhr
      jqXHR = {

        readyState: 0,

        // Caches the header
        setRequestHeader: function( name, value ) {
          if ( !state ) {
            requestHeaders[ name.toLowerCase().replace( rucHeaders, rucHeadersFunc ) ] = value;
          }
          return this;
        },

        // Raw string
        getAllResponseHeaders: function() {
          return state === 2 ? responseHeadersString : null;
        },

        // Builds headers hashtable if needed
        getResponseHeader: function( key ) {
          var match;
          if ( state === 2 ) {
            if ( !responseHeaders ) {
              responseHeaders = {};
              while( ( match = rheaders.exec( responseHeadersString ) ) ) {
                responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
              }
            }
            match = responseHeaders[ key.toLowerCase() ];
          }
          return match === undefined ? null : match;
        },

        // Overrides response content-type header
        overrideMimeType: function( type ) {
          if ( !state ) {
            s.mimeType = type;
          }
          return this;
        },

        // Cancel the request
        abort: function( statusText ) {
          statusText = statusText || "abort";
          if ( transport ) {
            transport.abort( statusText );
          }
          done( 0, statusText );
          return this;
        }
      };

    // Callback for when everything is done
    // It is defined here because jslint complains if it is declared
    // at the end of the function (which would be more logical and readable)
    function done( status, statusText, responses, headers ) {

      // Called once
      if ( state === 2 ) {
        return;
      }

      // State is "done" now
      state = 2;

      // Clear timeout if it exists
      if ( timeoutTimer ) {
        clearTimeout( timeoutTimer );
      }

      // Dereference transport for early garbage collection
      // (no matter how long the jqXHR object will be used)
      transport = undefined;

      // Cache response headers
      responseHeadersString = headers || "";

      // Set readyState
      jqXHR.readyState = status ? 4 : 0;

      var isSuccess,
        success,
        error,
        response = responses ? ajaxHandleResponses( s, jqXHR, responses ) : undefined,
        lastModified,
        etag;

      // If successful, handle type chaining
      if ( status >= 200 && status < 300 || status === 304 ) {

        // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
        if ( s.ifModified ) {

          if ( ( lastModified = jqXHR.getResponseHeader( "Last-Modified" ) ) ) {
            jQuery.lastModified[ ifModifiedKey ] = lastModified;
          }
          if ( ( etag = jqXHR.getResponseHeader( "Etag" ) ) ) {
            jQuery.etag[ ifModifiedKey ] = etag;
          }
        }

        // If not modified
        if ( status === 304 ) {

          statusText = "notmodified";
          isSuccess = true;

        // If we have data
        } else {

          try {
            success = ajaxConvert( s, response );
            statusText = "success";
            isSuccess = true;
          } catch(e) {
            // We have a parsererror
            statusText = "parsererror";
            error = e;
          }
        }
      } else {
        // We extract error from statusText
        // then normalize statusText and status for non-aborts
        error = statusText;
        if( !statusText || status ) {
          statusText = "error";
          if ( status < 0 ) {
            status = 0;
          }
        }
      }

      // Set data for the fake xhr object
      jqXHR.status = status;
      jqXHR.statusText = statusText;

      // Success/Error
      if ( isSuccess ) {
        deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
      } else {
        deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
      }

      // Status-dependent callbacks
      jqXHR.statusCode( statusCode );
      statusCode = undefined;

      if ( fireGlobals ) {
        globalEventContext.trigger( "ajax" + ( isSuccess ? "Success" : "Error" ),
            [ jqXHR, s, isSuccess ? success : error ] );
      }

      // Complete
      completeDeferred.resolveWith( callbackContext, [ jqXHR, statusText ] );

      if ( fireGlobals ) {
        globalEventContext.trigger( "ajaxComplete", [ jqXHR, s] );
        // Handle the global AJAX counter
        if ( !( --jQuery.active ) ) {
          jQuery.event.trigger( "ajaxStop" );
        }
      }
    }

    // Attach deferreds
    deferred.promise( jqXHR );
    jqXHR.success = jqXHR.done;
    jqXHR.error = jqXHR.fail;
    jqXHR.complete = completeDeferred.done;

    // Status-dependent callbacks
    jqXHR.statusCode = function( map ) {
      if ( map ) {
        var tmp;
        if ( state < 2 ) {
          for( tmp in map ) {
            statusCode[ tmp ] = [ statusCode[tmp], map[tmp] ];
          }
        } else {
          tmp = map[ jqXHR.status ];
          jqXHR.then( tmp, tmp );
        }
      }
      return this;
    };

    // Remove hash character (#7531: and string promotion)
    // Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
    // We also use the url parameter if available
    s.url = ( ( url || s.url ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

    // Extract dataTypes list
    s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().split( rspacesAjax );

    // Determine if a cross-domain request is in order
    if ( s.crossDomain == null ) {
      parts = rurl.exec( s.url.toLowerCase() );
      s.crossDomain = !!( parts &&
        ( parts[ 1 ] != ajaxLocParts[ 1 ] || parts[ 2 ] != ajaxLocParts[ 2 ] ||
          ( parts[ 3 ] || ( parts[ 1 ] === "http:" ? 80 : 443 ) ) !=
            ( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? 80 : 443 ) ) )
      );
    }

    // Convert data if not already a string
    if ( s.data && s.processData && typeof s.data !== "string" ) {
      s.data = jQuery.param( s.data, s.traditional );
    }

    // Apply prefilters
    inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

    // If request was aborted inside a prefiler, stop there
    if ( state === 2 ) {
      return false;
    }

    // We can fire global events as of now if asked to
    fireGlobals = s.global;

    // Uppercase the type
    s.type = s.type.toUpperCase();

    // Determine if request has content
    s.hasContent = !rnoContent.test( s.type );

    // Watch for a new set of requests
    if ( fireGlobals && jQuery.active++ === 0 ) {
      jQuery.event.trigger( "ajaxStart" );
    }

    // More options handling for requests with no content
    if ( !s.hasContent ) {

      // If data is available, append data to url
      if ( s.data ) {
        s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.data;
      }

      // Get ifModifiedKey before adding the anti-cache parameter
      ifModifiedKey = s.url;

      // Add anti-cache in url if needed
      if ( s.cache === false ) {

        var ts = jQuery.now(),
          // try replacing _= if it is there
          ret = s.url.replace( rts, "$1_=" + ts );

        // if nothing was replaced, add timestamp to the end
        s.url = ret + ( (ret === s.url ) ? ( rquery.test( s.url ) ? "&" : "?" ) + "_=" + ts : "" );
      }
    }

    // Set the correct header, if data is being sent
    if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
      requestHeaders[ "Content-Type" ] = s.contentType;
    }

    // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
    if ( s.ifModified ) {
      ifModifiedKey = ifModifiedKey || s.url;
      if ( jQuery.lastModified[ ifModifiedKey ] ) {
        requestHeaders[ "If-Modified-Since" ] = jQuery.lastModified[ ifModifiedKey ];
      }
      if ( jQuery.etag[ ifModifiedKey ] ) {
        requestHeaders[ "If-None-Match" ] = jQuery.etag[ ifModifiedKey ];
      }
    }

    // Set the Accepts header for the server, depending on the dataType
    requestHeaders.Accept = s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
      s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", */*; q=0.01" : "" ) :
      s.accepts[ "*" ];

    // Check for headers option
    for ( i in s.headers ) {
      jqXHR.setRequestHeader( i, s.headers[ i ] );
    }

    // Allow custom headers/mimetypes and early abort
    if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
        // Abort if not done already
        jqXHR.abort();
        return false;

    }

    // Install callbacks on deferreds
    for ( i in { success: 1, error: 1, complete: 1 } ) {
      jqXHR[ i ]( s[ i ] );
    }

    // Get transport
    transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

    // If no transport, we auto-abort
    if ( !transport ) {
      done( -1, "No Transport" );
    } else {
      jqXHR.readyState = 1;
      // Send global event
      if ( fireGlobals ) {
        globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
      }
      // Timeout
      if ( s.async && s.timeout > 0 ) {
        timeoutTimer = setTimeout( function(){
          jqXHR.abort( "timeout" );
        }, s.timeout );
      }

      try {
        state = 1;
        transport.send( requestHeaders, done );
      } catch (e) {
        // Propagate exception as error if not done
        if ( status < 2 ) {
          done( -1, e );
        // Simply rethrow otherwise
        } else {
          jQuery.error( e );
        }
      }
    }

    return jqXHR;
  },

  // Serialize an array of form elements or a set of
  // key/values into a query string
  param: function( a, traditional ) {
    var s = [],
      add = function( key, value ) {
        // If value is a function, invoke it and return its value
        value = jQuery.isFunction( value ) ? value() : value;
        s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
      };

    // Set traditional to true for jQuery <= 1.3.2 behavior.
    if ( traditional === undefined ) {
      traditional = jQuery.ajaxSettings.traditional;
    }

    // If an array was passed in, assume that it is an array of form elements.
    if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
      // Serialize the form elements
      jQuery.each( a, function() {
        add( this.name, this.value );
      } );

    } else {
      // If traditional, encode the "old" way (the way 1.3.2 or older
      // did it), otherwise encode params recursively.
      for ( var prefix in a ) {
        buildParams( prefix, a[ prefix ], traditional, add );
      }
    }

    // Return the resulting serialization
    return s.join( "&" ).replace( r20, "+" );
  }
});

function buildParams( prefix, obj, traditional, add ) {
  if ( jQuery.isArray( obj ) && obj.length ) {
    // Serialize array item.
    jQuery.each( obj, function( i, v ) {
      if ( traditional || rbracket.test( prefix ) ) {
        // Treat each array item as a scalar.
        add( prefix, v );

      } else {
        // If array item is non-scalar (array or object), encode its
        // numeric index to resolve deserialization ambiguity issues.
        // Note that rack (as of 1.0.0) can't currently deserialize
        // nested arrays properly, and attempting to do so may cause
        // a server error. Possible fixes are to modify rack's
        // deserialization algorithm or to provide an option or flag
        // to force array serialization to be shallow.
        buildParams( prefix + "[" + ( typeof v === "object" || jQuery.isArray(v) ? i : "" ) + "]", v, traditional, add );
      }
    });

  } else if ( !traditional && obj != null && typeof obj === "object" ) {
    // If we see an array here, it is empty and should be treated as an empty
    // object
    if ( jQuery.isArray( obj ) || jQuery.isEmptyObject( obj ) ) {
      add( prefix, "" );

    // Serialize object item.
    } else {
      for ( var name in obj ) {
        buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
      }
    }

  } else {
    // Serialize scalar item.
    add( prefix, obj );
  }
}

// This is still on the jQuery object... for now
// Want to move this to jQuery.ajax some day
jQuery.extend({

  // Counter for holding the number of active queries
  active: 0,

  // Last-Modified header cache for next request
  lastModified: {},
  etag: {}

});

/* Handles responses to an ajax request:
 * - sets all responseXXX fields accordingly
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

  var contents = s.contents,
    dataTypes = s.dataTypes,
    responseFields = s.responseFields,
    ct,
    type,
    finalDataType,
    firstDataType;

  // Fill responseXXX fields
  for( type in responseFields ) {
    if ( type in responses ) {
      jqXHR[ responseFields[type] ] = responses[ type ];
    }
  }

  // Remove auto dataType and get content-type in the process
  while( dataTypes[ 0 ] === "*" ) {
    dataTypes.shift();
    if ( ct === undefined ) {
      ct = s.mimeType || jqXHR.getResponseHeader( "content-type" );
    }
  }

  // Check if we're dealing with a known content-type
  if ( ct ) {
    for ( type in contents ) {
      if ( contents[ type ] && contents[ type ].test( ct ) ) {
        dataTypes.unshift( type );
        break;
      }
    }
  }

  // Check to see if we have a response for the expected dataType
  if ( dataTypes[ 0 ] in responses ) {
    finalDataType = dataTypes[ 0 ];
  } else {
    // Try convertible dataTypes
    for ( type in responses ) {
      if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
        finalDataType = type;
        break;
      }
      if ( !firstDataType ) {
        firstDataType = type;
      }
    }
    // Or just use first one
    finalDataType = finalDataType || firstDataType;
  }

  // If we found a dataType
  // We add the dataType to the list if needed
  // and return the corresponding response
  if ( finalDataType ) {
    if ( finalDataType !== dataTypes[ 0 ] ) {
      dataTypes.unshift( finalDataType );
    }
    return responses[ finalDataType ];
  }
}

// Chain conversions given the request and the original response
function ajaxConvert( s, response ) {

  // Apply the dataFilter if provided
  if ( s.dataFilter ) {
    response = s.dataFilter( response, s.dataType );
  }

  var dataTypes = s.dataTypes,
    converters = {},
    i,
    key,
    length = dataTypes.length,
    tmp,
    // Current and previous dataTypes
    current = dataTypes[ 0 ],
    prev,
    // Conversion expression
    conversion,
    // Conversion function
    conv,
    // Conversion functions (transitive conversion)
    conv1,
    conv2;

  // For each dataType in the chain
  for( i = 1; i < length; i++ ) {

    // Create converters map
    // with lowercased keys
    if ( i === 1 ) {
      for( key in s.converters ) {
        if( typeof key === "string" ) {
          converters[ key.toLowerCase() ] = s.converters[ key ];
        }
      }
    }

    // Get the dataTypes
    prev = current;
    current = dataTypes[ i ];

    // If current is auto dataType, update it to prev
    if( current === "*" ) {
      current = prev;
    // If no auto and dataTypes are actually different
    } else if ( prev !== "*" && prev !== current ) {

      // Get the converter
      conversion = prev + " " + current;
      conv = converters[ conversion ] || converters[ "* " + current ];

      // If there is no direct converter, search transitively
      if ( !conv ) {
        conv2 = undefined;
        for( conv1 in converters ) {
          tmp = conv1.split( " " );
          if ( tmp[ 0 ] === prev || tmp[ 0 ] === "*" ) {
            conv2 = converters[ tmp[1] + " " + current ];
            if ( conv2 ) {
              conv1 = converters[ conv1 ];
              if ( conv1 === true ) {
                conv = conv2;
              } else if ( conv2 === true ) {
                conv = conv1;
              }
              break;
            }
          }
        }
      }
      // If we found no converter, dispatch an error
      if ( !( conv || conv2 ) ) {
        jQuery.error( "No conversion from " + conversion.replace(" "," to ") );
      }
      // If found converter is not an equivalence
      if ( conv !== true ) {
        // Convert with 1 or 2 converters accordingly
        response = conv ? conv( response ) : conv2( conv1(response) );
      }
    }
  }
  return response;
}




var jsc = jQuery.now(),
  jsre = /(\=)\?(&|$)|\?\?/i;

// Default jsonp settings
jQuery.ajaxSetup({
  jsonp: "callback",
  jsonpCallback: function() {
    return jQuery.expando + "_" + ( jsc++ );
  }
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

  var dataIsString = ( typeof s.data === "string" );

  if ( s.dataTypes[ 0 ] === "jsonp" ||
    originalSettings.jsonpCallback ||
    originalSettings.jsonp != null ||
    s.jsonp !== false && ( jsre.test( s.url ) ||
        dataIsString && jsre.test( s.data ) ) ) {

    var responseContainer,
      jsonpCallback = s.jsonpCallback =
        jQuery.isFunction( s.jsonpCallback ) ? s.jsonpCallback() : s.jsonpCallback,
      previous = window[ jsonpCallback ],
      url = s.url,
      data = s.data,
      replace = "$1" + jsonpCallback + "$2",
      cleanUp = function() {
        // Set callback back to previous value
        window[ jsonpCallback ] = previous;
        // Call if it was a function and we have a response
        if ( responseContainer && jQuery.isFunction( previous ) ) {
          window[ jsonpCallback ]( responseContainer[ 0 ] );
        }
      };

    if ( s.jsonp !== false ) {
      url = url.replace( jsre, replace );
      if ( s.url === url ) {
        if ( dataIsString ) {
          data = data.replace( jsre, replace );
        }
        if ( s.data === data ) {
          // Add callback manually
          url += (/\?/.test( url ) ? "&" : "?") + s.jsonp + "=" + jsonpCallback;
        }
      }
    }

    s.url = url;
    s.data = data;

    // Install callback
    window[ jsonpCallback ] = function( response ) {
      responseContainer = [ response ];
    };

    // Install cleanUp function
    jqXHR.then( cleanUp, cleanUp );

    // Use data converter to retrieve json after script execution
    s.converters["script json"] = function() {
      if ( !responseContainer ) {
        jQuery.error( jsonpCallback + " was not called" );
      }
      return responseContainer[ 0 ];
    };

    // force json dataType
    s.dataTypes[ 0 ] = "json";

    // Delegate to script
    return "script";
  }
} );




// Install script dataType
jQuery.ajaxSetup({
  accepts: {
    script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
  },
  contents: {
    script: /javascript|ecmascript/
  },
  converters: {
    "text script": function( text ) {
      jQuery.globalEval( text );
      return text;
    }
  }
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
  if ( s.cache === undefined ) {
    s.cache = false;
  }
  if ( s.crossDomain ) {
    s.type = "GET";
    s.global = false;
  }
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

  // This transport only deals with cross domain requests
  if ( s.crossDomain ) {

    var script,
      head = document.head || document.getElementsByTagName( "head" )[0] || document.documentElement;

    return {

      send: function( _, callback ) {

        script = document.createElement( "script" );

        script.async = "async";

        if ( s.scriptCharset ) {
          script.charset = s.scriptCharset;
        }

        script.src = s.url;

        // Attach handlers for all browsers
        script.onload = script.onreadystatechange = function( _, isAbort ) {

          if ( !script.readyState || /loaded|complete/.test( script.readyState ) ) {

            // Handle memory leak in IE
            script.onload = script.onreadystatechange = null;

            // Remove the script
            if ( head && script.parentNode ) {
              head.removeChild( script );
            }

            // Dereference the script
            script = undefined;

            // Callback if not abort
            if ( !isAbort ) {
              callback( 200, "success" );
            }
          }
        };
        // Use insertBefore instead of appendChild  to circumvent an IE6 bug.
        // This arises when a base node is used (#2709 and #4378).
        head.insertBefore( script, head.firstChild );
      },

      abort: function() {
        if ( script ) {
          script.onload( 0, 1 );
        }
      }
    };
  }
} );




var // #5280: next active xhr id and list of active xhrs' callbacks
  xhrId = jQuery.now(),
  xhrCallbacks,

  // XHR used to determine supports properties
  testXHR;

// #5280: Internet Explorer will keep connections alive if we don't abort on unload
function xhrOnUnloadAbort() {
  jQuery( window ).unload(function() {
    // Abort all pending requests
    for ( var key in xhrCallbacks ) {
      xhrCallbacks[ key ]( 0, 1 );
    }
  });
}

// Functions to create xhrs
function createStandardXHR() {
  try {
    return new window.XMLHttpRequest();
  } catch( e ) {}
}

function createActiveXHR() {
  try {
    return new window.ActiveXObject( "Microsoft.XMLHTTP" );
  } catch( e ) {}
}

// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject ?
  /* Microsoft failed to properly
   * implement the XMLHttpRequest in IE7 (can't request local files),
   * so we use the ActiveXObject when it is available
   * Additionally XMLHttpRequest can be disabled in IE7/IE8 so
   * we need a fallback.
   */
  function() {
    return !this.isLocal && createStandardXHR() || createActiveXHR();
  } :
  // For all other browsers, use the standard XMLHttpRequest object
  createStandardXHR;

// Test if we can create an xhr object
testXHR = jQuery.ajaxSettings.xhr();
jQuery.support.ajax = !!testXHR;

// Does this browser support crossDomain XHR requests
jQuery.support.cors = testXHR && ( "withCredentials" in testXHR );

// No need for the temporary xhr anymore
testXHR = undefined;

// Create transport if the browser can provide an xhr
if ( jQuery.support.ajax ) {

  jQuery.ajaxTransport(function( s ) {
    // Cross domain only allowed if supported through XMLHttpRequest
    if ( !s.crossDomain || jQuery.support.cors ) {

      var callback;

      return {
        send: function( headers, complete ) {

          // Get a new xhr
          var xhr = s.xhr(),
            handle,
            i;

          // Open the socket
          // Passing null username, generates a login popup on Opera (#2865)
          if ( s.username ) {
            xhr.open( s.type, s.url, s.async, s.username, s.password );
          } else {
            xhr.open( s.type, s.url, s.async );
          }

          // Apply custom fields if provided
          if ( s.xhrFields ) {
            for ( i in s.xhrFields ) {
              xhr[ i ] = s.xhrFields[ i ];
            }
          }

          // Override mime type if needed
          if ( s.mimeType && xhr.overrideMimeType ) {
            xhr.overrideMimeType( s.mimeType );
          }

          // X-Requested-With header
          // For cross-domain requests, seeing as conditions for a preflight are
          // akin to a jigsaw puzzle, we simply never set it to be sure.
          // (it can always be set on a per-request basis or even using ajaxSetup)
          // For same-domain requests, won't change header if already provided.
          if ( !s.crossDomain && !headers["X-Requested-With"] ) {
            headers[ "X-Requested-With" ] = "XMLHttpRequest";
          }

          // Need an extra try/catch for cross domain requests in Firefox 3
          try {
            for ( i in headers ) {
              xhr.setRequestHeader( i, headers[ i ] );
            }
          } catch( _ ) {}

          // Do send the request
          // This may raise an exception which is actually
          // handled in jQuery.ajax (so no try/catch here)
          xhr.send( ( s.hasContent && s.data ) || null );

          // Listener
          callback = function( _, isAbort ) {

            var status,
              statusText,
              responseHeaders,
              responses,
              xml;

            // Firefox throws exceptions when accessing properties
            // of an xhr when a network error occured
            // http://helpful.knobs-dials.com/index.php/Component_returned_failure_code:_0x80040111_(NS_ERROR_NOT_AVAILABLE)
            try {

              // Was never called and is aborted or complete
              if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

                // Only called once
                callback = undefined;

                // Do not keep as active anymore
                if ( handle ) {
                  xhr.onreadystatechange = jQuery.noop;
                  delete xhrCallbacks[ handle ];
                }

                // If it's an abort
                if ( isAbort ) {
                  // Abort it manually if needed
                  if ( xhr.readyState !== 4 ) {
                    xhr.abort();
                  }
                } else {
                  status = xhr.status;
                  responseHeaders = xhr.getAllResponseHeaders();
                  responses = {};
                  xml = xhr.responseXML;

                  // Construct response list
                  if ( xml && xml.documentElement /* #4958 */ ) {
                    responses.xml = xml;
                  }
                  responses.text = xhr.responseText;

                  // Firefox throws an exception when accessing
                  // statusText for faulty cross-domain requests
                  try {
                    statusText = xhr.statusText;
                  } catch( e ) {
                    // We normalize with Webkit giving an empty statusText
                    statusText = "";
                  }

                  // Filter status for non standard behaviors

                  // If the request is local and we have data: assume a success
                  // (success with no data won't get notified, that's the best we
                  // can do given current implementations)
                  if ( !status && s.isLocal && !s.crossDomain ) {
                    status = responses.text ? 200 : 404;
                  // IE - #1450: sometimes returns 1223 when it should be 204
                  } else if ( status === 1223 ) {
                    status = 204;
                  }
                }
              }
            } catch( firefoxAccessException ) {
              if ( !isAbort ) {
                complete( -1, firefoxAccessException );
              }
            }

            // Call complete if needed
            if ( responses ) {
              complete( status, statusText, responses, responseHeaders );
            }
          };

          // if we're in sync mode or it's in cache
          // and has been retrieved directly (IE6 & IE7)
          // we need to manually fire the callback
          if ( !s.async || xhr.readyState === 4 ) {
            callback();
          } else {
            // Create the active xhrs callbacks list if needed
            // and attach the unload handler
            if ( !xhrCallbacks ) {
              xhrCallbacks = {};
              xhrOnUnloadAbort();
            }
            // Add to list of active xhrs callbacks
            handle = xhrId++;
            xhr.onreadystatechange = xhrCallbacks[ handle ] = callback;
          }
        },

        abort: function() {
          if ( callback ) {
            callback(0,1);
          }
        }
      };
    }
  });
}




var elemdisplay = {},
  rfxtypes = /^(?:toggle|show|hide)$/,
  rfxnum = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,
  timerId,
  fxAttrs = [
    // height animations
    [ "height", "marginTop", "marginBottom", "paddingTop", "paddingBottom" ],
    // width animations
    [ "width", "marginLeft", "marginRight", "paddingLeft", "paddingRight" ],
    // opacity animations
    [ "opacity" ]
  ];

jQuery.fn.extend({
  show: function( speed, easing, callback ) {
    var elem, display;

    if ( speed || speed === 0 ) {
      return this.animate( genFx("show", 3), speed, easing, callback);

    } else {
      for ( var i = 0, j = this.length; i < j; i++ ) {
        elem = this[i];
        display = elem.style.display;

        // Reset the inline display of this element to learn if it is
        // being hidden by cascaded rules or not
        if ( !jQuery._data(elem, "olddisplay") && display === "none" ) {
          display = elem.style.display = "";
        }

        // Set elements which have been overridden with display: none
        // in a stylesheet to whatever the default browser style is
        // for such an element
        if ( display === "" && jQuery.css( elem, "display" ) === "none" ) {
          jQuery._data(elem, "olddisplay", defaultDisplay(elem.nodeName));
        }
      }

      // Set the display of most of the elements in a second loop
      // to avoid the constant reflow
      for ( i = 0; i < j; i++ ) {
        elem = this[i];
        display = elem.style.display;

        if ( display === "" || display === "none" ) {
          elem.style.display = jQuery._data(elem, "olddisplay") || "";
        }
      }

      return this;
    }
  },

  hide: function( speed, easing, callback ) {
    if ( speed || speed === 0 ) {
      return this.animate( genFx("hide", 3), speed, easing, callback);

    } else {
      for ( var i = 0, j = this.length; i < j; i++ ) {
        var display = jQuery.css( this[i], "display" );

        if ( display !== "none" && !jQuery._data( this[i], "olddisplay" ) ) {
          jQuery._data( this[i], "olddisplay", display );
        }
      }

      // Set the display of the elements in a second loop
      // to avoid the constant reflow
      for ( i = 0; i < j; i++ ) {
        this[i].style.display = "none";
      }

      return this;
    }
  },

  // Save the old toggle function
  _toggle: jQuery.fn.toggle,

  toggle: function( fn, fn2, callback ) {
    var bool = typeof fn === "boolean";

    if ( jQuery.isFunction(fn) && jQuery.isFunction(fn2) ) {
      this._toggle.apply( this, arguments );

    } else if ( fn == null || bool ) {
      this.each(function() {
        var state = bool ? fn : jQuery(this).is(":hidden");
        jQuery(this)[ state ? "show" : "hide" ]();
      });

    } else {
      this.animate(genFx("toggle", 3), fn, fn2, callback);
    }

    return this;
  },

  fadeTo: function( speed, to, easing, callback ) {
    return this.filter(":hidden").css("opacity", 0).show().end()
          .animate({opacity: to}, speed, easing, callback);
  },

  animate: function( prop, speed, easing, callback ) {
    var optall = jQuery.speed(speed, easing, callback);

    if ( jQuery.isEmptyObject( prop ) ) {
      return this.each( optall.complete );
    }

    return this[ optall.queue === false ? "each" : "queue" ](function() {
      // XXX 'this' does not always have a nodeName when running the
      // test suite

      var opt = jQuery.extend({}, optall), p,
        isElement = this.nodeType === 1,
        hidden = isElement && jQuery(this).is(":hidden"),
        self = this;

      for ( p in prop ) {
        var name = jQuery.camelCase( p );

        if ( p !== name ) {
          prop[ name ] = prop[ p ];
          delete prop[ p ];
          p = name;
        }

        if ( prop[p] === "hide" && hidden || prop[p] === "show" && !hidden ) {
          return opt.complete.call(this);
        }

        if ( isElement && ( p === "height" || p === "width" ) ) {
          // Make sure that nothing sneaks out
          // Record all 3 overflow attributes because IE does not
          // change the overflow attribute when overflowX and
          // overflowY are set to the same value
          opt.overflow = [ this.style.overflow, this.style.overflowX, this.style.overflowY ];

          // Set display property to inline-block for height/width
          // animations on inline elements that are having width/height
          // animated
          if ( jQuery.css( this, "display" ) === "inline" &&
              jQuery.css( this, "float" ) === "none" ) {
            if ( !jQuery.support.inlineBlockNeedsLayout ) {
              this.style.display = "inline-block";

            } else {
              var display = defaultDisplay(this.nodeName);

              // inline-level elements accept inline-block;
              // block-level elements need to be inline with layout
              if ( display === "inline" ) {
                this.style.display = "inline-block";

              } else {
                this.style.display = "inline";
                this.style.zoom = 1;
              }
            }
          }
        }

        if ( jQuery.isArray( prop[p] ) ) {
          // Create (if needed) and add to specialEasing
          (opt.specialEasing = opt.specialEasing || {})[p] = prop[p][1];
          prop[p] = prop[p][0];
        }
      }

      if ( opt.overflow != null ) {
        this.style.overflow = "hidden";
      }

      opt.curAnim = jQuery.extend({}, prop);

      jQuery.each( prop, function( name, val ) {
        var e = new jQuery.fx( self, opt, name );

        if ( rfxtypes.test(val) ) {
          e[ val === "toggle" ? hidden ? "show" : "hide" : val ]( prop );

        } else {
          var parts = rfxnum.exec(val),
            start = e.cur();

          if ( parts ) {
            var end = parseFloat( parts[2] ),
              unit = parts[3] || ( jQuery.cssNumber[ name ] ? "" : "px" );

            // We need to compute starting value
            if ( unit !== "px" ) {
              jQuery.style( self, name, (end || 1) + unit);
              start = ((end || 1) / e.cur()) * start;
              jQuery.style( self, name, start + unit);
            }

            // If a +=/-= token was provided, we're doing a relative animation
            if ( parts[1] ) {
              end = ((parts[1] === "-=" ? -1 : 1) * end) + start;
            }

            e.custom( start, end, unit );

          } else {
            e.custom( start, val, "" );
          }
        }
      });

      // For JS strict compliance
      return true;
    });
  },

  stop: function( clearQueue, gotoEnd ) {
    var timers = jQuery.timers;

    if ( clearQueue ) {
      this.queue([]);
    }

    this.each(function() {
      // go in reverse order so anything added to the queue during the loop is ignored
      for ( var i = timers.length - 1; i >= 0; i-- ) {
        if ( timers[i].elem === this ) {
          if (gotoEnd) {
            // force the next step to be the last
            timers[i](true);
          }

          timers.splice(i, 1);
        }
      }
    });

    // start the next in the queue if the last step wasn't forced
    if ( !gotoEnd ) {
      this.dequeue();
    }

    return this;
  }

});

function genFx( type, num ) {
  var obj = {};

  jQuery.each( fxAttrs.concat.apply([], fxAttrs.slice(0,num)), function() {
    obj[ this ] = type;
  });

  return obj;
}

// Generate shortcuts for custom animations
jQuery.each({
  slideDown: genFx("show", 1),
  slideUp: genFx("hide", 1),
  slideToggle: genFx("toggle", 1),
  fadeIn: { opacity: "show" },
  fadeOut: { opacity: "hide" },
  fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
  jQuery.fn[ name ] = function( speed, easing, callback ) {
    return this.animate( props, speed, easing, callback );
  };
});

jQuery.extend({
  speed: function( speed, easing, fn ) {
    var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
      complete: fn || !fn && easing ||
        jQuery.isFunction( speed ) && speed,
      duration: speed,
      easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
    };

    opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
      opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;

    // Queueing
    opt.old = opt.complete;
    opt.complete = function() {
      if ( opt.queue !== false ) {
        jQuery(this).dequeue();
      }
      if ( jQuery.isFunction( opt.old ) ) {
        opt.old.call( this );
      }
    };

    return opt;
  },

  easing: {
    linear: function( p, n, firstNum, diff ) {
      return firstNum + diff * p;
    },
    swing: function( p, n, firstNum, diff ) {
      return ((-Math.cos(p*Math.PI)/2) + 0.5) * diff + firstNum;
    }
  },

  timers: [],

  fx: function( elem, options, prop ) {
    this.options = options;
    this.elem = elem;
    this.prop = prop;

    if ( !options.orig ) {
      options.orig = {};
    }
  }

});

jQuery.fx.prototype = {
  // Simple function for setting a style value
  update: function() {
    if ( this.options.step ) {
      this.options.step.call( this.elem, this.now, this );
    }

    (jQuery.fx.step[this.prop] || jQuery.fx.step._default)( this );
  },

  // Get the current size
  cur: function() {
    if ( this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null) ) {
      return this.elem[ this.prop ];
    }

    var parsed,
      r = jQuery.css( this.elem, this.prop );
    // Empty strings, null, undefined and "auto" are converted to 0,
    // complex values such as "rotate(1rad)" are returned as is,
    // simple values such as "10px" are parsed to Float.
    return isNaN( parsed = parseFloat( r ) ) ? !r || r === "auto" ? 0 : r : parsed;
  },

  // Start an animation from one number to another
  custom: function( from, to, unit ) {
    var self = this,
      fx = jQuery.fx;

    this.startTime = jQuery.now();
    this.start = from;
    this.end = to;
    this.unit = unit || this.unit || ( jQuery.cssNumber[ this.prop ] ? "" : "px" );
    this.now = this.start;
    this.pos = this.state = 0;

    function t( gotoEnd ) {
      return self.step(gotoEnd);
    }

    t.elem = this.elem;

    if ( t() && jQuery.timers.push(t) && !timerId ) {
      timerId = setInterval(fx.tick, fx.interval);
    }
  },

  // Simple 'show' function
  show: function() {
    // Remember where we started, so that we can go back to it later
    this.options.orig[this.prop] = jQuery.style( this.elem, this.prop );
    this.options.show = true;

    // Begin the animation
    // Make sure that we start at a small width/height to avoid any
    // flash of content
    this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur());

    // Start by showing the element
    jQuery( this.elem ).show();
  },

  // Simple 'hide' function
  hide: function() {
    // Remember where we started, so that we can go back to it later
    this.options.orig[this.prop] = jQuery.style( this.elem, this.prop );
    this.options.hide = true;

    // Begin the animation
    this.custom(this.cur(), 0);
  },

  // Each step of an animation
  step: function( gotoEnd ) {
    var t = jQuery.now(), done = true;

    if ( gotoEnd || t >= this.options.duration + this.startTime ) {
      this.now = this.end;
      this.pos = this.state = 1;
      this.update();

      this.options.curAnim[ this.prop ] = true;

      for ( var i in this.options.curAnim ) {
        if ( this.options.curAnim[i] !== true ) {
          done = false;
        }
      }

      if ( done ) {
        // Reset the overflow
        if ( this.options.overflow != null && !jQuery.support.shrinkWrapBlocks ) {
          var elem = this.elem,
            options = this.options;

          jQuery.each( [ "", "X", "Y" ], function (index, value) {
            elem.style[ "overflow" + value ] = options.overflow[index];
          } );
        }

        // Hide the element if the "hide" operation was done
        if ( this.options.hide ) {
          jQuery(this.elem).hide();
        }

        // Reset the properties, if the item has been hidden or shown
        if ( this.options.hide || this.options.show ) {
          for ( var p in this.options.curAnim ) {
            jQuery.style( this.elem, p, this.options.orig[p] );
          }
        }

        // Execute the complete function
        this.options.complete.call( this.elem );
      }

      return false;

    } else {
      var n = t - this.startTime;
      this.state = n / this.options.duration;

      // Perform the easing function, defaults to swing
      var specialEasing = this.options.specialEasing && this.options.specialEasing[this.prop];
      var defaultEasing = this.options.easing || (jQuery.easing.swing ? "swing" : "linear");
      this.pos = jQuery.easing[specialEasing || defaultEasing](this.state, n, 0, 1, this.options.duration);
      this.now = this.start + ((this.end - this.start) * this.pos);

      // Perform the next step of the animation
      this.update();
    }

    return true;
  }
};

jQuery.extend( jQuery.fx, {
  tick: function() {
    var timers = jQuery.timers;

    for ( var i = 0; i < timers.length; i++ ) {
      if ( !timers[i]() ) {
        timers.splice(i--, 1);
      }
    }

    if ( !timers.length ) {
      jQuery.fx.stop();
    }
  },

  interval: 13,

  stop: function() {
    clearInterval( timerId );
    timerId = null;
  },

  speeds: {
    slow: 600,
    fast: 200,
    // Default speed
    _default: 400
  },

  step: {
    opacity: function( fx ) {
      jQuery.style( fx.elem, "opacity", fx.now );
    },

    _default: function( fx ) {
      if ( fx.elem.style && fx.elem.style[ fx.prop ] != null ) {
        fx.elem.style[ fx.prop ] = (fx.prop === "width" || fx.prop === "height" ? Math.max(0, fx.now) : fx.now) + fx.unit;
      } else {
        fx.elem[ fx.prop ] = fx.now;
      }
    }
  }
});

if ( jQuery.expr && jQuery.expr.filters ) {
  jQuery.expr.filters.animated = function( elem ) {
    return jQuery.grep(jQuery.timers, function( fn ) {
      return elem === fn.elem;
    }).length;
  };
}

function defaultDisplay( nodeName ) {
  if ( !elemdisplay[ nodeName ] ) {
    var elem = jQuery("<" + nodeName + ">").appendTo("body"),
      display = elem.css("display");

    elem.remove();

    if ( display === "none" || display === "" ) {
      display = "block";
    }

    elemdisplay[ nodeName ] = display;
  }

  return elemdisplay[ nodeName ];
}




var rtable = /^t(?:able|d|h)$/i,
  rroot = /^(?:body|html)$/i;

if ( "getBoundingClientRect" in document.documentElement ) {
  jQuery.fn.offset = function( options ) {
    var elem = this[0], box;

    if ( options ) {
      return this.each(function( i ) {
        jQuery.offset.setOffset( this, options, i );
      });
    }

    if ( !elem || !elem.ownerDocument ) {
      return null;
    }

    if ( elem === elem.ownerDocument.body ) {
      return jQuery.offset.bodyOffset( elem );
    }

    try {
      box = elem.getBoundingClientRect();
    } catch(e) {}

    var doc = elem.ownerDocument,
      docElem = doc.documentElement;

    // Make sure we're not dealing with a disconnected DOM node
    if ( !box || !jQuery.contains( docElem, elem ) ) {
      return box ? { top: box.top, left: box.left } : { top: 0, left: 0 };
    }

    var body = doc.body,
      win = getWindow(doc),
      clientTop  = docElem.clientTop  || body.clientTop  || 0,
      clientLeft = docElem.clientLeft || body.clientLeft || 0,
      scrollTop  = win.pageYOffset || jQuery.support.boxModel && docElem.scrollTop  || body.scrollTop,
      scrollLeft = win.pageXOffset || jQuery.support.boxModel && docElem.scrollLeft || body.scrollLeft,
      top  = box.top  + scrollTop  - clientTop,
      left = box.left + scrollLeft - clientLeft;

    return { top: top, left: left };
  };

} else {
  jQuery.fn.offset = function( options ) {
    var elem = this[0];

    if ( options ) {
      return this.each(function( i ) {
        jQuery.offset.setOffset( this, options, i );
      });
    }

    if ( !elem || !elem.ownerDocument ) {
      return null;
    }

    if ( elem === elem.ownerDocument.body ) {
      return jQuery.offset.bodyOffset( elem );
    }

    jQuery.offset.initialize();

    var computedStyle,
      offsetParent = elem.offsetParent,
      prevOffsetParent = elem,
      doc = elem.ownerDocument,
      docElem = doc.documentElement,
      body = doc.body,
      defaultView = doc.defaultView,
      prevComputedStyle = defaultView ? defaultView.getComputedStyle( elem, null ) : elem.currentStyle,
      top = elem.offsetTop,
      left = elem.offsetLeft;

    while ( (elem = elem.parentNode) && elem !== body && elem !== docElem ) {
      if ( jQuery.offset.supportsFixedPosition && prevComputedStyle.position === "fixed" ) {
        break;
      }

      computedStyle = defaultView ? defaultView.getComputedStyle(elem, null) : elem.currentStyle;
      top  -= elem.scrollTop;
      left -= elem.scrollLeft;

      if ( elem === offsetParent ) {
        top  += elem.offsetTop;
        left += elem.offsetLeft;

        if ( jQuery.offset.doesNotAddBorder && !(jQuery.offset.doesAddBorderForTableAndCells && rtable.test(elem.nodeName)) ) {
          top  += parseFloat( computedStyle.borderTopWidth  ) || 0;
          left += parseFloat( computedStyle.borderLeftWidth ) || 0;
        }

        prevOffsetParent = offsetParent;
        offsetParent = elem.offsetParent;
      }

      if ( jQuery.offset.subtractsBorderForOverflowNotVisible && computedStyle.overflow !== "visible" ) {
        top  += parseFloat( computedStyle.borderTopWidth  ) || 0;
        left += parseFloat( computedStyle.borderLeftWidth ) || 0;
      }

      prevComputedStyle = computedStyle;
    }

    if ( prevComputedStyle.position === "relative" || prevComputedStyle.position === "static" ) {
      top  += body.offsetTop;
      left += body.offsetLeft;
    }

    if ( jQuery.offset.supportsFixedPosition && prevComputedStyle.position === "fixed" ) {
      top  += Math.max( docElem.scrollTop, body.scrollTop );
      left += Math.max( docElem.scrollLeft, body.scrollLeft );
    }

    return { top: top, left: left };
  };
}

jQuery.offset = {
  initialize: function() {
    var body = document.body, container = document.createElement("div"), innerDiv, checkDiv, table, td, bodyMarginTop = parseFloat( jQuery.css(body, "marginTop") ) || 0,
      html = "<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";

    jQuery.extend( container.style, { position: "absolute", top: 0, left: 0, margin: 0, border: 0, width: "1px", height: "1px", visibility: "hidden" } );

    container.innerHTML = html;
    body.insertBefore( container, body.firstChild );
    innerDiv = container.firstChild;
    checkDiv = innerDiv.firstChild;
    td = innerDiv.nextSibling.firstChild.firstChild;

    this.doesNotAddBorder = (checkDiv.offsetTop !== 5);
    this.doesAddBorderForTableAndCells = (td.offsetTop === 5);

    checkDiv.style.position = "fixed";
    checkDiv.style.top = "20px";

    // safari subtracts parent border width here which is 5px
    this.supportsFixedPosition = (checkDiv.offsetTop === 20 || checkDiv.offsetTop === 15);
    checkDiv.style.position = checkDiv.style.top = "";

    innerDiv.style.overflow = "hidden";
    innerDiv.style.position = "relative";

    this.subtractsBorderForOverflowNotVisible = (checkDiv.offsetTop === -5);

    this.doesNotIncludeMarginInBodyOffset = (body.offsetTop !== bodyMarginTop);

    body.removeChild( container );
    jQuery.offset.initialize = jQuery.noop;
  },

  bodyOffset: function( body ) {
    var top = body.offsetTop,
      left = body.offsetLeft;

    jQuery.offset.initialize();

    if ( jQuery.offset.doesNotIncludeMarginInBodyOffset ) {
      top  += parseFloat( jQuery.css(body, "marginTop") ) || 0;
      left += parseFloat( jQuery.css(body, "marginLeft") ) || 0;
    }

    return { top: top, left: left };
  },

  setOffset: function( elem, options, i ) {
    var position = jQuery.css( elem, "position" );

    // set position first, in-case top/left are set even on static elem
    if ( position === "static" ) {
      elem.style.position = "relative";
    }

    var curElem = jQuery( elem ),
      curOffset = curElem.offset(),
      curCSSTop = jQuery.css( elem, "top" ),
      curCSSLeft = jQuery.css( elem, "left" ),
      calculatePosition = (position === "absolute" || position === "fixed") && jQuery.inArray('auto', [curCSSTop, curCSSLeft]) > -1,
      props = {}, curPosition = {}, curTop, curLeft;

    // need to be able to calculate position if either top or left is auto and position is either absolute or fixed
    if ( calculatePosition ) {
      curPosition = curElem.position();
    }

    curTop  = calculatePosition ? curPosition.top  : parseInt( curCSSTop,  10 ) || 0;
    curLeft = calculatePosition ? curPosition.left : parseInt( curCSSLeft, 10 ) || 0;

    if ( jQuery.isFunction( options ) ) {
      options = options.call( elem, i, curOffset );
    }

    if (options.top != null) {
      props.top = (options.top - curOffset.top) + curTop;
    }
    if (options.left != null) {
      props.left = (options.left - curOffset.left) + curLeft;
    }

    if ( "using" in options ) {
      options.using.call( elem, props );
    } else {
      curElem.css( props );
    }
  }
};


jQuery.fn.extend({
  position: function() {
    if ( !this[0] ) {
      return null;
    }

    var elem = this[0],

    // Get *real* offsetParent
    offsetParent = this.offsetParent(),

    // Get correct offsets
    offset       = this.offset(),
    parentOffset = rroot.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset();

    // Subtract element margins
    // note: when an element has margin: auto the offsetLeft and marginLeft
    // are the same in Safari causing offset.left to incorrectly be 0
    offset.top  -= parseFloat( jQuery.css(elem, "marginTop") ) || 0;
    offset.left -= parseFloat( jQuery.css(elem, "marginLeft") ) || 0;

    // Add offsetParent borders
    parentOffset.top  += parseFloat( jQuery.css(offsetParent[0], "borderTopWidth") ) || 0;
    parentOffset.left += parseFloat( jQuery.css(offsetParent[0], "borderLeftWidth") ) || 0;

    // Subtract the two offsets
    return {
      top:  offset.top  - parentOffset.top,
      left: offset.left - parentOffset.left
    };
  },

  offsetParent: function() {
    return this.map(function() {
      var offsetParent = this.offsetParent || document.body;
      while ( offsetParent && (!rroot.test(offsetParent.nodeName) && jQuery.css(offsetParent, "position") === "static") ) {
        offsetParent = offsetParent.offsetParent;
      }
      return offsetParent;
    });
  }
});


// Create scrollLeft and scrollTop methods
jQuery.each( ["Left", "Top"], function( i, name ) {
  var method = "scroll" + name;

  jQuery.fn[ method ] = function(val) {
    var elem = this[0], win;

    if ( !elem ) {
      return null;
    }

    if ( val !== undefined ) {
      // Set the scroll offset
      return this.each(function() {
        win = getWindow( this );

        if ( win ) {
          win.scrollTo(
            !i ? val : jQuery(win).scrollLeft(),
            i ? val : jQuery(win).scrollTop()
          );

        } else {
          this[ method ] = val;
        }
      });
    } else {
      win = getWindow( elem );

      // Return the scroll offset
      return win ? ("pageXOffset" in win) ? win[ i ? "pageYOffset" : "pageXOffset" ] :
        jQuery.support.boxModel && win.document.documentElement[ method ] ||
          win.document.body[ method ] :
        elem[ method ];
    }
  };
});

function getWindow( elem ) {
  return jQuery.isWindow( elem ) ?
    elem :
    elem.nodeType === 9 ?
      elem.defaultView || elem.parentWindow :
      false;
}




// Create innerHeight, innerWidth, outerHeight and outerWidth methods
jQuery.each([ "Height", "Width" ], function( i, name ) {

  var type = name.toLowerCase();

  // innerHeight and innerWidth
  jQuery.fn["inner" + name] = function() {
    return this[0] ?
      parseFloat( jQuery.css( this[0], type, "padding" ) ) :
      null;
  };

  // outerHeight and outerWidth
  jQuery.fn["outer" + name] = function( margin ) {
    return this[0] ?
      parseFloat( jQuery.css( this[0], type, margin ? "margin" : "border" ) ) :
      null;
  };

  jQuery.fn[ type ] = function( size ) {
    // Get window width or height
    var elem = this[0];
    if ( !elem ) {
      return size == null ? null : this;
    }

    if ( jQuery.isFunction( size ) ) {
      return this.each(function( i ) {
        var self = jQuery( this );
        self[ type ]( size.call( this, i, self[ type ]() ) );
      });
    }

    if ( jQuery.isWindow( elem ) ) {
      // Everyone else use document.documentElement or document.body depending on Quirks vs Standards mode
      // 3rd condition allows Nokia support, as it supports the docElem prop but not CSS1Compat
      var docElemProp = elem.document.documentElement[ "client" + name ];
      return elem.document.compatMode === "CSS1Compat" && docElemProp ||
        elem.document.body[ "client" + name ] || docElemProp;

    // Get document width or height
    } else if ( elem.nodeType === 9 ) {
      // Either scroll[Width/Height] or offset[Width/Height], whichever is greater
      return Math.max(
        elem.documentElement["client" + name],
        elem.body["scroll" + name], elem.documentElement["scroll" + name],
        elem.body["offset" + name], elem.documentElement["offset" + name]
      );

    // Get or set width or height on the element
    } else if ( size === undefined ) {
      var orig = jQuery.css( elem, type ),
        ret = parseFloat( orig );

      return jQuery.isNaN( ret ) ? orig : ret;

    // Set the width or height on the element (default to pixels if value is unitless)
    } else {
      return this.css( type, typeof size === "string" ? size : size + "px" );
    }
  };

});

return jQuery;
//window.jQuery = window.$ = jQuery;
})(window);
}
//-----------------------------------------------------------------------------
// End of jQuery
//-----------------------------------------------------------------------------
/*!
 * jQuery UI 1.8.11
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI
 */
(function(c,j){function k(a){return!c(a).parents().andSelf().filter(function(){return c.curCSS(this,"visibility")==="hidden"||c.expr.filters.hidden(this)}).length}c.ui=c.ui||{};if(!c.ui.version){c.extend(c.ui,{version:"1.8.11",keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,
NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91}});c.fn.extend({_focus:c.fn.focus,focus:function(a,b){return typeof a==="number"?this.each(function(){var d=this;setTimeout(function(){c(d).focus();b&&b.call(d)},a)}):this._focus.apply(this,arguments)},scrollParent:function(){var a;a=c.browser.msie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?this.parents().filter(function(){return/(relative|absolute|fixed)/.test(c.curCSS(this,
"position",1))&&/(auto|scroll)/.test(c.curCSS(this,"overflow",1)+c.curCSS(this,"overflow-y",1)+c.curCSS(this,"overflow-x",1))}).eq(0):this.parents().filter(function(){return/(auto|scroll)/.test(c.curCSS(this,"overflow",1)+c.curCSS(this,"overflow-y",1)+c.curCSS(this,"overflow-x",1))}).eq(0);return/fixed/.test(this.css("position"))||!a.length?c(document):a},zIndex:function(a){if(a!==j)return this.css("zIndex",a);if(this.length){a=c(this[0]);for(var b;a.length&&a[0]!==document;){b=a.css("position");
if(b==="absolute"||b==="relative"||b==="fixed"){b=parseInt(a.css("zIndex"),10);if(!isNaN(b)&&b!==0)return b}a=a.parent()}}return 0},disableSelection:function(){return this.bind((c.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(a){a.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}});c.each(["Width","Height"],function(a,b){function d(f,g,l,m){c.each(e,function(){g-=parseFloat(c.curCSS(f,"padding"+this,true))||0;if(l)g-=parseFloat(c.curCSS(f,
"border"+this+"Width",true))||0;if(m)g-=parseFloat(c.curCSS(f,"margin"+this,true))||0});return g}var e=b==="Width"?["Left","Right"]:["Top","Bottom"],h=b.toLowerCase(),i={innerWidth:c.fn.innerWidth,innerHeight:c.fn.innerHeight,outerWidth:c.fn.outerWidth,outerHeight:c.fn.outerHeight};c.fn["inner"+b]=function(f){if(f===j)return i["inner"+b].call(this);return this.each(function(){c(this).css(h,d(this,f)+"px")})};c.fn["outer"+b]=function(f,g){if(typeof f!=="number")return i["outer"+b].call(this,f);return this.each(function(){c(this).css(h,
d(this,f,true,g)+"px")})}});c.extend(c.expr[":"],{data:function(a,b,d){return!!c.data(a,d[3])},focusable:function(a){var b=a.nodeName.toLowerCase(),d=c.attr(a,"tabindex");if("area"===b){b=a.parentNode;d=b.name;if(!a.href||!d||b.nodeName.toLowerCase()!=="map")return false;a=c("img[usemap=#"+d+"]")[0];return!!a&&k(a)}return(/input|select|textarea|button|object/.test(b)?!a.disabled:"a"==b?a.href||!isNaN(d):!isNaN(d))&&k(a)},tabbable:function(a){var b=c.attr(a,"tabindex");return(isNaN(b)||b>=0)&&c(a).is(":focusable")}});
c(function(){var a=document.body,b=a.appendChild(b=document.createElement("div"));c.extend(b.style,{minHeight:"100px",height:"auto",padding:0,borderWidth:0});c.support.minHeight=b.offsetHeight===100;c.support.selectstart="onselectstart"in b;a.removeChild(b).style.display="none"});c.extend(c.ui,{plugin:{add:function(a,b,d){a=c.ui[a].prototype;for(var e in d){a.plugins[e]=a.plugins[e]||[];a.plugins[e].push([b,d[e]])}},call:function(a,b,d){if((b=a.plugins[b])&&a.element[0].parentNode)for(var e=0;e<b.length;e++)a.options[b[e][0]]&&
b[e][1].apply(a.element,d)}},contains:function(a,b){return document.compareDocumentPosition?a.compareDocumentPosition(b)&16:a!==b&&a.contains(b)},hasScroll:function(a,b){if(c(a).css("overflow")==="hidden")return false;b=b&&b==="left"?"scrollLeft":"scrollTop";var d=false;if(a[b]>0)return true;a[b]=1;d=a[b]>0;a[b]=0;return d},isOverAxis:function(a,b,d){return a>b&&a<b+d},isOver:function(a,b,d,e,h,i){return c.ui.isOverAxis(a,d,h)&&c.ui.isOverAxis(b,e,i)}})}})(jQuery);
;/*!
 * jQuery UI Widget 1.8.11
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Widget
 */
(function(b,j){if(b.cleanData){var k=b.cleanData;b.cleanData=function(a){for(var c=0,d;(d=a[c])!=null;c++)b(d).triggerHandler("remove");k(a)}}else{var l=b.fn.remove;b.fn.remove=function(a,c){return this.each(function(){if(!c)if(!a||b.filter(a,[this]).length)b("*",this).add([this]).each(function(){b(this).triggerHandler("remove")});return l.call(b(this),a,c)})}}b.widget=function(a,c,d){var e=a.split(".")[0],f;a=a.split(".")[1];f=e+"-"+a;if(!d){d=c;c=b.Widget}b.expr[":"][f]=function(h){return!!b.data(h,
a)};b[e]=b[e]||{};b[e][a]=function(h,g){arguments.length&&this._createWidget(h,g)};c=new c;c.options=b.extend(true,{},c.options);b[e][a].prototype=b.extend(true,c,{namespace:e,widgetName:a,widgetEventPrefix:b[e][a].prototype.widgetEventPrefix||a,widgetBaseClass:f},d);b.widget.bridge(a,b[e][a])};b.widget.bridge=function(a,c){b.fn[a]=function(d){var e=typeof d==="string",f=Array.prototype.slice.call(arguments,1),h=this;d=!e&&f.length?b.extend.apply(null,[true,d].concat(f)):d;if(e&&d.charAt(0)==="_")return h;
e?this.each(function(){var g=b.data(this,a),i=g&&b.isFunction(g[d])?g[d].apply(g,f):g;if(i!==g&&i!==j){h=i;return false}}):this.each(function(){var g=b.data(this,a);g?g.option(d||{})._init():b.data(this,a,new c(d,this))});return h}};b.Widget=function(a,c){arguments.length&&this._createWidget(a,c)};b.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",options:{disabled:false},_createWidget:function(a,c){b.data(c,this.widgetName,this);this.element=b(c);this.options=b.extend(true,{},this.options,
this._getCreateOptions(),a);var d=this;this.element.bind("remove."+this.widgetName,function(){d.destroy()});this._create();this._trigger("create");this._init()},_getCreateOptions:function(){return b.metadata&&b.metadata.get(this.element[0])[this.widgetName]},_create:function(){},_init:function(){},destroy:function(){this.element.unbind("."+this.widgetName).removeData(this.widgetName);this.widget().unbind("."+this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass+"-disabled ui-state-disabled")},
widget:function(){return this.element},option:function(a,c){var d=a;if(arguments.length===0)return b.extend({},this.options);if(typeof a==="string"){if(c===j)return this.options[a];d={};d[a]=c}this._setOptions(d);return this},_setOptions:function(a){var c=this;b.each(a,function(d,e){c._setOption(d,e)});return this},_setOption:function(a,c){this.options[a]=c;if(a==="disabled")this.widget()[c?"addClass":"removeClass"](this.widgetBaseClass+"-disabled ui-state-disabled").attr("aria-disabled",c);return this},
enable:function(){return this._setOption("disabled",false)},disable:function(){return this._setOption("disabled",true)},_trigger:function(a,c,d){var e=this.options[a];c=b.Event(c);c.type=(a===this.widgetEventPrefix?a:this.widgetEventPrefix+a).toLowerCase();d=d||{};if(c.originalEvent){a=b.event.props.length;for(var f;a;){f=b.event.props[--a];c[f]=c.originalEvent[f]}}this.element.trigger(c,d);return!(b.isFunction(e)&&e.call(this.element[0],c,d)===false||c.isDefaultPrevented())}}})(jQuery);
;/*!
 * jQuery UI Mouse 1.8.11
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Mouse
 *
 * Depends:
 *	jquery.ui.widget.js
 */
(function(b){b.widget("ui.mouse",{options:{cancel:":input,option",distance:1,delay:0},_mouseInit:function(){var a=this;this.element.bind("mousedown."+this.widgetName,function(c){return a._mouseDown(c)}).bind("click."+this.widgetName,function(c){if(true===b.data(c.target,a.widgetName+".preventClickEvent")){b.removeData(c.target,a.widgetName+".preventClickEvent");c.stopImmediatePropagation();return false}});this.started=false},_mouseDestroy:function(){this.element.unbind("."+this.widgetName)},_mouseDown:function(a){a.originalEvent=
a.originalEvent||{};if(!a.originalEvent.mouseHandled){this._mouseStarted&&this._mouseUp(a);this._mouseDownEvent=a;var c=this,e=a.which==1,f=typeof this.options.cancel=="string"?b(a.target).parents().add(a.target).filter(this.options.cancel).length:false;if(!e||f||!this._mouseCapture(a))return true;this.mouseDelayMet=!this.options.delay;if(!this.mouseDelayMet)this._mouseDelayTimer=setTimeout(function(){c.mouseDelayMet=true},this.options.delay);if(this._mouseDistanceMet(a)&&this._mouseDelayMet(a)){this._mouseStarted=
this._mouseStart(a)!==false;if(!this._mouseStarted){a.preventDefault();return true}}true===b.data(a.target,this.widgetName+".preventClickEvent")&&b.removeData(a.target,this.widgetName+".preventClickEvent");this._mouseMoveDelegate=function(d){return c._mouseMove(d)};this._mouseUpDelegate=function(d){return c._mouseUp(d)};b(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate);a.preventDefault();return a.originalEvent.mouseHandled=
true}},_mouseMove:function(a){if(b.browser.msie&&!(document.documentMode>=9)&&!a.button)return this._mouseUp(a);if(this._mouseStarted){this._mouseDrag(a);return a.preventDefault()}if(this._mouseDistanceMet(a)&&this._mouseDelayMet(a))(this._mouseStarted=this._mouseStart(this._mouseDownEvent,a)!==false)?this._mouseDrag(a):this._mouseUp(a);return!this._mouseStarted},_mouseUp:function(a){b(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate);
if(this._mouseStarted){this._mouseStarted=false;a.target==this._mouseDownEvent.target&&b.data(a.target,this.widgetName+".preventClickEvent",true);this._mouseStop(a)}return false},_mouseDistanceMet:function(a){return Math.max(Math.abs(this._mouseDownEvent.pageX-a.pageX),Math.abs(this._mouseDownEvent.pageY-a.pageY))>=this.options.distance},_mouseDelayMet:function(){return this.mouseDelayMet},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return true}})})(jQuery);
;/*
 * jQuery UI Position 1.8.11
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Position
 */
(function(c){c.ui=c.ui||{};var n=/left|center|right/,o=/top|center|bottom/,t=c.fn.position,u=c.fn.offset;c.fn.position=function(b){if(!b||!b.of)return t.apply(this,arguments);b=c.extend({},b);var a=c(b.of),d=a[0],g=(b.collision||"flip").split(" "),e=b.offset?b.offset.split(" "):[0,0],h,k,j;if(d.nodeType===9){h=a.width();k=a.height();j={top:0,left:0}}else if(d.setTimeout){h=a.width();k=a.height();j={top:a.scrollTop(),left:a.scrollLeft()}}else if(d.preventDefault){b.at="left top";h=k=0;j={top:b.of.pageY,
left:b.of.pageX}}else{h=a.outerWidth();k=a.outerHeight();j=a.offset()}c.each(["my","at"],function(){var f=(b[this]||"").split(" ");if(f.length===1)f=n.test(f[0])?f.concat(["center"]):o.test(f[0])?["center"].concat(f):["center","center"];f[0]=n.test(f[0])?f[0]:"center";f[1]=o.test(f[1])?f[1]:"center";b[this]=f});if(g.length===1)g[1]=g[0];e[0]=parseInt(e[0],10)||0;if(e.length===1)e[1]=e[0];e[1]=parseInt(e[1],10)||0;if(b.at[0]==="right")j.left+=h;else if(b.at[0]==="center")j.left+=h/2;if(b.at[1]==="bottom")j.top+=
k;else if(b.at[1]==="center")j.top+=k/2;j.left+=e[0];j.top+=e[1];return this.each(function(){var f=c(this),l=f.outerWidth(),m=f.outerHeight(),p=parseInt(c.curCSS(this,"marginLeft",true))||0,q=parseInt(c.curCSS(this,"marginTop",true))||0,v=l+p+(parseInt(c.curCSS(this,"marginRight",true))||0),w=m+q+(parseInt(c.curCSS(this,"marginBottom",true))||0),i=c.extend({},j),r;if(b.my[0]==="right")i.left-=l;else if(b.my[0]==="center")i.left-=l/2;if(b.my[1]==="bottom")i.top-=m;else if(b.my[1]==="center")i.top-=
m/2;i.left=Math.round(i.left);i.top=Math.round(i.top);r={left:i.left-p,top:i.top-q};c.each(["left","top"],function(s,x){c.ui.position[g[s]]&&c.ui.position[g[s]][x](i,{targetWidth:h,targetHeight:k,elemWidth:l,elemHeight:m,collisionPosition:r,collisionWidth:v,collisionHeight:w,offset:e,my:b.my,at:b.at})});c.fn.bgiframe&&f.bgiframe();f.offset(c.extend(i,{using:b.using}))})};c.ui.position={fit:{left:function(b,a){var d=c(window);d=a.collisionPosition.left+a.collisionWidth-d.width()-d.scrollLeft();b.left=
d>0?b.left-d:Math.max(b.left-a.collisionPosition.left,b.left)},top:function(b,a){var d=c(window);d=a.collisionPosition.top+a.collisionHeight-d.height()-d.scrollTop();b.top=d>0?b.top-d:Math.max(b.top-a.collisionPosition.top,b.top)}},flip:{left:function(b,a){if(a.at[0]!=="center"){var d=c(window);d=a.collisionPosition.left+a.collisionWidth-d.width()-d.scrollLeft();var g=a.my[0]==="left"?-a.elemWidth:a.my[0]==="right"?a.elemWidth:0,e=a.at[0]==="left"?a.targetWidth:-a.targetWidth,h=-2*a.offset[0];b.left+=
a.collisionPosition.left<0?g+e+h:d>0?g+e+h:0}},top:function(b,a){if(a.at[1]!=="center"){var d=c(window);d=a.collisionPosition.top+a.collisionHeight-d.height()-d.scrollTop();var g=a.my[1]==="top"?-a.elemHeight:a.my[1]==="bottom"?a.elemHeight:0,e=a.at[1]==="top"?a.targetHeight:-a.targetHeight,h=-2*a.offset[1];b.top+=a.collisionPosition.top<0?g+e+h:d>0?g+e+h:0}}}};if(!c.offset.setOffset){c.offset.setOffset=function(b,a){if(/static/.test(c.curCSS(b,"position")))b.style.position="relative";var d=c(b),
g=d.offset(),e=parseInt(c.curCSS(b,"top",true),10)||0,h=parseInt(c.curCSS(b,"left",true),10)||0;g={top:a.top-g.top+e,left:a.left-g.left+h};"using"in a?a.using.call(b,g):d.css(g)};c.fn.offset=function(b){var a=this[0];if(!a||!a.ownerDocument)return null;if(b)return this.each(function(){c.offset.setOffset(this,b)});return u.call(this)}}})(jQuery);
;/*
 * jQuery UI Draggable 1.8.11
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Draggables
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.mouse.js
 *	jquery.ui.widget.js
 */
(function(d){d.widget("ui.draggable",d.ui.mouse,{widgetEventPrefix:"drag",options:{addClasses:true,appendTo:"parent",axis:false,connectToSortable:false,containment:false,cursor:"auto",cursorAt:false,grid:false,handle:false,helper:"original",iframeFix:false,opacity:false,refreshPositions:false,revert:false,revertDuration:500,scope:"default",scroll:true,scrollSensitivity:20,scrollSpeed:20,snap:false,snapMode:"both",snapTolerance:20,stack:false,zIndex:false},_create:function(){if(this.options.helper==
"original"&&!/^(?:r|a|f)/.test(this.element.css("position")))this.element[0].style.position="relative";this.options.addClasses&&this.element.addClass("ui-draggable");this.options.disabled&&this.element.addClass("ui-draggable-disabled");this._mouseInit()},destroy:function(){if(this.element.data("draggable")){this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled");this._mouseDestroy();return this}},_mouseCapture:function(a){var b=
this.options;if(this.helper||b.disabled||d(a.target).is(".ui-resizable-handle"))return false;this.handle=this._getHandle(a);if(!this.handle)return false;return true},_mouseStart:function(a){var b=this.options;this.helper=this._createHelper(a);this._cacheHelperProportions();if(d.ui.ddmanager)d.ui.ddmanager.current=this;this._cacheMargins();this.cssPosition=this.helper.css("position");this.scrollParent=this.helper.scrollParent();this.offset=this.positionAbs=this.element.offset();this.offset={top:this.offset.top-
this.margins.top,left:this.offset.left-this.margins.left};d.extend(this.offset,{click:{left:a.pageX-this.offset.left,top:a.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()});this.originalPosition=this.position=this._generatePosition(a);this.originalPageX=a.pageX;this.originalPageY=a.pageY;b.cursorAt&&this._adjustOffsetFromHelper(b.cursorAt);b.containment&&this._setContainment();if(this._trigger("start",a)===false){this._clear();return false}this._cacheHelperProportions();
d.ui.ddmanager&&!b.dropBehaviour&&d.ui.ddmanager.prepareOffsets(this,a);this.helper.addClass("ui-draggable-dragging");this._mouseDrag(a,true);return true},_mouseDrag:function(a,b){this.position=this._generatePosition(a);this.positionAbs=this._convertPositionTo("absolute");if(!b){b=this._uiHash();if(this._trigger("drag",a,b)===false){this._mouseUp({});return false}this.position=b.position}if(!this.options.axis||this.options.axis!="y")this.helper[0].style.left=this.position.left+"px";if(!this.options.axis||
this.options.axis!="x")this.helper[0].style.top=this.position.top+"px";d.ui.ddmanager&&d.ui.ddmanager.drag(this,a);return false},_mouseStop:function(a){var b=false;if(d.ui.ddmanager&&!this.options.dropBehaviour)b=d.ui.ddmanager.drop(this,a);if(this.dropped){b=this.dropped;this.dropped=false}if((!this.element[0]||!this.element[0].parentNode)&&this.options.helper=="original")return false;if(this.options.revert=="invalid"&&!b||this.options.revert=="valid"&&b||this.options.revert===true||d.isFunction(this.options.revert)&&
this.options.revert.call(this.element,b)){var c=this;d(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){c._trigger("stop",a)!==false&&c._clear()})}else this._trigger("stop",a)!==false&&this._clear();return false},cancel:function(){this.helper.is(".ui-draggable-dragging")?this._mouseUp({}):this._clear();return this},_getHandle:function(a){var b=!this.options.handle||!d(this.options.handle,this.element).length?true:false;d(this.options.handle,this.element).find("*").andSelf().each(function(){if(this==
a.target)b=true});return b},_createHelper:function(a){var b=this.options;a=d.isFunction(b.helper)?d(b.helper.apply(this.element[0],[a])):b.helper=="clone"?this.element.clone():this.element;a.parents("body").length||a.appendTo(b.appendTo=="parent"?this.element[0].parentNode:b.appendTo);a[0]!=this.element[0]&&!/(fixed|absolute)/.test(a.css("position"))&&a.css("position","absolute");return a},_adjustOffsetFromHelper:function(a){if(typeof a=="string")a=a.split(" ");if(d.isArray(a))a={left:+a[0],top:+a[1]||
0};if("left"in a)this.offset.click.left=a.left+this.margins.left;if("right"in a)this.offset.click.left=this.helperProportions.width-a.right+this.margins.left;if("top"in a)this.offset.click.top=a.top+this.margins.top;if("bottom"in a)this.offset.click.top=this.helperProportions.height-a.bottom+this.margins.top},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var a=this.offsetParent.offset();if(this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&d.ui.contains(this.scrollParent[0],
this.offsetParent[0])){a.left+=this.scrollParent.scrollLeft();a.top+=this.scrollParent.scrollTop()}if(this.offsetParent[0]==document.body||this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&d.browser.msie)a={top:0,left:0};return{top:a.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:a.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if(this.cssPosition=="relative"){var a=this.element.position();return{top:a.top-
(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:a.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}else return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.element.css("marginLeft"),10)||0,top:parseInt(this.element.css("marginTop"),10)||0,right:parseInt(this.element.css("marginRight"),10)||0,bottom:parseInt(this.element.css("marginBottom"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),
height:this.helper.outerHeight()}},_setContainment:function(){var a=this.options;if(a.containment=="parent")a.containment=this.helper[0].parentNode;if(a.containment=="document"||a.containment=="window")this.containment=[(a.containment=="document"?0:d(window).scrollLeft())-this.offset.relative.left-this.offset.parent.left,(a.containment=="document"?0:d(window).scrollTop())-this.offset.relative.top-this.offset.parent.top,(a.containment=="document"?0:d(window).scrollLeft())+d(a.containment=="document"?
document:window).width()-this.helperProportions.width-this.margins.left,(a.containment=="document"?0:d(window).scrollTop())+(d(a.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top];if(!/^(document|window|parent)$/.test(a.containment)&&a.containment.constructor!=Array){var b=d(a.containment)[0];if(b){a=d(a.containment).offset();var c=d(b).css("overflow")!="hidden";this.containment=[a.left+(parseInt(d(b).css("borderLeftWidth"),
10)||0)+(parseInt(d(b).css("paddingLeft"),10)||0),a.top+(parseInt(d(b).css("borderTopWidth"),10)||0)+(parseInt(d(b).css("paddingTop"),10)||0),a.left+(c?Math.max(b.scrollWidth,b.offsetWidth):b.offsetWidth)-(parseInt(d(b).css("borderLeftWidth"),10)||0)-(parseInt(d(b).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,a.top+(c?Math.max(b.scrollHeight,b.offsetHeight):b.offsetHeight)-(parseInt(d(b).css("borderTopWidth"),10)||0)-(parseInt(d(b).css("paddingBottom"),
10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom]}}else if(a.containment.constructor==Array)this.containment=a.containment},_convertPositionTo:function(a,b){if(!b)b=this.position;a=a=="absolute"?1:-1;var c=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&d.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,f=/(html|body)/i.test(c[0].tagName);return{top:b.top+this.offset.relative.top*a+this.offset.parent.top*a-(d.browser.safari&&
d.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():f?0:c.scrollTop())*a),left:b.left+this.offset.relative.left*a+this.offset.parent.left*a-(d.browser.safari&&d.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():f?0:c.scrollLeft())*a)}},_generatePosition:function(a){var b=this.options,c=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&d.ui.contains(this.scrollParent[0],
this.offsetParent[0]))?this.offsetParent:this.scrollParent,f=/(html|body)/i.test(c[0].tagName),e=a.pageX,g=a.pageY;if(this.originalPosition){if(this.containment){if(a.pageX-this.offset.click.left<this.containment[0])e=this.containment[0]+this.offset.click.left;if(a.pageY-this.offset.click.top<this.containment[1])g=this.containment[1]+this.offset.click.top;if(a.pageX-this.offset.click.left>this.containment[2])e=this.containment[2]+this.offset.click.left;if(a.pageY-this.offset.click.top>this.containment[3])g=
this.containment[3]+this.offset.click.top}if(b.grid){g=this.originalPageY+Math.round((g-this.originalPageY)/b.grid[1])*b.grid[1];g=this.containment?!(g-this.offset.click.top<this.containment[1]||g-this.offset.click.top>this.containment[3])?g:!(g-this.offset.click.top<this.containment[1])?g-b.grid[1]:g+b.grid[1]:g;e=this.originalPageX+Math.round((e-this.originalPageX)/b.grid[0])*b.grid[0];e=this.containment?!(e-this.offset.click.left<this.containment[0]||e-this.offset.click.left>this.containment[2])?
e:!(e-this.offset.click.left<this.containment[0])?e-b.grid[0]:e+b.grid[0]:e}}return{top:g-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(d.browser.safari&&d.browser.version<526&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollTop():f?0:c.scrollTop()),left:e-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(d.browser.safari&&d.browser.version<526&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():
f?0:c.scrollLeft())}},_clear:function(){this.helper.removeClass("ui-draggable-dragging");this.helper[0]!=this.element[0]&&!this.cancelHelperRemoval&&this.helper.remove();this.helper=null;this.cancelHelperRemoval=false},_trigger:function(a,b,c){c=c||this._uiHash();d.ui.plugin.call(this,a,[b,c]);if(a=="drag")this.positionAbs=this._convertPositionTo("absolute");return d.Widget.prototype._trigger.call(this,a,b,c)},plugins:{},_uiHash:function(){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,
offset:this.positionAbs}}});d.extend(d.ui.draggable,{version:"1.8.11"});d.ui.plugin.add("draggable","connectToSortable",{start:function(a,b){var c=d(this).data("draggable"),f=c.options,e=d.extend({},b,{item:c.element});c.sortables=[];d(f.connectToSortable).each(function(){var g=d.data(this,"sortable");if(g&&!g.options.disabled){c.sortables.push({instance:g,shouldRevert:g.options.revert});g.refreshPositions();g._trigger("activate",a,e)}})},stop:function(a,b){var c=d(this).data("draggable"),f=d.extend({},
b,{item:c.element});d.each(c.sortables,function(){if(this.instance.isOver){this.instance.isOver=0;c.cancelHelperRemoval=true;this.instance.cancelHelperRemoval=false;if(this.shouldRevert)this.instance.options.revert=true;this.instance._mouseStop(a);this.instance.options.helper=this.instance.options._helper;c.options.helper=="original"&&this.instance.currentItem.css({top:"auto",left:"auto"})}else{this.instance.cancelHelperRemoval=false;this.instance._trigger("deactivate",a,f)}})},drag:function(a,b){var c=
d(this).data("draggable"),f=this;d.each(c.sortables,function(){this.instance.positionAbs=c.positionAbs;this.instance.helperProportions=c.helperProportions;this.instance.offset.click=c.offset.click;if(this.instance._intersectsWith(this.instance.containerCache)){if(!this.instance.isOver){this.instance.isOver=1;this.instance.currentItem=d(f).clone().appendTo(this.instance.element).data("sortable-item",true);this.instance.options._helper=this.instance.options.helper;this.instance.options.helper=function(){return b.helper[0]};
a.target=this.instance.currentItem[0];this.instance._mouseCapture(a,true);this.instance._mouseStart(a,true,true);this.instance.offset.click.top=c.offset.click.top;this.instance.offset.click.left=c.offset.click.left;this.instance.offset.parent.left-=c.offset.parent.left-this.instance.offset.parent.left;this.instance.offset.parent.top-=c.offset.parent.top-this.instance.offset.parent.top;c._trigger("toSortable",a);c.dropped=this.instance.element;c.currentItem=c.element;this.instance.fromOutside=c}this.instance.currentItem&&
this.instance._mouseDrag(a)}else if(this.instance.isOver){this.instance.isOver=0;this.instance.cancelHelperRemoval=true;this.instance.options.revert=false;this.instance._trigger("out",a,this.instance._uiHash(this.instance));this.instance._mouseStop(a,true);this.instance.options.helper=this.instance.options._helper;this.instance.currentItem.remove();this.instance.placeholder&&this.instance.placeholder.remove();c._trigger("fromSortable",a);c.dropped=false}})}});d.ui.plugin.add("draggable","cursor",
{start:function(){var a=d("body"),b=d(this).data("draggable").options;if(a.css("cursor"))b._cursor=a.css("cursor");a.css("cursor",b.cursor)},stop:function(){var a=d(this).data("draggable").options;a._cursor&&d("body").css("cursor",a._cursor)}});d.ui.plugin.add("draggable","iframeFix",{start:function(){var a=d(this).data("draggable").options;d(a.iframeFix===true?"iframe":a.iframeFix).each(function(){d('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({width:this.offsetWidth+
"px",height:this.offsetHeight+"px",position:"absolute",opacity:"0.001",zIndex:1E3}).css(d(this).offset()).appendTo("body")})},stop:function(){d("div.ui-draggable-iframeFix").each(function(){this.parentNode.removeChild(this)})}});d.ui.plugin.add("draggable","opacity",{start:function(a,b){a=d(b.helper);b=d(this).data("draggable").options;if(a.css("opacity"))b._opacity=a.css("opacity");a.css("opacity",b.opacity)},stop:function(a,b){a=d(this).data("draggable").options;a._opacity&&d(b.helper).css("opacity",
a._opacity)}});d.ui.plugin.add("draggable","scroll",{start:function(){var a=d(this).data("draggable");if(a.scrollParent[0]!=document&&a.scrollParent[0].tagName!="HTML")a.overflowOffset=a.scrollParent.offset()},drag:function(a){var b=d(this).data("draggable"),c=b.options,f=false;if(b.scrollParent[0]!=document&&b.scrollParent[0].tagName!="HTML"){if(!c.axis||c.axis!="x")if(b.overflowOffset.top+b.scrollParent[0].offsetHeight-a.pageY<c.scrollSensitivity)b.scrollParent[0].scrollTop=f=b.scrollParent[0].scrollTop+
c.scrollSpeed;else if(a.pageY-b.overflowOffset.top<c.scrollSensitivity)b.scrollParent[0].scrollTop=f=b.scrollParent[0].scrollTop-c.scrollSpeed;if(!c.axis||c.axis!="y")if(b.overflowOffset.left+b.scrollParent[0].offsetWidth-a.pageX<c.scrollSensitivity)b.scrollParent[0].scrollLeft=f=b.scrollParent[0].scrollLeft+c.scrollSpeed;else if(a.pageX-b.overflowOffset.left<c.scrollSensitivity)b.scrollParent[0].scrollLeft=f=b.scrollParent[0].scrollLeft-c.scrollSpeed}else{if(!c.axis||c.axis!="x")if(a.pageY-d(document).scrollTop()<
c.scrollSensitivity)f=d(document).scrollTop(d(document).scrollTop()-c.scrollSpeed);else if(d(window).height()-(a.pageY-d(document).scrollTop())<c.scrollSensitivity)f=d(document).scrollTop(d(document).scrollTop()+c.scrollSpeed);if(!c.axis||c.axis!="y")if(a.pageX-d(document).scrollLeft()<c.scrollSensitivity)f=d(document).scrollLeft(d(document).scrollLeft()-c.scrollSpeed);else if(d(window).width()-(a.pageX-d(document).scrollLeft())<c.scrollSensitivity)f=d(document).scrollLeft(d(document).scrollLeft()+
c.scrollSpeed)}f!==false&&d.ui.ddmanager&&!c.dropBehaviour&&d.ui.ddmanager.prepareOffsets(b,a)}});d.ui.plugin.add("draggable","snap",{start:function(){var a=d(this).data("draggable"),b=a.options;a.snapElements=[];d(b.snap.constructor!=String?b.snap.items||":data(draggable)":b.snap).each(function(){var c=d(this),f=c.offset();this!=a.element[0]&&a.snapElements.push({item:this,width:c.outerWidth(),height:c.outerHeight(),top:f.top,left:f.left})})},drag:function(a,b){for(var c=d(this).data("draggable"),
f=c.options,e=f.snapTolerance,g=b.offset.left,n=g+c.helperProportions.width,m=b.offset.top,o=m+c.helperProportions.height,h=c.snapElements.length-1;h>=0;h--){var i=c.snapElements[h].left,k=i+c.snapElements[h].width,j=c.snapElements[h].top,l=j+c.snapElements[h].height;if(i-e<g&&g<k+e&&j-e<m&&m<l+e||i-e<g&&g<k+e&&j-e<o&&o<l+e||i-e<n&&n<k+e&&j-e<m&&m<l+e||i-e<n&&n<k+e&&j-e<o&&o<l+e){if(f.snapMode!="inner"){var p=Math.abs(j-o)<=e,q=Math.abs(l-m)<=e,r=Math.abs(i-n)<=e,s=Math.abs(k-g)<=e;if(p)b.position.top=
c._convertPositionTo("relative",{top:j-c.helperProportions.height,left:0}).top-c.margins.top;if(q)b.position.top=c._convertPositionTo("relative",{top:l,left:0}).top-c.margins.top;if(r)b.position.left=c._convertPositionTo("relative",{top:0,left:i-c.helperProportions.width}).left-c.margins.left;if(s)b.position.left=c._convertPositionTo("relative",{top:0,left:k}).left-c.margins.left}var t=p||q||r||s;if(f.snapMode!="outer"){p=Math.abs(j-m)<=e;q=Math.abs(l-o)<=e;r=Math.abs(i-g)<=e;s=Math.abs(k-n)<=e;if(p)b.position.top=
c._convertPositionTo("relative",{top:j,left:0}).top-c.margins.top;if(q)b.position.top=c._convertPositionTo("relative",{top:l-c.helperProportions.height,left:0}).top-c.margins.top;if(r)b.position.left=c._convertPositionTo("relative",{top:0,left:i}).left-c.margins.left;if(s)b.position.left=c._convertPositionTo("relative",{top:0,left:k-c.helperProportions.width}).left-c.margins.left}if(!c.snapElements[h].snapping&&(p||q||r||s||t))c.options.snap.snap&&c.options.snap.snap.call(c.element,a,d.extend(c._uiHash(),
{snapItem:c.snapElements[h].item}));c.snapElements[h].snapping=p||q||r||s||t}else{c.snapElements[h].snapping&&c.options.snap.release&&c.options.snap.release.call(c.element,a,d.extend(c._uiHash(),{snapItem:c.snapElements[h].item}));c.snapElements[h].snapping=false}}}});d.ui.plugin.add("draggable","stack",{start:function(){var a=d(this).data("draggable").options;a=d.makeArray(d(a.stack)).sort(function(c,f){return(parseInt(d(c).css("zIndex"),10)||0)-(parseInt(d(f).css("zIndex"),10)||0)});if(a.length){var b=
parseInt(a[0].style.zIndex)||0;d(a).each(function(c){this.style.zIndex=b+c});this[0].style.zIndex=b+a.length}}});d.ui.plugin.add("draggable","zIndex",{start:function(a,b){a=d(b.helper);b=d(this).data("draggable").options;if(a.css("zIndex"))b._zIndex=a.css("zIndex");a.css("zIndex",b.zIndex)},stop:function(a,b){a=d(this).data("draggable").options;a._zIndex&&d(b.helper).css("zIndex",a._zIndex)}})})(jQuery);
;/*
 * jQuery UI Resizable 1.8.11
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Resizables
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.mouse.js
 *	jquery.ui.widget.js
 */
(function(e){e.widget("ui.resizable",e.ui.mouse,{widgetEventPrefix:"resize",options:{alsoResize:false,animate:false,animateDuration:"slow",animateEasing:"swing",aspectRatio:false,autoHide:false,containment:false,ghost:false,grid:false,handles:"e,s,se",helper:false,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:1E3},_create:function(){var b=this,a=this.options;this.element.addClass("ui-resizable");e.extend(this,{_aspectRatio:!!a.aspectRatio,aspectRatio:a.aspectRatio,originalElement:this.element,
_proportionallyResizeElements:[],_helper:a.helper||a.ghost||a.animate?a.helper||"ui-resizable-helper":null});if(this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)){/relative/.test(this.element.css("position"))&&e.browser.opera&&this.element.css({position:"relative",top:"auto",left:"auto"});this.element.wrap(e('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),
top:this.element.css("top"),left:this.element.css("left")}));this.element=this.element.parent().data("resizable",this.element.data("resizable"));this.elementIsWrapper=true;this.element.css({marginLeft:this.originalElement.css("marginLeft"),marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom")});this.originalElement.css({marginLeft:0,marginTop:0,marginRight:0,marginBottom:0});this.originalResizeStyle=
this.originalElement.css("resize");this.originalElement.css("resize","none");this._proportionallyResizeElements.push(this.originalElement.css({position:"static",zoom:1,display:"block"}));this.originalElement.css({margin:this.originalElement.css("margin")});this._proportionallyResize()}this.handles=a.handles||(!e(".ui-resizable-handle",this.element).length?"e,s,se":{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",
nw:".ui-resizable-nw"});if(this.handles.constructor==String){if(this.handles=="all")this.handles="n,e,s,w,se,sw,ne,nw";var c=this.handles.split(",");this.handles={};for(var d=0;d<c.length;d++){var f=e.trim(c[d]),g=e('<div class="ui-resizable-handle '+("ui-resizable-"+f)+'"></div>');/sw|se|ne|nw/.test(f)&&g.css({zIndex:++a.zIndex});"se"==f&&g.addClass("ui-icon ui-icon-gripsmall-diagonal-se");this.handles[f]=".ui-resizable-"+f;this.element.append(g)}}this._renderAxis=function(h){h=h||this.element;for(var i in this.handles){if(this.handles[i].constructor==
String)this.handles[i]=e(this.handles[i],this.element).show();if(this.elementIsWrapper&&this.originalElement[0].nodeName.match(/textarea|input|select|button/i)){var j=e(this.handles[i],this.element),k=0;k=/sw|ne|nw|se|n|s/.test(i)?j.outerHeight():j.outerWidth();j=["padding",/ne|nw|n/.test(i)?"Top":/se|sw|s/.test(i)?"Bottom":/^e$/.test(i)?"Right":"Left"].join("");h.css(j,k);this._proportionallyResize()}e(this.handles[i])}};this._renderAxis(this.element);this._handles=e(".ui-resizable-handle",this.element).disableSelection();
this._handles.mouseover(function(){if(!b.resizing){if(this.className)var h=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);b.axis=h&&h[1]?h[1]:"se"}});if(a.autoHide){this._handles.hide();e(this.element).addClass("ui-resizable-autohide").hover(function(){e(this).removeClass("ui-resizable-autohide");b._handles.show()},function(){if(!b.resizing){e(this).addClass("ui-resizable-autohide");b._handles.hide()}})}this._mouseInit()},destroy:function(){this._mouseDestroy();var b=function(c){e(c).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").unbind(".resizable").find(".ui-resizable-handle").remove()};
if(this.elementIsWrapper){b(this.element);var a=this.element;a.after(this.originalElement.css({position:a.css("position"),width:a.outerWidth(),height:a.outerHeight(),top:a.css("top"),left:a.css("left")})).remove()}this.originalElement.css("resize",this.originalResizeStyle);b(this.originalElement);return this},_mouseCapture:function(b){var a=false;for(var c in this.handles)if(e(this.handles[c])[0]==b.target)a=true;return!this.options.disabled&&a},_mouseStart:function(b){var a=this.options,c=this.element.position(),
d=this.element;this.resizing=true;this.documentScroll={top:e(document).scrollTop(),left:e(document).scrollLeft()};if(d.is(".ui-draggable")||/absolute/.test(d.css("position")))d.css({position:"absolute",top:c.top,left:c.left});e.browser.opera&&/relative/.test(d.css("position"))&&d.css({position:"relative",top:"auto",left:"auto"});this._renderProxy();c=m(this.helper.css("left"));var f=m(this.helper.css("top"));if(a.containment){c+=e(a.containment).scrollLeft()||0;f+=e(a.containment).scrollTop()||0}this.offset=
this.helper.offset();this.position={left:c,top:f};this.size=this._helper?{width:d.outerWidth(),height:d.outerHeight()}:{width:d.width(),height:d.height()};this.originalSize=this._helper?{width:d.outerWidth(),height:d.outerHeight()}:{width:d.width(),height:d.height()};this.originalPosition={left:c,top:f};this.sizeDiff={width:d.outerWidth()-d.width(),height:d.outerHeight()-d.height()};this.originalMousePosition={left:b.pageX,top:b.pageY};this.aspectRatio=typeof a.aspectRatio=="number"?a.aspectRatio:
this.originalSize.width/this.originalSize.height||1;a=e(".ui-resizable-"+this.axis).css("cursor");e("body").css("cursor",a=="auto"?this.axis+"-resize":a);d.addClass("ui-resizable-resizing");this._propagate("start",b);return true},_mouseDrag:function(b){var a=this.helper,c=this.originalMousePosition,d=this._change[this.axis];if(!d)return false;c=d.apply(this,[b,b.pageX-c.left||0,b.pageY-c.top||0]);if(this._aspectRatio||b.shiftKey)c=this._updateRatio(c,b);c=this._respectSize(c,b);this._propagate("resize",
b);a.css({top:this.position.top+"px",left:this.position.left+"px",width:this.size.width+"px",height:this.size.height+"px"});!this._helper&&this._proportionallyResizeElements.length&&this._proportionallyResize();this._updateCache(c);this._trigger("resize",b,this.ui());return false},_mouseStop:function(b){this.resizing=false;var a=this.options,c=this;if(this._helper){var d=this._proportionallyResizeElements,f=d.length&&/textarea/i.test(d[0].nodeName);d=f&&e.ui.hasScroll(d[0],"left")?0:c.sizeDiff.height;
f=f?0:c.sizeDiff.width;f={width:c.helper.width()-f,height:c.helper.height()-d};d=parseInt(c.element.css("left"),10)+(c.position.left-c.originalPosition.left)||null;var g=parseInt(c.element.css("top"),10)+(c.position.top-c.originalPosition.top)||null;a.animate||this.element.css(e.extend(f,{top:g,left:d}));c.helper.height(c.size.height);c.helper.width(c.size.width);this._helper&&!a.animate&&this._proportionallyResize()}e("body").css("cursor","auto");this.element.removeClass("ui-resizable-resizing");
this._propagate("stop",b);this._helper&&this.helper.remove();return false},_updateCache:function(b){this.offset=this.helper.offset();if(l(b.left))this.position.left=b.left;if(l(b.top))this.position.top=b.top;if(l(b.height))this.size.height=b.height;if(l(b.width))this.size.width=b.width},_updateRatio:function(b){var a=this.position,c=this.size,d=this.axis;if(b.height)b.width=c.height*this.aspectRatio;else if(b.width)b.height=c.width/this.aspectRatio;if(d=="sw"){b.left=a.left+(c.width-b.width);b.top=
null}if(d=="nw"){b.top=a.top+(c.height-b.height);b.left=a.left+(c.width-b.width)}return b},_respectSize:function(b){var a=this.options,c=this.axis,d=l(b.width)&&a.maxWidth&&a.maxWidth<b.width,f=l(b.height)&&a.maxHeight&&a.maxHeight<b.height,g=l(b.width)&&a.minWidth&&a.minWidth>b.width,h=l(b.height)&&a.minHeight&&a.minHeight>b.height;if(g)b.width=a.minWidth;if(h)b.height=a.minHeight;if(d)b.width=a.maxWidth;if(f)b.height=a.maxHeight;var i=this.originalPosition.left+this.originalSize.width,j=this.position.top+
this.size.height,k=/sw|nw|w/.test(c);c=/nw|ne|n/.test(c);if(g&&k)b.left=i-a.minWidth;if(d&&k)b.left=i-a.maxWidth;if(h&&c)b.top=j-a.minHeight;if(f&&c)b.top=j-a.maxHeight;if((a=!b.width&&!b.height)&&!b.left&&b.top)b.top=null;else if(a&&!b.top&&b.left)b.left=null;return b},_proportionallyResize:function(){if(this._proportionallyResizeElements.length)for(var b=this.helper||this.element,a=0;a<this._proportionallyResizeElements.length;a++){var c=this._proportionallyResizeElements[a];if(!this.borderDif){var d=
[c.css("borderTopWidth"),c.css("borderRightWidth"),c.css("borderBottomWidth"),c.css("borderLeftWidth")],f=[c.css("paddingTop"),c.css("paddingRight"),c.css("paddingBottom"),c.css("paddingLeft")];this.borderDif=e.map(d,function(g,h){g=parseInt(g,10)||0;h=parseInt(f[h],10)||0;return g+h})}e.browser.msie&&(e(b).is(":hidden")||e(b).parents(":hidden").length)||c.css({height:b.height()-this.borderDif[0]-this.borderDif[2]||0,width:b.width()-this.borderDif[1]-this.borderDif[3]||0})}},_renderProxy:function(){var b=
this.options;this.elementOffset=this.element.offset();if(this._helper){this.helper=this.helper||e('<div style="overflow:hidden;"></div>');var a=e.browser.msie&&e.browser.version<7,c=a?1:0;a=a?2:-1;this.helper.addClass(this._helper).css({width:this.element.outerWidth()+a,height:this.element.outerHeight()+a,position:"absolute",left:this.elementOffset.left-c+"px",top:this.elementOffset.top-c+"px",zIndex:++b.zIndex});this.helper.appendTo("body").disableSelection()}else this.helper=this.element},_change:{e:function(b,
a){return{width:this.originalSize.width+a}},w:function(b,a){return{left:this.originalPosition.left+a,width:this.originalSize.width-a}},n:function(b,a,c){return{top:this.originalPosition.top+c,height:this.originalSize.height-c}},s:function(b,a,c){return{height:this.originalSize.height+c}},se:function(b,a,c){return e.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[b,a,c]))},sw:function(b,a,c){return e.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[b,a,
c]))},ne:function(b,a,c){return e.extend(this._change.n.apply(this,arguments),this._change.e.apply(this,[b,a,c]))},nw:function(b,a,c){return e.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[b,a,c]))}},_propagate:function(b,a){e.ui.plugin.call(this,b,[a,this.ui()]);b!="resize"&&this._trigger(b,a,this.ui())},plugins:{},ui:function(){return{originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,
originalPosition:this.originalPosition}}});e.extend(e.ui.resizable,{version:"1.8.11"});e.ui.plugin.add("resizable","alsoResize",{start:function(){var b=e(this).data("resizable").options,a=function(c){e(c).each(function(){var d=e(this);d.data("resizable-alsoresize",{width:parseInt(d.width(),10),height:parseInt(d.height(),10),left:parseInt(d.css("left"),10),top:parseInt(d.css("top"),10),position:d.css("position")})})};if(typeof b.alsoResize=="object"&&!b.alsoResize.parentNode)if(b.alsoResize.length){b.alsoResize=
b.alsoResize[0];a(b.alsoResize)}else e.each(b.alsoResize,function(c){a(c)});else a(b.alsoResize)},resize:function(b,a){var c=e(this).data("resizable");b=c.options;var d=c.originalSize,f=c.originalPosition,g={height:c.size.height-d.height||0,width:c.size.width-d.width||0,top:c.position.top-f.top||0,left:c.position.left-f.left||0},h=function(i,j){e(i).each(function(){var k=e(this),q=e(this).data("resizable-alsoresize"),p={},r=j&&j.length?j:k.parents(a.originalElement[0]).length?["width","height"]:["width",
"height","top","left"];e.each(r,function(n,o){if((n=(q[o]||0)+(g[o]||0))&&n>=0)p[o]=n||null});if(e.browser.opera&&/relative/.test(k.css("position"))){c._revertToRelativePosition=true;k.css({position:"absolute",top:"auto",left:"auto"})}k.css(p)})};typeof b.alsoResize=="object"&&!b.alsoResize.nodeType?e.each(b.alsoResize,function(i,j){h(i,j)}):h(b.alsoResize)},stop:function(){var b=e(this).data("resizable"),a=b.options,c=function(d){e(d).each(function(){var f=e(this);f.css({position:f.data("resizable-alsoresize").position})})};
if(b._revertToRelativePosition){b._revertToRelativePosition=false;typeof a.alsoResize=="object"&&!a.alsoResize.nodeType?e.each(a.alsoResize,function(d){c(d)}):c(a.alsoResize)}e(this).removeData("resizable-alsoresize")}});e.ui.plugin.add("resizable","animate",{stop:function(b){var a=e(this).data("resizable"),c=a.options,d=a._proportionallyResizeElements,f=d.length&&/textarea/i.test(d[0].nodeName),g=f&&e.ui.hasScroll(d[0],"left")?0:a.sizeDiff.height;f={width:a.size.width-(f?0:a.sizeDiff.width),height:a.size.height-
g};g=parseInt(a.element.css("left"),10)+(a.position.left-a.originalPosition.left)||null;var h=parseInt(a.element.css("top"),10)+(a.position.top-a.originalPosition.top)||null;a.element.animate(e.extend(f,h&&g?{top:h,left:g}:{}),{duration:c.animateDuration,easing:c.animateEasing,step:function(){var i={width:parseInt(a.element.css("width"),10),height:parseInt(a.element.css("height"),10),top:parseInt(a.element.css("top"),10),left:parseInt(a.element.css("left"),10)};d&&d.length&&e(d[0]).css({width:i.width,
height:i.height});a._updateCache(i);a._propagate("resize",b)}})}});e.ui.plugin.add("resizable","containment",{start:function(){var b=e(this).data("resizable"),a=b.element,c=b.options.containment;if(a=c instanceof e?c.get(0):/parent/.test(c)?a.parent().get(0):c){b.containerElement=e(a);if(/document/.test(c)||c==document){b.containerOffset={left:0,top:0};b.containerPosition={left:0,top:0};b.parentData={element:e(document),left:0,top:0,width:e(document).width(),height:e(document).height()||document.body.parentNode.scrollHeight}}else{var d=
e(a),f=[];e(["Top","Right","Left","Bottom"]).each(function(i,j){f[i]=m(d.css("padding"+j))});b.containerOffset=d.offset();b.containerPosition=d.position();b.containerSize={height:d.innerHeight()-f[3],width:d.innerWidth()-f[1]};c=b.containerOffset;var g=b.containerSize.height,h=b.containerSize.width;h=e.ui.hasScroll(a,"left")?a.scrollWidth:h;g=e.ui.hasScroll(a)?a.scrollHeight:g;b.parentData={element:a,left:c.left,top:c.top,width:h,height:g}}}},resize:function(b){var a=e(this).data("resizable"),c=a.options,
d=a.containerOffset,f=a.position;b=a._aspectRatio||b.shiftKey;var g={top:0,left:0},h=a.containerElement;if(h[0]!=document&&/static/.test(h.css("position")))g=d;if(f.left<(a._helper?d.left:0)){a.size.width+=a._helper?a.position.left-d.left:a.position.left-g.left;if(b)a.size.height=a.size.width/c.aspectRatio;a.position.left=c.helper?d.left:0}if(f.top<(a._helper?d.top:0)){a.size.height+=a._helper?a.position.top-d.top:a.position.top;if(b)a.size.width=a.size.height*c.aspectRatio;a.position.top=a._helper?
d.top:0}a.offset.left=a.parentData.left+a.position.left;a.offset.top=a.parentData.top+a.position.top;c=Math.abs((a._helper?a.offset.left-g.left:a.offset.left-g.left)+a.sizeDiff.width);d=Math.abs((a._helper?a.offset.top-g.top:a.offset.top-d.top)+a.sizeDiff.height);f=a.containerElement.get(0)==a.element.parent().get(0);g=/relative|absolute/.test(a.containerElement.css("position"));if(f&&g)c-=a.parentData.left;if(c+a.size.width>=a.parentData.width){a.size.width=a.parentData.width-c;if(b)a.size.height=
a.size.width/a.aspectRatio}if(d+a.size.height>=a.parentData.height){a.size.height=a.parentData.height-d;if(b)a.size.width=a.size.height*a.aspectRatio}},stop:function(){var b=e(this).data("resizable"),a=b.options,c=b.containerOffset,d=b.containerPosition,f=b.containerElement,g=e(b.helper),h=g.offset(),i=g.outerWidth()-b.sizeDiff.width;g=g.outerHeight()-b.sizeDiff.height;b._helper&&!a.animate&&/relative/.test(f.css("position"))&&e(this).css({left:h.left-d.left-c.left,width:i,height:g});b._helper&&!a.animate&&
/static/.test(f.css("position"))&&e(this).css({left:h.left-d.left-c.left,width:i,height:g})}});e.ui.plugin.add("resizable","ghost",{start:function(){var b=e(this).data("resizable"),a=b.options,c=b.size;b.ghost=b.originalElement.clone();b.ghost.css({opacity:0.25,display:"block",position:"relative",height:c.height,width:c.width,margin:0,left:0,top:0}).addClass("ui-resizable-ghost").addClass(typeof a.ghost=="string"?a.ghost:"");b.ghost.appendTo(b.helper)},resize:function(){var b=e(this).data("resizable");
b.ghost&&b.ghost.css({position:"relative",height:b.size.height,width:b.size.width})},stop:function(){var b=e(this).data("resizable");b.ghost&&b.helper&&b.helper.get(0).removeChild(b.ghost.get(0))}});e.ui.plugin.add("resizable","grid",{resize:function(){var b=e(this).data("resizable"),a=b.options,c=b.size,d=b.originalSize,f=b.originalPosition,g=b.axis;a.grid=typeof a.grid=="number"?[a.grid,a.grid]:a.grid;var h=Math.round((c.width-d.width)/(a.grid[0]||1))*(a.grid[0]||1);a=Math.round((c.height-d.height)/
(a.grid[1]||1))*(a.grid[1]||1);if(/^(se|s|e)$/.test(g)){b.size.width=d.width+h;b.size.height=d.height+a}else if(/^(ne)$/.test(g)){b.size.width=d.width+h;b.size.height=d.height+a;b.position.top=f.top-a}else{if(/^(sw)$/.test(g)){b.size.width=d.width+h;b.size.height=d.height+a}else{b.size.width=d.width+h;b.size.height=d.height+a;b.position.top=f.top-a}b.position.left=f.left-h}}});var m=function(b){return parseInt(b,10)||0},l=function(b){return!isNaN(parseInt(b,10))}})(jQuery);
;/*
 * jQuery UI Dialog 1.8.11
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Dialog
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *  jquery.ui.button.js
 *	jquery.ui.draggable.js
 *	jquery.ui.mouse.js
 *	jquery.ui.position.js
 *	jquery.ui.resizable.js
 */
(function(c,j){var k={buttons:true,height:true,maxHeight:true,maxWidth:true,minHeight:true,minWidth:true,width:true},l={maxHeight:true,maxWidth:true,minHeight:true,minWidth:true};c.widget("ui.dialog",{options:{autoOpen:true,buttons:{},closeOnEscape:true,closeText:"close",dialogClass:"",draggable:true,hide:null,height:"auto",maxHeight:false,maxWidth:false,minHeight:150,minWidth:150,modal:false,position:{my:"center",at:"center",collision:"fit",using:function(a){var b=c(this).css(a).offset().top;b<0&&
c(this).css("top",a.top-b)}},resizable:true,show:null,stack:true,title:"",width:300,zIndex:1E3},_create:function(){this.originalTitle=this.element.attr("title");if(typeof this.originalTitle!=="string")this.originalTitle="";this.options.title=this.options.title||this.originalTitle;var a=this,b=a.options,d=b.title||"&#160;",e=c.ui.dialog.getTitleId(a.element),g=(a.uiDialog=c("<div></div>")).appendTo(document.body).hide().addClass("ui-dialog ui-widget ui-widget-content ui-corner-all "+b.dialogClass).css({zIndex:b.zIndex}).attr("tabIndex",
-1).css("outline",0).keydown(function(i){if(b.closeOnEscape&&i.keyCode&&i.keyCode===c.ui.keyCode.ESCAPE){a.close(i);i.preventDefault()}}).attr({role:"dialog","aria-labelledby":e}).mousedown(function(i){a.moveToTop(false,i)});a.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(g);var f=(a.uiDialogTitlebar=c("<div></div>")).addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(g),h=c('<a href="#"></a>').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role",
"button").hover(function(){h.addClass("ui-state-hover")},function(){h.removeClass("ui-state-hover")}).focus(function(){h.addClass("ui-state-focus")}).blur(function(){h.removeClass("ui-state-focus")}).click(function(i){a.close(i);return false}).appendTo(f);(a.uiDialogTitlebarCloseText=c("<span></span>")).addClass("ui-icon ui-icon-closethick").text(b.closeText).appendTo(h);c("<span></span>").addClass("ui-dialog-title").attr("id",e).html(d).prependTo(f);if(c.isFunction(b.beforeclose)&&!c.isFunction(b.beforeClose))b.beforeClose=
b.beforeclose;f.find("*").add(f).disableSelection();b.draggable&&c.fn.draggable&&a._makeDraggable();b.resizable&&c.fn.resizable&&a._makeResizable();a._createButtons(b.buttons);a._isOpen=false;c.fn.bgiframe&&g.bgiframe()},_init:function(){this.options.autoOpen&&this.open()},destroy:function(){var a=this;a.overlay&&a.overlay.destroy();a.uiDialog.hide();a.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body");a.uiDialog.remove();a.originalTitle&&
a.element.attr("title",a.originalTitle);return a},widget:function(){return this.uiDialog},close:function(a){var b=this,d,e;if(false!==b._trigger("beforeClose",a)){b.overlay&&b.overlay.destroy();b.uiDialog.unbind("keypress.ui-dialog");b._isOpen=false;if(b.options.hide)b.uiDialog.hide(b.options.hide,function(){b._trigger("close",a)});else{b.uiDialog.hide();b._trigger("close",a)}c.ui.dialog.overlay.resize();if(b.options.modal){d=0;c(".ui-dialog").each(function(){if(this!==b.uiDialog[0]){e=c(this).css("z-index");
isNaN(e)||(d=Math.max(d,e))}});c.ui.dialog.maxZ=d}return b}},isOpen:function(){return this._isOpen},moveToTop:function(a,b){var d=this,e=d.options;if(e.modal&&!a||!e.stack&&!e.modal)return d._trigger("focus",b);if(e.zIndex>c.ui.dialog.maxZ)c.ui.dialog.maxZ=e.zIndex;if(d.overlay){c.ui.dialog.maxZ+=1;d.overlay.$el.css("z-index",c.ui.dialog.overlay.maxZ=c.ui.dialog.maxZ)}a={scrollTop:d.element.attr("scrollTop"),scrollLeft:d.element.attr("scrollLeft")};c.ui.dialog.maxZ+=1;d.uiDialog.css("z-index",c.ui.dialog.maxZ);
d.element.attr(a);d._trigger("focus",b);return d},open:function(){if(!this._isOpen){var a=this,b=a.options,d=a.uiDialog;a.overlay=b.modal?new c.ui.dialog.overlay(a):null;a._size();a._position(b.position);d.show(b.show);a.moveToTop(true);b.modal&&d.bind("keypress.ui-dialog",function(e){if(e.keyCode===c.ui.keyCode.TAB){var g=c(":tabbable",this),f=g.filter(":first");g=g.filter(":last");if(e.target===g[0]&&!e.shiftKey){f.focus(1);return false}else if(e.target===f[0]&&e.shiftKey){g.focus(1);return false}}});
c(a.element.find(":tabbable").get().concat(d.find(".ui-dialog-buttonpane :tabbable").get().concat(d.get()))).eq(0).focus();a._isOpen=true;a._trigger("open");return a}},_createButtons:function(a){var b=this,d=false,e=c("<div></div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),g=c("<div></div>").addClass("ui-dialog-buttonset").appendTo(e);b.uiDialog.find(".ui-dialog-buttonpane").remove();typeof a==="object"&&a!==null&&c.each(a,function(){return!(d=true)});if(d){c.each(a,function(f,
h){h=c.isFunction(h)?{click:h,text:f}:h;f=c('<button type="button"></button>').attr(h,true).unbind("click").click(function(){h.click.apply(b.element[0],arguments)}).appendTo(g);c.fn.button&&f.button()});e.appendTo(b.uiDialog)}},_makeDraggable:function(){function a(f){return{position:f.position,offset:f.offset}}var b=this,d=b.options,e=c(document),g;b.uiDialog.draggable({cancel:".ui-dialog-content, .ui-dialog-titlebar-close",handle:".ui-dialog-titlebar",containment:"document",start:function(f,h){g=
d.height==="auto"?"auto":c(this).height();c(this).height(c(this).height()).addClass("ui-dialog-dragging");b._trigger("dragStart",f,a(h))},drag:function(f,h){b._trigger("drag",f,a(h))},stop:function(f,h){d.position=[h.position.left-e.scrollLeft(),h.position.top-e.scrollTop()];c(this).removeClass("ui-dialog-dragging").height(g);b._trigger("dragStop",f,a(h));c.ui.dialog.overlay.resize()}})},_makeResizable:function(a){function b(f){return{originalPosition:f.originalPosition,originalSize:f.originalSize,
position:f.position,size:f.size}}a=a===j?this.options.resizable:a;var d=this,e=d.options,g=d.uiDialog.css("position");a=typeof a==="string"?a:"n,e,s,w,se,sw,ne,nw";d.uiDialog.resizable({cancel:".ui-dialog-content",containment:"document",alsoResize:d.element,maxWidth:e.maxWidth,maxHeight:e.maxHeight,minWidth:e.minWidth,minHeight:d._minHeight(),handles:a,start:function(f,h){c(this).addClass("ui-dialog-resizing");d._trigger("resizeStart",f,b(h))},resize:function(f,h){d._trigger("resize",f,b(h))},stop:function(f,
h){c(this).removeClass("ui-dialog-resizing");e.height=c(this).height();e.width=c(this).width();d._trigger("resizeStop",f,b(h));c.ui.dialog.overlay.resize()}}).css("position",g).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")},_minHeight:function(){var a=this.options;return a.height==="auto"?a.minHeight:Math.min(a.minHeight,a.height)},_position:function(a){var b=[],d=[0,0],e;if(a){if(typeof a==="string"||typeof a==="object"&&"0"in a){b=a.split?a.split(" "):[a[0],a[1]];if(b.length===
1)b[1]=b[0];c.each(["left","top"],function(g,f){if(+b[g]===b[g]){d[g]=b[g];b[g]=f}});a={my:b.join(" "),at:b.join(" "),offset:d.join(" ")}}a=c.extend({},c.ui.dialog.prototype.options.position,a)}else a=c.ui.dialog.prototype.options.position;(e=this.uiDialog.is(":visible"))||this.uiDialog.show();this.uiDialog.css({top:0,left:0}).position(c.extend({of:window},a));e||this.uiDialog.hide()},_setOptions:function(a){var b=this,d={},e=false;c.each(a,function(g,f){b._setOption(g,f);if(g in k)e=true;if(g in
l)d[g]=f});e&&this._size();this.uiDialog.is(":data(resizable)")&&this.uiDialog.resizable("option",d)},_setOption:function(a,b){var d=this,e=d.uiDialog;switch(a){case "beforeclose":a="beforeClose";break;case "buttons":d._createButtons(b);break;case "closeText":d.uiDialogTitlebarCloseText.text(""+b);break;case "dialogClass":e.removeClass(d.options.dialogClass).addClass("ui-dialog ui-widget ui-widget-content ui-corner-all "+b);break;case "disabled":b?e.addClass("ui-dialog-disabled"):e.removeClass("ui-dialog-disabled");
break;case "draggable":var g=e.is(":data(draggable)");g&&!b&&e.draggable("destroy");!g&&b&&d._makeDraggable();break;case "position":d._position(b);break;case "resizable":(g=e.is(":data(resizable)"))&&!b&&e.resizable("destroy");g&&typeof b==="string"&&e.resizable("option","handles",b);!g&&b!==false&&d._makeResizable(b);break;case "title":c(".ui-dialog-title",d.uiDialogTitlebar).html(""+(b||"&#160;"));break}c.Widget.prototype._setOption.apply(d,arguments)},_size:function(){var a=this.options,b,d,e=
this.uiDialog.is(":visible");this.element.show().css({width:"auto",minHeight:0,height:0});if(a.minWidth>a.width)a.width=a.minWidth;b=this.uiDialog.css({height:"auto",width:a.width}).height();d=Math.max(0,a.minHeight-b);if(a.height==="auto")if(c.support.minHeight)this.element.css({minHeight:d,height:"auto"});else{this.uiDialog.show();a=this.element.css("height","auto").height();e||this.uiDialog.hide();this.element.height(Math.max(a,d))}else this.element.height(Math.max(a.height-b,0));this.uiDialog.is(":data(resizable)")&&
this.uiDialog.resizable("option","minHeight",this._minHeight())}});c.extend(c.ui.dialog,{version:"1.8.11",uuid:0,maxZ:0,getTitleId:function(a){a=a.attr("id");if(!a){this.uuid+=1;a=this.uuid}return"ui-dialog-title-"+a},overlay:function(a){this.$el=c.ui.dialog.overlay.create(a)}});c.extend(c.ui.dialog.overlay,{instances:[],oldInstances:[],maxZ:0,events:c.map("focus,mousedown,mouseup,keydown,keypress,click".split(","),function(a){return a+".dialog-overlay"}).join(" "),create:function(a){if(this.instances.length===
0){setTimeout(function(){c.ui.dialog.overlay.instances.length&&c(document).bind(c.ui.dialog.overlay.events,function(d){if(c(d.target).zIndex()<c.ui.dialog.overlay.maxZ)return false})},1);c(document).bind("keydown.dialog-overlay",function(d){if(a.options.closeOnEscape&&d.keyCode&&d.keyCode===c.ui.keyCode.ESCAPE){a.close(d);d.preventDefault()}});c(window).bind("resize.dialog-overlay",c.ui.dialog.overlay.resize)}var b=(this.oldInstances.pop()||c("<div></div>").addClass("ui-widget-overlay")).appendTo(document.body).css({width:this.width(),
height:this.height()});c.fn.bgiframe&&b.bgiframe();this.instances.push(b);return b},destroy:function(a){var b=c.inArray(a,this.instances);b!=-1&&this.oldInstances.push(this.instances.splice(b,1)[0]);this.instances.length===0&&c([document,window]).unbind(".dialog-overlay");a.remove();var d=0;c.each(this.instances,function(){d=Math.max(d,this.css("z-index"))});this.maxZ=d},height:function(){var a,b;if(c.browser.msie&&c.browser.version<7){a=Math.max(document.documentElement.scrollHeight,document.body.scrollHeight);
b=Math.max(document.documentElement.offsetHeight,document.body.offsetHeight);return a<b?c(window).height()+"px":a+"px"}else return c(document).height()+"px"},width:function(){var a,b;if(c.browser.msie&&c.browser.version<7){a=Math.max(document.documentElement.scrollWidth,document.body.scrollWidth);b=Math.max(document.documentElement.offsetWidth,document.body.offsetWidth);return a<b?c(window).width()+"px":a+"px"}else return c(document).width()+"px"},resize:function(){var a=c([]);c.each(c.ui.dialog.overlay.instances,
function(){a=a.add(this)});a.css({width:0,height:0}).css({width:c.ui.dialog.overlay.width(),height:c.ui.dialog.overlay.height()})}});c.extend(c.ui.dialog.overlay.prototype,{destroy:function(){c.ui.dialog.overlay.destroy(this.$el)}})})(jQuery);
;/*
 * jQuery UI Progressbar 1.8.11
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Progressbar
 *
 * Depends:
 *   jquery.ui.core.js
 *   jquery.ui.widget.js
 */
(function(b,d){b.widget("ui.progressbar",{options:{value:0,max:100},min:0,_create:function(){this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({role:"progressbar","aria-valuemin":this.min,"aria-valuemax":this.options.max,"aria-valuenow":this._value()});this.valueDiv=b("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element);this.oldValue=this._value();this._refreshValue()},destroy:function(){this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow");
this.valueDiv.remove();b.Widget.prototype.destroy.apply(this,arguments)},value:function(a){if(a===d)return this._value();this._setOption("value",a);return this},_setOption:function(a,c){if(a==="value"){this.options.value=c;this._refreshValue();this._value()===this.options.max&&this._trigger("complete")}b.Widget.prototype._setOption.apply(this,arguments)},_value:function(){var a=this.options.value;if(typeof a!=="number")a=0;return Math.min(this.options.max,Math.max(this.min,a))},_percentage:function(){return 100*
this._value()/this.options.max},_refreshValue:function(){var a=this.value(),c=this._percentage();if(this.oldValue!==a){this.oldValue=a;this._trigger("change")}this.valueDiv.toggleClass("ui-corner-right",a===this.options.max).width(c.toFixed(0)+"%");this.element.attr("aria-valuenow",a)}});b.extend(b.ui.progressbar,{version:"1.8.11"})})(jQuery);
;
//-----------------------------------------------------------------------------
// End of jQuery UI
//-----------------------------------------------------------------------------
})();



