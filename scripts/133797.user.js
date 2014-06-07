// ==UserScript==
// @name           后台优酷视频自动暂停 - 加强版
// @include        http://v.youku.com/v_*.html*
// ==/UserScript== 

if(typeof GM_getValue('autopause') === 'undefined'){          //是否开启自动暂停
    GM_setValue('autopause', '1');                                           //1是开启，0是关闭
}
AutoPause = creaElemIn('div', document.body);
AutoPause.setAttribute('style', 'top: 0; left: 0;  position: fixed; color: blue; font-size: 9pt; cursor: pointer;');
if(GM_getValue('autopause')  === '1'){
   AutoPause.innerHTML = 'AutoPause - on'; 
}
else{
    AutoPause.innerHTML = 'AutoPause - off';
};
AutoPause.addEventListener('click', changePause, false);
document.addEventListener("mozvisibilitychange",Pause , false); 

function creaElemIn(tagname, destin) {
	var theElem = destin.appendChild(document.createElement(tagname));
	return theElem;
}
function changePause(){
    if(GM_getValue('autopause')  === '0'){
       AutoPause.innerHTML = 'AutoPause - on'
       GM_setValue('autopause', '1')
   }
   else{
        AutoPause.innerHTML = 'AutoPause - off'
        GM_setValue('autopause', '0')
    }
}
function Pause(){
    if(GM_getValue('autopause')  === '1'){
        unsafeWindow.PlayerPause(document.mozHidden)
    };
};