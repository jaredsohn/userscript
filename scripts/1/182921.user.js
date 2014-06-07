// ==UserScript==
// @name       Getty set mobile and copyright
// @namespace  http://www.loupiote.com/
// @version    0.0
// @description  Getty contributor dashboard helper: set Mobile Device to "no" and prefill Copyright
// @include     /^https?://contribute\.gettyimages\.com/producer/images/flickr/\d+/
// @copyright  2013 Loupiote - http://www.loupiote.com
// @require        http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @run-at      document-end
// ==/UserScript==

// define waitUntilExists from https://gist.github.com/PizzaBrandon/5709010
(function(e,f){var b={},g=function(a){b[a]&&(f.clearInterval(b[a]),b[a]=null)};e.fn.waitUntilExists=function(a,h,j){var c=this.selector,d=e(c),k=d.not(function(){return e(this).data("waitUntilExists.found")});"remove"===a?g(c):(k.each(a).data("waitUntilExists.found",!0),h&&d.length?g(c):j||(b[c]=f.setInterval(function(){d.waitUntilExists(a,h,!0)},500)));return d}})(jQuery,window);


$('#asset_taken_with_mobile').waitUntilExists(function(){
    $('#asset_taken_with_mobile > option')[2].selected = 'selected';
});

$('#asset_copyright_notice').waitUntilExists(function(){
    var copy = $('#asset_copyright_notice');
    if (!copy.val()) {
        copy.val('© ');
//        copy.val('© John Doe'); // un-comment and edit this line with your name
    }
});