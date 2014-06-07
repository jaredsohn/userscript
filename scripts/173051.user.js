// ==UserScript==
// @name           Facebook hide pagelet blue bar
// @namespace      22301@gmx.de
// @description    Hides the photo bar on facebook profiles
// @include        http://www.facebook.com/messages/*
// @include        https://www.facebook.com/messages/*
// ==/UserScript==

function appendStyle(h) {


var pagelet_bluebar = document.getElementById('pagelet_bluebar');
if (pagelet_bluebar) {
    pagelet_bluebar.parentNode.removeChild(pagelet_bluebar);
}

var pagelet_sidebar = document.getElementById('pagelet_sidebar');
if (pagelet_sidebar) {
    pagelet_sidebar.parentNode.removeChild(pagelet_sidebar);
}

var pagelet_dock = document.getElementById('pagelet_dock');
if (pagelet_dock) {
    pagelet_dock.parentNode.removeChild(pagelet_dock);
}

var rightCol = document.getElementById('rightCol');
if (rightCol) {
    rightCol.parentNode.removeChild(rightCol);
}

//Remove Images
var imgs = document.getElementsByTagName('img');

for (i=0; i<imgs.length; i++)

{
  imgs[i].style.visibility = 'hidden';
}

// webMessengerHeaderName
//removeElement(//*[@id="u_0_e"]/div/div[2]/div/div[1])





//aria-labelledby="webMessengerHeaderName"
//class="_3j5"
//class="_6jw"


// Change Favicon

var url = 'http://corbacho.info/img/drupal-favicon.ico';

var newFv = document.createElement('link');
newFv.rel = 'icon';
newFv.type = 'image/png';
newFv.href = url;

try {   
  document.getElementsByTagName('head')[0].appendChild(newFv); 
}
catch(e) { }

// Change Colour

var link = window.document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'data:text/css,' +
            // Selectors start here
    		'a{color:#000000;cursor:pointer;text-decoration:none}' +
			'._kx + ._kx{border-color:#e2e5ef}' +
			'._k-:hover{background-color:#aaaaaa;border-color:#e3e8f0;cursor:pointer}' +
			'._kx:hover{background-color:#aaaaaa;border-color:#d1d8e7}' +
            '.shareRedesign .uiAttachmentTitle{color: #000000;}' +
            '._1rs{background-color: #ffffff}' +
            '._530d{background-color: #ffffff}' +
            '.shareMediaVideo{background-color: #ffffff}' +
            '.#globalContainer{ margin: 0}' +
            '._530g{color:#ffffff;font-weight:bold}' +
			'._530h{color:#ffffff}' +
			'._kv:hover, ._kv{background-color:#aaaaaa;border-color:#4e5d7b}';
document.getElementsByTagName("HEAD")[0].appendChild(link);



}


// Early injection support
if (document.body === null)
    document.addEventListener('DOMNodeInserted', nodeInserted, true);
else
    appendStyle();
