// ==UserScript==

// @name           mthai.picpost

// @namespace      http://www.userscripts.org/

// @include        http://picpost.mthai.com/view_picpost.php*

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
	
	if(image_element.src.toLowerCase().match("http://p.mthai.com/picpost/")) {
		
		img_str=img_str+"<img src="+image_element.src
				+" border='3' style='border-color:#000000'><br><br>"
		bb_str=bb_str+"[img]"+image_element.src+"[/img]<br>"
	}

}
logo.innerHTML = "<div align='center' style='background-color:#CCCCCC'>"
		+img_str+"<br><br>"+bb_str+"<br></div><hr>";
document.body.insertBefore(logo, document.body.firstChild);

addGlobalStyle('#container { display:none ! important; }');