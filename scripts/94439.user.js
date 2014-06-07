// ==UserScript==
// @name           XKCD Forum Link
// @namespace      Nav
// @description    Inserts a link to the thread for the individual comic in the XKCD discussion forum, most of the code from XKCD discussion linker
// @include        http://www.xkcd.com/*
// @include        http://xkcd.com/*
// @exclude        http://www.xkcd.com/archive
// @exclude        http://xkcd.com/archive
// ==/UserScript==


$x=function(x) {
	return document.evaluate(x,document,null,9,null).singleNodeValue
}
// START FORUM LINK
// abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz


myTitleElem = document.getElementsByTagName("h1")[0];

myTitle = myTitleElem.innerHTML;

myTitle2 = myTitle.toLowerCase();
myTitle2 = myTitle2.replace(/ /g,"+");
myTitle2 = myTitle2.replace(/-/g,"+");

my_forum_search_url = "http://echochamber.me/search.php?keywords=" + myTitle2 + "&terms=all&fid[]=7&sf=titleonly"; 

GM_xmlhttpRequest({
    method: 'GET',
    url: my_forum_search_url,
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload: function(responseDetails) {
        process_forum_code(responseDetails.responseText);
    }
});

function process_forum_code(forum_code) {

	done_with_forum_code = false;
	
	for(i=0; i<10; i++) {
		link_start = forum_code.indexOf("<h3>");
		
		if(link_start==-1) {

		}
		else {
			link_start += 4;
			
			link_end = forum_code.indexOf("</h3>");
			
			my_link = forum_code.substring(link_start,link_end);
			
			//--------------------------------------------------------------------------------------------------------------
			// Checking if this really is the correct thread
			//--------------------------------------------------------------------------------------------------------------
			my_link_text = my_link.replace(/<a[^<]*>/,"");
			my_link_text = my_link_text.replace("</a>","");
			my_link_text = my_link_text.replace(/<span[^<]*>/g,"");
			my_link_text = my_link_text.replace(/<\/span>/g,"");
			my_link_text = my_link_text.toLowerCase();
			
			comic_title_search_string = myTitle.toLowerCase() + "&quot;";
			
			correct_thread = false;
			
			if( my_link_text.indexOf(comic_title_search_string) != -1) {
				correct_thread = true;
			}
			
			myregexp = new RegExp(myTitle.toLowerCase() + "$");
			
			if( my_link_text.match(myregexp) != null) {
				correct_thread = true;
			}
			
			if(!correct_thread) {
				//Not the correct thread
				forum_code = forum_code.substr(link_end+5);
				//The variable done_with_forum_code will still be false, so we will continue looping.
			}
			else {
				//The correct thread was found
				url_start = my_link.indexOf('"');
				url_start += 1; 
				
				my_url_string = my_link.substr(url_start);
				
				url_end = my_url_string.indexOf('"');
				url_end -= 1;
				
				my_url_string = my_url_string.substring(0,url_end);
				
				if(my_url_string.charAt(0) == ".") {
					my_url_string = my_url_string.substring(1);
					my_url_string = "http://echochamber.me" + my_url_string;
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
				
				my_forum_link_anchor = document.createElement('li');
				my_forum_link_anchor.innerHTML = "<a href=\"" + my_url_string + "\">Forums</a>";
				my_forum_link_anchor_2 = document.createElement('li');
				my_forum_link_anchor_2.innerHTML = "<a href=\"" + my_url_string + "\">Forums</a>";
				done_with_forum_code = true;
				start = document.getElementsByClassName("menuCont");
				list_1 = start[0].childNodes[1];
				list_2 = start[1].childNodes[1];
				GM_addStyle("#middleContent ul { width: 500px; }")
				list_1.insertBefore(my_forum_link_anchor,list_1.childNodes[6]);
				list_2.insertBefore(my_forum_link_anchor_2,list_2.childNodes[6]);
			}
			//end of "else" (end of the case where the correct thread was found)
			// $x("/html/body/div/div[2]/div/div/div/ul").innerHTML+="<li><a href=\"" + my_url_string + "\">Forums</a></li>";
			// $x("/html/body/div/div[2]/div/div/div[2]/ul").innerHTML+="<li><a href=\"" + my_url_string + "\">Forums</a></li>";
			
		}
		//end of "else" (end of the case where an <h3> tag was found)
		
		if(done_with_forum_code) {
			break;
		}
	}
	//end of "for" loop
	

  	// XKCDDL_div.insertBefore(document.createElement('br'),myAltTextCheckBox);
  	// XKCDDL_div.insertBefore(document.createElement('br'),myAltTextCheckBox);
}
