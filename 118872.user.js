// ==UserScript==
// @name           PonyMoticons 2.5 (For Dancelot)
// @namespace      http://djpon3.tk
// @description    Beta
// @include        *
// @version        0.4b
// ==/UserScript==
// First Of All 
//I've not made this script
//I've just modified to bring more pony-emoticons to the brony community
//All credits goes to ThinqTek
//Images from MyLittleFaceWhen.com Ponibooru and my own meme :D (Fluttershy yay button from DA)

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
				
			
		
			//My Little Pony: Friendship is Magic
			.replace(/:pukrbd:/g, "<style> tweet-text img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://s3.amazonaws.com/kym-assets/photos/images/newsfeed/000/203/840/rainbowd.png?1321909204' style='width:213px; height: 160px;' /><br>")
.replace(/:fyay:/g, "<iframe src='http://fc07.deviantart.net/fs71/f/2011/156/1/2/instant_fluttershy__flash__by_ganton3-d3i54cq.swf' frameborder='0' scrolling='no' width='155' height='120'></iframe>")
.replace(/:saddashie:/g, "<style> tweet-text img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://mylittlefacewhen.com/media/f/rsz/1272_huge.jpg' style='width:213px; height: 160px;' /><br>")
.replace(/:bbtyping:/g, "<style> tweet-text img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://mylittlefacewhen.com/media/f/img/75627-animatedprince_blueblood.gif' style='width:195px; height: 160px;' /><br>")
.replace(/:wutnow:/g, "<style> tweet-text img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://mylittlefacewhen.com/media/f/img/Trixie_What_Now.gif' style='width:213px; height: 160px;' /><br>")
.replace(/:lezdodis:/g, "<style> tweet-text img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://mylittlefacewhen.com/media/f/img/HOBZC.gif' style='width:175px; height: 160px;' /><br>")
.replace(/:ppyeah:/g, "<style> tweet-text img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://mylittlefacewhen.com/media/f/img/tumblr_lncqr3jPcZ1qclt3z.gif' style='width:213px; height: 145px;' /><br>")
.replace(/:ppppp:/g, "<style> tweet-text img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://mylittlefacewhen.com/media/f/img/tumblr_lrri01jbvO1qafrh6.gif' style='width:199px; height: 160px;' /><br>")
.replace(/:ppxzibit:/g, "<style> tweet-text img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://mylittlefacewhen.com/media/f/img/yodawg_rainbowdash.jpg' style='width:199px; height: 160px;' /><br>")
.replace(/:rbdno:/g, "<style> tweet-text img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://mylittlefacewhen.com/media/f/img/dashhypnosis.gif' style='width:199px; height: 160px;' /><br>")
.replace(/:trrixie:/g, "<style> tweet-text img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://mylittlefacewhen.com/media/f/img/52583_-_The_Great_And_Powerful_Trixie_Trixie_applestare_artist-DarkOmegaMK2.png' style='width:175px; height: 160px;' /><br>")
.replace(/:rainbowbrushie:/g, "<style> tweet-text img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://mylittlefacewhen.com/media/f/img/17539_-_animated_brushie_brushie_brushie_brushie_derp_rainbow_dash_toothbrush.gif' style='width:199px; height: 160px;' /><br>")
.replace(/:ppshrug:/g, "<style> tweet-text img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://mylittlefacewhen.com/media/f/img/1316376556739965.png' style='width:166px; height: 160px;' /><br>")
.replace(/:octaviacrying:/g, "<style> tweet-text img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://mylittlefacewhen.com/media/f/img/tumblr_lp04reV8Jn1qjmjvko1_1280.gif' style='width:199px; height: 160px;' /><br>")
.replace(/:ruawizard:/g, "<style> tweet-text img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://mylittlefacewhen.com/media/f/img/BQGk9.jpg' style='width:155px; height: 160px;' /><br>")
.replace(/:ppclapping:/g, "<style> tweet-text img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://mylittlefacewhen.com/media/f/img/Clap_clap_motherfucker.gif' style='width:199px; height: 160px;' /><br>")
.replace(/:rbdnotmad:/g, "<style> tweet-text img { display:inline;  } .rageface { visibility:visible; } </style><br><img src=\'http://mylittlefacewhen.com/media/f/img/not_mad.png' style='width:199px; height: 125px;' /><br>")
.replace(/:fsmad:/g, "<style> tweet-text img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://mylittlefacewhen.com/media/f/img/130521847574.jpg' style='width:199px; height: 160px;' /><br>")
.replace(/:fsumad:/g, "<style> tweet-text img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://mylittlefacewhen.com/media/f/img/130522894783.jpg' style='width:199px; height: 160px;' /><br>")
.replace(/:somuchyay:/g, "<style> tweet-text img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://mylittlefacewhen.com/media/f/img/130512621668.gif' style='width:199px; height: 160px;' /><br>")
.replace(/:rbdcomingout:/g, "<style> tweet-text img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://mylittlefacewhen.com/media/f/img/130659475581.gif' style='width:199px; height: 160px;' /><br>")
.replace(/:ifudontlikeponies:/g, "<style> tweet-text img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://mylittlefacewhen.com/media/f/img/if_you_dont_like_trixie.png' style='width:199px; height: 160px;' /><br>")
.replace(/:rbdbored:/g, "<style> tweet-text img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://mylittlefacewhen.com/media/f/img/63oYtEO04G0.gif' style='width:165px; height: 160px;' /><br>")
.replace(/:bueno:/g, "<style> tweet-text img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://mylittlefacewhen.com/media/f/img/130816867992.jpg' style='width:199px; height: 160px;' /><br>")
.replace(/:partysoft:/g, "<style> tweet-text img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://mylittlefacewhen.com/media/f/img/130545901651.gif' style='width:150px; height: 140px;' /><br>")
.replace(/:rarityfetish:/g, "<style> tweet-text img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://mylittlefacewhen.com/media/f/img/130858995505.png' style='width:199px; height: 160px;' /><br>")
.replace(/:rbdhipster:/g, "<style> tweet-text img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://mylittlefacewhen.com/media/f/img/131218545452.png' style='width:175px; height: 160px;' /><br>")
.replace(/:atfirstiwaslike:/g, "<style> tweet-text img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://mylittlefacewhen.com/media/f/img/131218034964.jpg' style='width:199px; height: 200px;' /><br>")
.replace(/:ppbeard:/g, "<style> tweet-text img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://mylittlefacewhen.com/media/f/img/130425099803.png' style='width:199px; height: 160px;' /><br>")
.replace(/:abfuckyou:/g, "<style> tweet-text img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://img.ponibooru.org/_images/c3793dec15da3093f5c31c4b33aca57f/2010%20-%20animated%20apple_bloom%20caption%20fuck%20fuck_you_gif%20gif%20you.gif' style='width:199px; height: 140px;' /><br>")
.replace(/:rbdtryscience:/g, "<style> tweet-text img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://mylittlefacewhen.com/media/f/rsz/1248_huge.jpg' style='width:199px; height: 140px;' /><br>")
.replace(/:fdomnomnom:/g, "<style> tweet-text img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://mylittlefacewhen.com/media/f/img/jLvWJ.gif' style='width:180px; height: 140px;' /><br>")
.replace(/:dearsanta:/g, "<style> tweet-text img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://mylittlefacewhen.com/media/f/img/NwJbd.jpg' style='width:199px; height: 140px;' /><br>")
.replace(/:rbdfine:/g, "<style> tweet-text img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://mylittlefacewhen.com/media/f/img/130792154629.png' style='width:180px; height: 140px;' /><br>")
.replace(/:rbdcount:/g, "<style> tweet-text img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://mylittlefacewhen.com/media/f/img/130328369329.jpg' style='width:199px; height: 140px;' /><br>")
.replace(/:bpparty:/g, "<style> tweet-text img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://mylittlefacewhen.com/media/f/rsz/1153_huge.jpg' style='width:199px; height: 140px;' /><br>")
.replace(/:derpeh:/g, "<style> tweet-text img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://mylittlefacewhen.com/media/f/img/132099144341.gif' style='width:199px; height: 140px;' /><br>")
.replace(/:ajno:/g, "<style> tweet-text img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://mylittlefacewhen.com/media/f/img/tumblr_ltcgjs8HBL1qafrh6.gif' style='width:199px; height: 140px;' /><br>")
.replace(/:pprapemolestiaface:/g, "<style> tweet-text img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://mylittlefacewhen.com/media/f/img/131965432284.png' style='width:199px; height: 140px;' /><br>")
.replace(/:urawesome:/g, "<style> tweet-text img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://mylittlefacewhen.com/media/f/img/Rainbow_Dash_says_youre_awesome.gif' style='width:199px; height: 140px;' /><br>")
.replace(/:spikemarijuana:/g, "<style> tweet-text img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://mylittlefacewhen.com/media/f/img/130550520383.jpg' style='width:199px; height: 140px;' /><br>")
.replace(/:apkick:/g, "<style> tweet-text img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://mylittlefacewhen.com/media/f/img/dickick.png' style='width:199px; height: 140px;' /><br>")
.replace(/:rbdhellno:/g, "<style> tweet-text img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://mylittlefacewhen.com/media/f/rsz/911_huge.jpg' style='width:199px; height: 140px;' /><br>")
.replace(/:discordyes:/g, "<style> tweet-text img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://mylittlefacewhen.com/media/f/img/1317477000957857.gif' style='width:199px; height: 140px;' /><br>")
.replace(/:angelponieseverywhere:/g, "<style> tweet-text img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://mylittlefacewhen.com/media/f/img/1316953029841401.jpeg' style='width:199px; height: 140px;' /><br>")
.replace(/:tsnoslpeep:/g, "<style> tweet-text img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://mylittlefacewhen.com/media/f/img/1316739632976046.jpg' style='width:199px; height: 140px;' /><br>")
.replace(/:rbitchplease:/g, "<style> tweet-text img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://mylittlefacewhen.com/media/f/img/131749633883165.png' style='width:199px; height: 140px;' /><br>")
.replace(/:tssamethread:/g, "<style> tweet-text img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://mylittlefacewhen.com/media/f/img/JM7J6.png' style='width:199px; height: 140px;' /><br>")
.replace(/:dtfucku:/g, "<style> tweet-text img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://mylittlefacewhen.com/media/f/img/1316966873389340.jpeg' style='width:199px; height: 140px;' /><br>")
.replace(/:ppfuckpolice:/g, "<style> tweet-text img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://mylittlefacewhen.com/media/f/img/1315648020630094.png' style='width:199px; height: 140px;' /><br>")
.replace(/:tsfuckup:/g, "<style> tweet-text img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://mylittlefacewhen.com/media/f/img/131078724930.jpg' style='width:199px; height: 140px;' /><br>")
.replace(/:spwtf:/g, "<style> tweet-text img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://s3.amazonaws.com/kym-assets/photos/images/newsfeed/000/204/587/wtfisthisplace2.gif' style='width:199px; height: 140px;' /><br>")
.replace(/:spfuckdapolice:/g, "<style> tweet-text img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://s3.amazonaws.com/kym-assets/photos/images/original/000/166/442/tumblr_llyyko5ySH1qj41h3o1_500.gif' style='width:199px; height: 140px;' /><br>")
.replace(/:spsayhello:/g, "<style> tweet-text img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://s3.amazonaws.com/kym-assets/photos/images/original/000/110/815/1301178386447.jpg' style='width:199px; height: 140px;' /><br>")
.replace(/:speverywhere:/g, "<style> tweet-text img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://s3.amazonaws.com/kym-assets/photos/images/original/000/164/402/131378481270.gif' style='width:199px; height: 140px;' /><br>")
.replace(/:spohno:/g, "<style> tweet-text img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://s3.amazonaws.com/kym-assets/photos/images/original/000/200/962/spidey4.gif' style='width:199px; height: 140px;' /><br>")
.replace(/:sprapetime:/g, "<style> tweet-text img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://s3.amazonaws.com/kym-assets/photos/images/newsfeed/000/200/979/spidey-rape.gif' style='width:199px; height: 140px;' /><br>")
.replace(/:spipromise:/g, "<style> tweet-text img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://s3.amazonaws.com/kym-assets/photos/images/newsfeed/000/200/937/spidey12.gif' style='width:199px; height: 140px;' /><br>")
.replace(/:spwat:/g, "<style> tweet-text img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://s3.amazonaws.com/kym-assets/photos/images/newsfeed/000/200/974/spidey3.gif' style='width:199px; height: 140px;' /><br>")
.replace(/:spumm:/g, "<style> tweet-text img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://s3.amazonaws.com/kym-assets/photos/images/newsfeed/000/111/730/1302026719001.jpg' style='width:199px; height: 140px;' /><br>")
.replace(/:spswag:/g, "<style> tweet-text img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://s3.amazonaws.com/kym-assets/photos/images/original/000/156/382/tumblr_lp4r13cPAp1qko4x4o1_400.gif' style='width:199px; height: 140px;' /><br>")
.replace(/:sptouchme:/g, "<style> tweet-text img { display:inline; } .rageface { visibility:visible; } </style><br><img src=\'http://s3.amazonaws.com/kym-assets/photos/images/original/000/115/481/tumblr_ljtnnkONJ81qeznyno1_400.gif' style='width:199px; height: 140px;' /><br>")

			
		
			
		
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
						replaceByClass('mane', obj); //Cabron
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