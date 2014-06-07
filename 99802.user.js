// ==UserScript==
// @name           hi-pda.com 字数补丁
// @namespace      http://www.hi-pda.com/forum/viewpro.php?uid=445276
// @include        http://www.hi-pda.com/forum/viewthread.php*
// @description    hi-pda.com 快速回复主题 字数补丁
// 
// ==/UserScript==

function fire() {
	var message = document.getElementsByName("message");
	if (message.length>0)
	{
		var messageLength = message[0].value.length;
		if (messageLength<=5)
		{
			message[0].value = message[0].value + "[color=white][/color]"
		}
	}	
}
(function () {
	var postSubmit = document.getElementById("fastpostsubmit");
	postSubmit.addEventListener('click', fire, false);

})();