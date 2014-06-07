// ==UserScript==

// @name           iFilm Video link (ver. 0.0.2)

// @namespace      http://larytet.sf.net/myscripts

// @description    Adds link to ASX file above embedded video object. Click "Watch Now!" as usual. Look at the top of the pop-up window for the link "click to watch". Click the link or use "Copy link location" menu in Firefox. Use the link to play the video in your favorite media player. In case of Linux you will need RealAudio codecs (see xine FAQ http://xinehq.de/index.php/faq). This script requires GreaseMonkey extension and Firefox browser

// @include        http://*ifilm.com/*

// ==/UserScript==

{
    // fetch source
    hrefLinkValue = document.baseURI;

    // make sure that the link is what i expect - ?ifilmId=...
    if (hrefLinkValue.indexOf("?ifilmId=") == -1)  
      return;
    if (!self.dl)  // dl (means dynamic link ?) is not defined yet, wait more
    {
      return;
    }
    if (document.getElementById("linkToASX"))  //already added
    {
      return;
    }

    filmId = hrefLinkValue.replace(/^(.+\?)(ifilmId=\d+)(\&pg.+)$/, '$2');
    url = 'http://www.ifilm.com/WMPPlaylist.asx?l=' + dl + '&' + filmId + ',-1&bandwidth=300';

    // create new node 
    var newlink = document.createElement("div");
    newlink.innerHTML = '<div id="linkToASX" style="margin: 0 auto 0 auto; ' +
      'border-bottom: 1px solid #000000; margin-bottom: 5px; ' +
      'font-size: large; background-color: #303030; ' +
      'color: #FFFFFF;"><p style="margin: 2px 0 1px 0;">' +
      '<a href="' + url + '">click to watch</a></div>';

    //  link.parent.parent.insertBefore(newlink, link);
    document.body.insertBefore(newlink, document.body.firstChild);
    
    GM_log("added href= "+url);
}
