// ==UserScript==
// @name           Flickr: Show all images by a user in his/her groups
// @namespace      http://loucypher.wordpress.com/
// @include        http://www.flickr.com/photos/*/*
// @include        http://flickr.com/photos/*/*
// ==/UserScript==

// Last updated: 2008-06-04

/*----------------------------------------------------------------------
    Discuss this script at:
    - http://userscripts.org/scripts/show/13160
    - http://flickr.com/groups/flickrhacks/discuss/72157602571419643/

    Inspired by Steeev's Show all images in pool by user GM script
    http://flickr.com/groups/flickrhacks/discuss/72157594144967671/
    http://userscripts.org/scripts/show/4366
  ----------------------------------------------------------------------*/

({
  stringBundle: [
    "All photos and videos by this user in this pool", // en-us
    "Alle Fotos und Videos dieses Benutzers in diesem Pool", // de-de
      // Thanks to http://www.flickr.com/people/wolfman2/
    "Fotos de este usuario en este mural", // es-us
      // Thanks to http://www.flickr.com/people/lucamar/
    "Toutes les photos de cet utilisateur dans le pool", // fr-fr
      // Thanks to http://www.flickr.com/people/mortimer/
    "Tutte le foto del utente in questo pool", // it-it
      // Thanks to http://www.flickr.com/people/mortimer/
    "", // reserved for ko-kr
    "", // reserved for pt-br
    ""  // reserved for zh-hk
  ],

  readCookie: function(aName) {
  // http://quirksmode.org/js/cookies.html
    var nameEQ = aName + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(nameEQ) == 0) {
        return unescape(c.substring(nameEQ.length, c.length));
      }
    }
    return null;
  },

  getLanguage: function() {
    var cookie = this.readCookie("cookie_l10n");
    // GM_log(cookie);
    if (cookie) {
      return cookie.toString().replace(/\;\w+$/, "")
    } else {
      return null;
    }
  },

  getString: function() {
    // GM_log(this.getLanguage());
    switch (this.getLanguage()) {
      case "de-de": return this.stringBundle[1];
      case "es-us": return this.stringBundle[2];
      case "fr-fr": return this.stringBundle[3];
      case "it-it": return this.stringBundle[4];
      case "ko-kr": return this.stringBundle[5];
      case "pt-br": return this.stringBundle[6];
      case "zh-hk": return this.stringBundle[7];
      default: return this.stringBundle[0];
    }
  },

  getPools: function() {
    return document.evaluate("//a[starts-with(@id, 'contextLink_pool')]",
                             document, null, 6, null);
  },

  getBuddyIcon: function() {
    return document.evaluate("//div[@class='Widget']/a" +
                             "/img[@class='rightSideContactChanger'" +
                             " and contains(@src, 'buddyicon')]",
                             document, null, 9, null).singleNodeValue;
  },

  getUserID: function() {
    if(this.getBuddyIcon()) {
      try {
        return this.getBuddyIcon().src.split("#")[1];
      } catch(ex) {
        return null;
      }
    } else {
      return null;
    }
  },

  addLink: function(aNode, aURL) {
    var link = aNode.appendChild(document.createElement("a"));
    link.href = aURL;
    link.className = "Plain";
    link.style.fontSize = "smaller";
    link.appendChild(document.createTextNode(this.getString()))
  },

  needL10n: function(aNode) {
    if (this.getString() != "") return;
    var link = aNode.appendChild(document.createElement("a"));
    link.className = "Plain";
    link.style.fontSize = "smaller";
    link.style.marginLeft = ".5em";
    link.href = "/groups/flickrhacks/discuss/" +
                "72157602571419643/72157603610054214/";
    link.title = "Translate this to your language";
    link.appendChild(document.createTextNode("[?]"));
    link.previousSibling.textContent = this.stringBundle[0];
  },

  init: function() {
    var pools = this.getPools();
    var userID = this.getUserID();
    if (!(pools || userID || pools.snapshotLength)) return;
    var pool, url, group;
    for (var i = 0; i < pools.snapshotLength; i++) {
      pool = pools.snapshotItem(i);
      group = pool.parentNode;
      group.appendChild(document.createElement("br"))
      url = pool.href + userID;
      this.addLink(group, url);
      this.needL10n(group);
    }
  }

}).init()