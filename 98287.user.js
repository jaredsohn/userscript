// ==UserScript==
// @name           Blacken Text
// @namespace      SeanSchricker
// @description    Blackens grey text for readability. Any grey text that's #666666 or darker is assumed by the script to be close enough to black that it WILL be turned black. This is to counteract the tendency of designers these days to make body text grey, unnecessarily reducing contrast. 
// @version        1.0
// @date           2011-3-03 
// @creator        Sean Schricker
// @include        *
// ==/UserScript==


// TODO: handle @import rules when they're in external link tags.

// use a 6-digit hash style color definition since this is also used for html styles.
var BLACK='#000000';
function darken(rule){
	if(rule.style && rule.cssText.indexOf('color')>=0){
		// Hash values convert internally into rgb(). --now using isGrey, so this isn't important here, but it's interesting.
		if(isGrey(rule.style['color'])){
			rule.style['color']=BLACK;
		}
	}
}
function cycleThroughRules(styleSheet){
	for(var i=0;i<styleSheet.cssRules.length;i++){
		switch(styleSheet.cssRules[i].type){
			case 3:
				cycleThroughRules(styleSheet.cssRules[i].styleSheet);
				break;
			case 1:
				darken(styleSheet.cssRules[i]);
		}
	}
}
function isLinkDifferentDomain(linkVal,windowObject){
	return (linkVal.indexOf('http')==0) && (linkVal.indexOf(windowObject.location.protocol + "//" + windowObject.location.hostname )!=0)
}
function isGrey(colorValue){
	// TODO: consider using a more dynamic test so the users can vary the number from 0x66 to something else.
	// TODO: consider !important because this lops it off if it exists.
	// TODO: consider where text is very dark but not quite solid grey. Maybe if the luminesence varies only by 0x11 or something, then we can expect that it's body text. This isn't the lowest-hanging fruit and it has a small amount of risk.

	// Only the most sociopathic designers use body text 
	// that's brighter than #666666, so if it's brighter, 
	// it probably needs to be, so leave it alone.
	// Also, i noticed mozilla sometimes greys its text by
	// using black text with alpha cranked down, so I added rgba.

	var greyPattern=(/rgba?\((\d|\d\d|101|102),\s*\1,\s*\1(?:,\s*[\d\.]+)?\)|#([0-6])(\2\2|\2\2\2\2\2)\b/);
	return greyPattern.test(colorValue);
}

function processFrame(_window){
	var doc=_window.document;

	// check for html styling on the body and on font tags.
	if(isGrey(doc.body.getAttribute('text'))){
		doc.body.setAttribute('text',BLACK);
	}

	var F=doc.getElementsByTagName('font');
	for(var i=0;i<F.length;i++){
		if(isGrey(F[i].getAttribute('color'))){
			F[i].setAttribute('color',BLACK)
		}
	}

	// if the css is from a different domain, then we have to do some trickery to grab it.
	var L=doc.getElementsByTagName('link');
	for(var i=0;i<L.length;i++){
		var Li=L[i];
		if(Li.getAttribute('rel')=='stylesheet' && (isLinkDifferentDomain(Li.getAttribute('href'),_window))){
			GM_xmlhttpRequest({
				method: "GET",
				url: Li.getAttribute('href'),
				onload: function(response) {
					var style = doc.createElement('style');
					style.innerHTML=response.responseText.replace(/([^-])color\w*:\w*([^;}{]+)/g,function(){
						// we want to affect only TEXT color, so see if 'color' is preceeded by a dash
						// AND I could have just named these arguments in the anonymous function definition, 
						// but if I add any other parts, it can get weird.
						var preceeding=arguments[1];
						var colorValue=arguments[2];

						if((preceeding!='-') && isGrey(colorValue) ){
							return preceeding+'color:'+BLACK;
						}else{
							return arguments[0];
						}
					});
					Li.parentNode.insertBefore(style,Li);
					setTimeout(function(){
						//alert(LI.getAttribute('href'))
						LI.parentNode.removeChild(LI);
					},100);
				}
			});

		}
	}

	for(var i=0;i<document.styleSheets.length;i++){
		cycleThroughRules(document.styleSheets[i])
	}
	for(var i=0;i<_window.frames.length;i++){
		processFrame(_window.frames[i]);
	}

}
processFrame(unsafeWindow);
