// ==UserScript==
// @name       7s Enhancement suite
// @namespace  http://ecb2.biz/
// @version    1.1
// @description  Retract signatures
// @match      http://*.se7ensins.com/*
// @updateURL  http://userscripts.org/scripts/source/434758.user.js
// @copyright  2014+, ECB2
// ==/UserScript==

function sevensins_loaded()
{
initSignatureHider();
initQuoteRetractor();
initScrollingTopbar();
}

function initSignatureHider(){
var swag = "<style>.signature:before { content: \"Hidden Signature - Hover to view\"; font-weight: bold; } .signature:hover:before { content: \"\"; } .signature{ height: 16px; overflow: hidden; } .signature:hover{ height: auto; }</style>";
$("head link[rel='stylesheet']").last().after(swag);   
}

function initQuoteRetractor(){
$("head").append("<style>.retractor{ display:none}.quoteContainer.expanded .retractor{display:block;font-weight:bold;}</style>")
$(".quoteContainer").append("<a class=\"retractor\" onclick=\"this.parentNode.className = 'quoteContainer unexpanded';\">Retract</a>");
}

/*
Made by Monopolyman
http://www.se7ensins.com/forums/members/monopolyman.215986/
http://userscripts.org/scripts/show/292540
*/
function initScrollingTopbar(){
$("#moderatorBar").append( "<div id='monopolyman'></div>" );
$("#monopolyman").css("background-color", "rgba(19,19,19,.9)").css("z-index", "2").css("position", "fixed").css("width", "100%").css("padding", "15px").css("top", "0%");
$(".visitorTabs").css("position", "fixed").css("top", "1%").css("right", "1%").css("z-index", "3");
$(".socialIcons").css("position", "fixed").css("top", ".5%").css("left", ".25%").css("z-index", "3");
$("#searchBar").css("z-index", "1");
}

$(document).ready(sevensins_loaded);