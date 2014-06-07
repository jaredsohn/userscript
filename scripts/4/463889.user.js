// ==UserScript==
// @name       Top/Bottom
// @version    0.0.2
// @include    *
// ==/UserScript==

function create_button(topORbottom) {
	var icon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAUBAMAAAByuXB5AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAbUExURf///6qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpshoL4AAAAIdFJOUwARM2aImczuGAB4owAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAEZJREFUGNNj6IABBgQLB2BME4CyxDoSIQymio52BTBLHaixCMRgrgCy2g2ALAuwac0MDCxQgx0YIqCsVhTbOIBUA9gUslkA7dcxR/3Xli8AAAAASUVORK5CYII=";
	var e, h, css = 'opacity:0.3;-moz-transition-duration:0.2s;-webkit-transition-duration:0.2s;background:url("' + icon + '") no-repeat scroll 50% 50% rgba(0, 0, 0, 0.7);border-radius:5px 5px 5px 5px;cursor:pointer;position:fixed;width:40px;height:40px;right:0px;z-index:2147483647;';
	if (topORbottom == 'top') {
		css += 'bottom:50%';
		h = 0;
	} else {
		css += 'top:51%;-moz-transform:scaleY(-1);-webkit-transform:scaleY(-1)';
		h = 2147483647;
	}
	e = document.createElement('span');
	e.style.cssText = css;
	e.addEventListener('mouseover', function() {
		e.style.opacity = 1;
	}, false);
	e.addEventListener('mouseout', function() {
		e.style.opacity = 0.3;
	}, false);
	e.addEventListener('click', function() {
		window.scrollTo(0, h);
	}, false);
	document.body.appendChild(e);
}

if (window.top == window.self) {
	create_button('top');
	create_button('bottom');
}