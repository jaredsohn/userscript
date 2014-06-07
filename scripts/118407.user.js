// ==UserScript==
// @name        Minecraft Gift Code Hider
// @namespace   http://userscripts.org/users/325271
// @description Automatically hides gift codes and adds button to toggle visibility.
// @include     http://minecraft.net/profile
// @include     https://minecraft.net/profile
// @include     http://account.mojang.com/me
// @include     https://account.mojang.com/me
// @icon        http://www.minecraft.net/favicon.png
// @version     2.2
// ==/UserScript==

//This time with jQuery!
//Since they have it and it makes things easier.

//Check for Location, if it isn't Minecraft.net assume Mojang
if ( document.location.href.search('profile') > 0){
    //Hide Gift Code List on Minecraft.net
    $('ul:eq(2)').wrap('<div id="giftCodes"></div>');
    $('#giftCodes').hide();
    //Create Button on Minecraft.net
    $('<button id="toggle" onclick="toggleVisibility()">Show Gift Codes</button>').insertBefore("#giftCodes");
} else {
    //Hide Gift Code List on Mojang.com
    $('#giftCodes').hide();
    //Create Button on Mojang.com
    $('<button id="toggle" onclick="toggleVisibility()" style="margin:20px;">Show Gift Codes</button>').insertBefore("#giftCodes");
}

//Add Function to Web Page so the Button Works
$('<script type="text/javascript">function toggleVisibility(){'
+'var container = $("#giftCodes");'
+'if (container.is(":visible")){'
+'$("#toggle").html("Show Gift Codes");'
+'container.slideToggle("slow");'
+'} else {'
+'$("#toggle").html("Hide Gift Codes");'
+'container.slideToggle("slow");'
+'}}</script>').appendTo('body');
