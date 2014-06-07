// ==UserScript==
// @name           sCSS
// @namespace      Hacked from some other scripts I have stolen (DesignMustDie).
// @description    Strips CSS. Some tags are replaced/removed. Classes can ge inserted for subsequent styling. Script and style links removed. 
// @include        http://*
// ==/UserScript==
// comment out the "countTags( )" line at end of script to suppress notification of number of tags replaced.

function removeTags( ) {
	// replace body tag
	//var arBodyTags = document.getElementsByTagName('body');
	//for (var i = arBodyTags.length - 1; i >= 0; i--) {
	//	var arBodyTag = arBodyTags[i];
	//	var elmBody = document.createElement('body');
	//	elmBody.innerHTML = arBodyTag.innerHTML;
	//	arBodyTag.parentNode.replaceChild(elmBody, arBodyTag);
	//}	
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
	// remove center tags
	var arCenterTags = document.getElementsByTagName('center');
	for (var i = arCenterTags.length - 1; i >= 0; i--) {
		var elmCenterTag = arCenterTags[i];
		var elmSpan = document.createElement('span');
		elmSpan.innerHTML = elmCenterTag.innerHTML;
		elmSpan.style.color = 'black';
		elmSpan.style.fontFamily = 'sans-serif ! important';
		elmCenterTag.parentNode.replaceChild(elmSpan, elmCenterTag);
	}	
}

function replaceFonts( ) {
	//Find and replace all CSS font styles with a sans-serif font
	var daFonts = document.getElementsByTagName('*');
	for (var i = daFonts.length - 1; i >= 0; i--) {
		//Replace all instances with default font
		var elm = daFonts[i];
		var style = getComputedStyle(elm, '');
		if (elm.style.fontFamily) {
			elm.style.fontFamily = style.fontFamily.replace(/.*/i, 'sans-serif ! important');
			}
		if (elm.style.fontSize) {
			elm.style.fontSize = style.fontSize.replace(/.*/i,'medium ! important');
		}
	}
}

function removeCss( ) {
	//remove all external CSS links
	var daLinks = document.getElementsByTagName('link');
	for (var i = daLinks.length -1; i >= 0; i--) {
		//replace the links with dummy links
		var elmLink = daLinks[i];
		var elmNewLink = document.createElement('link');
		elmLink.parentNode.replaceChild(elmNewLink,elmLink);
	}
	//remove all embedded styles
	var daStyles = document.getElementsByTagName('style');
	for (var i = daStyles.length -1; i >= 0; i--) {
		//replace the tags with empty blocks
		var elmStyle = daStyles[i];
		var elmNewStyle = document.createElement('style');
		elmStyle.parentNode.replaceChild(elmNewStyle,elmStyle);
	}
}

function removeScript( ) {
	//remove all script links
	var daScripts = document.getElementsByTagName('script');
	for (var i = daScripts.length -1; i >= 0; i--) {
		//replace the links with dummy links
		var elmScript = daScripts[i];
		var elmNewScript = document.createElement('script');
			elmScript.parentNode.replaceChild(elmNewScript,elmScript);
	}
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function fixLineBreak( ) {
	var arBrTags = document.getElementsByTagName('br');
	for (var i = arBrTags.length - 1; i >= 0; i--) {
		var elmBrTag = arBrTags[i];
		var elmSpan = document.createElement('span');
		elmBrTag.parentNode.replaceChild(elmSpan, elmBrTag);
	}
}

function doIt( ) {
//	removeScript( );
	removeCss( );
	replaceFonts( );
//	fixLineBreak( );
//	addGlobalStyle('body { color: black; font-size: 1em; line-height: 1.5; background-color: white ! important; background-image: url(\'foo.png\') ! important; }\np, span, h1, h2, h3, h4, h5, h6, ul, li, dd, dt, dl, div { color: inherit; background-color: inherit; line-height: 1.5; border: inherit; }\np, span, a, ul, li, dd, dt, dl, div { font-size: medium; }\ndiv { width: auto ! important; }\na { background-color: inherit; border: inherit; }\na.link { color: blue; background-color: inherit; text-decoration: underline; border: inherit; }\na.visited { color: purple; background-color: inherit; text-decoration: underline; border: inherit; }\na.hover, a.active { color: red; background-color: inherit; text-decoration: underline; border: inherit; }\ndiv.dmd { margin: 0px auto; padding: 2px; border-top: 1px solid #000 ! important; font-size: small; background-color: #fff; color: #666; }\np.dmd { border: 0px ! important; text-align: center ! important; font-family: sans-serif; }');
}

window.addEventListener(
    'load', 
	doIt( ),
    true);
