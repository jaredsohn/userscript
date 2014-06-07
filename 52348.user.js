// ==UserScript==
// @name           AllRecipes Compressed Search Results
// @description    Compressed Search Results
// @version        1.0
// @author         Sean Catchpole
// @namespace      allrecipes
// @include        http://allrecipes.com/Search/Recipes.aspx?*
// @include        http://allrecipes.com/Recipe/*/Detail.aspx
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.0/jquery.min.js
// ==/UserScript==

$.fn.at = $.fn.appendTo;

var url = window.location.href;
if(/Recipes/.test(url)) {
var css = "\
#searchnav { padding-bottom:10px; }\
.recipes .starsdiv { margin-top:4px; }\
.recipes .rectitlediv { margin-top:0; }\
.recipes .imgtd { width:60px; }\
.recipes .imgtd div { margin-top:0; }\
.recipes > br { display:none; }\
.recipes .rectable { padding-bottom:4px; }\
.recipes .rectable br { display:none; }\
.recipes .rectable em { display:none; }\
.recipes .rectable .info { display:none; }\
.zoom2 { position:absolute; left:-45px; top:-45px; border:4px solid rgba(0,0,0,0.2); -moz-border-radius:3px; z-index:1; }\
";
$('<style type="text/css">').html(css).at('head');
$('.rectable img').each(function(){
  if(!/mini/i.test(this.src)) return;
  var im1 = $(this),
      im2 = $("<img>").attr({src:im1.attr("src").replace(/mini/,"small")}).addClass("zoom2")
            .hide().mouseout(function(){ im2.hide(); });
  im1.before(im2).mouseover(function(){ im2.show(); })
     .parent().parent().css({position:"relative"});
});
} else {
var css = "\
.zoom2 { position:absolute; left:-55px; top:-55px; border:4px solid rgba(0,0,0,0.2); -moz-border-radius:3px; z-index:1; }\
.zoom2.mini { left:-100px; top:-100px; }\
";
$('<style type="text/css">').html(css).at('head');
var im1 = $("#mastheadphoto2 img").eq(0),
    im2 = $("<img>").attr({src:im1.attr("src").replace(/small/,"big")}).addClass("zoom2")
          .hide().mouseout(function(){ im2.hide(); });
im1.before(im2).mouseover(function(){ im2.show(); })
   .parent().css({position:"relative"});
$("#relatedphotos img").each(function(){
var im1 = $(this),
    im2 = $("<img>").attr({src:im1.attr("src").replace(/mini/,"big")}).addClass("zoom2 mini")
          .hide().mouseout(function(){ im2.hide(); }),
    im3 = $("<span>").css({width:im1.width(),height:im1.height()})
          .mouseover(function(){ $("#relatedphotos .zoom2").hide(); im2.show(); })
          .css({position:"absolute",top:0,left:0,zIndex:2});
im1.before(im2).after(im3).mouseover(function(){ im2.show(); })
   .parent().css({position:"relative",display:"inline-block"});
});
}
