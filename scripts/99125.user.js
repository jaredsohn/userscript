// ==UserScript==
// @name           fleetcomposition
// @namespace      http://userscripts.org/
// @description    fleet compositioon
// @include        http://*.astroempires.com/*
// @require		 http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js

// ==/UserScript==

var nomes=new Array(
	"Fighters",
        "Bombers",		
	"Heavy Bombers",
	"Ion Bombers",	
	"Corvette",	
	"Recycler",	
	"Destroyer",
	"Frigate",
	"Ion Frigate",
	"Outpost Ship",	
	"Scout Ship",	
	"Cruiser",	
	"Carrier",	
	"Heavy Cruiser",	
	"Battleship",	
	"Fleet Carrier",	
	"Dreadnought",	
	"Leviathan",
	"Death Star"
)

// check for fleet details table
var f2= $('table[id=fleet_overview]');
	if (f2.length!=0){
		// found a fleet details table
		// make the link
		var htm="";
		htm+="<div align='center'>";
		htm+="<a id='sumfleetdetails' href='#'>[add]</a>";
		htm+="<a id='clrfleetdetails' href='#'>[clear]</a>";
		htm+="<a id='shofleetdetails' href='#'>[show]</a>";
		htm+="</div>";
		f2.before(htm);
		document.getElementById("sumfleetdetails").addEventListener("click",function(event){sumfleetdetails();event.stopPropagation();event.preventDefault();},true);
		document.getElementById("clrfleetdetails").addEventListener("click",function(event){clrfleetdetails();event.stopPropagation();event.preventDefault();},true);
		document.getElementById("shofleetdetails").addEventListener("click",function(event){shofleetdetails();event.stopPropagation();event.preventDefault();},true);

	}






function shofleetdetails(){
	str="";
	for(i=0;i<nomes.length;i++){
		str+=nomes[i] + " : " + GM_getValue(nomes[i],0) + "\n";
	}
	alert(str);
}


function clrfleetdetails(){
	for(i=0;i<nomes.length;i++){
		GM_setValue(nomes[i],0);
	}
	$('a[id=sumfleetdetails]').each(function(){ $(this).text("[add]");});
}



function sumfleetdetails(){ //static function
	var col1,col2;
	col1="";
	col2="";
	var i=0;
	$('table[id=fleet_overview] table[class=layout listing] td').each(function(){
		var content=$(this).text();
		if (content.length>0){
			i++;
			if (Math.floor(i/2)==(i/2)){
				if (content.match('Fleet Size:')=='Fleet Size:'){
				}else{
					col2+= content + ":";
				}
					
			}else{
				col1+= content + ":";
			}
		}
	});
	fleetname=col1.split(":");
	fleetvalue=col2.split(":");
	
	for (i=0;i<fleetvalue.length;i++){

		fleetvalue[i]=fleetvalue[i].replace(/,/g,"");
		GM_setValue(fleetname[i], 1*GM_getValue(fleetname[i],0) + 1*fleetvalue[i]) ;
	}

	
	$('a[id=sumfleetdetails]').each(function(){ $(this).text("");});


}
