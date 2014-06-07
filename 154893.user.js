// ==UserScript==
// @name        FetLife Latest Activity v4 Organizer
// @namespace   Cromagnon
// @description Organizes FetLife's home page Latest Activity Feed into a collapsible tree of entries grouped by user.
// @include     *fetlife.com/*
// @exclude     push*.fetlife.com/*
// @version     4.1.0202
//
// === GM_ API ===
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_deleteValue
// ==/UserScript==



// Global Variables

var DisplayingGroupFeed = false;
var ScreenFeed = false;
var Known_Story_Types = [];
var Gag_List, Alpha_List, Omega_List, Friend_List, Screen_List, Injected_List;



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

addGlobalStyle(   '     #feed_organizer table.mbl {margin-bottom: 0 !important;}'
                + '\r\n .double-wide #alpha_feeds { width: 650px; float: left; margin-right: 5px; }'
                + '\r\n .double-wide #delta_feeds { width: 650px; float: left; margin-right: 5px; }'
                + '\r\n .double-wide #omega_feeds { width: 650px; float: right; margin-right: 5px; }'
                + '\r\n #invert_filter {float: right; margin-right: 35px;}'
                + '\r\n #alpha_feeds {margin-bottom: 10px;}'
                + '\r\n #omega_feeds {margin-top: 10px;}'
                + '\r\n a.feed_title {color: #AAAAAA; font-size: 95%; font-weight: bold; text-decoration: none;}'
                + '\r\n span.counter {color: #AA0000; font-weight: bold; padding: 5px;}'
		+ '\r\n .mini_feed_header {background-color: #272727;}'
		+ '\r\n .mini_feed_header td {padding: 0;}'
		+ '\r\n .mini_feed_header td.story {vertical-align: middle; padding-left: 3px;}'
		+ '\r\n .mini_feed_header .avatar.s35 {margin: 5px 0 0 3px;}'
		+ '\r\n .updated .mini_feed_header {background-color: #570057 !important;}'
		+ '\r\n .updated tr.new {background-color: #570057 !important;}'
		+ '\r\n .pdv ul {text-align: right; width: auto;}'
		+ '\r\n table.gagged a, table.gagged span {color: #777777;}'
		+ '\r\n .af td.options {width: 24px;}'
		+ '\r\n .screened {display: none; background-color: #003737;}'
		+ '\r\n .screened tr.mini_feed_header {background-color: #002727;}'
		+ '\r\n #FLAV4O_Options {margin-top: 20px; margin-left: -20px;}'
		+ '\r\n #FLAV4O_Options a {text-decoration: none;}'
 		+ '\r\n #FLAV4O_Options a.active {font-weight: bold; margin: 5px;}'
 		+ '\r\n #hli_timestamp {display: none;}'
 		+ '\r\n #stale_activity_link {display: none;}'
              );




// define my own "intersect" function for Arrays
//
//   returns a new array whose elements consist only of those in both "this" and the passed target array
//
Array.prototype.intersect=function(array) {

    var intersection = [];
    
    for (var i = 0; i < this.length; i++)
    
        if (array.indexOf(this[i]) != -1)
	
	    intersection.push(this[i]);
    
    return intersection;
};



// define my own "not_in" function for Arrays
//
//   returns a new array whose elements consist only of those in "this" but NOT in the passed target array
//
Array.prototype.not_in=function(array) {

    var not_intersection = [];
    
    for (var i = 0; i < this.length; i++)
    
        if (array.indexOf(this[i]) == -1)
	
	    not_intersection.push(this[i]);
    
    return not_intersection;
};



// define my own "nextElement()" function for Element Nodes
//
//   returns the next sibling of the same *type* as the given node
//
function nextElement(element) {

    var next_element = element.nextSibling;
    
    while ((next_element != null) && (next_element.nodeType != element.nodeType))
    
        next_element = next_element.nextSibling;
    
    return next_element;
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



// define my own "last()" function for NodeLists
//
//   returns the last node in the node list (or null if the list is empty)
//
function lastNode(nodeList) {

    if (nodeList.length == 0) return null;
    
    return nodeList[ nodeList.length - 1 ];
};



// define my own "toArray()" function for NodeLists
//
//   returns an Array containing all the nodes in the given node list
//
function nodeListAsArray(nodeList) {

    var array = [];

    for (var i = 0; i < nodeList.length; i++)
    
        array.push(nodeList[i]);
    
    return array;
};



// answer whether the specified class is included in
//   the given className (string) OR the given node's .className
//
function hasClass(classNameOrNode, className) {

    var classes = classNameOrNode;
    
    if ((typeof classes) != (typeof "")) classes = classes.className;
    
    classes = classes.split(" ");
    
    return (classes.indexOf(className) != -1);
};



// add the specified class to the given className (string)
//   OR add the class to the given node's .className
//
//      returns either the new className (string)
//      or the original node with the new .className
//
function addClass(classNameOrNode, newClassName) {

    var className = classNameOrNode;
    
    if ((typeof className) != (typeof "")) className = className.className;
    
    if (className != null) {

        var classes = className.split(" ");
        
        var j = classes.indexOf(newClassName);
        
        if (j == -1) {
	
	    className += " " + newClassName;

            if ((typeof classNameOrNode) == (typeof "")) classNameOrNode = className;

              else classNameOrNode.className = className;
	};
    };

    return classNameOrNode;
};



// remove a specified class from the given className (string)
//   OR remove the class from the given node's .className
//
//      returns either the new className (string)
//      or the original node with the new .className
//
function removeClass(classNameOrNode, removeName) {

    var className = classNameOrNode;
    
    if ((typeof className) != (typeof "")) className = className.className;
    
    if (className != null) {

        var classes = className.split(" ");
        
        var j = classes.indexOf(removeName);
        
        if (j != -1) {
        
            classes.splice(j,1);
        
            className = classes[0];
        
            for (var i = 1; i < classes.length; i++)

                className += " " + classes[i];

            if (className == null)  className = "";

            if ((typeof classNameOrNode) == (typeof "")) classNameOrNode = className;

              else classNameOrNode.className = className;
	};
    };

    return classNameOrNode;
};



// Find the first story *older* than the given Date object
//
function indexOfStoryOlderThan(stories, date) {

    for(var i = 0; i < stories.length; i++)
    
        if (date > storyTime(stories[i])) break;
    
    return (i == stories.length) ? -1 : i;
};



// return a new Date object representing the given story's time element's datetime stamp
//
function storyTime(story) {

    var story_time = story.getElementsByTagName("time")[0];
    
    if (story_time != null) story_time = story_time.getAttribute("datetime");
    
    if (story_time != null) story_time = new Date(story_time);
    
    return story_time;
};



// return the user id for the currently logged in user
//
function getMyUID() {

    var nav_menu = document.querySelector("ul#nav_dropdown");
    
    if (nav_menu == null) return null;
    
    var links = document.getElementsByTagName("a");
    
    for(var i = 0; i < links.length; i++)
    
        if (links[i].innerHTML.indexOf("View Your Profile") != -1) break;
    
    if (i == links.length) return null;
    
    var uid = links[i].href.match(/\/users\/\d+/);
    
    if ((uid == null) || (uid.length == 0)) return null;
    
    uid = uid[0].substr(7);
    
    return uid;
};



// Thanks to the new wide-screen view, it's possible we'll
// need to "screen" whole feed categories (alpha, delta, omega)
// because they're empty but using screen space
//
function checkScreenFeeds() {

    var alpha_feeds = document.getElementById("alpha_feeds");
    
    var total_mini_feeds = alpha_feeds.querySelectorAll("tr.mini_feed_header").length;
    
    total_mini_feeds -= alpha_feeds.querySelectorAll("table.screened").length;
    
    //are we hiding or showing gagged users?
    
    if (document.getElementById("activity_feed_mutings").innerHTML == "show gagged") {
    
        total_mini_feeds -= alpha_feeds.querySelectorAll("table.gagged").length;
    
        total_mini_feeds += alpha_feeds.querySelectorAll("table.screened.gagged").length;
    };
    
    if (total_mini_feeds > 0) removeClass(alpha_feeds, "screened");
    
      else if (total_mini_feeds == 0) addClass(alpha_feeds, "screened");
      
      else alert("Unexpected Error: Negative Number of Alpha Stories Shown");
    
};



// Invert the selections for screening
//
function invertFilter(e) {

    var hot_list_injected = [ "injected", "not_injected" ];

    e.preventDefault();

    Screen_List = Known_Story_Types.not_in(Screen_List).not_in(hot_list_injected).concat(Screen_List.intersect(hot_list_injected));
    
    var form = document.getElementById("customize");
    
    if (form == null) return alert("Filter Form Not Found!");

    var checks = form.querySelectorAll("input.story_type");
    
    for(var i = 0; i < checks.length; i++) {
    
        var checkbox = checks[i];
	
	checkbox.checked = (Screen_List.indexOf(checkbox.id) != -1);

    };

    setTimeout(saveUserOptions, 100);
    
    var organizer = document.getElementById("feed_organizer");
    
    var mini_feeds = nodeListAsArray(organizer.getElementsByTagName("table"));
    
    for(i = 0; i < mini_feeds.length; i++) {
    
        var feed = mini_feeds[i];
	
        var stories = feed.getElementsByTagName("tr");
    
        for(var j = 1; j < stories.length; j++) {
	
	    var story = stories[j];
    
            removeClass(story, "screened");
	    
	    if (Screen_List.intersect(story.className.split(" ")).length != 0) addClass(story, "screened");
        };
    
	var count = feed.querySelectorAll("tr.screened");
	count = (count == null) ? 1 : count.length + 1;
	count =	feed.getElementsByTagName("tr").length - count;
	
	var span = feed.getElementsByTagName("span")[0];
	if (span != null) span.innerHTML = " has " + count + (count == 1 ? " entry. " : " entries. ");
	
	if (count != 0) removeClass(feed, "screened");
	
	 else addClass(feed, "screened");
	 
	updateHeaderTime(feed);
    };
    
    checkScreenFeeds();
};



// A previously unknown story type has been encountered
//
function discoveredNewStoryType(story_type) {

    alert("UNKNOWN STORY TYPE: " + story_type
          + "\n\nThis story type has not been encountered before by Cromagnon and thus"
	  + "\nhas not been included in the screen-out menu.  Please let Cromagnon know"
	  + "\nso he can include it in the next release of FLAV4O."
	  + "\n\n                      Thank You  >:-)\n  "
	  );
	  
    Known_Story_Types.push(story_type);

};



// Screen or show the given story type
//
function toggleScreenStoryType(e) {

    var story_type = e.target.id;
    
    if (!e.target.checked) {
    
        var j = Screen_List.indexOf(story_type);
	
	if (j != -1) Screen_List.splice(j,1);
    
    } else Screen_List.push(story_type);
    
    setTimeout(saveUserOptions, 100);
    
    var screen_link = document.getElementById("screen_link");
    
    if (screen_link != null) screen_link.innerHTML = (Screen_List.length == 0) ? "screen out" : "screening out";
    
    if (! ScreenFeed) return;

    var organizer = document.getElementById("feed_organizer");
    
    var stories = organizer.querySelectorAll("tr." + story_type);
    
    if ((stories == null) || (stories.length == 0)) return;
    
    for(var i = 0; i < stories.length; i++) {
    
	if (e.target.checked) {
	
	    addClass(stories[i], "screened");
	    
	} else if (stories[i].className.split(" ").intersect(Screen_List).length == 0)
	 
             removeClass(stories[i], "screened");
    };
    
    var mini_feeds = nodeListAsArray(organizer.getElementsByTagName("table"));
    
    for(i = 0; i < mini_feeds.length; i++) {
    
        var feed = mini_feeds[i];
	
	var count = feed.querySelectorAll("tr.screened");
	count = (count == null) ? 1 : count.length + 1;
	count =	feed.getElementsByTagName("tr").length - count;
	
	var span = feed.getElementsByTagName("span")[0];
	if (span != null) span.innerHTML = " has " + count + (count == 1 ? " entry. " : " entries. ");
	
	if (count != 0) removeClass(feed, "screened");
	
	 else addClass(feed, "screened");
	 
	updateHeaderTime(feed);
    };
    
    checkScreenFeeds();
};



// Toggle between hiding and showing gagged feeds
//
function toggleHideShowGagged(e) {

    e.preventDefault();

    if (e.target.innerHTML == "show gagged") {
    
        var styles = document.getElementsByTagName("style");
	
	for (var i = 0; i < styles.length; i++)
	
	    if (styles[i].innerHTML == "table.gagged {display: none;}") break;
	    
	if (i != styles.length) styles[i].parentNode.removeChild(styles[i]);
	
	e.target.innerHTML = "hide gagged";
	
    } else {
    
        addGlobalStyle("table.gagged {display: none;}");
	
	e.target.innerHTML = "show gagged";
	
    };

    checkScreenFeeds();
};



// Gag or ungag the given uid
//
function toggleGagUID(uid) {

    var mini_feed = document.getElementById("stories-" + uid);
    
    var j = Gag_List.indexOf(uid);

    if (j == -1) {  Gag_List.push(uid);
                    if (mini_feed != null) addClass(mini_feed, "gagged");
          } else {  Gag_List.splice(j,1);
		    if (mini_feed != null) removeClass(mini_feed, "gagged");
	  };
    
    if (mini_feed == null) rebuildProfileOptionsMenu(uid);
    
     else rebuildFeedOptionsMenu(mini_feed);
    
    setTimeout(saveUserOptions, 100);

    checkScreenFeeds();
};



// Bubble or float the given uid
//
function toggleBubbleUID(uid) {

    var mini_feed = document.getElementById("stories-" + uid);
    
    var feed_container = "alpha_feeds";

    var j = Alpha_List.indexOf(uid);
    
    if (j == -1) {
    
        Alpha_List.push(uid);

        j = Omega_List.indexOf(uid);
	
	if (j != -1) Omega_List.splice(j,1);

     } else {
    
        Alpha_List.splice(j,1);
	
        feed_container = "delta_feeds";
    };
     
    setTimeout(saveUserOptions, 100);

    if (mini_feed == null) return rebuildProfileOptionsMenu(uid);
    
    feed_container = document.getElementById(feed_container);

    mini_feed.parentNode.removeChild(mini_feed);

    feed_container.appendChild(mini_feed);
    
    repositionByHeaderTime(mini_feed);
    
    rebuildFeedOptionsMenu(mini_feed);

    checkScreenFeeds();
};



// Sink or float the given uid
//
function toggleSinkUID(uid) {

    var mini_feed = document.getElementById("stories-" + uid);
    
    var feed_container = "omega_feeds";

    var j = Omega_List.indexOf(uid);
    
    if (j == -1) {
    
        Omega_List.push(uid);

        j = Alpha_List.indexOf(uid);
	
	if (j != -1) Alpha_List.splice(j,1);
	
     } else {
     
        Omega_List.splice(j,1);
	
	feed_container = "delta_feeds";
    };
    
    setTimeout(saveUserOptions, 100);

    if (mini_feed == null) return rebuildProfileOptionsMenu(uid);
    
    feed_container = document.getElementById(feed_container);

    mini_feed.parentNode.removeChild(mini_feed);

    feed_container.appendChild(mini_feed);

    repositionByHeaderTime(mini_feed);
    
    rebuildFeedOptionsMenu(mini_feed);

    checkScreenFeeds();
};



// Show / Hide the individual stories in the given mini feed
//
function toggleHideShowMiniFeed(mini_feed) {

    if (mini_feed.target) {  // mini_feed is an event
    
        if ((mini_feed.ctrlKey || mini_feed.shiftKey || mini_feed.altKey)) return;
	
	mini_feed.preventDefault();
	
	mini_feed = mini_feed.target.parentNode;
	
	while(mini_feed.nodeName != "TABLE") mini_feed = mini_feed.parentNode;
    };

    feed_body = mini_feed.getElementsByTagName("tbody")[0];
    if (feed_body == null) return alert("Unexpected Error, Table Body Not Found!");
    
    var feed_avatar = (mini_feed.id[8] == "g") ? mini_feed.querySelector("td.user a") : null;

    if (feed_body.style.display == "none") {
    
        feed_body.removeAttribute("style");
	
	if (feed_avatar != null) feed_avatar.setAttribute("style", "display: none;");
	
     } else {
     
        feed_body.setAttribute("style", "display: none;");

	if (feed_avatar != null) feed_avatar.removeAttribute("style");

    };
};



// Modify the elements in the given story to make them more presentable as an organized list
//
function cleanupGroupStory(story) {

    var options = story.querySelector("td.options");

    if (options != null) options.parentNode.removeChild(options);
    
    var link = story.querySelector("td.story .quiet a");
	
    if (link != null) link.parentNode.removeChild(link);
    
};



// Modify the elements in the given story to make them more presentable as an organized list
//
function cleanupStory(story) {

    var options = story.querySelector("td.options");

    if (options != null) options.parentNode.removeChild(options);
    
    var link = story.querySelector("td.user a");
	
    if (link != null) link.parentNode.removeChild(link);
};



// Rebuild the options menu for the given mini feed header
//
function rebuildFeedOptionsMenu(header) {

    var username = header.querySelector("a.feed_title");

    var uid = username.href;
    
    username = username.innerHTML;
    
    uid = (username.substr(0,7) == "Group: ") ? ("g" + uid.match(/\/groups\/\d+/)[0].substr(8)) : uid.match(/\/users\/\d+/)[0].substr(7);
    
    username = username.replace(/\s/g,"&nbsp;");
    
    var options = header.querySelector("td.options");
    
    if (options == null) return alert("Options Menu Not Found!");

    var menu = options.getElementsByTagName("div")[0];
    
    menu.removeAttribute("data-bind");

    menu = menu.getElementsByTagName("ul")[0];
    
    menu.removeAttribute("data-bind");
    menu.removeAttribute("style");           // this removes the "display: none;" style FL inserts on "self" stories (FL won't let you gag yourself)
    
    menu = menu.getElementsByTagName("ul")[0];
    
    options = menu.getElementsByTagName("li")[0];

    options.parentNode.removeChild(options);
    
    options = document.createElement("li");
    
    var link = document.createElement("a");
    link.innerHTML = (Gag_List.indexOf(uid) == -1) ? ("Hide&nbsp;" + username + "&nbsp;(gag)") : ("Show&nbsp;" + username + "&nbsp;(ungag)");
    link.addEventListener("click", (function (n) { return function (e) { toggleGagUID(n); }; })(uid), false);
    
    options.appendChild(link);
    
    link = document.createElement("a");
    link.innerHTML = (Alpha_List.indexOf(uid) == -1) ? "Bubble&nbsp;to&nbsp;top&nbsp;(alpha)" : "Don't&nbsp;bubble&nbsp;(not&nbsp;alpha)";
    link.addEventListener("click", (function (n) { return function (e) { toggleBubbleUID(n); }; })(uid), false);
    
    options.appendChild(link);
    
    link = document.createElement("a");
    link.innerHTML = (Omega_List.indexOf(uid) == -1) ? ("Sink&nbsp;to&nbsp;bottom&nbsp;(omega)") : ("Don't&nbsp;sink&nbsp;(not&nbsp;omega)");
    link.addEventListener("click", (function (n) { return function (e) { toggleSinkUID(n); }; })(uid), false);
    
    options.appendChild(link);
    
    menu.appendChild(options);

};



// Copy the avatar from the first story into the mini_feed's header
//
function updateGroupHeaderAvatar(mini_feed) {

    var avatars = mini_feed.querySelectorAll("td.user");
    
    var header_av = avatars[0];
    
    var new_av = avatars[1].cloneNode(true);
    
    header_av.parentNode.insertBefore(new_av, header_av);
    
    header_av.parentNode.removeChild(header_av);

};



// Reposition the given mini_feed as dictated by its header time
//
function repositionByHeaderTime(mini_feed) {

    var feed_container = mini_feed.parentNode;
    
    var feeds = feed_container.getElementsByTagName("table");
    
    var i = indexOfStoryOlderThan(feeds, storyTime(mini_feed));
    
    if (i == -1)
    
        feed_container.appendChild(mini_feed);
	
      else feed_container.insertBefore(mini_feed, feeds[i]);

};



// Copy the time field from the first story into the mini_feed's header
//
function updateHeaderTime(mini_feed) {

    var story_times = mini_feed.getElementsByTagName("time");
    
    var header_time = story_times[0];
    
    for(var i = 1; i < story_times.length; i++) {
    
        var story = story_times[i].parentNode;
	
	while(story.nodeName != "TR") story = story.parentNode;
	
	if (! hasClass(story, "screened")) break;
    };
    
    if (i == story_times.length) i = 1;
    
    var new_time = story_times[i].cloneNode(true);
    
    removeClass(new_time, "status");

    header_time.parentNode.insertBefore(new_time, header_time);
    
    header_time.parentNode.removeChild(header_time);
    
    if (mini_feed.id[8] == "g") updateGroupHeaderAvatar(mini_feed);
    
    repositionByHeaderTime(mini_feed);
};



// Build a mini feed header using elements from the given story
//
function buildGroupFeedHeader(base) {

    var header = base.cloneNode(true);
    
    header.className = "mini_feed_header";
    header.removeAttribute("id");
    
    // make sure the options menu displays for basic members
    
    var options = header.querySelector("td.options");
    
    if (options != null) {
   
        var menu = options.getElementsByTagName("div");
	
	menu[0].removeAttribute("style");
	menu[1].setAttribute("style", "display: none;");
    };

    var story = header.querySelector("td.story");
    
    if (story == null) return;
    
    var link = story.querySelector(".brace .quiet a");
    
    if (link == null) { // building group header from multi-post story
    
        var link_list = story.querySelector("li.mbs");
	
	if (link_list == null) return;
	
	link = lastNode(link_list.getElementsByTagName("a"));
	
	link.innerHTML = "Group: " + link.innerHTML;
    };
    
    var gid = link.href.match(/\/groups\/\d+/);
    
    gid = gid[0].substr(8);
    
    var gname = link.innerHTML;
    
    link = document.createElement("a");
    link.innerHTML = gname;
    link.href = "/groups/" + gid;
    link.className = "feed_title";
    
    var time = story.getElementsByTagName("time")[0];
    
    removeClass(time, "status");
    
    var new_story = document.createElement("td");
    new_story.className = "story";
    
    story.parentNode.insertBefore(new_story, story);
    
    time.parentNode.removeChild(time);
    story.parentNode.removeChild(story);
    
    var count = document.createElement("span");
    count.className = "small counter";
    count.innerHTML = " has 0 entries. ";

    var last = document.createElement("span");
    last.className = "xxs q";
    last.innerHTML = " from ";
    
    story = document.createElement("div");
    story.className = "brace";
    story.appendChild(link);
    story.appendChild(count);
    story.appendChild(last);
    story.appendChild(time);
    
    new_story.appendChild(story);
    
    rebuildFeedOptionsMenu(header);
    
    return header;
};



// Build a mini feed header using elements from the given story
//
function buildFeedHeader(base) {

    var header = base.cloneNode(true);
    
    header.className = "mini_feed_header";
    header.removeAttribute("id");
    
    // make sure the options menu displays for basic members
    
    var options = header.querySelector("td.options");
    
    if (options != null) {
   
        var menu = options.getElementsByTagName("div");
	
	menu[0].removeAttribute("style");
	menu[1].setAttribute("style", "display: none;");
    };

    var story = header.querySelector("td.story");
    
    if (story == null) return;
    
    var link = header.getElementsByTagName("a")[0];
    
    var uid = link.href.match(/\/users\/\d+/);
    
    uid = uid[0].substr(7);
    
    var uname = link.getElementsByTagName("img")[0].getAttribute("alt");
    
    link = document.createElement("a");
    link.innerHTML = uname;
    link.href = "/users/" + uid;
    link.className = "feed_title";
    
    var time = story.getElementsByTagName("time")[0];
    
    removeClass(time, "status");
    
    var new_story = document.createElement("td");
    new_story.className = "story";
    
    story.parentNode.insertBefore(new_story, story);
    
    time.parentNode.removeChild(time);
    story.parentNode.removeChild(story);
    
    var count = document.createElement("span");
    count.className = "small counter";
    count.innerHTML = " has 0 entries. ";

    var last = document.createElement("span");
    last.className = "xxs q";
    last.innerHTML = " from ";
    
    story = document.createElement("div");
    story.className = "brace";
    story.appendChild(link);
    story.appendChild(count);
    story.appendChild(last);
    story.appendChild(time);
    
    new_story.appendChild(story);
    
    rebuildFeedOptionsMenu(header);
	
    return header;
};



// Dig into the given story element and find the associate user id
//
function getUserId(story) {

    var link = story.querySelector("td.user a");

    if (link == null) return null;
    
    var uid = link.href.match(/\/users\/\d+/);
    
    if ((uid == null) || (uid.length == 0)) return null;
    
    uid = uid[0].substr(7);
    
    //decide whether this story should be grouped by group-id rather than user-id
    
    if (DisplayingGroupFeed && (story.className == "group_post_created")) {
    
        if ((Friend_List.indexOf(uid) != -1) || (Injected_List.indexOf(uid) != -1)) return uid;
    
        link = story.querySelector(".brace .quiet a");
	
	if (link != null) {
	
	    var gid = link.href.match(/\/groups\/\d+/);
	
	    if ((gid == null) || (gid.length == 0)) return uid;
	
	    gid = "g" + gid[0].substr(8);
	
	    return gid;

	};
	
	// multi-post by a stranger
	
	var links = story.querySelectorAll(".brace ul a");
	
	if ((links == null) || (links.length == 0)) return uid;

	var gid = links[0].href.match(/\/groups\/\d+/);
	
	if ((gid == null) || (gid.length == 0)) return uid;
	
	gid = gid[0].substr(8);
	
	for(var i = 1; i < links.length; ++i)
	
	    if (links[i].href.indexOf("/groups/" + gid) == -1) return uid;
	    
	gid = "g" + gid;
	
	return gid;
    
    } else {
    
        if (hasClass(story, "injected")) return uid;
    
        // this must be a story generated by friend activities,
	// make sure to remember their uid
	
	if (Friend_List.indexOf(uid) == -1) {
	
	    Friend_List.push(uid);
	    
	    setTimeout(saveUserOptions, 100);
	};
    };

    return uid;
};



// Find the mini feed container for the given story
//  or create one if one does not yet exist
//
function getMiniFeed(story) {

    var uid = getUserId(story);

    if (uid == null) return uid;
    
    var mini_feed = document.getElementById("stories-" + uid);
    
    if (mini_feed != null) return mini_feed;
    
    var stories = document.getElementById("stories");
    if (stories == null) return alert("Stories Not Found!"), null;
    
    mini_feed = document.createElement("table");
    mini_feed.id = "stories-" + uid;
    mini_feed.className = stories.className;
    
    var header = document.createElement("thead");

    header.appendChild(uid[0] == "g" ? buildGroupFeedHeader(story) : buildFeedHeader(story));

    mini_feed.appendChild(header);
    
    header.addEventListener('click', toggleHideShowMiniFeed, false);
    
    header = document.createElement("tbody");
    header.setAttribute("style", "display: none;");
    
    mini_feed.appendChild(header);
    
    if (Gag_List.indexOf(uid) != -1)
    
        addClass(mini_feed, "gagged");
	
    var feedlist = (Alpha_List.indexOf(uid) != -1) ? "alpha_feeds" :
                   (Omega_List.indexOf(uid) != -1) ? "omega_feeds" : "delta_feeds";
    
    feedlist = document.getElementById(feedlist);
    
    if (feedlist == null) return null;

    feedlist.appendChild(mini_feed);
    
    repositionByHeaderTime(mini_feed);

    return mini_feed;
};



// Insert the given story in the appropriate position
//  based on it's datetime-stamp and update the header if needed
//
function addStoryToMiniFeed(story, mini_feed) {

    var old_stories = mini_feed.getElementsByTagName("tbody")[0];
    
    old_stories = old_stories.getElementsByTagName("tr");
    
    var story_time = storyTime(story);
    
    var i = indexOfStoryOlderThan(old_stories, story_time);
    
    if (i == -1)
    
        mini_feed.getElementsByTagName("tbody")[0].appendChild(story);
	
      else old_stories[i].parentNode.insertBefore(story, old_stories[i]);
      
    addClass(mini_feed, "updated");

    var count = mini_feed.querySelectorAll("tr.screened");
    count = (count == null) ? 1 : count.length + 1;
    count = mini_feed.getElementsByTagName("tr").length - count;

    var span = mini_feed.getElementsByTagName("span")[0];
    if (span != null) span.innerHTML = " has " + count + (count == 1 ? " entry. " : " entries. ");
    
    if (count == 0) {
    
        addClass(mini_feed, "screened");
	
	checkScreenFeeds();
	
    } else if (hasClass(mini_feed, "screened")) {

        removeClass(mini_feed, "screened");

        updateHeaderTime(mini_feed);
	
	checkScreenFeeds();

    } else if (count == 1) checkScreenFeeds();
    
    if (story_time > storyTime(mini_feed)) {
    
        if (!hasClass(story, "screened") || hasClass(mini_feed, "screened"))
    
            updateHeaderTime(mini_feed);
    };
};



// Find any stories left in the raw activity feed
//  and move them to the organized feeds
//
function organizeStories(raw_feed) {

    if (raw_feed == null) raw_feed = document.getElementById("stories");
    if (raw_feed == null) return alert("Raw Activity Feed Not Found!");

    if (raw_feed.firstChild.nodeName == "TBODY") raw_feed = raw_feed.firstChild;
    
    var stories = raw_feed.getElementsByTagName("tr");
    
    var hli_timestamp = document.getElementById("hli_timestamp");
    
    for(var i = 0; i < stories.length; ) {

	var story = stories[i];
	
	var mini_feed = getMiniFeed(story);

	if (mini_feed == null) {

            i++;    continue;

        };
	
	story.parentNode.removeChild(story);
	
	if (mini_feed.id[8] == "g") cleanupGroupStory(story);
	 else cleanupStory(story);

	var story_type = removeClass(story.className,"injected");

	if (Known_Story_Types.indexOf(story_type) == -1)
	
	    discoveredNewStoryType(story_type);
	 
	if (hasClass(story, "injected")) {
	
	    var uid = mini_feed.id.substr(8);
	    
	    if (Injected_List.indexOf(uid) == -1) {
	    
	        Injected_List.push(uid);
		
		if (Alpha_List.indexOf(uid) == -1) {
		
		    setTimeout((function (n) { return function (e) { toggleBubbleUID(n); }; })(uid), 100);
		    
		};
		
		setTimeout(saveUserOptions, 100);
	    };
	
        } else addClass(story, "not_injected");
	
	if (ScreenFeed && (Screen_List.intersect(story.className.split(" ")).length != 0))

	    addClass(story, "screened");
	    
	addClass(story, "new");
	
	addStoryToMiniFeed(story, mini_feed);
	
	var last_retrieved_time = story.getElementsByTagName("time")[0];

        if (hli_timestamp == null) {
            
            hli_timestamp = document.createElement("tr");
	    hli_timestamp.id = "hli_timestamp";
			
	    hli_timestamp.appendChild(last_retrieved_time.cloneNode(true));
	    removeClass(hli_timestamp, "status");
			
	    raw_feed.appendChild(hli_timestamp);
			
        } else {

            var old_time = hli_timestamp.getElementsByTagName("time")[0];

            old_date = new Date(old_time.getAttribute("datetime"));

	    last_retrieved_date = new Date(last_retrieved_time.getAttribute("datetime"));

            if (old_date > last_retrieved_date) {
	    
                old_time.parentNode.insertBefore(last_retrieved_time.cloneNode(true), old_time);

                old_time.parentNode.removeChild(old_time);
            };
        };
    };
    
    if (document.querySelector("tr.injected") != null) {
    
        var injection_cache = document.getElementById("injection_cache");
	
	var link = document.getElementById("inject_cached_link");
	
	if ((injection_cache != null) && (injection_cache.querySelector("tr.injected") != null))
	
	    removeClass(link, "hide");
	
	  else addClass(link, "hide");
    };
    
    setTimeout(clearUpdateFlags, 1000);
};



// Clear new and updated feed flags
//
function clearUpdateFlags() {

    var feed_organizer = document.getElementById("feed_organizer");
    
    var feeds = feed_organizer.querySelectorAll("table.updated");
    
    for (var i = 0; i < feeds.length; i++) {
    
	var stories = feeds[i].querySelectorAll("tr.new");
	
	for (var j = 0; j < stories.length; j++)
	
	    removeClass(stories[j], "new");
		
	removeClass(feeds[i], "updated");
    };
};



// Clear out the feed organizer of all mini feeds
//
function clearFeedOrganizer() {

    var old_organizer = document.getElementById("feed_organizer");
    if (old_organizer == null) return alert("Old Feed Organizer Not Found!");
    old_organizer.id = "old_feed_organizer";
    
    var organizer = document.createElement("div");
    organizer.id = "feed_organizer";
    
    var alpha_feeds = document.createElement("div");
    alpha_feeds.id = "alpha_feeds";
    alpha_feeds.className = "screened";
    
    organizer.appendChild(alpha_feeds);
    
    var delta_feeds = document.createElement("div");
    delta_feeds.id = "delta_feeds";
    
    organizer.appendChild(delta_feeds);
    
    var omega_feeds = document.createElement("div");
    omega_feeds.id = "omega_feeds";
    
    organizer.appendChild(omega_feeds);
    
    old_organizer.parentNode.insertBefore(organizer, old_organizer);
    old_organizer.parentNode.removeChild(old_organizer);
    
    var href = document.location.href;
    
    DisplayingGroupFeed = (href.indexOf("#group") != -1);
    
    ScreenFeed = (href.indexOf('#') == -1) || (href.indexOf('#everything') != -1);
    
    var hli_timestamp = document.getElementById("hli_timestamp");
    if (hli_timestamp != null) hli_timestamp.parentNode.removeChild(hli_timestamp);

};



// We've hit rock bottom
//
//      manually inject any remaining cached activities
//
function showCachedActivity(e) {

    e.preventDefault();
    
    addClass(e.target.parentNode.parentNode, "hide");

    var injection_cache = document.getElementById("injection_cache");
    
    organizeStories(injection_cache);

};



// Build a link for "Hit Rock Bottom" to inject any stories remaining in the hot list injection cache
//
//    this replaces the stale_activity_link created by the FL Hot List Injector, which this script hides
//
function insertShowCachedActivityLink() {

    var link = document.createElement("a");
    link.href = "#";
    link.className = "xxl";
    link.innerHTML = "Show Cached Activity";
    
    link.addEventListener("click", showCachedActivity, false);
   
    var span = document.createElement("span");
    span.className = "l";
    span.appendChild(link);
    
    var list_item = document.createElement("li");
    list_item.className = "mbl lh4 hide";
    list_item.id = "inject_cached_link";

    list_item.setAttribute("data-bind", "visible: subfeed() == 'everything'");

    list_item.appendChild(span);
    
    list_item.appendChild(document.createElement("br"));
    
    span = document.createElement("span");
    span.className = "xs q";
    span.innerHTML = "A few injected activities were left cached due to age."
    
    list_item.appendChild(span);
    
    var rock_bottom = document.querySelector("section.phxl");
    
    if (rock_bottom != null) rock_bottom = rock_bottom.querySelector("li.mbl.lh4");
    
    if (rock_bottom == "null") return alert("Rock Bottom Not Found!");
    
    rock_bottom.parentNode.insertBefore(list_item, rock_bottom);
};



// Build the form we'll use
// to screen out activities the user isn't interested in
//
function buildCustomizeFeedForm() {

    var columns = [ [ "", "General Profile",
                      "profile_updated",		"Profile Updated",
                      "people_into_created",		"Fetishes Updated",
                      "friend_created",			"Added New Friend",
                      "wall_post_created",		"Wall Posts",
                      "like_created",			"Loved Something",
                      "", "Pictures",
                      "picture_created",		"Uploaded New Picture",
                      "comment_created",		"Commented on Picture",
                      "", "Videos",
                      "video_created",			"Uploaded New Video",
                      "video_comment_created",		"Commented on Video",
                      "", "Writing",
                      "post_created",			"Posted New Writing",
                      "post_updated",			"Updated Old Writing",
                      "post_comment_created",		"Commented on Writing",
                      "", "Events",
                      "event_created",			"Created New Event",
                      "rsvp_created",			"Created RSVP",
                      "rsvp_updated",			"RSVP Changed",				//story type unique to Hot List Injected stories
		      "", "Status Updates",
                      "status_created",			"Posted Status Update",
                      "status_comment_created",		"Commented on Status"			//story type unique to Hot List Injected stories
                    ],
                    [ "", "Suggestions",
                      "suggestion_created",		"Created New Suggestion",
                      "vote_created",			"Voted on Suggestion",
                      "suggestion_note_updated",	"Updated Suggestion Note",
                      "suggestion_status_updated",	"Updated Suggestion Status",
                      "", "Relationship Changes",
                      "relationship_created",		"Added new Relationship",
                      "relationship_updated",		"Updated old Relationship",
                      "ds_relationship_created",	"Added new D/s Relationship",
                      "ds_relationship_updated",	"Updated old D/s Relationship",
                      "", "Group",
                      "group_created",			"Started New Group",
                      "promoted_to_group_leader",	"Became Leader of Group",
                      "group_membership_created",	"Joined Group",
                      "group_post_created",		"New Discussion",
                      "group_comment_created",		"Comment on Discussion",
		      "", "Hot List Injected",							//story types unique to Hot List Injected stories
		      "injected",			"Injected",
		      "not_injected",			"NOT Injected",
                    ]
                  ];

    var form = document.getElementById("customize");
    
    if (form == null) return;
    
    var section = form.querySelector("section.customize_feed");
    
    if (section != null) section.setAttribute("data-bind", "css: {hidden: !customizeBoxOpen() || (subfeed() != 'everything')}");
    
    var title = form.querySelector("h2.h4");
    
    if (title != null) title.innerHTML = "Screen Out These Activities";
    
    var menu = form.getElementsByTagName("form")[0];

    if (menu == null) {
        menu = form.getElementsByTagName("div")[0];
        if (menu == null) return;
    };
    
    form = menu.parentNode;
    form.removeChild(menu);
    
    menu = document.createElement("form");
    menu.className = "edit_activity_feed_feed";
    
    var div;
    
    for(var i = 0; i < columns.length; i++) {
    
        div = document.createElement("div");
	div.className = "unit size1of2 mlm";
    
        var checks = columns[i];
	var list = null;

	for(var j = 0; j < checks.length; j += 2) {
	
	    if (checks[j] == "") {
	    
	        if (list != null) div.appendChild(list);
		
		list = document.createElement("h2");
		list.className = "h5";
		list.innerHTML = checks[j+1];
		
		div.appendChild(list);
		
		list = document.createElement("ul");
		list.className = "nb mls mtm mbl s";
		
		continue;
	    };
	    
	    var input = document.createElement("input");
	    input.className = "au2 story_type";
	    input.type = "checkbox";
	    input.id = checks[j];
	    
	    Known_Story_Types.push(input.id);
	    
	    if (Screen_List.indexOf(input.id) != -1)
	    
	        input.checked = true;
	    
	    input.addEventListener("change",toggleScreenStoryType,true);

	    var item = document.createElement("li");
	    item.appendChild(input);
	    
	    input = document.createElement("label");
	    input.setAttribute("for", checks[j]);
	    input.innerHTML = " " + checks[j+1];
	    
	    item.appendChild(input);
	    
	    list.appendChild(item);
	};
	
	if (list != null) div.appendChild(list);
	menu.appendChild(div);
    };
    
    if (div != null)  addClass(div, "lastUnit");
    
    div = document.createElement("div");
    div.className = "line";
    div.appendChild(menu);
    
    form.appendChild(div);

    var invert_filter = document.createElement("a");

    invert_filter.id = "invert_filter";
    invert_filter.className = "h4 s un";
    invert_filter.href = "#";
    invert_filter.innerHTML = "invert";
        
    form.appendChild(invert_filter);
    
    invert_filter.addEventListener("click", invertFilter, false);

};



// Toggle between wide and narrow feed views
//
function toggleDoubleWideFeed(e) {

    e.preventDefault();
    
    var link = e.target;

    var feed_container = document.getElementById("activity_feed_container");
    if (feed_container == null) return;
    
    if (hasClass(feed_container, "double-wide")) {
    
        removeClass(feed_container, "double-wide");
    
        var span = document.createElement("span");
        span.className = "picto au2";
        span.innerHTML = "`";
	
	link.innerHTML = "";
        link.appendChild(span);
        link.innerHTML += " Wide View";
        
        link.addEventListener("click", toggleDoubleWideFeed, false);
        link.title = "click to expand to two columns";
    
    } else {
    
        addClass(feed_container, "double-wide");
	
        var span = document.createElement("span");
        span.className = "picto au2";
        span.innerHTML = "J";
	
	link.innerHTML = "";
        link.appendChild(span);
        link.innerHTML += " Narrow View";
        
        link.addEventListener("click", toggleDoubleWideFeed, false);
        link.title = "click to collapse back to a single column";
    
    };
    
};



// Build the new Wide-View link and insert into the Feed menu
//
function addNewFeedOptions() {

    var menu = document.getElementById("hl_injector");
    if (menu == null) menu = lastNode(document.querySelectorAll("#activity_feed_container nav ul li"));
    if (menu == null) return alert("Feed Menu Not Found!");
    

    var link = document.createElement("a");
    link.href = "#";
    link.className = "db un";
    
    var span = document.createElement("span");
    span.className = "picto au2";
    span.innerHTML = "`";
    
    link.appendChild(span);
    link.innerHTML += " Wide View";
    
    link.addEventListener("click", toggleDoubleWideFeed, false);
    link.title = "click to expand to two columns";
    
    var menu_item = document.createElement("li");
    menu_item.appendChild(link);


    if (menu.id == "hl_injector") menu.parentNode.insertBefore(menu_item, menu);
      else menu.parentNode.appendChild(menu_item);
      
};



// Update the UI, adding listeners for clicks and page changes
//
function hookLinks() {

    buildCustomizeFeedForm();
    
    addNewFeedOptions();

    insertShowCachedActivityLink();

    var raw_feed = document.getElementById("activity_feed_container");
    if (raw_feed == null) raw_feed = document;
    
    var links = raw_feed.getElementsByTagName("a");
    
    for(var i = 0; i < links.length; i++) {
    
        var this_link = links[i];

	if (this_link.innerHTML == "customize") {
	
	    this_link.id = "screen_link";
	
	    this_link.innerHTML = (Screen_List.length == 0) ? "screen out" : "screening out";
	    
	    this_link.parentNode.setAttribute("data-bind", "visible: (subfeed() == 'everything') && !customizeBoxOpen()");
	    
	};
	
	if (this_link.href.indexOf("activity_feed_mutings") != -1) {
	
	    this_link.parentNode.removeAttribute("data-bind");
	    
	    this_link.id = "activity_feed_mutings";
	
	    this_link.addEventListener("click", toggleHideShowGagged, false);
	    
	    this_link.innerHTML = "show gagged";

	    addGlobalStyle('table.gagged {display: none;}');
	    
	};
    };

    var spans = document.getElementsByTagName("span");
    
    for (var i = 0; i < spans.length; i++)
    
        if (spans[i].getAttribute("data-bind") == "text: subfeedLabel()") break;
	
    if (i == spans.length) return alert("Subfeed Label Not Found!");
    
    spans[i].addEventListener("DOMSubtreeModified", clearFeedOrganizer, false);

};



// Save persistent user options with GM stored values
//
function saveUserOptions() {

    var my_uid = "u" + getMyUID();
    
    if (Gag_List.length == 0) GM_deleteValue(my_uid + ".hide_uids");
    
      else GM_setValue(my_uid + ".hide_uids", Gag_List.toString());
      
    if (Alpha_List.length == 0) GM_deleteValue(my_uid + ".bubble_uids");
    
      else GM_setValue(my_uid + ".bubble_uids", Alpha_List.toString());
      
    if (Omega_List.length == 0) GM_deleteValue(my_uid + ".sink_uids");
    
      else GM_setValue(my_uid + ".sink_uids", Omega_List.toString());
      
    if (Friend_List.length == 0) GM_deleteValue(my_uid + ".friend_uids");
    
      else GM_setValue(my_uid + ".friend_uids", Friend_List.toString());

    if (Screen_List.length == 0) GM_deleteValue(my_uid + ".screen_story_types");
    
      else GM_setValue(my_uid + ".screen_story_types", Screen_List.toString());

    if (Injected_List.length == 0) GM_deleteValue(my_uid + ".injected_uids");
    
      else GM_setValue(my_uid + ".injected_uids", Injected_List.toString());
};



// Load persistent user options from GM stored values
//
function loadUserOptions() {

    var my_uid = "u" + getMyUID();
    
    Gag_List = GM_getValue(my_uid + ".hide_uids");
    Alpha_List = GM_getValue(my_uid + ".bubble_uids");
    Omega_List = GM_getValue(my_uid + ".sink_uids");
    Friend_List = GM_getValue(my_uid + ".friend_uids");
    Screen_List = GM_getValue(my_uid + ".screen_story_types");
    Injected_List = GM_getValue(my_uid + ".injected_uids");
    
    Gag_List = (Gag_List == null) ? [] : Gag_List.split(",");
    Alpha_List = (Alpha_List == null) ? [] : Alpha_List.split(",");
    Omega_List = (Omega_List == null) ? [] : Omega_List.split(",");
    Friend_List = (Friend_List == null) ? [] : Friend_List.split(",");
    Screen_List = (Screen_List == null) ? [] : Screen_List.split(",");
    Injected_List = (Injected_List == null) ? [] : Injected_List.split(",");

};



// Increase the overall width of the main feed area by the given number of pixels
//
function increaseWidthBy(n) {

    addGlobalStyle( "#status_textarea {width: " + (n + 472) + "px !important;}"
                  + ".double-wide #status_textarea {width: " + (n + 1132) + "px !important;}" );
    
    addGlobalStyle( ".append-1 {padding-right: 20px;}"
                  + ".span-14 {width: " + (n + 550) + "px;}"
		  + ".double-wide .span-14 {width: " + (n + 1210) + "px;}"
		  + ".af td.story {width: " + (n + 477) + "px;}"
		  + ".af td.story .brace {width: " + (n + 477) + "px;}" );

    var new_container_width = n + 950;

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



// Rebuild the options menu on the given user's profile overview page
//
function rebuildProfileOptionsMenu(uid) {

    var old_menu = document.getElementById("FLAV4O_Options");
    
    if (old_menu == null) return;

    var menu = document.createElement("div");
    menu.id = "FLAV4O_Options";
    menu.className = "center";
    
    var sep = document.createElement("span");
    sep.innerHTML = " | ";
    
    if (Gag_List.indexOf(uid) != -1) {
    
        var link = document.createElement("a");
	link.className = "active";
	link.innerHTML = "Gagged";
	link.href = "#";
	link.title = "click to ungag : \r\nGagged users don't appear on your home page activity feeds";
	link.addEventListener("click", (function (n) { return function (e) { toggleGagUID(n); }; })(uid), false);
	
	menu.appendChild(link);
    };
    
    if (Alpha_List.indexOf(uid) != -1) {
    
        var link = document.createElement("a");
	link.className = "active";
	link.innerHTML = "Alpha";
	link.href = "#";
	link.title = "click to demote : \r\nAlpha users bubble to the top of your home page activity feeds";
	link.addEventListener("click", (function (n) { return function (e) { toggleBubbleUID(n); }; })(uid), false);
	
	if (menu.innerHTML != "") menu.appendChild(sep.cloneNode(true));
	
	menu.appendChild(link);
    };
    
    if (Omega_List.indexOf(uid) != -1) {
    
        var link = document.createElement("a");
	link.className = "active";
	link.innerHTML = "omega";
	link.href = "#";
	link.title = "click to destigmatize : \r\nOmega users sink to the bottom of your home page activity feeds";
	link.addEventListener("click", (function (n) { return function (e) { toggleSinkUID(n); }; })(uid), false);
	
	if (menu.innerHTML != "") menu.appendChild(sep.cloneNode(true));
	
	menu.appendChild(link);
    };
    
    var sub_menu = document.createElement("div");
    sub_menu.className = "quiet";
    
    if (Gag_List.indexOf(uid) == -1) {
    
        var link = document.createElement("a");
	link.className = "smaller";
	link.innerHTML = "gag";
	link.href = "#";
	link.title = "Click to Gag : \r\ngagged users don't appear on your home page activity feeds";
	link.addEventListener("click", (function (n) { return function (e) { toggleGagUID(n); }; })(uid), false);
	
	sub_menu.appendChild(link);
    };
    
    if (Alpha_List.indexOf(uid) == -1) {
    
        var link = document.createElement("a");
	link.innerHTML = "&alpha;";
	link.href = "#";
	link.title = "click to make Alpha : \r\nalpha users bubble to the top of your home page activity feeds";
	link.addEventListener("click", (function (n) { return function (e) { toggleBubbleUID(n); }; })(uid), false);
	
	if (sub_menu.innerHTML != "") sub_menu.appendChild(sep.cloneNode(true));
	
	sub_menu.appendChild(link);
    };
    
    if (Omega_List.indexOf(uid) == -1) {
    
        var link = document.createElement("a");
	link.className = "smaller";
	link.innerHTML = "&Omega;";
	link.href = "#";
	link.title = "click to make Omega : \r\nomega users sink to the bottom of your home page activity feeds";
	link.addEventListener("click", (function (n) { return function (e) { toggleSinkUID(n); }; })(uid), false);
	
	if (sub_menu.innerHTML != "") sub_menu.appendChild(sep.cloneNode(true));
	
	sub_menu.appendChild(link);
    };
    
    menu.appendChild(sub_menu);
    
    old_menu.parentNode.insertBefore(menu, old_menu);
    old_menu.parentNode.removeChild(old_menu);
};



// Insert a "view all" link under the Mutual Friends thumb gallery
//
function directLinkToMutualFriends() {

    var thumb_gal = document.querySelector("ul.friends");

    if (thumb_gal == null) return;
  
    // try to detect if this isn't what/where we think
  
    prev_element = previousElement(thumb_gal);
  
    if (prev_element.tagName != "H4") return; //alert("Found Friends Element Somewhere Unexpected!");
  
    if (prev_element.innerHTML.indexOf("Friends") == 0) return;  // There *was* no Mutual Friends List
  
    if (prev_element.innerHTML.indexOf("Mutual Friends") == -1) return; //alert("Found Friends Element Somewhere Unexpected!");
  
    next_element = nextElement(thumb_gal);
  
    if (next_element.tagName != "BR") return; //alert("Found Friends Element Somewhere Unexpected!");
    
    var more = thumb_gal.parentNode.getElementsByTagName("p")[0];
   
    if (more.className != "more") return; //alert("Found Unexpected P Element");
   
    more = more.cloneNode(true);
   
    var link = more.getElementsByTagName("a")[0];
    link.href += "/mutual";
   
    next_element.parentNode.insertBefore(more, next_element);
   
};



// Implement additional features for pages other than the home page activity feed
//
function offHomePage() {

    // Are we on a user's profile overview page?
    
    var profile = document.getElementById("profile");
    
    if (profile == null) return;
    
    var href = document.location.href;

    var uid = href.match(/\/users\/\d+/);
    
    if ((uid == null) || (uid.length == 0)) return;
    
    directLinkToMutualFriends();  // just a little extra feature I like to have on profile pages, maybe others will too
    
    uid = uid[0].substr(7);
    
    loadUserOptions();  //populate the Friend_List
    
    if ((Friend_List.indexOf(uid) == -1) && (Injected_List.indexOf(uid) == -1)) {
    
       if (uid != getMyUID() && (document.querySelector(".friends_badge") == null)) return;
       
       // We've found a new friend!
       // Make sure to remember their uid
       
       Friend_List.push(uid);
       setTimeout(saveUserOptions, 100);
    };
    
    var avatar = profile.getElementsByTagName("img")[0];
    
    avatar = avatar.parentNode.parentNode;
    
    var menu = document.createElement("div");
    menu.id = "FLAV4O_Options";
    
    avatar.appendChild(menu);
    
    rebuildProfileOptionsMenu(uid);

    return;
};
    


// Hide or delete elements on the page associated with
// "work-in-progress" or incompatible features
//
function hideWorkInProgress() {

    discoveredNewStoryType = (function () { return; });
    
};



// Main function
//
function init() {

    var raw_feed = document.getElementById("stories");

    if (raw_feed == null) return offHomePage();

    increaseWidthBy(100);
    
    var organizer = document.createElement("div");
    organizer.id = "feed_organizer";
    
    raw_feed.parentNode.insertBefore(organizer, raw_feed);
    
    clearFeedOrganizer();
    
    loadUserOptions();  //make sure we have the latest saved user options in memory

    hookLinks();

    raw_feed.addEventListener("DOMNodeInserted", (function (n) { return function () { setTimeout(organizeStories, n); }; })(100), false);
    
    hideWorkInProgress();

};



// Call our main function.
//

init();

//end