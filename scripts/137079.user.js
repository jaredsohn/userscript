// ==UserScript==
// @name           Yahoo Messenger Emoticons for anyweb
// @namespace      http://facebook.com/theanhdeptrai
// @description    Hien smiley trong cac trang web pho bien, mang xa hoi!
// @include        *
// @version        1.0.0.1
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
						.replace(/\:\)\)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/21.gif\' />")
						.replace(/\#\:\-S/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/18.gif\' />")	
						.replace(/\=\:\)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/60.gif\' />")
						.replace(/\:\(\(/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/20.gif\' />")
						.replace(/\;\)\)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/71.gif\' />")
						.replace(/\'>:D</g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/6.gif\' />")
						.replace(/\>:d</g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/6.gif\' />")
						.replace(/\;\;\)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/5.gif\' />")
						.replace(/\:D/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/4.gif\' />")
						.replace(/\:d/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/4.gif\' />")
						.replace(/\:-\//g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/7.gif\' />")
						.replace(/\:x/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/8.gif\' />")
						.replace(/\:X/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/8.gif\' />")
						.replace(/\:&quot;&gt;/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/9.gif\' />")
						.replace(/\>\:P/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/47.gif\' />")
						.replace(/\>\:p/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/47.gif\' />")
						.replace(/\:\*/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/11.gif\' />")
						.replace(/\:\-\*/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/11.gif\' />")
						.replace(/\=\(\(/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/12.gif\' />")
						.replace(/\:O/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/13.gif\' />")
						.replace(/\:o/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/13.gif\' />")
						.replace(/x\(/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/14.gif\' />")
						.replace(/X\(/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/14.gif\' />")
						.replace(/\~x\(/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/102.gif\' />")
						.replace(/\~X\(/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/102.gif\' />")
						.replace(/\:\>/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/15.gif\' />")
						.replace(/B\-\)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/16.gif\' />")
						.replace(/b\-\)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/16.gif\' />")
						.replace(/\:\-ss/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/42.gif\' />")
						.replace(/\:\-SS/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/42.gif\' />")
						.replace(/\:\-S/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/17.gif\' />")	
						.replace(/\#\:\-s/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/18.gif\' />")	
						.replace(/\>\:\)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/19.gif\' />")	
						.replace(/\:\(/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/2.gif\' />")	
						.replace(/\:\)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/1.gif\' />")	
						.replace(/\:\|/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/22.gif\' />")	
						.replace(/\/:\)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/23.gif\' />")		
						.replace(/\=\)\)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/24.gif\' />")	
						.replace(/O\:\-\)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/25.gif\' />")	
						.replace(/o\:\-\)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/25.gif\' />")	
						.replace(/\:B/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/26.gif\' />")	
						.replace(/\:b/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/26.gif\' />")	
						.replace(/\=\;/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/27.gif\' />")	
						.replace(/\:\-c/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/101.gif\' />")	
						.replace(/\:\)\]/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/100.gif\' />")		
						.replace(/\:\-h/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/103.gif\' />")	
						.replace(/\:\-t/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/104.gif\' />")	
						.replace(/8\->/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/105.gif\' />")	
						.replace(/i\-\)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/28.gif\' />")	
						.replace(/I\-\)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/28.gif\' />")	
						.replace(/8\-\|/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/29.gif\' />")	
						.replace(/l\-\)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/30.gif\' />")	
						.replace(/\:\-\</g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/46.gif\' />")
						.replace(/L\-\)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/30.gif\' />")	
						.replace(/\:\-\&/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/31.gif\' />")	
						.replace(/\:\-\$/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/32.gif\' />")	
						.replace(/\[\-\(/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/33.gif\' />")
						.replace(/\:o3/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/108.gif\' />")
						.replace(/\:O\)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/34.gif\' />")
						.replace(/8\-\}/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/35.gif\' />")
						.replace(/\<\:\-p/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/36.gif\' />")
						.replace(/<:-P/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/36.gif\' />")
						.replace(/\(\:\|/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/37.gif\' />")
						.replace(/\=p\~/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/38.gif\' />")
						.replace(/\=P\~/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/38.gif\' />")
						.replace(/\:\-\?\?/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/106.gif\' />")
						.replace(/\:\-\?/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/39.gif\' />")
						.replace(/\#\-o/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/40.gif\' />")
						.replace(/\=d\>/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/41.gif\' />")
						.replace(/\:\-ss/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/42.gif\' />")
						.replace(/\@\-\)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/43.gif\' />")
						.replace(/\:\^o/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/44.gif\' />")
						.replace(/\:\^O/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/44.gif\' />")
						.replace(/\:\-w/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/45.gif\' />")
						.replace(/\:\-W/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/45.gif\' />")
                        .replace(/\:\-\</g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/46.gif\' />")
                        .replace(/\:P/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/10.gif\' />")
						.replace(/\:p/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/10.gif\' />")
                        .replace(/\<\):\)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/48.gif\' />")
                        .replace(/X\_X/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/109.gif\' />")
						 .replace(/x\_x/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/109.gif\' />")
                        .replace(/\:\!\!/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/110.gif\' />")
                        .replace(/\\m\//g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/111.gif\' />")
						.replace(/\\M\//g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/111.gif\' />")
                        .replace(/\:\-q/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/112.gif\' />")
						.replace(/\:\-Q/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/112.gif\' />")
                        .replace(/\:\-bd/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/113.gif\' />")
						.replace(/\:\-BD/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/113.gif\' />")
                        .replace(/\^\#\(\^/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/114.gif\' />")
                        .replace(/\:o3/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/108.gif\' />")
                        .replace(/\:\-\?\?/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/106.gif\' />")
                        .replace(/\%\-\(/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/107.gif\' />")
                        .replace(/:@\)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/49.gif\' />")
                        .replace(/3:-o/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/50.gif\' />")
                        .replace(/\~\:\>/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/52.gif\' />")
                        .replace(/\@\)\;\-/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/53.gif\' />")
                        .replace(/\%\%\-/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/54.gif\' />")
                        .replace(/\*\*\=\=/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/55.gif\' />")
                        .replace(/\(\~\~\)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/56.gif\' />")
                        .replace(/\~O\)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/57.gif\' />")
                        .replace(/\*\-\:\)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/58.gif\' />")
                        .replace(/\8\-x/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/59.gif\' />")
						.replace(/\8\-X/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/59.gif\' />")
                        .replace(/\>\-\)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/61.gif\' />")
                        .replace(/\:\-L/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/62.gif\' />")
                        .replace(/\[-O</g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/63.gif\' />")
                        .replace(/\$\-&\)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/64.gif\' />")
                        .replace(/\:\-\"/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/65.gif\' />")
                        .replace(/b\-\(/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/66.gif\' />")
                        .replace(/\:\)\>\-/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/67.gif\' />")
                        .replace(/\[\-x/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/68.gif\' />")
                        .replace(/\\:d\//g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/69.gif\' />")
                        .replace(/\>\:\//g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/70.gif\' />")
                        .replace(/\;\S\)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/3.gif\' />")
                        .replace(/\:\-\@/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/76.gif\' />")
                        .replace(/\^\:\)\^/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/77.gif\' />")
                        .replace(/\:\-j/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/78.gif\' />")
                        .replace(/\(\*\)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/79.gif\' />")
                        .replace(/o\-\>/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/72.gif\' />")
                        .replace(/o\=\>/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/73.gif\' />")
                        .replace(/o\-\+/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/74.gif\' />")
                        .replace(/\(\%\)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/75.gif\' />")
                        .replace(/\:bz/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/115.gif\' />")
	
			}				
				function commonInsert(obj) {
					if(typeof(obj)=="object") {
						replaceByClass('tweet-text', obj); //Twitter
						replaceByClass('js-tweet-text', obj); //Twitter
						replaceByClass('mobile_status', obj); //Facebook
						replaceByClass('GBThreadMessageRow_Body_Content', obj); //Facebook
						replaceByClass('statusUnit', obj); //Facebook
						replaceByClass('messageBody', obj); //Facebook fbChatMessage
						replaceByClass('fbChatMessage', obj); //Facebook fbChatMessage
						replaceByClass('message', obj); //Zing Me
						replaceByClass('row-comment', obj); //Zing Me
						replaceByClass('commentBody', obj); //Facebook
						replaceByClass('uiStreamMessage', obj); //Facebook
						replaceByClass('UIStory_Message', obj); //Facebook
						replaceByClass('fbQuestionsPollClickTarget', obj); //Facebook
						replaceByClass('pas fbQuestionsPollResultsBar', obj); //Facebook
						replaceByClass('inputboxusr', obj); //Facebook
						replaceByClass('mvs answerText', obj); //Facebook
						replaceByClass('fbPhotoCaptionText', obj); //Facebook
						replaceByClass('post_content', obj); //tumblr
						replaceByClass('post', obj); //tumblr
						replaceByClass('cx-comment-display', obj);
						replaceByClass('watch-expander yt-uix-expander  yt-uix-expander-collapsed', obj); //YouTube
						replaceByClass('comment-list', obj); //YouTube
						replaceByClass('comment', obj); //YouTube
						replaceByClass('comment-text', obj); //YouTube
						replaceByClass('comment last', obj); //YouTube
						replaceByClass('a-f-i-W-p', obj); //google Plus
						replaceByClass('a-b-f-i-p-R', obj); //oogle Plus
						replaceByClass('wackmsg_new_sender', obj); // Google Plus
						replaceByClass('wackmsg wackmsgtype_c', obj); //oogle Plus
						replaceByClass('chat_content', obj); // Google Plus
					}
				}
function nodeInserted(event) {
    commonInsert(event.target);
}commonInsert(document);
document.addEventListener('DOMNodeInserted', function(event) {
        commonInsert(event.target);
    }, false);