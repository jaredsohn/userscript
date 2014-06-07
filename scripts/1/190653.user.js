// ==UserScript==
// @name          ggt_bbcode
// @namespace     ggtools
// @description   Grepostats BB-codes Townlist / Staetteverzeignis / Stadslijst 
// @version       1.1
// @include       http://*.grepostats.com/world/*/player/*/*towns*

// ==/UserScript==

// all credits to those who made the original version 
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js



if (typeof unsafeWindow === 'object') {
var uW = unsafeWindow;
} else {
var uW = window;
}

var x1=400;
var x2=700;
var xTiles=9;
var xChars="ABCDEFGHIKLMNOPQRSTUVWXYZ";

var y1=500;
var y2=800;
var yTiles=9;

function getURLParam(strParamName)
{
	var strReturn = "";
	var strHref = uW.location.href;
	if ( strHref.indexOf("?") > -1 )
	{
		var strQueryString = strHref.substr(strHref.indexOf("?"));
		var aQueryString = strQueryString.split("&");
		for ( var iParam = 0; iParam < aQueryString.length; iParam++ )
		{
			if (aQueryString[iParam].indexOf(strParamName + "=") > -1 )
			{
				var aParam = aQueryString[iParam].split("=");
				strReturn = aParam[1];
				break;
			}
		}
	}
	return strReturn;
}




var allTableContent;
allTableContent=document.evaluate(
	"//div[@class='table_content']",
	document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
	

var tableContent;
tableContent=allTableContent.snapshotItem(0);

var br,text;
br=document.createElement("br");
tableContent.appendChild(br);

var allAPlayer;
allAPlayer=document.evaluate(
	"//h2/a[contains(@href,'/world/') and contains(@href,'/player/')]",
	document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

var player;
player=allAPlayer.snapshotItem(0).firstChild.nodeValue;
var a;
var frmt= getURLParam("frm");
if (frmt==""){ frmt="1";}


br=document.createElement("br");
tableContent.appendChild(br);	
text=document.createTextNode("Claimlist [player]"+player+"[/player]:");
tableContent.appendChild(text);
br=document.createElement("br");
tableContent.appendChild(br);
br=document.createElement("br");
tableContent.appendChild(br);
if (frmt=="5"){ 
  text=document.createTextNode("[table]");
  tableContent.appendChild(text);
  br=document.createElement("br");
  tableContent.appendChild(br);
}


  var allTowns;
allTowns=document.evaluate(
	"//a[contains(@href,'/world/') and contains(@href,'/town/')]",
	document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
    

var format= getURLParam("gtioformat");
if (format=="")
{
	var cookie=document.cookie;
	var expr=/^.*gtioTownListFormat_v0.5=(.*)/;
	expr.exec(cookie);
	cookie=RegExp.$1;
	if (cookie!="")
	{
		format=cookie.replace(/;.*$/,"");
	}	
	else
	{
		format="%town% (%points%) %x%|%y%";
	}
}	
	
if (allTowns.snapshotLength>0) 
{
	var i;
	var aTownid;
	var tdPoints;
	var tdOC;
	var aCoord;
	var row,townid,townname,points,coords,x,y,ocnr;

	var f1,f2,f3,f4;
	var t1,t2,t3,t4;
	var quadrXSize,quadrYSize;
	var coords,dx,xPos;

	for (i=0; i<allTowns.snapshotLength; i++)
	{
		aTownid=allTowns.snapshotItem(i);
		// href mit townid
		
		twnname =aTownid.firstChild.nodeValue;
		
		// townname
		//alert(aTownid.firstChild.nodeValue);

		tdPoints=aTownid.parentNode.nextSibling.nextSibling;
		// points
		//alert(tdPoints.firstChild.nodeValue);
		
		aCoords=tdPoints.nextSibling.nextSibling.firstChild;
		// coords
		//alert(aCoords.firstChild.nodeValue);
 		
		
		townid=aTownid.attributes[0].nodeValue.replace(/^.*town./, "");
		points=tdPoints.firstChild.nodeValue.replace(/,/,".");
		
		tdOC=tdPoints.nextSibling.nextSibling;
		ocnr=tdOC.firstChild.nodeValue;
		


	xw=aTownid.parentNode.parentNode.childNodes;
	ocnr=xw.item(9).textContent;

		
		coords=aCoords.firstChild.nodeValue;
		x=coords.replace(/\|.*$/,"");
		y=coords.replace(/^.*\|/,"");
		
		quadrXSize=(x2-x1)/xTiles;
		quadrYSize=(y2-y1)/yTiles;
		
		if (x<x1 || x>x2 || y<y1 || y>y2)
		{
			coords="[??]";
		}
		else
		{
			dx=x-x1;
			xPos=Math.floor(dx/quadrXSize);
			coords=xChars[xPos];
			dy=y-y1;
			yPos=Math.floor(dy/quadrYSize)+1;
			coords="["+xChars[xPos]+yPos+"]";
		}		
		
		
		row=format;
		row=row.replace(/%20/g," ");
		row=row.replace(/%nr%/,i+1);
		row=row.replace(/%x%/,x);
		row=row.replace(/%ocnr%/,"OC "+ ocnr );
		row=row.replace(/%y%/,y);
		row=row.replace(/%town%/,"[town]"+townid+"[/town]");
		row=row.replace(/%townid%/,townid);
		row=row.replace(/%townname%/,"[town]"+twnname+"[/town]");
		row=row.replace(/%points%/,points);
		row=row.replace(/%coords%/,coords);
		//alert(row);
		
		// mögliche Formate
		if (i==0)
		{
		        // lijst
			f1="%town%%20(%points%)%20%x%|%y%";
			f2="%town%%20(%points%)%20%x%,%y%%20[player] [/player]";
			f3="%town%%20(%points%)%20OC%ocnr%";
			f4="%town%%20(%points%)";
			f5="[*]%nr% - [|]%20%townname%%20[|](%points% Pnt) [|] %ocnr% [|] [reservation]%townid%[/reservation]%20 [*]";
			
			// menutitels
			t1="1 - [town]"+townid+"[/town] ("+points+") "+x+"|"+y;
			t2="2 - [town]"+townid+"[/town] ("+points+") "+x+","+y+" [player] [/player]";
			t3="3 - [town]"+townid+"[/town] ("+points+") OC"+ocnr;
			t4="4 - [town]"+townid+"[/town] ("+points+")";
			t5="5 - # [town]"+twnname+"[/town] ("+points+" Punten) - [reservation]"+townid+"[/reservation]";
			
		}
		
		textElement=document.createTextNode(row);
		tableContent.appendChild(textElement);
		br=document.createElement("br");
		tableContent.appendChild(br);
	}

	var expires = new Date();
	var twoMonths = expires.getTime() + (60 * 24 * 60 * 60 * 1000);
	expires.setTime(twoMonths);
	document.cookie = "gtioTownListFormat_v0.5="+format+"; expires=" + expires.toGMTString();
if (frmt=="5"){ 
  text=document.createTextNode("[/table]");
  tableContent.appendChild(text);
  br=document.createElement("br");
  tableContent.appendChild(br);
}

	br=document.createElement("br");
	tableContent.appendChild(br);
	
	var hr;
	hr=document.createElement("hr");
	tableContent.appendChild(hr);
	textElement=document.createTextNode("layout options:");
	tableContent.appendChild(textElement);
	br=document.createElement("br");
	tableContent.appendChild(br);
	br=document.createElement("br");
	tableContent.appendChild(br);

	var a;
	a=document.createElement("a");
	a.setAttribute("href", window.location.pathname+"?frm=1&gtioformat="+f1);
	tableContent.appendChild(a);
	textElement=document.createTextNode(t1);
	a.appendChild(textElement);
	br=document.createElement("br");
	tableContent.appendChild(br);

	a=document.createElement("a");
	a.setAttribute("href", window.location.pathname+"?frm=2&gtioformat="+f2);
	tableContent.appendChild(a);
	textElement=document.createTextNode(t2);
	a.appendChild(textElement);
	br=document.createElement("br");
	tableContent.appendChild(br);

	a=document.createElement("a");
	a.setAttribute("href", window.location.pathname+"?frm=3&gtioformat="+f3);
	tableContent.appendChild(a);
	textElement=document.createTextNode(t3);
	a.appendChild(textElement);
	br=document.createElement("br");
	tableContent.appendChild(br);

	a=document.createElement("a");
	a.setAttribute("href", window.location.pathname+"?frm=4&gtioformat="+f4);
	tableContent.appendChild(a);
	textElement=document.createTextNode(t4);
	a.appendChild(textElement);
	br=document.createElement("br");
	tableContent.appendChild(br);
	
	a=document.createElement("a");
	a.setAttribute("href", window.location.pathname+"?frm=5&gtioformat="+f5);
	tableContent.appendChild(a);
	textElement=document.createTextNode(t5);
	a.appendChild(textElement);
	br=document.createElement("br");
	tableContent.appendChild(br);
	
	br=document.createElement("br");
	tableContent.appendChild(br);

}

