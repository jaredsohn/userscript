// ==UserScript==
// @name          Glitch Achievement Filter
// @namespace     glitcth.userscripts.achivements
// @description	  Ever wanted the Glitch achievements page to indicate which ones you don't have? This does that.
// @version	0.1
// @date 10/8/2011
// @include http://www.glitch.com/achievements/
// ==/UserScript==

function main() {
    //if (!/glitch.com\/achievements/.test(window.location)) {
    //    confirm('Use this at glitch.com/achievements! Go there now?\n\n(Remember: You need to click on this again once you\'re there!)') && (window.location = 'http://glitch.com/achievements/');
    //    return;
    //}
    $('#nav-profile a').first().each(function () {
        var as = [];
        $.ajax({
            'url': this.href + 'achievements/',
            'success': function (data) {
                $(data).find('ul.badges li > a > strong').each(function () {
                    as.push(this.innerHTML)
                });
                $('a.tip span.item-name').each(function () {
                    if (as.indexOf(this.innerHTML) != -1) {
                        $(this.parentNode).fadeTo(0, 0.2);
                    }
                })
            }
        })
    })
}

var script = document.createElement('script');
script.appendChild(document.createTextNode('(' + main + ')();'));
(document.body || document.head || document.documentElement).appendChild(script);