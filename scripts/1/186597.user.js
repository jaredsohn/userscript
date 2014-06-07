// ==UserScript==
// @include		http://goblinkeeper.gameforge.com/*
// @name		Ranking Fixer
// @version		1.0
// ==/UserScript==

window.onload=fix;

var rankinghref="http://goblinkeeper.gameforge.com/pl/leaderboard?page=1&inGame=1";

var szukajpoczatek="page=";
var szukajkoniec="&inGame";

//Sprawdzanie strony
function fix() {
	if(window.location.href.indexOf("goblinkeeper.gameforge.com") > -1) {
		if(window.location.href.indexOf("play") > -1) {
			fixplay();
		}
    }
    
    if(window.location.href.indexOf("goblinkeeper.gameforge.com") > -1) {
		if(window.location.href.indexOf("leaderboard") > -1) {
			fixleaderboard();
		}
    }
    
}

//Fixowanie strony z grą
function fixplay() {
	if(window.location.href.indexOf("goblinkeeper.gameforge.com") > -1) {
		if(window.location.href.indexOf("play") > -1) {
		document.getElementById("leaderboardLink").href=rankinghref;
		}
    }


	setTimeout(fixplay, 5000);
}

//Fixowanie rankingu
function fixleaderboard() {
	
	if(window.location.href.indexOf("goblinkeeper.gameforge.com") > -1) {
		if(window.location.href.indexOf("leaderboard") > -1) {
		zmienstrone();
		}
    }
    
}


function zmienstrone() {
	//Indexy w url
	urlpoczatekstrony=window.location.href.indexOf(szukajpoczatek);
	urlkoniecstrony=window.location.href.indexOf(szukajkoniec);
	
	//Określanie która strona
	ktorastrona=window.location.href.substring((urlkoniecstrony),(urlpoczatekstrony+szukajpoczatek.length));
	document.getElementById("pageBack").href="http://goblinkeeper.gameforge.com/pl/leaderboard?page="+(parseInt(ktorastrona)-1)+"&inGame=1";
	document.getElementById("pageNext").href="http://goblinkeeper.gameforge.com/pl/leaderboard?page="+(parseInt(ktorastrona)+1)+"&inGame=1";
	document.getElementById("pageBox").addEventListener("blur", zmianabox);
}

function zmianabox(){
	ktorastrona=document.getElementById("pageBox").value;
	window.location.href = "http://goblinkeeper.gameforge.com/pl/leaderboard?page="+(parseInt(ktorastrona))+"&inGame=1";
}




