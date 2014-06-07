// ==UserScript==
// @name        projetFER
// @namespace   projetFER
// @description projetFER
// @include     http://www.worldofstargate.fr/*
// @version     1
// ==/UserScript==   

function addJQuery(callback) {
	  var script = document.createElement("script");
	  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
	  script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
		document.body.appendChild(script);
	  }, false);
	  document.body.appendChild(script);
	}
	
	// the guts of this userscript
	function main() {
		$(document).keyup(function (event) {
			console.log(event.keyCode);
			if(event.keyCode == 82 ){
				var tabResu = $('div[class^="resu_bar_"]');
				
					var j = 0;
					var h = 0;
					var m = 0;
					var s = 0;
					var globalTime = 0;
					var timeAfficher = "";
if(tabResu.length > 0){
					tabResu.each(function(res){
						globalTime += parseInt($(this).find("span:nth-child(4)").text());
					});
					console.log(globalTime);
					var tmp = 0;
					j = (globalTime - globalTime % 86400)/86400;
					tmp += j*86400;
					h = (globalTime - tmp - ((globalTime-tmp)%3600))/3600;
					tmp += h*3600;
					m = (globalTime - tmp - ((globalTime-tmp)%60))/60;
					tmp += m*60
					s = globalTime - tmp;
					}
					timeAfficher += "\t<p class=\"awesome\"> Temps résurrection : "+j+"j"+h+"h"+m+"m"+s+"s" +"</p>";

					var lien = $(".medium.lightblue.awesome");
					if(lien.text().indexOf("planification") != -1){
						console.log(lien);
						lien.after(timeAfficher);
					
				}
			}
		});
	}
	addJQuery(main);
