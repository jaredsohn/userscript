// ==UserScript==
// @name           improve-fkr
// @namespace      http://just.another.namespace.in.the.world/
// @description    Some interface improvements on forum.kuban.ru
// @include        http://www.kuban.ru/cgi-bin/forum/*
// @include        http://forum.kuban.ru/*
// ==/UserScript==
// Version 20070512


// replace select-like subcategory menu with normal one
// see http://www.kuban.ru/cgi-bin/forum/forum5.cgi for example
var submenu = 1; 

// Insert answer links and accent citates with italic font
var insert_answer_link = 1; 
// separator between answers in one post 
var answers_separator = '-\n'; 
// default answer mode
// 0 [-]  - do not insert quote
// 1 [>]  - insert only first level quote
// 2 [>>] - insert all quotes
var default_answer_mode = 1; 



// === Code ==
function log(s) {
    //    GM_log(s);
}

if (submenu) {
    // Get all elements <select name="view">
    var allViewSelects = 
	document.evaluate(
			  '//select[@name="view"]',
			  document,
			  null,
			  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			  null);
    
    // If there are them
    if (allViewSelects.snapshotLength > 0 ) {	

	// get first and create menu HTML
	var options = allViewSelects.snapshotItem(0).options;
	var menu = " :: ";
	for ( var i = 0; i < options.length; i ++ ) {
	    var item = options[i];
	    if (i == options.selectedIndex) {
		menu = menu + "<b>" + item.text + "</b> :: ";
	    } else {		
		link = '?view=' + item.value;
		menu = menu + 
		    "<a href=\"" + link + "\">" + 
		    item.text + "</a> :: ";
	    }
	}
	/* log ("Menu: " + menu); */
	
	//replace all forms with created menu
	for ( i = 0 ; i < allViewSelects.snapshotLength; i++ ) { 
	    var form = allViewSelects.snapshotItem(i).parentNode;
	    var new_div = document.createElement('div');
	    new_div.className = "menu";
	    new_div.innerHTML = menu;
	    form.parentNode.replaceChild(new_div, form);
	}
    }

}



if (insert_answer_link) {
    var answer_modes = [ '-', '>', '>>', '-' ];


    // is_port (post)
    // fucntion checks is this tr is post in the forum
    function is_post (tr) {
	
	// check does it have 2 TDs as childs
	if (   tr.childNodes.length != 2 
	       || tr.childNodes[0].nodeName.toUpperCase() != 'TD' 
	       || tr.childNodes[1].nodeName.toUpperCase() != 'TD' ) {
	    return false;
	}
	
	// check does it have 3 or more childs and first are 'B', 'BR', 'FONT'
	var col1 = tr.childNodes[0];
	if ( col1.childNodes.length < 4 
	     || col1.childNodes[1].nodeName.toUpperCase() != 'B'
	     || col1.childNodes[2].nodeName.toUpperCase() != 'BR'
	     || col1.childNodes[3].nodeName.toUpperCase() != 'FONT' ) {
	    return false;
	}
	
	return true;
    }
    
    // get_author (post)
    // gets author of the post
    function get_author (tr) {
	var col1 = tr.childNodes[0];
	return col1.childNodes[1].textContent;
    }
    
    // get_author (post)
    // gets number of the post
    function get_num (tr) {
	var col1 = tr.childNodes[0];
	parts =  col1.childNodes[3].textContent.split('-');
	if (parts.length < 3) { return '0';}
	return parts[0].replace(/\s+$/g, '');	
    }
    
    // get_body (post)
    // gets array of body elements of the post
    function get_body (tr) {
	var col2 = tr.childNodes[1];
	var body = col2.getElementsByTagName('font')[0].childNodes;
	// if it has one child <b> then it is first post
	// and we should get childs of B
	if (body[0].nodeName.toUpperCase() == 'B') {
	    body = body[0].childNodes;
	}
	return body;
    }    

    // get_answer_mode (post)
    // gets answer mode from the post
    function get_answer_mode (tr) {
	var col1 = tr.childNodes[0];
	links = col1.getElementsByTagName('A');
	for (var i = 0; i < links.length ; i ++ ) {
	    if ( links[i].className == 'mode' ) {
		return get_answer_mode_from_text (links[i].textContent);
	    }
	}
	return default_answer_mode;
    }
    
    // get_answer_mode_from_text (string)
    // trims [ and ] from text and returns answer_mode
    function get_answer_mode_from_text (s) {
	var str = s.replace(/^\[|\]$/g, '');
	for (var i = 0; i < answer_modes.length ; i ++ )
	    if ( str == answer_modes[i] )
		return i;
	throw 'wrong text passed to get_answer_mode_from_text: ' + s;
    }
  
    // add_anwer_link (elem)
    // adds answer and answermode links to the post
    function add_answer_link (tr) {
	var col1 = tr.childNodes[0];
	var br = document.createElement('BR');
	var modeLink = document.createElement('A');
	var link = document.createElement('A');
	modeLink.href = link.href = 'javascript:void(0)';
	modeLink.style.fontSize = link.style.fontSize = 'small';
	link.innerHTML = '[answer]';
	link.addEventListener('click', answer_to_post, false);
	modeLink.innerHTML = '[' + answer_modes[default_answer_mode] + ']';
	modeLink.className = 'mode';
	modeLink.addEventListener('click', change_answer_mode, false);;
	col1.appendChild(br);
	col1.appendChild(modeLink);
	col1.appendChild(document.createTextNode(' '));
	col1.appendChild(link);
    }

    // accent_citates (post)
    // accents citates in the post by italic font
    function accent_citates (post) {
	body = get_body (post);
	
	for (var i = 0; i < body.length; i ++) {
	    var elem = body[i];
	    if (elem.nodeName.toUpperCase() != '#TEXT') { continue }
	    
	    var data = elem.data;
	    if (data.match ('^>')) {
		var span = document.createElement('span');
		span.style.fontStyle = 'italic';
		span.innerHTML = data;
		elem.parentNode.replaceChild(span, elem);
	    }
	}	
    }

    // find_answer_textarea ()
    // returns textarea with name = 'message';
    function find_answer_textarea () {
	res = document.evaluate(
				'//textarea[@name="message"]',
				document,
				null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				null);
	return res.snapshotItem(0);	
    }
    

    // answer_to_post (event)
    // event listener which adds num, author and
    // citated body to answer form's textarea
    function answer_to_post (event) {
	var link = event.currentTarget;
	var post = link.parentNode.parentNode;
	
	textarea = find_answer_textarea ();
	
	author = get_author (post);
	num = get_num (post);
	body = get_body (post);
	mode = get_answer_mode (post);

	log ('answer:' 
	     + '\n author: ' + author
	     + '\n num: ' + num
	     + '\n mode: ' + mode
	     + '\n body: ' + body.length + ' ' + body[0].textContent); 
	     
	
	if (textarea.value != '') { 
	    textarea.value += '\n' + answers_separator;
	}
	textarea.value += "to " + num + ", " + author + ":\n";
	if (mode >= 1) {
	    for (var i = 0; i < body.length	; i ++ ) {
		var elem = body[i];
		if (elem.nodeName.toUpperCase() == '#TEXT') {
		    var data = elem.data;
		    if (data.match ('^\nto.*:$') && mode < 2) { continue }
		    
		    textarea.value += '> ' + data.replace(/\n/g, '') + '\n';
		}
		if (elem.nodeName.toUpperCase() == 'SPAN' && mode >= 2) {
		    var data = elem.textContent;
		    textarea.value += '>' + data;
		}
	    }
	}
	textarea.focus();
    }

    // change_answer_mode (event)
    // Event listener wich switchs modes on modeLink
    function change_answer_mode (event) {
	var modeLink = event.currentTarget;
	mode = get_answer_mode_from_text (modeLink.textContent.replace(/^\[|\]$/g, ''));
	modeLink.innerHTML = '[' + answer_modes[mode + 1] + ']';
    }

    var allPosts = 
	document.evaluate(
			  '//html/body/center/table/tbody/tr',
			  document,
			  null,
			  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			  null);

    
    for (i = 0; i < allPosts.snapshotLength; i ++) {
	var post = allPosts.snapshotItem(i);
	if (is_post (post)) {
	    add_answer_link (post);	    
	    accent_citates (post);
	}
    }    
}
