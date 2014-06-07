// ==UserScript==
// @name           Bouwen2
// @namespace      W6
// @include        *screen=main*
// ==/UserScript==

var counter = 0;
var links = document.getElementsByTagName("a");


for (var i=0; i < links.length; i++) {
    if (links[i].innerHTML === "afbreken") {
        counter++;
		
    }
	
	}
    if (counter < 3) {
	

//klijne gebouwen en adelshove naar 1
for (var i=0; i < links.length; i++) {
	if (links[i].href.match(/action=build&id=snob/gi)
	        || links[i].href.match(/action=build&id=place/gi)
	        || links[i].href.match(/action=build&id=statue/gi)
	        && !links[i].href.match(/force/gi)
	        && links[i].innerHTML === "Uitbouwen naar level 1 ") {
		 window.location = links[i].href ;
		break;
	}
}

//main naar level 5
for (var i=0; i < links.length; i++) {
	if (links[i].href.match(/action=build&id=main/gi)
	        && !links[i].href.match(/force/gi)
	        && links[i].innerHTML === "Uitbouwen naar level 1 "
	        || links[i].innerHTML === "Uitbouwen naar level 2 "
	        || links[i].innerHTML === "Uitbouwen naar level 3 "
	        || links[i].innerHTML === "Uitbouwen naar level 4 "
	        || links[i].innerHTML === "Uitbouwen naar level 5 ") {
		 window.location = links[i].href ;
		break;
	}
}

//opslag naar level 5
for (var i=0; i < links.length; i++) {
	if (links[i].href.match(/action=build&id=storage/gi)
	        && !links[i].href.match(/force/gi)
	        && links[i].innerHTML === "Uitbouwen naar level 1 "
	        || links[i].innerHTML === "Uitbouwen naar level 2 "
	        || links[i].innerHTML === "Uitbouwen naar level 3 "
	        || links[i].innerHTML === "Uitbouwen naar level 4 "
	        || links[i].innerHTML === "Uitbouwen naar level 5 ") {
		 window.location = links[i].href ;
		break;
	}
}

//grondstoffen naar level 5
for (var i=0; i < links.length; i++) {
	if (links[i].href.match(/action=build&id=stone/gi)
	        || links[i].href.match(/action=build&id=wood/gi)
	        || links[i].href.match(/action=build&id=iron/gi)
	        && !links[i].href.match(/force/gi)
	        && links[i].innerHTML === "Uitbouwen naar level 1 "
	        || links[i].innerHTML === "Uitbouwen naar level 2 "
	        || links[i].innerHTML === "Uitbouwen naar level 3 "
	        || links[i].innerHTML === "Uitbouwen naar level 4 "
	        || links[i].innerHTML === "Uitbouwen naar level 5 ") {
		 window.location = links[i].href ;
		break;
	}
}

//farm naar level 5
for (var i=0; i < links.length; i++) {
	if (links[i].href.match(/action=build&id=farm/gi)
	        && !links[i].href.match(/force/gi)
	        && links[i].innerHTML === "Uitbouwen naar level 1 "
	        || links[i].innerHTML === "Uitbouwen naar level 2 "
	        || links[i].innerHTML === "Uitbouwen naar level 3 "
	        || links[i].innerHTML === "Uitbouwen naar level 4 "
	        || links[i].innerHTML === "Uitbouwen naar level 5 ") {
		 window.location = links[i].href ;
		break;
	}
}

//muur naar level 5
for (var i=0; i < links.length; i++) {
	if (links[i].href.match(/action=build&id=wall/gi)
	        && !links[i].href.match(/force/gi)
	        && links[i].innerHTML === "Uitbouwen naar level 1 "
	        || links[i].innerHTML === "Uitbouwen naar level 2 "
	        || links[i].innerHTML === "Uitbouwen naar level 3 "
	        || links[i].innerHTML === "Uitbouwen naar level 4 "
	        || links[i].innerHTML === "Uitbouwen naar level 5 ") {
		 window.location = links[i].href ;
		break;
	}
}

//main naar level 20
for (var i=0; i < links.length; i++) {
	if (links[i].href.match(/action=build&id=main/gi)
	        && !links[i].href.match(/force/gi)
	        && links[i].innerHTML === "Uitbouwen naar level 6 "
	        || links[i].innerHTML === "Uitbouwen naar level 7 "
	        || links[i].innerHTML === "Uitbouwen naar level 8 "
	        || links[i].innerHTML === "Uitbouwen naar level 9 "
	        || links[i].innerHTML === "Uitbouwen naar level 10 "
	        || links[i].innerHTML === "Uitbouwen naar level 11 "
	        || links[i].innerHTML === "Uitbouwen naar level 12 "
	        || links[i].innerHTML === "Uitbouwen naar level 13 "
	        || links[i].innerHTML === "Uitbouwen naar level 14 "
	        || links[i].innerHTML === "Uitbouwen naar level 15 "
	        || links[i].innerHTML === "Uitbouwen naar level 16 "
	        || links[i].innerHTML === "Uitbouwen naar level 17 "
	        || links[i].innerHTML === "Uitbouwen naar level 18 "
	        || links[i].innerHTML === "Uitbouwen naar level 19 "
	        || links[i].innerHTML === "Uitbouwen naar level 20 ") {
		 window.location = links[i].href ;
		break;
	}
}

//opslag naar level 15
for (var i=0; i < links.length; i++) {
	if (links[i].href.match(/action=build&id=storage/gi)
	        && !links[i].href.match(/force/gi)
	        && links[i].innerHTML === "Uitbouwen naar level 6 "
	        || links[i].innerHTML === "Uitbouwen naar level 7 "
	        || links[i].innerHTML === "Uitbouwen naar level 8 "
	        || links[i].innerHTML === "Uitbouwen naar level 9 "
	        || links[i].innerHTML === "Uitbouwen naar level 10 "
	        || links[i].innerHTML === "Uitbouwen naar level 11 "
	        || links[i].innerHTML === "Uitbouwen naar level 12 "
	        || links[i].innerHTML === "Uitbouwen naar level 13 "
	        || links[i].innerHTML === "Uitbouwen naar level 14 "
	        || links[i].innerHTML === "Uitbouwen naar level 15 ") {
		 window.location = links[i].href ;
		break;
	}
}

//grondstoffen naar level 20
for (var i=0; i < links.length; i++) {
	if (links[i].href.match(/action=build&id=stone/gi)
	        || links[i].href.match(/action=build&id=wood/gi)
	        || links[i].href.match(/action=build&id=iron/gi)
	        && !links[i].href.match(/force/gi)
	        && links[i].innerHTML === "Uitbouwen naar level 6 "
	        || links[i].innerHTML === "Uitbouwen naar level 7 "
	        || links[i].innerHTML === "Uitbouwen naar level 8 "
	        || links[i].innerHTML === "Uitbouwen naar level 9 "
	        || links[i].innerHTML === "Uitbouwen naar level 10 "
	        || links[i].innerHTML === "Uitbouwen naar level 11 "
	        || links[i].innerHTML === "Uitbouwen naar level 12 "
	        || links[i].innerHTML === "Uitbouwen naar level 13 "
	        || links[i].innerHTML === "Uitbouwen naar level 14 "
	        || links[i].innerHTML === "Uitbouwen naar level 15 "
	        || links[i].innerHTML === "Uitbouwen naar level 16 "
	        || links[i].innerHTML === "Uitbouwen naar level 16 "
	        || links[i].innerHTML === "Uitbouwen naar level 17 "
	        || links[i].innerHTML === "Uitbouwen naar level 18 "
	        || links[i].innerHTML === "Uitbouwen naar level 19 "
	        || links[i].innerHTML === "Uitbouwen naar level 20 ") {
		 window.location = links[i].href ;
		break;
	}
}

//muur naar level 20
for (var i=0; i < links.length; i++) {
	if (links[i].href.match(/action=build&id=wall/gi)
	        && !links[i].href.match(/force/gi)
	        && links[i].innerHTML === "Uitbouwen naar level 1 "
	        || links[i].innerHTML === "Uitbouwen naar level 2 "
	        || links[i].innerHTML === "Uitbouwen naar level 3 "
	        || links[i].innerHTML === "Uitbouwen naar level 4 "
	        || links[i].innerHTML === "Uitbouwen naar level 5 "
	        || links[i].innerHTML === "Uitbouwen naar level 6 "
	        || links[i].innerHTML === "Uitbouwen naar level 7 "
	        || links[i].innerHTML === "Uitbouwen naar level 8 "
	        || links[i].innerHTML === "Uitbouwen naar level 9 "
	        || links[i].innerHTML === "Uitbouwen naar level 10 "
	        || links[i].innerHTML === "Uitbouwen naar level 11 "
	        || links[i].innerHTML === "Uitbouwen naar level 12 "
	        || links[i].innerHTML === "Uitbouwen naar level 13 "
	        || links[i].innerHTML === "Uitbouwen naar level 14 "
	        || links[i].innerHTML === "Uitbouwen naar level 15 "
	        || links[i].innerHTML === "Uitbouwen naar level 16 "
	        || links[i].innerHTML === "Uitbouwen naar level 17 "
	        || links[i].innerHTML === "Uitbouwen naar level 18 "
	        || links[i].innerHTML === "Uitbouwen naar level 19 "
	        || links[i].innerHTML === "Uitbouwen naar level 20 ") {
		 window.location = links[i].href ;
		break;
	}
}



// baraks stable garage smith market naar level 5
for (var i=0; i < links.length; i++) {
	if (links[i].href.match(/action=build&id=baraks/gi)
	        || links[i].href.match(/action=build&id=stable/gi)
	        || links[i].href.match(/action=build&id=garage/gi)
	        || links[i].href.match(/action=build&id=smith/gi)
	        || links[i].href.match(/action=build&id=market/gi)
	        && !links[i].href.match(/force/gi)
	        && links[i].innerHTML === "Uitbouwen naar level 1 "
	        || links[i].innerHTML === "Uitbouwen naar level 2 "
	        || links[i].innerHTML === "Uitbouwen naar level 3 "
	        || links[i].innerHTML === "Uitbouwen naar level 4 "
	        || links[i].innerHTML === "Uitbouwen naar level 5 ") {
		 window.location = links[i].href ;
		break;
	}
}

//opslag naar level 25
for (var i=0; i < links.length; i++) {
	if (links[i].href.match(/action=build&id=storage/gi)
	        && !links[i].href.match(/force/gi)
	        && links[i].innerHTML === "Uitbouwen naar level 16 "
	        || links[i].innerHTML === "Uitbouwen naar level 17 "
	        || links[i].innerHTML === "Uitbouwen naar level 18 "
	        || links[i].innerHTML === "Uitbouwen naar level 19 "
	        || links[i].innerHTML === "Uitbouwen naar level 20 "
	        || links[i].innerHTML === "Uitbouwen naar level 21 "
	        || links[i].innerHTML === "Uitbouwen naar level 22 "
	        || links[i].innerHTML === "Uitbouwen naar level 23 "
	        || links[i].innerHTML === "Uitbouwen naar level 24 "
	        || links[i].innerHTML === "Uitbouwen naar level 25 "
	        || links[i].innerHTML === "Uitbouwen naar level 26 "
	        || links[i].innerHTML === "Uitbouwen naar level 27 "
	        || links[i].innerHTML === "Uitbouwen naar level 28 "
	        || links[i].innerHTML === "Uitbouwen naar level 29 "
	        || links[i].innerHTML === "Uitbouwen naar level 30 ") {
		 window.location = links[i].href ;
		break;
	}
}

//farm naar level 15
for (var i=0; i < links.length; i++) {
	if (links[i].href.match(/action=build&id=farm/gi)
	        && !links[i].href.match(/force/gi)
	        && links[i].innerHTML === "Uitbouwen naar level 6 "
	        || links[i].innerHTML === "Uitbouwen naar level 7 "
	        || links[i].innerHTML === "Uitbouwen naar level 8 "
	        || links[i].innerHTML === "Uitbouwen naar level 9 "
	        || links[i].innerHTML === "Uitbouwen naar level 10 "
	        || links[i].innerHTML === "Uitbouwen naar level 11 "
	        || links[i].innerHTML === "Uitbouwen naar level 12 "
	        || links[i].innerHTML === "Uitbouwen naar level 13 "
	        || links[i].innerHTML === "Uitbouwen naar level 14 "
	        || links[i].innerHTML === "Uitbouwen naar level 15 ") {
		 window.location = links[i].href ;
		break;
	}
}

//grondstoffen naar level 30
for (var i=0; i < links.length; i++) {
	if (links[i].href.match(/action=build&id=stone/gi)
	        || links[i].href.match(/action=build&id=wood/gi)
	        || links[i].href.match(/action=build&id=iron/gi)
	        && !links[i].href.match(/force/gi)
	        && links[i].innerHTML === "Uitbouwen naar level 21 "
	        || links[i].innerHTML === "Uitbouwen naar level 22 "
	        || links[i].innerHTML === "Uitbouwen naar level 23 "
	        || links[i].innerHTML === "Uitbouwen naar level 24 "
	        || links[i].innerHTML === "Uitbouwen naar level 25 "
	        || links[i].innerHTML === "Uitbouwen naar level 26 "
	        || links[i].innerHTML === "Uitbouwen naar level 26 "
	        || links[i].innerHTML === "Uitbouwen naar level 27 "
	        || links[i].innerHTML === "Uitbouwen naar level 28 "
	        || links[i].innerHTML === "Uitbouwen naar level 29 "
	        || links[i].innerHTML === "Uitbouwen naar level 30 ") {
		 window.location = links[i].href ;
		break;
	}
}




//market naar level 20
for (var i=0; i < links.length; i++) {
	if (links[i].href.match(/action=build&id=market/gi)
	        && !links[i].href.match(/force/gi)
	        && links[i].innerHTML === "Uitbouwen naar level 6 "
	        || links[i].innerHTML === "Uitbouwen naar level 7 "
	        || links[i].innerHTML === "Uitbouwen naar level 8 "
	        || links[i].innerHTML === "Uitbouwen naar level 9 "
	        || links[i].innerHTML === "Uitbouwen naar level 10 "
	        || links[i].innerHTML === "Uitbouwen naar level 11 "
	        || links[i].innerHTML === "Uitbouwen naar level 12 "
	        || links[i].innerHTML === "Uitbouwen naar level 13 "
	        || links[i].innerHTML === "Uitbouwen naar level 14 "
	        || links[i].innerHTML === "Uitbouwen naar level 15 "
	        || links[i].innerHTML === "Uitbouwen naar level 16 "
	        || links[i].innerHTML === "Uitbouwen naar level 17 "
	        || links[i].innerHTML === "Uitbouwen naar level 18 "
	        || links[i].innerHTML === "Uitbouwen naar level 19 "
	        || links[i].innerHTML === "Uitbouwen naar level 20 ") {
		 window.location = links[i].href ;
		break;
	}
}


//farm naar level 30
for (var i=0; i < links.length; i++) {
	if (links[i].href.match(/action=build&id=farm/gi)
	        && !links[i].href.match(/force/gi)
	        && links[i].innerHTML === "Uitbouwen naar level 16 "
	        || links[i].innerHTML === "Uitbouwen naar level 17 "
	        || links[i].innerHTML === "Uitbouwen naar level 18 "
	        || links[i].innerHTML === "Uitbouwen naar level 19 "
	        || links[i].innerHTML === "Uitbouwen naar level 20 "
	        || links[i].innerHTML === "Uitbouwen naar level 21 "
	        || links[i].innerHTML === "Uitbouwen naar level 23 "
	        || links[i].innerHTML === "Uitbouwen naar level 24 "
	        || links[i].innerHTML === "Uitbouwen naar level 25 "
	        || links[i].innerHTML === "Uitbouwen naar level 26 "
	        || links[i].innerHTML === "Uitbouwen naar level 27 "
	        || links[i].innerHTML === "Uitbouwen naar level 28 "
	        || links[i].innerHTML === "Uitbouwen naar level 29 "
	        || links[i].innerHTML === "Uitbouwen naar level 30 ") {
		 window.location = links[i].href ;
		break;
	}
}



//farm naar level 15
for (var i=0; i < links.length; i++) {
	if (links[i].href.match(/action=build&id=smith/gi)
	        && !links[i].href.match(/force/gi)
	        && links[i].innerHTML === "Uitbouwen naar level 6 "
	        || links[i].innerHTML === "Uitbouwen naar level 7 "
	        || links[i].innerHTML === "Uitbouwen naar level 8 "
	        || links[i].innerHTML === "Uitbouwen naar level 9 "
	        || links[i].innerHTML === "Uitbouwen naar level 10 "
	        || links[i].innerHTML === "Uitbouwen naar level 11 "
	        || links[i].innerHTML === "Uitbouwen naar level 12 "
	        || links[i].innerHTML === "Uitbouwen naar level 13 "
	        || links[i].innerHTML === "Uitbouwen naar level 14 "
	        || links[i].innerHTML === "Uitbouwen naar level 15 "
	        && links[i].innerHTML === "Uitbouwen naar level 16 "
	        || links[i].innerHTML === "Uitbouwen naar level 17 "
	        || links[i].innerHTML === "Uitbouwen naar level 18 "
	        || links[i].innerHTML === "Uitbouwen naar level 19 "
	        || links[i].innerHTML === "Uitbouwen naar level 20 ") {
		 window.location = links[i].href ;
		break;
	}
}




//farm naar level 15
for (var i=0; i < links.length; i++) {
	if (links[i].href.match(/action=build&id=snob/gi)
	        && !links[i].href.match(/force/gi)
	        && links[i].innerHTML === "Uitbouwen naar level 1 ") {
		 window.location = links[i].href ;
		break;
	}
}





//farm naar level 15
for (var i=0; i < links.length; i++) {
	if (links[i].href.match(/action=build&id=baraks/gi)
	        && !links[i].href.match(/force/gi)
	        && links[i].innerHTML === "Uitbouwen naar level 6 "
	        || links[i].innerHTML === "Uitbouwen naar level 7 "
	        || links[i].innerHTML === "Uitbouwen naar level 8 "
	        || links[i].innerHTML === "Uitbouwen naar level 9 "
	        || links[i].innerHTML === "Uitbouwen naar level 10 "
	        || links[i].innerHTML === "Uitbouwen naar level 11 "
	        || links[i].innerHTML === "Uitbouwen naar level 12 "
	        || links[i].innerHTML === "Uitbouwen naar level 13 "
	        || links[i].innerHTML === "Uitbouwen naar level 14 "
	        || links[i].innerHTML === "Uitbouwen naar level 15 "
	        && links[i].innerHTML === "Uitbouwen naar level 16 "
	        || links[i].innerHTML === "Uitbouwen naar level 17 "
	        || links[i].innerHTML === "Uitbouwen naar level 18 "
	        || links[i].innerHTML === "Uitbouwen naar level 19 "
	        || links[i].innerHTML === "Uitbouwen naar level 20 "
	        || links[i].innerHTML === "Uitbouwen naar level 21 "
	        || links[i].innerHTML === "Uitbouwen naar level 22 "
	        || links[i].innerHTML === "Uitbouwen naar level 23 "
	        || links[i].innerHTML === "Uitbouwen naar level 24 "
	        || links[i].innerHTML === "Uitbouwen naar level 25 ") {
		 window.location = links[i].href ;
		break;
	}
}






//farm naar level 15
for (var i=0; i < links.length; i++) {
	if (links[i].href.match(/action=build&id=stable/gi)
	        && !links[i].href.match(/force/gi)
	        && links[i].innerHTML === "Uitbouwen naar level 6 "
	        || links[i].innerHTML === "Uitbouwen naar level 7 "
	        || links[i].innerHTML === "Uitbouwen naar level 8 "
	        || links[i].innerHTML === "Uitbouwen naar level 9 "
	        || links[i].innerHTML === "Uitbouwen naar level 10 "
	        || links[i].innerHTML === "Uitbouwen naar level 11 "
	        || links[i].innerHTML === "Uitbouwen naar level 12 "
	        || links[i].innerHTML === "Uitbouwen naar level 13 "
	        || links[i].innerHTML === "Uitbouwen naar level 14 "
	        || links[i].innerHTML === "Uitbouwen naar level 15 "
	        && links[i].innerHTML === "Uitbouwen naar level 16 "
	        || links[i].innerHTML === "Uitbouwen naar level 17 "
	        || links[i].innerHTML === "Uitbouwen naar level 18 "
	        || links[i].innerHTML === "Uitbouwen naar level 19 "
	        || links[i].innerHTML === "Uitbouwen naar level 20 ") {
		 window.location = links[i].href ;
		break;
	}
}

