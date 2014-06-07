/**
 * JyteKeys - Adds hotkeys for common operations on Jyte.
 *
 * Copyright (c) 2008 Ryan Grove <ryan@wonko.com>.
 * All rights reserved.
 *
 * @version 1.0.2 (2008-06-13)
 */

// ==UserScript==
// @name           JyteKeys
// @namespace      http://jyte.com/
// @description    Adds hotkeys for common operations on Jyte.
// @include        http://jyte.com/*
// @require        http://yui.yahooapis.com/2.5.2/build/yahoo-dom-event/yahoo-dom-event.js
// ==/UserScript==

var d   = document,
    w   = window,
    Y   = YAHOO,
    yut = Y.util,
    yud = yut.Dom,
    yue = yut.Event;

var JyteKeys = function () {
  // -- Constants --------------------------------------------------------------
  var c = {
    URL_EVERYBODY  : 'http://jyte.com/claims',
    URL_HOME       : 'http://jyte.com/home',
    URL_MAKECLAIM  : 'http://jyte.com/claim/new',
    URL_NEWCOMMENTS: 'http://jyte.com/claims/recently_commented?new_comments=on&comments_by=', // append openid
    URL_PROFILE    : 'http://jyte.com/profile/', // append openid
    URL_RANDOM     : 'http://jyte.com/claim/random',
    URL_SIGNIN     : 'http://jyte.com/auth/login',
    URL_SPY        : 'http://jyte.com/spy'
  };

  // -- Private Variables ------------------------------------------------------
  var hotKeys = {};

  // -- Private Event Handlers -------------------------------------------------

  function handleKeyComments() {
    w.location = c.URL_NEWCOMMENTS + getOpenId();
  }

  function handleKeyEverybody() {
    w.location = c.URL_EVERYBODY;
  }

  function handleKeyHome() {
    w.location = c.URL_HOME;
  }

  function handleKeyLegend() {
    var legend = yud.get('jytekeys');
    yud.removeClass(legend, 'hidden') || yud.addClass(legend, 'hidden');
  }

  function handleKeyMakeClaim() {
    w.location = c.URL_MAKECLAIM;
  }
  
  function handleKeyNext() {
    var nextPage = getPage() + 1;
    
    if (/page=\d+/.test(w.location.search)) {
      w.location.search = w.location.search.replace(/page=\d+/, 'page=' +
          nextPage);
    } else {
      w.location.search += '&page=' +  nextPage;
    }
  }

  function handleKeyPrev() {
    var prevPage = getPage() - 1;

    if (prevPage < 1) {
      return;
    }

    if (/page=\d+/.test(w.location.search)) {
      w.location.search = w.location.search.replace(/page=\d+/, 'page=' +
          prevPage);
    } else {
      w.location.search += '&page=' +  prevPage;
    }
  }

  function handleKeyProfile() {
    w.location = c.URL_PROFILE + getOpenId();
  }
  
  function handleKeyRandom() {
    w.location = c.URL_RANDOM;
  }
  
  function handleKeySignIn() {
    w.location = c.URL_SIGNIN;
  }
  
  function handleKeySpy() {
    w.location = c.URL_SPY;
  }
  
  function handleKeyVoteNo() {
    yud.get('votes_against').onclick();
  }
  
  function handleKeyVoteYes() {
    yud.get('votes_for').onclick();
  }

  // -- Private Methods --------------------------------------------------------

  function disableKeys() {
    for (var key in hotKeys) {
      if (hotKeys.hasOwnProperty(key)) {
        hotKeys[key].disable();
      }
    }
  }

  function enableKeys() {
    for (var key in hotKeys) {
      if (hotKeys.hasOwnProperty(key)) {
        hotKeys[key].enable();
      }
    }
  }

  function getOpenId() {
    var loginInfo = yud.get('login_info_box'),
        match     = /Signed in as (\S+?)<\/li>/.exec(loginInfo.innerHTML);

    return match && match[1] ? match[1] : null;
  }

  function getPage() {
    var match = /page=(\d+)/.exec(w.location.search);
    return match && match[1] ? (new Number(match[1])).valueOf() : 1;
  }

  function inject() {
      GM_addStyle(
          '#jytekeys { background: #f7f6fe; border: 1px solid #bfa7ff; font-size: 0.9em; padding: 6px; position: fixed; left: 8px; opacity: 0.9; top: 8px; width: 200px; }' +
          '#jytekeys.hidden { display: none; }' +
          '#jytekeys h1 { font-size: 1.2em; font-weight: bold; }' +
          '#jytekeys table { margin: 4px 0 0 0; }' +
          '#jytekeys table tr { vertical-align: top; }' +
          '#jytekeys table tr th { font-weight: bold; padding-right: 6px; }');

      var div = d.createElement('div');

      div.id        = 'jytekeys';
      div.className = 'hidden';
      div.innerHTML = '<h1>Hotkeys</h1>' +
          '<table>' +
            (hotKeys.c ? '<tr><th scope="row">c</th><td>new comments on claims you\'ve commented on</td></tr>' : '') +
            '<tr><th scope="row">e</th><td>everybody\'s claims</td></tr>' +
            '<tr><th scope="row">h</th><td>home</td></tr>' +
            (hotKeys.i ? '<tr><th scope="row">i</th><td>sign in</td></tr>' : '') +
            '<tr><th scope="row">l</th><td>show/hide this legend</td></tr>' +
            (hotKeys.m ? '<tr><th scope="row">m</th><td>make a claim</td></tr>' : '') +
            (hotKeys.n ? '<tr><th scope="row">n</th><td>next page</td></tr>' : '') +
            (hotKeys.p ? '<tr><th scope="row">p</th><td>previous page</td></tr>' : '') +
            '<tr><th scope="row">r</th><td>random claim</td></tr>' +
            '<tr><th scope="row">s</th><td>Jyte spy</td></tr>' +
            (hotKeys.y ? '<tr><th scope="row">y</th><td>your profile</td></tr>' : '') +
            (hotKeys['+'] ? '<tr><th scope="row">+</th><td>agree with current claim</td></tr>' : '') +
            (hotKeys['-'] ? '<tr><th scope="row">-</th><td>disagree with current claim</td></tr>' : '') +
          '</table>';

      d.body.appendChild(div);
  }

  return {
    c: c,

    // -- Public Methods -------------------------------------------------------

    init: function () {
      // Attach key listeners.
      hotKeys['e'] = new yut.KeyListener(d, { keys: 69 }, { fn: handleKeyEverybody });
      hotKeys['h'] = new yut.KeyListener(d, { keys: 72 }, { fn: handleKeyHome });
      hotKeys['l'] = new yut.KeyListener(d, { keys: 76 }, { fn: handleKeyLegend });
      hotKeys['r'] = new yut.KeyListener(d, { keys: 82 }, { fn: handleKeyRandom });
      hotKeys['s'] = new yut.KeyListener(d, { keys: 83 }, { fn: handleKeySpy });
      
      // Only enable user-specific keys if user is logged in.
      if (getOpenId()) {
        hotKeys['c'] = new yut.KeyListener(d, { keys: 67 }, { fn: handleKeyComments });
        hotKeys['m'] = new yut.KeyListener(d, { keys: 77 }, { fn: handleKeyMakeClaim });
        hotKeys['y'] = new yut.KeyListener(d, { keys: 89 }, { fn: handleKeyProfile });
      } else {
        hotKeys['i'] = new yut.KeyListener(d, { keys: 73 }, { fn: handleKeySignIn });
      }

      // Only enable prev/next keys if this page is part of a paginated results
      // list. This is a regexp for speed (much faster than testing every link
      // on the page).
      if ((/<a\s+href=".*?page=\d+.*?">\s*Next\s+\d+\s*<\/a>/i).test(
          d.body.innerHTML)) {
        hotKeys['n'] = new yut.KeyListener(d, { keys: 78 }, { fn: handleKeyNext });
      }
      
      if ((/<a\s+href=".*?page=\d+.*?">\s*Previous\s+\d+\s*<\/a>/i).test(
          d.body.innerHTML)) {
        hotKeys['p'] = new yut.KeyListener(d, { keys: 80 }, { fn: handleKeyPrev });
      }
      
      // Only enable voting keys if this is a claim detail page.
      var voteYes = yud.get('votes_for'),
          voteNo  = yud.get('votes_against');
      
      if (voteYes && voteNo) {
        hotKeys['='] = new yut.KeyListener(d, { keys: 61 },  { fn: handleKeyVoteYes });
        hotKeys['+'] = new yut.KeyListener(d, { keys: 107 }, { fn: handleKeyVoteYes });
        hotKeys['-'] = new yut.KeyListener(d, { keys: 109 }, { fn: handleKeyVoteNo });
      }

      // Only enable keys by default if this isn't the Make a Claim page, since
      // that page automatically sets focus on the claim title input box.
      if (!yud.get('new_claim_box')) {
        enableKeys();
      }

      // Stop listening for hotkeys when an input, select, or textarea element
      // gets focus.
      var inputs    = d.body.getElementsByTagName('input'),
          selects   = d.body.getElementsByTagName('select'),
          textareas = d.body.getElementsByTagName('textarea');

      yue.on(inputs,    'focus', disableKeys);
      yue.on(selects,   'focus', disableKeys);
      yue.on(textareas, 'focus', disableKeys);
      yue.on(inputs,    'blur', enableKeys);
      yue.on(selects,   'blur', enableKeys);
      yue.on(textareas, 'blur', enableKeys);

      // Inject CSS styles and hotkey legend.
      inject();
    }
  };
}();

JyteKeys.init();
