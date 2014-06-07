// ==UserScript==
// @name        GSPB PN Alert
// @description Zeigt eine Benachrichtigung bei neuen PNs im GameStar.de-PinBoard.
// @namespace   konakona@gspb
// @grant       none
// @run-at      document-end
// @updateURL   https://userscripts.org/scripts/source/182655.meta.js
// @downloadURL https://userscripts.org/scripts/source/182655.user.js
// @include     http://www.gamestar.de/*
// @exclude     http://www.gamestar.de/index.cfm?pid=103*
// @exclude     http://www.gamestar.de/index.cfm?pid=832*
// @exclude     http://www.gamestar.de/index.cfm?pid=109*
// @icon        http://www.gamestar.de/favicon.ico
// @version     2.4.2
// ==/UserScript==
function gspbPNAlert($){
	$.ajax({
		type : "GET",
		url : "http://www.gamestar.de/index.cfm?pid=1091",
		dataType : "html",
		success : function(data){
			var alte = 0,
				neue = 0,
				count = 0,
				name,betreff;
			
			if (document.cookie.match(new RegExp(" ?pnalert2_1=([^;]+)"))){
				alte = +RegExp.$1;
			}
			
			$(".formline td[colspan] strong",data).parent().each(function(){
				var elm = $(this),
					id = +this.href.match(/\d+$/)[0];
				
				if (neue === 0){
					neue = id;
					name = elm.parent().find("p a").text().trim();
					betreff = elm.text().trim();
				}
				if (alte < id){
					count++;
				}else{
					return false;
				}
			});
			
			if (count > 0){
				var text = (count===1)?"Du hast eine neue Private Nachricht erhalten.\n\nAbsender: " + name + "\nBetreff: '" + betreff + "'":"Du hast " + count + " neue Nachrichten.",
					antwort = confirm(text + "\n\nOK = Nicht mehr anzeigen\nAbrechen = Nochmal anzeigen");
				
				if (antwort){
					document.cookie = "pnalert2_1=" + neue + ";expires=" + new Date(new Date().getTime()+5356800000).toGMTString() + ";path=/";
				}
			}
		}
	});	
}

if (typeof jQuery !== "function"){
	//jQuery loader: http://erikvold.com/blog/index.cfm/2010/6/14/using-jquery-with-a-user-script
	var script = document.createElement("script");
	script.setAttribute("src","http://code.jquery.com/jquery-2.1.0.min.js");
	script.addEventListener("load",function(){
		var script = document.createElement("script");
		script.textContent = "(" + gspbPNAlert.toString() + ")(jQuery);";
		document.body.appendChild(script);
	},false);
	document.body.appendChild(script);
}else{
	gspbPNAlert(jQuery);
}