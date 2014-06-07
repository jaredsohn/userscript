/*
        WebmasterWorld.com Refresh Message List / Reset Pointers Tweak
  ----------------------------------------------------------------------------

  Ever mark all messages read, then come back in a bit to see if there are new
  messages?  There's no link on screen to reload the page without marking all
  messages read again.  This tweak changes that.

  Ever find it jarring that the "reset pointers" link is on the left side
  of some pages, and the right of others?  This tweak changes that too.

  This Greasemonkey script is configurable.  There is a Config section in the
  code below.  Change either of the settings from true to false if you don't
  want that behavior.

  c. 2005 Jason Kirtland <lmnop@discorporate.us>
  (Perl) Artistic License / GPL dual license.  Go nutty.
  Version: 0.3 <2005-03-30>

  History:
  0.3  Expanded to category pages.  Added option to normalize reset
       link location.
*/

// ==UserScript==
// @name          Webmaster World Forum Refresh Button
// @namespace     http://discorporate.us/gms
// @description	  Adjusts the Reset last read link and adds a Refresh link.
// @include       http://www.webmasterworld.com/forum*
// @include       http://www.webmasterworld.com/category*
// @include       http://www.webmasterworld.com/index.cgi*
// @include       http://www.webmasterworld.com/home.htm
// ==/UserScript==
(function() {
  var Config =
    {
      // Try to place all "Reset Last Read Pointers" links
      // consistently on the right-hand side of the page.
      rearrangeResetLinks: true,

      // Add "Refresh Page" links to forums and categories.
      addRefreshLinks: true,

      // end of config.
      DEBUG: false
    };

  if (! Config.rearrangeResetLinks && ! Config.addRefreshLinks) return;

  var Util = {};
  Util.xpOne = function (path, context) {
    var root = context.document ? context.document : document;
    var res = null;
    try {
      res = root.evaluate(path, context, null,
                          XPathResult.FIRST_ORDERED_NODE_TYPE,
                          null);
      return res.singleNodeValue;
    }
    catch (e) {
      if (Config.DEBUG) {
        alert('error: xpOne(' + path + "):\n" + e.toString());
        throw e;
      }
    }
    return res ? res.singleNodeValue : null;
  };
  
  try {
    // Categories
    if (location.href.match(/category/)) {
      var resetRow =
        Util.xpOne('//body/center[3]//td[1]//tr[2]', document);

      var insertCell =
        Util.xpOne('//body/center[3]//td[1]//tr[1]/td[2]', document);

      if (resetRow && insertCell) {
        var reset = resetRow.firstChild.firstChild;

        if (Config.rearrangeResetLinks) {
          reset.parentNode.removeChild(reset);
          resetRow.parentNode.removeChild(resetRow);
          insertCell.appendChild(document.createElement('br'));
        }

        if (Config.addRefreshLinks) {
          var refresh = reset.cloneNode(true);
          refresh.firstChild.firstChild.nodeValue = 'Refresh Forum List';
          refresh.href = refresh.href.replace(/cookie=reset&(mp;)?/, '');
          refresh.style.marginRight = '1em';

          if (Config.rearrangeResetLinks)
            insertCell.appendChild(refresh);
          else
            reset.parentNode.insertBefore(refresh, reset);
        }

        if (Config.rearrangeResetLinks)
          insertCell.appendChild(reset);
      }
    }
    // Forums
    else if (location.href.match(/forum/)) {
      if (! Config.addRefreshLinks) return;

      var links = document.getElementsByTagName('A');
      for (var i=0; i < links.length; i++) {
        if (links[i].href.match(/cookie=reset/)) {
          var rfr = links[i].cloneNode(true);
          rfr.firstChild.firstChild.nodeValue = 'Refresh Message List';
          rfr.href = rfr.href.replace(/&(mp;)?cookie=reset/, '');

          var spacer = document.createTextNode(' ');
          links[i].parentNode.insertBefore(spacer, links[i]);
          links[i].parentNode.insertBefore(rfr, spacer);
          return;
        }
      }
    }
    // Top-level Category page
    else if (location.href.match(/home\.htm/) ||
             location.href.match(/index\.cgi/)) {
      var reset =
        Util.xpOne('//body/center[2]//tr[1]/td[1]/a', document);

      var insertCell =
        Util.xpOne('//body/center[2]//tr[1]/td[2]', document);

      if (! reset || ! insertCell) return;

      if (Config.rearrangeResetLinks) {
        reset.parentNode.removeChild(reset);
        insertCell.appendChild(reset);
      }

      if (Config.addRefreshLinks) {
        var refresh = reset.cloneNode(true);
        refresh.firstChild.firstChild.nodeValue = 'Refresh Forum List';
        refresh.href = refresh.href.replace(/cookie=reset/, '');
        refresh.style.marginRight = '1em';

        reset.parentNode.insertBefore(refresh, reset);
      }
    }
  }
  catch (e) {
    if (Config.DEBUG) throw e;
  }
})();

