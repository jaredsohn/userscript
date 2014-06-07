// ==UserScript==
// @name			AMO - Remove Link Protector
// @namespace		amo - remove protector
// @description		Removes Link Protectors on AMO.
// @include			https://addons.mozilla.org/*/*/addon/*
// ==/UserScript==

// version 0.02
// - Works on links that don't begin with 'http/https'
// @@ First Version @@

// test uri: https://addons.mozilla.org/en-US/firefox/addon/11243

// -*Logical Lines Of Code*-: 4

zeldaMMO = document.evaluate("//a[contains(@href,'outgoing.mozilla.org')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (i = 0; i < zeldaMMO.snapshotLength; i++)
	{
    	link = zeldaMMO.snapshotItem(i);

    	if (link.href.match(/\http\:.*\%3A/i))
    		{
				link.href = new RegExp('http\:\/\/outgoing\.mozilla\.org\/.*?\/.*?\/(.*)','i').exec(link.href)[1].replace('%3A','\:');
			}

		else
			{
				link.href = 'http\:\/\/' + new RegExp('http\:\/\/outgoing\.mozilla\.org\/.*?\/.*?\/(.*)','i').exec(link.href)[1].replace('%3A','\:');
			}
	}
