// ==UserScript==
// @name	readmanga.nobanner
// @description	readmanga nobanner
// @namespace
// @include
// ==/UserScript==

( function () {
	var arr, divs, k, kk;

	//by id
	arr = ['topBaner', 'middleBaner', 'begun_video_block', 'rightBaner'];
	for ( k in arr ) {
		var e = document.getElementById ( arr[k] );
		if ( e != null ) {
			if ( e.parentNode != null ) {
				e.parentNode.removeChild ( e )
			} else if ( e.style != null ) {
				e.style.display = 'none';
			}
		}
	}

	//by div's part id
	arr = ['MarketGid'];
	divs = document.getElementsByTagName ( 'div' );
	for ( k in divs ) {
		var div = divs[k]
		if ( div.id != null ) {
			for ( kk in arr ) {
				if ( div.id.search ( arr[kk] ) != -1 ) {
					if ( div.parentNode != null ) {
						div.parentNode.removeChild ( div );
					} else if ( div.style != null ) {
						div.style.display = 'none';
					}
				}
			}
		}
	}


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
