// ==UserScript==
// @name          Google Link Preview
// @namespace     http://loucypher.wordpress.com/
// @include       http://www.google.*/search?*
// @include       http://www.google.*/custom?*
// @include       http://www.google.*/search%3F*
// @include       http://www.google.*/custom%3F*
// @include       http://www.google.com/blogsearch*
// @description	  Adds Clusty.com-like magnifiers on web and news search results to preview a link in a frame
// ==/UserScript==

// Last updated: 2007-08-03

window.setTimeout(function() {
  var XPath;
  if (location.href.match(/\/blogsearch\?/)) {
    XPath = "//a[starts-with(@id, 'p-') and count(img)=0]";
  } else {
    XPath = "//a[@class='l']";
  }

  var links = document.evaluate(XPath, document, null, 6, null);
  //if (!links.snapshotLength) return;

  for (var i = 0; i < links.snapshotLength; i++) {
    var link = links.snapshotItem(i);
    if(link.hasAttribute("onmousedown")) link.removeAttribute("onmousedown");
  
    var pLink = link.parentNode.insertBefore(document.createElement("a"),
                                             link.nextSibling)
    pLink.href = link.href;
    pLink.title = "preview";
    pLink.style.marginLeft = "1em";
    pLink.addEventListener("click", function(e) {
      e.preventDefault();
      var pOpen = "data:image/gif;base64,\
R0lGODlhDAAMAMIGAKZZWatkYcqfjsyikM2mk9KumfLsyPLsyCH5BAEKAAcALAAAAAAM\
AAwAAAMneEcRpFCFokqIi8Ly4MWfhB1hFnGgZgkj4wjAMEZDPEO1fB%2F5zg8JADs%3D";
      var pClosed = "data:image/gif;base64,\
R0lGODlhDAAMAMIGAMwAAKtkYc2Tk8yikM2mk9KumQAAAAAAACH5BAEKAAcALAAAAAAM\
AAwAAAMyeEcRpFCFokqIix5xytvHtQHcJZDiKAQnR2gqCU1VizEsKWPtYEM%2F307Bgf\
gGGMxgkAAAOw%3D%3D";
      this.firstChild.src = this.firstChild.src == pOpen ? pClosed : pOpen;
      this.title = this.title == "preview"?"close preview":"preview";
      this.nextSibling.style.display = this.nextSibling
                                           .style.display == "none" ? "" : "none";
      if (!this.nextSibling.hasAttribute("src"))
        this.nextSibling.src = this.previousSibling.href;
    }, false);

    var img = pLink.appendChild(document.createElement("img"));
    img.alt = "preview";
    img.border = "none";
    img.align = "absmiddle";
    img.src = "data:image/gif;base64,\
R0lGODlhDAAMAMIGAKZZWatkYcqfjsyikM2mk9KumfLsyPLsyCH5BAEKAAcALAAAAAAM\
AAwAAAMneEcRpFCFokqIi8Ly4MWfhB1hFnGgZgkj4wjAMEZDPEO1fB%2F5zg8JADs%3D";

    var iframe = link.parentNode.insertBefore(document.createElement("iframe"),
                                             pLink.nextSibling);
    iframe.style.display = "none";
    iframe.width = "100%";
    iframe.height = "250";
    iframe.appendChild(document.createTextNode(""));
  }
});