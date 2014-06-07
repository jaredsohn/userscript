// ==UserScript==
// @name           HG Bon Jovi
// @version        1.2
// @namespace      johnwu@radio.blmurphy.net
// @description    makes chat a bit more uplifting
// @grant          none
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
//HG Bon Jovi function
            if (profileId == "171705") {
				
var myText = "Once upon a time Not so long ago*Tommy used to work on the docks*Unions been on strike*He\'s down on his luck... it\'s tough, so tough*Gina works the diner all day*Working for her man, she brings home her pay*She says we\'ve got to hold on to what we\'ve got*We\'ve got each other and that\'s a lot*For love - we\'ll give it a shot*Whooah, we\'re half way there*Livin on a prayer*Take my hand and we\'ll make it - I swear*Tommy\'s got his six string in hock*Gina dreams of running away*When she cries in the night*Tommy whispers baby it\'s okay, someday*We\'ve got to hold on to what we\'ve got*Cause it doesn\'t make a difference if we make it or not*We\'ve got each other and that\'s a lot*For love - we\'ll give it a shot*We\'ve got to hold on ready or not*You live for the fight when it\'s all that you\'ve got*" +
"Shot through the heart,And you\'re to blame*Darling, you give love a bad name.*I play my part, and you play your game*No one can save me the damage is done.*CUCU is a BEAST!!!*A school boy\'s dream, you act so shy*WHOA! You\'re a loaded gun*WHOA! There\'s nowhere to run" +
"*I ain\'t got a fever got a permanent disease *Your love is like bad medicine*Bad medicine is what I need*Your love\'s the potion that can cure my disease*Shot down in a blaze of glory"; // Input text
// Load lines into Array
var lines = myText.split("*");
var numLines = lines.length;
var i;
var phrases = Array();

// parse lines
for (i = 0; i < numLines; i++) {
  var line = lines[i];
      phrases.push(line);
  }
var randomnumber=Math.floor(Math.random()*phrases.length)


				lineDiv.getElementsByTagName("span")[1].innerHTML = phrases[randomnumber];
			}
			}
//end of Bon Jovi function
			
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