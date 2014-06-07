// ====================================================================================================
// Namn: DSClean
// Beskrivning: Greasemonkey-extension till Mozilla Firefox
// Uppgift: att göra DSC-forumet till en trevligare plats
// Version: 0.4
// Skapare: kotscho
// Licens: fildela inte JavaScript!
// ====================================================================================================

// ----------------------------------------------------------------------------------------------------
// INSTÄLLNING 1: HUR MÅNGA OCH VILKA ÄR PERSONERNA VARS INLÄGG DU VILL SLIPPA?
// ----------------------------------------------------------------------------------------------------
var antal_puckos = 1; // eller 2, eller 3, eller 4, ...
var puckos = new Array(antal_puckos);
puckos[0] = "Wunderkind";
// ... om du har fler, lägg till så här:
// puckos[1] = "kotscho";
// puckos[2] = "nån_annan_jag_inte_gillar"
// o s v


// ----------------------------------------------------------------------------------------------------
// INSTÄLLNING 2: GÖM ANNONSER TILL HÖGER?
// var gom_annonser = 0;
// = annonser göms ej
//
// var gom_annonser = 1;
// = gissa!
// ----------------------------------------------------------------------------------------------------
var gom_annonser = 1;


// ----------------------------------------------------------------------------------------------------
// INSTÄLLNING 3: GÖM PERMALÄNKAR?
// var gom_permalinks = 0;
// = som vanligt
//
// var gom_permalinks = 1;
// = alla permalänkar göms, utom de vid dina inlýgg (så du fortfarande kan redigera)
// ----------------------------------------------------------------------------------------------------
var gom_permalinks = 1;


// ----------------------------------------------------------------------------------------------------
// INSTÄLLNING 4: VILKEN BAKGRUNDSBILD I TOPPEN?
// var toppbakgrund = 'http://min.hemsida.se/finbild.jpg';
// = din egna bild. OBS! Bilden ska helst vara 980x170 pixlar stor
//
// var toppbakgrund = 'blank';
// = ingen bild alls (vitt istället)
// ----------------------------------------------------------------------------------------------------
var toppbakgrund = 'blank';


// ====================================================================================================
// Nu kan den vanliga användaren sluta pilla - inga fler inställningar!
// ====================================================================================================
// ==UserScript==
// @name          DSClean
// @description	  kotscho fixar till DSC
// @include       http://dagensskiva.com/forumet/*
// ==/UserScript==
var left_comments = getElementsByClassName(document, "dd", "commentator");
hideUnwantedElements(left_comments, false);

var comments = getElementsByClassName(document, "span", "poster");
hideUnwantedElements(comments, true);

if( gom_annonser == 1 ) {
	var ads = getElementsByClassName(document, "div", "ad");
	for( var i=0; i<ads.length; i++ ) {
		ads[i].style.display = 'none';
	}
}

if( gom_permalinks == 1 ) {
	// så länge DSC inte ändrar sin kod för att skriva ut den inloggade användaren kommer det funka att luska fram den inloggade användaren
	// på följande sätt, annars kommer man eventuellt behöva lägga in det i inställningarna. bara jobbigt om man har ett flertalet troll.
	var loginName = getElementsByClassName(document, "p", "login")[0].innerHTML;
	loginName = loginName.substring(13, loginName.length-1);
	loginName = loginName.substring(0, loginName.indexOf('!'));
		
	var permalinks = getElementsByClassName(document, "p", "postPermalink");
	for( var i=0; i<permalinks.length; i++ ) {
		if( permalinks[i].parentNode.nextSibling.nextSibling.childNodes[1].innerHTML != loginName )
			permalinks[i].style.display = 'none';
	}
}

if( toppbakgrund != '' ) {	
	var head = document.getElementById('head');
	if( toppbakgrund == 'blank' )
		head.style.backgroundImage = 'none';
	else
		head.style.backgroundImage = 'url('+toppbakgrund+')';
}

function hideUnwantedElements(arrElements, linkPossible) {
	for( var i=0; i<arrElements.length; i++ ) {
		for( var j=0; j<antal_puckos; j++ ) {
			var posterName = arrElements[i].innerHTML;
			
			if( linkPossible ) {
				if( posterName.indexOf("<a") > -1 )	
					posterName = posterName.substring(posterName.indexOf(">")+1, posterName.lastIndexOf("<"));
			}

			if( posterName == puckos[j] ) {
				var li = arrElements[i].parentNode.parentNode;
				li.style.display = 'none';
			}
		}
	}
}

function getElementsByClassName(oElm, strTagName, strClassName){
	var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
	var arrReturnElements = new Array();
	strClassName = strClassName.replace(/-/g, "\-");
	var oRegExp = new RegExp("(^|\s)" + strClassName + "(\s|$)");
	var oElement;
	for(var i=0; i<arrElements.length; i++){
		oElement = arrElements[i];
		if(oRegExp.test(oElement.className)){
			arrReturnElements.push(oElement);
		}
	}
	return (arrReturnElements)
}