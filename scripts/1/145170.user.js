// ==UserScript==
// @name           Hired Gun - Hammertime 
// @version        1.0
// @namespace      johnwu@radio.blmurphy.net
// @description    changes HG's chat text to random MC Hammer lyrics
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
//HG Hammertime function
            if (profileId == "171705") {
				
var myText = "You can't touch this*My, my, my music hits me so hard*Makes me say \'Oh, my Lord\'*Thank you for blessing me*With a mind to rhyme and two hype feet*It feels good, when you know you\'re down*A super dope homeboy from the Oak town*And this is a beat, uh, you can't touch*I told you, homeboy (You can't touch this)*Yeah, that's how we living and you know (You can't touch this)*Look at my eyes, man (You can't touch this)*Yo, let me bust the funky lyrics (You can't touch this)*So move, outta your seat And get a fly girl and catch this beat*Yo, I told you (You can't touch this)*Why you standin' there, man? (You can't touch this)*Yo, sound the bell, school is in, sucka (You can't touch this)*Give me a song or rhythm Makin\' \'em sweat*The charts? Legit Either work hard or you might as well quit*Stop, Hammer time*Go with the funk, it is said If you can't groove to this Then you probably are dead*Bust a few moves Run your fingers through your hair*This is it, for a winner Dance to this and you're gonna get thinner*Move, slide your rump Just for a minute let's all do the bump, bump, bump*Yeah (You can't touch this)*You better get hype, boy Because you know you can't (You can't touch this)*Break it down Stop, Hammer time*Every time you see me The Hammer\'s just so hype*I'm dope on the floor and I'm magic on the mic*Now why would I ever stop doing this?*I've toured around the world, from London to the Bay*It\'s Hammer, go Hammer, MC Hammer, yo, Hammer And the rest can go and play" ; // Input text
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
			}
			}
//end of Hammertime function
			
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