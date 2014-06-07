// ==UserScript==
// @name           Ikariam Redesign: Shoutbox
// @author      tsartsaris
// @include	http://s*.ikariam.*/*
// @exclude	http://support.ikariam.*/*
// @exclude	http://board.*.ikariam.*/*

// ==/UserScript==

(function info()
 {
	
	
	var shoutID = GM_getValue('shoutboxid','999999')
	if(shoutID=='999999'){
	
	var shId = prompt("What is your shoutbox ID", "Type your shoutbox ID here");
	GM_setValue('shoutboxid', shId);
		 }
		 
	var chatHTML = '<div id="shoutboxbox" style="padding:5px; z-index: 1;"><iframe src="http://'+shoutID+'.myshoutbox.com/" width="95%" height="400" frameborder="1" marginwidth="1"  marginheight="1" align="center" border="1" allowTransparency="true"></iframe></div>'
	var bId=document.body.id
	if (bId=='city'){
		var inforHTML = document.getElementById('information').innerHTML 
		document.getElementById('information').innerHTML=chatHTML + inforHTML
		}
	else if(bId=='militaryAdvisorMilitaryMovements'){
		var milHTML = document.getElementById('viewMilitaryImperium').innerHTML 
		document.getElementById('viewMilitaryImperium').innerHTML=chatHTML + milHTML
	}
	else if(bId=='island'){
		var info1=document.getElementById("infocontainer").innerHTML
		document.getElementById('infocontainer').innerHTML=chatHTML + info1
	}
	else if(bId=='researchAdvisor'){
		var info2=document.getElementById("viewResearchImperium").innerHTML
		document.getElementById('viewResearchImperium').innerHTML=chatHTML + info2
	}
	else if(bId=='diplomacyAdvisor'){
		var info3=document.getElementById("viewDiplomacyImperium").innerHTML
		document.getElementById('viewDiplomacyImperium').innerHTML=chatHTML + info3
	}
	else if(bId=='tradeAdvisor'){
		var info4=document.getElementById("viewCityImperium").innerHTML
		document.getElementById('viewCityImperium').innerHTML=chatHTML + info4
	}

	else if(bId=='worldmap_iso'){
		var info5=document.getElementById("navigation").innerHTML
		document.getElementById('navigation').innerHTML=chatHTML + info5
	}
  
	
	 
	 
}
	 
	 
 )();

