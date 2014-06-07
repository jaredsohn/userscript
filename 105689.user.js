// ==UserScript==
// @name           Troll Emoticons v4 - Firefox/Safari Version
// @namespace      http://thinqtek.com/
// @description    Use meme emoticons on popular websites!.
// @include        *
// @version        4.0.6
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
			.replace(/:fapfapfap:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><div id='lol' class='lol'><img  src=\'http://thinqtek.com/temp/emotes/fapfapfap.png\' title='fapfapfap' /></div>")
			.replace(/:thumbsup:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/thumbsup.png\' title='thumbsup' />")
			.replace(/:challengeaccepted:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/challengeaccepted.png\' title='challengeaccepted' />")
			.replace(/:staredad:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/staredad.png\' title='staredad' />")
			.replace(/:iamdisappoint:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/disappoint.png\' title='iamdisappoint' />")
			.replace(/:meh:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/err.png' title='meh' />")
			.replace(/:cyoot:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/cyoot.png\' alt='cyoot' />")
			.replace(/:hmmm:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/hmmm.png\' alt='=hmmm' />")
			.replace(/:grin:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/grin.png\' title='grin' />")
			.replace(/:troll:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/troll.png\' title='There isn't a command here, problem?' />")
			.replace(/:trollface:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/trollface.png\' title='There isn't a command here, problem?' />")
			.replace(/:stare:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/stare.png\' title='stare' />")
			.replace(/:thefuck:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/thefuck.png\' title='thefuck' />")
			.replace(/:ffff:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/ffff.png\' title='ffff' />")
			.replace(/:fffuuu:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/f7u12.png\' title='ffff' />")
			.replace(/:no:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/no.png\' title='no' />")
			.replace(/:yuno:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/yuno.png\' title='yuno' />")
			.replace(/:letsdothis:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/letsdothis.png\' alt='letsdothis' />")
			.replace(/:areyoufuckingkiddingme:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/areyoufuckingkiddingme.png\' title='areyoufuckingkiddingme' />")
			.replace(/:f7u12:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/f7u12.png\' alt='f7u12' />")
			.replace(/:ilied:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/ilied.png\' title='ilied' />")
			.replace(/:trolldad:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/trolldad.png\' title='trolldad' />")
			.replace(/:trololo:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/trololo.png\' title='trololo' />")
			.replace(/:wtfisthat:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/wtfisthat.png\' title='wtfisthat' />")
			.replace(/:augh:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/augh.png\' title='augh' />")
			.replace(/:cerealguy:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/cerealguy.png\' title='cerealguy' />")
			.replace(/:betterthanexpected:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/everythingwentbetterthanexpected.png\' title='betterthanexpected' />")
			.replace(/:excitedyes:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/excitedyes.png\' title='excitedyes' />")
			.replace(/:pokerface:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/pokerface.png\' title='pokerface' />")
			.replace(/:sweetjesus:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/sweetjesus.png\' title='sweetjesus' />")
			.replace(/:creepygusta:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/creepygusta.png\' title='creepygusta' />")
			.replace(/:okay:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/okay.png\' title='okay' />")
			.replace(/:numb:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/numb.png\' title='numb' />")
			.replace(/:foreveralone:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/foreveralone.png\' title='foreveralone' />")
			.replace(/:why:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/why.png\' title='why' />")
			.replace(/:herpderp:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/herpderp.png\' title='herpderp' />")
			.replace(/:fuckyea:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/fuckyea.png\' title='fuckyea' />")
			.replace(/:gtfo:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/gtfo.png\' title='gtfo' />")
			.replace(/:closeenough:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/closeenough.png\' title='closeenough' />")
			.replace(/:grandmatroll:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/grandmatroll.png\' title='grandmatroll' />")
			.replace(/:hitler:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/hitler.png\' title='hitler' />")
			.replace(/:deviltroll:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/deviltroll.png\' title='deviltroll' />")
			.replace(/:gaytroll:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/gaytroll.png\' title='gaytroll' />")
			.replace(/:omg:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/omg.png\' title='omg' />")
			.replace(/:milk:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/milk.png\' title='milk' />")
			.replace(/:uhmwat:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/uhmwat.png\' title='uhmwat' />")
			.replace(/:wait:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/wait.png\' title='wait' />")
			.replace(/:wuuut:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/wuuut.png\' title='wuuut' />")
			.replace(/:clevergirl:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/clevergirl.jpg\' title='clevergirl' />")
			.replace(/:fuckthatshit:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/fuckthatshit.png\' title='fuckthatshit' />")
			.replace(/:lol:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/lol.png\' title='lol' />")
			.replace(/:fu:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/fu.jpg\' title='fu' />")
			.replace(/:megusta:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/megusta.png\' title='megusta' />")
			.replace(/:pedobear:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/pedobear.png\' title='pedobear' />")
			.replace(/:thefuckf:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/thefuckf.png\' title='thefuckf' />")
			.replace(/:feellikeasir:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/feellikeasir.png\' title='feellikeasir' />")
			.replace(/:orly:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/orly.jpg\' title='orly' />")
			.replace(/:yarly:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/yarly.jpg\' title='yarly' />")
		
			.replace(/:mentira:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/mentira.jpg\' title='mentira' />")
			.replace(/:siclaro:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/siclaro.jpg\' title='siclaro' />")
			.replace(/:pukerainbows:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/pukerainbows.jpg\' title='pukerainbows' />")
			.replace(/:putsonsunglasses:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/davidcaruso.jpg\' title='davidcaruso' />")
			.replace(/:yeaaah:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/yeaaah.png\' title='yeaaah' />")
			.replace(/:billymayshere:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/billymays.png\' title='billymayshere' />")
			.replace(/:mymindisfulloffuck:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/mymindisfulloffuck.jpg\' title='mymindisfulloffuck' />")			
			.replace(/:cry:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/cry.png\' title='cry' />")			
			.replace(/:nomegusta:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/nomegusta.png\' title='nomegusta' />")			
			.replace(/:awwyeah:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/awyeah.png\' title='awwyeah' />")			
			.replace(/:fapfapfapf:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/fapfapfapf.png\' title='fapfapfapf' />")			
			.replace(/:sad:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/sad.png\' title='sad' />")			
			.replace(/:unhappy:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/unhappy.png\' title='unhappy' />")			
			.replace(/:objection:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/objection.png\' title='objection' />")			
			.replace(/:happyforeveralone:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/happyforeveralone.png\' title='happyforeveralone' />")			
			.replace(/:datass:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/datass.png\' title='datass' />")			
			.replace(/:aintthatsomeshit:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/aintthatsomeshit.png\' title='aintthatsomeshit' />")			
			.replace(/:truestory:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/truestory.png\' title='truestory' />")			
			.replace(/:drunk:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/drunk.png\' title='drunk' />")			
			.replace(/:trollf:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/femaletrollface.png\' title='trollf' />")			
			.replace(/:babytroll:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/trollbaby.png\' title='babytroll' />")			
			.replace(/:fffuuuf:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/f7u12f.png\' title='fffuuuf' />")						
			.replace(/:shakinganger:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/shaking.png\' title='shakinganger' />")			
			.replace(/:sadtroll:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/sadtrollface.png\' title='sadtroll' />")				
			.replace(/:motherofgod:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/motherofgod.png\' title='motherofgod' />")					
			.replace(/:awesomeface:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/awesomeface.png\' title='awesomeface' />")						
			.replace(/:creeper:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/creeper.jpg\' title='creeper' />")							
			.replace(/:guyfawkesmask:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/guyfawkesmask.png\' title='guyfawkesmask' />")									
			.replace(/:weegee:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/weegee.png\' title='weegee' />")									
			.replace(/:rebblack:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/rebblack.jpg\' title='rebblack' />")													
			.replace(/:melvin:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/melvin.png\' title='melvin' />")													
			.replace(/:yodawg:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/yodawg.jpg\' title='yodawg' />")																
			.replace(/:likeaboss:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/likeaboss.png\' title='likeaboss' />")																
			.replace(/:feelsbadman:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/feelsbadman.jpg\' title='feelsbadman' />")																	
			.replace(/:staringleo:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/staringleo.png\' title='staringleo' />")																	
			.replace(/:happyf:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/happyf.png\' title='happyf' />")																	
			.replace(/:derpina:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/derpina.png\' title='derpina' />")																	
			.replace(/:waitaminute:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/waitaminute.png\' title='waitaminute' />")																	
			.replace(/:suspicious:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/suspicious.png\' title='suspicious' />")																	
			.replace(/:pftch:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/pftch.png\' title='pftch' />")																	
			.replace(/:cerealguyspitting:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/cerealguyspitting.png\' title='cerealguyspitting' />")																	
			.replace(/:newspaperguy:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/newspaperguy.png\' title='newspaperguy' />")																				
			.replace(/:newspaperguytear:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/newspaperguytear.png\' title='newspaperguytear' />")																				
			.replace(/:ohgod:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/ohgod.png\' title='ohgod' />")																						
			.replace(/:patrickplz:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/patrickplz.gif\' title='patrickplz' />")																							
			.replace(/:waiting:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/waiting.png\' title='waiting' />")																										
			.replace(/:sohardcore:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/sohardcore.png\' title='sohardcore' />")																									
			.replace(/:squee:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/squee.png\' title='squee' />")																										
			.replace(/:ummm:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/ummm.png\' title='ummm' />")																											
			.replace(/:umad:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/umad.png\' title='umad' />")																										
			.replace(/:this:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/this.png\' title='this' />")																																																									
			.replace(/:nopef:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/nopef.png\' title='nopef' />")																														
			.replace(/:shesaid:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/shesaid.png\' title='- Your Mother' />")																														
			.replace(/:badumtss:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/badumtsss.png\' title='badumtsss' />")																														
			.replace(/:donate:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><a href='http://bit.ly/mt6aKz'><img src=\'http://thinqtek.com/temp/emotes/donate.png\' title='donate' /></a>")																
			.replace(/:coolstorybro:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/coolstorybro.png\' title='coolstorybro' />")														
			.replace(/:doitfaggot:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/doitfaggot.jpeg\' title='doitfaggot' />")														
			.replace(/:fuckthis:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/fuckthis.jpg\' title='fuckthis' />")														
			.replace(/:garymotherfuckingoak:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/garyoak.jpg\' title='garymotherfuckingoak' />")														
			.replace(/:youveactivatedmytrapcard:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/youveactivatedmytrapcard.jpg\' title='youveactivatedmytrapcard' />")														
			.replace(/:goodnewseveryone:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/goodnewseveryone.jpg\' title='goodnewseveryone' />")														
			.replace(/:itssomething:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/itssomething.png\' title='itssomething' />")													
			.replace(/:dinkleberg:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/dinkleberg.jpg\' title='dinkleberg' />")													
			.replace(/:thegame:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/thegame.png\' title='thegame' />")													
			.replace(/:oportal:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/oportal.gif\' style='width:50px; height:50px' title='oportal' />")													
			.replace(/:bportal:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/bportal.gif\' style='width:50px; height:50px' title='bportal' />")													
			.replace(/:calmyotits:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/calmyotits.jpeg\' title='calmyotits' />")													
			.replace(/:charliederp:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/charliederp.jpeg\' title='charliederp' />")													
			.replace(/:comeonman:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/comeonman.png\' title='comeonman' />")													
			.replace(/:dicktits:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/dicktits.png\' title='dicktits' />")													
			.replace(/:durrrr:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/durrrr.png\'  title='durrrr' />")												
			.replace(/:facepalm:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/facepalm.jpg\'  title='facepalm' />")												
			.replace(/:fcat:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/fcat.png\'  title='fcat' />")												
			.replace(/:givingafuck:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/givingafuck.jpeg\'  title='givingafuck' />")												
			.replace(/:itsatrap:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/itsatrap.jpg\'  title='itsatrap' />")												
			.replace(/:juststfu:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/juststfu.png\'  title='juststfu' />")												
			.replace(/:leostrut:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/leostrut.png\'  title='leostrut' />")												
			.replace(/:lesquee:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/lesquee.png\'  title='lesquee' />")												
			.replace(/:mcat:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/mcat.png\'  title='mcat' />")												
			.replace(/:merikey:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/merikey.jpeg\'  title='merikey' />")												
			.replace(/:moss:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/moss.png\'  title='moss' />")												
			.replace(/:notasinglefuck:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/notasinglefuck.jpg\'  title='notasinglefuck' />")												
			.replace(/:saywhat:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/saywhat.jpeg\'  title='saywhat' />")												
			.replace(/:spidey:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/spidey.png\'  title='spidey' />")												
			.replace(/:spideyrelax:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/spideyrelax.png\'  title='spideyrelax' />")												
			.replace(/:swag:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/swag.jpg\'  title='swag' />")												
			.replace(/:titsorgtfo:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/togtfo.png\'  title='titsorgtfo' />")												
			.replace(/:upthis:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/upthis.png\'  title='upthis' />")												
			.replace(/:whatsgoingon:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/whatsgoingon.png\'  title='whatsgoingon' />")												
			.replace(/:yay:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/yay.jpg\'  title='yay' />")																	
			.replace(/:ujelly:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/ujelly.png\' title='ujelly' />")																		
			.replace(/:get:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><a href='http://bit.ly/n9NRTd'><img src=\'http://thinqtek.com/temp/emotes/get.png\' title='get' /></a>")
																				
			.replace(/:k:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/k.gif\' title='k' />")	
			
			//Barack Obama
			.replace(/:notbad:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/notbad.png\' title='notbad' />")
			
			
			//Charlie Sheen
			.replace(/:charliesheen:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/charliesheen.png\' title='charliesheen' />")
			.replace(/:duhwinning:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/duhwinning.png\' title='duhwinning' />")
			
			
			//Antoine Dodson
			.replace(/:hideyokids:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/hideyokids.jpg\' title='hideyokids' />")	
			
			
			//Nigel Thornberry
			.replace(/:mermaidnigel:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/mermaidnigel.gif\' title='mermaidnigel' />")		
			.replace(/:smashing:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/smashing.gif\' title='smashing' />")	
			
			
			//IT Crowd
			.replace(/:mossidgaf:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/idgaf.gif\'  title='mossidgaf' />")				
			.replace(/:mosssmash:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/mosssmash.gif\'  title='mosssmash' />")																													
			.replace(/:offandonagain:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/offandonagain.jpg\' title='offandonagain' />")																																																												
			.replace(/:fuckthisshit:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/fuckthisshit.gif\'  title='fuckthisshit' />")																											
			.replace(/:likeamoss:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/likeamoss.gif\'  title='likeamoss' />")		
			
			
			//Fresh Prince of Bel Air																																				
			.replace(/:fpthefuck:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/fpthefuck.png\' title='fpthefuck' />")	
			
			
			//Sounds
			.replace(/:over9000:/g, "<br><iframe src='http://gapgames.net/mp3/play.php?file=itsover9000.mp3' style='width:135px; height:35px;' frameborder='0' scrolling='no'>It's Over 9000!</iframe>")
			.replace(/:gottagetdownonfriday:/g, "<br><iframe title='gottagetdownonfriday' src='http://gapgames.net/mp3/play.php?file=friday.mp3' style='width:135px; height:35px;' frameborder='0' scrolling='no'>Friday, Friday, Gotta get down on Friday!</iframe>")
			
			
			//Brock Obama 2012
			.replace(/:brockobama2012:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><a href='https://www.facebook.com/BrockObeezy'><img src=\'http://thinqtek.com/temp/emotes/brockobama2012.jpg\' title='brockobama2012' /></a>")
			.replace(/:amabokcorb2012:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><a href='https://www.facebook.com/pages/Amabo-Kcorb/225856587440652'><img src=\'http://thinqtek.com/temp/emotes/amabokcorb2012.jpg\' oldtitle='amabokcorb2012' /></a>")					
			
			
			//My Little Pony: Friendship is Magic
			.replace(/:lightningblazeprance:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://fc05.deviantart.net/fs70/f/2011/121/3/8/its_here_its_here_by_ganton3-d3fcbja.gif' style='width:100px; height: 100px;' /><br>")
			.replace(/:rainbowdashsoawesome:/g, "<iframe src='http://www.deviantart.com/download/211317101/instant_rainbowdash__flash__by_ganton3-d3ht9bh.swf' frameborder='0' scrolling='no' width='155' height='120'></iframe>")
			.replace(/:appleoosa:/g, "<iframe src='http://www.deviantart.com/download/213748136/instant_braeburn__flash__by_ganton3-d3j9d48.swf' frameborder='0' scrolling='no' width='155' height='120'></iframe>")
			.replace(/:eeyup:/g, "<iframe src='http://www.deviantart.com/download/210776562/instant_macintosh__flash__by_ganton3-d3hho8i.swf' frameborder='0' scrolling='no' width='155' height='120'></iframe>")
			// All Artwork from here down is from http://moongazeponies.deviantart.com
			.replace(/:happyrainbowdash:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/happyrainbowdash.png\' title='happyrainbowdash' />")	
			.replace(/:sadrainbowdash:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/sadrainbowdash.jpg\' title='sadrainbowdash' />")	
			.replace(/:happyrarity:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/happyrarity.jpg\' title='happyrarity' />")	
			.replace(/:sadrarity:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/sadrarity.jpg\' title='sadrarity' />")	
			.replace(/:happyapplejack:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/happyapplejack.jpg\' title='happyapplejack' />")	
			.replace(/:sadapplejack:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/sadapplejack.jpg\' title='sadapplejack' />")	
			.replace(/:twilightsparkle:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/twilightsparkle.jpg\' title='twilightsparkle' />")	
			.replace(/:angryrainbowdash:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/angryrainbowdash.jpg\' title='angryrainbowdash' />")	
			.replace(/:sadtwilightsparkle:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/sadtwilightsparkle.jpg\' title='sadtwilightsparkle' />")	
			.replace(/:happytwilightsparkle:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/happytwilightsparkle.jpg\' title='happytwilightsparkle' />")	
			.replace(/:happyfluttershy:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/happyfluttershy.png\' title='happyfluttershy' />")	
			.replace(/:celestia:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/celestia.png\' title='celestia' />")	
			.replace(/:nightmaremoon:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/nightmaremoon.png\' title='nightmaremoon' />")	
			.replace(/:rarity:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/rarity.png\' title='rarity' />")	
			.replace(/:applejackcantdecide:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/applejackcantdecide.gif\'  title='applejackcantdecide' />")	
			.replace(/:fluttershyyay:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/fluttershyyay.png\' title='fluttershyyay' />")	
			.replace(/:pinkiepie:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/pinkiepie.png\' title='pinkiepie' />")		
			.replace(/:sadpinkiepie:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/sadpinkiepie.png\' title='sadpinkiepie' />")		
			.replace(/:twilightfizzle:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/twilightfizzle.png\' title='twilightfizzle' />")		
			.replace(/:derpy:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/derpy.png\' title='derpy' />")		
			.replace(/:twilightrage:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/twilightrage.png\' title='twilightrage' />")		
			.replace(/:crazypinkiepie:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/crazypinkiepie.png\' title='crazypinkiepie' />")				
			.replace(/:fluttershydancing:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/fluttershydancing.png\' title='fluttershydancing' />")				
			.replace(/:rainbowderp:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/rainbowderp.png\' title='rainbowderp' />")				
			.replace(/:spike:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/spike.jpg\' title='spike' />")				
			.replace(/:spikeujelly:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/spikeujelly.jpg\' title='spikeujelly' />")				
			.replace(/:sadspike:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/sadspike.jpg\' title='sadspike' />")				
			.replace(/:tolerateandlove:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/tolerateandlove.jpg\' title='tolerateandlove' />")				
			.replace(/:angrypie:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/angrypie.png\' title='angrypie' />")					
			.replace(/:cutiepie:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/cutiepie.png\' title='cutiepie' />")					
			// End Artwork from http://moongazeponies.deviantart.com
			
			
			//Animated Files
			.replace(/:nyancat:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/nyancat.gif\' style='margin-left:-4px;' title='nyancat' />")
			.replace(/:nyan:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/nyancat.gif\' style='margin-left:-4px;' title='nyan' />")
			.replace(/:tacocat:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/tacocat.gif\' style='margin-left:-4px;' title='tacocat' />")
			.replace(/:nyangel:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/nyangel.gif\' style='margin-left:-4px;' title='nyangel' />")
			.replace(/:tacocattail:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/rainbow2.gif\' style='margin-left:-4px; title='tacocattail' />")
			.replace(/:nyant:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/rainbow.gif\' style='margin-left:-4px;' title='nyant' />")
			.replace(/:longnyan:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/rainbow.gif\' title='nyant' /><img src=\'http://thinqtek.com/temp/emotes/rainbow.gif\' title='nyant' /><img src=\'http://thinqtek.com/temp/emotes/rainbow.gif\' title='nyant' /><img src=\'http://thinqtek.com/temp/emotes/rainbow.gif\' title='nyant' /><img src=\'http://thinqtek.com/temp/emotes/rainbow.gif\' title='nyant' /><img src=\'http://thinqtek.com/temp/emotes/rainbow.gif\' title='nyant' /><img src=\'http://thinqtek.com/temp/emotes/nyancat.gif\' title='nyan' style='margin-left:-1px;' />")																											
			.replace(/:awiseman:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/awiseman.gif\' title='awiseman' />")																											
			.replace(/:charliesmoking:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/charliesmoking.gif\'  title='charliesmoking' />")																											
			.replace(/:dothecreep:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/creep.gif\'  title='dothecreep' />")																											
			.replace(/:epicfuu:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/epicfuu.gif\' title='epicfuu' />")																											
			.replace(/:likeabows:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/likeabows.gif\'  title='likeabows' />")																									
			.replace(/:reallife:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/reallife.gif\' title='reallife (orjustfantasy)' />")																											
			.replace(/:solong:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/solong.gif\'style='width:100px; height:100px;' title='solong' />")												
			.replace(/:homeboy:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/homeboy.gif\' style='width:85px; height:85px;' title='homeboy' />")											
			.replace(/:youarereallydumb:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/youarereallydumb.gif\' style='width:85px; height:85px;' title='youarereallydumb' />")								
			.replace(/:rickroll:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/rickroll.gif\' style='width:75px; height:75px;' title='rickroll' />")																										
			.replace(/:iregretnothing:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/iregretnothing.gif\' title='fpthefuck' />")																											
			.replace(/:fucklogic:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/fucklogic.gif\' title='fucklogic' />")																											
			.replace(/:hithere:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/hithere.gif\' title='hithere' />")																											
			.replace(/:trollslap:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/trollslap.gif\' title='trollslap' />")																											
			.replace(/:nooo:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/nooo.gif\' title='Fuck you, Toby' />")											
			.replace(/:itsover9000:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/over9000.gif\' title='itsover9000' />")													
			.replace(/:jizzinmypants:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/jizzinmypants.gif\' title='jizzinmypants' />")															
			.replace(/:lizardspock:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/lizardspock.gif\'  title='lizardspock' />")																
			.replace(/:alrightythen:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/alrightythen.gif\'  title='alrightythen' />")																
			.replace(/:barneythumbsup:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/barneythumbsup.gif\' title='barneythumbsup' />")																
			.replace(/:conansilly:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/conan.gif\' title='conansilly' />")																
			.replace(/:conantype:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/conantype.gif\'  title='conantype' />")																
			.replace(/:cookacoo:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/cookacoo.gif\' title='cookacoo' />")																	
			.replace(/:housederp:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/housederp.gif\' title='housederp' />")																
			.replace(/:homerbush:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/homerbush.gif\'  title='homerbush' />")																
			.replace(/:idkwtf:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/idkwtf.gif\' title='idkwtf' />")																
			.replace(/:isthisreallife:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/isthisreallife.gif\'  title='isthisreallife' />")																
			.replace(/:ohhh:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/ohhh.gif\' title='ohhh' />")																
			.replace(/:ohyeah!:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/ohyeaah!.gif\' title='ohyeah!' />")																
			.replace(/:peterseizure:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/peterseizure.gif\'  title='peterseizure' />")																
			.replace(/:ralfeasteregg:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/ralf.gif\'  title='ralfeasteregg' />")																
			.replace(/:sadwalk:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/sadwalk.gif\'  title='sadwalk' />")																
			.replace(/:stewieshoot:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/Stewieshoot.gif\'  title='stewieshoot' />")																
			.replace(/:stewiewut:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/stewiewut.gif\'  title='stewiewut' />")																
			.replace(/:stfubitch:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/stfubitch.gif\'  title='stfubitch' />")															
			.replace(/:type:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/type.gif\'  title='type' />")																
			.replace(/:woooah:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/whoooa.gif\'  title='woooah' />")																	
			.replace(/:dealwithit:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/dealwithit.gif\' style='width:100px; height:75px;' title='dealwithit' />")																		
			.replace(/:giggity:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/giggity.gif\' title='giggity' />")																		
			.replace(/:abidzilla:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/abidzilla.gif\' title='abidzilla' />")																		
			.replace(/:happypee:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/happypee.gif\' title='happypee' />")																		
			.replace(/:hugemistake:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/hugemistake.gif\' title='hugemistake' />")																		
			.replace(/:rickjames:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/rickjames.gif\' title='rickjames' />")																		
			.replace(/:whywhywhy:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/whywhywhy.gif\' title='whywhywhy' />")			
			
			//Transitions
					
																									
			.replace(/:later:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/later.png\' title='later' />")																				
			.replace(/:muchlater:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/muchlater.png\' title='muchlater' />")																				
			.replace(/:manymonthslater:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/manymonths.png\' title='manymonthslater' />")																				
			.replace(/:thenextday:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/thenextday.png\' title='thenextday' />")
			
			//Videos
			/* .replace(/:nope.avi:/g, "<iframe width='150' height='150' src='http://www.youtube.com/v/gvdf5n-zI14' frameborder='0' allowfullscreen></iframe>") */
					
					//These are image macro memes
					
			.replace(/:futuramafry:/g, "<br><style> .md img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://thinqtek.com/temp/emotes/futuramafry.jpg\' title='futuramafry' /><br>")
			.replace(/:hipsterkitty:/g, "<br><style> .md img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://thinqtek.com/temp/emotes/hipsterkitty.jpg\' title='hipsterkitty' /><br>")
			.replace(/:interestingman:/g, "<br><style> .md img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://thinqtek.com/temp/emotes/mostinterestingmanintheworld.jpg\' title='interestingman' /><br>")
			.replace(/:scumbagsteve:/g, "<br><style> .md img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://thinqtek.com/temp/emotes/scumbagsteve.jpg\' title='scumbagsteve' /><br>")
			.replace(/:ggg:/g, "<br><style> .md img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://thinqtek.com/temp/emotes/ggg.jpg\' title='ggg' /><br>")
			.replace(/:sap:/g, "<br><style> .md img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://thinqtek.com/temp/emotes/sap.jpg\' title='sap' /><br>")
			.replace(/:insanitywolf:/g, "<br><style> .md img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://thinqtek.com/temp/emotes/insanitywolf.jpg\' title='insanitywolf' /><br>")
			.replace(/:couragewolf:/g, "<br><style> .md img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://thinqtek.com/temp/emotes/couragewolf.jpg\' title='couragewolf' /><br>")
			.replace(/:downvotingroman:/g, "<br><style> .md img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://thinqtek.com/temp/emotes/downvotingroman.jpg\' title='downvotingroman' /><br>")
			.replace(/:youcantexplainthat:/g, "<br><style> .md img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://thinqtek.com/temp/emotes/billoreilly.jpg\' title='youcantexplainthat' /><br>")
			.replace(/:redditorwife:/g, "<br><style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/redditorwife.jpg\' /></div><br>")
			.replace(/:knowledgeableneil:/g, "<br><style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/neiltyson.jpg\' /></div><br>")
			.replace(/:beargrylls:/g, "<br><style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/beargrylls.jpg\' /></div><br>")
			.replace(/:philosoraptor:/g, "<br><style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/philosoraptor.jpg\' /></div><br>")
			
			
			
			//Added August 10th
			.replace(/:20percentcooler:/g, "<a href='http://www.youtube.com/watch?v=2Mu38Gcyoi8' target='_new'>20percentcooler</a>")
			.replace(/:adios:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/adios.gif\' /></div>")
			.replace(/:allofthethings:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/allofthethings.png\' /></div>")
			.replace(/:au:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/au.png\' /></div>")
			.replace(/:awesome:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/awesome.jpeg\' /></div>")
			.replace(/:batlaugh:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/batlaugh.jpeg\' /></div>")
			.replace(/:bean:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/bean.gif\' /></div>")
			.replace(/:beaten:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/beaten.png\' /></div>")
			.replace(/:birth:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/birth.png\' /></div>")
			.replace(/:boobs:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/boobs.gif\' /></div>")
			.replace(/:boobswillis:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/boobswillis.gif\' /></div>")
			.replace(/:brilliant:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/brilliant.jpeg\' /></div>")
			.replace(/:btyeah:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/btyeah.jpg\' /></div>")
			.replace(/:businesscat:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/businesscat.jpg\' /></div>")
			.replace(/:buzzkill:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/buzzkill.png\' /></div>")
			.replace(/:caseofemotion:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/caseofemotion.gif\' /></div>")
			.replace(/:chrishansen:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/chrishansen.gif\' /></div>")
			.replace(/:chuckthumbsup:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/chuckthumbsup.gpf\' /></div>")
			.replace(/:conandance:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/conandance.gif\' /></div>")
			.replace(/:cryrainbows:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/cryrainbows.png\' /></div>")
			.replace(/:cutebatsy:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/cutebatsy.jpeg\' /></div>")
			.replace(/:darthidgaf:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/darthidgaf.gif\' /></div>")
			.replace(/:derp:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/derp.jpeg\' /></div>")
			.replace(/:diabeetus:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/diabeetus.png\' /></div>")
			.replace(/:distractingswag:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/distractingswag.jpeg\' /></div>")
			.replace(/:domo:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/domo.gif\' /></div>")
			.replace(/:droolrainbows:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/droolrainbows.jpeg\' /></div>")
			.replace(/:dwightiseveryone:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/dwightiseveryone.gif\' /></div>")
			.replace(/:englishdoyouspeakit:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/englishdoyouspeakit.gif\' /></div>")
			.replace(/:epicfacepalm:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/epicfacepalm.png\' /></div>")
			.replace(/:epicplank:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/epicplank.png\' /></div>")
			.replace(/:falconpunchv:/g, "<a href='http://www.youtube.com/watch?v=FFtw7qW7Vcw' target='_new'>falconpunchv</a>")
			.replace(/:faponyou:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/faponyou.gif\' /></div>")
			.replace(/:foreveralonedance:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/foreveralonedance.gif\' /></div>")
			.replace(/:foulbachelorfrog:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/foulbachelorfrog.jpeg\' /></div>")
			.replace(/:fuckinmagnets:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/fuckinmagnets.gif\' /></div>")
			.replace(/:fuckyou:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/fuckyou.png\' /></div>")
			.replace(/:fukkensaved:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/fukkensaved.jpg\' /></div>")
			.replace(/:fukkensaved2:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/fukkensaved2.jpg\' /></div>")
			.replace(/:fukkensaved3:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/fukkensaved3.gif\' /></div>")
			.replace(/:geass:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/geass.gif\' /></div>")
			.replace(/:gentlemen:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/gentlemen.png\' /></div>")
			.replace(/:hadsex:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/hadsex.gif\' /></div>")
			.replace(/:haha:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/hahaha.gif\' /></div>")
			.replace(/:hellsyeah:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/hellsyeah.png\' /></div>")
			.replace(/:hipsterlink:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/hipsterlink.jpg\' /></div>")
			.replace(/:hipsterlink2:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/hipsterlink2.png\' /></div>")
			.replace(/:hitlerplease:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/hitlerplease.jpg\' /></div>")
			.replace(/:iaintevenmad:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/iaintevenmad.jpg\' /></div>")
			.replace(/:iamawizard:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/iamawizard.jpg\' /></div>")
			.replace(/:idunnolol:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/idunnolol.jpg\' /></div>")
			.replace(/:ilovelife:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/ilovelife.png\' /></div>")
			.replace(/:imsosorry:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/imsosorry.gif\' /></div>")
			.replace(/:imtwelveandwhatisthis:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/imtwelveandwhatisthis.PNG\' /></div>")
			.replace(/:internetdied:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/internetdied.gif\' /></div>")
			.replace(/:itsfree:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/itsfree.jpeg\' /></div>")
			.replace(/:itsucks:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/itsucks.gif\' /></div>")
			.replace(/:jokerclap:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/jokerclap.gif\' /></div>")
			.replace(/:justsaiyan:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/justsaiyan.jpg\' /></div>")
			.replace(/:killitwithfire:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/killitwithfire.gif\' /></div>")
			.replace(/:liveonthisplanet:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/liveonthisplanet.jpg\' /></div>")
			.replace(/:llama:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/llama.gif\' /></div>")
			.replace(/:lolwut:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/lolwut.jpeg\' /></div>")
			.replace(/:loser:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/loser.gif\' /></div>")
			.replace(/:morecowbell:/g, "<a href='http://www.youtube.com/watch?v=q4royOLtvmQ' target='_new'>morecowbell</a>")
			.replace(/:nopeavi:/g, "<a href='http://www.youtube.com/watch?v=gvdf5n-zI14' target='_new'>nope.avi</a>")
			.replace(/:motherofspiderman:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/motherofspiderman.png\' /></div>")
			.replace(/:mudkipz:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/mudkipz.gif\' /></div>")
			.replace(/:mudkipzdance:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/mudkipzdance.gif\' /></div>")
			.replace(/:muslimman:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/muslimman.jpg\' /></div>")
			.replace(/:mybodyisready:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/mybodyisready.jpg\' /></div>")
			.replace(/:mynameisinigomontoya:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/\' /></div>")
			.replace(/:naruderp:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/naruderp.jpg\' /></div>")
			.replace(/:neilwithit:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/neilwithit.gif\' /></div>")
			.replace(/:neveralone:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/neveralone.png\' /></div>")
			.replace(/:ninja:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/ninja.jpeg\' /></div>")
			.replace(/:notgivingafuck:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/notgivingafuck.gif\' /></div>")
			.replace(/:nothisispatrick:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/nothisispatrick.jpg\' /></div>")
			.replace(/:obliviousrhino:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/obliviousrhino\' /></div>")
			.replace(/:ohmygod:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/ohmygod.gif\' /></div>")
			.replace(/:oldspiceguy:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/oldspiceguy.jpg\' /></div>")
			.replace(/:omgomgomg:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/omgomgomg.gif\' /></div>")
			.replace(/:ooo:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/ooo.png\' /></div>")
			.replace(/:openthedoor:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/openthedoor.gif\' /></div>")
			.replace(/:owned:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/owned.gif\' /></div>")
			.replace(/:paranoidparrot:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/paranoidparrot.jpg\' /></div>")
			.replace(/:pedobeardrool:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/pedobeardrool.png\' /></div>")
			.replace(/:petercry:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/petercry.gif\' /></div>")
			.replace(/:point:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/point.jpg\' /></div>")
			.replace(/:pokemad:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/pokemad.jpg\' /></div>")
			.replace(/:ppdisappoint:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/ppdisappoint.jpg\' /></div>")
			.replace(/:ppdropthosepants:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/ppdropthosepants.jpg\' /></div>")
			.replace(/:ppforeverapony:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/ppforeverapony.png\' /></div>")
			.replace(/:ppmoar:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/ppmoar.png\' /></div>")
			.replace(/:ppohyoumad:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/ppohyoumad.jpg\' /></div>")
			.replace(/:pprapetime:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/pprapetime.jpg\' /></div>")
			.replace(/:ppstop:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/ppstop.jpg\' /></div>")
			.replace(/:ppthatpostgavemecancer:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/ppthatpostgavemecancer.png\' /></div>")
			.replace(/:ppthefuckisthis:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/ppthefuckisthis.png\' /></div>")
			.replace(/:ppthisismegivingafuck:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/ppthisismegivingafuck.png\' /></div>")
			.replace(/:ppumad:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/ppumad.jpg\' /></div>")
			.replace(/:ppyeahimad:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/ppyeahimad.jpg\' /></div>")
			.replace(/:prepareyouranus:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/prepareyouranus.jpg\' /></div>")
			.replace(/:raptorjesus:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/raptorjesus.jpg\' /></div>")
			.replace(/:rd20percentcooler:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/rd20percentcooler.png\' /></div>")
			.replace(/:rdbullshit:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/rdbullshit.png\' /></div>")
			.replace(/:rddonotwant:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/rddonotwant.gif\' /></div>")
			.replace(/:rderp:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/rderp.png\' /></div>")
			.replace(/:rdiamrainbowdash:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/rdiamrainbowdash .jpg\' /></div>")
			.replace(/:rdisappoint:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/rdisappoint.jpg\' /></div>")
			.replace(/:rdmybodywasntready:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/rdmybodywasnotready.jpg\' /></div>")
			.replace(/:rdsad:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/rdsad.png\' /></div>")
			.replace(/:rdwat:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/rdwat.jpg\' /></div>")
			.replace(/:rdwinning:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/rdwinning.png\' /></div>")
			.replace(/:rdyarly:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/rdyarly.gif\' /></div>")
			.replace(/:rofl:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/rofl.gif\' /></div>")
			.replace(/:russiantrololo:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/russiantrololo.jpg\' /></div>")
			.replace(/:selffive:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/selffive.gif\' /></div>")
			.replace(/:seriously:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/seriously.jpeg\' /></div>")
			.replace(/:siconan:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/siconan.jpg\' /></div>")
			.replace(/:slowpoke:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/slowpoke.jpg\' /></div>")
			.replace(/:spikebullshit:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/spikebullshit.jpg\' /></div>")
			.replace(/:spikedatass:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/spikedatass.jpg\' /></div>")
			.replace(/:spikedeepshit:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/spikedeepshit.jpg\' /></div>")
			.replace(/:spikedelicious:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/spikedelicious.jpg\' /></div>")
			.replace(/:spikedudewhat:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/spikedudewhat.png\' /></div>")
			.replace(/:spikeforlittlegirls:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/spikeforlittlegirls.gif\' /></div>")
			.replace(/:spikeirunthisshit:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/spikeirunthisshit.jpg\' /></div>")
			.replace(/:spikelol:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/spikelol.jpg\' /></div>")
			.replace(/:spikeno:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/spikeno.jpg\' /></div>")
			.replace(/:spikerapeface:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/spikerapeface.jpg\' /></div>")
			.replace(/:spikeshutupandtakemymoney:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/spikeshutupandtakemymoney.jpg\' /></div>")
			.replace(/:spikewat:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/spikewat.jpg\' /></div>")
			.replace(/:spikewtfamireading:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/spikewtfamireading.jpg\' /></div>")
			.replace(/:spongesquee:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/spongesquee.jpeg\' /></div>")
			.replace(/:srslyguise:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/srslyguise.gif\' /></div>")
			.replace(/:tacnayn:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/tacnayn.gif\' /></div>")
			.replace(/:techimpairedduck:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/techimpairedduck.png\' /></div>")
			.replace(/:thatpostgavemecancer:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/thatpostgavemecancer.jpg\' /></div>")
			.replace(/:thatsracist:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/thatsracist.gif\' /></div>")
			.replace(/:thatswaisis:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/thatswaisis.gif\' /></div>")
			.replace(/:themoreyouknow:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/themoreyouknow\' /></div>")
			.replace(/:tooold:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/tooold.jpg\' /></div>")
			.replace(/:touchyourselfatnight:/g, "<a href='http://www.youtube.com/watch?v=W23LKD9Z1hw' target='_new'>touchyourselfatnight</a>")
			.replace(/:trolldance:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/trolldance.gif\' /></div>")
			.replace(/:trollline:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/trollline.jpeg\' /></div>")
			.replace(/:tsbs:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/tsbs.jpg\' /></div>")
			.replace(/:tsdatponyass:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/tsdatponyass.PNG\' /></div>")
			.replace(/:tsdoitfaggot:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/tsdoitfaggot.jpg\' /></div>")
			.replace(/:tsgentlecolts:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/tsgentlecolts.jpg\' /></div>")
			.replace(/:tsnotasinglefuck:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/tsnotasinglefuck.jpg\' /></div>")
			.replace(/:tsnotsureifwant:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/tsnotsureifwant.jpg\' /></div>")
			.replace(/:tsop:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/tsop.jpg\' /></div>")
			.replace(/:tsprepare:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/tsprepare.jpg\' /></div>")
			.replace(/:tssuppository:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/tssuppository.jpg\' /></div>")
			.replace(/:tsumad:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/tsumad.jpg\' /></div>")
			.replace(/:tswant:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/tswant.jpg\' /></div>")
			.replace(/:veryhappy:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/veryhappy.gif\' /></div>")
			.replace(/:walkthedinosaur:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/walkthedinosaur.gif\' /></div>")
			.replace(/:whyamialive:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/whyamialive.png\' /></div>")
			.replace(/:whysoserious:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/whysoserious.jpg\' /></div>")
			.replace(/:yaoming:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/fuckthatshit.png\' /></div>")
			.replace(/:yaomingew:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/wtfisthat.png\' /></div>")
			.replace(/:yes:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/yes.jpg\' /></div>")
			.replace(/:youmustbenewhere:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/youmustbenewhere.jpg\' /></div>")
			.replace(/:yu:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/yuno.png\' /></div>")
			.replace(/:yumadtho:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/yumadthough.jpg\' /></div>")
			.replace(/:yumadthough:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/yumadthough.jpg\' /></div>")
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