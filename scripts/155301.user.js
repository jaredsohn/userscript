/*
// ==UserScript==
// @name           CSFD Actors Pictures 
// @description    Script for http://www.csfd.cz, Actor's image appears when you move mouse on the actor's name
// @description    Script pro http://www.csfd.cz, zobrazení fotky herce po najetí myší na jeho jméno
// @namespace      http://userscripts.org/scripts/show/155301
// @include        http://*.csfd.cz/*
// @exlude         http://code.jquery.com/jquery-latest.js
// @icon           http://img.csfd.cz/app/images/apple_touch_icon.png
// @copyright      2013, Tobizech
// @version        1.1
// ==/UserScript==
*/

function Left(str, n) {  // removing unwanted character from the left side
 if (n <= 0) {
  return ""; 
 } else if (n > String(str).length) {
  return str;
 } else {
  return String(str).substring(0,n);
 }
}

function RemoveAlphaChars(strSource) { // remove non-numeric characters 
var strOut = new String(strSource); 
    strOut = strOut.replace(/[^\d]/g, ''); 
    return strOut; 
}

var movie = $('#poster').html()

var preview = "<div id='dsmoje' class='clmoje' style='position: absolute'>" +
"<img id='imgPreview' style='display: none' src='http://0.tqn.com/d/browsers/1/6/T/4/-/-/greasemonkey.gif'></div>";
$(preview).prependTo('body')[0];

var boxheight = $(movie).height()+19; // set height content

var links = document.getElementsByTagName('a'); // get all links

$("a").mousemove( function() {  
  var objArr = $.makeArray($(this));
  var plainText = objArr[0];  // get actual link
  var currenturl = Left(plainText,26);  // get actual link
    
  if ("http://www.csfd.cz/tvurce/" == currenturl){
    var number = RemoveAlphaChars(plainText); // get numeric picture
    var img_Url = "http://img.csfd.cz/photos/herci/"+number+".jpg";
    var bgImg = "http://img.csfd.cz/assets/images/photo-free.png";
    
    $('#imgPreview').replaceWith("<img id='imgPreview' style='display: none' src="+img_Url+">");
    
    var imgWidth = $('#imgPreview').width();
    //alert(imgWidth);
    
    if (imgWidth == 0){
      var imgUrl = "http://img.csfd.cz/assets/images/photo-free.png";
    } else {
      var imgUrl = "http://img.csfd.cz/photos/herci/"+number+".jpg";
    }
    
    var box = "<div id='poster' class='image' style='background-image: url("+bgImg+"); background-position: center center; background-repeat: no-repeat; width: 127px; height: "+boxheight+"px; text-align: center;'>" +
     "<img width='127px' height='170px' style='text-align: center; border: 0px' src="+imgUrl+"></div>";
    $('#poster').replaceWith(box);
  }
});

$('body').mouseover(function() {
  var box = "<div id='poster' class='image' style='margin-right: 0px; width: 127px; text-align: center;'>"+movie+"</div>"; 
  $('#poster').replaceWith(box);
});                             