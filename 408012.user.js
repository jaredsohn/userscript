// ==UserScript==
// @name        LibraryThing reply preview (basic)
// @namespace   http://userscripts.org/users/maxstarkenburg
// @description Shows the message that's being replied to in a hover tooltip (using the title attribute)
// @include     http*://*librarything.tld/topic*
// @include     http*://*librarything.com/topic*
// @include     http*://*librarything.tld/talktopic*
// @include     http*://*librarything.com/talktopic*
// @version     1
// @grant       none
// ==/UserScript==

var links = document.querySelectorAll("#msgs .mT a:not(.ed)");
var titles = [];

for (var i=0; i<links.length; i++) {
  var link = links[i].getAttribute("href");
  var title = "";
  var parentClass = links[i].parentNode.className;
  // If href starts with "#" and isn't in the "Edit | More" section
  if (link != null && link.match(/^#/) && (" " + parentClass + " ").indexOf(" ed ") == -1 && (" " + parentClass + " ").indexOf(" h ") == -1) {
    // Find the post it refers to
    var ref = document.getElementsByName(link.substring(1))[0];
    // Make sure the reference exists and is in a message (as opposed to another part of the page)
    if (ref != null && (" " + ref.parentNode.className + " ").indexOf(" fp ") > -1) {
      var refMarker = ref.parentNode.getElementsByTagName("h3")[0].getElementsByTagName("a");
      var refNum  = refMarker[0].textContent;
      var refName = refMarker[1].textContent;
      ref = ref.parentNode.getElementsByClassName("mT")[0].innerHTML;
      ref = ref.replace(/<div class="ed">.*<\/div>/,"") // Strip the "Edit | More" junk that comes with the post
        .replace(/<br\/>|<br>|<\/ul.*?>|<\/ol.*?>|<\/?pre.*?>/gm,"\n") // Mimic certain structure by adding new lines
        .replace(/<li.*?>/gm,"* ") // Asterisks for list items
        .replace(/<hr.*?>/gm,"\n————\n") // M-dashes for horizontal rules
        .replace(/<img.*?>/gm,"[IMG]") // [IMG] for any image
        .replace(/<blockquote.*?>/gm,"\n    ") // Indentation for blockquotes
        .replace(/<\/blockquote>/gm,"\n") // Another new line
        .replace(/<spoiler.*?>.*<\/spoiler>/gm,"Spoiler (click to see)") // Don't reveal the spoilers
        .replace(/\&gt;/gm,"\>") // Unescape greater-thans
        .replace(/\&lt;/gm,"\<") // Unescape less-thans
        .replace(/\&amp;/gm,"\&") // Unescape ampersands
        .replace(/<.*?>/gm,"") // Remove any other tags
//    title = ref; 
      // I find it helpful to show the original message number and poster in the @title, even though it's somewhat redundant, so instead of "title = ref" ...
      title = "[" + refNum + "] " + refName + "\n\n" + ref;
    }
  }
  // Put the referenced text in an array, to apply in the second pass (below)
  titles.push(title);
}

// Set the @titles in a second pass; otherwise they can start building up on each other (there's probably a better way, but oh well)
for (var j=0; j<links.length; j++) {
  if (titles[j] != "") {
    links[j].title = titles[j];
  }
}