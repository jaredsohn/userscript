// ==UserScript==
// @name           Make Gamefly Topbar TOO AWESOME
// @namespace      http://userscripts.org/users/72838
// @description    Makes the Gamefly Topbar awesome
// @include        http://shacknews.com/laryn.x?*
// @include        http://*.shacknews.com/laryn.x?*

// ==/UserScript==

/*
var JQ_CL = document.createElement('script');
JQ_CL.src = 'http://plugins.jquery.com/files/jquery.color.js.txt';
JQ_CL.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(JQ_CL);
*/

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);



// Check if jQuery's loaded
function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,200); }
	else { $ = unsafeWindow.jQuery; letsJQuery();
		jQuery = $;
		(function(jQuery){jQuery.each(['backgroundColor','borderBottomColor','borderLeftColor','borderRightColor','borderTopColor','color','outlineColor'],function(i,attr){jQuery.fx.step[attr]=function(fx){if(fx.state==0){fx.start=getColor(fx.elem,attr);fx.end=getRGB(fx.end);}
	    fx.elem.style[attr]="rgb("+[Math.max(Math.min(parseInt((fx.pos*(fx.end[0]-fx.start[0]))+fx.start[0]),255),0),Math.max(Math.min(parseInt((fx.pos*(fx.end[1]-fx.start[1]))+fx.start[1]),255),0),Math.max(Math.min(parseInt((fx.pos*(fx.end[2]-fx.start[2]))+fx.start[2]),255),0)].join(",")+")";}});function getRGB(color){var result;if(color&&color.constructor==Array&&color.length==3)
	    return color;if(result=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(color))
	    return[parseInt(result[1]),parseInt(result[2]),parseInt(result[3])];if(result=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(color))
	    return[parseFloat(result[1])*2.55,parseFloat(result[2])*2.55,parseFloat(result[3])*2.55];if(result=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(color))
	    return[parseInt(result[1],16),parseInt(result[2],16),parseInt(result[3],16)];if(result=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(color))
	    return[parseInt(result[1]+result[1],16),parseInt(result[2]+result[2],16),parseInt(result[3]+result[3],16)];}
	    function getColor(elem,attr){var color;do{color=jQuery.curCSS(elem,attr);if(color!=''&&color!='transparent'||jQuery.nodeName(elem,"body"))
	    break;attr="backgroundColor";}while(elem=elem.parentNode);return getRGB(color);};})(jQuery);
	}
}
GM_wait();

// All your GM code must be inside this function
function letsJQuery() {
    var fontsize = $('#gfm_top_bar').css('font-size');
    smallfont = parseFloat(fontsize, 10);
    largefont = parseFloat(fontsize, 10) * 1.8;
    
    $('#gfm_top_bar > a').each(function () {
    //$('#gfm_top_bar > a:first').each(function () {
    	scaleLoop(this, smallfont);
    });
    
    function scaleLoop (obj, size) {
    	//var size = $(obj).css('font-size');
    	//size = parseFloat(fontsize, 10);
    	
    	var newsize;
    	if (size == smallfont) { newsize = largefont; }
    	else 				   { newsize = smallfont; }
    	
    	
    	var text = $(obj).text();
    	var letters = text.split("");
    	var newtext = "";
    	for (l in letters) {
    		l = letters[l];
    		if (Math.round(Math.random()) == 1) {
    			newtext = newtext + l.toUpperCase();
    		} else {
    			newtext = newtext + l.toLowerCase();
    		}
    	}
    	$(obj).text(newtext);
    	
    	var interval = Math.round((Math.random()*(1000-500))+500);
    	
    	var rcolor = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
    	var rcolor2 = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
    	
    	$(obj).animate({
    		fontSize: size,
    		color: rcolor,
    		backgroundColor: rcolor2
    	}, interval, 'swing', function () { scaleLoop(obj, newsize); });
    }
}