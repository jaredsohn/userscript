// ==UserScript==
// @namespace     none available
// @name          Wikipedia Columnize
// @description   This script will:
//                1) compact the sidebar into a horizontal menu
//                2) make columns from the article
//                Not tested on resolutions other than 1280x768 (widescreen)
// @include        http://en.wikipedia.org/wiki/*
// ==/UserScript==

var footer = document.getElementById('footer');

var colContent = document.getElementById('column-content');
var columnRight = document.getElementById('content');
columnRight.appendChild(footer);

var columnLeft = columnRight.cloneNode(true);
columnRight.parentNode.insertBefore(columnLeft,columnRight);

var alif = document.getElementById('column-one');

var epsilon = document.createElement('div');
epsilon.className = "hMenu";
alif.insertBefore(epsilon, alif.firstChild);

var gamma = document.createElement('ul');
epsilon.appendChild(gamma);

var beta = new Array;
for (a=0; a<alif.getElementsByTagName('h5').length-2; a++) {
  beta[a] = alif.getElementsByTagName('h5')[a+2];
}

for (a=0; a<beta.length; a++) {
  gamma.appendChild( gammaChild = document.createElement('li') );
  miniMenu = beta[a].parentNode.getElementsByTagName('ul')[0];
	if (beta[a].parentNode.id=="p-search") {
	  miniMenu = document.createElement('ul');
		miniMenu.appendChild(document.createElement('li'));
		miniMenu.firstChild.appendChild(beta[a].parentNode.getElementsByTagName('form')[0]);
	}
  remOne = beta[a].parentNode;
  //alert("appending"+beta[a].innerHTML+"...");
  gammaChild.appendChild(beta[a]);
  alif.removeChild(remOne);
  //alert("appended "+beta[a].innerHTML);
  if (miniMenu) gammaChild.appendChild(miniMenu);
	if (miniMenu.getElementsByTagName('li').length>5) {
	 gammaChild.appendChild(newMiniMenu = document.createElement('ul'));
	 while (miniMenu.getElementsByTagName('li').length>5) newMiniMenu.appendChild(miniMenu.getElementsByTagName('li')[5]);
	}
}

css = "body { overflow: hidden;\
}\
#column-content {\
  margin: 3em 0 0 0; overflow-y: scroll;\
}\
#content {\
  float:left; margin: 0; padding:0; overflow:hidden;\
}\
#content div {\
  padding: 1em;}\
#p-logo { \
  height: 36px; overflow:hidden; margin: 5px\
}\
#p-logo a, #p-logo a:hover {\
  position:absolute; bottom:0px;\
}\
.hMenu {\
  float: left; position: absolute; top: 0px; left: 11.5em; z-index: 10;\
  margin: 0; padding: 0; line-height: auto;\
}\
.hMenu h5, .hMenu a {\
  display: block; border-width: 1px; border-style: solid; border-color: #ccc #888 #555 #bbb;\
  margin: 0; padding: 2px 3px;\
}\
.hMenu ul {\
  list-style: none; top: 0px; margin: 0; padding: 0;\
}\
.hMenu ul li {\
  line-height: 1em; float:left; width:10ex; background-color: #fff;\
  padding: 0px; margin: 0;\
}\
.hMenu ul ul {\
  display: none;\
  position: relative;\
}\
.hMenu ul li:hover ul {\
  display: block;\
}\
.hMenu form {\
  float:left; padding: 0px;\
}\
"

function resizeColumn() {
  colContent.style.height = (window.innerHeight - columnLeft.offsetTop -5)+ "px"
	columnLeft.style.width = columnRight.style.width = ((window.innerWidth/2)-10) +"px";
	columnRight.style.top = "-"+colContent.style.height;
  var addHeight = columnRight.offsetHeight-colContent.offsetHeight;
	columnLeft.style.height = addHeight+"px"
	//alert(addHeight+"vs"+columnRight.offsetHeight+"under"+colContent.style.height);
}


colContent.addEventListener("resize",resizeColumn,false);
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
}


resizeColumn();