// ==UserScript==
// @name       Meme&PhongTom
// @namespace  http://www.facebook.com/shirotran.x
// @version    1.0
// @description  Emo Phong Tom Voz va meme
// @match      http://*/*
// @copyright  2012+, You
// ==/UserScript==

function replaceByClass(className, obj) {
    if (obj.getElementsByClassName) {
        var nodes = obj.getElementsByClassName(className);
        for (i in nodes) {
            if (typeof (nodes[i].innerHTML) == "string") {
                changeEmoticon(nodes[i]);
            }
        }
    }
}

function changeEmoticon(node) {
    node.innerHTML = node.innerHTML.replace(/" \)/g, '")');
    node.innerHTML = node.innerHTML
.replace(/\:phongtom\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://lovecab.us/images/smilies/troll/phong.png\' title=\'phongtom\' />")
.replace(/\:dog\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://lovecab.us/images/smilies/troll/sweet-jesus-dog-s.png\' title=\'Phê Like A Dog\' />")
.replace(/\:pokerface\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://lovecab.us/images/smilies/poker%20face.png\' title=\'PokerFace\' />")
.replace(/\:suprise\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://lovecab.us/images/smilies/suprise.png\' title=\'Suprise\' />")
.replace(/\:trollface1\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://lovecab.us/images/smilies/troll%20face1.png\' title=\'TrollFace1\' />")
.replace(/\:win\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://lovecab.us/images/smilies/win.png\' title=\'Win\' />")
.replace(/\:happyfa\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://lovecab.us/images/smilies/troll/sad-forever-alone-happy-s.png\' title=\'HappyFA\' />")
.replace(/\:hcl\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://lovecab.us/images/smilies/troll/hcl.png\' title=\'HCl\' />")
.replace(/\:fapfap\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://lovecab.us/images/smilies/troll/fap-s.png\' title=\'FapFap\' />")
.replace(/\:yaoming\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://lovecab.us/images/smilies/troll/laughing-fuck-that-bitch-s.png\' title=\'YaoMing\' />")
.replace(/\:uay\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://lovecab.us/images/smilies/troll/i2fun.com-funny-crazy-faces-029.png\' title=\'Uay\' />")
.replace(/\:fa\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://lovecab.us/images/smilies/troll/sad-forever-alone-face-only-s.png\' title=\'FA\' />")
.replace(/\:notbad\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://lovecab.us/images/smilies/troll/obama-not-bad-s.png\' title=\'NotBad\' />")
.replace(/\:ragemega\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://lovecab.us/images/smilies/troll/rage-mega-rage-s.png\' title=\'RageMega\' />")
.replace(/\:pfftch\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://lovecab.us/images/smilies/troll/happy-pfftch-s.png\' title=\'Pfftch\' />")
.replace(/\:ragecrazy\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://lovecab.us/images/smilies/troll/rage-crazy-rage-s.png\' title=\'RageCrazy\' />")
.replace(/\:troll\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://lovecab.us/images/smilies/troll/troll-black-guy-s.png\' title=\'Troll\' />")
.replace(/\:happiness\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://lovecab.us/images/smilies/troll/happy-grin-s.png\' title=\'Happiness\' />")
.replace(/\:lol\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://lovecab.us/images/smilies/troll/laughing-lol-crazy-clean-s.png\' title=\'Lol\' />")
.replace(/\:okay\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://lovecab.us/images/smilies/troll/okay-okay-clean-s.png\' title=\'Okay\' />")
.replace(/\:xoan\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://lovecab.us/images/smilies/troll/406099_382836018446020_1600061787_n.jpg\' title=\'SaoPhaiXoan\' />")
.replace(/\:if\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://lovecab.us/images/smilies/troll/ddd.png\' title=\'If_you_know_what_I_mean\' />")
.replace(/\:xoay\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://lovecab.us/images/smilies/troll/b-i7lFukebO.jpg\' title=\'Cu_Trong_Xoay\' />")
.replace(/\:pff\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://lovecab.us/images/smilies/troll/fuck-that-bitch-yao-pff-s.png\' title=\'Pff\' />")
.replace(/\:ohno\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://lovecab.us/images/smilies/troll/fuck-that-bitch-scared-yao-s.png\' title=\'Oh_No\' />")
.replace(/\:quyettam\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://lovecab.us/images/smilies/troll/determined-i-am-determined-s.png\' title=\'Quyet_Tam\' />")
.replace(/\:think\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://lovecab.us/images/smilies/troll/determined-questioning-pondering-s.png\' title=\'Think\' />")
.replace(/\:ninja\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://lovecab.us/images/smilies/troll/determined-feel-like-a-ninja-s.png\' title=\'Ninja\' />")
.replace(/\:facry\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://lovecab.us/images/smilies/troll/fuck-that-bitch-forever-yao-ming-s.png\' title=\'FA_Cry\' />")
.replace(/\:hero\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://lovecab.us/images/smilies/troll/determined-feel-like-a-superhero-s.png\' title=\'Hero\' />")
.replace(/\:iwu\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://lovecab.us/images/smilies/troll/annoyed-im-watching-u-s.png\' title=\'I_am_watching_you\' />")
.replace(/\:angry1\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://lovecab.us/images/smilies/troll/angry-eternal-contempt-s.png\' title=\'Angry\' />")
.replace(/\:loncaiban\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://lovecab.us/images/smilies/troll/angry-desk-flip-s.png\' title=\'Lon_cai_ban\' />")
.replace(/\:angry\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://lovecab.us/images/smilies/troll/angry-dark-stare-s.png\' title=\'Angry_Stare\' />")
.replace(/\:every\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://lovecab.us/images/smilies/troll/evemw.jpg\' title=\'Everywhere\' />")
.replace(/\:hug\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://lovecab.us/images/smilies/troll/sad-i-know-that-feel-clean-s.png\' title=\'I_Know_What_You_Feel_Bro\' />")
.replace(/\:fuck\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://lovecab.us/images/smilies/troll/a.png\' title=\'Dont_fuck_with_me\' />")
.replace(/\:ohgodwhy\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://lovecab.us/images/smilies/troll/disgusted-oh-god-why-s.png\' title=\'Oh_God_Why\' />")
.replace(/\:facepalm\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://lovecab.us/images/smilies/troll/annoyed-facepalm-picard-s.png\' title=\'Facepalm\' />")
.replace(/\:mother\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://lovecab.us/images/smilies/troll/disgusted-mother-of-god-s.png\' title=\'Mother_Of_God\' />")
.replace(/\:angrythank\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://lovecab.us/images/smilies/troll/angry-thanks-s.png\' title=\'Angry_Thank\' />")
.replace(/\:shot\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://lovecab.us/images/smilies/troll/angry-say-what-again-s.png\' title=\'Say_What_Again\' />")
.replace(/\:no\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://lovecab.us/images/smilies/troll/angry-no-s.png\' title=\'NO\' />")
.replace(/\:angry2\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://lovecab.us/images/smilies/troll/angry-must-resist-s.png\' title=\'Angry_Must_Resist\' />")
.replace(/\:uwin\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://lovecab.us/images/smilies/troll/angry-you-win-this-time!-s.png\' title=\'You_Win_This_Time\' />")
.replace(/\:ginta\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://lovecab.us/images/smilies/troll/ginta.png\' title=\'Ginta\' />")
.replace(/\:happy\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://lovecab.us/images/smilies/troll/happy-awww-s.png\' title=\'Happy_Awww\' />")
.replace(/\:ohshit\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://lovecab.us/images/smilies/troll/disgusted-impossibru-s.png\' title=\'Oh_Shit\' />")
.replace(/\:gtfo\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://lovecab.us/images/smilies/troll/fuck-yeah-gtfo-clean-s.png\' title=\'Get_The_Fuck_Out\' />")
.replace(/\:ohstop\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://lovecab.us/images/smilies/troll/happy-oh-stop-it-you-s.png\' title=\'Oh_Stop_It\' />")
.replace(/\:trex\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://lovecab.us/images/smilies/troll/misc-t-rex-rage-s.png\' title=\'T_Rex\' />")
.replace(/\:uh\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://lovecab.us/images/smilies/troll/oni1.png\' title=\'Onizuka\' />")
.replace(/\:pedo\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://lovecab.us/images/smilies/troll/pedo.png\' title=\'Pedobear\' />")
.replace(/\:pedobear\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://lovecab.us/images/smilies/troll/misc-pedobear-s.png\' title=\'Pedobear\' />")
                
}				
				function commonInsert(obj) {
					if(typeof(obj)=="object") {
						replaceByClass('tweet-text', obj); //Twitter
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
}commonInsert(document);
document.addEventListener('DOMNodeInserted', function(event) {
        commonInsert(event.target);
    }, false);