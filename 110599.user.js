// ==UserScript==
// @id              usosclinenumbers@http://www.brainassassin.com/
// @name            usoSCLineNumbers
// @namespace       http://www.brainassassin.com/
// @author          JC2k8 <janus.rulez@gmx.net> http://userscripts.org/users/JC2k8
// @description     Adds line numbers to all pre tags on userscripts.org. Compatible with "uso - Count Issues".
// @version         1.0
//
// @include         http://userscripts.org/*
// @include         https://userscripts.org/*
// @exclude         http://userscripts.org/scripts/diff/*
// @exclude         https://userscripts.org/scripts/diff/*
// ==/UserScript==

(function () {
  var remLineNumbers = false;

  /**
   * Add a CSS rule to the class attribute.
   * @param {HtmlElement} elem The element to check
   * @param {String} cls The class to add
   */
  function addClass (elem, cls) {
    if (elem.nodeType === 1) {
      if (!elem.className) {
        elem.className = cls;
      } else {
        if (!hasClass(elem, cls)) { elem.className += " " + cls; }
      }
    }
  }

  /**
   * Remove a CSS rule from the class attribute. If it is the last attribute or
   * if cls isn't specified, the class attribute will be removed.
   * @param {HtmlElement} elem The element to change
   * @param {String} cls The class to remove
   */
  function remClass (elem, cls) {
    if (elem.nodeType === 1) {
      if (cls) {
        if (elem.className == cls) {
          elem.removeAttribute('class');
        } else {
          if (hasClass(elem, cls)) {
            var cn = ' ' + elem.className + ' ';
            cn = cn.replace(' ' + cls + ' ','');
            elem.className = cn.trim();
          }
        }
      } else {
        elem.removeAttribute('class');
      }
    }
  }

  /**
   * Determine whether a class attribute has a specific CSS rule attached.
   * @param {HtmlElement} elem The element to check
   * @param {String} cls The class to look for
   * @returns {Boolean} Does the element have the class?
   */
  function hasClass (elem, cls) {
    if (!elem.className) return false;
    var cn = ' ' + elem.className + ' ';
    return cn.indexOf(' ' + cls + ' ') > -1
  }

  /**
   * Determine whether a string starts with a certain string.
   * @param {String} str The string to look for
   */
  String.prototype.startsWith = function(str) { return (this.indexOf(str) === 0); }

  /**
   * Return an element matching the specified selector.
   * @param {String} selector The selector
   * @param {Node} root Start looking here
   * @returns {HtmlElement|null} Search result
   */
  function $ (selector, root) {
    var e = null;
    root = root || document;
    if (/^#(?!(?:[\w]+)?[ \.,\+\[~>#])/.test(selector)) {
      e = root.getElementById(selector.substring(1));
    } else {
      e = root.querySelector(selector);
    }
    return e;
  }

  /**
   * Adds a new CSS ruleset to the page. Uses GM_addStyle API; fallback in place.
   * @param {String} style Contains the CSS rules to add to the page
   */
  function addNewStyle (style) {
     if (typeof GM_addStyle !== 'undefined') {
      GM_addStyle(style);
    } else {
      var heads = document.getElementsByTagName('head'), node = null;
      if (heads.length > 0) {
        node = document.createElem('style', {'type':'text/css'});
        node.appendChild(document.createTextNode(style));
        heads[0].appendChild(node);
      }
    }
  }

  /**
   * Return the final computed value of an element's CSS property.
   * @param {HtmlElement} elem The element
   * @param {String} prop The property
   * @returns {String} The final computed value
   */
  function getCssProp (elem, prop) { return window.getComputedStyle(elem, null).getPropertyValue(prop); }

  /**
   * Controls the visibility of the existing line numbers.
   * @param {EventObject} evt The event
   */
  function inlineDiffHandler (evt) {
    if (evt.target.parentNode.id === 'source') {
      var ln = $('#usoSCLN0');
      if (ln) { ln.parentNode.removeChild(ln); }
      if (!remLineNumbers) {
        addLineNumbers();
      } else {
        remLineNumbers = false;
      }
    }
  }

  /**
   * Handles clicks on links on the inline versions listing (uso - Count Issues).
   * @param {Event} evt The event
   */
  function clickDiffHandler (evt) {
    var trgt = evt.target;
    if (trgt.nodeName === 'A') {
      remLineNumbers = /\/diff\//i.test(trgt.href);
    }
  }

  /**
   * Checks for "uso - Count Issues" script and adjusts for "beautify" and "deobfuscate" buttons
   */
  function checkUsoCount () {
    var uri = window.location.href;
    if (/scripts\/review/i.test(uri) && $('#left')) {
      // there's a very good chance "uso - Count Issues" is running with the option
      // 'Show inline Versions and Diffs on Source Code page' enabled.
      var pre    = $('#usoSCLN0'),
          source = $('#source');
      if (pre && source) {
        var spacer = createElem('div', {'class':'usoSCLN_spacer'});
        source.parentNode.insertBefore(pre, source);
        pre.parentNode.insertBefore(spacer, pre);
      }
      $('#left').addEventListener('click', clickDiffHandler, false);
      $('#source').addEventListener('DOMNodeInserted', inlineDiffHandler, false);
    }
  }

  /**
   * Creates a new element.
   * @param {String} elem The element to create
   * @param {Object} attrs The new element's attributes
   * @returns {HtmlElement} The created element
   */
  function createElem (elem, attrs) {
    var newElem = document.createElement(elem);
    for (var a in attrs) {
      if (a === 'textContent') {
        newElem.appendChild(document.createTextNode(attrs[a]));
      } else {
        newElem[a] = attrs[a];
      }
    }
    return newElem;
  }

  /**
   * Event handler. Applies or removes the highlighted style from an element.
   * @param {Event} evt Event object
   */
  function hiliteLink (evt) {
    var trgt = evt.target, act  = $('.usoSCLN > .usoSCLN_hilite');
    if (trgt.nodeName === 'A') {
      if (act) {
        // there's already a highlighted line number
        remClass(act, 'usoSCLN_hilite');
      }
      addClass(trgt.parentNode, 'usoSCLN_hilite');
    }
  }

  /**
   * Adds line numbers to all the pre elements on the page. The pre element
   * on the script source page also gets anchor tags for each line.
   */
  function addLineNumbers () {
    var pres     = document.getElementsByTagName('pre'),
        cont     = null,
        hNumber  = null,
        isSource = window.location.href.toLowerCase().indexOf('scripts/review/') !== -1;

    addNewStyle('.usoSCLN {-moz-user-select:none; background-color:#EEEEEE; border-right:0 none; float:left; margin:0 -2px 0 0; overflow:hidden; padding:5px 0; text-align:right;}' +
                '.usoSCLN a {color:black; text-decoration:none;}' +
                '.usoSCLN a:hover {text-decoration:underline;}' +
                'pre { background-color:#FAFAFA; border-color:#CCCCCC #CCCCCC #CCCCCC #DDDDDD; border-style:solid; border-width: 1px 1px 1px 3px; margin-top:0 !important; white-space:pre !important; }' +
                '#content pre#source {overflow:auto;}' +
                '.usoSCLN_spacer {height:5px;}' +
                '.usoSCLN_line {font-weight:normal; padding:0 5px;}' +
                '.usoSCLN_lineBold {font-weight:bold; padding:0 5px;}' +
                '.usoSCLN_hilite {background-image:-moz-linear-gradient(center bottom , #75A075 5%, rgba(0, 120, 0, 0.7), #75A075 95%); box-shadow:0 0 50px 25px rgba(0, 85, 0, 0.7);}' +
                '.usoSCLN_hilite > a {color:white;}');

    // loop thru all the pre tags starting from the end
    for (var i = pres.length - 1, numLines = 0; i >= 0; i--) {
      // determine the number of lines
      numLines = pres[i].textContent.match(/\n/g);
      numLines = (numLines ? numLines.length + 1 : 1);

      // create a pre element ...
      cont = createElem('pre', {'id':'usoSCLN' + i, 'className':'usoSCLN'});
      cont.style.height = getCssProp(pres[i], 'height');
      // ... and append divs containing the line numbers
      for (var j = 0, div = null; j < numLines; j++) {
        if (j == 0) {
          div = createElem('div', {'className':(numLines > 9 ? 'usoSCLN_lineBold' : 'usoSCLN_line')});
        } else {
          div = div.cloneNode(false);
          if ((j+1) % 10 !== 0) {
            div.className = 'usoSCLN_line';
          } else {
            div.className = (numLines > 9) ? 'usoSCLN_lineBold' : 'usoSCLN_line';
          }
        }
        if (isSource) {
          // anchors and highlighting only exist on the source code page
          // the anchors are compatible with "uso - Count Issues"
          hNumber = window.location.hash.match(/^#line-(\d+)$/);
          div.appendChild(createElem('a', {'id':'line-' + (j+1), 'href':'#line-' + (j+1),'textContent':j+1}));
          if (hNumber) {
            if (hNumber[1] === (j+1)) { addClass(div, 'usoSCLN_hilite'); }
          }
        } else {
          div.appendChild(document.createTextNode(j+1));
        }
        cont.appendChild(div);
      }
      pres[i].parentNode.insertBefore(cont, pres[i]);

      if (isSource) {
        // do some nice line number hilighting on the source page
        cont.addEventListener('click', hiliteLink, false);
        if (hNumber) { $(hNumber[0]).click(); }
      }
    }
  }

  addLineNumbers();
  window.setTimeout(checkUsoCount, 100);
}) ();