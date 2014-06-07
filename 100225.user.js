// ==UserScript==
// @name           Hide Forum Signatures[HoN]
// @description    Hide signatures on the Heroes of Newerth forums
// @namespace      IKilledBambi
// @include        *heroesofnewerth.com/showthread.php?*
// @require        http://code.jquery.com/jquery-1.5.1.js
// ==/UserScript==

//Feel free to tell me how poor my code is.  Always willing to improve.
$(document).ready(function () {
    var sizeClass = $(".sizedsig").parent();         //Class - Signatures
    var sbtnName;                           //Button Name

    if(GM_getValue('nButton') == 1){
        sbtnName = "Show Signatures";
        sizeClass.toggle();
        $(".sizedsig").css("max-height","10px");
    } else {
        sbtnName = "Hide Signatures";
    }

    //Create Divs
    $(".tborder").before("<div id='ButtonHolder'></div>")
    $("#ButtonHolder").append("<input type='button' value='"+ sbtnName +"' \n\
        id='prepend'></button>"); //Create Button

    //Button Click Event
    $("#prepend").bind("click", function () {
        if (GM_getValue('nButton') == 1) {  //1 - Show Signatures
            $(this).val("Hide Signatures");         //Toggle Button Name
            GM_setValue("nButton", "2");            //Cookie 2
            sizeClass.toggle();                     //Toggle Signatures
            $(".sizedsig").css("max-height","200px");
        } else {                            //2 - Hide Signatures
            $(this).val("Show Signatures");         //Toggle Button Name
            GM_setValue("nButton", "1");            //Cookie 1
            sizeClass.toggle();                     //Toggle Signatures
            $(".sizedsig").css("max-height","10px");
        }
    });
});