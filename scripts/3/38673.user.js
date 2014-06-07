// ==UserScript==

// @name           Silkroad Forum Script - Side
// @namespace      Silkroad Forum Script - Side
// @description    A Little Script To Make Browsing SRF On PHPBB3 That Little Bit Easier by StealMySoda Editted by Penfold
// @include        http://www.silkroadforums.com/*



// position:fixed means stay fixed even the page scrolls. z-index keeps your iframe on top.
// The remainder of the line smacks the panel into the bottom left corner, out of your way.
// Overflow (in combination with the setTimeout) ensures the iframe fits your entire panel.
var css = 'position:fixed; z-index:9999; border:1px solid gray; ' +
          'bottom: 0 !important; left:5px; width:135px; height:335px; overflow:hidden;';

var iframe = document.createElement('iframe');
iframe.setAttribute('style', css);

// The about:blank page becomes a blank(!) canvas to modify
iframe.src = 'about:blank';

document.body.appendChild(iframe);

// Make sure Firefox initializes the DOM before we try to use it.
iframe.addEventListener("load", function() {
    var doc = iframe.contentDocument;
    doc.body.innerHTML = '<style type="text/css">' +
    'a.slide:link	 { text-decoration: none; color : black; font-size:9px; font-family: verdana;}' +
    'a.slide:visited { text-decoration: none; color : black; font-size:9px; font-family: verdana;}' +
    'a.slide:hover   { text-decoration: underline; color : blue; font-size:9px; font-family: verdana;}' +
    'body { background-image:url(http://www.silkroadforums.com/images/navbackground.jpg); background-repeat:repeat;}</style><div style="' +
    'line-height: 10pt;">' +
    '<img src="http://www.silkroadforums.com/images/arrow1.gif"> <a class="slide" target="_parent" href="http://www.silkroadforums.com">Forum Home</a><img src="http://www.silkroadforums.com/images/navspacer.gif" width="115px" height="18px"><br><img src="http://www.silkroadforums.com/images/arrow1.gif"> <a class="slide" target="_parent" href="http://www.silkroadforums.com/viewforum.php?f=1">Announcements</a><br><img src="http://www.silkroadforums.com/images/arrow1.gif"> <a class="slide" target="_parent" href="http://www.silkroadforums.com/viewforum.php?f=3">Technical Help</a><br><img src="http://www.silkroadforums.com/images/arrow1.gif"> <a class="slide" target="_parent" href="http://www.silkroadforums.com/viewforum.php?f=9">Site Discussion</a><br><img src="http://www.silkroadforums.com/images/navspacer.gif" width="115px" height="18px"><br><img src="http://www.silkroadforums.com/images/arrow1.gif"> <a class="slide" target="_parent" href="http://www.silkroadforums.com/viewforum.php?f=2">General Discussion</a><br><img src="http://www.silkroadforums.com/images/arrow1.gif"> <a class="slide" target="_parent" href="http://www.silkroadforums.com/viewforum.php?f=72">Exposed Botters</a><br><img src="http://www.silkroadforums.com/images/arrow1.gif"> <a class="slide" target="_parent" href="http://www.silkroadforums.com/viewforum.php?f=4">Characters Skills</a><br><img src="http://www.silkroadforums.com/images/arrow1.gif"> <a class="slide" target="_parent" href="http://www.silkroadforums.com/viewforum.php?f=5">Guides Tutorials</a><br><img src="http://www.silkroadforums.com/images/arrow1.gif"> <a class="slide" target="_parent" href="http://www.silkroadforums.com/viewforum.php?f=29">Questions Answers</a><br><img src="http://www.silkroadforums.com/images/arrow1.gif"> <a class="slide" target="_parent" href="http://www.silkroadforums.com/viewforum.php?f=7">The Marketplace</a><br><img src="http://www.silkroadforums.com/images/arrow1.gif"> <a class="slide" target="_parent" href="http://www.silkroadforums.com/viewforum.php?f=45">Other SRO Versions</a><br><img src="http://www.silkroadforums.com/images/arrow1.gif"> <a class="slide" target="_parent" href="http://www.silkroadforums.com/viewforum.php?f=66">Guilds &amp; Clans</a><br><img src="http://www.silkroadforums.com/images/navspacer.gif" width="115px" height="18px"><br><img src="http://www.silkroadforums.com/images/arrow1.gif"> <a class="slide" target="_parent" href="http://www.silkroadforums.com/viewforum.php?f=12">Off Topic Lounge</a><br><img src="http://www.silkroadforums.com/images/arrow1.gif"> <a class="slide" target="_parent" href="http://www.silkroadforums.com/viewforum.php?f=76">Other Games</a><br><img src="http://www.silkroadforums.com/images/arrow1.gif"> <a class="slide" target="_parent" href="http://www.silkroadforums.com/viewforum.php?f=11">Artists Corner</a><br><img src="http://www.silkroadforums.com/images/arrow1.gif"> <a class="slide" target="_parent" href="http://www.silkroadforums.com/viewforum.php?f=56">Sig Requests</a><br><img src="http://www.silkroadforums.com/images/navspacer.gif" width="115px" height="18px"><br><img src="http://www.silkroadforums.com/images/arrow1.gif"> <a class="slide" target="_parent" href="http://www.socialexiles.com/">Social Exiles</a><br></div>' ;
}, false);
// ==/UserScript==