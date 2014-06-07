// ==UserScript==
// @name           userscripts.org - Script Page Links Addition
// @namespace      http://loucypher.wordpress.com/
// @description    Adds save to del.icio.us and other social bookmarking services, Digg and Reddit this script, and subscribe to author's scripts RSS on script page
// @include        http://userscripts.org/scripts/*/*
// ==/UserScript==

// Last updated: 2008-02-19

var list = getXPathNode("//div[@id='right']/p[@class='flag']" +
                        "/following-sibling::*") ||
           getXPathNode("//div[@id='right']/p[@id='install_script']" +
                      "/following-sibling::*");

if (!list || list.nodeName != "UL") return;

var auth = getXPathNode("//div[@class='author']");

var scripts = getXPathNode("//div[@class='author']" +
                           "//a[contains(@href, '/scripts')]");

if (auth && scripts) {  // using feedity.com
  var author = getXPathNode("//div[@class='author']" +
                            "//a[contains(@href, 'users')]/text()").nodeValue;

  var ul, txt, url, img;
  ul = appendNode("ul", auth);
  txt = "Subscribe to " + author + "'s scripts";
  url = "http://feedity.com/?" + scripts.href;
  img = "http://static.userscripts.org/images/feed-icon.png";
  addListItem(ul, img, txt, url);
}

var sURL = encodeURIComponent(document.location.href);

var sTitle = getXPathNode("//div[@id='content']/h1[position()=1]");
    sTitle = sTitle ? encodeURIComponent(sTitle.textContent)
                    : encodeURIComponent(document.title);

var sDesc = getXPathNode("//div[@id='content']/p[preceding-sibling::h1]");
    sDesc = sDesc ? encodeURIComponent(sDesc.textContent) : "";

var bmItems = [
  { txt: "BlinkList",
    url: "http://www.blinklist.com/?Action=Blink/addblink.php" +
         "&Url=" + sURL + "&Title=" + sTitle + "&Description=" + sDesc,
    img: "data:image/gif;base64,\
R0lGODlhCgAKALMAAACK0/9sAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\
AAAAAAAAAAAAACwAAAAACgAKAEAEH1BIASqYsuYbuu9UQHFiBQofNWkjKrog8KVyG1+r\
JUUAOw==" },

  { txt: "del.icio.us",
    url: "http://del.icio.us/post?v=4&jump=close" +
         "&url=" + sURL + "&title=" + sTitle + "&notes=" + sDesc,
    img: "data:image/gif;base64,\
R0lGODlhCgAKALMAAAAAAAAAgAAA/wCAgIAAAN0AAP8AAIAAgIAA/8AAgP8A3YCAgN3d\
3f///wAAAAAAACwAAAAACgAKAAAEG7BJKWqd1Arc9MYe5wEkyZxnaaKMCrCtCrtwBAA7" },

  { txt: "Facebook",
    url: "http://www.facebook.com/sharer.php?u=" + sURL + "&t=" + sTitle,
    img: "data:image/gif;base64,\
R0lGODlhCgAKALMAADtZmEFem0lln05polJtpFhxp2h/r3KItYKVvYucwpmoyam20sLM\
39DX5vn6/AAAACwAAAAACgAKAEAEMHCASecgJx/l0CGV0jhNUk2G4ygncDhFCwTIgrRv\
fIoOc8+BYC4AIAiOgsJhICBEAAA7" },

  { txt: "Furl",
    url: "http://www.furl.net/savedialog.jsp?v=1" +
         "&u=" + sURL + "&t=" + sTitle + "&c=" + sDesc,
    img: "data:image/gif;base64,\
R0lGODlhCgAKALMAAAAAABQAqAcA61YA6alUHM8JAP9uANlnUp8A2f8A9bCDdvOKKNKI\
RtfFANGzsP///ywAAAAACgAKAAAEL/C5Sd17qult1CNGeDkG8TUG8zChCVrXUn7i2tLG\
Fc7gIu0mRaFwMAwLHkllcokAADs=" },

  { txt: "Google Bookmarks",
    url: "http://www.google.com/bookmarks/mark?op=edit&output=popup" +
         "&bkmk=" + sURL + "&title=" + sTitle,
    img: "data:image/gif;base64,\
R0lGODdhCgAKALMAAAAAAyEa1DGaVHjga2GK+mL/j6cAD48AYtcOI+MAWPdONucAvoTg\
Yf///wAAAAAAACwAAAAACgAKAAAEKzAwNigdgrRGSAiaooFbEzQiIZRlqrFot8LpuX2E\
aNpmoXO4kGBCHAwKiAgAOw==" },

  { txt: "Ma.gnolia",
    url: "http://ma.gnolia.com/bookmarklet/popup/add" +
         "?url=" + sURL + "&title=" + sTitle + "&description=" + sDesc,
    img: "data:image/gif;base64,\
R0lGODlhCgAKALMAAAAAACdKeloAImkaZQkA9mEAnWUA83yKb7YqO9oA6p6XbLu7iLPR\
0NbKmP///wAAACwAAAAACgAKAAAEKNDJ5hqV2DGW80DdcSAKgoiVhFhgdZnkdEiBFUiz\
smSLkl2XjsKHiQAAOw==" },

  { txt: "Shadows",
    url: "http://www.shadows.com/bookmark/saveLink.rails" +
         "?page=" + sURL + "&title=" + sTitle,
    img: "data:image/gif;base64,\
R0lGODdhCgAKALMAABQACC4ATxEA+QJp5gCWMRHCLged+U69/fwABf4ATf5LApUA/fkA\
8v+oYKba/eHo+ywAAAAACgAKAAAEK/DJSV+7qlGs8itg9YGF5BzoURDEk76HewyUMZz0\
ZNjn7g8Dw8OxAwJjjwgAOw==" },

  { txt: "Simply",
    url: "http://simpy.com/simpy/LinkAddPopup.do?v=1&src=bookmarklet" +
         "&href=" + sURL + "&title=" + sTitle + "&note=" + sDesc,
    img: "data:image/gif;base64,\
R0lGODlhCgAKALMAAP+ZAP/MZpysu////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\
AAAAAAAAAAAAACH5BAEAAAMALAAAAAAKAAoAAAQfcIA5Rrhyzsv15oEHgEEGVFxVCayg\
ri37xrJKu3OrRgA7" },

  { txt: "Spurl",
    url: "http://www.spurl.net/spurl.php?v=3" +
         "&url=" + sURL + "&title=" + sTitle + "&blocked=" + sDesc,
    img: "data:image/gif;base64,\
R0lGODlhCgAKALMAAGaZzIqx2MXY68zd7v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\
AAAAAAAAAAAAACwAAAAACgAKAAAEGRDISasFJGtKwsWDIArUKAzEF6STtn0wFQEAOw==" },

  { txt: "StumbleUpon",
    url: "http://www.stumbleupon.com/submit" +
         "?url=" + sURL + "&title=" + sTitle + "&newcomment=" + sDesc,
    img: "data:image/gif;base64,\
R0lGODlhCgAKALMAAA/JQwCFv////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\
AAAAAAAAAAAAACwAAAAACgAKAEAEH1AIQKsUIes8geReQF1SSIJYV40TprWiFcDby7mb\
FAEAOw==" },

  { txt: "Technorati Favorites",
    url: "http://technorati.com/faves?sub=favthis&add=" + sURL,
    img: "data:image/gif;base64,\
R0lGODlhCgAKALMAAAAAAAQAPRcAS2kAijywAkKyClq8KWrDPYoAoLQAxdwA4IrQZ7Th\
nsXotf///wAAACwAAAAACgAKAAAEMNCt5lxjjJZSmSHF0RCHVRAoSZopSBjVkRYMunTL\
5KAFVVUjlCW3OJxQhiNv10o5IgA7" },

  { txt: "Yahoo! My Web",
    url: "http://synergy2.search.yahoo.com/myresults/bookmarklet" +
         "?u=" + sURL + "&t=" + sTitle,
    img: "data:image/gif;base64,\
R0lGODlhCgAKAIAAAP8AAP///yH5BAEAAAEALAAAAAAKAAoAAAITjI+ZwAvR4Ivz0GcR\
NphFqIRiAQA7" }
]

var nwItems = [
  { txt: "Digg this script",
    url: "http://digg.com/submit?phase=2&topic=mods" +
         "&url=" + sURL + "&title=" + sTitle + "&bodytext=" + sDesc,
    img: "data:image/gif;base64,\
R0lGODlhCgAKAKIHAFKJwO3z+d7o89zn8tDf7rbN5KzG4f///yH5BAEAAAcALAAAAAAK\
AAoAAAMkeDcAo/CAEEBUQAh7Z2CN0VACFWxjQBRN65VkS61uCp8TUYcJADs=" },

  { txt: "Reddit this script",
    url: "http://reddit.com/submit?url=" + sURL + "&title=" + sTitle,
    img: "data:image/gif;base64,\
R0lGODlhCgAKALMAABUHEjVESkkAMmYAWF5fYX0A/2l2gXyBg/8AAPUAs/0A34GCfa2r\
pb7BvLXS79/z+ywAAAAACgAKAAAELPDJSZ9zkpAQ6utGZznBZlzPAhgUUx7Lg0gzQzyM\
x2BdsxCNj8Rh0BgxHkoEADs=" },

  { txt: "Submit to FoxieWire",
    url: "http://www.foxiewire.com/submit.php?url=" + sURL,
    img: "data:image/gif;base64,\
R0lGODlhCgAKALMAAAMABAYAWVcMBWRPRCgAu6gvBZZBFJllX9hUItoA6KmGad6sjubK\
sv3+/gAAAAAAACwAAAAACgAKAEAEM7DJJSWr7YjT1G2AYBQIsnySUiICpXiDSCJKJSCF\
YhhWM6wUn0C0KxUYKAAHVzmQCsFGBAA7" }

];

appendNode("br", list);

var menu = appendNode("li", list);
    menu.id = "menu";

var link = appendNode("a", menu);
    link.href = "";
    link.addEventListener("click", function(e) {
      e.preventDefault();
      toggleDisplay(this.nextSibling);
    }, false);
    appendText("Share this script", link);

var submenu = appendNode("ul", menu);
    submenu.id = "submenu";
    submenu.style.display = "none";
    submenu.addEventListener("click", function(e) {
      toggleDisplay(this);
    }, false);

window.addEventListener("click", function(e) {
  if (e.target.parentNode.id == "menu") return;
  document.getElementById("submenu").style.display = "none";
}, false);

for (var i in bmItems) {
  addListItem(submenu, bmItems[i].img, bmItems[i].txt, bmItems[i].url, true);
  submenu.getElementsByTagName("li")[i].className = "menuitem";
}

appendNode("br", list);

for (var j in nwItems) {
  addListItem(list, nwItems[j].img, nwItems[j].txt, nwItems[j].url, true);
}

function getXPathNode(aXPath) {
  return document.evaluate(aXPath, document, null, 9, null).singleNodeValue;
}

function appendNode(aNodeName, aParentNode) {
  return aParentNode.appendChild(document.createElement(aNodeName));
}

function appendText(aText, aParentNode) {
  return aParentNode.appendChild(document.createTextNode(aText));
}

function toggleDisplay(aNode) {
  return aNode.style.display =
         aNode.style.display == "none" ? "block" : "none";
}

function addListItem(aNode, aIcon, aText, aURL, aNewTab) {
  var item = appendNode("li", aNode);
      item.style.listStyleImage = aIcon ? "url(" + aIcon + ")" : "none";
  var link = appendNode("a", item);
      link.href = aURL;
      if (aNewTab) {
        link.addEventListener("click", function(e) {
          e.preventDefault();
          GM_openInTab(e.target.href);
        }, false);
      }
      appendText(aText, link);
}

GM_addStyle("\
#menu > a:focus {\
  outline-style: none;\
}\
#submenu {\
  position: absolute;\
  border: 1px solid #08f;\
  border: 1px solid #e57e00;\
  background-color: #f5faff;\
  background-color: #fef8f2;\
  padding: 0 0 0 2em !important;\
}\
.menuitem {\
  font-size: 1em !important;\
}\
.menuitem a {\
  display: block;\
  padding-right: 1em;\
}\
.menuitem a:hover {\
  color: #fff;\
  background-color: #08f;\
  text-decoration: none;\
}");