// ==UserScript==
// @name           Bypass wait(depositfiles.com)
// @namespace      depositfiles
// @author         DatheR
// @description    Bypasses 60 second timer on depositfiles for downloads by free users.  Tested and working with Fx 3.5.1-3.5.5 and Fx 3.6b4
// @include        http://depositfiles.com/*/files/*
// @include        http://depositfiles.com/files/*
// ==/UserScript==
document.onload = subloadmod();

function subloadmod() {
var sauce = document.body.innerHTML
if (sauce.search(/http\:\/\/fileshare\d*\.depositfiles\.com\/[^\"]*/i) == -1) {
var free_dl = document.forms;
free_dl[1].elements[1].form.submit();
}
if (sauce.search(/http\:\/\/fileshare\d*\.depositfiles\.com\/[^\"]*/i) != -1) {
var dlsauce = sauce.match(/http\:\/\/fileshare\d*\.depositfiles\.com\/[^\"]*/i);
//do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/(http:\/\/fileshare\d+\.depositfiles\.com\/auth.*?guest\/[^\/]+\/.*\..{3})(">[^>]+?>)/,'$1$2<iframe src="$1"></iframe>',null);
window.open(dlsauce);
};
}

window.onsubmit = do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/(http:\/\/fileshare\d+\.depositfiles\.com\/auth.*?guest\/[^\/]+\/.*\..{3})(">[^>]+?>)/,'$1$2<iframe src="$1"></iframe>',null);

function do_modify_html_it(doc, element, match_re, replace_string) {
    match_re = new RegExp(match_re);
    if (element.innerHTML) {
element.innerHTML = element.innerHTML.replace(match_re, replace_string);
    };
};

