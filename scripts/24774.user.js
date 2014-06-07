// ==UserScript==
// @name           AMO to FoxieWire
// @namespace      http://zoolcar9.lhukie.net/greasemonkey
// @include        https://addons.mozilla.org/*
// @exclude        https://addons.mozilla.org/*/addons/versions/*
// @description    Submit add-on page on AMO to FoxieWire news site
// ==/UserScript==

var divs = getXPathNodeList("//div[@class='install-container']");

if (!divs.snapshotLength) return;

var div, xpiButts, xpiButt, n, foxieButt, img, addonURL, addonId, appName;
var amoURL = "https://addons.mozilla.org/";
var foxieURL = "http://www.foxiewire.com/submit.php" +
               "?sourceid=Amo+to+FoxieWire&url=";

for (var i = 0; i < divs.snapshotLength; i++) {
  try {
    addonURL = getXPathNodeList("//*[@class='name']/a[@href]").
               snapshotItem(i).href;
  } catch(ex) {
    addonURL = location.href;
  }

  addonId = addonURL.match(/\d+/).toString();
  appName = addonURL.match(/([^\/]+)/g)[3].toString();

  xpiButts = getXPathNodeList(".//a[starts-with(@id, 'installTrigger')]",
                             divs.snapshotItem(i));
  n = 0;
  for (var j = 0; j < xpiButts.snapshotLength; j++) {
    xpiButt = xpiButts.snapshotItem(j);
    if (xpiButt.parentNode.style.display != "none") {
      n++;
      foxieButt = xpiButt.parentNode.appendChild(xpiButt.cloneNode(true));
      while (foxieButt.hasAttributes()) {
        foxieButt.removeAttribute(foxieButt.attributes[0].name);
      }

      getStrong(foxieButt).removeChild(getStrong(foxieButt).firstChild);
      getStrong(foxieButt).style.textAlign = "center";
      getStrong(foxieButt).style.width = getComputedStyle(getStrong(xpiButt),
                                                          "").width;
      img = getStrong(foxieButt).appendChild(document.createElement("img"));
      img.src = "data:image/png;base64,\
iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZ\
G9iZSBJbWFnZVJlYWR5ccllPAAAA19JREFUeNpEk1toHFUYx79zZs7Mzs5u9pJ03U2ybL\
qpSbDFKm0ERRCFYrFg8cVC8UXpU6EvPvRVFEEfvKC+KiiKD6JYEO+KICilMTG2pWyjCYl\
ht7vZ3exl7jPn4pkNXQ/MgTPw/3/f9zv/g4QQMGtqgBHIJSCnqcefmDFf/DcIP5/Ja+Gu\
FbkRF1eXi8lTW71g4Y4TvetRwfdsBrfbPqixrOdzMHUdFjMEDMH4VDr11OML6lmiUkYI4\
ze7wR/DnvJY0SCf7VohTxGstAQVUspHBnFlTVGgG2HA3NkjR4o71XuyJw61N4BVZ6C9ZZ\
3WeBf+qgc/FEz1nBsJ4kT801iJ443LMQRCJaySMoposLblh909H9rDCLb8JCzNFmHX8S7\
lEkrq1VPFD3wqWvLjsXbUQUFXIWMkzh+dLryUGQa/VHR6rL/XhIgpINZqoE+o+7UOr196\
NPcWi6EBtEppAmOD+Uzq9LRBL2iDRrqSTT2dt/eBJQkgXYEcUSGvKpnLD0x+REORbluMH\
slrZYLQ9bFBN6BH788b1YKhdNa7fm8+o1VdJss3GSyUCBQMVUkLnB7R4kht9Oj8tboHYw\
ZN31/ZtMLV2sA/f73vPvR9Y/D6th1BpCHoRMyu9UNXoQiEDzDscziRMc9EVJRjLYpHSml\
qMYFR0Y74+oSCwaI8/3B+Ys3UkLI6sJ/Makri5QcPfVHUyVy9x6QKRR/v9C5+3ei/PxpB\
ejQlnKYsCAmBp48ZyYv3gV7xXNELfBH+HQS3VupBZ4mgOcQRICxIWSGVMYMY61JWj2HBT\
FJ7+5Ep81lTRTClkVypg964ajsv7LbpyqKJT/qIgy9Lbltha2wwnVYAa/JuKAUZlI17l1\
QwpEHAOTxzOH32uK19892qc6s1oKDK/5uBf+1Px/1xzGBxMgGUC2AyGtkkNucntTMXlnO\
vVXNaFSME6QSGzTuh+PJbF2GG4Gdn+Py653zIpGbUge2NQiUTCeCAcP4R4Q1Owdh3mTM7\
QcyOTSEUAmEJ6be2/d5G4H0iU/J/kBR090UISAA6+Vwl/86NzSACBt3lUtI05M3UWpH1U\
9t6Zd2z31QREvhAcmDA2MGByQ6Igud+33a/8jD/tSz0y80dZyjBrd50vSsNGl5R5Eh3xf\
H6T4ABAI2eodevN/03AAAAAElFTkSuQmCC";
      img.align = "left";
      getStrong(foxieButt).appendChild(document.createTextNode("FoxieWire"));

      foxieButt.href = foxieURL + escape(amoURL + appName +
                                         "/addon/" + addonId);
      foxieButt.title = "Submit to FoxieWire";
      foxieButt.addEventListener("click", submitToFoxieWire, false);
    }
    if (n > 1) {
      xpiButts.snapshotItem(j-1).parentNode.removeChild(
      xpiButts.snapshotItem(j-1).parentNode.lastChild);
      divs.snapshotItem(i).parentNode.parentNode
          .style.minHeight = getComputedStyle(divs.snapshotItem(i), "").height;
    }
  }
}

GM_addStyle(".install-button a:not([id]),\n\
.exp .install-button a:not([id]),\n\
.exp-loggedout .install-button a:not([id]) {\n\
  color: #062445 !important;\n\
  background-color: #7cc11c !important;\n\
  background-image: url(/img/installbtn-bg.png) !important;\n\
}\n\
.exp .install-button a:not([id] span,\n\
.exp .install-button a:not([id] span span,\n\
.exp .install-button a:not([id] span span span,\n\
.exp .install-button a:not([id] span span span strong,\n\
.exp-loggedout .install-button a:not([id] span,\n\
.exp-loggedout .install-button a:not([id] span span,\n\
.exp-loggedout .install-button a:not([id] span span span,\n\
.exp-loggedout .install-button a:not([id] span span span strong {\n\
  background-image: url(/img/installbtn-edges-list.png) !important;\n\
}\n\
.install-button a:hover:not([id]),\n\
.install-button a:focus:not([id]),\n\
.install-button a:active:not([id],\n\
.exp .install-button a:hover:not([id]),\n\
.exp .install-button a:focus:not([id]),\n\
.exp .install-button a:active:not([id],\n\
.exp-loggedout .install-button a:hover:not([id]),\n\
.exp-loggedout .install-button a:focus:not([id]),\n\
.exp-loggedout .install-button a:active:not([id]) {\n\
}");


function getXPathNodeList(aXPath, aRoot) {
  return document.evaluate(aXPath, aRoot ? aRoot : document, null, 6, null);
}

function getStrong(aNode) { // funny function name
  return aNode.getElementsByTagName("strong")[0];
}

function submitToFoxieWire(aEvent) {
  aEvent.preventDefault();
  GM_openInTab(this.href);
}

