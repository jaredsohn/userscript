// ==UserScript==
// @name Youtube Center Aligner for Opera
// @description Aligns the new YouTube layout to the center
// @include http://youtube.com/*
// @include http://www.youtube.com/*
// @include https://youtube.com/*
// @include https://www.youtube.com/*
// @exclude http://youtube.com/user/*
// @exclude https://youtube.com/user/*
// @exclude http://www.youtube.com/user/*
// @exclude https://www.youtube.com/user/*
// @version 1.7.1
// ==/UserScript==

window.addEventListener("load", function() {

// IGAZITASOK
// alap igazitas
document.body.className = 'ltr presto presto-2 site-center-aligned exp-new-site-width exp-watch7-comment-ui hitchhiker-enabled guide-enabled guide-expanded';

// keresesi oldal igazitasa
if(document.URL.indexOf("youtube.com/results") >= 0){ 
	document.getElementById("page").setAttribute('style','width: 1003px; margin-left: auto; margin-right: auto');
}

// login button igazitas
if(document.getElementById('yt-masthead-signin') != null){
	document.getElementById('yt-masthead-signin').setAttribute('style','margin-right: 45px');
}

// keresosav meretezese, igazitasa betolteskor
var wS = window.innerWidth;
var posS = Math.round((wS - 1003) / 2) + 171;
document.getElementById('yt-masthead-content').setAttribute('style','margin-left: ' + posS + 'px; width: 640px');

// logo
var wi = window.innerWidth;
var posi = Math.round((wi - 640) / 2) - 190;
document.getElementById('logo-container').setAttribute('style','left: ' + posi + 'px');

// logo es sb atmeretezeskor
window.onresize = function(){
	// logo igazitasa
	wi = window.innerWidth;
	posi = Math.round((wi - 640) / 2) - 190;
	document.getElementById('logo-container').setAttribute('style','left: ' + posi + 'px');
	
	// searchbar igazitasa
	wS = window.innerWidth;
	posS = Math.round((wS - 1003) / 2) + 171;
	document.getElementById('yt-masthead-content').setAttribute('style','margin-left: ' + posS + 'px; width: 640px');
}

// username igazitasa
if(document.getElementById('yt-masthead-user') != null){
	var userWidth = document.getElementById('yt-masthead-user').offsetWidth;
	document.getElementById('yt-masthead-user').setAttribute('style','margin-right: ' + (183 - userWidth) + 'px');
}

// footer igazitasa
if(document.getElementById('footer-container') != null){
	document.getElementById('footer-container').setAttribute('align','center');
}

// watch oldal igazitasa
if(document.URL.indexOf("/watch?") >= 0){
	// ablakszelesseg lekerese
	var w = window.innerWidth;
	
	// guide allando igazitasa
	function guideAligner(){
		if(document.getElementById('guide-container') != null){
			document.getElementById('guide-container').setAttribute('style','margin-left: -90px');
		}
	}
	document.addEventListener("DOMNodeInserted", function() {guideAligner()}, false);
	
	// guide allapotanak figyelese		
	function guideChecker(){
		if(document.getElementById('guide-main') != null){				
			if(document.getElementById('guide-main').className == "guide-module spf-nolink collapsed"){
				var posPc = Math.round((w - 970) / 2) - 80;
				document.getElementById('page').setAttribute('style','margin-left: ' + posPc + 'px');
				document.getElementById('guide-container').setAttribute('style','margin-left: -117px');
			}
			
			if(document.getElementById('guide-main').className == "guide-module spf-nolink"){
				var posPc = Math.round((w - 970) / 2) - 107;
				document.getElementById('page').setAttribute('style','margin-left: ' + posPc + 'px');
			}
		}
	}
	document.addEventListener("DOMNodeInserted", function() {guideChecker()}, false);
	
	// sb
	var posS = Math.round((w - 1003) / 2) + 7;
	document.getElementById('yt-masthead-content').setAttribute('style','left: ' + posS + 'px; width: 640px; position: absolute');
	
	// logo
	var posL = Math.round((w - 640) / 2) - 352;
	document.getElementById('logo-container').setAttribute('style','left: ' + posL + 'px');

	// page igazitasa
	var posP = Math.round((w - 970) / 2) - 107;
	document.getElementById('page').setAttribute('style','margin-left: ' + posP + 'px');

	
	// atmeretezeskori igazitasok
	window.onresize = function(){
		// ablakszelesseg lekerese
		var wr = window.innerWidth;
				
		// guide allapotanak figyelese			
		function guideCheckerr(){
			if(document.getElementById('guide-main') != null){				
				if(document.getElementById('guide-main').className == "guide-module spf-nolink collapsed"){
					var posPcr = Math.round((wr - 970) / 2) - 80;
					document.getElementById('page').setAttribute('style','margin-left: ' + posPcr + 'px');
					document.getElementById('guide-container').setAttribute('style','margin-left: -117px');
				}
				
				if(document.getElementById('guide-main').className == "guide-module spf-nolink"){
					var posPcr = Math.round((wr - 970) / 2) - 107;
					document.getElementById('page').setAttribute('style','margin-left: ' + posPcr + 'px');
				}
			}
		}
		document.addEventListener("DOMNodeInserted", function() {guideCheckerr()}, false);
		
		// searchbar igazitasa
		var posSr = Math.round((wr - 1003) / 2) + 7;
		document.getElementById('yt-masthead-content').setAttribute('style','left: ' + posSr + 'px!important; width: 640px; position: absolute');
		
		// logo igazitasa
		var posLr = Math.round((wr - 640) / 2) - 352;
		document.getElementById('logo-container').setAttribute('style','left: ' + posLr + 'px');
		
		// page igazitasa
		if(document.getElementById('guide-main').className == "guide-module spf-nolink collapsed"){
			var posPcr = Math.round((wr - 970) / 2) - 80;
			document.getElementById('page').setAttribute('style','margin-left: ' + posPcr + 'px');
		}
		else{
			var posPr = Math.round((wr - 970) / 2) - 107;
			document.getElementById('page').setAttribute('style','margin-left: ' + posPr + 'px');
		}
	}
}


// RENDEZES
// parameterek lekerese
function url_query( query ) {
	query = query.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var expr = "[\\?&]"+query+"=([^&#]*)";
	var regex = new RegExp( expr );
	var results = regex.exec( window.location.href );
	if ( results !== null ) {
		return results[1];
	} else {
		return false;
	}
}

// listaelem hozzafuzese
function insertItem(myid,position,newListItem) {
    var ul = document.getElementById(myid);
    var li = document.createElement("li");
    li.innerHTML=newListItem;
    ul.insertBefore(li, ul.getElementsByTagName("li")[position]);
}

if(((document.URL.indexOf("search_type=search_users") >= 0 || document.URL.indexOf("search_type=search_playlists") >= 0)== false ) && document.URL.indexOf("youtube.com/results") >= 0){ 
	document.getElementById('filter-dropdown').getElementsByTagName('ul')[0].setAttribute('id','wanted');
	var search = url_query('search_query');
	insertItem('wanted',5,'<li id="sortbydate" class="filter"><a href="/results?&search_sort=video_date_uploaded&search_type=videos&search_query=' + search + '" class="filter"><span class="filter-text"><img src="http://drk.clans.hu/gray.png" style="margin-right: 4px;">Sort by date</span></a></li>');
}

// listaelem kiemelese
if(document.URL.indexOf("search_sort=video_date_uploaded") >= 0){ 
	var search = url_query('search_query');
	document.getElementById('sortbydate').innerHTML = '<a class="filter filter-toolbelt filter-selected" href="results?&search_type=videos&search_query=' + search + '"><span style="cursor: pointer; text-decoration: underline" class="filter-text"><img src="http://drk.clans.hu/green.png" style="margin-right: 3px;">Sort by date</span></a>';
}


}, false);