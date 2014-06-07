// ==UserScript==
// @name        FL Discussions Followed Sidebar
// @namespace   Cromagnon
// @description Imports the latest "Followed Discussions" list onto the Group Activity feed page
// @include     *fetlife.com/home/*
// @version     1.0.0202
// ==/UserScript==



// Global Variables

var FrameQueue = [];




// Insert CSS for custom elements.
//
function addGlobalStyle(css) {
    var head, style;

    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle(   '     .np {padding: 0 !important;}'
                + '\r\n ul.discussions_following {border-top: 1px solid #272727; list-style: none outside none; margin: 5px 0 0;}'
                + '\r\n ul.discussions_following li {border-bottom: 1px solid #272727; line-height: 1.25;}'
                + '\r\n ul.discussions_following li a {display: block; padding: 8px 5px; text-decoration: none;}'
                + '\r\n ul.discussions_following li a .title {display: block; overflow: hidden; white-space: nowrap;}'
                + '\r\n ul.discussions_following li a .last_comment {display: block;}'
                + '\r\n ul.discussions_following .pagination {float: right;}'
                + '\r\n ul.discussions_following .pagination a {display: inline; padding: 0 1px; color: inherit;}'
                + '\r\n ul.discussions_following .pagination a:hover {text-decoration: underline;}'
		+ '\r\n .bottom {margin-bottom: 3px; padding-bottom: 0;}'
		+ '\r\n .empty_new {border-bottom: 4px solid #333333; border-radius: 10px 10px 10px 10px; border-top: 4px solid #333333; margin-top: 20px; padding: 18px;}'
              );




// define my own "last()" function for NodeLists
//
//   returns the last node in the node list (or null if the list is empty)
//
function lastNode(nodeList) {

    if (nodeList.length == 0) return null;
    
    return nodeList[ nodeList.length - 1 ];
};



// define my own "previousElement()" function for Element Nodes
//
//   returns the previous sibling of the same *type* as the given node
//
function previousElement(element) {

    var prev_element = element.previousSibling;
    
    while ((prev_element != null) && (prev_element.nodeType != element.nodeType))
    
        prev_element = prev_element.previousSibling;
    
    return prev_element;
};



// Load the next iFrame from the FrameQueue
//
function loadNextFrame() {

    var place_holder = FrameQueue.pop();
    var callback = FrameQueue.pop();
    
    if ((place_holder == null) || (callback == null)) return;
    
    var iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = place_holder.getAttribute("load_href");
    iframe.addEventListener("load", callback, false);
    
    place_holder.parentNode.insertBefore(iframe, place_holder);
    place_holder.parentNode.removeChild(place_holder);

};



// Reformat the given followed discussion
//
function pointDiscussionToLast(e) {

    e.preventDefault();

    var iframe = e.target;
    
    var link = iframe.parentNode.getElementsByTagName("a")[0];
    
    var responses = iframe.contentDocument.querySelector("header h1 span.count");
    
    if ((responses != null) && (responses.style.display != "none")) {
    
        var last_response = iframe.parentNode.querySelector("span.last_comment");
	
	var timestamp = last_response.querySelector("span.refresh-timestamp");
	last_response.removeChild(timestamp);

        responses = responses.innerHTML.match(/of .+\)/)[0];

        responses = responses.substr(3, responses.length - 4) + " comments <span class='pagination'> </span>";
	responses += "<br> last by " + last_response.innerHTML.match(/by .+/)[0].substr(3) + " ";

        last_response.innerHTML = responses;
	
	last_response.appendChild(timestamp);
    	
    };
    
    var pagination = iframe.contentDocument.querySelector("div.pagination");
    
    if (pagination != null) {
    
        var last_page = lastNode(pagination.getElementsByTagName("a"));
	
	last_page = previousElement(last_page);
	
	link.href = last_page.getAttribute("href");
	
        link.removeAttribute("title");
	
	last_page = link.href.match(/page=\d+#/)[0];
	
	var pages = Number(last_page.substr(5, last_page.length - 6));
	
	pagination = iframe.parentNode.querySelector("span.pagination");
	
	pagination.innerHTML = "pages: ";
	
	for(var i = 1; i <= pages; i++) {
	
	    if ((i == 4) && (pages > 6)) {
	    
	        pagination.innerHTML += " ... ";
		i = pages - 2;
	    };
	    
	    var page_link = link.cloneNode(true);
	    page_link.innerHTML = i.toString();
	    
	    page_link.href = page_link.getAttribute("href").replace(last_page,"page=" + i + "#");
	    
	    pagination.appendChild(page_link);
	};
	
    } else {
    
        link.href = link.getAttribute("href") + "#group_post_comments_container";
	
	link.removeAttribute("title");
    };
    
    iframe.parentNode.removeChild(iframe);
    
    loadNextFrame();
    
};



// Reformat the given followed discussion
//
function reformatDiscussionFollowed(discussion) {

    var href = discussion.getElementsByTagName("a")[0].getAttribute("href");
    
    var group = discussion.getElementsByTagName("span")[0];
    
    var link = document.createElement("a");
    link.className = "small q np un";
    link.href = href.match(/\/groups\/\d+/)[0];
    link.innerHTML = group.innerHTML;
    
    group.innerHTML = "";
    group.appendChild(link);
    
    var span = document.createElement("span");
    span.style.display = "none";
    discussion.appendChild(span);
    span.setAttribute("load_href", href);
    
    FrameQueue.unshift(span);
    FrameQueue.unshift(pointDiscussionToLast);

};



// Copy the list of followed discussions from the loaded page
//
function displayDiscussionsFollowing(e) {

    e.preventDefault();
    
    var iframe = e.target;
    
    var discussions = iframe.contentDocument.querySelector("ul.discussions_following");
    
    if (discussions == null) {
    
        discussions = iframe.contentDocument.querySelector("div.empty_new");
	
        if (discussions == null) return alert("Discussions Followed Not Found!");
	
	discussions.className += " discussions_following";
    };
    
    var elements = discussions.querySelectorAll(".quiet");
    
    for(var i = 0; i < elements.length; i++)
    
        elements[i].className = elements[i].className.replace("quiet", "q");
    
    elements = discussions.querySelectorAll(".smaller");
    
    for(var i = 0; i < elements.length; i++)
    
        elements[i].className = elements[i].className.replace("smaller", "xs");
	
    iframe.parentNode.insertBefore(discussions, iframe);
    
    iframe.parentNode.removeChild(iframe);
    
    var busy = discussions.parentNode.querySelector("div.ac.mtxxl");
    
    busy.setAttribute("style", "display: none;");

    elements = discussions.getElementsByTagName("li");
    
    for(var i = 0; i < elements.length; i++)
    
        reformatDiscussionFollowed(elements[i]);
	
    loadNextFrame();
    
};



// Load the list of followed discussions
//
function loadDiscussionsFollowing() {

    var old_list = document.querySelector(".discussions_following");
    
    if (old_list != null) old_list.parentNode.removeChild(old_list);
    
    var busy = document.querySelector("#group_sidebar div.ac.mtxxl");
    
    busy.removeAttribute("style");
    
    var iframe = document.createElement("iframe");
    iframe.setAttribute("style", "display: none");
    busy.parentNode.insertBefore(iframe, busy);
    iframe.addEventListener("load", displayDiscussionsFollowing, false);
    iframe.contentDocument.location = "/groups";
    
};



// Increase the overall width of the main feed area by the given number of pixels
//
function increaseWidthBy(n) {

    var new_container_width = 950 + n;

    // has another userscript already increased the container size?
    
    var styles = document.getElementsByTagName("style");
    
    for (var i = 0; i < styles.length; i++)
    
        if (styles[i].innerHTML.match(/\.container\s*{\s*width:\s*\d+px[;}]/)) break;
	
    if (i != styles.length) {
    
        var style_text = styles[i].innerHTML;
	
	var width = style_text.match(/\.container\s*{\s*width:\s*/)[0];
	
	width = style_text.indexOf(width) + width.length;
	
	style_text = style_text.substr(width);
	
	width = style_text.match(/\d+/)[0];
	
	new_container_width = Number(width) + n;
    };

    addGlobalStyle( ".container {width: " + new_container_width + "px;}"
                  + ".container.double-wide {width: " + (660 + new_container_width) + "px;}" );
    
};



// Create our group_sidebar element
//
function createGroupSidebar() {

    var aside = document.getElementsByTagName("aside")[0];
    
    if (aside == null) return alert("aside not found!");
    
    aside.setAttribute("data-bind", "visible: subfeed() != 'group'");
    
    var discussions = document.createElement("div");
    discussions.id = "group_sidebar";
    discussions.className = "span-8 last";
    discussions.setAttribute("data-bind", "visible: subfeed() == 'group'");
    
    var group_list = aside.querySelector("form.group");
    discussions.appendChild(group_list.parentNode.cloneNode(true));
    
    aside.parentNode.insertBefore(discussions, aside);
    
    var title = document.createElement("h1");
    title.className = "h3 bottom mtxl";
    title.innerHTML = "Discussions Following";
    title.setAttribute("style", "color: #AA0000;");
    
    discussions.appendChild(title);
    
    var busy = document.createElement("div");
    busy.className = "ac mtxxl";
    busy.innerHTML = "<img alt='Circle_big' src='https://flassets.a.ssl.fastly.net/std/spinners/circle_big.gif?v59bf4a813f649a'>"
                     + "<p class='q'>loading<br>followed discussions</p>";

    discussions.appendChild(busy);
    
};



// Main function
//
function init() {

    var container = document.getElementById("activity_feed_container");
    
    if (container == null) return;
    
    increaseWidthBy(120);
    
    createGroupSidebar();

    var href = document.location.href;
    
    if (href.indexOf("#group") != -1) loadDiscussionsFollowing();
    
    var links = document.getElementsByTagName("a");
    
    for (var i = 0; i < links.length; i++)
    
        if (links[i].getAttribute("href") == "#group") break;
	
    if (i == links.length) return alert("Group Activity Link Not Found!");
    
    links[i].addEventListener("click", loadDiscussionsFollowing, false);
    
};



// Call our main function.
//

init();

//end