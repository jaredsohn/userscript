// ==UserScript==
// @name           BlackTambourine
// @namespace      http://d.hatena.ne.jp/koyachi/
// @description    YouTube ascii art player, inspired by 'Black Tambourine / Beck'
// @include        http://*youtube.com/watch?v=*
// ==/UserScript==
//
// 2007-10-13 t.koyachi
//
// source:
//   http://qouop.dyndns.org/blacktambourine/BlackTambourine.user.js
//   http://qouop.dyndns.org/blacktambourine/YouTubeAsciiArtPlayer.as
//   http://qouop.dyndns.org/blacktambourine/BitmapDataToAsciiArt.as
//   http://qouop.dyndns.org/blacktambourine/FontConfig.as
//   http://tasmania.globat.com/~mannu.info/flex/sprintf.as
//   http://qouop.dyndns.org/blacktambourine/Benchmark.as
//   http://qouop.dyndns.org/blacktambourine/MakeAATbl.as


(function() {
  var ENABLE_DEBUG = true;

  // many utility code take from Tumblr Strobo
  // http://userscripts.org
  function E() {
    var tag = Array.prototype.shift.call(arguments);
    var elm = document.createElement(tag);
    
    var text = [];
    Array.prototype.forEach.call(arguments, function(value) {
      if (!value) return;
        
      if (value && value.nodeType) {
        elm.appendChild(value);
        return;
      }
      
      switch (typeof(value)) {
      case 'string':
      case 'number':
        elm.appendChild(document.createTextNode(value))
        break;
        
      default:
        for (var key in value) {
          var attr = value[key];
          switch (key) {
          case 'class': elm.className = attr;
          case 'style': elm.style.cssText = attr;
          default:      elm.setAttribute(key, attr);
          }
        };
        break;
      }
    });
    return elm;
  }

  function removeElement(elm) {
    return elm.parentNode.removeChild(elm);
  }
  
  function insertBefore(target, node) {
    return target.parentNode.insertBefore(node, target);
  }
  
  function insertAfter(target, node) {
    return target.parentNode.insertBefore(node, target.nextSibling);
  }

  function swapper(elmOld, elmNew) {
    var toggle = function() {
      insertBefore(elmOld, elmNew);
      removeElement(elmOld);
      
      var temp = elmOld;
      elmOld = elmNew;
      elmNew = temp;
    }
    return toggle;
  }

  function bind(obj, func) {
    func = (func instanceof Function)? func : obj[func];
    return function() {
      func.apply(obj, arguments);
    }
  }


  function swf(movieName) {
    return unsafeWindow.document[movieName]; // FireFox
  }

  function getVideoId() {
    var paramString = document.getElementById('movie_player').getAttribute('flashvars');
    return paramString.split('video_id=')[1].split('&')[0];
  }

  function getScreenSize() {
    return {
      width: unsafeWindow.innerWidth,
      height: unsafeWindow.innerHeight
    };
  }

  function log(msg) {
    if (ENABLE_DEBUG && unsafeWindow.console) unsafeWindow.console.log(msg);
  }

  // main ------------------------------------------------------
  var playerId = 'aaplayer';
  var swapBody = swapper(unsafeWindow.document.body,
                         E('body', {id: 'bt_body'}));
  var screenRatio = {
    width: 4,
    height: 3
  };

  var containerSizeFixer = {
      'width': function(screenSize) {
        return {
          width: (screenSize.height / screenRatio.height) * screenRatio.width,
          height: screenSize.height
        };
      },
      'height': function(screenSize) {
        return {
          width: screenSize.width,
          height: (screenSize.width / screenRatio.width) * screenRatio.height
        };
      }
  };

  var BlackTambourine = {
    video_id: null,
    elmContainer: null,
    elmObj: null,
    player: null,

    initialize: function() {
      this.video_id = getVideoId();
      log(this.video_id);

      var self = this;
      ['show', 'hide', 'play', 'fitToScreen'].forEach(function(method) {
        self[method] = bind(self, method);
      });

      unsafeWindow.focusToHTML = function() {
        unsafeWindow.focus();
      }

      var KEY_SPACEBAR = 32;
      var KEY_J = 74;
      var KEY_K = 75;
      var KEY_L = 76;
      var KEY_A = 65;
      var KEY_S = 83;

      var KEY_D = 68;

      var KEY_Q = 81;
      var KEY_W = 87;
      var KEY_E = 69;
      var KEY_R = 82;

      var KEY_1 = 49;
      var KEY_2 = 50;
      window.addEventListener('keyup', function(e) {
        var isDisplayInfo = !e.ctrlKey;
        switch (e.keyCode) {
        case KEY_SPACEBAR:
        case KEY_J:
        case KEY_K:
          swf(playerId).toggle(isDisplayInfo);
          break;
        default:
          break;
        }
      }, true);
      window.addEventListener('keydown', function(e) {
        var isDisplayInfo = !e.ctrlKey;
        switch (e.keyCode) {
        case KEY_J:
          swf(playerId).back(isDisplayInfo);
          break;
        case KEY_K:
          swf(playerId).forward(isDisplayInfo);
          break;
        case KEY_L:
          swf(playerId).stop(isDisplayInfo);
          break;

        case KEY_D:
          swf(playerId).dbgInfo();
          break;

        case KEY_Q:
          swf(playerId).downLowFixPoint();
          break;
        case KEY_W:
          swf(playerId).upLowFixPoint();
          break;

        case KEY_E:
          swf(playerId).downHiFixPoint();
          break;
        case KEY_R:
          swf(playerId).upHiFixPoint();
          break;

        case KEY_1:
          swf(playerId).contract();
          break;
        case KEY_2:
          swf(playerId).expand();
          break;

        default:
          break;
        }
      }, true);
      window.addEventListener('resize', function(e) {
        self.fitToScreen();
      }, true);

    }
    ,
    show: function() {
      swapBody();
      if (this.elmContainer) return;

      GM_addStyle(<><![CDATA[
                             #bt_body {
                               position: absolute;
                               left : 0;
                               top : 0;
                               margin : 0px;
                               padding : 1px;
                             }
                             #bt_container {
                               position: absolute;
                               left : 0;
                               top : 0;
                               width : 100%;
                               height : 100%;
                               overflow : hidden;
                               margin-top : 0px;
                               padding : 0 0px;
                             }
                             ]]></>);

      var screenSize = getScreenSize();
      var base = (screenSize.width > screenSize.height) ? 'width' : 'height';
      var containerSize = containerSizeFixer[base](screenSize);
      if (containerSize[base] > screenSize[base]) {
        base = (base == 'width') ? 'height' : 'width';
        containerSize = containerSizeFixer[base](screenSize);
      }
      //containerSize = {width:320, height:240};
      log('container ' + containerSize.width + ', ' + containerSize.height);

      var elmContainer = E('div', {
        id: 'bt_container'
      });
      var elmObj = E('object', {
          'id': playerId,
          'data': 'http://qouop.dyndns.org/blacktambourine/YouTubeAsciiArtPlayer.swf',
          'type': 'application/x-shockwave-flash',
          'width': containerSize.width + 'px',
          'height': containerSize.height + 'px'
      });
      var elmParam1 = E('param', {
          'name': 'allowScriptAccess',
          'value': 'always'
      });
      var elmParam2 = E('param', {
          'name': 'bgcolor',
          'value': '#FFFFFFFF'
      });
      elmObj.appendChild(elmParam1);
      elmObj.appendChild(elmParam2);
      elmContainer.appendChild(elmObj);
      this.elmContainer = document.body.appendChild(elmContainer);
      this.elmObj = elmObj;

      elmContainer.style.left = (screenSize.width/2 - containerSize.width/2) + 'px';
      elmContainer.style.top = (screenSize.height/2 - containerSize.height/2) + 'px';

      log('let:top = ' + elmContainer.style.left + ':' + elmContainer.style.top);
    }
    ,
    loadComplete: function() {
      log('onComplete');

      function safeSwf(movieName) {
        return document[movieName]; // FireFox
      }
      swf(playerId).setUrl('http://cache.googlevideo.com/get_video?video_id=' + this.video_id);
      swf(playerId).play();
    }
    ,
    hide: function() {
      swapBody();
    }
    ,
    fitToScreen: function() {
      if (!this.elmContainer) return;
      var screenSize = getScreenSize();
      var base = (screenSize.width > screenSize.height) ? 'width' : 'height';
      var containerSize = containerSizeFixer[base](screenSize);

      if (containerSize[base] > screenSize[base]) {
        base = (base == 'width') ? 'height' : 'width';
        containerSize = containerSizeFixer[base](screenSize);
      }

      var elmContainer = this.elmContainer;
      elmContainer.style.left = (screenSize.width/2 - containerSize.width/2) + 'px';
      elmContainer.style.top = (screenSize.height/2 - containerSize.height/2) + 'px';

      var elmObj = this.elmObj;
      elmObj.width = containerSize.width;
      elmObj.height = containerSize.height;

      log('screen ' + screenSize.width + ', ' + screenSize.height);
      log('container ' + containerSize.width + ', ' + containerSize.height);
      log('let:top = ' + elmContainer.style.left + ':' + elmContainer.style.top);
    }
  };

  unsafeWindow.BlackTambourine = BlackTambourine;
  BlackTambourine.initialize();

  GM_registerMenuCommand('BlackTambourine', function() {
    BlackTambourine.show();
  });
})();
