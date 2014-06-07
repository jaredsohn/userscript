// ==UserScript==
// @name        Rails-to-trails-maps
// @namespace   http://userscripts.org/users/negu
// @author      negu
// @version     1
// @description Traillink.com: removes login overlay, ui elements, updates map so that it's big for printing to PDF in conjunction with browser screen grabbing extension such as screengrab.
// @include     http://www.traillink.com/trail-maps/*
// @match       http://www.traillink.com/trail-maps/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==

// Use to call the web page's javascript functions since they cannot be called from within greasemonkey sandbox.
function exec(fn) {
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = '(' + fn + ')();';
    document.body.appendChild(script); // run the script
    document.body.removeChild(script); // clean up
}

// Load jQuery in webpage
var s = document.createElement('script');s.setAttribute('src', 'http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js');document.body.appendChild(s);s.onload=function(){};void(s);

window.addEventListener("load", function(){
  exec(function(){ 
  // Turn off the clutterful map elements by adding jquery to webpage and simulating a click on legend's toggleable map elements.  Leaving parking indicators that're actually needed.
    $("input#cbxPh, input#cbxRr, input#cbxEndpt, input#cbxThread, input#cbxTun, input#cbxWf").trigger('click'); 
    $("#mapDiv > div > div.gmnoprint > div:nth-child(4) > div:nth-child(1)").trigger('click').trigger('click').trigger('click').trigger('click'); 
  });
}, false);

if (jQuery !== undefined) {
  // Must call function as an object because of greasemonkey sandbox being unloaded.
  setTimeout(removeLb,2000);
}

// Remove lightbox and UI elements
function removeLb() {  
  $("#lightview, #lv_overlay, #lightviewController, #lightviewError, #instructions, .bc, #linkReturnDiv, #legend, #footerContainer, #topNavContainer").remove();
  $("form>div>div>a>img, form>div>div>div>a>img, #topLeftCheat, #hiddenlogin, #hiddendonate").remove();
  $(".bdyTitle").parent().remove();
  $(".centeredContent").removeClass();

  // Make the map the width of the screen, square
  var swidth = 8000; //$("html").outerWidth();
  $("#mapDiv").width(swidth).height(swidth).css('width', swidth + 'px').css('height', swidth + 'px');
} // removeLb()
