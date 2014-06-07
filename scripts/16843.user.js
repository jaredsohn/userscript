// ==UserScript==
// @name           Google Extra - Lite Version
// @description    Just displays results from Google image search with regular search results.
// @namespace      Bob Sugar (based on / or more accurately, hacked out of znerp's outstanding Google Extra Script.)
// @include        http://www.google.*/search?*q=*
// ==/UserScript==

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

function sqr(x) { return (x*x) }
x = 0;
y = 0;
popupDiv = document.createElement("div");
popupDiv.setAttribute("id", "imagePopup");
popupDiv.setAttribute("style", "display:none; z-index:99;position:absolute;");

popupDiv.addEventListener(
  'mouseover',
  function(event) { this.style.display = "inline";},
  true);
popupDiv.addEventListener(
  'mouseout',
  function(event) {
    window.clearTimeout(globalTimer);
    this.style.display = "none";},
  true);
popupDiv.addEventListener(
  'mousemove',
  function(e) {
    if (sqr(x - e.pageX) + sqr(y - e.pageY) > 400) {
      window.clearTimeout(globalTimer);
      this.style.display = "none";
    }
  },
  true);

document.body.appendChild(popupDiv);
GM_addStyle('table[align="right"] {display: none ! important;}');
href = document.location.href;
results = document.getElementById("res");
newDiv = document.createElement("div")
newDiv.setAttribute("class", "leftColumn");
style = document.getElementsByTagName('head')[0].appendChild(document.createElement('style'));
style.type = 'text/css';
style.innerHTML = "#leftColumn {float: left; max-width:"+(window.innerWidth - 385)+"px;}";
while (results.firstChild.nextSibling != document.getElementById("navbar"))
  newDiv.appendChild((stuff = results.firstChild).parentNode.removeChild(stuff));
if (results.firstChild.nextSibling == null)
  newDiv.appendChild((stuff = results.firstChild).parentNode.removeChild(stuff));
results.insertBefore(newDiv, results.firstChild);
rightDiv = document.createElement("div");
rightDiv.setAttribute("id", "google_extra");
rightDiv.setAttribute("style", "max-width: 350px; float: right; background: #ffffff; padding-left: 10px;");
brclear = document.createElement("br");
brclear.setAttribute("clear", "all");
results.insertBefore(brclear, newDiv.nextSibling);

function addImages() {
  imageurl = href.replace('search', 'images').replace('www', 'images');
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
          imageDiv.innerHTML = '<table width="100%" cellspacing="0" cellpadding="0" border="0" class="t bt" style="margin-top: 4px;margin-bottom: 2px;" style="margin: 3px;"><td><span id="sd"><a href="'+imageurl+'">Images</a></span></td></table>'
          addTopImages("image");
          if (eval(GM_getValue("show", "[true,true,true,true,true]"))[0]) {
            whatever = res.indexOf('<table align=center border=0')
            end = res.indexOf('<br clear=all>');
            for (i = 0; i < 6; i++) {
              if (res.indexOf('<a href', whatever) < end) {
                image = res.slice(res.indexOf('<a href', whatever),
                                 (whatever = res.indexOf('</a>',res.indexOf('<a href', whatever))+4));
                image = image.replace(/width=\d+ height=\d+/, "style='max-width: 50px;'"); 
                imageDiv.innerHTML += image + "&nbsp;";
              }
            }
          }
          addEventListeners("image");
          imageImages = imageDiv.getElementsByTagName("img");
          for (i = 3; i < imageImages.length; i++) {
            thisImage = imageImages[i];
            thisImage.addEventListener(
              'mousemove',
              function(event) {
                x = event.pageX;
                y = event.pageY;
                var h = this.parentNode.href.match(/&h=(\d+)&/)[1];
                var w = this.parentNode.href.match(/&w=(\d+)&/)[1];
                source = (w > 50) ? this.parentNode.href.slice(this.parentNode.href.indexOf("imgurl=") + 7, 
                                                               this.parentNode.href.indexOf("&", this.parentNode.href.indexOf("imgurl="))).replace(/%25/g, "%")
                                  : this.src;
                globalTimer = window.setTimeout(
                  function() { popUp(h,w,x,y,source);},
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

function popUp(h,w,x,y,source) {
  obj = document.getElementById('imagePopup');
  obj.innerHTML = "<img src='" + source + "' style='max-width: 500px; max-height: 500px;'>"
  obj.style.left = (x - Math.min(w, (w*500)/h, 500)) + 'px';
  obj.style.top = y +'px';
  obj.style.display = "inline";
}


function toUpCase() {
  return arguments[0].toUpperCase();
}

function addTopImages(div) {
  imageTable = document.getElementById(div).getElementsByTagName("table")[0].getElementsByTagName("tr")[0];
  imageToggleColumn = document.createElement("td");
  imageToggleColumn.setAttribute("style", "width: 100px;");
  imageToggle = document.createElement("img");
  imageToggle.setAttribute("style", "float: right;margin-right: 3px;cursor:pointer;");
  imageToggle.setAttribute("title", (eval(GM_getValue("show", "[true,true,true,true,true]"))[numberize(div)] ? "Don't s" : "S") + "how these search results");
  imageToggle.src = (eval(GM_getValue("show", "[true,true,true,true,true]"))[numberize(div)] ? hide : show);
  imageMoveUp = document.createElement("img");
  imageMoveUp.src = moveup;
  imageMoveUp.setAttribute("style", "float: right;margin-right: 3px;cursor:pointer;");
  imageMoveUp.setAttribute("title", "Move up in list");
  imageMoveDown = document.createElement("img");
  imageMoveDown.src = movedown;
  imageMoveDown.setAttribute("style", "float: right;margin-right: 3px;cursor:pointer;");
  imageMoveDown.setAttribute("title", "Move down in list");

  imageToggleColumn.appendChild(imageMoveUp);
  imageToggleColumn.appendChild(imageMoveDown);
  imageToggleColumn.appendChild(imageToggle);
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
}
      this.src = ((this.src == show) ? hide : show);
    },
    false);
}

function numberize(div) {
  switch (div) {
    case ("image"): return 0; break;
      }
}

for (i = 0; i < 5; i++) {
  switch (eval(GM_getValue("order", "[0,1,2,3,4]"))[i]) {
    case 0: addImages(); break;
      }
}

results.insertBefore(rightDiv, results.firstChild);