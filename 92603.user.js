// ==UserScript==
// @name            Google Images middle click 
// @author          theLOLflashlight
// @namespace       System
// @description     Direct link to image in new tab when middle clicked
// @include         http://images.google.*/images*q=*
// original code by Bruno Leonardo Michels
// ==/UserScript==

var is$Reg = unsafeWindow.$;

function LoadScript(file, callback)
{
    var script = unsafeWindow.document.createElement("script");
    script.type = "text/javascript";
    script.src = file;
    script.onload = function () { callback(); };
    unsafeWindow.document.getElementsByTagName('head')[0].appendChild(script);
}

function Run()
{
    var jQuery = unsafeWindow.jQuery;
    if (typeof(is$Reg) !== undefined) unsafeWindow.jQuery.noConflict();
    var $ = jQuery;
    
    $("#ires .rg_hv img, #ires canvas").live
    (
        "mouseup",
        
            var $this = $(this);
            var $parent = $this.closest("a");
            
            if ($parent.data("Modified")) return;
            
            var link = $parent.attr("href");
            link = link.match(/imgurl=(([^&]|&amp;)+)/gi)[0];function (event)
        {	
			if (event.which == 2){
            link = link.substring(link.indexOf("=") + 1);
            
            $parent.attr("href", link);
            
            $parent.data("Modified", true);
			} else {}
		}
    );
}

LoadScript("http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js", Run);

