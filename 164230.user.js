// ==UserScript==
// @name		Unicreatures Potions Everywhere
// @namespace		ucpotionseverywhere
// @author		https://userscripts.org/users/511406
// @downloadURL 	https://userscripts.org/scripts/source/164230.user.js
// @updateURL		https://userscripts.org/scripts/source/164230.meta.js
// @description		Shows potions everywhere you might need them
// @include		http://unicreatures.com/explore.php*
// @include		http://www.unicreatures.com/explore.php*
// @include		http://unicreatures.com/inventory.php*
// @include		http://www.unicreatures.com/inventory.php*
// @include		http://unicreatures.com/arena_*
// @include		http://www.unicreatures.com/arena_*
// @include		http://unicreatures.com/train.php*
// @include		http://www.unicreatures.com/train.php*
// @include		http://unicreatures.com/interact.php*
// @include		http://www.unicreatures.com/interact.php*
// @version		1.0
// @grant		GM_getValue
// @grant		GM_setValue
// @grant		GM_xmlhttpRequest
// ==/UserScript==

var bottom_ad = document.getElementById("bottom_ad");
var potions = new Array();
var potids = new Array();
var ucid = eatCookie("unicreatureid");
var content;


potions = GM_getValue("potions");

//If potion brewing fails, go to inventory to get some
if(typeof potions == "undefined")
{
	potions = new Array(new Array("potion_blue","Refresh Potion","?","#"), new Array("potion_pink","Vigor Potion","?","#"), new Array("potion_green","Moxie Potion","?","#"), new Array("potion_yellow","Vitality Potion","?","#"));
	
	var cookie = document.cookie;
	var host = window.location.hostname;
	
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://" + window.location.hostname + "/inventory.php",
		headers: {
			"Host": host,
			"Cookie": cookie
		},
		onload: function(response) {
			content = response.responseText;
			syncInv();
		}
	});
}
//Potions brewed
else
{
	potions = JSON.parse(potions);
}

//potion id things
for(var i = 0; i < potions.length; i++)
{
	potids[potions[i][0]] = i;
}

//Are we exploring?
if(document.URL.indexOf("explore") > 0 || document.URL.indexOf("interact") > 0)
{
	addPotion(0);
	addPotion(1);
	wiretap();
}
// In the arena?
else if(document.URL.indexOf("arena_") > 0)
{
	addPotion(0);
	addPotion(2);
	wiretap();
}
//Training?
else if(document.URL.indexOf("train") > 0)
{	
	addPotion(0);
	addPotion(3);
	wiretap();
}//INTERACTING???
else if(document.URL.indexOf("interact") > 0)
{	
	addPotion(0);
	addPotion(1);
	wiretap();
}
//We must be in the inventory
else
{
	//Our inventory?
	if(getParameterByName("id") == ucid || typeof getParameterByName("id") == "undefined")
	{
		content = document.getElementsByClassName("content")[0].innerHTML;
			
		//might as well sync while we're here
		syncInv();
	}	

}

//Gotta keep an eye on those potions
function wiretap()
{
	var subject;

	for(var i = 0; i < potions.length; i++)
	{
		subject = document.getElementById(potions[i][0]);
		
		if(subject != null)
		{		
			subject.addEventListener("click", function(e){potionClicked(e)}, false);
		}
	}
}

//Clicked a potion
function potionClicked(e)
{
	//Change potion counter on page
	id = e.target.parentNode.id;
	potions[potids[id]][2]--;
	document.getElementById("x"+id).innerHTML = potions[potids[id]][2];
	
	var cookie = document.cookie;
	var host = window.location.hostname;
	
	//Tell Mr Stevie we're drinking a potion
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://" + host + "/" + potions[potids[id]][3],
		headers: {
			"Host": host,
			"Cookie": cookie
		}
	});
	
	//Tell GM to remember what we just did
	GM_setValue("potions", JSON.stringify(potions));
}

//Show a potion on the page
function addPotion(type)
{
	bottom_ad.innerHTML += "<span style='padding-left: 20px'></span><a href='#' id='" + potions[type][0] + "'><img src='./images/items/" + potions[type][0] + ".png' border='0' style='max-height:48px;max-width:48px;'></a>(<span id='x" + potions[type][0] + "'>" + potions[type][2] + "</span>)";
}

//Eat a cookie (probably only for the UC id)
function eatCookie(name)
{
	var i,x,y,cookies=document.cookie.split(";");
	
	for (i=0;i<cookies.length;i++)
	{
		x=cookies[i].substr(0,cookies[i].indexOf("="));
		y=cookies[i].substr(cookies[i].indexOf("=")+1);
		x=x.replace(/^\s+|\s+$/g,"");
		
		if (x==name)
		{
			return unescape(y);
		}
	}
}

//Not stolen from somewhere o.o
function getParameterByName(name)
{
	name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	var regexS = "[\\?&]" + name + "=([^&#]*)";
	var regex = new RegExp(regexS);
	var results = regex.exec(window.location.search);
	if(results == null)
		return undefined;
	else
	return decodeURIComponent(results[1].replace(/\+/g, " "));
}

//Get amount of potions there are
function getAmount(type)
{
	var i;
	var j;
	var amount = 0;

	i = content.lastIndexOf(potions[type][1]);
	if(i>0)
	{
		i += potions[type][1].length + 2
		j = content.substr(i).indexOf(")");
		amount = content.substr(i, j)
	}
	
	return amount;
}

//Get URL of said potions
function getURL(type)
{
	var i;
	var j;

	i = content.lastIndexOf(potions[type][1]);
	i = content.substr(0, i).lastIndexOf("<a href") + 9;
	j = content.substr(i).indexOf("title=") - 2;
	
	return content.substr(i, j);
}

//Sync function that does things and syncs
function syncInv()
{
	for(var i = 0; i < potions.length; i++)
	{
		potions[i][2] = getAmount(i);
		
		if(potions[i][2] > 0)
		{
			potions[i][3] = getURL(i);
		}
	}
	
	//SYNC DAT
	GM_setValue("potions", JSON.stringify(potions));
}