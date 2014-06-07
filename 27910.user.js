// ==UserScript==
// @name           Navigation Top and Bottom
// @author         Billy Blue
// @namespace      http://RayAndLaura.com
// @description    Add navigation at top and bottom of each page. At the top, from left to right - Close Top Navigation, Decrement 2, Decrement 1, Increment 1, Increment 2, Scroll to Top. At the bottom, from left to right - Close Bottom Navigation, Scroll to Bottom.
// @include        *
// ==/UserScript==

// Create link to top.
function create_back_to_top() {

if(document.body){
	var to_top = document.createElement('span');
	to_top.id= 'top';
	to_top.innerHTML = "&uarr;";
	var to_top_c = "opacity:0.7;position:fixed;text-align:right;right:0px;top:0px;z-index:50000;";
	to_top_c+="border: 2px solid;-moz-border-top-colors: ThreeDLightShadow ThreeDHighlight;-moz-border-right-colors: ThreeDDarkShadow ThreeDShadow;-moz-border-bottom-colors: ThreeDDarkShadow ThreeDShadow;-moz-border-left-colors: ThreeDLightShadow ThreeDHighlight;padding: 2px;color: MenuText;background-color: Menu;font-size:8pt;font-family:arial,sans-serif;cursor:pointer;";
	to_top.style.cssText = to_top_c;
	to_top.addEventListener('mouseover', function(){ to_top.style.opacity = 1; }, false);
	to_top.addEventListener('mouseout', function(){ to_top.style.opacity = 0.5; }, false);
	to_top.addEventListener('click', function(){ window.scrollTo(0,0); }, false);
	document.body.appendChild(to_top);

	var z = document.createElement('span');
	z.id= 'bottom';
	z.innerHTML = "&darr;";
	var y = "opacity:0.7;position:fixed;text-align:right;right:0px;bottom:0px;z-index:50000;";
	y+="border: 2px solid;-moz-border-top-colors: ThreeDLightShadow ThreeDHighlight;-moz-border-right-colors: ThreeDDarkShadow ThreeDShadow;-moz-border-bottom-colors: ThreeDDarkShadow ThreeDShadow;-moz-border-left-colors: ThreeDLightShadow ThreeDHighlight;padding: 2px;color: MenuText;background-color: Menu;font-size:8pt;font-family:arial,sans-serif;cursor:pointer;";
	z.style.cssText = y;
	var winWidth = (document.body.clientWidth);
	var winHeight = (document.body.clientHeight);
	z.addEventListener('mouseover', function(){ z.style.opacity = 1; }, false);
	z.addEventListener('mouseout', function(){ z.style.opacity = 0.5; }, false);
	z.addEventListener('click', function(){ window.scrollTo(winWidth*100000,winHeight*100000); }, false);
	document.body.appendChild(z);

	var inc2 = document.createElement('span');
	inc2.id = 'inc2';
	inc2.innerHTML = "&raquo;";
	var y = "opacity:0.7;position:fixed;text-align:right;right:14px;top:0px;z-index:50000;";
	y+="border: 2px solid;-moz-border-top-colors: ThreeDLightShadow ThreeDHighlight;-moz-border-right-colors: ThreeDDarkShadow ThreeDShadow;-moz-border-bottom-colors: ThreeDDarkShadow ThreeDShadow;-moz-border-left-colors: ThreeDLightShadow ThreeDHighlight;padding: 2px;color: MenuText;background-color: Menu;font-size:8pt;font-family:arial,sans-serif;cursor:pointer;";
	inc2.style.cssText = y;
	inc2.addEventListener('mouseover', function(){ inc2.style.opacity = 1; }, false);
	inc2.addEventListener('mouseout', function(){ inc2.style.opacity = 0.5; }, false);
	inc2.addEventListener('click', function(){ var e,s; IB=2; function isDigit(c) { return ("0" <= c && c <= "9") } L = location.href; LL = L.length; for (e=LL-1; e>=0; --e) if (isDigit(L.charAt(e))) { for(s=e-1; s>=0; --s) if (!isDigit(L.charAt(s))) break; break; } ++s; if (e<0) return; oldNum = L.substring(s,e+1); newNum = "" + (parseInt(oldNum,10) + IB); while (newNum.length < oldNum.length) newNum = "0" + newNum; location.href = L.substring(0,s) + newNum + L.slice(e+1); }, false);
	document.body.appendChild(inc2);

	var inc = document.createElement('span');
	inc.id = 'inc';
	inc.innerHTML = "&rsaquo;";
	var y = "opacity:0.7;position:fixed;text-align:right;right:28px;top:0px;z-index:50000;";
	y+="border: 2px solid;-moz-border-top-colors: ThreeDLightShadow ThreeDHighlight;-moz-border-right-colors: ThreeDDarkShadow ThreeDShadow;-moz-border-bottom-colors: ThreeDDarkShadow ThreeDShadow;-moz-border-left-colors: ThreeDLightShadow ThreeDHighlight;padding: 2px;color: MenuText;background-color: Menu;font-size:8pt;font-family:arial,sans-serif;cursor:pointer;";
	inc.style.cssText = y;
	inc.addEventListener('mouseover', function(){ inc.style.opacity = 1; }, false);
	inc.addEventListener('mouseout', function(){ inc.style.opacity = 0.5; }, false);
	inc.addEventListener('click', function(){ var e,s; IB=1; function isDigit(c) { return ("0" <= c && c <= "9") } L = location.href; LL = L.length; for (e=LL-1; e>=0; --e) if (isDigit(L.charAt(e))) { for(s=e-1; s>=0; --s) if (!isDigit(L.charAt(s))) break; break; } ++s; if (e<0) return; oldNum = L.substring(s,e+1); newNum = "" + (parseInt(oldNum,10) + IB); while (newNum.length < oldNum.length) newNum = "0" + newNum; location.href = L.substring(0,s) + newNum + L.slice(e+1); }, false);
	document.body.appendChild(inc);

	var dec = document.createElement('span');
	dec.id = 'dec';
	dec.innerHTML = "&lsaquo;";
	var y = "opacity:0.7;position:fixed;text-align:right;right:40px;top:0px;z-index:50000;";
	y+="border: 2px solid;-moz-border-top-colors: ThreeDLightShadow ThreeDHighlight;-moz-border-right-colors: ThreeDDarkShadow ThreeDShadow;-moz-border-bottom-colors: ThreeDDarkShadow ThreeDShadow;-moz-border-left-colors: ThreeDLightShadow ThreeDHighlight;padding: 2px;color: MenuText;background-color: Menu;font-size:8pt;font-family:arial,sans-serif;cursor:pointer;";
	dec.style.cssText = y;
	dec.addEventListener('mouseover', function(){ dec.style.opacity = 1; }, false);
	dec.addEventListener('mouseout', function(){ dec.style.opacity = 0.5; }, false);
	dec.addEventListener('click', function(){ var e,s; IB=-1; function isDigit(c) { return ("0" <= c && c <= "9") } L = location.href; LL = L.length; for (e=LL-1; e>=0; --e) if (isDigit(L.charAt(e))) { for(s=e-1; s>=0; --s) if (!isDigit(L.charAt(s))) break; break; } ++s; if (e<0) return; oldNum = L.substring(s,e+1); newNum = "" + (parseInt(oldNum,10) + IB); while (newNum.length < oldNum.length) newNum = "0" + newNum; location.href = L.substring(0,s) + newNum + L.slice(e+1); }, false);
	document.body.appendChild(dec);

	var dec2 = document.createElement('span');
	dec2.id = 'dec2';
	dec2.innerHTML = "&laquo;";
	var y = "opacity:0.7;position:fixed;text-align:right;right:52px;top:0px;z-index:50000;";
	y+="border: 2px solid;-moz-border-top-colors: ThreeDLightShadow ThreeDHighlight;-moz-border-right-colors: ThreeDDarkShadow ThreeDShadow;-moz-border-bottom-colors: ThreeDDarkShadow ThreeDShadow;-moz-border-left-colors: ThreeDLightShadow ThreeDHighlight;padding: 2px;color: MenuText;background-color: Menu;font-size:8pt;font-family:arial,sans-serif;cursor:pointer;";
	dec2.style.cssText = y;
	dec2.addEventListener('mouseover', function(){ dec2.style.opacity = 1; }, false);
	dec2.addEventListener('mouseout', function(){ dec2.style.opacity = 0.5; }, false);
	dec2.addEventListener('click', function(){ var e,s; IB=-2; function isDigit(c) { return ("0" <= c && c <= "9") } L = location.href; LL = L.length; for (e=LL-1; e>=0; --e) if (isDigit(L.charAt(e))) { for(s=e-1; s>=0; --s) if (!isDigit(L.charAt(s))) break; break; } ++s; if (e<0) return; oldNum = L.substring(s,e+1); newNum = "" + (parseInt(oldNum,10) + IB); while (newNum.length < oldNum.length) newNum = "0" + newNum; location.href = L.substring(0,s) + newNum + L.slice(e+1); }, false);
	document.body.appendChild(dec2);

	var hide = document.createElement('span');
	hide.id = 'hide';
	hide.innerHTML = "x";
	var y = "opacity:0.7;position:fixed;text-align:right;right:66px;top:0px;z-index:50000;";
	y+="border: 2px solid;-moz-border-top-colors: ThreeDLightShadow ThreeDHighlight;-moz-border-right-colors: ThreeDDarkShadow ThreeDShadow;-moz-border-bottom-colors: ThreeDDarkShadow ThreeDShadow;-moz-border-left-colors: ThreeDLightShadow ThreeDHighlight;padding: 2px;color: MenuText;background-color: Menu;font-size:8pt;font-family:arial,sans-serif;cursor:pointer;";
	hide.style.cssText = y;
	var ids=new Array('top','inc2','inc','dec','dec2','hide');
	hide.addEventListener('mouseover', function(){ hide.style.opacity = 1; }, false);
	hide.addEventListener('mouseout', function(){ hide.style.opacity = 0.5; }, false);
	hide.addEventListener('click', function(){ for (var i=0;i<ids.length;i++){ document.getElementById(ids[i]).style.display = 'none';} }, false);
	document.body.appendChild(hide);

	var hide2 = document.createElement('span');
	hide2.id = 'hide2';
	hide2.innerHTML = "x";
	var y = "opacity:0.7;position:fixed;text-align:right;right:14px;bottom:0px;z-index:50000;";
	y+="border: 2px solid;-moz-border-top-colors: ThreeDLightShadow ThreeDHighlight;-moz-border-right-colors: ThreeDDarkShadow ThreeDShadow;-moz-border-bottom-colors: ThreeDDarkShadow ThreeDShadow;-moz-border-left-colors: ThreeDLightShadow ThreeDHighlight;padding: 2px;color: MenuText;background-color: Menu;font-size:8pt;font-family:arial,sans-serif;cursor:pointer;";
	hide2.style.cssText = y;
	var ids2=new Array('hide2', 'bottom');
	hide2.addEventListener('mouseover', function(){ hide2.style.opacity = 1; }, false);
	hide2.addEventListener('mouseout', function(){ hide2.style.opacity = 0.5; }, false);
	hide2.addEventListener('click', function(){ for (var i=0;i<ids2.length;i++){ document.getElementById(ids2[i]).style.display = 'none';} }, false);
	document.body.appendChild(hide2);


	}

};

if(self==top) create_back_to_top();