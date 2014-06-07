// ==UserScript==
// @name           LJ/DW Lyricwiki Linker
// @namespace      http://axisofevil.net/~xtina/
// @description    Creates a link to Lyricwiki for the Music field.
// @include        http://*.dreamwidth.org/update*
// @include        http://*.livejournal.com/update.bml*
// @include        http://*.dreamwidth.org/editjournal*
// @include        http://*.livejournal.com/editjournal.bml*
// ==/UserScript==

// ## You can change these.

// The text of the label.  The colon is in the script below because I'm picky
// about linked words being:  _Music_:
var theText = "Music";

// How do you format your songs?  If you know regular expressions, then this is
// dirt-simple.  Otherwise, just stick with this, and change only the separator
// and the order of title/artist.
var strMatch = /^(.*) - (.*)$/;

// Which is where?
var theArtist = 2;
var theTitle = 1;

// ## EDIT NO FURTHER ## //

var musicItem = document.getElementById("prop_current_music");

if (musicItem) {
	musicItem.setAttribute("onBlur", "var musicBox = document.getElementById(\"prop_current_music\"); var musicLabel = musicBox.previousSibling.previousSibling; var musicLink = \"<a target=\\\"_blank\\\" \"; var theMatch = musicBox.value.match(" + strMatch + ");  if (theMatch) { var musicHref = \"http://lyrics.wikia.com/\"; musicHref += theMatch[" + theArtist + "] + \":\" + theMatch[" + theTitle + "]; musicLink += \"href=\\\"\" + musicHref + \"\\\">" + theText + "</a>:\"; musicLabel.innerHTML = musicLink; } else { musicLabel.innerHTML = \"" + theText + ":\"; }");
	document.getElementsByTagName("body")[0].setAttribute("onLoad", "var musicBox = document.getElementById(\"prop_current_music\"); var musicLabel = musicBox.previousSibling.previousSibling; var musicLink = \"<a target=\\\"_blank\\\" \"; var theMatch = musicBox.value.match(" + strMatch + ");  if (theMatch) { var musicHref = \"http://lyrics.wikia.com/\"; musicHref += theMatch[" + theArtist + "] + \":\" + theMatch[" + theTitle + "]; musicLink += \"href=\\\"\" + musicHref + \"\\\">" + theText + "</a>:\"; musicLabel.innerHTML = musicLink; } else { musicLabel.innerHTML = \"" + theText + ":\"; }");
}
