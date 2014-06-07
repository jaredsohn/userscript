// ==UserScript==
// @name         road trip
// @version      1.0
// @include      http://*.sofiawars.com/automobile/ride/
// @author       Mr_Rage
// @run-at       document-end
// ==/UserScript==

$('i.arrow-left-circle').remove();
$('i.arrow-right-circle').remove();

$('div.cars-trip-accordion.jcarousel-container.jcarousel-container-horizontal').css('overflow', 'visible');
$('div.jcarousel-clip.jcarousel-clip-horizontal').css('overflow', 'visible');
$('ul.jcarousel-list.jcarousel-list-horizontal').css('overflow', 'auto').css('width', '660px');

$('ul.jcarousel-list.jcarousel-list-horizontal  li').css('margin-bottom', '6px');

$('div#cars-trip-choose').css({'position': 'fixed'});

//-----
$('<center><div class="group">5-8%</div><div class="group">10-13%</div><div class="group">15-18%</div><div class="group">rndm</div></center>').insertAfter('div.welcome');
$("div.group").css({'font-weight': 'bold', 'font-family': 'Trebuchet MS, Sans-serif', 'font-size': '10px', 'color': 'white', 'display': 'inline', 'cursor': 'pointer', 'background': '#ffd465'});
$("div.group").eq(0).css({'padding': '2px 2px 2px 4px', '-moz-border-radius-topleft': '5px', '-webkit-border-radius-topleft': '5px', 'border-top-left-radius': '5px', '-moz-border-radius-bottomleft': '5px', '-webkit-border-radius-bottomleft': '5px', 'border-bottom-left-radius': '5px'});
$("div.group").eq(1).css('padding', '2px 2px 2px 2px');
$("div.group").eq(2).css('padding', '2px 2px 2px 2px');
$("div.group").eq(3).css({'padding': '2px 4px 2px 2px', '-moz-border-radius-topright': '5px', '-webkit-border-radius-topright': '5px', 'border-top-right-radius': '5px', '-moz-border-radius-bottomright': '5px', '-webkit-border-radius-bottomright': '5px', 'border-bottom-right-radius': '5px'});
//-----

//--
$('ul.jcarousel-list.jcarousel-list-horizontal  li').css('display', 'none');
//--

//cookie1
    $("div.group").eq(0).click(function () {
        var closed = $("li#direction-1").is(":hidden");
       if (closed) {
            $("li#direction-1").show();
            $("li#direction-2").show();
            $("li#direction-3").show();
            $("li#direction-4").show();
            $("li#direction-5").show();
            $("li#direction-6").show(); 
            $("div.group").eq(0).css('background-color', '#D68533');
       }
       else {
            $("li#direction-1").hide();
            $("li#direction-2").hide();
            $("li#direction-3").hide();
            $("li#direction-4").hide();
            $("li#direction-5").hide();
            $("li#direction-6").hide(); 
            $("div.group").eq(0).css('background-color', '#ffd465');
       }

        setCookie("cookie1", closed, 365);
    });

    var openToggle = getCookie("cookie1");    
    if (openToggle=="true") {        
        $("li#direction-1").show();
        $("li#direction-2").show();
        $("li#direction-3").show();
        $("li#direction-4").show();
        $("li#direction-5").show();
        $("li#direction-6").show();
        $("div.group").eq(0).css('background-color', '#D68533');
    }
    else {        
        $("li#direction-1").hide();
        $("li#direction-2").hide();
        $("li#direction-3").hide();
        $("li#direction-4").hide();
        $("li#direction-5").hide();
        $("li#direction-6").hide();
        $("div.group").eq(0).css('background-color', '#ffd465');
    }
//cookie1

//cookie2
    $("div.group").eq(1).click(function () {
        var closed = $("li#direction-7").is(":hidden");
       if (closed) {
            $("li#direction-7").show();
            $("li#direction-8").show();
            $("li#direction-9").show();
            $("li#direction-10").show();
            $("li#direction-11").show();
            $("li#direction-12").show(); 
            $("div.group").eq(1).css('background-color', '#D68533');
       }
       else {
            $("li#direction-7").hide();
            $("li#direction-8").hide();
            $("li#direction-9").hide();
            $("li#direction-10").hide();
            $("li#direction-11").hide();
            $("li#direction-12").hide(); 
            $("div.group").eq(1).css('background-color', '#ffd465');
       }

        setCookie("cookie2", closed, 365);
    });

    var openToggle = getCookie("cookie2");    
    if (openToggle=="true") {        
        $("li#direction-7").show();
        $("li#direction-8").show();
        $("li#direction-9").show();
        $("li#direction-10").show();
        $("li#direction-11").show();
        $("li#direction-12").show();
        $("div.group").eq(1).css('background-color', '#D68533');
    }
    else {        
        $("li#direction-7").hide();
        $("li#direction-8").hide();
        $("li#direction-9").hide();
        $("li#direction-10").hide();
        $("li#direction-11").hide();
        $("li#direction-12").hide();
        $("div.group").eq(1).css('background-color', '#ffd465');
    }
//cookie2

//cookie3
    $("div.group").eq(2).click(function () {
        var closed = $("li#direction-13").is(":hidden");
       if (closed) {
            $("li#direction-13").show();
            $("li#direction-14").show();
            $("li#direction-15").show();
            $("li#direction-16").show();
            $("li#direction-17").show();
            $("li#direction-18").show(); 
            $("div.group").eq(2).css('background-color', '#D68533');
       }
       else {
            $("li#direction-13").hide();
            $("li#direction-14").hide();
            $("li#direction-15").hide();
            $("li#direction-16").hide();
            $("li#direction-17").hide();
            $("li#direction-18").hide(); 
            $("div.group").eq(2).css('background-color', '#ffd465');
       }

        setCookie("cookie3", closed, 365);
    });

    var openToggle = getCookie("cookie3");    
    if (openToggle=="true") {        
        $("li#direction-13").show();
        $("li#direction-14").show();
        $("li#direction-15").show();
        $("li#direction-16").show();
        $("li#direction-17").show();
        $("li#direction-18").show();
        $("div.group").eq(2).css('background-color', '#D68533');
    }
    else {        
        $("li#direction-13").hide();
        $("li#direction-14").hide();
        $("li#direction-15").hide();
        $("li#direction-16").hide();
        $("li#direction-17").hide();
        $("li#direction-18").hide();
        $("div.group").eq(2).css('background-color', '#ffd465');
    }
//cookie3

//cookie4
    $("div.group").eq(3).click(function () {
        var closed = $("li#direction-19").is(":hidden");
       if (closed) {
            $("li#direction-19").show();
            $("li#direction-20").show();
            $("li#direction-21").show();
            $("li#direction-24").show();
            $("div.group").eq(3).css('background-color', '#D68533');
       }
       else {
            $("li#direction-19").hide();
            $("li#direction-20").hide();
            $("li#direction-21").hide(); 
            $("li#direction-24").hide(); 
            $("div.group").eq(3).css('background-color', '#ffd465');
       }

        setCookie("cookie4", closed, 365);
    });

    var openToggle = getCookie("cookie4");    
    if (openToggle=="true") {        
        $("li#direction-19").show();
        $("li#direction-20").show();
        $("li#direction-21").show();
        $("li#direction-24").show();
        $("div.group").eq(3).css('background-color', '#D68533');
    }
    else {        
        $("li#direction-19").hide();
        $("li#direction-20").hide();
        $("li#direction-21").hide();
        $("li#direction-24").hide();
        $("div.group").eq(3).css('background-color', '#ffd465');
    }
//cookie4

//== free cookies ==
function setCookie(c_name, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = c_name + "=" + c_value;
}

function getCookie(c_name) {
    var i, x, y, ARRcookies = document.cookie.split(";");
    for (i = 0; i < ARRcookies.length; i++) {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == c_name) {
            return unescape(y);
        }
    }
}
//== free cookies ==