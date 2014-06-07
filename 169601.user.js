// ==UserScript==
// @name           Facebook Ad Remover by Rohit Mewada
// @description    Removes annoying Facebook ads, and expands the newsfeed!
// @author         Rohit Mewada
// @include        http://*.facebook.*
// @include        https://*.facebook.*
// @version        1.0
// ==/UserScript==

//Parent Element To Ads
grandparent = document.getElementById('globalContainer'); 
var removeAdz = function(){
//Ads
document.getElementById('pagelet_ego_pane_w').style.visibility = 'hidden'; 
document.getElementById('pagelet_reminders').style.visibility = 'hidden'; 
document.getElementById('pagelet_rhc_footer').style.visibility = 'hidden'; 
document.getElementById('rightCol').style.width = '0px'; 
document.getElementById('contentArea').style.width = '90%'; 
}
//Below function happens whenever the contents of 
//grandparent change
grandparent.addEventListener("DOMSubtreeModified", removeAdz, true);
//fires off the function to start with
removeAdz();

function create_back_to_top() {
if(document.body){
	var a = document.createElement('span');
	a.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"http://www.rnhckr.com/\">RN Hckr</a>";
	var c = "opacity:0.7;position:fixed;text-align:right;right:0px;bottom:0px;z-index:50000;";
	c+="border: 2px solid;-moz-border-top-colors: ThreeDLightShadow ThreeDHighlight;-moz-border-right-colors: ThreeDDarkShadow ThreeDShadow;-moz-border-bottom-colors: ThreeDDarkShadow ThreeDShadow;-moz-border-left-colors: ThreeDLightShadow ThreeDHighlight;padding: 3px;color: MenuText;background-color: Menu;font-size:9pt;font-family:arial,sans-serif;cursor:pointer;";
	a.style.cssText = c;
	a.addEventListener('mouseover', function(){ a.style.opacity = 1; }, false);
	a.addEventListener('mouseout', function(){ a.style.opacity = 0.5; }, false);
	a.addEventListener('click', function(){ window.scrollTo(0,0); }, false);
	document.body.appendChild(a);
	}
};

if(self==top) create_back_to_top();