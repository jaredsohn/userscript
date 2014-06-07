// ==UserScript==
// @name           bbc comment responder
// @namespace      thelatemrb
// @description    automatically add reference to a comment replied to on bbc blogs. Adds a respond link in each post which, when clicked adds a link to the post being replied to at the start of a new comment. If any text is selected before clicking respond, that text will be quoted in the comment box after the backlink. 2011 update to handle structural changes on BBC blog site. 
// @include        http://www.bbc.co.uk/blogs/*
// ==/UserScript==

function setup_respond_links(){
    
    // setup - get all the comments for the page
    thecomments = document.evaluate('//ul[@class="collections forumthreadposts"]/li', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    /*
     For each of the comments, make a new text link which heads to the comment box.
     Add a click event listener so that when clicked, the function to add a referring link to the
     comment box is called before going there.
     Add the link to each comment.
     */

    for (var i=0; i<thecomments.snapshotLength; i++){
	var post = thecomments.snapshotItem(i);
	var n = document.createElement('a');
	n.appendChild(document.createTextNode('Respond!'));
	n.setAttribute('href', '#dna-commentbox-text');
	n.addEventListener("click", prepComment, false);
	post.appendChild(n);
	var b = document.createElement('br');
	post.appendChild(b);
	var m = document.createElement('a');
	m.appendChild(document.createTextNode('Newsnet Scotland'));
	m.setAttribute('href', 'http://www.newsnetscotland.com');
	post.appendChild(m);
    }
}

function add_click_handlers(){
    thepagerefs = document.evaluate('//ul[@class="comments_pagination_ul"]/li', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    for (var ii=0; ii<thepagerefs.snapshotLength; ii++){
	var nav_elem = thepagerefs.snapshotItem(ii);
	var link = nav_elem.getElementsByTagName("a")[0];
	if(undefined != link){
	    link.addEventListener("click",paged, false);
	}
    }
}

function paged(){
    //add_click_handlers();
    setup_respond_links();
}

function prepComment(event){

    link = event.target;
    //get the comment from which 'respond' was clicked.
    post = link.parentNode;
 
    //get the user name and comment number
    comment_postnum_elem = post.getElementsByTagName("h4")[0];
    comment_postnum_string = comment_postnum_elem.innerHTML;
    comment_postnum_string_trimmed = comment_postnum_string.substring(comment_postnum_string.lastIndexOf(">")+1,comment_postnum_string.lastIndexOf("."));
    comment_postnum = parseInt(comment_postnum_string_trimmed)
    comment_user_info = post.getElementsByTagName("cite")[0];
    comment_time = comment_user_info.getElementsByTagName("a")[0];
    comment_link = comment_time.href;
    comment_user_vcard = comment_user_info.getElementsByTagName("span")[0];
    comment_user_link = comment_user_vcard.getElementsByTagName("a")[0];
    comment_username = comment_user_link.innerHTML;
    
    
    /*if responding to your own comment, username is 'you'.
     we need to get the user's actual username from the page
     and substitute it in that case.
     */
    if(comment_username == "you"){
	user_states = document.evaluate('//div[@class="dna-commentbox-logged-in dna-logged-in-fragment"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	user_state = user_states.snapshotItem(0);
	user_profile_link = user_state.getElementsByTagName("a")[0];
	username = user_profile_link.innerHTML;
    }
    comment_start = '<a href=\"' +comment_link +'\">@' +comment_postnum_string_trimmed +' ' +comment_username +'</a>'; 
    
    //get any currently selected text (need toString as it returns a selection object i think)
    selected_text = window.getSelection().toString();
    
    //if we have any selected text, wrap it in quotes and italics the append it
    if (selected_text.length > 0){
	comment_start = comment_start + "\n" + "\"<em>" + selected_text +'</em>\"';
    }
    
    //get the comment submission element, and add the referring link and any selected text to it
    cbox = document.getElementById("dna-commentbox-text");
    cbox.focus();
    cbox.value = comment_start;
}

add_click_handlers();
setup_respond_links();


