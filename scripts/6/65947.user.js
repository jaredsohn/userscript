// ==UserScript==
// @name           WisperAlertInChatTab
// @namespace      www.domainofheroes.com
// @include        http://www.domainofheroes.com/Game.aspx
// @include        http://domainofheroes.com/Game.aspx
// ==/UserScript==
var regWisperToMe = /^<span .+?>[^\:]+\:\s+(?:\&\#40\;|\()whispered to you\) .+$/i;
var whisperSign = "<span style='color: #FFFFFF; font-size: 120% ; font-weight: bold ;'>&nbsp;&rArr;&nbsp;</span>";
function addGlobalStyle(css) {
	if(typeof GM_addStyle=='function') {
		GM_addStyle(css);
		return;
	}
    var style = document.createElement('style').setAttribute('type', 'text/css');
    document.getElementsByTagName('head')[0].appendChild(style).innerHTML=css;
}
addGlobalStyle('.chatTabWisperAlert {border-color:#00FFFF #00FFFF -moz-use-text-color !important;}');
var oldacm = unsafeWindow.acm;
unsafeWindow.acm = function (msg,chat) {
	var flag = false;
	var type = unsafeWindow.GetTypeForChatCode(chat);
	var id = unsafeWindow.$('tabChat'+type);
	if (id.className.indexOf('chatTabWisperAlert')>0) {
		flag = true;
	}
	if (regWisperToMe.test(msg)){
		//console.warn(msg);
		msg = whisperSign + msg;
		oldacm(msg,chat);
		var type=unsafeWindow.GetTypeForChatCode(chat);
		if(!unsafeWindow.$('div'+type+'Chat').visible()){
			id.className+=' chatTabWisperAlert';
		}
	}else{
		oldacm(msg,chat);
	}
	if (flag){
		id.className+=' chatTabWisperAlert';
	}
}