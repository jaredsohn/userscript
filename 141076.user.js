// ==UserScript==
// @name         poetryClubBan
// @namespace    poetryClub
// @include      *
// @author       N. Mendyaev
// @description  Userscript for simulations ban
// @version		 1.1
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//code.jquery.com/jquery-latest.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
	var banned = ['вонючий_бyтербрoд'];
	if(window.location.host.indexOf('poetryclub.com.ua') != -1){
		var chatBan = function(){
			var html = $('#goc').get(0).contentWindow.document.body.innerHTML;
			var phrases = html.split('<br>');
			for(var i = 0; i < phrases.length; i++){
				for(var j = 0; j < banned.length;j++){
					if(phrases[i].indexOf('[b]'+banned[j]+'[/b]') != -1){
						phrases[i] = 'Вычеркнуто';
					}
				}
			}
			$('#goc').get(0).contentWindow.document.body.innerHTML = phrases.join('<br>');
		};
		$('#goc').load(function(){
			chatBan();
		});
		chatBan();
	}
}

// load jQuery and execute the main function
addJQuery(main);