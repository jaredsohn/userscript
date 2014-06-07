// ==UserScript==
// @name           Additional d2jsp Emoticons - Firefox Version
// @description    Use old and more emoticons on d2jsp!
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
			// 
			node.innerHTML = node.innerHTML
			.replace(/&quot;\)/g, '&quot; )');
			node.innerHTML = node.innerHTML
			// dinO&P smilies

			.replace(/:hello:/g, "<img src=\'http://dinop.cwsurf.de/images/smilies/hand.gif\'  />")
			.replace(/:evillol:/g, "<img src=\'http://dinop.cwsurf.de/images/smilies/d-lol.gif\'  />")																																																								
			.replace(/:chicken:/g, "<img src=\'http://dinop.cwsurf.de/images/smilies/chicken.gif\'  />")				
			.replace(/:cheers:/g, "<img src=\'http://dinop.cwsurf.de/images/smilies/bier.gif\'  />")
			.replace(/:RUN:/g, "<img src=\'http://dinop.cwsurf.de/images/smilies/Bolt.gif\'  />")
			.replace(/:headscratch:/g, "<img src=\'http://dinop.cwsurf.de/images/smilies/headscratch.gif\'  />")
			.replace(/:flamethrower:/g, "<img src=\'http://dinop.cwsurf.de/images/smilies/flamethrower.gif\'  />")
			.replace(/:uglystupid:/g, "<img src=\'http://dinop.cwsurf.de/images/smilies/uglystupid1.gif\'  />")
			.replace(/:argue:/g, "<img src=\'http://dinop.cwsurf.de/images/smilies/icon_argue.gif\'  />")
			.replace(/:uglyhammer:/g, "<img src=\'http://dinop.cwsurf.de/images/smilies/uglyhammer.gif\'  />")																										
			.replace(/:stupid:/g, "<img src=\'http://dinop.cwsurf.de/images/smilies/stupid.gif\'  />")
			.replace(/:stonetoss:/g, "<img src=\'http://dinop.cwsurf.de/images/smilies/wurf.gif\'  />")
			.replace(/:kiss:/g, "<img src=\'http://dinop.cwsurf.de/images/smilies/kuss.gif\'  />")
			.replace(/:hello:/g, "<img src=\'http://dinop.cwsurf.de/images/smilies/hand.gif\'  />")
			.replace(/:sniper:/g, "<img src=\'http://dinop.cwsurf.de/images/smilies/sniper.gif\'  />")
			.replace(/:rifle:/g, "<img src=\'http://dinop.cwsurf.de/images/smilies/rifle.gif\'  />")		
			.replace(/:troll:/g, "<img src=\'http://dinop.cwsurf.de/images/smilies/trollface.gif\'  />")
			.replace(/:facepalm2:/g, "<img src=\'http://dinop.cwsurf.de/images/smilies/facepalm2.gif\'  />")
			.replace(/:facepalm:/g, "<img src=\'http://dinop.cwsurf.de/images/smilies/facepalm.gif\'  />")
			.replace(/:pedobear:/g, "<img src=\'http://dinop.cwsurf.de/images/smilies/pedobear.png\'  />")
			.replace(/:finger:/g, "<img src=\'http://dinop.cwsurf.de/images/smilies/finger.png\'  />")					
			.replace(/:steffwomanron:/g, "<img src=\'http://dinop.cwsurf.de/images/smilies/steffwomanron.gif\'  />")
			.replace(/:puke:/g, "<img src=\'http://dinop.cwsurf.de/images/smilies/puke.gif\'  />")
			.replace(/:popcorn:/g, "<img src=\'http://dinop.cwsurf.de/images/smilies/popcorn.gif\'  />")
			.replace(/:fuuu:/g, "<img src=\'http://dinop.cwsurf.de/images/smilies/fuuu.png\'  />")
			.replace(/:hüa:/g, "<img src=\'http://h9.abload.de/img/hueahuea20cla6.gif\'  />")
			.replace(/:hüä:/g, "<img src=\'http://h9.abload.de/img/hueahueatmxrs.gif\'  />")
			.replace(/:trollface:/g, "<img src=\'http://www.abload.de/img/fucktrollfacejfatu.gif\'  />")
			.replace(/:foreveralone:/g, "<img src=\'http://h9.abload.de/img/foreveralone3yzze3.gif\'  />")


		
			.replace(/original=\"/g, "src=\"");
				}
				
				function commonInsert(obj) {
					if(typeof(obj)=="object") {
						replaceByClass('lc', obj); //jsp
						replaceByClass('desc bc1', obj); //jsp
						replaceByClass('ftb', obj); //jsp
						replaceByClass('bts', obj); //jsp
						replaceByClass('e1', obj); //jsp

						replaceByClass('post_body', obj); //dino&p

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