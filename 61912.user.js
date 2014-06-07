// ==UserScript==
// @name           MythMonger AutoPlay and QuickMenu
// @namespace      Zoases
// @description    Quick Links for Traveling, Change challenge cards, autoplay
// @include        http://apps.facebook.com/mythmonger/*
// ==/UserScript==


var waitingTime = 30;

var timer_is_on=0;
var title = document.title;
var remainingTime;
var counter= 0;
var delay;

var locations=["Daphne Cove","Ecorae","Esert Village","Teds Farm","Grevel Nub Arbor","Hedge Valley","Mangled Forest","Forest Hideout","Fontis Sapienta","Ivory City","Sinkbot City","New Feron","Green Leaf Bridge","Kurston","Yorricks Requietory","Troll Pit","East Core Mines","The Temple of Five"];
var paths=[[8,10],[5,9],[3,6,17],[2],[8],[1],[2,7,9,13],[6],[0,4,9],[1,6,8,11],[0],[9,16],[13,15],[6,12],[15],[12,14],[11],[2]];
var costs=[[100,200],[100,100],[50,50,50],[50],[100],[100],[50,50,50,100],[50],[100,100,100],[100,50,100,100],[200],[100,50],[50,100],[100,50],[100],[100,100],[50],[50]];
var found =0;
var finalsteps;

//To disable the auto play feature, simply place  //  in front of the below autoTurn() and remove the // in front of menu()
autoTurn();
//menu();


// countdown & auto submit function
function timedCount(cc,action, detail)
{
//alert(cc+action+ detail);
	var dd
	cc=cc-1;
	if (action == "GetTimer")
	{
		remainingTime = unsafeWindow.a79378246206_remainingActiveTurnWaitSeconds;
		document.title=Math.floor(cc/60)+"m "+cc%60+ "s -> "+ action + " | "+ detail+ Math.floor(remainingTime) + " | "+title;
	}
	else
	{
		document.title=Math.floor(cc/60)+"m "+cc%60+ "s -> "+ action + " | "+ detail+ " | "+title;
	}

	if (cc > 0)
	{
		dd = window.setTimeout(function () { (timedCount)(cc,action,detail)},1000);
	}
	else
	{
		if (action == "Play")
		{
			dd = window.setTimeout(function () {document.location = 'http://apps.facebook.com/mythmonger/turn.php';} , 1000);
		}
		else if (action == "Reload")
		{
			dd = window.setTimeout(function () { window.location.href = "http://apps.facebook.com/mythmonger/"; }, 1000);
		}
		else if (action == "Submit")
		{
    			var formsa = document.getElementsByTagName('form');
    			dd = window.setTimeout(function() {formsa[2].submit();}, 1000);

			formsa = null;    
		}
		else if (action == "GetTimer")
		{
			if (remainingTime != null)
			{
				timer_is_on=0;
				autoTurn();
			}
			else
			{
				dd = window.setTimeout(function () { window.location.href = "http://apps.facebook.com/mythmonger/"; }, 1000);			
			}

		}
	}
	dd = null;
}

// timer check
function doTimer(aaa, action, detail)
{
	if (!timer_is_on)
	{
  		timer_is_on=1;
  		timedCount(aaa, action, detail);
  	}
}

/*
	getElementByClassName
	Written by Jonathan Snook, http://www.snook.ca/jonathan
	Add-ons by Robert Nyman, http://www.robertnyman.com
*/
function getElementsByClassName(oElm, strTagName, strClassName){
	var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
	var arrReturnElements = new Array();
	strClassName = strClassName.replace(/\-/g, "\\-");
	var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
	var oElement;
	for(var i=0; i<arrElements.length; i++){
		oElement = arrElements[i];
		if(oRegExp.test(oElement.className)){
			arrReturnElements.push(oElement);
		}
	}
	return (arrReturnElements)
} //100

function roundNumber(num, dec)
{
	if (num == 0)
	{
		return 0;
	}
	var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
	return result;
}


function turnprice(from,to)
{
	var dummy = [];
	var counter = 0;
	var totcost = 0; 
	found = 0;
	if (from != to) 
	{
	findpath(from,to,dummy,0,dummy)
	finalsteps.push(to);
	dummy = null;
	if (finalsteps.length > 0)
	{
		while (counter<= finalsteps.length -2)
		{
			totcost = totcost + costs[finalsteps[counter]][paths[finalsteps[counter]].indexOf(finalsteps[(counter+1)])];
			counter++;
		}
	}
	
	return totcost*100+finalsteps.length-1;
	}
	return 0;
}

function findpath(fromN,toN,find,step,last)
{
	var i=0;
	while(i<=paths[fromN].length-1)
	{
		if (found == 1) break;
		find[step] = fromN;
	  	if (paths[fromN][i] == toN)
		{
			found = 1;
			finalsteps = find.slice(0,step+1)
			break;
		}
		else
		{
			if (last.indexOf(paths[fromN][i]) == -1)
			{
				last[step]= fromN;
				findpath(paths[fromN][i],toN,find,step+1,last);
			}
		}
	i++;
	}	

}

/*
//THE LAYOUT WAS USED FROM SCRIPTMONKEY (This script is heavily modified from the original). ALL CREDIT GOES TO HIM! ORIGINAL SCRIPT- http://userscripts.org/scripts/show/58493
*/

function menu()
{

	var curloc = document.getElementsByClassName('playerStats')[0].getElementsByClassName('right')[0].getElementsByTagName('li')[1].getElementsByTagName('a')[0];
	var xcurloc = locations.indexOf(curloc.innerHTML);
	var values = document.documentElement.innerHTML.match(/factiontrianglesmall\.swf\??.*\\x26link/i)[0].match(/[0-9.]{1,9}/ig);
	

	document.getElementById('sidebar_ads').style.padding = "0 0 0 0";
	document.getElementById('sidebar_ads').style.margin = "-4em 0 0 -2em";
	document.getElementById('sidebar_ads').style.position = "relative";
	document.getElementById('sidebar_ads').style.zIndex = "13";
	document.getElementById('menubar_container').style.zIndex = "12";
	document.getElementById('menubar_container').addEventListener("mouseover",function() {this.style.zIndex = "14";},false);
	document.getElementById('menubar_container').addEventListener("mouseout", function() {this.style.zIndex = "12";},false);
	document.getElementById('sidebar_ads').addEventListener("mouseover",function() {this.style.zIndex = "99";},false);
	document.getElementById('sidebar_ads').addEventListener("mouseout", function() {this.style.zIndex = "13";},false);

	document.getElementById('sidebar_ads').innerHTML = 	'<div style= "background-color:#692510; opacity:0.9; position: fixed;">'+
		'<div>' +
		'<a href="http://apps.facebook.com/mythmonger/factiontriangle.php" style="color: #EDDBAF;text-decoration: none; font-size: 11px;" target="_top"><center>-Faction Alignment-</center></a>' +
		'<table width="100%"><tr>'+
		'<td width="30%" style = "text-align:center"><font style=" color: #1D9145; font-size: 11px;" >Nature</font></td>' +
		'<td width="30%" style = "text-align:center"><font style=" color: #FF9849; font-size: 11px;" >Technology</font></td>' +
		'<td width="40%" style = "text-align:center"><font style=" color: #4776E5; font-size: 11px;" >Magic</font></td>' +
		'</tr><tr>'+
		'<td width="30%" style = "text-align:center"><font style=" color: #1D9145; font-size: 11px;" id="nfaction"></font></td>' +
		'<td width="40%" style = "text-align:center"><font style=" color: #FF9849; font-size: 11px;" id="tfaction"></font></td>' +
		'<td width="30%" style = "text-align:center"><font style=" color: #4776E5; font-size: 11px;" id="mfaction"></font></td>' +
		'</tr></table>' +
		'</div>' +
		'<hr style="color: #EDDBAF;" /><div id="CClinks"></div>' +
		'<hr style="color: #EDDBAF;" /><div id="tlinks"></div>' +
		'<hr style="color: #EDDBAF;" /><div id="exlinks"></div>' +
		'</div>';


	var ccchange = document.getElementById('CClinks');
	var tchange = document.getElementById('tlinks');
	var exchange = document.getElementById('exlinks');




	document.getElementById('tfaction').innerHTML = '<p align = "center" style = "margin: 0 0 -.8em 0; text-align:center" >'+roundNumber(values[1] / 30, 1) + '%</p>';
	document.getElementById('nfaction').innerHTML = '<p align = "center" style = "margin: 0 0 -.8em 0; text-align:center" >'+roundNumber(values[3] / 30, 1) + '%</p>';
	document.getElementById('mfaction').innerHTML = '<p align = "center" style = "margin: 0 0 -.8em 0; text-align:center" >'+roundNumber(values[5] / 30, 1) + '%</p>';

	var astyle = '" style="color: #EDDBAF;text-decoration: none;font-size: 11px;" target="_top"';
	var alink = '<a href="http://apps.facebook.com/mythmonger/attractors.php?aat=';
	var tlink = '<a href="http://apps.facebook.com/mythmonger/travel.php?';
	var iflink = '<a href="http://apps.facebook.com/mythmonger/environment.php?type=';



	var locinfo=new Array("daphnecove","envcity","esert_village","farmer_teds_farm","grevelnubarbor","hedgevalley","hidden_forest","hidden_hideout","magiccity","neurtralcity","sinkbot_city","techcity","green_bridge","kurston","tombstone","troll_pit","eastcoremine","templeoffive");

	var temp ='';
	ccchange.style.padding = "0px";

	ccchange.innerHTML = 
	'<center><a href="http://apps.facebook.com/mythmonger/attractors.php'+ astyle +'>-Challenge Cards-</a></center>' +
	'<center><a style="color: #EDDBAF;text-decoration: none;font-size: 11px; cursor: text;">-Current CC ' + document.getElementsByClassName('overbar-c')[0].innerHTML + '-</a></font></center>' +
	'<table style="text-align:center" width = "100%" cellspacing =0 cellpadding = 0 >'+
	'<tr><td width = "30%" style="text-align:center">'+
	alink + '2'+ astyle + '>Basic</a>'+
	'</td><td width = "40%" style="text-align:center">'+
	'<td width = "30%" style="text-align:center">'+
	alink + '5'+ astyle + '>Heroic</a>' +
	'</td></tr>'+
	'<tr><td width = "30%" style="text-align:center">'+
	alink + '1'+ astyle + '>Nature</a>' +
	'</td><td width = "40%" style="text-align:center">'+
	alink + '8'+ astyle + '>Technology</a>' +
	'</td><td width = "30%" style="text-align:center">'+
	alink + '3'+ astyle + '>Magic</a>' +
	'</td></tr>'+
	'<tr><td nowarp width = "30%" style="text-align:center">'+
	alink + '12'+ astyle + '>Dream</a><br />' +
	'</td><td width = "40%" style="text-align:center">'+
	'<td width = "30%" style="text-align:center">'+
	alink + '9'+ astyle + '>Requietory</a>' +
	'</td></tr>'+
	'<tr><td width colspan= 3 = "100%" style="text-align:center">'+
	alink + '10'+ astyle + '><font title="East Core Mines-Tier 1">ECM-T1 </font></a>' +
	alink + '11'+ astyle + '><font title="East Core Mines-Tier 2">T2 </font></a>' +
	alink + '13'+ astyle + '><font title="East Core Mines-Tier 3">T3 </font></a>' +
	alink + '14'+ astyle + '><font title="East Core Mines-Tier 4">T4 </font></a>' +
	'</td></tr></table></div>';

	var x;
	temp = temp + '<table width = "100%" cellspacing =0 cellpadding = 0 >';
	for (x in locations) 
	{
		temp = temp + 
		'<tr>'+
		'<td nowrap style="text-align:center">'+ iflink + locinfo[x] +'&f=travel'+astyle+ '>'+locations[x]+'</a></td>'+
		'<td nowrap style="text-align:center">'+tlink +'qt='+ (parseInt(x)+1) + astyle +' id="tnl'+ (parseInt(x)+1) +'" ><center>- '+(turnprice(xcurloc,parseInt(x))%100)+' turn-</center></a></td></center>'+
		'<td nowrap style="text-align:center">'+tlink + 'it=' + (parseInt(x)+1) + astyle +' id="tl'+ (parseInt(x)+1) +'"> &nbsp - '+Math.round(turnprice(xcurloc,parseInt(x))/100)+' coin- </a></td></font>'+
//		'<td nowrap style="text-align:center">'+ iflink + locinfo[x] +'&f=travel'+astyle+'>&nbsp - info - </td>'+
		'</tr>';
	}
	temp = temp + '</table>';


	
	tchange.innerHTML = 
	'<center><a href="http://apps.facebook.com/mythmonger/travel.php'+ astyle +'>-Travel Locations-</a></center>' +
	temp +
	'<center><a href="http://apps.facebook.com/mythmonger/travel.php?ct=1'+ astyle + '>-Cancel Current Trip-</a></center>';


	exchange.innerHTML = 
	'<table width = "100%" style = "text-align:center" cellspacing = 0 cellpadding =0></tr>'+
	'<td style = "text-align:center"><a href="http://apps.facebook.com/mythmonger/shop.php?tab=buyPack'+ astyle +'>[Buy Challenge Card] </a></td>' +
	'<td style = "text-align:center"><a href="http://apps.facebook.com/mythmonger/shop.php?tab=sellCharacterCard'+ astyle + '> [Sell Character Card]</a></td>'+
	'</tr><tr>'+
	'<td style = "text-align:center"><a href="http://apps.facebook.com/mythmonger/cards.php'+ astyle +'>[Character Card] </a></td>' +
	'<td style = "text-align:center"><a href="http://apps.facebook.com/mythmonger/shop.php?tab=convertHCC'+ astyle + '> [Convert Card]</a></td>'+
	'</tr></table>'+
	'<hr style="color: #EDDBAF;" />'+
	'<font color=#EDDBAF><table width = "100%" style = "text-align:center" cellspacing = 0 cellpadding =0>'+
	'<tr><td style = "text-align:center" colspan = 4> Win V(^_^)V <td>|</td><td style = "text-align:center" colspan = 4> Lose m(T_T)m<td>'+
	'<tr><td style = "text-align:center"><font color = #ff3333> Fire </font></td><td>></td><td style = "text-align:center"> <font color = #1D9145> Wood </font> </td><td nowrap><font color = #bbbbbb> Metal</font></td><td>|</td><td style = "text-align:center"><font color = #ff3333> Fire </font></td><td><</td><td style = "text-align:center"><font color = #4776E5> Water</font></td><td nowrap><font color = #FF9849> Earth</font></td></tr>'+
	'<tr><td style = "text-align:center"><font color = #1D9145> Wood </font></td><td>></td><td style = "text-align:center"> <font color = #4776E5> Water</font></td><td nowrap><font color = #FF9849> Earth</font></td><td>|</td><td style = "text-align:center"><font color = #1D9145> Wood </font></td><td><</td><td style = "text-align:center"><font color = #ff3333> Fire </font> </td><td nowrap><font color = #bbbbbb> Metal</font></td></tr>'+
	'<tr><td style = "text-align:center"><font color = #4776E5> Water</font></td><td>></td><td style = "text-align:center"> <font color = #ff3333> Fire </font> </td><td nowrap><font color = #bbbbbb> Metal</font></td><td>|</td><td style = "text-align:center"><font color = #4776E5> Water</font></td><td><</td><td style = "text-align:center"><font color = #1D9145> Wood </font></td><td nowrap><font color = #FF9849> Earth</font></td></tr>'+
	'<tr><td style = "text-align:center"><font color = #bbbbbb> Metal</font></td><td>></td><td style = "text-align:center"> <font color = #1D9145> Wood </font> </td><td nowrap><font color = #FF9849> Earth</font></td><td>|</td><td style = "text-align:center"><font color = #bbbbbb> Metal</font></td><td><</td><td style = "text-align:center"><font color = #ff3333> Fire </font></td><td nowrap><font color = #4776E5> Water</font></td></tr>'+
	'<tr><td style = "text-align:center"><font color = #FF9849> Earth</font></td><td>></td><td style = "text-align:center"> <font color = #ff3333> Fire </font> </td><td nowrap><font color = #4776E5> Water</font></td><td>|</td><td style = "text-align:center"><font color = #FF9849> Earth</font></td><td><</td><td style = "text-align:center"><font color = #1D9145> Wood </font></td><td nowrap><font color = #bbbbbb> Metal</font></td></tr>'+
	'</tr></font></table>';

}


function autoTurn() 
{
var rwaitingTime


	// capcha detection

	if (document.title.toLowerCase().indexOf("puzzle") > -1)  
	{
		doTimer (1800,"Reload","Capcha detected");
	}
	else if (document.getElementById('app79378246206_mainContent') == null)
	{
		doTimer (10,"Reload","Page Error");
	}	
	else if (remainingTime == null) 
	{
		doTimer (10,"GetTimer","Timer : ");
		menu();
	}
	else if (window.location.href == "http://apps.facebook.com/mythmonger/turn.php")
	{
		//(default time is 15 secsonds before main page loads) to increase or decrease the time before main page loads
		doTimer (15,"Reload","Back to Main Page");
		menu();
	}
	else if (getElementsByClassName(document.getElementById('app79378246206_mainContent'), 'div', 'overbar-c')[0].innerHTML.indexOf('x0') != -1)
	{
		doTimer (3600,"Reload","No Chalange Card Available");
		menu();

	}
	else
	{

		// set the time, add a random xx seconds, so it will think you're the one who click
		
		rwaitingTime = Math.round(Math.random() * waitingTime) + 3;

		delay = parseInt(remainingTime) + rwaitingTime ;
		// the "click"

		doTimer(delay,"Play",( "random delay = " + rwaitingTime) );

		menu();
	}


}

