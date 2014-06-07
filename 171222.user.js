 // ==UserScript==
 // @name changepic2
 // ==/UserScript==
function changepic(){
				var id=document.getElementById("js_3");
				var allpics= id.getElementsByTagName("img");
				for(var i=0; i <allpics.length; i++) {
					allpics[i].src="http://www.petfinder.com/wp-content/uploads/2012/11/101418789-cat-panleukopenia-fact-sheet-632x475.jpg";
				}
			}