// ==UserScript==
// @name        TimeStamp
// @namespace   de.schippi
// @description adds a little timestamp in bottom right corner so you know when you last hit refresh
// @include     *
// @version     1
// ==/UserScript==
var frameEl = window.frameElement;

	if (!(frameEl)) {
		var currentTime = new Date();
		var hou = currentTime.getHours();
		var minu = currentTime.getMinutes();
		var newdiv = document.createElement('div');
		var divIdName = 'TimeStamp';
		newdiv.setAttribute('id',divIdName);
		newdiv.setAttribute('style','position:fixed;bottom:10px;right:10px;background-color:#FFFFFF;color:#000000;width:70px;-moz-border-radius:10px;border-radius: 10px;');
		if(minu < 10){
			if(hou < 10){
				newdiv.innerHTML = '<div align="center">0'+hou+':0'+minu+'</div>';
			}else{
				newdiv.innerHTML = '<div align="center">'+hou+':0'+minu+'</div>';
			}
		}else{
			if(hou < 10){
				newdiv.innerHTML = '<div align="center">0'+hou+':'+minu+'</div>';
			}else{
				newdiv.innerHTML = '<div align="center">'+hou+':'+minu+'</div>';
			}
		}

		document.body.appendChild(newdiv);
	}
