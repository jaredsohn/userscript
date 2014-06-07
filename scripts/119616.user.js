// ==UserScript==
// @name Clien short signature
// @namespace http://nuridol.egloos.com
// @description 긴 서명 부분을 줄여줍니다.
// @version 1.0.0
// @author NuRi
// @require http://code.jquery.com/jquery-latest.js
// @include http://www.clien.net/cs2/bbs/board.php?bo_table=*&wr_id=*
// ==/UserScript==

// ...script by NuRi

// Add jQuery
/*
var GM_JQ = document.createElement('script');
GM_JQ.type = 'text/javascript';
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();
*/
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://code.jquery.com/jquery-latest.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

addJQuery(letsJQuery);

function letsJQuery() {
  $(document).ready(function() {
    try {
      if (!$("div.signature")) {
        return;
      }
      var signatureDd = $("div.signature dd")[0];
      if (!signatureDd) {
        return;
      }
      if (signatureDd.offsetHeight > 150) {
        // too long
        signatureDd.style.height = "150px";
        signatureDd.style.overflow = "auto";
      }
    }
    catch(err) {
    }
  });
}
