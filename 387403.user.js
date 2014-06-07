// ==UserScript==
// @name        ismail
// @namespace   http://018FV.tumblr.com
// @include     http://streamallthis.me/*
// @version     1
// ==/UserScript==
/*--- Create a button in a container div.  It will be styled and
    positioned with CSS.
*/
// url1
var str = document.URL;
var str1 = str.substring(str.length - 7 ,str.length - 5 );
var num = parseFloat(str1) + 1;
    if (num < 10 ) {
var num1 = num.toString();
var url = str.substring(0 ,str.length - 7 ) + "0"+ num1 + ".html";
    }
    else {
var num1 = num.toString();
var url = str.substring(0 ,str.length - 7 ) + num1 + ".html";
    }    
    
    // url 2
var str2 = str.substring(str.length - 10 ,str.length - 8 );
var numa = parseFloat(str2) + 1;
    if ( numa < 10 ) {
var num2 = numa.toString();
var url2 = str.substring(0 ,str.length - 10 ) + "0" + num2 + "e01.html";
    }
    else {
    var num2 = numa.toString();
    var url2 = str.substring(0 ,str.length - 10 ) + num2 + "e01.html";
    }  
    // end
    function leftArrowPressed() {
   // Your stuff here
   document.getElementById('but2').click();
}
 
function rightArrowPressed() {
   // Your stuff here
   document.getElementById('but1').click();
}
function upArrowPressed() {
   // Your stuff here
  var d = window.frames[0].document.getElementsByClassName("badsvideo")[0];
   alert(d);
}
function downArrowPressed() {
   // Your stuff here
 alert(document.getElementById('but1'));
}
 
document.onkeydown = function(evt) {
    evt = evt || window.event;
    switch (evt.keyCode) {
        case 37:
            leftArrowPressed();
            break;
        case 39:
            rightArrowPressed();
            break;
                    case 38:
            upArrowPressed();
            break;
                    case 40:
            downArrowPressed();
            break;
    }
};
 
var zNode       = document.createElement ('div');
zNode.innerHTML = '<a id="but1" href=' + url + '><button id="myButton" type="button">'
                + 'Next episode</button><a>'
                ;
var zNode2       = document.createElement ('div');
zNode2.innerHTML = '<a id="but2" href=' + url2 + '><button id="myButton" type="button">'
                + 'Next season</button><a>'
                ;
zNode.setAttribute ('id', 'myContainer');
document.body.appendChild (zNode);
 
zNode2.setAttribute ('id', 'myContainer2');
document.body.appendChild (zNode2);
 
 
//--- Style our newly added elements using CSS.
GM_addStyle ( multilineStr ( function () {/*!
    #myContainer {
        position:               absolute;
        bottom:                  60px;
        right:                  0;
        font-size:              20px;
        background:             orange;
        border:                 3px outset black;
        margin:                 5px;
        opacity:                0.9;
        z-index:                222;
        padding:                5px 20px;
    }
    
    #myButton {
        cursor:                 pointer;
    }
    #myContainer p {
        color:                  red;
        background:             white;
    }
        #myContainer2 {
        position:               absolute;
        bottom:                   100px;
        right:                   0;
        font-size:              20px;
        background:             orange;
        border:                 3px outset black;
        margin:                 5px;
        opacity:                0.9;
        z-index:                222;
        padding:                5px 20px;
    }
    
    #myButton2 {
        cursor:                 pointer;
    }
    #myContainer2 p {
        color:                  red;
        background:             white;
    }
*/} ) );
 
function multilineStr (dummyFunc) {
    var str = dummyFunc.toString ();
    str     = str.replace (/^[^\/]+\/\*!?/, '') // Strip function () { /*!
            .replace (/\s*\*\/\s*\}\s*$/, '')   // Strip */ }
            .replace (/\/\/.+$/gm, '') // Double-slash comments wreck CSS. Strip them.
            ;
    return str;
}