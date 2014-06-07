// ==UserScript==
// @name           Troll Emoticons Fixed
// @namespace      http://facebook.com/juan.ochoa.jnc
// @author         JuanecO
// @icon           http://mutsurini.nixiweb.com/memes/logo.png
// @description    Un Pequeño Fix Temporal para las personas que no pueden ver a los memes en facebook
// @include        *
// @exclude     http://mutsurini.nixiweb.com/memes
// @version        4.0.7
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
			.replace(/:fapfapfap:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><div id='lol' class='lol'><img  src=\'http://mutsurini.nixiweb.com/memes/fapfapfap.png\' title='fapfapfap' /></div>")
			.replace(/:thumbsup:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/thumbsup.png\' title='thumbsup' />")
			.replace(/:challengeaccepted:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/challengeaccepted.png\' title='challengeaccepted' />")
			.replace(/:staredad:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/staredad.png\' title='staredad' />")
			.replace(/:iamdisappoint:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/disappoint.png\' title='iamdisappoint' />")
			.replace(/:meh:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/err.png' title='meh' />")
			.replace(/:cyoot:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/cyoot.png\' alt='cyoot' />")
			.replace(/:hmmm:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/hmmm.png\' alt='=hmmm' />")
			.replace(/:grin:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/grin.png\' title='grin' />")
			.replace(/:troll:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/troll.png\' title='There isn't a command here, problem?' />")
			.replace(/:trollface:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/trollface.png\' title='There isn't a command here, problem?' />")
			.replace(/:stare:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/stare.png\' title='stare' />")
			.replace(/:thefuck:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/thefuck.png\' title='thefuck' />")
			.replace(/:ffff:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/ffff.png\' title='ffff' />")
			.replace(/:fffuuu:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/f7u12.png\' title='ffff' />")
			.replace(/:no:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/no.png\' title='no' />")
			.replace(/:yuno:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/yuno.png\' title='yuno' />")
			.replace(/:letsdothis:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/letsdothis.png\' alt='letsdothis' />")
			.replace(/:areyoufuckingkiddingme:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/areyoufuckingkiddingme.png\' title='areyoufuckingkiddingme' />")
			.replace(/:f7u12:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/f7u12.png\' alt='f7u12' />")
			.replace(/:ilied:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/ilied.png\' title='ilied' />")
			.replace(/:trolldad:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/trolldad.png\' title='trolldad' />")
			.replace(/:trololo:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/trololo.png\' title='trololo' />")
			.replace(/:wtfisthat:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/wtfisthat.png\' title='wtfisthat' />")
			.replace(/:augh:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/augh.png\' title='augh' />")
			.replace(/:cerealguy:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/cerealguy.png\' title='cerealguy' />")
			.replace(/:betterthanexpected:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/everythingwentbetterthanexpected.png\' title='betterthanexpected' />")
			.replace(/:excitedyes:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/excitedyes.png\' title='excitedyes' />")
			.replace(/:pokerface:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/pokerface.png\' title='pokerface' />")
			.replace(/:sweetjesus:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/sweetjesus.png\' title='sweetjesus' />")
			.replace(/:creepygusta:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/creepygusta.png\' title='creepygusta' />")
			.replace(/:okay:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/okay.png\' title='okay' />")
			.replace(/:numb:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/numb.png\' title='numb' />")
			.replace(/:foreveralone:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/foreveralone.png\' title='foreveralone' />")
			.replace(/:why:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/why.png\' title='why' />")
			.replace(/:herpderp:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/herpderp.png\' title='herpderp' />")
			.replace(/:fuckyea:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/fuckyea.png\' title='fuckyea' />")
			.replace(/:gtfo:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/gtfo.png\' title='gtfo' />")
			.replace(/:closeenough:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/closeenough.png\' title='closeenough' />")
			.replace(/:grandmatroll:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/grandmatroll.png\' title='grandmatroll' />")
			.replace(/:hitler:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/hitler.png\' title='hitler' />")
			.replace(/:deviltroll:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/deviltroll.png\' title='deviltroll' />")
			.replace(/:gaytroll:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/gaytroll.png\' title='gaytroll' />")
			.replace(/:omg:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/omg.png\' title='omg' />")
			.replace(/:milk:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/milk.png\' title='milk' />")
			.replace(/:uhmwat:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/uhmwat.png\' title='uhmwat' />")
			.replace(/:wait:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/wait.png\' title='wait' />")
			.replace(/:wuuut:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/wuuut.png\' title='wuuut' />")
			.replace(/:clevergirl:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/clevergirl.jpg\' title='clevergirl' />")
			.replace(/:fuckthatshit:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/fuckthatshit.png\' title='fuckthatshit' />")
			.replace(/:lol:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/lol.png\' title='lol' />")
			.replace(/:fu:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/fu.jpg\' title='fu' />")
			.replace(/:megusta:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/megusta.png\' title='megusta' />")
			.replace(/:pedobear:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/pedobear.png\' title='pedobear' />")
			.replace(/:thefuckf:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/thefuckf.png\' title='thefuckf' />")
			.replace(/:feellikeasir:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/feellikeasir.png\' title='feellikeasir' />")
			.replace(/:orly:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/orly.jpg\' title='orly' />")
			.replace(/:yarly:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/yarly.jpg\' title='yarly' />")
		
			.replace(/:mentira:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/mentira.jpg\' title='mentira' />")
			.replace(/:siclaro:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/siclaro.jpg\' title='siclaro' />")
			.replace(/:pukerainbows:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/pukerainbows.jpg\' title='pukerainbows' />")
			.replace(/:putsonsunglasses:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/davidcaruso.jpg\' title='davidcaruso' />")
			.replace(/:yeaaah:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/yeaaah.png\' title='yeaaah' />")
			.replace(/:billymayshere:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/billymays.png\' title='billymayshere' />")
			.replace(/:mymindisfulloffuck:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/mymindisfulloffuck.jpg\' title='mymindisfulloffuck' />")			
			.replace(/:cry:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/cry.png\' title='cry' />")			
			.replace(/:nomegusta:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/nomegusta.png\' title='nomegusta' />")			
			.replace(/:awwyeah:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/awyeah.png\' title='awwyeah' />")			
			.replace(/:fapfapfapf:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/fapfapfapf.png\' title='fapfapfapf' />")			
			.replace(/:sad:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/sad.png\' title='sad' />")			
			.replace(/:unhappy:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/unhappy.png\' title='unhappy' />")			
			.replace(/:objection:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/objection.png\' title='objection' />")			
			.replace(/:happyforeveralone:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/happyforeveralone.png\' title='happyforeveralone' />")			
			.replace(/:datass:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/datass.png\' title='datass' />")			
			.replace(/:aintthatsomeshit:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/aintthatsomeshit.png\' title='aintthatsomeshit' />")			
			.replace(/:truestory:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/truestory.png\' title='truestory' />")			
			.replace(/:drunk:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/drunk.png\' title='drunk' />")			
			.replace(/:trollf:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/femaletrollface.png\' title='trollf' />")			
			.replace(/:babytroll:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/trollbaby.png\' title='babytroll' />")			
			.replace(/:fffuuuf:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/f7u12f.png\' title='fffuuuf' />")						
			.replace(/:shakinganger:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/shaking.png\' title='shakinganger' />")			
			.replace(/:sadtroll:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/sadtrollface.png\' title='sadtroll' />")				
			.replace(/:motherofgod:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/motherofgod.png\' title='motherofgod' />")					
			.replace(/:awesomeface:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/awesomeface.png\' title='awesomeface' />")						
			.replace(/:creeper:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/creeper.jpg\' title='creeper' />")							
			.replace(/:guyfawkesmask:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/guyfawkesmask.png\' title='guyfawkesmask' />")									
			.replace(/:weegee:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/weegee.png\' title='weegee' />")									
			.replace(/:rebblack:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/rebblack.jpg\' title='rebblack' />")													
			.replace(/:melvin:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/melvin.png\' title='melvin' />")													
			.replace(/:yodawg:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/yodawg.jpg\' title='yodawg' />")																
			.replace(/:likeaboss:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/likeaboss.png\' title='likeaboss' />")																
			.replace(/:feelsbadman:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/feelsbadman.jpg\' title='feelsbadman' />")																	
			.replace(/:staringleo:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/staringleo.png\' title='staringleo' />")																	
			.replace(/:happyf:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/happyf.png\' title='happyf' />")																	
			.replace(/:derpina:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/derpina.png\' title='derpina' />")																	
			.replace(/:waitaminute:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/waitaminute.png\' title='waitaminute' />")																	
			.replace(/:suspicious:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/suspicious.png\' title='suspicious' />")																	
			.replace(/:pftch:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/pftch.png\' title='pftch' />")																	
			.replace(/:cerealguyspitting:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/cerealguyspitting.png\' title='cerealguyspitting' />")																	
			.replace(/:newspaperguy:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/newspaperguy.png\' title='newspaperguy' />")																				
			.replace(/:newspaperguytear:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/newspaperguytear.png\' title='newspaperguytear' />")																				
			.replace(/:ohgod:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/ohgod.png\' title='ohgod' />")																						
			.replace(/:patrickplz:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/patrickplz.gif\' title='patrickplz' />")																							
			.replace(/:waiting:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/waiting.png\' title='waiting' />")																										
			.replace(/:sohardcore:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/sohardcore.png\' title='sohardcore' />")																									
			.replace(/:squee:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/squee.png\' title='squee' />")																										
			.replace(/:ummm:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/ummm.png\' title='ummm' />")																											
			.replace(/:umad:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/umad.png\' title='umad' />")																										
			.replace(/:this:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/this.png\' title='this' />")																																																									
			.replace(/:nopef:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/nopef.png\' title='nopef' />")																														
			.replace(/:shesaid:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/shesaid.png\' title='- Your Mother' />")																														
			.replace(/:badumtss:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/badumtsss.png\' title='badumtsss' />")																														
			.replace(/:donate:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><a href='http://bit.ly/mt6aKz'><img src=\'http://mutsurini.nixiweb.com/memes/donate.png\' title='donate' /></a>")																
			.replace(/:coolstorybro:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/coolstorybro.png\' title='coolstorybro' />")														
			.replace(/:doitfaggot:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/doitfaggot.jpeg\' title='doitfaggot' />")														
			.replace(/:fuckthis:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/fuckthis.jpg\' title='fuckthis' />")														
			.replace(/:garymotherfuckingoak:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/garyoak.jpg\' title='garymotherfuckingoak' />")														
			.replace(/:youveactivatedmytrapcard:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/youveactivatedmytrapcard.jpg\' title='youveactivatedmytrapcard' />")														
			.replace(/:goodnewseveryone:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/goodnewseveryone.jpg\' title='goodnewseveryone' />")														
			.replace(/:itssomething:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/itssomething.png\' title='itssomething' />")													
			.replace(/:dinkleberg:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/dinkleberg.jpg\' title='dinkleberg' />")													
			.replace(/:thegame:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/thegame.png\' title='thegame' />")													
			.replace(/:oportal:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/oportal.gif\' style='width:50px; height:50px' title='oportal' />")													
			.replace(/:bportal:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/bportal.gif\' style='width:50px; height:50px' title='bportal' />")													
			.replace(/:calmyotits:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/calmyotits.jpeg\' title='calmyotits' />")													
			.replace(/:charliederp:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/charliederp.jpeg\' title='charliederp' />")													
			.replace(/:comeonman:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/comeonman.png\' title='comeonman' />")													
			.replace(/:dicktits:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/dicktits.png\' title='dicktits' />")													
			.replace(/:durrrr:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/durrrr.png\'  title='durrrr' />")												
			.replace(/:facepalm:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/facepalm.jpg\'  title='facepalm' />")												
			.replace(/:fcat:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/fcat.png\'  title='fcat' />")												
			.replace(/:givingafuck:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/givingafuck.jpeg\'  title='givingafuck' />")												
			.replace(/:itsatrap:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/itsatrap.jpg\'  title='itsatrap' />")												
			.replace(/:juststfu:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/juststfu.png\'  title='juststfu' />")												
			.replace(/:leostrut:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/leostrut.png\'  title='leostrut' />")												
			.replace(/:lesquee:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/lesquee.png\'  title='lesquee' />")												
			.replace(/:mcat:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/mcat.png\'  title='mcat' />")												
			.replace(/:merikey:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/merikey.jpeg\'  title='merikey' />")												
			.replace(/:moss:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/moss.png\'  title='moss' />")												
			.replace(/:notasinglefuck:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/notasinglefuck.jpg\'  title='notasinglefuck' />")												
			.replace(/:saywhat:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/saywhat.jpeg\'  title='saywhat' />")												
			.replace(/:spidey:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/spidey.png\'  title='spidey' />")												
			.replace(/:spideyrelax:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/spideyrelax.png\'  title='spideyrelax' />")												
			.replace(/:swag:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/swag.jpg\'  title='swag' />")												
			.replace(/:titsorgtfo:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/togtfo.png\'  title='titsorgtfo' />")												
			.replace(/:upthis:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/upthis.png\'  title='upthis' />")												
			.replace(/:whatsgoingon:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/whatsgoingon.png\'  title='whatsgoingon' />")												
			.replace(/:yay:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/yay.jpg\'  title='yay' />")																	
			.replace(/:ujelly:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/ujelly.png\' title='ujelly' />")																		
			.replace(/:get:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><a href='http://bit.ly/n9NRTd'><img src=\'http://mutsurini.nixiweb.com/memes/get.png\' title='get' /></a>")
																				
			.replace(/:k:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/k.gif\' title='k' />")	
			
			//Barack Obama
			.replace(/:notbad:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/notbad.png\' title='notbad' />")
			
			
			//Charlie Sheen
			.replace(/:charliesheen:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/charliesheen.png\' title='charliesheen' />")
			.replace(/:duhwinning:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/duhwinning.png\' title='duhwinning' />")
			
			
			//Antoine Dodson
			.replace(/:hideyokids:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/hideyokids.jpg\' title='hideyokids' />")	
			
			
			//Nigel Thornberry
			.replace(/:mermaidnigel:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/mermaidnigel.gif\' title='mermaidnigel' />")		
			.replace(/:smashing:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/smashing.gif\' title='smashing' />")	
			
			
			//IT Crowd
			.replace(/:mossidgaf:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/idgaf.gif\'  title='mossidgaf' />")				
			.replace(/:mosssmash:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/mosssmash.gif\'  title='mosssmash' />")																													
			.replace(/:offandonagain:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/offandonagain.jpg\' title='offandonagain' />")																																																												
			.replace(/:fuckthisshit:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/fuckthisshit.gif\'  title='fuckthisshit' />")																											
			.replace(/:likeamoss:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/likeamoss.gif\'  title='likeamoss' />")		
			
			
			//Fresh Prince of Bel Air																																				
			.replace(/:fpthefuck:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/fpthefuck.png\' title='fpthefuck' />")	
			
			
			//Sounds
			.replace(/:over9000:/g, "<br><iframe src='http://gapgames.net/mp3/play.php?file=itsover9000.mp3' style='width:135px; height:35px;' frameborder='0' scrolling='no'>It's Over 9000!</iframe>")
			.replace(/:gottagetdownonfriday:/g, "<br><iframe title='gottagetdownonfriday' src='http://gapgames.net/mp3/play.php?file=friday.mp3' style='width:135px; height:35px;' frameborder='0' scrolling='no'>Friday, Friday, Gotta get down on Friday!</iframe>")
			
			
			//Brock Obama 2012
			.replace(/:brockobama2012:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><a href='https://www.facebook.com/BrockObeezy'><img src=\'http://mutsurini.nixiweb.com/memes/brockobama2012.jpg\' title='brockobama2012' /></a>")
			.replace(/:amabokcorb2012:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><a href='https://www.facebook.com/pages/Amabo-Kcorb/225856587440652'><img src=\'http://mutsurini.nixiweb.com/memes/amabokcorb2012.jpg\' oldtitle='amabokcorb2012' /></a>")					
			
			
			//My Little Pony: Friendship is Magic
			.replace(/:lightningblazeprance:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://fc05.deviantart.net/fs70/f/2011/121/3/8/its_here_its_here_by_ganton3-d3fcbja.gif' style='width:100px; height: 100px;' /><br>")
			.replace(/:rainbowdashsoawesome:/g, "<iframe src='http://www.deviantart.com/download/211317101/instant_rainbowdash__flash__by_ganton3-d3ht9bh.swf' frameborder='0' scrolling='no' width='155' height='120'></iframe>")
			.replace(/:appleoosa:/g, "<iframe src='http://www.deviantart.com/download/213748136/instant_braeburn__flash__by_ganton3-d3j9d48.swf' frameborder='0' scrolling='no' width='155' height='120'></iframe>")
			.replace(/:eeyup:/g, "<iframe src='http://www.deviantart.com/download/210776562/instant_macintosh__flash__by_ganton3-d3hho8i.swf' frameborder='0' scrolling='no' width='155' height='120'></iframe>")
			// All Artwork from here down is from http://moongazeponies.deviantart.com
			.replace(/:happyrainbowdash:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/happyrainbowdash.png\' title='happyrainbowdash' />")	
			.replace(/:sadrainbowdash:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/sadrainbowdash.jpg\' title='sadrainbowdash' />")	
			.replace(/:happyrarity:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/happyrarity.jpg\' title='happyrarity' />")	
			.replace(/:sadrarity:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/sadrarity.jpg\' title='sadrarity' />")	
			.replace(/:happyapplejack:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/happyapplejack.jpg\' title='happyapplejack' />")	
			.replace(/:sadapplejack:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/sadapplejack.jpg\' title='sadapplejack' />")	
			.replace(/:twilightsparkle:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/twilightsparkle.jpg\' title='twilightsparkle' />")	
			.replace(/:angryrainbowdash:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/angryrainbowdash.jpg\' title='angryrainbowdash' />")	
			.replace(/:sadtwilightsparkle:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/sadtwilightsparkle.jpg\' title='sadtwilightsparkle' />")	
			.replace(/:happytwilightsparkle:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/happytwilightsparkle.jpg\' title='happytwilightsparkle' />")	
			.replace(/:happyfluttershy:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/happyfluttershy.png\' title='happyfluttershy' />")	
			.replace(/:celestia:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/celestia.png\' title='celestia' />")	
			.replace(/:nightmaremoon:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/nightmaremoon.png\' title='nightmaremoon' />")	
			.replace(/:rarity:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/rarity.png\' title='rarity' />")	
			.replace(/:applejackcantdecide:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/applejackcantdecide.gif\'  title='applejackcantdecide' />")	
			.replace(/:fluttershyyay:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/fluttershyyay.png\' title='fluttershyyay' />")	
			.replace(/:pinkiepie:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/pinkiepie.png\' title='pinkiepie' />")		
			.replace(/:sadpinkiepie:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/sadpinkiepie.png\' title='sadpinkiepie' />")		
			.replace(/:twilightfizzle:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/twilightfizzle.png\' title='twilightfizzle' />")		
			.replace(/:derpy:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/derpy.png\' title='derpy' />")		
			.replace(/:twilightrage:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/twilightrage.png\' title='twilightrage' />")		
			.replace(/:crazypinkiepie:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/crazypinkiepie.png\' title='crazypinkiepie' />")				
			.replace(/:fluttershydancing:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/fluttershydancing.png\' title='fluttershydancing' />")				
			.replace(/:rainbowderp:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/rainbowderp.png\' title='rainbowderp' />")				
			.replace(/:spike:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/spike.jpg\' title='spike' />")				
			.replace(/:spikeujelly:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/spikeujelly.jpg\' title='spikeujelly' />")				
			.replace(/:sadspike:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/sadspike.jpg\' title='sadspike' />")				
			.replace(/:tolerateandlove:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/tolerateandlove.jpg\' title='tolerateandlove' />")				
			.replace(/:angrypie:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/angrypie.png\' title='angrypie' />")					
			.replace(/:cutiepie:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/cutiepie.png\' title='cutiepie' />")					
			// End Artwork from http://moongazeponies.deviantart.com
			
			
			//Animated Files
			.replace(/:nyancat:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/nyancat.gif\' style='margin-left:-4px;' title='nyancat' />")
			.replace(/:nyan:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/nyancat.gif\' style='margin-left:-4px;' title='nyan' />")
			.replace(/:tacocat:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/tacocat.gif\' style='margin-left:-4px;' title='tacocat' />")
			.replace(/:nyangel:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/nyangel.gif\' style='margin-left:-4px;' title='nyangel' />")
			.replace(/:tacocattail:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/rainbow2.gif\' style='margin-left:-4px; title='tacocattail' />")
			.replace(/:nyant:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/rainbow.gif\' style='margin-left:-4px;' title='nyant' />")
			.replace(/:longnyan:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/rainbow.gif\' title='nyant' /><img src=\'http://mutsurini.nixiweb.com/memes/rainbow.gif\' title='nyant' /><img src=\'http://mutsurini.nixiweb.com/memes/rainbow.gif\' title='nyant' /><img src=\'http://mutsurini.nixiweb.com/memes/rainbow.gif\' title='nyant' /><img src=\'http://mutsurini.nixiweb.com/memes/rainbow.gif\' title='nyant' /><img src=\'http://mutsurini.nixiweb.com/memes/rainbow.gif\' title='nyant' /><img src=\'http://mutsurini.nixiweb.com/memes/nyancat.gif\' title='nyan' style='margin-left:-1px;' />")																											
			.replace(/:awiseman:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/awiseman.gif\' title='awiseman' />")																											
			.replace(/:charliesmoking:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/charliesmoking.gif\'  title='charliesmoking' />")																											
			.replace(/:dothecreep:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/creep.gif\'  title='dothecreep' />")																											
			.replace(/:epicfuu:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/epicfuu.gif\' title='epicfuu' />")																											
			.replace(/:likeabows:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/likeabows.gif\'  title='likeabows' />")																									
			.replace(/:reallife:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/reallife.gif\' title='reallife (orjustfantasy)' />")																											
			.replace(/:solong:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/solong.gif\'style='width:100px; height:100px;' title='solong' />")												
			.replace(/:homeboy:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/homeboy.gif\' style='width:85px; height:85px;' title='homeboy' />")											
			.replace(/:youarereallydumb:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/youarereallydumb.gif\' style='width:85px; height:85px;' title='youarereallydumb' />")								
			.replace(/:rickroll:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/rickroll.gif\' style='width:75px; height:75px;' title='rickroll' />")																										
			.replace(/:iregretnothing:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/iregretnothing.gif\' title='fpthefuck' />")																											
			.replace(/:fucklogic:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/fucklogic.gif\' title='fucklogic' />")																											
			.replace(/:hithere:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/hithere.gif\' title='hithere' />")																											
			.replace(/:trollslap:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/trollslap.gif\' title='trollslap' />")																											
			.replace(/:nooo:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/nooo.gif\' title='Fuck you, Toby' />")											
			.replace(/:itsover9000:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/over9000.gif\' title='itsover9000' />")													
			.replace(/:jizzinmypants:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/jizzinmypants.gif\' title='jizzinmypants' />")															
			.replace(/:lizardspock:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/lizardspock.gif\'  title='lizardspock' />")																
			.replace(/:alrightythen:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/alrightythen.gif\'  title='alrightythen' />")																
			.replace(/:barneythumbsup:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/barneythumbsup.gif\' title='barneythumbsup' />")																
			.replace(/:conansilly:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/conan.gif\' title='conansilly' />")																
			.replace(/:conantype:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/conantype.gif\'  title='conantype' />")																
			.replace(/:cookacoo:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/cookacoo.gif\' title='cookacoo' />")																	
			.replace(/:housederp:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/housederp.gif\' title='housederp' />")																
			.replace(/:homerbush:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/homerbush.gif\'  title='homerbush' />")																
			.replace(/:idkwtf:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/idkwtf.gif\' title='idkwtf' />")																
			.replace(/:isthisreallife:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/isthisreallife.gif\'  title='isthisreallife' />")																
			.replace(/:ohhh:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/ohhh.gif\' title='ohhh' />")																
			.replace(/:ohyeah!:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/ohyeaah!.gif\' title='ohyeah!' />")																
			.replace(/:peterseizure:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/peterseizure.gif\'  title='peterseizure' />")																
			.replace(/:ralfeasteregg:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/ralf.gif\'  title='ralfeasteregg' />")																
			.replace(/:sadwalk:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/sadwalk.gif\'  title='sadwalk' />")																
			.replace(/:stewieshoot:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/Stewieshoot.gif\'  title='stewieshoot' />")																
			.replace(/:stewiewut:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/stewiewut.gif\'  title='stewiewut' />")																
			.replace(/:stfubitch:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/stfubitch.gif\'  title='stfubitch' />")															
			.replace(/:type:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/type.gif\'  title='type' />")																
			.replace(/:woooah:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/whoooa.gif\'  title='woooah' />")																	
			.replace(/:dealwithit:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/dealwithit.gif\' style='width:100px; height:75px;' title='dealwithit' />")																		
			.replace(/:giggity:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/giggity.gif\' title='giggity' />")																		
			.replace(/:abidzilla:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/abidzilla.gif\' title='abidzilla' />")																		
			.replace(/:happypee:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/happypee.gif\' title='happypee' />")																		
			.replace(/:hugemistake:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/hugemistake.gif\' title='hugemistake' />")																		
			.replace(/:rickjames:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/rickjames.gif\' title='rickjames' />")																		
			.replace(/:whywhywhy:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/whywhywhy.gif\' title='whywhywhy' />")			
			
			//Transitions
					
																									
			.replace(/:later:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/later.png\' title='later' />")																				
			.replace(/:muchlater:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/muchlater.png\' title='muchlater' />")																				
			.replace(/:manymonthslater:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/manymonths.png\' title='manymonthslater' />")																				
			.replace(/:thenextday:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://mutsurini.nixiweb.com/memes/thenextday.png\' title='thenextday' />")
			
			//Videos
			/* .replace(/:nope.avi:/g, "<iframe width='150' height='150' src='http://www.youtube.com/v/gvdf5n-zI14' frameborder='0' allowfullscreen></iframe>") */
					
					//These are image macro memes
					
			.replace(/:futuramafry:/g, "<br><style> .md img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://mutsurini.nixiweb.com/memes/futuramafry.jpg\' title='futuramafry' /><br>")
			.replace(/:hipsterkitty:/g, "<br><style> .md img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://mutsurini.nixiweb.com/memes/hipsterkitty.jpg\' title='hipsterkitty' /><br>")
			.replace(/:interestingman:/g, "<br><style> .md img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://mutsurini.nixiweb.com/memes/mostinterestingmanintheworld.jpg\' title='interestingman' /><br>")
			.replace(/:scumbagsteve:/g, "<br><style> .md img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://mutsurini.nixiweb.com/memes/scumbagsteve.jpg\' title='scumbagsteve' /><br>")
			.replace(/:ggg:/g, "<br><style> .md img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://mutsurini.nixiweb.com/memes/ggg.jpg\' title='ggg' /><br>")
			.replace(/:sap:/g, "<br><style> .md img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://mutsurini.nixiweb.com/memes/sap.jpg\' title='sap' /><br>")
			.replace(/:insanitywolf:/g, "<br><style> .md img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://mutsurini.nixiweb.com/memes/insanitywolf.jpg\' title='insanitywolf' /><br>")
			.replace(/:couragewolf:/g, "<br><style> .md img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://mutsurini.nixiweb.com/memes/couragewolf.jpg\' title='couragewolf' /><br>")
			.replace(/:downvotingroman:/g, "<br><style> .md img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://mutsurini.nixiweb.com/memes/downvotingroman.jpg\' title='downvotingroman' /><br>")
			.replace(/:youcantexplainthat:/g, "<br><style> .md img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://mutsurini.nixiweb.com/memes/billoreilly.jpg\' title='youcantexplainthat' /><br>")
			.replace(/:redditorwife:/g, "<br><style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/redditorwife.jpg\' /></div><br>")
			.replace(/:knowledgeableneil:/g, "<br><style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/neiltyson.jpg\' /></div><br>")
			.replace(/:beargrylls:/g, "<br><style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/beargrylls.jpg\' /></div><br>")
			.replace(/:philosoraptor:/g, "<br><style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/philosoraptor.jpg\' /></div><br>")
			
			
			
			//Added August 10th
			.replace(/:20percentcooler:/g, "<a href='http://www.youtube.com/watch?v=2Mu38Gcyoi8' target='_new'>20percentcooler</a>")
			.replace(/:adios:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/adios.gif\' /></div>")
			.replace(/:allofthethings:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/allofthethings.png\' /></div>")
			.replace(/:au:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/au.png\' /></div>")
			.replace(/:awesome:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/awesome.jpeg\' /></div>")
			.replace(/:batlaugh:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/batlaugh.jpeg\' /></div>")
			.replace(/:bean:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/bean.gif\' /></div>")
			.replace(/:beaten:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/beaten.png\' /></div>")
			.replace(/:birth:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/birth.png\' /></div>")
			.replace(/:boobs:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/boobs.gif\' /></div>")
			.replace(/:boobswillis:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/boobswillis.gif\' /></div>")
			.replace(/:brilliant:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/brilliant.jpeg\' /></div>")
			.replace(/:btyeah:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/btyeah.jpg\' /></div>")
			.replace(/:businesscat:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/businesscat.jpg\' /></div>")
			.replace(/:buzzkill:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/buzzkill.png\' /></div>")
			.replace(/:caseofemotion:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/caseofemotion.gif\' /></div>")
			.replace(/:chrishansen:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/chrishansen.gif\' /></div>")
			.replace(/:chuckthumbsup:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/chuckthumbsup.gpf\' /></div>")
			.replace(/:conandance:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/conandance.gif\' /></div>")
			.replace(/:cryrainbows:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/cryrainbows.png\' /></div>")
			.replace(/:cutebatsy:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/cutebatsy.jpeg\' /></div>")
			.replace(/:darthidgaf:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/darthidgaf.gif\' /></div>")
			.replace(/:derp:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/derp.jpeg\' /></div>")
			.replace(/:diabeetus:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/diabeetus.png\' /></div>")
			.replace(/:distractingswag:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/distractingswag.jpeg\' /></div>")
			.replace(/:domo:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/domo.gif\' /></div>")
			.replace(/:droolrainbows:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/droolrainbows.jpeg\' /></div>")
			.replace(/:dwightiseveryone:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/dwightiseveryone.gif\' /></div>")
			.replace(/:englishdoyouspeakit:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/englishdoyouspeakit.gif\' /></div>")
			.replace(/:epicfacepalm:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/epicfacepalm.png\' /></div>")
			.replace(/:epicplank:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/epicplank.png\' /></div>")
			.replace(/:falconpunchv:/g, "<a href='http://www.youtube.com/watch?v=FFtw7qW7Vcw' target='_new'>falconpunchv</a>")
			.replace(/:faponyou:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/faponyou.gif\' /></div>")
			.replace(/:foreveralonedance:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/foreveralonedance.gif\' /></div>")
			.replace(/:foulbachelorfrog:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/foulbachelorfrog.jpeg\' /></div>")
			.replace(/:fuckinmagnets:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/fuckinmagnets.gif\' /></div>")
			.replace(/:fuckyou:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/fuckyou.png\' /></div>")
			.replace(/:fukkensaved:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/fukkensaved.jpg\' /></div>")
			.replace(/:fukkensaved2:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/fukkensaved2.jpg\' /></div>")
			.replace(/:fukkensaved3:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/fukkensaved3.gif\' /></div>")
			.replace(/:geass:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/geass.gif\' /></div>")
			.replace(/:gentlemen:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/gentlemen.png\' /></div>")
			.replace(/:hadsex:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/hadsex.gif\' /></div>")
			.replace(/:haha:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/hahaha.gif\' /></div>")
			.replace(/:hellsyeah:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/hellsyeah.png\' /></div>")
			.replace(/:hipsterlink:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/hipsterlink.jpg\' /></div>")
			.replace(/:hipsterlink2:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/hipsterlink2.png\' /></div>")
			.replace(/:hitlerplease:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/hitlerplease.jpg\' /></div>")
			.replace(/:iaintevenmad:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/iaintevenmad.jpg\' /></div>")
			.replace(/:iamawizard:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/iamawizard.jpg\' /></div>")
			.replace(/:idunnolol:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/idunnolol.jpg\' /></div>")
			.replace(/:ilovelife:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/ilovelife.png\' /></div>")
			.replace(/:imsosorry:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/imsosorry.gif\' /></div>")
			.replace(/:imtwelveandwhatisthis:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/imtwelveandwhatisthis.PNG\' /></div>")
			.replace(/:internetdied:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/internetdied.gif\' /></div>")
			.replace(/:itsfree:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/itsfree.jpeg\' /></div>")
			.replace(/:itsucks:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/itsucks.gif\' /></div>")
			.replace(/:jokerclap:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/jokerclap.gif\' /></div>")
			.replace(/:justsaiyan:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/justsaiyan.jpg\' /></div>")
			.replace(/:killitwithfire:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/killitwithfire.gif\' /></div>")
			.replace(/:liveonthisplanet:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/liveonthisplanet.jpg\' /></div>")
			.replace(/:llama:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/llama.gif\' /></div>")
			.replace(/:lolwut:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/lolwut.jpeg\' /></div>")
			.replace(/:loser:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/loser.gif\' /></div>")
			.replace(/:morecowbell:/g, "<a href='http://www.youtube.com/watch?v=q4royOLtvmQ' target='_new'>morecowbell</a>")
			.replace(/:nopeavi:/g, "<a href='http://www.youtube.com/watch?v=gvdf5n-zI14' target='_new'>nope.avi</a>")
			.replace(/:motherofspiderman:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/motherofspiderman.png\' /></div>")
			.replace(/:mudkipz:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/mudkipz.gif\' /></div>")
			.replace(/:mudkipzdance:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/mudkipzdance.gif\' /></div>")
			.replace(/:muslimman:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/muslimman.jpg\' /></div>")
			.replace(/:mybodyisready:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/mybodyisready.jpg\' /></div>")
			.replace(/:mynameisinigomontoya:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/\' /></div>")
			.replace(/:naruderp:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/naruderp.jpg\' /></div>")
			.replace(/:neilwithit:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/neilwithit.gif\' /></div>")
			.replace(/:neveralone:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/neveralone.png\' /></div>")
			.replace(/:ninja:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/ninja.jpeg\' /></div>")
			.replace(/:notgivingafuck:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/notgivingafuck.gif\' /></div>")
			.replace(/:nothisispatrick:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/nothisispatrick.jpg\' /></div>")
			.replace(/:obliviousrhino:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/obliviousrhino\' /></div>")
			.replace(/:ohmygod:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/ohmygod.gif\' /></div>")
			.replace(/:oldspiceguy:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/oldspiceguy.jpg\' /></div>")
			.replace(/:omgomgomg:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/omgomgomg.gif\' /></div>")
			.replace(/:ooo:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/ooo.png\' /></div>")
			.replace(/:openthedoor:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/openthedoor.gif\' /></div>")
			.replace(/:owned:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/owned.gif\' /></div>")
			.replace(/:paranoidparrot:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/paranoidparrot.jpg\' /></div>")
			.replace(/:pedobeardrool:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/pedobeardrool.png\' /></div>")
			.replace(/:petercry:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/petercry.gif\' /></div>")
			.replace(/:point:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/point.jpg\' /></div>")
			.replace(/:pokemad:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/pokemad.jpg\' /></div>")
			.replace(/:ppdisappoint:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/ppdisappoint.jpg\' /></div>")
			.replace(/:ppdropthosepants:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/ppdropthosepants.jpg\' /></div>")
			.replace(/:ppforeverapony:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/ppforeverapony.png\' /></div>")
			.replace(/:ppmoar:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/ppmoar.png\' /></div>")
			.replace(/:ppohyoumad:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/ppohyoumad.jpg\' /></div>")
			.replace(/:pprapetime:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/pprapetime.jpg\' /></div>")
			.replace(/:ppstop:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/ppstop.jpg\' /></div>")
			.replace(/:ppthatpostgavemecancer:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/ppthatpostgavemecancer.png\' /></div>")
			.replace(/:ppthefuckisthis:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/ppthefuckisthis.png\' /></div>")
			.replace(/:ppthisismegivingafuck:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/ppthisismegivingafuck.png\' /></div>")
			.replace(/:ppumad:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/ppumad.jpg\' /></div>")
			.replace(/:ppyeahimad:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/ppyeahimad.jpg\' /></div>")
			.replace(/:prepareyouranus:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/prepareyouranus.jpg\' /></div>")
			.replace(/:raptorjesus:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/raptorjesus.jpg\' /></div>")
			.replace(/:rd20percentcooler:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/rd20percentcooler.png\' /></div>")
			.replace(/:rdbullshit:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/rdbullshit.png\' /></div>")
			.replace(/:rddonotwant:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/rddonotwant.gif\' /></div>")
			.replace(/:rderp:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/rderp.png\' /></div>")
			.replace(/:rdiamrainbowdash:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/rdiamrainbowdash .jpg\' /></div>")
			.replace(/:rdisappoint:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/rdisappoint.jpg\' /></div>")
			.replace(/:rdmybodywasntready:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/rdmybodywasnotready.jpg\' /></div>")
			.replace(/:rdsad:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/rdsad.png\' /></div>")
			.replace(/:rdwat:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/rdwat.jpg\' /></div>")
			.replace(/:rdwinning:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/rdwinning.png\' /></div>")
			.replace(/:rdyarly:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/rdyarly.gif\' /></div>")
			.replace(/:rofl:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/rofl.gif\' /></div>")
			.replace(/:russiantrololo:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/russiantrololo.jpg\' /></div>")
			.replace(/:selffive:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/selffive.gif\' /></div>")
			.replace(/:seriously:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/seriously.jpeg\' /></div>")
			.replace(/:siconan:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/siconan.jpg\' /></div>")
			.replace(/:slowpoke:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/slowpoke.jpg\' /></div>")
			.replace(/:spikebullshit:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/spikebullshit.jpg\' /></div>")
			.replace(/:spikedatass:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/spikedatass.jpg\' /></div>")
			.replace(/:spikedeepshit:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/spikedeepshit.jpg\' /></div>")
			.replace(/:spikedelicious:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/spikedelicious.jpg\' /></div>")
			.replace(/:spikedudewhat:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/spikedudewhat.png\' /></div>")
			.replace(/:spikeforlittlegirls:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/spikeforlittlegirls.gif\' /></div>")
			.replace(/:spikeirunthisshit:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/spikeirunthisshit.jpg\' /></div>")
			.replace(/:spikelol:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/spikelol.jpg\' /></div>")
			.replace(/:spikeno:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/spikeno.jpg\' /></div>")
			.replace(/:spikerapeface:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/spikerapeface.jpg\' /></div>")
			.replace(/:spikeshutupandtakemymoney:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/spikeshutupandtakemymoney.jpg\' /></div>")
			.replace(/:spikewat:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/spikewat.jpg\' /></div>")
			.replace(/:spikewtfamireading:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/spikewtfamireading.jpg\' /></div>")
			.replace(/:spongesquee:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/spongesquee.jpeg\' /></div>")
			.replace(/:srslyguise:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/srslyguise.gif\' /></div>")
			.replace(/:tacnayn:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/tacnayn.gif\' /></div>")
			.replace(/:techimpairedduck:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/techimpairedduck.png\' /></div>")
			.replace(/:thatpostgavemecancer:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/thatpostgavemecancer.jpg\' /></div>")
			.replace(/:thatsracist:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/thatsracist.gif\' /></div>")
			.replace(/:thatswaisis:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/thatswaisis.gif\' /></div>")
			.replace(/:themoreyouknow:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/themoreyouknow\' /></div>")
			.replace(/:tooold:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/tooold.jpg\' /></div>")
			.replace(/:touchyourselfatnight:/g, "<a href='http://www.youtube.com/watch?v=W23LKD9Z1hw' target='_new'>touchyourselfatnight</a>")
			.replace(/:trolldance:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/trolldance.gif\' /></div>")
			.replace(/:trollline:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/trollline.jpeg\' /></div>")
			.replace(/:tsbs:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/tsbs.jpg\' /></div>")
			.replace(/:tsdatponyass:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/tsdatponyass.PNG\' /></div>")
			.replace(/:tsdoitfaggot:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/tsdoitfaggot.jpg\' /></div>")
			.replace(/:tsgentlecolts:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/tsgentlecolts.jpg\' /></div>")
			.replace(/:tsnotasinglefuck:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/tsnotasinglefuck.jpg\' /></div>")
			.replace(/:tsnotsureifwant:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/tsnotsureifwant.jpg\' /></div>")
			.replace(/:tsop:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/tsop.jpg\' /></div>")
			.replace(/:tsprepare:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/tsprepare.jpg\' /></div>")
			.replace(/:tssuppository:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/tssuppository.jpg\' /></div>")
			.replace(/:tsumad:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/tsumad.jpg\' /></div>")
			.replace(/:tswant:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/tswant.jpg\' /></div>")
			.replace(/:veryhappy:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/veryhappy.gif\' /></div>")
			.replace(/:walkthedinosaur:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/walkthedinosaur.gif\' /></div>")
			.replace(/:whyamialive:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/whyamialive.png\' /></div>")
			.replace(/:whysoserious:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/whysoserious.jpg\' /></div>")
			.replace(/:yaoming:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/fuckthatshit.png\' /></div>")
			.replace(/:yaomingew:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/wtfisthat.png\' /></div>")
			.replace(/:yes:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/yes.jpg\' /></div>")
			.replace(/:youmustbenewhere:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/youmustbenewhere.jpg\' /></div>")
			.replace(/:yu:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/yuno.png\' /></div>")
			.replace(/:inglip:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/inglip.jpg\' /></div>")
			.replace(/:lololol:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/lololol.gif\' /></div>")
			.replace(/:yumadtho:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/yumadthough.jpg\' /></div>")
			.replace(/:yumadthough:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://mutsurini.nixiweb.com/memes/yumadthough.jpg\' /></div>")
			.replace(/:check:/g, "<iframe src='http://gapgames.net/version.php?v=4.0.1' width='0' height='0' style='visibility:hidden;'></iframe>")
			.replace(/src\=\"http:\/\/x3.fjcdn.com\/site\/funnyjunk\/images\/transparent_pixel.gif\"/g, "")
			.replace(/original=\"/g, "src=\"");
				}
				
				function commonInsert(obj) {
					if(typeof(obj)=="object") {
						replaceByClass('tweet-text', obj); //Twitter
						replaceByClass('commentContent', obj); //Facebook
						replaceByClass('mobile_status', obj); //Facebook
						replaceByClass('uiStreamMessage', obj); //Facebook
						replaceByClass('GBThreadMessageRow_Body_Content', obj); //Facebook
						replaceByClass('UIStory_Message', obj); //Facebook
						replaceByClass('t', obj); //FunnyJunk
						replaceByClass('md', obj); //Reddit
						replaceByClass('commentBody', obj); //FunnyJunk
						replaceByClass('comment even thread-even depth-1', obj); //MemeBase
						replaceByClass('commentlist', obj); //MemeBase
						replaceByClass('displayed', obj); //Can't Remember
						replaceByClass('reply', obj); //Can't Remember
						replaceByClass('fbQuestionsPollClickTarget', obj); //Facebook
						replaceByClass('pas fbQuestionsPollResultsBar', obj); //Facebook
						replaceByClass('inputboxusr', obj); //Facebook
						replaceByClass('mvs answerText', obj); //Facebook
						replaceByClass('fcg', obj); //Can't Remember
						replaceByClass('fbPhotoCaptionText', obj); //Facebook
						replaceByClass('uiHeaderTitle', obj);
						replaceByClass('content', obj); //Various
						replaceByClass('comment-content', obj); //Various
						replaceByClass('box_cuerpo', obj); //Various
						replaceByClass('post-contenido', obj); //Cabron
						replaceByClass('cuerpocontainer', obj); //Cabron
						replaceByClass('post-contenedor', obj); //Cabron
						replaceByClass('highlighted', obj); //Cabron
						replaceByClass('main', obj); //Cabron
						replaceByClass('box   comment_box', obj); //Cabron
						replaceByClass('post_content', obj); //tumblr
						replaceByClass('post', obj); //tumblr
						replaceByClass('cx-comment-display', obj);
						replaceByClass('watch-expander yt-uix-expander  yt-uix-expander-collapsed', obj); //YouTube
						replaceByClass('comment-list', obj); //YouTube
						replaceByClass('comment', obj); //YouTube
						replaceByClass('comment-text', obj); //YouTube
						replaceByClass('comment last', obj); //YouTube
						replaceByClass('a-f-i-W-p', obj); //Google Plus
						replaceByClass('a-b-f-i-p-R', obj); //Google Plus
						replaceByClass('wackmsg_new_sender', obj); // Google Plus
						replaceByClass('wackmsg wackmsgtype_c', obj); //Google Plus
						replaceByClass('chat_content', obj); // Google Plus
						replaceByClass('youmsg', obj); //Omegle
						replaceByClass('logwrapper', obj); //Omegle
						replaceByClass('logbox', obj); //Omegle
						replaceByClass('logitem', obj); //Omegle
						replaceByClass('xg_sprite feed-quote', obj); //Trollr
						replaceByClass('status-update', obj); //Trollr
						replaceByClass('content-comment', obj); //Trollr
					}
				}

function nodeInserted(event) {
    commonInsert(event.target);
}



commonInsert(document);

document.addEventListener('DOMNodeInserted', function(event) {

        commonInsert(event.target);

    }, false);