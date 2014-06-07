// ==UserScript==
// @name       Mush FPV
// @namespace  First Person View
// @version    0.1
// @description  Concept de vue à la première personne pour mush
// @include     http://mush.vg/*
// @match      http://*/*
// ==/UserScript==

var head= document.getElementsByTagName('head')[0];
var script= document.createElement('script');
script.src= 'http://yourjavascript.com/12511132193/jquery-event-frame.js';
head.appendChild(script);
   
var head= document.getElementsByTagName('head')[0];
var script= document.createElement('script');
script.src= 'http://yourjavascript.com/63111551128/jquery-parallax.js';
head.appendChild(script);

// Add jQuery //
function createJQuery() {
	jQuery(document).ready(function(){jQuery('#parallax .parallax-layer').parallax({mouseport: jQuery('#parallax')});});	
}


//Creates parallax views //
var firstLayaerParallax = '\
<div class="parallax-layer" style="width:860px; height:273px; position: absolute"> \
<img src="http://img15.hostingpics.net/pics/572140planet203.png" alt="" style="position:absolute; left: 120px; top: -100px; height: 400px;"/> \
</div>';

var secondLayerParallax = '<div class="parallax-layer" style="width:920px; height:274px; position: absolute"> \
<img src="http://img15.hostingpics.net/pics/3892911mountains.png" style="height: 200px;width: 1000px;" alt="" /> \
</div>';

var thirdLayerParallax = '<div class="parallax-layer" style="width:1100px; height:284px; position: absolute"> \
<img src="http://img15.hostingpics.net/pics/1912132hill.png" alt="" style="position:absolute; top:40px; left:0; height: 300px; width: 1100px" /> \
</div>';

var fourthLayerParallax ='<div class="parallax-layer" style="width:1360px; height:320px; position: absolute"> \
<img src="http://img15.hostingpics.net/pics/7468513wood.png" alt="" style="position:absolute; top:50px; left:0;"/> \
</div>' ;

var glDivParallax ='<div class="parallax-viewport" id="parallax" style="z-index: 20;left:400px; position: relative; overflow: hidden; width: 500px; height: 200px; background-image: url(http://ladyvlana.free.fr/images/tutoriel-photoshop-texture/tutoriel-photoshop-texture-etoile-02.jpg)">' + firstLayaerParallax + secondLayerParallax + thirdLayerParallax + fourthLayerParallax + '</div>';
      


window.onload = createJQuery;

$(document).ready(function(){
    
      $('#perso').first().prepend(glDivParallax);
    
});