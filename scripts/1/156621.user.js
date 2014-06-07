// ==UserScript==
// @name       Colorswitch
// @namespace  /m36
// @version    0.1
// @include    http*://forum.mods.de/*
// @description  fun with colors
// @copyright  2012 m36
// @grant       none
// ==/UserScript==
function hexToRgb(hex) {
    var result = /^#?([a-fA-F\d]{2})([a-fA-F\d]{2})([a-fA-F\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
function rgbToHsv(r, g, b){
    r = r/255, g = g/255, b = b/255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, v = max;

    var d = max - min;
    s = max == 0 ? 0 : d / max;

    if(max == min){
        h = 0;
    }else{
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, v];
}
function hsvToRgb(h, s, v){
    var r, g, b;

    var i = Math.floor(h * 6);
    var f = h * 6 - i;
    var p = v * (1 - s);
    var q = v * (1 - f * s);
    var t = v * (1 - (1 - f) * s);

    switch(i % 6){
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
	
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}
function convertRGBDecimalToHex(rgb)
{
    var regex = /rgb *\( *([0-9]{1,3}) *, *([0-9]{1,3}) *, *([0-9]{1,3}) *\)/;
    var values = regex.exec(rgb);
	if (values != null) {
		if(values.length != 4)
		{
			return rgb; // fall back to what was given.              
		}
		var r = Math.round(parseFloat(values[1]));
		var g = Math.round(parseFloat(values[2]));
		var b = Math.round(parseFloat(values[3]));
		return "#" 
			+ (r + 0x10000).toString(16).substring(3).toUpperCase() 
			+ (g + 0x10000).toString(16).substring(3).toUpperCase()
			+ (b + 0x10000).toString(16).substring(3).toUpperCase();
	} else return rgb;
}

var items = document.getElementsByTagName('*');
var attributes = ["background-color"];
setInterval(function(){myTimer()},1000);
counter = 0;
function myTimer(){
	for (var n=0;n<attributes.length;n++) {
		for (var i=0;i<items.length;i++) {
			style = window.getComputedStyle(items[i], null).getPropertyValue(attributes[n]);
			if (/rgb *\( *([0-9]{1,3}) *, *([0-9]{1,3}) *, *([0-9]{1,3}) *\)/.exec(style)) {
				style = convertRGBDecimalToHex(style);
				if (/^#?([a-fA-F\d]{2})([a-fA-F\d]{2})([a-fA-F\d]{2})$/i.exec(style)) {
					temp = hexToRgb(style);
					temp2 = rgbToHsv(temp.r,temp.g,temp.b);
					temp2[0] = (temp2[0]+0.01);
					if (temp2[0]>=1) temp2[0] = (temp2[0]-1);
					temp3 = hsvToRgb(temp2[0],temp2[1],temp2[2]);
					newstyle=rgbToHex(temp3[0],temp3[1],temp3[2]);
					if (style!=newstyle && /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(newstyle)) {
						items[i].removeAttribute("bgcolor");
						items[i].removeAttribute(attributes[n]);
						items[i].setAttribute("style",attributes[n]+":"+newstyle+" !important");
						counter++;
					}
				} else delete items[i];
			} else delete items[i];
		}
	}
	//document.title = counter;
}