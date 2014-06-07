// ==UserScript==
// @name       Unselect all markets
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  This script let you uncheck all the market in the Windows Phone Store backend. A script by Jonathan ANTOINE from Infinite Square (http://www.infiniteSquare.com)
// @match      https://dev.windowsphone.com/*/AppSubmission/Markets*
// @copyright  2012+, You
// ==/UserScript==


var button = $("<a/>",
               {
                text: '  unselect all',
                class: "with-drop",
                   href: "check"
                });

button.on("click", function(event) {
    event.preventDefault();
  $(".checkbox").each(function(elem){ $(this).attr("checked",false);});
});
$(".title2").append(button);

