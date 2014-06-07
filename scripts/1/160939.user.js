// ==UserScript==
// @name       GlagneFix
// @namespace  http://use.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://leprosorium.ru*
// @copyright  2012+, vano
// ==/UserScript==

(function(window) {
    var $ = function(_) { return document.getElementById(_); };
    var $$ = function(_) { return document.getElementsByTagName(_); };

    document.addEventListener('DOMContentLoaded', function() {
        Array.prototype.pop.apply(document.head.getElementsByTagName('link')).remove();

        var script = document.createElement('script');
        script.setAttribute('type', 'text/javascript');
        script.innerText = "\
			window.addEvent('domready', function() {\
                $$('.colony')[0].src = '/i/navthing/colony.gif';\
                $$('.archive')[0].src = '/i/navthing/archive-subs.gif?rev=9';\
                $$('.sklad')[0].src = '/i/navthing/sklad-subs.gif?rev=9';\
                $$('.lepra')[0].src = '/i/navthing/lepra-subs.gif?rev=9';\
                $$('.maximus')[0].src = '/i/navthing/maximus-subs.gif?rev=9';\
                $('nav-nav').style.display = 'none';\
                $('nav-nav').src = '/i/navthing/nav-nav.gif';\
                $$('.nav_thing_subs .button_left')[0].style.left = '-14px';\
                $('gertruda').getElement('img').src = '/i/gertruda/"+ (Math.round(Math.random()*170) + 1) +".jpg';\
                $('navigation-fon').getElement('.button_left img').src = '/i/navthing/left.gif';\
                $('navigation-fon').getElement('.button_right img').src = '/i/navthing/right.gif';\
				$$('.footer_left_holder a')[2].getElement('img').src = '/i/flag.png?rev=9';\
                $$('input[src$=\"ahoy.gif\"]').set('src', 'http://img.dirty.ru/lepro/ahoy.gif');\
                $$('input[src$=\"yarrr.gif\"]').set('src', 'http://img.dirty.ru/lepro/yarrr.gif');\
    		});\
        ";
        document.body.appendChild(script);
    });
})(window);