// ==UserScript==
// @name        nafryka
// @namespace   nafryka
// @description Przycisk do nafryki
// @include     http://*.wykop.pl/*
// @version     0.9
// ==/UserScript==

if (typeof $ == 'undefined') {
	if (unsafeWindow.jQuery) {
		var $ = unsafeWindow.jQuery;
		main();
	} else {addJQuery(main);}
} else {main();}
function main() {
    String.prototype.reverse=function(){return this.split("").reverse().join("");};
    String.prototype.killWhiteSpace = function() {return this.replace(/\s/g, '');};
    function getConf(numer) {return numer.toString(2).reverse();}
    $(function () {
        grupa = 'nafryka'
        if (typeof saved_conf == 'undefined') {saved_conf = 255;}
        konfiguracja = getConf(saved_conf);
        if (konfiguracja[0] == '1') {
            var styl = document.createElement("style");
            styl.textContent = "#nafryka a{background-image:url('http://i.imgur.com/jH6C00c.png') !important;background-repeat:no-repeat;background-position: -2px 0px !important}#nafryka:hover a{background-image:url('http://i.imgur.com/f9a4Uvl.png')!important;background-repeat:no-repeat!important}";
            document.body.appendChild(styl);
            belka = $('nav.main');
            button_div = $('<div />').attr('class', 'quickpoint fright rel').attr('id', 'nafryka');
            link =  $('<a />').attr('class', 'tip fright cfff tdnone quickicon tcenter').attr('href', 'http://www.wykop.pl/mikroblog/kanal/'+grupa+'/');
            belka.append(button_div);
            button_div.append(link);
        }
    });
}
function addJQuery(callback) {var script = document.createElement("script");script.textContent = "(" + callback.toString() + ")();";document.body.appendChild(script);}

