// ==UserScript==
// @name				Zinio Straight To Issue Link
// @author			ScienceOrArt
// @namespace   http://userscripts.org/users/484085
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js 
// @match				http://*.zinio.com/*
// @include			http://*.zinio.com/*
// @description	Adds a link for magazines on Zinio that goes straight to the issue in the magazine reader
// @version			1.0.1
// ==/UserScript==

$('a[href^="/browse/issues/index.jsp?"]').each(function(index) {
	$(this).parent().append('<a href="' + $(this).attr('href').replace('/browse/issues/index.jsp?skuId=','/reader.jsp?issue=')+'">Issue</div>');
});
$('a[href^="JavaScript:popupCover"]').each(function(index) {
	$(this).attr('href', $(this).attr('href').replace("JavaScript:popupCover('","").replace("', 950, 670)",""));
	$(this).find('.offerOverlay').attr('onclick','').unbind('click');
});
