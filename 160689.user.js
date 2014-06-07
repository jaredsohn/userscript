// ==UserScript==
// @name        Achtung for Wykop
// @namespace   achtung
// @description Przycisk do Achtunga, wykonano na podstawie dodatku Dutcha.
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
        styl.textContent = "#achtung a {\n"+
		"background-image:url('http://i.imgur.com/KQs04FA.png') !important;\n"+
		"background-repeat:no-repeat;background-position: 2px 0px !important;"+
            "transition: all 1s; -moz-transition: all 1s;}\n"+
            
		"#achtung:hover a{background-color: transparent;\n"+
            "background-image:url('http://i.imgur.com/A9Ggh9S.png')!important; \n"+
		"background-repeat:no-repeat!important}";
            document.body.appendChild(styl);
        var belka = $('nav.main');
        var button_div = $('<div />').attr('class', 'quickpoint fright rel')
            .attr('id', 'achtung');
        var link =  $('<a />')
            .attr('title', 'Achtung')
            .attr('class', 'tip fright cfff tdnone quickicon tcenter')
            .attr('href', 'http://curvefever.com/play2.php')
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