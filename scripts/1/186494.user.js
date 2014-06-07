// ==UserScript==
// @name DGS White-player Board Rotation
// @namespace emptypath.com
// @author Joshua Simmons
// @copyright 2013, Joshua Simmons http://www.emptypath.com
// @version 1.0
// @description Rotate the board on DGS when you're logged in and viewing a board on which you're the white player.  Makes it look as it would if you were sitting across from the player you're playing.
//
// @include http*://www.dragongoserver.net/game.php*
//
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==


(function($) { // save $ from use by other scripts or whatever

// test if we're the logged-in white player, if we're not,
// then return and don't do anything else
var uid = $("#loggedId").attr("title");
var whiteHref = $(".whiteInfo a.User").attr("href");
if (whiteHref !== ("userinfo.php?uid=" + uid)) {
    return;
}

// reverses a *contiguous* set of elements in place
function reverseInPlace(ls) {
    var last = ls.last();
    var rest = ls.slice(0, -1);
    rest.each(function() {
                  var tmp = $(this).detach();
                  last.after(tmp);
              });
}

var imageTranslation =
{
    'u.gif': 'd.gif',
    'd.gif': 'u.gif',
    'er.gif': 'el.gif',
    'el.gif': 'er.gif',
    'dl.gif': 'ur.gif',
    'ur.gif': 'dl.gif',
    'dr.gif': 'ul.gif',
    'ul.gif': 'dr.gif'
};
// map image names so that the rotated board shows the correct backgrounds
// at the borders
function translateImage(imageFile) {
    if (imageFile in imageTranslation) {
        return imageTranslation[imageFile];
    }
    return imageFile; // if it's not in the array above, then we map it to itself
}
var gobanLines = $('#Goban tr').has('.brdx');
// reverse each line
gobanLines.each(function() {
                    reverseInPlace($(this).children('td.brdx'));
                });
// then reverse the lines themselves
reverseInPlace(gobanLines);
// then reverse the coordinate labels (the top and bottom ones)
$('#Goban tr').has('.brdl').each(function() {
                                     reverseInPlace($(this).children('td.brdl'));
                                 });

// change the background images according to our mappings
//
// we have to split the filename up into the path part and filename part,
// because different size boards are in different directories
$('#Goban img.brdx').attr("src", function(i, val) {
                                     var parts = val.split("/");
                                     return parts[0] + "/" +
                                            translateImage(parts[1]);
                                 });

})(jQuery.noConflict(true)); // call our anonymous func that does everything
                             // again, this is to save $ for other scripts
