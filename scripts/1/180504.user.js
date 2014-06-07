// ==UserScript==
// @name	Scroll to Bottom or Top
// @author	XiaotianChen
// @namespace	http://userscripts.org/users/XiaotianChen
// @description	为网页增加向页尾、页首的按钮
// @version     2013.10.23.1
// @include     *
// @exclude     http://*facebook.com*
// @exclude     https://*facebook.com*
// @downloadURL http://userscripts.org/scripts/source/180504.user.js
// @updateURL   http://userscripts.org/scripts/source/180504.meta.js
// @icon        http://h.hiphotos.baidu.com/album/s%3D740%3Bq%3D90/sign=b3bb49b55ab5c9ea66f301e7e502c73d/d53f8794a4c27d1e553b447a1ad5ad6eddc4386a.jpg
// ==/UserScript==

//top按钮
var a = document.createElement('span');
var c = 'opacity:0.5;-moz-transition-duration:0.2s;-webkit-transition-duration:0.2s;background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAUBAMAAAByuXB5AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAbUExURf///6qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpshoL4AAAAIdFJOUwARM2aImczuGAB4owAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAEZJREFUGNNj6IABBgQLB2BME4CyxDoSIQymio52BTBLHaixCMRgrgCy2g2ALAuwac0MDCxQgx0YIqCsVhTbOIBUA9gUslkA7dcxR/3Xli8AAAAASUVORK5CYII=") no-repeat scroll 50% 50% rgba(0, 152, 255, 1);border-radius:0px 0px 0px 0px;cursor:pointer;position:fixed;bottom:50%;width:36px;height:36px;right:10px;z-index:9999';
a.style.cssText = c; 
a.addEventListener('mouseover', function(){ a.style.opacity = 1;}, false);
a.addEventListener('mouseout', function(){ a.style.opacity = 0.5; }, false);
a.addEventListener('click', function(){ window.scrollTo(0,0); }, false);
//a.addEventListener('click', function(){ $("html,body").animate({scrollTop:"0px"},200); }, false );
document.body.appendChild(a);

//bottom按钮
var newHeight = document.body.scrollHeight;
var b = document.createElement('span');
var d = 'opacity:0.5;-moz-transition-duration:0.2s;-webkit-transition-duration:0.2s;background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAUBAMAAAByuXB5AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAbUExURf///6qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpshoL4AAAAIdFJOUwARM2aImczuGAB4owAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAE1JREFUGNNjYGDg6OjoaGAAAfJZHTDAEAFltDKwQFkODAwWYEYzUCFzBZDRbgDSqw5kFYFNYaroaFcAsxjEOhIhDAbGNAEGHABhG5wFAH6qMUfw6SaOAAAAAElFTkSuQmCC") no-repeat scroll 50% 50% rgba(0, 152, 255, 1);border-radius:0px 0px 0px 0px;cursor:pointer;position:fixed;bottom:50%;width:36px;height:36px;right:10px;z-index:9999';//top:52%;
b.style.cssText = d;   
b.addEventListener('mouseover', function(){ b.style.opacity = 1; }, false);
b.addEventListener('mouseout', function(){ b.style.opacity = 0.5; }, false);
b.addEventListener('click', function(){ window.scrollTo(0,newHeight); }, false);
document.body.appendChild(b);

//http://file.ithome.com/js/common.js
var lastScrollY=0;
(function gotop(){
	var diffY;
	if (document.documentElement && document.documentElement.scrollTop)
		diffY = document.documentElement.scrollTop;
	else if (document.body)
        diffY = document.body.scrollTop;
	else
		{/*Netscape stuff*/}
	percent=.1*(diffY-lastScrollY);
	if(percent>0)percent=Math.ceil(percent);
	else percent=Math.floor(percent);
	lastScrollY=lastScrollY+percent;
	if(lastScrollY>100){
	a.style.display="block";b.style.display="none";
	} else {
        b.style.display="block";a.style.display="none";
	}
        setTimeout(gotop,1);
})();


