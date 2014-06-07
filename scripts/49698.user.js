// ==UserScript==
// @name           GLFBAL News
// @namespace      castaban.com
// @include        http://castaban.co.cc/leagueStats*
// @include        file:///C:/Stats/leagueStats.html*
// @require        http://yui.yahooapis.com/2.5.2/build/yahoo-dom-event/yahoo-dom-event.js
// @require        http://yui.yahooapis.com/2.5.2/build/animation/animation-min.js
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
      var noteImages = yud.getElementsBy(function(el) { return /.*rotoworld.*/.test( el.href ); }, 'a');

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
	  var news=playerNotesContent.match(/<td class="s_playerNewsText">.*<\/td>/);
	  if (news!=null)
	  {
		  var title=playerNotesContent.match(/class='s_playerNewsTitle'>.*<\/td><\/tr><\/table>/);
		  //var title=playerNotesContent.match(/class='s_playerNewsTitle'>.*title=[a-zA-Z ]+/);
		  //GM_log(title);
	 	  var title1=title[0].match(/title=[A-Za-z ]+/);
		  //GM_log(title);
		  var name=title1[0].replace('title=', '');
		  var date1=title[0].match(/px['"]>.+<\/td><\/tr><\/table>/);
		  //GM_log(date1);
		  date1=date1[0].replace(/px['"]>/, '');
		  date1=date1.replace('<\/td><\/tr><\/table>', '');
		  //GM_log(name);
		  news[0]=news[0].replace('<td class="s_playerNewsText">', '');
		  news[0]=news[0].replace('<br><div class="s_playerNewsTextMain">', '<BR>');
		  //news[0]=news[0].replace(/<\/div[ 	>]*<\/td>.*.$/, '');
		  news[0]=news[0].replace(/<\/div.*.$/, '');
		  //GM_log(news[0]);
		  playerNotesTooltip.innerHTML='<div class="inner">' + "<B>" + name + " ------------- " + date1 + "</B><BR>" + news[0] + '</div>';
	  }
	  else
		  playerNotesTooltip.innerHTML='<div class="inner">Unable to get news...</div>';

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

        yud.setXY(playerNotesTooltip, [yud.getX(noteLink),
            yud.getY(noteLink) + noteLink.offsetHeight + 1]);

        anim.animate();
      }, 500);
    }
  };
}();

PlayerNotes.init();
})();

