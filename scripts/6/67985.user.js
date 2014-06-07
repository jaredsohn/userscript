/*global window:true,GM_addStyle:true,PRO_addStyle:true,addStyle:true*/
// Shut up!
// version 1.0
// 2009-02-04
// Copyright (c) 2010, Joel Calado, Tiago Rodrigues
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// to enable comments on a website just remove the @include entry below
// ==UserScript==
// @name          Shut up!
// @namespace     http://nscoding.com/projects/shutup
// @description   Remove comments from several websites.
// @include       http://*publico*.pt*
// @include       http://*maisfutebol*.pt*
// @include       http://dn.sapo.pt*
// @include       http://aeiou.expresso.pt*
// @include       http://www.record.xl.pt*
// @include       http://abola.pt*
// @include       http://www.abola.pt*
// @include       http://www.maisfutebol.iol.pt*
// @include       http://www.ionline.pt*
// @include       http://sol.sapo.pt*
// @include       http://aeiou.exameinformatica.pt*
// @include       http://tsf.sapo.pt*
// @include       http://aeiou.visao.pt*
// @include       http://cinema.sapo.pt*
// @include       http://noticias.sapo.pt*
// ==/UserScript==

(function() {
    
var sapo_comments = "div.sapo_widget_sapocomments_comments { display:none !important; }";

// Regex for the various websites
var regex = {
    publico: {
        rule: /publico\.(clix\.)?pt/,
        css: "#extra-content, #ctl00_ContentPlaceHolder1_commentsBox{display:none !important}"
    },
    dn: {
        rule: /dn\.sapo\.pt/,
        css: ".DNCommentsWrap{display:none !important}"
    },
    expresso: {
        rule: /aeiou\.expresso\.pt/,
        css: "td#section_col table:nth-child(4) {display: none !important;}"
    },
    record: {
        rule: /record\.xl\.pt/,
        css: ".apreto10 {display: none !important; }"
    },
    abola: {
        rule: /abola\.pt/,
        css: "#a5h { display: none !important; }"
    },
    sapocinema: {
        rule: /cinema\.sapo\.pt/,
        css: sapo_comments
    },
    saponoticias: {
        rule: /noticias\.sapo\.pt/,
        css: sapo_comments
    },
    maisfutebol: {
        rule: /maisfutebol\.iol\.pt/,
        css: ".comments-box{ display:none !important}"
    },
    ionline: {
        rule: /ionline\.pt/,
        css: ".comments-obj{ display:none !important}"
    },
    sol: {
        rule: /sol\.sapo\.pt/,
        css: ".news-community{display:none !important}"
    },
    exameinformatica: {
        rule: /aeiou.\exameinformatica\.pt/,
        css: ".mtop15 { display: none !important; }"
    },
    tsf: {
        rule: /tsf\.sapo\.pt/,
        css: ".TSFCommentsWrap { display: none !important; }"
    },
    visao: {
        rule: /aeiou\.visao\.pt/,
        css: "td .td_comment2, table .xtrainfo { display: none !important; }"
    }
};

var location = window.location.host;

var css;
for(var reg in regex) {
  if (regex[reg].rule.test(location)) {
      css = regex[reg].css;
  }
}

if (typeof GM_addStyle != "undefined") {
        GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
        PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
        addStyle(css);
} else {
        var heads = document.getElementsByTagName("head");
        if (heads.length > 0) {
                var node = document.createElement("style");
                node.type = "text/css";
                node.appendChild(document.createTextNode(css));
                heads[0].appendChild(node); 
        }
   
}



})();
