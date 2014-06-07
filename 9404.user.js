// ==UserScript==
// @name           Yahoo Fantasy Smack Tooltip
// @namespace      http://glenncarr.com/greasemonkey/yahoofantasy
// @description    Display smack text when hovering over smack image
// @include        *.fantasysports.yahoo.com*
// @author         (c) 2007 Glenn Carr <glenn at glenncarr dot com>
// $LastChangedRevision: 301 $
// $LastChangedDate: 2007-09-06 23:50:24 -0500 (Thu, 06 Sep 2007) $
// ==/UserScript==

/*
 * Most of the credit for this goes to Ryan Grove <ryan@wonko.com> and his excellent Jyte ClaimInfo script:
 *    http://userscripts.org/scripts/show/9216
 *
 * Updates:
 * 22-May-2007 - Added dropshadow image, working image
 * 25-May-2007 - Bail quietly on any exceptions during initialization
 * 06-Sep-2007 - Rename CSS class because of conflict with 'smack' class on football pages
 */

(function() {

var YAHOO, yua, yud, yue, yut;

String.prototype.trim = function () {
  return this.replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1");
}

String.prototype.stripTags = function() {
  return this.replace(/<\/?[^>]+>/gi,'');
}

var SmackTooltips = function () {
  // -- Private Variables ------------------------------------------------------
  var infoCache    = {},
      descTimeout  = null,
      WORKING_IMG_URL = "data:image/gif,GIF89a%0A%00%0A%00%91%03%00%CC%CC%CC%FFff%FF%00%00%FF%FF%FF!%FF%" +
"0BNETSCAPE2.0%03%01%00%00%00!%F9%04%05%00%00%03%00%2C%00%00%00%00%0A%00%0A%00%00%02%17%9C'r%06%80%1A%" +
"02s'%AE%3Bqk%9A%E2%C3%81%14Gz%D9Q%00%00!%F9%04%05%00%00%03%00%2C%01%00%00%00%08%00%03%00%00%02%0A%9C%" +
"136%22%83%03%00S%10%14%00!%F9%04%05%00%00%03%00%2C%00%00%00%00%06%00%06%00%00%02%0C%9C%070%11%A8%7C%A" +
"2%11%22%D2X%00%00!%F9%04%05%00%00%03%00%2C%00%00%01%00%03%00%08%00%00%02%0A%1C%608%13%C1%BE%96%10c%16" +
"%00!%F9%04%05%00%00%03%00%2C%00%00%04%00%06%00%06%00%00%02%0A%04%86c%C9%1C%E1%A0%10l%16%00!%F9%04%05%" +
"00%00%03%00%2C%01%00%07%00%08%00%03%00%00%02%0A%04%86%23b%13%A1Dz%A9%00%00!%F9%04%05%00%00%03%00%2C%0" +
"4%00%04%00%06%00%06%00%00%02%0C%9C'r%A8%BB%11%06%00%03Jz%0A%00!%F9%04%09%00%00%03%00%2C%07%00%01%00%0" +
"3%00%08%00%00%02%0A%94f%A3%1A1%BD%00%18r%14%00%3B";

  return {
    // -- Public Methods -------------------------------------------------------

    /**
     * Initializes the SmackTooltips module, injecting HTML and CSS into the page
     * and attaching event handlers. This method must be called AFTER the YUI
     * libs are loaded.
     */
    init: function () {
      this.inject();

      // Create custom events.
      this.onSmackReceived = new yut.CustomEvent('smackReceived', this);

      // Attach event handlers.
      var smackLinks = yud.getElementsByClassName( 'blast', 'a' );

      yue.addListener(smackLinks, 'mouseover', this.showDesc, this, true);
      yue.addListener(smackLinks, 'mouseout', this.hideDesc, this, true);

      this.onSmackReceived.subscribe(function (e, args) {
        this.refreshDesc(args[0]);
      }, this, true);
    },

    /**
     * Injects markup and CSS used for the tooltips.
     */
    inject: function () {
      GM_addStyle(
          '.gncSmackTip { font-size: 12px; text-align:left; float:left; margin:10px 0 0 10px !important; margin:10px 0 0 5px; background: url(http://us.i1.yimg.com/us.yimg.com/i/us/sp/fn/default/full/drop_shadow.gif) no-repeat bottom right; }' +
          '.gncSmackTip p:first-child { margin-top: 0; }' +
          '.gncSmackTip p:last-child { margin-bottom: 0; }' +
          '.gncSmackTip div.inner, .gncSmackTip div.loading { display:block; position:relative; background:#eeffff; border:1px solid #333333; margin:0px 4px 4px 0px; padding:4px }' +
          '.gncSmackTip div.loading { font-style: italic; color: #666666; font-size: 80% }'
      );

      var div = document.createElement( 'DIV' );
      div.id = 'smacktip';
      div.style.display = 'none';
      div.setAttribute( 'class', 'gncSmackTip' );
      div.style.zIndex = 99;
      document.body.appendChild( div );
    },

    /**
     * Downloads the team page at the specified URL and caches it for
     * future use.
     *
     * @param {String} team page url
     */
    getSmack: function (url) {
      if (infoCache.hasOwnProperty(url)) {
        this.onSmackReceived.fire(infoCache[url]);
        return;
      }

      GM_xmlhttpRequest({
        method: 'GET',
        url   : url,
        onload: function (response) {
          infoCache[url] = response.responseText;
          SmackTooltips.onSmackReceived.fire(response.responseText);
        }
      });
    },

    /**
     * Hides the smack tooltip.
     */
    hideDesc: function (e) {
      clearTimeout(descTimeout);
      yud.setStyle('smacktip', 'display', 'none');
    },

    /**
     * Loads the YUI Dom, Event, and Animation libraries and calls
     * SmackTooltips.init() when they're finished loading.
     */
    loadYUI: function () {
      var yuiDomEvent = document.createElement('script'),
          yuiAnim     = document.createElement('script');

      try {
        yuiDomEvent.src  = 'http://yui.yahooapis.com/2.2.2/build/yahoo-dom-event/yahoo-dom-event.js';
        yuiAnim.src      = 'http://yui.yahooapis.com/2.2.2/build/animation/animation-min.js';

        document.body.appendChild(yuiDomEvent);
        document.body.appendChild(yuiAnim);
      } catch ( e )
      { return; }

      var loadInterval = setInterval(function () {
        if (!unsafeWindow.YAHOO || !unsafeWindow.YAHOO.util.Anim) {
          return;
        }

        clearInterval(loadInterval);

        YAHOO = unsafeWindow.YAHOO;
        yut   = YAHOO.util;
        yua   = yut.Anim;
        yud   = yut.Dom;
        yue   = yut.Event;

        SmackTooltips.init();
      }, 50);
    },

    /**
     * Refreshes the smack tooltip when team info is received.
     *
     * @param {String} smackContent contents of the team page
     */
    refreshDesc: function (smackContent) {
      var smackTooltip = yud.get('smacktip'),
          match = smackContent.match( /id="smacktext"[^>]+\>([^<]+)\</i );

      if (!match) {
        smackTooltip.innerHTML = 'No description.';
      }
      else {
        var content = match[1].trim();
        smackTooltip.innerHTML = '<div class="inner">' + content + '</div>';
      }
    },

    /**
     * Shows the tooltip after a delay.
     */
    showDesc: function (e) {

      descTimeout = setTimeout(function () {
        var smackTooltip  = yud.get('smacktip'),
            smackLink  = yue.getTarget(e),
            anim       = new yua(smackTooltip, {opacity: {to: 1.0}}, 0.4, YAHOO.util.Easing.easeBoth);

        smackTooltip.innerHTML = '<div class="loading">Loading...<img align="absmiddle" src="' + WORKING_IMG_URL + '"/></div>';

        SmackTooltips.getSmack(smackLink.href);

        yud.setStyle(smackTooltip, 'opacity', 0.0);
        yud.setStyle(smackTooltip, 'display', 'block');

        yud.setXY(smackTooltip, [yud.getX(smackLink),
            yud.getY(smackLink) + smackLink.offsetHeight + 18]);

        anim.animate();
      }, 100);
    }
  };
}();

SmackTooltips.loadYUI();
})();