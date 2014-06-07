// ==UserScript==
// @name TWClip2
// @namespace 
// @version 1
// @description 
// @copyright 2011 KaYa
// ==/UserScript==

(function($) {
var _twcDomain = "twclip.com";
var _twcProduction = true;

_twcPopup = function(options)
{
	if ( $("#_twcPopup").length > 0 ) return;
	
	var options = $.extend( { confirmClose: false, moveable: true }, options );
	
	var me = this;
	var element = $("<div/>")
		.attr( "id", "_twcPopup" )
		.css( {position: "fixed", top: "50%", left: "50%", zIndex: 100, 
			backgroundColor: "#888", border: "5px solid #804000"} );
	
	this.offsetX = 0;
	this.offsetY = 0;

	this.params = options;
	
	function getCSS(width, height, includeSize)
	{
		var ret = {			
			marginLeft: ( - parseInt(width/2) -me.offsetX ) + "px",
			marginTop: ( - parseInt(height/2) -me.offsetY  ) + "px"
		};
		
		if (includeSize)
		{
			ret.width = width + "px";
			ret.height = height + "px";
		}

		return ret;
	}
	
	function accommodate()
	{
		element.css( getCSS( element.outerWidth(), element.outerHeight() ) ); 
	}
	
	function enableDragDrop()
	{
		title.css( "cursor", "move")
			.mousedown( function(e) { 	
				me.lastX = e.clientX;
				me.lastY = e.clientY;
				me.timer = 0;
				$(document).css( "cursor", "move")
					.mouseup( function(e) { 
						$(document).unbind("mousemove");
					})
					.mousemove( function(e) {	
						me.offsetX += me.lastX - e.clientX;
						me.offsetY += me.lastY - e.clientY;
						element.css( getCSS(element.outerWidth(), element.outerHeight()) );
						me.lastX = e.clientX;
						me.lastY = e.clientY;
						e.preventDefault();
						return false;
					});
				
				e.preventDefault();
				return false;
			});
	}
	
	// PUBLIC 
	this.close = function(result)
	{		
		element.hide(); background.hide();
		setTimeout( function() { element.remove(); background.remove(); }, 200 ); //opera hack
		enableWheel();
		return true;
	};

	// INIT
	var background = $("<div/>")
		.css( { width: "100%", height: "100%", zIndex: 99, position: "fixed", top: 0, left: 0 } )
		.click( function() { me.close(); }).appendTo($("body"));
	
	if (!$.browser.msie) 
		background.css( {opacity: 0.2, backgroundColor: "#7a693a" } );
	
	var title = $("<div/>")
		.css( { backgroundColor: "#333", color: "#fff", font: "bold 15px tahoma", padding: "7px", minWidth: "300px" } )
		.html(options.title);//.append( loading );
	var content = $("<div/>")
		.css( { width: "auto", minHeight: "inherit",  margin: "10px" } )
		.hide();
	//element.css( { background : "url(/graphic/background/content.jpg)" } );
	element.css( { background : "#fff" } );
	element.append(title).append(content).appendTo($("body"));
	
	accommodate();
	
	var iframe = $("<iframe/>")
		.css( "background", "url(graphic/throbber.gif) no-repeat center center" )
		.css( { width: "100%", height: "500px", border: 0 } );
	options.content.append( iframe );	
	
	iframe.load( function() {
		iframe.css( "background", "none" );
	});
	
	iframe.attr( "src", "http://www." + _twcDomain + "/" + 
			game_data.market + "/tracker-popup?world=" + game_data.world + 
			"&tribeId=" + game_data.player.1864 + 
			"&playerId=" + game_data.player.id +
			"&link_base=" + escape(game_data.link_base) ); 

	options.content.append( 
			"<hr/>" +
			"<small>Tribal Wars script by TWClip.com | " +
			"<a target='twclip' href='http://www.twclip.com/tracker'>more info</a> | " + 
			"<a href='mailto:contact@twclip.com'>contact@twclip.com</a></small>" );
	
	//title.find("span.loading").remove();
	title.append( $("<span/>")
		.attr( "title", "close" )
		.css( { float: "right", display: "block", width: "20px", height: "20px", 
			zIndex:1000,
			background: "url(http://www." + _twcDomain + "/static/tracker/close.png) no-repeat", 
			cursor: "pointer", opacity: 0.8 } )
		.mousedown( function(e) { return false; } )
		.click( function() { me.close(); }) );
		
	element.css( { width: element.outerWidth(), height: element.outerHeight(), overflow: "hidden" });
		
	content.append( options.content );
	var newHeight = content.outerHeight() + title.outerHeight();
	var newWidth = content.outerWidth();
	
	element.css( getCSS( newWidth, newHeight, true ) );
	//element.animate( getCSS( newWidth, newHeight, true ), 160,  function() {
	element.css( {width: "auto", height: "auto", overflow: "auto"} );
	content.show() ;
	if (options.moveable) enableDragDrop();
	//});	
	
	function handler(event) {  
		if (!event) var event = window.event;
		if (event.preventDefault)
            event.preventDefault();
		event.returnValue = false;
		return false;
	};
	var types = ['DOMMouseScroll', 'mousewheel'];
	function disableWheel() {
		if ( window.addEventListener )
	        for ( var i=types.length; i; )
	        	window.addEventListener( types[--i], handler, false );
    	 window.onmousewheel = document.onmousewheel = handler;
	};    
	function enableWheel() {
        if ( window.removeEventListener )
            for ( var i=types.length; i; )
            	window.removeEventListener( types[--i], handler, false );
       	window.onmousewheel = document.onmousewheel = null;
	};
	
	disableWheel();	
};

var contentElm = $("<div style='width:757px;'></div>");
if ( contentElm == null ) return;
_twcPopup( { "title" : "TWClip tracker", "content" : contentElm }  ); 

	
})(jQuery);