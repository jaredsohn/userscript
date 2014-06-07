// ==UserScript==
// @name GoEar Mp3 URL & Download Button
// @author laurenceHR (code edited)
// @include *goear.com/listen/*/*
// @include *goear.com/listenwin.php*
// @version 1.3.2
// @description  Agrega el campo Mp3 URL y un botón de descarga. En la vista normal y PopUp! =).
// ==/UserScript==


// Script Edited by laurenceHR - www.laurenceweb.tk


//Get data to operate
if(location.href.indexOf('listenwin.php')!=-1){	var ref = location.href.split(".php?v=")[1].split("&")[0].split("#")[0];}
																					else{ var ref = location.href.split("listen/")[1].split("/")[0];}

//Fake GET
GM_xmlhttpRequest({method: 'GET',
	url: 'http://www.goear.com/tracker758.php?f='+ref, 
	onload: function(request){//If all OK
		if(request.readyState==4 && request.status==200) {//Get Link
			var responseXML = (new DOMParser).parseFromString(request.responseText, "application/xml");
			var enlace = responseXML.getElementsByTagName('song')[0].getAttribute('path');
			
			if(location.href.indexOf('listenwin.php')==-1){//GoEar Page.
				// Create HTML.
			
				//// Download Link + Icon ////

				var linkd = document.createElement('div');
				linkd.className = 'usuario-descri-otros';
				linkd.innerHTML = '<div class="b1"><strong>Mp3 URL:<br /></strong><div class="b2"><input size="40" type="text" id="linkmp3" name="linkmp3" class="uploadInput" onClick="javascript:document.linkmp3.focus();document.linkmp3.select();" readonly="true" value="'+enlace+'"></div>';

				var linka = document.createElement('a');
				linka.className = 'mostrar2';
				linka.href = 'http://laurencehr.netne.net/pages/my/downloadgoear/downgoear.dxs?id=' + ref;
				linka.style.color = 'red';
				linka.innerHTML = '<img src="http://i37.photobucket.com/albums/e78/laurencehr/freeicons/download72.png" alt="DOWNLOAD" title="Download mp3" border="0" />';
        
 				var divDown= document.createElement('div');
				divDown.className = 'downicon';
				divDown.style.textAlign='center';
				divDown.appendChild(linka);

				//////////////////////////////// Facebook Publish

				var linkf = document.createElement('a');
				linkf.className = 'mostrarf';
				linkf.href = 'http://apps.facebook.com/goearmusic/inmyprof.php?song=' + ref;
				linkf.style.color = 'blue';
				linkf.target= '_blank';
				linkf.innerHTML = '<br /><img src="http://i37.photobucket.com/albums/e78/laurencehr/freeicons/24commentsquareimportan-1.png" alt="FACE" title="Your Facebook" border="0" />';

				var linkf2 = document.createElement('a');
				linkf2.className = 'mostrarf';
				linkf2.href = 'http://apps.facebook.com/goearmusic/infriendprof.php?song=' + ref;
				linkf2.style.color = 'blue';
				linkf2.target= '_blank';
				linkf2.innerHTML = ' <img src="http://i37.photobucket.com/albums/e78/laurencehr/freeicons/24commentsquarequestion.png" alt="BOOK" title="Friend Facebook" border="0" />';
        
				var divFace= document.createElement('div');
				divDown.className = 'faceicon';
				divDown.style.textAlign='center';
				divDown.appendChild(linkf);
				divDown.appendChild(linkf2);

				////////////////////////////////

				var listdivs = document.getElementsByTagName('div');
				for(div in listdivs){if(listdivs[div].className == 'cuadro-info'){
						form = listdivs[div];
						form.appendChild(linkd);
						form.appendChild(divDown);
						form.appendChild(divFace);
						break;
					}}

		}else{//PopUp Window!

				//// Download Icon ////
				var linka = document.createElement('a');
				linka.className = 'mostrar2';
				linka.href = 'http://laurencehr.netne.net/pages/my/downloadgoear/downgoear.dxs?id=' + ref;
				linka.style.color = 'white';
				linka.innerHTML = '<br /><img src="http://i37.photobucket.com/albums/e78/laurencehr/freeicons/download72.pngg" alt="download" title="Download mp3" border="0" />';
        
 				var divDown= document.createElement('div');
				divDown.className = 'downicon';
				divDown.style.textAlign='center';
				divDown.appendChild(linka);

				//////////////////////////////// Facebook Publish

				var linkf = document.createElement('a');
				linkf.className = 'mostrarf';
				linkf.href = 'http://apps.facebook.com/goearmusic/inmyprof.php?song=' + ref;
				linkf.style.color = 'blue';
				linkf.target= '_blank';
				linkf.innerHTML = '<br /><img src="http://i37.photobucket.com/albums/e78/laurencehr/freeicons/24commentsquareimportan-1.png" alt="FACE" title="Your Facebook" border="0" />';

				var linkf2 = document.createElement('a');
				linkf2.className = 'mostrarf';
				linkf2.href = 'http://apps.facebook.com/goearmusic/infriendprof.php?song=' + ref;
				linkf2.style.color = 'blue';
				linkf2.target= '_blank';
				linkf2.innerHTML = ' <img src="http://i37.photobucket.com/albums/e78/laurencehr/freeicons/24commentsquarequestion.png" alt="BOOK" title="Friend Facebook" border="0" />';
        
				var divFace= document.createElement('div');
				divDown.className = 'faceicon';
				divDown.style.textAlign='center';
				divDown.appendChild(linkf);
				divDown.appendChild(linkf2);

				////////////////////////////////

				var listdivs = document.getElementsByTagName('div');
				for(div in listdivs){if(listdivs[div].className == 'fondologo2'){
						form = listdivs[div];
						form.appendChild(divDown);
						form.appendChild(divFace);
						break;
					}}
			}
		}
	}

});
