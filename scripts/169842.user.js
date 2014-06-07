// ==UserScript==
// @id             noWhiteBackgroundColor-gray
// @name           noWhiteBackgroundColor-gray
// @version        2.1
// @namespace
// @author         HowardSmith
// @modefied       ywzhaiqi add support autopager
// @description    Version 2: Generic version which can now be configured to any background colour you like:
// @include        *
// @exclude
// @run-at         document-start
// ==/UserScript==
(function() {

  document.addEventListener("DOMContentLoaded", function(){

      noWhiteBackgroundColor();

      setTimeout(function() {
        fixAutoPage();
      }, 2000);

  }, false);

  function noWhiteBackgroundColor() {

    // var allElements = document.getElementsByTagName("*"); // get all elements on a page
    var allElements = document.querySelectorAll("*:not([mColored='true'])"); // get all elements on a page
    for (var i = 0; i < allElements.length; i++) {
      changeBackgroundColor(allElements[i]);
    }
  }

  function changeBackgroundColor(x) { // auto change colors too close to white
    if(x.getAttribute("mColored") == "true"){
      return;
    }
    x.setAttribute("mColored", "true");

    var elemStyle = window.getComputedStyle(x, null);
    if(!elemStyle) return;

    var backgroundColorRGB = elemStyle.backgroundColor; // get background-color
    if (backgroundColorRGB != "transparent") { // convert hex color to rgb color to compare
      var RGBValuesArray = backgroundColorRGB.match(/\d+/g); //get rgb values
      var red = RGBValuesArray[0];
      var green = RGBValuesArray[1];
      var blue = RGBValuesArray[2];

      // ============================================================================
      // Set the base colors you require:
      // use: http://www.colorpicker.com
      // to find the rgb values of the base colour you wish to suppress white backgrounds with:
      // Default gray provided:
      // ============================================================================

      var red_needed = 220;
      var green_needed = 220;
      var blue_needed = 220;

      if (red >= 220 && green >= 220 && blue >= 220) { // white range detection

        if (red >= 250 && red <= 255 && green >= 250 && green <= 255 && blue >= 250 && blue <= 255) {
          red_needed += 0;
          green_needed += 0;
        } else if (red >= 240 && red <= 255 && green >= 240 && green <= 255 && blue >= 240 && blue <= 255) {
          red_needed += 6;
          green_needed += 3;
        } else if (red >= 230 && red <= 255 && green >= 230 && green <= 255 && blue >= 230 && blue <= 255) {
          red_needed += 10;
          green_needed += 5;
        } else if (red >= 220 && red <= 255 && green >= 220 && green <= 255 && blue >= 220 && blue <= 255) {
          red_needed += 14;
          green_needed += 7;
        }

        x.style.backgroundColor = "rgb( " + red_needed + ", " + green_needed + ", " + blue_needed + ")"; // the background-color you want
      }
    }
  }

  function fixAutoPage() {
    if(!document.body) return;
    var _bodyHeight = document.body.clientHeight;
    // 创建观察者对象
    var observer = new window.MutationObserver(function(mutations){
      if(mutations[0].addedNodes &&　document.body.clientHeight > _bodyHeight){
        // console.log("--------addedNodes---------");
        setTimeout(noWhiteBackgroundColor, 200);
        _bodyHeight = document.body.clientHeight;
      }
    });
    observer.observe(document, {childList: true, subtree: true});
  }
})();