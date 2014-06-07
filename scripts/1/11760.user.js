// ==UserScript==
// @name	heissestories
// @namespace      heise
// @description fuegt einen Add-Link fuer Heissestories.de hinzu.
// @include http://www.heise.de*/foren/*msg-*/read/
// ==/UserScript==

function normalizeUrl(url){
	url=url.replace(/\/S-[^/]*/, "/go.shtml?read=1");
	url=url.replace(/\/forum-([0-9]*)/, "&forum_id=$1");
	url=url.replace(/\/msg-([0-9]*)/, "&msg_id=$1");
	url=url.replace("/read/", "");
	return url
}
(function(){
	head=document.getElementsByTagName("head")[0];
	head.innerHTML += '<style>A.heissestories:hover {background: #0000cc;color: #ffffff;text-decoration: none;padding-right: 1ex;padding-left: 1ex;border: solid #0000cc 1px;}A.heissestories {background: #ffffff;color: #0000cc;text-decoration: none; padding-right: 1ex;padding-left: 1ex;border: solid #0000cc 1px;}</style>';
	objects = document.getElementsByTagName("div");
	for (var i = 0;i < objects.length; i++){
		if(objects[i].className=="tovote_links"){
			objects[i].innerHTML += '<span class="unsichtbar">[ </span><a href="http://heissestories.de/add.php?url='+escape(normalizeUrl(window.location.href))+'" class="heissestories" title="muss auf Heissestories.de!"><b>!!</b></a><span class="unsichtbar"> ]</span>';
			break;
		}
	}

})();
