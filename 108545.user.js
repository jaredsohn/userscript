// ==UserScript==
// @id              usomenu@http://www.brainassassin.com/
// @name            usoMenu
// @namespace       http://www.brainassassin.com/
// @author          JC2k8 <janus.rulez@gmx.net> http://userscripts.org/users/JC2k8
// @description     Adds navigation menu shortcuts to the login status bar and tweaks the general appearance.
// @match           *://userscripts.org/*
// @domain          userscripts.org
// @license         GPLv3 (http://www.gnu.org/licenses/gpl-3.0.txt)
// @version         1.23
// ==/UserScript==

(function() {
  /**
   * Adds a new style to the page. Uses GM_addStyle with
   * a fallback for enhanced compatibility.
   * @param {String} newStyle A set of CSS rules
   */
  function addNewStyle(newStyle) {
    if (typeof GM_addStyle != 'undefined') {
      GM_addStyle(newStyle);
    } else {
      var heads = document.getElementsByTagName('head');
      if (heads.length > 0) {
        var node = createElem('style', {'type':'text/css'});
        node.appendChild(document.createTextNode(newStyle));
        heads[0].appendChild(node);
      }
    }
  }

  /**
   * Returns a single element matching the specified selector.
   * @param {String} selector A CSS selector or an id
   * @param {Node} root An element on which to start the search
   * @returns {Node} The first matching element
   */
  function $(selector, root) {
    var r = null;
    root = root || document;
    if (/(?:^#)(?!(?:[\w]+)?[ \.\+\[~>#])/.test(selector)) {
      r = root.getElementById(selector.substr(1).trim());
    } else {
      r = root.querySelector(selector);
    }
    return r;
  }

  /**
   * Determines whether a class attribute has a specific CSS rule attached.
   * @param {HtmlElement} elem The element to check
   * @param {String} cls The class to look for
   */
  function hasClass(elem, cls) {
    if (!elem.className) return false;
    var cn = ' ' + elem.className.trim() + ' ';
    return cn.indexOf(' ' + cls + ' ') > -1;
  }

  /**
   * Inserts a link into the top-right userscripts.org navigation menu
   * @param {Node} elem Search will be inserted after elem
   */
  function insertSearchLink(elem) {
    var li = createElem('li', {'id':'awesomeSearch'});
    li.appendChild(createElem('a', {'href':'/search', 'textContent':'Search'}));
    elem.parentNode.insertBefore(li, elem);
  }

  /**
   * Creates an element with the properties speciefied in attrs.
   * @param {String} elem The element to create
   * @param {Object} attrs Object containing the elements properties
   * @returns {HtmlElement} The created element
   */
  function createElem(elem, attrs) {
    var elm = null;
    if ('string' == typeof elem) {
      elm = document.createElement(elem);
    }
    if (attrs) {
      for (var p in attrs) {
        if (attrs.hasOwnProperty(p)) {
          if (p === 'textContent') {
            elm.appendChild(document.createTextNode(attrs[p]));
          } else {
            elm.setAttribute(p, attrs[p]);
          }
        }
      }
    }
    return elm;
  }

  /**
   * Checks if a value can be interpreted as number.
   * @param {String|Number} n The value to check
   * @returns {Boolean}
   */
  function isNumber(n) { return !isNaN(parseFloat(n)) && isFinite(n); }

  /**
   * Builds the menu. If the items aren't available via GM_getValue, get them via XSS.
   */
  function buildMenu(force) {
    var uri  = window.location.href;
    var menu = GM_getValue('menu', null);
    var date = GM_getValue('lastStored', null);
    var day  = 86400000;
    force = force || false;

    if (date && menu && !force) {
      if (Date.now() - date >= day) {
        // refresh storage
        buildMenu(true);
      } else {
        addMenu();
      }
    } else {
      if (uri.search(/\/home\/?$/i) === -1) {
        getScriptMgmtPage(uri.substring(0, uri.length - window.location.pathname.length) + '/home/');
      } else {
        getMenuItems($('#content > .subnav'));
      }
    }
  }

  /**
   * Creates menu-items and adds them to the page.
   * @param {HtmlObject} obj The source object cotaining the possible menu items
   */
  function getMenuItems(obj) {
    var items = obj.querySelectorAll('a:not([rel])');
    var menu  = [];

    for (var i = 0, l = menu.length = items.length; i < l; i++) {
      menu[i] = items[i].href;
    }
    GM_setValue('menu', JSON.stringify(menu));
    GM_setValue('lastStored', Date.now().toString());
    addMenu();
  }

  /**
   * Creates the menu and adds it to the page.
   */
  function addMenu() {
    var cont = $('#top .container');
    var menu = JSON.parse(GM_getValue('menu'));
    var ul   = createElem('ul', {'class':'usoMenuUL'});

    for (var i = 0, l = menu.length, cptn = '', li = null; i < l; i++) {
      cptn = menu[i].substring(menu[i].lastIndexOf('/') + 1);
      li = createElem('li', {'class':'usoMenuLI'});
      li.appendChild(createElem('a', {'class':'usoMenuLink', 'href':menu[i], 'textContent':cptn}));
      if (cptn !== 'scripts') {
        ul.appendChild(li);
      } else {
        // insert script management as the first element
        ul.insertBefore(li, ul.firstChild);
      }
    }
    cont.insertBefore(ul, cont.firstChild);
  }

  /**
   * Retrieves the script management page.
   * @param {String} url The requested URL
   */
  function getScriptMgmtPage(url) {
    GM_xmlhttpRequest({
      method: 'GET',
      url: url,
      headers: { 'Accept': 'text/html' },
      onreadystatechange: function (rsp) {
        if (rsp.status == 200) {
          var rspXML = null;
          if (!rsp.responseXML) {
            rspXML = new DOMParser().parseFromString(rsp.responseText, 'text/xml');
          }
          getMenuItems($('#content > .subnav', rspXML));
        }
        if (rsp.status == 404) {
          return null;
        }
      },
    });
  }

  /**
   * Adds styles to the current page.
   */
  function setStyles() {
    var uri = window.location.href;
    var css = '';

    // add global styles
    css = 'th a:visited {color:white;}' +
          '#top ul.login_status li:last-of-type {margin-right:0;}' +
          '#header h1 {margin:5px 0 0 6px; top:0; width:170px;}' +
          '#header h1 a {font-size:0; line-height:28px;}' +
          '#header #mainmenu li a {padding:3px 12px 6px;}' +
          // table specific
          'table tr:nth-child(2n+3) {background-color:rgba(200, 200, 200, 0.25);}' +
          'table tr:nth-child(2n+2) {background-color:#ffffff;}' +
          'table tr td.inv {background-color:transparent;}' +
          'table tr td.script-meat {border-left:thin solid #DDDDDD; padding-top:5px !important;}' +
          'td {padding-bottom:0 !important;}' +
          'th {border-color: #222222; border-style: solid; border-width: 1px 1px 0;}' +
          'td {padding:5px;} ' +
          'th:not(:first-child) {text-align:center;} ' +
          'td span.rating {margin:0 auto;}' +
           // manage scripts specific
           'body.home #main {padding-left:10px; width:760px;} ' +
           '#main > h1, #main > h1 + p {display:none;} ' +
           '#main table tr > th:nth-of-type(2) {width:70px;} ' +
           '#main table tr td.inv {text-align:center;} ' +
           // new classes
           '.usoMenuSPAN {color:black; float:left; font-size:0.9em; font-weight:bold; line-height:25px; padding:0 6px;}' +
           '.usoMenuLink {color:white !important; padding:5px; } ' +
           '.usoMenuLink:hover {text-decoration:none !important;}' +
           '.usoMenuLI {float:left; font-size:11px; font-weight:bold; margin:0; line-height:25px; text-shadow:1px 1px 1px rgba(160,80,10,.8);} ' +
           '.usoMenuUL {float:left; list-style:none outside none; margin:0; padding:0; height:24px;} ' +
           '.usoMenuUL .usoMenuLI:hover, .login_status li:hover {background-color:black; background-image:linear-gradient(to bottom , rgba(252,252,252,.65), black 60%); box-shadow:0px 1px 1px 1px rgba(255,255,255,.65) inset;}' +
           // changes default styles
           '#top {background:linear-gradient(to bottom, rgba(255, 255, 255, 0.5), #FF8800 3px) repeat scroll 0 0 #FF8800;}' +
           '#top ul.login_status li {font-size:11px; font-weight:bold; margin:0; line-height:25px; text-shadow:1px 1px 1px rgba(160, 80, 10, 0.8);}' +
           '#top ul.login_status li:hover a {text-decoration:none !important;}' +
           '#top ul.login_status li a {padding:5px 10px;}' +
           '#header {border-top:none;}' +
           '#header .container {background-color:black; border-radius:0 0 7px 7px;}' +
           '#header #mainmenu {bottom:4px; padding:0; margin-right:0 !important;}' +
           '#header #mainmenu li {background-clip: padding-box; background:linear-gradient(to bottom, rgba(0, 0, 0, 0.5), black 25%) no-repeat scroll 0 0 #EEEEEE; border-color:#333333; border-style:none solid solid; border-width:0 1px 1px;}' +
           '#header #mainmenu li.active {background-color: black; background-image: linear-gradient(to bottom, rgba(255, 136, 0, 0.6), black 25%); border-color: rgba(255, 136, 0, 0.4); box-shadow: 0 3px 1px 0 rgba(255, 136, 0, 0.9) inset;}' +
           '#header #mainmenu li.active a {color:white;}' +
           '#header #mainmenu li.active a:hover {color:#ff8800;}' +
           '#header #mainmenu li:not(.active):hover {background:-moz-linear-gradient(center top , #FF8800, black 25%) no-repeat scroll 0 0 #EEEEEE;}' +
           '#header #mainmenu li a {font-weight:bold; padding:4px 12px;}' +
           '#header #mainmenu li a:hover {text-decoration:none !important;}' +
           '.usoMenuLink, #top ul.login_status li a {text-decoration:none;}';

    if (uri.search(/\/scripts\/new/i) !== -1) {
      css += '#header + .container {margin-top:10px;}';
    }
    addNewStyle(css);
  }

  /**
   * Tweaks the elements created by the Userscripts.org Better Search userscript.
   * Makes the bar smaller on the main page and moves the search field to the extreme
   * right.
   */
  function fixBetterSearch() {
    var css = '';
    var uri = window.location.href;
    var hWr = createElem('div', {'id':'headerWrap'});
    var div = createElem('div', {'id':'headerContainer'});

    css = '#headerWrap {background-color:' + ($('#section') ? '#eeeeee' : 'white') + ';}';
    if ($('#userscripts_better_search')) {
      // fix this awesome scripts appearance on the main page
      if (uri.search(/^https?\:\/\/userscripts\.org\/?$/i) !== -1) {
        css += '#section > .container {min-height:44px !important;} ' +
               '#section #section_search {top:0;} ' +
               '#section {margin-bottom:0;} ';
      } else if (uri.search(/\/scripts\/new/i) !== -1) {
        css += '#section > .container {min-height:44px !important;} ' +
               '#section #section_search {top:0;} ';
      } else if (uri.search(/\/home\/(?:scripts|widgets|settings)/i) !== -1) {
        css += '#section {margin-bottom:0;} ';
      }
      css += '#section #section_search .input {margin-right:0;}' +
             '#userscripts_better_search {right:20px !important;}' +
             '#section #section_search .go {margin-right:0; top:15px;}';
    } else {
      if (!$('#section_search')) {
        // if there's no search box add a search shortcut to the login status bar
        insertSearchLink($('.login_status > li:last-of-type', $('#top')));
      }
    }
    addNewStyle(css);
    div.appendChild($('#top'));
    div.appendChild($('#header'));
    hWr.appendChild(div);
    $('#root').insertBefore(hWr, $('#root').firstChild);
  }

  /**
   * Starts the script.
   */
  function Main() {
    if (hasClass($('body'), 'loggedin')) { buildMenu(); }
    setStyles();
    window.setTimeout(fixBetterSearch, 100);
  }

  Main();
})();