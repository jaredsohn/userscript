// ==UserScript==
// @name           Whirlcode for wiki and new thread page
// @namespace      whirpool
// @description    adds whirlcode buttons to a new thread page and wiki entries on forums.whirlpool.net.au
// @version    0.2
// @include        http://forums.whirlpool.net.au/forum-reply.cfm?f=*
// @include        http://forums.whirlpool.net.au/wiki/?action=edit*
// ==/UserScript==

if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
	$ = unsafeWindow.jQuery;
}

var tArea;

var dUrl = document.URL.indexOf('wiki/?action=edit')>-1;

(dUrl)? tArea = $('textarea#f_body'): tArea = $('textarea#body');



//var bt = document.evaluate( '/html/body/table/tbody/tr/td[2]/div/form/div/table/tbody/tr[3]/td[2]' ,document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;

//kitchen sink
/*******whirlcode********/

var whirlCode = { 	                
					wc_whirlBold :			{ encloseLeft : "[*", encloseRight  : "*]"},
					wc_whirlItalic :		{ encloseLeft : "[/", encloseRight  : "/]"},
					wc_whirlSingleQuote :	{ encloseLeft : "['", encloseRight  : "']"},
					wc_whirlDoubleQuote :	{ encloseLeft : "[\"", encloseRight  : "\"]"},
					wc_whirlQuote :			{ encloseLeft : "[+", encloseRight  : "+]"},
					wc_whirlSuperscript :	{ encloseLeft : "[^", encloseRight  : "^]"},
					wc_whirlSubscript :		{ encloseLeft : "[\\", encloseRight  : "\\]"},
					wc_whirlStrike :		{ encloseLeft : "[-", encloseRight  : "-]"},
					wc_whirlCourier :		{ encloseLeft : "[#", encloseRight  : "#]"},
					wc_whirlSmall :			{ encloseLeft : "[(", encloseRight  : ")]"},
					wc_whirlGrey :			{ encloseLeft : "[`", encloseRight  : "`]"},
					wc_whirlSerif :			{ encloseLeft : "[~", encloseRight  : "~]"},
					wc_whirlGoogle :		{ encloseLeft : "[?", encloseRight  : "?]"},
					wc_whirlEscape :		{ encloseLeft : "[.", encloseRight  : ".]"},
					wc_whirlWiki :			{ encloseLeft : "[[", encloseRight  : "]]"}
			   }; 

/********whirlcode buttons*********/

var wcButtons = '<div id="buttonsDiv" style="text-align:center;">' +
			'<button type="button" class="wcodeButtons" title="Bold WhirlCode" accesskey="b" id="wc_whirlBold" >Bold</button>' +
			'<button type="button" class="wcodeButtons" title="Italic WhirlCode" accesskey="i" id="wc_whirlItalic" >Italic</button>' +
			'<button type="button" class="wcodeButtons" title="SingleQuote WhirlCode" accesskey="t" id="wc_whirlSingleQuote" >\'quote\'</button>' +
			'<button type="button" class="wcodeButtons" title="DoubleQuote WhirlCode" accesskey="q" id="wc_whirlDoubleQuote" >"quote"</button>' +
			'<button type="button" class="wcodeButtons" title="Quote WhirlCode" accesskey="h" id="wc_whirlQuote" >who</button>' +
			'<button type="button" class="wcodeButtons" title="Superscript WhirlCode" accesskey="p" id="wc_whirlSuperscript" >Super</button>' +
			'<button type="button" class="wcodeButtons" title="Subscript WhirlCode" accesskey="\\" id="wc_whirlSubscript" >Sub</button>' +
			'<button type="button" class="wcodeButtons" title="Strike WhirlCode" accesskey="k" id="wc_whirlStrike" >Strike</button>' +
			'<button type="button" class="wcodeButtons" title="Courier WhirlCode" accesskey="c" id="wc_whirlCourier" >Courier</button>' +
			'<button type="button" class="wcodeButtons" title="Small WhirlCode" accesskey="m" id="wc_whirlSmall" >Small</button>' +
			'<button type="button" class="wcodeButtons" title="Grey WhirlCode" accesskey="r" id="wc_whirlGrey" >Grey</button>' +
			'<button type="button" class="wcodeButtons" title="Serif WhirlCode" accesskey="s" id="wc_whirlSerif" >Serif</button>' +
			'<button type="button" class="wcodeButtons" title="Google WhirlCode" accesskey="g" id="wc_whirlGoogle" >Google</button>' +
			'<button type="button" class="wcodeButtons" title="Escape WhirlCode" accesskey="e" id="wc_whirlEscape" >Esc</button>' +
			'<button type="button" class="wcodeButtons" title="Wiki WhirlCode" accesskey="w" id="wc_whirlWiki" >Wiki</button>' +
			'<button type="button" class="wcodeButtons" title="URL Link" accesskey="u" id="wc_whirlurl" >URL</button>' +

			'</div>';

GM_addStyle('.wcodeButtons{font-size:1em;} .wcodeButtonsS{font-size:70%;}');			
	
(dUrl)? tArea.before(wcButtons) : tArea.before(wcButtons);			


/*******whirlcode buttons event handler********/		
		   
$('.wcodeButtons').mouseup(function(){

	var buttonID = $(this).attr('id');		

	tArea[0].focus();
	
	var currentValue = tArea[0].value;
	
	var theSelection = tArea[0].value.substring(tArea[0].selectionStart, tArea[0].selectionEnd);

	if(theSelection === ""){
	
		alert('No Text Selected');
		
	}
	else if(buttonID == "wc_whirlurl"){ 

		var uPrompt = window.prompt("Enter URL:", "http://"); 
		
		if ((uPrompt !== "http://") && (uPrompt !== "") & (uPrompt !== null)) {

			tArea.val(tArea.val().replace(theSelection,'<a href="'+uPrompt+'">'+theSelection+'</a>'));
		
		}
			
	}			
	else if((theSelection !== "") && (buttonID != 'wc_whirlurl')){
			
		//tArea.val(tArea.val().replace(theSelection, whirlCode[buttonID].encloseLeft + theSelection + whirlCode[buttonID].encloseRight));
		
		var selLength = tArea[0].textLength;
		var selStart = tArea[0].selectionStart;
		var selEnd = tArea[0].selectionEnd;
		if (selEnd == 1 || selEnd == 2)
			selEnd = selLength;

		var s1 = (tArea.val()).substring(0,selStart);
		var s2 = (tArea.val()).substring(selStart, selEnd)
		var s3 = (tArea.val()).substring(selEnd, selLength);
		tArea.val(s1 + whirlCode[buttonID].encloseLeft + s2 + whirlCode[buttonID].encloseRight + s3);
		
	}
	
	tArea.focus();
	
	theSelection = '';		

});		

