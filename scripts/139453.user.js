// ==UserScript==
// @name           VOZ Emoticon
// @namespace      http://www.facebook.com/Legends.Of.Vozers/
// @description    Dung VOZ Emo tren cac mang xa hoi.
// @include        http*://*facebook.com/*
// @include        http*://*twitter.com/*
// @include        http*://*plus.google.com/*
// @version        1.0.4
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
.replace(/\^\#\(\^/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/114.gif\' />").replace(/\:\-(B|b)(D|d)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/113.gif\' />").replace(/\:\-(Q|q)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/112.gif\' />").replace(/\\(M|m)\//g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/111.gif\' />").replace(/(X|x)\_(X|x)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/109.gif\' />").replace(/:-\?\?/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/106.gif\' />").replace(/8-\&gt;/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/105.gif\' />").replace(/:-(H|h)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/103.gif\' />").replace(/\~(X|x)\(/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/102.gif\' />").replace(/;\)\)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/71.gif\' />").replace(/\\:(D|d)\//g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/69.gif\' />").replace(/\:\-\'/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/65.gif\' />").replace(/\[-(O|o)\&lt;/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/63.gif\' />").replace(/:-(L|l)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/62.gif\' />").replace(/\&gt;-\)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/61.gif\' />").replace(/\@\};-/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/53.gif\' />").replace(/\&gt;:(P|p)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/47.gif\' />").replace(/\:\-\&lt\;/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/46.gif\' />").replace(/:-(W|w)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/45.gif\' />").replace(/:\^(O|o)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/44.gif\' />").replace(/:-(S|s)(S|s)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/42.gif\' />").replace(/=(D|d)\&gt;/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/41.gif\' />").replace(/\#-(O|o)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/40.gif\' />").replace(/:-\?/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/39.gif\' />").replace(/\(:\|/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/37.gif\' />").replace(/\&lt;:-(P|p)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/36.gif\' />").replace(/\[-\(/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/33.gif\' />").replace(/:-\$/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/32.gif\' />").replace(/:-(\&amp;|\&)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/31.gif\' />").replace(/(L|l)-\)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/30.gif\' />").replace(/(I|i)\-\)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/28.gif\' />").replace(/\=\;/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/27.gif\' />").replace(/\:\-?(B|b)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/26.gif\' />").replace(/(O|o|0)\:\-?\)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/25.gif\' />").replace(/\=\)\)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/24.gif\' />").replace(/\/\:\-?\)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/23.gif\' />").replace(/\:\-?\|/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/22.gif\' />").replace(/\:\-?\)\)+/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/21.gif\' />").replace(/\:(\'|\()\(+/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/20.gif\' />").replace(/\&gt\;\:\)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/19.gif\' />").replace(/\#\:\-(S|s)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/18.gif\' />").replace(/\:\-(S|s)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/17.gif\' />").replace(/(B|b)\-\)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/16.gif\' />").replace(/:\-?\&gt\;/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/15.gif\' />").replace(/(X|x)\-?\(/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/14.gif\' />").replace(/\:\-?(O|o)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/13.gif\' />").replace(/\=\(\(/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/12.gif\' />").replace(/\:\-?\*/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/11.gif\' />").replace(/\:\-?(P|p)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/10.gif\' />").replace(/\:"\&gt\;/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/9.gif\' />").replace(/\:(X|x)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/8.gif\' />").replace(/\:\-\//g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/7.gif\' />").replace(/\&gt\;\:(D|d)\&lt\;/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/6.gif\' />").replace(/\;\;\)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/5.gif\' />").replace(/\:\-?(D|d)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/4.gif\' />").replace(/\;\-?\)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/3.gif\' />").replace(/\:\-?\(/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/2.gif\' />").replace(/\:\-?\)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/1.gif\' />")
			
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

.replace(/\^\=\)\)\^/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/lay.gif\' title=\'Lay\' />")

.replace(/\^\=\)\)\^/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/lay.gif\' title=\'Lay\' />")

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

.replace(/\:D/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/big_smile.gif\' title=\'Big Smile\' />")

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

.replace(/\:\+1\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://www.google.com/+1/button/images/icon.png\' title=\'\+1\' />")
			
.replace(/original=\"/g, "src=\"");
				}
function commonInsert(obj) {
    if(typeof(obj)=="object") {
        replaceByClass('tweet-text', obj); //Twitter
        replaceByClass('a-b-f-i-p-R', obj); //Google Plus
        replaceByClass('a-f-i-W-p', obj); //Google Plus
        
	replaceByClass('commentContent', obj);
        replaceByClass('mobile_status', obj);
        replaceByClass('uiStreamMessage', obj);
        replaceByClass('GBThreadMessageRow_Body_Content', obj);
        replaceByClass('UIStory_Message', obj);
    }
}

function nodeInserted(event) {
    commonInsert(event.target);
}

commonInsert(document);

document.addEventListener('DOMNodeInserted', function(event) {

        commonInsert(event.target);

    }, false);

