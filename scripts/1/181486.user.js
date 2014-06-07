// ==UserScript==
// @name           LizardWizardLPCaptions
// @namespace      LizardWizardLPCaptions
// @description    Shows the filenames for Lizard Wizard's lpix images next to the images
// @include        http://forums.somethingawful.com/showthread.php?*threadid=3543889*
// @require		   http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==

$(window).load(function(){
	$("td.postbody").find("img").each(function(){
        var src = $(this).attr("src");
        if(src.indexOf("lpix.org") != -1 && src.indexOf("-") != -1) { //Only LP images, excluding thumbnails
            $(this).after(" <i>" + src.substr(src.lastIndexOf("/") + 1) + "</i>");
    }        
	});
});