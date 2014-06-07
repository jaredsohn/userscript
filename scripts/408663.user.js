// ==UserScript==
// @name TagPro Mouse Control
// @include 
// @description Move your mouse to control your ball.

var tempX = 0;
  var tempY = 0;

  function getMouseXY(e) {
    if (IE) { // grab the x-y pos.s if browser is IE
      tempX = event.clientX + document.body.scrollLeft;
      tempY = event.clientY + document.body.scrollTop;
    }
    else {  // grab the x-y pos.s if browser is NS
      tempX = e.pageX;
      tempY = e.pageY;
    }  

    if (tempX < 0){tempX = 0;}
    if (tempY < 0){tempY = 0;}  

    document.Show.MouseX.value = tempX;//MouseX is textbox
    document.Show.MouseY.value = tempY;//MouseY is textbox

    return true;
  }


// ==/UserScript==