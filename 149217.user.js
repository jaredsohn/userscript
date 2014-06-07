// ==UserScript==
// @name           emoticon
// @namespace      http://www.facebook.com/tuancom1993
// @description    Su dung Yahoo Messenger Emoticons and Voz emoticon,Vo lam emoticon cho cac mang xa hoi Facebook, Twitter, Youtube... Thanks to VOZ Forums and dinhkhanh_dk
// @include        *
// @version        2.2.1.1
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
	.replace(/\:\T/g, "<img src=\'http://hoi8.vn/static/image/smiley/Kt/16.gif\' />")
	.replace(/\:\U/g, "<img src=\'http://hoi8.vn/static/image/smiley/Kt/27.gif\' />")
	.replace(/\:\u/g, "<img src=\'http://hoi8.vn/static/image/smiley/Kt/27.gif\' />")
	.replace(/\:\$/g, "<img src=\'http://hoi8.vn/static/image/smiley/Kt/09.gif\' />")
	.replace(/\:w/g, "<img src=\'http://hoi8.vn/static/image/smiley/Kt/30.gif\' />")
	.replace(/\:W/g, "<img src=\'http://hoi8.vn/static/image/smiley/Kt/30.gif\' />")
	.replace(/\:\K/g, "<img src=\'http://hoi8.vn/static/image/smiley/Kt/29.gif\' />")
	.replace(/\:\!/g, "<img src=\'http://hoi8.vn/static/image/smiley/Kt/22.gif\' />")
	.replace(/\:\E/g, "<img src=\'http://hoi8.vn/static/image/smiley/Kt/21.gif\' />")
	.replace(/\@\@/g, "<img src=\'http://hoi8.vn/static/image/smiley/Kt/10.gif\' />")
	.replace(/\:\H/g, "<img src=\'http://hoi8.vn/static/image/smiley/Kt/11.gif\' />")
						
						.replace(/\#\:\-S/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/18.gif\' />")
						.replace(/\#\:\-s/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/18.gif\' />")	
						.replace(/\=\:\)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/60.gif\' />")
						.replace(/\:\(\(/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/20.gif\' />")
						.replace(/\;\)\)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/71.gif\' />")
						.replace(/\>:D</g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/6.gif\' />")
						.replace(/\>:d</g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/6.gif\' />")
						.replace(/\;\;\)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/5.gif\' />")
						.replace(/\:D/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/4.gif\' />")
						.replace(/\:d/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/4.gif\' />")
						.replace(/\:-\//g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/7.gif\' />")
						.replace(/\:x/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/8.gif\' />")
						.replace(/\:X/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/8.gif\' />")
						.replace(/\:\&quot;\&gt;/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/9.gif\' />")
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
						.replace(/\:\&gt;/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/15.gif\' />")
						.replace(/B\-\)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/16.gif\' />")
						.replace(/b\-\)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/16.gif\' />")
						.replace(/\:\-ss/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/42.gif\' />")
						.replace(/\:\-SS/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/42.gif\' />")
						.replace(/\:\-S/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/17.gif\' />")	
						.replace(/\#\:\-s/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/18.gif\' />")	
						.replace(/\&gt;\:\)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/19.gif\' />")	
						.replace(/\:\(/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/2.gif\' />")	
							
						.replace(/\:\|/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/22.gif\' />")	
						.replace(/\/:\)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/23.gif\' />")		
						.replace(/\=\)\)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/24.gif\' />")	
						.replace(/O\:\-\)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/25.gif\' />")	
						.replace(/o\:\-\)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/25.gif\' />")	
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
						.replace(/\:\-\w/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/45.gif\' />")
						.replace(/\:\-\W/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/45.gif\' title=\'noi nong\' />")
						.replace(/\:@\)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/49.gif\' title=\'heo\' />")
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
						.replace(/\:\(\|\)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/51.gif\' />")
.replace(/:sexy:/g, "<style>.md img { display:inline; } .rageface { visibility:visible; } </style><div id='lol' class='lol'><img  src=\'http://vozforums.com/images/smilies/Off/sexy_girl.gif\' title='Sexy' /></div>")

.replace(/\:byebye\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/byebye.gif\' title=\'byebye\' />")

.replace(/\:look_down\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/look_down.gif\' title=\'look_down\' />")

.replace(/\:stick\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/burn_joss_stick.gif\' title=\'stick\' />")

.replace(/\:adore\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/adore.gif\' title=\'adore\' />")

.replace(/\:chaymau\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/nosebleed.gif\' title=\'chaymau\' />")
.replace(/\:beauty\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/beauty.gif\' title=\'beauty\' />")

.replace(/\:gach\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/brick.png\' title=\'gach\' />")
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
.replace(/\:rap\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/rap.gif\' title=\'rap\' />")

.replace(/\:neptune\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://up.ssc.vn/images/347nep2.png\' title=\'neptune\' />")

.replace(/\:hang\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/hang.gif\' title=\'hang\' />")
.replace(/\:tire\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/tire.gif\' title=\'tire\' />")

.replace(/\:bad_smell\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/bad_smelly.gif\' title=\'bad_smell\' />")

.replace(/\:brick\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/beat_brick.gif\' title=\'brick\' />")

.replace(/\:kool\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/cool.gif\' title=\'kool\' />")

.replace(/\:hell_boy\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/hell_boy.gif\' title=\'hell_boy\' />")
.replace(/\:dribble\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/dribble.gif\' title=\'dribble\' />")
.replace(/\:sad\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/sad.gif\' title=\'sad\' />")

.replace(/\:hug\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/hug.gif\' title=\'hug\' />")

.replace(/\:cheers\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/cheers.gif\' title=\'cheers\' />")

.replace(/\-\_\-/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/sleep.gif\' title=\'Sleep\' />")

.replace(/\:shitty\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/shit.gif\' title=\'shitty\' />")
.replace(/\:capture\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/capture.gif\' title=\'capture\' />")

.replace(/\:confident\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/confident.gif\' title=\'confident\' />")

.replace(/\:theft\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/theft.gif\' title=\'theft\' />")

.replace(/\:spam\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/spam.gif\' title=\'spam\' />")

.replace(/\:ah\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/ah.gif\' title=\'ah\' />")

.replace(/\:rofl\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/rofl.gif\' title=\'rofl\' />")

.replace(/\:baffle\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/baffle.gif\' title=\'baffle\' />")

.replace(/\:choler\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/choler.gif\' title=\'choler\' />")

.replace(/\:haha\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/haha.gif\' title=\'haha\' />")
.replace(/\:bike\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/bike.gif\' title=\'bike\' />")

.replace(/\:lmao\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/lmao.gif\' title=\'lmao\' />")

.replace(/\:bye\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/Off/bye.gif\' title=\'bye\' />")
.replace(/\:lol\:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://vozforums.com/images/smilies/emos/lol.gif\' title=\'lol\' />")
.replace(/\:\)/g, "<img src=\'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/1.gif\' />")		
.replace(/\:phongtom:/g, "<style> .md img { display:inline; } .rageface { visibility:visible; } </style><img src=\'http://lovecab.us/images/smilies/troll/phong.png\' title=\'phongtom\' />")

        
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