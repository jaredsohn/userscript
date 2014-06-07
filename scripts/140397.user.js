// ==UserScript==
// @name        w3l Tweaky
// @namespace   http://volkerotto.net/tweaky
// @description w3l tweaky: w3l made clean and readable + keyboard navigation and several other fixes
// @author		Volker Otto
// @homepage	http://volkerotto.net/tweaky
// @include     http://*.w3l.de/w3l/jsp/*
// @include     http://w3l.de/w3l/jsp/*
// @exclude		http://www.w3l.de/w3l/jsp/fwd/*
// @exclude 	http://www.w3l.de/w3l/jsp/searchx/*
// @exclude 	http://www.w3l.de/w3l/jsp/shop/*
// @exclude 	http://www.w3l.de/w3l/jsp/HFProxy.jsp*
// @exclude 	http://www.w3l.de/w3l/jsp/plugins/chat/*
// @exclude		http://www.w3l.de/w3l/jsp/lerntagebuch/*
// @exclude		http://www.w3l.de/w3l/jsp/meintutor/*
// @exclude 	http://www.w3l.de/w3l/jsp/userupload/*
// @exclude		http://www.w3l.de/w3l/jsp/kurs_perso.jsp*
// @exclude 	http://www.w3l.de/w3l/jsp/kursBuchenMitTan/*
// @exclude		http://www.w3l.de/w3l/jsp/generic_info.jsp*
// @exclude		http://www.w3l.de/w3l/jsp/fwd/akademie/startseite_und_aktuelles.html
// @version     1.0
// @history     0.1 first version
// @history     0.2 added jquery
// @history     0.3 added keyboard navigation
// @history     0.4 added helper menu
// @history     0.5 replace img beta added
// @history     0.6 replace img not yet working
// @history     0.7 resize & fullscreen working
// @history 	0.8	small fixes
// @history     0.9 more images replaced / hover for head navi
// @history     1.0 added modul buchen link / fb+irc link
// ==/UserScript==


/*
 * Load extern CSS Style
 */
function addStyleSheet(style){
  var getHead = document.getElementsByTagName("HEAD")[0];
  var cssNode = window.document.createElement( 'style' );
  var elementStyle= getHead.appendChild(cssNode);
  elementStyle.innerHTML = style;
  return elementStyle;
}
addStyleSheet('@import "http://volkerotto.net/project/tweaky/style.css";');

/*
 * jQuery
 */
// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {

	/*
	 * jQuery Hotkeys Plugin
	 * Copyright 2010, John Resig
	 * Dual licensed under the MIT or GPL Version 2 licenses.
	 *
	 * Based upon the plugin by Tzury Bar Yochay:
	 * http://github.com/tzuryby/hotkeys
	 *
	 * Original idea by:
	 * Binny V A, http://www.openjs.com/scripts/events/keyboard_shortcuts/
	*/
	
	(function(jQuery){
		
		jQuery.hotkeys = {
			version: "0.8",
	
			specialKeys: {
				8: "backspace", 9: "tab", 13: "return", 16: "shift", 17: "ctrl", 18: "alt", 19: "pause",
				20: "capslock", 27: "esc", 32: "space", 33: "pageup", 34: "pagedown", 35: "end", 36: "home",
				37: "left", 38: "up", 39: "right", 40: "down", 45: "insert", 46: "del", 
				96: "0", 97: "1", 98: "2", 99: "3", 100: "4", 101: "5", 102: "6", 103: "7",
				104: "8", 105: "9", 106: "*", 107: "+", 109: "-", 110: ".", 111 : "/", 
				112: "f1", 113: "f2", 114: "f3", 115: "f4", 116: "f5", 117: "f6", 118: "f7", 119: "f8", 
				120: "f9", 121: "f10", 122: "f11", 123: "f12", 144: "numlock", 145: "scroll", 191: "/", 224: "meta"
			},
		
			shiftNums: {
				"`": "~", "1": "!", "2": "@", "3": "#", "4": "$", "5": "%", "6": "^", "7": "&", 
				"8": "*", "9": "(", "0": ")", "-": "_", "=": "+", ";": ": ", "'": "\"", ",": "<", 
				".": ">",  "/": "?",  "\\": "|"
			}
		};
	
		function keyHandler( handleObj ) {
			// Only care when a possible input has been specified
			if ( typeof handleObj.data !== "string" ) {
				return;
			}
			
			var origHandler = handleObj.handler,
				keys = handleObj.data.toLowerCase().split(" ");
		
			handleObj.handler = function( event ) {
				// Don't fire in text-accepting inputs that we didn't directly bind to
				if ( this !== event.target && (/textarea|select/i.test( event.target.nodeName ) ||
					 event.target.type === "text") ) {
					return;
				}
				
				// Keypress represents characters, not special keys
				var special = event.type !== "keypress" && jQuery.hotkeys.specialKeys[ event.which ],
					character = String.fromCharCode( event.which ).toLowerCase(),
					key, modif = "", possible = {};
	
				// check combinations (alt|ctrl|shift+anything)
				if ( event.altKey && special !== "alt" ) {
					modif += "alt+";
				}
	
				if ( event.ctrlKey && special !== "ctrl" ) {
					modif += "ctrl+";
				}
				
				// TODO: Need to make sure this works consistently across platforms
				if ( event.metaKey && !event.ctrlKey && special !== "meta" ) {
					modif += "meta+";
				}
	
				if ( event.shiftKey && special !== "shift" ) {
					modif += "shift+";
				}
	
				if ( special ) {
					possible[ modif + special ] = true;
	
				} else {
					possible[ modif + character ] = true;
					possible[ modif + jQuery.hotkeys.shiftNums[ character ] ] = true;
	
					// "$" can be triggered as "Shift+4" or "Shift+$" or just "$"
					if ( modif === "shift+" ) {
						possible[ jQuery.hotkeys.shiftNums[ character ] ] = true;
					}
				}
	
				for ( var i = 0, l = keys.length; i < l; i++ ) {
					if ( possible[ keys[i] ] ) {
						return origHandler.apply( this, arguments );
					}
				}
			};
		}
	
		jQuery.each([ "keydown", "keyup", "keypress" ], function() {
			jQuery.event.special[ this ] = { add: keyHandler };
		});
	
	})( jQuery );

	/* Plugin End */
	
	/*
	* Keyboard Shortcuts
	*/
	
	$(document).bind('keydown', 'right', function() {
	  top.frames['main'].location = "http://www.w3l.de/w3l/jsp/basistext.jsp?navigate=next";
	});
	
	$(document).bind('keydown', 'left', function() {
	  top.frames['main'].location = "http://www.w3l.de/w3l/jsp/basistext.jsp?navigate=prev";
	});
	
	/*
	$(document).bind('keypress', 'f', function() {
		$("#suche_input input").focus();
	});
	
	$(document).bind('keypress', 'n', function() {
	  toggleNavigation();
	});
	*/
	
	/*
	* Help Menu
	*/
	
	// insert tweak helper into menu
	$('#SPANLOGOUT').after('<span class="LinkSpanInactive"  onmouseover="this.className=\'LinkSpanActive\';" onmouseout="this.className=\'LinkSpanInactive\';"  id="helper_button"><a class="helper_link">?</a></span>');
	// insert tweak helper
	$('.main:first').before('<div id="helper_tweak"><a id="helper_close">Close</a><span><strong>Tweaky</strong><br/><a href="http://volkerotto.net/tweaky" target="_blank">Mehr Informationen und Updates zu tweaky</a><br/>Pfeiltasten links und rechts, zum vor und zurückbl&auml;ttern.<br/><br/>Made by <a href="http://volkerotto.net" target="_blank">Volker Otto</a></span></div>');
	// hide tweak helper  
	$('#helper_tweak').hide();
	// tweak helper in navi bar
	$('#helper_button').click(
		function () {
			$('#helper_tweak',top.frames["main"].document).toggle();
		}
	);
	//close button
	$('#helper_close').click(
		function () {
			$('#helper_tweak').hide();
		}
	);
	
	$('#helper_button').after('<span id="module_button" class="LinkSpanInactive helper_button" onmouseover="this.className=\'LinkSpanActive\';" onmouseout="this.className=\'LinkSpanInactive\';"><a class="helper_link" target="_blank" href="http://www.w3l.de/w3l/jsp/shop/gesamtkatalog.jsp?navID=110_4179853&katArt=all&kategorien=katModule&suchbegriff=*">Modul buchen</a></span>');
	
	
	$('#module_button').after('<span id="irc_button" class="LinkSpanInactive helper_button" onmouseover="this.className=\'LinkSpanActive\';" onmouseout="this.className=\'LinkSpanInactive\';"><a class="helper_link" target="_blank" href="http://webchat.quakenet.org/?nick=Student.&channels=w3l" title="Join quakenet.org #w3l">Chat</a></span>');
	
	$('#irc_button').after('<span id="irc_button" class="LinkSpanInactive" onmouseover="this.className=\'LinkSpanActive\';" onmouseout="this.className=\'LinkSpanInactive\';" class="helper_button"><a class="helper_link" target="_blank" href="https://www.facebook.com/groups/w3lstudenten/">Fb</a></span>');
	
	/*
	 * Fullscreen Buttons
	 */
	
	// Hide real fullscreen button
	$('#fullscreen_a').hide();
	// Show own fullscreen button
	$('#fullscreen_a').before('<a href="" id="fullscreen_b"><img id="fullscreen_img" src="http://www.w3l.de/w3l/pic/window.png" title="Vollbildmodus" alt="Vollbildmodus" style="border:0;margin-top:2px;"></a>');
	
	// own fullscreen button action
	$('#fullscreen_b').toggle(
		function () {
			parent.document.getElementById('frame_logo_pl_inhalt').rows='0,40,*';
		},
		function(){
			parent.document.getElementById('frame_logo_pl_inhalt').rows='50,40,*';
		}
	);
	
	// Hide real sidebar button
	$('#IMG_NAV').hide();
	// Show own sidebar button
	$('#IMG_NAV').before('<a href="" id="IMG_NAV_b"><img id="IMG_NAV_b_img" src="http://www.volkerotto.net/project/tweaky/img/navigate_down.png" title="Vollbildmodus" alt="Vollbildmodus" style="border:0;margin-top:2px;"></a>');
	
	// own sidebar button action
	$('#IMG_NAV_b').toggle(
		function () {
			parent.document.getElementById('nav_frameset').cols='*,0';
		},
		function(){
			parent.document.getElementById('nav_frameset').cols='78%,22%';
		}
	);
	
	// make frameset smaller
	$('#frame_logo_pl_inhalt').attr("rows", "50,40,*");
	$('#nav_frameset').attr("cols", "78%,22%");
	
/* 
 * Replace Images
 */
$("#suche_los").attr("src","http://www.volkerotto.net/project/tweaky/img/los.png");
$("#suche_los").hover(
	function(){
		$(this).attr("src","http://www.volkerotto.net/project/tweaky/img/los_h.png");	
	}, function () {
        $(this).attr("src","http://www.volkerotto.net/project/tweaky/img/los.png");
    }
);

// Replace all images url
var pics = document.getElementsByTagName("img");
	for ( var i = 0, pic; pic = pics[i]; i++ ) {
		pic.src = pic.src.replace("w3l.de/w3l/pic/star_yellow_gruen_plus.png","volkerotto.net/project/tweaky/img/star_yellow_gruen_plus.png");
		pic.src = pic.src.replace("w3l.de/w3l/pic/star_yellow_gruen_minus.png","volkerotto.net/project/tweaky/img/star_yellow_gruen_minus.png");
		
		pic.src = pic.src.replace("w3l.de/w3l/pic/index_rot_plus.png","volkerotto.net/project/tweaky/img/index_rot_plus.png");
		pic.src = pic.src.replace("w3l.de/w3l/pic/index_rot_minus.png","volkerotto.net/project/tweaky/img/index_rot_minus.png");
		
		pic.src = pic.src.replace("w3l.de/w3l/pic/navigation_left.png","volkerotto.net/project/tweaky/img/navigation_left.png");
		pic.src = pic.src.replace("w3l.de/w3l/pic/navigation_right.png","volkerotto.net/project/tweaky/img/navigation_right.png");
		
		pic.src = pic.src.replace("w3l.de/w3l/pic/window.png","volkerotto.net/project/tweaky/img/window.png");
		
		pic.src = pic.src.replace("w3l.de/w3l/pic/erster.png","volkerotto.net/project/tweaky/img/erster.png");
		pic.src = pic.src.replace("w3l.de/w3l/pic/letzter.png","volkerotto.net/project/tweaky/img/letzter.png");
		pic.src = pic.src.replace("w3l.de/w3l/pic/naechster.png","volkerotto.net/project/tweaky/img/naechster.png");
		pic.src = pic.src.replace("w3l.de/w3l/pic/vorheriger.png","volkerotto.net/project/tweaky/img/vorheriger.png");
		pic.src = pic.src.replace("w3l.de/w3l/pic/inhalt.png","volkerotto.net/project/tweaky/img/inhalt.png");
		pic.src = pic.src.replace("w3l.de/w3l/pic/index_rot_minus.png","volkerotto.net/project/tweaky/img/index_rot_minus.png");
		
		pic.src = pic.src.replace("w3l.de/w3l/pic/quadrat_gruen.png","volkerotto.net/project/tweaky/img/quadrat_gruen.png");
		pic.src = pic.src.replace("w3l.de/w3l/pic/quadrat_gelb.png","volkerotto.net/project/tweaky/img/quadrat_gelb.png");	
		pic.src = pic.src.replace("w3l.de/w3l/pic/quadrat_rot.png","volkerotto.net/project/tweaky/img/quadrat_rot.png");

		pic.src = pic.src.replace("w3l.de/w3l/pic/punkt_gruen.png","volkerotto.net/project/tweaky/img/punkt_gruen.png");
		pic.src = pic.src.replace("w3l.de/w3l/pic/punkt_gelb.png","volkerotto.net/project/tweaky/img/punkt_gelb.png");	
		pic.src = pic.src.replace("w3l.de/w3l/pic/punkt_rot.png","volkerotto.net/project/tweaky/img/punkt_rot.png");
		
		pic.src = pic.src.replace("w3l.de/w3l/pic/punkt_gruen_minus.png","volkerotto.net/project/tweaky/img/punkt_gruen_minus.png");
		pic.src = pic.src.replace("w3l.de/w3l/pic/punkt_gelb_minus.png","volkerotto.net/project/tweaky/img/punkt_gelb_minus.png");	
		pic.src = pic.src.replace("w3l.de/w3l/pic/punkt_rot_minus.png","volkerotto.net/project/tweaky/img/punkt_rot_minus.png");
		pic.src = pic.src.replace("w3l.de/w3l/pic/punkt_gruen_plus.png","volkerotto.net/project/tweaky/img/punkt_gruen_plus.png");
		pic.src = pic.src.replace("w3l.de/w3l/pic/punkt_gelb_plus.png","volkerotto.net/project/tweaky/img/punkt_gelb_plus.png");	
		pic.src = pic.src.replace("w3l.de/w3l/pic/punkt_rot_plus.png","volkerotto.net/project/tweaky/img/punkt_rot_plus.png");
		
		pic.src = pic.src.replace("w3l.de/w3l/pic/stern_gruen.png","volkerotto.net/project/tweaky/img/stern_gruen.png");
		pic.src = pic.src.replace("w3l.de/w3l/pic/stern_gelb.png","volkerotto.net/project/tweaky/img/stern_gelb.png");	
		pic.src = pic.src.replace("w3l.de/w3l/pic/stern_rot.png","volkerotto.net/project/tweaky/img/stern_rot.png");
		
		pic.src = pic.src.replace("w3l.de/w3l/pic/dreieck_gruen.png","volkerotto.net/project/tweaky/img/dreieck_gruen.png");
		pic.src = pic.src.replace("w3l.de/w3l/pic/dreieck_gelb.png","volkerotto.net/project/tweaky/img/dreieck_gelb.png");	
		pic.src = pic.src.replace("w3l.de/w3l/pic/dreieck_rot.png","volkerotto.net/project/tweaky/img/dreieck_rot.png");
		
		pic.src = pic.src.replace("w3l.de/w3l/pic/dreieck_gruen_minus.png","volkerotto.net/project/tweaky/img/dreieck_gruen_minus.png");
		pic.src = pic.src.replace("w3l.de/w3l/pic/dreieck_gelb_minus.png","volkerotto.net/project/tweaky/img/dreieck_gelb_minus.png");	
		pic.src = pic.src.replace("w3l.de/w3l/pic/dreieck_rot_minus.png","volkerotto.net/project/tweaky/img/dreieck_rot_minus.png");
		
		pic.src = pic.src.replace("w3l.de/w3l/pic/dreieck_gruen_plus.png","volkerotto.net/project/tweaky/img/dreieck_gruen_plus.png");
		pic.src = pic.src.replace("w3l.de/w3l/pic/dreieck_gelb_plus.png","volkerotto.net/project/tweaky/img/dreieck_gelb_plus.png");	
		pic.src = pic.src.replace("w3l.de/w3l/pic/dreieck_rot_plus.png","volkerotto.net/project/tweaky/img/dreieck_rot_plus.png");
		
		pic.src = pic.src.replace("w3l.de/w3l/pic/books_rot_plus.png","volkerotto.net/project/tweaky/img/books_rot_plus.png");	
		pic.src = pic.src.replace("w3l.de/w3l/pic/books_rot_minus.png","volkerotto.net/project/tweaky/img/books_rot_minus.png");
		
		pic.src = pic.src.replace("w3l.de/w3l/pic/kurs_gruen_plus.png","volkerotto.net/project/tweaky/img/kurs_gruen_plus.png");	
		pic.src = pic.src.replace("w3l.de/w3l/pic/kurs_gruen_minus.png","volkerotto.net/project/tweaky/img/kurs_gruen_minus.png");
		pic.src = pic.src.replace("w3l.de/w3l/pic/kurs_rot_plus.png","volkerotto.net/project/tweaky/img/kurs_rot_plus.png");	
		pic.src = pic.src.replace("w3l.de/w3l/pic/kurs_rot_minus.png","volkerotto.net/project/tweaky/img/kurs_rot_minus.png");
		pic.src = pic.src.replace("w3l.de/w3l/pic/kurs_gelb_plus.png","volkerotto.net/project/tweaky/img/kurs_gelb_plus.png");	
		pic.src = pic.src.replace("w3l.de/w3l/pic/kurs_gelb_minus.png","volkerotto.net/project/tweaky/img/kurs_gelb_minus.png");
		
		
	}
}

// load jQuery and execute the main function
addJQuery(main);