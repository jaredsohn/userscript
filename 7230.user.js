/*
    Google Image Relinker
    links to point directly at the images
    Patrick Cavit, pcavit@gmail.com
    http://patcavit.com

    Modified version to work with new Google Image Search
    "Copy, use, modify, spread as you see fit.
    Massive thanks go out to Eric Hamiter, this code
    is just a quick modification of his extesion at
    http://roachfiend.com/"
*/

// ==UserScript==
// @name          Google Image Relinker Fixed
// @namespace     http://pile0nades.wordpress.com/
// @description   Rewrites Google Image Search links to point straight to the pictures. Now unbroken.
// @include       http://images.google.tld/*
// ==/UserScript==

(function() {
  function selectNodes(doc, context, xpath) {
     var nodes = doc.evaluate(xpath, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
     var result = [];
     for (var x=0; x<nodes.snapshotLength; x++) {
        result.push(nodes.snapshotItem(x));
     }
     return result;
  }
  
  doc = window.document;
  
  // Get a list of all A tags that have an href attribute containing the start and stop key strings.
  var googLinks = selectNodes(doc, doc.body, "//a[contains(@href,'/imgres?imgurl=')][contains(@href,'&imgrefurl=')]");
  var pagetitles = selectNodes(doc, doc.body, "/html/body/table/tbody/tr[2]/td/font");
  var pagetitlesNew = selectNodes(doc, doc.body, "//div[@id='ImgContent']/table/tbody/tr/td[starts-with(@id, 'tDataText')]/font");
  
  for(var x=0; x<googLinks.length; x++) {
    // Capture the stuff between the start and stop key strings.
    var gmatch = googLinks[x].href.match( /\/imgres\?imgurl\=(.*?)\&imgrefurl\=/ );
    var pagematch = googLinks[x].href.match( /&imgrefurl\=(.*?)\&h\=/ );
    
    // If it matched successfully...
    if(gmatch) {
      // Replace the link's href with the contents of the text captured in the regular expression's parenthesis.
      googLinks[x].href = decodeURI(gmatch[1]);
    }
    
    // If it matched successfully...
    if(pagematch) {
      // Add a link to the page
      if(pagetitles.length != 0) {
        pagetitles[x].innerHTML = "<a href='"+decodeURI(pagematch[1])+"'>" + pagetitles[x].innerHTML.replace(/\<br/, "</a><br");
      }
      else {
        pagetitlesNew[x].innerHTML = "<a href='"+decodeURI(pagematch[1])+"'>" + pagetitlesNew[x].innerHTML.replace(/\<br/, "</a><br");
      }
    }
    
  }

})();