// ==UserScript==
// @name           BetaSeries.com links to ThePirateBay.org
// @namespace      Hyacinthe
// @include        http://www.betaseries.com/compte/episodes*
// @include        http://www.betaseries.com/membres/*/planning*
// ==/UserScript==

var thepiratebay_img = "data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQEAYAAABPYyMiAAAABmJLR0T///////8JWPfcAAAACXBIWXMAAABIAAAASABGyWs+AAADCklEQVRIx8VVTaupURR+8BL5/p4oEcoAKR8Zysg/MFEyYMKAn2Bi6gf4+AnEQJKUKAbKQDExMUGZCCVh34H22cU595zuvXXXZLXXXu/aaz3rWesF/rPwXg2LxWKxWBCSz+fz+TxwuVwulwvA5/P5fP7PAxNCCCHsnEqlUqkUEIvFYrEY7+Nd7vXD+Xw+n8+Bdrvdbrf/XaUajUaj0bzb3xLgOI7juHdHoVAoFAqB+/1+v98BtVqtVqvZ+Xg8Ho9H5v94PB6PB0NCJBKJRKL3uN+C6nK5XC4XMJ1Op9MpEI/H4/E4UKvVarUaMJlMJpMJkEwmk8kkUK/X6/U6UCwWi8Xi1y35EoFXR4lEIpFIAK1Wq9Vqgev1er1egWw2m81mAbFYLBaLgdvtdrvdgEwmk8lkWCtfEflWyuVyuVymKTCtVCqVSuW7/VXL5XK5XE6IQCAQCATMHggEAoHAOwY/5vXhcDgcDoDZbDabzYBUKpVKpeze4XA4HA42NZQbVM7n8/l8/oQDT6gIyeVyuVyOEArlswLmGAwGg8Eg4Pf7/X4/oFKpVCoVuw+FQqFQiPlRklIxGAwGg+E9AV6/3+/3+4SEw+FwOAwUCoVCoQDIZDKZTAYYjUaj0cgCnk6n0+nEek45QzXlDN0bVPt8Pp/PBzSbzWazCQyHw+FwCHDdbrfb7bKMngkx0lgsFovFArjdbrfbDUQikUgkAng8Ho/Hw+PhCxmNRqPRiJDlcrlcLoFqtVqtVoFSqVQqldh08TqdTqfTIaTVarVaLcbedDqdTqeB2Ww2m82ASqVSqVSA/X6/3+8BnU6n0+kAu91ut9uB7Xa73W4ZB2w2m81mA0wmk8lkAna73W63Y36UIx8VbDabzWZDiNPpdDqdrMdWq9VqtQJ6vV6v1wMKhUKhUDDSUaToPqAV07H1er1erxdoNBqNRoMhmEgkEonEJ9A9Vyb9F3y2On4mg8FgMBgQ8tz9bBzH4/F4PP5N3F6v1+v1/vzhV1mv1+v1mpBoNBqNRglZrVar1erfxf9r+QU9br7mPZBOigAAAABJRU5ErkJggg==";

var debug = false ;
function elem(tag,content) {
	var ret = document.createElement(tag);
	ret.innerHTML = content;
	return ret;
}




function div(content) {
	return elem("div", content);
}

var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') { 
		window.setTimeout(GM_wait,100); 
	} else { 
		$ = unsafeWindow.jQuery; 
	}
}

GM_wait();

var nbLine = 0 ;
var nbLineCurrent = 0 ;	

function generateLink (titre) {
return '&nbsp;<a href="http://thepiratebay.org/search/'+titre
			+'/0/7/200" target="_blank"><img src="'+thepiratebay_img+'" alt="thepiratebay" title="thepiratebay" border="0" style="vertical-align:top; padding-left:2px;"></a>';

}

function searchEpi() {
		if (nbLine == 0) {
			nbLine = $("td[class='ep']").length;
			nbLineCurrent = nbLine ;
		}
		var nbLineOffset = nbLine - nbLineCurrent ;
		var lot = 4;
		var j = nbLineOffset;
		if (nbLineOffset+lot >nbLine){
			lot= nbLine - nbLineOffset;
		}
		
			var nbLineOffset = nbLine - nbLineCurrent ;
		var lot = 10;
		var j = nbLineOffset;
		if (nbLineOffset+lot >nbLine){
			lot= nbLine - nbLineOffset;
		}
		for (; j < nbLineOffset+lot ; j++) {
			var titre	= $("td[class=ep]:eq("+j+") a").attr("title"); // titre
			var episode = $("td[class=serie]:eq("+j+") div a[class='blue']").html() ; // episode [SXEYY] ...
			episode = episode.substr(1,episode.indexOf("]") - 1) ; // episode parser
			var titre = titre + " " + episode ;
			var searchIcon= generateLink(titre);
			$("td[class='srt dble']:eq("+j+")").css("width", "95px");
			$("td[class='srt dble']:eq("+j+")").css("text-align", "right");
			if ($("td[class='srt dble']:eq("+j+") div").html().search("thepiratebay") == -1) {
				$("td[class='srt dble']:eq("+j+") div").append ( elem("b",searchIcon) ); 
			}
		}	

		nbLineCurrent = nbLineCurrent - lot ;
		if (nbLineCurrent > 1) {
			setTimeout(searchEpi,10);
		}
}

function searchPlan() {
		if (nbLine == 0) {
			nbLine = $("td[class='ep']").length;
			nbLineCurrent = nbLine ;
		}
	
		var nbLineOffset = nbLine - nbLineCurrent ;
		var lot = 10;
		var j = nbLineOffset;
		if (nbLineOffset+lot >nbLine){
			lot= nbLine - nbLineOffset;
		}
		for (; j < nbLineOffset+lot ; j++) {
			var titre	= $("td[class='ep']:eq("+j+") a").attr("title"); // titre
			var episode = $("td[class='serie']:eq("+j+") div a[class='blue']").html() ; // episode [SXEYY] ...
			episode = episode.substr(1,episode.indexOf("]") - 1) ; // episode parser
			var titre = titre + " " + episode ;
			var searchIcon= generateLink(titre);	
			$("td[class='srt dble']:eq("+j+")").css("width", "95px");
			$("td[class='srt dble']:eq("+j+")").css("text-align", "right");
			if ($("td[class='srt dble']:eq("+j+") div").html().search("thepiratebay") == -1) {
				$("td[class='srt dble']:eq("+j+") div").append ( elem("b",searchIcon) ); 
			}
		}
		nbLineCurrent= nbLineCurrent - lot;
		if (nbLineCurrent > 1) {
			setTimeout(searchPlan,10);
		}
}

function start () {
	if (window.location.href.match(/episodes$/)) {
			if (debug) { GM_log("Page Episodes detected."); }
			searchEpi();					   
	}

	if (window.location.href.match(/planning/)) {
			if (debug) { GM_log("Page Planning detected."); }
			searchPlan();													  
	}
}



//hook
var oldFunctiontoggleDisplayType = unsafeWindow.toggleDisplayType;
var oldFunctionplanning_display = unsafeWindow.planning_display;
var oldFunctioncompte_episodes= unsafeWindow.compte_episodes;

unsafeWindow.planning_display = function (var1, var2) {
	var returnvalue = oldFunctionplanning_display (var1, var2);
	if (debug) { GM_log("Hooking planning_display detected."); }
	loadingPage() ;
	return returnvalue ;
}
unsafeWindow.compte_episodes = function (var1) {
	var returnvalue = oldFunctioncompte_episodes (var1);
	if (debug) { GM_log("Hooking compte_episodes detected."); }
	loadingPage() ;
	return returnvalue ;
}
unsafeWindow.toggleDisplayType = function () {
	var returnvalue = oldFunctiontoggleDisplayType ();
	if (debug) { GM_log("Hooking toggleDisplayType detected."); }
	loadingPage() ;
	return returnvalue ;
}

function loadingPage() {
	if ($("div[id='container'] div[id='contenu'] div[id='centre'] div[id='episodes_container'] p").length > 0 || $("div[id='container'] div[id='contenu'] div[id='centre'] div[id='planning_container'] p").length > 0) {
		setTimeout(loadingPage,100);
	} else { 
		if (debug) { GM_log("End Loading detected."); }
		nbLine = 0;
		start () ;
	}
	
}
loadingPage() ;
