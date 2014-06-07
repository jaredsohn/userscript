// ==UserScript==
// @name           BvS pigeons
// @namespace      BvS pigeons
// @description    Show info about current game
// @include        http://animecubed.com/billy/bvs/partyhouse-keno.html
// @include			*localhost*/partyhouse-keno.html
// @history        0.01 
// @licence        MIT; http://www.opensource.org/licenses/mit-license.php
// @copyright      2011, Rurin
// ==/UserScript==

function main() 
{
	var tmp = document.evaluate("//font/b[contains(./text(), 'Winner!')]/preceding-sibling::b", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var winningNumbers = 0;
	for(var i = 0; i <  tmp.snapshotLength; i++) 
	{
		var elm = tmp.snapshotItem(i).textContent;
		if (elm !== null)
		{
			var wn = parseInt(elm);
			if (wn == 0) wn = 1;
			else if (wn < 6) wn = 0;
			winningNumbers += wn;
		}
	}
	if (tmp.snapshotLength) 
	{
		var tmp = document.evaluate("//font//b[contains(./text(), '??? Ryo')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var nQ = parseInt(tmp.snapshotLength);
		var nH = parseInt(nQ / 4);
		nQ %= 4;
		var tl = nH + " hours " + (nQ * 15) + " minutes left.<br/>";
	
		tmp = document.evaluate("//td[contains(./text(), 'Total Turn-In Reward:')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		if (tmp.snapshotLength)
		{
			tmp = tmp.snapshotItem(0);
			var txt = "Winning numbers: " + winningNumbers + " <br/>";
			txt += tl;
			tmp.innerHTML = txt + tmp.innerHTML;
		}
	}
	
	tmp = document.evaluate("//form/input[@name='quicktixa']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if (tmp.snapshotLength) tmp.snapshotItem(0).value = "96";
	
	tmp = document.evaluate("//form/input[@name='confbulktix']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if (tmp.snapshotLength) tmp.snapshotItem(0).checked = "checked";
}

main();
