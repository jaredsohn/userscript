// ==UserScript==
// @name           Font Must Die
// @namespace      Hacked from an O'Reilly.com greasemonkey Google-customizing script and DiveIntoGreasemonkey's 'Scourge of Arial' script
// @description    Replaces font tags with a CSS-styled span. Removes all instances of Comic Sans MS.
// @include        http://*
// ==/UserScript==

//comment out the "countFontTags( )" line at end of script to suppress notification of number of tags replaced.

function countFontTags( ) {
	var arFontTags = document.getElementsByTagName('font');
	if (arFontTags.length) {
			var banner = document.createElement('div');
		// add the text to the div
		banner.innerHTML = '<div style=\"margin: 0px auto; padding: 2px; border-top: 1px solid #000; font-size: small; background-color: #fff; color: #666;\"><p style=\"text-align: center ! important; font-family: sans-serif;\">FontMustDie stripped ' + arFontTags.length + ' font tags from this document.<\/p>';
		// append newly created DIV element to the body
		document.body.insertBefore(banner, document.body.lastChild.nextSibling);
	}
}

function removeFontTags( ) {
	// remove font tags
	var arFontTags = document.getElementsByTagName('font');
	
	for (var i = arFontTags.length - 1; i >= 0; i--) {
		var elmFontTag = arFontTags[i];
		var elmSpan = document.createElement('span');
		elmSpan.innerHTML = elmFontTag.innerHTML;
		elmSpan.style.color = 'black';
		elmSpan.style.fontFamily = 'sans-serif ! important';
		elmFontTag.parentNode.replaceChild(elmSpan, elmFontTag);
	}
}

function replaceSans( ) {
	//Find and replace tags with a face value of 'Comic Sans MS'
	var comicSans = document.getElementsByTagName('*');
	for (var i = comicSans.length - 1; i >= 0; i--) {
		//Replace all instances with default font
		var elm = comicSans[i];
		var style = getComputedStyle(elm, '');
		elm.style.fontFamily = style.fontFamily.replace(/Comic Sans MS/i, 'sans-serif ! important');
	}
}

countFontTags( );
removeFontTags( );
replaceSans( );