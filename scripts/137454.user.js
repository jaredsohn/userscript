// ==UserScript==
// @name        Test 1
// @description Testing some trading scripts
// @namespace   Bloop
// @include     *tf2outpost.com*
// @include	*tf2tp.com*
// @exclude	*tf2tp.com/myTrades.php*
// @exclude     *tf2outpost.com/trades*
// @version     1
// ==/UserScript==



trades = document.getElementsByClassName('trade');
for(i=0; i<trades.length;i++)
{
	trade=trades[i];
	text=trade.innerHTML.toLowerCase();
	if(text.search('quicksell')==-1){
		trade.style.display= 'none';
	}
	else if(text.search('quicksale')==-1){
		trade.style.display= 'none';
	}
	else if(text.search('quick sell')==-1){
		trade.style.display= 'none';
	}
	else if(text.search('quick sale')==-1){
		trade.style.display= 'none';
	}
}