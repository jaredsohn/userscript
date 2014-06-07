// ==UserScript==
// @name           Mailto - Google GMail (Clean, Fast, Popup)
// @author         David King <david@oopstudios.com>
// @namespace      http://oopstudios.com/
// @version        0.3
// @date           2009-02-17
// @description    Makes mailto links open in a gmail popup window.
// @include        *
// @exclude        http://mail.google.com/*
// ==/UserScript==

window.GMAILTO = {};

//
// The constants - edit away!
//

window.GMAILTO.domain = "yourdomain.com"; // Comment this out for regular GMail action!!
window.GMAILTO.width  = 700;
window.GMAILTO.height = 550;

//
// The meat of it
//

window.GMAILTO.popup = "";
window.GMAILTO.mailto = function (e) {
  var href = e.target.href.split ("mailto:");
  href = href[1];
  // Build the GMail URL
  if (window.GMAILTO.domain) {
    var url = "https://mail.google.com/a/" + window.GMAILTO.domain + "/?view=cm&tf=0&ui=1";
  } else {
    var url = "https://mail.google.com/mail/?view=cm&tf=0&ui=1";
  }
  // Dissect the href
  if (href.indexOf ("?") >= 0) {
    var params = href.split ("?");
    href = params[0];
    // Loop the params and addem
    for (var p=1, l=params.length; p<l; p++) {
      var param = params[p].split ("=");
      switch (param[0]) {
        case "subject":
          url += "&su=" + param[1];
          break;
        case "body":
          url += "&body=" + param[1];
          break;
        case "cc":
          url += "&cc=" + param[1];
          break;
        case "bcc":
          url += "&bcc=" + param[1];
          break;
        default:
          break;
      }
    }
  }
  // Finally, the recipient
  url += "&to=" + href;
  // Calculate the position onscreen
  var L = (screen.width-window.GMAILTO.width)/2;
  var T = (screen.height-window.GMAILTO.width)/2;
  // Create the window
  if (window.GMAILTO.popup.close) {
    window.GMAILTO.popup.close ();
  }
  window.GMAILTO.popup = window.open (url, "gmailPopup", "width=" + window.GMAILTO.width + ", height=" + window.GMAILTO.height + ", left=" + L + ", top=" + T + ", scrollbars=1, menubar=0, toolbar=0, directories=0, resizable=0, location=0, status=0");
  if (window.focus) {
    window.GMAILTO.popup.window.focus ();
  }
  // Prevent the usual
  e.preventDefault ();
};

// Parse all "mailto" links and add the events
var links = document.evaluate ("//a[starts-with(@href,'mailto:')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var l=0, sl=links.snapshotLength; l<sl; l++) {
  // Add the event
  var link = links.snapshotItem (l);
  link.addEventListener ("click", GMAILTO.mailto, false);
}