// ==UserScript==
// @name           word image
// @namespace      d.hatena.ne.jp/arikui
// @include        *
// @require        http://github.com/cho45/jsdeferred/raw/master/jsdeferred.userscript.js
// ==/UserScript==

// reference code: http://gist.github.com/316795

var div = document.createElement('div');
div.className = 'gm_word_image';
window.addEventListener("mouseup", wordImage, false);

function wordImage(e) {
  with(D()) {
    var selection = window.getSelection().toString();
    if(selection && selection.match(/./)) {
      var url = "http://www.google.co.jp/images?q="
              + encodeURIComponent(selection);

      xhttp.get(url).next(function(res) {
        var start = res.responseText.search(/dyn\.setResults\(/);
        var end   = res.responseText.indexOf("]", start);

        if(start == -1 || end == -1) return;

        var imgData = eval("[" +
          res.responseText.substring(start + "dyn.setResults".length + 3, end - 2) +
        "]");

        addTip(imgData,
               window.scrollX + e.clientX,
               window.scrollY + e.clientY);
      });
    }
  }
}

function addTip(imgData, x, y) {
  with(div.style) {
    left = x + 'px';
    top = y + 'px';
  }

  div.innerHTML = [
    '<a href="', imgData[3], '" target="_blank">',
    '<img src="', imgData[14], "?q=tbn:", imgData[2], imgData[3], '"/>',
    "</a>"
  ].join("");

  document.body.appendChild(div);
  window.addEventListener("mousedown", removeTip, false);
}

function removeTip(e) {
  if(e.target == div.querySelector("img")) return;

  window.getSelection().removeAllRanges();
  document.body.removeChild(div);
  window.removeEventListener("mousedown", removeTip);
}

GM_addStyle(<><![CDATA[
  div.gm_word_image {
    font-size: 12px;
    color: #fff;
    position: absolute;
    background: #000;
    padding: 0.5em;
    z-index: 999;
    max-width: 300px;
    opacity: 0.8;
    -moz-border-radius: 3px;
  }
]]></>);
