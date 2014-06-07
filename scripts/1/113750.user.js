// ==UserScript==
// @name           Page Positioning Buttons
// @author         Ziyu
// @namespace      http://userscripts.org/users/ziyu
// @description    Add links to go to top, bottom or a user specified position of each page.
// @include        *
// @grant          none
// ==/UserScript==

// "Forked" from http://userscripts.org/scripts/show/105473

(function (document, window) {
  'use strict';

  // USER VARIABLES

  var numberOfPositions = 3,  // Sets the number of recording positions
      bottomEdge = '40%',     // Sets the bottom edge position in % of the page height
      color = '#a8a8a8';

  // Extend object a with object b's properties.
  var extend = function (a, b) {
    for (var key in b) {
      if (b.hasOwnProperty(key)) {
        a[key] = b[key];
      }
    }
    return a;
  };

  var cssPropsCommon = {
    cursor : 'pointer',
    zIndex : '1000'
  };

  var cssPropsContainer = extend({
    borderTop   : '2px solid' + color,
    borderBottom: '2px solid' + color,
    width       : '24px',
    position    : 'fixed',
    right       : '10px',
    bottom      : bottomEdge
  }, cssPropsCommon);

  var cssPropsTopButton = extend({
    width       : '0',
    height      : '0',
    borderBottom: '12px solid' + color,
    borderLeft  : '12px solid transparent',
    borderRight : '12px solid transparent'
  }, cssPropsCommon);

  var cssPropsBtmButton = extend({
    transform : 'rotate(180deg)',
    marginTop : '4px'
  }, cssPropsTopButton);

  var cssPropsRecButton = extend({
    width       : '12px',
    height      : '12px',
    borderRadius: '50%',
    background  : color,
    marginLeft  : '6px',
    marginTop : '4px'
  }, cssPropsCommon);

  var cssPropsRwdButton = extend({
    width       : '0',
    height      : '0',
    borderRight : '12px solid' + color,
    borderTop   : '6px solid transparent',
    borderBottom: '6px solid transparent',
    marginLeft  : '5px',
    marginTop   : '4px'
  }, cssPropsCommon);

  // HELPER FUNCTIONS

  // pfx is a function that takes a standard CSS property name as a parameter
  // and returns it's prefixed version valid for current browser it runs in.
  // The code is heavily inspired by Modernizr http://www.modernizr.com/
  var pfx = (function () {

    var style = document.createElement('dummy').style,
    prefixes = 'Webkit Moz O ms Khtml'.split(' '),
    memory = {};

    return function ( prop ) {
      if ( typeof memory[ prop ] === "undefined" ) {

        var ucProp = prop.charAt(0).toUpperCase() + prop.substr(1),
        props = (prop + ' ' + prefixes.join(ucProp + ' ') + ucProp).split(' ');

        memory[ prop ] = null;
        for ( var i in props ) {
          if ( style[ props[i] ] !== undefined ) {
            memory[ prop ] = props[i];
            break;
          }
        }

      }

      return memory[ prop ];
    };

  })();

  // css function applies the styles given in `props` object to the element
  // given as `el`. It runs all property names through `pfx` function to make
  // sure proper prefixed version of the property is used.
  // If rm is set to true, it removes the properties from the element.
  var css = function ( el, props, rm ) {
    var key, pkey;
    for ( key in props ) {
      if ( props.hasOwnProperty(key) ) {
        pkey = pfx(key);
        if ( pkey !== null ) {
          el.style[pkey] = rm ? null : props[key];
        }
      }
    }
    return el;
  };

  // PAGE POSITIONING BUTTONS API

  var createPositionButton = function () {
    var position = 0,
        isset = 0,
        button = document.createElement('div');

    var setPosition = function (yOffset) {
      position = yOffset;
      isset = 1;

      return position;
    };

    var getPosition = function () {
      return position;
    };

    var rewind = function () {
      if(isset) {
        window.scrollTo(0, position);
      }
    };

    var record = function () {
      setPosition(window.pageYOffset);

      css(button, cssPropsRecButton, true);
      css(button, cssPropsRwdButton);
      button.removeEventListener('click', record, false);
      button.addEventListener('click', rewind, false);
    };

    css(button, cssPropsRecButton);
    button.addEventListener('click', record, false);

    return {
      button      : button,
      isset       : isset,
      getPosition : getPosition
    };
  };

  var buttons = function () {

    var intervalHandle = null,
        container = document.createElement('div'),
        positionButtonContainer = document.createElement('div');

    var pageGoToTop = function () {
      window.scrollTo(0, 0);
    };

    var pageGoToBottom = function () {
      window.scrollTo(0, 999999);
    };

    var pageScrollUp = function () {
      if (intervalHandle === null) {
        intervalHandle = setInterval(function(){window.scrollBy(0,-3);}, 60);
      }
    };

    var pageScrollDown = function () {
      if (intervalHandle === null) {
        intervalHandle = setInterval(function(){window.scrollBy(0,3);}, 60);
      }
    };

    var stopScroll = function () {
      clearInterval(intervalHandle);
      intervalHandle = null;
    };

    var addPos = function () {

      while (numberOfPositions--) {
        positionButtonContainer.appendChild(createPositionButton().button);
      }
    };

    var init = function () {

      var topButton = document.createElement('div'),
      btmButton = document.createElement('div');

      css(container, cssPropsContainer);
      css(topButton, cssPropsTopButton);
      css(btmButton, cssPropsBtmButton);

      topButton.addEventListener('click', pageGoToTop, false);
      topButton.addEventListener('mouseover', pageScrollUp, false);
      topButton.addEventListener('mouseout', stopScroll, false);

      btmButton.addEventListener('click', pageGoToBottom, false);
      btmButton.addEventListener('mouseover', pageScrollDown, false);
      btmButton.addEventListener('mouseout', stopScroll, false);

      container.appendChild(topButton);
      container.appendChild(positionButtonContainer);
      container.appendChild(btmButton);
      document.body.appendChild(container);

      addPos();
    };

    return {
      container : container,
      init      : init
    };
  };

  // START PAGE POSITIONING BUTTONS

  if (window.top == window.self) { // if not iframe

    var de = document.documentElement;
    if(de.scrollHeight > de.clientHeight && document.body) {
      buttons().init();
    }
  }

})(document, window);
