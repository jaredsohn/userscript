// ==UserScript==
// @name			Basilmarket - Remove Link Protector
// @namespace		basilmarket - remove protector
// @description		Removes Link Protectors on Basilmarket
// @include			http://www.basilmarket.com/forum/*
// ==/UserScript==

// version 0.02
// - Removes alt-text on youtube links
// @@ First Version @@

// -*Logical Lines Of Code*-: 10

zeldaMMO = document.evaluate("//a[contains(@href,'bye.php')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (i = 0; i < zeldaMMO.snapshotLength; i++)
	{
    	link = zeldaMMO.snapshotItem(i);

		if (link.href.match(/http\:.*\:/i))
			{
				link.href = new RegExp('bye\.php(.*)','i').exec(link.href)[1].replace('\?u\=','');
			}

		else
			{
				link.href = 'http\:\/\/' + new RegExp('bye\.php(.*)','i').exec(link.href)[1].replace('\?u\=','');
			}
	}

zeldaMMO = document.evaluate("//a[contains(@href,'youtube')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (i = 0; i < zeldaMMO.snapshotLength; i++)
	{
		link = zeldaMMO.snapshotItem(i);
		link.removeAttribute('title');
	}
