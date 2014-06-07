// ==UserScript==
// @name           yahoo mail margins
// @namespace      smk
// @include        *.mail.yahoo.com/neo/*
// @run-at         document-end
// ==/UserScript==

function main(){
	GM_addStyle(
		'#main {'+
		'	max-width: 100% !important;'+
		''+
		'#shellcontent {'+
		'	right: 0px !important;'+
		'}'+
		''+
		'#yucs {'+
		'	max-width: 100% !important;'+
		'}'
	);
}

main();
