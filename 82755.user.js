// ==UserScript==
// @name           PlurkFont
// @namespace      http://www.plurk.com/
// @description    PlurkFont
// @include        http://www.plurk.com/*
// @exclude        http://www.plurk.com/_comet/*
// @exclude        http://www.plurk.com/User/*
// @exclude        http://www.plurk.com/i18n/*
// ==/UserScript==

// == Add jquery == //

var GM_JQ = document.createElement('script'); // GM_JQ=GreaseMonkey jQuery，
GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js'; // jQuery的來源是以上網址，網址裡的東西很長都是字
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);
// 取得類型為head的元素集合。回傳的元素集合是一個陣列，元素集合中的第一個元素是[0]

// Check if jQuery is loaded // 

function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait,100);
	} else {
		$ = unsafeWindow.jQuery.noConflict(true);
		window.setTimeout(doRTE, 2000);
	}
}

GM_wait();

//function GM_wait() { 
//  if(typeof unsafeWindow.jQuery == 'undefined') { 
//    window.setTimeout(GM_wait,100); 
//	} else { 
//	  $ = unsafeWindow.jQuery; 
//	  letsJQuery(); 
//	}
//}    
//GM_wait();

// All your GM code must be inside this function //

//function letsjQuery(){
//  alert($); // 檢查dollar sign (jQuery)是否運作
//}


// == CONSTANTS == //

var CONTROL_BAR_ITEM_COMMAND = {
	ITALICIZE: 1,
	EMBOLDEN: 2,
	UNDERLINE: 3,
	LINK: 4,
	TWITTER: 5,
	FACEBOOK: 6,
	

}

// == LIFECYCLE == //

var o_Plurks_editPlurk; //編輯
var o_Plurks__cancelOnClick; //取消
var o_Plurks__saveOnClick; //儲存
var o_Plurks_removeExpand; //刪除

var o_Plurks_editPlurk_cb;

doRTE = function(){

	var input_big = $("#input_big")[0];
	// $ 是jQuery的物件，$("#input_big")就是用 jQuery 來選取元素，這個範例可以選取文件內所有的<input_big>元素
	if(input_big) {
			new ControlBar( true, true, true, true, true, true).inject(input_big);
	}
	
	var input_permalink = $("#input_permalink")[0]; //發噗區輸入框
	if(input_permalink) {
			new ControlBar( true, true, true, true, true, true).inject(input_permalink); //在輸入區插入新的Control Bar
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

		$($dp.manager).children('.action').each(function(){
			$(this).unbind('click',p._editPlurk);
			$(this).click(function() {
				o_Plurks_editPlurk();
				o_Plurks_editPlurk_cb = new ControlBar( true, true, true, true, true, true).inject($dp.ta);
				p.repositonCurrent();
				return false;
			});
		});

		$($dp.saver).children('.cancel').each(function(){
			$(this).unbind('click', o_Plurks__cancelOnClick);
			$(this).click(p.__cancelOnClick);
		});

		if(p.poster) {
			new ControlBar( true, true, true, true, true, true).inject(p.poster.input);
		}
	}
};

// == CLASSES == //

function ControlBar( showItalic, showBold, showUnderline, showLink, showTwitter, showFB)
{
	this.showItalic = showItalic;
	this.showBold = showBold;
	this.showUnderline = showUnderline;
	this.showLink = showLink;
	this.showTwtitter = showTwitter;
	this.showFB = showFB;


	this.inject = function( targetTextArea )
	{
	    var controlBar = $("<span></span>").css('padding','1px').css('margin-bottom','1px').css('font-family','Verdana').css('font-size','12px').css('background','#f59cb9').css('opacity','0.9').css('-moz-border-radius','4px').css('display','table');

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

		if ( showLink )
		{
			var item = new ControlBarItem( "Link", CONTROL_BAR_ITEM_COMMAND.LINK, targetTextArea );

			controlBar.append( item.create() );
		}
		
		if ( showTwitter )
		{
		    var item = new ControlBarItem( "!TW", CONTROL_BAR_ITEM_COMMAND.TWITTER, targetTextArea );
			
			controlBar.append( item.create() );
		}
		
		if ( showFB )
		{
		    var item = new ControlBarItem( "!FB", CONTROL_BAR_ITEM_COMMAND.FACEBOOK, targetTextArea );
			
			controlBar.append( item.create() );
		}

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
		link.linkSelection = this.linkSelection;
		link.tagSelection = this.tagSelection;

		addEvent( link, "click", "execute" );

		return $(link).css('color','#9e0505').css('padding','4px').css('text-decoration','none');
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
			case CONTROL_BAR_ITEM_COMMAND.LINK:
				this.linkSelection();
				break;
			case CONTROL_BAR_ITEM_COMMAND.TWITTER:
			    this.tagSelection( "", "!TW" );
				break;
			case CONTROL_BAR_ITEM_COMMAND.FACEBOOK:
			    this.tagSelection( "", "!FB" );
				break;

			default:
				throw "Unknown command encountered";
		}

		this.blur();
	}

	this.linkSelection = function()
	{
		var url = prompt( "輸入網址:", "" );

		if (url && url != '' )
		{
			if ( this.targetTextArea.selectionEnd > this.targetTextArea.value.length )
			{
				this.targetTextArea.selectionEnd = this.targetTextArea.value.length;
			}
			var selectionStart = this.targetTextArea.selectionStart;
			var selectionEnd = this.targetTextArea.selectionEnd;
			var desc = '';
			if(selectionStart == selectionEnd) {
				desc = prompt( "輸入網址敘述:", "" );
			}
			if(!desc) desc = '';

			this.tagSelection( url + ' (', desc + ')' );
		}
	}


	this.tagSelection = function( tagOpen, tagClose )
	{
		if ( this.targetTextArea.selectionStart || this.targetTextArea.selectionStart == 0 ) //relies on this property.
		{
			var scrollTop = this.targetTextArea.scrollTop;

			if ( this.targetTextArea.selectionEnd > this.targetTextArea.value.length )
			{
				this.targetTextArea.selectionEnd = this.targetTextArea.value.length;
			}

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
}

//Delegated event wire-up utitlity. Using this allows you to use the "this" keyword in a delegated function.
function addEvent( target, eventName, handlerName )
{
	target.addEventListener(eventName, function(e){target[handlerName](e);}, false);
}