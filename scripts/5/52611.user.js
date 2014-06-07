// vnnews.ru
// version 0.7
// 2008-09-13
// home: http://clear.com.ua/projects/firefox/ctrl_enter
// Copyright (c) 2005, Tim Babych
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Ctrl+Enter Submits", and click Uninstall.
//
// --------------------------------------------------------------------
//
// Opera 8 compartible.
//
// To install, download it to some folder and chose this folder in
// Tools > Preferences > Advanced > Content > Javascript Options
// "My Javascript files"
// Restart Opera
//
// To uninstall, remove the file from that folder.
//
// ---------------------------------------------------------------------
//
// ==UserScript==
// @name          vnnews.ru
// @description   Поддержка Ctrl + Enter
// @include        http://vnnews.ru/*
// @include        http://www.vnnews.ru/*
// ==/UserScript==

function zakavych(text) {
    
    // cyrillic quotes
//    quote_replacers = '$1\u00ab$2\u00bb$3'
    //latin quotee
     quote_replacers =  '$1\u201c$2\u201d$3'
    
    replacements = [
    
    // smart quotes
    [/(\s+|^)"([^\"]+?)"(\s+|$|\.|\,|\!|\?)/g, quote_replacers],
    
    [/\({2}([\S\s]+?)\){2}\n?/g, '<table cellspacing=0 cellpadding=2><tr><td width=5 bgcolor="silver">&nbsp;</td><td bgcolor="#eee" width=5>&nbsp;</td><td  bgcolor="#eee">$1</td></tr></table>'],

    // ukrainian apostrophe
    [/([\u0406-\u0491])[\*'`]([\u0406-\u0491])/g, '$1\u2019$2'],
    
    // trademark (TM) and such
    [/\((tm|TM|\u0422\u041C|\u0442\u043C)\)/g, '\u2122'],
    
    // copyright (C) and such
    [/\([cC\u0421\u0441]\)/g, '\u00a9'],
    
    // registered (R) and such
    [/\([rR\u0420\u0440]\)/g, '\u00ae'],
    
    // mdash -- one or two minuses surrounded by spaces
    [/(\s+|^)--?(\s+)/g, '$1\u2014$2'],
    
    // **bold**	
    [/\*{2}([^\*]+?)\*{2}/g, '<b>$1</b>'],
    
    // //italic//
    [/([^\:]|^)\/{2}(.+?[^:])\/{2}/g, '$1<i>$2</i>'],
    
    // --strikeout--
    [/([^\!]|^)-{2}([^-]+?)-{2}/g, '$1<s>$2</s>'],

    // __underlined__
    [/_{2}([^_]+?)_{2}/g, '<u>$1</u>'],
    
    // ndash for number ranges: 1995-2005
    [/(\s)(\d+)-(\d+)(\s)/g, '$1$2\u2013$3$4'],
    
    // ellipsis	
    [/\.\.\./g, '\u2026'],
    
    // extra LFs at the end
    [/\n*$/, '']
    ];

    s = text
    for( i=0; i < replacements.length; i++) {
	s = s.replace(replacements[i][0], replacements[i][1])
    }
    
    return s
}

function trigger_submit_on_ctrl_enter(e) {
    if ((e.keyCode==13) && (e.ctrlKey || e.shiftKey)) {
	p = this.parentNode
	i = 0
	if (this.nodeName == 'TEXTAREA')
	    this.value = zakavych(this.value)

	while (p.nodeName != 'FORM' && i++ < 100) 
	    p = p.parentNode

	if (p.nodeName == 'FORM' && e.ctrlKey) 
	    p.submit()
    }
}

if (document.evaluate) { // Firefox
    allInps = document.evaluate("//textarea[not(@id='instant_comment_textarea')] | //select | //input", document, null, 
				    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < allInps.snapshotLength; i++) {
	t = allInps.snapshotItem(i);
	t.addEventListener("keydown", trigger_submit_on_ctrl_enter, 0);
    }
} else { // Opera 8 does not support XPath
    elemTags = ['textarea', 'select', 'input']
    for(j = 0; j< elemTags.length; j++) {
	inps = document.getElementsByTagName(elemTags[j])
	for (var i = 0; i < inps.length; i++)
	    inps[i].addEventListener("keydown", trigger_submit_on_ctrl_enter, 0);
    }
}

