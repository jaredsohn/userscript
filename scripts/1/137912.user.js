// ==UserScript==
// @name           HG emo chat
// @version        1.0
// @namespace      johnwu@radio.blmurphy.net
// @description    makes chat a bit more uplifting
// @include        http://chat.pardus.at/chattext.php*
// ==/UserScript==
var hijack = function(){

	var chatWnd = document.getElementById("ChatWnd");
	var chatDivCount = 1;
	
	function processChat() {
		var chatDivs = chatWnd.childNodes;
		for (; chatDivCount < chatDivs.length; chatDivCount = chatDivCount + 2) {
			var lineDiv = chatDivs[chatDivCount];
			var start = lineDiv.innerHTML.indexOf("profile.php?id=");
			var crop = lineDiv.innerHTML.substring(start+15);
			var profileId = crop.substring(0,crop.indexOf(" ")-1);
//HG emo function
            if (profileId == "171705") {
				var chattext = lineDiv.getElementsByTagName("span")[1].innerHTML;
chattext = chattext.toLowerCase();
				chattext = chattext.replace("failure","success"); 
				chattext = chattext.replace("tbs","ponies");
				chattext = chattext.replace("ambushes","unicorns");
				chattext = chattext.replace("fail","win");
				chattext = chattext.replace("asshole","winner");
				chattext = chattext.replace("pay","not pay");
				chattext = chattext.replace("bad","good");
				chattext = chattext.replace("alliance","herd");
				chattext = chattext.replace("fox","Princess Celestia");
                                chattext = chattext.replace("welt","Drylight Snarkle");
				chattext = chattext.replace("transfer","e-mail");
chattext = chattext.replace("trust","distrust");
chattext = chattext.replace("the pub","Ponyville");
chattext = chattext.replace("talk","speaketh");
chattext = chattext.replace("hairstyle","Vajazzle");
chattext = chattext.replace("hyenas","parasprites");
chattext = chattext.replace("hyena","parasprite");
chattext = chattext.replace("faction space","Equestria");
chattext = chattext.replace("vojvodina","Sweet Apple Acres");
chattext = chattext.replace("yugoslavia","Everfree Forest");
chattext = chattext.replace("youngsters","fillies");
chattext = chattext.replace("awesome","groovy");
			        lineDiv.getElementsByTagName("span")[1].innerHTML = chattext;
			}
			}
//end of emo function
			
	}	
	processChat();

	var originalAjaxCallback = window.ajaxCallback;
	window.ajaxCallback = function(result, errors) {
		originalAjaxCallback(result, errors);
		processChat();
	}
};

var script = document.createElement("script");
script.textContent = "(" + hijack.toString() + ")()";
document.body.appendChild(script);