// ==UserScript==
// @name           QuickTranslate Travian forums
// @namespace      TWADZREM
// @include        http://*.travian.*/allianz.php?s=2*
// ==/UserScript==


// Set language to translate from below

var langFrom = "lt";
var langTo = "en";

// Dont edit anything below this line


var gourl = "http://translate.google.com/#" + langFrom + "|" + langTo + "|";

var m = document.getElementsByTagName("div");

var resscript = document.createElement("script");
resscript.setAttribute('src','http://www.google.com/jsapi');
document.body.appendChild(resscript);


for ( var i in m ) {

var attribute = m[i].getAttribute("class");
	var i2 = i + 1;
    if (attribute == "posted") {
	var normal = m[i].innerHTML;
	//normal = "<a href='http://lol.fi'>Hello</a> " + normal;
	var wantedtext;
	var mi = i*1+2;
	var mi2 = i*1+3;
	if (m[mi].getAttribute("class") == "text") {
		wantedtext = m[mi].innerHTML;
	}
	else {
		//wantedtext = m[mi2].innerHTML;
		wantedtext = m[mi].innerHTML;
	}
	
	var regex = /<[a-z]>[[A-Za-z0-9_].+<.[a-z]>/ig;
	var regex = /<img\b[^>]*>/ig;
	var result = wantedtext.replace(regex, "");


	m[i].innerHTML += " <a href='http://translate.google.com/#lt|en|" + result + "' target='_blank'>Translate</a>";
	//alert(normal);
    }

}
    