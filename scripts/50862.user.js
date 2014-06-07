// ==UserScript==
          // @name           Vkontakte video downloader by P.O.P v1.2
          // @namespace      http://vkontakte.ru/video*
          // @description    add buttons to download video from vkontakte.ru
          // @include        http://vkontakte.ru/video*
          // ==/UserScript==
          
          if ((/video(\d+)/.exec(window.location))||(/video(.*)\&id=(\d+)/.exec(window.location)))
          {
          	var allText = document.documentElement.innerHTML;
          	var val = allText.match("http(.*?)thumbnails(.*?)460(.*?)jpg");
	        if (val) {
		    var src = "http" + val[1] + "videos" + val[2] + "vk.flv";
	        } else {
		    var host = allText.match("host\:\'(.*?)\'");
		    var vtag= allText.match("vtag\:\'(.*?)\'");
		    var vkid = allText.match("vkid\:\'(.*?)\'");
		    var src = "http://" + host[1] + "/assets/videos/" + vtag[1] + vkid[1] + ".vk.flv";
	        }
          
          	var cont = document.getElementById("videoactions");
              	
          	var addon=document.createElement("a");
              	addon.setAttribute("href",src);
              	addon.innerHTML="\u0421\u043A\u0430\u0447\u0430\u0442\u044C"; 
             	
          	cont.appendChild(addon);
          
          	var addon=document.createElement("a");
          	addon.setAttribute("href","http://vixy.net?u="+src);
          	addon.innerHTML="\u0421\u043A\u0430\u0447\u0430\u0442\u044C AVI"; 
          	
          	cont.appendChild(addon);
          }