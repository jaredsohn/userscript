// ==UserScript==
// @name          userscripts.org Favourites
// @author        Raffles
// @namespace     http://ratherodd.com/
// @description   Allows you to save your favourite user scripts. Shows statistics about each script, which update themselves automatically.
// @include       http://userscripts.org/*
// ==/UserScript==

// linkType determines what sort of link to use to add/remove favourites:
// 0 - keeps link as it is on the website (personally I don't like it)
// 1 - uses the same link but the text is changed to this: 'Add to favourites' or 'Remove from favourites' (quality British English)
// 2 - creates a separate link under "View script source" so you can add favourites using this system or the native one (this means there will be two favourite-adding links).

// truncateTo: When you add a script to your favourites, if you set truncateTo to a value over 0 it will be truncated to approximately that length (it doesn't cut words up), followed by an ellipsis (...).

var linkType = 1;
var truncateTo = 70;

Function.prototype.bind = function(thisObject) {
  var method = this;
  var oldargs = [].slice.call(arguments, 1);
  return function() {
    var newargs = [].slice.call(arguments);
    return method.apply(thisObject, oldargs.concat(newargs));
  };
}

if (!GM_setValue) {
  alert('You must update Greasemonkey before you can use this script (userscripts.org Favourites). The fact you\'re seeing this means you have a pretty old version, so it\'s worth updating in any case.');
}
else {
  addStyle();
  var scriptid = window.location.href.split('/').pop(), doubleClicked = false;
  var ins = document.getElementById('install_script');
  if (ins) {
    if (window.location.href.indexOf('9750') > 20 && ins.firstChild.href.indexOf('9750.user.js') > 20) {
      ins.firstChild.addEventListener('click', updateScript, false);
      if (unsafeWindow.sessionStorage) {
        if (unsafeWindow.sessionStorage.usoFavourites) {
          GM_setValue('favourites', String(unsafeWindow.sessionStorage.usoFavourites));
          delete(unsafeWindow.sessionStorage.usoFavourites);
        }
      }
    }
  }
  var favs = eval(GM_getValue('favourites'));
  if (typeof favs !== 'object') favs = {};
  if (GM_getValue('sortBy') === undefined) GM_setValue('sortBy', 1);
  if (ins) makeLink();
  createFavsBox();
  update();
}

function makeLink() {
  var remtext, addtext;
  if (linkType !== 0) {
    remtext = 'Remove from favourites';
    addtext = 'Add to favourites';
  }
  else {
    remtext = 'Unfavorite this script';
    addtext = 'Favorite this script';
  }
  if (scriptid in favs) var found = true;
  var txt = found ? remtext : addtext;
  if (linkType === 2) {
    var add = document.createElement('p');
    var addlink = add.appendChild(document.createElement('a'));
    addlink.setAttribute('href', '');
    addlink.setAttribute('class', 'fav_alt feed');
    addlink.setAttribute('id', 'fav_alt');
    addlink.appendChild(document.createTextNode(txt));
    var right = document.getElementById('right');
    right.insertBefore(add, right.getElementsByTagName('h6')[0]);
  }
  else {
    var ins = document.getElementById('install_script');
    if (ins.nextSibling.nodeType === 3) ins.parentNode.removeChild(ins.nextSibling);
    var addlink = ins.nextSibling.firstChild;
    if (addlink.nodeType !== 1 || !addlink.hasAttribute('href')) { // not logged in
      var p = document.createElement('p');
      p.setAttribute('class', 'favorite');
      addlink = p.appendChild(document.createElement('a'));
      addlink.setAttribute('href', '/scripts/favorite/9750');
      addlink.appendChild(document.createTextNode(''));
      ins.parentNode.insertBefore(p, ins.nextSibling);
    }
    if (found) addlink.setAttribute('class', 'remove');
    else addlink.setAttribute('class','add');
    addlink.firstChild.nodeValue = txt;
  }
  addlink.addEventListener('click', function(e) {
    e.preventDefault();
    if (found) removeFav(this.parentNode);
    else addFav(this);
  }, false);
}

function addFav(l) {
  var scriptTitle = document.getElementsByTagName('h1')[1].firstChild.nodeValue, comments = 0, lastupdated = 0, installs = '0', author = false;
  if (window.location.href.indexOf('review') > 0) {
    scriptTitle = scriptTitle.substring(0, scriptTitle.length - 1).replace('Source for "','');
  }
  else {
    comments = xpath('count(//table/tbody/tr[contains(@class, "post hentry")])').numberValue;
    var extrapages = (xpath('count(//div[@class="pagination"][1]/a)').numberValue) - 1;
    if (extrapages > 0) {
      addComments(scriptid, extrapages, extrapages * 25, true);
    }
    var installs = commify(/(\d+)/.exec(xpath('//div[@id="right"]/p[contains(text(), "Installed")]/text()', true).singleNodeValue.nodeValue)[0]);
    lastupdated = xpath('//div[@id="right"]/h6[contains(text(), "Last updated") or contains(text(), "First uploaded")]/following-sibling::p/text()', true).singleNodeValue.nodeValue;
    lastupdated = lastupdated.replace(/minutes?/,'m').replace(/hours?/,'h').replace('.','');
    author = xpath('//div[@id="right"]/h6[text()="Admin for script"]/text()', true).singleNodeValue;
  }
  if (truncateTo > 0 && scriptTitle.length > truncateTo) {
    var s = scriptTitle.split(' '), newtitle = '';
    for (var i = 0; i < s.length; i++) {
      newtitle += s[i] + ' ';
      if (newtitle.length > truncateTo) break;
    }
    scriptTitle = newtitle.substring(0, newtitle.length - 1) + '...';
  }
  favs[scriptid] = [scriptTitle, Boolean(author), new Date().toLocaleString(), comments, installs, lastupdated];
  if (linkType === 2) l.parentNode.parentNode.removeChild(l.parentNode); // kill event listener by removing node
  if (lastupdated === 0) {
    update();
    GM_setValue('lastupdated', 1);
  }
  createFavsBox();
  GM_setValue('favourites', favs.toSource());
  makeLink();
}

function removeFav(l, u) {
  var f = u ? u : scriptid;
  if (f in favs) delete favs[f];
  if (linkType === 2) {
    var altfav = document.getElementById('fav_alt');
    altfav.parentNode.removeChild(altfav); // kill event listener
  }
  createFavsBox(u);
  GM_setValue('favourites', favs.toSource());
  makeLink();
}

function addComments(fav, extrapages, comments, justadded) {
  GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://userscripts.org/scripts/show/' + fav + '?page=' + (extrapages + 1),
    onload: function(response) {
      var cm = response.responseText.match(/post hentry/g).length;
      if (favs[fav]) {
        favs[fav][3] = comments + cm;
        var node = justadded ? document.getElementById('favourites').getElementsByTagName('ol')[0].lastChild.firstChild : xpath('//div[@id="favourites"]/ol/li/a[contains(@href, ' + fav + ')]', true).singleNodeValue;
        node.nextSibling.firstChild.nodeValue = 'c: ' + favs[fav][3];
      }
      GM_setValue('favourites', favs.toSource());
    }
  });
}

function createFavsBox(updated) {
  var navitems = document.getElementById('header');
  if (!navitems) return;
  navitems = navitems.getElementsByTagName('li');
  if (!navitems) return;
  if (navitems[1].firstChild.firstChild.nodeValue != 'Favourites') {
    favsLink = navitems[1].parentNode.insertBefore(document.createElement('li'), navitems[1]); // global var
    favsLink = favsLink.appendChild(document.createElement('a'));
    favsLink.setAttribute('href', '../favourites');
    favsLink.appendChild(document.createTextNode('Favourites'));
    favsLink.addEventListener('click', function(e) {
      this.blur();
      toggleFavsList(e, true);
    }, false);
  }
  else favsLink = navitems[1].firstChild;
  if (favsLink.nextSibling && !updated) favsLink.parentNode.removeChild(favsLink.nextSibling);
  if (updated) {
    favsBox = favsLink.nextSibling; // global
    var ol = favsBox.firstChild;
    while (ol.firstChild) {
      ol.removeChild(ol.firstChild);
    }
  }
  else {
    favsBox = favsLink.parentNode.appendChild(document.createElement('div'));
    favsBox.setAttribute('id', 'favourites');
    favsBox.setAttribute('class', 'h');
    var ol = favsBox.appendChild(document.createElement('ol'));
  }
  var empty = true;
  for (var fav in favs) {
    empty = false;
    var item = ol.appendChild(document.createElement('li'));
    itemLink = item.appendChild(document.createElement('a'));
    itemLink.appendChild(document.createTextNode(favs[fav][0]));
    itemLink.setAttribute('href', '/scripts/show/' + fav);
    itemLink.setAttribute('title', 'Added ' + favs[fav][2]);
    itemLink.addEventListener('click', function(e) {
      e.preventDefault();
      doubleClicked = false;
      var l = this.href;
      setTimeout(function() {
        if (doubleClicked !== true) window.location.assign(l);
      }, 500);
    }, false);
    itemLink.addEventListener('dblclick', editFavName, false);
    if (favs[fav][6] && favs[fav][6] < favs[fav][3]) {
	  addClass(itemLink, 'newcomments');
    }
    favs[fav][6] = favs[fav][3];
    GM_setValue('favourites', favs.toSource());
    var c = ['c', 'i', 'u'];
    for (var i = 0; i < 3; i++) {
      var itemInfo = item.appendChild(document.createElement('p'));
      itemInfo.appendChild(document.createTextNode(c[i] + ': ' + favs[fav][i+3]));
    }
    if (favs[fav][1] === true) addClass(itemLink, 'author');
    var deleter = item.appendChild(document.createElement('a'));
    deleter.appendChild(document.createTextNode('x'));
    deleter.href = '#delete';
    deleter.title = 'Delete ' + favs[fav][0];
    deleter.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.parentNode.removeChild(this.parentNode);
      removeFav(false, this.parentNode.firstChild.href.split('/').pop());
    }, false);
  }
  if (empty) {
    var emptyMessage = ol.appendChild(document.createElement('li'));
    emptyMessage.setAttribute('class', 'e');
    emptyMessage.appendChild(document.createTextNode('No favourites yet'));
  }
  if (!document.getElementById('sorter')) {
    var sorter = favsBox.appendChild(document.createElement('p'));
    sorter.setAttribute('id', 'sorter');
    sorter.appendChild(document.createTextNode('Sort by: '));
    var methods = ['title', 'author', 'date added', 'comments', 'installs', 'last updated'];
    for (var i = 0; i < 6; i++) {
      var a = sorter.appendChild(document.createElement('a'));
      a.setAttribute('href', i);
      if (GM_getValue('sortBy') === i) a.setAttribute('class', 'sorting');
      else if (GM_getValue('sortBy') === (i + 'rev')) a.setAttribute('class', 'sorting rev');
      a.appendChild(document.createTextNode(methods[i]));
      a.addEventListener('click', sortBy, false);
    }
    sorter.appendChild(document.createTextNode(' | '));
    var refresher = sorter.appendChild(document.createElement('a'));
    refresher.setAttribute('href', '#refresh');
    refresher.setAttribute('id', 'refresher');
    refresher.appendChild(document.createTextNode('Refresh'));
    refresher.addEventListener('click', update, false);
  }
}

function editFavName() {
  doubleClicked = true;
  var f = this.href.split('/').pop();
  var p = prompt('Change this script\'s name to:', favs[f][0]);
  if (p === null) return;
  favs[f][0] = p;
  GM_setValue('favourites', favs.toSource());
  createFavsBox(true);
}

function toggleFavsList(e, t) {
  if (e.target.firstChild && e.target.firstChild.nodeValue == 'Favourites') {
    e.preventDefault();
    if (!t) return;
  }
  var tar = e.target;
  while (tar.nodeName.toLowerCase() != 'html') {
    if (tar.id === 'favourites') return;
    tar = tar.parentNode;
  }
  if (favsBox.getAttribute('class') === 'h') {
    favsBox.removeAttribute('class');
    favsLink.parentNode.setAttribute('class', 's');
    document.body.addEventListener('click', toggleFavsList, true);
  }
  else {
    favsBox.setAttribute('class', 'h');
    favsLink.parentNode.removeAttribute('class');
    document.body.removeEventListener('click', toggleFavsList, true);
  }
}

function update(e) {
  var now = Math.floor(new Date().getTime() / 1000);
  var last = GM_getValue('lastupdated');
  if (last) {
    if (now - last > 1800 || this.nodeType) {
      if (e) e.preventDefault();
      var ref = this.nodeType ? this : document.getElementById('refresher');
      if (ref.getAttribute('class') === 'refreshing') return;
      ref.firstChild.nodeValue = 'Refreshing...';
      ref.setAttribute('class', 'refreshing');
      count = 0; // global
      for (var fav in favs) {
        count++;
        GM_xmlhttpRequest({
          method: 'GET',
          url : 'http://userscripts.org/scripts/show/' + fav,
          onload: updateItem.bind(favs[fav], fav)
        });
      }
      GM_setValue('lastupdated', now);
    }
  }
  else GM_setValue('lastupdated', now);
}

function updateItem(fav, res) {                     // Can't use DOMParser because people can't
  count--;                                          //be relied upon to have written XML-friendly
  var page = res.responseText, comments = 0;        //code in metadata, comments, etc. Bollocks.
  if (page.indexOf('<div class="pagination">', 1500) > -1) {
    comments = 25;
    var extrapages = (page.match(/<a href="\/scripts\/show\/[\d]+\?page=[\d]+">[\d]+<\/a>/g).length) / 2;
    addComments(fav, extrapages, comments + ((extrapages - 1) * 25));
  }
  else if (page.indexOf('post hentry') != -1) comments = page.match(/post hentry/g).length;
  var installs = page.match(/Installed\s([\d]+)\stimes\.<\/p>\s+<h6>/)[1];
  var lastupdated = page.match(/(Last updated|First uploaded)<\/h6>\s+<p>([\w\s,]+)\.<\/p>/)[2];
  lastupdated = lastupdated.replace(/minutes?/,'m').replace(/hours?/,'h').replace('.','');
  this[3] = comments;
  this[4] = commify(installs);
  this[5] = lastupdated;
  if (count == 0) {
    GM_setValue('favourites', favs.toSource());
    var lis = document.getElementById('favourites').getElementsByTagName('li');
    var counter = -1;
    for (var fav in favs) {
      counter++;
      if (favs[fav][6] && favs[fav][6] < favs[fav][3]) {
	    addClass(lis[counter].firstChild, 'newcomments');
      }
      favs[fav][6] = favs[fav][3];
      GM_setValue('favourites', favs.toSource());
      lis[counter].childNodes[1].firstChild.nodeValue = 'c: ' + favs[fav][3];
      lis[counter].childNodes[2].firstChild.nodeValue = 'i: ' + favs[fav][4];
      lis[counter].childNodes[3].firstChild.nodeValue = 'u: ' + favs[fav][5];
    }
    var refresher = document.getElementById('refresher');
    if (refresher.getAttribute('class') === 'refreshing') {
      refresher.removeAttribute('class');
      refresher.firstChild.nodeValue = 'Refresh';
    }
  }
}

function sortBy(e) {
  e.preventDefault();
  var arr = [], now = Date.now();
  var sorttype = parseInt(this.getAttribute('href'));
  for each (var fav in favs) {
    arr.push(parseSince(fav[sorttype], sorttype, now));
  }
  switch (sorttype) {
    case 0: arr.sort(isort); break;
    case 1: arr.sort().reverse(); break;
    case 2:
    case 3:
    case 4:
    case 5: arr.sort(intsort); break;
    default: arr.sort();
  }
  if (GM_getValue('sortBy') === sorttype) {
    GM_setValue('sortBy', sorttype + 'rev');
    this.setAttribute('class', 'sorting rev');
    arr.reverse();
  }
  else {
    Array.forEach(this.parentNode.childNodes, function(node) {
      if (node.nodeName.toLowerCase() !== 'a') return;
      node.removeAttribute('class');
    });
    GM_setValue('sortBy', sorttype);
    this.setAttribute('class', 'sorting');
  }
  var newfavs = {};
  arr.forEach(function(a) {
    for (var fav in favs) {
      if (parseSince(favs[fav][sorttype], sorttype, now) === a) newfavs[fav] = favs[fav];
    }
  });
  favs = newfavs;
  GM_setValue('favourites', favs.toSource());
  createFavsBox(true);
}

function parseSince(dt, sorttype, now) {
  if (sorttype === 2 || sorttype === 5) {
    var t = Date.parse(dt);
    if (isNaN(t) && isNaN(parseInt(dt))) t = 1000000000000000;
    else if (isNaN(t)) {
      if (dt.indexOf('h') > 0) t = now - (parseInt(dt) * 3600000);
      else if (dt.indexOf('m') > 0) t = now - (parseInt(dt) * 60000);
    }
  }
  else if (sorttype === 4) t = decommify(dt);
  else return dt;
  return t;
}

function commify(s) {
  var str = s.split('').reverse().join(''), newstr = '';
  for (var i = 0; i < str.length; i++) {
    if (i && i % 3 == 0) newstr += ',';
    newstr += str.charAt(i);
  }
  return newstr.split('').reverse().join('');
}

function decommify(s) {
  return parseInt(s.replace(',',''));
}

function isort(a, b) {
  a = a.toUpperCase();
  b = b.toUpperCase();
  if (a > b) return 1;
  if (a < b) return -1;
  return 0;
}

function intsort(a, b) {
  if (isNaN(a) || isNaN(b)) return false;
  if (a > b) return 1;
  if (a < b) return -1;
  return 0;
}

function updateScript(e) {
  if (unsafeWindow.sessionStorage) {
    unsafeWindow.sessionStorage.usoFavourites = favs.toSource();
    alert('Your current favourites will be kept when you update this script.');
  }
  else {
    prompt('The browser you\'re using doesn\'t support DOM Storage (implemented in Firefox 2, not supported by Opera 9.5 or WebKit). If you update this script you\'ll lose the favourites saved unless you follow the instructions below.\n\n- Copy all the text in the box below to the clipboard.\n- Open up a new tab and type in about:config in the location bar.\n- In the filter box type "favourites".\n- Close this box and reload the page. Evidently you\'ll need to remember the next steps or copy this text elsewhere.\n- Go back to your about:config tab and double-click the line containing "Favourite User Scripts.favourites".\n- Paste in the stuff you copied to the clipboard.', favs.toSource());
  }
}

function xpath(expr, s) {
  if (s) typ = XPathResult.FIRST_ORDERED_NODE_TYPE;
  else typ = XPathResult.ANY_TYPE;
  return document.evaluate(expr, document ,null, typ, null);
}

function hasClass(el, c) {
  var hasC = false;
  if (!el || !el.className.length) return;
  var bits = el.className.split(' ');
  for (var j = 0; j < bits.length; j++) {
  	if (bits[j] === c) hasC = true;
  }
  return hasC;
}

function addClass(el, c) {
  if (!el || hasClass(el, c)) return;
  if (el.className.length) el.className += ' '+c;
  else el.className = c;
}

function removeClass(el, c) {
  if (!el || !el.className.length) return;
  el.className = el.className.replace(c, '');
}

function addStyle() {
  GM_addStyle('\
    #header li {position:relative}                                  \
    #header li.s {                                                  \
      margin-left:1em;                                              \
      left:1px;                                                     \
    }                                                               \
    #header li.s > a {                                              \
      position:relative;                                            \
      left:0.5em;                                                   \
      top:-0.2em;                                                   \
      float:left;                                                   \
      border:1px solid #666;                                        \
      border-bottom-color:#CA7005;                                  \
      background:#CA7005;                                           \
      padding:0.2em 0.5em;                                          \
      margin:-1px 0 -1em -2px;                                      \
      z-index:2;                                                    \
                                                                    \
    }                                                               \
    a.fav_alt {                                                     \
      background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKKSURBVDjLpZNdSBRRGIbnzOzubSxBRReBYhTRDziQQlKxbmoKItp0YVRUsBB2UVQsWdkfilHaj6GuZqEkhJaSf6knISqUYIgooogWS2uRwjFd25yZ3Xn7NlKS3bzp4jDMzHne73zPfCMAEP5nzbux6gU5UifwsE+AWSMos89DVczz4xpD8ArjkxUsMW4AwZ7InSWwetJh8Vzo1YzPviNYjfTmQL8rY+KSqI1fFJWYAKrsjjSvgPV4F/DsAGbqFyF0nSVOX2Xu0M3lwKMdCHdlgGDtW5kox23BqGFes2UdBeyD2ZYKgn1Tlcynt6YAPB/TDUkg2PNPB9H1s4pxozWZTlIIgjX9XipVL0CoaW0U9sVINGsF2ahm8l/9OkmWZg3shNWXC/TnwnzgwtdSUR27IDpn942cluSPxZIsRGXpt5eCTINg7Y9pNdy1DejbDjzMhNm+BQSrgXMS/1wi+UdOSQiUOeH32rgwc4PxSH8eMFSECC+A2Z0Ns5PAgXygNxPoTqdrFoz2dMy0bKLTuCk0B6HmjXh3hALINCdZCFYyTFaIKn0mTqa50baZNmZQgAvG/TSMlkjqp5MSHz4h+T8ct+HtYRteFdl5jMTxctFJsjSrLw/hDtfvEL01DQSrBDsXnMToIphPN66H0ZGJL2ckf7ApGejJglazCu+P2XwLBpDp8smG1dS/gonalSDTHjLtm7q1AehyIXA5AS8P2r1xAwhWvtcm0Bjn08Rlg0xrBDvJtHukdBnQuRU6SXxzdDGG9jpiJ3HsvKgEzkpasDEZE3VrMFwszVV6fciuTjWmYLQ8CYN7HNrTQocStwUynUiyWkgWJ9Nzf90Lj115vt/BB3c7vE8KHfNE/gKM7aCNx0eNYwAAAABJRU5ErkJggg==");                        \
    }                                                               \
    #favourites {                                                   \
      position:absolute;                                            \
      width: 45em;                                                  \
      border:1px solid #666666;                                     \
      background:#CA7005;                                           \
      left:-20em;                                                   \
      top:1.7em;                                                    \
      padding:2.2em 0.4em 0.4em 0.4em;                              \
      margin-top:-1px;                                              \
    }                                                               \
    #favourites ol {                                                \
      padding:0;                                                    \
      margin-left:0.5em;                                            \
    }                                                               \
    #favourites ol > li {                                           \
      padding:0.25em 0;                                             \
      font-size:1em;                                                \
      width:97%;                                                    \
    }                                                               \
    #favourites ol > li > a {                                       \
      margin-right:1em;                                             \
      text-decoration:none;                                         \
      float:none;                                                   \
      display:inline;                                               \
    }                                                               \
    #favourites a.author {                                          \
      font-style:italic;                                            \
    }                                                               \
    #favourites a.newcomments::after {                              \
      content:"»";                                                  \
      color:gold;                                                   \
      padding-left:0.4em;                                           \
      font-style:normal;                                            \
    }                                                               \
    #favourites ol > li > p {                                       \
      color:#AAA;                                                   \
      margin:0.25em 0 0 0.8em;                                      \
      font-size:0.8em;                                              \
      white-space:nowrap;                                           \
      display:-moz-inline-stack;                                    \
      display:inline-block;                                         \
    }                                                               \
    #favourites ol > li p:first-letter {                            \
      color:#DDD;                                                   \
      font-weight:bold !important;                                  \
    }                                                               \
    #favourites ol > li a:last-child {                              \
      position:absolute;                                            \
      right:0;                                                      \
      top:0.1em;                                                    \
      visibility:hidden;                                            \
    }                                                               \
    #favourites ol > li:hover a:last-child {                        \
      visibility:visible;                                           \
      color:#EEE;                                                   \
    }                                                               \
    #favourites ol a:not(:last-child):hover {                       \
      text-decoration:underline;                                    \
    }                                                               \
    #favourites.h {display:none}                                    \
    #favourites > p {                                               \
      position:absolute;                                            \
      top:0;                                                        \
      right:0.8em;                                                  \
      font-size:0.9em;                                              \
      opacity:0.4;                                                  \
    }                                                               \
    #favourites > p:hover {                                         \
      opacity:1;                                                    \
    }                                                               \
    #favourites > p a {                                             \
      margin:0 0.5em;                                               \
      float:none !important;                                        \
      display:inline !important;                                    \
      text-decoration:none !important;                              \
    }                                                               \
    #favourites > p a:hover {text-decoration:underline !important}  \
    #favourites > p a.sorting {                                     \
      padding-right:13px;                                           \
      background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABZ0RVh0Q3JlYXRpb24gVGltZQAxMS8xNi8wN/JvD4UAAAAfdEVYdFNvZnR3YXJlAE1hY3JvbWVkaWEgRmlyZXdvcmtzIDi1aNJ4AAAAc0lEQVQY01WKwQ6CMBAF61EP/LF+CPxa263JKrslIgZDA4c+CwkkHuYyM6aLXUtEoPCPJ4/Snmb8jFXUCOvtEZ13UNE8vIfKALgs81JLK7DObpGZc0qpLu28DhvTd7rxgxHuIfev/rr7Y9Cop0IjKs3uVn7UCYZuj93XnAAAAABJRU5ErkJggg==") right center no-repeat; \
    }                                                               \
    #favourites > p a.sorting.rev {                                 \
      background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABZ0RVh0Q3JlYXRpb24gVGltZQAxMS8xNi8wN/JvD4UAAAAfdEVYdFNvZnR3YXJlAE1hY3JvbWVkaWEgRmlyZXdvcmtzIDi1aNJ4AAAAb0lEQVQY002MzQqDMBCEc/Vi31jfQ3y0JJvC2u5G6g8Wg7lMUWjw8MEw3zAGgPkjKr1G7e5dCdNnasMzgAfG/t2b+6BKKfXMDOcdrLOQtyAf+XyqzDIvDxW9JAW6sN4iasS2brUZ4/jy5IssEOF0PyYwhrRO3/NFAAAAAElFTkSuQmCC"); \
    }'
  );
}