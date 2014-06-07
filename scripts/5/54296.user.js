// ==UserScript==
// @name           ssf img code
// @namespace      http://www.userscripts.org/people/171
// @include        http://soshified.com/forums/index.php?autocom=gallery*
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

function disablehref(){
	var input = document.getElementsByTagName("a");
	var count = input.length;
	for(var i =0; i < count; i++){
		//http://soshified.com/forums/index.php?autocom=gallery&req=si&img=24381
		var alink = document.getElementsByTagName("a")[i]
		if(alink.href.toLowerCase().match("autocom=gallery&req=si&img=")) {
			alink.disabled = true;
			alink.removeAttribute("href"); 
		}
	}
	return true;
}

function selimg(event){
	var textarea = document.getElementById("textarea")
	if(textarea.value.match(event.target.value)){
		textarea.value = textarea.value.replace(event.target.value+"\n", "")
	}else{
		textarea.value = textarea.value+event.target.value+"\n";
	}
}


addGlobalStyle(".thumbwrap > .alt, .post2, #mainheader, #userlinks, #ya-box, #mf-shim  { display:none ! important; }");
addGlobalStyle(".nopad, .galattach {margin: 0px;	padding: 0px;} ");

if(window.location.href.toLowerCase().match("&op=view_album&album=")) {
	disablehref()
}

var image_elements = document.getElementsByTagName('img');	
var bb_str ="<hr>";
var logo = document.createElement("div");
	
for(var i=0;i<image_elements.length;i++){
	var image_element = image_elements[i];
	
	if(image_element.src.toLowerCase().match("/forums/uploads/")) {

		var newP = document.createElement("div");
		newP.innerHTML =  "<div class='nopad'><input  class='nopad' type='checkbox' id='img_"+i+"' value='"+image_element.src.replace(/tn_/, "")+"' /> <a href="+image_element.src.replace(/tn_/, "")+" target=blank>full</a></div>";
		image_element.parentNode.insertBefore(newP,image_element);
		
		document.getElementById("img_"+i).addEventListener("click", selimg, true);	
	}

}

logo.innerHTML = "<div align='center' style='background-color:#CCCCCC'><form id='form1'><textarea id='textarea' cols=100 rows=5></textarea></form><br></div><hr>";
document.body.insertBefore(logo, document.body.firstChild);
