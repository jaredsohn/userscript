// ==UserScript==
// @name           Milovana-Less Bright
// @namespace      nowhere
// @include        http://www.milovana.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js

// ==/UserScript==
var color1 = "#888";  //default "#888"
var color2 = "#999";  //default "#999"
var color3 = "#aaa";  //default "#aaa"
var color4 = "#ddd";  //default "#aaa"
var fcolor = "rgb(111, 19, 19)";  //default "rgb(111, 19, 19)"

//Core Parts
document.body.style.backgroundColor="black";
document.body.style.backgroundImage="url(.)"; //background fade 
$("#h_logo").css("visibility", "hidden"); //TopRight Logo
$("#csl").css("background-color", color1); //Middle background
$("#crplus").css("background-image", "url(.)"); //Silhouette on right
$("#crplus").css("float", "left"); //Silhouette on right

//Border
$("#tb").css("background-color", color1);
$("#tb").css("min-width", "0px");
$("#tb").css("width", "985px");
$("#tb").css("margin-right", "auto");
$("#tb").css("margin-left", "auto");
$("#ts").css("background-image", "url(.)");
$("#bs").css("visibility", "hidden");
$("#csxl").css("background-image", "url(.)");
$("#csxr").css("background-image", "url(.)");
$("#csl").css("background-image", "url(.)");
$("#csr").css("background-image", "url(.)");
$("#tsl").css("background-image", "url(.)");
$("#fsl").css("background-image", "url(.)");
$("#fsr").css("background-image", "url(.)");

//Title Bar
$("div#nl").css("background-image", "url(.)");
$("div#nr").css("background-image", "url(.)");
$("div#nd").css("background-image", "url(.)");
$("div#nu").css("background-image", "url(.)");
$("div#nav").css("background-image", "url(.)");
$("div#nu").css("background-color", color1);
$("div#nav").css("background-color", color1);
$("#nu a").css("color", "black");
$("#nm a").css("color", "black");
$("#nav").css("width", "985px");

//Teases Page
$("form.search.itemheader").css("background-color", color3);
$("form.search.itemheader").css("border-color", color2);
//$(".text").css("background-color", color4);
$(".submit").css("background-color", color4);
$("div#tcex").css("background-color", color3);
$(".pages .nav").css("background-color", color3);
$(".pages .nav").css("border-color", color2);
$(".pages .nav").css("color", "black");

function tease() {

$(".tease .bubble").css("background-color", color3);
$(".tease .bubble").css("border-top-width", "0px");
$(".tease .bubble").css("border-bottom-width", "0px");
$(".tease .bubble").css("border-left-width", "0px");
$(".tease .bubble").css("border-right-width", "0px");

$(".tease .img").css("background-color", color2); //Image Background
$(".tease").css("background-color", color3); //Topic/ViewCount

$("#tease_list").css("background-color", color1); //General Background
$("#tease_list").css("border-top-width", "0px");
$("#tease_list").css("border-bottom-width", "0px");
$("#tease_list").css("border-left-width", "0px");
$("#tease_list").css("border-right-width", "0px");

$(".tease .hook").css("background-image", "url(.)"); //The blurb on left side
}
tease();

//Footer
$("#ci").css("background-image", "url(.)"); 
$("#fbl").css("background-image", "url(.)"); 
$("#fbr").css("background-image", "url(.)"); 
$("#fs").css("background-image", "url(.)"); 
$("#fs").css("background-color", color1);

//Bottom text while viewing teases
if (document.URL.indexOf("showtease.php")!=-1)
{
$("#f_menu").css("visibility", "hidden");
$("#tease_content .link a").css("color", fcolor);
$("#tease_content").css("background-color", color2);
$("#tease_content").css("border-top-width", "0px");
$("#tease_content").css("border-bottom-width", "0px");
$("#tease_content").css("border-left-width", "0px");
$("#tease_content").css("border-right-width", "0px");
}

//All content boxes
$(".item").css("background-color", color3);
$(".item").css("border-color", color2);

//Removes page_blank.gif 
var images = document.getElementsByTagName('img');
for (var n = images.length; n--> 0;) {
  var img = images[n];
  if (img.src=="http://cdn.milovana.com/gx/blog/page_blank.gif"){
    img.setAttribute("src", "");
  }
}

//You were here/announcment bar
$("#uyou").css("background-color", color2);
$("#usite").css("background-color", color3);

/////////////////////////////
/////Shady Ajax Reloader/////
/////////////////////////////

var zGbl_DOM_ChangeTimer                = '';
var bGbl_ChangeEventListenerInstalled   = false;
window.addEventListener ("load", MainAction, false);
function MainAction ()
{
    if (!bGbl_ChangeEventListenerInstalled)
    {
        bGbl_ChangeEventListenerInstalled   = true;

        document.addEventListener ("DOMSubtreeModified", HandleDOM_ChangeWithDelay, false);
    }
    tease();
}
function HandleDOM_ChangeWithDelay (zEvent)
{

    if (typeof zGbl_DOM_ChangeTimer == "number")
    {
        clearTimeout (zGbl_DOM_ChangeTimer);
        zGbl_DOM_ChangeTimer = '';
    }
    zGbl_DOM_ChangeTimer     = setTimeout (function() { MainAction (); }, 222); //-- 222 milliseconds
}
