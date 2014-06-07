// ==UserScript==
// @name            Userscripts.org - Scrap Spam Killer
// @namespace       http://userscripts.org/users/39650/scripts
// @description     Remove all links that contain the word "scrap".
// @version         0.2
// @date            01/17/2008
// @author          Andre Gil
// @include         http*://userscripts.org*
// ==/UserScript==

(function() {

	var usLoaded = false;
	
	function checkLink(link) {
		
		if ( link.innerHTML.toUpperCase().indexOf('SCRAP SPAM KILLER') > -1 ) {
			return false;
		}
		
		if ( link.innerHTML.toUpperCase().indexOf('SCRAP') > -1 && link.href.toUpperCase().indexOf('/SCRIPTS/') > -1 ) { 
			return true;
		}
		
		if ( link.parentNode.className == 'script-meat' ) {
			if ( link.parentNode.childNodes[3].innerHTML.toUpperCase().indexOf('SCRAP') > -1 ) {
				return true;
			}
		}
		
		return false;
		
	}
	
	function removeSpam() {
		var links = document.getElementsByTagName('a');
		
		if( links.length > 0 ) {

			for(var i = 0; i < links.length; i++) {			
				if( checkLink( links[i] ) ) {
				
					var linkRemoved = document.createElement('del');
					
					linkRemoved.appendChild( document.createTextNode( links[i].innerHTML ) );
					links[i].parentNode.insertBefore( linkRemoved , links[i] );

					if( links[i].parentNode.className == 'script-meat' ) {
						links[i].parentNode.removeChild( links[i].parentNode.childNodes[4] );
						links[i].parentNode.parentNode.childNodes[1].childNodes[1].href = 'javascript: void(0);';
					}
					
					links[i].parentNode.removeChild( links[i] );
					i--;
					
				}				
			}			
		}

		if ( !usLoaded ) {
			window.setTimeout(function(){ removeSpam(); }, 500);
		}		
	}

	window.setTimeout(function(){ removeSpam(); }, 500);
	window.addEventListener( 'load', function(){ usLoaded = true; removeSpam(); }, true);

})();