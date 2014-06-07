// ==UserScript==
// @name        ProjetR&S
// @namespace   ProjetR&S
// @description ProjetR&S
// @include     http://www.worldofstargate.fr/index.php?action=Appliquer*
// @version     1
// @grant       none
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
		var a = jQ("a");
		for(lien in a){
			if(a[lien].toString().indexOf("player") != -1 &&a[lien].toString().indexOf("advanced") == -1){
				idPlayer = a[lien].toString().split("=")[2];
				jQ.get('index.php', {'page' : 'player', 'id' : idPlayer}, function(data){
					var pageHtml = data;
					var idJoueur = pageHtml.toString().split("<a")[11].split('"')[1].split("=")[2];
					var lien = pageHtml.toString().split("<a")[14].split('"')[1];
					var coordonnee = lien.split("=")[2];
					if(lien.lastIndexOf(coordonnee) != lien.lastIndexOf("=")+1){
						//console.log("13 : "+pageHtml.toString().split("<a")[13].split('"')[1].split("=")[2]);
						coordonnee = pageHtml.toString().split("<a")[13].split('"')[1].split("=")[2];
					}
					var a = jQ("a");
					for(h in a){
						if(a[h].toString().indexOf("player") != -1 &&a[h].toString().indexOf("advanced") == -1 && a[h].toString().indexOf(idJoueur) != -1){
							jQ(a[h]).before("<a href='http://www.worldofstargate.fr/index.php?page=action&type=spy&utype=0&id="+coordonnee+"'><img src='http://imageshack.com/a/img716/4183/66so.png'</a>&nbsp;<a href='http://www.worldofstargate.fr/index.php?page=action&type=attack&id="+coordonnee+"'><img src='http://imageshack.com/a/img822/2104/mltn.png'</a>&nbsp;&nbsp;");
							break;
						}
					}
				});
			}
		}
	}

	addJQuery(main);