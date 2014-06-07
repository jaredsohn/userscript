// coding: utf-8
// ==UserScript==
// @name		Empire Board WS AddOn
// @namespace	empire-board.ikariam
// @version	7
// @author		tivolimeister
// @description	Add-on for Ikariam v3 Empire Board script (require v200 or higher). Positions main container and EmpireBoard side by side.
// @require	http://userscripts.org/scripts/source/60774.user.js
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include	http://s*.ikariam.*/*
// @exclude	http://support.ikariam.*/*
// ==/UserScript==

/**************************************************************************************************
Require "Ikariam Empire Board" script version 200 (or higher)
with higher priority than this add-on (see GreaseMonkey options)
http://userscripts.org/scripts/show/41051
**************************************************************************************************/

/* Add-on designed as EmpireBoard child object registered with ARexx */

// Remember EmpireBoard and EmpireBoard.ARexx objects
// still exists. And you may not choose child name which
// already used into Ikariam Empire Board.

EmpireBoard.WideScreenAddon =
	{
	/* Require for ARexx */
	_Parent:						 null,
	EmpireBoardRequiredVersion:		 200,
	AddOnName:						 'Empire Board Wide Screen AddOn',
	
	/* Addon optional metas for ARexx */
	Version:						 7,
	HomePage:						 '',
	ScriptURL:						 '',
	UserScriptsID:					 92626,
	InitSuccess:                     false
	};

// Constructor method require for ARexx
// May return true  or false (if failed)
EmpireBoard.WideScreenAddon.Init = function() {
	
	EmpireBoard.WideScreenAddon.InitSuccess = true;
	return true;
};

$(document).ready(function() {  
	if( EmpireBoard.WideScreenAddon.InitSuccess ) {

		var container = $('#container'),
			toolbar = $('#GF_toolbar'),
			emperor = $('#EmpireBoard');
			
		$('body').css({
			"height": "95%",
			"background": "#DBBE8C"
		});
		
		emperor.css({
			"z-index": "100",
			"background": "#DBBE8C"
		});
		
		var onResize = function() {
			var intervals = new Array();
			
			scrollEmperor = function() {
				
				clearInterval(intervals.shift());
				
				if(intervals.length > 0) {
					return;
				}
				
				var containerBottom = container.outerHeight();
				var emperorHeight = emperor.outerHeight() - emperor.position().top;
				var emperorBottom = emperorHeight + $(document).scrollTop();
				var emperorTop = (containerBottom < emperorBottom)
					? containerBottom - emperorHeight - 30 : $(document).scrollTop();
				
				emperor
					.stop()
					.css({"margin-top": emperorTop + "px"});
			};
			
			var width = container.width() + emperor.width() + 90;
			
			if( width < $(this).width() ) {
				
				container.css({
					"position": "absolute",
					"left": "45px"
				});
				
				toolbar.css({
					"width": "1100px"
				});
				
				emperor.css({
					"position": "absolute",
					"left": (container.width() + 80) + "px",
					"top": "22px",
					"margin-top": "0"
				});
				
				$(window)
					.scroll(function() {
						
						var windowBottom = window.innerHeight + $(document).scrollTop();
						if(container.height() < windowBottom) {
							return;
						}
						
						intervals.push(setInterval(scrollEmperor, 100));
						
					})
					.trigger('scroll');
				
				
			} else {
				
				container.css({
					"position": "relative",
					"left": ""
				});
				
				toolbar.css({
					"width": "100%"
				});
				
				emperor.css({
					"position": "",
					"left": "",
					"top": "",
					"margin-top": ""
				});
				
				$(window).unbind('scroll');
			}
		} 
		
		$(window).resize(function() {
			onResize();
		});
		
		onResize();
		
		//bonus
		$('#banner_container').remove();
	}
});
	
EmpireBoard.ARexx.RegisterAddOn(EmpireBoard.WideScreenAddon);