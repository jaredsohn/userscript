// ==UserScript==
// @name           Facebook APPS Page Cleaner
// @version        1.3
// @author         Habna
// @description    Removes annoying Facebook bluebar, ads, dock & chat in apps page!
// @include        http://apps.facebook.*
// @include        https://apps.facebook.*
// @grant          none
// @require        http://code.jquery.com/jquery-1.8.0.min.js
// @downloadURL    https://userscripts.org/scripts/source/139769.user.js
// @updateURL      https://userscripts.org/scripts/source/139769.meta.js
// @run-at         document-end
// ==/UserScript==

var gc = document.getElementById('globalContainer');

//Hide Facebook blue bar
var t = $("#blueBarHolder"); if (t != null) { t.css("visibility","hidden").css("height","0px"); }

//Hide ads
var t = $("#rightCol"); if (t != null) { t.css("visibility","hidden").css("height","0px").css("float","none"); }

//Hide dock
var t = $("#pagelet_dock"); if (t != null) { t.css("visibility","hidden").css("height","0px"); }

//Hide chat
var t = $("#pagelet_chat"); if (t != null) { t.css("visibility","hidden"); }

//Expands some content area
var t = $("#globalContainer"); if (t != null) { t.css("width","100%").css("padding-right","0px"); }
var t = $("#mainContainer"); if (t != null) { t.css("border-right","0px"); }
var t = $("#contentArea"); if (t != null) { t.css("width","98%").css("border-right","0px"); }

//Clean Facebook APPS Page function
var CleanFBAP = function(){
    //Hide element "Vu/see" when someone chat
    //$(".-cx-PRIVATE-mercuryTypingIndicator__root\\.seen").css("visibility","hidden");
    $(".-cx-PRIVATE-mercuryTypingIndicator__icon").css("visibility","hidden");
    $(".-cx-PRIVATE-mercuryTypingIndicator__text").css("visibility","hidden");
}

//Below function happens whenever the contents of globalContainer change
gc.addEventListener("DOMSubtreeModified", CleanFBAP, true);

//fires off the function to start with
//CleanFBAP();