// ==UserScript==
// @name           Customized Mangafox
// @namespace      Knace
// @description    Improves your mangafox reading experience with configurable features: Prefetching, Image Stretching, etc...
// @version        3.0
// @include        http://www.mangafox.com/manga/*/v*/c*
// ==/UserScript==
///////////////////////////////////////////////////
// Google Chrome Support Code
if( !GM_getValue && !GM_setValue && !unsafeWindow ) {

	function GM_setValue( cookieName, cookieValue, lifeTime ) {
		if( !cookieName ) { return; }
		if( lifeTime == "delete" ) { lifeTime = -10; } else { lifeTime = 31536000; }
		document.cookie = escape( cookieName ) + "=" + escape( cookieValue ) +
			";expires=" + ( new Date( ( new Date() ).getTime() + ( 1000 * lifeTime ) ) ).toGMTString() + ";path=/";
	}

	function GM_getValue( cookieName, oDefault ) {
		var cookieJar = document.cookie.split( "; " );
		for( var x = 0; x < cookieJar.length; x++ ) {
			var oneCookie = cookieJar[x].split( "=" );
			if( oneCookie[0] == escape( cookieName ) ) {
				try {
					eval('var footm = '+unescape( oneCookie[1] ));
				} catch(e) { return oDefault; }
				return footm;
			}
		}
		return oDefault;
	}

	function GM_registerMenuCommand( oText, oFunc ) {
	}

	window.unsafeWindow = window;
}

///////////////////////////////////////////////////

if( top == self )
{



//Load variables
	prefetch = GM_getValue('prefetch', true);
	stretch = GM_getValue('stretch', true);
	reduce_mode = GM_getValue('reduce_mode', true);
	remove_navbar_top = GM_getValue('remove_navbar_top', true);
	remove_navbar_bottom = GM_getValue('remove_navbar_bottom', false);
	remove_ads = GM_getValue('remove_ads', false);

//Global document variables
	var div_image = document.getElementById('viewer');
	var div_header = document.getElementById('header');
	var div_footer = document.getElementById('footer');
	var div_bottomad = document.getElementById('bottom_ads');
	var navbar_top = document.getElementById('top_center_bar').parentNode;
	var navbar_bottom = document.getElementById('bottom_center_bar').parentNode;
	var image = document.getElementById('image');
		var image_link = image.parentNode;

		

//Prefetching
	function runPrefetch() {
		if( prefetch ) {
			iframe = document.createElement('iframe');
				iframe.setAttribute( 'src', image_link.getAttribute('href') );
				iframe.style.height = '1px';
			document.body.appendChild(iframe);
		}
	}
	function togglePrefetch() {
		prefetch = !prefetch; GM_setValue('prefetch', prefetch);
		if( prefetch ) {
			alert('Prefetching: Turned On');
		} else {
			alert('Prefetching: Turned Off');
		}
	}
	window.addEventListener( 'load', runPrefetch, false );


//Image Stretching
	var clicked = false;
	function runStretch() {
		if( stretch ) {
			unsafeWindow.kn_enlarge = function() {
				if( clicked == false && unsafeWindow['image_width'] > window.innerWidth ) {
					clicked = true;
					div_image.style.width = ''+unsafeWindow['image_width']+'px';
					return false;
				} else {
					window.setTimeout("next_page()", 1);
				}
			}
			div_image.style.width = '100%';
			div_image.style.border = '0px';
			image.setAttribute('width', "100%");
			image.parentNode.setAttribute('onclick', 'return kn_enlarge()');
		}
	}
	function toggleStretch() {
		stretch = !stretch; GM_setValue('stretch', stretch);
		if( stretch ) {
			location.reload(true);
		} else {
			clicked = false;
			div_image.style.width = '728px';
			image_link.setAttribute('onclick', 'return enlarge()');
		}
	}
	runStretch();

//Reduce Mode
	function runReduceMode() {
		if( reduce_mode ) {
			div_header.style.display = 'none';
			div_footer.style.display = 'none';
		}
	}
	function toggleReduceMode() {
		reduce_mode = !reduce_mode; GM_setValue('reduce_mode', reduce_mode);
		if( reduce_mode ) {
			runReduceMode();
		} else {
			div_header.style.display = '';
			div_footer.style.display = '';
		}
	}
	runReduceMode();
	document.addEventListener('keypress', function(event) { if(event.keyCode == 27) { toggleReduceMode(); } }, true);

//Remove Navbar-Top
	function runNavbarTop() {
		if( remove_navbar_top ) { navbar_top.style.display='none'; }
	}
	function toggleNavbarTop() {
		remove_navbar_top = !remove_navbar_top; GM_setValue('remove_navbar_top', remove_navbar_top);
		if( remove_navbar_top ) {
			runNavbarTop();
		} else {
			navbar_top.style.display='';
		}
	}
	runNavbarTop();

//Remove Navbar-Bottom
	function runNavbarBottom() {
		if( remove_navbar_bottom ) { navbar_bottom.style.display='none'; }
	}
	function toggleNavbarBottom() {
		remove_navbar_bottom = !remove_navbar_bottom; GM_setValue('remove_navbar_bottom', remove_navbar_bottom);
		if( remove_navbar_bottom ) {
			runNavbarBottom();
		} else {
			navbar_bottom.style.display='';
		}
	}
	runNavbarBottom();

//Remove Ads
	function runAds() {
		if( remove_ads ) {
			if( !remove_navbar_top ) {
				document.getElementById('bottom_chapter_list').id = 'top_chapter_list';
				navbar_top.innerHTML = navbar_bottom.innerHTML;
			}
			div_bottomad.parentNode.removeChild(div_bottomad);
		}
	}
	function toggleAds() {
		remove_ads = !remove_ads; GM_setValue('remove_ads', remove_ads);
		if( remove_ads ) {
			runAds();
		} else {
			location.reload(true);
		}
	}
	runAds();


	GM_registerMenuCommand( 'Toggle Prefetching', togglePrefetch );
	GM_registerMenuCommand( 'Toggle Ads', toggleAds );
	GM_registerMenuCommand( 'Toggle Bottom NavigationBar', toggleNavbarBottom );
	GM_registerMenuCommand( 'Toggle Image Stretching', toggleStretch );
	GM_registerMenuCommand( 'Toggle Top NavigationBar', toggleNavbarTop );
	GM_registerMenuCommand( 'Toggle Site Navagation/Info', toggleReduceMode );

}