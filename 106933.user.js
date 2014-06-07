// ==UserScript==
// @name            Jobastion's Time and Post Count Revival Tool
// @include         http://forums.penny-arcade.com/discussion/*
// @include			http://forums.penny-arcade.com/vanilla/discussion/*
// @version			3.0
// ==/UserScript==

function do_platypus_script() {
	do_modify_html_it(window.document,document.evaluate("//span[@class='MItem DateCreated']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/time title="([^"]+)" datetime="([^"]+)">[^<]+<\//,'time title="$1" datetime="$2">$1 - Post 1</',null);
	var itemdate = document.evaluate("//span[@class='MItem DateCreated']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null)
	for (var i = 0; i<itemdate.snapshotLength;i++) {
		var idsnap = itemdate.snapshotItem(i)
		{	
			do_modify_html_it(window.document,idsnap,/name="Item_(\d+)" rel="nofollow"><time title="([^"]+)" datetime="([^"]+)">[^<]+</,'name="Item_$1" rel="nofollow"><time title="$2" datetime="$3">$2 - Post deleteme$1<',null);
			
			do_modify_html_it(window.document,idsnap,/deleteme(\d+)/,function(){return RegExp.$1-(-1)},null);}

}}; // Ends do_platypus_script
//
//  Mon Dec 19 15:59:37 2005 -- Scott R. Turner
//  Short, uncommented file containing all* the code to implement Platypus
//  actions.  Can be "included" into the Platypus script.
//
//  *Jobastion has removed most of the code to implement Platypus actions, and left only the bare bones required for this script.  Full code can be found by googling Platypus & Firefox & Extension.  Snippy.
// 
function do_modify_html_it(doc, element, match_re, replace_string) {
    match_re = new RegExp(match_re);
    if (element.innerHTML) {
element.innerHTML = element.innerHTML.replace(match_re, replace_string);
    };
};
do_platypus_script()
//.user.js