// VBOX7 DOWNLOADER
// author: no personal info sharing (based on F1r3Fl3x script)
//
// ==UserScript==
// @name           Vbox7 Downloader
// @namespace      HUH?
// @description    Download videos directly from vbox7.com
// @include        http://*vbox7.com/play:*
// @include        http://*zazz.bg/play:*
// ==/UserScript==
//

	//getting the video id, from the url
	var id = /play:(\w{1,8})/i.exec(window.location);
	//getting the Title element (so later we can add the button to it)
	var videoTitle = document.getElementsByClassName("title titlenew")[0];
	//base64 coded picture to avoid downloading everytime (saving bandwidth)
	var DLImage = 'data:image/gif;base64,R0lGODlhIQAhAKIAANbW1urq6rS0tK2srPLy8pqZmczMzP///yH5BAkAAAcALAAAAAAhACEAAAj+'
				+'AA8IHEiwoMGDCBMqXMiwocODAQIQOEAg4kOEBAwU2GjggEaOEy8K/CgAQIGOGgEI4ChyQAEBIU96'
				+'LCCQwMoBD10CIChTI0GTOBnqLNiT5s8CQROmNFjUoMmOGF8ebGpwZUiDGq/yRGm0IAGZUwUgpFq1'
				+'K8EABXYSXMnyo9SjAZwWiEvw68m4AT5qPYBWLUGfWNMOfDoV6l+zBF3WRDrW8EDABtGKXUmXqWOB'
				+'JisX1Ljy8sC+kQUftJtUruaBbw9mTrgSYdaEp+uCNfhVrMgDVpWKfkhY4VCHQBv+XhjcoUuYCW0y'
				+'vkgSQOUAKlnezrixunUDe29DN8Dd+e3v4MMEi2cYEAA7';

	function getflvpath(){	
		
		//POST заявка
		var post_data ='onLoad=[type Function]&vid='+id[1];
		
		GM_xmlhttpRequest({
			
			method:   'POST',
			url: 	  'http://www.vbox7.com/play/magare.do',
			headers: {'Referer': 'http://i47.vbox7.com/player/vBoxPlayerSV24.swf',
					  'Content-type': 'application/x-www-form-urlencoded'
					  },
			data: encodeURI(post_data),
			onload: function(responseDetails) {
			
				if(responseDetails.status = 200){
					var flvurl = /&videoFile=(.*)&/i.exec(responseDetails.responseText);
					
					//creating final html code for the download button
					var showButton = "<a href='"+flvurl[1]+"' target='_blank' style='text-decoration:none;color:#002183;'>"
					+"<img src='"+DLImage+"'" 
					+" width='25' height='25' border='0' alt='Download the video'></a>";
					
					var newElement = document.createElement('span');
					newElement.id = 'newElement';
					newElement.style.position = 'absolute';
					newElement.style.marginTop = '-4px';
					newElement.style.marginLeft = '10px';
					/* newElement.style.marginLeft = '890px'; */
					newElement.innerHTML = showButton;
					//put the download button after the title
					videoTitle.parentNode.insertBefore(newElement, videoTitle.nextSibling);	
				}
			}
		});	
	}
	getflvpath();