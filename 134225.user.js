// ==UserScript==
// @name           GUA chat color enforcer
// @version        1.1
// @namespace      johnwu@radio.blmurphy.net
// @description    sets pilots to specific colors in chat
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
                  
			
			switch (profileId) {
			case "26299":    //Pink Flamingo
				lineDiv.getElementsByTagName("b")[0].style.color = "#feacfb";
				lineDiv.getElementsByTagName("span")[1].style.color = "#feacfb";
				break;			
			case "204067":    //Matix
				lineDiv.getElementsByTagName("b")[0].style.color = "#9A7CFC";
				lineDiv.getElementsByTagName("span")[1].style.color = "#9A7CFC";
				break;
			case "185970":    //Topaz
				lineDiv.getElementsByTagName("b")[0].style.color = "#6086FF";
				lineDiv.getElementsByTagName("span")[1].style.color = "#6086FF";
				break;
			case "131108":    //John Wu
				lineDiv.getElementsByTagName("b")[0].style.color = "#019CAE";
				lineDiv.getElementsByTagName("span")[1].style.color = "#019CAE";
				break;
			case "11313":    //Mortushir
				lineDiv.getElementsByTagName("b")[0].style.color = "#FF751A";
				lineDiv.getElementsByTagName("span")[1].style.color = "#FF751A";
				break;
			case "125562":    //Hans
				lineDiv.getElementsByTagName("b")[0].style.color = "#F51D1D";
				lineDiv.getElementsByTagName("span")[1].style.color = "#F51D1D";
				break;
			case "15296":    //Goldbrand
				lineDiv.getElementsByTagName("b")[0].style.color = "#E8D10B";
				lineDiv.getElementsByTagName("span")[1].style.color = "#E8D10B";
				break;
			case "69753":    //Beigeman
				lineDiv.getElementsByTagName("b")[0].style.color = "#EEC591";
				lineDiv.getElementsByTagName("span")[1].style.color = "#EEC591";
				break;
			case "19297":    //Erius
				lineDiv.getElementsByTagName("b")[0].style.color = "#2E37FE";
				lineDiv.getElementsByTagName("span")[1].style.color = "#2E37FE";
				break;
			case "10703":    //Fanghorn
				lineDiv.getElementsByTagName("b")[0].style.color = "#E2DDB5";
				lineDiv.getElementsByTagName("span")[1].style.color = "#E2DDB5";
				break;
			case "151976":    //Sacred Dragoon
				lineDiv.getElementsByTagName("b")[0].style.color = "#D4ED91";
				lineDiv.getElementsByTagName("span")[1].style.color = "#D4ED91";
				break;
			case "221410":    //Natalie
				lineDiv.getElementsByTagName("b")[0].style.color = "#C93857";
				lineDiv.getElementsByTagName("span")[1].style.color = "#C93857";
				break;

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