// ==UserScript==
// @name        DOAmods.com timer bypass
// @author      Kevin Zucchini
// @version     1.0
// @namespace   DOAmodsSUX
// @description Bypass DOAmods.com timer.
// @include	http://*.doamods.com/*
// @include     https://*.doamonds.com/*
// ==/UserScript==
//If you're reading this scripts, good for you. I need to tell you one thing about this site in the 2 minutes I've been studying it for. The vote function isn't actually sending anything to the server. You can verify this by checking the Network tab of Chrome or Safari dev tools. 4.9/5 is a SCAM. Their "mods" are a SCAM. They don't do anyway, and the only thing it probably does is send the information back to the creators so they can scout your city (or whatever it is in DoA (I can from Global Warfare)).

function init() {
	if (document.body) {
		if (window.location == "http://doamods.com/index.html" || window.location == "http://doamods.com/") {
			countDownInt = 1;
			countDownFunc();
			//change onclick of the mod button to reflect the nature of this scam.
			document.getElementsByTagName('input')[0].onclick = function() {alert("Your vote was not recorded, the rating is a scam.")};
			document.getElementsByName('Mod_Start')[0].onclick = function() {alert("No matter what you put in here, it'll always say invalid code (even without this script.) Sincerely, DOAmods.com timer bypass script")};
			document.getElementsByTagName('form')[1].onsubmit = function() {alert("No.");return false};

			//change all stars to 1
			for (var i = 0; i < document.getElementsByTagName('select')[1].options.length; i++) {
				document.getElementsByTagName('select')[1].options[i].value = 1;
			}
			document.getElementById("map0").parentNode.removeChild(document.getElementById("map0"));
			document.getElementById("map1").parentNode.removeChild(document.getElementById("map1"));
			//remove first step, you don't even need to do that crap
			for (var i = 7; i < 15; i++) {
				if (i != 13) {
					document.getElementById("txt_" + i).parentNode.removeChild(document.getElementById("txt_" + i));
				}
			}
			document.getElementsByTagName('textarea')[0].parentNode.removeChild(document.getElementsByTagName('textarea')[0]);
		} else if (window.location.href.indexOf("StepOne") != -1) {
			alert("you can skip this step, you don't even need to do this");
			document.getElementsByTagName('a')[document.getElementsByTagName('a').length - 1].click();
		}

		
		//remove all download activation code images
		var activationImages = new Array();
		for (var i = 0; i < document.getElementsByTagName("img").length; i++) {
			if (document.getElementsByTagName("img")[i].src.indexOf("wpimages/wp9ba40498_06.png") != -1) {
				activationImages.push(i);
			}
		}
		
		//change images
		for (var i = 0; i < activationImages.length; i++) {
			document.getElementsByTagName("img")[activationImages[i]].src = "http://www.itp.net/images/content/580233/article/5292-fake-sta_article.jpg";

			document.getElementsByTagName("img")[activationImages[i]].height = 100;
			document.getElementsByTagName("img")[activationImages[i]].width = 300;
			
		}
	} else {
		setTimeout("init()", 50);
	}
}
init();