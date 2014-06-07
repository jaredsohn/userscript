// ==UserScript==
// @name           FINN.no Store bilder
// @namespace      http://userscripts.org/users/hennings
// @description    Få større bilder på bildesiden hos FINN
// @include        http://dev.finn.no/finn/viewimage*
// @include        http://uat.finn.no/finn/viewimage*
// @include        http://www.finn.no/finn/viewimage*
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

function addGlobalScript(scr) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = scr;
    head.appendChild(script);
}

var bl = document.getElementsByClassName("backlink")[0];
newElement = document.createElement('div');
newElement.id="beforeTable";
bl.parentNode.insertBefore(newElement, bl.nextSibling);
bl.parentNode.insertBefore(document.createElement("br"), bl.nextSibling);
bl.parentNode.insertBefore(document.createElement("br"), bl);

var c = document.getElementsByClassName("thumbs")[0];
document.getElementById("beforeTable").appendChild(c);
c.style.width="100%"

var main = document.getElementById("main");
//main.style.width="730px";

if (/\d+\.jpg/.test(main.src)) {
  main.src=main.src.replace("\.jpg","_xl.jpg");
}


addGlobalStyle('#viewpicture .map-image-link-container { display:inline !important;}');
addGlobalStyle("html > body #content-xwide {width:893px !important}");

var ae = document.getElementsByTagName("a");
for (var i = 0; i<ae.length; i++) {
  var s = ae[i].href;
  if (/changeImage.*\d+\.jpg/.test(s)) {
    ae[i].href=s.replace("\.jpg","_xl.jpg");
  }
  if (/javascript:.*Image\(\)/.test(s)) {
    ae[i].href=s.replace("Image()","Image2()");
  }
}


addGlobalScript('function nextImage2() {	currentIndex++;	if (currentIndex > maxIndex) {		currentIndex = 0;	}	changeImage(xlArr[currentIndex],captionArr[currentIndex],currentIndex);}function previousImage2() {	currentIndex--;	if (currentIndex < 0) {		currentIndex = maxIndex;	}	changeImage(xlArr[currentIndex],captionArr[currentIndex],currentIndex);}');

var wr = document.getElementById("wrapper");
wr.style.width="910px";

window.addEventListener('load',function() { 
    main.addEventListener('click',function() { 
    unsafeWindow.nextImage2(); 
    return false; 
			  },true);
			}, true);


