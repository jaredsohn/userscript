// ==UserScript==
// @id             rsm_intranet_net-compatibility
// @name           [ Intranet ] .Net Compatibility
// @namespace      dev.rsalazar.name
// @author         rsalazar
// @description    Fixes some .Net incompatibilities with Firefox 4 beta4+
// @include        https://my-intranet/
// ==/UserScript==

(function( ) {
	/**
	 * .Net-related - object  document::getBoxObjectFor( string )
	 * Dropped in Mozilla 1.9.2 (Firefox 3.6) - added support for getBoundingClientRect()
	 */
	var  box = function( id ) {
		var  resl, el = document.getElementById(id);
		if ( !el )  return  null;
		resl = el.getBoundingClientRect();
		resl.parentOffset = null;
		resl.element = el;
		resl.screenX = window.screenX + resl.left;
		resl.screenY = window.screenY + resl.top;
		resl.x = resl.left;
		resl.y = resl.top;
		return  resl;
	}; // [object]  document::getBoxObjectFor( string )


	/**
	 * .Net-related - object  Sys::UI::DomElement::getLocation( HtmlElement )
	 * Fixes "I.document is undefined" exception
	 */
	var  loc = false;
	if ( 'https:' == document.location.protocol && 'undefined' != typeof unsafeWindow.Sys
		 && 'undefined' != typeof unsafeWindow.Sys.UI.DomElement ) {
		loc = function( I ) {
			if ( I.self || I.nodeType == 9 ) {
				return  new Sys.UI.Point( 0, 0 );
			}
			try {
				var  H = I.getBoundingClientRect(); // Added in Mozilla 1.9.2 (Firefox 3.6)
			} catch ( F ) {
				return  new Sys.UI.Point( 0, 0 );
			}
			if ( !H ) {
				return  new Sys.UI.Point( 0, 0 );
			}

			var  G = (I.document || I.ownerDocument).documentElement,
				 E = H.left - 2 + G.scrollLeft,
				 D = H.top  - 2 + G.scrollTop;
			try {
				var  B = I.ownerDocument.parentWindow.frameElement || null;
				if ( B ) {
					var  C = 2 - (B.frameBorder || 1) * 2;
					E += C;
					D += C;
				}
			} catch ( A ) {
			} // try..catch
			return  new Sys.UI.Point( E, D );
		}; // Sys::UI::Point  Sys::UI::DomElement::getLocation( HtmlElement )
	}


	/**
	 * Finally, add the functions to the page
	 */
	var  script = document.createElement('script');
	script.type = 'application/javascript';
	script.innerHTML = 'if ( \'function\' != typeof document.getBoxObjectFor )\n'
	                  +'document.getBoxObjectFor = ('+ box.toString() +')'
	                  +( !loc ? '' : ';\nSys.UI.DomElement.getLocation = ('+ loc.toString() +');' );
	document.head.appendChild(script);
}());