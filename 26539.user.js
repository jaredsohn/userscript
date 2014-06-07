// ==UserScript==

// @name           siamdara.Gallery

// @namespace      http://www.userscripts.org/
// @include        http://www.siamdara.com/Gallery/*

// ==/UserScript==

var image_elements = document.getElementsByTagName('img');	
var img_str ="<br>";
var bb_str ="<hr>";
var logo = document.createElement("div");
	
for(var i=0;i<image_elements.length;i++){
	var image_element = image_elements[i];
	
	if(image_element.src.toLowerCase().match("http://www.siamdara.com/_gallery/")) {
		
		img_str=img_str+"<img src="+image_element.src.replace("thumb","")
				+" border='3' style='border-color:#000000'><br><br>"
		bb_str=bb_str+"[img]"+image_element.src.replace("thumb","")+"[/img]<br>"
	}

}

logo.innerHTML = "<div align='center' >"
		+img_str+"<br><br>"+bb_str+"<br></div><hr>";
document.body.insertBefore(logo, document.body.firstChild);

