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
// @name	Look-up Words History
// @namespace	http://blog.goo.ne.jp/keiciao/
// @description	Look-up Words History
// @include	http://www*.alc.co.jp/*
// @include	http://www.answers.com/*
// ==/UserScript==

// constantt
var LWH_Storage_History = 'LWH_Storage_History';
var LWH_Storage_MAXSIZE = 50;

// global variable
var LWH_Site_Code;

// global variable for mouse action
var LWH_Area_Flag = true;
var LWH_Area_Pos_X;
var LWH_Area_Pos_Y;
var LWH_Mouse_Flag = false;
// 'top' or' bottom', 'right' or 'left'
var LWH_Area_TR = 0;
var LWH_Area_TL = 1;
var LWH_Area_BR = 2;
var LWH_Area_BL = 3;
var LWH_Area_Pos = LWH_Area_TR;

function LWH_Get_Site_Code() {
    if( document.baseURI.search(/^http:\/\/www[0-9]*.alc.co.jp\//) >= 0 ){
	LWH_Site_Code = 1;
    }
    else if( document.baseURI.search(/^http:\/\/www.answers.com\//) >= 0 ){
	LWH_Site_Code = 2;
    }
    else {
	LWH_Site_Code = 0;
    }
}

function LWH_Find_ExWord(){
    ////////////////////////////////////////////////////////////////
    // This part should be modified.  It depends on a certain DOM //
    ////////////////////////////////////////////////////////////////

    // find keywords for new links
    switch ( LWH_Site_Code ) {
    case 1:
	// only for SPACE ALC (this is used in loop below)
	var hidden_word_in2 = document.evaluate('//input[@type="hidden" and @name="word_in2"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	var hidden_word_in3 = document.evaluate('//input[@type="hidden" and @name="word_in3"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	// if not a XPathResult, exit
	if (hidden_word_in2.snapshotLength < 1||
	    hidden_word_in3.snapshotLength < 1)
	    return '';
	else
	    return '&word_in2=' + hidden_word_in2.snapshotItem(0).value +
		'&word_in3=' + hidden_word_in3.snapshotItem(0).value;
	break;
    case 2:
	// no hidden items
	return '';
	break;
    default:
	// no hidden items
	return '';
	break;
    }
    return '';

    ////////////////////////////////////////////////////////////////
    ////////////////////// End of th part  ////////////////////////
    ////////////////////////////////////////////////////////////////
}

function LWH_Create_Link( words_a, word, ex_word ){
    ////////////////////////////////////////////////////////////////
    // This part should be modified.  It depends on a certain DOM //
    ////////////////////////////////////////////////////////////////

    switch ( LWH_Site_Code ) {
    case 1:
	words_a.href = 'http://www2.alc.co.jp/ejr/index.php?' +
	    'word_in=' + word + ex_word;
	break;
    case 2:
	words_a.href = 'http://www.answers.com/' + word;
	break;
    default:
	words_a.href = document.baseURI;
	break;
    }

    ////////////////////////////////////////////////////////////////
    ////////////////////// End of the part  ////////////////////////
    ////////////////////////////////////////////////////////////////
}


// show and hide area
function LWH_Show_Area( tbody, words ){

    // find ex_word
    var ex_word = '';
    ex_word = LWH_Find_ExWord();

    // for all words
    for (var i in words) {
	// crate tr
	var words_tr = document.createElement('tr');
	// create cells
	var words_td = document.createElement('td');
	words_td.noWrap = true;
	var words_a = document.createElement('a');
	LWH_Create_Link( words_a, words[i], ex_word );
	words_a.innerHTML = (parseInt(i)+1) + '. ' + words[i];

	// append elements
	words_td.appendChild(words_a);
	words_tr.appendChild(words_td);
	tbody.appendChild(words_tr);
    }
}

function LWH_Hide_Area( tbody ){
    while(tbody.rows.length > 1) {
	tbody.deleteRow(1);
    }
}

function LWH_Event_Show_Area( event ){
    // get tbody
    words_tbody = event.target.parentNode.parentNode.parentNode;
    // get words
    var words = LWH_Get_History();
    // show area
    LWH_Show_Area( words_tbody, words );
    // set flag
    LWH_Area_Flag = true;
}

function LWH_Event_Hide_Area( event ){
    // get tbody
    words_tbody = event.target.parentNode.parentNode.parentNode;
    // get words
    var words = LWH_Get_History();
    // show area
    LWH_Hide_Area( words_tbody );
    // set flag
    LWH_Area_Flag = false;
}


// move and fix area
function LWH_Move_Area( div, pos_x, pos_y ){
    /*
    with(div.style){
	removeProperty('top'); removeProperty('bottom');
	removeProperty('right'); removeProperty('left');
    }
    */
    switch( LWH_Area_Pos ){
    case LWH_Area_TR:
	with(div.style){
	    position='absolute';
	    pos_y>0	? top=Math.abs(pos_y)	: top=0;
	    pos_x<0	? right=Math.abs(pos_x)	: right=0;
	}
	break;
    case LWH_Area_TL:
	with(div.style){
	    position='absolute';
	    pos_y>0	? top=pos_y	: top=0;
	    pos_x>0	? left=pos_x	: left=0;
	}
	break;
    case LWH_Area_BR:
	with(div.style){
	    position='absolute';
	    pos_y<0	? bottom=-pos_y	: bottom=0;
	    pos_x<0	? right=-pos_x	: right=0;
	}
	break;
    case LWH_Area_BL:
	with(div.style){
	    position='absolute';
	    pos_y<0	? bottom=-pos_y	: bottom=0;
	    pos_x>0	? left=pos_x	: left=0;
	}
	break;
    default:
	alert('error position');
	break;
    }
}

function LWH_Fix_Area( div ){
    with(div.style){
	removeProperty('top'); removeProperty('bottom');
	removeProperty('right'); removeProperty('left');
    }
    switch( LWH_Area_Pos ){
    case LWH_Area_TR:
	with(div.style){ position='absolute'; top=0; right=0; }
	break;
    case LWH_Area_TL:
	with(div.style){ position='absolute'; top=0; left=0; }
	break;
    case LWH_Area_BR:
	with(div.style){ position='absolute'; bottom=0; right=0; }
	break;
    case LWH_Area_BL:
	with(div.style){ position='absolute'; bottom=0; left=0; }
	break;
    default:
	alert('error position');
	break;
    }
}

function LWH_Event_Set_Area( event ){
    LWH_Area_Pos_X = event.clientX;
    LWH_Area_Pos_Y = event.clientY;

    // set flag
    LWH_Mouse_Flag = true;
    // add move and up event
    document.addEventListener('mousemove', LWH_Event_Move_Area, true);
    document.addEventListener('mouseup', LWH_Event_Fix_Area, true);
}

function LWH_Event_Move_Area( event ){
    if( LWH_Mouse_Flag == false) return;
    var div = document.getElementById('h_div');
    //switch(LWH_Area_Pos)
    var pos_x = event.clientX - LWH_Area_Pos_X;
    var pos_y = event.clientY - LWH_Area_Pos_Y;
    LWH_Move_Area(div, pos_x, pos_y);
}

function LWH_Event_Fix_Area( event ){
    var div = document.getElementById('h_div');
    if( window.innerWidth/2 > event.clientX )
	if( window.innerHeight/2 > event.clientY )
	    LWH_Area_Pos = LWH_Area_TL;
	else
	    LWH_Area_Pos = LWH_Area_BL;
    else
	if( window.innerHeight/2 > event.clientY )
	    LWH_Area_Pos = LWH_Area_TR;
	else
	    LWH_Area_Pos = LWH_Area_BR;
    LWH_Fix_Area(div);

    // remove move and up event
    document.removeEventListener('mousemove',LWH_Event_Move_Area, true);
    document.removeEventListener('mouseup',LWH_Event_Fix_Area, true);
    document.body.removeEventListener('mouseup', LWH_Event_Move_Area, true);
    // reset flag
    LWH_Mouse_Flag = false;
}

// create area for words
function LWH_Create_Title(){

    // crate table
    var words_table = document.createElement('table');
    words_table.cellspacing = 0;
    words_table.cellpadding = 0;
    words_table.border = 0;
    words_table.align = 'left';

    // crate tbody
    var words_tbody = document.createElement('tbody');

    // create title
    var title_label = document.createElement('label');
    title_label.innerHTML = 'RECENT WORDS';

    // roll up event
    title_label.addEventListener('dblclick',function(event){
	if(LWH_Area_Flag == true)
	    LWH_Event_Hide_Area(event);
	else
	    LWH_Event_Show_Area(event);
    }, true);
    
    // down event (currently for ALC only)
    switch ( LWH_Site_Code ) {
    case 1:
	title_label.addEventListener('mousedown',LWH_Event_Set_Area,true);
	break;
    case 2:
    default:
    }

    // append cell
    var title_td = document.createElement('td');
    title_td.noWrap = true;
    // append row
    var title_tr = document.createElement('tr');
    // append title in cell and row
    title_td.appendChild(title_label);
    title_tr.appendChild(title_td);
    words_tbody.appendChild(title_tr);

    // append elements
    words_table.appendChild(words_tbody);

    // crate div
    var words_div = document.createElement('div');
    words_div.id = 'h_div';
    words_div.align = 'left';
    words_div.appendChild(words_table);
    with(words_div.style){
	background='#ffffff';
	position='absolute';
	top=0;
	right=0;
	opacity=0.75;
    }

    // append top div
    document.body.appendChild(words_div);

    return words_tbody;
}

// Get History
function LWH_Get_History(){
    // is storage?
    if ( !GM_getValue(LWH_Storage_History) ) {
	return '';
    }
    else {
	// remind words
	var words = GM_getValue(LWH_Storage_History).split(';', LWH_Storage_MAXSIZE);
	// if no words, just show title
	if ( words.length < 1) {
	    return '';
	}
	else {
	    // create area for words
	    return words;
	}
    }
}

function LWH_Append_History(word){
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
    // get this site code (set global variable)
    LWH_Get_Site_Code();

    // results for look-up
    var is_result = false;
    // the input for look-up word
    var input;

    ////////////////////////////////////////////////////////////////
    // This part should be modified.  It depends on a certain DOM //
    ////////////////////////////////////////////////////////////////

    // local variable
    var results;
    switch ( LWH_Site_Code ) {
    case 1:
	// get results for look-up
	results = document.evaluate('//span[@class="ejr_e"]',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	if ( results && results.snapshotLength > 0 &&
	     results.snapshotItem(0).textContent > 0 )
	    is_result = true;
	// get the input for look-up word
	input = document.evaluate('//input[@name="word_in" and @accesskey="e"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	break;
    case 2:
	// get results for look-up (find the phrase "Did You Mean;")
	results = document.evaluate('//span[@class="dym-prefix"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	if ( !results || results.snapshotLength < 1 ||
	     results.snapshotItem(0).innerHTML.search(/^Did You Mean: $/)<0 )
	    is_result = true;
	// get the input for look-up word
	input = document.evaluate('//input[@id="s" and @name="s"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	break;
    default:
	break;
    }

    // destructor
    delete results;

    ////////////////////////////////////////////////////////////////
    ////////////////////// End of the part  ////////////////////////
    ////////////////////////////////////////////////////////////////

    // if not a XPathResult, exit
    if ( !input || input.snapshotLength != 1 ) return;

    // if only English, append it
    if ( is_result && 
	 input.snapshotItem(0).defaultValue.length > 0 &&
	 LWH_Char_Check(input.snapshotItem(0).defaultValue) )
	// append storage
	LWH_Append_History(input.snapshotItem(0).defaultValue.toLowerCase());

    // destructor
    delete input;
    delete is_result;

    // crate table
    var words_table = document.createElement('table');
    words_table.cellspacing = 0;
    words_table.cellpadding = 0;
    words_table.border = 0;
    words_table.align = 'left';

    // create area
    var words_tbody = LWH_Create_Title();
    var words = LWH_Get_History();
    LWH_Show_Area( words_tbody, words );

})();
