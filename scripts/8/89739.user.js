// ==UserScript==
// @name           BalticMaps.eu ADS Remover
// @namespace      http://blog.vienalga.net
// @include        http://www.balticmaps.eu/*
// @include        http://balticmaps.eu/*
// @include        http://www.balticmaps.lv/*
// @include        http://balticmaps.lv/*
// ==/UserScript==

// isolation for Opera
(function(){

// My Helper -----
function ByID(id){
	return document.getElementById(id) || null;
}
function ByTag(na){
	return document.getElementsByTagName(na)[0] || null;
}
function ByTags(na, fi){
	var t = document.getElementsByTagName(na);
	var r = [];
	if (fi) {
		for (var i=0; i<t.length; i++) {
			if (fi(t[i])) {
				r.push(t[i]);
			}
		}
		return r || null;
	}
	return t || null;
}
function Remove(el){
	if (el){
		el.parentNode.removeChild(el);
	}
}
function Style(el, ty, vl){
	if (el){
		el.style[ty] = vl;
	}
}
function ToDOM(el, ta, co){
	var tod = document.createElement(ta);
	tod.innerHTML = co;
	el.appendChild(tod);
}
// My Helper end -----




// remove first ad
Remove(ByID('banner_first'));

// remove head line ads and fix top positions
Remove(ByID('header'));
Style(ByID('top_slider'),'marginTop','0px');
Style(ByID('content_layer'),'marginTop','26px');

// remove scrollbar
Style(ByTag('BODY'),'overflow','hidden');

// remove BODY last DIV (ads)
Remove(ByID('corner_ad'));

// Remove Left side Ads
var a;
while((a = ByID('sidebar').lastElementChild).tagName == 'A')
	Remove(a);

// noprint
ByID('top_slider').className = 'kijs_noprint';
ByID('sidebar').className = 'kijs_noprint';

// move to DOM level fixes MAP resize script and toogles sidebar
ToDOM(ByTag('HEAD'),'script','\nfunction resizeMap (){ \
	var intMapH = $(window).height() - 26; \
	$("#content").height(intMapH);\n \
	$("#viewablemap").height(intMapH); \
}; \
resizeMap(); \
setTimeout(function(){map.switch_map.button_frame.className = "kijs_noprint"}, 5000);');

/* */
})();