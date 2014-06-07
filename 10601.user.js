// ==UserScript==
// @name           google extra
// @description    Displays results for google image search, video search, wikipedia search and dictionary.com search alongside normal google searches.
// @namespace      znerp
// @include        http://www.google.*/search?*q=*
// ==/UserScript==

var inarrow = "data:image/gif;base64,R0lGODlhDAAMAPcAAAAAAIAAAACAAICAAAAAgIAAgACAgICAgMDAwP8AAAD%2FAP%2F%2FAAAA%2F%"+
              "2F8A%2FwD%2F%2F%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
              "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMwAAZgAAmQAAzAAA%2FwAzAAAzMwAzZgAzmQAzzAAz%2FwBmAABmMwBmZgBmmQBmzABm%2"+
              "FwCZAACZMwCZZgCZmQCZzACZ%2FwDMAADMMwDMZgDMmQDMzADM%2FwD%2FAAD%2FMwD%2FZgD%2FmQD%2FzAD%2F%2FzMAADMAMz"+
              "MAZjMAmTMAzDMA%2FzMzADMzMzMzZjMzmTMzzDMz%2FzNmADNmMzNmZjNmmTNmzDNm%2FzOZADOZMzOZZjOZmTOZzDOZ%2FzPMAD"+
              "PMMzPMZjPMmTPMzDPM%2FzP%2FADP%2FMzP%2FZjP%2FmTP%2FzDP%2F%2F2YAAGYAM2YAZmYAmWYAzGYA%2F2YzAGYzM2YzZmYz"+
              "mWYzzGYz%2F2ZmAGZmM2ZmZmZmmWZmzGZm%2F2aZAGaZM2aZZmaZmWaZzGaZ%2F2bMAGbMM2bMZmbMmWbMzGbM%2F2b%2FAGb%2F"+
              "M2b%2FZmb%2FmWb%2FzGb%2F%2F5kAAJkAM5kAZpkAmZkAzJkA%2F5kzAJkzM5kzZpkzmZkzzJkz%2F5lmAJlmM5lmZplmmZlmzJ"+
              "lm%2F5mZAJmZM5mZZpmZmZmZzJmZ%2F5nMAJnMM5nMZpnMmZnMzJnM%2F5n%2FAJn%2FM5n%2FZpn%2FmZn%2FzJn%2F%2F8wAAM"+
              "wAM8wAZswAmcwAzMwA%2F8wzAMwzM8wzZswzmcwzzMwz%2F8xmAMxmM8xmZsxmmcxmzMxm%2F8yZAMyZM8yZZsyZmcyZzMyZ%2F8"+
              "zMAMzMM8zMZszMmczMzMzM%2F8z%2FAMz%2FM8z%2FZsz%2Fmcz%2FzMz%2F%2F%2F8AAP8AM%2F8AZv8Amf8AzP8A%2F%2F8zAP"+
              "8zM%2F8zZv8zmf8zzP8z%2F%2F9mAP9mM%2F9mZv9mmf9mzP9m%2F%2F%2BZAP%2BZM%2F%2BZZv%2BZmf%2BZzP%2BZ%2F%2F%2"+
              "FMAP%2FMM%2F%2FMZv%2FMmf%2FMzP%2FM%2F%2F%2F%2FAP%2F%2FM%2F%2F%2FZv%2F%2Fmf%2F%2FzP%2F%2F%2FyH5BAEAAA"+
              "8ALAAAAAAMAAwABwgmAB8IHEiw4AMABgsCQJhQ4EKGCR9CVCgx4sOGFzFONLixoUePAQEAOw%3D%3D";
var outarrow= "data:image/gif;base64,R0lGODlhDAAMAPcAAAAAAIAAAACAAICAAAAAgIAAgACAgICAgMDAwP8AAAD%2FAP%2F%2FAAAA%2F%"+
              "2F8A%2FwD%2F%2F%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
              "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMwAAZgAAmQAAzAAA%2FwAzAAAzMwAzZgAzmQAzzAAz%2FwBmAABmMwBmZgBmmQBmzABm%2"+
              "FwCZAACZMwCZZgCZmQCZzACZ%2FwDMAADMMwDMZgDMmQDMzADM%2FwD%2FAAD%2FMwD%2FZgD%2FmQD%2FzAD%2F%2FzMAADMAMz"+
              "MAZjMAmTMAzDMA%2FzMzADMzMzMzZjMzmTMzzDMz%2FzNmADNmMzNmZjNmmTNmzDNm%2FzOZADOZMzOZZjOZmTOZzDOZ%2FzPMAD"+
              "PMMzPMZjPMmTPMzDPM%2FzP%2FADP%2FMzP%2FZjP%2FmTP%2FzDP%2F%2F2YAAGYAM2YAZmYAmWYAzGYA%2F2YzAGYzM2YzZmYz"+
              "mWYzzGYz%2F2ZmAGZmM2ZmZmZmmWZmzGZm%2F2aZAGaZM2aZZmaZmWaZzGaZ%2F2bMAGbMM2bMZmbMmWbMzGbM%2F2b%2FAGb%2F"+
              "M2b%2FZmb%2FmWb%2FzGb%2F%2F5kAAJkAM5kAZpkAmZkAzJkA%2F5kzAJkzM5kzZpkzmZkzzJkz%2F5lmAJlmM5lmZplmmZlmzJ"+
              "lm%2F5mZAJmZM5mZZpmZmZmZzJmZ%2F5nMAJnMM5nMZpnMmZnMzJnM%2F5n%2FAJn%2FM5n%2FZpn%2FmZn%2FzJn%2F%2F8wAAM"+
              "wAM8wAZswAmcwAzMwA%2F8wzAMwzM8wzZswzmcwzzMwz%2F8xmAMxmM8xmZsxmmcxmzMxm%2F8yZAMyZM8yZZsyZmcyZzMyZ%2F8"+
              "zMAMzMM8zMZszMmczMzMzM%2F8z%2FAMz%2FM8z%2FZsz%2Fmcz%2FzMz%2F%2F%2F8AAP8AM%2F8AZv8Amf8AzP8A%2F%2F8zAP"+
              "8zM%2F8zZv8zmf8zzP8z%2F%2F9mAP9mM%2F9mZv9mmf9mzP9m%2F%2F%2BZAP%2BZM%2F%2BZZv%2BZmf%2BZzP%2BZ%2F%2F%2"+
              "FMAP%2FMM%2F%2FMZv%2FMmf%2FMzP%2FM%2F%2F%2F%2FAP%2F%2FM%2F%2F%2FZv%2F%2Fmf%2F%2FzP%2F%2F%2FyH5BAEAAP"+
              "8ALAAAAAAMAAwABwgmAP8JHEiwIEEUBg8iTPgPhUOGDh8ajChxYkSGDSsm1LgRo0eMAQEAOw%3D%3D";
var show    = "data:image/gif;base64,R0lGODlhDAAMAPcAAAAAAIAAAACAAICAAAAAgIAAgACAgICAgMDAwP8AAAD%2FAP%2F%2FAAAA%2F%"+
              "2F8A%2FwD%2F%2F%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
              "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMwAAZgAAmQAAzAAA%2FwAzAAAzMwAzZgAzmQAzzAAz%2FwBmAABmMwBmZgBmmQBmzABm%2"+
              "FwCZAACZMwCZZgCZmQCZzACZ%2FwDMAADMMwDMZgDMmQDMzADM%2FwD%2FAAD%2FMwD%2FZgD%2FmQD%2FzAD%2F%2FzMAADMAMz"+
              "MAZjMAmTMAzDMA%2FzMzADMzMzMzZjMzmTMzzDMz%2FzNmADNmMzNmZjNmmTNmzDNm%2FzOZADOZMzOZZjOZmTOZzDOZ%2FzPMAD"+
              "PMMzPMZjPMmTPMzDPM%2FzP%2FADP%2FMzP%2FZjP%2FmTP%2FzDP%2F%2F2YAAGYAM2YAZmYAmWYAzGYA%2F2YzAGYzM2YzZmYz"+
              "mWYzzGYz%2F2ZmAGZmM2ZmZmZmmWZmzGZm%2F2aZAGaZM2aZZmaZmWaZzGaZ%2F2bMAGbMM2bMZmbMmWbMzGbM%2F2b%2FAGb%2F"+
              "M2b%2FZmb%2FmWb%2FzGb%2F%2F5kAAJkAM5kAZpkAmZkAzJkA%2F5kzAJkzM5kzZpkzmZkzzJkz%2F5lmAJlmM5lmZplmmZlmzJ"+
              "lm%2F5mZAJmZM5mZZpmZmZmZzJmZ%2F5nMAJnMM5nMZpnMmZnMzJnM%2F5n%2FAJn%2FM5n%2FZpn%2FmZn%2FzJn%2F%2F8wAAM"+
              "wAM8wAZswAmcwAzMwA%2F8wzAMwzM8wzZswzmcwzzMwz%2F8xmAMxmM8xmZsxmmcxmzMxm%2F8yZAMyZM8yZZsyZmcyZzMyZ%2F8"+
              "zMAMzMM8zMZszMmczMzMzM%2F8z%2FAMz%2FM8z%2FZsz%2Fmcz%2FzMz%2F%2F%2F8AAP8AM%2F8AZv8Amf8AzP8A%2F%2F8zAP"+
              "8zM%2F8zZv8zmf8zzP8z%2F%2F9mAP9mM%2F9mZv9mmf9mzP9m%2F%2F%2BZAP%2BZM%2F%2BZZv%2BZmf%2BZzP%2BZ%2F%2F%2"+
              "FMAP%2FMM%2F%2FMZv%2FMmf%2FMzP%2FM%2F%2F%2F%2FAP%2F%2FM%2F%2F%2FZv%2F%2Fmf%2F%2FzP%2F%2F%2FyH5BAEAAA"+
              "8ALAAAAAAMAAwABwgpAB8IHEiwoEAAAAwSRKhwIMOGDx4uREix4sGKGA1KVLhRY0KIHSEODAgAOw%3D%3D";
var hide    = "data:image/gif;base64,R0lGODlhDAAMAPcAAAAAAIAAAACAAICAAAAAgIAAgACAgICAgMDAwP8AAAD%2FAP%2F%2FAAAA%2F%"+
              "2F8A%2FwD%2F%2F%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
              "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMwAAZgAAmQAAzAAA%2FwAzAAAzMwAzZgAzmQAzzAAz%2FwBmAABmMwBmZgBmmQBmzABm%2"+
              "FwCZAACZMwCZZgCZmQCZzACZ%2FwDMAADMMwDMZgDMmQDMzADM%2FwD%2FAAD%2FMwD%2FZgD%2FmQD%2FzAD%2F%2FzMAADMAMz"+
              "MAZjMAmTMAzDMA%2FzMzADMzMzMzZjMzmTMzzDMz%2FzNmADNmMzNmZjNmmTNmzDNm%2FzOZADOZMzOZZjOZmTOZzDOZ%2FzPMAD"+
              "PMMzPMZjPMmTPMzDPM%2FzP%2FADP%2FMzP%2FZjP%2FmTP%2FzDP%2F%2F2YAAGYAM2YAZmYAmWYAzGYA%2F2YzAGYzM2YzZmYz"+
              "mWYzzGYz%2F2ZmAGZmM2ZmZmZmmWZmzGZm%2F2aZAGaZM2aZZmaZmWaZzGaZ%2F2bMAGbMM2bMZmbMmWbMzGbM%2F2b%2FAGb%2F"+
              "M2b%2FZmb%2FmWb%2FzGb%2F%2F5kAAJkAM5kAZpkAmZkAzJkA%2F5kzAJkzM5kzZpkzmZkzzJkz%2F5lmAJlmM5lmZplmmZlmzJ"+
              "lm%2F5mZAJmZM5mZZpmZmZmZzJmZ%2F5nMAJnMM5nMZpnMmZnMzJnM%2F5n%2FAJn%2FM5n%2FZpn%2FmZn%2FzJn%2F%2F8wAAM"+
              "wAM8wAZswAmcwAzMwA%2F8wzAMwzM8wzZswzmcwzzMwz%2F8xmAMxmM8xmZsxmmcxmzMxm%2F8yZAMyZM8yZZsyZmcyZzMyZ%2F8"+
              "zMAMzMM8zMZszMmczMzMzM%2F8z%2FAMz%2FM8z%2FZsz%2Fmcz%2FzMz%2F%2F%2F8AAP8AM%2F8AZv8Amf8AzP8A%2F%2F8zAP"+
              "8zM%2F8zZv8zmf8zzP8z%2F%2F9mAP9mM%2F9mZv9mmf9mzP9m%2F%2F%2BZAP%2BZM%2F%2BZZv%2BZmf%2BZzP%2BZ%2F%2F%2"+
              "FMAP%2FMM%2F%2FMZv%2FMmf%2FMzP%2FM%2F%2F%2F%2FAP%2F%2FM%2F%2F%2FZv%2F%2Fmf%2F%2FzP%2F%2F%2FyH5BAEAAA"+
              "8ALAAAAAAMAAwABwgeAB8IHEiwoMGDCBMqNAigocOHAh9KBLCwosWLCwMCADs%3D";
var moveup  = "data:image/gif;base64,R0lGODlhDAAMAPcAAAAAAIAAAACAAICAAAAAgIAAgACAgICAgMDAwP8AAAD%2FAP%2F%2FAAAA%2F%"+
              "2F8A%2FwD%2F%2F%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
              "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMwAAZgAAmQAAzAAA%2FwAzAAAzMwAzZgAzmQAzzAAz%2FwBmAABmMwBmZgBmmQBmzABm%2"+
              "FwCZAACZMwCZZgCZmQCZzACZ%2FwDMAADMMwDMZgDMmQDMzADM%2FwD%2FAAD%2FMwD%2FZgD%2FmQD%2FzAD%2F%2FzMAADMAMz"+
              "MAZjMAmTMAzDMA%2FzMzADMzMzMzZjMzmTMzzDMz%2FzNmADNmMzNmZjNmmTNmzDNm%2FzOZADOZMzOZZjOZmTOZzDOZ%2FzPMAD"+
              "PMMzPMZjPMmTPMzDPM%2FzP%2FADP%2FMzP%2FZjP%2FmTP%2FzDP%2F%2F2YAAGYAM2YAZmYAmWYAzGYA%2F2YzAGYzM2YzZmYz"+
              "mWYzzGYz%2F2ZmAGZmM2ZmZmZmmWZmzGZm%2F2aZAGaZM2aZZmaZmWaZzGaZ%2F2bMAGbMM2bMZmbMmWbMzGbM%2F2b%2FAGb%2F"+
              "M2b%2FZmb%2FmWb%2FzGb%2F%2F5kAAJkAM5kAZpkAmZkAzJkA%2F5kzAJkzM5kzZpkzmZkzzJkz%2F5lmAJlmM5lmZplmmZlmzJ"+
              "lm%2F5mZAJmZM5mZZpmZmZmZzJmZ%2F5nMAJnMM5nMZpnMmZnMzJnM%2F5n%2FAJn%2FM5n%2FZpn%2FmZn%2FzJn%2F%2F8wAAM"+
              "wAM8wAZswAmcwAzMwA%2F8wzAMwzM8wzZswzmcwzzMwz%2F8xmAMxmM8xmZsxmmcxmzMxm%2F8yZAMyZM8yZZsyZmcyZzMyZ%2F8"+
              "zMAMzMM8zMZszMmczMzMzM%2F8z%2FAMz%2FM8z%2FZsz%2Fmcz%2FzMz%2F%2F%2F8AAP8AM%2F8AZv8Amf8AzP8A%2F%2F8zAP"+
              "8zM%2F8zZv8zmf8zzP8z%2F%2F9mAP9mM%2F9mZv9mmf9mzP9m%2F%2F%2BZAP%2BZM%2F%2BZZv%2BZmf%2BZzP%2BZ%2F%2F%2"+
              "FMAP%2FMM%2F%2FMZv%2FMmf%2FMzP%2FM%2F%2F%2F%2FAP%2F%2FM%2F%2F%2FZv%2F%2Fmf%2F%2FzP%2F%2F%2FyH5BAEAAA"+
              "8ALAAAAAAMAAwABwgjAB8IHEiwoMGDAgEgTAhA4cGGEBc6lLgwYcUHExFmvMhRYEAAOw%3D%3D";
var movedown= "data:image/gif;base64,R0lGODlhDAAMAPcAAAAAAIAAAACAAICAAAAAgIAAgACAgICAgMDAwP8AAAD%2FAP%2F%2FAAAA%2F%"+
              "2F8A%2FwD%2F%2F%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
              "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMwAAZgAAmQAAzAAA%2FwAzAAAzMwAzZgAzmQAzzAAz%2FwBmAABmMwBmZgBmmQBmzABm%2"+
              "FwCZAACZMwCZZgCZmQCZzACZ%2FwDMAADMMwDMZgDMmQDMzADM%2FwD%2FAAD%2FMwD%2FZgD%2FmQD%2FzAD%2F%2FzMAADMAMz"+
              "MAZjMAmTMAzDMA%2FzMzADMzMzMzZjMzmTMzzDMz%2FzNmADNmMzNmZjNmmTNmzDNm%2FzOZADOZMzOZZjOZmTOZzDOZ%2FzPMAD"+
              "PMMzPMZjPMmTPMzDPM%2FzP%2FADP%2FMzP%2FZjP%2FmTP%2FzDP%2F%2F2YAAGYAM2YAZmYAmWYAzGYA%2F2YzAGYzM2YzZmYz"+
              "mWYzzGYz%2F2ZmAGZmM2ZmZmZmmWZmzGZm%2F2aZAGaZM2aZZmaZmWaZzGaZ%2F2bMAGbMM2bMZmbMmWbMzGbM%2F2b%2FAGb%2F"+
              "M2b%2FZmb%2FmWb%2FzGb%2F%2F5kAAJkAM5kAZpkAmZkAzJkA%2F5kzAJkzM5kzZpkzmZkzzJkz%2F5lmAJlmM5lmZplmmZlmzJ"+
              "lm%2F5mZAJmZM5mZZpmZmZmZzJmZ%2F5nMAJnMM5nMZpnMmZnMzJnM%2F5n%2FAJn%2FM5n%2FZpn%2FmZn%2FzJn%2F%2F8wAAM"+
              "wAM8wAZswAmcwAzMwA%2F8wzAMwzM8wzZswzmcwzzMwz%2F8xmAMxmM8xmZsxmmcxmzMxm%2F8yZAMyZM8yZZsyZmcyZzMyZ%2F8"+
              "zMAMzMM8zMZszMmczMzMzM%2F8z%2FAMz%2FM8z%2FZsz%2Fmcz%2FzMz%2F%2F%2F8AAP8AM%2F8AZv8Amf8AzP8A%2F%2F8zAP"+
              "8zM%2F8zZv8zmf8zzP8z%2F%2F9mAP9mM%2F9mZv9mmf9mzP9m%2F%2F%2BZAP%2BZM%2F%2BZZv%2BZmf%2BZzP%2BZ%2F%2F%2"+
              "FMAP%2FMM%2F%2FMZv%2FMmf%2FMzP%2FM%2F%2F%2F%2FAP%2F%2FM%2F%2F%2FZv%2F%2Fmf%2F%2FzP%2F%2F%2FyH5BAEAAP"+
              "8ALAAAAAAMAAwABwgjAP8JHEiwoMGDAlEgHKhw4b%2BGCyEilFgQhUWLEzFGdMgRYUAAOw%3D%3D";

popupDiv = document.createElement("div");
popupDiv.setAttribute("id", "imagePopup");
popupDiv.setAttribute("style", "display:none; z-index:99;position:absolute;");
document.body.appendChild(popupDiv);
GM_addStyle('table[align="right"] {display: none ! important;}');
href = document.location.href;
results = document.getElementById("res");
newDiv = document.createElement("div")
newDiv.setAttribute("style", "float: left; max-width:"+(window.innerWidth - 385)+"px;");
while (results.firstChild.nextSibling != document.getElementById("navbar")) {
  stuff = results.firstChild;
  stuff.parentNode.removeChild(stuff);
  newDiv.appendChild(stuff);
}
results.insertBefore(newDiv, results.firstChild);
rightDiv = document.createElement("div");
rightDiv.setAttribute("style", "max-width: 350px; float: right;");
brclear = document.createElement("br");
brclear.setAttribute("clear", "all");
results.insertBefore(brclear, newDiv.nextSibling);

function addImages() {
  imageurl = href.replace('search', 'images');
  if (document.getElementById("image"))
    imageDiv = document.getElementById("image");
  else {
    imageDiv = document.createElement("div");
    imageDiv.setAttribute("class", "image");
    imageDiv.setAttribute("id", "image");
    rightDiv.appendChild(imageDiv);
  }
  GM_xmlhttpRequest({
      method: 'get',
      headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Content-type': 'application/x-www-form-urlencoded'
      },
      url: imageurl,
      onload: function(result) {
        res = result.responseText;
        if (res.indexOf("Suggestions:") == -1) {
          imageDiv.innerHTML = '<table width="100%" cellspacing="0" cellpadding="0" border="0" class="t bt" style="margin-top: 4px;margin-bottom: 2px;" style="margin: 3px;"><td><span id="sd"> Images (<a href="'+imageurl+'">goto</a>) </span></td></table>'
          addTopImages("image");
          if (eval(GM_getValue("show", "[true,true,true,true,true]"))[0]) {
            whatever = res.indexOf('<table align=center border=0')
            end = res.indexOf('<br clear=all>');
            for (i = 0; i < 6; i++) {
              if (res.indexOf('<a href', whatever) < end) {
                image = res.slice(res.indexOf('<a href', whatever),
                                 (whatever = res.indexOf('</a>',res.indexOf('<a href', whatever))+4));
                image = image.replace(/width=\d+ height=\d+/, "width=50"); 
                imageDiv.innerHTML += image + "&nbsp;";
              }
            }
          }
          addEventListeners("image");
          imageImages = imageDiv.getElementsByTagName("img");
          for (i = 4; i < imageImages.length; i++) {
            thisImage = imageImages[i];
            thisImage.addEventListener(
              'mousemove',
              function(event) {
                var x = event.pageX;
                var y = event.pageY;
                source = this.src;
                globalTimer = window.setTimeout(
                  function() { popUp(x,y,source);},
                  10);},
              true);
            thisImage.addEventListener(
              'mouseout',
              function(event) {
                window.clearTimeout(globalTimer);
                document.getElementById('imagePopup').style.display = "none";},
              true);
          }
        }
      }
    });
}

function popUp(x,y,source) {
  obj = document.getElementById('imagePopup');
  obj.innerHTML = "<img src='" + source + "'>"
  obj.style.left = (x - 150) + 'px';
  obj.style.top = (y + 10) +'px';
  obj.style.display = "inline";
}

function toUpCase() {
  return arguments[0].toUpperCase();
}

function addWiki() {
  wikiurl = "http://pt.wikipedia.org/wiki/" + href.substring(href.indexOf("q=") + 2, ((href.indexOf("q=") < href.lastIndexOf("&")) ? href.indexOf("&", href.indexOf("q=")) : href.length)).replace(/%20|\+/g, "_").replace(/%22/g, "").replace(/_[a-z]/g, toUpCase);
  if (document.getElementById("wiki"))
    wikiDiv = document.getElementById("wiki");
  else {
    wikiDiv = document.createElement("div");
    wikiDiv.setAttribute("class", "wiki");
    wikiDiv.setAttribute("id", "wiki");
    GM_addStyle('.wiki {font-size:0.75em;color:#333333;font-family:"Lucida Sans Unicode","Arial Unicode MS","Lucida Sans","Lucida Grande",Verdana,Helvetica,Arial,sans-serif;}'+
                '.wikiContent {overflow:auto;max-height:300px;}');
    rightDiv.appendChild(wikiDiv);
  }
  GM_xmlhttpRequest({
      method: 'get',
      headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Content-type': 'application/x-www-form-urlencoded'
      },
      url: wikiurl,
      onload: function(result) {
        res = result.responseText;
        if (res.indexOf('<p>', res.indexOf('<div id="contentSub">')) != -1) {
          wikiDiv.innerHTML = '<table width="100%" cellspacing="0" cellpadding="0" border="0" class="t bt" style="margin-top: 4px;margin-bottom: 2px;font-family:arial,sans-serif;" style="margin: 3px;"><td><span id="sd"> Wikipedia (<a href="'+wikiurl+'">goto</a>) </span></td></table>'
          addTopImages("wiki");
          if (eval(GM_getValue("show", "[true,true,true,true,true]"))[2]) {
            if (res.indexOf('</b> may refer to:</p>') != -1) {
              endSearch = res.indexOf('<!-- end content -->');
              oldFoo = 0;
              foo = 0;
              while (foo < endSearch) {
                oldFoo = foo;
                foo = res.indexOf('</ul>', foo) + 4;
              }
              wiki = res.slice(res.indexOf('<p><b>'), oldFoo);
            } else if (res.indexOf('<p>"<b>') != -1) {
              wiki = res.slice(res.indexOf('<p>"<b>'),
                               res.indexOf('</p>', res.indexOf('<p>"<b>'))+4);
            } else if (res.indexOf('<p>A <b>') != -1) {
              wiki = res.slice(res.indexOf('<p>A <b>'),
                               res.indexOf('</p>', res.indexOf('<p>A <b>'))+4);
            } else if (res.indexOf('<p>An <b>') != -1) {
              wiki = res.slice(res.indexOf('<p>An <b>'),
                               res.indexOf('</p>', res.indexOf('<p>An <b>'))+4);
            } else if (res.indexOf('<p>The <b>') != -1) {
              wiki = res.slice(res.indexOf('<p>The <b>'),
                               res.indexOf('</p>', res.indexOf('<p>The <b>'))+4);
            } else if (res.indexOf('<p><i><b>') != -1) {
              wiki = res.slice(res.indexOf('<p><i><b>'),
                               res.indexOf('</p>', res.indexOf('<p><i><b>'))+4);
            } else if (res.indexOf('<p><b>') != -1) {
              wiki = res.slice(res.indexOf('<p><b>'),
                               res.indexOf('</p>', res.indexOf('<p><b>'))+4);
            } else {
              wiki = res.slice(res.indexOf('<p>'),
                               res.indexOf('</p>')+4);
            }
            if (res.indexOf('class="image"') != -1) {
              wikiImage = '<img ' + 
                          res.slice(res.indexOf('src=', res.indexOf('class="image"')),
                                    res.indexOf('"', res.indexOf('src=', res.indexOf('class="image"'))+5)+1) +
                          '" style="max-width:100px; float:right; margin-top: 13px; padding: 2px;">';
              //wikiDiv.innerHTML += wikiImage;
            } else if (res.indexOf('class="thumbimage"') != -1) {
              wikiImage = '<img ' + 
                          res.slice(res.indexOf('src=', res.indexOf('class="thumbimage"')),
                                    res.indexOf('"', res.indexOf('src=', res.indexOf('class="thumbimage"'))+5)+1) +
                          '" style="max-width:100px; float:right; margin-top: 13px; padding: 2px;">';
              //wikiDiv.innerHTML += wikiImage;
            }
           wikiDiv.innerHTML += "<div class='wikiContent'>" +
                                ((res.indexOf('class="image"') != -1) ? wikiImage : "") +
                                wiki.replace(/href=\"\//g, "href=\"http://pt.wikipedia.org/") + 
                                "</div>";
          }
        }
        addEventListeners("wiki");
      }
    });
}

function addVideos() {
  videourl = href.replace('search', 'videosearch').replace('www', 'video').replace(/google\..*\//, "google.com/");
  if (document.getElementById("video"))
    videoDiv = document.getElementById("video");
  else {
    videoDiv = document.createElement("div");
    videoDiv.setAttribute("class", "video");
    videoDiv.setAttribute("id", "video");
    GM_addStyle('.video a {font-size:0.9em;}');
    rightDiv.appendChild(videoDiv);
  }
  GM_xmlhttpRequest({
      method: 'get',
      headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Content-type': 'application/x-www-form-urlencoded'
      },
      url: videourl + "&num=4",
      onload: function(result) {
        res = result.responseText;
        if (res.indexOf("Suggestions:") == -1) {
          videoDiv.innerHTML = '<table width="100%" cellspacing="0" cellpadding="0" border="0" class="t bt" style="margin-top: 4px;margin-bottom: 2px;" style="margin: 3px;"><td><span id="sd"> Videos (<a href="'+videourl+'">goto</a>) </span></td></table>'
          addTopImages("video");
          if (eval(GM_getValue("show", "[true,true,true,true,true]"))[1]) {
            videoString = "<table><tbody><tr>"
            whatever = 0;
            for (i = 0; i < 4; i++) {
              whatever = res.indexOf('<div class="SearchResultItem">', whatever + 30);
              if (whatever == -1) break;
              video = "<a href=\"znerp\">" +
                      res.slice(res.indexOf('<img', whatever),
                                res.indexOf('<script', res.indexOf('<img', whatever)));
              video += "<br>" + res.slice(res.indexOf('<div class="Title">', whatever)+19,
                                          res.indexOf('</div>', res.indexOf('<div class="Title">', whatever))) + "<br>";
              videoLocation = res.slice(res.indexOf('<div class="Url">', whatever)+18, 
                                        res.indexOf('</div>', res.indexOf('<div class="Url">', whatever)));
              video = video.replace(/href="(znerp|\/url\?docid=.*)"/g, "href=\"" + videoLocation + "\"");
              videoString += "<td>" + video + "</td>";
              if (i%2 == 1) videoString += "</tr><tr>";
            }
            videoDiv.innerHTML += videoString + "</tr></tbody></table>";
          }
          addEventListeners("video");
        }
      }
    });
}

function addDict() {
  dicturl = "http://dictionary.reference.com/search?q=" + href.substring(href.indexOf("q=") + 2, ((href.indexOf("q=") < href.lastIndexOf("&")) ? href.indexOf("&", href.indexOf("q=")) : href.length));
  if (document.getElementById("dict"))
    dictDiv = document.getElementById("dict");
  else {  
    dictDiv = document.createElement("div");
    dictDiv.setAttribute("class", "dict");
    dictDiv.setAttribute("id", "dict");
    GM_addStyle('.dict .me {display:inline;font-weight:bold;}'+
                '.dict .pg {color:#558811;display:inline;font-style:italic;}'+
                '.dict .prondelim {color:#880000;font-family:"Arial Unicode MS","Lucida Sans Unicode",Helvetica,Arial,sans-serif;}'+
                '.dict .show_spellpr .pron {color:#880000;display:inline;font-family:Verdana,"Arial Unicode MS","Lucida Sans Unicode",Helvetica,Arial,sans-serif;font-size:0.9em;}'+
                '.dict .prongoto {color:#116699;cursor:pointer;font-size:0.9em;text-decoration:underline;}'+
                '.dict table.luna-Ent {background-color:#FFFFFF;color:#333333;display:block;padding-bottom:0pt;width:100%;}'+
                '.dict .ital-inline {display:inline;font-style:italic;}'+
                '.dict * {font-size:95%;line-height:1.25em;margin:0pt;}'+
                '.dict .sectionLabel {color:#558811;display:inline;font-style:italic;}'+
                '.dict .secondary-bf {display:inline;font-weight:bold;}'+
                '.dict .homno {display:inline;font-size:0.7em;vertical-align:top;}'+
                '.dictContent {overflow:auto;max-height:300px;}');
    rightDiv.appendChild(dictDiv);
  }
  GM_xmlhttpRequest({
      method: 'get',
      headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Content-type': 'application/x-www-form-urlencoded'
      },
      url: dicturl,
      onload: function(result) {
        res = result.responseText;
        if (res.indexOf('<div class="luna-Ent">') != -1) {
          dictDiv.innerHTML = '<table width="100%" cellspacing="0" cellpadding="0" border="0" class="t bt" style="margin-top: 4px;margin-bottom: 2px; margin: 3px;"><td><span id="sd" style="font-size:100%;"> Dictionary.com (<a href="'+dicturl+'">goto</a>) </span></td></table>'
          addTopImages("dict");
          if (eval(GM_getValue("show", "[true,true,true,true,true]"))[3]) {
            dict = res.slice(res.indexOf('<div class="luna-Ent">')+22,
                             res.indexOf('</div>', res.indexOf('<div class="luna-Ent">')));
            dictDiv.innerHTML += "<div class='dictContent'>" +
                                 dict.replace(/href=\"\//g, "href=\"http://dictionary.reference.com/") +
                                 "</div>";
          }
          addEventListeners("dict");
        } else if (res.indexOf('<table>') != -1) {
          dictDiv.innerHTML = '<table width="100%" cellspacing="0" cellpadding="0" border="0" class="t bt" style="margin-top: 4px;margin-bottom: 2px; margin: 3px;"><td><span id="sd" style="font-size:100%;"> Dictionary.com (<a href="'+dicturl+'">goto</a>) </span></td></table>'  
          addTopImages("dict");
          if (eval(GM_getValue("show", "[true,true,true,true,true]"))[3]) {
            dict = res.slice(res.indexOf('<td>')+4,
                             res.indexOf('</td>'));
            dictDiv.innerHTML += "<div class='dictContent'>" +
                                 dict.replace(/href=\"\//g, "href=\"http://dictionary.reference.com/") +
                                 "</div>";
          }
          addEventListeners("dict");
        }
      }
    });
}

function addTopImages(div) {
  imageTable = document.getElementById(div).getElementsByTagName("table")[0].getElementsByTagName("tr")[0];
  imageToggleColumn = document.createElement("td");
  imageToggleColumn.setAttribute("style", "width: 100px;");
  imageShowHide = document.createElement("img");
  imageShowHide.src = outarrow;
  imageShowHide.setAttribute("style", "float: right;margin-right: 3px;cursor:pointer;");
  imageShowHide.setAttribute("title", "Expand options");
  imageToggle = document.createElement("img");
  imageToggle.setAttribute("style", "float: right;margin-right: 3px;cursor:pointer;display:none;");
  imageToggle.setAttribute("title", (eval(GM_getValue("show", "[true,true,true,true,true]"))[numberize(div)] ? "Don't s" : "S") + "how these search results");
  imageToggle.src = (eval(GM_getValue("show", "[true,true,true,true,true]"))[numberize(div)] ? hide : show);
  imageMoveUp = document.createElement("img");
  imageMoveUp.src = moveup;
  imageMoveUp.setAttribute("style", "float: right;margin-right: 3px;cursor:pointer;display:none;");
  imageMoveUp.setAttribute("title", "Move up in list");
  imageMoveDown = document.createElement("img");
  imageMoveDown.src = movedown;
  imageMoveDown.setAttribute("style", "float: right;margin-right: 3px;cursor:pointer;display:none;");
  imageMoveDown.setAttribute("title", "Move down in list");

  imageToggleColumn.appendChild(imageMoveUp);
  imageToggleColumn.appendChild(imageMoveDown);
  imageToggleColumn.appendChild(imageToggle);
  imageToggleColumn.appendChild(imageShowHide);
  imageTable.appendChild(imageToggleColumn);
}

function addEventListeners (div) {
  // up arrow
  document.getElementById(div).getElementsByTagName("img")[0].addEventListener(
    'click',
    function() {
      if (document.getElementById(div).previousSibling) {
        for (i = 1; i < 5; i++)
          if (eval(GM_getValue("order", "[0,1,2,3,4]"))[i] == numberize(div)) {
            tempThing = eval(GM_getValue("order", "[0,1,2,3,4]"));
            tempThing[i] = tempThing[i-1];
            tempThing[i-1] = numberize(div);
            GM_setValue("order", uneval(tempThing));
            break;
          }
        document.getElementById(div).parentNode.insertBefore(document.getElementById(div), document.getElementById(div).previousSibling);
      }
    },
    false);
  // down arrow
  document.getElementById(div).getElementsByTagName("img")[1].addEventListener(
    'click',
    function() {
      if (document.getElementById(div).nextSibling) {
        for (i = 0; i < 4; i++)
          if (eval(GM_getValue("order", "[0,1,2,3,4]"))[i] == numberize(div)) {
            tempThing = eval(GM_getValue("order", "[0,1,2,3,4]"));
            tempThing[i] = tempThing[i+1];
            tempThing[i+1] = numberize(div);
            GM_setValue("order", uneval(tempThing));
            break;
          }
        document.getElementById(div).parentNode.insertBefore(document.getElementById(div), document.getElementById(div).nextSibling.nextSibling);
      }
    },
    false);
  // plus/minus
  document.getElementById(div).getElementsByTagName("img")[2].addEventListener(
    "click", 
    function() {
      znerp = eval(GM_getValue("show", "[true,true,true,true,true]"));
      znerp[numberize(div)] = !znerp[numberize(div)];
      GM_setValue("show", uneval(znerp));
      if (this.src == hide)
        while (document.getElementById(div).getElementsByTagName("table")[0].nextSibling)
          document.getElementById(div).getElementsByTagName("table")[0].parentNode.removeChild(document.getElementById(div).getElementsByTagName("table")[0].nextSibling);
      else 
        switch (div) {
          case ("image"): addImages(); break;
          case ("wiki"): addWiki(); break;
	  case ("video"): addVideos(); break;
          case ("dict"): addDict(); break;
        }
      this.src = ((this.src == show) ? hide : show);
    },
    false);
  // in/out arrow
  document.getElementById(div).getElementsByTagName("img")[3].addEventListener(
    'click',
    function() { 
      for (i = 0; i < 3; i++)
        document.getElementById(div).getElementsByTagName("img")[i].style.display = ((document.getElementById(div).getElementsByTagName("img")[i].style.display == "none") ? "inline" : "none");
      this.src = ((this.src == outarrow) ? inarrow : outarrow);
      this.setAttribute("title", (this.src == outarrow) ? "Expand options" : "Hide options");
    },
    false);
}

function numberize(div) {
  switch (div) {
    case ("image"): return 0; break;
    case ("wiki"): return 2; break;    
    case ("video"): return 1; break;
    case ("dict"): return 3; break;
  }
}

for (i = 0; i < 5; i++) {
  switch (eval(GM_getValue("order", "[0,1,2,3,4]"))[i]) {
    case 0: addImages(); break;
    case 1: addVideos(); break;
    case 2: addWiki(); break;
    case 3: addDict(); break;
  }
}

GM_registerMenuCommand((GM_getValue("Dict.CN", false) ? "Don't s" : "S") + "how Dict.CN results in future.", GM_setValue("Dict.CN", !(GM_getValue("Dict.CN", false))));

results.insertBefore(rightDiv, results.firstChild);