// ==UserScript==
// @name           IMDB Plot Summary Tooltip
// @author         castaban
// @namespace      castaban.com
// @description    Display a tooltip when mouse is hovered over the full plot summary link
// @include        http://*imdb*/title/*
// @require        http://yui.yahooapis.com/2.5.2/build/yahoo-dom-event/yahoo-dom-event.js
// @require        http://yui.yahooapis.com/2.5.2/build/animation/animation-min.js
// @version        0.2
// @date           Dec-14-2013
// @url            http://userscripts.org/scripts/show/49787
// ==/UserScript==


(function() {

var Y   = YAHOO,
    yut = Y.util,
    yud = yut.Dom,
    yue = yut.Event,
    yua = yut.Anim;

var PlayerNotes = function () {
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
     * Initializes the PlayerNotes module, injecting HTML and CSS into the page
     * and attaching event handlers. This method must be called AFTER the YUI
     * libs are loaded.
     */
    init: function () {
      this.inject();

      // Create custom events.
      this.onPlayerNotesReceived = new yut.CustomEvent('playerNoteReceived', this);

      // Attach event handlers.
      var noteImages = yud.getElementsBy(function(el) { return /.*imdb.*plotsummary/.test( el.href ); }, 'a');

      yue.addListener(noteImages, 'mouseover', this.showDesc, this, true);
      yue.addListener(noteImages, 'mouseout', this.hideDesc, this, true);

      this.onPlayerNotesReceived.subscribe(function (e, args) {
        this.refreshDesc(args[0]);
      }, this, true);
	  //GM_log('Init done');
    },

    /**
     * Injects markup and CSS used for the tooltips.
     */
    inject: function () {
      GM_addStyle(
          '.playernoteinfo { text-align:left; float:left; margin:10px 0 0 10px !important; margin:10px 0 0 5px; width:500px; background: url(http://us.i1.yimg.com/us.yimg.com/i/us/sp/fn/default/full/drop_shadow.gif) no-repeat bottom right; }' +
          '.playernoteinfo p { margin-top: 3px; }' +
          '.playernoteinfo p:first-child { margin-top: 0; }' +
          '.playernoteinfo p:last-child { margin-bottom: 0; }' +
          '.playernoteinfo div.inner, .playernoteinfo div.loading { display:block; position:relative; background:#ffffcc; border:1px solid #333333; margin:0px 4px 4px 0px; padding:4px }' +
          '.playernoteinfo div.inner table td { font-size: 12px; border-bottom: 1px solid #666666 }' +
          '.playernoteinfo div.inner table tr:last-child td { border-bottom-width: 0px }' +
          '.playernoteinfo div.inner table tr>td:last-child {display:none;}' +
          '.playernoteinfo div.loading { font-style: italic; color: #666666; font-size: 80% }'
      );

      var div = document.createElement( 'DIV' );
      div.id = 'playernotedesc';
      div.style.display = 'none';
      div.style.height = '0px';
      div.setAttribute( 'class', 'playernoteinfo' );
      div.style.zIndex = 99;
      document.body.appendChild( div );
    },

    /**
     * Downloads the player page at the specified URL and caches it for
     * future use.
     *
     * @param {String} player page url
     */
    getPlayerNotes: function (url) {
      if (infoCache.hasOwnProperty(url)) {
        this.onPlayerNotesReceived.fire(infoCache[url]);
        return;
      }

      GM_xmlhttpRequest({
        method: 'GET',
        url   : url,
        onload: function (response) {
          infoCache[url] = response.responseText;
          PlayerNotes.onPlayerNotesReceived.fire(response.responseText);
        }
      });
	  //GM_log("Page is here");
    },

    /**
     * Hides the player notes tooltip.
     */
    hideDesc: function (e) {
      clearTimeout(descTimeout);
      yud.setStyle('playernotedesc', 'display', 'none');
    },

    /**
     * Refreshes the player notes tooltip when player info is received.
     *
     * @param {String} playerNotesContent contents of the player notes page
     */
    refreshDesc: function (playerNotesContent) {
      var playerNotesTooltip = yud.get('playernotedesc');
	  playerNotesContent=playerNotesContent.replace( /[\r\n]+/g, '' );
	  var news=playerNotesContent.match(/<p class=["']*plotSummary['"]*>.+<\/p>/);
	  if (news!=null)
		{
			news[0]=news[0].replace('<hr/><div','');
			//GM_log(news[0]);
			var	summary=news[0].split(/<p class=["']*plotSummary['"]*>/);
			divStr='<div class="inner"> ';
			for (i=1; i<summary.length;i++)
			{
				//GM_log(i+":" + summary[i]);
				divStr+=summary[i].replace(/<\/p>.*/,'');
				if (i<summary.length-1)
					divStr+='<HR>';
			}
			divStr+='</div>';
			//GM_log(divStr);
			playerNotesTooltip.innerHTML=divStr;
		}
	  else
		  playerNotesTooltip.innerHTML='<div class="inner">Unable to get summary...</div>';

    },

    /**
     * Shows the tooltip after a delay.
     */
    showDesc: function (e) {
      descTimeout = setTimeout(function () {
        var playerNotesTooltip  = yud.get('playernotedesc'),
            noteLink  = yue.getTarget(e),
            anim       = new yua(playerNotesTooltip, {opacity: {to: 1.0}}, 0.4, yut.Easing.easeBoth);

        playerNotesTooltip.innerHTML = '<div class="loading">Loading...<img align="absmiddle" src="' + WORKING_IMG_URL + '"/></div>';

        PlayerNotes.getPlayerNotes(noteLink.href);

        yud.setStyle(playerNotesTooltip, 'opacity', 0.0);
        yud.setStyle(playerNotesTooltip, 'display', 'block');

		/*GM_log(window.innerWidth);
		GM_log(noteLink.offsetHeight);
		GM_log(noteLink.offsetLeft);
		GM_log(noteLink.offsetParent);
		GM_log(noteLink.offsetWidth);
		GM_log(yud.getX(noteLink));*/
		wWidth=window.innerWidth;
		currentX=yud.getX(noteLink);
		divWidth=500;
		if (divWidth>=wWidth)
			posX=wWidth/2;
		else if (divWidth+currentX>wWidth-25)
			posX=wWidth-25-divWidth;
		else if (divWidth+currentX<25)
			posX=25+divWidth;
		else
			posX=currentX;
		//GM_log("Current:" + posX);
        yud.setXY(playerNotesTooltip, [posX,
            yud.getY(noteLink) + noteLink.offsetHeight + 1]);

        anim.animate();
      }, 200);
    }
  };
}();

PlayerNotes.init();
})();

