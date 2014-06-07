// ==UserScript==
// @name           HG sings Call Me Maybe
// @version        1.0
// @namespace      johnwu@radio.blmurphy.net
// @description    replaces HG's chat text with Call Me Maybe lyrics
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
//HG lyrics function
            if (profileId == "171705") {
				
var myText = "I threw a wish in the well*Don't ask me, I\'ll never tell*I looked to you as it fell*" +
"And now you\'re in my way*I trade my soul for a wish*Pennies and dimes for a kiss*" +
"I wasn't looking for this*Your stare was holding*Ripped jeans, skin was showing*" +
"Hot night, wind was blowing*Where you think you're going, baby?*" +
"Hey, I just met you, and this is crazy*But here's my number, so call me maybe*" +
"It\'s hard to look right, at you baby*And all the other boys, try to chase me*" +
"You took your time with the call*I took no time with the fall*You gave me nothing at all, but still you're in my way*" +
"I beg and borrow and steal*Have first sight and it\'s real*I didn't know I would feel it, but it\'s in my way*" +
"Before you came into my life I missed you so bad*I missed you so bad... I missed you so, so bad*" +
"And you should know that... I missed you so, so bad"; // Input text
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
				lineDiv.getElementsByTagName("span")[1].style.color = "#F7EF12";
				lineDiv.getElementsByTagName("span")[1].style.fontSize="large";
			}
			}
//end of lyrics function
			
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