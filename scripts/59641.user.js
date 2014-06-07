// ==UserScript==
// @name KingsAge : Favorites fix
// @namespace http://userscripts.org/scripts/show/59641
// @description Changes the favorites link in the main menu so that it points directly to settlements, instead to favorite players list
// @date 2009-10-12
// @creator mkey
// @include http://*.kingsage.org/game.php?village=*
// @exclude
// ==/UserScript==

(function(){
	var division;
	var links;
	
	division = document.getElementsByClassName("head1");
	if (!division) return;
		
	// 
	for (i=0; i<division.length; i++){
		links = division[i].getElementsByTagName("a");
		if (links){
			for (j=0; j<links.length; j++){
				if (links[j].textContent == "Favourites"){
					links[j].setAttribute("href", links[j].getAttribute("href") + "&m=village");
					break;
				}
			}
		}
	}
})()