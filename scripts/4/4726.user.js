// cyclingnews_com
// $Id: cyclingnews_com.user.js 14 2007-07-15 04:01:03Z Mike $
// Copyright (c) 2005-2006, Michael Strasser
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "HighlightCountries", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          cyclingnews_com
// @namespace     http://michaelstrasser.com/greasemonkey/
// @description   Utilities for cyclingnews.com.
// @include       http://*.cyclingnews.com/*
// ==/UserScript==
//
// --------------------------------------------------------------------

// Object for styling text in a page.
function Styler(pat, cls, css) {
  // Regular expression to match.
  this.re = new RegExp(pat, "ig");
  // Name of the CSS class that will be applied to the matched text.
  this.cls = cls;
  // CSS to be applied to that class.
  this.css = css;
}

// Populate an array of Styler objects.
var stylers = [
  // Team styles. These are the teams in the 2007 ProTour and others
  // CSS class names are the official abbreviations from www.letour.fr.
  // Reg exps for teams are often complex because cyclingnews.com is not
  // consistent in the way their names are written.
  new Styler(
    "Team CSC",
    "CSC",
    "background-color: #CC3333; color: #FFFFFF;"
  ),
  new Styler(
    "Discovery Channel( Pro Cycling Team)?",
    "DSC",
    "background-color: #0099FF; color: #FFFFFF;"
  ),
  new Styler(
    "T-Mobile( Team)?",
    "TMO",
    "background-color: #FF33FF; color: #FFFFFF;"
  ),
  new Styler(
    "Cr[eé]dit Agricole",
    "CA",
    "background-color: #339933; color: #FFFFFF;"  
  ),
  new Styler(
    "Unibet\.com",
    "UNI",
    "background-color: #99FF99; color: #FFFFFF;"  
  ),
  new Styler(
    "Phonak( Hearing Systems)?",
    "PHO",
    "background-color: #FFFF00; color: #339933;"  
  ),
  new Styler(
    "Bouygues Telecom",
    "BTL",
    "background-color: #66CCCC; color: #FFFFFF;"  
  ),
  new Styler(
    "Gerolsteiner",
    "GST",
    "background-color: #99FFFF; color: #000000;"  
  ),
  new Styler(
    "Fran.aise Des Jeux",
    "FDJ",
    "background-color: #EEEEEE; color: #000066;"  
  ),
  new Styler(
    "Caisse d.Epargne(-Illes Balears)?",
    "CEI",
    "background-color: #000000; color: #FFFFFF;"  
  ),
  new Styler(
    "Predictor ?- ?Lotto",
    "PRL",
    "background-color: #FF9933; color: #FFFFFF;"  
  ),
  new Styler(
    "Liquigas",
    "LIQ",
    "background-color: #CCFF33; color: #000099;"  
  ),
  new Styler(
    "Domina Vacanze",
    "DOV",
    "background-color: #FFCC66; color: #0000CC;"  
  ),
  new Styler(
    "Quick ?-? ?Step ?-? ?Innergetic",
    "QSI",
    "background-color: #0000FF; color: #FFFFFF;"  
  ),
  new Styler(
    "Ag2[Rr][- ]Pr[eé]voyance",
    "A2R",
    "background-color: #0000FF; color: #FFFF00;"  
  ),
  new Styler(
    "Rabobank",
    "RAB",
    "background-color: #FF9933; color: #0000CC;"  
  ),
  new Styler(
    "Saunier Duval( ?- ?Prodir)?",
    "SDV",
    "background-color: #FFFF00; color: #CC3333;"  
  ),
  new Styler(
    "Euskaltel ?- ?Euskadi",
    "EUS",
    "background-color: #FF9933; color: #000000;"  
  ),
  new Styler(
    "Cofidis(.+Cr[eé]dit [Pp]ar T.l.phone)?",
    "COF",
    "background-color: #FFCC66; color: #CC3333;"  
  ),
  new Styler(
    "Lampre ?- ?Fondital",
    "LAM",
    "background-color: #FF33FF; color: #6666FF;"  
  ),
  new Styler(
    "(Team )?Milram",
    "MRM",
    "background-color: #0099FF; color: #00000;"  
  ),
  new Styler(
    "Agritubel",
    "AGR",
    "background-color: #339933; color: #0099FF;"  
  ),
  new Styler(
    "Astana",
    "AST",
    "background-color: #0099FF; color: #FFFF00;"  
  ),
  new Styler(
    "Barloworld",
    "BWL",
    "background-color: #CC3333; color: #FFFF00;"  
  ),
  // Women’s teams.
  new Styler(
    "Australian national team",
    "ANT",
    "background-color: #FFFF66; color: #006600;"
  ),
  new Styler(
    "(Equipe )?N(ü|ue)rnberger Versicherung",
    "NBV",
    "background-color: #3F68D7; color: #FFFFFF;"
  ),
  new Styler(
    "Austrian national team",
    "AUT",
    "background-color: #CC3333; color: #FFFFFF;"
  ),
  // Riders names and their countries.
  new Styler(
    "( [A-Za-z'’]+)+ \\(Aus(tralia)?\\)",
    "AUS",
    "background-color: #FFFF66; color: #006600; font-weight: bold;"
  )
];

// Apply these styles to matched text in <pre> elements in this page.
// There are two steps:
//    1.  Write a style element with CSS class definitions.
//    2.  Match text in <pre> elements and replace them with
//        styled versions of the same text.
function applyStyles() {
  var css, s, styler, head, style, pres, p, pre, html;
  // ----------------------------------------------------------------
  // 1. Write a style element into the document head.
  // ----------------------------------------------------------------
  // Write a class entry for each style.
  css = "";
  for (s = 0; s < stylers.length; ++s) {
    styler = stylers[s];
    css += "span." + styler.cls + " { " + styler.css + " }\n";
  }
  // Style element is last in the head element.
  head = document.getElementsByTagName("head")[0];
  if (! head) return;
  style = document.createElement("style");
  style.type = "text/css";
  style.innerHTML = css;
  head.appendChild(style);
  // ----------------------------------------------------------------
  // 2. Find the text and apply the styles.
  // ----------------------------------------------------------------
  // Result lines are all in <pre> nodes.
  pres = document.getElementsByTagName("pre");
  for (p = 0; p < pres.length; ++p) {
    pre = pres[p];
    html = pre.innerHTML;
    // Replace the searched-for text with a styled version of it.
    for (s = 0; s < stylers.length; ++s) {
      styler = stylers[s];
      html = html.replace(
        styler.re,
        "<span class='" + styler.cls + "'>$&</span>"
      );
    }
    pre.innerHTML = html;
  }
}

// Go to the link whose text is specified.
function goLink(regex) {
  
  var anchors = document.evaluate(
      "//a",
      document,
      null,
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
      null
  );
  for (var i = 0; i < anchors.snapshotLength; ++i) {
    var anchor = anchors.snapshotItem(i);
    if (anchor.innerHTML.match(regex)) {
      window.location.href = anchor.href;
    }
  }
}

function handleKeyPress(e) {
  switch (e.which) {
  case 102: // f: go to focus named anchor.
    window.location.href = window.location.href + "#focus";
    break;
  case 104: // h: go to the home page
    window.location.href = "http://www.cyclingnews.com/"; // back to home page
    break;
  case 108: // l: go to the latest live coverage page
    window.location.href = "http://live.cyclingnews.com/?id=latest";
    break;
  case 110: // n: go to the next photo or news story or stage
    goLink(/Next\s+(photo|news|stage)/ig);
    break;
  case 111: // o: go to the overall standings link
    goLink(/Overall\s+standings/ig);
    break;
  case 112: // p: go to the previous photo or news story or stage
    goLink(/Previous\s+(photo|news|stage)/ig);
    break;
  case 114: // r: go to the related story or the to results on this page.
    goLink(/Related\s+Story/ig);
    // Using goLink() here produces strange results.
    window.location.href = window.location.href + "#res";
    break;
  }
}

// Add a named anchor to the main photo on this page.
function addPhotoAnchor() {
    var imgs = document.evaluate(
      "//img",
      document,
      null,
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
      null
  );
  for (var i = 0; i < imgs.snapshotLength; ++i) {
    var img = imgs.snapshotItem(i);
    if (img.src.indexOf("/photos/") > -1) {
      // Found the photo image. Precede it with an anchor named "focus".
      var anchor = document.createElement("a");
      anchor.name = "focus";
      img.parentNode.insertBefore(anchor, img);
    }
  }

}

(function() {

    // Apply styling to race results.
    applyStyles();
    
    // Handle key presses.
    document.addEventListener('keypress', handleKeyPress, true);

    // Add named anchors to photos in photo pages.
    if (window.location.href.indexOf("/photos/") > -1) {
      addPhotoAnchor();
    }

})();
