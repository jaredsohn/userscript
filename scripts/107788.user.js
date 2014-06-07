// ==UserScript==
// @name	HFR+
// @namespace	http://www.unclefight.com/hfr/
// @description Smiley HFR pour G+, avec des vrais morceaux de JoceBug
// @version	0.59.3
// @include	https://plus.google.com*
// ==/UserScript==

var node;
var rEE = /\[:([(\w )]*):+(\w)\]/g; // Regexpv2
var rE = /\[:([(\w )]*)\]/g; // Regexp


var rPP = "<img src=\'http://forum-images.hardware.fr/images/perso/$2/$1.gif\' title='$1' />";
var rP = "<img src=\'http://forum-images.hardware.fr/images/perso/$1.gif\' title='$1' />";

	function replaceByClass(className, obj) {
		if(obj.getElementsByClassName) {
			var nodes = obj.getElementsByClassName(className);
			for(i in nodes) {
				if(typeof(nodes[i].innerHTML)=="string") {
					changeEmoticon(nodes[i]); 
				}
			}
		}
	}
				

	function changeEmoticon(node) {

	node.innerHTML = node.innerHTML
		.replace(rEE, rPP)
		.replace(rE, rP)
		.replace(/:pfff:/g, "<img src=\'http://forum-images.hardware.fr/icones/smilies/pfff.gif\' title='pfff'>")
		.replace(/:\)/g, "<img src=\'http://forum-images.hardware.fr/icones/smile.gif\' title='smile'>")
		.replace(/:fou:/g, "<img src=\'http://forum-images.hardware.fr/icones/smilies/fou.gif\' title='fou'>")
		.replace(/:love:/g, "<img src=\'http://forum-images.hardware.fr/icones/smilies/love.gif\' title='love'>")
		.replace(/:pt1cable:/g, "<img src=\'http://forum-images.hardware.fr/icones/smilies/pt1cable.gif\' title='pt1cable'>")

		.replace(/:ange:/g, "<img src=\'http://forum-images.hardware.fr/icones/smilies/ange.gif\' title='ange' />")
		.replace(/:\(/g, "<img src=\'http://forum-images.hardware.fr/icones/frown.gif\' title='sad' />")
		.replace(/:\?\?:/g, "<img src=\'http://forum-images.hardware.fr/icones/confused.gif\' title='gni' />")
		.replace(/:jap:/g, "<img src=\'http://forum-images.hardware.fr/icones/smilies/jap.gif\' title='jap' />")
		.replace(/:heink:/g, "<img src=\'http://forum-images.hardware.fr/icones/smilies/heink.gif\' title='heink' />")
		.replace(/:sleep:/g, "<img src=\'http://forum-images.hardware.fr/icones/smilies/sleep.gif\' title='sleep' />")

		.replace(/:non:/g, "<img src=\'http://forum-images.hardware.fr/icones/smilies/non.gif\' title='non' />")
		.replace(/:D/g, "<img src=\'http://forum-images.hardware.fr/icones/biggrin.gif\' title='bigrin' />")
		.replace(/:p/g, "<img src=\'http://forum-images.hardware.fr/icones/tongue.gif\' title='tongue' />")
		.replace(/:lol:/g, "<img src=\'http://forum-images.hardware.fr/icones/smilies/lol.gif\' title='lol' />")
		.replace(/:cry:/g, "<img src=\'http://forum-images.hardware.fr/icones/smilies/cry.gif\' title='cry' />")
		.replace(/:sweat:/g, "<img src=\'http://forum-images.hardware.fr/icones/smilies/sweat.gif\' title='sweat' />")

		.replace(/;\)/g, "<img src=\'http://forum-images.hardware.fr/icones/wink.gif\' title='wink' />")
		.replace(/:na:/g, "<img src=\'http://forum-images.hardware.fr/icones/smilies/na.gif\' title='na' />")
		.replace(/:wahoo:/g, "<img src=\'http://forum-images.hardware.fr/icones/smilies/wahoo.gif\' title='wahoo' />")
		.replace(/:whistle:/g, "<img src=\'http://forum-images.hardware.fr/icones/smilies/whistle.gif\' title='whistle' />")
		.replace(/:hello:/g, "<img src=\'http://forum-images.hardware.fr/icones/smilies/hello.gif\' title='hello' />")
		.replace(/:sol:/g, "<img src=\'http://forum-images.hardware.fr/icones/smilies/sol.gif\' title='sol' />")

		.replace(/:sarcastic:/g, "<img src=\'http://forum-images.hardware.fr/icones/smilies/sarcastic.gif\' title='sarcastic' />")
		.replace(/:kaola:/g, "<img src=\'http://forum-images.hardware.fr/icones/smilies/kaola.gif\' title='kaola' />")
		.replace(/:ouch:/g, "<img src=\'http://forum-images.hardware.fr/icones/smilies/ouch.gif\' title='ouch' />")
		.replace(/:bounce:/g, "<img src=\'http://forum-images.hardware.fr/icones/smilies/bounce.gif\' title='bounce' />")
		.replace(/:ouimaitre:/g, "<img src=\'http://forum-images.hardware.fr/images/perso/prosterne.gif\' title='ouimaitre' />")
		.replace(/:o/g, "<img src=\'http://forum-images.hardware.fr/icones/redface.gif\' title='o'>")
}

				function commonInsert(obj) {
					if(typeof(obj)=="object") {
						replaceByClass('wm VC', obj); 
						replaceByClass('zj', obj); 
					}
				}



function nodeInserted(event) {
    commonInsert(event.target);
}

commonInsert(document);
document.addEventListener("DOMNodeInserted", nodeInserted, true);
