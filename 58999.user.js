// ==UserScript==
// @name           Gmail Chat Customizer
// @namespace      http://www.christophernicotera.com
// @description    Gmail Chat Customizer
// @include        http://mail.google.com/mail/?ui=2*
// @include        https://mail.google.com/mail/?ui=2*
// @description    A script to customize the appearance of your Gmail pop-out chat windows
// @copyright      2009+, Christopher Nicotera (http://www.christophernicotera.com)
// @version        1.0.0
// ==/UserScript==

/*

TODO:
- Is untested with any and all browsers aside from the latest version of Firefox (at the time, 3.5.3).
- Code clean up
- Refactor

10/9/2009:
- Added support for styling links

10/2/2009:
- Initial Release

*/

var m_intervalIds = new Array();
var m_initialized = false;
var m_css = "";

var m_preferences = {
    'use_full_names'                 : true,
    
    'your_message_change'            : true, // Overrides all changes to your messages
    'your_name'                      : '', // Leave empty to change to your full name from Gmail
    'your_name_change'               : true,
    'your_name_style'                : 'color: #95c9ff; display: block;',
    'your_name_style_change'         : true,
    'your_text_style'                : 'color: #dddddd; font-size: 85%; text-align: right;',
    'your_text_style_change'         : true,
    'your_message_style'             : '', 
    'your_message_style_change'      : true,
    
    'their_message_change'           : true, // Overrides all changes to their messages
    'their_name'                     : '', // Leave empty to leave their name as is
    'their_name_change'              : true,
    'their_name_style'               : 'color: #ff515d; display: block; margin-left: 0em;',
    'their_name_style_change'        : true,
    'their_text_style'               : 'color: #dddddd; font-size: 85%;',
    'their_text_style_change'        : true,
    'their_message_style'            : 'margin-left: -0.2em;', // Used to align their messages to the left
    'their_message_style_change'     : true,
    
    'other_message_change'           : true, // Overrides all changes to other messages
    'other_message_style'            : 'text-align: center; font-size: 75%; padding: 3px 0 3px 0;',
    'other_message_style_change'     : true,

    'link_style'                     : 'color: #d6ffb9; text-decoration: none;',
    'link_style_change'              : true,
    'link_hover_style'               : 'text-decoration: underline;',
    'link_hover_style_change'        : true,
    
    'chat_polite_style'              : 'text-align: center; font-size: 75%; padding: 3px 0 3px 0;',
    'chat_polite_style_change'       : true,
    'chat_assertive_style'           : 'color: #aa0000; text-align: right;', // Currently unused
    'chat_assertive_style_change'    : true, // Currently unused
    'chat_rude_style'                : 'color: #95c9ff;',
    'chat_rude_style_change'         : true,

    'input_style'                    : 'background: #333333; color: #aaaaaa; font-size: 65%; border: 0;',
    'input_style_change'             : true,
    
    'divider_style'                  : 'border: 1px solid #454545 !important;',
    'divider_style_change'           : true,

    'background_style'               : 'background: #333333 !important; border: 0 !important;', // Background is applied to certain elements
    'background_style_change'        : true,

    'button_style'                   : 'font-size: 75%; color: #777777; border: 0; background: none;',
    'button_style_change'            : true,

    'title_bar_style'                : 'text-decoration: underline; font-size: 85%; color: #fff;',
    'title_bar_style_change'         : true,

    'status_bar_style'               : 'padding-left: 0; font-size: 85%; color: #777777;',
    'status_bar_style_change'        : true
};

function formatMessage( p_message ) {
	if( p_message.getAttribute( 'formatted' ) == null ) {
		p_message.setAttribute( 'formatted', 'true' );
		if( ( l_name = p_message.childNodes[0].childNodes[1] ) != null ) {
			switch( p_message.getAttribute( 'chat-dir' ) ) {
				case 't':
					if( m_preferences.their_name_change == true ) {
				        l_name.innerHTML = getTheirName( m_preferences.use_full_names );
				    }
					break;
					
				case 'f':
					if( m_preferences.your_name_change == true ) {
				        l_name.innerHTML = getYourName( m_preferences.use_full_names );
				    }
					break;
					
				default:
					break;
			}
		}
	}
}


function setYourName( p_name ) {
    var l_name;
    if( p_name == '' || p_name == null ) {
        l_name = window.parent.opener.document.getElementById( 'canvas_frame' ).contentWindow.document.getElementsByClassName( 'uC' )[0].innerHTML;
    } else {
        l_name = p_name;
    }
   
    m_preferences.your_name = l_name;
}

function getYourName( p_getFullName ) {
    return ( p_getFullName == true ) ? m_preferences.your_name : m_preferences.your_name.split( ' ' , 1 );
}

function setTheirName( p_name ) {
    var l_name;
	var l_theirName = window.parent.document.getElementsByClassName( 'Hp' )[0];
    if( p_name == '' || p_name == null ) {
        l_name = l_theirName.innerHTML;
    } else {
        l_name = p_name;
    }
   
	l_theirName.innerHTML = l_name;
    m_preferences.their_name = l_name;
}

function getTheirName( p_getFullName ) {
	return ( p_getFullName == true ) ? m_preferences.their_name : m_preferences.their_name.split( ' ', 1 );
}


function addToCSS( p_name, p_style, p_isElement ) {
	if( p_isElement == null ) {
		p_isElement = false;
	}
	
	if( p_name instanceof Array ) {
		if( p_isElement == false ) {
			p_name = p_name.map( 
				function makeClass( p_element, p_index, p_array ) { 
					return '.' + p_element.replace( ' ', ' .' ); 
				} ).join( ', ' );
		} else {
			p_name = p_name.join( ', ' );
		}
	} else {
		if( p_isElement == false ) {
			p_name = '.' + p_name.replace( / /g, ' .' );
		}
	}
	
	m_css += ( p_name + ' { ' + p_style + ' }' + "\n" );
}

function initialize() {
	if( document.styleSheets.length > 0 ) {
		if( isLoaded() == true ) {
			for( var i = 0; i < m_intervalIds.length; i++ ) {
				clearTimeout( m_intervalIds[i] );
			}
			
			if( m_preferences.your_name_change == true ) {
				setYourName( m_preferences.your_name );
			}
			
			if( m_preferences.their_name_change == true ) {
				setTheirName( m_preferences.their_name );
			}
			
			if( m_preferences.your_message_change == true ) {			
				if( m_preferences.your_message_style_change == true ) {
					addToCSS( 'km[chat-dir="f"]', m_preferences.your_message_style );
				}
		
				if( m_preferences.your_name_style_change == true ) {
					addToCSS( 'km[chat-dir="f"] kk kn', m_preferences.your_name_style );
				}
				
				if( m_preferences.your_text_style_change == true ) {
					addToCSS( new Array( 'km[chat-dir="f"] kk', 'km[chat-dir="f"] kl' ), m_preferences.your_text_style );
				}
			}
			
			
			if( m_preferences.their_message_change == true ) {			
				if( m_preferences.their_message_style_change == true ) {
					addToCSS( 'km[chat-dir="t"]', m_preferences.their_message_style );
				}

				if( m_preferences.their_name_style_change == true ) {
					addToCSS( 'km[chat-dir="t"] kk kn', m_preferences.their_name_style );
				}
		
				if( m_preferences.their_text_style_change == true ) {
					addToCSS( new Array( 'km[chat-dir="t"] kk', 'km[chat-dir="t"] kl' ), m_preferences.their_text_style );
				}
			}
			
			if( m_preferences.other_message_change == true ) {
				if( m_preferences.other_message_style_change == true ) {
					addToCSS( 'kq kp', m_preferences.other_message_style ); 
				}
			}
			
			if( m_preferences.status_bar_style_change == true ) {
				addToCSS( 'kd', m_preferences.status_bar_style );
			}
			
			if( m_preferences.divider_style_change == true ) {
				addToCSS( 'kX', m_preferences.divider_style );
			}
			
			if( m_preferences.button_style_change == true ) {
				addToCSS( new Array( 'jS', 'jF', 'jB', 'jC', 'He', 'Hf', 'He', 'Hg' ), m_preferences.button_style );
			}
			
			if( m_preferences.background_style_change == true ) {
				addToCSS( new Array( 'nH', 'jp', 'pi', 'ph', 'k', 'l', 'm', 'n', 'o', 'p', 'q' ), m_preferences.background_style );
			}
			
			if( m_preferences.input_style_change == true ) { 
				addToCSS( 'jT', m_preferences.input_style );
			}
			
			if( m_preferences.title_bar_style_change == true ) {
				addToCSS( 'Hp', m_preferences.title_bar_style );
			}
			
			if( m_preferences.link_style_change == true ) {
				addToCSS( 'a:link, a:visited', m_preferences.link_style, true );
			}
			
			if( m_preferences.link_hover_style_change == true ) {
				addToCSS( 'a:hover', m_preferences.link_hover_style, true );
			}
			
	        injectCSS();
	
			window.parent.document.addEventListener( 'DOMNodeInserted', 
				function processEvent(e) { 
					if( e.target.nodeName == 'DIV' ) {
						if( ( e.target != null ) && ( e.target.getAttribute( 'role' ) == 'chatMessage' ) ) {
							formatMessage( e.target );
						}
					 }
				}, false );
				
			var l_messages = window.parent.document.getElementsByClassName( 'kf' )[0].childNodes;
			for each( l_message in l_messages ) {
				formatMessage( l_message );
			}
				
			return;
	    }

		m_intervalIds.push( setTimeout( initialize, '500' ) );
	}
}

function injectCSS() {
	var l_head = document.getElementsByTagName( 'head' )[0];
	if( l_head != null ) {
		var l_css = document.createElement( 'style' );
		var l_text = document.createTextNode( m_css );
		l_css.type = 'text/css';
		l_css.appendChild( l_text );
		l_head.appendChild( l_css );
	}
}

function isLoaded() {
    return ( ( document.styleSheets.length > 1 ) && ( window.parent.opener != null ) );
}

initialize();