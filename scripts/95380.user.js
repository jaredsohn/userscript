// ==UserScript==
// @name	wowraider.nobanner
// @description	wowraider nobanner
// @namespace
// @include
// ==/UserScript==

( function () {
	var arr, els, k, kk, el;

	arr = ['lrcolumn', 'llcolumn', 'lcentertop'];
	els = document.getElementsByTagName ( '*' );

	for ( k in els ) {
		el = els[k];
		if ( el ) {
			if ( el.id != null ) {
				for ( kk in arr ) {
					if ( el.id == arr[kk] ) {
						if ( el.parentNode != null ) {
							el.parentNode.removeChild ( el );
						} else if ( el.style != null ) {
							el.style.display = 'none';
						}
					}
				}
			}
		}
	}

	/*
	var arr, els, k, kk, el;

	els = document.getElementsByTagName ( 'iframe' );

	for ( k in els ) {
		el = els[k];
		if ( el ) {
			if ( el.parentNode != null ) {
				el.parentNode.removeChild ( el );
			} else if ( el.style != null ) {
				el.style.display = 'none';
			}
		}
	}
	els = null;

	arr = ['Advertisement', 'Advertisement1'];
	els = document.getElementsByTagName ( '*' );

	for ( k in els ) {
		el = els[k];
		if ( el ) {
			if ( el.id != null ) {
				for ( kk in arr ) {
					if ( el.id == arr[kk] ) {
				                alert ( el );
						if ( el.parentNode != null ) {
							el.parentNode.removeChild ( el );
						} else if ( el.style != null ) {
							el.style.display = 'none';
						}
					}
				}
			}
		}
	}
	*/

	//by class
	/*
	arr = ['share_block'];
	for ( var k in arr ) {
		var es = document.getElementsByClassName ( arr[k] );
		for ( var kk in es ) {
			if ( es[kk] != null ) {
				if ( es[kk].parentNode != null ) {
					es[kk].parentNode.removeChild ( es[kk] );
				} else if ( es[kk].style != null ) {
					es[kk].style.display = 'none';
				}
			}
		}
	}
	*/

	//alert ( 'done!' );
} ) ();
