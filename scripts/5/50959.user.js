// ==UserScript==
// @name           NeoQuest II Trainer
// @namespace      http://nq2guy.tz/
// @description    Automatically battles and moves left and right for you.
// @include        http://www.neopets.com/games/nq2/nq2.phtml*
// ==/UserScript==

//script licensed under, GNU GPL V3 , see http://www.gnu.org/licenses/gpl.txt for details
//uncomment these lines to initialize variables

//Check for annoying server hiccup before bothering to make any more variables
var i = 0;
var hiccup=1;
var divs = document.getElementsByTagName('div');
for(i=0;i<divs.length;i++)
{
	if(divs[i].className=="contentModuleHeader")
	{
		hiccup=0;
	}
}

if(hiccup)
{
	document.location.href="http://www.neopets.com/games/nq2/nq2.phtml";
}
else
{
//begin real battling!!
var useid=-1; // use special item??
var nxactor=1; // who fightsS??' default =1: rohane
var fact=3; // default is attack , will override for low health
var hitTarget = GM_getValue("hitTarget",5); //hittargets 1-4 are reserved for allies
var healingItem = GM_getValue("healingItem",30033); // get the healing item in case HP turns red or yellow
var isHasted = GM_getValue("isHasted",false);
var j=0; // used for looping to find out whose turn is it
var elements = document.getElementsByTagName('img');
for(i=0;i<elements.length;i++)
{
	switch(elements[i].src)
	{
	case "http://images.neopets.com/nq2/x/com_begin.gif":
		GM_setValue("hitTarget",5);
		GM_setValue("isHasted",false);
		document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?start=1";
		break;
	case "http://images.neopets.com/nq2/x/com_atk.gif":
		var texts = document.getElementsByTagName("font");
		var doMultipleTargets = 0;
		for(j=0;j<texts.length;j++)
		{
			//check to increment target
			if(((texts[j].innerHTML.search(/for it has already been defeated!/)) != -1) || (texts[j].innerHTML=="You must select a valid target to cast on!<BR>"))
			{
				hitTarget++;
				if(hitTarget>=9)
				{
				GM_setValue("hitTarget",5);
				}
				else
				{
				GM_setValue("hitTarget",hitTarget);
				}
			}
			//check character's status
			switch(texts[j].innerHTML)
			{
			case "<b>Rohane</b>":
				if((texts[j+1].color=="#d0d000") || (texts[j+1].color=="red"))
				{
					fact=5;
					useid = healingItem;
				}
				break;
			case "<b>Mipsy</b>":
				nxactor=2;
				fact=9201; //use direct damage
				if(!isHasted)
				{
					fact=9203;
					GM_setValue("isHasted",true);
				}
				if((texts[j+1].color=="#d0d000") || (texts[j+1].color=="red"))
				{
					fact=5;
					useid = healingItem;
				}
				break;
			case "<b>Talinia</b>":
				var multipleTargets = /Multiple Targets/;
				var k=0;
				var links = document.getElementsByTagName('a');
				for(k=0;k<links.length;k++)
				{
					if((links[k].innerHTML.search(multipleTargets)) != -1)
					{	
						fact = 9302;
					}
				}
				nxactor=3;
				if((texts[j+1].color=="#d0d000") || (texts[j+1].color=="red"))
				{
					fact=5;
					useid = healingItem;
				}
				break;
			case "<b>Velm</b>":
				var l=0; // loops to see if velm is wasting his time healing
				var fullhp = 0; //if its 4 then all 4 people are fully healed
				var allies = false;
				//loop through all pictures if it's velm's turn
				for(l=0;l<elements.length;l++)
				{
					//makes sure the script isn't checking enemies hp
					if(elements[l].src=="http://images.neopets.com/nq2/x/donothing.gif")
					{
						allies = true;
					}
					//if checking allies HP
					if(allies)
					{
						//is the picture a health bar?
						if(elements[l].src=="http://images.neopets.com/nq2/x/exp_green.gif")
						{
							if(elements[l].width == 45) //45 is full health
							{
								fullhp++;
							}
						}
					}
				}
				nxactor=4;
				fact=9402; // velm heals, trust me you will need this
				if(fullhp == 4)
				{
					fact = GM_getValue("VelmAction",9403);
				}
				if((texts[j+1].color=="#d0d000") || (texts[j+1].color=="red"))
				{
					fact=5;
					useid = healingItem;
				}

				break;
				
			}
		}
		document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?&fact=" + fact + "&target=" + hitTarget + "&use_id=" + useid + "&nxactor=" + nxactor;
		break;
	case "http://images.neopets.com/nq2/x/com_next.gif":
		document.location.href="javascript:setaction(1); document.ff.submit();";
		break;
	case "http://images.neopets.com/nq2/x/com_end.gif":
		document.location.href="javascript:setaction(2); document.ff.submit();";
		break;
	case "http://images.neopets.com/nq2/x/tomap.gif":
		GM_setValue("hitTarget",5);
		GM_setValue("isHasted",false);
		document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?finish=1";
		break;
// Uncomment the below two lines to initialize your variables, but please edit them from about:config , filter:greasmonkey.scriptvals
//path = GM_setValue("Path","3");
//pathIndex = GM_setValue("pathIndex",0);

pathIndex = GM_getValue("pathIndex",0);

/*
Notes on coordinates

javascript: dosub(int)

1=north
2=south
3=west
4=east
5=northwest
6=southwest
7=northeast
8= southeast

*/
var i = 0;
var hiccup=1;
var divs = document.getElementsByTagName('div');
for(i=0;i<divs.length;i++)
{
	if (divs[i].className=="contentModuleHeader")
	{
		hiccup=0;
	}
}

if(hiccup)
{
	document.location.href="http://www.neopets.com/games/nq2/nq2.phtml";
}
else
{
var elements = document.getElementsByTagName('img');
var i = 0;
for(i=0;i<elements.length;i++)
{
	switch(elements[i].src)
	{
	case "http://images.neopets.com/nq2/x/com_begin.gif":
		document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?start=1";
		break;
	case "http://images.neopets.com/nq2/x/com_atk.gif":
		document.location.href="javascript:setaction(4); document.ff.submit()";
		break;
	case "http://images.neopets.com/nq2/x/com_end.gif":
		document.location.href="javascript:setaction(2); document.ff.submit()";
		break;
	case "http://images.neopets.com/nq2/x/tomap.gif":
		document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?finish=1";
		break;
	case "http://images.neopets.com/nq2/x/com_next.gif":
		document.location.href="javascript:setaction(1); document.ff.submit();";
		break;
	case "http://images.neopets.com/nq2/x/nav.gif":
		if((GM_getValue("Path").length) != pathIndex)
		{
			//alert("javascript:dosub(" + GM_getValue("Path")[pathIndex] + ");");
			document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=move&dir=" + GM_getValue("Path")[pathIndex];
			GM_setValue("pathIndex",pathIndex+1);
		}
		else
		{
			alert("You have arrived at your destination. Please disable this script to take control.");
			GM_setValue("pathIndex",0)
		}
		break;
	}
}
}
//window.setTimeout(function() { document.location.href="http://www.neopets.com/games/nq2/nq2.phtml" }, 20000);