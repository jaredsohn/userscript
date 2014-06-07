// ==UserScript==
// @name               last.fm Related Links
// @description        Adds some external links to artist pages
// @include            http://www.last.fm/music/*
// ==/UserScript==

var lastHL
lastHL = document.getElementById('LastHeadline');

if (lastHL) {
  var re = new RegExp(">([^>]+)</a></h1>","gm");
  var OK = new Array();

  OK = re.exec(lastHL.innerHTML);
  if(OK)
  {
    var myHL = new String(lastHL.innerHTML)

    myHL = myHL.replace(/<\/h1>/,
    '<img src="http://static.last.fm/depth/h1/caret.gif" alt="-" width="14" height="15" hspace="2"/>' +

    '<a target="warez" href="http://www.google.com/search?q=artists&q=' + OK[1] + '">' +
    '<img src="http://www.google.com/favicon.ico" border="0" height="16" width="16" hspace="2"/></a>' +
    '<a target="warez" href="http://www.discogs.com/search?type=artists&q=' + OK[1] + '">' +
    '<img style="background-color:#a6a8a8" src="http://www.discogs.com/favicon.ico" border="0" height="16" width="16" hspace="2"/></a>' +
    '<a target="warez" href="itms://phobos.apple.com/WebObjects/MZSearch.woa/wa/com.apple.jingle.search.DirectAction/search?term=' + OK[1] + '">' +
    '<img src="http://www.apple.com/favicon.ico" border="0" height="16" width="16" hspace="2"/></a>' +
    '<a target="warez" href="http://torrentspy.com/search.asp?query=' + OK[1] + '">' +
    '<img style="background-color:white" src="http://www.torrentspy.com/favicon.ico" border="0" height="16" width="16" hspace="2"/></a>' +
    '<a target="warez" href="http://www.demonoid.com/files/?category=2&query=' + OK[1] + '">' +
    '<img  style="background-color:#a6a8a8" src="http://www.demonoid.com/favicon.ico" border="0" height="16" width="16" hspace="2"/></a>' +
    '<a target="warez" href="http://thepiratebay.org/search/' + OK[1] + '/0/0/100">' +
    '<img src="http://www.thepiratebay.org/favicon.ico" border="0" height="16" width="16" hspace="2"/></a>' +
    '<a target="warez" href="http://oink.me.uk/search.php?exactartist=1&artist=' + OK[1] + '">' +
    '<img src="http://oink.me.uk/favicon.ico" border="0" height="16" width="16" hspace="2"/></a>' +
    '<a target="warez" href="http://www.mininova.org/search/?search=' + OK[1] + '">' +
    '<img src="http://www.mininova.org/favicon.ico" border="0" height="16" width="16" hspace="2"/></a>' +
    '<a target="warez" href="http://torrentspy.com/search.asp?query=' + OK[1] + '">' +
    '<img style="background-color:white" src="http://www.torrentspy.com/favicon.ico" border="0" height="16" width="16" hspace="2"/></a>' +
    '<a target="warez" href="http://www.ticketmaster.com/search/?keyword=' + OK[1] + '">' +
    '<img style="background-color:white" src="http://www.ticketmaster.com/favicon.ico" border="0" height="16" width="16" hspace="2"/></a>' +
    '<a target="warez" href="http://upcoming.org/search/?metro=nearme&type=Events&q=' + OK[1] + '">' +
    '<img style="background-color:white" src="http://www.upcoming.org/favicon.ico" border="0" height="16" width="16" hspace="2"/></a>' +
    "</h1>");

    lastHL.innerHTML = myHL;
  }
}