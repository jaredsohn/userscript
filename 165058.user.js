// ==UserScript==
// @name           YouTube Player size expander/switcher
// @namespace      http://anderse.wordpress.com/
// @version        1.3.0
// @description    Make the YouTube player expand and resize with different modes
// @downloadURL    http://userscripts.org/scripts/source/165058.user.js
// @source         http://userscripts.org/scripts/show/165058
// @include        http://*.youtube.com/watch*
// @include        https://*.youtube.com/watch*
// @match          http://*.youtube.com/watch*
// @match          https://*.youtube.com/watch*
// @require        http://code.jquery.com/jquery-latest.js
// @copyright      2013 Anders Evenrud <andersevenrud@gmail.com>
// ==/UserScript==

/*
 * ChangeLog:
 * 1.3.0 - Added fixed 720p and 1080p modes
 * 1.2.4 - Hide guide on Expand mode (if left is below margin)
 */

(function($, undefined) {
  //
  // Locales
  //
  var LINGUAS = {
    en : {
      tooltip  : 'Set player size to',
      modes    : ["Default", "Wide", "Expand", "Fixed 720p", "Fixed 1080p"]
    },
    no : {
      tooltip  : 'Bytt spiller-størrelse til',
      modes    : ["Standard", "Bred", "Maksimert", "Fiksert 720p", "Fiksert 1080p"]
    }
  };

  //
  // YouTube defined
  //
  var DEFAULT_MARGIN      = 225;
  var DEFAULT_WIDE_WIDTH  = 854;
  var DEFAULT_WIDE_HEIGHT = 510;
  var DEFAULT_WIDTH       = 640;
  var DEFAULT_HEIGHT      = 390;

  //
  // Script definitions
  //
  var DEFAULT_LANGUAGE    = 'en';
  var DEFAULT_MODE        = 1; // Wide
  var RESIZE_GRACETIME    = 10;
  var WATCH_INTERVAL      = 500;
  var EXPAND_MODE_MARGIN  = 20; // Total

  //
  // Script refs
  //
  var _container;
  var _player;
  var _timeout;
  var _wide       = null;
  var _margin     = DEFAULT_MARGIN;
  var _mode       = DEFAULT_MODE;
  var _width      = DEFAULT_WIDTH;
  var _height     = DEFAULT_HEIGHT;
  var _aspect     = (DEFAULT_WIDTH / DEFAULT_HEIGHT);
  var _modes      = LINGUAS[DEFAULT_LANGUAGE]['modes'];
  var _tooltip    = LINGUAS[DEFAULT_LANGUAGE]['tooltip'];

  //
  // Functions, Events and Helpers
  //

  /**
   * Check if player is in native "wide mode"
   * @return bool
   */
  function isWide() {
    return $('#watch7-container').hasClass('watch-wide');
  }

  /**
   * Resize the player
   * @return void
   */
  function resizePlayer() {
    _wide   = isWide();
    _width  = _wide ? DEFAULT_WIDE_WIDTH  : DEFAULT_WIDTH;
    _height = _wide ? DEFAULT_WIDE_HEIGHT : DEFAULT_HEIGHT;
    _aspect = _width / _height;

    var bh    = $(window).height();
    var bw    = $(window).width();
    var c     = false;
    var gv    = true;

    if ( _mode > 0 ) {
      if ( _mode == 3 ) {
        _width  = 1280;
        _height = 720;
        c       = parseInt( ((bw / 2) - (_width / 2)), 10);
      } else if ( _mode == 4 ) {
        _width  = 1920;
        _height = 1080;
        c       = parseInt( ((bw / 2) - (_width / 2)), 10);
      } else {
        var maxw  = _wide ? DEFAULT_WIDE_WIDTH : DEFAULT_WIDTH;
        var maxh  = bh - EXPAND_MODE_MARGIN;

        // Try to expand in width
        var space = bw - (_mode === 2 ? 0 : _margin);
        var width = (space < maxw) ? maxw : space;

        _width  = width;
        _height = _width / _aspect;

        // Center the player if height crashes
        if ( _height > maxh ) {
          _height = maxh;
          _width  = _height * _aspect;

          if ( _mode == 2 ) {
            c = parseInt( ((bw / 2) - (_width / 2)), 10);
          }
        }
      }
    }

    if ( _mode >= 2 ) {
      var pl = _player.offset()['left'];
      if ( pl < _margin ) {
        gv = false;
      }
    }

    _player.css({
      'width'       : parseInt(_width, 10)   + 'px',
      'height'      : parseInt(_height, 10)  + 'px',
      'margin-left' : (c !== false) ? (c + 'px') : '0'
    });

    if ( gv ) {
      $('#guide').show();
    } else {
      $('#guide').hide();
    }

    if ( _timeout ) {
      clearTimeout(_timeout);
    }
    _timeout = null;
  }

  /**
   * Watch for player changes
   * @return void
   */
  function watchChanges() {
    if ( _timeout !== null ) {
      return;
    }

    var w = isWide();
    if ( w !== _wide ) {
      updateUI();
      _wide = w;
    }
  }

  /**
   * Update UI Elements
   * @return void
   */
  function updateUI(from_button) {
    if ( _mode >= 2 ) {
      _container.css('padding-left', '0px');
    } else {
      _container.css('padding-left', _margin + 'px');
    }

    // Update button
    var nextMode = (_mode >= (_modes.length - 1)) ? 0 : (_mode + 1);
    var title = _tooltip + ' ' + _modes[nextMode];
    $('#youtube-player-filler-button').attr('title', title);
    $('#youtube-player-filler-button').attr('data-tooltip-text', title);
    //$('#youtube-player-filler-button img').attr('title', title);
    $('#youtube-player-filler-button img').attr('title', '');
    $('.yt-uix-tooltip-tip-content').html(title);
    $('#yt-uit-tooltip1-content').html(title);

    if ( from_button ) {
      $('#yt-uix-tooltip1').hide();
    }

    // Update right sidebar
    if ( _mode === 0 ) {
      if ( !isWide() ) {
        $('#watch7-sidebar').css('margin-top', '');
      }
    } else {
      $('#watch7-sidebar').css('margin-top', '15px');
    }

    resizePlayer();
  }

  /**
   * Create UI Elements
   * @return void
   */
  function createUI() {
    var buttonContainer = $('#watch7-secondary-actions');
    if ( buttonContainer.length ) {
      var imgSrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QQPFDAJciKWPAAAALhJREFUOMutlDEOwjAMRR9IvQA3AomVsSOCAoKpS89SToDopRi4A0MlIIEllSwrleKAJU9Jnuz/7YAtLsAHeIt0wM3IYRFAOp9kxDYGmmaAZvwh1qKKPmhkbq0WEA+shGbJoKPS5CDOdkCXCupEJWXkfJICGS6dgSpH2BNw/dUdKWxrGfv5iMXe0s7waAM0yp3S0oaLjLwH9lY9NKgPw2aK2K4VwCPHITfyNVTWiu5h+V4ql6kTC/AFk+9O510l/HoAAAAASUVORK5CYII=';
      var title = 'Change view mode';
      var newButton = $('<span><button id="youtube-player-filler-button" title="' + title + '" onclick=";return false;" class="action-panel-trigger yt-uix-button yt-uix-button-text yt-uix-tooltip yt-uix-button-empty" type="button" data-button-toggle="true" data-trigger-for="action-panel-report" role="button" data-tooltip-text="' + title + '"><img class="yt-uix-button-icon" src="' + imgSrc + '" alt="' + title + '" title=""><span class="yt-uix-button-valign"></span></button></span>');

      newButton.on('click', function() {
        _mode++;
        if ( _mode > (_modes.length - 1) ) {
          _mode = 0;
        }

        setLastMode();
        updateUI(true);

        return false;
      });

      buttonContainer.append(newButton);
    }

    updateUI();
  }

  /**
   * Get YouTube language
   * @return String
   */
  function getLanguage() {
    var lang = DEFAULT_LANGUAGE;
    try {
      /* // From header
      var tmplang = $('#logo-container .content-region').html().toLowerCase();
      if ( tmplang.length && (LINGUAS[tmplang] !== undefined) ) {
        lang = tmplang;
      } else {
        tmplang = $('html').attr('lang');
        if ( tmplang.length && (LINGUAS[tmplang] !== undefined) ) {
          lang = tmplang;
        }
      }
      */
      var tmplang = $('html').attr('lang');
      if ( tmplang.length && (LINGUAS[tmplang] !== undefined) ) {
        lang = tmplang;
      }
    } catch ( ex ) {}

    return lang;
  }

  /**
   * Get last user view mode
   * @return String
   */
  function getLastMode() {
    try {
      var tmp = parseInt(localStorage.getItem('yt-player-size-mode'), 10);
      if ( !isNaN(tmp) && (tmp >= 0) ) {
        return tmp;
      }
    } catch ( e ) {}

    return DEFAULT_MODE;
  }

  /**
   * Set last user view mode
   * @return void
   */
  function setLastMode() {
    try {
      localStorage.setItem('yt-player-size-mode', ('' + _mode));
    } catch ( e ) {}
  }

  //
  // Main
  //
  $(document).ready(function() {
    _container = $('#player');
    if ( _container.length ) {
      var p = parseInt(_container.css('padding-left').replace('px', ''), 10);
      if ( !isNaN(p) && (p > 0) ) {
        _margin = p;
      }

      _player = $('#player-api');
      if ( _player.length ) {
        var l = getLanguage();

        _mode    = getLastMode();
        _modes   = LINGUAS[l]['modes'];
        _tooltip = LINGUAS[l]['tooltip'];

        createUI();

        // Add window event
        $(window).on('resize', function(ev) {
          if ( _timeout !== null ) {
            clearTimeout(_timeout);
          }

          _timeout = setTimeout(function() {
            resizePlayer();
          }, RESIZE_GRACETIME);
        });

        // Add internal events
        setInterval(function() {
          watchChanges();
        }, WATCH_INTERVAL);
      }
    }
  });
})($);
