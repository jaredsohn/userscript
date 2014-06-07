// ==UserScript==
// @name           Yahoo Fantasy Sports Player Notes
// @description    Displays a tooltip when mouse is hovered over note image.
// @include        *.fantasysports.yahoo.com/*
// @author         (c) 2012 Tim Wilson <timwilson01 at yahoo dot com>
// @require        http://yui.yahooapis.com/2.5.2/build/yahoo-dom-event/yahoo-dom-event.js
// @require        http://yui.yahooapis.com/2.5.2/build/animation/animation-min.js
// ==/UserScript==
/*
17-Apr-2012:
This is an updated version of Glenn Carr's Yahoo Fantasy Baseball Player Notes script which used to be
at: http://userscripts.org/scripts/show/9387
Since it isn't there anymore, I decided to upload the updated script.

Previous comment from Glenn Carr:
Most of the credit for this goes to Ryan Grove <ryan@wonko.com> and his excellent Jyte ClaimInfo script:
	http://userscripts.org/scripts/show/9216

Updates:
	22-May-2007 - Added dropshadow image, working image
	23-May-2007 - Was only showing the latest news, changed to show all news items
	23-May-2007 - Changed delay from 500ms to 100ms
	25-May-2007 - Got rid of 'jumping' weirdness in some cases, but had to lose dropshadow
	25-May-2007 - Bail quietly on any exceptions during initialization
	23-Aug-2007 - Tweak to make it work with both baseball and football (and maybe some other sports)
	17-Jul-2008 - Fixed to work with Firefox 3

	17-Apr-2012 - Fixed to look for Yahoo's new PNG images instead of GIFs.  Also changed name of script.
	13-Sep-2013 - Fixed to work with Fantasy Football 2013.
 */

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
      var noteImages = yud.getElementsBy(function(el) { return /news/i.test( el.href ); }, 'a');

      yue.addListener(noteImages, 'mouseover', this.showDesc, this, true);
      yue.addListener(noteImages, 'mouseout', this.hideDesc, this, true);

      this.onPlayerNotesReceived.subscribe(function (e, args) {
        this.refreshDesc(args[0]);
      }, this, true);
    },

    /**
     * Injects markup and CSS used for the tooltips.
     */
    inject: function () {
      GM_addStyle(
          '.playernoteinfo { text-align:left; float:left; margin:10px 0 0 10px !important; width:500px; background: url(http://us.i1.yimg.com/us.yimg.com/i/us/sp/fn/default/full/drop_shadow.gif) no-repeat bottom right; }' +
          '.playernoteinfo div.loading { display:block; position:relative; background:#ffffcc; border:1px solid #333333; margin: 0 4px 4px 0; padding: 4px; font-style: italic; color: #666666; font-size: 80% }' +
          '.playernoteinfo div.inner { display:block; position:relative; background:#ffffcc; border:1px solid #333333; margin: 0 4px 4px 0; padding:4px }' +
          '.playernoteinfo div.inner div { font-size: 12px; border-bottom: 1px solid #666666 }'
      );

      var div = document.createElement( 'DIV' );
      div.id = 'playernotedesc';
      div.style.display = 'none';
      div.style.height = '0px';
      div.setAttribute( 'class', 'playernoteinfo' );
      div.style.zIndex = 99;
      document.body.appendChild( div );

	  var gSpan = document.createElement('span');
	  gSpan.id = 'gspan-note';
	  gSpan.style.display = 'none';
	  gSpan.style.height = '0px';
	  gSpan.style.zIndex='99';
	  document.body.appendChild(gSpan);
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
	  var gSpan = yud.get('gspan-note');
	  
      var html = playerNotesContent.replace( /[\r\n]+/g, '' );//.replace( /^.*news and notes/im, '' );
	  var matches = html.match(/class="notes"/);
	  if( matches ) {
		gSpan.innerHTML = html.replace(/.*<div class="notes">/, '<div>');//.replace(/Player Notes/, '');
		var notes = gSpan.getElementsByClassName('info');
		html = '<div class="inner">';
		for( var i = 0; i < notes.length; i++ ) {
		  html += '<div>' + notes[i].innerHTML.replace(/<cite>.*<\/cite>/, '') + '</div>';
		}
		playerNotesTooltip.innerHTML = html + '</div>';
	  } else {
		playerNotesTooltip.innerHTML = '<div class="inner">No notes.</div>';
	  }
    },

    /**
     * Shows the tooltip after a delay.
     */
    showDesc: function (e) {

      descTimeout = setTimeout(function () {
		var playerNotesTooltip  = yud.get('playernotedesc');
		var noteLink  = yue.getTarget(e);//.parentNode,
        var anim       = new yua(playerNotesTooltip, {opacity: {to: 1.0}}, 0.4, yut.Easing.easeBoth);

        playerNotesTooltip.innerHTML = '<div class="loading">Loading...<img align="absmiddle" src="' + WORKING_IMG_URL + '"/></div>';

        PlayerNotes.getPlayerNotes(noteLink.href);

        yud.setStyle(playerNotesTooltip, 'opacity', 0.0);
        yud.setStyle(playerNotesTooltip, 'display', 'block');

        yud.setXY(playerNotesTooltip, [yud.getX(noteLink),
            yud.getY(noteLink) + noteLink.offsetHeight + 18]);

        anim.animate();
      }, 100);
    }
  };
}();

PlayerNotes.init();
})();
