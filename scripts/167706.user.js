// ==UserScript==
// @name        VeloVintage
// @namespace   http:///moi
// @include     http://www.velovintageagogo.com*
// @version     1
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.min.js
// ==/UserScript==



function hide(){
  //hide logo
  $("a#logo").html("VELO VINTAGE @ GOGO");
  $("a#logo").css({"font-weight":"bold","min-height":"30px","color":"black","text-decoration":"none","font-size":"1.25em"});
  //hide Habermus gibt starke füss !
  $("div.newslink div:nth-child(2)").remove();
  //hide video
  $("div.newslink p:nth-child(2)").remove();
  //hide groups link
  $("a[href*='groups']").remove();
  //hide ads
  var classes = $('#main-content:first div').attr('class').split(' ');
  var classe = "."+ classes[0] + ".mainmenu";
  $(classe).remove();  
  //hide footer
  $("div#gfooter").remove();
  //corrects images display
  $(".resize_img").show();
}
hide();
