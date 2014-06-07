// ==UserScript==
// @name       swagcloud
// @version    0.11
// @description  makes edmproduction soundcloud flair links clickable
// @match      http://www.reddit.com/r/edmproduction*
// @copyright  2012+, You
// ==/UserScript==

(function() {
    $('span[class*=\'flair-sc\'][title!=\'\']').live('hover', function(evt) {
        var e = evt.target,
            t = e.title.replace(/^http(s?):\/\//, ''),
            $n = $('<a/>', {
                html: t,
                href: 'https://' + t,
                target: '_blank',
                class: $(e).attr('class')
            });
        $(e).replaceWith($n);
    });
})();