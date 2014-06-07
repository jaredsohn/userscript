// ==UserScript==
// @name GoEar Download & Hotlink
// @author Emilio Lopez (Original de Jesus "Chucky" Bayo)
// @include http://www.goear.com/listen/*/*
// @include http://goear.com/listen/*/*
// @include http://www.goear.com/listenwin.php*
// @include http://goear.com/listenwin.php*
// @version 6
// @description  Descarga de Goear los temas en formato MP3. Agrega un Link y un Campo de formulario para esto.
// ==/UserScript==


/* 
 * This script is licensed under the 
 * Creative Commons Attribution-NonCommercial-ShareAlike 2.5 Argentina License. 
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/2.5/ar/ 
 */


//Get data to operate
if(location.href.indexOf('listenwin.php')!=-1)
	var ref = location.href.split(".php?v=")[1].split("&")[0].split("#")[0];
else
	var ref = location.href.split("listen/")[1].split("/")[0];
	

//Fake GET
GM_xmlhttpRequest({method: 'GET',
	url: 'http://www.goear.com/localtrackhost.php?f='+ref, 
	onload: function(request){
		//If all OK
		if(request.readyState==4 && request.status==200) {
			//Get Link
			var responseXML = (new DOMParser).parseFromString(request.responseText, "application/xml");
			var enlace = responseXML.getElementsByTagName('song')[0].getAttribute('path');
			
			if(location.href.indexOf('listenwin.php')==-1)
			{
				//Inject the input
				var link2 = document.createElement('div');
				link2.className = 'usuario-descri-otros';
				link2.innerHTML = '<div class="b1"><strong>Hotlink it!:<br /></strong>'+
					'<div class="b2"><input size="40" type="text" id="songsthotlink"'+
					' name="songsthotlink" class="uploadInput" onClick="javascript:document.'+
					'embedCodes.songsthotlink.focus();document.embedCodes.songsthotlink.select();"'+
 					'readonly="true" value="'+enlace+'"></div>';
 				
				var listdivs = document.getElementsByTagName('div');
				for(div in listdivs)
				{
					if(listdivs[div].className == 'cuadro-info')
					{
						form = listdivs[div];
						form.appendChild(link2);
						break;
					}
				}
				//Inject the link on top
				var link3 = document.createElement('a');
				link3.className = 'mostrar2';
				link3.href = enlace;
				link3.style.color = 'red';
				link3.innerHTML = 'DOWNLOAD';
				var divMenu = document.createElement('div');
				divMenu.className = 'menulogo';
				divMenu.appendChild(link3)
				var thediv = document.getElementById('logintext');
				var thelink = thediv.nextSibling.nextSibling;
				thediv.parentNode.insertBefore(divMenu,thelink);
			}else{
				//Little window!
				var text = document.getElementsByTagName('div');
				text = text[text.length-2];
				var container = document.createElement('div');
				container.innerHTML = '<strong>Download:</strong> <a href="'+enlace+'">'+enlace+'</a>';
				text.appendChild(container);
			}
		}
	}

});
