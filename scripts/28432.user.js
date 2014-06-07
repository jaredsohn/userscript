// ==UserScript==

// @name           mediathai

// @namespace      http://www.userscripts.org/

// @include        http://www.mediathai.net/module/gallery/gallery_right.php*

// @include        http://www.mediathai.net/module/gallery/gallery.php*
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
function gup( name ){
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}

var image_elements = document.getElementsByTagName('img');	
var img_str ="<br>";
var bb_str ="<hr>";
var logo = document.createElement("div");
var board_id = gup( 'board_id' );
var j=0;

if(window.location.href.substring(0,51)=="http://www.mediathai.net/module/gallery/gallery.php"){
	window.setTimeout("window.location.href='http://www.mediathai.net/module/gallery/gallery_right.php?cat_id=&board_id="+board_id+"'", 0)
	
}else{
	
for(var i=0;i<image_elements.length;i++){
	var image_element = image_elements[i];
	
	if(image_element.src.toLowerCase().match("module/gallery/images/")) {
		
		img_str=img_str+"<img src="+image_element.src
				+" border='3' style='border-color:#000000'> "
		bb_str=bb_str+"[img]"+image_element.src+"[/img]<br>"
		
		j++
		if((j % 2) ==0){ img_str=img_str+"<br>"}

	}

}
logo.innerHTML = "<div align='center' style='background-color:#CCCCCC'>"
		+img_str+"<br><br>"+bb_str+"<br></div><hr>";
document.body.insertBefore(logo, document.body.firstChild);

addGlobalStyle('TABLE { display:none ! important; }');

}