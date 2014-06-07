// ==UserScript==
// @name           Ironbender
// @namespace      http://nq2guy.tz/
// @description    Automatically battles and moves left and right for you.
// @include        http://www.neopets.com/games/nq2/nq2.phtml*
// ==/UserScript==

//script licensed under, GNU GPL V3 , see http://www.gnu.org/licenses/gpl.txt for details
//uncomment these lines to initialize variables

//Check for annoying server hiccup before bothering to make any more variables

window.setTimeout(60);

pathIndex = GM_getValue("pathIndex",0);

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

if(pathIndex == 6200){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?finish=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"; 
}
if(pathIndex == 6396){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?finish=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"; 
}
if(pathIndex == 8126){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?finish=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"; 
}
if(pathIndex == 9726){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?finish=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"; 
}
if(pathIndex == 10764){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?finish=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"; 
}
if(pathIndex == 11368){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?finish=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"; 
}
if(pathIndex == 11533){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?finish=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"; 
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
var healingItem = GM_getValue("healingItem",30011); // get the healing item in case HP turns red or yellow
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
	case "http://images.neopets.com/nq2/x/nav.gif":
		if((GM_getValue("Path").length) != pathIndex)
		{
			//alert("javascript:dosub(" + GM_getValue("Path")[pathIndex] + ");");
			document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=move&dir=" + GM_getValue("Path")[pathIndex];
                        

if(pathIndex == 9-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201&say=rest";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 17-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201&say=rest";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 25-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201&say=rest";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 33-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201&say=rest";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 41-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201&say=rest";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 49-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201&say=rest";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 57-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201&say=rest";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 65-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201&say=rest";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 73-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201&say=rest";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 81-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201&say=rest";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 89-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201&say=rest";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 97-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201&say=rest";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 105-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201&say=rest";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 113-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201&say=rest";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 121-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201&say=rest";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=skills&buy_char=1&buy_char=1&confirm=1&skopt_9102=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 129-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201&say=rest";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 137-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201&say=rest";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 145-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201&say=rest";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 153-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201&say=rest";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 161-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201&say=rest";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 169-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201&say=rest";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 177-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201&say=rest";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 185-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201&say=rest";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 193-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201&say=rest";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 201-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201&say=rest";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 209-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201&say=rest";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 217-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201&say=rest";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 225-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201&say=rest";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 233-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201&say=rest";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 241-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201&say=rest";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=skills&buy_char=1&buy_char=1&confirm=1&skopt_9102=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 249-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201&say=rest";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 257-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201&say=rest";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 265-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201&say=rest";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 273-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201&say=rest";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 281-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201&say=rest";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 289-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201&say=rest";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 297-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201&say=rest";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 305-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201&say=rest";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 313-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201&say=rest";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 321-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201&say=rest";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 329-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201&say=rest";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 337-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201&say=rest";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 345-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201&say=rest";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 353-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201&say=rest";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 361-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201&say=rest";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 369-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201&say=rest";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 377-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201&say=rest";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 385-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201&say=rest";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 393-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201&say=rest";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 401-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201&say=rest";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=skills&buy_char=1&buy_char=1&confirm=1&skopt_9102=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 421-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201&say=rest";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 441-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201&say=rest";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 461-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201&say=rest";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 481-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201&say=rest";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 501-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201&say=rest";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 521-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201&say=rest";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 541-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201&say=rest";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 561-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201&say=rest";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 581-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201&say=rest";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=skills&buy_char=1&buy_char=1&confirm=1&skopt_9102=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 1133-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10201&say=rest";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=skills&buy_char=1&buy_char=1&confirm=1&skopt_9102=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=skills&buy_char=1&buy_char=1&confirm=1&skopt_9102=1";;
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=skills&buy_char=1&buy_char=1&confirm=1&skopt_9102=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 1613-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=merch&targ=10401&greet=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=merch&targ=10401&mact=buy&targ_item=20010&quant=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=merch&targ=10401&mact=buy&targ_item=10011&quant=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=merch&targ=10401&mact=buy&targ_item=30011&quant=10";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=merch&targ=10401&mact=buy&targ_item=30011&quant=10";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=inv";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=inv&iact=equip&targ_item=20010&targ_char=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=inv&iact=equip&targ_item=10011&targ_char=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=skills&buy_char=1&buy_char=1&confirm=1&skopt_9102=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=inv";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=inv&iact=use&targ_item=30012&targ_char=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=inv&iact=use&targ_item=30012&targ_char=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 1841-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=merch&targ=10401&greet=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=merch&targ=10401&mact=buy&targ_item=30011&quant=10";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=merch&targ=10401&mact=buy&targ_item=30011&quant=10";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=skills&buy_char=1&buy_char=1&confirm=1&skopt_9102=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=inv";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=inv&iact=use&targ_item=30012&targ_char=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=inv&iact=use&targ_item=30012&targ_char=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 2069-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=merch&targ=10401&greet=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=merch&targ=10401&mact=buy&targ_item=30011&quant=10";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=merch&targ=10401&mact=buy&targ_item=30011&quant=10";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=skills&buy_char=1&buy_char=1&confirm=1&skopt_9102=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=inv";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=inv&iact=use&targ_item=30012&targ_char=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=inv&iact=use&targ_item=30012&targ_char=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 2199-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=merch&targ=10401&greet=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=merch&targ=10401&mact=buy&targ_item=30011&quant=10";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=merch&targ=10401&mact=buy&targ_item=30011&quant=10";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=inv";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=inv&iact=use&targ_item=30012&targ_char=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=inv&iact=use&targ_item=30012&targ_char=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 2329-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=merch&targ=10401&greet=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=merch&targ=10401&mact=buy&targ_item=30011&quant=10";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=merch&targ=10401&mact=buy&targ_item=30011&quant=10";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=inv";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=inv&iact=use&targ_item=30011&targ_char=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=inv&iact=use&targ_item=30011&targ_char=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=inv&iact=use&targ_item=30011&targ_char=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=inv&iact=use&targ_item=30011&targ_char=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 2459-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=merch&targ=10401&greet=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=merch&targ=10401&mact=buy&targ_item=30011&quant=10";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=merch&targ=10401&mact=buy&targ_item=30011&quant=10";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=inv";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=inv&iact=use&targ_item=30012&targ_char=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=inv&iact=use&targ_item=30012&targ_char=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 2603-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=merch&targ=10401&greet=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=merch&targ=10401&mact=buy&targ_item=30011&quant=10";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=merch&targ=10401&mact=buy&targ_item=30011&quant=10";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=inv";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=inv&iact=use&targ_item=30012&targ_char=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=inv&iact=use&targ_item=30012&targ_char=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 2747-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=inv";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=inv&iact=use&targ_item=30011&targ_char=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=inv&iact=use&targ_item=30011&targ_char=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=inv&iact=use&targ_item=30011&targ_char=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=inv&iact=use&targ_item=30011&targ_char=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=merch&targ=10401&greet=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=merch&targ=10401&mact=buy&targ_item=30011&quant=10";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=merch&targ=10401&mact=buy&targ_item=30011&quant=10";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=travel&mode=1";
GM_setValue("healingItem",30012);
}
if(pathIndex == 4990-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=inv";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=inv&iact=use&targ_item=30011&targ_char=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=inv&iact=use&targ_item=30011&targ_char=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=inv&iact=use&targ_item=30011&targ_char=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=inv&iact=use&targ_item=30011&targ_char=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=inv&iact=use&targ_item=30011&targ_char=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=skills&buy_char=1&buy_char=1&confirm=1&skopt_9102=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=skills&buy_char=1&buy_char=1&confirm=1&skopt_9102=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
GM_setValue("healingItem",30013)
}
if(pathIndex == 5000-1){
GM_setValue("healingItem",30012)
}
if(pathIndex == 5092-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=travel&mode=2";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10408";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10408&say=do";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10408&say=join";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=skills&buy_char=2&buy_char=2&confirm=1&skopt_9201=13";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=skills&buy_char=2&buy_char=2&confirm=1&skopt_9201=13";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 5205-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=merch&targ=10709&greet=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=merch&targ=10709&mact=buy&targ_item=10014&quant=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=inv";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=inv&iact=equip&targ_item=10014&targ_char=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 5210-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=merch&targ=10710&greet=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=merch&targ=10710&mact=buy&targ_item=20014&quant=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=merch&targ=10710&mact=buy&targ_item=20113&quant=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=inv";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=inv&iact=equip&targ_item=20014&targ_char=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=inv&iact=equip&targ_item=20113&targ_char=2";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 5295-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10718";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10718&say=city";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10718&say=no";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10718&say=about";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10718&say=east";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10718&say=enter";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 5410-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10801";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=10801&say=key"
}
if(pathIndex == 5440-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=merch&targ=10802&greet=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=merch&targ=10802&mact=buy&targ_item=30013&quant=10";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=merch&targ=10802&mact=buy&targ_item=30013&quant=10";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
GM_setValue("healingItem",30013)
}
if(pathIndex == 5470-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=merch&targ=10802&greet=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=merch&targ=10802&mact=buy&targ_item=30013&quant=10";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=merch&targ=10802&mact=buy&targ_item=30013&quant=10";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 5500-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=merch&targ=10802&greet=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=merch&targ=10802&mact=buy&targ_item=30013&quant=10";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=merch&targ=10802&mact=buy&targ_item=30013&quant=10";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 5560-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=merch&targ=10802&greet=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=merch&targ=10802&mact=buy&targ_item=30013&quant=10";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=merch&targ=10802&mact=buy&targ_item=30013&quant=10";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 5626-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=merch&targ=10802&greet=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=merch&targ=10802&mact=buy&targ_item=30013&quant=10";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=merch&targ=10802&mact=buy&targ_item=30013&quant=10";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 5660-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=merch&targ=10802&greet=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=merch&targ=10802&mact=buy&targ_item=30013&quant=10";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=merch&targ=10802&mact=buy&targ_item=30013&quant=10";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 5720-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=merch&targ=10802&greet=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=merch&targ=10802&mact=buy&targ_item=30013&quant=10";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=merch&targ=10802&mact=buy&targ_item=30013&quant=10";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=skills&buy_char=1&buy_char=1&confirm=1&skopt_9102=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=skills&buy_char=1&buy_char=1&confirm=1&skopt_9102=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=skills&buy_char=1&buy_char=1&confirm=1&skopt_9102=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=skills&buy_char=1&buy_char=1&confirm=1&skopt_9102=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=skills&buy_char=2&buy_char=2&confirm=1&skopt_9201=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=skills&buy_char=2&buy_char=2&confirm=1&skopt_9201=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=skills&buy_char=2&buy_char=2&confirm=1&skopt_9201=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 5770-1){
GM_setValue("healingItem",30014)
}
if(pathIndex == 5903-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=merch&targ=11201&greet=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=merch&targ=11201&mact=buy&targ_item=30014&quant=10";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=merch&targ=11201&mact=buy&targ_item=30014&quant=10";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=skills&buy_char=1&buy_char=1&confirm=1&skopt_9502=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=skills&buy_char=1&buy_char=1&confirm=1&skopt_9502=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=skills&buy_char=1&buy_char=1&confirm=1&skopt_9502=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=skills&buy_char=2&buy_char=2&confirm=1&skopt_9602=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=skills&buy_char=2&buy_char=2&confirm=1&skopt_9602=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=skills&buy_char=2&buy_char=2&confirm=1&skopt_9602=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 5917-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=merch&targ=11203&greet=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=merch&targ=11203&mact=buy&targ_item=10017&quant=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=merch&targ=11203&mact=buy&targ_item=10116&quant=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=merch&targ=11203&mact=buy&targ_item=20017&quant=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=merch&targ=11203&mact=buy&targ_item=20116&quant=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=inv";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=inv&iact=equip&targ_item=10017&targ_char=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=inv&iact=equip&targ_item=10116&targ_char=2";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=inv&iact=equip&targ_item=20017&targ_char=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=inv&iact=equip&targ_item=20116&targ_char=2";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml"
}
if(pathIndex == 6405-1){
GM_setValue("healingItem",30021)
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=skills&buy_char=1&buy_char=1&confirm=1&skopt_9502=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=skills&buy_char=1&buy_char=1&confirm=1&skopt_9502=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=skills&buy_char=1&buy_char=1&confirm=1&skopt_9502=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=skills&buy_char=1&buy_char=1&confirm=1&skopt_9502=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=skills&buy_char=1&buy_char=1&confirm=1&skopt_9502=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=skills&buy_char=2&buy_char=2&confirm=1&skopt_9602=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=skills&buy_char=2&buy_char=2&confirm=1&skopt_9602=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=skills&buy_char=2&buy_char=2&confirm=1&skopt_9602=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=skills&buy_char=2&buy_char=2&confirm=1&skopt_9602=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=skills&buy_char=2&buy_char=2&confirm=1&skopt_9602=1";
}
if(pathIndex == 6760-1){
GM_setValue("healingItem",30022)
}
if(pathIndex == 7295-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=20510";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=20510&say=join";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=skills&buy_char=1&buy_char=1&confirm=1&skopt_9101=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=skills&buy_char=1&buy_char=1&confirm=1&skopt_9101=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=skills&buy_char=1&buy_char=1&confirm=1&skopt_9101=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=skills&buy_char=1&buy_char=1&confirm=1&skopt_9101=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=skills&buy_char=1&buy_char=1&confirm=1&skopt_9101=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=skills&buy_char=1&buy_char=1&confirm=1&skopt_9101=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=skills&buy_char=1&buy_char=1&confirm=1&skopt_9101=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=skills&buy_char=2&buy_char=2&confirm=1&skopt_9602=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=skills&buy_char=2&buy_char=2&confirm=1&skopt_9602=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=skills&buy_char=2&buy_char=2&confirm=1&skopt_9602=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=skills&buy_char=2&buy_char=2&confirm=1&skopt_9602=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=skills&buy_char=2&buy_char=2&confirm=1&skopt_9602=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=skills&buy_char=2&buy_char=2&confirm=1&skopt_9602=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=skills&buy_char=2&buy_char=2&confirm=1&skopt_9602=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=skills&buy_char=3&buy_char=3&confirm=1&skopt_9301=15&skopt_9302=1&skopt_9502=10";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=skills&buy_char=3&buy_char=3&confirm=1&skopt_9301=15&skopt_9302=1&skopt_9502=10";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=skills&buy_char=3&buy_char=3&confirm=1&skopt_9502=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml";
}
if(pathIndex == 7438-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=merch&targ=20608&greet=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=merch&targ=20608&mact=buy&targ_item=10022&quant=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=merch&targ=20608&mact=buy&targ_item=10122&quant=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=merch&targ=20608&mact=buy&targ_item=10223&quant=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=inv";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=inv&iact=equip&targ_item=10022&targ_char=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=inv&iact=equip&targ_item=10122&targ_char=2";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=inv&iact=equip&targ_item=10223&targ_char=3";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml";
}
if(pathIndex == 7452-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=merch&targ=20609&greet=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=merch&targ=20609&mact=buy&targ_item=20022&quant=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=merch&targ=20609&mact=buy&targ_item=20122&quant=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=merch&targ=20609&mact=buy&targ_item=20223&quant=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=inv";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=inv&iact=equip&targ_item=20022&targ_char=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=inv&iact=equip&targ_item=20122&targ_char=2";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=inv&iact=equip&targ_item=20223&targ_char=3";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml";
}
if(pathIndex == 7577-1){
GM_setValue("healingItem",30023)
}
if(pathIndex == 8151-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=merch&targ=30203&greet=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=merch&targ=30203&mact=buy&targ_item=10030&quant=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=merch&targ=30203&mact=buy&targ_item=10130&quant=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=merch&targ=30203&mact=buy&targ_item=10230&quant=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=merch&targ=30203&mact=buy&targ_item=20030&quant=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=merch&targ=30203&mact=buy&targ_item=20130&quant=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=merch&targ=30203&mact=buy&targ_item=20230&quant=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=inv";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=inv&iact=equip&targ_item=10030&targ_char=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=inv&iact=equip&targ_item=10130&targ_char=2";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=inv&iact=equip&targ_item=10230&targ_char=3";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=inv&iact=equip&targ_item=20030&targ_char=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=inv&iact=equip&targ_item=20130&targ_char=2";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=inv&iact=equip&targ_item=20230&targ_char=3";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=skills&buy_char=1&buy_char=1&confirm=1&skopt_9101=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=skills&buy_char=1&buy_char=1&confirm=1&skopt_9101=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=skills&buy_char=1&buy_char=1&confirm=1&skopt_9101=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=skills&buy_char=1&buy_char=1&confirm=1&skopt_9101=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=skills&buy_char=1&buy_char=1&confirm=1&skopt_9101=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=skills&buy_char=1&buy_char=1&confirm=1&skopt_9101=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=skills&buy_char=1&buy_char=1&confirm=1&skopt_9101=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=skills&buy_char=2&buy_char=2&confirm=1&skopt_9601=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=skills&buy_char=2&buy_char=2&confirm=1&skopt_9601=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=skills&buy_char=2&buy_char=2&confirm=1&skopt_9601=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=skills&buy_char=2&buy_char=2&confirm=1&skopt_9601=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=skills&buy_char=2&buy_char=2&confirm=1&skopt_9601=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=skills&buy_char=2&buy_char=2&confirm=1&skopt_9601=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=skills&buy_char=2&buy_char=2&confirm=1&skopt_9601=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=skills&buy_char=3&buy_char=3&confirm=1&skopt_9501=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=skills&buy_char=3&buy_char=3&confirm=1&skopt_9501=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=skills&buy_char=3&buy_char=3&confirm=1&skopt_9501=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=skills&buy_char=3&buy_char=3&confirm=1&skopt_9501=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=skills&buy_char=3&buy_char=3&confirm=1&skopt_9501=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=skills&buy_char=3&buy_char=3&confirm=1&skopt_9501=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=skills&buy_char=3&buy_char=3&confirm=1&skopt_9501=1";
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml";
GM_setValue("healingItem",30031)
}
if(pathIndex == 8241-1){
GM_setValue("healingItem",30022)
}
if(pathIndex == 8271-1){
GM_setValue("healingItem",30031)
}
if(pathIndex == 8392-1){
GM_setValue("healingItem",30032)
}
if(pathIndex == 8582-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=talk&targ=30504&say=join";
}
if(pathIndex == 8597-1){
alert("Character crap.");
}
if(pathIndex == 8733-1){
alert("Character crap.");
}
if(pathIndex == 8807-1){
alert("Character crap.");
}
if(pathIndex == 8874-1){
alert("Character crap.");
}
if(pathIndex == 8900-1){
alert("Character crap.");
}
if(pathIndex == 9263-1){
alert("Character crap.");
}
if(pathIndex == 9361-1){
alert("Character crap.");
}
if(pathIndex == 9531-1){
document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?act=travel&mode=2";
}
if(pathIndex == 10606-1){
alert("Character crap.");
}
if(pathIndex == 11208-1){
GM_setValue("healingItem",30053)
alert("Character crap.");
}
if(pathIndex == 12254-1){
alert("Character crap.");
}
if(pathIndex == 12591-1){
alert("Character crap.");
}




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
window.setTimeout(function() { document.location.href="http://www.neopets.com/games/nq2/nq2.phtml" }, 60);