// ==UserScript==
// @name           TehConnection Net Worth
// @namespace      https://tehconnection.eu
// @description    Show the current download surplus or deficit in relation to a target ratio.
// @version        2011.09.13
// @include        http*://*tehconnection.eu/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.3/jquery.js
// ==/UserScript==

/** copyCSS plugin taken from: http://plugins.jquery.com/project/copyCSS **/
$.fn.copyCSS = function(source){
    var dom = $(source).get(0);
    var style;
    var dest = {};
    if(window.getComputedStyle){
        var camelize = function(a,b){
            return b.toUpperCase();
        };
        style = window.getComputedStyle(dom, null);
        for(var i = 0, l = style.length; i < l; i++){
            var prop = style[i];
            var camel = prop.replace(/\-([a-z])/g, camelize);
            var val = style.getPropertyValue(prop);
            dest[camel] = val;
        };
        return this.css(dest);
    };
    if(style = dom.currentStyle){
        for(var prop in style){
            dest[prop] = style[prop];
        };
        return this.css(dest);
   };
   if(style = dom.style){
      for(var prop in style){
        if(typeof style[prop] != 'function'){
          dest[prop] = style[prop];
        };
      };
    };
    return this.css(dest);
};

var prefixes = ['k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];
function prefixValue(prefixLetter, useBinary){
	useBinary = typeof(useBinary) == 'boolean' ? useBinary : true;
	for(var i=0; i<prefixes.length; i++)
		if(prefixes[i]==prefixLetter)
			return useBinary ? Math.pow(1024, i+1) : Math.pow(1000, i+1);
}
function toBytes(text, useBinary){
	useBinary = typeof(useBinary) == 'boolean' ? useBinary : true;
	text = text.split(' ');
	return parseFloat(text[0]) * prefixValue(text[1].substr(0, 1), useBinary);
}
function fromBytes(byteCount, useBinary){
	useBinary = typeof(useBinary) == 'boolean' ? useBinary : true;
	var base = useBinary ? 1024 : 1000;
	byteCount = Math.round(byteCount);
	var sign = byteCount<0 ? '-' : '';
	byteCount = Math.abs(byteCount);
	if(byteCount<1000) return sign+byteCount+' B';
	for(var i=1; i<prefixes.length; i++)
		if(byteCount< Math.pow(base, i+1))
			return sign + (byteCount/Math.pow(base, i)).toFixed(2) + ' ' + prefixes[i-1] + 'B';
	return sign + (byteCount/Math.pow(base, prefixes.length)).toFixed(2) + 'YB';
}

function setWantedRatio(){
	var wantedRatioString = prompt('What ratio do you want to maintain?', getWantedRatio().toFixed(2));
	if(wantedRatioString != null){
		var wantedRatio = parseFloat(wantedRatioString);
		if(isNaN(wantedRatio) || wantedRatio<=0){
			if(isNaN(getWantedRatio()) || getWantedRatio()<=0)
				GM_setValue('wantedRatio', '1.0');
			alert("Error: '"+wantedRatioString+"' is not a valid ratio, please enter a positive number like 1.07 or 2.5\n\nCurrent target ratio is: " + getWantedRatio());
		}else{
			GM_setValue('wantedRatio', ''+wantedRatio);
			updateNet();
		}
	}
}

function getWantedRatio(){
	return parseFloat(GM_getValue('wantedRatio', '1.0'));
}

function usesStyle(styleName){
	return $('link[rel="stylesheet"]').filter(function(){return RegExp(styleName, "i").test(this.href);}).length > 0;
}

var up;
var down;
function updateNet(){
	var surplus = up/getWantedRatio()-down;
	if(surplus>=0){
		surplus = fromBytes(surplus)
		$('.stat.net').text(surplus);	
		$('#net_name').text('Surplus:');
		$('span.net').copyCSS('.stat.up');
		$('.stat.net').attr('title', 'You can download another '+surplus+' before your ratio drops to '+getWantedRatio());
	}else{
		var deficit = fromBytes(down*getWantedRatio()-up);
		$('.stat.net').text(deficit);
		$('#net_name').text('Deficit:');
		$('span.net').copyCSS('.stat.down');
		$('.stat.net').attr('title', 'You need to upload another '+deficit+' to reach the ratio '+getWantedRatio());
	}
	$('#net_name').attr('title', 'Set a new ratio goal. Current target ratio: '+getWantedRatio());
}

$(document).ready(function() {
	up = toBytes($('.stat.up').html())
	down = toBytes($('.stat.down').html());
	$('#stat_ratio').append(' <span class="toolbox_seperator">|</span>');
	$(usesStyle('mono') ? '#stat_ratio' : '#user_stats').append('<span id="stat_net"><span id="net_name"></span> <span class="stat net"></span></span>');
	$('#net_name').copyCSS('#stat_up a');
	$('#net_name').click(setWantedRatio);
	updateNet();
});