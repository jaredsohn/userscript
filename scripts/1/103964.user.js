// ==UserScript==
// @name            Apple Trailer Download HD
// @namespace       http://www.brainassassin.com/
// @author          JC2k8
// @description     Download the movie trailers from apple. Useful, if you don't like Quicktime/iTunes.
// @include         http://trailers.apple.com/trailers/*/*
// @exclude         http://trailers.apple.com/trailers/*/*/gallery/*
// @version         1.2.0
// @require         http://userscripts.org/scripts/source/87345.user.js
// @require         http://userscripts.org/scripts/source/98574.user.js
// @require         http://sizzlemctwizzle.com/updater.php?id=103964&days=7
// @noframes
// ==/UserScript==

(function() {
  /**
   * This is where we start. Inject styles and start getting the links.
   * Will run automatically after the load event has fired.
   */
  function runScript() {
    var css = '#atdContainer {background-image:-moz-linear-gradient(right center, #B5B5B5, #7D7D7D); border:2px solid white; border-radius:5px; bottom:5px; box-shadow:0 -1px 8px rgba(0, 0, 0, 0.75); color:#333; display:table; font-family:Arial,sans-serif; height:35px; max-width:200px; min-width:120px; opacity:.9; padding:0 5px; position:fixed; right:5px; text-align:left; z-index:900;} ' +
              '#atdHeader { background-image: -moz-linear-gradient(right center , rgba(120, 120, 120, 0.55), rgba(75, 75, 75, 0.75)); border-top-left-radius: 5px; border-top-right-radius: 5px; box-shadow:-1px -1px 2px black inset; margin: 0 -5px; padding: 2px 3px 5px; text-align: center; } ' +
              '#atdHeaderLink { color: #FFFFFF; cursor:pointer; font: small-caps bold 0.9em/1.1em verdana,arial,sans-serif; text-shadow: 1px 0 rgba(0, 0, 0, 0.9); } ' +
              '#atdContainer li {display: list-item; font-size:1em; line-height:1.4em; padding-left:17px; background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAABl0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuODc7gF0AAAGgSURBVDhPhZM7SwNBEMddc/EJooVgJzYWEcFKRFCwEJtgIX6Ha+y0tbaSkMs7IYQQkiYISaGSQjvFBzZ+ABFBfFRpBOWQ+JuQC3e58/Jrlpnd+c/s7Kwa6CGTyShd11uWG3vWNM1JpVRT07QQe+e2vfHeeIedTqeHU6nUxiWcQiKRmEdQk0OsAUnmCBCH5ZQDBITuoQXXEIvFJsTfEZjuCtiVksmkMgxjPRKJLBaLxf1feAUqWUZASVWemUWVjKpSqeg3Hc7gER7gDhqNxgnBq4is2bOPYAQluFarHX6BlCzQPNNui+8WOLvgqAJFuXvgDaxgr1XEqtXqLteRpEPdBuJQpVJpSjL6CUhD6U/76Vx9KJfLoX4CVxCNRtvP5xCQCuh4+Bv8KviAbDa75Tk89OHgBfwEZO8ZEJlzicTj8fAF9BN4B2sauyI4BqlghvVIhuY/ERmqer1+zDO6+yBqTGGQQTI+4QeeQAapCWLLOBM8Zb2C6yU6ImO5XG67UCjs0Fydq+3l8/kV7CXsTZkZm0BA3nNUJtH3W3p8eetH/gFubA10E1qWsgAAAABJRU5ErkJggg==") no-repeat scroll -2px 1px transparent;} ' +
              '#atdContainer li > a {color:#333333; font-weight:normal; font-size:0.9em; text-decoration:none;} ' +
              '#atd480p, #atd720p, #atd1080p, #atdLoader {box-shadow:-1px -1px 3px #000000 inset;} ' +
              '#atd1080p {padding-bottom:4px; } ' +
              '#atdContainer > div:not(.toggle) {margin:0 -5px; padding:3px 5px;} ' +
              '#atdContainer .toggle {border: thin solid black; box-shadow: 0px -1px 3px rgba(255, 255, 255, 0.25) inset; color: white; font-size: 1em; font-weight: bold; margin: 0 -5px; padding: 0 5px 0 0; text-align: right;} ' +
              '#atdContainer .toggle:hover {margin: 0 -6px; box-shadow:0 2px 5px rgba(0, 0, 0, 0.75);} ' +
              '#atdContainer .toggle:last-of-type {margin-bottom:1px;} ' +
              '#atdContainer > div:not(#atdError) {cursor:pointer;} ' +
              '#atdLoader {background:url("data:image/gif;base64,R0lGODlhKwALAPEAAP///wAAAIKCggAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAKwALAAACMoSOCMuW2diD88UKG95W88uF4DaGWFmhZid93pq+pwxnLUnXh8ou+sSz+T64oCAyTBUAACH5BAkKAAAALAAAAAArAAsAAAI9xI4IyyAPYWOxmoTHrHzzmGHe94xkmJifyqFKQ0pwLLgHa82xrekkDrIBZRQab1jyfY7KTtPimixiUsevAAAh+QQJCgAAACwAAAAAKwALAAACPYSOCMswD2FjqZpqW9xv4g8KE7d54XmMpNSgqLoOpgvC60xjNonnyc7p+VKamKw1zDCMR8rp8pksYlKorgAAIfkECQoAAAAsAAAAACsACwAAAkCEjgjLltnYmJS6Bxt+sfq5ZUyoNJ9HHlEqdCfFrqn7DrE2m7Wdj/2y45FkQ13t5itKdshFExC8YCLOEBX6AhQAADsAAAAAAAAAAAA=") center 15px no-repeat;} ' +
              '#atdLoaderText {font-size:0.9em; margin:0; padding:30px 0 5px; text-align:center;} ' +
              '#atdError {background-image:-moz-linear-gradient(center top, rgba(255, 0, 0, 0.2), rgba(255, 0, 0, 0.6)); color:black;} ' +
              '.roundBottomCorners {border-bottom-left-radius:5px; border-bottom-right-radius:5px;} ' +
              '.hidden {display:none;}';
    if ($('#trailers > h2')) {
      css += getTrailerListingColor();
    } else {
      bErr = true;
    }
    addNewStyle(css);
    // add header
    atdcontainer.appendChild(createAtdHeader());

    // Show loading animation until fetching necessary data has finished.
    atdcontainer.appendChild(createLoader());
    document.body.insertBefore(atdcontainer, document.body.firstChild);
    intervID = setInterval(getDownloadLink, 250);  // let's scan for links
  }

  /**
   * Adds the trailer links to the respective array.
   * @param {String} movie_url The trailer's URI
   */
  function insertDownloadLink(url) {
    var res = url.replace(/.+_h?([0-9]+p?).*/, '$1');
    if (res == '480p') {
      arr480.push(createElem('a', {'textContent':getCaption(url), 'href':url, 'title':'Download ' + res}));
    } else if (res == '720p') {
      arr720.push(createElem('a', {'textContent':getCaption(url), 'href':url, 'title':'Download ' + res}));
    } else if (res == '1080p') {
      arr1080.push(createElem('a', {'textContent':getCaption(url), 'href':url, 'title':'Download ' + res}));
    }
  }

  /**
   * Scan the page for HD quicktime movies. Get all <a> tags with specific
   * classes in the #trailers container.
   */
  function getDownloadLink() {
    var src_url = "";

    // get all the HD links from the trailer page
    var nobjects = Array.filter($('#trailers').getElementsByClassName('target-quicktimeplayer'), function(elem) {
      // we're only interested in links without target attribute
      return elem.nodeName === 'A' && !elem.hasAttribute('target');
    });
    if (nobjects.length > 0) {
      clearInterval(intervID);
      if (bErr) {
        // something happened earlier on so we couldn't retrieve data for adaptive coloring - let's try again.
        // if we still can't retrieve the color value a fallback color will be supplied by the function.
        addNewStyle(getTrailerListingColor());
      }
      for (var j=0; j < nobjects.length; j++) {
        src_url = nobjects[j].getAttribute('href');
        sources[j] = src_url;
        insertDownloadLink(src_url);
      }
      fillAdtContainer();
    } else {
      tryCount++;
      if (tryCount > 8) { // that's 2 seconds
        clearInterval(intervID);
        // So this is the end my friend ...
        var omg = createElem('div', {'id':'atdError', 'textContent':ERROR_MSG, 'className':'roundBottomCorners'});
        omg.appendChild(createElem('strong', {'textContent':ERROR_MSG2}));
        atdcontainer.appendChild(omg);
        removeNode($('#atdLoader'));
      }
    }
  }

  /**
   * Determine the link's caption by looking for the H3 tag containing
   * the caption on the trailer page.
   */
  function getCaption(url) {
    if (hasClass($('#trailers'), 'single')) {
      // there's only one trailer available so let's make this quick
      return 'Trailer';
    }
    // Travel up the DOM until an element has the class "grid2col",
    // then look for the H3 tag containing the title.
    var regex = new RegExp('(.*_h?)([0-9]+p\.mov)', 'i'),
        result = regex.exec(url),
        base = null;
    base = parentUntilClassIs($('a[href="' + result[1] + result[2] + '"]'), 'grid2col');
    return (base ? $('div.column.first > h3', base).textContent : 'Trailer');
  }

  /**
   * Fill the already prepared container with all the trailer listings and
   * the respective toggles.
   */
  function fillAdtContainer() {
    var cont = null,
        ul = null;
    for (var j = 0, arr = null, caption = ''; j < 3; j++) {
      if (j == 0) {
        arr = arr480;
        caption = '480p';
      } else if (j == 1) {
        arr = arr720;
        caption = '720p';
      } else {
        arr = arr1080;
        caption = '1080p';
      }

      cont = prepContainer('atd' + caption),
      ul = createElem('ul', {'className':'atdListing'});
      atdcontainer.appendChild(createToggle(caption))
      for (var i = 0, len = arr.length, li = null; i < len; i++) {
        li = createElem('li');
        li.appendChild(arr[i]);
        ul.appendChild(li);
      }
      cont.appendChild(ul);
      atdcontainer.appendChild(cont);
      if (atdcontainer.style.display != 'table') { atdcontainer.style.display = 'table'; }
    }
    removeNode($('#atdLoader'));
  }


  // Prototypes ---------------------------------
  /**
   * Determine whether a string starts with a certain string.
   */
  String.prototype.startsWith = function(str) { return (this.indexOf(str) === 0); }

  /**
   * Determine whether a string ends with a certain string.
   */
  String.prototype.endsWith = function(str) { return this.indexOf(str, this.length - str.length) !== -1; }


  // Helper functions ---------------------------
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
   * Create the side panel header. Create a P element and add an A element to
   * quickly access this script's preferences.
   * @returns {HtmlElement}
   */
  function createAtdHeader() {
    var atdHeader = createElem('p', {'id':'atdHeader'});
    var atdHeaderLink = createElem('a', {'id':'atdHeaderLink', 'textContent':'Apple Trailer Download'});
    atdHeaderLink.addEventListener('click', function() { devtools.config.open(); }, false);
    atdHeader.appendChild(atdHeaderLink);
    return atdHeader;
  }

  /**
   * Create and return the busy animation container. Processing all the
   * links can take a while if there are a lot of trailers.
   * @returns {HtmlElement}
   */
  function createLoader() {
    var ldr = createElem('div', {'id':'atdLoader', 'className':'roundBottomCorners'});
    ldr.appendChild(createElem('p', {'id':'atdLoaderText', 'textContent':'Gathering ...'}));
    return ldr;
  }

  /**
   * Create a DIV element which will serve as a toggle as well as
   * an indicator for the three sections (480p, 720p, 1080p).
   * Also adds an event listener (click) to the DIV element to control
   * the toggling.
   */
  function createToggle(caption) {
    var div = createElem('div', {'id':'atdTgl' + caption, 'textContent':caption, 'className':'toggle', 'title':caption + ' trailers'});
    if (caption == '1080p' && devtools.config.get('defaultSize') != '1080p') { addClass(div, 'roundBottomCorners'); }
    div.addEventListener('click', toggleVisibility, false);
    return div;
  }

  /**
   * Prepare a container (DIV element) for the trailer listings (UL).
   * @param {String} newId The id of the container element
   * @returns {HtmlElement} The created DIV element
   */
  function prepContainer(newId) {
    var elem = createElem('div', {'id':newId});
    if (!newId.endsWith(devtools.config.get('defaultSize'))) { elem.className = 'hidden'; }
    if (newId.endsWith('1080p')) { addClass(elem, 'roundBottomCorners'); }
    return elem;
  }

  /**
   * Return the final computed value of an element's CSS property.
   * @param {HtmlElement} elem The element
   * @param {String} prop The property
   * @returns {String} The final computed value
   */
  function getCssProp(elem, prop) { return window.getComputedStyle(elem, null).getPropertyValue(prop); }

  /**
   * Return an element matching the specified selector.
   * @param {String} selector The selector
   * @param {Node} root Start looking here
   * @returns {HtmlElement|null} Search result
   */
  function $(selector, root) {
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
   * Removes a node from the DOM.
   * @param {HTMLElement} nod The node to remove
   */
  function removeNode(nod) { if (nod) { nod.parentNode.removeChild(nod); } }

  /**
   * Add a class to the className attribute.
   * @param {HtmlElement} elem The element to check
   * @param {String} cls The class to add
   */
  function addClass(elem, cls) {
    if (elem.nodeType === 1) {
      if (!elem.className) {
        elem.className = cls;
      } else {
        if (!hasClass(elem, cls)) { elem.className += " " + cls; }
      }
    }
  }

  /**
   * Remove a class from the className attribute. If it is the last attribute or
   * if cls isn't specified, the class attribute will be removed.
   * @param {HtmlElement} elem The element to change
   * @param {String} cls The class to remove
   */
  function remClass(elem, cls) {
    if (elem.nodeType === 1) {
      if (cls) {
        if (elem.className === cls) {
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
   * Determine whether a className attribute has a specific class attached.
   * @param {HtmlElement} elem The element to check
   * @param {String} cls The class to look for
   * @returns {Boolean} Does the element have the class?
   */
  function hasClass(elem, cls) {
    if (!elem.className) return false;
    var cn = ' ' + elem.className + ' ';
    return cn.indexOf(' ' + cls + ' ') > -1;
  }

  /**
   * Event listener for showing/hiding the respective trailer listings.
   * In case of the 1080p section, create rounded bottom borders if closed.
   * @param {Event} e The event
   */
  function toggleVisibility(e) {
    var elem = e.target,
        toggleElem = $('#' + elem.id + ' + div');

    if (!hasClass(toggleElem, 'hidden')) {
      addClass(toggleElem, 'hidden');
      if (elem.id.endsWith('1080p')) { addClass(elem, 'roundBottomCorners'); }
    } else {
      remClass(toggleElem, 'hidden');
      if (elem.id.endsWith('1080p')) { remClass(elem, 'roundBottomCorners'); }
    }
  }

  /**
   * Adds a new CSS ruleset to the page. Uses GM_addStyle API; fallback in place.
   * @param {String} style Contains the CSS rules to add to the page
   */
  function addNewStyle(newStyle) {
    if (typeof GM_addStyle !== 'undefined') {
      GM_addStyle(newStyle);
    } else {
      var heads = document.getElementsByTagName('head');
      if (heads.length > 0) {
        var node = document.createElement('style');
        node.type = 'text/css';
        node.appendChild(document.createTextNode(newStyle));
        heads[0].appendChild(node);
      }
    }
  }

  /**
   * Travel up the DOM until the parent has the specified class and return the node.
   * @param {HtmlElement} elm The starting element
   * @param {String} cls The targeted parent has this class
   * @returns {HtmlElement} The targeted parent element
   */
  function parentUntilClassIs(elm, cls) {
    var p = elm;
    while (p.parentNode) {
      p = p.parentNode;
      if (hasClass(p, cls)) {
        break;
      }
    }
    return p;
  }

  /**
   * Determine whether n is a number or not.
   * @param {String|Number} n The string/number to check
   * @returns {Boolean} n can be interpreted as number
   */
  function isNumber(n) { return !isNaN(parseFloat(n)) && isFinite(n); }

  /**
   * Return the color used in Apple's trailer listing. If that's not
   * possible, assume Apple's default blue color scheme.
   * @returns {String} A CSS rule containing the trailer listing color
   */
  function getTrailerListingColor() {
    var heading = $('#trailers > h2'), cssProp;
    if (heading) { cssProp = getCssProp(heading, 'background-color'); }
    if (!cssProp) { cssProp = 'rgb(2, 131, 224)'; }
    return '#atdContainer > div.toggle {background:-moz-linear-gradient(left bottom, ' + cssProp + ' 5%, rgba(0,0,0,.75) 85%) repeat scroll 0 0 transparent;';
  }

  // Scriptish users don't need this line because of @noframes
  if (unsafeWindow.top !== unsafeWindow.self) { return; }

  // CONSTANTS ----------------------------------
  var ERROR_MSG  = 'If reloading the page doesn\'t work and you have eliminated the impossible, whatever remains, however improbable, must be the truth: ';
  var ERROR_MSG2 = 'I could be broken!';

  // VARIABLES ----------------------------------
  var arr480 = [],
      arr720 = [],
      arr1080 = [],
      sources = [],
      atdcontainer = createElem('div', {'id':'atdContainer'}),
      intervID = 0;
      tryCount = 0;
      bErr = false;

  // Config ---------------------------------------------------------
  var sizes = { 'Small (480p)':'480p', 'Normal (720p)':'720p', 'Large (1080p)':'1080p' };
  devtools.config.init({
    title: 'Apple Trailer Download HD',
    settings: {
      'defaultSize': { type: 'select', label: 'Default trailer size (open panel)', defaultValue: sizes['Small (480p)'], options: sizes },
    },
    // style the preferences menu
    css: '#devtools-wrapper .dialog { border:thin solid black; border-radius: 5px !important; box-shadow:5px 5px 15px #000000 !important; width: 280px !important; padding:0 !important;} ' +
         '#devtools-wrapper .dialog input[type="checkbox"]{margin-bottom:10px !important;} ' +
         '#devtools-wrapper .dialog .dialog-title { border-radius:5px 5px 0 0 !important;} ' +
         '#devtools-wrapper .dialog .dialog-close {border:0 none !important; border-radius:0 5px 0 0 !important;} ' +
         '#devtools-wrapper .dialog .dialog-footer button {border-radius: 0 0 5px 5px !important;} ' +
         '#devtools-wrapper .dialog input[type="checkbox"] {margin-bottom:5px !important; margin-right:5px !important;} ' +
         '#devtools-wrapper .dialog .dialog-content {border-top: thin solid black !important; padding:15px 10px !important; margin:0 !important;} ' +
         '#devtools-wrapper .dialog .dialog-title span {font-family:Verdana,Arial,sans-serif !important; font-size:13px !important;} ' +
         '#devtools-wrapper .dialog .dialog-footer {padding:5px 0 !important;} ' +
         '#devtools-wrapper .dialog .dialog-footer button:last-of-type {border-radius:0 7px 7px 0 !important;} ' +
         '#devtools-wrapper .dialog .dialog-footer button:first-of-type {border-radius:7px 0 0 7px !important;} ' +
         '#devtools-wrapper.mask {background-color:rgba(0, 0, 0, 0.6) !important;}'
  });
  // register menu command to access preferences
  GM_registerMenuCommand('Apple Trailer Download HD Preferences...', function() { devtools.config.open(); });

  // wait for the document to be fully loaded
  window.addEventListener("load", function() { runScript(); }, false);
})();