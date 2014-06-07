// ==UserScript==
// @name      To-Search List
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  Turn your browser into a googling machine
// @match      http://*/*
// @match      https://*/*
// @include      http://*/*
// @include      https://*/*
// @grant			GM_addStyle
// @grant			GM_setValue
// @grant			GM_getValue
// @copyright  2013+, Team Nutrishnist
// @license MIT
// @require http://code.jquery.com/jquery-latest.js
// @require http://code.jquery.com/ui/1.10.2/jquery-ui.js
// ==/UserScript==


(function (window, undefined) {
    var w;
    if (typeof unsafeWindow != undefined) {
        w = unsafeWindow
    } else {
        w = window;
    }

    if (w.self != w.top) {
        return;
    }

    $(document).ready(function () {

        if (w.location.href.indexOf('nutrishnist') > -1) {


        } else {





            $(document).find('body').prepend('<div id="toggleli" style="top:1px;right:1px;cursor:pointer;position:fixed;z-index:999999999999999999999;text-align:center;border:2px solid #B3B3B3;margin:4px;color:#4183C4;padding:8px;border-radius:5px;width:180px;font-size:19px;">[To-Search List]</div><div id="draggdil" style="width:100%;background-color:#ffffff;left:0px;bottom:0px;z-index:9999999999999;display:none;position:fixed !important;height:auto;"><div  id="resizediv" style="height:200px;position:static;"><div class="ui-resizable-handle ui-resizable-n" style="height:10px;background-color:#535353;cursor: s-resize;margin-bottom:10px;"></div><div id="containerqwe" style="height:100%;"><div id="overlayqwe" style="display:none;background:transparent;width:100%;height:100%;position:absolute;"></div><iframe frameBorder="0" width="100%" height="100%" src="http://nutrishnist.com/experiment.php"></div></div></div>');

            $("#resizediv").css(
            
                "height", GM_getValue('resizeheight')
                
            );

            $("#toggleli").draggable({
                axis: "x"
            });
var hgt = $(window).height();
            $("#resizediv").resizable({
                handles: "n",
                minHeight: 100,
                maxHeight: hgt*0.8,
                start: function () {
                    $("#overlayqwe").show();
                },
                stop: function () {
                    $("#overlayqwe").hide();
                    GM_setValue('resizeheight', $("#resizediv").css('height'));
                }
            });

            $("#toggleli").on("click", function () {


                $("#draggdil").slideToggle('fast');




            });




            $("#toggleli").on("mouseover", function () {

                $(this).css("border", "2px solid #4183C4");

            });



            $("#toggleli").on("mouseout", function () {

                $(this).css("border", "2px solid #b3b3b3");

            });

        }



    });
})(window);