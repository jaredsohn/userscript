// ==UserScript==
// ==UserScript==
// @name          jQuery Example
// @require       https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @version    0.1
// @description  enter something useful

// @include		*
// @exclude		http://*adidas*
// @exclude		https://*adidas*
// @exclude		http://*192*
// @exclude		https://*192*
// @exclude		http://*chrome*
// @exclude		https://*chrome*
// @exclude		http://*local*
// @exclude		https://*local*


// @copyright  2012+, You
// ==/UserScript==

// Append some text to the element with id someText using the jQuery library.
$("body").append("<div id='fb_avoid' style='z-index:10000;width:180px;height:180px;background-color:red;position:fixed;top:0;left:0;'><a href='http://adidasmusicmanager.com/en/llista/band/time'><img src='http://adidasmusicmanager.com/assets/image/front/images/logo.png'></a></div>");
//$("#fb_avoid").click(function(){
//    alert(1);
//});