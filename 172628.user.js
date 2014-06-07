// ==UserScript==
// @name       Omerta 4.X
// @namespace  Stripes
// @version    0.1
// @description  Helps Omerta gameplay
// @match      http://barafranca.com/game.php*
// @match      http://barafranca.com.pt/game.php*
// @match      http://deathmatch.barafranca.com/game.php*
// @match      http://www.barafranca.com/game.php*
// @match      http://www.barafranca.com.pt/game.php*
// @match      http://www.deathmatch.barafranca.com/game.php*
// @copyright  2013, Miguel Pasadinhas
// ==/UserScript==

/*

	Global Variables
	
*/

var hash;

/* 

	Extend jQuery and Javascript plus other utilitties
	
*/

$.fn.exists = function () {
    return this.length !== 0;
};

String.prototype.toInt = function(){ 
	return parseInt(this, 10); 
}

function log(msg){ 
	console.log("Omerta Stripes Script: " + msg); 
}

/* 

	Constants 

*/

var constants = {
	
	minCrimePercent: "40%",

}

var pages = {
    
	crime:{ 	hash:	"#./BeO/webroot/index.php?module=Crimes",
			el:	"form[name=crime]",
			name:	"Crimes",
			func:	crimePage,
	},
	
	cars:{		hash:	"#./BeO/webroot/index.php?module=Cars",
			el:	"form[name=car]",
			name:	"Nick a car",
			func:	nickCarPage,
	},

	smugg:{		hash:	"#./smuggling.php",
			el:	"form[action=\"smuggling.php\"]",
			name:	"Smuggling",
			func:	smuggPage,
	},
	
	kill:{		hash:	"#./kill.php",
			el:	"form[action=\"kill.php\"]",
			name:	"Kill",
			func:	killPage,
	},
}

var smugg = {

	booze : ['wine', 'cognac', 'whiskey', 'amaretto', 'beer', 'port', 'rum'] ,
	
	narcs : ['morphine', 'heroin', 'opium', 'cocaine', 'marihuana', 'tabacco', 'glue']
	
}

/* 

	On Omerta Load script
	
*/

$(document).ready(function(){

	omertaOnLoad();
	
});

function omertaOnLoad(){

	if( $("#game_menu").exists() && $("#game_container").exists() && $("input[name=nick]").exists() ){
	
		// Omerta is loaded
		log("Omerta is loaded!!!");
		
		setAccessKeys();
		asyncPageHandler(window.location.hash);
	
	} else {
	
		log("Omerta isn't loaded yet...");
		setTimeout( function(){ omertaOnLoad(); }, 100);
	
	}
	
}

function setAccessKeys(){
	
	$("#game_menu a[href$=Lackeys]").attr("accesskey", "L"); // Lackeys - L
	$("#game_menu a[href*=races]").attr("accesskey", "R") // Races - R
	$("#game_menu a[href*=obay]").attr("accesskey", "O") // Obay - O
	
	
}

/*

	Script that runs on page change
	
*/

$(window).on('hashchange', function() {
    
	hash = window.location.hash ;

	log("Handle page (async): " + hash);

	asyncPageHandler(hash);
    
});


/*

	Functions

*/

function asyncPageHandler(localHash){
	
	var page = null;
	
	log("Detect page");
	for(var objProp in pages) {
		if(pages.hasOwnProperty(objProp)){
			if( localHash == pages[objProp].hash ){
				log("Page detected! -> " + pages[objProp].name);
				page = pages[objProp];
				break;
			}
		}
	}
	
	if( page !== null ){
		pageLoadedWait(page, 0);
		return;
	}
	
	log("404 Page Not Found");
	return;
	
}

function pageLoadedWait(page, timer){
	if ( $(page.el).exists() ) {
		log("Page is loaded!");
		page.func();
		return;
	} else if ( timer > 30 ) {
		return;
	} else {
		timer++;
		log("Page not loaded. Timer is now " + timer);
		setTimeout(function(){pageLoadedWait(page, timer);},100);
	}
}

/*

	Pages Handler

*/

function crimePage(){

	log("Selecting best crime with more than " + constants.minCrimePercent);
	
	for( var i = 0 ; i < 5 ; i++ ){
		if( $("tbody:eq(1) tr:even:eq("+i+") td:eq(2)").html().toInt() > constants.minCrimePercent.toInt() ){
			$("tbody:eq(1) tr:even:eq("+i+") td:eq(0) input").click();
		}
	}
}

function nickCarPage(){
	
	log("Selecting best car nick option");
	
	var percent = "0%";
	
	for( var i = 0 ; i < 4 ; i++ ){
		if( $("tbody:eq(1) tr:even:eq("+i+") td:eq(2)").html().toInt() > percent.toInt() ){
			percent = $("tbody:eq(1) tr:even:eq("+i+") td:eq(2)").html();
			log("Car Option #" + (i+1) + " selected. Success: " + percent)
			$("tbody:eq(1) tr:even:eq("+i+") td:eq(0) input").click();
		}
	}
	
}

function smuggPage(){

	var n_booze = $("span[value]:eq(0)").attr("value");
	var n_narcs = $("span[value]:eq(1)").attr("value");
	var ammount;
	var sell_b = false;
	var sell_n = false;
	
	log("Max booze: "+n_booze);
	log("Max narcs: "+n_narcs);
	
	for( i = 0 ; i < 7 ; i++ ){
		ammount = $("table[class=\"thinline\"]:eq(0) tbody tr:gt(2):eq("+i+") td:eq(2)").html();
		log("Booze #"+i+" -> " + ammount);
		if(ammount > 0){
			sell_b = true;
			$("table[class=\"thinline\"]:eq(0) tbody tr:gt(2):eq("+i+") td:eq(1) input").val(ammount);
		}
	}
	
	if(sell_b == true){
		$("input[value=sellbooze]").click();
	} 

	
	for( i = 0 ; i < 7 ; i++ ){
		ammount = $("table[class=\"thinline\"]:eq(1) tbody tr:gt(2):eq("+i+") td:eq(2)").html();
		log("Narcs #"+i+" -> " + ammount);
		if(ammount > 0){
			sell_n = true;
			$("table[class=\"thinline\"]:eq(1) tbody tr:gt(2):eq("+i+") td:eq(1) input").val(ammount);
		}
	}
	
	if(sell_n == true){
		$("input[value=selldrugs]").click();
	} 
	
	if( sell_b == false && sell_n == false ) {
		log("Let's buy Rum!");
		$("table[class=\"thinline\"]:eq(0) tbody tr:gt(2):eq(6) td:eq(1) input").val(n_booze);
		log("Let's buy Cocaine!");
		$("table[class=\"thinline\"]:eq(1) tbody tr:gt(2):eq(3) td:eq(1) input").val(n_narcs);
	}
	
	log("Focus CAPTCHA");
	$("input[name=ver]").focus()
	
}

function killPage(){

	// Safehouse
	var time;
	// remove stupid text
	$("form[action*=kill]:eq(-2) td:eq(-1)").contents().eq(-3).remove()
	// add new input
	$("input[value=safehouse]").siblings("br:eq(0)").after("Cash: $<input type=\"text\" name=\"safehouse-money\" /> <br> Time: ");
	// listeners
	$("input[name=safehouse-money]").change(function(){
		time = Math.floor(Math.sqrt(($("input[name=safehouse-money]").val().toInt())/100));
		$("input[name=safehouse]").val(time);
		$("input[name=safehouse-money]").val(100*Math.pow(time,2));
	});
	
	$("input[name=safehouse]").change(function(){
		$("input[name=safehouse-money]").val(100*Math.pow($("input[name=safehouse]").val().toInt(),2));
	});

	
}
