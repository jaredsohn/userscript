// ==UserScript==
// @name        Quackometer
// @namespace   http://thephysicspolice.blogspot.com/
// @description Detect and highlight probable quackery by weighted keywords.
// @grant       none
// @require     http://code.jquery.com/jquery-1.11.0.min.js
// ==/UserScript==

// Neologisms and buzzwords, +100 points each.
var hundreds = [
	'detox(ify|ification)?',
	'cleans(e|ing)',
	'big.p?harma',
	'super.?foods?',
	'home.?births?',
	'shills?',
	'sludge',
	'herb(s|al)?',
	'holistic',
	'homeopath(y|ic)?',
	'naturopath(y|ic)?',
	'chiropractic',
	'integrative medicine',
	'alternative medicine',
	'paleo',
	'atkins',
	'acai',
	'raw foods?',
	'raw milk',
	'organic',
	'franken.?foods?',
	'super.?weeds?',
	'no safe level',
	'no scientific consensus',
	'do(es)?n.t want you to know',
	'sheeple',
	'lame.?stream.media',
	'chem.?trails?',
	'gluten.free',
	'fluorid(e|ation)',
	'cancer',
	'carcinogens?',
	'tumors?',
	'boost your',
	'agent orange',
	'medical cartel',
	'(good|bad) for you',
	'juicing',
];

// Hot topics +50 points each.
var fifties = [
	'chelat(ed?|ion)',
	'(all.?)?natur(e|al|ally)',
	'mons(anto|atan)(.s)?',
	'supplements?',
	'thi(omer|mero)sal',
	'toxi(c|city|n|ns)',
	'poisons?',
	'cures?',
	'remed(y|ies)',
	'(un.?)?vaccin(es?|ations?|ated)',
	'autism',
	'chemicals?',
	'deadl(y|iest)',
	'guinea pigs?',
	'your health',
];

// Suspect topics, +10 points each.
var tens = [
	'ketosis',
	'heavy.metals?',
	'mercury',
	'arsenic',
	'alumini?um',
	'glyphosate',
	'round.?up(.ready)?',
	'GMO-free',
	'non-GMO',
	'GMOs',
	'un.?proven',
	'un.?tested',
	'aspartame',
	'splenda',
	'vitamins?',
	'diets?',
	'coconut',
	'turmeric',
	'curcumin',
	'side.?effects?',
	'scam',
]

// Links to scientific articles, -100 points each.
var sources = [
	'ncbi.nlm.nih.gov',
];

// Formulate regular expressions.
var rules = [
	[ 100, new RegExp('\\b(' + hundreds.join('|') + ')\\b', 'i')],
	[  50, new RegExp('\\b(' +  fifties.join('|') + ')\\b', 'i')],
	[  10, new RegExp('\\b(' +     tens.join('|') + ')\\b', 'i')],
	[-100, new RegExp('('    +  sources.join('|') + ')',    'i')],
];

var score = 0;

this.$ = this.jQuery = jQuery.noConflict(true);

this.jQuery.fn.highlight = function(weight, regex)
{
	console.log(weight, regex);
	function innerHighlight(node)
	{
		if(node.nodeType === 3)
		{
			// This is a text node.
			var pos = node.data.search(regex);
			if(node.data.length === 0) return 0; // No text.
			if(pos === -1)             return 0; // Not found.
			var match = node.data.match(regex);  // One match at a time.
			var spanNode = document.createElement('span');
			spanNode.className = 'highlight';
			var middleBit = node.splitText(pos);
			var endBit    = middleBit.splitText(match[0].length);
			spanNode.appendChild(middleBit.cloneNode(true));
			middleBit.parentNode.replaceChild(spanNode, middleBit);
			score += weight;
			return 1; // Skip this middleBit, but still need to check endBit.
		}
		if(node.nodeType === 1)
		{
			// This is an element node.
			if(!node.childNodes)                               return 0; // No children.
			if(node.tagName.match(/(script|style|textarea)/i)) return 0; // Skip JS/CSS.
				for(var i = 0; i < node.childNodes.length; i++)
					i += innerHighlight(node.childNodes[i]);
		}
		return 0;
	}
	return this.each(function()
	{
		innerHighlight(this);
	});
};
 
$(document).ready(function()
{
	// Only act on outermost frame.
	if(window.location != window.parent.location) return;

	for(var i in rules)
		$('body').highlight(rules[i][0], rules[i][1]);
	$('.highlight').css({
		backgroundColor: '#FF4',
		color: '#000'
	});
	$('<div></div>')
		.attr('id', 'quackometer')
		.text('Quackometer Score: ' + score.toLocaleString())
		.attr('title', 'Click to hide.')
		.css('position', 'fixed')
		.css('bottom', '25px')
		.css('left', '25px')
		.css('padding', '5px 10px')
		.css('font-family', 'sans-serif')
		.css('font-weight', 'bold')
		.css('font-size', '16px')
		.css('color', '#000')
		.css('background-color', '#FF4')
		.css('border', '1px solid #000')
		.css('z-index', '999')
		.css('cursor', 'pointer')
		.on({ 'click': function() { $(this).hide(); }})
		.appendTo('body');
});
