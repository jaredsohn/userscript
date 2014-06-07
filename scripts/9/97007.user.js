// ==UserScript==
// @name           Reticent Twimbow Reader
// @namespace      org.ilumbo.reticenttwimbowreader
// @description    If the Twimbow Reader cannot make sense of a link, automatically forward to the source.
// @copying        Copyright 2011 Pimm Hogeling. You can redistribute and/or modify this script under the terms of the GNU LGPL
//                 version 3 or later, as published by the Free Software Foundation. This script is distributed WITHOUT ANY
//                 WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
// @include        http://www.twimbow.com/dashboard.php
// ==/UserScript==

(function(){function b(){void 0==unsafeWindow.currentUser?window.setTimeout(b,128):c(unsafeWindow.$,function(){return"Y"==unsafeWindow.gSettings.twimbowReader})}function c(a,b){a(".inlink").die("click");a(".inlink").live("click",function(c){if(b()){c.preventDefault();var d=a(this).attr("href");a.get("./serverreq/readerproxy2.php?url="+d,function(b){a.fancybox.hideActivity();if("The link doesn&acute;t seem to be an article/post"==b.substr(3,49)){setTimeout(GM_openInTab, 0,d);var c=a('<div style="background-color: rgba(0, 0, 0, 0.7); color: #C4C4B8; border-radius: 8px; -moz-border-radius: 8px; padding: 10px; position: fixed; top: 50%; left: 50%; width: 256px; margin-top: -20px; margin-left: -128px; z-index: 21105;">Link opened in new tab&hellip;</div>');c.appendTo(a("body"));setTimeout(function(){c.fadeOut(1E3,function(){c.remove()})},3E3)}else a("#articleContent").html(b),a("#articleContent a").addClass("articlelink").attr("target","_blank"),0==a("#articleContent").find("img").length&& a("#photoFilter").hide(),0==a("#articleContent").find("object").length&&a("#videoFilter").hide(),a("#articleSrcRef").attr("href",d),a.fancybox({href:"#articleOuter",transitionIn:"elastic",transitionOut:"elastic",overlayOpacity:0.8,overlayColor:"black",autoDimensions:!1,width:"710px",height:"90%",onClosed:function(){a("#photoFilter").attr("class","photo-on").show();a("#videoFilter").attr("class","video-on").show()}})});a.fancybox.showActivity()}})}b()})();
