// ==UserScript==
// @name            Tupi40k Comment Fixer
// @description    Исправляет ссылки на странице «Все комментарии». Номерные ссылки осуществляют перемещение по данной странице, а не перемещают на исходную.
// @namespace       Platypus
// @author          Водкотерапевт
// @include         http://*oper.ru/*&page=all*
// ==/UserScript==

function do_platypus_script() {
do_modify_url_it(window.document,'/HTML[1]',/http:\/\/(.*)oper\.ru\/(.*)\/(.*)\.php\?t=(\d+)(.*)#(.*)/g,'http://$1oper.ru/$2/$3.php?t=$4&page=all#$6',true);
};

window.addEventListener("load", function() { do_platypus_script() }, false);
var gplatypusBundle = Components.classes["@mozilla.org/intl/stringbundle;1"].getService(Components.interfaces.nsIStringBundleService);
var mystrings = gplatypusBundle.createBundle("chrome://platypus/locale/platypusCore.properties");
var platypusplatypuscouldntfi1 = mystrings.GetStringFromName("platypusplatypuscouldntfi1");
var platypusthisusuallyhappens = mystrings.GetStringFromName("platypusthisusuallyhappens");

function modify_single_url(doc, match_re, replace_string, node) {
    if (node.href) {
node.href = node.href.replace(match_re, replace_string);
    };
};

function do_modify_url_it(doc, node, match_re, replace_string, global_flag) {
    match_re = new RegExp(match_re);
    if (global_flag) {
var allurls = doc.getElementsByTagName('A');
for(var i = 0, url; url = allurls[i]; i++)
  modify_single_url(doc, match_re, replace_string, url);
    } else {
modify_single_url(doc, match_re, replace_string, node);
    };
};