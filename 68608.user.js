// ==UserScript==
// @name           DNN Forum Quick Reply
// @namespace      http://www.dotnetnuke.com/greasemonkey/
// @description    Adds a quick reply button to the DotNetNuke Forums
// @include        http://*.dotnetnuke.com/*
// @exclude        http://support.dotnetnuke.com/*
// @exclude        http://customers.dotnetnuke.com/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require	       http://cdn.jquerytools.org/1.1.2/tiny/jquery.tools.min.js
// @require        http://ajax.microsoft.com/ajax/3.5/MicrosoftAjax.js 
// ==/UserScript==

/*******************************************************************************
 DotNetNuke? - http://www.dotnetnuke.com
 Copyright (c) 2002-2010
 by DotNetNuke Corporation

 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated 
 documentation files (the "Software"), to deal in the Software without restriction, including without limitation 
 the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and 
 to permit persons to whom the Software is furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all copies or substantial portions 
 of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED 
 TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL 
 THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF 
 CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
 DEALINGS IN THE SOFTWARE.


Version history:
 Version 1.0:
  - Initial version which includes basic AJAX functionality
*******************************************************************************/

/*******************************************************************************
 This function is the heart of our behavior.  
 We have wrapped our jQuery here so that it is callable from our MSAjax
 as well as when we first load the GreaseMonkey script.
*******************************************************************************/ 
function UpdateForums() {
	jQuery(function () {
		
		// We add some styles into the page for our dialog box
		jQuery('#StylePlaceholder').append('#qr_dialog {display:none;z-index:10000;background-color:#fff;padding: 20px 5px 10px 5px;width:675px;min-height:200px;border:1px solid #666;-moz-box-shadow:0 0 90px 5px #000;-webkit-box-shadow: 0 0 90px #000;}');
		
		// Create the dialog box placeholder
		jQuery('#tblMain').parent().append('<div id="qr_dialog"><table width="100%" class="Forum_Container" cellspacing="0" cellpadding="0"><tbody id="qr_inserthere"></tbody></table></div>');
		
		// Move the last 3 rows of the forum container into our new dialog
		// These 3 rows contain the Quick Reply form
		jQuery('#tblForumContainer>tbody>tr').slice(9).remove().appendTo('#qr_inserthere');
		
		// Prepare our jQueryTools overlay and make it available for scripting
		var overlay = jQuery('#qr_dialog').overlay({
						expose: {
							color: '#999',
							loadSpeed: 200,
							opacity: 0.8
						},
						api: true 
					});
					
		// Add our new Quick Reply buttons into the page and hook them up to displa our dialog
		jQuery('td.Forum_NavBarButton>.Forum_Link:contains("Reply")')
			.closest('tr')
			.append('<td>&nbsp;</td>')
			.append('<td valign="middle" class="Forum_NavBarButton"><a href="#" class="Forum_Link">Quick Reply</a></td>')
			.find('.Forum_Link:contains("Quick Reply")')
			.click(function(event) {
				event.preventDefault();
				overlay.load();
			});

		/* Make sure to close the dialog when we submit our reply */
		jQuery('#qr_dialog').find('a').click(function() { overlay.close() });
	});
}


function EndRequestHandler(sender, args) {
	if (args.get_error() == undefined) {
		UpdateForums();
	}
}

// This allows us to hook into the UpdatePanel and call our function just like on page load
unsafeWindow.Sys.WebForms.PageRequestManager.getInstance().add_endRequest(EndRequestHandler);

// Let's get this party started
UpdateForums();
