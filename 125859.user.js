// ==UserScript==
// @name           PQ Crier Smilies
// @namespace      Cookiemanz
// @description    Smilies in the Crier
// @include        *
// @version        1.0.0
// ==/UserScript==

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
			// See More Fix
			node.innerHTML = node.innerHTML
			.replace(/&quot;\)/g, '&quot; )');
			node.innerHTML = node.innerHTML
			//Reaction Faces
			.replace(/:alien:/g, "<img  src=\'http://www.piratequest.net/images/smileys/alien.gif\' border='0' title='alien' />")
			.replace(/:brainwash:/g, "<img  src=\'http://www.piratequest.net/images/smileys/brainwash.gif\' border='0' title='brainwash' />")
			.replace(/:cool:/g, "<img  src=\'http://www.piratequest.net/images/smileys/cool.gif\' border='0' title='cool' />")
			.replace(/:cry:/g, "<img  src=\'http://www.piratequest.net/images/smileys/cry.gif\' border='0' title='cry' />")
			.replace(/:delight:/g, "<img  src=\'http://www.piratequest.net/images/smileys/delight.gif\' border='0' title='alien' />")
			.replace(/:eek:/g, "<img  src=\'http://www.piratequest.net/images/smileys/eek.gif\' border='0' title='eek' />")
			.replace(/:erm:/g, "<img  src=\'http://www.piratequest.net/images/smileys/erm.gif\' border='0' title='erm' />")
			.replace(/:evil:/g, "<img  src=\'http://www.piratequest.net/images/smileys/evil.gif\' border='0' title='evil' />")
			.replace(/:fat:/g, "<img  src=\'http://www.piratequest.net/images/smileys/fat.gif\' border='0' title='fat' />")
			.replace(/:fury:/g, "<img  src=\'http://www.piratequest.net/images/smileys/fury.gif\' border='0' title='fury' />")
			.replace(/:haha:/g, "<img  src=\'http://www.piratequest.net/images/smileys/haha.gif\' border='0' title='haha' />")
			.replace(/:heh:/g, "<img  src=\'http://www.piratequest.net/images/smileys/heh.gif\' border='0' title='heh' />")			
			.replace(/:hmm:/g, "<img  src=\'http://www.piratequest.net/images/smileys/hmm.gif\' border='0' title='hmm' />")
			.replace(/:kiss:/g, "<img  src=\'http://www.piratequest.net/images/smileys/kiss.gif\' border='0' title='kiss' />")
			.replace(/:mad:/g, "<img  src=\'http://www.piratequest.net/images/smileys/mad.gif\' border='0' title='mad' />")
			.replace(/:mwah:/g, "<img  src=\'http://www.piratequest.net/images/smileys/mwah.gif\' border='0' title='mwah' />")
			.replace(/:nut:/g, "<img  src=\'http://www.piratequest.net/images/smileys/nut.gif\' border='0' title='nut' />")
			.replace(/:rasberry:/g, "<img  src=\'http://www.piratequest.net/images/smileys/rasberry.gif\' border='0' title='rasberry' />")
			.replace(/:razz:/g, "<img  src=\'http://www.piratequest.net/images/smileys/razz.gif\' border='0' title='razz' />")
			.replace(/:rolleyes:/g, "<img  src=\'http://www.piratequest.net/images/smileys/rolleyes.gif\' border='0' title='rolleyes' />")
			.replace(/:sad:/g, "<img  src=\'http://www.piratequest.net/images/smileys/sad.gif\' border='0' title='sad' />")
			.replace(/:scared:/g, "<img  src=\'http://www.piratequest.net/images/smileys/scared.gif\' border='0' title='scared' />")
			.replace(/:shock:/g, "<img  src=\'http://www.piratequest.net/images/smileys/shock.gif\' border='0' title='shock' />")
			.replace(/:shy:/g, "<img  src=\'http://www.piratequest.net/images/smileys/shy.gif\' border='0' title='shy' />")
			.replace(/:sick:/g, "<img  src=\'http://www.piratequest.net/images/smileys/sick.gif\' border='0' title='sick' />")
			.replace(/:smile:/g, "<img  src=\'http://www.piratequest.net/images/smileys/smile.gif\' border='0' title='smile' />")
			.replace(/:tongue:/g, "<img  src=\'http://www.piratequest.net/images/smileys/tongue.gif\' border='0' title='tongue' />")
			.replace(/:wink:/g, "<img  src=\'http://www.piratequest.net/images/smileys/wink.gif\' border='0' title='wink' />")
			.replace(/:weh:/g, "<img  src=\'http://www.piratequest.net/images/smileys/weh.gif\' border='0' title='weh' />")
			.replace(/:arg:/g, "<img  src=\'http://www.piratequest.net/images/smileys/pirate.gif\' border='0' title='arg' />")
			.replace(/:yoho:/g, "<img  src=\'http://www.piratequest.net/images/smileys/pirate2.gif\' border='0' title='yoho' />")
			
				}				
				function commonInsert(obj) {
					if(typeof(obj)=="object") {
						replaceByClass('outcry alt', obj);
						replaceByClass('outcry', obj);
					}
				}
function nodeInserted(event) {
    commonInsert(event.target);
}
commonInsert(document);
document.addEventListener('DOMNodeInserted', function(event) {
        commonInsert(event.target);
    }, false);