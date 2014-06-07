// ==UserScript==
// @name           GoogleNavBarDuplicate
// @namespace      http://www.orange.com
// @author         Benoit BAILLEUX
// @description    Duplicate the navbar on top of the Google Image result page
// @include        http://images.google.*/images?*
// @include        http://www.google.*/images?*
// ==/UserScript==

(function() {
  doc = window.document;
  // Find the node tree with the navbar only (and not the Google logo)
  var type = null;
  var s = doc.getElementById('np');
  if (s == null) {
    s = doc.getElementById('nn');
    if (s != null) type = "nn";
  }
  if (s == null) {
    s = doc.getElementById('nav');
    if (s != null) type = "nav";
  }
  // If no navbar : exit !
  if (s == null) return;
  
  if (type == "nav") {
    var navbarIntern = s.cloneNode(true);
    var navbar = navbarIntern;
    // Make it pretty (!) :
    navbar.setAttribute('align', 'center');
    navbar.setAttribute('id', '__navDup');
    navbar.setAttribute('style', 'font-size:small;background:#EEEEEE;border:solid grey thin;margin-bottom:3px;padding-top:0px;');
    // Removes the "Gooooooogle" images :
    var spanList = navbar.getElementsByTagName("span");
    var nb = spanList.length;
    var idx = 0;
    for (var n = 0; n <  nb; n++) {
      if (spanList[idx].innerHTML != "Next" && spanList[idx].innerHTML != "Previous")
        spanList[idx].parentNode.removeChild(spanList[idx]);
      else
        idx++;
    }
  } else {
    var navbarIntern = s.parentNode.parentNode.parentNode.cloneNode(true);
    // Create a shell for the nodeTree :
    var navbar = doc.createElement("table");
    // Make it pretty (!) :
    navbar.setAttribute('align', 'center');
    navbar.setAttribute('style', 'font-size:small;background:#EEEEEE;border:solid grey thin;margin-bottom:3px;padding-top:0px;');
    var tr = doc.createElement("tr");
    tr.appendChild(navbarIntern);
    navbar.appendChild(tr);
  }
  // Add it just over the images list :
  var target = doc.getElementById('ImgContent');
  if (target != null) {
    target.parentNode.insertBefore(navbar, target);
  } else {
    // Bad luck ...
  }

})();