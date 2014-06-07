// ==UserScript==
// @name           BvS Pachinko Max Balls
// @namespace      BvS Pachinko Max Balls
// @description    Default use maximum amount of balls available and select the right options for the billy bucket machine.
// @include        http://*animecubed.com/billy/bvs/partyhouse-pachinkoplay.html
// @history        0.03 Be more intelligent with ball use on BillyBucket machine
// @history        0.02 Fix possible errors on bawg, added autoselection for billy bucket machine.
// @history        0.01 Initial release.
// @version        0.03
// @licence        MIT; http://www.opensource.org/licenses/mit-license.php
// @copyright      2011, BenV
// ==/UserScript==

function fail(error)
{
	// Debug:
	// alert("Failed: "+error);
	return 1;
}

function getTurns(t)
{
	var re = /Turns:\s*(\d+)/;
	if (match = re.exec(t))
	{
		return parseInt(match[1]);
	}
	return fail("Could not determine turns from ["+t+"]");
}

function setBalls(i)
{
	var tmp = document.evaluate("//form/input[@name='numdrop']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if (tmp.snapshotLength)
	{
		tmp.snapshotItem(0).value = i;
		return true;
	}
	return false;
}

function main()
{
	// Get amount of balls
	var balls;
	var tmp = document.evaluate("//b/i[contains(./text(), 'Pachinko Balls')]/parent::b", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if (!tmp.snapshotLength)
		return fail("Could not detect amount of pachinko balls");

	var elm = tmp.snapshotItem(0).textContent;
	if (elm !== null)
	{
		// Pachinko Balls:         Electrum: 0       Bronze: 0       Silver: 0       Gold: 2699
		var rePattern = /Electrum:\s*(\d+)[\s\S]*Bronze:\s*(\d+)[\s\S]*Silver:\s*(\d+)[\s\S]*Gold:\s*(\d+)/i;
		if (balls = rePattern.exec(elm))
		{
			balls.shift();
		}
	}

	// Get type of balls needed.
	// Uses: <b><i>Gold</i> Balls</b> <-- <form name="dropball" ...>
	tmp = document.evaluate("//form[@name='dropball']/b/i/text()", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var type = 0;
	if (!tmp.snapshotLength)
		return fail("Could not determine ball type needed.");

	type = tmp.snapshotItem(0).textContent;
	if (type == "Electrum") type = 0;
	else if (type == "Bronze") type = 1;
	else if (type == "Silver") type = 2;
	else if (type == "Gold") type = 3;
	else
	{
		// Can't figure out the type. Script needs update.
		return fail("Could not determine ball type needed, new ball type? ["+type+"]");
	}

	// Set balls
	var amount = balls[type];
	if (amount > 1000)
		amount = 1000;
	setBalls(amount);

	// For billybucket make sure the checkbox is lit
	tmp = document.evaluate("//form/input[@name='pmachine']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if (tmp.snapshotLength && parseInt(tmp.snapshotItem(0).value) == 4)
	{
		tmp = document.evaluate("//input[@name='pachistopj']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		if (tmp.snapshotLength) tmp.snapshotItem(0).checked = 'checked';

		// Also set the right slot. First we want locks 1 and 3 open, the 2.
		// Get open locks:
		var left   = 0;
		var center = 0;
		var right  = 0;
		// <b>Timed Opens:</b></font><font style="font-size:12px"><br><b>Right Lock (Lock 3)</b> Open! Turns: 25
		tmp = document.evaluate("//b[contains(./text(), 'Right Lock')]/parent::font", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		if (tmp.snapshotLength)
		{
			right = getTurns(tmp.snapshotItem(0).textContent);
		}
		tmp = document.evaluate("//b[contains(./text(), 'Left Lock')]/parent::font", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		if (tmp.snapshotLength)
		{
			left = getTurns(tmp.snapshotItem(0).textContent);
		}
		tmp = document.evaluate("//b[contains(./text(), 'Center Lock')]/parent::font", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		if (tmp.snapshotLength)
		{
			center = getTurns(tmp.snapshotItem(0).textContent);
		}

		// Set the correct gate
		tmp = document.evaluate("//form/select[@name='wheredrop']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		if (!tmp.snapshotLength)
			return fail("Could not find the wheredrop selection");;
		// First lock left
		if (!left)
		{
			tmp.snapshotItem(0).selectedIndex = 0;
		}
		// Then right
		else if (!right)
		{
			tmp.snapshotItem(0).selectedIndex = 2;
		}
		// If those are locked use center.
		else
		{
			tmp.snapshotItem(0).selectedIndex = 1;
			// Make sure we don't toss too many balls in here once we have a lock
			var min = left;
			if (right < min) min = right;
			if (amount > min)
			{
				setBalls(min);
			}
		}
	}
}

main();
