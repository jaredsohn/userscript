// ==UserScript==
// @name           hideYourN00dz
// @namespace      vampirefreaks.com/possumboy
// @description    Covers up the page you are looking at and removes the document title - to avoid prying eyes
// @include        *
// @version		0.3
// ==/UserScript==

bod = document.getElementsByTagName("body")[0];
htm = document.getElementsByTagName("html")[0];

function hide(){

  ndz = document.getElementById("ndz");
   if(ndz){
	l = document.getElementById("ndz");
	sht = document.getElementById("noo_shortcut");
	l.parentNode.removeChild(l);
	sht.parentNode.removeChild(sht);
	bod.style.overflow="auto";
	document.title = document.getElementsByTagName("title")[0].innerHTML

			mo = document.getElementsByTagName("embed");
	for(i=0; i<= mo.length; i++){
	  mo[i].style.opacity="1";
	}
	ob = document.getElementsByTagName("object");
	for(i=0; i<= ob.length; i++){
	  mo[i].style.opacity="1";
	}
	
   }

   else{
	d = window.document.createElement("div");
	d.setAttribute("style", "background-color: #ffffff!important; width: 100%; height: 100%; position: fixed; top: 0; left: 0; display: block!important; visibility: visible!important; display: block!important; z-index: 1000000000!important;");
	d.setAttribute("id", "ndz");
	bod.appendChild(d);
	bod.style.overflow="hidden";
	document.title=" ";
	sht = document.createElement("link");
	sht.setAttribute("rel", "shortcut icon");
	sht.setAttribute("id", "noo_shortcut");
	sht.setAttribute("href", "http://");
	bod.appendChild(sht);
	
		mo = document.getElementsByTagName("embed");
	for(i=0; i<= mo.length; i++){
	  mo[i].style.opacity="0";
	}
	ob = document.getElementsByTagName("object");
	for(i=0; i<= ob.length; i++){
	  mo[i].style.opacity="0";
	}

	
   }

}

htm.addEventListener("dblclick", hide, false);