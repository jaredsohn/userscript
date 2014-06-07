// ==UserScript==
// @name            LJ No Politics 
// @namespace       
// @description     kill any discussion about current US politics 
// @include      	http://*.livejournal.com/friend*
// ==/UserScript==

GM_addStyle("img { max-width: 600px; }");

function matchText( t ) {
  	var regex = /(McCain|Obama|Palin["',.?! ]+|Biden|twitter|tweets)/i;
  	var m = regex.exec(t);
  	if ( m == null ) {
 		return false;
  	} else {
		return true;
  	}	
}

function checkChild( node ) {

	if( node.nodeName == '#text' ) {
		// Check to see if there is a political text match
		m = matchText( node.nodeValue );
		if (m) {
			return true;
		}
	} else if ( node.nodeName == 'IMG' ) {
		// Check to see if there is a political image match
        	m = matchText( node.src );
		if (m) {
			return true;
		}
	} else {
	   // Don't check inside the user-icon class
	   if ( node.className.indexOf('user-icon') == -1 ) {	
	   	var k = node.childNodes;
	   	for( var i = 0; i < k.length; i++ ) {
	   		if ( checkChild(k[i]) ) {
				return true;
			}
	   	}		
           }
	} 
	return false;
}


function politicalKiller() {
	var x = document.getElementsByTagName('div');
	for( var i = 0; i < x.length; i++ ) {
		if( x[i].className.indexOf('asset-header-content-inner') != -1 ) {
			c = x[i].childNodes;
			for (var ii=0; ii<c.length; ii++) {
				if( c[ii].nodeName == 'H2' ) {
					a = c[ii].lastChild; /* grab the href */
					t = a.lastChild; /* grab its text */
					m = matchText(t.nodeValue);
					if (m) {
						a.removeChild(t);
						var k = document.createTextNode('Feh! Politics!');
						a.appendChild(k);
					}
					break;
				}
			}
		} else if( x[i].className.indexOf('asset-body') != -1 ) {
			c = x[i].childNodes;
			var found = 0;
			found = checkChild(x[i]);
			
			if ( found == 1 ) {
			   var k = document.createTextNode('Feh! Politics!');
			   for( var ii = c.length - 1; ii > 0; ii-- ) {
                        	x[i].removeChild(c[ii]);
			   }
			   x[i].appendChild(k);
			}
		}
	}
}

politicalKiller();
