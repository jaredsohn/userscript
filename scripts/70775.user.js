// ==UserScript==
// @name           Bulbapedia Table Organizer
// @namespace      tag://bulbapedia
// @description    Choose whether you want to hide Platinum-only moves, D/P-only moves, or HG/SS-only moves in each pokemon's learnset. Also, collapses several large tables by default to improve readability.
// @include        http://bulbapedia.bulbagarden.net/wiki/*
// @author         Matthew Ammann
// @version        1.0.1
// @date           03/07/10
// ==/UserScript==

majorSections = document.getElementsByTagName("h3");
tables = document.getElementsByTagName("table");

GM_getValue("toggleDiamond", false);
GM_getValue("toggleHG", false);
GM_getValue("togglePlat", false);

if(GM_getValue("toggleHG") == true) {
	GM_registerMenuCommand( "Show HG/SS-only moves", toggleHG);
}
else{
	GM_registerMenuCommand( "Hide HG/SS-only moves", toggleHG);
}
if(GM_getValue("togglePlat") == true){
	GM_registerMenuCommand( "Show Platinum-only moves", togglePlat);
}
else{
	GM_registerMenuCommand( "Hide Platinum-only moves", togglePlat);
}
if(GM_getValue("toggleDiamond") == true){
	GM_registerMenuCommand( "Show Diamond/Pearl-only moves", toggleDiamond);
}
else{
	GM_registerMenuCommand( "Hide Diamond/Pearl-only moves", toggleDiamond);
}

GM_registerMenuCommand( "Show all Generation IV moves", showAll);

for(var i = 0; i < tables.length; i++)
{
	if(tables[i].innerHTML.indexOf(">Pok�dex</span></a> entry") != -1)
	{
		tables[i].setAttribute("class", "expandable");
	}

	else if(tables[i].previousElementSibling)
	{
		if(tables[i].previousElementSibling.innerHTML.indexOf("In side games") != -1)
			tables[i].setAttribute("class", "expandable");
		
		else if(tables[i].previousElementSibling.innerHTML.indexOf('By <a href="/wiki/TM" title="TM">TM') != -1)
			tables[i].setAttribute("class", "expandable");
			
		else if(tables[i].previousElementSibling.innerHTML.indexOf("Side game data") != -1)
			tables[i].setAttribute("class", "expandable");
	}
	
	if(tables[i].getAttribute("style") != null && tables[i].getAttribute("style").indexOf("border: 1px solid") != -1)
	{
		//alert("togglePlat = " + GM_getValue("togglePlat") + "\n toggleHG = " + GM_getValue("toggleHG") + "\n toggleDiamond = " + GM_getValue("toggleDiamond") )
			
		var rows = tables[i].getElementsByTagName("tr");

		if(GM_getValue("toggleHG") == true && tables[i].innerHTML.indexOf(">HG<") != -1 || 
			GM_getValue("toggleDiamond") == true && tables[i].innerHTML.indexOf(">D<") != -1 ||
			GM_getValue("togglePlat") == true && tables[i].innerHTML.indexOf(">Pt") != -1)
		{	

			for(var j = rows.length - 1; j >= 0; j--)
			{
				if(GM_getValue("toggleDiamond") == true && tables[i].innerHTML.indexOf(">D<") != -1)
				{	
					if(rows[j].innerHTML.indexOf("Platinum Version") == -1 && rows[j].innerHTML.indexOf("SoulSilver Versions") == -1 &&
					   rows[j].innerHTML.indexOf(">D<") != -1)
				    {
						tables[i].deleteRow(j);
				    }
					else if(GM_getValue("togglePlat") == false && rows[j].innerHTML.indexOf("Platinum Version") != -1)
					{
						//alert("Plat present - don't hide");
					}
					else if(GM_getValue("toggleHG") == false && rows[j].innerHTML.indexOf("SoulSilver Versions") != -1)
					{
						//alert("HG present - don't hide");
					}
					else if(rows[j].innerHTML.indexOf(">D<") != -1)
						tables[i].deleteRow(j);
				}
				
				if(GM_getValue("togglePlat") == true && tables[i].innerHTML.indexOf(">Pt") != -1)
				{
					if(rows[j].innerHTML.indexOf("Pearl Versions") == -1 && rows[j].innerHTML.indexOf("SoulSilver Versions") == -1 &&
					   rows[j].innerHTML.indexOf(">D<") != -1)
				    {
						tables[i].deleteRow(j);
				    }
					else if(GM_getValue("toggleDiamond") == false && rows[j].innerHTML.indexOf("Diamond and Pearl Versions") != -1)
					{
						//alert("Diamond present - don't hide");
					}
					else if(GM_getValue("toggleHG") == false && rows[j].innerHTML.indexOf("SoulSilver Versions") != -1)
					{
						//alert("HG present - don't hide");
					}
					else if(rows[j].innerHTML.indexOf(">D<") != -1)
						tables[i].deleteRow(j);
				}
				
				if(GM_getValue("toggleHG") == true && tables[i].innerHTML.indexOf(">HG<") != -1)
				{	
					if(rows[j].innerHTML.indexOf("Platinum Version") == -1 && rows[j].innerHTML.indexOf("Diamond and Pearl Versions") == -1 &&
					   rows[j].innerHTML.indexOf(">HG<") != -1)
					   {
						tables[i].deleteRow(j);
					   }
					else if(GM_getValue("togglePlat") == false && rows[j].innerHTML.indexOf("Platinum Version") != -1)
					{
						//alert("Plat present - don't hide");
					}
					else if(GM_getValue("toggleDiamond") == false && rows[j].innerHTML.indexOf("Diamond and Pearl Versions") != -1)
					{
						//alert("Diamond present - don't hide");
					}
					else if(rows[j].innerHTML.indexOf(">HG<") != -1)
						tables[i].deleteRow(j);
				}
			}
		}
	}
}//end for loop

function togglePlat()
{
	if(GM_getValue("togglePlat") == false)
		GM_setValue("togglePlat", true);
	else
		GM_setValue("togglePlat", false);
}

function toggleDiamond()
{
	if(GM_getValue("toggleDiamond") == false)
		GM_setValue("toggleDiamond", true);
	else
		GM_setValue("toggleDiamond", false);
}

function toggleHG()
{
	if(GM_getValue("toggleHG") == false)
		GM_setValue("toggleHG", true);
	else
		GM_setValue("toggleHG", false);
}

function showAll()
{
	GM_setValue("togglePlat", false);
	GM_setValue("toggleDiamond", false);
	GM_setValue("toggleHG", false);
}