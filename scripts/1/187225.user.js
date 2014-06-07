// ==UserScript==
// @name        WatchWatch
// @namespace   https://github.com/segabito/
// @description GINZAwatchに時計復活。 ついでに過去ログ時間選択も使いやすくする
// @include     http://www.nicovideo.jp/watch/*
// @version     0.1.3
// @grant       none
// ==/UserScript==

(function() {
  var monkey = (function() {
    'use strict';

    if (!window.WatchApp || !window.WatchJsApi) {
      return;
    }

    window.WatchWatch = {};

    var console = {
      log: function() {},
      trace: function() {}
    };

    if (localStorage.watchItLater_debugMode === 'true') {
      console = window.console;
    }

    window.WatchApp.mixin(window.WatchWatch, {
      _isPastMode: false,
      _pastTime: (new Date()).getTime(),
      getPastTime: function() {
        if (this._isPastMode) {
          return this._pastTime;
        } else {
          return (new Date()).getTime();
        }
      },
      initialize: function() {
        var nsInit = window.WatchApp.ns.init;
        this._watchInfoModel      = nsInit.CommonModelInitializer.watchInfoModel;
        this._playerAreaConnector = nsInit.PlayerInitializer.playerAreaConnector;
        this._nicoPlayerConnector = nsInit.PlayerInitializer.nicoPlayerConnector;
        this._timeMachine         = nsInit.PlayerInitializer.commentPanelViewController.timeMachine;
        this.event                = new window.WatchApp.ns.event.EventDispatcher();

        this.initializeUserConfig();

        this.initializeDom();
        this.initializeTimeMachine();
        this.initializeTimer();

        this.initializeCss();
      },
      addStyle: function(styles, id) {
        var elm = document.createElement('style');
        elm.type = 'text/css';
        if (id) { elm.id = id; }

        var text = styles.toString();
        text = document.createTextNode(text);
        elm.appendChild(text);
        var head = document.getElementsByTagName('head');
        head = head[0];
        head.appendChild(elm);
        return elm;
      },
      initializeCss: function() {
        var __css__ = (function() {/*
          .watchWatch #playerCommentPanel .playerCommentPanelHeader .currentThreadName {
            width: 120px;
          }

          .watchWatch #playerCommentPanel .playerCommentPanelHeader .comment {
            display: none;
          }

          .watchWatch #playerCommentPanel #commentLogHeader form {
            display: none;
          }

          .watchWatch #playerCommentPanel .section #commentLog.commentTable {
            top: 28px;
          }

          .watchWatch .commentPanelAlert {
            top: 28px;
          }


          .watchWatchContainer {
            position: absolute;
            left: 139px;
            top: 5px;
            -moz-box-sizing: border-box;
            -webkit-box-sizing: border-box;
            width: 140px;
            font-size: 10px;
            padding: 5px 4px 2px;
            text-align: center;
            white-space: nowrap;
            overflow: hidden;
            background: #f4f4f4;
            border: 1px solid #999;
            cursor: pointer;
            z-index: 10060;
          }
          .watchWatchContainer:hover {
            background: #fff;
            color: #008;
          }
          .watchWatchContainer.past {
            color: red;
          }




          .timeMachineControl.show {
            display: block;
          }
          .timeMachineControl {
            position: absolute;
            display: none;
            top: 34px;
            left: 6px;
            z-index: 10060;
            -moz-box-sizing: border-box;
            -webkit-box-sizing: border-box;
            width: 313px;
            overflow: hidden;
            background: #fff;
            box-shadow: 0 0 4px black;
          }

          .timeMachineControl .reset,
          .timeMachineControl .title {
            margin: 8px;
          }
          .timeMachineControl .datepickerContainer {
          }
          .timeMachineControl .datepickerContainer .ui-datepicker {
            display: block;
            margin: auto;
            -moz-box-sizing: border-box;
            -webkit-box-sizing: border-box;
            width: 100%;
          }
          .timeMachineControl .datepickerContainer .ui-datepicker .ui-datepicker-title select.ui-datepicker-year {
            width: 40%;
          }
          .timeMachineControl .datepickerContainer .ui-datepicker .ui-datepicker-title select.ui-datepicker-month {
            width: 40%;
          }
          .timeMachineControl .ui-widget-content {
            border: none;
          }

          .timeMachineControl .inputFormContainer {
            text-align: center;
          }
          .timeMachineControl .dateInput {
            text-align: center;
            width: 150px;
          }
          .timeMachineControl .hourInput:after {
            content: ' : ';
            font-weight: boler;
          }
          .timeMachineControl .submitButtonContainer {
            text-align: center;
            padding: 8px;
          }
          .timeMachineControl      .reset {
            display: none;
          }
          .timeMachineControl.past .reset {
            display: inline-block;
          }
          .timeMachineControl .reset, .timeMachineControl .submit {
            padding: 8px;
            cursor: pointer;
          }


          {*  *}
          .watchWatchContainer .year:after  { content: '/'; }
          .watchWatchContainer .month:after { content: '/'; }
          .watchWatchContainer .date:after  { content: ''; }

          .watchWatchContainer .day:before {
            content: '(';
          }
          .watchWatchContainer .day:after {
            content: ') ';
          }

          .watchWatchContainer.sun .day .inner:after { content: '日'; }
          .watchWatchContainer.mon .day .inner:after { content: '月'; }
          .watchWatchContainer.tue .day .inner:after { content: '火'; }
          .watchWatchContainer.wed .day .inner:after { content: '水'; }
          .watchWatchContainer.thu .day .inner:after { content: '木'; }
          .watchWatchContainer.fri .day .inner:after { content: '金'; }
          .watchWatchContainer.sat .day .inner:after { content: '土'; }

          .watchWatchContainer .hour:after { content: ':'; }
          .watchWatchContainer .min:after  { content: ':'; }
          .watchWatchContainer .sec:after  { content: '';  }

        */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1].replace(/\{\*/g, '/*').replace(/\*\}/g, '*/');

        this.addStyle(__css__, 'WatchWatchCss');
      },
      initializeUserConfig: function() {
        var prefix = 'WatchWatch_';
        var conf = {};
        this.config = {
          get: function(key) {
            try {
              if (window.localStorage.hasOwnProperty(prefix + key)) {
                return JSON.parse(window.localStorage.getItem(prefix + key));
              }
              return conf[key];
            } catch (e) {
              return conf[key];
            }
          },
          set: function(key, value) {
            window.localStorage.setItem(prefix + key, JSON.stringify(value));
          }
        };
      },
      initializeTimeMachine: function() {
        var timeMachine         = this._timeMachine;
        var watchInfoModel      = this._watchInfoModel;
        var playerAreaConnector = this._playerAreaConnector;

        timeMachine.addEventListener('reset', $.proxy(function() {
          this._isPastMode = false;
          this.event.dispatchEvent('timeMachine-changePastMode', false, new Date());
        }, this));
        timeMachine.addEventListener('error', $.proxy(function() {
          this.event.dispatchEvent('timeMachine.error');
        }, this));
        playerAreaConnector.addEventListener('onTimeMachineDateUpdated', $.proxy(function(isPast, time) {
          console.log('dispatch.timeMachine-changePastMode', isPast, time);
          if (isPast) {
            this._isPastMode = true;
            this._pastTime = time;
            this.event.dispatchEvent('timeMachine-changePastMode', true,  new Date(time));
          } else {
            this._isPastMode = false;
            this.event.dispatchEvent('timeMachine-changePastMode', false, new Date());
          }
        }, this));

        watchInfoModel.addEventListener('reset', $.proxy(function() {
          this._isPastMode = false;
          if (initialized) {
            beforeShow();
          }
        }, this));

        var beforeShow = $.proxy(function() {
          var md = watchInfoModel.postedAt.split(' ')[0].split('/');
          var $date = this._$datepickerContainer;
          $date.datepicker('option', 'minDate', new Date(md[0], md[1] - 1, md[2]));
          $date.datepicker('option', 'maxDate', new Date());
          var v = this._$dateInput.val();
          if (v.match(/^(\d{4})[¥/-](\d{2})[¥/-](\d{2})$/)) {
            var dt = new Date(RegExp.$1, RegExp.$2 - 1, RegExp.$3);
            if (dt) $date.datepicker('setDate', dt);
          }
        }, this);

        var initialize = $.proxy(function() {
          if (initialized) { return; }
          this._$datepickerContainer.datepicker({
            dateFormat: 'yy/mm/dd',
//            beforeShow: beforeShow,
            altField: this._$dateInput,
            changeMonth: true,
            changeYear: true
          });

          initialized = true;
        }, this), initialized = false;

        this.resetDatepicker = $.proxy(function() {
          initialize();
          beforeShow();
        }, this);

        this.event.addEventListener('popup.toggle', $.proxy(function(v) {
          if (!v) { return; }
          this.resetDatepicker();
        }, this));

        this.timeMachineController = {
          goToPast: function(tm) {
            if (!tm) tm = (new Date()).getTime();
            if (typeof tm === 'object' && tm.getTime) tm = tm.getTime();

            tm = Math.min(window.WatchApp.ns.util.TimeUtil.now(), tm);
            var postedAt = new Date(watchInfoModel.postedAt.substring(0, 16).replace(/-/g, '/').split(' '));
            console.log('postedAt', postedAt.getTime(), tm);
            // 投稿直後より前は指定できない。マイメモリーやチャンネルだと怪しいかも
            // 投稿日時ぴったりもだめっぽい。 おそらく投稿確定後にスレッドが作られるため。
            tm = Math.max(postedAt.getTime() + 300 * 1000, tm);
            timeMachine.goToPast(tm);
          },
          now: function() {
            timeMachine.goToPresent();
          }
        };
      },
      initializeDom: function() {
        $('#playerTabWrapper').addClass('watchWatch');
        var $watch = this._$watch = $([
          '<div id="watchWatch" class="watchWatchContainer sun">',
            '<span class="year">2014</span>',
            '<span class="month">01</span>',
            '<span class="date">01</span>',
            '<span class="day">',
              '<span class="inner"></span>',
            '</span>',
            '<span class="hour">00</span>',
            '<span class="min">00</span>',
            '<span class="sec">00</span>',
          '</div>',
          ''].join(''));
        var $popup = this._$popup = $([
          '<div id="watchWatchTimeMachine" class="timeMachineControl">',
          '<h1 class="title">過去のコメントを開く</h1>',
          '<div class="datepickerContainer"></div>',
          '<div class="inputFormContainer">',
            '<input type="text" name="date" value="2014/01/01" class="dateInput">',
            '<select name="hour"   class="hourInput"></select>',
            '<select name="minute" class="minuteInput"></select>',
          '</div>',
          '',
          '<div class="submitButtonContainer">',
            '<button class="submit">過去ログを見る</button>',
            '<button class="reset">最新ログに戻る</button>',
          '</div>',
          '</div>',
          ''].join(''));
        $('#playerCommentPanel').after($watch).after($popup);

        this._$datepickerContainer = $popup.find('.datepickerContainer');
        this._$dateInput    = $popup.find('.dateInput');
        this._$hourInput    = $popup.find('.hourInput');
        this._$minuteInput  = $popup.find('.minuteInput');
        this._$submitButton = $popup.find('.submit');
        this._$resetButton  = $popup.find('.reset');

        var options = [];
        for (var i = 0; i < 60; i++) {
          var m = ('0' + i).slice(-2);
          options.push(['<option value="', m, '">', m, '</option>'].join(''));
        }
        this._$hourInput.html(options.slice(0, 24).join(''));
        this._$minuteInput.html(options.join(''));

        var resetInput = $.proxy(function(time) {
          var date;
          if (typeof time === 'number') { date = new Date(time); }
          else
          if (typeof time === 'object' && time.getTime) date = time;
          else
          if (!time) date = new Date();
          console.log('resetInput', time, date);
          var y = date.getFullYear();
          var m = (date.getMonth() + 101).toString().slice(-2);
          var d = ('0' + date.getDate()).slice(-2);

          var hh = ('0' + date.getHours()).slice(-2);
          var mm = ('0' + date.getMinutes()).slice(-2);
          this._$dateInput  .val(y + '/' + m + '/' + d);
          this._$hourInput  .val(hh);
          this._$minuteInput.val(mm);
          //console.log('dt', y, m, d, hh, mm);
        }, this);

        $watch.on('click', $.proxy(function() {
          this.togglePopup();
        }, this));

        this.togglePopup = $.proxy(function(v) {
          if (typeof v === 'boolean') {
            this._$popup.toggleClass('show', v);
          } else {
            this._$popup.toggleClass('show');
          }
          resetInput(this.getPastTime());
          this.event.dispatchEvent('popup.toggle', this._$popup.hasClass('show'));
        }, this);
        this.showPopup = $.proxy(function() { this.togglePopup(true);  }, this);
        this.hidePopup = $.proxy(function() { this.togglePopup(false); }, this);

        this.event.addEventListener('timeMachine-changePastMode', $.proxy(function(isPast, time) {
          this.hidePopup();
          console.log('initializeDom.timeMachine-changePastMode', isPast, time);
          this._$watch.toggleClass('past', isPast);
          this._$popup.toggleClass('past', isPast);
          resetInput(time);
        }, this));
        this.event.addEventListener('timeMachine.error', $.proxy(function() {
          this.hidePopup(); // エラーメッセージが見えないので閉じる
        }, this));

        this._$submitButton.on('click', $.proxy(function() {
          var dd = this._$dateInput.val().replace(/-/g, '/');
          var tt = this._$hourInput.val() + ':' + this._$minuteInput.val();
          var dt = new Date(dd + ' ' + tt + ':00');

          this.timeMachineController.goToPast(dt);
        }, this));
        this._$resetButton.on('click', $.proxy(function() {
          this.timeMachineController.now();
        }, this));

        $watch = $popup = null;
      },
      initializeTimer: function() {
        var date = new window.Date();
        var $watch  = this._$watch;
        var $year  = $watch.find('.year');
        var $month = $watch.find('.month');
        var $date  = $watch.find('.date');
        var $hour  = $watch.find('.hour');
        var $min   = $watch.find('.min');
        var $sec   = $watch.find('.sec');
        var days   = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
        var timer;

        var update = function(force, time) {
          if (time) {
            date.setTime(time);
            console.log('setTime', time, date);
          } else {
            date.setTime((new Date()).getTime());
          }
          var sec = date.getSeconds();
          $sec.text(('0' + sec).slice(-2));

          if (force || sec === 0) {
            var min = date.getMinutes();
            $min.text(('0' + min).slice(-2));

            if (force || min === 0) {
              $hour .text(('0' + date.getHours()).slice(-2));
              $date .text(('0' + date.getDate()) .slice(-2));
              var month = date.getMonth();
              $month.text((date.getMonth() + 101).toString().slice(-2));
              $year .text(date.getFullYear());
              var day = date.getDay();
              $watch
                .removeClass('month' + (((month + 11) % 12) + 1))
                .addClass(   'month' +   (month +  1))
                .removeClass(days[(day + 6) % 7] )
                .addClass(   days[day]);
            }
          }
        };
        var onTimer = this._onTimer = $.proxy(function() {
          if (this._isPastMode) { return; }
          update(false);
        }, this);

        this.event.addEventListener('timeMachine-changePastMode', function(isPast, time) {
          console.log('timer.timeMachine-changePastMode', isPast, time, new Date(time));
          if (isPast) {
            window.setTimeout(function() { update(true, time); }, 1000);
          } else {
            update(true);
          }
        });

        update(true);
        window.WatchApp.mixin(this, {
          watch: {
            start: function() {
              if (timer) return;
              timer = window.setInterval($.proxy(onTimer, this), 600);
            },
            stop: function() {
              window.clearInterval(timer);
              timer = null;
            },
            refresh: function() {
              update(true);
            }
          }
        });
        this.watch.start();
      }
    });

    if (window.PlayerApp) {
      (function() {
        var watchInfoModel = WatchApp.ns.model.WatchInfoModel.getInstance();
        if (watchInfoModel.initialized) {
          window.WatchWatch.initialize();
        } else {
          var onReset = function() {
            watchInfoModel.removeEventListener('reset', onReset);
            window.setTimeout(function() {
              watchInfoModel.removeEventListener('reset', onReset);
              window.WatchWatch.initialize();
            }, 0);
          };
          watchInfoModel.addEventListener('reset', onReset);
        }
      })();
    }


  });

  var script = document.createElement('script');
  script.id = 'WatchWatchLoader';
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('charset', 'UTF-8');
  script.appendChild(document.createTextNode('(' + monkey + ')()'));
  document.body.appendChild(script);

})();
