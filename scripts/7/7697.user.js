// ==UserScript==
// @name          userscripts.org - Direct Links to Scripts
// @namespace     http://loucypher.wordpress.com/
// @include       http://userscripts.org/
// @include       http://userscripts.org/?page=*
// @include       http://userscripts.org/tag/*
// @include       http://userscripts.org/tags/*
// @include       http://userscripts.org/users/*;scripts
// @include       http://userscripts.org/scripts/search?q=*&commit=Search
// @description	  Add icons for direct link to scripts on the scripts list
// ==/UserScript==

var xpath = "//a[@class='title' and starts-with(@href, '/scripts/show/')]";
var links = document.evaluate(xpath, document, null, 6, null);
if (!links.snapshotLength) return;

var icon = "data:image/png;base64,\
iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAEG0lE\
QVR4AQEQBO/7Af///wAAAAAAzeP8/wsF/gD+/v0A/vz8AP39/gD8/f0A//39AP79/ADx+gEAyMrJ\
fH1mT4UAAAAAAAAAAAAAAAAB////AAAAAADl8f3/GA0CAP3+AAD+/gAA/f4AAP3+AAD9/gAA/f4A\
AODt9wCx3fkA+dG8tYpzVUwAAAAAAAAAAAIAAAAAAAAAAP79/QD9/wEA/v8BAP3/AQD9/wEA/f8B\
AP3/AQD9/wEA9ff+AM3qBgDJAjRLeYehrAAAAAAAAAAABAAAAAAAAAAA/f39AP7+AAD9/gAA/f4A\
AP3+AAD+/gAA/v4AAP7+AAAfFAoAbh77AO8OGQDY2BRTAAAAAAAAAAACAAAAAAAAAAD+/f0A/f4A\
AP3+AAD9/gAA/f3+APv8/QD7/P0A/P3+AAEBAQAmJQYAJykGAAL//wAAAAAAAAAAAAQAAAAAAAAA\
AP7+/gD9/gAA/f4AAPPk2gDXmWYA+fTxAAcPFAARUYcAER8vAAECBAD//wAAAAD/AAAAAAAAAAAA\
AgAAAAAAAAAA/f39AP3+/wD26+QA67KMAB0eMAAF+vgAHhwtAPu9kADr5NsA+fr7AP7/AAAAAAAA\
AAAAAAAAAAAEAAAAAAAAAAD+/fwA6MmxAN6rgwBDW4sA5vH2ADswSgDx+P0AE/fnAMunagD1NV8A\
CC5XAAAAAAAAAAAAAAAAAAIAAAAAAAAAAP39/gD0598A8t/SAP/+/QBwiosA2eTqAISbnAD+/PsA\
8dfDAOfZzAD29fQAAAAAAAAAAAAAAAAAAgAAAAAAAAAA/v7+AAwuSgAJERgA5tnFAJZ6egDz9vUA\
gGhnAO3k1gALFBwA7hEuAAECAwAAAAAAAAAAAAAAAAAEAAAAAAAAAAD+/PwACRUhACEzTAAJHzgA\
FhISAPb49wAWExIAAi5MAAEEBADlDyEABwgMAAAAAAAAAAAAAAAAAAQAAAAAAAAAAP79/QD/AAMA\
+gIBANna0wCt4+sABwYGAL7KywAiFQ0ADfv1AAUUCAABAgIAAAAAAAAAAAAAAAAAAgAAAAAAAAAA\
/v7+AP8AAAD6MV0A/+rKAEAY9wA+GgAAPBb2AALtzgDF/ioAERQZAAAAAgAAAAAAAAAAAAAAAAAE\
AAAAAAAAAAD9/fwA/v8CABAiMwDjBIUA4ODFAOvf1wAJFCMA5xxAACAhKQAWGB8A/wABAAAAAAAA\
AAAAAAAAAAQAAAAAAAAAAPP3BAAB8/0A//8CAA4TIAD3ChcAFyL3AP//AAASBgkABgcJAP7/AgDz\
/v4AAQECAAAAAAAAAAAABAAAAAAAAAAA0dPfvvn40kL+/PsA////AAD+/wAAAAAAAAAAAAAAAAAA\
AAAAAAAAAAECAgD8+vYAAAAAAAAAAACoGUXIN7q/FgAAAABJRU5ErkJggg=="

var link, script, image;
for (var i = 0; i < links.snapshotLength; i++) {
  link = links.snapshotItem(i);
  script = link.cloneNode(false);
  script.href = link.href.replace(/show/, "source");
  script.href += ".user.js";
  image = script.appendChild(document.createElement("img"));
  image.setAttribute("src", icon);
  image.setAttribute("hspace", 2);
  image.setAttribute("title", "Install/view script");
  link.parentNode.insertBefore(script, link);
}

