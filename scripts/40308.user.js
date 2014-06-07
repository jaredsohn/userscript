// ==UserScript==
// @name           Customized OneManga
// @namespace      Knace
// @description    Improves your onemanga.com reading experience with configurable features: Prefetching, Image Stretching, etc...
// @version        0.4
// @include        http://www.onemanga.com/*/*
// @exclude        http://www.onemanga.com/directory/*
// @exclude        http://www.onemanga.com/recent/*
// @exclude        http://www.onemanga.com/chat/*
// @exclude        http://www.onemanga.com/supportus/*
// @exclude        http://www.onemanga.com/shop/*
// @exclude        http://www.onemanga.com/contactus/*
// ==/UserScript==
///////////////////////////////////////////////////////////////////////////////////
//{ Config Section
//  --------------
	var autoupdate = true;
		var update_timer = 3;

	var prefetch = true;

	var background = true;
		var bg_color = '#00000f';
		var font_color = '#CCCCCC';

	var stretch = true;

	var reduce_mode = true;
		var info_bar = 'bottom';

	var remove_navbar_top = false;

	var remove_navbar_bottom = true;

//}
///////////////////////////////////////////////////////////////////////////////////
if( top == self )
{


	//======================================================
	//{ Load variables
	//
		prefetch = GM_getValue('prefetch', prefetch);
		background = GM_getValue('background', background);
			bg_color = GM_getValue('bg_color', bg_color);
		stretch = GM_getValue('stretch', stretch);
		reduce_mode = GM_getValue('reduce_mode', reduce_mode);
			info_bar = GM_getValue('info_bar', info_bar);
		remove_navbar_top = GM_getValue('remove_navbar_top', remove_navbar_top);
		remove_navbar_bottom = GM_getValue('remove_navbar_bottom', remove_navbar_bottom);
	//}
	//======================================================



	//======================================================
	//{ Store document data for modifying and rearranging
	//
		var divs = document.getElementsByTagName('div');
			var header_div = document.getElementById('header');
			var footer_div = document.getElementById('footer');
			var infobar_div = document.getElementsByTagName('h1')[0];
			var image_div = divs[10];
				var image = document.getElementsByTagName('img')[0];
			var tip_div = divs[12];
			var navbartop_div = divs[9];
			var navbarbottom_div = divs[11];
		var body_div = document.getElementById('content');
		var next_page = document.getElementsByTagName('a')[6].href;
	//}
	//======================================================



/////////////////////////////////////////////////////////////////////////////////



	//======================================================
	//{ Prefetching
	//     TODO: add prefetching between chapters
		window.runPrefetch = function() {
			if( prefetch == true ) {
				iframe = document.createElement('iframe');
					iframe.setAttribute('src', next_page);
					iframe.style.visibility = 'hidden';
				document.body.appendChild(iframe);
			}
		}
		window.togglePrefetch = function() {
			if( prefetch == true ) {
				prefetch = false;
				alert('Prefetching: Turned Off');
			} else {
				prefetch = true;
				alert('Prefetching: Turned On');
			}
			GM_setValue('prefetch', prefetch);
		}
	//}
	//======================================================


	//======================================================
	//{ Image Stretching
	//
		window.runStretch = function() {
			if( stretch ) { image.setAttribute('width', '100%'); }
		}
		window.toggleStretch = function() {
			if( stretch == true ) {
				stretch = false;
				image.setAttribute('width', '');
			} else {
				stretch = true;
				runStretch();
			}
			GM_setValue('stretch', stretch);
		}
	//}
	//======================================================


	//======================================================
	//{ reduce_mode
	//
		var moved_infolink = false;
		window.runReduceMode = function() {
			if( reduce_mode == true ) {
				header_div.style.display = 'none';
				footer_div.style.display = 'none';
				tip_div.style.display = 'none';
				if( info_bar == 'top' ) {
					//Do Nothing
				} else if( info_bar == 'bottom' ) {
					moved_infolink = true;
					image_div.parentNode.insertBefore( infobar_div, image_div.nextSibling );
				} else {
					moved_infolink = true;
					infobar_div.style.display = 'none';
				}
			}
		}
		window.toggleReduceMode = function() {
			if( reduce_mode == true ) {
				reduce_mode = false;
				header_div.style.display = 'block';
				footer_div.style.display = 'block';
				tip_div.style.display = 'block';
				if( info_bar != 'top' && info_bar != 'bottom' && moved_infolink == false ) { infobar_div.style.display = 'block'; }
			} else {
				reduce_mode = true;
				if( confirm('Move Manga Information Link to Top of Image?') ) {
					info_bar = 'top';
				} else {
					if( confirm('Move Manga Information Link to Bottom of Image?') ) {
						info_bar = 'bottom';
					} else {
						info_bar = ''; 
					}
				}
				GM_setValue('info_bar', info_bar);
				runReduceMode();
			}
			GM_setValue('reduce_mode', reduce_mode);
		}
	//}
	//======================================================




	//======================================================
	//{ remove_navbar_top
	//
		window.runNavbarTop = function() {
			if( remove_navbar_top == true ) {
				navbartop_div.style.display = 'none';
			}
		}
		window.toggleNavbarTop = function() {
			if( remove_navbar_top == true ) {
				remove_navbar_top = false;
				navbartop_div.style.display = 'block';
			} else {
				remove_navbar_top = true;
				runNavbarTop();
			}
			GM_setValue('remove_navbar_top', remove_navbar_top);
		}
		
	//}
	//======================================================



	//======================================================
	//{ remove_navbar_bottom
	//
		window.runNavbarBottom = function() {
			if( remove_navbar_bottom == true ) {
				navbarbottom_div.style.display = 'none';
			}
		}
		window.toggleNavbarBottom = function() {
			if( remove_navbar_bottom == true ) {
				remove_navbar_bottom = false;
				navbarbottom_div.style.display = 'block';
			} else {
				remove_navbar_bottom = true;
				runNavbarBottom();
			}
			GM_setValue('remove_navbar_bottom', remove_navbar_bottom);
		}
		
	//}
	//======================================================



/////////////////////////////////////////////////////////////////////////////////



	//======================================================
	//{ Call and register Commands
	//
		window.addEventListener( 'load', runPrefetch, false ); GM_registerMenuCommand( 'Toggle Prefetching', togglePrefetch );
		runStretch(); GM_registerMenuCommand( 'Toggle Image Stretching', toggleStretch );
		runReduceMode(); GM_registerMenuCommand( 'Toggle "Reduced" Mode', toggleReduceMode );
		runNavbarTop(); GM_registerMenuCommand( 'Toggle Top NavigationBar', toggleNavbarTop );
		runNavbarBottom(); GM_registerMenuCommand( 'Toggle Bottom NavigationBar', toggleNavbarBottom );
	//}
	//======================================================



}
