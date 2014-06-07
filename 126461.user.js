// ==UserScript==
// @name         GistBetterEdition
// @description  Improve the Gist edition view : Allow indentation & Enlarge 
// @id           me.zilliox.GistBetterEdition
// @homepageURL  http://userscripts.org/scripts/show/126461
// @supportURL   http://userscripts.org/scripts/discuss/126461
// @updateURL    http://userscripts.org/scripts/source/126461.meta.js
// @version      2012.07.12
// @author       tzilliox
// @namespace    http://zilliox.me
// @include	 https://gist.github.com/
// @include	 https://gist.github.com/*/edit
// ==/UserScript==

(function(){

	// UTILS
	var gsTab = "	"; // select tab char : tab or spaces
	var gsReturn = "\n";
	var insertTab = function( e ) {
		
		// UTILS
		var setIndent = function( textarea, e ) {
			var o = textarea;
			var bAdd = ! e.shiftKey;
		
			// UTILS
			var getTabDeletedStr = function(sTmp) {
				var aSel = sTmp.split(gsReturn);
				var aRex = Array(/^\t/,/^ {4}/,/^ {1,3}\t*/);
				for (var i=0, sLine; i<aSel.length; i++) {
					sLine = aSel[i];
					for (var j=0; j<3; j++) {
						if (sLine.match(aRex[j])) {
							aSel[i] = sLine.replace(aRex[j],'');
							break;
						}
					}
				}
				return aSel.join(gsReturn);
			}
			var getTabAddedStr = function(sTmp) {
				aSel = sTmp.split(gsReturn);
				for (var i=0; i<aSel.length; i++) {
					aSel[i] = gsTab + aSel[i];
				}
				return aSel.join(gsReturn); 
			}

			// LOGIC
			var sFull = o.value, sSel = '', sNew = '', iStart, iEnd;
			iStart = o.selectionStart;
			iEnd = o.selectionEnd;
			sSel = sFull.substring(iStart, iEnd);
			if ( sSel.length ) { 
				iStart = sFull.lastIndexOf(gsReturn, iStart) + 1;
				sSel = sFull.substring(iStart, iEnd);
				sNew = bAdd ? getTabAddedStr(sSel) : getTabDeletedStr(sSel); 
				o.value = sFull.substring(0, iStart) + sNew + sFull.substring(iEnd);
				o.setSelectionRange(iStart, iStart + sNew.length);
			} else if ( bAdd ) {
				o.value = sFull.substring(0, iStart) + gsTab + sFull.substring(iEnd);
				o.setSelectionRange(iStart + gsTab.length, iStart + gsTab.length);
			} else if ( sFull.substring( iStart-gsTab.length, iStart ) == gsTab ) {
				o.value = sFull.substring(0, iStart - gsTab.length) + sFull.substring( iStart );
				o.setSelectionRange(iStart - gsTab.length, iStart - gsTab.length);
			}
			return true;
		}
		var set_return = function( textarea ) {
	
			// UTILS
			var rtrim = function( str ) {
				return str.replace( /\s+$/ , '' );
			}

			// LOGIC
			var text = textarea.value;
			var select_index = textarea.selectionStart;
			if ( select_index == textarea.selectionEnd ) { 
				var start_line_index = text.lastIndexOf( gsReturn, select_index - 1 ) + 1;
				var line = text.substring( start_line_index, select_index );
				var indent = 0;
				var prefix = '';
				while ( line.substring( gsTab.length * indent, gsTab.length * ( indent + 1 ) ) == gsTab ) {
					indent++;
					prefix += gsTab;
				}
				if ( rtrim( line ).substr( -1 ) == '{' ) {
					prefix += gsTab;
				}
				textarea.value = text.substring( 0, select_index ) + gsReturn + prefix + text.substring( select_index );
				textarea.setSelectionRange( select_index + prefix.length + 1, select_index + prefix.length + 1 );
				return true;
			}
			return false;
		}
		var remove_line = function( textarea ) {
			var text = textarea.value;
			var start_line_index = text.lastIndexOf( gsReturn, textarea.selectionStart - 1 );
			var stop_line_index = text.indexOf( gsReturn, textarea.selectionEnd - 1 );
			textarea.value = text.substring( 0, start_line_index ) + text.substring( stop_line_index );
			textarea.setSelectionRange( start_line_index, start_line_index );
			return true;
		}
		var match_key = function( event ) {
			var key = e.keyCode ? e.keyCode : e.charCode ? e.charCode : e.which;

			// Tab
			if ( key == 9 && ! e.ctrlKey && ! e.altKey ) {
				return setIndent;
			}

			// Enter
			if ( key == 13 && ! e.ctrlKey && ! e.altKey ) {
			console.log( '1');
				return set_return;
			}

			// D
			if ( key == 68 && e.ctrlKey && ! e.altKey ) {
				return remove_line;
			}
		}

		// LOGIC
		var func = match_key( e );
		if ( func != null ) {
			console.log( '2');
			var textarea = e.target;
			var top = textarea.scrollTop; // for anti-scroll in firefox
			if ( (func)( textarea, e ) ) {
			console.log( '3');
				e.returnValue = false;
				e.preventDefault();
				textarea.scrollTop = top;
				return false;
			}
		}
		return true;
	}

	// Allow Tab & Shift+Tab
	var textareas = document.getElementsByClassName( 'file-contents' );
	for (var i=0; i<textareas.length; i++) {
		textareas[i].onkeydown = insertTab;
	}

	// Enlarge Gist 
	var mains = document.getElementsByClassName('main');
	if ( mains.length > 0 ) {
		mains[0].style.width = 'auto';
	}
})();