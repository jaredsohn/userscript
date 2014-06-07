// ==UserScript==
// @name        Dunning-Krugerrands
// @namespace   YOSPOS
// @include     *
// @version     1
// ==/UserScript==



var replacers = [
	{
		'from': 'Bitcoins',
		'to': [
			'Dunning-Kruggerrands',
			'Pounds Sperging',
			'Autism Kroner',
			'Buttcoins'
		]
	},
	{
		'from': 'BITCOINS',
		'to': [
			'DUNNING-KRUGGERRANDS',
			'POUNDS SPERGING',
			'AUTISM KRONER',
			'BUTTCOINS'
		]
	},
	{
		'from': new RegExp('bitcoins', 'i'),
		'to': [
			'Dunning-Kruggerrands',
			'pounds sperging',
			'autism kroner',
			'buttcoins'
		]
	},
	{
		'from': 'Bitcoin',
		'to': [
			'Dunning-Kruggerrand',
			'Pound Sperging',
			'Autism Krone',
			'Buttcoin'
		]
	},
	{
		'from': 'BITCOIN',
		'to': [
			'DUNNING-KRUGGERRAND',
			'POUND SPERGING',
			'AUTISM KRONE',
			'BUTTCOIN'
		]
	},	
	{
		'from': new RegExp('bitcoin', 'i'),
		'to': [
			'Dunning-Kruggerrand',
			'pound sperging',
			'autism krone',
			'buttcoin'
		]
	},
	{
		'from': new RegExp('BTC', 'i'),
		'to': [
			'BUTT'
		]
	},
	{
		'from': new RegExp('XBT', 'i'),
		'to': [
			'X-BUTT'
		]
	},
	{
		'from': new RegExp('Mt\.? ?Gox', 'i'),
		'to': [
			'Magic: The Gathering: Online Exchange'
		]
	}
];



// with a butt tilt to http://goo.gl/nmWWiX
traverseDOM(document.body);

function traverseDOM(node)
{

    var child, sibling;

    // with a head tilt to goo.gl/s4D2JW
    switch (node.nodeType)
    {
        //skip these, we're not restructuring:
        case 1: // element
        case 9: // document
        case 11: // document fragmment
            child = node.firstChild;
            while (child)
            {
                sibling = child.nextSibling;
                traverseDOM(child);
                child = sibling; //they grow up so fast;
            }
            break;
        case 3: //text!
            processRegex(node);
            break;
        default: //skip types we don't explicitly handle
            break;
    }
} //traverseDOM()



function processRegex(textNodeType)
{
	var textNodeContent = textNodeType.nodeValue;
	for (var i = 0; i < replacers.length; i++) {
		textNodeContent = textNodeContent.replace(
			replacers[i]['from'],
			function() {
				return replacers[i]['to'][Math.floor(Math.random() * replacers[i]['to'].length)];
			}
		);
	}
	textNodeType.nodeValue = textNodeContent;
}
