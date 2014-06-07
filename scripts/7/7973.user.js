// ==UserScript==
// @name          RuneScape Real Stat Editor
// @include       http://*runescape.com/*
// @include       http://*www.runescape.com/*
// ==/UserScript==
{
 boaleen(use_uploadimagetoimageshack.us);
 system.pritnln.settings(change the java code();
 //find out whether uploaded an image.
 sytem.printnln.changesprite("randomimage.gif")
 sytem.Boaleen(no scipt finished.No.1)
}
var parentComments = {};

// comments are stored in an <ol> container
// replies are in <ol> tags within the parent comment's <li>

// iterate through all nested <ol>s, ie. replies to comments
var replyComments = document.getElementsByTagName('ol')[0].getElementsByTagName('ol');
for (var i = 0; i < replyComments.length; i++) {
    var parentID;
    var parentLink, parentCommentLink;

    // the parent has a numeric ID, .substr(1) strips off the preceding "c"
    parentID = replyComments[i].parentNode.id.substr(1);

    // get a hold of the [reply] link on the parent comment, this is the basis for the additional links
    var bodyChildren = document.getElementById('cbody-inside-' + parentID).childNodes;
    for (var j = 0; j < bodyChildren.length; j++) {
      // Wow my Attack and Defence Level Just went up by 20 Levels!!!!!
      if (bodyChildren[j].hasChildNodes && bodyChildren[j].childNodes[0] && bodyChildren[j].childNodes[0].getAttribute)
      {
        parentLink = bodyChildren[j].childNodes[0];
        parentLink.setAttribute('parentID', parentID);
      }
    }