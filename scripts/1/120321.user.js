// ==UserScript==
// @name           PokeTroll Icons v1 for Firefox
// @namespace      http://facebook.com/poketrollicons
// @description    Use Pokemon-ified memes on your favorite websites!.
// @include        *
// @version        1.1
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
			.replace(/:amabokcorb:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/amabokcorb.png\' title='amabokcorb' />")

			.replace(/:ashwtf:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/ashwtf.png\' title='ashwtf' />")
			
			.replace(/:audinolol:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/audinolol.png\' title='audinolol' />")

			.replace(/:awesomesprout:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/awesomesprout.png\' title='awesomesprout' />")	

			.replace(/:awkwardturtle:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/awkwardturtle.png\' title='awkwardturtle' />")

			.replace(/:ashshiiit:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/ashshiiit.png\' title='ashshiiit' />")


			.replace(/:bellawesome:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/bellawesome.png\' title='bellawesome' />")

			.replace(/:bellthrust:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/bellthrust.gif\' title='bellthrust' />")

			.replace(/:billymimes:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/billymimes2.png\' title='billymimes' />")

			.replace(/:snivyplease:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/bitchplease.png\' title='snivyplease' />")

			.replace(/:blazyuno:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/blazyuno.png\' title='blazyuno' />")

			.replace(/:bobafett:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/bobafett.png\' title='bobafett' />")

			.replace(/:brockface:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/brockface.png\' title='brockface' />")

			.replace(/:brockobama:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/brockobama.png\' title='brockobama' />")

			.replace(/:browing:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/browing.png\' title='browing' />")

			.replace(/:catchallthethings:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/catchallthethings.png\' title='catchallthethings' />")

			.replace(/:chucktesta:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/chucktesta.png\' title='chucktesta' />")

			.replace(/:brobasaur:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/comeatmebrobasaur.png\' title='brobasaur' />")

			.replace(/:comeatme:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/comeatmebro.png\' title='comeatme' />")

			.replace(/:creepyghosta:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/creepyghosta.png\' title='creepyghosta' />")

			.replace(/:datash:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/datash.png\' title='datash' />")

			.replace(/:datasss:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/datass.png\' title='datass' />")

			.replace(/:dealwithitsq:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/dealwithit.png\' title='dealwithitsq' />")

			.replace(/:derpmc:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/derp.png\' title='derpmc' />")

			.replace(/:dittofbm:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/dittofbm.png\' title='dittofbm' />")

			.replace(/:donateplz:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><a href='http://goo.gl/02vqQ'><img  src=\'http://pti.infinitexloop.info/pte/emotes/donate.png\' title='donateplz' /></a>")

			.replace(/:drscyther:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/drscyther.png\' title='drscyther' />")

			.replace(/:enoughhentai:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/enoughhentai.png\' title='enoughhentai' />")

			.replace(/:pikafuu:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/f7u12.png\' title='pikafuu' />")

			.replace(/:dawnfacepalm:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/facepalm.png\' title='dawnfacepalm' />")

			.replace(/:feellikeasaur:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/feellikeasaur.png\' title='feellikeasaur' />")

			.replace(/:likeasir:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/feellikeasir.png\' title='likeasir' />")

			.replace(/:dittofgm:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/feelsgoodditto.png\' title='dittofgm' />")

			.replace(/:foreveraclone:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/foreveraclone.png\' title='foreveraclone' />")

			.replace(/:foreverosh:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/foreveralone.png\' title='foreverosh' />")

			.replace(/:forevercubone:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/forevercubone.png\' title='forevercubone' />")

			.replace(/:frypoke:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/frypoke.png\' title='frypoke' />")

			.replace(/:fuckthispoke:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/fuckthisshit.png\' title='fuckthispoke' />")

			.replace(/:goingtospace:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/goingtospace.png\' title='goingtospace' />")

			.replace(/:pikagtfo:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/gtfo.png\' title='pikagtfo' />")

			.replace(/:gustarmie:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/gustarmie.png\' title='gustarmie' />")

			.replace(/:happyquag:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/happyquag.png\' title='happyquag' />")

			.replace(/:haunterclap:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/haunterclap.gif\' title='haunterclap' />")

			.replace(/:herp:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/herp.png\' title='herp' />")

			.replace(/:surgeainteven:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/iaintevenmad.png\' title='surgeainteven' />")

			.replace(/:interestingamabo:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/interestingamabo.png\' title='interestingamabo' />")

			.replace(/:interestingbrock:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/interestingbrock.png\' title='interestingbrock' />")

			.replace(/:kangkid:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/kangkid.png\' title='kangkid' />")

			.replace(/:killitwithblaz:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/killitwithfire.png\' title='killitwithblaz' />")

			.replace(/:liekmudkipz:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/liekmudkipz.png\' title='liekmudkipz' />")

			.replace(/:sqboss:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/likeaboss.png\' title='sqboss' />")

			.replace(/:likeagross:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/likeagross.png\' title='likeagross' />")

			.replace(/:likeaslowbro:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/likeaslowbro.png\' title='likeaslowbro' />")

			.replace(/:feelslikeasquir:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/likeasquir.png\' title='feelslikeasquir' />")

			.replace(/:lolkyogre:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/lol.png\' title='lolkyogre' />")

			.replace(/:meghosta:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/meghosta.png\' title='meghosta' />")

			.replace(/:metano:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/metano.png\' title='metano' />")

			.replace(/:missingno:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/missingno.png\' title='missingno' />")

			.replace(/:smudkip:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/mudkip.png\' title='smudkip' />")

			.replace(/:mudkipdance:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/mudkipdance.gif\' title='mudkipdance' />")

			.replace(/:nomeghosta:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/nomeghosta.png\' title='nomeghosta' />")

			.replace(/:ohlawd:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/ohlawd.png\' title='ohlawd' />")

			.replace(/:okaypika:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/okay.png\' title='okaypika' />")

			.replace(/:orlyhoot:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/orly.png\' title='orlyhoot' />")

			.replace(/:oshawhat:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/oshawhat.png\' title='oshawhat' />")

			.replace(/:9000:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/over9000.png\' title='9000' />")

			.replace(/:ursapedo:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/pedobear.png\' title='ursapedo' />")

			.replace(/:pedojr:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/pedobearjr.png\' title='pedojr' />")

			.replace(/:perry:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/perry.png\' title='perry' />")

			.replace(/:pikahaters:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/pikahaters.gif\' title='pikahaters' />")

			.replace(/:pokeumad:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/pokeumad.png\' title='pokeumad' />")

			.replace(/:raisay:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/raisay.png\' title='raisay' />")

			.replace(/:redwinning:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/redwinning.png\' title='redwinning' />")

			.replace(/:scumbagcharmander:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/scumbagcharmander.png\' title='scumchar' />")

			.replace(/:si:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/si.png\' title='si' />")

			.replace(/:munchsiclaro:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/siclaro.png\' title='munchsiclaro' />")

			.replace(/:simicoolstory:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/simicoolstorybro.png\' title='simicoolstory' />")

			.replace(/:spindafuck:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/spindafuck.png\' title='spindafuck' />")

			.replace(/:dawnstare:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/stare.png\' title='dawnstare' />")

			.replace(/:stareoak:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/stareoak.png\' title='stareoak' />")

			.replace(/:starmieroll:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/starmieroll.gif\' title='starmieroll' />")

			.replace(/:sudenough:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/sudenough.png\' title='sudenough' />")

			.replace(/:swagger:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/swagger.png\' title='swagger' />")

			.replace(/:sweetarceus:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/sweetarceus.png\' title='sweetarceus' />")

			.replace(/:racistjynx:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/thatsracist.png\' title='racistjynx' />")

			.replace(/:yamtitsorgtfo:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/titsorgtfo.png\' title='yamtitsorgtfo' />")

			.replace(/:steeltroll:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/trollface.png\' title='steeltroll' />")

			.replace(/:graytroll:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/trollface2.png\' title='garytroll' />")

			.replace(/:typhwut:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/typh_wut.png\' title='typhwut' />")

			.replace(/:garyujelly:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/ujelly.png\' title='garyujelly' />")

			.replace(/:snivyumad:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/umad2.png\' title='snivyumad' />")

			.replace(/:wobbuwut:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/Wobbuwut.png\' title='wobbuwut' />")

			.replace(/:dodriowut:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/wuuut.png\' title='dodriowut' />")

			.replace(/:yamcriminalscum:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/yamcriminalscum.png\' title='yamcriminalscum' />")

			.replace(/:yarlynoctowl:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/yarly.png\' title='yarlynoctowl' />")

			.replace(/:yunopika:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/yuno.png\' title='yunopika' />")

			.replace(/:yunochar:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/yuno_charmeleon.png\' title='yunochar' />")

			.replace(/:zoidkarp:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/zoidkarp.png\' title='zoidkarp' />")
			
			.replace(/:amslap:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/amslap.png\' title='amslap' />")

			.replace(/:amoonguss:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/amoonguss.png\' title='amoonguss' />")

			.replace(/:bestpokepage:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/bestpokepage.gif\' title='bestpokepage' />")

			.replace(/:wizardducklett:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/wizardducklett.gif\' title='wizardducklett' />")

			.replace(/:dawnstfu:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/stfu.png\' title='dawnstfu' />")

			.replace(/:pokerfish:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/pokerfish.png\' title='pokerfish' />")

			.replace(/:dragodad:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/newspaperdragonite.png\' title='dragodad' />")

			.replace(/:seaking:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/fyeahseaking.png\' title='seaking' />")

			.replace(/:frenchlax:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/frenchlax.png\' title='frenchlax' />")

			.replace(/:grimsleywtf:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/grimsleywtf.png\' title='grimsleywtf' />")

			.replace(/:gyarage:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><img  src=\'http://pti.infinitexloop.info/pte/emotes/gyaraf7u12.png\' title='gyarage' />")


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