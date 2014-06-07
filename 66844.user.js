// ==UserScript==
// @name           Test
// @author         Awesumness
// @Notes          Enjoy.
// @include        *
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
var url;
var image;
var x;
var y;
var w;
var h;
var hflip;

$(document).ready(function() {
  $("a[href*='.png'],a[href*='.gif'],a[href*='.jpg'],a[href*='.jpeg']")
    .removeAttr("title")
    .hover(imaGen)
    .mousemove(imaGen)
    .mouseout( function() {
        image.css({"display":"none"});
    });
});


function imaGen(e) {
  url = $(this).attr("href");
  image = $("body > img.awesumImgPre[src='" + url + "']");

  if ( image.length < 1 ){
    $("body").append("<img class='awesumImgPre' src='" + url + "'/>");
    image = $("body > img.awesumImgPre[src='" + url + "']");
    image.css({
    "position":"fixed",
    "z-index":"9001",
    "max-width":window.innerWidth/2,
    "max-height":window.innerHeight/2});
  }

  image.css({"display":"block"});

  x = e.pageX + 20 - window.pageXOffset;
  y = e.pageY + 20 - window.pageYOffset;
  flipit();


}




function flipit(){
    w = parseInt(image.css("width"));
    h = parseInt(image.css("height"));
    if(w == 0){
      setTimeout(flipit,100);
    }else{
      hflip = false;

      if(x+w+20 > window.innerWidth){
        x-=w;
        hflip = true;
      }
      if(y+h+20 > window.innerHeight){
        y-=h;
        if(hflip)
          x-=40;
      } 
      image.css({
      "left":x,
      "top":y});
    }
}