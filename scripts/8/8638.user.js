// ==UserScript==
// @name           Deviant enlarge
// @namespace      znerp
// @description    Larger images displayed on mouseover on deviantART.com.
// @include        http://*.deviantart.com/*
// ==/UserScript==

function sqr(x) { return (x*x) }
function inYoFace () {
  var newDiv;
  if (!document.getElementById("deviantEnlarge")) {
    eventThingX = 0;
    eventThingY = 0;
    newDiv = document.createElement('div');
    newDiv.setAttribute('id', 'deviantEnlarge');
    newDiv.setAttribute('style', 'background:url("http://sh.deviantart.com/x/116/150/logo3.png");min-height:158px;min-width:121px;padding:3px;position:fixed;z-index:100;top:20px;left:20px;background-color:#778;display:none;');
    newDiv.innerHTML = "<a href='' title = ''><img style = 'max-height:"+ (parseInt(window.innerHeight) - 40) +"px;max-width:"+ (parseInt(window.innerWidth) - 40) +"px;' src=''></a></div>";
    document.body.appendChild(newDiv);
    newDiv.addEventListener(
      'mouseover',
      function(event) {
        this.style.display = "inline";
      },
      false);
    newDiv.addEventListener(
      'mouseout',
      function(event) {
        window.clearTimeout(globalTimer);
        this.style.display = "none";
      },
      false);
    newDiv.addEventListener(
      'mousemove',
      function(e) {
        if (sqr(eventThingX - e.pageX) + sqr(eventThingY - e.pageY) > 1337) {
          window.clearTimeout(globalTimer);
          this.style.display = "none";
        }
      },
      false);
  } else {
    newDiv = document.getElementById("deviantEnlarge")
  }
  var allImages = document.evaluate('//img[contains(@src, "/150/")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, allImages);
  for (var i=allImages.snapshotLength-1; i>=0; i--){
    var thisImage = allImages.snapshotItem(i);
    var thisSrc = thisImage.src;
    if (thisSrc != thisSrc.replace(/http:[^\.]*\.(.*)\/150\//,"http://fc07.$1/")){
      thisImage.addEventListener(
        'mouseover',
        function(event) {
          fullsize = this.src.replace(/http:[^\.]*\.(.*)\/150\//,"http://fc07.$1/").replace(/\.net/, ".com");
          link = this.parentNode.href;
          title = this.parentNode.title;
          globalTimer = window.setTimeout(
            function () {
              newDiv.getElementsByTagName("img")[0].src = "";
              newDiv.getElementsByTagName("a")[0].href = link;
              newDiv.getElementsByTagName("img")[0].src = fullsize;
              newDiv.getElementsByTagName("img")[0].setAttribute("title", title);
              newDiv.style.display = "inline";
            },500);
        },
        false);
      thisImage.addEventListener(
        'mouseout',
        function(event) {
          window.clearTimeout(globalTimer);
          newDiv.style.display = "none";
        },
        false);
      thisImage.addEventListener(
        'mousemove',
        function(e) {
          eventThingX = e.pageX;
          eventThingY = e.pageY;
        },
        false);
    }
  }
}
var globalTimer;
document.addEventListener('DOMNodeInserted', inYoFace, false);
window.addEventListener('load', inYoFace, false);
