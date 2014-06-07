// ==UserScript==
// @name           All Lives
// @namespace      loot.guildportal.com
// @include        http://my.ddo.com/character/*
// ==/UserScript==

var myLives=new Array();
var numLives=0;

{
	CountLives();
	var t=setTimeout("updateLives()",5000);
	updateLives();
	var div1 = document.getElementById('ancestor_controls');
	div1.style.marginLeft="52px";
	var div = document.getElementById('cs_lineage');
	if (numLives>10)
	{
		div.style.height="64px";
	}
	if (numLives>20)
	{
		div.style.height="96px";
	}
	if (numLives>40)
	{
		div.style.height="128px";
	}

}

function OnImageClick()
{
updateLives();
}

function CountLives()
{
	numLives=0;
	for (numLives=0;numLives<64;numLives++)
	{
		life=document.getElementById("anc_con_"+numLives);
		if (life==null)
		{
			break;
		}
		myLives[numLives]=life;
	}

}

function romanise (num) {
	if (!+num)
		return false;
	var	digits = String(+num).split(""),
		key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
		       "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
		       "","I","II","III","IV","V","VI","VII","VIII","IX"],
		roman = "",
		i = 3;
	while (i--)
		roman = (key[+digits.pop() + (i * 10)] || "") + roman;
	return Array(+digits.join("") + 1).join("M") + roman;
}

function updateLives()
{
	for (i=0;i<numLives;i++)
	{
		life=myLives[i];
		if (life==null)
		{
			break;
		}
		life.onclick=OnImageClick;
		if (i<5)
		{
			life.src="http://content.turbine.com/sites/my.ddo.com/themes/default/media/base/charsheet/anc_tabs/"+(i+1)+"_off.png";
		}
		else
		{
			life.src="";
			life.alt=romanise((i+1));
			life.style.width="32px";
			life.style.border="1px solid #000000";
			life.style.borderBottom="none";
			life.style.height="26px";
			life.style.marginRight="2px";
			life.align="centre";
		}
	}
}