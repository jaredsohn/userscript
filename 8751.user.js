// ==UserScript==
// @name           Reddit Content Filter
// @description    Hide reddit articles by author, domain, or title.
// @include        http://reddit.com/*
// @include        http://*.reddit.com/*
// ==/UserScript==

(function () {
  var keys = ['user', 'site', 'word'], sum = 0, show_btn;

  /*
   * key-name map
   */
  var names = {
    user: 'Author',
    site: 'Domain',
    word: 'Title'
  };

  /*
   * tidy - convert string into list of trimmed, comma-separated strings.
   */
  var tidy = (function() {
    var re = {
      trim:   /^\s*|\s*$/g, 
      split:  /\s*,\s*/
    };

    return function (str) {
      return str.replace(re.trim, '').split(re.split).filter(function(str) {
        return str && str.length > 0;
      });
    };
  })();

  var get = function(key) {
    return GM_getValue(key + '_filters') || '';
  };

  /*
   * get_config - get filter words as hash.
   */
  var get_config = function() { 
    var ret = {};

    // map keys to hash of array of regular expressions
    keys.forEach(function(key) {
      ret[key] = get(key);
    });

    // return results
    return ret;
  };

  /*
   * get_res - get filter words as hash of array of regexes.
   */
  var get_res = function() {
    var ret = {};

    keys.forEach(function(key) {
      ret[key] = tidy(get(key)).map(function (str) {
        return new RegExp(str, 'i');
      });
    });

    // return results
    return ret;
  };

  /*
   * get_nodes - get a list of matching nodes.
   */
  var get_nodes = (function() {
    var result_type = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
        prefix = "//div[@id='siteTable']//div[@class='entry']";

    // relevant nodes' paths
    var paths = [
      // match <a class='title' href='{site}'>{title}</a> 
      // (used for word and site filters)
      prefix + "/p[@class='title']/a[contains(@class, 'title')]",

      // match <a class='author' href='...'>{user}</a> 
      // (used for user filters)
      prefix + "/p[@class='tagline']/a[@class='author']",

      prefix + "/p[@class='title']/span[@class='domain']/a"
    ].join('|');

    return function() {
      return document.evaluate(paths, document, null, result_type, null);
    };
  })();

  /*
   * find - find matching article elements and pass to callback.
   */
  var find = function(fn) {
    var i, l, el, e, k, cls, str, els = get_nodes(), res = get_res();
    var match_debug = 0;
  
    for (i = 0, l = els.snapshotLength; i < l; i++) {
      if (el = els.snapshotItem(i)) {
        match_debug++;

        for (k in res) {
          str = null;

          if (cls = el.className) {
            if (k == 'word' && cls.indexOf('title') != -1) {
              // title word match
              str = el.innerHTML;
            } else if (k == 'user' && cls.indexOf('author') != -1) {
              // user name match
              str = el.innerHTML;
            }
          } else {
            if (k == 'site' && el.tagName == 'A')
              // url word match
              str = el.href;
          }

          // if we have a match, then walk up to the containing div
          if (str && res[k].some(function(re) { return str.match(re); })) {
            e = el;

            // walk up to containing div.entry and pass it to callback
            while (e && (e = e.parentNode)) {
              if (e.tagName == 'DIV' && e.className.indexOf('thing') != -1) {
                fn(e);
                e = null;
              }
            }
          }
        }
      }
    }

    // alert('match_debug = ' + match_debug);
  };

  /*
   * show - show all matching articles
   */
  var show = function() {
    // show hidden articles
    find(function(el) { 
      el.style.display = 'block'; 
    });

    // reset sum
    sum = 0;

    // disable show btn
    show_btn.style.display = 'none';
    show_btn.innerHTML = 'Show All (0)';
  };

  /*
   * hide - hide all matching articles 
   */
  var hide = function() {
    var els = {};

    // hide matching items
    find(function(el) {
      var c = el.className.toLowerCase().split(/\s+/).sort().join('');
      if (!els[c]) {
        els[c] = true;

        el.style.display = 'none';
        sum++;
      }
    });

    // enable show button if we hid anything
    if (sum > 0) {
      show_btn.style.display = 'inline';
      show_btn.innerHTML = 'Show Hidden (' + sum + ')';
    }
  };

  var edit = function(key) {
    var val, res = get_config(),
        msg = 'Edit ' + names[key] + ' Filters ' + 
              '(list of comma-separated phrases):';

    // prompt for and save filters
    if ((val = prompt(msg, res[key])) !== null) {
      // show everything that was hidden
      show();

      // apply new value to config
      GM_setValue(key + '_filters', val);

      // reset sum and hide all matching items
      hide();
    }
  };

  /*
   * init - add config buttons to top-right corner 
   */
  var init = function() {
    var btn, div = document.createElement('div');

    // move div to top-right corner
    div = document.createElement('div');
    div.style.zIndex = 9999;
    div.style.position = 'absolute';
    div.style.top = '20px';
    div.style.right = '8px';

    // create show button
    btn = show_btn = document.createElement('button');
    btn.style.display = 'none';
    btn.style.fontSize = '9pt';
    btn.innerHTML = 'Show All (0)';
    div.appendChild(btn);

    // add show btn handler
    btn.addEventListener('click', function(ev) {
      // show hidden articles and stop event
      show();
      return false;
    }, false);

    // create edit buttons
    keys.forEach(function(key) {
      var name = names[key] + ' Filters';

      // create edit button
      btn = document.createElement('button');
      btn.innerHTML = name;
      btn.style.marginLeft = '5px';
      btn.style.fontSize = '9pt';

      // add button click handler
      btn.addEventListener('click', function() { 
        edit(key);
        return false;
      }, false);

      // add button to dom
      div.appendChild(btn);
    });

    // add buttons to screen
    document.body.appendChild(div);
  };

  // add configuration menu items
  keys.forEach(function(key) {
    var name = 'Edit ' + names[key] + ' Filters...';

    GM_registerMenuCommand(name, function() {
      edit(key);
    });
  });

  // add window load handler
  window.addEventListener('load', function() {
    // add config buttons
    init();

    // hide matching articles
    hide();
  }, false);
})();
