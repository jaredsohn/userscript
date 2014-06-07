// ==UserScript==
// @name           BATracer F1 2010 Renamer
// @namespace      http://www.batracer.com
// @description    Renames  F1 2010 stuff.
// @include        http://batracer.com/*
// @exclude        http://batracer.com/-cx
// @exclude        http://batracer.com/-cr?d*
// @exclude        http://batracer.com/-us*
// @exclude        http://batracer.com/-ua*
// ==/UserScript==
//written by gtpsharky (http://batracer.com/-us?4u1)
//amendments made by David "Dave-o" Smith
//upgraded to include images by the "legendary" Benjamin Richards

var txt = [
	   //tyres
	   'Rockbridge','Bridgestone',
	   //end tyres
	   //
	   //F1 10
	   //chassis
	   'Maiden','Virgin Racing',
	   'Red Bell','Red Bull Racing',
	   'Fierce Indians','Force India F1 Team',
	   'Reno RS09','Renault RS27-2010',
	   'Reno','Renault F1 Team',
	   'Sutol','Sotul',
	   'Sotul','Team Malaysia Lotus F1',
	   'Roro Torso','Scuderia Toro Rosso',
	   'Iberia Racing Team','Hispania Racing Team',
	   'Bauber','Sauber F1 Team',
	   'McLewis','Vodafone McLaren Mercedes',
	   'Team Wales','Etihad Scuderia Ferrari',
	   'Wallace','Williams F1',
	   //engines
	   'Mernandez 180','Mercedes-Benz FO108X',
	   'Crossworx','Cosworth CA2010',
	   'Welsh 650','Ferrari 056',
	   //end F109
	   //
	   //globals
	   'Mernandez','Petronas Mercedes GP',
	   ' Iii','',
	   ' Ii','',
	   ' Iv','',
	   //end globals
	   //
	   //set renames
	   'GP 2010','F1 2010'
	   ];

var image = [
'-bV2?S&24&3&2','http://i41.tinypic.com/xft2dg.jpg',
'-bV2?S&24&3&0','http://i42.tinypic.com/2hwnsj4.png'
];

function oldBATthanks(node) {
    node = node || document.body;
    if(node.nodeType == 3) {
	var x = 0;
	
	for(x; x<txt.length-1; x=x+2)
	    {
		node.nodeValue = node.nodeValue.split(txt[x]).join(txt[x+1]);
	    }
	
	
    } 
    else if(node.nodeType == 1 && node.nodeName == 'IMG'){
	var http = 'http://batracer.com/';
	var x = 0;
	for (x; x<image.length-1; x=x+2){
	    if(node.src == http + image[x]){
		node.src = image[x+1];
	    }
	}
    }
    else {
	var nodes = node.childNodes;
	if(nodes) {
	    var i = nodes.length;
	    while(i--) oldBATthanks(nodes[i]);
	}
    }
    
}


oldBATthanks();
