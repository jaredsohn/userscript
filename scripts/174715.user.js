// ==UserScript==
// @name        Yorkbbs AD post remover
// @description Remove unwanted Yorkbbs post advertisment (NOT YORKBBS AD, JUST USER POSTED AD, right now the AMEX post by unknow person)
// @namespace   http://www.yorkbbs.ca/
// @include     http://forum.yorkbbs.ca/*
// @version     1
// @run-at      document-end
// @grant       none
// @updateURL       https://userscripts.org/scripts/source/174715.meta.js
// @downloadURL     https://userscripts.org/scripts/source/174715.user.js
// ==/UserScript==


var maPTMain = function () {

    var alertText = "<i><font color='grey'>[AD Removed]</font></i>";

    var SearchAdText = function (txt) {
        jQuery.expr[':'].Contains = function (a, i, m) {
            return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
        };
        jQuery.expr[':'].contains = function (a, i, m) {
            return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
        };
        var objFound = $('.defaultcontent>.forumarticle:Contains("' + txt + '")');
        if (objFound.length > 0) {
            objFound.html(alertText);
            return true;
        }
        return false;
    }


    SearchAdText("americanexpress.com");

};


// code injection...

var inject = document.createElement("script");

inject.setAttribute("type", "text/javascript");
inject.appendChild(document.createTextNode("(" + maPTMain + ")()"));

var jqr = document.createElement("script");
jqr.setAttribute("type", "text/javascript");
jqr.setAttribute("src", "http://code.jquery.com/jquery-1.8.3.min.js");
document.body.appendChild(jqr);

document.body.appendChild(inject);