// ==UserScript==
// @name          YouTube - Add Link to HD Video
// @description   Simply adds a link to the fmt=18 version of a video
// @namespace     http://userscripts.org/users/7951
// @include       *youtube.com/watch*
// @exclude       *youtube.com/watch*fmt=18*
// @exclude       *youtube.com/watch*fmt=22*
// @version       0.4
// ==/UserScript==
(function () {	
	link = document.createElement("div");
	link.innerHTML = '<h2><a href="'+document.location+'&fmt=22" style="">Watch this video in HD</a> <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAIAAADUsmlHAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJJSURBVHjadFOxbhNBEJ2Znd07O044IaUACiQ+gA8AkUj5CPgB6CkQSk0TJAoaehokujR0EQIJURqJgi9AwhYojuzY8d3e7s4yTtrN6HTN7bv33ry3eHx8jJeTgaE0hCGlZJBTyhkIKCNjlFQT88nJCTOHEMTEItgB+RDYODR6nL1v2ZoYewMDNsZ478fjsZIXwSlIVQ8FoPU+p7RdudieH+ztrQhYJFprVPXbT9+KYKReRWazMVUTYbd++uTxP+JaEiOanLO+f576MjPoVwLpKhysTcpY2/aMaWVwxPP5XMExRoLrPGfVnHOwWJmowmGHGpnjkpYbzyKihuWabXsUJEbmlRepK/QhSyd+GW3F0+n0Kqp33xdFcMjquwLJdXLZnDa8nqVh7TuzvGDnnFzO/j1XBKtNoWQGsW0Xmg4GGHOHcaRmeTKZXDEHTkVw5hwT5o4GZjcJYH8+Inv25zfYwcan/kOdW+mKYIFMxhnO/cVSiKvKLkKwbgh9z7PZjIiaprl/a7cI5susMnm8SZ4hRvlF/fTvRGgLb9+5C5XdaZohlCdpFEwqHSzmJFazAlmcnmljebFYJIRH+3uTUZl5K8V5ZrLE0OpqkpgKzY8P70f9Grd3mi4mW1c5rq+jJruVZPGs2e3W7cewkuCckS4AaUiGtP2eEhYfC7qbzWWUVXjz6nUCtOJMqjRjPDo60gJ9/vrFQF8kjqGzw1Eb4g3ZXLtzjBXxwcMHARwfHh5qVJA1SirX02VOFLVoaA3pmWhQnr98oZX6L8AArGdIWpu2yfAAAAAASUVORK5CYII%3D" style="vertical-align:middle;margin-bottom:3px;cursor:default;" alt="" /></h2>'; 
	link.style.textAlign = "center";
	link.style.height = "18px";
	link.style.marginBottom = "4px";
	link.style.marginTop = "-5px";
	document.getElementById("watch-ratings-views").appendChild(link);
})();