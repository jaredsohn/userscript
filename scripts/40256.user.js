// ==UserScript==
// @name           Customized Homeunix Manga
// @namespace      Knace
// @description    Improves the manga reading experience on homeunix.com
// @version        0.3
// @include        *read.homeunix.com/onlinereading/index.php?image=*
// @include        *read.homeunix.com/onlinereading/?image=*
// ==/UserScript==
///////////////////////////////////////////////////////////////////////////////////
//{ Config Section
//  --------------
	var prefetch = true;   //Toggle Next Page Loading (Prefetching)

	var stretch = true;  //Auto-stretch the manga image

	var reduce_mode = true;   //remove the top and bottom part of mangafox

//}
///////////////////////////////////////////////////////////////////////////////////
// Code Section
if( window.parent == window.window )
{

	//======================================================
	//{ Load variables
	//
		prefetch = GM_getValue('prefetch', prefetch);
		stretch = GM_getValue('stretch', stretch);
		reduce_mode = GM_getValue('reduce_mode', reduce_mode);
	//}
	//======================================================




	//======================================================
	//{ Store document data for modifying and rearranging
	//
		var links = document.getElementsByTagName('a');
		var images = document.getElementsByTagName('img');
		var tables =  document.getElementsByTagName('TABLE');
		var trs =  document.getElementsByTagName('tr');
	//}
	//======================================================



/////////////////////////////////////////////////////////////////////////////////


	//======================================================
	//{ Calculate url for next page
	//
		var url_nextpage;
		if( links[2].innerHTML == '<b>[NEXT CHAPTER]</b>' ) {
			url_nextpage = links[2].href;
		} else {
			url_nextpage = links[1].href;
		}
	//}
	//======================================================



	//======================================================
	//{ Allows for resizing of image along with adding link to next chapter
	//
		{
			var newimg = document.createElement('a');
			newimg.innerHTML = '<a href="'+url_nextpage+'"><img src="'+images[0].src+'"></a>';
			images[0].parentNode.replaceChild(newimg, images[0]);
		}
	//}
	//======================================================



	//======================================================
	//{ Prefetching
	//
		window.runPrefetch = function() {
			if( prefetch == true ) {
				iframe = document.createElement('iframe');
					iframe.setAttribute('src', url_nextpage);
					iframe.style.height = '1px';
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
	// TODO: Improve for those double pages, delete add link out and add onclick javascript insert (like mangafox)
		window.runStretch = function() {
			if( stretch ) {
				images[0].style.width = '100%';
				tables[0].style.width = '100%';
				tables[2].style.width = '99%';
			}
		}
		window.toggleStretch = function() {
			if( stretch == true ) {
				stretch = false;
				images[0].style.width = '';
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
		window.runReduceMode = function() {
			if( reduce_mode == true ) {
				trs[0].style.display = 'none';
			}
		}
		window.toggleReduceMode = function() {
			if( reduce_mode == true ) {
				reduce_mode = false;
				trs[0].style.display = 'block';
			} else {
				reduce_mode = true;
				runReduceMode();
			}
			GM_setValue('reduce_mode', reduce_mode);
		}
	//}
	//======================================================



/////////////////////////////////////////////////////////////////////////////////



	//======================================================
	//{ Call and register Commands
	//
		window.addEventListener( 'load', runPrefetch, true ); GM_registerMenuCommand( "Toggle Prefetching", togglePrefetch );
		runStretch(); GM_registerMenuCommand( "Toggle Image Stretching", toggleStretch );
		runReduceMode(); GM_registerMenuCommand( "Toggle *Reduced* Mode", toggleReduceMode );
	//}
	//======================================================


}
