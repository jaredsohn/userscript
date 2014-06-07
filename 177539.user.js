// ==UserScript==
// @name        Własny pasek strims.pl
// @namespace   strims_wlasny_pasek_u_gory
// @include     http://strims.pl/*
// @grant       none
// @version     1.01
// ==/UserScript==


function main() {
    /* PRZYKŁADOWE WPISY
     * CreateLinkOnTop('s', 'Nauka'); // tworzy link do strimu s/Nauka o nazwie Nauka
     * CreateLinkOnTop('s', 'Biologia'); // tworzy link do strimu s/Biologia o nazwie Biologia
     * CreateLinkOnTop('s', 'Biologia', 'kucyki'); // tworzy link do strimu s/Biologia o nazwie kucyki
     * CreateLinkOnTop('s', 'moderowane/zgloszenia', 'zgłoszenia'); // tworzy link do zgłoszeń w strimie Biologia 
     * CreateLinkOnTop('u', 'Ginden'); // tworzy link do u/Ginden
     * CreateLinkOnTop('u', 'Ginden', 'idiota'); // tworzy link do u/Ginden o nazwie idiota
     * CreateLinkOnTop('e', 'http://wykop.pl/', 'Wykop'); // e = external. Tworzy link do strony głównej Wykopu o nazwie Wykop. W tym przypadku trzeci parametr jest wymagany.
     * CreateLinkOnTop('g', 'Wpisy'); // tworzy link do grupy g/Wpisy. NIE JEST on rozwijany jak typowe.
     **/
    /*
        opcjonalny jest czwarty parametr, który pozwala nam określić pozycję elementu - np.
        CreateLinkOnTop('u', 'strims', 'admin', 0);
        wstawi nam link do profilu admina na samym początku listy, przed strimem głównym
    */
    setTimeout(function() {
        /*
            JEDEN LINK = JEDNA LINIA
        */
        CreateLinkOnTop('u', 'strims', 'admin', 0);
        CreateLinkOnTop('s', 'moderowane/zgloszenia', 'zgłoszenia');
        CreateLinkOnTop('s', 'Nauka');
        CreateLinkOnTop('g', 'Nauka', 'g/Nauka');
        CreateLinkOnTop('u', 'scyth');
    }, 100); // strims usuwa nam własne linki bez timeouta
    $('#top_bar_wrapper ul li:not(.group):not(.seperator)').slice(3).remove();
    function CreateLinkOnTop(type, url, title, position, onHover, onClick) {
        var selected = '';
        if (typeof position === 'undefined') {
            position = -1;
        }
        if (type === 'e') {
            if (typeof title === 'undefined') {
                alert('Linki zewnętrzne muszą mieć podaną nazwę!');
                return;
            }
        }
        else {
            title = title || url;
            url = '/'+type + '/'+url;
            selected = document.URL.match(url) ? 'selected' : '';
        }
        var ret = $('<li class="ginden_pasek" />').append(
            $('<a />').attr('href', url).addClass(selected).text(title)
        );
        if (position >= 0) {
            if (position === 0) {
                $('#top_bar_wrapper ul').prepend(ret);
            }
            else {
                $('#top_bar_wrapper ul li').eq(position-1).after(ret);
            }
        }
        else {
            $('#top_bar_wrapper ul').append(ret);
        }
    }
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