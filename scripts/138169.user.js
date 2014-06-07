// ==UserScript==
// @name               TSR fluid width
// @author             Chrosson
// @version            1.8
// @description	       Make TSR fluid width again
// @namespace          *.thestudentroom.co.uk/
// @include            http://*.thestudentroom.co.uk/
// @include            http://thestudentroom.co.uk/
// ==/UserScript==

// jquery greasemonkey chrome
// - http://stackoverflow.com/questions/3032261/any-working-greasemonkey-script-with-jquery-that-works-in-google-chrome
//   - https://gist.github.com/437513
// - http://stackoverflow.com/questions/2246901/how-can-i-use-jquery-in-greasemonkey-scripts-in-google-chrome
// Update checking
// - http://stackoverflow.com/questions/5609286/is-there-anyway-of-checking-for-updates-in-chrome-user-scripts
//   -https://gist.github.com/874058
// - http://userscripts.org/scripts/show/2296
// - http://userscripts.org/scripts/show/20145
// - http://userscripts.org/scripts/show/38017
// Persistent data
// - http://userscripts.org/scripts/show/68559 (GM_* emulation)

// TODO
// - Make the carousel snap to size of the window
// - Make the carousel iterate a few things at a time
//   - See 2nd function in home.js for generation
//   - Will need to move divs out, delete carousel then generate
//     then manually specify carousel-page width
// - Auto update notification
//   - Persistent storage for storing date of last check?
//   - <name>.meta.js from userscripts.org


function with_jquery(f) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.textContent = "(" + f.toString() + ")(jQuery)";
    document.body.appendChild(script);
};

with_jquery(function($) {
    $('#carousel-container').css('margin', '0px 25px').css('width', '960px').css('margin', '0 auto');
    $('.page-section').width('99%');
    $('#page-section-top').width('99%');
    $('#page-section-top').css({"padding":"8px 0px"});
    $('#takeover-left').hide();
    $('#takeover-right').hide();
});