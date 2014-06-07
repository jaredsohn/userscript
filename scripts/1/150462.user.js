// ==UserScript==
// @name           HG sings Johhny Cash
// @version        1.0
// @namespace      johnwu@radio.blmurphy.net
// @description    replaces HG's chat text with Johnny Cash lyrics
// @include        http://chat.pardus.at/chattext.php*
// ==/UserScript==
var hijack = function(){

	var chatWnd = document.getElementById("ChatWnd");
	var chatDivCount = 1;
	
	function processChat() {
		var chatDivs = chatWnd.childNodes;
		var myText = "I hear the train a comin\'; it\'s rollin\' \'round the bend*And I ain\'t seen the sunshine since I don\'t know when*I\'m stuck at Folsom Prison and time keeps draggin\' on*But that train keeps rollin\' on down to San Antone*When I was just a baby, my mama told me*Son, always be a good boy, don\'t ever play with guns*But I shot a man in Remo, just to watch him die*When I hear that whistle blowin\' I hang my head and cry*I bet there\'s rich folk eatin\' from a fancy dining car*They\'re prob\'ly drinkin\' coffee and smokin\' big cigars*Well, I know I had it comin\', I know I can\'t be free*But those people keep a movin\', and that\'s what tortures me*Well, if they freed me from this prison, if that railroad train was mine*I bet I\'d move on over a little farther down the line*Far from Folsom Prison, that\'s where I want to stay*And I\'d let that lonesome whistle blow my blues away*Well, my daddy left home when I was three*And he didn't leave much to ma and me*Just this old guitar and an empty bottle of booze*Now, I don't blame him \'cause he run and hid*But the meanest thing that he ever did*Was before he left, he went and named me Sue*Well, he must o\' thought that is quite a joke*And it got a lot of laughs from a lots of folk*It seems I had to fight my whole life through*Some gal would giggle and I\'d get red*And some guy\'d laugh and I\'d bust his head*I tell ya, life ain\'t easy for a boy named Sue*Well, I grew up quick and I grew up mean*My fist got hard and my wits got keen*I\'d roam from town to town to hide my shame*But I made me a vow to the moon and stars*That I\'d search the honky tonks and bars*And kill that man who gave me that awful name*Well, it was Gatlinburg in mid July*And I just hit town and my throat was dry*I thought I\'d stop and have myself a brew*At an old saloon on a street of mud*There at a table, dealing stud*Sat the dirty, mangy dog that named me Sue*Well, I knew that snake was my own sweet dad*From a worn out picture that my mother had*And I knew that scar on his cheek and his evil eye*He was big and bent and gray and old*And I looked at him and my blood ran cold*And I said, \'My name is Sue! How do you do? Now you're gonna die\'*Well, I hit him hard right between the eyes*And he went down, but to my surprise He come up with a knife and cut off a piece of my ear*But I busted a chair right across his teeth*And we crashed through the wall and into the street*Kicking and a gouging in the mud and the blood and the beer*I tell ya, I\'ve fought tougher men But I really can\'t remember when*He kicked like a mule and he bit like a crocodile*I heard him laugh and then I heard him curse*He went for his gun and I pulled mine first*He stood there lookin\' at me and I saw him smile*And he said, \Son, this world is rough*And if a man\'s gonna make it, he\'s gotta be tough*And I knew I wouldn\'t be there to help you along*So I give you that name and I said goodbye*I knew you\'d have to get tough or die*And it\'s the name that helped to make you strong*He said, Now you just fought one hell of a fight*And I know you hate me, and you got the right to kill me now, and I wouldn\'t blame you if you do*But you ought to thank me, before I die for the gravel in ya guts and the spit in ya eye *\'Cause I\'m the son-of-a-bitch that named you Sue*What could I do? Yeah what could I do?*I got all choked up and I threw down my gun*And I called him my pa, and he called me his son*And I came away with a different point of view*And I think about him, now and then*And if I ever have a son, I think I\'m gonna name him Bill or George anything but Sue!"; // Input text
// Load song lines into Array
var lines = myText.split("*");
var numLines = lines.length;
var i;
var phrases = Array();
for (i = 0; i < numLines; i++) {
  var line = lines[i];
      phrases.push(line);
  }
// process chat lines
		for (; chatDivCount < chatDivs.length; chatDivCount = chatDivCount + 2) {
			var lineDiv = chatDivs[chatDivCount];
			var start = lineDiv.innerHTML.indexOf("profile.php?id=");
			var crop = lineDiv.innerHTML.substring(start+15);
			var profileId = crop.substring(0,crop.indexOf(" ")-1);

            if (profileId == "171705" || profileId=="161299" || profileId=="7791") {
				
				var randomnumber=Math.floor(Math.random()*phrases.length)

				lineDiv.getElementsByTagName("span")[1].innerHTML = phrases[randomnumber];
				lineDiv.getElementsByTagName("span")[1].style.color = "#2D62CD";
			}
			}
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