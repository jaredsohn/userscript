// ==UserScript==
// @id             www.verycd.com-9c1a3e25-ea38-49c7-bbe5-820c71a2df61@scriptish
// @name           verycd_download
// @version        1.0
// @namespace      
// @author         
// @description    
// @include        http://www.verycd.com/*
// @run-at         document-end
// ==/UserScript==


var loc = window.location.toString();
var div = document.getElementById("iptcomED2K");
// alert(div);
// div.style.backgroundColor = "yellow";
var link =  document.createElement("a");
    link.style.backgroundColor = "yellow";
    link.target = "_blank";
	var prefix = loc.substr(0,loc.indexOf(".com/topics"));
	var suffix = loc.substr(loc.indexOf(".com/topics"), loc.length-1);
	// alert(suffix);
	var url = prefix+".gdajie"+suffix;
	link.href = url;
    link.onClick = function(){ 
		//alert(url);
	}
    link.appendChild(document.createTextNode("ToDownloadPage"));
    div.appendChild(link);