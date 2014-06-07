// ==UserScript==
// @name          GrepoTownListV0.62
// @namespace     
// @description   Grepostats Townlist zur Einbindung in Foren
// @version       0.62
// @include       http://de.grepostats.com/world/de*/player/*/towns*
// ==/UserScript==

// Individuelle Einstellungen - Sollte jeder für sich anpassen
var x1=400;
var x2=700;
var xTiles=9;
var xChars="ABCDEFGHIKLMNOPQRSTUVWXYZ";

var y1=500;
var y2=800;
var yTiles=9;

// hier beginnt das script

function getURLParam(strParamName)
{
	var strReturn = "";
	var strHref = window.location.href;
	if ( strHref.indexOf("?") > -1 )
	{
		//var strQueryString = strHref.substr(strHref.indexOf("?")).toLowerCase();
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
	"//h2/a[contains(@href,'/world/de') and contains(@href,'/player/')]",
	document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

var player;
player=allAPlayer.snapshotItem(0).firstChild.nodeValue;
	
text=document.createTextNode("Städteliste für [player]"+player+"[/player]:");
tableContent.appendChild(text);
br=document.createElement("br");
tableContent.appendChild(br);
br=document.createElement("br");
tableContent.appendChild(br);
	
var allTowns;
allTowns=document.evaluate(
	"//a[contains(@href,'/world/de') and contains(@href,'/town/')]",
	document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

var format=getURLParam("gtioformat");
if (format=="")
{
	var cookie=document.cookie;
	var expr=/^.*gtioTownListFormat_v0.62=(.*)/;
	expr.exec(cookie);
	cookie=RegExp.$1;
	if (cookie!="")
	{
		format=cookie.replace(/;.*$/,"");
	}	
	else
	{
		format="%count%.) %town% (%points%) %x%|%y% %aMeer%";
	}
}	

	
if (allTowns.snapshotLength>0) 
{
	var i;
	var aTownid;
	var tdPoints;
	var aCoord,aMeer;
	var row,townid,points,coords,x,y;

	var f1,f2,f3,f4;
	var t1,t2,t3,t4;
	var quadrXSize,quadrYSize;
	var coords,dx,xPos;
	var Towns=new Array();

	for (i=0; i<allTowns.snapshotLength; i++)
	//i=0;
	{
		aTownid=allTowns.snapshotItem(i);
		// href mit townid
		//alert(aTownid.attributes[0].nodeValue);
		// townname
		//alert(aTownid.firstChild.nodeValue);

		tdPoints=aTownid.parentNode.nextSibling.nextSibling;
		// points
		//alert(tdPoints.firstChild.nodeValue);
		
		aCoords=tdPoints.nextSibling.nextSibling.firstChild;
		// coords
		
		aMeer=tdPoints.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.firstChild.nodeValue;
		//alert(aMeer);
		townid=aTownid.attributes[0].nodeValue.replace(/^.*town./, "");
		points=tdPoints.firstChild.nodeValue.replace(/,/,".");
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
		var page=getURLParam("page");		
		
		Towns[i] = new TownValues(page,townid,points,coords,aMeer)
		
	}
	GM_log('test');

	var issortet = 0;
	while(issortet == 0){
		GM_log('Sort the TOwns');
		issortet = 1;
		for (i=0; i<Towns.length-1; i++){
			if(Towns[i].AMeer>Towns[i+1].AMeer){
				var temp = Towns[i];
				var temp2 = Towns[i+1];	
				Towns[i] = Towns[i+1];
				Towns[i+1] = temp;
				issortet = 0;
			}
		}
	}

	for (i=0; i<Towns.length; i++){
		var rownumber = i + 1 + ( Towns[i].Page * 50);
		GM_log('rownumber:' + Towns[i].Page);
		print_Info(rownumber,Towns[i]);
	}	
	var expires = new Date();
	var twoMonths = expires.getTime() + (60 * 24 * 60 * 60 * 1000);
	expires.setTime(twoMonths);
	document.cookie = "gtioTownListFormat_v0.62="+format+"; expires=" + expires.toGMTString();

	br=document.createElement("br");
	tableContent.appendChild(br);
	
	var hr;
	hr=document.createElement("hr");
	tableContent.appendChild(hr);
	textElement=document.createTextNode("Weitere Formate:");
	tableContent.appendChild(textElement);
	br=document.createElement("br");
	tableContent.appendChild(br);
	br=document.createElement("br");
	tableContent.appendChild(br);

	var a;
	a=document.createElement("a");
	a.setAttribute("href", window.location.pathname+"?gtioformat="+f1);
	tableContent.appendChild(a);
	textElement=document.createTextNode(t1);
	a.appendChild(textElement);
	br=document.createElement("br");
	tableContent.appendChild(br);

	a=document.createElement("a");
	a.setAttribute("href", window.location.pathname+"?gtioformat="+f2);
	tableContent.appendChild(a);
	textElement=document.createTextNode(t2);
	a.appendChild(textElement);
	br=document.createElement("br");
	tableContent.appendChild(br);

	a=document.createElement("a");
	a.setAttribute("href", window.location.pathname+"?gtioformat="+f3);
	tableContent.appendChild(a);
	textElement=document.createTextNode(t3);
	a.appendChild(textElement);
	br=document.createElement("br");
	tableContent.appendChild(br);

	a=document.createElement("a");
	a.setAttribute("href", window.location.pathname+"?gtioformat="+f4);
	tableContent.appendChild(a);
	textElement=document.createTextNode(t4);
	a.appendChild(textElement);
	br=document.createElement("br");
	tableContent.appendChild(br);

	a=document.createElement("a");
	a.setAttribute("href", window.location.pathname+"?gtioformat="+f5);
	tableContent.appendChild(a);
	textElement=document.createTextNode(t5);
	a.appendChild(textElement);
	br=document.createElement("br");
	tableContent.appendChild(br);
	
	br=document.createElement("br");
	tableContent.appendChild(br);
}

function print_Info(number,town){
//alert(i);				
		row=town.Number + ".) [town]"+town.Townid+"[/town] ("+points+") "+coords+" ("+aMeer+")";
//		alert(format);
		row=format;
		
		row=row.replace(/%20/g," ");
		row=row.replace(/%x%/,x);
		row=row.replace(/%y%/,y);
		row=row.replace(/%20/g," ");
		row=row.replace(/%count%/,number);
		row=row.replace(/%town%/,"[town]"+town.Townid+"[/town]");
		row=row.replace(/%points%/,town.Points);
		row=row.replace(/%coords%/,town.Coords);
		row=row.replace(/%aMeer%/,town.AMeer);

//		alert(row);
		
		// mögliche Formate
		//if (i==0)
		//{
			f1="%count%.) %town%%20(%points%)%20%x%|%y% %aMeer%%20";
			f2="%count%.) %town%%20(%points%)%20%x%,%y% %aMeer%%20";
			f3="%count%.) %town%%20(%points% Punkte)%20%x%,%y% %aMeer%%20";
			f4="%count%.) %town%%20(%points%) %aMeer%%20";
			f5="%count%.) %town%%20(%points%)%20%coords% %aMeer%%20";
			t1=1 + ".)[town]"+townid+"[/town] ("+points+") "+x+"|"+y+" "+aMeer;
			t2=1 + ".)[town]"+townid+"[/town] ("+points+") "+x+","+y+" "+aMeer;
			t3=1 + ".)[town]"+townid+"[/town] ("+points+" Punkte) "+x+","+y+" "+aMeer;
			t4=1 + ".)[town]"+townid+"[/town] ("+points+")"+" "+aMeer;
			t5=1 + ".)[town]"+townid+"[/town] ("+points+") [Planquadrat]"+" "+aMeer;
		//}
		
		textElement=document.createTextNode(row);
		tableContent.appendChild(textElement);
		br=document.createElement("br");
		tableContent.appendChild(br);
	}

function TownValues(_page,_TownId,_points,_cords,_meer){
this.Page = _page;
this.Townid = _TownId;
this.Points = _points;
this.Coords = _cords;
this.AMeer = _meer;
}