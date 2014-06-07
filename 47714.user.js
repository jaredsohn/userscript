// ==UserScript==
// @name           pd image dragger
// @namespace      http://www.psychedesire.org/
// @description    image dragger
// @include        *
// @author psychedesire
// ==/UserScript==

// set up jQuery variable
var $;

// Add jQuery
var GM_JQ = document.createElement("script");
GM_JQ.src = "http://code.jquery.com/jquery-latest.min.js";
GM_JQ.type = "text/javascript";

document.body.appendChild(GM_JQ);

// Check if jQuery's loaded
var checker=setInterval(function(){
	if(typeof ($ = unsafeWindow.jQuery) != "undefined") {
		clearInterval(checker);
		var GM_JQu = document.createElement("script");
		GM_JQu.src = "http://www.psychedesire.org/dev/lib/jquery-ui-1.7.1.custom.min.js";
		GM_JQu.type = "text/javascript";
		document.body.appendChild(GM_JQu);
		var uchecker = setInterval(function(){
			if(typeof(draggable = unsafeWindow.jQuery.effects) != "undefined"){
				clearInterval(uchecker);
				letsJQuery();
			}
		},100);
	}
},100);

  // All your GM code must be inside this function
function letsJQuery() {
  $("img").each(function() {
    var offsets = $(this).offset();
    var topPosition = offsets.top - 8;
    var imgUrl = $(this).attr("src");
    var imgW = $(this).attr("width");
    var imgH = $(this).attr("height");
    $(this).css("display","none");
    $("body").append("<img src='" + imgUrl + "' style='position:absolute;top:"+ topPosition +"px;left:" + offsets.left + "px' width=" + imgW + "px height=" + imgH + "px />");
    var createElem = $("body").children();
    createElem.draggable();
  });
}