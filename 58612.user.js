// PHD user script
// version 0.1
// 2009-09-26
// Copyright (c) 2009, duesit
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
==UserScript==
// ==UserScript==
// @name          PornHub Video Download
// @description   Save video clips from PornHub
// @include       http://www.pornhub.com/view_video.php?viewkey=*
// ==/UserScript==

(function() 
{
  var videourl  = "";
  var loc=window.location.href;
  var allHTMLTags = new Array();
  allHTMLTags=document.getElementsByTagName("*");
  var elm;
  for (i=0; i<allHTMLTags.length; i++) 
	if (allHTMLTags[i].className=="vid-information-left")
        elm = allHTMLTags[i];
  var elm_parent = elm.parentNode;
  var div = document.createElement("div");
  elm_parent.insertBefore(div, elm);
  div.innerHTML = 'Please wait...';

 function makeRequest() {
         var aux=document.getElementsByTagName('div')[30].id;
         var vid=aux.toString();
         vid=vid.substring(12,99);
         aux=vid.length-6;
         vid=vid.substring(0,aux);
       
		 var ajax = PRO_xmlhttpRequest();
	     var params = "http://www.pornhub.com/embed_player_v3.php?id="+vid;
		 ajax.open("GET",params, true);
		 ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
         ajax.send(params);
		 ajax.onreadystatechange = function() {

			if(ajax.readyState == 1) {
			   div.innerHTML = "Loading XML...";   
	        }

			if(ajax.readyState == 4 ) {
			   if(ajax.responseXML) {
			      processXML(ajax.responseXML);
			   }
			   else {
				   div.innerHTML = "--ERROR--";
			   }
            }
         }
   }

   function processXML(obj){

	  var dataArray = obj.getElementsByTagName("options");
      
	  if(dataArray.length > 0) {
         for(var i = 0 ; i < dataArray.length ; i++) {
            var item = dataArray[i];
			videourl  =  item.getElementsByTagName("flv_url")[0].firstChild.nodeValue;
            if(videourl!="") div.innerHTML = '<style>#download{text-align:left;margin: 0 10px 0 20px;}.downloadImg{border: 0;float:left;}h2.downloadVid{font-size: 22px;display:inline;}</style><div id="download"><a href="'+videourl+'" target="_blank"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAANPSURBVBgZBcHdT1tlAMDh3zltORT6Ob4mtWDGMpgiU8LcEooJyiaEGbNkCkaNCVfeGP4Dr7zBG42J3hiVZInTeTMvFAPBYRhmGDBjEYaAMhhtVzraUjin5+M95/V5FCklAAAA4wtjfcCHwHmgAfADh8Ci9OSXn/d9+ysAAIAipQRgfGHMD0wC115PDmjxYANloxbDBuGaCHLMZqeEK9wZIdy3vh76/hhAkVIyvjAWAG731D/XeznZT9nUsLDZKitUSY0Dw0MKmyAGWWuepczSfeGIl79789ahCgBMdted6U0191BwbRxVQQiViqjCoIqCpbFvBtk7DNASeomek+1dtuXcAPAVL+2mgE/eOXPF97erk6VCxRMcmyEKVoCyCZvpIw51HS1+gBLd5GJ9B7Nrf566vji54rsw9uKnrzVf6FR8QbKqANnIU26I5ZyPiqmylj7Gqy6itf6DFdkk7xXxF10665Lq8sP1E37gfDKS4J6RIV+t8qyvDQ/Bzr6NaVaInpSUT0yz5ZXAksSExmbeYuCZbhxLPO8H6mr8tewYGfYtg3DNKUp2mGLRI9pg0hg3yLsvULZW0OQRR08OKJRqCAXDOLaI+aWUiiLBtspIkvgDLlN3HZRgiOyWQJURmhsqhI/6KKcdTJZw7G2QEiGE4neFVyjb5USdL0a4+hw7aQ9lZ502nvB0Yx3rd7LcpwNHFZzzVuloaSOTq2Zx/gGeJct+4Yi/HhZ2E6drksyk59H/OKY7mGBk5D10Xadtbw///CK6A++PXqO6KkA2m2V5eZloNm75ukbOHqzub789fDql3p6ZJb4f4sobV/nos6+4deM629v/0daSwDrM89vsLDd/vEnRyNLfd4nibimgfjP8w7RtOb9Mr/1O+CBINBwFIHZxCMO0GB0dJZVKMTQ0xODgIKZVwdduAhCLxlQ/gGM5785t3rtTT6SLfA4A4+5PKNJjYmKC2tpaAHRdR3qwMvXIGP6AmnQ6bSpSSgAGv3glbKTNnyP/xlOv9g4oiUSSgOojl8uxsbGBpmm0trbS1NSEI5zS3qM95ubmHitSSgAA2tvbfY399eOhx5GPmxubq7UqTVFQeKCsllyfu90pus4qKFiW5WYymbyu61f/B/q4pKqmYKY6AAAAAElFTkSuQmCC" class="downloadImg"><span class="downloadVid"> Download Video</span></a></b></div>';
		 }
	  }
	  else {
	    
		div.innerHTML = "--empty XML ?--";
	  }	  
   }

	 makeRequest();

})();