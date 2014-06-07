// ==UserScript==
// @name           BATracer CTA Renamer
// @namespace      http://lolsaurus.rex
// @description    Renames Classic Trans Am only
// @include        http://batracer.com/*
// ==/UserScript==

var txt = [
//CTA
//chassis
'Macadam','Mercury',
'Ffordd','Ford',
'ABC','AMC',
'Pugworth','Plymouth',
'Ponytrap','Pontiac',
'AMC Spear','AMC Javelin',
'Mustard GT350R','Mustang GT350R',
'Retro Congo','Chevrolet Camaro',
'Ford Tango','Ford Torino',
'Pontiac Firegoose','Pontiac Firebird',
'Mustard Boss','Mustang Boss',
'Plymouth Barrichello','Plymouth Barracuda',
'Mercury Cheetah','Mercury Cougar',
'Pontiac Cross-Am','Pontiac Trans-Am',
'Lodge Hustler','Dodge Challenger',
'Ford Mustard','Ford Mustang',
//engines
'Retro 305ci','Chevrolet 305ci',
//misc tidyups
'General Mofos','General Motors',
'Lodge was the','Dodge was the',
'the Hustler. The Hustler','the Challenger. The Challenger',
'The Firegoose was','The Firebird was',
'for Tango.','for the Torino.',
'said the Tango','said the Torino',
'Mach 1 Mustard','Mach 1 Mustang',
'Congo/Firegoose','Camaro/Firebird',
'The new Spears','The new Javelin',
'The Spear won','The Javelin won',
'the Congo could','the Camaro could',
'the Mustard','the Mustang',
'population.The','population. The',
'Cross Am','Trans Am',
'small-bock Mustard','small-block Mustang',
'short-desck','short-deck',
'Greatyear','Goodyear',
//end CTA
' Iii','',
' Ii','',
' Iv','',
'Classic All-American Series','Classic Trans-Am'
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