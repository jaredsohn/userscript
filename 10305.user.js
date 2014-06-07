// ==UserScript==
// @name           imdb enlarge
// @description    Shows the fullsize version of images in imdb galleries on mouseover.
// @namespace      znerp
// @include        http://*.imdb.com/*
// @include        http://imdb.com/*
// ==/UserScript==

function sqr(x) { return (x*x) }
eventThingX = 0;
eventThingY = 0;
var globalTimer;
var newDiv = document.createElement('div');
var inner = newDiv.appendChild(document.createElement('div'));
newDiv.setAttribute('id', 'imdbEnlarge');
newDiv.setAttribute('style', 'padding:3px;display:none;position:fixed;z-index:1337;top:20px;left:20px;background-color:#f7f3b6;');
document.body.appendChild(newDiv);
newDiv.addEventListener(
  'mouseover',
  function(event) {
    this.style.display = "inline";},
  true);
newDiv.addEventListener(
  'mouseout',
  function(event) {
    window.clearTimeout(globalTimer);
    this.style.display = "none";},
  true);
newDiv.addEventListener(
  'mousemove',
  function(e) {
    if (sqr(eventThingX - e.pageX) + sqr(eventThingY - e.pageY) > 2500) {
      window.clearTimeout(globalTimer);
      this.style.display = "none";
    }},
  true);
var allImages = document.evaluate('//a[contains(@href, "/gallery/")]/img[contains(@src, "/th-")]|'+
                                  '//a[contains(@href, "/photogallery")]/img[contains(@src, "/th-")]|'+
                                  '//a[contains(@href, "/gallery")]/img[contains(@src, "p.")]|'+
                                  '//a[contains(@href, "/photogallery")]/img[contains(@src, "p.")]|'+
                                  '//a[contains(@href, "/media")]/img[contains(@src, "._V")]|'+
                                  '//a[contains(@href, "/title/")]/img[contains(@src, "._V")]|'+
                                  '//a[contains(@href, "/video/")]/img[contains(@src, "._V")]',
                                  document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i=allImages.snapshotLength-1; i>=0; i--){
  var thisImage = allImages.snapshotItem(i);
  if (thisImage.src != thisImage.src.substring(0, thisImage.src.lastIndexOf("/")+1) + thisImage.src.substring(thisImage.src.lastIndexOf("/")+4, thisImage.src.length)
   && thisImage.src != thisImage.src.substring(0, thisImage.src.lastIndexOf("._")+2) + "SY400_SX600_.jpg"
   && thisImage.src != thisImage.src.substring(0, thisImage.src.lastIndexOf("/")+3) + "f.jpg"){
    thisImage.addEventListener(
      'mouseover',
      function(event) {
        thisImage = this;
        if (this.src.match(/\/th-/))
          fullsize = this.src.substring(0, this.src.lastIndexOf("/")+1) + this.src.substring(this.src.lastIndexOf("/")+4, this.src.length)
        else if (this.src.match(/V.\._.*\.jpg/))
          fullsize = this.src.substring(0, this.src.lastIndexOf("._")+2) + "SY400_SX600_.jpg";
        else
          fullsize = this.src.substring(0, this.src.lastIndexOf("/") + 3) + "f.jpg";
        globalTimer = window.setTimeout(
          function (thisImage) {return function(result) {
            inner.setAttribute('style', 'background:url("http://i.imdb.com/favicon.ico");min-height:'+158+'px;min-width:'+121+'px;');
            inner.innerHTML = "<a href="+thisImage.parentNode.href+"><img style = 'max-width: "+ (parseInt(window.innerWidth) - 60) +"px; max-height: "+ (parseInt(window.innerHeight) - 40) +"px;' src='" + fullsize + "'></a></div>";
            newDiv.style.display = "inline"
          }}(thisImage),
          500);
      },
      true);
    thisImage.addEventListener(
      'mouseout',
      function(event) {
        window.clearTimeout(globalTimer);
        newDiv.style.display = "none";},
      true);
    thisImage.addEventListener(
      'mousemove',
      function(e) {
        eventThingX = e.pageX;
        eventThingY = e.pageY;
      },
      true);
  }
}