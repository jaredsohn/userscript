// ==UserScript==
// @name           Betaseries With Binsearch, Newzleech, and others
// @namespace      Doudou
// @description    Add a link to BinSearch or other newsgroups search
// @include        http://www.betaseries.com/compte/episodes*
// @include        http://www.betaseries.com/membres/*/planning*
// ==/UserScript==

var binsearch_img = "data:application/octet-stream;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAABMLAAATCwAAAAAAAAAAAABAQED/QEBA/0BAQP9AQED/QEBA/0BAQP9AQED/QEBA/0BAQP9AQED/QEBA/0BAQP9AQED/QEBA/0BAQP9AQED/QEBA/0BAQP9AQED/QEBA/0BAQP9AQED/QEBA/0BAQP9AQED/QEBA/0BAQP9AQED/QEBA/0BAQP9AQED/QEBA/0BAQP9AQED/QEBA/0BAQP9AQED/QEBA/0BAQP9AQED/ZGRk/3BwcP9MTEz/QEBA/0BAQP9AQED/QEBA/0BAQP9AQED/QEBA/0BAQP9AQED////////////Pz8//w8PD////////////8/Pz/3BwcP9AQED/QEBA/0BAQP9AQED/QEBA/0BAQP9AQED/QEBA//////////////////Pz8//b29v////////////z8/P/TExM/0BAQP9AQED/QEBA/0BAQP9AQED/QEBA/0BAQP////////////////9wcHD/QEBA/8/Pz////////////3x8fP9AQED/QEBA/0BAQP9AQED/QEBA/0BAQP9AQED/////////////////QEBA/0BAQP+fn5////////////+fn5//QEBA/0BAQP9AQED/QEBA/0BAQP9AQED/QEBA/////////////////0BAQP9AQED/n5+f////////////n5+f/0BAQP9AQED/QEBA/0BAQP9AQED/QEBA/0BAQP////////////////+UlJT/TExM/+fn5////////////3x8fP9AQED/QEBA/0BAQP9AQED/QEBA/0BAQP9AQED//////////////////////////////////////+fn5/9AQED/QEBA/0BAQP9AQED/QEBA/0BAQP9AQED/QEBA/////////////////5+fn//z8/P//////8/Pz/9kZGT/QEBA/0BAQP9AQED/QEBA/0BAQP9AQED/QEBA/0BAQP////////////////9AQED/QEBA/0BAQP9AQED/QEBA/0BAQP9AQED/QEBA/0BAQP9AQED/QEBA/0BAQP9AQED/////////////////QEBA/0BAQP9AQED/QEBA/0BAQP9AQED/QEBA/0BAQP9AQED/QEBA/0BAQP9AQED/QEBA/8/Pz//Pz8//z8/P/0BAQP9AQED/QEBA/0BAQP9AQED/QEBA/0BAQP9AQED/QEBA/0BAQP9AQED/QEBA/0BAQP9AQED/QEBA/0BAQP9AQED/QEBA/0BAQP9AQED/QEBA/0BAQP9AQED/QEBA/0BAQP9AQED/QEBA/0BAQP9AQED/QEBA/0BAQP9AQED/QEBA/0BAQP9AQED/QEBA/0BAQP9AQED/QEBA/0BAQP9AQED/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//AAD//w%3D%3D";
var nzbindex_img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAMdJREFUeNpi/P//PwMlgImBQkCxASwC1gXlQLoDiDuBeBYQ3wXiCiB2gWIYAMkpIYndA2JXZBekoRnuCsSMQJyOpAFGm0ANC0U2QBDNRhhwQXIBDJzFFQboBoAMDQXiPUD8HkncGOYadANCcRi4B0kM5PQzUANRDNiDxfmhWJx/Dxo2IFCOzwBYmJxFcz5yOBijG/AezfkgQ1bjSQbvkQ14j+YKmPOxGSAIDcg96IG4B0tIgxIWKMPsRgrEd1ALZzEO/cwEEGAAj+EuGiSzrJQAAAAASUVORK5CYII%3D" ;
var matrix_img = "data:image/x-icon;base64,AAABAAEAEBAAAAAAAABoBQAAFgAAACgAAAAQAAAAIAAAAAEACAAAAAAAAAEAAAAAAAAAAAAAAAEAAAAAAAAAAAAA////AJU2MQDgx7gAuHxbAJY3KwDr29IApldBAMGNcQD48+8A0KakAPjx7wC9hWYArmZSAMKPcgCsYk8Asm9XALp/XgCKHxoAtXNvAMaShgDBjXIApFFMAIMkGgDMnpIA9OvlANq6sgCfSTQAwIttAGsPDQD7+fkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQEIDxoBAQEBAQEBAQEBAQEBERcbGxsLAQEBAQEBAQEBERERGxsbGxsbAQEBAQEBAxERERAbGxsbGxsBAQEBARERERERGxsbGxsbGAEBARwREREREQwbGxsbGxsBARkRERERERERDRsbGxsbGwEREREREREREREbGxsbGxsUCREREREREREFEhISEhISFgEOEREREREEEhISEhISEhMBAREREREREhISEhISEhIBAQEGERERBxISEhISEhIBAQEBARERERISEhISEhIKAQEBAQEBER0SEhISEhICAQEBAQEBARUSEhISEhISHgEBAf//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA%3D";

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
return ' <a href="http://nzbindex.nl/search/?q='+titre
+'&age=&max=25&sort=agedesc&minsize=&maxsize=&poster=&nfo=&hidespam=0&hidespam=1&more=0" border="0" target="_blank">'
+'<img src="'+ nzbindex_img +'" alt="NBZIndex" title="NBZIndex" border="0"></a> '+

' <a href="http://nzbmatrix.com/nzb-search.php?search='+titre
+'&cat=0" border="0" target="_blank"><img src="'+matrix_img+'" alt="NZBMatrix" title="NZBMatrix" border="0"></a> '+

'<a href="http://binsearch.info/?max=250&adv_age=&q='+titre
			+'" border="0" target="_blank"><img src="'+binsearch_img+'" alt="binSearch" title="binSearch" border="0"></a>';

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
			if ($("td[class='srt dble']:eq("+j+") div").html().search("binSearch") == -1) {
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
			if ($("td[class='srt dble']:eq("+j+") div").html().search("binSearch") == -1) {
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
