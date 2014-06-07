// ==UserScript==
// @name           GirlVOZ Emoticon + emo voz
// @namespace      http://www.facebook.com/nguyenhoangvu283
// @description    Dung VOZ Emo tren cac mang xa hoi plus
// @include        *
// @version        2.0
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
			
.replace(/:sexygirl:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><div id='lol' class='lol'><img  src=\'http://www.geocities.ws/tainppd00015/emo/sexygirl.png\' title='Sexy' /></div>")

.replace(/\:byebyegirl\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://www.geocities.ws/tainppd00015/emo/byebyegirl.png\' title=\'byebye\' />")

.replace(/\:look_downgirl\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://www.geocities.ws/tainppd00015/emo/look_downgirl.png\' title=\'look_down\' />")

.replace(/\:adoregirl\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://www.geocities.ws/tainppd00015/emo/adoregirl.png\' title=\'adore\' />")

.replace(/\:chaymaugirl\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://www.geocities.ws/tainppd00015/emo/chaymaugirl.png\' title=\'chaymau\' />")

.replace(/\:embarrasedgirl\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://www.geocities.ws/tainppd00015/emo/embarassgirl.png\' title=\'Embarrased\' />")

.replace(/\:beautygirl\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://www.geocities.ws/tainppd00015/emo/beautygirl.png\' title=\'beauty\' />")

.replace(/\bigsmilegirl\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://www.geocities.ws/tainppd00015/emo/D1.png\' title=\'bigsmilegirl\' />")


.replace(/\:gachgirl\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://www.geocities.ws/tainppd00015/emo/gachgirl.png\' title=\'gach\' />")

.replace(/\:pudencygirl\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://www.geocities.ws/tainppd00015/emo/pudencygirl.png\' title=\'pudency\' />")

.replace(/\:sosadgirl\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://www.geocities.ws/tainppd00015/emo/sosadgirl.png\' title=\'sosad\' />")

.replace(/\:surrendergirl\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://www.geocities.ws/tainppd00015/emo/surrendergirl.png\' title=\'surrender\' />")

.replace(/\:bvs\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://www.geocities.ws/tainppd00015/emo/bvs.png\' title=\'bvs\' />")

.replace(/\:sweatgirl\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://www.geocities.ws/tainppd00015/emo/sweatgirl.png\' title=\'sweat\' />")

.replace(/\:nosebleedgirl\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://www.geocities.ws/tainppd00015/emo/chaymaugirl.png\' title=\'nosebleed\' />")

.replace(/\:sogoodgirl\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://www.geocities.ws/tainppd00015/emo/sogoodgirl.png\' title=\'sogood\' />")

.replace(/\:shamegirl\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://www.geocities.ws/tainppd00015/emo/shamegirl.png\' title=\'shame\' />")

.replace(/\:cannygirl\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://www.geocities.ws/tainppd00015/emo/cannygirl.png\' title=\'canny\' />")

.replace(/\:shotgirl\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://www.geocities.ws/tainppd00015/emo/shotgirl.png\' title=\'shot\' />")

.replace(/\:smilegirl\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://www.geocities.ws/tainppd00015/emo/smilegirl.png\' title=\'Smile\' />")

.replace(/\:plastergirl\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://www.geocities.ws/tainppd00015/emo/plastergirl.png\' title=\'plaster\' />")

.replace(/\:kissgirl\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://www.geocities.ws/tainppd00015/emo/kissgirl.png\' title=\'Kiss\' />")

.replace(/\:opsgirl\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://www.geocities.ws/tainppd00015/emo/opsgirl.png\' title=\'opsgirl\' />")

.replace(/\:tiregirl\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://www.geocities.ws/tainppd00015/emo/tiregirl.png\' title=\'tire\' />")

.replace(/\:ohgirl\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://www.geocities.ws/tainppd00015/emo/ohgirl.png\' title=\'oh\' />")

.replace(/\:crygirl\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://www.geocities.ws/tainppd00015/emo/crygirl.png\' title=\'Cry\' />")

.replace(/\:dribblegirl\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://www.geocities.ws/tainppd00015/emo/dribblegirl.png\' title=\'dribble\' />")

.replace(/\:waaahtgirl\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://www.geocities.ws/tainppd00015/emo/waaahtgirl.png\' title=\'waaaht\' />")

.replace(/\:amazedgirl\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://www.geocities.ws/tainppd00015/emo/amazedgirl.png\' title=\'amazed\' />")

.replace(/\:sadgirl\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://www.geocities.ws/tainppd00015/emo/sadgirl.png\' title=\'sad\' />")

.replace(/\:whatgirl\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://www.geocities.ws/tainppd00015/emo/whatgirl.png\' title=\'what\' />")

.replace(/\:doubtgirl\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://www.geocities.ws/tainppd00015/emo/doubtgirl.png\' title=\'doubt\' />")

.replace(/\:confidentgirl\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://www.geocities.ws/tainppd00015/emo/confidentgirl.png\' title=\'confident\' />")

.replace(/\:ahgirl\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://www.geocities.ws/tainppd00015/emo/ahgirl.png\' title=\'ah\' />")

.replace(/\:roflgirl\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://www.geocities.ws/tainppd00015/emo/roflgirl.gif\' title=\'roflgirl\' />")

.replace(/\:lolgirl\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://www.geocities.ws/tainppd00015/emo/lolgirl.gif\' title=\'lolgirl\' />")

.replace(/\:hehegirl\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://www.geocities.ws/tainppd00015/emo/hehegirl.gif\' title=\'hehegirl\' />")

.replace(/\:byegirl\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://www.geocities.ws/tainppd00015/emo/byegirl.gif\' title=\'byegirl\' />")

.replace(/\:shootgirl\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://www.geocities.ws/tainppd00015/emo/shootgirl.gif\' title=\'shootgirl\' />")

.replace(/\:bafflegirl\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://www.geocities.ws/tainppd00015/emo/bafflegirl.png\' title=\'bafflegirl\' />")

.replace(/\:cholergirl\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://www.geocities.ws/tainppd00015/emo/cholergirl.png\' title=\'cholergirl\' />")

.replace(/\:hahagirl\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://www.geocities.ws/tainppd00015/emo/hahagirl.png\' title=\'hahagirl\' />")

.replace(/\:matrixgirl\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://www.geocities.ws/tainppd00015/emo/matrixgirl.png\' title=\'matrixgirl\' />")

.replace(/\:angrygirl\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://www.geocities.ws/tainppd00015/emo/angrygirl.png\' title=\'angrygirl\' />")

.replace(/\:misdoubtgirl\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://www.geocities.ws/tainppd00015/emo/misdoubtgirl.png\' title=\'misdoubtgirl\' />")

.replace(/\:bossgirl\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://www.geocities.ws/tainppd00015/emo/bossgirl.png\' title=\'bossgirl\' />")

.replace(/\:dreaminggirl\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://www.geocities.ws/tainppd00015/emo/dreaminggirl.png\' title=\'dreaminggirl\' />")

.replace(/\:confusegirl\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://www.geocities.ws/tainppd00015/emo/confusegirl.png\' title=\'Confuse\' />")

.replace(/\:suregirl\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://www.geocities.ws/tainppd00015/emo/suregirl.png\' title=\'sure\' />")

.replace(/:sexy:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><div id='lol' class='lol'><img  src=\'http://vozforums.com/images/smilies/Off/sexy_girl.gif\' title='Sexy' /></div>")

.replace(/\:byebye\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/byebye.gif\' title=\'byebye\' />")

.replace(/\:look_down\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/look_down.gif\' title=\'look_down\' />")

.replace(/\:stick\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/burn_joss_stick.gif\' title=\'stick\' />")

.replace(/\:adore\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/adore.gif\' title=\'adore\' />")

.replace(/\:chaymau\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/nosebleed.gif\' title=\'chaymau\' />")

.replace(/\:\"\>/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/embarrassed.gif\' title=\'Embarrased\' />")

.replace(/\:beauty\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/beauty.gif\' title=\'beauty\' />")

.replace(/\:gach\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/brick.png\' title=\'gach\' />")

.replace(/\:pudency\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/pudency.gif\' title=\'pudency\' />")

.replace(/\:sosad\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/too_sad.gif\' title=\'sosad\' />")

.replace(/\:surrender\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/surrender.gif\' title=\'surrender\' />")

.replace(/\:sweat\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/sweat.gif\' title=\'sweat\' />")

.replace(/\:nosebleed\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/nosebleed.gif\' title=\'nosebleed\' />")

.replace(/\:go\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/go.gif\' title=\'go\' />")

.replace(/\:sogood\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/feel_good.gif\' title=\'sogood\' />")

.replace(/\:shame\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/shame.gif\' title=\'shame\' />")

.replace(/\:canny\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/canny.gif\' title=\'canny\' />")

.replace(/\:shot\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/beat_shot.gif\' title=\'shot\' />")

.replace(/\:hungry\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/hungry.gif\' title=\'hungry\' />")

.replace(/\:\)/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/smile.gif\' title=\'Smile\' />")

.replace(/\:plaster\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/beat_plaster.gif\' title=\'plaster\' />")

.replace(/\:rap\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/rap.gif\' title=\'rap\' />")

.replace(/\:hang\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/hang.gif\' title=\'hang\' />")

.replace(/\:\*/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/sweet_kiss.gif\' title=\'Kiss\' />")

.replace(/\:ops\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/ops.gif\' title=\'ops\' />")

.replace(/\:tire\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/tire.gif\' title=\'tire\' />")

.replace(/\:bad_smell\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/bad_smelly.gif\' title=\'bad_smell\' />")

.replace(/\:brick\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/beat_brick.gif\' title=\'brick\' />")

.replace(/\:kool\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/cool.gif\' title=\'kool\' />")

.replace(/\:hell_boy\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/hell_boy.gif\' title=\'hell_boy\' />")

.replace(/\:oh\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/oh.gif\' title=\'oh\' />")

.replace(/\:\(\(/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/cry.gif\' title=\'Cry\' />")

.replace(/\:dribble\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/dribble.gif\' title=\'dribble\' />")

.replace(/\:waaaht\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/waaaht.gif\' title=\'waaaht\' />")

.replace(/\:aboom\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/after_boom.gif\' title=\'aboom\' />")

.replace(/\^\:\)\^/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/lay.gif\' title=\'Lay\' />")

.replace(/\:fix\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/fix.gif\' title=\'fix\' />")

.replace(/\:amazed\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/amazed.gif\' title=\'amazed\' />")

.replace(/\:sad\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/sad.gif\' title=\'sad\' />")

.replace(/\:hug\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/hug.gif\' title=\'hug\' />")

.replace(/\:cheers\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/cheers.gif\' title=\'cheers\' />")

.replace(/\-\_\-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/sleep.gif\' title=\'Sleep\' />")

.replace(/\:shitty\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/shit.gif\' title=\'shitty\' />")

.replace(/\:what\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/what.gif\' title=\'what\' />")

.replace(/\:doubt\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/doubt.gif\' title=\'doubt\' />")

.replace(/\:capture\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/capture.gif\' title=\'capture\' />")

.replace(/\:confident\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/confident.gif\' title=\'confident\' />")

.replace(/\:theft\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/theft.gif\' title=\'theft\' />")

.replace(/\:spam\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/spam.gif\' title=\'spam\' />")

.replace(/\:ah\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/ah.gif\' title=\'ah\' />")

.replace(/\:rofl\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/rofl.gif\' title=\'rofl\' />")

.replace(/\:baffle\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/baffle.gif\' title=\'baffle\' />")

.replace(/\:choler\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/choler.gif\' title=\'choler\' />")

.replace(/\:haha\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/haha.gif\' title=\'haha\' />")

.replace(/\:hehe\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/hehe.gif\' title=\'hehe\' />")

.replace(/\:smoke\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/smoke.gif\' title=\'smoke\' />")

.replace(/\:matrix\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/matrix.gif\' title=\'matrix\' />")

.replace(/\:sos\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/sos.gif\' title=\'sos\' />")

.replace(/\:spiderman\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/spiderman.gif\' title=\'spiderman\' />")

.replace(/\:angry\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/angry.gif\' title=\'angry\' />")

.replace(/\:misdoubt\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/misdoubt.gif\' title=\'misdoubt\' />")

.replace(/\:mage\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/mage.gif\' title=\'mage\' />")

.replace(/\:boss\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/boss.gif\' title=\'boss\' />")

.replace(/\:dreaming\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/still_dreaming.gif\' title=\'dreaming\' />")

.replace(/\:\-s/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/confuse.gif\' title=\'Confuse\' />")

.replace(/\:bike\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/bike.gif\' title=\'bike\' />")

.replace(/\:lmao\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/lmao.gif\' title=\'lmao\' />")

.replace(/\:bye\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/bye.gif\' title=\'bye\' />")

.replace(/\:phone\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/phone.gif\' title=\'phone\' />")

.replace(/\:sure\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/sure.gif\' title=\'sure\' />")

.replace(/\:ot\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/ot.gif\' title=\'ot\' />")

.replace(/\:flame\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/flame.gif\' title=\'flame\' />")

.replace(/\:stupid\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/emos/stupid.gif\' title=\'stupid\' />")

.replace(/\:doublegun\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/emos/doublegun.gif\' title=\'doublegun\' />")

.replace(/\:ban\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/bann.gif\' title=\'ban\' />")

.replace(/\:please\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/please.gif\' title=\'please\' />")

.replace(/\:boom\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/emos/boom.gif\' title=\'boom\' />")

.replace(/\:lol\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/emos/lol.gif\' title=\'lol\' />")

.replace(/\:welcome\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/welcome.gif\' title=\'welcome\' />")

.replace(/\:puke\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/emos/puke.gif\' title=\'puke\' />")

.replace(/\:shit\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/emos/shit.gif\' title=\'shit\' />")

.replace(/\:lovemachine\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/emos/lovemachine.gif\' title=\'lovemachine\' />")

.replace(/\:runrun\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/runrun.gif\' title=\'runrun\' />")

.replace(/\:loveyou\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/emos/loveyou.gif\' title=\'loveyou\' />")

.replace(/\:no\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/emos/no.gif\' title=\'no\' />")

.replace(/\:yes\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/emos/yes.gif\' title=\'yes\' />")

.replace(/\:Birthday\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/emos/Birthday.gif\' title=\'Birthday\' />")

.replace(/\:shoot1\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/emos/shoot1.gif\' title=\'shoot1\' />")

.replace(/\:band\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/emos/band.gif\' title=\'band\' />")

.replace(/\:winner\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/emos/winner.gif\' title=\'winner\' />")

.replace(/\:\+1\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://www.google.com/+1/button/images/icon.png\' title=\'+1\' />")

			
.replace(/original=\"/g, "src=\"");
				}
				
				function commonInsert(obj) {
					if(typeof(obj)=="object") {
						replaceByClass('tweet-text', obj); //Twitter
                                                replaceByClass('alt1', obj); //Voz
                                                replaceByClass('alt2', obj); //voz
                                                replaceByClass('post_message', obj);
						replaceByClass('UFICommentBody', obj); //Facebook
						replaceByClass('mobile_status', obj); //Facebook
						replaceByClass('uiStreamMessage', obj); //Facebook
						replaceByClass('GBThreadMessageRow_Body_Content', obj); //Facebook
						replaceByClass('UIStory_Message', obj); //Facebook
						replaceByClass('fbChatMessage fsm direction_ltr', obj); //Facebookup
						replaceByClass('UFICommentContent', obj);//facebookup
                                                replaceByClass('userContent', obj);//facebookup
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


