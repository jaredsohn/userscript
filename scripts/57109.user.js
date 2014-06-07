// ==UserScript==
// @name           4chan quotelink previewer
// @author         Awesumness
// @Notes          Enjoy.
// @include        *.4chan.org*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var threadNum;
var previewNum;
var preview;
var x;
var y;
var w;
var h;
var hflip;
var timer;

$(document).ready(function() {
  $('.quotelink')
  .hover(imaGen)
  .mousemove(imaGen)
  .mouseout( function() {
      preview.css({"display":"none"});
  });
});


function imaGen(e) {
  threadNum = $(this).attr("href");
  previewNum = parseInt($(this).text().replace(/>>/g,''));
  preview = $("body > [id='" + previewNum + "awe']");

  if (  preview.size() == 0 ){
    $("body").append("<div id='"+previewNum+"awe'></div>");
    preview = $("body > [id='" + previewNum + "awe']");
    post = $("input[name='" + previewNum + "']");
    if ( post.size() != 0 ){
      if(post.parent()[0].tagName == "FORM"){
        preview.append("<td class='reply'></td>");
        preview = preview.children();
        while( (post.prev().size() != 0) && !post.prev().is("hr")){
          post = post.prev();
        }
        do{
          preview.append(post.clone());
          post = post.next();
        }while( !post.is("blockquote"))
        preview.append(post.clone());
        preview = preview.parent();
      }else{
        preview.append($("#"+ previewNum).clone());
      }
    }else{
      var page1 = threadNum + ".html";
      preview.text("Loading...");
      preview.load(page1 + " [id='" + previewNum + "']");
    }
    preview.css({
    "position":"fixed",
    "z-index":"9001",
    "max-width":"800px"});
  }

  preview.css({"display":"block"});
  

  x = e.pageX + 20 - window.pageXOffset;
  y = e.pageY + 20 - window.pageYOffset;
  preview.css({
  "left":x,
  "top":y});
  flipit();


}




function flipit(){
    clearTimeout(timer);
    w = parseInt(preview.css("width"));
    h = parseInt(preview.css("height"));
    if(w == 0){
      timer = setTimeout(flipit,100);
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
      preview.css({
      "left":x,
      "top":y});
    }
}
