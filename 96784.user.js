// ==UserScript==
// @name          Youtube2 (No Autoplay)
// @description   Prevents autoplay.
// @include       http://*youtube.com*
// @version       2
// ==/UserScript==

unsafeWindow.filter = function(str) {
  var rv = "";
  var mVars = str.split("&");
  var allowed  = [/^allow_embed=/, /^rv\.[0-9]\./,
          /^cc_.*=/, /^cc3_.*=/, /tts.*=/,
          /^fmt_.*=/, /^iv_.*=/, /^cr=/, /^creator=/, 
          /^enablecsi=/, /^enablejsapi=/,
          /^enscreen_module=/, /^fexp=/, /^hl=/,
          /^iv3_module=/, /^keywords=/, /^leanback_/,
          /^length_/, /^plid=/, /^referrer=/, /^sdetail=/,
          /^showpopout=/, /^sk=/, /^sourceid=/, /^t=/,
          /^timestamp=/, /^tk=/, /watch_ajax_token=/,
          /^tmi=/, /^video_id=/, /^vq=/, /^watermark=/ ];
  for(var iVar in mVars) {
    varName = mVars[iVar].match(/.*?\=/)[0];
    for(var key in allowed) {
      if (varName.match(allowed[key])) {
        rv += "&" + mVars[iVar];
      }
    }
  }

  rv = rv.slice(1);
  rv = "autoplay=0&csi_page_type=watch&" + rv;
  videoid = rv.match(/video_id=[^&]*/)[0].slice(9);
  rv = "thumbnailurl=http://i3.ytimg.com/vi/" + videoid + "/hqdefault.jpg&" + 
       "iurl=http://i3.ytimg.com/vi/" + videoid + "/hqdefault.jpg&" + rv;
  return rv;
}

unsafeWindow.mod = function() {
  var flashvars;
  var oldFlash;

  var player = document.getElementById("movie_player");
  if(player) {
      flashvars = player.getAttribute("flashvars");
  } else {
    window.attempts = window.attempts - 1;
    if(window.attempts)
      window.setTimeout("mod()",100);
    return;
  }

  var filtered = unsafeWindow.filter(flashvars);
  player.setAttribute("flashvars", filtered);
  var src = player.parentNode.innerHTML;
  src = src.replace(/<script[\s\S]+?script>/gi,"");
  player.parentNode.innerHTML = src;
}

unsafeWindow.attempts = 50;
unsafeWindow.mod();
return;