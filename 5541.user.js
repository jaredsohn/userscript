// ==UserScript==

// @name 		ESPN FFL Reducer
// @namespace 	http://rubicore.com/espn-ffl-ruducer.user.js
// @description Hide abunch of espn junk in the ffl leagues
// @include 	http://games.espn.go.com/ffl/*
// @exclude 	http://games.espn.go.com/ffl/frontpage
// @exclude 	http://games.espn.go.com/ffl/leagueoffice*

// ==/UserScript==
(function(){
   
	$=function(id){return document.getElementById(id);}
	$t=function(name){return document.getElementsByTagName(name);}
	hide=function(id){ $(id).style.display='none'; }		
	
	hide('login');	
	hide('mainHeader');
	hide('container');
	hide('topNav');
	hide('liner');
	hide('LTwoNavBar');		
		
	//remove the bottom junk
	var tables=$t('table');
	var lastTableIndex=tables.length-1;	
	tables[lastTableIndex].style.display='none';
	tables[lastTableIndex-1].style.display='none';
	tables[lastTableIndex-2].style.display='none';				
	
	//remove all the links that lead to the sales page
	var anchors=$t('a');	
	for(var i=0;i<anchors.length;i++){ if(anchors[i].href.indexOf('purchase')>-1){anchors[i].style.display='none';}}
	
})();