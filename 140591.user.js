// ==UserScript==
// @name       Webcomic Reader 2
// @namespace  http://to.do.later
// @version    0.1
// @description  WIP 
/// @match      http://*/*
// @include    http://*.keenspot.com/*
// @include    http://www.interrobangstudios.com/potluck*
// @include    http://satwcomic.com/*
// @include    http://www.twogag.com/*
// @include    http://www.vgcats.com/comics/*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @copyright  2012+, martixy
// ==/UserScript==

(function()
{
    jQuery(window).load(function(){
        console.log("Blabla");
        if(jQuery('html').html().toLowerCase().indexOf('comic')>0){
                var largestImage=jQuery('<img>');
                jQuery('img').each(function(){
                        var obj=jQuery(this);
                        if(obj.outerWidth()*obj.outerHeight()>largestImage.outerWidth()*largestImage.outerHeight()){
                                largestImage=obj;
                        }
                });
                alert(largestImage.attr('src'));
        }
});
})();
