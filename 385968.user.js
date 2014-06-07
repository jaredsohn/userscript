// ==UserScript==
// @name          F23 - Chat
// @description   Dodaje Chat na forume
// @include       http://forum.o2.pl/forum.php*
// @author        dumny_anarchista
// @version       0.1
// @run-at        document-end
// ==/UserScript==


function dodaj_chat_na_efe23(){
	if(self!==top) return false; // sprawdzamy czy jesteśmy w ramce, jak jesteśmy to nie wykonujemy skryptu
	
	window.efe23windowchange = function(c) {
		window.history.pushState("", "forum.o2.pl", c);	
	}
	
	window.togglechat = function() {
		var x = document.getElementById("chat_container").className;
		if (x == 'chathidden') {
			document.getElementById("chat_container").className = "chatshow";
		} else {
			document.getElementById("chat_container").className = "chathidden";
		}
	}
	
	
	var adres = location.href;
	document.body.innerHTML = '<style>body{ padding: 0;} #chat_container.chathidden iframe { display: none; } #chat_container.chatshow { width: 481px !important; height: 550px !important; }</style>\n'+
	'<div id="chat_container" class="chathidden" style="position: fixed; width: 50px; height: 50px; top:0px; left: 0px; overflow: hidden; background-color: white; border: 1px solid #888;">' +
	'<div style="width:50px;height:50px;background-color: #5555ff;" onclick="togglechat();"></div>'+
	'<iframe style="width:481px;height: 500px;border:0;" src="http://efe23.t15.org/"></iframe>\n'+
	'</div>\n'+
	
	'<iframe src="'+adres+'" style="width:100%; height: 100%; border: 0;" onLoad="efe23windowchange(this.contentWindow.location);"></iframe>';
	
	
	
	
	
}




var DLscript = document.createElement("script");
DLscript.textContent =''+
dodaj_chat_na_efe23.toString()+' \n'+
'dodaj_chat_na_efe23(); \n';
DLscript.setAttribute("type", "application/javascript");
document.body.appendChild(DLscript);
