// ==UserScript==
// @name           Complete Spell
// @namespace      Cody Woolaver
// @description    Automatically solves Xandra's spells. This program will run until you tell it to stop... or the next spell is found...
// @include        http://www.neopets.com/faerieland/tfr/ritual.phtml?*
// ==/UserScript==

/*
        USE THIS AT YOUR OWN DECRESSION.
        CHEATING IS AGAINST THE NEOPETS
        TOS AND I WILL TAKE NO PERSONAL
        RESPONSIBILITY IF YOUR ACCOUNT
        GETS FROZEN DUE TO THIS PROGRAM.
*/

var MIN_WAIT = 1500
var MAX_WAIT = 3000

var HTML = document.body.innerHTML;
function redirectA(){window.location = "http://www.neopets.com/faerieland/tfr/ritual.phtml?mode=search"}
function redirectB(){document.getElementById('actionForm').submit();}
function redirectC(){document.getElementsByTagName('form')[0].submit()}

var waitTime = MIN_WAIT + (Math.random() * (MAX_WAIT - MIN_WAIT))
//Start search
if (HTML.indexOf("hub_search.png") > 0){
	window.setTimeout(redirectA, waitTime)
}

else if (HTML.indexOf("Well?  Pick a spell and get deciphering!") > 0){
	regGet = HTML.match(/pickPage\((\d+)\)/)
	
	if (regGet == null){
		window.setTimeout(redirectA, waitTime)
	}else{
		pageid = regGet[1]
		document.getElementById('actionValue').value = 'page';
		document.getElementById('pageValue').value = pageid;
		window.setTimeout(redirectB, waitTime)
	}
}

else if (HTML.indexOf("value=\"See how else you can help") > 0){
	window.setTimeout(redirectC, waitTime)
}

else {
	var docheck=function(){var main=document.getElementsByClassName('pageTitleSymbol');
	var symbol;
	var symArr=[];
	
	for(var i=0; i<main.length; i++){
		symbol=/pageTitleSymbolOff(\d+)/.exec(main[i].className)[1];
		symArr.push([main[i],document.getElementsByClassName('paraSymbol'+symbol).length])
	}
	
	symArr.sort(function(a,b){return a[1]>b[1]});
	
	var mevt=document.createEvent("MouseEvents");
	
	mevt.initMouseEvent("click",true,true,window,0,0,0,0,0,false,false,false,false,0,null);
	
	setTimeout(function(){symArr[0][0].dispatchEvent(mevt)},waitTime+300);
	setTimeout(function(){symArr[1][0].dispatchEvent(mevt)},waitTime+600);
	setTimeout(function(){symArr[2][0].dispatchEvent(mevt)},waitTime+900)};
	
	docheck();
	void(0);
}