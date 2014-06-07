// ==UserScript==
// @name           Style Switcher (J)
// @namespace      -Sheldon-C-
// @version		   0.74.2
// @description    Der besste Weg langweilige webseiten auf zu peppen  
// @include        http://www.jappy.*
// @include        https://www.jappy.*
// @require        http://code.jquery.com/jquery-1.9.1.min.js
// @require        http://code.jquery.com/ui/1.10.2/jquery-ui.js
// @require        https://dl.dropbox.com/u/27347691/cookie.js
// @exclude        *ad*
// @grant          none
// ==/UserScript==





loadcss = document.createElement('link');
loadcss.setAttribute("rel", "stylesheet");
loadcss.setAttribute("type", "text/css");
loadcss.setAttribute("href", "http://code.jquery.com/ui/1.10.2/themes/smoothness/jquery-ui.css");
document.getElementsByTagName("head")[0].appendChild(loadcss);

loadcss = document.createElement('link');
loadcss.setAttribute("rel", "stylesheet");
loadcss.setAttribute("type", "text/css");
loadcss.setAttribute("href", "https://dl.dropboxusercontent.com/u/168600348/css/jappy/update.css");
document.getElementsByTagName("head")[0].appendChild(loadcss);

var dialog = document.createElement('div');
dialog.id = 'dialog';
document.body.insertBefore(dialog, document.body.firstChild);


///////////////////////////////////////////////////////////////////////     HEADER     ////////////////////////////////////


var sheldon = document.createElement('div');
sheldon.id = 'sheldon';
sheldon.innerHTML += '<div id="knopftrager1" class="knopftrager"><div class="knopftragerHeader">Themes von -Sheldon-C-<a href="https://www.jappy.de/user/-Sheldon-C-"><img class="linkpic" title="-Sheldon-C- bei Jappy" alt="" src="https://dl.dropboxusercontent.com/u/168600348/img/jappy/jappylnk.png"></a><a href="https://www.facebook.com/FacepooSheldonC"><img class="linkpic" title="-Sheldon-C- bei Facebook" alt="" src="https://dl.dropboxusercontent.com/u/168600348/img/jappy/facebooklnk.png"></a></div></div>';
document.getElementById('dialog').appendChild(sheldon);

var royal = document.createElement('div');
royal.id = 'royal';
royal.innerHTML += '<div id="knopftrager3" class="knopftrager"><div class="knopftragerHeader">Themes von -_Royal_Ace_-<a href="https://www.jappy.de/user/-_Royal_Ace_-"><img class="linkpic" title="-_Royal_Ace_- bei Jappy" alt="" src="https://dl.dropboxusercontent.com/u/168600348/img/jappy/jappylnk.png"></a><a href="https://www.facebook.com/RoyalAceDesign?notif_t=fbpage_fan_invite"><img class="linkpic" title="-_Royal_Ace_- bei Facebook" alt="" src="https://dl.dropboxusercontent.com/u/168600348/img/jappy/facebooklnk.png"></a></div></div>';
document.getElementById('dialog').appendChild(royal);

var funktionen = document.createElement('div');
funktionen.id = 'funktionen';
funktionen.innerHTML += '<div id="knopftrager2" class="knopftrager"><div class="knopftragerHeader">Funktionen</div></div>';
document.getElementById('dialog').appendChild(funktionen);

///////////////////////////////////////////////////////////////////////     BUTTONS     ////////////////////////////////////

var button = document.createElement('div');
button.id = 'button';
button.innerHTML += '<button class="groen" id="idGrün" style="border-color:#aaaaaa rgba(252,234,187,0) rgba(252,234,187,0) #aaaaaa;border-radius: 23px 0px 0px 0px;">Grün</button>';
document.getElementById('knopftrager1').appendChild(button);

var button2 = document.createElement('div');
button2.id = 'button2';
button2.innerHTML += '<button class="blau" id="idBlau" style="border-color:#aaaaaa #aaaaaa rgba(252,234,187,0) rgba(252,234,187,0);border-radius: 0px 23px 0px 0px;">Blau</button>';
document.getElementById('knopftrager1').appendChild(button2);

var button = document.createElement('div');
button.id = 'button';
button.innerHTML += '<button class="orange" id="idOrange" style="border-color: rgba(252,234,187,0) rgba(252,234,187,0) #aaaaaa rgba(252,234,187,0);border-radius: 0px 0px 0px 23px;">Orange</button>';
document.getElementById('knopftrager1').appendChild(button);

var button = document.createElement('div');
button.id = 'button';
button.innerHTML += '<button class="violette" id="idViolette" style="border-color: rgba(252,234,187,0) rgba(252,234,187,0) #aaaaaa rgba(252,234,187,0);border-radius: 0px 0px 23px 0px;">Violette</button>';
document.getElementById('knopftrager1').appendChild(button);


var button = document.createElement('div');
button.id = 'button';
button.innerHTML += '<button class="v4_1_musik_style" id="idv4_1_musik_style" style="border-color:#aaaaaa rgba(252,234,187,0) rgba(252,234,187,0) #aaaaaa;border-radius: 23px 0px 0px 0px;">V4.1 Musik Style</button>';
document.getElementById('knopftrager3').appendChild(button);

var button = document.createElement('div');
button.id = 'button';
button.innerHTML += '<button class="metalika" id="idmetalika" style="border-color:#aaaaaa #aaaaaa rgba(252,234,187,0) rgba(252,234,187,0);border-radius: 0px 23px 0px 0px;">Metallica</button>';
document.getElementById('knopftrager3').appendChild(button);

var button = document.createElement('div');
button.id = 'button';
button.innerHTML += '<button class="jappybook" id="idjappybook" style="border-color: rgba(252,234,187,0) rgba(252,234,187,0) #aaaaaa rgba(252,234,187,0);border-radius: 0px 0px 0px 23px;">Jappybook</button>';
document.getElementById('knopftrager3').appendChild(button);

var button = document.createElement('div');
button.id = 'button';
button.innerHTML += '<button class="platz1" id="idplatz" style="border-color: rgba(252,234,187,0) rgba(252,234,187,0) #aaaaaa rgba(252,234,187,0);border-radius: 0px 0px 23px 0px;">Platzhallter</button>';
document.getElementById('knopftrager3').appendChild(button);


var button = document.createElement('div');
button.id = 'button';
button.innerHTML += '<button class="zoom"  title="Leicht abgerundete ecken bei den Bildern und Zoom effeckt beim Mausover- Kann zu fehlern führen wenn *Pic Zoom (rund)* gleichzeitig aktiv ist" id="idZoom">Picture Zoom</button>';
document.getElementById('knopftrager2').appendChild(button);


var button = document.createElement('div');
button.id = 'button';
button.innerHTML += '<button class="zoom1" title="Runde Bilder und drehender Zoom - Kann zu fehlern führen wenn *Picture Zoom* gleichzeitig aktiv ist"  id="idZoomKreis">Pic Zoom (rund)</button>';
document.getElementById('knopftrager2').appendChild(button);
///////////////////////////////////////////////////////////////////////     FB LIKER     ////////////////////////////////////



var facebook = document.createElement('div');
facebook.id = 'facebook';
facebook.innerHTML += '<iframe src="//www.facebook.com/plugins/likebox.php?href=https%3A%2F%2Fwww.facebook.com%2Fpages%2FPimp-My-Side%2F117619278333445%3Fref%3Dtn_tnmn&amp;width=292&amp;height=62&amp;show_faces=false&amp;colorscheme=dark&amp;stream=false&amp;border_color&amp;header=true" scrolling="no" frameborder="0" style="border:none; overflow:hidden;float: left; width:280px; height:62px;" allowTransparency="true"></iframe>';
document.getElementById('dialog').appendChild(facebook);

var opener = document.createElement('div');
opener.id = 'opener';
opener.innerHTML += '<button class="offner" id="opener">Style switcher</button>';
document.getElementById('header').appendChild(opener);


///////////////////////////////////////////////////////////////////////     BLAU       ////////////////////////////////////
$(document).ready(function(){
    // Append the stylesheet on page load
    if ($.cookie('blauerkeks') === "true") {
        $('head').append('<link rel="stylesheet" href="https://dl.dropboxusercontent.com/u/168600348/css/jappy/blau.css" type="text/css" id="blau_css"/>');
    }
    // Add the click handler to switch the stylesheet on and off
    $("#idBlau").click(function () {
        if (!($.cookie('blauerkeks') === "true")) {
            $('head').append('<link rel="stylesheet" href="https://dl.dropboxusercontent.com/u/168600348/css/jappy/blau.css" id="blau_css"/>');
            $.cookie('blauerkeks','true',{path:'/'});
        }       
        else {
            // remove the high-contrast style
            $("#blau_css").remove();
            $.cookie('blauerkeks','false',{path:'/'});
        }
    });
});
////////////////////////////////////////////////////////////////////////      /GRÜN     ///////////////////////////////////
$(document).ready(function(){
    // Append the stylesheet on page load
    if ($.cookie('grünerkeks') === "true") {
        $('head').append('<link rel="stylesheet" href="https://dl.dropboxusercontent.com/u/168600348/css/jappy/Green.css" type="text/css" id="grün_css"/>');
    }
    // Add the click handler to switch the stylesheet on and off
    $("#idGrün").click(function () {
        if (!($.cookie('grünerkeks') === "true")) {
            $('head').append('<link rel="stylesheet" href="https://dl.dropboxusercontent.com/u/168600348/css/jappy/Green.css" id="grün_css"/>');
            $.cookie('grünerkeks','true',{path:'/'});
        }       
        else {
            // remove the high-contrast style
            $("#grün_css").remove();
            $.cookie('grünerkeks','false',{path:'/'});
        }
    });
});
/////////////////////////////////////////////////////////////////////////     ORANGE       ///////////////////////////////////
$(document).ready(function(){
    // Append the stylesheet on page load
    if ($.cookie('orangerkeks') === "true") {
        $('head').append('<link rel="stylesheet" href="https://dl.dropboxusercontent.com/u/168600348/css/jappy/orange.css" type="text/css" id="orange_css"/>');
    }
    // Add the click handler to switch the stylesheet on and off
    $("#idOrange").click(function () {
        if (!($.cookie('orangerkeks') === "true")) {
            $('head').append('<link rel="stylesheet" href="https://dl.dropboxusercontent.com/u/168600348/css/jappy/orange.css" id="orange_css"/>');
            $.cookie('orangerkeks','true',{path:'/'});
        }       
        else {
            // remove the high-contrast style
            $("#orange_css").remove();
            $.cookie('orangerkeks','false',{path:'/'});
        }
    });
});
/////////////////////////////////////////////////////////////////////////      VILETTE        ///////////////////////////////////
$(document).ready(function(){
    // Append the stylesheet on page load
    if ($.cookie('violetterkeks') === "true") {
        $('head').append('<link rel="stylesheet" href="https://dl.dropboxusercontent.com/u/168600348/css/jappy/violette.css" id="violette_css"/>');
    }
    // Add the click handler to switch the stylesheet on and off
    $("#idViolette").click(function () {
        if (!($.cookie('violetterkeks') === "true")) {
            $('head').append('<link rel="stylesheet" href="https://dl.dropboxusercontent.com/u/168600348/css/jappy/violette.css" id="violette_css"/>');
            $.cookie('violetterkeks','true',{path:'/'});
        }       
        else {
            // remove the high-contrast style
            $("#violette_css").remove();
            $.cookie('violetterkeks','false',{path:'/'});
        }
    });
});

/////////////////////////////////////////////////////////////////////////      v4.1_musik_style        ///////////////////////////////////
$(document).ready(function(){
    // Append the stylesheet on page load
    if ($.cookie('v4_1_musik_stylekeks') === "true") {
        $('head').append('<link rel="stylesheet" href="https://dl.dropboxusercontent.com/u/168600348/css/jappy/royal/V4_1%20Music%20Style.css" id="v4_1_musik_style_css"/>');
    }
    // Add the click handler to switch the stylesheet on and off
    $("#idv4_1_musik_style").click(function () {
        if (!($.cookie('v4_1_musik_stylekeks') === "true")) {
            $('head').append('<link rel="stylesheet" href="https://dl.dropboxusercontent.com/u/168600348/css/jappy/royal/V4_1%20Music%20Style.css" id="v4_1_musik_style_css"/>');
            $.cookie('v4_1_musik_stylekeks','true',{path:'/'});
        }       
        else {
            // remove the high-contrast style
            $("#v4_1_musik_style_css").remove();
            $.cookie('v4_1_musik_stylekeks','false',{path:'/'});
        }
    });
});

/////////////////////////////////////////////////////////////////////////      v4.1_musik_style        ///////////////////////////////////
$(document).ready(function(){
    // Append the stylesheet on page load
    if ($.cookie('metalikakeks') === "true") {
        $('head').append('<link rel="stylesheet" href="https://dl.dropboxusercontent.com/u/168600348/css/jappy/royal/metalika.css" id="metalika_css"/>');
    }
    // Add the click handler to switch the stylesheet on and off
    $("#idmetalika").click(function () {
        if (!($.cookie('metalikakeks') === "true")) {
            $('head').append('<link rel="stylesheet" href="https://dl.dropboxusercontent.com/u/168600348/css/jappy/royal/metalika.css" id="metalika_css"/>');
            $.cookie('metalikakeks','true',{path:'/'});
        }       
        else {
            // remove the high-contrast style
            $("#metalika_css").remove();
            $.cookie('metalikakeks','false',{path:'/'});
        }
    });
});
/////////////////////////////////////////////////////////////////////////      JAPPYBOOKA        ///////////////////////////////////
$(document).ready(function(){
    // Append the stylesheet on page load
    if ($.cookie('jappybkeks') === "true") {
        $('head').append('<link rel="stylesheet" href="https://dl.dropboxusercontent.com/u/168600348/css/jappy/royal/jappybook.css" id="jappybook_css"/>');
    }
    // Add the click handler to switch the stylesheet on and off
    $("#idjappybook").click(function () {
        if (!($.cookie('jappybkeks') === "true")) {
            $('head').append('<link rel="stylesheet" href="https://dl.dropboxusercontent.com/u/168600348/css/jappy/royal/jappybook.css" id="jappybook_css"/>');
            $.cookie('jappybkeks','true',{path:'/'});
        }       
        else {
            // remove the high-contrast style
            $("#jappybook_css").remove();
            $.cookie('jappybkeks','false',{path:'/'});
        }
    });
});
/////////////////////////////////////////////////////////////////////////       ZOOOM      ///////////////////////////////////
$(document).ready(function(){
    // Append the stylesheet on page load
    if ($.cookie('zoomkeks') === "true") {
        $('head').append('<link rel="stylesheet" href="https://dl.dropboxusercontent.com/u/168600348/css/jappy/zoom.css" id="zoom_css"/>');
    }
    // Add the click handler to switch the stylesheet on and off
    $("#idZoom").click(function () {
        if (!($.cookie('zoomkeks') === "true")) {
            $('head').append('<link rel="stylesheet" href="https://dl.dropboxusercontent.com/u/168600348/css/jappy/zoom.css" id="zoom_css"/>');
            $.cookie('zoomkeks','true',{path:'/'});
        }       
        else {
            // remove the high-contrast style
            $("#zoom_css").remove();
            $.cookie('zoomkeks','false',{path:'/'});
        }
    });
});
/////////////////////////////////////////////////////////////////////////       ZOOOM Rund     ///////////////////////////////////
$(document).ready(function(){
    // Append the stylesheet on page load
    if ($.cookie('zoom1keks') === "true") {
        $('head').append('<link rel="stylesheet" href="https://dl.dropboxusercontent.com/u/168600348/css/jappy/zoom%28rund%29.css" id="zoom1_css"/>');
    }
    // Add the click handler to switch the stylesheet on and off
    $("#idZoomKreis").click(function () {
        if (!($.cookie('zoom1keks') === "true")) {
            $('head').append('<link rel="stylesheet" href="https://dl.dropboxusercontent.com/u/168600348/css/jappy/zoom%28rund%29.css" id="zoom1_css"/>');
            $.cookie('zoom1keks','true',{path:'/'});
        }       
        else {
            // remove the high-contrast style
            $("#zoom1_css").remove();
            $.cookie('zoom1keks','false',{path:'/'});
        }
    });
});




 $(function() {
$( "#dialog" ).dialog({
autoOpen: false,
resizable: false,
draggable: false ,
show: {
effect: "blind",
duration: 600
},
hide: {
effect: "explode",
duration: 400
}
});

$( "#opener" ).click(function() {
$( "#dialog" ).dialog( "open" );
});
});
