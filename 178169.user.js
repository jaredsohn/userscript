// ==UserScript==
// @name            Leak Forums Color Changer 2
// @namespace       Snorlax
// @description     Change color
// @grant           GM_setValue
// @grant           GM_getValue
// @grant           GM_deleteValue
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @require         http://code.jquery.com/ui/1.10.3/jquery-ui.js
// @include         *leakforums.org/*
// @version         1.0
// ==/UserScript==

function rgbToHsl(r, g, b){
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;
    
    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    
    return [h, s, l];
}

$("head").append('<link rel="stylesheet" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" />');
$("body").attr("style","-webkit-filter: hue-rotate("+GM_getValue('color')+"deg);");
$("#posts").attr("style","-webkit-filter: hue-rotate("+(360-GM_getValue('color'))+"deg)");

$(".dd_left").find("ul").append("<li><a id='togglePick' href='#'>Toggle Color Changer</a></li>");
$("#togglePick").click(function(){
    $(this).hide();
    $("#colorPicker").toggle();
});
$(".dd_left").find("ul").append("<div id='colorPicker' style='display:none;'><div style='width:90%;margin:0 auto;margin-top:5px;' id='slider'></div><br /><center><input style='width:90%;' placeholder='#000000' type='text' id='hexColor'></input></center></div>");
$("#slider").slider({
    range: "max",
    min: 0,
    max: 360,
    value: GM_getValue('color'),
    slide: function( event, ui ) {
        GM_setValue('color',ui.value);
        $("body").attr("style","-webkit-filter: hue-rotate("+GM_getValue('color')+"deg);");
        $("#posts").attr("style","-webkit-filter: hue-rotate("+(360-GM_getValue('color'))+"deg)");
    }
});

$("#hexColor").change(function(){
    hex = $("#hexColor").val().replace("#","");
    r = parseInt(hex.substring(0,2),16);
    g = parseInt(hex.substring(2,4),16);
    b = parseInt(hex.substring(4,6),16);
    GM_setValue('color', rgbToHsl(r,g,b)[0] * 360-80.8);
    console.log(GM_getValue('color'));
    $('#slider').slider({value: GM_getValue('color')});
    $("body").attr("style","-webkit-filter: hue-rotate("+GM_getValue('color')+"deg);");
    $("#posts").attr("style","-webkit-filter: hue-rotate("+(360-GM_getValue('color'))+"deg)");
});