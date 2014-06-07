// ==UserScript==
// @name           Bookmark Anywhere
// @namespace      http://userscript.org/user/citricsquid
// @description    This scripts allows you to select any part of a page for bookmarking, press "pause break" on your keyboard to bring up the dialog, from there you can bookmark the section and return at any time. Idea proposed by meode (Joshua Davidson)
// @include        *
// @license        Creative Commons -  Creative Commons Attribution-Noncommercial-Share Alike 2.0 UK: England & Wales License ( http://creativecommons.org/licenses/by-nc-sa/2.0/uk/ )
// ==/UserScript==
 
	window.addEventListener('keydown', check, true);
	
	if(window.location.hash){
		var hash = window.location.hash;
		var newpos = hash.replace("#bkmrk", "");
		var pos = newpos.split("-");
		var positionX = pos[0];
		var positionY = pos[1];
		if(positionX >= 0 && positionY > 0){
			scrollTo(positionX, positionY);
		}
	}
 
	function check(e){
		if(e.keyCode == 19){
			var docX,docY;
			docX = e.pageX;
			docY = e.pageY;
			bookmark(docX, docY, "pos", "Now click on the place you want to bookmark");
			window.addEventListener('mousedown', bkmrk, true);
		}
	}
	
	function bkmrk(e){
		
		window.removeEventListener('mousedown', bkmrk, true);
		var docX,docY;
		docX = e.pageX;
		docY = e.pageY;
		bookmark(docX, docY, "result", "Now bookmark this page with CTRL + D, then when visiting the bookmark you'll be brought directly to this spot!");
		
	}
	
	function bookmark(docx, docy, type, message){
	
		var closetext = '<div style="display:block; font-size:10px; margin-top:5px;"><a href="#" onClick="var divvy = document.getElementById(\'bkmrknotice\'); divvy.parentNode.removeChild(divvy); return false;" style="color:#BCBDAC; text-decoration:none;">click here to close this box</a></div>';
	
		if(type == "pos"){
			var newdiv = document.createElement("div");
			newdiv.id = "bkmrknotice"
			newdiv.innerHTML = message;
			newdiv.style.top = 0;
			newdiv.style.position = 'fixed';
			newdiv.style.right = '20px';
			newdiv.style.margin.right = '20px';
			newdiv.style.padding = '20px';
			newdiv.style.width = '200px';
			newdiv.style.height = 'auto';
			newdiv.style.color = '#3B2D38';
			newdiv.style.fontWeight = 'bold';
			newdiv.style.fontSize = '13px';
			newdiv.style.fontFamily = 'Tahoma';
			newdiv.style.display = 'block';
			newdiv.style.background = '#F02475';
			document.body.insertBefore(newdiv, document.body.firstChild);
		}else if(type == "result"){
			window.location.hash = "bkmrk" + docx + "-" + (docy - 10);
			var newdiv = document.getElementById("bkmrknotice");
			newdiv.innerHTML = message + closetext;
		}
	}