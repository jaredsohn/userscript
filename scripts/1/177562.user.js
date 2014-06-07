// ==UserScript==
// @name        Używalność Strimsa
// @namespace   strims_ergonomia
// @include     http://strims.pl/*
// @version     1
// ==/UserScript==



function main() {
    function CreateImg(src, alt, sizeX, sizeY) {
            return $('<img />').attr(
                {
                    'src': src,
                    'alt': alt,
                    'title': alt,
                    'width': sizeX,
                    'height': sizeY
                }
            );
        };
    var ConversationsBox = $('#top_user_menu a[href="/konwersacje"]').parent().detach();
    var SavedBox = $('#top_user_menu a[href*="/zapisane"]').parent().detach();
    var SettingsBox = $('#top_user_menu a[href="/ustawienia"]').parent().detach();
    var LogoutBox = $('#top_user_menu a[href*="/wyloguj"]').parent().detach();
    
    $('a', SettingsBox).empty().append(
        CreateImg('http://chat.ginden.pl/images/settings.svg', 'ustawienia', 16, 16).css('margin-bottom', '-3px')
    );
    $('a', SavedBox).empty().append(
        CreateImg('https://upload.wikimedia.org/wikipedia/commons/e/ee/Gnome-dev-floppy.svg', 'zapisane', 16, 16).css('margin-bottom', '-3px')
    );
    $('a', ConversationsBox).empty().append(
        CreateImg('http://chat.ginden.pl/images/klid_favicon.png', 'zapisane', 16, 16).css('margin-bottom', '-3px')
    );
    // 
    $('a', LogoutBox).empty().append(
        CreateImg('https://upload.wikimedia.org/wikipedia/commons/7/76/Oxygen480-actions-system-shutdown.svg', 'wyloguj', 16, 16).css('margin-bottom', '-3px')
    );
    $('#top_user_menu a.user_name').parent().after(SettingsBox, LogoutBox).before(ConversationsBox, SavedBox);
    



}
function addJQuery(callback) {
    "use strict";
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
}
if (typeof $ === typeof undefined) {
    if (unsafeWindow.jQuery) {
        var $ = unsafeWindow.jQuery;
        main();
    } else {
        addJQuery(main);
        }
} else {main();}