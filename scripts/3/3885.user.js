// Copyright (c) 2006, Perberos
// http://ww.perberos.com.ar/

// ==UserScript==
// @name		  BiteFight Cleaner
// @namespace	 bitefightcleaner
// @description   Remueve algunos textos, e imagenes.
// @include	   http://*.bitefight.*
// @exclude	   
// ==/UserScript==    

//Quita el logo enorme de arriba
(function() {
	
	if (self.location.href.indexOf("uebersicht.php") != -1) {
		//var bitelink = document.getElementById('bitelink');
		//bitelink.removeChild(bitelink.getElementsByTagName('p')[1]);
		var upgrademsg = document.getElementById('upgrademsg');
		upgrademsg.parentNode.removeChild(upgrademsg);
		
	}else
	
	if (self.location.href.indexOf("city.php") != -1) {
		
		if(document.getElementById('content').innerHTML.indexOf("innerHTML") == -1){
			table = document.getElementsByTagName('table')[2].innerHTML;
			document.getElementsByTagName('table')[1].innerHTML = table;
		}
	}

	document.getElementById('container').id = "";
		
	var imgs = document.getElementsByTagName('img');
		
		for (var i = imgs.length - 1; i >= 0; i--) {
				if ( imgs[i].src.indexOf("img/header.jpg") != -1){
					imgs[i].parentNode.removeChild(imgs[i]);
				}else if( imgs[i].src.indexOf("img/footer.jpg") != -1){
					imgs[i].parentNode.removeChild(imgs[i]);
				}else if(self.location.href.indexOf("robbery.php") != -1) {
					if ( imgs[i].src.indexOf("hunt1.jpg") != -1){
						imgs[i].parentNode.parentNode.removeChild(imgs[i].parentNode);
					}else if( imgs[i].src.indexOf("hunt0.jpg") != -1){
						imgs[i].parentNode.parentNode.removeChild(imgs[i].parentNode);
					}
				}
				
		}
	if (self.location.href.indexOf("robbery.php") != -1) {
		var divs = document.getElementsByTagName('div');
		for (var i = divs.length - 1; i >= 0; i--) {
			if (divs[i].innerHTML.indexOf("copyright") != -1){ //side_more
				divs[i].parentNode.removeChild(divs[i]);
			}
		}
	}else{
		var divs = document.getElementsByTagName('div');
		for (var i = divs.length - 1; i >= 0; i--) {
			if ( divs[i].style.position == "absolute"){
				divs[i].parentNode.removeChild(divs[i]);
			}else if (divs[i].innerHTML.indexOf("copyright") != -1){ //side_more
				divs[i].parentNode.removeChild(divs[i]);
			}
		}
	}

})();

//bitefightcleaner.user.js
