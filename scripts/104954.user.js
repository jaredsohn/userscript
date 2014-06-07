// ==UserScript==
// @name      Clien Big Image
// @namespace   http://nuridol.egloos.com
// @description   섬네일 대신에 큰 이미지로 바꾸어 줍니다.
// @version     1.0.0
// @author    NuRi
// @require     http://code.jquery.com/jquery-latest.js
// @include     http://www.clien.net/cs2/bbs/board.php?bo_table=*
// ==/UserScript==

// ...script by NuRi

// Add jQuery
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

// stop this function
// request by admin
//addJQuery(letsJQuery);

function letsJQuery() {
  function isThumbnail(url) {
    if (!url) {
      return false;
    }
    if (url.search(/\.\.\/data\/file\/[^/]+\/thumb\//) >= 0) {
      return true;
    }
    return false;
  }

  $(document).ready(function() {
    try {
      $("img").each(function() {
        var imageUrl = $(this).attr("src");
        if (isThumbnail(imageUrl)) {
          $(this).attr('src', '');
          imageUrl = imageUrl.replace(/thumb\/[^/]+\//, "");
          $(this).attr('src', imageUrl);
          var boxPrefix = '<div style="position:relative;"><div style="width:3px;height:3px;margin:0;position:absolute;top:0;left:0;background: #f78d1d;background: -webkit-gradient(linear, left top, left bottom, from(#faa51a), to(#f47a20));background: -moz-linear-gradient(top,  #faa51a,  #f47a20);filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#faa51a\', endColorstr=\'#f47a20\');filter:alpha(opacity=50);opacity:0.5;"></div>';
          var boxSuffix = '</div>';
          $(this).before(boxPrefix);
          $(this).after(boxSuffix);
        }
      });
    }
    catch(err) {
    }
  });
}
