// ==UserScript==
// @name           Troll-emoticons v3 & Tuenti by dxpus
// @namespace      http://jeayese.com/ & http://www.dxpus.tk/
// @description    Tuenti by dxpus. Use meme emoticons on popular websites!.
// @include        *
// @version        Tuenti
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
			.replace(/-fapfapfap-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://gapgames.net/images/ragefacescript/fapfapfap.png\' title='fapfapfap' />")
			.replace(/-thumbsup-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/thumbsup.png\' title='thumbsup' />")
			.replace(/-challengeaccepted-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/challengeaccepted.png\' title='challengeaccepted' />")
			.replace(/-staredad-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/staredad.png\' title='staredad' />")
			.replace(/-iamdisappoint-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/disappoint.png\' title='iamdisappoint' />")
			.replace(/-meh-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/err.png' title='meh' />")
			.replace(/-cyoot-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/cyoot.png\' alt='cyoot' />")
			.replace(/-hmmm-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/hmmm.png\' alt='=hmmm' />")
			.replace(/-grin-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/grin.png\' title='grin' />")
			.replace(/-troll-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/troll.png\' title='There isn't a command here, problem?' />")
			.replace(/-trollface-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/trollface.png\' title='There isn't a command here, problem?' />")
			.replace(/-stare-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/stare.png\' title='stare' />")
			.replace(/-thefuck-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/thefuck.png\' title='thefuck' />")
			.replace(/-ffff-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/ffff.png\' title='ffff' />")
			.replace(/-fffuuu-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/f7u12.png\' title='ffff' />")
			.replace(/-evilno-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/no.png\' title='no' />")
			.replace(/-yuno-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/yuno.png\' title='yuno' />")
			.replace(/-letsdothis-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/letsdothis.png\' alt='letsdothis' />")
			.replace(/-areyoufuckingkiddingme-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/areyoufuckingkiddingme.png\' title='areyoufuckingkiddingme' />")
			.replace(/-f7u12-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/f7u12.png\' alt='f7u12' />")
			.replace(/-ilied-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/ilied.png\' title='ilied' />")
			.replace(/-trolldad-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/trolldad.png\' title='trolldad' />")
			.replace(/-trololo-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/trololo.png\' title='trololo' />")
			.replace(/-wtfisthat-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/wtfisthat.png\' title='wtfisthat' />")
			.replace(/-augh-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/augh.png\' title='augh' />")
			.replace(/-cerealguy-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/cerealguy.png\' title='cerealguy' />")
			.replace(/-betterthanexpected-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/everythingwentbetterthanexpected.png\' title='betterthanexpected' />")
			.replace(/-excitedyes-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/excitedyes.png\' title='excitedyes' />")
			.replace(/-pokerface-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/pokerface.png\' title='pokerface' />")
			.replace(/-sweetjesus-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/sweetjesus.png\' title='sweetjesus' />")
			.replace(/-creepygusta-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/creepygusta.png\' title='creepygusta' />")
			.replace(/-okay-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/okay.png\' title='okay' />")
			.replace(/-numb-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/numb.png\' title='numb' />")
			.replace(/-foreveralone-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/foreveralone.png\' title='foreveralone' />")
			.replace(/-why-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/why.png\' title='why' />")
			.replace(/-herpderp-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/herpderp.png\' title='herpderp' />")
			.replace(/-fuckyea-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/fuckyea.png\' title='fuckyea' />")
			.replace(/-gtfo-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/gtfo.png\' title='gtfo' />")
			.replace(/-closeenough-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/closeenough.png\' title='closeenough' />")
			.replace(/-grandmatroll-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/grandmatroll.png\' title='grandmatroll' />")
			.replace(/-hitler-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/hitler.png\' title='hitler' />")
			.replace(/-deviltroll-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/deviltroll.png\' title='deviltroll' />")
			.replace(/-gaytroll-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/gaytroll.png\' title='gaytroll' />")
			.replace(/-omg-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/omg.png\' title='omg' />")
			.replace(/-milk-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/milk.png\' title='milk' />")
			.replace(/-uhmwat-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/uhmwat.png\' title='uhmwat' />")
			.replace(/-wait-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/wait.png\' title='wait' />")
			.replace(/-wuuut-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/wuuut.png\' title='wuuut' />")
			.replace(/-clevergirl-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/clevergirl.jpg\' title='clevergirl' />")
			.replace(/-fuckthatshit-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/fuckthatshit.png\' title='fuckthatshit' />")
			.replace(/-LoL-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/lol.png\' title='lol' />")
			.replace(/-fu-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/fu.jpg\' title='fu' />")
			.replace(/-megusta-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/megusta.png\' title='megusta' />")
			.replace(/-pedobear-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/pedobear.png\' title='pedobear' />")
			.replace(/-thefuckf-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/thefuckf.png\' title='thefuckf' />")
			.replace(/-feellikeasir-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/feellikeasir.png\' title='feellikeasir' />")
			.replace(/-orly-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/orly.jpg\' title='orly' />")
			.replace(/-yarly-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/yarly.jpg\' title='yarly' />")
		
			.replace(/-mentira-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/mentira.jpg\' title='mentira' />")
			.replace(/-siclaro-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/siclaro.jpg\' title='siclaro' />")
			.replace(/-pukerainbows-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/pukerainbows.jpg\' title='pukerainbows' />")
			.replace(/-putsonsunglasses-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/davidcaruso.jpg\' title='davidcaruso' />")
			.replace(/-yeaaah-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/yeaaah.png\' title='yeaaah' />")
			.replace(/-billymayshere-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/billymays.png\' title='billymayshere' />")
			.replace(/-mymindisfulloffuck-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/mymindisfulloffuck.jpg\' title='mymindisfulloffuck' />")			
			.replace(/-cry-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/cry.png\' title='cry' />")			
			.replace(/-nomegusta-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/nomegusta.png\' title='nomegusta' />")			
			.replace(/-awwyeah-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/awyeah.png\' title='awwyeah' />")			
			.replace(/-fapfapfapf-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/fapfapfapf.png\' title='fapfapfapf' />")			
			.replace(/-sad-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/sad.png\' title='sad' />")			
			.replace(/-unhappy-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/unhappy.png\' title='unhappy' />")			
			.replace(/-objection-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/objection.gif\' title='objection' />")			
			.replace(/-happyforeveralone-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/happyforeveralone.png\' title='happyforeveralone' />")			
			.replace(/-datass-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/datass.png\' title='datass' />")			
			.replace(/-aintthatsomeshit-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/aintthatsomeshit.png\' title='aintthatsomeshit' />")			
			.replace(/-truestory-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/truestory.png\' title='truestory' />")			
			.replace(/-drunk-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/drunk.png\' title='drunk' />")			
			.replace(/-trollf-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/femaletrollface.png\' title='trollf' />")			
			.replace(/-babytroll-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/trollbaby.png\' title='babytroll' />")			
			.replace(/-fffuuuf-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/f7u12f.png\' title='fffuuuf' />")						
			.replace(/-shakinganger-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/shaking.png\' title='shakinganger' />")			
			.replace(/-sadtroll-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/sadtrollface.png\' title='sadtroll' />")				
			.replace(/-motherofgod-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/motherofgod.png\' title='motherofgod' />")					
			.replace(/-awesomeface-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/awesomeface.jpg\' title='awesomeface' />")						
			.replace(/-creeper-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/creeper.jpg\' title='creeper' />")							
			.replace(/-guyfawkesmask-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/guyfawkesmask.png\' title='guyfawkesmask' />")									
			.replace(/-weegee-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/weegee.png\' title='weegee' />")									
			.replace(/-rebblack-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/rebblack.jpg\' title='rebblack' />")													
			.replace(/-melvin-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/melvin.png\' title='melvin' />")													
			.replace(/-yodawg-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/yodawg.jpg\' title='yodawg' />")																
			.replace(/-likeaboss-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/likeaboss.png\' title='likeaboss' />")																
			.replace(/-feelsbadman-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/feelsbadman.jpg\' title='feelsbadman' />")																	
			.replace(/-staringleo-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/staringleo.png\' title='staringleo' />")																	
			.replace(/-happyf-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/happyf.png\' title='happyf' />")																	
			.replace(/-derpina-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/derpina.png\' title='derpina' />")																	
			.replace(/-waitaminute-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/waitaminute.png\' title='waitaminute' />")																	
			.replace(/-suspicious-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/suspicious.png\' title='suspicious' />")																	
			.replace(/-pftch-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/pftch.png\' title='pftch' />")																	
			.replace(/-cerealguyspitting-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/cerealguyspitting.png\' title='cerealguyspitting' />")																	
			.replace(/-newspaperguy-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/newspaperguy.png\' title='newspaperguy' />")																				
			.replace(/-newspaperguytear-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/newspaperguytear.png\' title='newspaperguytear' />")																				
			.replace(/-ohgod-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/ohgod.png\' title='ohgod' />")																						
			.replace(/-patrickplz-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/patrickplz.gif\' title='patrickplz' />")																							
			.replace(/-waiting-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/waiting.png\' title='waiting' />")																										
			.replace(/-sohardcore-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/sohardcore.png\' title='sohardcore' />")																									
			.replace(/-squee-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/squee.png\' title='squee' />")																										
			.replace(/-ummm-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/ummm.png\' title='ummm' />")																											
			.replace(/-umad-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/umad.png\' title='umad' />")																										
			.replace(/-this-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/this.png\' title='this' />")																																																									
			.replace(/-nopef-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/nopef.png\' title='nopef' />")																														
			.replace(/-shesaid-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/shesaid.png\' title='- Your Mother' />")																														
			.replace(/-badumtss-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/badumtsss.png\' title='badumtsss' />")																														
			.replace(/-donate-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/donate.png\' title='donate' />")
			
			//Barack Obama
			.replace(/-notbad-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'chrome-extension://hndllphbhpadfpoikpaofkkkpkpnmjik/img/notbad.png\' title='notbad' />")
			
			
			//Charlie Sheen
			.replace(/-charliesheen-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/charliesheen.png\' title='charliesheen' />")
			.replace(/-duhwinning-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/duhwinning.png\' title='duhwinning' />")
			
			
			//Antoine Dodson
			.replace(/-hideyokids-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/hideyokids.jpg\' title='hideyokids' />")	
			
			
			//Nigel Thornberry
			.replace(/-mermaidnigel-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/mermaidnigel.gif\' style='width:100px; height:100px;' title='mermaidnigel' />")		
			.replace(/-smashing-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/smashing.gif\' style='width:100px; height:100px;' title='smashing' />")	
			
			
			//IT Crowd
			.replace(/-mossidgaf-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/idgaf.gif\' style='width:150px; height:100px;' title='mossidgaf' />")				
			.replace(/-mosssmash-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/mosssmash.gif\' style='width:150px; height:100px;' title='mosssmash' />")																													
			.replace(/-offandonagain-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/offandonagain.jpg\' title='offandonagain' />")																																																												
			.replace(/-fuckthisshit-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/fuckthisshit.gif\' style='width:150px; height:100px;' title='fuckthisshit' />")																											
			.replace(/-likeamoss-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/likeamoss.gif\' style='width:135px; height:100px;' title='likeamoss' />")		
			
			
			//Fresh Prince of Bel Air
			.replace(/-mindyabusiness-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/mindyabusiness.gif\' style='width:100px; height:100px;' title='mindyabusiness' />")																																				
			.replace(/-fpthefuck-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/fpthefuck.png\' title='fpthefuck' />")	
			
			
			//Sounds
			.replace(/-over9000-/g, "<br><iframe src='http://gapgames.net/mp3/play.php?file=itsover9000.mp3' style='width:300px; height:55px;' frameborder='0' scrolling='no'>It's Over 9000!</iframe>")
			.replace(/-gottagetdownonfriday-/g, "<br><iframe title='gottagetdownonfriday' src='http://gapgames.net/mp3/play.php?file=friday.mp3' style='width:300px; height:55px;' frameborder='0' scrolling='no'>Friday, Friday, Gotta get down on Friday!</iframe>")
			
			
			//Brock Obama 2012
			.replace(/-brockobama2012-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><a href='https://www.facebook.com/BrockObeezy'><img src=\'http://gapgames.net/images/ragefacescript/brockobama2012.jpg\' title='brockobama2012' /></a>")					
			
			
			//My Little Pony: Friendship is Magic
			.replace(/-lightningblazeprance-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://fc05.deviantart.net/fs70/f/2011/121/3/8/its_here_its_here_by_ganton3-d3fcbja.gif' style='width:100px; height: 100px;' /><br>")
			.replace(/-rainbowdashsoawesome-/g, "<iframe src='http://www.deviantart.com/download/211317101/instant_rainbowdash__flash__by_ganton3-d3ht9bh.swf' frameborder='0' scrolling='no' width='155' height='120'></iframe>")
			.replace(/-appleoosa-/g, "<iframe src='http://www.deviantart.com/download/213748136/instant_braeburn__flash__by_ganton3-d3j9d48.swf' frameborder='0' scrolling='no' width='155' height='120'></iframe>")
			
			
			
			//Animated Files
			.replace(/-nyancat-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/nyancat.gif\' style='margin-left:-4px;' title='nyancat' />")
			.replace(/-nyan-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/nyancat.gif\' style='margin-left:-4px;' title='nyan' />")
			.replace(/-tacocat-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/tacocat.gif\' style='margin-left:-4px;' title='tacocat' />")
			.replace(/-nyangel-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/nyangel.gif\' style='margin-left:-4px;' title='nyangel' />")
			.replace(/-tacocattail-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/rainbow2.gif\' style='margin-left:-4px; title='tacocattail' />")
			.replace(/-nyant-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/rainbow.gif\' style='margin-left:-4px;' title='nyant' />")
			.replace(/-longnyan-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/rainbow.gif\' title='nyant' /><img src=\'http://gapgames.net/images/ragefacescript/rainbow.gif\' title='nyant' /><img src=\'http://gapgames.net/images/ragefacescript/rainbow.gif\' title='nyant' /><img src=\'http://gapgames.net/images/ragefacescript/rainbow.gif\' title='nyant' /><img src=\'http://gapgames.net/images/ragefacescript/rainbow.gif\' title='nyant' /><img src=\'http://gapgames.net/images/ragefacescript/rainbow.gif\' title='nyant' /><img src=\'http://gapgames.net/images/ragefacescript/nyancat.gif\' title='nyan' style='margin-left:-1px;' />")																											
			.replace(/-awiseman-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/awiseman.gif\' style='width:100px; height:100px;' title='awiseman' />")																											
			.replace(/-charliesmoking-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/charliesmoking.gif\' style='width:150px; height:100px;' title='charliesmoking' />")																											
			.replace(/-dothecreep-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/creep.gif\' style='width:150px; height:100px;' title='dothecreep' />")																											
			.replace(/-epicfuu-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/epicfuu.gif\' style='width:100px; height:100px;' title='epicfuu' />")																											
			.replace(/-likeabows-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/likeabows.gif\' style='width:135px; height:100px;' title='likeabows' />")																									
			.replace(/-reallife-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/reallife.gif\' style='width:100px; height:100px;' title='reallife (orjustfantasy)' />")																											
			.replace(/-solong-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/solong.gif\'style='width:100px; height:100px;' title='solong' />")												
			.replace(/-homeboy-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/homeboy.gif\' style='width:85px; height:85px;' title='homeboy' />")											
			.replace(/-youarereallydumb-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/youarereallydumb.gif\' style='width:85px; height:85px;' title='youarereallydumb' />")								
			.replace(/-rickroll-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/rickroll.gif\' style='width:75px; height:75px;' title='rickroll' />")																										
			.replace(/-iregretnothing-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/iregretnothing.gif\' style='width:100px; height:100px;' title='fpthefuck' />")																											
			.replace(/-fucklogic-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/fucklogic.gif\' style='width:100px; height:100px;' title='fucklogic' />")																											
			.replace(/-hithere-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/hithere.gif\' style='width:100px; height:100px;' title='hithere' />")																											
			.replace(/-trollslap-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/trollslap.gif\' style='width:100px; height:100px;' title='trollslap' />")																											
			.replace(/-nooo-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/nooo.gif\' style='width:100px; height:100px;' title='Fuck you, Toby' />")											
			.replace(/-itsover9000-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/over9000.gif\' title='itsover9000' />")													
			.replace(/-jizzinmypants-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/jizzinmypants.gif\' title='jizzinmypants' />")						
			
			//Transitions
					
																									
			.replace(/-later-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/later.png\' title='later' />")																				
			.replace(/-muchlater-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/muchlater.png\' title='muchlater' />")																				
			.replace(/-manymonthslater-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/manymonths.png\' title='manymonthslater' />")																				
			.replace(/-thenextday-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/thenextday.png\' title='thenextday' />")
					
					//These are image macro memes
					
			.replace(/-futuramafry-/g, "<br><style> .md img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://gapgames.net/images/ragefacescript/futuramafry.jpg\' title='futuramafry' /><br>")
			.replace(/-hipsterkitty-/g, "<br><style> .md img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://gapgames.net/images/ragefacescript/hipsterkitty.jpg\' title='hipsterkitty' /><br>")
			.replace(/-interestingman-/g, "<br><style> .md img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://gapgames.net/images/ragefacescript/mostinterestingmanintheworld.jpg\' title='interestingman' /><br>")
			.replace(/-scumbagsteve-/g, "<br><style> .md img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://gapgames.net/images/ragefacescript/scumbagsteve.jpg\' title='scumbagsteve' /><br>")
			.replace(/-ggg-/g, "<br><style> .md img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://gapgames.net/images/ragefacescript/ggg.jpg\' title='ggg' /><br>")
			.replace(/-sap-/g, "<br><style> .md img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://gapgames.net/images/ragefacescript/sap.jpg\' title='sap' /><br>")
			.replace(/-insanitywolf-/g, "<br><style> .md img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://gapgames.net/images/ragefacescript/insanitywolf.jpg\' title='insanitywolf' /><br>")
			.replace(/-couragewolf-/g, "<br><style> .md img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://gapgames.net/images/ragefacescript/couragewolf.jpg\' title='couragewolf' /><br>")
			.replace(/-downvotingroman-/g, "<br><style> .md img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://gapgames.net/images/ragefacescript/downvotingroman.jpg\' title='downvotingroman' /><br>")
			.replace(/-youcantexplainthat-/g, "<br><style> .md img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://gapgames.net/images/ragefacescript/billoreilly.jpg\' title='youcantexplainthat' /><br>")
			.replace(/-redditorwife-/g, "<br><style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/redditorwife.jpg\' /></div><br>")
			.replace(/-knowledgeableneil-/g, "<br><style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/neiltyson.jpg\' /></div><br>")
			.replace(/src\=\"http:\/\/x3.fjcdn.com\/site\/funnyjunk\/images\/transparent_pixel.gif\"/g, "")
			.replace(/original=\"/g, "src=\"");
					/*
			.replace(/-itsover9000-/g, "<br><iframe src='http://gapgames.net/mp3/play.php?file=itsover9000.mp3' style='width:300px; height:75px;' frameborder='0' scrolling='no'>It's Over 9000!</iframe>")*/
				}
				
				function commonInsert(obj) {
					if(typeof(obj)=="object") {
						
					}
				}

function nodeInserted(event) {
    commonInsert(event.target);
}

commonInsert(document);
document.addEventListener("DOMNodeInserted", nodeInserted, true);