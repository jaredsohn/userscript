// ==UserScript==
// @name           Emoticons for CAB.vn - Alpha ver - by Chjpjdeaspro
// @description    Use meme emoticons on CAB.vn!. hope you like this
// @version        0.3
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
			.replace(/:challengeaccepted:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/challengeaccepted.png\' title='challengeaccepted' />")
			.replace(/:staredad:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/staredad.png\' title='staredad' />")
			.replace(/:iamdisappoint:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/disappoint.png\' title='iamdisappoint' />")
			.replace(/:troll:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/troll.png\' title='troll' />")
			.replace(/:trollface:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/trollface.png\' title='Trollface' />")
			.replace(/:stare:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/stare.png\' title='stare' />")
			.replace(/:ffff:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/ffff.png\' title='ffff' />")
			.replace(/:fffuuu:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/f7u12.png\' title='ffff' />")
			.replace(/:no:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/no.png\' title='no' />")
			.replace(/:yuno:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/yuno.png\' title='yuno' />")
			.replace(/:areyoufuckingkiddingme:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/areyoufuckingkiddingme.png\' title='areyoufuckingkiddingme' />")
			.replace(/:trolldad:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/trolldad.png\' title='trolldad' />")
			.replace(/:trollol:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://thinqtek.com/temp/emotes/trololo.png\' title='trololo' />")
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
			.replace(/:yaoming:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img class='rageface' src=\'http://thinqtek.com/temp/emotes/fuckthatshit.png\' /></div>")
			.replace(/src\=\"http:\/\/x3.fjcdn.com\/site\/funnyjunk\/images\/transparent_pixel.gif\"/g, "")
			.replace(/original=\"/g, "src=\"");
				}
				
				function commonInsert(obj) {
					if(typeof(obj)=="object") {
					replaceByClass('entry', obj); //CAB
					replaceByClass('commentContent', obj); //Facebook
					replaceByClass('mobile_status', obj); //Facebook
					replaceByClass('uiStreamMessage', obj); //Facebook
					replaceByClass('GBThreadMessageRow_Body_Content', obj); //Facebook
					replaceByClass('UIStory_Message', obj); //Facebook
					replaceByClass('fbQuestionsPollClickTarget', obj); //Facebook
					replaceByClass('pas fbQuestionsPollResultsBar', obj); //Facebook
					replaceByClass('inputboxusr', obj); //Facebook
					replaceByClass('mvs answerText', obj); //Facebook
					replaceByClass('fbPhotoCaptionText', obj); //Facebook
					}
				}

function nodeInserted(event) {
    commonInsert(event.target);
}



commonInsert(document);

document.addEventListener('DOMNodeInserted', function(event) {

        commonInsert(event.target);

    }, false);