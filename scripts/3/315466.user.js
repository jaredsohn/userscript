// ==UserScript==
// @name       FB Auto-Poker
// @namespace  https://www.facebook.com/pokes
// @version    0.2
// @description  Automatically poke back your friends on facebook without doing anything.
// @match      *://*.facebook.com/*
// @copyright  mhetralla
// ==/UserScript==

//controlling functions
function istrue(temp) {
	if (temp == "true"
	 || temp == 1 
	 || temp == true)
		return true;
	else return false;
}

function ls(v) {//get var from localstorage
	var temp = sett[v];
	if (temp == undefined)
		return false;
	
	return temp;
}

function directPoke(userid) {
	//make link to 'manual poke'
	var pokeA = document.createElement("a");
	var pokeButton = document.createElement("input");
	
	pokeA.className = "itemAnchor";
	pokeA.setAttribute("role","menuitem");
	pokeA.setAttribute("tabindex","-1");
	pokeA.setAttribute("href","#");
	pokeA.setAttribute("ajaxify","/ajax/poke_dialog.php?uid=" + userid + "&amp;pokeback=0&amp;ask_for_confirm=0");
	pokeA.setAttribute("rel","dialog-post");
	document.getElementById("mainContainer").appendChild(pokeA);
	
	//click on link
	eve1 = document.createEvent('MouseEvents');
	eve1.initEvent( 'click', true, true );
	pokeA.dispatchEvent(eve1);
		
	//wait 5 secs to click on pop-up box
	setTimeout(function() {
		var pokeBut = document.getElementsByClassName("dialog_buttons_msg")[0].parentNode.childNodes[1].childNodes[0].childNodes[0];
			
		eve2 = document.createEvent('MouseEvents');
		eve2.initEvent( 'click', true, true );
		pokeBut.dispatchEvent(eve2);
	}, 5000);
}

function pokeFromArray(array) {
	for(var i=0; i<array.length; i++) {
		var e = array[i];
		if ( (e.getAttribute('rel') == 'async-post') && (e.getAttribute("ajaxify").substring(0,13) == "/pokes/inline") && !(e.getAttribute("ajaxify").indexOf("suggestion") > -1) && !(e.getAttribute("ajaxify").indexOf("is_hide=1") > -1) ) {
			var temp = e.getAttribute("ajaxify"),
				i1 = temp.indexOf("uid="),
				i2 = temp.indexOf("&"),
				uid = temp.substring(i1+4, i2);
				//directPoke(uid);
			
				eve = document.createEvent('MouseEvents');
				eve.initEvent( 'click', true, true );
				e.dispatchEvent(eve);
				console.log(e);
		}
	}
}

function pokeAll() {
	//poke 'em
	pokeFromArray(document.getElementsByClassName("_42ft"));
}

function looper() {
	if (istrue(ls("fapglobal"))) {
		//autopoke
		if (tempCD <= 0) {
			pokeAll();
			tempCD = ls("fapCDpoke");
		} else tempCD -= 50;
	}

	setTimeout(looper, 50);
}

/////////////
////INIT////
///////////

//default vars for 0.7 only
var sett = new Array();
var tempCD = 0;
var checkPopUpCss = 0;

sett["fapCDpoke"] = 3000;
sett["fapglobal"] = true;
sett["faphls"] = true;


setTimeout(looper, 10);