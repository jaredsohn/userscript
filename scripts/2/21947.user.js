// ==UserScript==
// @name           Custom keyboard bindings
// @namespace      http://code.google.com/p/ecmanaut/
// @url            http://userscripts.org/scripts/source/21947.user.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// @description    Adds custom keyboard bindings to any web page
// @include        http://*
// ==/UserScript==

var debug = GM_getValue("debug", false);

var NEXT = '/html/body/a[.="[Next comic]"]'; // hack for automatic bookmarks:
var LAST = '/html/body/a[.="[Last read]"]'; // http://shurl.org/auto-bookmark

// FIXME: reshape convention for bindings to allow [fn, args...] convention to
//        mean "call fn(@args) for bindings" so we don't run needless code.

// Map site name to path+query regexps, which, when matching those parts of the
// url visited, add keyboard bindings, as per its object literal's keys/values.
// Keys are the keyboard shortcut, values the XPath expression to the node that
// the shortcut will imply clicking.
var rules = {
  "xkcd.com":{"^/($|\\d+)":comics("< Prev", "Next >")},
  "comics.com":{".*":comics("Previous Day", "Next Day")},
  "hokus-pokus.se":{"^/($|\\d+)":comics("f\xF6rra", "n\xE4sta")},
  "qwantz.com":{".*":comics("previous")},
  "girlgeniusonline.com":{".*":comics("The Previous Comic", "The Next Comic")},
  "sinfest.net":{"^/($|archive)":comics("Previous")},
  "megatokyo.com":{"^/($|strip/\\d+)":comics()},
  "giantitp.com":{".*":comics("Previous Comic", "Next Comic")},
  "shamusyoung.com":{".*":comics("Previous Comic", "Next Comic")},
  "questionablecontent.net":{".*":comics("Previous","Next",
    { m:scrollStrip(), p:scrollStrip(-1) }) // scroll(-366)
  },
  "dieselsweeties.com":{".*":comics("read the previous comic",
                                    "read the next comic")},
  "phdcomics.com":{
    "^/($|comics/archive)":{
      j:'//a[img[@src="images/prev_button.gif"]]',
      k:'//a[img[@src="images/next_button.gif"]]',
      LEFT:'//a[img[@src="images/prev_button.gif"]]',
      RIGHT:'//a[img[@src="images/next_button.gif"]]',
      n:NEXT, l:LAST
    }
  },
  "smbc-comics.com":{".*":comics($X('//map[@name="buttons"]/area[2]'),
                                 $X('//map[@name="buttons"]/area[4]'))},
  "www-formal.stanford.edu":{".*":comics("previous")},
  "pbfcomics.com":{".*":comics('//b[a]/following-sibling::a[@href][1]',
                               '//b[a]/preceding-sibling::a[@href][1]')},
  "www.boltcity.com":{".*":comics("previous comic", "next comic")},
  "freefall.purrsia.com":{".*":comics("Previous", "next")},
  "www.twolumps.net":{".*":comics("Previous comic", "Next comic")},
  "wondermark.com":{
    ".*":comics('//a[img[@src="/images/pagetemplate_index_09.gif"]]',
                '//a[img[@src="/images/pagetemplate_index_11.gif"]]')
  },
  "anderslovesmaria.reneengstrom.com":{
    ".*":comics('//a[@href and .="«"]','//a[@href and .="»"]')
  },

  "arclanguage.org":{".*":scrollAmong(
      '//td[@class="default" or @class="title"]',
      '//td[@class="default"][span/a[@href="user?id=pg"]] | ' +
      '//td[@class="title"][following::td[2]/a[@href="user?id=pg"]]', {
        n:'//a[.="new"]',
        t:'//a[.="threads"]',
        c:'//a[.="comments"]',
        s:'//a[.="submit"]'
      })},

  "jezebel.com":{".*":scrollAmong('//li[@class="comment CommentBox"]')},

  "s\\d+.ikariam.*":{
    "\\?view=militaryAdvisorReportView&detailedCombatId=":
      scrollAmong('//table//tr[td[@class="section"]]')
  },

  "lunarstorm.se":{
    "^/$":{RETURN:'//a[.="Logga\xA0in"]'},
    "^/blg/blg_view":comics("F\xF6reg\xE5ende","N\xE4sta")
  },

  "helgon.net":{
    "^/[cC]omic/":comics("<", ">"),

    "^/frameset/new.asp":{
      1:'(//a)[1]', 2:'(//a)[2]', 3:'(//a)[3]',
      4:'(//a)[4]', 5:'(//a)[5]', 6:'(//a)[6]',
      r:'//a[img[@title="Manuell uppdatering"]]',
      m:function() { frames(top).helgonmain.focus(); }
    },

    "^/[uU]ser[iI]nfo/[uU]ser[iI]nfo.asp":{
      m:'//a[.="Skicka mail"]',
      s:'//a[.="Skapa relation"]'
    },

    "^/[gG]uestbook/[gG]uestbook.asp":scrollAmong(
      'id("p")/preceding-sibling::table[1]/tbody/tr[not(td[@class="line"])]', {
      h:'//a[.="Historik"]',
      RETURN:'//a[.="Skicka (Ctrl+Enter)"]'
    }),

    "^/[dD]iary/[dD]iary.asp":{
      u:'//a[.="\xC4ndra"]',
      RETURN:'//td[.="Datum"]/following::a[1]'
    },

    "^/[dD]iary/[rR]ead.asp":{
      LEFT:'//a[.="F\xF6reg\xE5ende inl\xE4gg"]',
      RIGHT:'//a[.="N\xE4sta inl\xE4gg"]'
    },

    "^/[dD]iary/[dD]iary_[rR]ead[oO][kK].asp":{
      ESCAPE:'//a[.="Egna inl\xE4gg"]'
    },

    "^/[dD]iary/":{
      b:'//a[.="Bevaka dagbok"] | //a[.="Bevakade"] | ' +
      '//a[preceding-sibling::text()[contains(.,"Denna dagbok bevakas av")]]',
      n:'//a[.="Nytt inl\xE4gg"]',
      u:'//a[.="Uppdatera senaste"]',
      s:'//a[.="50 senast uppdaterade"]',
      e:'//a[.="Egna inl\xE4gg"]',
      g:'//a[.="Godk\xE4nda personer"]',
      RETURN:'//a[.="Spara"]',
      ESCAPE:'//a[.="Dagbok"]'
    },

    "^/[gG]allery\\d*/[vV]iew.asp":{
      LEFT:'//a[.="F\xF6reg\xE5ende"]',
      RIGHT:'//a[.="N\xE4sta"]'
    },

    "^/[gG]allery":{
      v:'//a[preceding::td[1][contains(.,"Visningar:")]]',
      b:'//a[.="Bevaka galleri"]',
      ESCAPE:'//a[.="Galleri"]'
    },

    "^/[sS]tart/":{
      s:'//a[.="Start"]',
      o:'//a[.="Onlinelista"]',
      i:'//a[.="Senast inloggade"]',
      "*":'//a[.="Senast registrerade"]',
      f:'//a[.="F\xF6delsedagsbarn"]',
      t:'//a[.="Tyck till-arkiv"]',
      b:'//a[.="Bildarkiv"]',
      r:'//a[.="R\xF6sta"]',
      a:'//a[.="Arkiv"]',
      n:'//a[img[@alt="Nemi"]]',
      1:'(//input[@type="radio" and @name="vote"])[1]',
      2:'(//input[@type="radio" and @name="vote"])[2]',
      3:'(//input[@type="radio" and @name="vote"])[3]',
      4:'(//input[@type="radio" and @name="vote"])[4]',
      5:'(//input[@type="radio" and @name="vote"])[5]',
      6:'(//input[@type="radio" and @name="vote"])[6]',
      7:'(//input[@type="radio" and @name="vote"])[7]',
      8:'(//input[@type="radio" and @name="vote"])[8]',
      9:'(//input[@type="radio" and @name="vote"])[9]'
    },

    "^/[vV]ote/[rR]esult.aspx?\\?[iI][dD]=":{
      RIGHT:function() {
        var text = $X('normalize-space(//td[@class="headline"]/text())');
        var link = $X('//a[contains(.,"'+ (text.replace('"','\\"')) +'")]');
        var want = $X('preceding::a[contains(@href,"esult")][1]', link);
        want && click(want);
      },
      LEFT:function() {
        var text = $X('normalize-space(//td[@class="headline"]/text())');
        var link = $X('//a[contains(.,"'+ (text.replace('"','\\"')) +'")]');
        var want = $X('following::a[contains(@href,"esult")][1]', link);
        want && click(want);
      }
    },

    "^/[vV]ote/":{
      9:'//td[.="Antal r\xF6ster"]/following::a[1]',
      LEFT:'//td[.="Antal r\xF6ster"]/following::a[1]',
      0:'(//a)[last()]',
      RIGHT:'(//a)[last()]'
    },

    ".*":{
      m:'//a[.="Markera alla"]',
      t:'//a[.="Ta bort"]',
      1:'//a[.="Presentation"]',
      2:'//a[.="G\xE4stbok"]',
      3:'//a[.="Dagbok"]',
      4:'//a[.="Polare"]',
      5:'//a[.="Galleri"]',
      0:'//text()[contains(.,"Visar sida:")]/following-sibling::a[1]',
      9:'//text()[contains(.,"Visar sida:")]/following-sibling::a[last()]',
      LEFT:'//text()[contains(.,"Visar sida:")]/following-sibling::' +
             'text()[normalize-space(.)="["]/preceding-sibling::a[1]',
      RIGHT:'//text()[contains(.,"Visar sida:")]/following-sibling::' +
              'text()[normalize-space(.)="]"]/following-sibling::a[1]',
      R:function() { with(getFrame("newmess")) { location.reload(); focus(); } }
    }
  },

  "okcupid.com":{
    "^/quickmatch":{
      y:'id("qm2TopBarButtonYes")',
      n:'id("qm2TopBarButtonNo")'
    },

    "^/questions/ask":{
      1:'(id("user_answer")//input[@type="radio"])[1]',
      2:'(id("user_answer")//input[@type="radio"])[2]',
      3:'(id("user_answer")//input[@type="radio"])[3]',
      4:'(id("user_answer")//input[@type="radio"])[4]',
      l:'id("is-public")',
      k:'id("is-key")',

      q:'(id("ideal_answers")//input[@type="checkbox"])[1]',
      w:'(id("ideal_answers")//input[@type="checkbox"])[2]',
      e:'(id("ideal_answers")//input[@type="checkbox"])[3]',
      r:'(id("ideal_answers")//input[@type="checkbox"])[4]',

      a:'id("importance_list")//input[@type="radio" and @value="5"]',
      s:'id("importance_list")//input[@type="radio" and @value="4"]',
      d:'id("importance_list")//input[@type="radio" and @value="3"]',
      f:'id("importance_list")//input[@type="radio" and @value="2"]',
      g:'id("importance_list")//input[@type="radio" and @value="1"]',

      ESCAPE:'id("skip-button")//a',
      RETURN:'id("submit-button")//a',
      " ":'id("submit-button")//a',
      i:'id("open-in-forum")//a'
    },

    "^/picturebrowsing":{
      1:'//div[.=">" and @class="pbButtonPos"]',
      2:'//div[.=">" and @class="pbButtonNeu"]',
      3:'//div[.=">" and @class="pbButtonNeg"]',
      4:'//div[.=">" and @class="pbButtonNo"]',

      i:'//a[.="Flag Inappropriate"]',

      q:'//div[.="^" and @class="pbButtonPos"]',
      w:'//div[.="^" and @class="pbButtonNeu"]',
      e:'//div[.="^" and @class="pbButtonNeg"]',
      r:'//div[.="^" and @class="pbButtonNo"]',

      y:'//div[.=">" and @class="pbButtonPos"]',
      " ":'//div[.=">" and @class="pbButtonNeu"]',
      n:'//div[.=">" and @class="pbButtonNeg"]',
      "-":'//div[.=">" and @class="pbButtonNo"]',
      "!":'//div[.="^" and @class="pbButtonPos"]'
    },

    "^/profile\\?":scrollAmong('//h2 | //div[@class="profilePicsImage" or '+
        '@class="commentsBox" or @class="journalEntryHead"]', {
      W:'//a[@class="profileTopBTN woo"]',
      M:'//a[@class="profileTopBTN msg"]',
      y:'id("qm2TopBarButtonYes")', // these two added by this feature script:
      n:'id("qm2TopBarButtonNo")', // http://userscripts.org/scripts/show/22240
      1:'id("profileTabsBasics")',
      2:'id("profileTabsJournal")',
      3:'id("profileTabsPics")',
      4:'id("profileTabsTests")',
      5:'id("profileTabsComments")',
      i:'//a[starts-with(.,"Improve your rating with ")]'
    }),

    "^/mailbox":{
      1:'//text()[.="Inbox"]/ancestor::a',
      2:'//text()[.="Sent Mail"]/ancestor::a',
      3:'//text()[.="Saved Mail"]/ancestor::a',

      d:'//input[@value="DELETE"]',
      m:'//input[@value="MOVE"]',
      f:'//input[@value="FORWARD"]',
      r:'//input[@value="REPLY" or @value="REFRESH"]',
      n:'//input[@value="NEW MESSAGE"]',

      c:'//a[.="Compare"]',
      a:'//input[@value="Add to Favorites"]',

      b:'//a[.="Block them"]',
      s:'//a[.="Report This Message"]',
      "!":'//a[.="Report This Message"]',

      k:'//a[.=">"]', RIGHT:'//a[.=">"]',
      j:'//a[.="<"]', LEFT:'//a[.="<"]'
    },

    "^/flagmod":{
      c:'//input[@type="text" and @name="comment"]',
      1:'id("flagmodVote0")', y:'id("flagmodVote0")',
      2:'id("flagmodVote1")', n:'id("flagmodVote1")',
      3:'id("flagmodVote2")', "?":'id("flagmodVote2")'
    },

    "^/(tests/(take|\\d+/)|quizzy/take)":{
      1:next_radio_choice, 2:next_radio_choice,
      3:next_radio_choice, 4:next_radio_choice,
      ESCAPE:undo_last_radio_choice,
      RIGHT:'id("submit-qa") | id("submit-qa-done") | //p[@class="break_button"]/a[@href]',
      RETURN:'id("submit-qa") | id("submit-qa-done") | //p[@class="break_button"]/a[@href]'
    },

    "^/journal":scrollAmong('//div[@class="journalComment"]',
                            '//div[@class="journalEntryHead"]'),
    "^/relevant":scrollAmong('//div[@class="journalRelevantComment clearfix"]',
                             '//h3')
  },

  "spraydate.spray.se":{
    "spraydate/search/search_result":scrollAmong('//div[@class="row"]', {
      k:'//a[.="N\xE4sta sida"]',
      j:'//a[.="F\xF6reg\xE5ende sida"]'
    }),
    "personal/guestbook":scrollAmong('//div[@class="columns2l"]', {
      k:'//a[.="\xBB"]',
      j:'//a[.="\xAB"]'
    }),
    "personal/vip_photoalbum":scrollAmong('//p[@style]/..[not(@id)]')
  },

  "clustrmaps.com":{".*":scrollAmong('//a/img[@align]')},

  "flickr.com":{"^/photos/.*/in/":{
    k:'//div[@class="contextThumbsMoverDiv"]/a[2]',
    j:'//div[@class="contextThumbsMoverDiv"]/a[1]'
  }}
};

function comics(prev, next, other) {
  function xpath(title) {
    function eq(what, text) {
      var upper = text.toUpperCase(), lower = text.toLowerCase();
      return '"'+ lower +'" = normalize-space(' +
        'translate('+ what +',"'+ upper +'","'+ lower +'")' + ')';
    }
    if (!title.indexOf("//")) return title; // got an xpath input; ugly hack
    return '//a[@href != "#" and ('+
      [eq(".", title), eq("font/.", title), eq("img/@alt", title),
       eq("img/@title", title)].join(' or ') + ')]';
  }

  if (typeof prev != "object") prev = xpath(prev || "prev");
  if (typeof next != "object") next = xpath(next || "next");
  var keys = { j:prev, k:next, LEFT:prev, RIGHT:next, n:NEXT, l:LAST };
  if (other)
    for (var key in other)
      keys[key] = other[key];
  return keys;
}

function scrollStrip(up) {
  var i = $X('id("comic")/center/img'), h = 28 + 18 - 12; // top, bot, delta
  return function() {
    var panels = Math.round(i.height / 366);
    window.scrollBy(0, (up ? -1 : 1) * (i.height-h)/panels);
  };
}

function scrollBy(pixels) {
  return function() { window.scrollBy(0, pixels); };
}

function getFrame(name, frame) {
  if (!frame)
    frame = top;
  if (frame.name == name)
    return frame;
  for (var i = 0; i < frame.frames.length; i++) try {
    var yes = getFrame(name, frame.frames[i]);
    if (yes) return yes;
  } catch(e) {}
}

// returns the last selected radio button in document order
function get_last_radio_choice() {
  var radios = $x('//input[@type="radio"]');
  var last_on = radios.length;
  while (last_on--)
    if (radios[last_on].checked)
      break;
  return radios.length && radios[Math.max(0, last_on)];
}

function next_radio_choice(key, event) {
  var last = get_last_radio_choice();
  var group = $x('ancestor::li[1]//input[@type="radio"]', last);
  if (last.checked) {
    var next = $X('following::li[1]//input[@type="radio"]', group.pop());
    if (next)
      group = $x('ancestor::li[1]//input[@type="radio"]', next);
    else
      return;
  }
  var node = group[key-1];
  if (event)
    click(node);
  scrollTo($X('ancestor::li[1]', node));
}

function coordsOf(node) {
  if (typeof node.offsetLeft == "undefined" && node.parentNode)
    return coordsOf(node.parentNode);
  var x = 0, y = 0, w = node.offsetWidth, h = node.offsetHeight;
  do {
    x += node.offsetLeft;
    y += node.offsetTop;
  } while (node = node.offsetParent);
  return { x:x, y:y, w:w, h:h };
}

function getPosByXPath(xpath, sortfn) {
  sortfn = sortfn || function byY(a, b) { return a.y - b.y; };
  var all = $x(xpath);
  return all.map(coordsOf).map(function(p, i) {
    p.node = all[i]; return p;
  }).sort(sortfn);
}

var lastXPath;

function scrollToNthWhere(xpath, n, filter) {
  return function() {
    //console.log("%s %x", n ? "up" : "dn", xpath);
    console.time("scrollToNthWhere(p, "+n+", filter)");
    console.time("xpath");
    var all = getPosByXPath(xpath);
    console.timeEnd("xpath");
    console.time("filter");
    var left = all.filter(filter);
    console.timeEnd("filter");
    if (left.length) {
      var m = (n + left.length) % left.length;
      var node = left[m].node;
      for (var p = 0; p < all.length; p++)
        if (all[p].node == node)
          break;
      //console.log(node, n, m, p, left.map(function(a){return a.node;}));
      //console.log(all.map(function(a){return a.node;}));
      lastXPath = "("+ xpath +")["+ (p+1) +"]";
      console.time("anchor");
      if (node.id || node.name)
	location.href = "#" + encodeURIComponent(node.id || node.name);
      else
	setXPathBookmark();
      scrollTo(node);
      console.timeEnd("anchor");
    }
    console.timeEnd("scrollToNthWhere(p, "+n+", filter)");
  };
}

function scrollToNext(xpath) {
  function following(x) {
    return x.y > pageYOffset;
  }
  return scrollToNthWhere(xpath, 0, following);
}

function scrollToPrev(xpath) {
  function preceding(x) {
    return x.y < pageYOffset;
  }
  return scrollToNthWhere(xpath, -1, preceding);
}

function setXPathBookmark() {
  var node = lastXPath && $X(lastXPath);
  if (node) {
    location.href = "#xpath:"+ lastXPath;
  }
}

function scrollAmong(xpath/*, xpath, ...*/, bindings) {
  function bind(key, xpath, func) {
    if (bindings.hasOwnProperty(key))
      return;
    bindings[key] = func(xpath);
  }
  var xpaths = [].slice.call(arguments);
  var keys = [['p', 'm'], ['j', 'k']];
  bindings = xpaths.pop();
  if (typeof bindings == "string") {
    xpaths.push(bindings);
    bindings = {};
  }
  while (keys.length && xpaths.length) {
    xpath = xpaths.shift();
    bind(keys[0][0], xpath, scrollToPrev);
    bind(keys[0][1], xpath, scrollToNext);
    keys.shift();
  }
  return bindings;
}

function scrollTo(node) {
  var x = node, y = arguments[1];
  if (typeof node == "object") {
    node = coordsOf(node);
    x = node.x;
    y = node.y;
  } else if (arguments.length == 1) {
    y = x;
    x = 0;
  }
  window.scrollTo(x, y);
}

function undo_last_radio_choice(key) {
  var last = get_last_radio_choice();
  if (last) {
    last.checked = false;
    scrollTo(get_last_radio_choice());
    next_radio_choice(1);
  }
}

var aliases = {"LEFT":"\x25","RIGHT":"\x27","RETURN":"\x0D","ESCAPE":"\x1B"};

var listen = false;
var bindings = {}; // all bindings to apply on this page

var host = location.hostname.toLowerCase();
var urlp = location.pathname + location.search;
var data = rules[host] || rules[host.replace(/^www\./,"")];
if (!data) {
  for (var rule in rules) {
    if (!/[*+^$?(){}|\x5B-\x5D]|(\.\.)/.test(rule)) continue; // not a regexp
    if (host.match(rule)) {
      data = rules[rule];
      break;
    }
  }
}

//try {
  for (var test in data) {
    if (urlp.match(new RegExp(test))) {
      if (debug) console.log("Layering bindings for %s: %x", host, test);
      listen = registerKeys(data[test]) || listen;
    }
  }
  setTimeout(function() { // wait for 10ms, hopefully running all GM scripts
    // Consume the pagination microformat and use its item specifier as an
    // indicator of items to scroll among -- bind to m/p, if still unbound
    var items = $X('/html/head/meta[@name="items-xpath" and @content]');
    if (items && $x(items = items.content).length) {
      if (debug) console.info("Wee! Found pagination microformat (%x)!", items);
      if (!bindings.hasOwnProperty("?"))
        bindings["?"] = setXPathBookmark;
      if (!bindings.hasOwnProperty("k")) {
        // handle '/html/head/link[@rel="next" and @href]' links as target?
        var next = $X('/html/head/meta[@name="next-xpath" and @content]');
        if (next)
          bindings["k"] = next.content;
      }
      bindings = scrollAmong(items, bindings);
      listen = true;
    } else if (debug) console.log("No pagination microformat. :-(");
    if (listen) {
      document.addEventListener("keypress", keyListener, true);
    }
  }, 500);
//} catch(e) {}

function registerKeys(keys) {
  var listen = false;
  keys = keys || data[test];
  for (var name in keys) {
    listen = true;
    var alias = unsafeWindow.KeyEvent["DOM_VK_"+ name];
    var key = alias ? String.fromCharCode(alias) : name;
    if (bindings.hasOwnProperty(key))
      continue;
    var path = keys[name];
    if (typeof path == "function") {
      bindings[key] = path;
      if (debug) console.info("Bound key %x to %x", name, path);
      continue;
    }
    var node = typeof path == "string" ? $X(path) : path;
    if (node) {
      bindings[key] = path;
      if (debug) console.info("Bound key %x to %x", name, node);
      var img = $X('self::a[not(@title)]/img[@title]', node);
      if (img) node = img; // change title of the image instead
      alias = {RETURN:"Return", ESCAPE:"Escape", " ":"Space",
               LEFT:"Arrow left", RIGHT:"Arrow right"}[name] || name;
      var title = "Keyboard shortcut: ";
      if ("http://www.helgon.net/frameset/new.aspx" != location.href)
      if ((node.title||"").indexOf(title) == 0)
        node.title += ", or " + alias;
      else
        node.title = title + alias;
    }
  }
  return listen;
}

function keyListener(event) {
  console.timeEnd("keypress");
  console.time("keypress 1");
  var node = event.target;
  var name = node.nodeName.toLowerCase();
  if (name == "textarea" || (name == "input" && node.type == "text") ||
      event.ctrlKey || event.altKey || event.metaKey)
    return; // don't intercept textarea/text input field input, or control keys
  var key = String.fromCharCode(event.charCode || event.keyCode);
  if ((key == aliases.LEFT && pageXOffset) ||
      (key == aliases.RIGHT && pageXOffset < scrollMaxX))
    return;
  var act = bindings[key];
  //console.log("key: <%s>%x, action: %s %x", key.charCodeAt().toString(16), key, typeof act, act);
  if (act) {
    if (typeof act == "function") {
      console.timeEnd("keypress 1");
      console.time("keypress 2");
      act(key, event);
      console.timeEnd("keypress 2");
    } else {
      console.time("keypress 3");
      if (typeof act == "string") {
        if (debug) console.info("Looking up %x", act);
        node = $X(act);
        if (debug) console.info("...got %x", node);
      }
      else
        node = act;
      console.timeEnd("keypress 3");
      console.timeEnd("keypress 4");
      click(node);
      if (node.nodeName.match(/^input$/i) && node.type == "text") {
        node.focus();
      }
      console.timeEnd("keypress 4");
    }
    event.preventDefault();
    event.stopPropagation();
  }
  console.timeEnd("keypress");
}

function click(node) {
  var event = node.ownerDocument.createEvent("MouseEvents");
  event.initMouseEvent("click", true, true, node.ownerDocument.defaultView,
                       1, 0, 0, 0, 0, false, false, false, false, 0, node);
  node.dispatchEvent(event);
  if (node.nodeName.match(/^a(rea)?$/i) && node.href) {
    var win = node.target && getFrame(node.target) || window;
    if (!node.href.match(/^#/))
      win.location.href = node.href;
    else if (node.getAttribute("onclick")) {
      var js = node.getAttribute("onclick");
      if (!js.match(/^javascript:/i))
        js = "javascript:" + js;
      win.location.href = js;
    }
    if (win != window)
      win.focus();
  }
}
