// ==UserScript==
// @name           Mess Plurk Text
// @namespace      http://artharry.com
// @description    Adds a simple rich edit interface on Plurk (version 0.7.1)
// @include        http://www.plurk.com/*
// @exclude        http://www.plurk.com/_comet/*
// @exclude        http://www.plurk.com/User/*
// @exclude        http://www.plurk.com/i18n/*
// ==/UserScript==

// Plurk Rich Edit (http://userscripts.org/scripts/show/28806)
// version 0.7.1
// modify from Flickr Rich Edit (http://userscripts.org/scripts/show/1419)
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html

// == Add jquery == //

var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://www.artharry.com/files/jquery.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait,100);
	} else {
		$ = unsafeWindow.jQuery.noConflict(true);
		window.setTimeout(doRTE, 2000);
	}
}

GM_wait();

// == CONSTANTS == //

var CONTROL_BAR_ITEM_COMMAND = {
	ITALICIZE: 1,
	EMBOLDEN: 2,
	UNDERLINE: 3,
	LINKQ: 4,
	UPLOW: 5,
	NUMBANG: 6,
	SHOPEN: 7,
	FLIPIT: 8,
}

// == LIFECYCLE == //

var o_Plurks_editPlurk;
var o_Plurks__cancelOnClick;
var o_Plurks__saveOnClick;
var o_Plurks_removeExpand;

var o_Plurks_editPlurk_cb;

doRTE = function(){

	var input_big = $("#input_big")[0];
	if(input_big) {
			new ControlBar( true, true, true, true, true, true, true, true).inject(input_big);
	}
	
	var input_permalink = $("#input_permalink")[0];
	if(input_permalink) {
			new ControlBar( true, true, true, true, true, true, true, true).inject(input_permalink);
	}
	
	var p = unsafeWindow.Plurks;

	if(p) {
		o_Plurks_editPlurk = p._editPlurk;
		o_Plurks__cancelOnClick = p.__cancelOnClick;
		p.__cancelOnClick = function() {
			if(o_Plurks_editPlurk_cb) o_Plurks_editPlurk_cb.empty();
			o_Plurks__cancelOnClick();
		};
		o_Plurks_removeExpand = p._removeExpand;

		p._removeExpand = function(D) {
			if(o_Plurks_editPlurk_cb) o_Plurks_editPlurk_cb.empty();
			o_Plurks_removeExpand(D);
		};

		$dp = unsafeWindow.$dp;

		$($dp.man).children('.action').each(function(){
			$(this).unbind('click',p._editPlurk);
			$(this).click(function() {
				o_Plurks_editPlurk();
				o_Plurks_editPlurk_cb = new ControlBar( true, true, true, true, true, true, true, true ).inject($dp.ta);
				p.repositonCurrent();
				return false;
			});
		});

		$($dp.saver).children('.cancel').each(function(){
			$(this).unbind('click', o_Plurks__cancelOnClick);
			$(this).click(p.__cancelOnClick);
		});

		if(p.poster) {
			new ControlBar( true, true, true, true, true, true, true, true ).inject(p.poster.input);
		}
	}
};

// == CLASSES == //

function ControlBar( showItalic, showBold, showUnderline, showLinksq, showUplow, showAngkq, showPendk, showFlip )
{
	this.showItalic = showItalic;
	this.showBold = showBold;
	this.showUnderline = showUnderline;
	this.showLinksq = showLinksq;
	this.showUplow = showUplow;
	this.showAngkq = showAngkq;
	this.showPendk = showPendk;
	this.showFlip = showFlip;

	this.inject = function( targetTextArea )
	{
		var controlBar = $("<span></span>").css('padding','1px').css('margin-bottom','1px').css('font-family','Georgia').css('font-size','11px').css('background','#000').css('opacity','0.75').css('-moz-border-radius','4px').css('display','table');

		if ( showItalic )
		{
			var item = new ControlBarItem( "<i>I</i>", CONTROL_BAR_ITEM_COMMAND.ITALICIZE, targetTextArea );

			controlBar.append( item.create() );
		}

		if ( showBold )
		{
			var item = new ControlBarItem( "<b>B</b>", CONTROL_BAR_ITEM_COMMAND.EMBOLDEN, targetTextArea );

			controlBar.append( item.create() );
		}

		if ( showUnderline )
		{
			var item = new ControlBarItem( "<u>U</u>", CONTROL_BAR_ITEM_COMMAND.UNDERLINE, targetTextArea );

			controlBar.append( item.create() );
		}

		if ( showLinksq )
		{
			var item = new ControlBarItem( "Links", CONTROL_BAR_ITEM_COMMAND.LINKQ, targetTextArea );
			controlBar.append( item.create() );
		}

		if ( showUplow )
		{
			var item = new ControlBarItem( "uL", CONTROL_BAR_ITEM_COMMAND.UPLOW, targetTextArea );
			controlBar.append( item.create() );
		}

		if ( showAngkq )
		{
			var item = new ControlBarItem( "12ab", CONTROL_BAR_ITEM_COMMAND.NUMBANG, targetTextArea );
			controlBar.append( item.create() );
		}

		if ( showPendk )
		{
			var item = new ControlBarItem( "shrt", CONTROL_BAR_ITEM_COMMAND.SHOPEN, targetTextArea );
			controlBar.append( item.create() );
		}

		if ( showFlip )
		{
			var item = new ControlBarItem( "dı1ɟ", CONTROL_BAR_ITEM_COMMAND.FLIPIT, targetTextArea );
			controlBar.append( item.create() );
		}

		var link = document.createElement("a");
		link.innerHTML = "<iframe id='tframe' name='tframe' src ='http://www.artharry.com/files/links.html' height='13' width='85' frameborder='0' scrolling='no' style='padding-top:5px;'></iframe>";
		controlBar.append($(link).css('color','#fff').css('padding','3px').css('text-decoration','none'));

		$(targetTextArea).before( controlBar );

		return controlBar;
	};
}

function ControlBarItem( label, editCommand, targetTextArea )
{
	this.label = label;
	this.editCommand = editCommand;
	this.targetTextArea = targetTextArea;

	this.create = function()
	{
		var link = document.createElement("a");
		link.href = "javascript:;";
		link.innerHTML = label;

		link.editCommand = this.editCommand;
		link.targetTextArea = this.targetTextArea;
		link.execute = this.execute;
		link.tagSelection = this.tagSelection;
		link.linkSelection = this.linkSelection;
		link.ulSelection = this.ulSelection;

		addEvent( link, "click", "execute" );

		return $(link).css('color','#fff').css('padding','4px').css('text-decoration','none');
	}

	this.execute = function(e)
	{
		switch( this.editCommand )
		{
			case CONTROL_BAR_ITEM_COMMAND.ITALICIZE:
				this.tagSelection( "*", "*" );
				break;
			case CONTROL_BAR_ITEM_COMMAND.EMBOLDEN:
				this.tagSelection( "**", "**" );
				break;
			case CONTROL_BAR_ITEM_COMMAND.UNDERLINE:
				this.tagSelection( "__", "__" );
				break;
			case CONTROL_BAR_ITEM_COMMAND.LINKQ:
				this.linkSelection();
				break;
			case CONTROL_BAR_ITEM_COMMAND.UPLOW:
				this.ulSelection(1);
				break;
			case CONTROL_BAR_ITEM_COMMAND.NUMBANG:
				this.ulSelection(2);
				break;
			case CONTROL_BAR_ITEM_COMMAND.SHOPEN:
				this.ulSelection(3);
				break;
			case CONTROL_BAR_ITEM_COMMAND.FLIPIT:
				this.ulSelection(4);
				break;
			default:
				throw "Unknown command encountered";
		}

		this.blur();
	}

	this.tagSelection = function( tagOpen, tagClose )
	{
		if ( this.targetTextArea.selectionStart || this.targetTextArea.selectionStart == 0 ) //relies on this property.
		{
			//record scroll top to restore it later.
			var scrollTop = this.targetTextArea.scrollTop;

			// work around Mozilla Bug #190382
			if ( this.targetTextArea.selectionEnd > this.targetTextArea.value.length )
			{
				this.targetTextArea.selectionEnd = this.targetTextArea.value.length;
			}

			//We will restore the selection later, so record the current selection.
			var selectionStart = this.targetTextArea.selectionStart;
			var selectionEnd = this.targetTextArea.selectionEnd;

			this.targetTextArea.value =
				this.targetTextArea.value.substring( 0, selectionStart ) + //text leading up to the selection start
				tagOpen +
				this.targetTextArea.value.substring( selectionStart, selectionEnd ) + //selected text
				tagClose +
				this.targetTextArea.value.substring( selectionEnd ); //text after the selection end

			this.targetTextArea.selectionStart = selectionStart + tagOpen.length;
			this.targetTextArea.selectionEnd = selectionEnd + tagOpen.length;

			this.targetTextArea.scrollTop = scrollTop;

			this.targetTextArea.focus();
		}
	}

	this.linkSelection = function()
	{
		var url = prompt( "Enter the URL:", "" );

		if (url && url != '' )
		{

			// work around Mozilla Bug #190382
			if ( this.targetTextArea.selectionEnd > this.targetTextArea.value.length )
			{
				this.targetTextArea.selectionEnd = this.targetTextArea.value.length;
			}
			//We will restore the selection later, so record the current selection.
			var selectionStart = this.targetTextArea.selectionStart;
			var selectionEnd = this.targetTextArea.selectionEnd;
			var desc = '';
			if(selectionStart == selectionEnd) {
				desc = prompt( "Enter the Description:", "" );
			}
			if(!desc) desc = '';

			this.tagSelection( url + ' (', desc + ')' );
		}
	}

	this.ulSelection = function( pil )
	{
		var teks = prompt( "Enter the Text:", "" );

		if (teks && teks != '' )
		{
			// work around Mozilla Bug #190382
			if ( this.targetTextArea.selectionEnd > this.targetTextArea.value.length )
			{
				this.targetTextArea.selectionEnd = this.targetTextArea.value.length;
			}
			//We will restore the selection later, so record the current selection.
			var selectionStart = this.targetTextArea.selectionStart;
			var selectionEnd = this.targetTextArea.selectionEnd;

			var acak;
			var abgteks="";
			var i,j;
			var stemp;
			var terganti=0;
			if (pil==1){
				for(i=0;i<teks.length;i++)
				 {
						acak = Math.round(2*Math.random());
						if(acak)
							abgteks=abgteks+teks.charAt(i).toLowerCase();
						else
							abgteks=abgteks+teks.charAt(i).toUpperCase();
				 }
			}
			if (pil==2){
				var TabelHuruf="ABEGIJOSZ";
				var TabelAngka="483617052"; //01234567890
				stemp="";
				for(i=0;i<teks.length;i++){
					acak=Math.round(2*Math.random());
					terganti=0;
					for(j=0;j<TabelHuruf.length;j++){
						if(teks.charAt(i).toUpperCase()==TabelHuruf.charAt(j)){
							stemp=stemp+TabelAngka.charAt(j);
							terganti=1;
							break;
						}
					}
					if(terganti==0)
						stemp=stemp+teks.charAt(i);
				}
				abgteks=stemp;
			}
			if (pil==3){
			    var TabelVokal="AIUEO";
				stemp="";
			    for(i=0;i<teks.length;i++){
					acak=Math.round(2*Math.random());
					terganti=0;
			 		for(j=0;j<TabelVokal.length;j++){
			 			if(teks.charAt(i).toUpperCase()==TabelVokal.charAt(j)){
			 				if((teks.charAt(i-1)!=" ")&&(i>0)) terganti=1;
							break;
				   		}
				   	}
					if(terganti==0) //huruf tidak dapat diganti 
						stemp=stemp+teks.charAt(i);
			   	}
			 	abgteks=stemp;
			 }
			if (pil==4){
				var result = flipString(teks);
				abgteks = "test "+result;

				function flipString(aString) {
					aString = aString.toLowerCase();
					var last = aString.length - 1;
					var result = "";
					for (var i = last; i >= 0; --i) {
						result += flipChar(aString.charAt(i))
					}
					return result;
				}
				
				function flipChar(c) {
					if (c == 'a') {
						return '\u0250'
					}
					else if (c == 'b') {
						return 'q'
					}
					else if (c == 'c') {
						return '\u0254'  
					}
					else if (c == 'd') {
						return 'p'
					}
					else if (c == 'e') {
						return '\u01DD'
					}
					else if (c == 'f') {
						return '\u025F' 
					}
					else if (c == 'g') {
						return 'b'
					}
					else if (c == 'h') {
						return '\u0265'
					}
					else if (c == 'i') {
						return '\u0131'//'\u0131\u0323' 
					}
					else if (c == 'j') {
						return '\u0638'
					}
					else if (c == 'k') {
						return '\u029E'
					}
					else if (c == 'l') {
						return '1'
					}
					else if (c == 'm') {
						return '\u026F'
					}
					else if (c == 'n') {
						return 'u'
					}
					else if (c == 'o') {
						return 'o'
					}
					else if (c == 'p') {
						return 'd'
					}
					else if (c == 'q') {
						return 'b'
					}
					else if (c == 'r') {
						return '\u0279'
					}
					else if (c == 's') {
						return 's'
					}
					else if (c == 't') {
						return '\u0287'
					}
					else if (c == 'u') {
						return 'n'
					}
					else if (c == 'v') {
						return '\u028C'
					}
					else if (c == 'w') {
						return '\u028D'
					}

					else if (c == 'x') {
						return 'x'
					}
					else if (c == 'y') {
						return '\u028E'
					}
					else if (c == 'z') {
						return 'z'
					}
					else if (c == '[') {
						return ']'
					}
					else if (c == ']') {
						return '['
					}
					else if (c == '(') {
						return ')'
					}
					else if (c == ')') {
						return '('
					}
					else if (c == '{') {
						return '}'
					}
					else if (c == '}') {
						return '{'
					}
					else if (c == '?') {
						return '\u00BF'  
					}
					else if (c == '\u00BF') {
						return '?'
					}
					else if (c == '!') {
						return '\u00A1'
					}
					else if (c == "\'") {
						return ','
					}
					else if (c == ',') {
						return "\'"
					}
					return c;
				}				 
			} // end if pil

			this.tagSelection( abgteks,"" );
		}
	}


}

//Delegated event wire-up utitlity. Using this allows you to use the "this" keyword in a delegated function.
function addEvent( target, eventName, handlerName )
{
	target.addEventListener(eventName, function(e){target[handlerName](e);}, false);
}