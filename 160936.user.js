// ==UserScript==
// @name        LibraryThing full title on work pages
// @namespace   http://userscripts.org/users/maxstarkenburg
// @description On a work page, show the full, untruncated text of the work's title, instead of the default ellipsized behavior
// @include     http*://*librarything.tld/work/*
// @grant       none
// @version     1.6
// ==/UserScript==

// A BIG thank you to brightcopy (http://userscripts.org/users/brightcopy and http://www.librarything.com/profile/brightcopy) for his guidance and help with this script!

// For some reason the script runs twice, and this line prevents this. Solution from Brock Adams at http://stackoverflow.com/a/5877034/752122
if (window.self == window.top) {

  var headsummary = document.getElementsByClassName("headsummary")[0];
  var truncatedTitle = headsummary.getElementsByTagName("h1")[0];
  var truncText = truncatedTitle.firstChild.textContent;

  // Don't bother with all the stuff below if the title isn't even truncated
  if (truncText.indexOf("…") > -1) {

    // Get full work's title (plus some extra junk we'll clean up later).
    var fullTitleText = document.getElementsByTagName("title")[0].textContent;
    // The value from <meta propery="og:title"> is cleaner in some respects, but it breaks if the title contains a 
    // double-quote, and it also only displays the "work" title, not the "book" title.
    
    // Get the @href of the <link ref="canonical" ...> element, which we'll use for some later tests
    var links = document.getElementsByTagName("link");
    var link = '';
    for (var i = 0; i < links.length; i++) {
      if (links[i].getAttribute("rel") == "canonical") {
        link = links[i].href;
        break;
      }
    }

    // Get the site's word(s) for "by " and the text of the primary author, if it exists
    var by = '', primaryAuthor = '';
    var h2 = headsummary.getElementsByTagName("h2")[0];
    if (h2) {
      by = h2.firstChild.nodeValue;
      if (by == null) by = h2.getElementsByTagName("span")[0].textContent + " "; // Important to include the space (" ") for the non-English/translated cases.
      primaryAuthor = h2.getElementsByTagName("a")[0].textContent;
    }
    var byAuth = by + primaryAuthor;
    // Still unsure how to deal with certain "phantom-author" works (e.g. http://librarything.com/work/12853038/editions/88121268)
    // which put a " by " in <title> even when their is no author assigned.
    
    // Make a variable to tell if we're on book view or not
    var navLinks = document.getElementsByClassName("workleftnav")[0].getElementsByTagName("a");
    var bookView = 0;
    for (var i = 0; i < navLinks.length; i++) {
      if (navLinks[i].href.indexOf("/details/") > -1) {
        bookView++;
      }
    }
    
    if (bookView == 0) {
      // If we're not on book view, the work sub-pages put an extra prefix in the fullTitleText, which needs to be removed.
      // Thanks to brightcopy for clueing me in to a much more efficient/robust way of doing this than I was doing before.
      if (fullTitleText.indexOf(truncText.substr(0, truncText.length - 5)) != 0) { // 5 for good measure to get rid of the ellipsis
        fullTitleText = fullTitleText.substr(fullTitleText.indexOf(":") + 1);
        if (fullTitleText.indexOf(" ") == 0) fullTitleText = fullTitleText.substr(1); // Making this conditional in case one of the translations does something like "Editions:Title"
      }
    } else {
      // Ugggghhh. Some languages use different translations of "by" on the book view vs. work view. 
      // Some even re-order the author and title.
      if (link.indexOf("www.") != 7) { // Don't bother with these if you're in the majority of LT users
        if (link.indexOf("fi.")  == 7 && fullTitleText.indexOf(" (tekijä: ") > -1) byAuth = "(tekijä: " + primaryAuthor + ")";
        else if (link.indexOf("tr.")  == 7 && fullTitleText.indexOf(", ") > -1) byAuth = ", " + primaryAuthor; 
        else if (link.indexOf("ru.")  == 7) byAuth = primaryAuthor;
        else if (link.indexOf("jp.")  == 7 && fullTitleText.indexOf("著者:") > -1) byAuth = "著者: " + primaryAuthor;
        else if (link.indexOf("pir.") == 7 && fullTitleText.indexOf(" by the scurvy dog ") > -1) byAuth = "by the scurvy dog " + primaryAuthor;
        else if (link.indexOf("lat.") == 7 && fullTitleText.indexOf(" ab ") > -1) byAuth = "ab " + primaryAuthor;
        else if (link.indexOf("bg.")  == 7 && fullTitleText.indexOf(" от ") > -1) byAuth = "от " + primaryAuthor;
        else if (link.indexOf("cn2.") == 7 && fullTitleText.indexOf(" 作者 ") > -1) byAuth = "作者 " + primaryAuthor;
        else if (link.indexOf("lv.")  == 7 && fullTitleText.indexOf("», ") > -1) byAuth = "», " + primaryAuthor;
        else if (link.indexOf("il.")  == 7 && fullTitleText.indexOf(" של ") > -1) byAuth = "של " + primaryAuthor; // Part of this looks all messed up, due to the RTL factor, but somehow it works!
        else if (link.indexOf("ir.")  == 7) byAuth = ''; // Not sure why Persian doesn't work similarly to Hebrew.  Handling it separately below.
        else if (link.indexOf("si.")  == 7 && fullTitleText.indexOf(", napisal(a) ") > -1) byAuth = ", napisal(a) " + primaryAuthor;
        else if (link.indexOf("ind.") == 7 && fullTitleText.indexOf(" oleh ") > -1) byAuth = "oleh " + primaryAuthor;
        else if (link.indexOf("ge.")  == 7 && fullTitleText.indexOf("-ს მიერ") > -1) byAuth = primaryAuthor + "-ს მიერ";
        else if (link.indexOf("glg.") == 7 && fullTitleText.indexOf(" por ") > -1) byAuth = "por " + primaryAuthor;
      }
    }

    // Ugh. Various language-specific quirks on the book view only.
    if (bookView) {
      // On the cz and hu sites, the construction of <title> is "Author: Title" or "Author : Title" instead of "Title by Author".
      if (link.indexOf("cz.") == 7 || link.indexOf("hu.") == 7) {
        if (primaryAuthor.length != 0 || (primaryAuthor.length == 0 && (fullTitleText.indexOf(":") == 0 || fullTitleText.indexOf(":") == 1))) { // Added condition for phantom-author cases;
          fullTitleText = fullTitleText.substr(fullTitleText.indexOf(primaryAuthor + ":") + 2);
        }
        byAuth = "";
      }
      // On the lv site, the construction of <title> is "«Title», Author" instead of "Title by Author".
      if (link.indexOf("lv.") == 7) fullTitleText = fullTitleText.substr(1);
    }
    
    // Remove the "by So-and-So | LibraryThing part of the fullTitleText
    byAuth = byAuth + " | ";
    if (fullTitleText.indexOf(byAuth) > 10) { 
      // Sometimes it just doesn't work, in which case don't bother with the replacement (hence the above conditional)
      // e.g. where did the comma come from after the author's name in the <title> of http://www.librarything.com/work/3621315/ ?
      fullTitleText = fullTitleText.split(byAuth).slice(0, -1).join(byAuth);

      // There's gotta be a better way to deal with the Persian "by" text.  Not sure why it works here in 
      // split/slice/join, but not when trying to put the RTL text in the assignment of byAuth.  Any ideas?
      if (bookView && link.indexOf("ir.") == 7 && fullTitleText.indexOf("توسط " + primaryAuthor) > -1) { // The last condition for certain author-less books
        fullTitleText = fullTitleText.split("توسط " + primaryAuthor).slice(0,-1).join("توسط " + primaryAuthor);
      }

      // Replace the truncated text of the h1 with the full value, and we're done!
      truncatedTitle.firstChild.nodeValue = fullTitleText;
    }

  }

}
