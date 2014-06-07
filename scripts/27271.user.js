// ==UserScript==
// @name Random Signature Generator
// @author Brian Marshall
// @namespace http://beyondboredom.net/projects/random_sig/
// @version 1.5
// @description Randomizes your signature on GameFAQs.
// @include http://boards.gamefaqs.com/*
// ==/UserScript==

var done = 0;

function doSig()
{
	if (
	  window.location.href.match(/^http:\/\/boards\.gamefaqs\.com\/gfaqs9?\/(post|genmessage|gentopic)\.php/)
	  && !document.body.innerHTML.match("<h1>New Message Preview</h1>")
	  && !document.body.innerHTML.match("<h1>New Topic Preview</h1>")
	  && !document.body.innerHTML.match("<h1>Post Error</h1>")
	  && done == 0
	)
	{		
		var text, sigs, this_sig, check_sig_length, disabled, extra_chars;
		
		// some configuration
		
		// set to false to disable checking signature length after the random
		// signature is appended
		check_sig_length = true;
		
		// signatures
		// escape any single quotes with \
		//   'foo\'bar'
		//
		// proceed every signature entry with a comma after the quotation mark
		//   sigs = [
		//   'foo',
		//   'bar',
		//   'foobar',
		//   ];
		
		// Edit this array.                                               .SIGS.
		sigs = [
		'At The Other Forward, 6\'7" from Kansas, The Captain aaannd The Truth, Number 34 Paaaull Piiercee!',
		'At One Forward, 6\'11" from Farragut Academy High School, Number 5, KG, Kevinnn Garrrnett!',
		'And now, Introducing your Boosstonn Ceeellticss!',
		'At The Other Guard, 6\'5" from Connecticut, Number 20 Raaay Allenn!',
		'At One Guard, 6\'4" from Kentucky, Number 9 Raaajonn Rondoo!',
		'At Center. 6\'11", from Clifton J. Ozen High School, Number 43 Kennndriiick Perrrkinss!',
		];
		
		// get the textarea
		text = document.getElementsByTagName('textarea');
		
		// no textarea, abort
		if ( !text[0] ) return;
		
		// find a random sig
		this_sig = sigs[Math.floor(Math.random() * sigs.length)];
		
		// this is optional, but it adds an extra new line to the
		// textarea so there's a blank line before the signature
		// separator. feel free to comment it out.
		//text[0].value = "\n" + text[0].value;
		
		// if there's no signature separator, add one
		if ( !text[0].value.match("---") ) text[0].value = "\n---";
		
		// insert the signature
		text[0].value += "\n" + this_sig;
		
		// check if we're over the limit
		if ( text[0].value.length > 165 && check_sig_length )
		{
			disabled = document.createAttribute('disabled');
			disabled.nodeValue = 'disabled';
			
			text[0].setAttributeNode(disabled);
			
			extra_chars = text[0].value.length - 165;
			
			alert("Your signature exceeds the signature character limit by " +
			extra_chars + " characters. If you want to disable signature length "+
			"checking, set check_sig_length to false in the JavaScript file.");
		}
		
		done = 1;
	}
}

window.setTimeout(doSig,10);
window.setTimeout(
function setEvent() {
	var qplink = document.getElementById('gamefox-quickpost-link');
	if ( qplink )
		qplink.addEventListener('click', doSig, true);
},
100);