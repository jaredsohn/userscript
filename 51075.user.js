// ==UserScript==
// @name           Vote Reminder
// @namespace      shoecream@luelinks.net
// @description    Reminds you to vote on links in various annoying ways. Requires Firefox 3.
// @include        http://*.endoftheinter.net/*
// @include        https://*.endoftheinter.net/*
// @include        http://endoftheinter.net/*
// @include        https://endoftheinter.net/*
// @exclude        http://wiki.endoftheinter.net/*
// @exclude        https://wiki.endoftheinter.net/*
// @exclude        http://*.evt.endoftheinter.net/*
// @exclude        http://evt.endoftheinter.net/*
// @version        2
// @changes        Code cleanup, naive duplicate link hiding, simple url filtering, updated update algorithm.
// ==/UserScript==

// over 300 lines of unholy code...
// TODO: lots of code cleanup
//       more regular expressions, please
//       combine many single-use functions to enhance code reuse
//       remove from vote reminder link
//       collapse multiple visits from one link into a single row
//       regex filter for things that are obviously not links
//       clear the vote when the link is deleted

var Update = {};
Update.id         = 51075;
Update.curVersion = 2;
Update.callback   = function () {
  var table = document.getElementById('vote-reminder');
  if (table) {
    var update_fmt = '<div style="border: 1pt solid black; margin: 6pt; background-color:yellow; text-align:center; color: black">An update (r{0}) is available. Click here to update.<br/>Changes: {1}</div>';
    var update_link = document.createElement('a');
    update_link.href = Update.url;
    update_link.innerHTML = update_fmt.format(Update.keys.version, Update.keys.changes);
    table.parentNode.insertBefore(update_link, table);
  }
};

Update.check = function () {
  if (!Update.id)         { return; }
  if (!Update.curVersion) { return; }
  if (Update.keys && Update.keys.version)  { Update.callback(); }
  var url = 'http://userscripts.org/scripts/source/' + Update.id + '.meta.js';
  XHR.get(url, Update.onXHR);
};

Update.onXHR = function (response) {
  var splat = response.responseText.split(/[\r\n]/),
  keys = {};   
  for (var i in splat) {
    if (!splat[i]) continue;
    var matches = splat[i].match(/@([\w:]+)\s+(.+)/);
    if (!matches) continue;
    keys[matches[1]] = matches[2];
  }
  // set update keys
  Update.keys = keys;
  Update.url = 'http://userscripts.org/scripts/source/' + Update.id + '.user.js';
  if (keys['version'] && (keys['version'] != Update.curVersion)) {
    Update.callback();
  }
};

var XHR = {};

XHR.createDoc = function (r, callback) {
  var doc = document.implementation.createDocument('','',null);
  var html = document.createElement('html');
  html.innerHTML = r.responseText;
  doc.appendChild(html);
  r.doc = doc;
  callback(r);
}

XHR.get = function (url, callback) {
  GM_xmlhttpRequest({
      method: 'GET',
      url: url,
      headers: {
        'User-Agent': navigator.userAgent,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      onload: function (r) { XHR.createDoc(r, callback) }
    });
}

String.prototype.format = function format () {
  var string = this;
  Array.prototype.forEach.call(arguments, function (e, i) {
      string = string.replace('{' + i + '}', e, 'g');
    });
  return string;
}

function qw (string) {
  return string.split(/\s+/);
}

// the ice box where my heart used to be
var Prefs = {};

Prefs.freeze = function (key, obj) {
  GM_setValue(key, obj.toSource())
}

Prefs.thaw = function (key) {
  var obj = GM_getValue(key);
  return eval(obj);
}

// there's probably a better way to do this
// this is pretend SQL because I don't know SQL at all
var DB = {};

DB.replace = function (table, key, data) {
  var track = Prefs.thaw(table) || {};  
  track[key] = data;
  Prefs.freeze(table, track);
}

DB.select = function (table, key) {
  return (Prefs.thaw(table) || {})[key];
}

DB.dump = function (table) {
  return Prefs.thaw(table) || {};
}

DB.delete = function (table, key) {
  var track = Prefs.thaw(table) || {};  
  delete track[key];
  Prefs.freeze(table, track);
}

function click_handler (e) {
  // handles clicks on links on linkme.php. ensures the following:
  // * it links to somewhere outside of /eti/
  // * it's a link that the link author put into the description
  // * we're actually on linkme.php
  // the above three checks should suffice, because i can't be damned to simply
  // check that the parent element is correct.
  var curpage = new Link (document.location);
  var target = new Link(e.target);
  if (!target.is_saveable) return;
  // retrieves the link row from our ice-cold storage
  var current = DB.select('track', curpage.query.l) || {};
  // if the link row isn't initialized yet we initialize it
  current[target.href] ? 0 : current[target.href] = {count: 0};
  // then we update it with a new running total and time
  current[target.href].count++;
  current[target.href].time = new Date();
  // return to storage
  DB.replace('track', curpage.query.l, current);
}

function Link (dom) {
  // Link object constructor.
  var me = this;
  if (dom) {
    if (typeof dom == 'string') {
      me.href = dom;
    } else if (dom.href) {
      // if it has an href property assume it's a dom object and link it up
      me.href = dom.href;
      me.dom = dom;
    } else {
      throw new TypeError('lol');
    }
  } else {
    // why should constructors die silently
    throw new TypeError();
  }

  // we could lazily evaluate these but the complexity isn't worth it.
  // regular expressions are cheap... i think
  me.is_eti = (function () {
    return /^https?:\/\/(?:.*?\.)?endoftheinter\.net\//.test(me.href);
  })();

  me.page = (function () {
    if (!me.is_eti) {
      return false;
    }
    return /^(?:.*endoftheinter\.net\/(.*?)\.php)?/.exec(me.href)[1];
  })();

  me.hash = (function () {
      return /(?:#(.*))?$/.exec(me.href)[1];
  })();

  me.query = (function () {
      // i spent like 20 minutes on this regex
      var qstring = /^(?:.*\?([^#]*))?/.exec(me.href)[1];
      if (!qstring) return;
      var o = {};
      qstring.split('&').forEach(function (element) {
          var m = element.split('=');
          o[m[0]] = m[1];
        });
      return o;
    })();

  me.domain = (function () {
      return /^https?:\/\/(.*?)\//.exec(me.href)[1];
    })();

  me.is_saveable = (function () {
      // checks to see if this link is "saveable"
      var blacklist = qw('wikipedia.org imdb.com');
      var filter = new RegExp(blacklist.join('|'));
      if (me.is_eti ||
        me.dom && has_parent_with_class(me.dom, 'message-container') ||
        filter.test(me.domain)
      ) return;
      return true;
    })();

  me.toString = function () me.page; // what a useless feature, JavaScript 1.8
}

function d2h (num) {
  return (+num).toString(16);
}

function get_vote_hash () {
  // gets the "vote hash" on the current page with a loop and like 20 regexes  
  var a = document.getElementsByTagName('a');
  for (var i = 0; i < a.length; i++) {
    if (!a[i].href) continue;
    var anchor = new Link(a[i]);
    if (anchor == 'linkme') {
      if (/1?[0-9]/.test(anchor.query.vote)) {
        return anchor.query.h;
      }
    }
  }
}


function has_parent_with_class (dom, cls) {
  // checks to see if the dom object has any parent with the class cls
  do {
    if (dom.parentNode && dom.parentNode.className == cls) {
      return true;
    }
  } while (dom = dom.parentNode); // god forbid i write understandable code
  return false; 
}

function register_handlers () {
  var a = document.getElementsByTagName('a');

  for (var i = 0; i < a.length; i++) {
    // we could do robust checking of whether or not a link should have an
    // event handler attached to it, but i'm pretty sure attaching a listener
    // is pretty much free. this method allows us to lazily check correctness
    // only when something is actually clicked
    a[i].addEventListener('click', click_handler, false);
    // now that i think about it, shouldn't the click_handler() function
    // be an inner function of the register_handlers() function? TODO
  }

  if (/Gecko/.test(navigator.product)) {
    // work around Gecko bug / oversight
    var lastdown;
    function down_handler (e) {
      lastdown = e.target;
    }

    function up_handler (e) {
      if (e.target == lastdown && e.target.nodeName == 'A') {
        // only dispatch a click event if the middle mouse button is involved
        if (e.which == 2) {
          // i'm assuming click events can only be dispatched after a mouseup
          // event. i can't find any evidence to contradict this so yeah
          click_handler(e);
        }
      }
      lastdown = null;
    }

    // we have to keep these registered at all times, otherwise you could start
    // a mousedown and end it somewhere else. an alternative solution would be
    // to time out the "memorized" mousedown position but this solution, though
    // less elegant, is just as effective and easy-to-understand
    document.addEventListener('mousedown', down_handler, false);
    document.addEventListener('mouseup',   up_handler,   false);
  }
}

function set_voted () {
  // check to see if the vote is legit
  var curpage = new Link(document.location);
  if (curpage.query.h != get_vote_hash()) return; 
  // yes betsy, we voted for this page
  DB.replace('votes', curpage.query.l, true);
  // won't all the freezing and thawing ruin the texture?
}

function is_bad_day (/*now*/) {
  // Watch out! Bad things can happen on Friday the 13th.
  var now = new Date(arguments[0]);
  if (now.getDate() == 13 && now.getDay == 5) {
    return true;
  } else {
    return false;
  }
}

function luelinks_date (date) {
  // this mess of code formats a date into /eti/ date standards.
  // thank javascript for not having a strftime or equivalent function
  // there's actually several libraries we could use but fuck that
  var fmt = '{0}/{1}/{2} {3}:{4}:{5}';
  return fmt.format(
    date.getMonth() + 1,
    date.getDate(),
    date.getFullYear(),
    date.getHours() < 10 ? '' + 0 + date.getHours() : date.getHours(),
    date.getMinutes() < 10 ? '' + 0 + date.getMinutes() : date.getMinutes(),
    date.getSeconds() < 10 ? '' + 0 + date.getSeconds() : date.getSeconds()
  );
}

function push_row_with_cells (table, array) {
  // this takes a table and adds a bunch of cells to the end of it
  // TODO: "unshift_row_with_cells", "splice_row_with_cells" 
  // returns the row that was created
  var row = table.insertRow(-1);
  if (!(array instanceof Array)) array = [array];
  array.forEach(function (e) {
      var cell = document.createElement('td');
      try {
        // fuck duck typing. see if we can append this to that
        cell.appendChild(e);
      } catch (dicks) { // get it? it's like you! (catching dicks)
        // okay, not a dom node. let's stringify it instead
        cell.innerHTML = e;
      }
      row.appendChild(cell);
    });
  return row;
}

function set_up_shop() {
  // why did i make this on the token shop of all places
  document.title = document.title.replace('Token Shop', 'Vote Reminder');
  document.getElementsByTagName('h1')[0].textContent = 'Vote Reminder';
  document.getElementsByTagName('h2')[0].innerHTML = 'You have <b id="unvoted-count">0</b> link<span id="plural">s</span> to vote on';
  // this is probably the worst line of code i've ever written
  // classic has two tables here, so we want to get the second one if the
  // user is running classic. in top bar, there'll only be one table so we'll
  // grab index 0
  var table = document.getElementsByTagName('table')[
  document.body.className == 'classic' ? 1 : 0 
  ];
  // delete all rows but the first
  do {
    table.deleteRow(-1);
  } while (table.rows.length > 1);
  table.id = 'vote-reminder';
  table.getElementsByTagName('th')[0].textContent = 'LLcode';
  table.getElementsByTagName('th')[1].textContent = 'Clicked link';
  table.getElementsByTagName('th')[2].textContent = 'Date';

  var track = DB.dump('track') || {};
  var hidden_style = '.hidden-row-{0} { display: none; }';
  function make_link_with_extras (url /*, display, extra, ...*/) {
    var display = arguments[1] || url;
    // arguments isn't a real array
    var extra = Array.prototype.slice.call(arguments, 2)
    .filter(function (e) { return e });
    var span = document.createElement('span');
    var build = span.appendChild(document.createElement('a'));
    build.href = url;
    build.textContent = display;
    if (extra.length) {
      span.appendChild(document.createTextNode(' (' + extra.join(') (') + ')'));
    }
    return span;
  }

  for (llcode in track) {
    // skip this llcode if we've voted already
    if (DB.select('votes', llcode)) { continue; }
    var has_hidden = 0;
    for (link in track[llcode]) {
      var obj = track[llcode][link];
      // push a new row...
      var row = push_row_with_cells(table, [
        // col 0. ll code link + formatting
        make_link_with_extras(
          '//endoftheinter.net/linkme.php?l=' + llcode,
          is_bad_day() ? llcode.replace('LL', 'ETI') : 'LL' + d2h(llcode)
        ),
        // col 1. if there's more than 1 visit we should display it
        obj.count > 1 ?
        make_link_with_extras(link, null, multiplicative(obj.count)) :
        make_link_with_extras(link),
        // col 2. and the date
        luelinks_date(obj.time)
        ]);
      if (has_hidden) {
        row.className = 'hidden-row-' + llcode;
      }
      has_hidden++;
    };
    if (has_hidden > 2) {
      // means we are continuing from a previous loop and there is hidden shit
      var clicky = make_link_with_extras('', 'Show hidden links',
        cardinal(--has_hidden) + ' rows');
      var styl = document.createElement('style');
      styl.innerHTML = hidden_style.format(llcode);
      clicky.appendChild(styl);
      var row = push_row_with_cells(table, ['&rarr;', clicky, '&larr;']);
      row.addEventListener('click', function (e) {
          e.preventDefault();
          e.currentTarget.parentNode.removeChild(e.currentTarget);
        }, false);
    }

    // increment the count here so we know this one wasn't skipped    
    document.getElementById('unvoted-count').textContent++;
  }

  // FUCK number agreement
  if (document.getElementById('unvoted-count').textContent == 1) {
    document.getElementById('plural').style.display = 'none';
  }
}

function cardinal(number) {
  var s = qw('zero one two three four five six seven eight nine ten eleven');
  if (s[number]) {
    return s[number];
  } else {
    return number;
  }
}

function multiplicative(count) {
  var s = [null, 'once', 'twice', 'thrice'];
  if (s[count]) {
    return s[count];
  } else {
    return count + ' times';
  }
}

function set_up_linkme(whereami) {
  // register the click handlers if we're on linkme
  register_handlers();
  if (/1?[0-9]/.test(whereami.query.vote)) {
    // if we voted, then, well, we should remember that
    set_voted();
  }  
}

var current_page = new Link(document.location);
if (current_page == 'linkme') {
  set_up_linkme(current_page);
} else if (current_page == 'shop') {
  if (current_page.hash == 'x-vote-reminder') {
    set_up_shop(current_page); // 400+ lines of code for a lame joke
  }
} else if (current_page == 'profile') {
} else if (current_page == '') {
}

Update.check();