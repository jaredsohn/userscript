/*//////////////////////////////////////////////////////////////////////////
// ==UserScript===
// @name            Windows Live Messenger Hotmail msgplus compatible
// @author          Jerone UserScript Productions adapt: Canton
// @namespace      hotmail msgplus compatible
// @homepage        http://userscripts.org/scripts/show/20367
// @description     Windows Live Messenger Web Extended v1.7 Beta
// @copyright       2007 - 2008 Jerone, 2010 -Jerone Adapt: Canton
// @version         1.0 Beta
// @include          http://*.mail.live.com/Handlers/WebIM.mvc
// @require          http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @require          http://prototypejs.org/assets/2009/8/31/prototype.js
*/
// ==/UserScript==

var WLMW={
	msgPlusColors: ["ffffff","000000","00007f","009300","ff0000","7f0000","9c009c","fc7f00","ffff00","00fc00","009393","00ffff","0000fc","ff00ff","7f7f7f","d2d2d2","e7e6e4","cfcdd0","ffdea4","ffaeb9","ffa8ff","b4b4fc","bafbe5","c1ffa3","fafda2","b6b4b7","a2a0a1","f9c152","ff6d66","ff62ff","6c6cff","68ffc3","8eff67","f9ff57","858482","6e6d7b","ffa01e","f92611","ff20ff","202bff","1effa5","60f913","fff813","5e6464","4b494c","d98812","eb0505","de00de","0000d3","03cc88","59d80d","d4c804","333335","18171c","944e00","9b0008","980299","01038c","01885f","389600","9a9e15","473400","4d0000","5f0162","000047","06502f","1c5300","544d05"],
	//BBRplclbs: [],
	
	init: function(OBJBB){
			if(OBJBB){
				//alert('OBJ b: '+OBJBB.innerHTML);
				while(/\[[abcisu](=.*)?\]/.test(OBJBB.innerHTML)){
					OBJBB.innerHTML = OBJBB.innerHTML.replace(/\[b\](.*?)\[\/b\]/i,'<strong style="color:inherit;background-color:inherit;">$1</strong>');
					OBJBB.innerHTML = OBJBB.innerHTML.replace(/\[i\](.*?)\[\/i\]/i,'<em style="color:inherit;background-color:inherit;">$1</em>');
					OBJBB.innerHTML = OBJBB.innerHTML.replace(/\[u\](.*?)\[\/u\]/i,'<u style="color:inherit;background-color:inherit;">$1</u>');
					OBJBB.innerHTML = OBJBB.innerHTML.replace(/\[s\](.*?)\[\/s\]/i,'<strike style="color:inherit;background-color:inherit;">$1</strike>');
					OBJBB.innerHTML = OBJBB.innerHTML.replace(
						/\[c=(\d{1,2}|#[0-9a-fA-F]{6}(?=.{0,53}))\](.*?)\[\/c(?:=(\d{1,2}|#[0-9A-F]{6}(?=.{0,53})))?\]/gi,  // color
						function(m0, m1, m2, m3, m4, m5){
							// m0 = the complete substring that matched;
							// m1 = capture 1: color value in the opening tag ([c=?]);
							// m2 = capture 2: text between the color tags;
							// m3 = capture 3: color value in the closing tag ([/c=?]);
							// m4 = the offset where the match (m0) occured;
							// m5 = entire string object;
							// console.log([m0,m1,m2,m3,m4,m5.length].join('\n'));
							var regExp1 = /#[0-9a-fA-F]{6}/i;
							var regExp2 = /^\d$/i;
							if(regExp1.test(m1)){
								m1 = m1;
							}
							else if(regExp2.test(m1)){
								m1 = "#"+WLMW.msgPlusColors[m1];
							}
							else {
								m1 = "red";
							}
							return '<span style="color:' + m1 + ';background-color:inherit;">' + m2 + '</span>';
						}	
					);
					OBJBB.innerHTML = OBJBB.innerHTML.replace(
						/\[a=(\d{1,2}|#[0-9a-fA-F]{6}(?=.{0,53}))\](.*?)\[\/a(?:=(\d{1,2}|#[0-9A-F]{6}(?=.{0,53})))?\]/gi,  // background color
						function(m0, m1, m2, m3, m4, m5){
							var regExp1 = /#[0-9a-fA-F]{6}/i;
							var regExp2 = /^\d$/i;
							if(regExp1.test(m1)){
								m1 = m1;
							}
							else if(regExp2.test(m1)){
								m1 = "#"+WLMW.msgPlusColors[m1];
							}
							else {
								m1 = "red";
							}
							return '<span style="color:inherit;background-color:' + m1 + ';">' + m2 + '</span>';
				
						}
					);	
				}
			}	
	}
};

function init(){
	var arrElem = [$('span[class=PersonalMessage_Text]'),$('span[dir=ltr]'), $('div[class=wlxim_msgwrap] span')];
	for(var i=0; i<arrElem.length;i++){
		arrElem[i].each(function(){
		 if($(this)) {
			this.addEventListener('mousemove',init,false);
			WLMW.init(this);
			}
		});
	}
}

(function() { 
init();
})();