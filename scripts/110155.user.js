// ==UserScript==
// @name           Troll Emoticons (neatchat)
// @namespace      http://thinqtek.com/
// @description    Use meme emoticons on popular websites!. + Neatchat
// @include        *
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
  .replace(/:fapfapfap:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><div id='lol' class='lol'><img  src=\'http://gapgames.net/images/ragefacescript/fapfapfap.png\' title='fapfapfap' /></div>")
  .replace(/:thumbsup:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/thumbsup.png\' title='thumbsup' />")
  .replace(/:challengeaccepted:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/challengeaccepted.png\' title='challengeaccepted' />")
  .replace(/:staredad:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/staredad.png\' title='staredad' />")
  .replace(/:iamdisappoint:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/disappoint.png\' title='iamdisappoint' />")
  .replace(/:meh:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/err.png' title='meh' />")
  .replace(/:cyoot:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/cyoot.png\' alt='cyoot' />")
  .replace(/:hmmm:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/hmmm.png\' alt='=hmmm' />")
  .replace(/:grin:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/grin.png\' title='grin' />")
  .replace(/:troll:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/troll.png\' title='There isn't a command here, problem?' />")
  .replace(/:trollface:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/trollface.png\' title='There isn't a command here, problem?' />")
  .replace(/:stare:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/stare.png\' title='stare' />")
  .replace(/:thefuck:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/thefuck.png\' title='thefuck' />")
  .replace(/:ffff:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/ffff.png\' title='ffff' />")
  .replace(/:fffuuu:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/f7u12.png\' title='ffff' />")
  .replace(/:no:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/no.png\' title='no' />")
  .replace(/:yuno:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/yuno.png\' title='yuno' />")
  .replace(/:letsdothis:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/letsdothis.png\' alt='letsdothis' />")
  .replace(/:areyoufuckingkiddingme:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/areyoufuckingkiddingme.png\' title='areyoufuckingkiddingme' />")
  .replace(/:f7u12:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/f7u12.png\' alt='f7u12' />")
  .replace(/:ilied:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/ilied.png\' title='ilied' />")
  .replace(/:trolldad:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/trolldad.png\' title='trolldad' />")
  .replace(/:trololo:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/trololo.png\' title='trololo' />")
  .replace(/:wtfisthat:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/wtfisthat.png\' title='wtfisthat' />")
  .replace(/:augh:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/augh.png\' title='augh' />")
  .replace(/:cerealguy:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/cerealguy.png\' title='cerealguy' />")
  .replace(/:betterthanexpected:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/everythingwentbetterthanexpected.png\' title='betterthanexpected' />")
  .replace(/:excitedyes:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/excitedyes.png\' title='excitedyes' />")
  .replace(/:pokerface:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/pokerface.png\' title='pokerface' />")
  .replace(/:sweetjesus:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/sweetjesus.png\' title='sweetjesus' />")
  .replace(/:creepygusta:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/creepygusta.png\' title='creepygusta' />")
  .replace(/:okay:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/okay.png\' title='okay' />")
  .replace(/:numb:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/numb.png\' title='numb' />")
  .replace(/:foreveralone:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/foreveralone.png\' title='foreveralone' />")
  .replace(/:why:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/why.png\' title='why' />")
  .replace(/:herpderp:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/herpderp.png\' title='herpderp' />")
  .replace(/:fuckyea:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/fuckyea.png\' title='fuckyea' />")
  .replace(/:gtfo:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/gtfo.png\' title='gtfo' />")
  .replace(/:closeenough:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/closeenough.png\' title='closeenough' />")
  .replace(/:grandmatroll:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/grandmatroll.png\' title='grandmatroll' />")
  .replace(/:hitler:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/hitler.png\' title='hitler' />")
  .replace(/:deviltroll:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/deviltroll.png\' title='deviltroll' />")
  .replace(/:gaytroll:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/gaytroll.png\' title='gaytroll' />")
  .replace(/:omg:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/omg.png\' title='omg' />")
  .replace(/:milk:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/milk.png\' title='milk' />")
  .replace(/:uhmwat:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/uhmwat.png\' title='uhmwat' />")
  .replace(/:wait:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/wait.png\' title='wait' />")
  .replace(/:wuuut:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/wuuut.png\' title='wuuut' />")
  .replace(/:clevergirl:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/clevergirl.jpg\' title='clevergirl' />")
  .replace(/:fuckthatshit:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/fuckthatshit.png\' title='fuckthatshit' />")
  .replace(/:lol:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/lol.png\' title='lol' />")
  .replace(/:fu:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/fu.jpg\' title='fu' />")
  .replace(/:megusta:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/megusta.png\' title='megusta' />")
  .replace(/:pedobear:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/pedobear.png\' title='pedobear' />")
  .replace(/:thefuckf:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/thefuckf.png\' title='thefuckf' />")
  .replace(/:feellikeasir:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/feellikeasir.png\' title='feellikeasir' />")
  .replace(/:orly:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/orly.jpg\' title='orly' />")
  .replace(/:yarly:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/yarly.jpg\' title='yarly' />")

  .replace(/:mentira:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/mentira.jpg\' title='mentira' />")
  .replace(/:siclaro:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/siclaro.jpg\' title='siclaro' />")
  .replace(/:pukerainbows:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/pukerainbows.jpg\' title='pukerainbows' />")
  .replace(/:putsonsunglasses:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/davidcaruso.jpg\' title='davidcaruso' />")
  .replace(/:yeaaah:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/yeaaah.png\' title='yeaaah' />")
  .replace(/:billymayshere:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/billymays.png\' title='billymayshere' />")
  .replace(/:mymindisfulloffuck:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/mymindisfulloffuck.jpg\' title='mymindisfulloffuck' />")			
  .replace(/:cry:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/cry.png\' title='cry' />")			
  .replace(/:nomegusta:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/nomegusta.png\' title='nomegusta' />")			
  .replace(/:awwyeah:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/awyeah.png\' title='awwyeah' />")			
  .replace(/:fapfapfapf:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/fapfapfapf.png\' title='fapfapfapf' />")			
  .replace(/:sad:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/sad.png\' title='sad' />")			
  .replace(/:unhappy:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/unhappy.png\' title='unhappy' />")			
  .replace(/:objection:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/objection.png\' title='objection' />")			
  .replace(/:happyforeveralone:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/happyforeveralone.png\' title='happyforeveralone' />")			
  .replace(/:datass:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/datass.png\' title='datass' />")			
  .replace(/:aintthatsomeshit:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/aintthatsomeshit.png\' title='aintthatsomeshit' />")			
  .replace(/:truestory:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/truestory.png\' title='truestory' />")			
  .replace(/:drunk:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/drunk.png\' title='drunk' />")			
  .replace(/:trollf:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/femaletrollface.png\' title='trollf' />")			
  .replace(/:babytroll:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/trollbaby.png\' title='babytroll' />")			
  .replace(/:fffuuuf:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/f7u12f.png\' title='fffuuuf' />")						
  .replace(/:shakinganger:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/shaking.png\' title='shakinganger' />")			
  .replace(/:sadtroll:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/sadtrollface.png\' title='sadtroll' />")				
  .replace(/:motherofgod:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/motherofgod.png\' title='motherofgod' />")					
  .replace(/:awesomeface:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/awesomeface.png\' title='awesomeface' />")						
  .replace(/:creeper:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/creeper.jpg\' title='creeper' />")							
  .replace(/:guyfawkesmask:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/guyfawkesmask.png\' title='guyfawkesmask' />")									
  .replace(/:weegee:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/weegee.png\' title='weegee' />")									
  .replace(/:rebblack:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/rebblack.jpg\' title='rebblack' />")													
  .replace(/:melvin:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/melvin.png\' title='melvin' />")													
  .replace(/:yodawg:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/yodawg.jpg\' title='yodawg' />")																
  .replace(/:likeaboss:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/likeaboss.png\' title='likeaboss' />")																
  .replace(/:feelsbadman:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/feelsbadman.jpg\' title='feelsbadman' />")																	
  .replace(/:staringleo:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/staringleo.png\' title='staringleo' />")																	
  .replace(/:happyf:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/happyf.png\' title='happyf' />")																	
  .replace(/:derpina:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/derpina.png\' title='derpina' />")																	
  .replace(/:waitaminute:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/waitaminute.png\' title='waitaminute' />")																	
  .replace(/:suspicious:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/suspicious.png\' title='suspicious' />")																	
  .replace(/:pftch:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/pftch.png\' title='pftch' />")																	
  .replace(/:cerealguyspitting:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/cerealguyspitting.png\' title='cerealguyspitting' />")																	
  .replace(/:newspaperguy:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/newspaperguy.png\' title='newspaperguy' />")																				
  .replace(/:newspaperguytear:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/newspaperguytear.png\' title='newspaperguytear' />")																				
  .replace(/:ohgod:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/ohgod.png\' title='ohgod' />")																						
  .replace(/:patrickplz:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/patrickplz.gif\' title='patrickplz' />")																							
  .replace(/:waiting:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/waiting.png\' title='waiting' />")																										
  .replace(/:sohardcore:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/sohardcore.png\' title='sohardcore' />")																									
  .replace(/:squee:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/squee.png\' title='squee' />")																										
  .replace(/:ummm:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/ummm.png\' title='ummm' />")																											
  .replace(/:umad:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/umad.png\' title='umad' />")																										
  .replace(/:this:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/this.png\' title='this' />")																																																									
  .replace(/:nopef:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/nopef.png\' title='nopef' />")																														
  .replace(/:shesaid:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/shesaid.png\' title='- Your Mother' />")																														
  .replace(/:badumtss:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/badumtsss.png\' title='badumtsss' />")																														
  .replace(/:donate:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><a href='http://bit.ly/mt6aKz'><img src=\'http://gapgames.net/images/ragefacescript/donate.png\' title='donate' /></a>")																
  .replace(/:coolstorybro:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/coolstorybro.png\' title='coolstorybro' />")														
  .replace(/:doitfaggot:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/doitfaggot.jpeg\' title='doitfaggot' />")														
  .replace(/:fuckthis:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/fuckthis.jpg\' title='fuckthis' />")														
  .replace(/:garymotherfuckingoak:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/garyoak.jpg\' title='garymotherfuckingoak' />")														
  .replace(/:youveactivatedmytrapcard:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/youveactivatedmytrapcard.jpg\' title='youveactivatedmytrapcard' />")														
  .replace(/:goodnewseveryone:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/goodnewseveryone.jpg\' title='goodnewseveryone' />")														
  .replace(/:itssomething:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/itssomething.png\' title='itssomething' />")													
  .replace(/:dinkleberg:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/dinkleberg.jpg\' title='dinkleberg' />")													
  .replace(/:thegame:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/thegame.png\' title='thegame' />")													
  .replace(/:oportal:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/oportal.gif\' style='width:50px; height:50px' title='oportal' />")													
  .replace(/:bportal:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/bportal.gif\' style='width:50px; height:50px' title='bportal' />")													
  .replace(/:calmyotits:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/calmyotits.jpeg\' title='calmyotits' />")													
  .replace(/:charliederp:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/charliederp.jpeg\' title='charliederp' />")													
  .replace(/:comeonman:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/comeonman.png\' title='comeonman' />")													
  .replace(/:dicktits:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/dicktits.png\' title='dicktits' />")													
  .replace(/:durrrr:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/durrrr.png\'  title='durrrr' />")												
  .replace(/:facepalm:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/facepalm.jpg\'  title='facepalm' />")												
  .replace(/:fcat:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/fcat.png\'  title='fcat' />")												
  .replace(/:givingafuck:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/givingafuck.jpeg\'  title='givingafuck' />")												
  .replace(/:itsatrap:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/itsatrap.jpg\'  title='itsatrap' />")												
  .replace(/:juststfu:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/juststfu.png\'  title='juststfu' />")												
  .replace(/:leostrut:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/leostrut.png\'  title='leostrut' />")												
  .replace(/:lesquee:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/lesquee.png\'  title='lesquee' />")												
  .replace(/:mcat:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/mcat.png\'  title='mcat' />")												
  .replace(/:merikey:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/merikey.jpeg\'  title='merikey' />")												
  .replace(/:moss:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/moss.png\'  title='moss' />")												
  .replace(/:notasinglefuck:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/notasinglefuck.jpg\'  title='notasinglefuck' />")												
  .replace(/:saywhat:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/saywhat.jpeg\'  title='saywhat' />")												
  .replace(/:spidey:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/spidey.png\'  title='spidey' />")												
  .replace(/:spideyrelax:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/spideyrelax.png\'  title='spideyrelax' />")												
  .replace(/:swag:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/swag.jpg\'  title='swag' />")												
  .replace(/:titsorgtfo:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/togtfo.png\'  title='titsorgtfo' />")												
  .replace(/:upthis:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/upthis.png\'  title='upthis' />")												
  .replace(/:whatsgoingon:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/whatsgoingon.png\'  title='whatsgoingon' />")												
  .replace(/:yay:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/yay.jpg\'  title='yay' />")																	
  .replace(/:ujelly:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/ujelly.png\' title='ujelly' />")																		
  .replace(/:get:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><a href='http://bit.ly/n9NRTd'><img src=\'http://gapgames.net/images/ragefacescript/get.png\' title='get' /></a>")
                                  
  .replace(/:k:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/k.gif\' title='k' />")	

  //Barack Obama
  .replace(/:notbad:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/notbad.png\' title='notbad' />")


  //Charlie Sheen
  .replace(/:charliesheen:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/charliesheen.png\' title='charliesheen' />")
  .replace(/:duhwinning:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/duhwinning.png\' title='duhwinning' />")


  //Antoine Dodson
  .replace(/:hideyokids:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/hideyokids.jpg\' title='hideyokids' />")	


  //Nigel Thornberry
  .replace(/:mermaidnigel:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/mermaidnigel.gif\' title='mermaidnigel' />")		
  .replace(/:smashing:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/smashing.gif\' title='smashing' />")	


  //IT Crowd
  .replace(/:mossidgaf:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/idgaf.gif\'  title='mossidgaf' />")				
  .replace(/:mosssmash:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/mosssmash.gif\'  title='mosssmash' />")																													
  .replace(/:offandonagain:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/offandonagain.jpg\' title='offandonagain' />")																																																												
  .replace(/:fuckthisshit:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/fuckthisshit.gif\'  title='fuckthisshit' />")																											
  .replace(/:likeamoss:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/likeamoss.gif\'  title='likeamoss' />")		


  //Fresh Prince of Bel Air																																				
  .replace(/:fpthefuck:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/fpthefuck.png\' title='fpthefuck' />")	


  //Sounds
  .replace(/:over9000:/g, "<br><iframe src='http://gapgames.net/mp3/play.php?file=itsover9000.mp3' style='width:135px; height:35px;' frameborder='0' scrolling='no'>It's Over 9000!</iframe>")
  .replace(/:gottagetdownonfriday:/g, "<br><iframe title='gottagetdownonfriday' src='http://gapgames.net/mp3/play.php?file=friday.mp3' style='width:135px; height:35px;' frameborder='0' scrolling='no'>Friday, Friday, Gotta get down on Friday!</iframe>")


  //Brock Obama 2012
  .replace(/:brockobama2012:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><a href='https://www.facebook.com/BrockObeezy'><img src=\'http://gapgames.net/images/ragefacescript/brockobama2012.jpg\' title='brockobama2012' /></a>")
  .replace(/:amabokcorb2012:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><a href='https://www.facebook.com/pages/Amabo-Kcorb/225856587440652'><img src=\'http://gapgames.net/images/ragefacescript/amabokcorb2012.jpg\' oldtitle='amabokcorb2012' /></a>")					


  //My Little Pony: Friendship is Magic
  .replace(/:lightningblazeprance:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://fc05.deviantart.net/fs70/f/2011/121/3/8/its_here_its_here_by_ganton3-d3fcbja.gif' style='width:100px; height: 100px;' /><br>")
  .replace(/:rainbowdashsoawesome:/g, "<iframe src='http://www.deviantart.com/download/211317101/instant_rainbowdash__flash__by_ganton3-d3ht9bh.swf' frameborder='0' scrolling='no' width='155' height='120'></iframe>")
  .replace(/:appleoosa:/g, "<iframe src='http://www.deviantart.com/download/213748136/instant_braeburn__flash__by_ganton3-d3j9d48.swf' frameborder='0' scrolling='no' width='155' height='120'></iframe>")
  .replace(/:eeyup:/g, "<iframe src='http://www.deviantart.com/download/210776562/instant_macintosh__flash__by_ganton3-d3hho8i.swf' frameborder='0' scrolling='no' width='155' height='120'></iframe>")
  // All Artwork from here down is from http://moongazeponies.deviantart.com
  .replace(/:happyrainbowdash:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/happyrainbowdash.png\' title='happyrainbowdash' />")	
  .replace(/:sadrainbowdash:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/sadrainbowdash.jpg\' title='sadrainbowdash' />")	
  .replace(/:happyrarity:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/happyrarity.jpg\' title='happyrarity' />")	
  .replace(/:sadrarity:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/sadrarity.jpg\' title='sadrarity' />")	
  .replace(/:happyapplejack:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/happyapplejack.jpg\' title='happyapplejack' />")	
  .replace(/:sadapplejack:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/sadapplejack.jpg\' title='sadapplejack' />")	
  .replace(/:twilightsparkle:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/twilightsparkle.jpg\' title='twilightsparkle' />")	
  .replace(/:angryrainbowdash:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/angryrainbowdash.jpg\' title='angryrainbowdash' />")	
  .replace(/:sadtwilightsparkle:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/sadtwilightsparkle.jpg\' title='sadtwilightsparkle' />")	
  .replace(/:happytwilightsparkle:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/happytwilightsparkle.jpg\' title='happytwilightsparkle' />")	
  .replace(/:happyfluttershy:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/happyfluttershy.png\' title='happyfluttershy' />")	
  .replace(/:celestia:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/celestia.png\' title='celestia' />")	
  .replace(/:nightmaremoon:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/nightmaremoon.png\' title='nightmaremoon' />")	
  .replace(/:rarity:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/rarity.png\' title='rarity' />")	
  .replace(/:applejackcantdecide:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/applejackcantdecide.gif\'  title='applejackcantdecide' />")	
  .replace(/:fluttershyyay:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/fluttershyyay.png\' title='fluttershyyay' />")	
  .replace(/:pinkiepie:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/pinkiepie.png\' title='pinkiepie' />")		
  .replace(/:sadpinkiepie:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/sadpinkiepie.png\' title='sadpinkiepie' />")		
  .replace(/:twilightfizzle:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/twilightfizzle.png\' title='twilightfizzle' />")		
  .replace(/:derpy:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/derpy.png\' title='derpy' />")		
  .replace(/:twilightrage:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/twilightrage.png\' title='twilightrage' />")		
  .replace(/:crazypinkiepie:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/crazypinkiepie.png\' title='crazypinkiepie' />")				
  .replace(/:fluttershydancing:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/fluttershydancing.png\' title='fluttershydancing' />")				
  .replace(/:rainbowderp:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/rainbowderp.png\' title='rainbowderp' />")				
  .replace(/:spike:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/spike.jpg\' title='spike' />")				
  .replace(/:spikeujelly:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/spikeujelly.jpg\' title='spikeujelly' />")				
  .replace(/:sadspike:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/sadspike.jpg\' title='sadspike' />")				
  .replace(/:tolerateandlove:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/tolerateandlove.jpg\' title='tolerateandlove' />")				
  .replace(/:angrypie:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/angrypie.png\' title='angrypie' />")					
  .replace(/:cutiepie:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/cutiepie.png\' title='cutiepie' />")					
  // End Artwork from http://moongazeponies.deviantart.com


  //Animated Files
  .replace(/:nyancat:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/nyancat.gif\' style='margin-left:-4px;' title='nyancat' />")
  .replace(/:nyan:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/nyancat.gif\' style='margin-left:-4px;' title='nyan' />")
  .replace(/:tacocat:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/tacocat.gif\' style='margin-left:-4px;' title='tacocat' />")
  .replace(/:nyangel:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/nyangel.gif\' style='margin-left:-4px;' title='nyangel' />")
  .replace(/:tacocattail:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/rainbow2.gif\' style='margin-left:-4px; title='tacocattail' />")
  .replace(/:nyant:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/rainbow.gif\' style='margin-left:-4px;' title='nyant' />")
  .replace(/:longnyan:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/rainbow.gif\' title='nyant' /><img src=\'http://gapgames.net/images/ragefacescript/rainbow.gif\' title='nyant' /><img src=\'http://gapgames.net/images/ragefacescript/rainbow.gif\' title='nyant' /><img src=\'http://gapgames.net/images/ragefacescript/rainbow.gif\' title='nyant' /><img src=\'http://gapgames.net/images/ragefacescript/rainbow.gif\' title='nyant' /><img src=\'http://gapgames.net/images/ragefacescript/rainbow.gif\' title='nyant' /><img src=\'http://gapgames.net/images/ragefacescript/nyancat.gif\' title='nyan' style='margin-left:-1px;' />")																											
  .replace(/:awiseman:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/awiseman.gif\' title='awiseman' />")																											
  .replace(/:charliesmoking:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/charliesmoking.gif\'  title='charliesmoking' />")																											
  .replace(/:dothecreep:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/creep.gif\'  title='dothecreep' />")																											
  .replace(/:epicfuu:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/epicfuu.gif\' title='epicfuu' />")																											
  .replace(/:likeabows:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/likeabows.gif\'  title='likeabows' />")																									
  .replace(/:reallife:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/reallife.gif\' title='reallife (orjustfantasy)' />")																											
  .replace(/:solong:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/solong.gif\'style='width:100px; height:100px;' title='solong' />")												
  .replace(/:homeboy:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/homeboy.gif\' style='width:85px; height:85px;' title='homeboy' />")											
  .replace(/:youarereallydumb:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/youarereallydumb.gif\' style='width:85px; height:85px;' title='youarereallydumb' />")								
  .replace(/:rickroll:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/rickroll.gif\' style='width:75px; height:75px;' title='rickroll' />")																										
  .replace(/:iregretnothing:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/iregretnothing.gif\' title='fpthefuck' />")																											
  .replace(/:fucklogic:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/fucklogic.gif\' title='fucklogic' />")																											
  .replace(/:hithere:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/hithere.gif\' title='hithere' />")																											
  .replace(/:trollslap:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/trollslap.gif\' title='trollslap' />")																											
  .replace(/:nooo:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/nooo.gif\' title='Fuck you, Toby' />")											
  .replace(/:itsover9000:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/over9000.gif\' title='itsover9000' />")													
  .replace(/:jizzinmypants:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/jizzinmypants.gif\' title='jizzinmypants' />")															
  .replace(/:lizardspock:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/lizardspock.gif\'  title='lizardspock' />")																
  .replace(/:alrightythen:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/alrightythen.gif\'  title='alrightythen' />")																
  .replace(/:barneythumbsup:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/barneythumbsup.gif\' title='barneythumbsup' />")																
  .replace(/:conansilly:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/conan.gif\' title='conansilly' />")																
  .replace(/:conantype:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/conantype.gif\'  title='conantype' />")																
  .replace(/:cookacoo:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/cookacoo.gif\' title='cookacoo' />")																	
  .replace(/:housederp:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/housederp.gif\' title='housederp' />")																
  .replace(/:homerbush:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/homerbush.gif\'  title='homerbush' />")																
  .replace(/:idkwtf:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/idkwtf.gif\' title='idkwtf' />")																
  .replace(/:isthisreallife:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/isthisreallife.gif\'  title='isthisreallife' />")																
  .replace(/:ohhh:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/ohhh.gif\' title='ohhh' />")																
  .replace(/:ohyeah!:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/ohyeaah!.gif\' title='ohyeah!' />")																
  .replace(/:peterseizure:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/peterseizure.gif\'  title='peterseizure' />")																
  .replace(/:ralfeasteregg:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/ralf.gif\'  title='ralfeasteregg' />")																
  .replace(/:sadwalk:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/sadwalk.gif\'  title='sadwalk' />")																
  .replace(/:stewieshoot:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/Stewieshoot.gif\'  title='stewieshoot' />")																
  .replace(/:stewiewut:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/stewiewut.gif\'  title='stewiewut' />")																
  .replace(/:stfubitch:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/stfubitch.gif\'  title='stfubitch' />")															
  .replace(/:type:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/type.gif\'  title='type' />")																
  .replace(/:woooah:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/whoooa.gif\'  title='woooah' />")																	
  .replace(/:dealwithit:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/dealwithit.gif\' style='width:100px; height:75px;' title='dealwithit' />")																		
  .replace(/:giggity:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/giggity.gif\' title='giggity' />")																		
  .replace(/:abidzilla:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/abidzilla.gif\' title='abidzilla' />")																		
  .replace(/:happypee:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/happypee.gif\' title='happypee' />")																		
  .replace(/:hugemistake:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/hugemistake.gif\' title='hugemistake' />")																		
  .replace(/:rickjames:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/rickjames.gif\' title='rickjames' />")																		
  .replace(/:whywhywhy:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/whywhywhy.gif\' title='whywhywhy' />")			

  //Transitions
    
                                            
  .replace(/:later:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/later.png\' title='later' />")																				
  .replace(/:muchlater:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/muchlater.png\' title='muchlater' />")																				
  .replace(/:manymonthslater:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/manymonths.png\' title='manymonthslater' />")																				
  .replace(/:thenextday:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://gapgames.net/images/ragefacescript/thenextday.png\' title='thenextday' />")

  //Videos
  /* .replace(/:nope.avi:/g, "<iframe width='150' height='150' src='http://www.youtube.com/v/gvdf5n-zI14' frameborder='0' allowfullscreen></iframe>") */
    
    //These are image macro memes
    
  .replace(/:futuramafry:/g, "<br><style> .md img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://gapgames.net/images/ragefacescript/futuramafry.jpg\' title='futuramafry' /><br>")
  .replace(/:hipsterkitty:/g, "<br><style> .md img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://gapgames.net/images/ragefacescript/hipsterkitty.jpg\' title='hipsterkitty' /><br>")
  .replace(/:interestingman:/g, "<br><style> .md img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://gapgames.net/images/ragefacescript/mostinterestingmanintheworld.jpg\' title='interestingman' /><br>")
  .replace(/:scumbagsteve:/g, "<br><style> .md img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://gapgames.net/images/ragefacescript/scumbagsteve.jpg\' title='scumbagsteve' /><br>")
  .replace(/:ggg:/g, "<br><style> .md img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://gapgames.net/images/ragefacescript/ggg.jpg\' title='ggg' /><br>")
  .replace(/:sap:/g, "<br><style> .md img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://gapgames.net/images/ragefacescript/sap.jpg\' title='sap' /><br>")
  .replace(/:insanitywolf:/g, "<br><style> .md img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://gapgames.net/images/ragefacescript/insanitywolf.jpg\' title='insanitywolf' /><br>")
  .replace(/:couragewolf:/g, "<br><style> .md img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://gapgames.net/images/ragefacescript/couragewolf.jpg\' title='couragewolf' /><br>")
  .replace(/:downvotingroman:/g, "<br><style> .md img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://gapgames.net/images/ragefacescript/downvotingroman.jpg\' title='downvotingroman' /><br>")
  .replace(/:youcantexplainthat:/g, "<br><style> .md img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://gapgames.net/images/ragefacescript/billoreilly.jpg\' title='youcantexplainthat' /><br>")
  .replace(/:redditorwife:/g, "<br><style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/redditorwife.jpg\' /></div><br>")
  .replace(/:knowledgeableneil:/g, "<br><style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/neiltyson.jpg\' /></div><br>")
  .replace(/:beargrylls:/g, "<br><style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/beargrylls.jpg\' /></div><br>")
  .replace(/:philosoraptor:/g, "<br><style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/philosoraptor.jpg\' /></div><br>")



  //Added August 10th
  .replace(/:20percentcooler:/g, "<a href='http://www.youtube.com/watch?v=2Mu38Gcyoi8' target='_new'>20percentcooler</a>")
  .replace(/:adios:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/adios.gif\' /></div>")
  .replace(/:allofthethings:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/allofthethings.png\' /></div>")
  .replace(/:au:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/au.png\' /></div>")
  .replace(/:awesome:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/awesome.jpeg\' /></div>")
  .replace(/:batlaugh:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/batlaugh.jpeg\' /></div>")
  .replace(/:bean:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/bean.gif\' /></div>")
  .replace(/:beaten:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/beaten.png\' /></div>")
  .replace(/:birth:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/birth.png\' /></div>")
  .replace(/:boobs:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/boobs.gif\' /></div>")
  .replace(/:boobswillis:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/boobswillis.gif\' /></div>")
  .replace(/:brilliant:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/brilliant.jpeg\' /></div>")
  .replace(/:btyeah:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/btyeah.jpg\' /></div>")
  .replace(/:businesscat:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/businesscat.jpg\' /></div>")
  .replace(/:buzzkill:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/buzzkill.png\' /></div>")
  .replace(/:caseofemotion:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/caseofemotion.gif\' /></div>")
  .replace(/:chrishansen:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/chrishansen.gif\' /></div>")
  .replace(/:chuckthumbsup:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/chuckthumbsup.gpf\' /></div>")
  .replace(/:conandance:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/conandance.gif\' /></div>")
  .replace(/:cryrainbows:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/cryrainbows.png\' /></div>")
  .replace(/:cutebatsy:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/cutebatsy.jpeg\' /></div>")
  .replace(/:darthidgaf:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/darthidgaf.gif\' /></div>")
  .replace(/:derp:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/derp.jpeg\' /></div>")
  .replace(/:diabeetus:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/diabeetus.png\' /></div>")
  .replace(/:distractingswag:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/distractingswag.jpeg\' /></div>")
  .replace(/:domo:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/domo.gif\' /></div>")
  .replace(/:droolrainbows:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/droolrainbows.jpeg\' /></div>")
  .replace(/:dwightiseveryone:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/dwightiseveryone.gif\' /></div>")
  .replace(/:englishdoyouspeakit:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/englishdoyouspeakit.gif\' /></div>")
  .replace(/:epicfacepalm:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/epicfacepalm.png\' /></div>")
  .replace(/:epicplank:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/epicplank.png\' /></div>")
  .replace(/:falconpunchv:/g, "<a href='http://www.youtube.com/watch?v=FFtw7qW7Vcw' target='_new'>falconpunchv</a>")
  .replace(/:faponyou:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/faponyou.gif\' /></div>")
  .replace(/:foreveralonedance:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/foreveralonedance.gif\' /></div>")
  .replace(/:foulbachelorfrog:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/foulbachelorfrog.jpeg\' /></div>")
  .replace(/:fuckinmagnets:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/fuckinmagnets.gif\' /></div>")
  .replace(/:fuckyou:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/fuckyou.png\' /></div>")
  .replace(/:fukkensaved:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/fukkensaved.jpg\' /></div>")
  .replace(/:fukkensaved2:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/fukkensaved2.jpg\' /></div>")
  .replace(/:fukkensaved3:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/fukkensaved3.gif\' /></div>")
  .replace(/:geass:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/geass.gif\' /></div>")
  .replace(/:gentlemen:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/gentlemen.png\' /></div>")
  .replace(/:hadsex:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/hadsex.gif\' /></div>")
  .replace(/:haha:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/hahaha.gif\' /></div>")
  .replace(/:hellsyeah:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/hellsyeah.png\' /></div>")
  .replace(/:hipsterlink:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/hipsterlink.jpg\' /></div>")
  .replace(/:hipsterlink2:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/hipsterlink2.png\' /></div>")
  .replace(/:hitlerplease:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/hitlerplease.jpg\' /></div>")
  .replace(/:iaintevenmad:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/iaintevenmad.jpg\' /></div>")
  .replace(/:iamawizard:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/iamawizard.jpg\' /></div>")
  .replace(/:idunnolol:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/idunnolol.jpg\' /></div>")
  .replace(/:ilovelife:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/ilovelife.png\' /></div>")
  .replace(/:imsosorry:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/imsosorry.gif\' /></div>")
  .replace(/:imtwelveandwhatisthis:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/imtwelveandwhatisthis.PNG\' /></div>")
  .replace(/:internetdied:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/internetdied.gif\' /></div>")
  .replace(/:itsfree:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/itsfree.jpeg\' /></div>")
  .replace(/:itsucks:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/itsucks.gif\' /></div>")
  .replace(/:jokerclap:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/jokerclap.gif\' /></div>")
  .replace(/:justsaiyan:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/justsaiyan.jpg\' /></div>")
  .replace(/:killitwithfire:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/killitwithfire.gif\' /></div>")
  .replace(/:liveonthisplanet:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/liveonthisplanet.jpg\' /></div>")
  .replace(/:llama:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/llama.gif\' /></div>")
  .replace(/:lolwut:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/lolwut.jpeg\' /></div>")
  .replace(/:loser:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/loser.gif\' /></div>")
  .replace(/:morecowbell:/g, "<a href='http://www.youtube.com/watch?v=q4royOLtvmQ' target='_new'>morecowbell</a>")
  .replace(/:nopeavi:/g, "<a href='http://www.youtube.com/watch?v=gvdf5n-zI14' target='_new'>nope.avi</a>")
  .replace(/:motherofspiderman:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/motherofspiderman.png\' /></div>")
  .replace(/:mudkipz:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/mudkipz.gif\' /></div>")
  .replace(/:mudkipzdance:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/mudkipzdance.gif\' /></div>")
  .replace(/:muslimman:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/muslimman.jpg\' /></div>")
  .replace(/:mybodyisready:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/mybodyisready.jpg\' /></div>")
  .replace(/:mynameisinigomontoya:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/\' /></div>")
  .replace(/:naruderp:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/naruderp.jpg\' /></div>")
  .replace(/:neilwithit:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/neilwithit.gif\' /></div>")
  .replace(/:neveralone:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/neveralone.png\' /></div>")
  .replace(/:ninja:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/ninja.jpeg\' /></div>")
  .replace(/:notgivingafuck:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/notgivingafuck.gif\' /></div>")
  .replace(/:nothisispatrick:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/nothisispatrick.jpg\' /></div>")
  .replace(/:obliviousrhino:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/obliviousrhino\' /></div>")
  .replace(/:ohmygod:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/ohmygod.gif\' /></div>")
  .replace(/:oldspiceguy:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/oldspiceguy.jpg\' /></div>")
  .replace(/:omgomgomg:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/omgomgomg.gif\' /></div>")
  .replace(/:ooo:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/ooo.png\' /></div>")
  .replace(/:openthedoor:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/openthedoor.gif\' /></div>")
  .replace(/:owned:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/owned.gif\' /></div>")
  .replace(/:paranoidparrot:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/paranoidparrot.jpg\' /></div>")
  .replace(/:pedobeardrool:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/pedobeardrool.png\' /></div>")
  .replace(/:petercry:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/petercry.gif\' /></div>")
  .replace(/:point:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/point.jpg\' /></div>")
  .replace(/:pokemad:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/pokemad.jpg\' /></div>")
  .replace(/:ppdisappoint:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/ppdisappoint.jpg\' /></div>")
  .replace(/:ppdropthosepants:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/ppdropthosepants.jpg\' /></div>")
  .replace(/:ppforeverapony:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/ppforeverapony.png\' /></div>")
  .replace(/:ppmoar:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/ppmoar.png\' /></div>")
  .replace(/:ppohyoumad:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/ppohyoumad.jpg\' /></div>")
  .replace(/:pprapetime:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/pprapetime.jpg\' /></div>")
  .replace(/:ppstop:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/ppstop.jpg\' /></div>")
  .replace(/:ppthatpostgavemecancer:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/ppthatpostgavemecancer.png\' /></div>")
  .replace(/:ppthefuckisthis:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/ppthefuckisthis.png\' /></div>")
  .replace(/:ppthisismegivingafuck:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/ppthisismegivingafuck.png\' /></div>")
  .replace(/:ppumad:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/ppumad.jpg\' /></div>")
  .replace(/:ppyeahimad:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/ppyeahimad.jpg\' /></div>")
  .replace(/:prepareyouranus:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/prepareyouranus.jpg\' /></div>")
  .replace(/:raptorjesus:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/raptorjesus.jpg\' /></div>")
  .replace(/:rd20percentcooler:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/rd20percentcooler.png\' /></div>")
  .replace(/:rdbullshit:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/rdbullshit.png\' /></div>")
  .replace(/:rddonotwant:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/rddonotwant.gif\' /></div>")
  .replace(/:rderp:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/rderp.png\' /></div>")
  .replace(/:rdiamrainbowdash:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/rdiamrainbowdash .jpg\' /></div>")
  .replace(/:rdisappoint:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/rdisappoint.jpg\' /></div>")
  .replace(/:rdmybodywasntready:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/rdmybodywasnotready.jpg\' /></div>")
  .replace(/:rdsad:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/rdsad.png\' /></div>")
  .replace(/:rdwat:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/rdwat.jpg\' /></div>")
  .replace(/:rdwinning:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/rdwinning.png\' /></div>")
  .replace(/:rdyarly:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/rdyarly.gif\' /></div>")
  .replace(/:rofl:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/rofl.gif\' /></div>")
  .replace(/:russiantrololo:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/russiantrololo.jpg\' /></div>")
  .replace(/:selffive:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/selffive.gif\' /></div>")
  .replace(/:seriously:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/seriously.jpeg\' /></div>")
  .replace(/:siconan:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/siconan.jpg\' /></div>")
  .replace(/:slowpoke:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/slowpoke.jpg\' /></div>")
  .replace(/:spikebullshit:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/spikebullshit.jpg\' /></div>")
  .replace(/:spikedatass:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/spikedatass.jpg\' /></div>")
  .replace(/:spikedeepshit:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/spikedeepshit.jpg\' /></div>")
  .replace(/:spikedelicious:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/spikedelicious.jpg\' /></div>")
  .replace(/:spikedudewhat:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/spikedudewhat.png\' /></div>")
  .replace(/:spikeforlittlegirls:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/spikeforlittlegirls.gif\' /></div>")
  .replace(/:spikeirunthisshit:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/spikeirunthisshit.jpg\' /></div>")
  .replace(/:spikelol:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/spikelol.jpg\' /></div>")
  .replace(/:spikeno:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/spikeno.jpg\' /></div>")
  .replace(/:spikerapeface:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/spikerapeface.jpg\' /></div>")
  .replace(/:spikeshutupandtakemymoney:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/spikeshutupandtakemymoney.jpg\' /></div>")
  .replace(/:spikewat:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/spikewat.jpg\' /></div>")
  .replace(/:spikewtfamireading:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/spikewtfamireading.jpg\' /></div>")
  .replace(/:spongesquee:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/spongesquee.jpeg\' /></div>")
  .replace(/:srslyguise:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/srslyguise.gif\' /></div>")
  .replace(/:tacnayn:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/tacnayn.gif\' /></div>")
  .replace(/:techimpairedduck:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/techimpairedduck.png\' /></div>")
  .replace(/:thatpostgavemecancer:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/thatpostgavemecancer.jpg\' /></div>")
  .replace(/:thatsracist:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/thatsracist.gif\' /></div>")
  .replace(/:thatswaisis:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/thatswaisis.gif\' /></div>")
  .replace(/:themoreyouknow:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/themoreyouknow\' /></div>")
  .replace(/:tooold:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/tooold.jpg\' /></div>")
  .replace(/:touchyourselfatnight:/g, "<a href='http://www.youtube.com/watch?v=W23LKD9Z1hw' target='_new'>touchyourselfatnight</a>")
  .replace(/:trolldance:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/trolldance.gif\' /></div>")
  .replace(/:trollline:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/trollline.jpeg\' /></div>")
  .replace(/:tsbs:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/tsbs.jpg\' /></div>")
  .replace(/:tsdatponyass:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/tsdatponyass.PNG\' /></div>")
  .replace(/:tsdoitfaggot:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/tsdoitfaggot.jpg\' /></div>")
  .replace(/:tsgentlecolts:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/tsgentlecolts.jpg\' /></div>")
  .replace(/:tsnotasinglefuck:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/tsnotasinglefuck.jpg\' /></div>")
  .replace(/:tsnotsureifwant:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/tsnotsureifwant.jpg\' /></div>")
  .replace(/:tsop:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/tsop.jpg\' /></div>")
  .replace(/:tsprepare:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/tsprepare.jpg\' /></div>")
  .replace(/:tssuppository:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/tssuppository.jpg\' /></div>")
  .replace(/:tsumad:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/tsumad.jpg\' /></div>")
  .replace(/:tswant:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/tswant.jpg\' /></div>")
  .replace(/:veryhappy:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/veryhappy.gif\' /></div>")
  .replace(/:walkthedinosaur:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/walkthedinosaur.gif\' /></div>")
  .replace(/:whyamialive:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/whyamialive.png\' /></div>")
  .replace(/:whysoserious:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/whysoserious.jpg\' /></div>")
  .replace(/:yaoming:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/fuckthatshit.png\' /></div>")
  .replace(/:yaomingew:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/wtfisthat.png\' /></div>")
  .replace(/:yes:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/yes.jpg\' /></div>")
  .replace(/:youmustbenewhere:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/youmustbenewhere.jpg\' /></div>")
  .replace(/:yu:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/yuno.png\' /></div>")
  .replace(/:yumadtho:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/yumadthough.jpg\' /></div>")
  .replace(/:yumadthough:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://gapgames.net/images/ragefacescript/yumadthough.jpg\' /></div>")
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
    replaceByClass('authorSpeechContainer', obj); //Neatchat
  }
}

function nodeInserted(event) {
  commonInsert(event.target);
}



commonInsert(document);

document.addEventListener('DOMNodeInserted', function(event) {
  commonInsert(event.target);
}, false);