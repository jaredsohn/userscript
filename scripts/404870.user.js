// ==UserScript==
// @name        /r/bitcoin alternate mode
// @namespace   YOSPOS
// @include     http://www.reddit.com/*
// @version     1
// ==/UserScript==

//http://i.imgur.com/pC1nbG0.png

var replacers = [
	[
		'be your own bank',
		'Kill Yourself'
	], [
		'wallet',
		'Baggie'
	], [
		'exchange',
		'Dealer'
	], [
		'merchant',
		'Junkie'
	], [
		'transaction',
		'Injection'
	], [
		'txn',
		'IJXN'
	], [
		'blockchain\.info',
		'needlebin.info'
	], [
		'blockchain',
		'Needle Bin'
	], [
		'(client|app)',
		'Spoon'
	], [
		'to the moon',
		'Chasing The Dragon'
	], [
		'signature',
		'Needle'
	], [
		'signed',
		'Injected'
	], [
		'protocol',
		'Molecule'
	], [
		'satoshi ?nak[ao]moto',
		'Mark Renton'
	], [
		'satoshi',
		'Gram'
	], [
		'coinbase',
		'FreeBase'
	], [
		'btc-e',
		'BTC-h'
	], [
		'bitstamp',
		'Bitsmack'
	], [
		'mt\.? ?gox',
		'Sinaloa Cartel'
	], [
		'mark ?karpeles',
		'Joaquín Guzmán Loera'
	], [
		'karpeles',
		'Guzmán'
	], [
		'\bmark\b',
		'Joaquín'
	], [
		'andreas (m\.? )?antonopoulos',
		'Philip Seymour Hoffman'
	], [
		'(andreasm?antonopoulos|andreasma|aantonop)',
		'PhilipSeymourHoffman'
	], [
		'antonopoulos',
		'Hoffman'
	], [
		'andreas',
		'Philip'
	], [
		'goxx?ed',
		'Overdosed'
	], [
		'(litecoin|ltc)s?',
		'Black Tar'
	], [
		'[dÐ]ogecoins?',
		'Krokodil'
	], [
		'[dÐ]oge',
		'Krok'
	], [
		'Ð',
		'KRK'
	], [
		'alt ?coin',
		'AltOpiate'
	], [
		'shibe',
		'Homeless Russian'
	], [
		'(mining|digging)[ _-]?rig',
		'Poppy Farm'
	], [
		'(ASIC|miner)',
		'Poppy Farm'
	], [
		'(mining|digging)',
		'Farming'
	], [
		'pool',
		'Cartel'
	], [
		'(butterfly ?labs|bfl)',
		'Taliban'
	], [
		'traditional',
		'Legal'
	], [
		'central authority',
		'concern for its users\' welfare'
	], [
		'fiat ?(money|currency|currencies|dollars)',
		'Cigarettes'
	], [
		'fiat',
		'Cigarettes'
	], [
		'crypto( ?currency)?',
		'Opiate'
	], [
		'currency',
		'Drug'
	], [
		'currencies',
		'Drugs'
	], [
		'money',
		'Drugs'
	], [
		'dollars?',
		'Cigarettes'
	], [
		'bank(st)?er',
		'Caseworker'
	], [
		'bank',
		'Needle Exchange'
	], [
		'scrypt',
		'Krokodil'
	], [
		'local[ _-]?bitcoins',
		'a dark alley'
	], [
		'japanese',
		'Mexican'
	], [
		'japan',
		'Mexico'
	], [
		'chinese',
		'Afghani'
	], [
		'china',
		'Afghanistan'
	], [
		'winklevoss',
		'Rakhimov'
	], [
		'decentrali[sz]ed',
		'Addictive'
	], [
		'digital',
		'Powdered'
	], [
		'(distributed|deflationary)',
		'Highly Toxic'
	], [
		'inflationary',
		'Quality-Controlled'
	], [
		'wild inflation',
		'Actual Quality Control'
	], [
		'inflation',
		'Quality Control'
	], [
		'(il)?liquidity',
		'constipation'
	], [
		'(il)?liquid',
		'constipated'
	], [
		'c[iy]pherpunk',
		'Heroinpunk'
	], [
		'internet',
		'Street'
	], [
		'believe in',
		'Shoot Up'
	], [
		'true believer',
		'Hopeless Addict'
	], [
		'(believer|fanatic)',
		'Addict'
	], [
		'bitcoinserious',
		'HeroinPure'
	], [
		'bitcoins? were',
		'Heroin Was'
	], [
		'(xbtc?|btc)',
		'H'
	], [
		'bitcoins?',
		'Heroin'
	], [
		'coins?',	//'coin',
		'Heroin'	//'Gram'
	], [
		'\bbit',
		'Heroin'
	]
];



traverseDOM(document);



function traverseDOM(node)
{
    var child, sibling;

    switch (node.nodeType)
    {
        case 1: // element
        case 9: // document
        case 11: // document fragmment
            child = node.firstChild;
            while (child)
            {
                sibling = child.nextSibling;
                traverseDOM(child);
                child = sibling;
            }
            break;
        case 3: //text
            processRegex(node);
            break;
    }
}



function processRegex(textNodeType)
{
	var textNodeContent = textNodeType.nodeValue;
	for (var i = 0; i < replacers.length; i++) {
		textNodeContent = textNodeContent.replace(
			new RegExp(replacers[i][0], 'ig'),
			function(match) {
				if (match == match.toUpperCase()) {
					return replacers[i][1].toUpperCase();
				} else if (match == match.toLowerCase()) {
					return replacers[i][1].toLowerCase();
				}
				return replacers[i][1];
			}
		);
	}
	textNodeType.nodeValue = textNodeContent;
}
