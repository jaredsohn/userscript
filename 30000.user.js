// ==UserScript==

// @name           zheza_gallery

// @namespace      http://www.userscripts.org/

// @include        http://www.zheza.com/index.php?a=station&b=gallery&id=*

// ==/UserScript==


function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

var image_elements = document.getElementsByTagName('img');	
var img_str ="<br>";
var bb_str ="<hr>";
var logo = document.createElement("div");
	
for(var i=0;i<image_elements.length;i++){
	var image_element = image_elements[i];
	
	if(image_element.src.toLowerCase().match("http://www.zheza.com/uploads/station/gallery/image/")) {
		
		b_img=image_element.src.replace("s.jpg", ".jpg");
		img_str=img_str+"<img src="+b_img
				+" border='1' style='border-color:#000000'><br>"
		bb_str=bb_str+"[img]"+b_img+"[/img]<br>"
		

	}

}
logo.innerHTML = "<div align='center' style='background-color:#CCCCCC'>"
		+img_str+"<br><br>"+bb_str+"<br></div><hr>";
document.body.insertBefore(logo, document.body.firstChild);

