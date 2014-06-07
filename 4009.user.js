// 
// Tile: Look-up Words History
// Category: Education
// 
// version 0.1 BETA!
// 2006-05-02
// Copyright (c) 2006, keiciao
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.6.4 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Look-up Words History", and click Uninstall.
//
// --------------------------------------------------------------------
///
// ==UserScript==
// @name          Look-up Words History (Small Type)
// @namespace     http://blog.goo.ne.jp/keiciao/
// @description   Look-up Words History (Small Type)
// @include       http://*.alc.co.jp/*
// ==/UserScript==

// constantt
var LWH_Storage_History = 'LWH_Storage_History';
var LWH_Storage_MAXSIZE = 20;

// create area for words
function LWH_Create_Area(words){
    // find keywords for new links
    var hidden_word_in2 = document.evaluate('//input[@type="hidden" and @name="word_in2"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    var hidden_word_in3 = document.evaluate('//input[@type="hidden" and @name="word_in3"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

    // if not a XPathResult, exit
    if (hidden_word_in2.snapshotLength < 1||
	hidden_word_in3.snapshotLength < 1)
	return;

    // crate table
    var words_table = document.createElement('table');
    words_table.cellspacing = 0;
    words_table.cellpadding = 0;
    words_table.border = 0;

    // find sibling
    var sibling;
    if(document.baseURI == 'http://www.alc.co.jp/index.html'){
	words_table.width = 550;
	sibling = document.evaluate('//div/table[3]/tbody/tr/td/table[3]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
    }else{
	words_table.width = 750;
	sibling = document.evaluate('//div/table[5]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
    }

    // crate tbody
    var words_tbody = document.createElement('tbody');

    // crate tr
    var words_tr = document.createElement('tr');

    // create title
    var title_label = document.createElement('label');
    title_label.innerHTML = 'RECENT WORDS';
    var title_td = document.createElement('td');
    title_td.width = 91;
    title_td.noWrap = true;
    title_td.appendChild(title_label);
    // append title
    words_tr.appendChild(title_td);

    // for all words
    var td_offsetWidth = title_td.width;
    for (var i in words) {
	// create cells
	var words_td = document.createElement('td');
	words_td.noWrap = true;
	var words_a = document.createElement('a');
	words_a.href = 'http://www2.alc.co.jp/ejr/index.php?' +
	    'word_in=' + words[i] +
	    '&word_in2=' + hidden_word_in2.snapshotItem(0).value +
	    '&word_in3=' + hidden_word_in3.snapshotItem(0).value;
	words_a.innerHTML = (parseInt(i)+1) + '. ' + words[i];

	// append words
	words_td.appendChild(words_a);
	// estimate width (depends on font & its size)
	td_offsetWidth = parseInt(td_offsetWidth)+(words_a.innerHTML.length*5);
	// if over loaded, cut off (just break this loop)
	if (td_offsetWidth > words_table.width)
	    break;
	// append td
	words_tr.appendChild(words_td);
    }

    // append elements
    words_tbody.appendChild(words_tr);
    words_table.appendChild(words_tbody);
    // append table
    sibling.parentNode.insertBefore(words_table,sibling);
}

// Show History
function LWH_Show_History(){
    // is storage?
    if ( !GM_getValue(LWH_Storage_History) ) {
	LWH_Create_Area('');
    }
    else {
	// remind words
	var words = GM_getValue(LWH_Storage_History).split(';', LWH_Storage_MAXSIZE);
	// if no words, return
	if ( words.length < 1) {
	    LWH_Create_Area('');
	}
	else {
	    // create area for words
	    LWH_Create_Area(words);
	}
    }
}

function LWH_Storage_Append(word){
    // if storage is empty, just append it then return.
    if( !GM_getValue(LWH_Storage_History) ){
	GM_setValue(LWH_Storage_History, word);
	return;
    }

    // get words
    var words = GM_getValue(LWH_Storage_History).split(';', LWH_Storage_MAXSIZE);
    // delete same word
    for(var i in words){
	if( words[i] == word ){
	    var buf_array = words.slice(0,i);
	    if( words[parseInt(i)+1] ){
		buf_array = buf_array.concat(words.slice(parseInt(i)+1,words.length));
	    }
	    words = buf_array;
	    delete buf_array;
	    break;
	}
    }

    // if it is full, put away the last
    if( words.length > LWH_Storage_MAXSIZE-1 )
	words.pop();

    // append word into words as a head
    words.unshift(word);

    // store db
    GM_setValue(LWH_Storage_History,words.join(';'));
}

function LWH_Char_Check(word){
    var res;
    for (var i=word.length-1; i>=0; i--) {
	res = word.charCodeAt(i);
	// check ascii code (http://www.december.com/html/spec/ascii.html)
	if( res < 32 ) return false;
	if( res > 126 ) return false;
    }
    delete res;
    return true;
}

(function(){
    // get results for look-up
    var results = document.evaluate('//span[@class="ejr_e"]',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);

    // get the input for look-up word
    var input = document.evaluate('//input[@name="word_in" and @accesskey="e"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

    // if not a XPathResult, exit
    if (input.snapshotLength != 1) return;

    // if only English, append it
    if ( results.snapshotLength > 0 &&
	 results.snapshotItem(0).textContent > 0 &&
	 input.snapshotItem(0).defaultValue.length > 0 &&
	 LWH_Char_Check(input.snapshotItem(0).defaultValue) )
	// append storage
	LWH_Storage_Append(input.snapshotItem(0).defaultValue.toLowerCase());

    // destructor
    delete results;
    delete input;

    // show words
    LWH_Show_History();
    
})();
