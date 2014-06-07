// ==UserScript==
// @name        Piekna Strona Wykopu2
// @namespace   psw
// @description Przycisk Piekna Strona Wykopu, wykonano na podstawie dodatku Dutcha.
// @include     http://*.wykop.pl/*
// @version     1.1
// ==/UserScript==


function main() {
	"use strict";
	String.prototype.reverse=function(){
		return this.split("").reverse().join("");
	};
    String.prototype.killWhiteSpace = function() {return this.replace(/\s/g, '');};
    $(function () {
	
        var styl = document.createElement("style");
        styl.textContent = "#psw a {\n"+
		"background-image:url('http://i.imgur.com/NrPUkXa.png') !important;\n"+
		"background-repeat:no-repeat;background-position: 8px 9px !important;"+
            "transition: all 1s; -moz-transition: all 1s;}\n"+
            
		"#psw:hover a{background-color: transparent;\n"+
            "background-image:url('http://i.imgur.com/NrPUkXa.png')!important; \n"+
		"background-repeat:no-repeat!important}";
            document.body.appendChild(styl);
        var belka = $('nav.main');
        var button_div = $('<div />').attr('class', 'quickpoint fright rel')
            .attr('id', 'psw');
        var link =  $('<a />')
            .attr('title', 'Piękna Strona Wykopu')
            .attr('class', 'tip fright cfff tdnone quickicon tcenter')
            .attr('href', 'http://www.wykop.pl/mikroblog/kanal/piekna-strona-wykopu/')
            .attr('target', '_blank');
        belka.append(button_div);
        button_div.append(link);
    });
}

function addJQuery(callback) {
	"use strict";
	var script = document.createElement("script");
	script.textContent = "(" + callback.toString() + ")();";
	document.body.appendChild(script);
	}

if (typeof $ === 'undefined') {
	if (unsafeWindow.jQuery) {
		var $ = unsafeWindow.jQuery;
		main();
	} else {addJQuery(main);}
} else {main();}