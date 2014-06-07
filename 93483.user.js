// ==UserScript==
// @name           BvS Quest Hotkeys
// @namespace      Quests
// @description    Adds hotkeys for quest attempts.
// @include        http://www.animecubed.com/billy/bvs/questattempt.html
// ==/UserScript==



function process_event(event) {
	if (event.keyCode==70){      //f
		document.forms.namedItem("minim4").wrappedJSObject.submit();
				
		if(document.forms.namedItem("attack"))
        		document.forms.namedItem("attack").wrappedJSObject.submit();

		if(document.forms.namedItem("goquest"))
        		document.forms.namedItem("goquest").wrappedJSObject.submit();
		
		if(document.forms.namedItem("goquest2"))
        		document.forms.namedItem("goquest2").wrappedJSObject.submit();

		if(document.forms.namedItem("goquestgo"))
        		document.forms.namedItem("goquestgo").wrappedJSObject.submit();
   
		if(document.forms.namedItem("questcontinue"))
        		document.forms.namedItem("questcontinue").wrappedJSObject.submit();

		if(document.forms.namedItem("skipchu"))
        		document.forms.namedItem("skipchu").wrappedJSObject.submit();
	}
}
window.addEventListener("keyup", process_event, false);