// ==UserScript==

// @name           4chanImageTabber

// @namespace      Dustfinger

// @description    Opens each image in a topic in a new tab

// @include        http://*.4chan.org/*/res/*

// ==/UserScript==



var newDiv = document.createElement('div');



newDiv.setAttribute('id','NEW_DIV');



var images = document.getElementsByTagName('img');



function openTabs() {



	for (var i = 0; i < images.length; i++) {



		var temp1 = images[i].src.split('/');



		var temp2 = temp1[temp1.length-1].split('.');



		var temp3 = temp2[0].split('s');



		if (temp3[0]*1 > 0){



			if (images[i].src.indexOf('dontblockthis') == -1) {



				GM_openInTab(images[i].parentNode.href);



			}



		}



	}



}





newDiv.innerHTML = '<br><a href="javascript:void(0)">Open All Images</a>';



var bod = document.getElementsByTagName('body');

bod[0].appendChild(newDiv);



document.getElementById('NEW_DIV').addEventListener("click",openTabs,true);