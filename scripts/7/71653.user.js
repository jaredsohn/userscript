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

var txt = [
//tyres
'Rockbridge','Bridgestone',
//end tyres
//
//F1 10
//chassis
'Maiden','Virgin Racing',
'Red Bell','Red Bull',
'Fierce Indians','Force India',
'Reno','Renault',
'Sutol','Sotul',
'Sotul','Lotus',
'Roro Torso','Toro Rosso',
'Iberia Racing Team','Hispania Racing Team',
'Bauber','Sauber',
'McLewis','McLaren',
//engines
'Mernandez 180','Mercedes-Benz FO108X',
'Crossworx','Cosworth CA2010',
'Welsh 650',' Ferrari 056',
'Reno RS09','Renault RS27-2010',
//end F109
//
//globals
'Mernandez','Mercedes',
' Iii','',
' Ii','',
' Iv','',
//end globals
//
//set renames
'GP 2010','F1 2010'
];

function oldBATthanks(node) {
    node = node || document.body;
    if(node.nodeType == 3) {
		var x = 0;

		for(x; x<txt.length-1; x=x+2)
		{
			node.nodeValue = node.nodeValue.split(txt[x]).join(txt[x+1]);
		}
    } else {
        var nodes = node.childNodes;
        if(nodes) {
            var i = nodes.length;
            while(i--) oldBATthanks(nodes[i]);
        }
    }
}

oldBATthanks();