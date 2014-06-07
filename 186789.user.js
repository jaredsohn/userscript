// ==UserScript==
// @name        Wykopowa lista użytkowników Junior by Japer & Silent_Digger
// @description Dodaje konto junior przy nicku.
// @include     http://*.wykop.pl/*
// @include     http://wykop.pl/*
// @version     2.0abc thief
// @run-at	document-end
// @updateURL   https://userscripts.org/scripts/source/186789.meta.js
// ==/UserScript==

	

    var users = {
            "Junior" : {
                    "color" : "#FF5917",
                    "icon" : "http://static.allegrostatic.pl/site_images/1/0/junior.gif",
                    "nicknames" : ['Colek', 'Wredny_Szczur', 'wercia-xd-weronisia-rpk',
                            'dzolll', 'nvll', 'yaxes', 'softenik', 'BluRaf']
            },

	"Zlodziej" : {
                    "color" : "#FF5917",
                    "icon" : "http://icons.iconarchive.com/icons/led24.de/led/16/user-thief-icon.png",
                    "nicknames" : ['Famina', 'max1m0-']
            }

    };
     
    if (typeof $ == 'undefined') {
            if (unsafeWindow.jQuery) {
                    var $ = unsafeWindow.jQuery;
                    $(document).ready(main);
            } else {
                    addJQuery(main);
            }
    } else {
            $(document).ready(main);
    }
     
    function main()
    {
            $('a[title^="profil"] img').each(function (i,el) {
                    for(var group in users) {
                            if (users[group].nicknames.indexOf(el.alt) > -1)
                            {
                                    var $el = $(el);
                                    var li = $el.closest('li');
                                    el.parentNode.style['background'] = 'none repeat scroll 0 0 ' + users[group].color;
                                    var czas = li.find('time').get(0);
                                    czas.innerHTML = ' <img src="' + users[group].icon +'"> ' + czas.innerHTML;
                                    czas.innerHTML =('<span style="background: url() no-repeat scroll 0% 0% transparent;">') + czas.innerHTML;
                            }
                    }
            });
    }
     
    function addJQuery(callback) {
            var script = document.createElement("script");
            script.textContent = "$(document).ready(" + callback.toString() + ");";
            document.body.appendChild(script);
    }

