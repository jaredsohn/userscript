// ==UserScript==
// @name        bordo
// @namespace   bordo
// @description Przycisk bordo
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
		"background-image:url('http://img.nopaste.pl/upload/b2_513e64a0b79db.png') !important;\n"+
		"background-repeat:no-repeat;background-position: 2px 0px !important;"+
            "transition: all 1s; -moz-transition: all 1s;}\n"+
            
		"#achtung:hover a{background-color: transparent;\n"+
            "background-image:url('http://img.nopaste.pl/upload/b2_513e64a0b79db.png')!important; \n"+
		"background-repeat:no-repeat!important}";
            document.body.appendChild(styl);
        var belka = $('nav.main');
        var button_div = $('<div />').attr('class', 'quickpoint fright rel')
            .attr('id', 'achtung');
        var link =  $('<a />')
            .attr('title', 'Bordo')
            .attr('class', 'tip fright cfff tdnone quickicon tcenter')
            .attr('href', 'http://www.wykop.pl/mikroblog/kanal/bordo/')
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