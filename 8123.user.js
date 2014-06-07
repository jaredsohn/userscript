// ==UserScript==
// @name           NRG Greasemonkey List Fix
// @namespace      NRGGreasemonkeyListFix
// @description    Fixes the archive of NRG's Greasemonkey series of articles (at www.nrg.co.il)
// @include        http://www.nrg.co.il/gevanew/owa/MORE_IN_ARTS.showPage?channel_name=computer_channel&pt=1554001311&pid=/computer_channel/private_column_folder/sites_bender/
// ==/UserScript==

var myIframe = document.getElementById("iframenames");
	if (myIframe)
		myIframe.innerHTML="<iframe id=iframename name=iframename  src='/gevanew/owa/MORE.SHOW_MORE_ARTS?pLocationId=/computer_channel/private_column_folder/sites_bender/&pt=187321668&pchannelName=computer_channel' marginwidth=0 marginheight=0 hspace=0 vspace=0 scrolling=no frameborder=0 width=309  height=150></iframe>";
