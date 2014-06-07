// ==UserScript==
// @name           make bet
// @namespace      crashnburn11
// @include        *kingdomofloathing.com/bet.php*
// @include	   *127.0.0.1:60080/bet.php*
// ==/UserScript==

var makebet = document.evaluate('//input[@value="Make Bet"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
var betamount = document.evaluate('//input[@name="howmuch"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
var search = document.evaluate('//input[@value="Search"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
var num_bets;
if(makebet)
{
	make_bet();
}
var betvalue = GM_getValue("betvalue",1000);
var num_left = GM_getValue("num_left",0);

btn = document.createElement('input');
btn.type = "button";
btn.size = 1;
btn.value = "Stop Betting";
btn.addEventListener('click', stopBetting, false);
if(num_left > 1 && makebet)
{	
	num_left--;
	betamount.value = betvalue;
	//GM_log("setval1");
	GM_setValue("num_left", parseInt(num_left));
	num_bets.value = num_left;
	makebet.click();
	makebet.parentNode.insertBefore(btn, makebet);
	
} else if(!makebet && num_left > 1)
{	GM_log("no makebet");
	search.parentNode.insertBefore(btn, search);
	setTimeout(research, 20000);
}

function research()
{	GM_log("searching");
	search.click();	
}

function make_bet()
{
	num_bets = document.createElement('input');
	num_bets.type = "text";
	num_bets.size = 3;
	makebet.parentNode.insertBefore(num_bets, makebet);
	//GM_log("inserted");
	makebet.addEventListener('click',sizebet, false);

}

function sizebet()
{
	if(betamount.value.replace(/,/g, '') == "" || betamount.value.replace(/,/g, '') < 1000){
		betamount.value = 1000;
	} else 
	{
		//GM_log("setval2" + betamount.value);
		GM_setValue("betvalue",parseInt(betamount.value.replace(/,/g, '')));
	}
	//GM_log(num_bets.value);
	num_left = parseInt(num_bets.value);
	GM_setValue("num_left", num_left);
	makebet.click();
}

function stopBetting()
{
	GM_setValue("num_left",0);
}