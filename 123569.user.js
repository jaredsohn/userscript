// ==UserScript==
// @id             liansishen
// @name           toTop&toEnd
// @version        1.0
// @namespace      
// @author         
// @description    
// @include        *
// @run-at         document-end
// ==/UserScript==
/* ************************ 页面效果 ************************ */
//top按钮
function create_back_to_top(a) {
if(document.body){
	var a = document.createElement('span');
	var c = 'opacity:0.3;-moz-transition-duration:0.2s;background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAUBAMAAAByuXB5AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAbUExURf///6qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpshoL4AAAAIdFJOUwARM2aImczuGAB4owAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAEZJREFUGNNj6IABBgQLB2BME4CyxDoSIQymio52BTBLHaixCMRgrgCy2g2ALAuwac0MDCxQgx0YIqCsVhTbOIBUA9gUslkA7dcxR/3Xli8AAAAASUVORK5CYII=") no-repeat scroll 50% 50% rgba(0, 0, 0, 0.7);border-radius:5px 0 0 5px;cursor:pointer;position:fixed;bottom:51%;width:50px;height:50px;right:0;z-index:9999';
	a.style.cssText = c;
	a.addEventListener('mouseover', function(){ a.style.opacity = 1; }, false);
	a.addEventListener('mouseout', function(){ a.style.opacity = 0.3; }, false);
	a.addEventListener('click', function(){ window.scrollTo(0,0); }, false );
	document.body.appendChild(a);
	}
};
if(self==top)	create_back_to_top();
//bottom按钮
function create_back_to_bottom(b) {
if(document.body){
        var newHeight = document.body.scrollHeight + 9999999999;
	var b = document.createElement('span');
	var c = 'opacity:0.3;-moz-transition-duration:0.2s;background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAUBAMAAAByuXB5AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAbUExURf///6qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpshoL4AAAAIdFJOUwARM2aImczuGAB4owAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAE1JREFUGNNjYGDg6OjoaGAAAfJZHTDAEAFltDKwQFkODAwWYEYzUCFzBZDRbgDSqw5kFYFNYaroaFcAsxjEOhIhDAbGNAEGHABhG5wFAH6qMUfw6SaOAAAAAElFTkSuQmCC") no-repeat scroll 50% 50% rgba(0, 0, 0, 0.7);border-radius:5px 0 0 5px;cursor:pointer;position:fixed;top:51%;width:50px;height:50px;right:0;z-index:9999';
	var winHeight = (document.body.clientHeight);
	b.style.cssText = c;
	b.addEventListener('mouseover', function(){ b.style.opacity = 1; }, false);
	b.addEventListener('mouseout', function(){ b.style.opacity = 0.3; }, false);
	b.addEventListener('click', function(){ window.scrollTo(0,newHeight); }, false);
	document.body.appendChild(b);
	}
};
if(self==top)	create_back_to_bottom();
