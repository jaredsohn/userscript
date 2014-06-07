// ==UserScript==
// @name        Yahoo Fantasy Football - Game Log Extension
// @version		2012.10.15
// @namespace   http://userscripts.org
// @description Provides a link and tooltip to each football player's game log. 
// @include     http://*.fantasysports.yahoo.com/*
// @require     http://yui.yahooapis.com/2.5.2/build/yahoo-dom-event/yahoo-dom-event.js
// @require     http://yui.yahooapis.com/2.5.2/build/animation/animation-min.js
// ==/UserScript==

//Full credit given to Tim Wilson (https://userscripts.org/users/15093) for majority of content within this script. I have blended his game log link (https://userscripts.org/scripts/show/10921) and tooltip (https://userscripts.org/scripts/show/13487) scripts together and thinned them to be used only for Yahoo Fantasy Football game logs. I also tinkered around to get things to work that were previously broken. So basically, I got impatient and fixed things myself. 

var allElements = document.evaluate("//*[contains(@href, 'http://sports.yahoo.com/nfl/players/')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

var thisElement;
var gameLogLink;

var gameLogLinkGraphic = "data:image/gif;base64,"+
	"R0lGODlhEgALANUAAJlnA9/Z0OGdOOaJAPzu2c57APO6ZseJLPfeuahxIP78"+
	"+OGND75yAPbOku2bIeF5AO+qQ/Xo1fTEfOmTEueeL+6iMbNrAOySC/7z5OmU"+
	"Fu+mOt6TJPG1WNd+AKtmAPTBdPPIieN9AK18NPrkw+eOCsR0AOimQf///+2e"+
	"KeyUEvft3v3v2+yXF9iBAqxpAOuNA9yEAPfRmffFc/CvS/337eSGAO+oP///"+
	"/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAUUADcALAAAAAASAAsAAAZ5"+
	"wJuQ9oFoNCiUg8UyRYTQm2F2TC5TqcUmKrTZHJewuNZqcW8aB+F0kjRWqVqh"+
	"cK4oPqTaA4RJwQolZygKHCNtb34lDGcOdyEIMW8THQwWZywva20SbCoHllwZ"+
	"GQOkpX8WHmcUCzAdHYAlJS4ACWcRAi1zihaoIgFQQQA7";

for( var i = 0; i < allElements.snapshotLength; i++) {

	thisElement = allElements.snapshotItem(i);

	if( thisElement.href.indexOf('news') == -1) {
		gameLogLink = document.createElement('a');
		gameLogLink.setAttribute("href",thisElement.href + "/gamelog");
		gameLogLink.setAttribute("target","_blank");
		gameLogLink.innerHTML = "<img border='0' src='" + gameLogLinkGraphic +"'>" ;
		thisElement.parentNode.appendChild(gameLogLink, thisElement.nextSibling);
	}
}


//=============================================================//
//Tooltip

(function() {

var Y   = YAHOO,
    yut = Y.util,
    yud = yut.Dom,
    yue = yut.Event,
    yua = yut.Anim;

var GameLog = function () {
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
     * Initializes the GameLog module, injecting HTML and CSS into the page
     * and attaching event handlers. This method must be called AFTER the YUI
     * libs are loaded.
     */
    init: function () {
      this.inject();

      // Create custom events.
      this.onGameLogReceived = new yut.CustomEvent('gameLogReceived', this);

      // Attach event handlers.
      var gameLogImages = yud.getElementsBy(function(el) { return /gamelog/i.test( el.href ); }, 'a');

      yue.addListener(gameLogImages, 'mouseover', this.showDesc, this, true);
      yue.addListener(gameLogImages, 'mouseout', this.hideDesc, this, true);

      this.onGameLogReceived.subscribe(function (e, args) {
        this.refreshDesc(args[0]);
      }, this, true);
    },

    /**
     * Injects markup and CSS used for the tooltips.
     */
    inject: function () {
      GM_addStyle(
          '.gameloginfo { text-align:left; float:left; width:auto; font-size:8pt; }' +
		  '.gameloginfo div.inner, .gameloginfo div.loading { display:block; position:relative; background:#ffffcc; padding:4px }' +
		  '.title td, .title th {text-align:center; border: 1px solid black; padding:2px 5px 2px 5px; font-weight:bold;}' +
		  '.stats td, .totals td {text-align: right; border: 1px solid black; padding:3px;}' 
      );

      var div = document.createElement( 'DIV' );
      div.id = 'gamelogdesc';
      div.style.display = 'none';
      div.style.height = '0px';
      div.setAttribute( 'class', 'gameloginfo' );
      div.style.zIndex = 99;
      document.body.appendChild( div );
    },

    /**
     * Downloads the player page at the specified URL and caches it for
     * future use.
     *
     * @param {String} player page url
     */
    getGameLog: function (url) {
      if (infoCache.hasOwnProperty(url)) {
        this.onGameLogReceived.fire(infoCache[url]);
        return;
      }

      GM_xmlhttpRequest({
        method: 'GET',
        url   : url,
        onload: function (response) {
          infoCache[url] = response.responseText;
          GameLog.onGameLogReceived.fire(response.responseText);
        }
      });
    },

    /**
     * Hides the game log tooltip.
     */
    hideDesc: function (e) {
      clearTimeout(descTimeout);
      yud.setStyle('gamelogdesc', 'display', 'none');
    },

    /**
     * Refreshes the game log tooltip when player info is received.
     *
     * @param {String} gameLogContent contents of the game log page
     */
    refreshDesc: function (gameLogContent) {
      var gameLogTooltip = yud.get('gamelogdesc');

	  var html = gameLogContent.replace( /[\r\n]+/g, '' );
	  var rows = html.split ( /<tr class="column">|<th class="title">|<tr class="">|<tr class="odd">|<tr class="total">|<\/tfoot>/i );
		  
	  var tip = new Array();
	  var max = rows.length;
	  
      if( max > 1 ) {
        tip.push( '<tr class="title">' + rows[1].replace( /<tr>.*$/i, '' ) );
        tip.push( '<tr class="title" id="labels"><th>' + rows[2].replace( /<\/thead>.*$/i, '' ) );
		
      }

      for ( var i = 3; i < max - 2 ; i++ )
      {
        tip.push( '<tr class="stats">' + rows[i] );
      }
      
	  tip.push( '<tr class="totals">' + rows[max - 2].replace( /<tfoot>.*$/i, '' ) );
	  
	  //GM_log(tip);
	  
	  if ( tip.length > 0 )
      {
        gameLogTooltip.innerHTML = '<div class="inner"><table class="main" cellspacing="0">' + tip.join( '</tr><tr>' ) + '</table></div>';
      }
      else
      {
        gameLogTooltip.innerHTML = '<div class="inner">No games.</div>';
      }
    },

    /**
     * Shows the tooltip after a delay.
     */
    showDesc: function (e) {

      descTimeout = setTimeout(function () {
        var gameLogTooltip  = yud.get('gamelogdesc'),
            gameLogLink  = yue.getTarget(e).parentNode,
            anim       = new yua(gameLogTooltip, {opacity: {to: 1.0}}, 0.4, yut.Easing.easeBoth);

        gameLogTooltip.innerHTML = '<div class="loading">Loading...<img align="absmiddle" src="' + WORKING_IMG_URL + '"/></div>';

        GameLog.getGameLog(gameLogLink.href);

        yud.setStyle(gameLogTooltip, 'opacity', 0.0);
        yud.setStyle(gameLogTooltip, 'display', 'block');

        yud.setXY(gameLogTooltip, [yud.getX(gameLogLink),
            yud.getY(gameLogLink) + gameLogLink.offsetHeight + 18]);

        anim.animate();
      }, 100);
    }
  };
}();

GameLog.init();
})();

