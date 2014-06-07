// ==UserScript==
// @name         Google Docs TOC Navigation Pane
// @author       Rafaël Jafferali
// @version      1.0
// @description  Used in conjunction with the required Google Apps Script, this userscript activates the links in the side bar showing the TOC
// @include      https://docs.google.com/macros/*
// @run-at       document-end
// ==/UserScript==

var CSS_STYLE = "h1 {counter-increment: ch1; counter-reset: ch2}"
	+ "h1:before {content: counter(ch1)'. '; color: blue;}"
	+ "h2 {counter-increment: ch2; counter-reset: ch3;}"
	+ "h2:before {content: counter(ch1)'.'counter(ch2)' '; color: red;}"
	+ "h3 {counter-increment: ch3; counter-reset: ch4;}"
	+ "h3:before {content: counter(ch1)'.'counter(ch2)'.'counter(ch3)' '; color: green;}"
	+ "h4 {counter-increment: ch4; counter-reset: ch5;}"
	+ "h4:before {content: counter(ch4, upper-roman)'. ';}"
	+ "h5 {counter-increment: ch5; counter-reset: ch6;}"
	+ "h5:before {content: counter(ch5, upper-latin)'. ';}"
	+ "h6 {counter-increment: ch6;}"
	+ "h6:before {content: counter(ch6)') ';}"

if (document.querySelector("div#guest") && ( parent.parent.document.body.querySelector("div.script-application-sidebar-title").innerText
                                             == "Table of Content" ) ) {
    GM_addStyle(CSS_STYLE);
    document.querySelector("div#guest").addEventListener("click", function(e){
        if (e.target.tagName == "A") {
            parent.parent.location.href = parent.parent.location.href.split("#")[0] + e.target.querySelector("span").innerText;
        }
    }, false);
}