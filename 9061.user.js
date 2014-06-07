// ==UserScript==
// @name          Quick Quote for IE
// @namespace     jbsaidnotoputlinksheresoimnotgoingto
//@version		0.1 - VHS
// @description   A port to IE of JB's quick quote script
// @include       http://forums.whirlpool.net.au/forum-reply*
// @include       http://forums.whirlpool.net.au/forum-replies*
// @include       http://forums.whirlpool.net.au/index.cfm?a=wiki*
// @include       http://forums.whirlpool.net.au/whim-send*
// ==/UserScript==


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

var wcButtons = '<div id="buttonsDiv">' +

			'<button class="wcodeButtons" title="Bold WhirlCode" accesskey="b" id="wc_whirlBold" >Bold</button class="wcodeButtons">' +
			'<button class="wcodeButtons" title="Italic WhirlCode" accesskey="i" id="wc_whirlItalic" >Italic</button class="wcodeButtons">' +
			'<button class="wcodeButtons" title="SingleQuote WhirlCode" accesskey="t" id="wc_whirlSingleQuote" >\'quote\'</button class="wcodeButtons">' +
			'<button class="wcodeButtons" title="DoubleQuote WhirlCode" accesskey="q" id="wc_whirlDoubleQuote" >"quote"</button class="wcodeButtons">' +
			'<button class="wcodeButtons" title="Quote WhirlCode" accesskey="h" id="wc_whirlQuote" >who</button class="wcodeButtons">' +
			'<button class="wcodeButtons" title="Superscript WhirlCode" accesskey="p" id="wc_whirlSuperscript" >Super</button class="wcodeButtons">' +
			'<button class="wcodeButtons" title="Subscript WhirlCode" accesskey="\\" id="wc_whirlSubscript" >Sub</button class="wcodeButtons">' +
			'<button class="wcodeButtons" title="Strike WhirlCode" accesskey="k" id="wc_whirlStrike" >Strike</button class="wcodeButtons">' +
			'<button class="wcodeButtons" title="Courier WhirlCode" accesskey="c" id="wc_whirlCourier" >Courier</button class="wcodeButtons">' +
			'<button class="wcodeButtons" title="Small WhirlCode" accesskey="m" id="wc_whirlSmall" >Small</button class="wcodeButtons">' +
			'<button class="wcodeButtons" title="Grey WhirlCode" accesskey="r" id="wc_whirlGrey" >Grey</button class="wcodeButtons">' +
			'<button class="wcodeButtons" title="Serif WhirlCode" accesskey="s" id="wc_whirlSerif" >Serif</button class="wcodeButtons">' +
			'<button class="wcodeButtons" title="Google WhirlCode" accesskey="g" id="wc_whirlGoogle" >Google</button class="wcodeButtons">' +
			'<button class="wcodeButtons" title="Escape WhirlCode" accesskey="e" id="wc_whirlEscape" >Esc</button class="wcodeButtons">' +
			'<button class="wcodeButtons" title="Wiki WhirlCode" accesskey="w" id="wc_whirlWiki" >Wiki</button class="wcodeButtons">' +

			'</div>';


/*******whirlcode buttons event handler********/		
			   
function doStuffToTheText(theTextBox){				   
	$('.wcodeButtons').mouseup(function(){
		var buttonID = $(this).attr('id');											
		var currentValue = theTextBox.value;
		theSelection = document.selection.createRange().text;
		if(theSelection === ""){
			if (((currentValue.split(whirlCode[buttonID].encloseLeft).length+currentValue.split(whirlCode[buttonID].encloseRight).length)  % 2) == 0){
				theTextBox.focus();
				document.selection.createRange().text = whirlCode[buttonID].encloseLeft;
				theTextBox.focus();
				return;		
			}
			else{
				theTextBox.focus();
				document.selection.createRange().text = whirlCode[buttonID].encloseRight;
				theTextBox.focus();
				return;				
			}
			
		}
		else{
				document.selection.createRange().text = whirlCode[buttonID].encloseLeft + theSelection + whirlCode[buttonID].encloseRight;
				return;
		}
		theTextBox.focus();
		theSelection = '';
	});	
}

/*******run on forum-replies page********/

if (document.URL.indexOf('replies') > -1) {
	var replyLink = $('.breadtask a:first')[0].href;
	
	if (replyLink.indexOf("print") === -1){ 	/*******check if thread is closed********/

		$('.greylink:even').after('&nbsp;<span class="bar">| </span><a class="qquoteie greylink" href="">q-quote</a>');
		
/*******insert the text box********/

		$('#replies').after('<div align="center" id="quoteDiv">' +

				'<form action="'+replyLink+'" method="post">' +

				wcButtons+

				'<input class="" name="form" value="too right" type="hidden">' +
				
				'<input name="modewc" id="modewc" value="true" checked="checked" type="hidden">' +

				'<input name="modeht" id="modeht" value="true" checked="checked" type="hidden">' +

				'<input name="modebr" id="modebr" value="true" checked="checked" type="hidden">' +

				'<input name="modewl" id="modewl" value="true" checked="checked" type="hidden">' +			

				'<input name="modesp" id="modesp" value="true" checked="checked" type="hidden">' +

				'<textarea name="body" id="body" class="textCSS" cols="100" rows="12"></textarea>' +

				'<br/>' +

				'<input type="submit" id="prev" value="Show Preview" accesskey="v"/>&nbsp' +

				'<input type="reset" id="clearText" value="Clear" accesskey="x"/>' +

				'</form>' +

				'</div>');

		

/*******event handlers for Preview & Clear Buttons********/		
		
		$('#prev').mouseup(function(){
			this.value = 'Please wait...';
			return true;
		});	
		$('#clearText').mouseup(function(){
			theTextBox.value = "";
			theTextBox.focus();
			return false;
		});	

/*******quick quote function********/

		$('.qquoteie').click(function(){
			var theClick  = $(this);
			var txt = document.selection.createRange().text;
			var getLink = theClick.prev().prev().attr("href");
			var getPostId = getLink.slice(getLink.indexOf("r=")+2, getLink.indexOf("&tp"));
			var getUserName = theClick.parent().parent().prev().prev().find('.bu_name').text();
			var writesID = "[+"+getPostId+" "+getUserName+" writes... +]\n";
			var writesText = '["'+txt+'"]\n\n';
			var anyTextInBox = theTextBox.value;
			if (anyTextInBox !== ""){
				theTextBox.value = anyTextInBox+"\n"+writesID+writesText;
			}
			else{
				theTextBox.value = writesID+writesText;
			}
			window.scrollBy(0, 999999999);
			theTextBox.focus();
			return false;
		});
	var getOnce = $('#body');
	var theTextBox = getOnce[0];
	getOnce.css("width","70%")
	doStuffToTheText(theTextBox);
	}
}

/*******run on wiki pages********/

else if(document.URL.indexOf('wiki') > -1){ 	
	
	var theTextBox = $('#f_body')[0];
	
	$('#f_body').after(wcButtons);
			
doStuffToTheText(theTextBox);			
			
}
/*******run on preview page & whim********/

else { 	

	var theTextBox = $('#body')[0];

	$('#body').before(wcButtons);
			
doStuffToTheText(theTextBox);			
			
}

/*******Style Buttons********/	
var mysheet=document.styleSheets[1];
mysheet.addRule("#prev", "border:0px solid gray; color:black; background:#FFDCBF; width:150px; font:16px Arial;margin:2px 10px 0 0;"); 
mysheet.addRule("#clearText", "border:0px solid gray; color:black; background:#DAF2B3; width:150px; font:16px Arial;margin:2px 0 0 10px;"); 
mysheet.addRule(".wcodeButtons", "color:black;font:11px Tahoma");
