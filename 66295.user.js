// ==UserScript==
// @name           Twaudio checker
// @revision       20100113
// @author         biikame
// @namespace      http://userscripts.org/scripts/show/66295
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==
(function(){
	try{
		var userName = document.getElementsByName("page-user-screen_name")[0].content;
	}catch(e){
		return;
	}
	makeLink();
	
	function makeLink(){

		var setPoint = document.getElementById("profile-image");
		var aTag = document.createElement("a");
		aTag.href = "http://twaud.io/users/" + userName;
		aTag.target = "_blank";
		var imgTag = document.createElement("img");
		imgTag.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oBDBEWE40FPq8AAAHFSURBVDjL1ZO9a1NhFIef8973vTdqkmpSLRKaoRCtsang5qBQHATxDxARLW5uBfU/cHFzEQehcRC6OBQ/FpEKEh2saUEytCIitdI0JiJi83HvzX0drqU4lkw+0+EMz/nBjyPWWssAKAZkYIEGeFxeoVqpIwLTM5McmcjsTvD0xTpOeYqt2g8WX3/bvcAKKNdBtGL+0Udq1RYAxiiCIEJrIYosUQTjk1m0ERYqdSKjYsE2+0oZWjdPslbK4I0mWb32iqOzUzTmPqGHXDLn87w894yRSwVy5bNoK/8KRATRgmiFch1QEidz4r0yDiMXC+Sni6h2H376cQvbVfQ22qxcXdgRKvk7gLKCCSFTGsbz4cudJd5deBInyKVd1ltdvMN7Kdw/Q9QJARi9cQKJYPh0DqMdvACaS00Sxw5x/MoEKWPi45evF1mbqRD+8tFDLvWHq2At6WKW7nKTVHYPqXSC32/qbNx9z/f5zxxIJjiY34/YGGrVBg/ufaDR7lHKJVne9PFtnzHHZ7Pn0dHCWKLHrduneD73lbeLDTpbfiwAsNZirSUIAowxhGGI7/t4noeI0O12Mcbgui4AYRjS7/d3BP/vM/0BfYOpOauurUoAAAAASUVORK5CYII=";
		imgTag.width = "16";
		imgTag.height = "16";
		aTag.appendChild(imgTag);
		if(setPoint){
			var ins = setPoint.parentNode.parentNode;
		}else{
			var ins = document.getElementsByClassName("thumb clearfix")[0];  
		}
		ins.appendChild(aTag);
	}
})();