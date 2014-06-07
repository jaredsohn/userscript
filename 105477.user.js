// ==UserScript==
// @name			Tumblr Sidebar2
// @version			1.2.4
// @description			Your sidebar better and more beautiful in Tumblr.
// @author			FR3AKSTEIN
// @namespace			http://fr3akste.in/
// @include			http://*.tumblr.com/dashboard*
// @include			http://*.tumblr.com/messages*
// @include			http://*.tumblr.com/tagged*
// @include			http://*.tumblr.com/likes*
// ==/UserScript==

/*

(C) 2011-2012 Ronis Nascimento (@fr3akstein)

*/
function getElementsByClass(class_name) {
    var html_tags = new Array();
    var found_tags = new Array();
    
    html_tags = document.getElementsByTagName("*");
    
    for (i=0; i<html_tags.length; i++) {
        if (html_tags[i].className == class_name) {
            found_tags.push(html_tags[i]);
        }
    }
    
    return found_tags;
}

var tumblelogNum = 1;
function nextSibling(node) {
	do {
		node = node.nextSibling;
	} while (node && node.nodeType != 1) ;
	return node
}

function findTumblelog(tumblr, num)
{
	tumblr = tumblr.firstChild;
	do {
		tumblr = nextSibling(tumblr);
		if (num - 1 == 1) tumblr = tumblr.firstChild;
		num--;	
		
	} while (num >= 1);
	return tumblr;
}

function main() {

	var getTumblelog = document.getElementById("user_channels");
	
	if (tumblelogNum > 1) getTumblelog = findTumblelog(getTumblelog, tumblelogNum);
	else getTumblelog = nextSibling(getTumblelog.firstChild.firstChild);
	
	addy = getTumblelog;
	blanko = '' + addy;
	tumblog = blanko.replace("http://www.tumblr.com/blog/", "");

	var settings = '<li><a href="' + addy + '/settings" class="settings" style="display:block;"><div class="hide_overflow">Settings</div></a></li><!-- Customize appearance --><li><a href="/customize/' + tumblog + '" style="background-position: 13px -38px;"><div class="hide_overflow">Customize</div></a></li>';
	
	var container = document.createElement('ul');
	container.setAttribute('class', 'controls_section');
	container.setAttribute('id', 'tumblrsb2');
	container.innerHTML = settings + '<li> <a href="' + addy + '" class="posts"> <div class="hide_overflow">Posts</div> <span class="count"></span> </a> </li> <!-- Followers --> <li class=""> <a href="' + addy + '/followers" class="followers"> <div class="hide_overflow">Followers</div> <span class="count"></span> </a> </li> <!-- Messages --> <li class=""> <a href="' + addy + '/messages" class="messages"> <div class="hide_overflow">Messages</div> <span class="count"></span> </a> </li> <!-- Drafts --> <li class=""> <a href="' + addy + '/drafts" class="drafts"> <div class="hide_overflow">Drafts</div> </a> </li> <!-- Queue --> <li class=""> <a href="' + addy + '/queue" class="queue"> <div class="hide_overflow">Queue</div> <span class="count"></span> </a> </li>';
	
	rc = document.getElementById("right_column");
	rc.insertBefore(container, nextSibling(nextSibling(rc.firstChild)));

	var httpRequest = new XMLHttpRequest();
	 
		httpRequest.open('GET',addy,true);
		httpRequest.setRequestHeader("Method", "GET " + addy + " HTTP/1.1");
		httpRequest.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		httpRequest.send(null);

	 httpRequest.onreadystatechange = function() {
		if(httpRequest.readyState == 4){
			var defaultTumb = httpRequest.responseText;
			var tumbPost = defaultTumb.search("\<!-- Posts --\>");
			var tumbMassEd = defaultTumb.search("\<!-- Mass Post editor --\>");
			defaultTumb = defaultTumb.substring(tumbPost,tumbMassEd);
			defaultTumb = defaultTumb.replace(' class="selected"', '');
			document.getElementById("tumblrsb2").innerHTML = settings + defaultTumb;
		}
	}		
}
main();