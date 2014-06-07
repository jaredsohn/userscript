// ==UserScript==
// @name           changestuff
// @namespace      none
// @description    autodescript
// @include        http://uni103.ogame.com.br/*
// ==/UserScript==
//
//
//
//<link rel="shortcut icon" href="/misc/favicon.ico" type="image/x-icon" /> 
// retirar o iconezinho
//view-source:http://tuxradar.com/content/greasemonkey-beginners
//http://www.ibm.com/favicon.ico


// get the head elements
//head = document.documentElement.firstElementChild.childNodes;
/*
delete the existing favicon
for(i in head){
    if((head[i].rel == "shortcut icon")||(head[i].rel == "icon")){
         head.removeChild(head[i]);
    }
}*/
document.body.style.background = "#000000";

/*function addCss(cssString) {
	var head = document.getElementsByTagName('head')[0];
	return unless head;
	var newCss = document.createElement('style');
	newCss.type = "text/css";
	newCss.innerHTML = cssString;
	head.appendChild(newCss);
}
addCss (
	'* { background-color: #ffffff ! important; }'
);*/
document.title = "IBM  - Brasil";
/*var allImgs,thisImg;
allImgs = document.evaluate('//img[@src]',
  document,
 null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  null);
  for (var i=0;i<allImgs.snapshotLength;i++) {
 var thisImg = allImgs.snapshotItem(i);
 var src = thisImg.src;
	var srcMatch = src.match('^http://uni103.ogame.com.br/');
	if (srcMatch != null) {
  thisImg.src = 'http://img822.imageshack.us/img822/9341/semttulot.gif';
	}
}*/

ico = document.createElement("link");
ico.setAttribute("rel", "icon");
ico.setAttribute("href","http://www.ibm.com/favicon.ico");

//append the icon to the head
document.documentElement.firstChild.appendChild(ico);




