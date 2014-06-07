// ==UserScript==
// @name	Wykop-stats
// @author	rineo, oparte na skrypcie kasper93 http://userscripts.org/scripts/show/153416
// @description	Skrypt pokazuje ilu użytkowników danej rangi wykopało/zakopało znalezisko.
// @include     http://*wykop.pl/link/*
// @version	1.0
// @run-at	document-body
// ==/UserScript==

function main() {
    $(function () {
        var id = /link\/(\d*)\//.exec(document.location.pathname)[1];
        
        $.getJSON("http://www.wykop.pl/ajax/link/dug/" + id, function (data) {
            var bordo_dug = szukaj(/<a(.*)color-2(.*)<\/a>/g, data.html).length;
            var pomarancza_dug = szukaj(/<a(.*)color-1(.*)<\/a>/g, data.html).length;
            var zielony_dug = szukaj(/<a(.*)color-0(.*)<\/a>/g, data.html).length;
            
            $('p a.showDug').after("<span class=\"color-2\"> " + bordo_dug +"<\/span>/<span class=\"color-1\">"
                                   + pomarancza_dug + "<\/span>/<span class=\"color-0\">" + zielony_dug + "<\/span>" );
        });
        
        $.getJSON("http://www.wykop.pl/ajax/link/buried/" + id, function (data) {
            var bordo_bur = szukaj(/<a(.*)color-2(.*)<\/a>/g, data.html).length;
            var pomarancza_bur = szukaj(/<a(.*)color-1(.*)<\/a>/g, data.html).length;
            var zielony_bur = szukaj(/<a(.*)color-0(.*)<\/a>/g, data.html).length;
            
            $('p a.showBury').after("<span class=\"color-2\"> " + bordo_bur + "<\/span>/<span class=\"color-1\">"
                                    + pomarancza_bur + "<\/span>/<span class=\"color-0\">" + zielony_bur + "<\/span>" );
        });
    });
    
    function szukaj(r, s) {
        var a = [], m;
        while (m = r.exec(s)) {
            a.push(m[1]);
        }
        return a;
    };
};

if (typeof $ == 'undefined') {
    if (typeof unsafeWindow !== 'undefined' && unsafeWindow.jQuery) {
        var $ = unsafeWindow.jQuery;
        main();
    } else {
        addJQuery(main);
    }
} else {
    main();
}

function addJQuery(callback) {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
};