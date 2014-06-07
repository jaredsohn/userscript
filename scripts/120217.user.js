// ==UserScript==
// @name           Zing Me Emoticons Test
// @namespace      http://me.zing.vn/dinhkhanh_dk
// @description    Su dung Zing Me emoticons cho cac mang xa hoi Facebook, Twitter, Youtube... Thanks to VOZ Forums
// @include        *
// @version        1.0.0.2
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
	node.innerHTML = node.innerHTML
		.replace(/&quot;&nbsp;\)/g, '&quot;)');
	node.innerHTML = node.innerHTML
			.replace(/\:\)/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/1.jpg\' />")
			.replace(/\:\~/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/2.jpg\' />")			
			.replace(/\:B/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/3.jpg\' />")			
			.replace(/\:b/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/3.jpg\' />")			
			.replace(/\:\|/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/4.jpg\' />")			
			.replace(/\8\-\)/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/5.jpg\' />")			
			.replace(/\:\-\(\(/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/6.jpg\' />")			
			.replace(/\:\$/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/7.jpg\' />")			
			.replace(/\:X/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/8.jpg\' />")			
			.replace(/\:x/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/8.jpg\' />")			
			.replace(/\:Z/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/9.jpg\' />")			
			.replace(/\:z/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/9.jpg\' />")			
			.replace(/\:\(\(/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/10.jpg\' />")			
			.replace(/\:\-\|/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/11.jpg\' />")			
			.replace(/\:\-H/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/12.jpg\' />")			
			.replace(/\:\-h/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/12.jpg\' />")			
			.replace(/\:P/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/13.jpg\' />")
			.replace(/\:dig/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/42.jpg\' />")			
			.replace(/\:DIG/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/42.jpg\' />")				
			.replace(/\:p/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/13.jpg\' />")			
			.replace(/\:D/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/14.jpg\' />")			
			.replace(/\:d/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/14.jpg\' />")			
			.replace(/\:o/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/15.jpg\' />")			
			.replace(/\:O/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/15.jpg\' />")			
			.replace(/\:\(/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/16.jpg\' />")			
			.replace(/\:\+/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/17.jpg\' />")			
			.replace(/\-\-B/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/18.jpg\' />")			
			.replace(/\-\-b/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/18.jpg\' />")			
			.replace(/\:q/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/19.jpg\' />")			
			.replace(/\:Q/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/19.jpg\' />")			
			.replace(/\:t/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/20.jpg\' />")			
			.replace(/\:T/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/20.jpg\' />")			
			.replace(/\;p/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/21.jpg\' />")			
			.replace(/\;P/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/21.jpg\' />")			
			.replace(/\;\-d/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/22.jpg\' />")			
			.replace(/\;\-D/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/22.jpg\' />")			
			.replace(/\;D/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/23.jpg\' />")			
			.replace(/\;d/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/23.jpg\' />")			
			.replace(/\;o/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/24.jpg\' />")			
			.replace(/\;O/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/24.jpg\' />")			
			.replace(/\;g/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/25.jpg\' />")			
			.replace(/\;G/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/25.jpg\' />")			
			.replace(/\:\-\)/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/26.jpg\' />")	
			.replace(/\:\!/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/27.jpg\' />")			
			.replace(/\:l/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/28.jpg\' />")			
			.replace(/\:L/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/28.jpg\' />")			
			.replace(/\:&gt;/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/29.jpg\' />")			
			.replace(/\:\;/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/30.jpg\' />")			
			.replace(/\;f/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/31.jpg\' />")			
			.replace(/\;F/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/31.jpg\' />")			
			.replace(/\;\-s/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/32.jpg\' />")			
			.replace(/\;\-S/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/32.jpg\' />")			
			.replace(/\;\?/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/33.jpg\' />")			
			.replace(/\;\-x/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/34.jpg\' />")			
			.replace(/\;\-X/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/34.jpg\' />")			
			.replace(/\:\-f/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/35.jpg\' />")			
			.replace(/\:\-F/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/35.jpg\' />")			
			.replace(/\;8/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/36.jpg\' />")			
			.replace(/\;\!/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/37.jpg\' />")			
			.replace(/\;\-\!/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/38.jpg\' />")			
			.replace(/\;xx/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/39.jpg\' />")			
			.replace(/\;XX/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/39.jpg\' />")			
			.replace(/\:\-bye/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/40.jpg\' />")			
			.replace(/\:\-BYE/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/40.jpg\' />")
			.replace(/\:wipe/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/41.jpg\' />")			
			.replace(/\:WIPE/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/41.jpg\' />")			
			.replace(/\:\-dig/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/42.jpg\' />")			
			.replace(/\:\-DIG/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/42.jpg\' />")			
			.replace(/\:handclap/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/43.jpg\' />")			
			.replace(/\:HANDCLAP/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/43.jpg\' />")			
			.replace(/\&amp;\-\(/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/44.jpg\' />")			
			.replace(/B\-\)/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/45.jpg\' />")			
			.replace(/b\-\)/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/45.jpg\' />")			
			.replace(/\:\-L/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/46.jpg\' />")			
			.replace(/\:\-l/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/46.jpg\' />")		
			.replace(/\:\-r/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/47.jpg\' />")			
			.replace(/\:\-R/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/47.jpg\' />")			
			.replace(/\:\-o/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/48.jpg\' />")			
			.replace(/\:\-O/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/48.jpg\' />")			
			.replace(/\&gt;\-\|/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/49.jpg\' />")			
			.replace(/\p\-\(/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/50.jpg\' />")			
			.replace(/\P\-\(/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/50.jpg\' />")		
			.replace(/\:\-\-\|/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/51.jpg\' />")			
			.replace(/x\-\)/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/52.jpg\' />")			
			.replace(/X\-\)/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/52.jpg\' />")			
			.replace(/\:\*/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/53.jpg\' />")			
			.replace(/\;\-a/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/54.jpg\' />")			
			.replace(/\;\-A/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/54.jpg\' />")			
			.replace(/\8\*/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/55.jpg\' />")			
			.replace(/\/\-showlove/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/56.jpg\' />")			
			.replace(/\/\-SHOWLOVE/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/56.jpg\' />")			
			.replace(/\/\-rose/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/57.jpg\' />")			
			.replace(/\/\-ROSE/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/57.jpg\' />")			
			.replace(/\/\-fade/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/58.jpg\' />")			
			.replace(/\/\-FADE/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/58.jpg\' />")			
			.replace(/\/\-heart/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/59.jpg\' />")			
			.replace(/\/\-HEART/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/59.jpg\' />")			
			.replace(/\/\-break/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/60.jpg\' />")			
			.replace(/\/\-break/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/60.jpg\' />")			
			.replace(/\/\-coffee/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/61.jpg\' />")			
			.replace(/\/\-COFFEE/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/61.jpg\' />")			
			.replace(/\/\-cake/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/62.jpg\' />")			
			.replace(/\/\-CAKE/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/62.jpg\' />")			
			.replace(/\/\-li/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/63.jpg\' />")			
			.replace(/\/\-LI/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/63.jpg\' />")			
			.replace(/\/\-bome/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/64.jpg\' />")			
			.replace(/\/\-BOME/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/64.jpg\' />")			
			.replace(/\/\-bd/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/65.jpg\' />")			
			.replace(/\/\-BD/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/65.jpg\' />")			
			.replace(/\/\-shit/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/66.jpg\' />")			
			.replace(/\/\-SHIT/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/66.jpg\' />")			
			.replace(/\/\-strong/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/67.jpg\' />")			
			.replace(/\/\-STRONG/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/67.jpg\' />")			
			.replace(/\/\-weak/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/68.jpg\' />")			
			.replace(/\/\-WEAK/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/68.jpg\' />")			
			.replace(/\/\-share/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/69.jpg\' />")			
			.replace(/\/\-SHARE/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/69.jpg\' />")			
			.replace(/\/\-v/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/70.jpg\' />")			
			.replace(/\/\-V/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/70.jpg\' />")			
			.replace(/\/\-thanks/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/71.jpg\' />")			
			.replace(/\/\-THANKS/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/71.jpg\' />")			
			.replace(/\/\-jj/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/72.jpg\' />")			
			.replace(/\/\-JJ/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/72.jpg\' />")			
			.replace(/\/\-punch/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/73.jpg\' />")			
			.replace(/\/\-PUCH/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/73.jpg\' />")			
			.replace(/\/\-bad/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/74.jpg\' />")			
			.replace(/\/\-BAD/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/74.jpg\' />")			
			.replace(/\/\-loveu/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/75.jpg\' />")			
			.replace(/\/\-LOVEU/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/75.jpg\' />")			
			.replace(/\/\-no/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/76.jpg\' />")			
			.replace(/\/\-NO/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/76.jpg\' />")			
			.replace(/\/\-ok/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/77.jpg\' />")			
			.replace(/\/\-OK/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/77.jpg\' />")			
			.replace(/\/\-flag/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/78.jpg\' />")			
			.replace(/\/\-FLAG/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/78.jpg\' />")			
			.replace(/\/\-z/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/79.jpg\' />")			
			.replace(/\/\-Z/g, "<img src=\'http://img.me.zdn.vn/v3/images/smilley/default/79.jpg\' />");
}				
				function commonInsert(obj) {
					if(typeof(obj)=="object") {
						replaceByClass('tweet-text', obj); //Twitter
						replaceByClass('js-tweet-text', obj); //Twitter
						replaceByClass('mobile_status', obj); //Facebook
						replaceByClass('GBThreadMessageRow_Body_Content', obj); //Facebook
						replaceByClass('statusUnit', obj); //Facebook
						replaceByClass('messageBody', obj); //Facebook
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
						replaceByClass('a-f-i-W-p', obj); //Google Plus
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