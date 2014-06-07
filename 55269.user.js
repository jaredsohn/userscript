// ==UserScript==
// @name           XKCD discussion linker
// @namespace      Nav
// @description    Inserts a link to the thread for the individual comic in the XKCD discussion forum.
// @include        http://www.xkcd.com/*
// @include        http://xkcd.com/*
// @exclude        http://www.xkcd.com/archive
// @exclude        http://xkcd.com/archive
// @version        4.0
// ==/UserScript==

//--------------------------------------------------------------------------------------------------------------
// Updated 11-14-2012
// Fixed to work with the new HTML layout of the XKCD website.
//--------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------
// Updated 12-9-2011
// Fixed a bug; title text was being displayed incorrectly.
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
// Updated 4-22-2011
// --Added support for comic titles made up entirely of common words.
// The previous version was not working for the comic "What If"
// and the comic "I Am", because the forum's built-in search engine
// ignores any search query made up entirely of common words.
//
// --Added support for precisely formatted thread titles, which is the
// new protocol in the XKCD forums.
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
// Updated 9-22-2009
// Added support for hyphens in the comic's title. The previous version was 
// not working for the comic "Lincoln-Douglas".
//--------------------------------------------------------------------------------------------------------------


var thread_link_regex = new RegExp("<a[^>]+class=\"topictitle\">[^<]+</a>");
var my_searching_div = null;
myTitleElem = document.getElementById("ctitle");


var myTitle = myTitleElem.innerHTML;
myComicParentDiv = document.getElementById("middleContainer");
	

my_bottom_menu_div = myComicParentDiv.getElementsByTagName('ul')[1];
//--------------------------------------------------------------------------------------------------------------
// Creating and inserting the main XKCDDL box 
//--------------------------------------------------------------------------------------------------------------
XKCDDL_div = document.createElement('div');
XKCDDL_div.style.border = "1px black solid";
XKCDDL_div.style.width = "400px";
XKCDDL_div.style.marginLeft = "auto";
XKCDDL_div.style.marginRight = "auto";
XKCDDL_div.style.padding = "0px 0px 0px 0px";
myComicParentDiv.insertBefore(XKCDDL_div,my_bottom_menu_div);
myComicParentDiv.insertBefore(document.createElement("br"),my_bottom_menu_div);
myTitleSpan = XKCDDL_div.appendChild(document.createElement('div'));
myTitleSpan.style.fontSize = "10px";
myTitleSpan.style.margin = "0px";
myTitleSpan.style.padding = "0px";
myTitleSpan.style.textAlign = "left";
myTitleSpan.innerHTML = "xkcd Discussion Linker<BR>";
//--------------------------------------------------------------------------------------------------------------
// Displaying a message, "Searching...", for searches that take a long time
//--------------------------------------------------------------------------------------------------------------
my_searching_div = document.createElement('div');
my_searching_div.id = "searching_div";
my_searching_div.style.width = "100px";
my_searching_div.style.textAlign = "left";
my_searching_div.style.fontWeight = "bold";
my_searching_div.style.display = "block";
my_searching_div.style.margin = "10px 150px 10px 150px";
my_searching_div.innerHTML = "Searching...";
XKCDDL_div.appendChild(my_searching_div);
ASD_interval = setInterval(animate_searching_div,500);
//--------------------------------------------------------------------------------------------------------------
// Checking the cookie to see if the alt text should be displayed
//--------------------------------------------------------------------------------------------------------------
var showAltTextNow;
if(document.cookie.indexOf("alwaysShowAltText") == -1) {
	//The cookie has not been set
	showAltTextNow = false;
}
else {
	if(document.cookie.indexOf("alwaysShowAltText=true") != -1) {
		showAltTextNow = true;
	}
	else {
		showAltTextNow = false;
	}
}
//--------------------------------------------------------------------------------------------------------------
// Done with checking the cookie
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
// Inserting checkbox -- "Always show alt text"
//--------------------------------------------------------------------------------------------------------------
myAltTextCheckBox = XKCDDL_div.appendChild(document.createElement('input'));
myAltTextCheckBox.type = "checkbox";
myAltTextCheckBox.id = "alt_text_checkbox";
if(showAltTextNow) {
	myAltTextCheckBox.checked = true;
}
myAltTextCheckBox.addEventListener('click', alwaysShowAltText, false);
myAltTextInfoSpan = XKCDDL_div.appendChild(document.createElement('span'));
myAltTextInfoSpan.style.fontFamily = "Arial";
myAltTextInfoSpan.style.fontSize = "12px";
myAltTextInfoSpan.style.fontVariant = "normal";
myAltTextInfoSpan.innerHTML = "Always show alt text";
XKCDDL_div.appendChild(document.createElement('br'));
//--------------------------------------------------------------------------------------------------------------
// Inserting the div that contains the alt text
//--------------------------------------------------------------------------------------------------------------
myAltTextOuterDiv = XKCDDL_div.appendChild(document.createElement('div'));
myAltTextOuterDiv.id = "alt_text_outer_div";
if(showAltTextNow) {
	myAltTextOuterDiv.style.display = "inline";
}
else {
	myAltTextOuterDiv.style.display = "none";
}
myAltTextDiv = myAltTextOuterDiv.appendChild(document.createElement('div'));
myAltTextOuterDiv.appendChild(document.createElement('br'));
myContentDiv = document.getElementById("middleContainer");
myComicImage = myContentDiv.getElementsByTagName("img")[0];
myAltText = myComicImage.title;
myAltTextDiv.style.fontFamily = "Tahoma";
myAltTextDiv.style.fontSize = "14px";
myAltTextDiv.style.fontVariant = "normal";
myAltTextDiv.style.textAlign = "left";
myAltTextDiv.style.backgroundColor = "#FFFFE1";
myAltTextDiv.style.border = "1px black solid";
myAltTextDiv.style.padding = "2px";
myAltTextDiv.style.margin = "0px 4px 0px 4px";
myAltTextDiv.id = "alt_text_div";
myAltTextDiv.innerHTML = myAltText;
//--------------------------------------------------------------------------------------------------------------
//Adjusting the comic's title into a form that can be used in a forum URL
//--------------------------------------------------------------------------------------------------------------
var myTitle = strip_tags(myTitle);
var title_lowercase_with_spaces = myTitle.toLowerCase();
var my_title_url_string = title_lowercase_with_spaces.replace(/\(|\)/g,"");
var my_title_url_string = my_title_url_string.replace(/ /g,"+");
var my_title_url_string = my_title_url_string.replace(/-/g,"+");
var my_title_url_string = my_title_url_string.replace(/\+\++/g,"+");
//--------------------------------------------------------------------------------------------------------------
// Keep only the first three words for searching
//--------------------------------------------------------------------------------------------------------------
wordArray = my_title_url_string.split(/\+/);
wordArray.splice(3,wordArray.length-3);
my_title_url_string = wordArray.join("+");
//--------------------------------------------------------------------------------------------------------------
//Getting the comic's number
//--------------------------------------------------------------------------------------------------------------
start_pos = window.location.href.indexOf("xkcd.com");
comic_number = window.location.href.slice(start_pos+9,-1);
leading_zeroes = 4 - (comic_number.length);
for(i=0; i<leading_zeroes; i++) {
	comic_number = "0" + comic_number;
}
//--------------------------------------------------------------------------------------------------------------
// When examining thread titles, the script will try to find a thread with a 
// precisely formatted title.
// ####: "Comic Name"
// [DIGIT][DIGIT][DIGIT][DIGIT][COLON][SPACE][QUOTATION MARK][COMIC NAME][QUOTATION MARK]
//
// For example:
// 0887: "Future Timeline"
//--------------------------------------------------------------------------------------------------------------
var precise_thread_title = comic_number + ': &quot;' + title_lowercase_with_spaces + '&quot;';
var precise_thread_title_without_quotes = comic_number + ': ' + title_lowercase_with_spaces;
//--------------------------------------------------------------------------------------------------------------
// A string to be used in the forum search URL. For example, the thread title:
// 0887: "Future Timeline"
// becomes the url string:
// 0887+future+timeline
//--------------------------------------------------------------------------------------------------------------
var precise_thread_title_url_string = comic_number + "+" + my_title_url_string;
//--------------------------------------------------------------------------------------------------------------
// Searching for the comic in the forum.
//--------------------------------------------------------------------------------------------------------------
my_forum_search_url = "http://forums.xkcd.com/search.php?keywords=" + precise_thread_title_url_string + "&terms=all&fid[]=7&sf=titleonly&sr=topics";
GM_xmlhttpRequest({
    method: 'GET',
    url: my_forum_search_url,
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml'
    },
    onload: function(responseDetails) {
    	process_forum_search_results(responseDetails.responseText,true);
    }
});
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
function process_forum_search_results(forum_code,is_precise) {
	//--------------------------------------------------------------------------------------------------------------
	// Dealing with the received search results, from a search for a 
	// precisely formatted title. The variable "is_precise" indicates
	// whether or not the search was done with a precisely 
	// formatted thread title.
	//--------------------------------------------------------------------------------------------------------------
	
	found = false;
	done_with_forum_code = false;
	for(i=0; i<10; i++) {
		//--------------------------------------------------------------------------------------------------------------
		// Each execution of this loop checks one of the items in the
		// list of search results.
		//--------------------------------------------------------------------------------------------------------------
		
		thread_link_matches = thread_link_regex.exec(forum_code);
		if(thread_link_matches==null) {
			//--------------------------------------------------------------------------------------------------------------
			// There were no occurrences of 'class="topictitle"' in the results. 
			// Therefore there were no actual links to threads in the search 
			// results.
			//--------------------------------------------------------------------------------------------------------------
			if(is_precise) {
				//--------------------------------------------------------------------------------------------------------------
				// The search was done with a precisely formatted thread title. Search 
				// again, with just the comic title, not precisely formatted.
				//--------------------------------------------------------------------------------------------------------------
				my_forum_search_url = "http://forums.xkcd.com/search.php?keywords=" + my_title_url_string + "&terms=all&fid[]=7&sf=titleonly&sr=topics";
				GM_xmlhttpRequest({
				    method: 'GET',
				    url: my_forum_search_url,
				    headers: {
				        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				        'Accept': 'application/atom+xml,application/xml,text/xml'
				    },
				    onload: function(responseDetails) {
				    	process_forum_search_results(responseDetails.responseText,false);
				    }
				});
			}
			else {
				//--------------------------------------------------------------------------------------------------------------
				// The search has been done with a precisely formatted thread title, AND 
				// it has been done again with just the comic title. There were no results 
				// either time. This probably means that all of the search terms are getting
				// ignored.
				//--------------------------------------------------------------------------------------------------------------
				handle_the_ignoring("",title_lowercase_with_spaces);
			}
			
			return;
			
		}
		else {
			
			my_link = thread_link_matches[0];
			//--------------------------------------------------------------------------------------------------------------
			// Stripping HTML tags to get just the text of the link
			//--------------------------------------------------------------------------------------------------------------
			my_link_text = my_link.replace(/<[^>]*>/g,"");
			my_link_text = my_link_text.toLowerCase();
			correct_thread = false;
			//--------------------------------------------------------------------------------------------------------------
			// Checking for precisely formatted title
			//--------------------------------------------------------------------------------------------------------------
			if( my_link_text==precise_thread_title ) {
				correct_thread = true;
			}
				
			if( my_link_text==precise_thread_title_without_quotes ) {
				correct_thread = true;
			}

			contains_all_search_terms = true; //temporarily assume that this is true
			for(j=0; j<3; j++) {
				if( my_link_text.indexOf(wordArray[j]) == -1 ) {
					contains_all_search_terms = false;
				}
			}
			if(contains_all_search_terms) {
				correct_thread = true;
			}

			if(!correct_thread) {
				//Not the correct thread
				
				match_index = thread_link_matches.index;
				match_length = my_link.length;
				
				forum_code = forum_code.substr(match_index+match_length);
				//The variable done_with_forum_code will still be false, so we will continue looping.
				
			}
			else {	
				//The correct thread was found
				
				found = true;
				
				url_start = my_link.indexOf('"');
				url_start += 1; 
				
				my_url_string = my_link.substr(url_start);
				
				url_end = my_url_string.indexOf('"');
				url_end -= 1;
				
				my_url_string = my_url_string.substring(0,url_end);
								
				disp_link_to_thread(my_url_string,myTitle);
				done_with_forum_code = true;
			}
			//end of "else" (end of the case where the correct thread was found)
			
		}
		//end of "else" (end of the case where a <dt> tag was found)
		if(done_with_forum_code) {
			break;
		}
		
	}
	//end of "for" loop
}
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
// Variables for handling the ignoring
//--------------------------------------------------------------------------------------------------------------
var IXKCDCT_URL = "http://forums.xkcd.com/viewforum.php?f=7";
var done = false;
var forum_start_position = -50;
var last_page_start_position = 10000;
var finished_and_not_found = false;
//--------------------------------------------------------------------------------------------------------------
//End of variables for handling the ignoring
//--------------------------------------------------------------------------------------------------------------
function handle_the_ignoring(forum_code,title_lowercase_with_spaces) {
	//--------------------------------------------------------------------------------------------------------------
	// Dealing with the case in which no results were found. This
	// usually means that the search query was completely made up 
	// of common words, and was ignored. 
	//--------------------------------------------------------------------------------------------------------------
	
	forum_start_position += 50;
	
	if(forum_code == "") {
		//--------------------------------------------------------------------------------------------------------------
		// The first time this function is called, forum_code will be an empty string.
		// The function makes an HTTP request, then calls itself recursively.
		//--------------------------------------------------------------------------------------------------------------
		GM_xmlhttpRequest({
		    method: 'GET',
		    url: IXKCDCT_URL,
		    headers: {
		        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
		        'Accept': 'application/atom+xml,application/xml,text/xml'
		    },
		    onload: function(responseDetails) {
		    	handle_the_ignoring(responseDetails.responseText,title_lowercase_with_spaces);
		    }
		});
		return;
	}
	
	if(forum_code != "") {
		//--------------------------------------------------------------------------------------------------------------
		// Function is NOT being called for the first time. Function
		// is now dealing with the result of the HTTP request.
		//--------------------------------------------------------------------------------------------------------------
		if(last_page_start_position==10000) {
			//--------------------------------------------------------------------------------------------------------------
			// Function is being called for the second time. Function
			// is dealing with the result of the HTTP request for the 
			// first time. Function is determining the start position of
			// the last page of the IXKCDCT forum.
			//--------------------------------------------------------------------------------------------------------------
			last_page_start_position = get_last_page(forum_code);
		}
		//--------------------------------------------------------------------------------------------------------------
		// If this function, check_page_of_forum, finds the correct discussion
		// thread, then it will set the global variable, "done", to true.
		//--------------------------------------------------------------------------------------------------------------
		check_page_of_forum(forum_code,title_lowercase_with_spaces);
		if(!done) {
			
			if(forum_start_position > last_page_start_position) {
				//--------------------------------------------------------------------------------------------------------------
				// All pages of the IXKCDCT forum have been checked.
				//--------------------------------------------------------------------------------------------------------------
				finished_and_not_found = true;
				done = true;
			}
			else {
				full_IXKCDCT_URL = IXKCDCT_URL + "&start=" + forum_start_position;
				GM_xmlhttpRequest({
				    method: 'GET',
				    url: full_IXKCDCT_URL,
				    headers: {
				        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				        'Accept': 'application/atom+xml,application/xml,text/xml'
				    },
				    onload: function(responseDetails) {
				    	handle_the_ignoring(responseDetails.responseText,title_lowercase_with_spaces);
				    }
				});
				return;
			}
			//end of "else"
	
		}
		//end of "if(!done)"
	}
	if(finished_and_not_found) {
		disp_error_msg(my_forum_search_url);
	}
}
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
function check_page_of_forum(forum_code) {
	//--------------------------------------------------------------------------------------------------------------
	// Checking a page of the forum to see if it contains a link to
	// the appropriate comic.
	//--------------------------------------------------------------------------------------------------------------
	for(j=0; j<53; j++) {
		box_start = forum_code.indexOf("<dt");
		if(box_start==-1) {
			break;
		}
		box_end = forum_code.indexOf("</dt>");
		
		box_inner_html = forum_code.substring(box_start,box_end);
		box_inner_html = box_inner_html.replace(/<dt[^>]*>/,"");
		
		if(box_inner_html.toLowerCase().indexOf(title_lowercase_with_spaces) != -1) {
			//--------------------------------------------------------------------------------------------------------------
			// Found the comic title
			//--------------------------------------------------------------------------------------------------------------
			url_start = box_inner_html.indexOf('href="');
			url_start += 6; 
			my_url_string = box_inner_html.substr(url_start);
			url_end = my_url_string.indexOf('"');
			my_url_string = my_url_string.substring(0,url_end);
			disp_link_to_thread(my_url_string,myTitle);
			
			done = true;
			break;
		}
		
		new_start = box_end+5;
		forum_code = forum_code.substr(new_start);
		
	}
	//end of "for" loop
}
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
function get_last_page(forum_code) {
	//--------------------------------------------------------------------------------------------------------------
	// Trying to determine how many pages of threads are in the 
	// IXKCDCT forum.
	//--------------------------------------------------------------------------------------------------------------
	tag_text = '<a href="./viewforum.php?f=7&amp;start=';
	position_of_last_link = forum_code.lastIndexOf(tag_text);
	
	if(position_of_last_link==-1) {
		return 10000;
	}
		
	pos = position_of_last_link + (tag_text.length);
	string1 = forum_code.substr(pos,50);
	end_pos = string1.indexOf('"');
	last_page_start = string1.substr(0,end_pos);
		
	return parseInt(last_page_start);
}
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
function disp_error_msg(my_forum_search_url) {
	//--------------------------------------------------------------------------------------------------------------
	// Error message, if no thread could be found.
	//--------------------------------------------------------------------------------------------------------------
	if(my_searching_div != null) {
		my_searching_div.parentNode.removeChild(my_searching_div);
	}
	
	my_error_message = 'Sorry, there seems to be no discussion thread for the comic "' + myTitle + '".';
	my_forum_link_anchor = document.createElement('a');
	my_forum_link_anchor.style.fontVariant = "normal";
	my_forum_link_anchor.style.fontWeight = "normal";
	
	my_forum_link_anchor.style.color = "blue";
	my_forum_link_anchor.innerHTML = my_error_message;
	my_forum_link_anchor.href = my_forum_search_url;
	
	XKCDDL_div.insertBefore(my_forum_link_anchor,myAltTextCheckBox);
	XKCDDL_div.insertBefore(document.createElement('br'),myAltTextCheckBox);
	XKCDDL_div.insertBefore(document.createElement('br'),myAltTextCheckBox);
}
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
function disp_link_to_thread(my_url_string) {
	//--------------------------------------------------------------------------------------------------------------
	// If a discussion thread was found, this function displays a link to it.
	//--------------------------------------------------------------------------------------------------------------
	if(my_url_string.charAt(0) == ".") {
		my_url_string = my_url_string.substring(1);
		my_url_string = "http://forums.xkcd.com" + my_url_string;
	}
	
	my_hash_position = my_url_string.indexOf("#"); 
	if(my_hash_position != -1) {
		my_url_string = my_url_string.substring(0,my_hash_position);
	}
	
	if(my_url_string.indexOf("&amp;") != -1) {
		my_url_string = my_url_string.replace(/&amp;/g,"&");
	}
	
	my_hilit_position = my_url_string.indexOf("&hilit="); 
	if(my_hilit_position != -1) {
		my_url_string = my_url_string.substring(0,my_hilit_position);
	}
	my_forum_link_anchor = document.createElement('a');
	
	my_forum_link_anchor.id = "forum_link_anchor";
	my_forum_link_anchor.href = my_url_string;
	my_forum_link_anchor.style.backgroundColor = "#6E7B91";
	my_forum_link_anchor.style.border = "1px solid black";
	my_forum_link_anchor.style.color = "#FFFFFF";
	my_forum_link_anchor.style.display = "inline";
	my_forum_link_anchor.style.textDecoration = "none";
	my_forum_link_anchor.style.padding = "0px 4px 0px 4px";
	my_forum_link_anchor.innerHTML = '"' + myTitle + '" discussion';
	my_forum_link_anchor.addEventListener('mouseover', highlightLink, false);
	my_forum_link_anchor.addEventListener('mouseout', unhighlightLink, false);
	my_forum_link_anchor.addEventListener('click', unhighlightLink, false);
	
	my_forum_link_div = document.createElement('div');
	my_forum_link_div.style.margin = "10px 0px 10px 0px";
	
	my_forum_link_div.appendChild(my_forum_link_anchor);
	XKCDDL_div.insertBefore(my_forum_link_div,myAltTextCheckBox);
	
	if(my_searching_div != null) {
		my_searching_div.parentNode.removeChild(my_searching_div);
	}
}
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
function strip_tags(str) {
	//--------------------------------------------------------------------------------------------------------------
	// Removing all HTML tags from a string
	//--------------------------------------------------------------------------------------------------------------
	return str.replace(/<[^>]+>/g,"");
}
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
function animate_searching_div() {
	//--------------------------------------------------------------------------------------------------------------
	// Animates the message that says "Searching..."
	//--------------------------------------------------------------------------------------------------------------
	if(my_searching_div == null) {
		clearInterval(ASD_interval);
		return;
	}
	
	if(my_searching_div != null) {
		text1 = my_searching_div.innerHTML;
		
		if(text1.length == 17) {
			my_searching_div.innerHTML = "Searching...";
		}
		else {
			my_searching_div.innerHTML += ".";
		}
		
	}
}
//--------------------------------------------------------------------------------------------------------------
//Code to make the discussion link behave like the other links on the 
//xkcd website.  
//--------------------------------------------------------------------------------------------------------------
var mouse_is_over = false;
function highlightLink() {
	if(!mouse_is_over) {
		mouse_is_over = true;
	
		my_forum_link_anchor = document.getElementById("forum_link_anchor");
		my_forum_link_anchor.style.backgroundColor = "#FFFFFF";
		my_forum_link_anchor.style.color = "#6E7B91";
	}
}
function unhighlightLink() {
	mouse_is_over = false;
	my_forum_link_anchor = document.getElementById("forum_link_anchor");
	my_forum_link_anchor.style.backgroundColor = "#6E7B91"; 
	my_forum_link_anchor.style.color = "#FFFFFF";
}
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
function alwaysShowAltText() {
	//--------------------------------------------------------------------------------------------------------------
	// Setting a cookie to indicate that this particular user wants the alt text to 
	// always be shown.
	//--------------------------------------------------------------------------------------------------------------
	var date = new Date();
	date.setTime(date.getTime()+(365*24*60*60*1000));
	myCookieString = '';
	if( document.getElementById("alt_text_checkbox").checked) {
		myCookieString = 'alwaysShowAltText=true; ';
		document.getElementById("alt_text_outer_div").style.display = "inline";
	}
	else {
		myCookieString = 'alwaysShowAltText=false; ';
		document.getElementById("alt_text_outer_div").style.display = "none";
	}
	myCookieString += 'expires=' + date.toGMTString() + '; path=/';
	document.cookie = myCookieString; 
}
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
