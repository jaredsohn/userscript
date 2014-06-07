// ==UserScript==
// @name           Top/Bot Buttons
// @namespace      
// @description    
// @include        http:*
// ==/UserScript==

// Create link to top.
function create_back_to_top() {
if(document.body){
  
	var to_top = document.createElement('span');
	to_top.id= 'top';
	to_top.innerHTML = "Top";
	var to_top_c = "opacity:0.7;position:fixed;text-align:left;left:1310px;top:2px;z-index:50000;";
	to_top_c+="border: 3px solid;-moz-border-top-colors: ThreeDLightShadow ThreeDHighlight;-moz-border-right-colors: ThreeDDarkShadow ThreeDShadow;-moz-border-Bottom-colors: ThreeDDarkShadow ThreeDShadow;-moz-border-left-colors: ThreeDLightShadow ThreeDHighlight;padding: 2px;color: MenuText;background-color: Menu;font-size:8pt;font-family:arial,sans-serif;cursor:pointer;";
	to_top.style.cssText = to_top_c;
	to_top.addEventListener('mouseover', function(){ to_top.style.opacity = 1; }, false);
	to_top.addEventListener('mouseout', function(){ to_top.style.opacity = 0.5; }, false);
	to_top.addEventListener('click', function(){ window.scrollTo(0,0); }, false);
	document.body.appendChild(to_top);

	var z = document.createElement('span');
	z.id= 'Bot';
	z.innerHTML = "End";
	var y = "opacity:0.7;position:fixed;text-align:left;left:1350px;top:2px;z-index:50000;";
	y+="border: 3px solid;-moz-border-top-colors: ThreeDLightShadow ThreeDHighlight;-moz-border-right-colors: ThreeDDarkShadow ThreeDShadow;-moz-border-Bottom-colors: ThreeDDarkShadow ThreeDShadow;-moz-border-left-colors: ThreeDLightShadow ThreeDHighlight;padding: 2px;color: MenuText;background-color: Menu;font-size:8pt;font-family:arial,sans-serif;cursor:pointer;";
	z.style.cssText = y;
	var winWidth = (document.body.clientWidth);
	var winHeight = (document.body.clientHeight);
	z.addEventListener('mouseover', function(){ z.style.opacity = 1; }, false);
	z.addEventListener('mouseout', function(){ z.style.opacity = 0.5; }, false);
	z.addEventListener('click', function(){ window.scrollTo(winWidth*0,winHeight*50000); }, false);
	document.body.appendChild(z);
	}
};

if(self==top) create_back_to_top();

