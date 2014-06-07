// ==UserScript==
// @name           frys.com Large Image Viewer with Thickbox
// @version        0.1
// @description    Shows larger images with Thickbox on the same page instead of a popup.  Also will add a link to larger image if one doesn't exist.
// @namespace      http://userscripts.org/scripts/show/41784
// @include        http://*.frys.com/product/*
// ==/UserScript==



/*	This is a simple Thickbox script for frys.com that will open the larger image view on the same page instead of a popup. 
 *	
 *	If a link to the larger image isn't there it will add it. ( most of them have larger images that I have found. )
 *	I am sure this will be the first part to break if they change their layout.  
 *
 *	Please send feedback, suggestions, or bugs to
 *  x
 *	at xenfx dot com
 *
 *
 */




// Add jQuery & thickbox to the header
	var GM_JQ = document.createElement('script');
	GM_JQ.src = 'http://myrren.xenfx.com/playground/thickbox/jquery.js';
	GM_JQ.type = 'text/javascript';
	
	var GM_TB = document.createElement('script');	
	GM_TB.src = 'http://myrren.xenfx.com/playground/thickbox/thickbox.js';
	GM_TB.type = 'text/javascript';
	
	var GM_TBcss = document.createElement('link');	
	GM_TBcss.href = 'http://myrren.xenfx.com/playground/thickbox/thickbox.css';
	GM_TBcss.type = 'text/css';
	GM_TBcss.rel = 'stylesheet';
	GM_TBcss.media = 'screen';

	document.getElementsByTagName('head')[0].appendChild(GM_JQ);
	document.getElementsByTagName('head')[0].appendChild(GM_TB);
	document.getElementsByTagName('head')[0].appendChild(GM_TBcss);
	
	
// Check if jQuery's loaded
	function GM_wait()
	{
		if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
		else
		{
			$ = unsafeWindow.jQuery;
			letsJQuery();
		}
	}
	
	GM_wait();
	

	// All your GM code must be inside this function
	function letsJQuery()
	{
		//	alert($); // check if the dollar (jquery) function works
		$(document).ready(function(){
		
			function GM_createImageHref (num)
			{
				return "http://images.frys.com/art/product/big_shots/" + num + ".big.jpg";
			}
		
			try
			{
				var GM_LrgLink = $('#limg_div a');
				if(GM_LrgLink.length > 0)
				{
					var GM_num = GM_LrgLink[0].href;
					
					GM_num = GM_num.substring(GM_num.indexOf('newLargeimage') + 14, GM_num.indexOf(')'));
					GM_LrgLink.attr("href",GM_createImageHref(GM_num));

					unsafeWindow.tb_init(GM_LrgLink);
				}
				else	// link not found;  try and find the image id, and add link
				{
					var GM_smlIMG = GM_smlIMG = $("font:contains('Price')").parent("td").parents("td img").eq(0).find("img").eq(0);
					var GM_num = GM_smlIMG.attr("src").split("/");
					GM_num = GM_num[GM_num.length - 1].split(".")[0];
					
					var GM_LrgLink = GM_smlIMG.wrap("<a id='GM_LrgLink' href='" + GM_createImageHref(GM_num) + "'></a>").parent();
					GM_LrgLink.find("img").after("<span style='font-size:0.8em;text-align:center;display:block;margin-bottom:10px;'>Larger Image</span>");
					GM_LrgLink.css("display","block");
					
					unsafeWindow.tb_init(GM_LrgLink);
				}
				
			}
			catch(e)
			{
				//alert(e);
			}
		
		});		
	}


