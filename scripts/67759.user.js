// ==UserScript==
// @name            Nexusphp.Auto.Thanks
// @namespace       http://pt.sjtu.edu.cn/
// @description     Say thanks to uploader automatically.
// @version         1.7
// @match           http://pt.2hd.cc/details.php*
// @match           http://www.bdmkv.org/details.php*
// @match           http://chdbits.org/details.php*
// @match           http://et8.org/details.php*
// @match           http://www.hdcity.org/details.php*
// @match           http://www.hdstar.org/details.php*
// @match           http://www.ptshow.net/details.php*
// @match           http://pt.sjtu.edu.cn/details.php*
// @match           https://pt.sjtu.edu.cn/details.php*
// @match           http://pts.sjtu.edu.cn/details.php*
// @match           http://www.thdbits.org/details.php*
// @match           http://www.u-hd.net/details.php*
// @match           http://www.chinahdtv.org/details.php*
// @match           http://www.hd001.org/details.php*
// @match           http://www.hdnew.org/details.php*
// @match           http://e8888.org/details.php*
// @match           http://www.gameres.org/details.php*
// @match           http://g.camoe.org/details.php*
// @match           http://www.kmgtp.org/details.php*
// ==/UserScript==

(function() {
	'use strict';	
	var controller=[
		{
			host:'pt.sjtu.edu.cn',
			fn:function(){
				function addCss(str) {
					var style = document.createElement('style');
					style.textContent = str;
					document.head.appendChild(style);
				}
				function init(elem) {
					if(elem&&elem.click){
						// console.log(elem);
						elem.click();
					}
				}
				function onDOMNodeInsertedHandler(e){
					var target = e.target;
					if(target.nodeType === 1 && /INPUT/ig.test(target.nodeName)&&/saythanks/ig.test(target.id)) {
						init(target);
					}
				}
				function onAnimationStartHandler(e){
					if(e.animationName === 'nodeInserted'){
						var target = e.target;
						// console.log(target);
						init(target);
					}
				}
				var CONSTANTS={
					NODEINSERTED_HACK:'@-moz-keyframes nodeInserted{from{opacity:0;}to{opacity:1;}}@-webkit-keyframes nodeInserted{from{opacity:0;}to{opacity:1;}}@-o-keyframes nodeInserted{from{opacity:0;}to{opacity:1;}}@keyframes nodeInserted{from{opacity:0;}to{opacity:1;}}input#saythanks{animation-duration:.001s;-ms-animation-duration:.001s;-moz-animation-duration:.001s;-webkit-animation-duration:.001s;-o-animation-duration:.001s;animation-name:nodeInserted;-ms-animation-name:nodeInserted;-moz-animation-name:nodeInserted;-webkit-animation-name:nodeInserted;-o-animation-name:nodeInserted;}'
				}
				addCss(CONSTANTS.NODEINSERTED_HACK);
				/*Firefox*/
				document.body.addEventListener('animationstart',onAnimationStartHandler,false);
				/*/Firefox*/
				/*Chrome*/
				document.body.addEventListener('webkitAnimationEnd',onAnimationStartHandler,false);
				/*/Chrome*/
				/*Opera 12+*/
				document.body.addEventListener('oAnimationStart',onAnimationStartHandler,false);
				/*/Opera 12+*/
				/*IE, but I never tested this*/
				document.body.addEventListener('msAnimationStart',onAnimationStartHandler,false);
				/*/IE, but I never tested this*/
				if(/Opera/.test(navigator.userAgent)&&!(/Version\/12/.test(navigator.userAgent))){
					document.body.addEventListener('DOMNodeInserted', onDOMNodeInsertedHandler, false);
					(function(){
						document.getElementById('saythanks').click();
					})();
				}
			}
		},
		{
			host:'.',
			fn:function(){
				document.getElementById('saythanks').click();
			}
		}
	];
	var item;
	for(var i=0;i<controller.length;++i){
		item=controller[i];
		if(location.host.indexOf(item.host)!==-1){
			item.fn();
			break;
		}
	}
})();
