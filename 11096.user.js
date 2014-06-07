// ==UserScript==
// @name            Digg w/ Images
// @namespace       Digg w/ Images
// @description   If there is an article on Digg linking to a picture, it will display that picture on the Digg page.
// @include         http://*digg.com/*
// @include         http://www.digg.com/*
//
// Thanks Playtpus.
//
function do_platypus_script() {
do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[4]/DIV[1]/DIV[2]/DIV[1]/DIV[1]/DL[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/<a href="(http:\/\/[^"]+\.(jpg|gif|jpeg|png|tif|tiff|bmp))">([^<]+)<\/a>/,'<img src="$1" alt="greasemonkey" ></a>',null);
do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[4]/DIV[1]/DIV[2]/DIV[1]/DIV[1]/DL[1]/DT[4]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/Source/,'Image',null);
}; // Ends do_platypus_script
window.addEventListener("load", function() { do_platypus_script() }, false);
//
//  Mon Dec 19 15:59:37 2005 -- Scott R. Turner
//  Short, uncommented file containing all the code to implement Platypus
//  actions.  Can be "included" into the Platypus script.
//
//  Has been modified to be shorter; only necessary components.
//
function do_modify_html_it(doc, element, match_re, replace_string) {
    match_re = new RegExp(match_re);
    if (element.innerHTML) {
element.innerHTML = element.innerHTML.replace(match_re, replace_string);
    };
};
function platypus_do(win, func_name, o, other, other2, other3) {
    var func = eval(func_name);
    var doc = null;
    if (func == null) return;
    if (!o) {
Warning("Platypus couldn't find a page element when executing the command "+
func_name+".  This usually happens when running a script -- maybe the"+
" web page the script is running on has changed.");
    };
    doc = win.document;
    func(doc, o, other, other2, other3);
};
//.user.js

