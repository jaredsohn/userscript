// ==UserScript==
// @run-at 			document-start
// @name			Kong page cleaner
// @namespace		tag://kongregate
// @description		Clean any Kong game page (take off part you usually don't need - use wisely includes and excludes to get best results)
// @author			YepoMax
// @version			0.1
// @date			12/26/2013
// @grant			none
// @include         *kongregate.com/games/*
// ==/UserScript==




function cleankong(){
	try{
		cleansedpage = true;
		var headk = document.getElementById("kong_game_af_728x90-ad-slot");
		headk.parentNode.removeChild(headk);
		var categs = document.getElementById("gamepage_categories_list");
		categs.parentNode.removeChild(categs);
		var title = document.getElementsByTagName("h1")[0];
		title.parentNode.removeChild(title);
		// var newhead = document.getElementsByClassName("gamepage_header_outer")[0];
		// newhead.parentNode.removeChild(newhead); <--- powerful ! but ugly =p
		var subk = document.getElementById("subwrap");
		subk.parentNode.removeChild(subk);
		// var busker = document.getElementsByClassName("game_page_wrap")[0];
		// busker.parentNode.removeChild(busker);
		var busker = document.getElementById("below_fold_content");
		busker.parentNode.removeChild(busker);
		var busk_2 = document.getElementsByClassName("game_details_outer")[0];
		busk_2.parentNode.removeChild(busk_2);
		return true;
	}catch(err){console.log(err); return false;}
}

function start_cleaning( tries ){

	if(tries < 32){
		if(cleankong()){
			console.log("Page cleansed !");
		}else{
			setTimeout(function(){ start_cleaning(tries + 1); }, 200);
		}
	}

}

setTimeout( function(){start_cleaning(0);}, 300 );