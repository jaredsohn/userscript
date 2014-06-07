// ==UserScript==
// @name           Script de Franz
// @Original Script http://userscripts.org/scripts/review/105689
// @description    Pedirla, si.
// @include        *
// @version        1.0
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
			.replace(/:franzapproves:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><div id='lol' class='lol'><img  src=\'https://fbcdn-sphotos-h-a.akamaihd.net/hphotos-ak-prn1/q75/s720x720/1011348_602123833144535_1046823944_n.jpg\' title='franzApproves' /></div>")
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