// ==UserScript==
// @name           Hajar bl4CK Rev. 2 (Spesial for CCPB)
// @namespace      Hajar bl4CK Rev. 2 (Spesial for CCPB)
// @description    Hajar bl4CK Rev. 2 (Spesial for CCPB)
// @include        *
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @version Rev. 2
// ==/UserScript==

// Wait document ready

$(document).ready(function () {

	// Check if the site is based with RapidLeech script
	
	var checkname = $("html").text().toLowerCase();

	if(((checkname.indexOf("leech") > -1)) && ($("form[name='transload']").length)){

		// Remove original button to confirm

		$("input[name='btnTransload']").remove();
		
		$("form[name='transload'] input[type='button']").remove();
		
		$("form[name='transload'] input[type='submit']").remove();


		// Insert hacked button with bypass function

		$("form[name='transload']").append('<div style="border: 6px lime solid; width:200px;"><input id="hackedbtn" style="font : 180% arial;letter-spacing: -.05em;width:200px;height:50px;" type="button" value="Hajar bl4CK !!" /></div><p><font size="5" color="coral">Hajar bl4CK Rev. 2 (Spesial for CCPB)</font></p>');

		$("#hackedbtn").click(function() {
			bypass();
		});

		function bypass(){
			
			$('form[name=transload]').submit();

		};


		// Insert Hajar bl4CK signature

		$("input[name='link']").attr('value','Visit http://www.jogspace.info to 

view update trick !');
	
	}

});