// ==UserScript==
// @name           Favotter checker jp
// @revision       20091228
// @author         biikame
// @namespace      http://userscripts.org/scripts/show/65112
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
		aTag.href = "http://favotter.matope.com/user.php?user=" + userName;
		aTag.target = "_blank";
		var imgTag = document.createElement("img");
		imgTag.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAAXNSR0IArs4c6QAAAP9QTFRFAAAATdgcTNoUVdwgWN8ZX+AlYt8zY+QfZOQhZuUgZ+QqbOI3c+BNc+Y7dukqeOg9d+sleesofOk+ieVoiexHje5CkfA7lO9Lk/I0mOxrnO1tnO9dnPNBnu9lnvBdnvBgnfU5oe54ou54oPRDn/Y5pe5+qPZHqPZJqvg/rPlAsfVns/OBvfWKvPtTvftUvftVvPtZvvtbx/O0yPSvyfSxyvaqy/eozveo0Pe31Pe/1fe/1ffA3PjJ2/nF3vfV3/jR3/jW4PjX4fjX5fnc5vrZ5vra6vrk7Pvn7fvo7vvo7vvp7/zn7/zo8fzu9/31+P32+/76/v7+/v7///7/////RZ97LQAAAAF0Uk5TAEDm2GYAAAABYktHRACIBR1IAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH2QwbByAOzH7F+AAAAKBJREFUGNNjYACDEChgQOXCRIC0s42VtbWlrRdEJCTEVMtQV19fz8AcLBASYiGjqaGmrq6ubAYRCNJWUdCxd3V1dQmE6PCTkxAz8fb29oEaGuIpIiouLy0tLWsMFfAQ4hMUAAGpAKgAPyeHpJKioqoRTAUvO5dTMBDA3OXBzcLqiOTyEHc2JmYHmDdAAv7CjDxuyAIhvnZuIUgCDMgeZwAAH5sodXzS7fwAAAAASUVORK5CYII=";
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