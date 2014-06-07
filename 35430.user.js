// A quick rewrite of http://static.delicious.com/js/playtagger.js, to make it
// not leak your entire click trail to del.icio.us, and only squeal on playing

// ==UserScript==
// @name		del.icio.us mp3
// @namespace		http://code.google.com/p/ecmanaut/
// @description		Adds the del.icio.us in-page player to all mp3 links.
// @include     	http://*
// @exclude     	http://*.icio.us/*
// @resource	play	http://static.delicious.com/img/play.gif
// @resource	stop	http://static.delicious.com/img/stop.gif
// @require		http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// ==/UserScript==

var player, playimg;

var u = "http://static.delicious.com/swf/playtagger.swf";
var f = "http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab"+
  "#version=6,0,0,0";

init();

function init() {
  if (!$X('//script[@src="http://static.delicious.com/js/playtagger.js"]') &&
      !$X('//script[contains(@src,"/playtagger.js")]')) // avoid running twice
    [].slice.call(document.links).filter(is_mp3).map(augment);
}

function is_mp3(a) {
  var mp3 = /\.mp3$/i;
  return a.href && a.href.match(mp3) || a.pathname.match(mp3);
}

function augment(a) {
  var img = document.createElement("img")
  img.src = GM_getResourceURL("play");
  img.title = "listen";
  img.height = img.width = 12;
  img.style.border = "none";
  img.style.marginRight = "4px";
  img.style.cursor = "pointer";
  img.fn = makeToggler(img, a.href);
  img.addEventListener("click", img.fn, false);
  a.parentNode.insertBefore(img, a);
}

function makeToggler(img, url) {
  return function() {
    // console.log("playing "+ url);
    toggle(img, url);
  };
}

function destroy() {
  // console.log("Destroying player");
  playimg.src = GM_getResourceURL("play");
  playimg = null;
  player.removeChild(player.firstChild);
  player.parentNode.removeChild(player);
  player = null;
}

function toggle(img, url) {
  if (playimg == img) {
    destroy();
  } else {
    if (playimg) destroy();
    var a = img.nextSibling, c = getColour(a);
    var flashvars = "theLink="+ url +"&fontColor="+ c;
    img.src = GM_getResourceURL("stop");
    playimg = img;
    player = document.createElement("span");
    player.innerHTML =
      <object id="player" style="vertical-align: bottom; margin-right: 0.2em;"
        classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase={ f }
        width="100" height="14" align="middle">
        <param name="wmode" value="transparent"/>
        <param name="allowScriptAccess" value="sameDomain"/>
        <param name="flashVars" value={ flashvars }/>
        <param name="movie" value={ u }/>
        <param name="quality" value="high"/>
        <embed src={ u } type="application/x-shockwave-flash" name="player"
          allowScriptAccess="sameDomain" wmode="transparent" quality="high"
          flashVars={ flashvars } width="100" height="14" align="middle"
          pluginspage="http://www.macromedia.com/go/getflashplayer"
          style="vertical-align: bottom; margin-right: 0.2em"/>
    </object>.toXMLString();
    img.parentNode.insertBefore(player, img.nextSibling);
  }
}

function getColour(a) {
  var junk = /^rgb|[ ()]/g;
  var c = getComputedStyle(a, null).getPropertyValue("color").replace(junk, "");
  var hex = c.match(/^#?([a-f0-9]{6})$/);
  var hexSm = c.match(/^#?([a-f0-9]{3})$/);
  var rgb = c.match(/^([0-9]+),([0-9]+),([0-9]+)$/);
  if (rgb) {
    var c16 = "0123456789abcdef", c="";
    for (var i = 1, d; d = rgb[i]; i++) {
      var j = d % 16;
      c = c + c16.charAt((d - j)/16) + c16.charAt(j);
    }
  }
  else if (hex)
    c = hex[1];
  else if (hexSm)
    c = hexSm[1].charAt(0) +
        hexSm[1].charAt(0) +
        hexSm[1].charAt(1) +
        hexSm[1].charAt(1) +
        hexSm[1].charAt(2) +
        hexSm[1].charAt(2);
  else
    c = "000000";
  return c;
}

