/**
 * ClaimInfo - Displays Jyte claim information in tooltips when mousing over
 *   relevant areas of a claim.
 *
 * Copyright (c) 2008 Ryan Grove <ryan@wonko.com>.
 * All rights reserved.
 *
 * @version 1.0.5 (2008-06-13)
 */

// ==UserScript==
// @name           ClaimInfo
// @namespace      http://jyte.com/
// @description    Displays Jyte claim descriptions in a tooltip when mousing over a claim.
// @include        http://jyte.com/*
// @exclude        http://jyte.com/claim/new*
// @require        http://yui.yahooapis.com/2.5.2/build/yahoo-dom-event/yahoo-dom-event.js
// @require        http://yui.yahooapis.com/2.5.2/build/animation/animation-min.js
// ==/UserScript==

var Y   = YAHOO,
    yut = Y.util,
    yud = yut.Dom,
    yue = yut.Event,
    yua = yut.Anim;

var ClaimInfo = function () {
  // -- Private Variables ------------------------------------------------------
  var descTimeout = null,
      infoCache   = {};
  
  return {
    // -- Public Methods -------------------------------------------------------

    /**
     * Initializes the ClaimInfo module, injecting HTML and CSS into the page
     * and attaching event handlers.
     */
    init: function () {
      this.inject();

      // Create custom events.
      this.onClaimInfoReceived = new yut.CustomEvent('claimInfoReceived', this);

      // Attach event handlers.
      var claimLinks = yud.getElementsByClassName('claim_title', 'a');

      yue.on(claimLinks, 'mouseover', this.showDesc, this, true);
      yue.on(claimLinks, 'mouseout', this.hideDesc, this, true);

      this.onClaimInfoReceived.subscribe(function (e, args) {
        this.refreshDesc(args[0]);
      }, this, true);
    },

    /**
     * Injects markup and CSS used for the tooltips.
     */
    inject: function () {
      GM_addStyle(
          '.claiminfo { background: #f9f7ff; border: 1px solid #cfbfff; font-size: 0.9em; overflow: hidden; padding: 4px; }' +
          '.claiminfo img { max-height: 125px; }' +
          '.claiminfo p { line-height: normal; margin: 1em 0 1em 0; }' +
          '.claiminfo p:first-child { margin-top: 0; }' +
          '.claiminfo p:last-child { margin-bottom: 0; }' +
          '.claiminfo p.loading { color: #afafaf; }'
      );

      var div = document.createElement('div');
      
      div.id            = 'claimdesc';
      div.className     = 'claiminfo';
      div.style.display = 'none';

      document.body.appendChild(div);
    },

    /**
     * Downloads the claim detail page at the specified URL and caches it for
     * future use.
     *
     * @param {String} url claim detail page url
     */
    getClaimInfo: function (url) {
      if (infoCache.hasOwnProperty(url)) {
        this.onClaimInfoReceived.fire(infoCache[url]);
        return;
      }

      GM_xmlhttpRequest({
        method: 'GET',
        url   : url,
        onload: function (response) {
          infoCache[url] = response.responseText;
          ClaimInfo.onClaimInfoReceived.fire(response.responseText);
        }
      });
    },

    /**
     * Hides the claim description tooltip.
     */
    hideDesc: function (e) {
      clearTimeout(descTimeout);
      yud.setStyle('claimdesc', 'display', 'none');
    },

    /**
     * Refreshes the claim description tooltip when claim info is received.
     *
     * @param {String} claimInfo contents of the claim's detail page
     */
    refreshDesc: function (claimInfo) {
      var claimDesc = yud.get('claimdesc'),
          match     = claimInfo.match(/<div id="supporting_material">([\s\S]*?)<div /i);

      if (!match) {
        claimDesc.innerHTML = 'No description.';
      } else {
        claimDesc.innerHTML = Y.lang.trim(match[1]) == '<p></p>' ? 'No description.' :
            Y.lang.trim(match[1]);
      }
    },

    /**
     * Shows the claim description tooltip after a 500ms delay.
     */
    showDesc: function (e) {
      descTimeout = setTimeout(function () {
        var claimDesc  = yud.get('claimdesc'),
            claimLink  = yue.getTarget(e),
            resultsBox = yud.get('results_box'),
            anim       = new yua(claimDesc, {opacity: {to: 1.0}}, 0.4,
                yut.Easing.easeBoth);

        claimDesc.innerHTML = '<p class="loading">Loading...</p>';

        ClaimInfo.getClaimInfo(claimLink.href);

        yud.setStyle(claimDesc, 'opacity', 0.0);
        yud.setStyle(claimDesc, 'display', 'block');
        yud.setStyle(claimDesc, 'width', claimLink.parentNode.offsetWidth + 'px');

        yud.setXY(claimDesc, [yud.getX(claimLink),
            yud.getY(claimLink) + claimLink.offsetHeight + 18]);

        anim.animate();
      }, 500);
    }
  };
}();

ClaimInfo.init();
