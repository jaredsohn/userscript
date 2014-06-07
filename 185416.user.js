// ==UserScript==
// @name       Nie ma muru :D
// @version    0.9
// @description  enter something useful
// @match      http://pl79.plemiona.pl/game.php?*screen=overview*
// @exclude    http://pl79.plemiona.pl/game.php?*screen=overview_villages*
// @exclude    http://pl79.plemiona.pl/game.php?*oscreen=overview*
// @copyright  2013+, CookieMichal
// ==/UserScript==

unsafeWindow.y = 0;
unsafeWindow.x = function () {
    $(".p_wall").each(function () {
        $(this).attr('src', "");
        $(".p_wall").css("display", "none")
        y++;
        if ($(".p_wall").attr('src') !== "") {
            z();
        } else {
            return;
        }
    });
};
unsafeWindow.z = function () {
    if ($(".p_wall").attr('src') !== "") {
        if (y == 5) {
            return;
        } else {
            x();
        }
    }
};
z();