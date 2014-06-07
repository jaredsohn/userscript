// ==UserScript==
// @name           phpBBv3 Show Last Post
// @namespace      http://glenncarr.com/greasemonkey/phpbb
// @description    Shows the content of the last post when hovering over the last post icon
// @include        http://www.fantasybaseballcafe.com/forums/*
// @author         Glenn Carr (glenn at glenncarr dot com)
// @require        http://yui.yahooapis.com/2.5.2/build/yahoo-dom-event/yahoo-dom-event.js
// @require        http://yui.yahooapis.com/2.5.2/build/animation/animation-min.js
// $LastChangedRevision: 493 $
// $LastChangedDate: 2008-10-30 17:41:09 -0500 (Thu, 30 Oct 2008) $
// ==/UserScript==
/*
    Updates:
    18-Feb-2008 - Modified to show content if just hovering over last post table cell instead of last post icon image.
    19-Feb-2008 - Modified to also show content of first post if hovering of topic title cell
    19-Feb-2008 - Bug fix
    23-Feb-2008 - Fixed bug causing last unread post link to be changed
    30-Oct-2008 - Fixed to work with Firefox 3 changes
*/

(function() {

var Y   = YAHOO,
    yut = Y.util,
    yud = yut.Dom,
    yue = yut.Event,
    yua = yut.Anim;

String.prototype.trim = function () {
  return this.replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1");
}

String.prototype.stripTags = function() {
  return this.replace(/<\/?[^>]+>/gi,'');
}

var PostPreview = function () {
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
     * Initializes the PostPreview module, injecting HTML and CSS into the page
     * and attaching event handlers. This method must be called AFTER the YUI
     * libs are loaded.
     */
    init: function () {
      this.inject();

      // Create custom events.
      this.onLastPostReceived = new yut.CustomEvent('lastPostReceived', this);

      // Attach event handlers.
      var postDDs = yud.getElementsBy(function(el) { return el.getAttribute("class") == 'lastpost'; }, 'dd');
      yue.addListener(postDDs, 'mouseover', this.showDesc, this, true);
      yue.addListener(postDDs, 'mouseout', this.hideDesc, this, true);

      var postDTs = yud.getElementsBy(function(el) { return true; }, 'dt');
      yue.addListener(postDTs, 'mouseover', this.showDesc, this, true);
      yue.addListener(postDTs, 'mouseout', this.hideDesc, this, true);

      this.onLastPostReceived.subscribe(function (e, args) {
        this.refreshDesc(args[0],args[1]);
      }, this, true);
    },

    /**
     * Injects markup and CSS used for the tooltips.
     */
    inject: function () {
      GM_addStyle(
          '.lastpostinfo { text-align:left; float:left; margin:10px 0 0 10px !important; margin:10px 0 0 5px; }' +
          /*'.lastpostinfo { text-align: left; background: #ffffbb; border-top: 1px solid #cccccc; border-left: 1px solid #cccccc; border-bottom: 2px solid #999999; border-right: 2px solid #999999; font-size: 0.9em; overflow: hidden; padding: 4px; width: 500px; }' +*/
          '.lastpostinfo p { margin-top: 3px; }' +
          '.lastpostinfo p:first-child { margin-top: 0; }' +
          '.lastpostinfo p:last-child { margin-bottom: 0; }' +
          '.lastpostinfo div.inner, .lastpostinfo div.loading { color: #000; display:block; position:relative; background:#ffffcc !important; border:1px solid #333333; margin:0px 4px 4px 0px; padding:4px; }' +
          '.lastpostinfo div.inner table td { font-size: 12px; border-bottom: 1px solid #666666 }' +
          '.lastpostinfo div.inner table tr:last-child td { border-bottom-width: 0px }' +
          '.lastpostinfo div.inner table tr>td:last-child {display:none;}' +
          '.lastpostinfo div.loading { font-style: italic; color: #666666; }'
      );

      var div = document.createElement( 'DIV' );
      div.id = 'lastnotedesc';
      div.style.display = 'none';
      div.style.height = '0px';
      div.setAttribute( 'class', 'lastpostinfo' );
      div.style.zIndex = 99;
      document.body.appendChild( div );
    },

    /**
     */
    getLastPost: function (url) {
      if (infoCache.hasOwnProperty(url)) {
        this.onLastPostReceived.fire(infoCache[url], 'LAST');
        return;
      }

      GM_xmlhttpRequest({
        method: 'GET',
        url   : url,
        onload: function (response) {
          infoCache[url] = response.responseText;
          PostPreview.onLastPostReceived.fire(response.responseText, 'LAST');
        }
      });
    },

    /**
     */
    getFirstPost: function (url) {
      if (infoCache.hasOwnProperty(url)) {
        this.onLastPostReceived.fire(infoCache[url], 'FIRST');
        return;
      }

      GM_xmlhttpRequest({
        method: 'GET',
        url   : url,
        onload: function (response) {
          infoCache[url] = response.responseText;
          PostPreview.onLastPostReceived.fire(response.responseText, 'FIRST');
        }
      });
    },

    /**
     */
    hideDesc: function (e) {
      clearTimeout(descTimeout);
      yud.setStyle('lastnotedesc', 'display', 'none');
    },

    /**
     * Refreshes the player notes tooltip when player info is received.
     *
     * @param {String} lastPostContent contents of the player notes page
     */
    refreshDesc: function (lastPostContent, firstOrLast) {
        var lastPostTooltip = yud.get('lastnotedesc');

        var html = lastPostContent.replace( /[\r\n]+/g, '' ).replace( /^.*(<div id="page-body">.+)<\/body>.*$/im, '$1' );
        var span = document.createElement( 'span' );
        span.innerHTML = html;
        var divs = span.getElementsByTagName( 'div' );
        for ( var iDiv = 0; iDiv < divs.length; iDiv++ )
        {
            if ( divs[ iDiv ].id == 'page-body' )
            {
                var divPageBody = divs[ iDiv ];
                var divs = divPageBody.getElementsByTagName( 'div' );
                for ( var i = 0; i < divs.length; i++ )
                {
                    if ( divs[ i ].getAttribute( "class" ) == 'postbody' )
                    {
                        div = divs[ i ];
                        if ( firstOrLast == 'FIRST' )
                            break;
                    }
                }

                var note = new Array();
                note.push( '<div class="inner">' );
                note.push( '<div style="font-size: 125%; min-height: 0" class="content">' );
                note.push( div.getElementsByTagName( 'div' )[ 0 ].innerHTML );
                note.push( '</div></div>' );
                lastPostTooltip.innerHTML = note.join( '' );
                return;
            }
        }

        lastPostTooltip.innerHTML = '<div class="inner">No notes.</div>';
    },

    /**
     * Shows the tooltip after a delay.
     */
    showDesc: function (e) {

      descTimeout = setTimeout(function () {
        var lastPostTooltip  = yud.get('lastnotedesc');
        lastPostTooltip.innerHTML = '<div class="loading">Loading...<img align="absmiddle" src="' + WORKING_IMG_URL + '"/></div>';
        var anim = new yua(lastPostTooltip, {opacity: {to: 1.0}}, 0.4, YAHOO.util.Easing.easeBoth);
        var cell  = yue.getTarget(e);
        if ( cell.tagName == 'DT' )
        {
        	cell.title = '';
        	var links = cell.getElementsByTagName( 'a' );
            var noteLink = links[ 0 ];
            if ( /unread/i.test( noteLink.href ) )
            	noteLink = links[ 1 ]
            PostPreview.getFirstPost(noteLink.href);
        }
        else  // last post
        {
            var img = cell.getElementsByTagName( 'img' )[ 0 ];
            var noteLink = img.parentNode;

            PostPreview.getLastPost(noteLink.href);
        }
        yud.setStyle(lastPostTooltip, 'opacity', 0.0);
        yud.setStyle(lastPostTooltip, 'display', 'block');
        var width = ( parseInt( document.defaultView.getComputedStyle(noteLink.parentNode, '').getPropertyValue("width"), 10 ) + 100 ) + 'px';
        yud.setStyle(lastPostTooltip, 'width', width );

        yud.setXY(lastPostTooltip, [yud.getX(noteLink.parentNode), yud.getY(noteLink) + noteLink.offsetHeight + 18]);

        anim.animate();
      }, 500);
    }
  };
}();

PostPreview.init();
})();