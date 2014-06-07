// ==UserScript==
// @name           gravatar bigger avatar
// @description    enlarges avatars on userscripts.org on mouseover
// @namespace      znerp
// @include        http://userscripts.org/*
// ==/UserScript==

var globalTimer;
var allImages = document.evaluate(
  '//img[contains(@src, "gravatar.com/avatar.php?gravatar_id=")]',
  document,
  null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  null);

for (i = allImages.snapshotLength - 1; i >= 0; i--) {
  var thisImage = allImages.snapshotItem(i);
  var popup = thisImage.src.replace(/s=\d\d/, 's=80');
  if (thisImage.src!=popup) {
    thisImage.alt = i;
    var div = document.createElement('div');
    div.innerHTML = "<div id='popup" + i + "' class='divClass'><img src='" + popup + "'></div>";
    div.setAttribute('mseovr', 'popup' + i);
    div.addEventListener(
      'mouseover',
      function(event) {document.getElementById(this.getAttribute('mseovr')).style.visibility = "visible";},
      true);
    div.addEventListener(
      'mouseout',
      function(event) {
        window.clearTimeout(globalTimer);
        document.getElementById(this.getAttribute('mseovr')).style.visibility = "hidden";},
      true);
    document.body.appendChild(div);
    thisImage.addEventListener(
      'mouseover',
      function(event) {
        var x = event.pageX;
        var y = event.pageY;
        var divID = 'popup' + this.alt;
        globalTimer = window.setTimeout(
          function() { popUp(x,y,divID); },
          500);},
      true);
    thisImage.addEventListener(
      'mouseout',
      function(event) {
        window.clearTimeout(globalTimer);
        document.getElementById('popup' + this.alt).style.visibility = "hidden";},
      true);
  }
}

var css = ".divClass {visibility:hidden;position:absolute;z-index:100;background-color:#fff;}"+
          ".divClass img {border:2px solid black;}";
if (typeof GM_addStyle != "undefined") {
  GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
  addStyle(css);
} else {
  var heads = document.getElementsByTagName("head");
  if (heads.length > 0) {
    var node = document.createElement("style");
    node.type = "text/css";
    node.innerHTML = css;
    heads[0].appendChild(node);
  }
}

function popUp(x,y,divID) {
  objStyle = document.getElementById(divID).style;
  obj = document.getElementById(divID);
  if (objStyle.visibility == "visible") {
    objStyle.visibility = "hidden";
  }
  else {// (objStyle.visibility = "hidden")
    objStyle.left = x + 'px';
    objStyle.top = y + 'px';
    objStyle.visibility = "visible";
  }
}