// ==UserScript==
// @name        FL Hot List Injector
// @namespace   Cromagnon
// @description Follow anyone on FetLife, not just friends.  Manage a private "Hot List" of user profiles and "inject" their activity into your home page feed.
// @include     *fetlife.com/*
// @exclude     push*.fetlife.com/*
// @version     1.0.0203
//
// === GM_ API ===
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_deleteValue
// ==/UserScript==



// Global Variables

var FrameQueue = [];
var Verbs = [];




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

addGlobalStyle(   '     td.story a.view_more {margin: 10px 120px 0; padding: 5px;}'
                + '\r\n #hl_injector a {white-space: nowrap; overflow: hidden;}'
                + '\r\n #hl_injector a:hover {overflow: visible;}'
                + '\r\n #profile .hot_badge {background-color: #222222; color: #FF0000; font-weight: bold; margin-bottom: 10px; padding: 5px 0; text-align: center;}'
                + '\r\n #profile .hot_badge a {color: #AAAAAA; font-style: italic; text-decoration: none;}'
                + '\r\n #profile .button.hot a {padding: 2px; color: #AAAAAA; font-style: italic;}'
 		+ '\r\n #hli_timestamp {display: none;}'
              );




// define my own "trim white-space" function for Strings
//
//   returns a new copy of the string without any leading or trailing white-space
//
String.prototype.trim=function() {

    return this.replace(/(^\s+|\s+$)/g, "");

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



// define my own "last()" function for NodeLists
//
//   returns the last node in the node list (or null if the list is empty)
//
function lastNode(nodeList) {

    if (nodeList.length == 0) return null;
    
    return nodeList[ nodeList.length - 1 ];
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
        
            classes.push(newClassName);
            
            className = classes.join(" ");

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
        
            className = classes.join(" ");
        
            if ((typeof classNameOrNode) == (typeof "")) classNameOrNode = className;

              else classNameOrNode.className = className;
        };
    };

    return classNameOrNode;
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



// Inject a reference table for FL "Pictos"
//
function insertPictoRef() {

    var p = document.createElement("p");
    
    p.innerHTML = "Picto Reference <br>";
    
    span = document.createElement("span");
    span.setAttribute("style", "font-family: 'Pictos'; font-size: 30px; line-height: 32px;");
    
    span.innerHTML = "ABCDEF<br>GHIJKL<br>MNOPQR<br>STUVWX" + 
                     "<br>YZabcd<br>efghij<br>klmnop<br>qrstuv" + 
                     "<br>wxyz12<br>345678<br>90`~!@<br>#$%^&amp;*" + 
                     "<br>(){}[]<br>|\:;\"'<br>&lt;,&gt;.?/ _-+=";

    p.appendChild(span);
    
    var aside = document.getElementsByTagName("aside")[0];
    
    aside.appendChild(p);
}



// Update the content server for the given image
//  from the old cdn?.fetlife.com servers
//  to the new flpics?.a.ssl.fastly.net servers
//
function updateContentServer(img) {

    var match = img.src.match(/cdn\d\.fetlife\.com/);
    
    if (match == null) return;
    
    match = match[0];
    
    img.src = img.src.replace(match, "flpics" + match[3] + ".a.ssl.fastly.net");
    
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



// return the last known name associated with the given uid
//
function uidToName(uid) {

    return GM_getValue("u" + uid + ".lastKnownName", uid);
    
};



// remove any name associated with the given uid
//
function removeNameWithUID(uid) {
    
    return GM_deleteValue("u" + uid + ".lastKnownName");
    
};



// associate the given profile name with the given uid
//
function associateNameWithUID(username, uid) {
    
    return GM_setValue("u" + uid + ".lastKnownName", username);
    
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



// Save the given Hot List
//
function saveHotList(hotlist) {

    var uid = getMyUID();
    
    if (hotlist.length == 0) GM_deleteValue("u" + uid + ".hot_list");
    
      else GM_setValue("u" + uid + ".hot_list", hotlist.toString());

};



// Load and return the Hot List
//
function loadHotList() {

    var uid = getMyUID();
    
    var hotlist = GM_getValue("u" + uid + ".hot_list");
    
    hotlist = (hotlist == null) ? [] : hotlist.split(",");
    
    return hotlist;
};



// Answer whether the displayed profile is in the hot list
//
function isProfileHot() {

    var hotlist = loadHotList();

    var uid = document.location.href.match(/\/users\/\d+/);
    
    if ((uid == null) || (uid.length == 0)) return false;
    
    uid = uid[0].substr(7);

    return (hotlist.indexOf(uid) != -1);
};



// Is the viewed profile "into" being Hot List Injected?
//
function intoHotListInjected() {

    var links = document.getElementsByTagName("a");
    
    for (var i = 0; i < links.length; i++) {
    
        //you can't know why the fetish link is in their mini_feed,
        // they could have been *removing* the fetish for all we know
        
        if (links[i].parentNode.parentNode.id == "mini_feed") continue;

        if (links[i].href.indexOf("/fetishes/515997") != -1) break;
    };
    
    if (i != links.length) return true;
    
    alert("NOT INTO HOT LIST INJECTED:"
          + "\n\nTo give fellow kinksters on FetLife a fig leaf to hide behind,"
          + "\nthis userscript does not allow you to " + Verbs[0].toLowerCase() + " them unless"
          + "\nthey've indicated no objection, by adding Hot List Injected"
          + "\n(/fetishes/515997) to their fetish list."
          + "\n\n   Thank You for observing others request for privacy  >:-)\n  "
          );

    return false;
};



// The Hot Button/Badge was clicked on, handle the event
//
function hotButtonClicked(e) {

    e.preventDefault();
    
    var uid = document.location.href.match(/\/users\/\d+/);
    
    if ((uid == null) || (uid.length == 0)) return;
    
    uid = uid[0].substr(7);
    
    var button = e.target.parentNode;

    var hotlist = loadHotList();
    
    if (button.className == "hot_badge") {
    
        var j = hotlist.indexOf(uid);
        
        if (j != -1) hotlist.splice(j,1);
        
        removeNameWithUID(uid);

    } else {
    
        var username = document.querySelector("img.pan");
        
        if (username != null) username = username.getAttribute("alt");
        
        if (username != null) associateNameWithUID(username, uid);
    
        if ((hotlist.indexOf(uid) == -1) && (intoHotListInjected())) hotlist.push(uid);
    };
    
    saveHotList(hotlist);

    var new_button = (button.className == "hot_badge") ? createHotButton() : createHotBadge();
    
    button.parentNode.insertBefore(new_button, button);
    
    button.parentNode.removeChild(button);

};



// Create and return a new button/link for a profile not yet in the hot list
//
function createHotButton() {

    var button = document.createElement("div");
    button.className = "button hot";
    
    var link = document.createElement("a");
    link.href = "#";
    link.innerHTML = Verbs[0].toUpperCase() + " THEM";

    link.addEventListener("click", hotButtonClicked, false);
    
    button.appendChild(link);
    
    return button;
};



// Create and return a new button/link for a profile already in the hot list
//
function createHotBadge() {

    var button = document.createElement("div");
    button.className = "hot_badge";
    button.innerHTML = Verbs[1] + " ";
    
    var link = document.createElement("a");
    link.href = "#";
    link.innerHTML = "(x)";
    
    link.addEventListener("click", hotButtonClicked, false);
    
    button.appendChild(link);
    
    return button;
};



// Insert the Hot List add/remove button onto profile pages
//
function profileHotListBadge() {

    var last_button = document.querySelector("div#profile div#main_content div.button");
    
    if (last_button == null) return;
    
    last_button = lastNode(last_button.parentNode.getElementsByTagName("div"));

    var new_button = isProfileHot() ? createHotBadge() : createHotButton();

    last_button.parentNode.insertBefore(new_button, last_button);
    
    if (last_button.className.indexOf("donation_badge") == -1)
    
        last_button.parentNode.insertBefore(last_button, new_button);

};



// Update the contents of the loaded iframe's parent
//
function injectAvatarInfo(e) {

    e.preventDefault();

    var iframe = e.target;
    
    var age_sex_role = iframe.contentDocument.querySelector("div#main_content h2.bottom span");
    
    age_sex_role = (age_sex_role == null) ? "unknwon" : age_sex_role.innerHTML;
    
    var location = iframe.contentDocument.querySelector("div#main_content h2.bottom em");

    location = (location == null) ? "unknwon" : location.innerHTML;
    
    var avatar = iframe.contentDocument.querySelector("div#main_content img.profile_avatar");
    
    if (avatar != null) {
    
        avatar = avatar.src;
        avatar = avatar.replace("_60x60.gif","_35x35.gif");
        avatar = avatar.replace("_60.jpg","_35.jpg");
    
        var img = iframe.parentNode.querySelector("img.avatar");
        
        img.src = avatar;
    };
    
    var spans = iframe.parentNode.getElementsByTagName("span");
    
    spans[0].innerHTML = age_sex_role;
    spans[1].innerHTML = location;

    iframe.parentNode.removeChild(iframe);
    
    loadNextFrame();
};



// Return a new div which will be used to load the profile avatar & info from the given link
//
function loadAvatarHere(link) {

    var p = document.createElement("p");
    p.className = "mbn";
    p.appendChild(link.cloneNode(true));
    
    var span = document.createElement("span");
    span.className = "q s";
    span.innerHTML = "<em>loading a/s/r</em>";
    
    p.innerHTML += " ";
    p.appendChild(span);
    
    span = document.createElement("span");
    span.className = "db q xs un i";
    span.innerHTML = "loading location";
    
    p.innerHTML += " ";
    p.appendChild(span);
    
    link = link.cloneNode(true);
    
    var img = document.createElement("img");
    img.className = "avatar s30 fl mrs";
    img.setAttribute("width", "35");
    img.setAttribute("height", "35");
    img.setAttribute("alt", link.innerHTML);
    img.src = "https://flassets.a.ssl.fastly.net/images/avatar_missing_35x35.gif";
    
    link.innerHTML = "";
    link.appendChild(img);

    var div = document.createElement("div");
    div.className = "mhs pts";
    div.appendChild(link);
    div.appendChild(p);
    
    span = document.createElement("span");
    span.style.display = "none";
    span.setAttribute("load_href", link.getAttribute("href") + "/activity");
    
    div.appendChild(span);
    
    FrameQueue.unshift(span);
    FrameQueue.unshift(injectAvatarInfo);
    
    return div;
};



// Return a new relationship_created element reflecting the given v2 story
//
function buildRelationshipCreated(base, avatar) {

    var ds_tipoffs = [ "dominant", "sadist", "sadomasochist", "master", "mistress", "owner", "top",
                       "daddy", "mommy", "brother", "sister", "served", "considering", "protecting",
                       "mentoring", "teaching", "training", "switches", "submissive", "masochist",
                       "bottom", "owned", "property", "collared", "slave", "kajira", "kajirus",
                       "service", "serving", "protection", "consideration", "pet", "toy", "girl",
                       "boy", "babygirl", "babyboy", "brat", "keyholder", "chastity", "mentored",
                       "student", "trainee", "unowned", "unpartnered" ];

    var new_story = buildGenericStory(avatar);
    
    new_story.className = "relationship_created";
    
    for (var i = 0; i < ds_tipoffs.length; i++)
    
        if (base.innerHTML.indexOf(ds_tipoffs[i]) != -1) break;
        
    if (i != ds_tipoffs.length) new_story.className = "ds_relationship_created";
    
    var p = document.createElement("p");
    p.className = "mbn";
    
    var link = avatar.cloneNode(true);
    link.innerHTML = base.innerHTML.split(" ")[0];
    
    p.appendChild(link);
    
    p.innerHTML += base.innerHTML.substr(base.innerHTML.indexOf(" "));

    link = p.getElementsByTagName("a")[1];
    
    if (link != null) {
        link.parentNode.removeChild(link);
        p.innerHTML = p.innerHTML.replace(" . ", ": ");
    };

    var old_time = p.getElementsByTagName("span")[0];

    var time = document.createElement("time");
    time.className = "timeago xxs q un nowrap";
    time.innerHTML = old_time.innerHTML;
    
    old_time.parentNode.insertBefore(time, old_time);
    old_time.parentNode.removeChild(old_time);
    
    var brace = new_story.querySelector(".brace");
    
    brace.appendChild(p);
    
    if (link != null) brace.appendChild(loadAvatarHere(link));
    
    return new_story;
};



// Return a new relationship_updated element reflecting the given v2 story
//
function buildRelationshipUpdated(base, avatar) {

    var new_story = buildGenericStory(avatar);
    
    new_story.className = (base.innerHTML.indexOf("D/s") == -1) ? "relationship_updated" : "ds_relationship_updated";

    var p = document.createElement("p");
    p.className = "mbn";
    
    var link = avatar.cloneNode(true);
    link.innerHTML = base.innerHTML.split(" ")[0];
    
    p.appendChild(link);
    
    p.innerHTML += " is now " + base.innerHTML.substr(base.innerHTML.indexOf(" status to ") + 11);

    link = p.getElementsByTagName("a")[1];
    
    if (link != null) {
        link.parentNode.removeChild(link);
        p.innerHTML = p.innerHTML.replace(" . ", ": ");
    };

    var old_time = p.getElementsByTagName("span")[0];

    var time = document.createElement("time");
    time.className = "timeago xxs q un nowrap";
    time.innerHTML = old_time.innerHTML;
    
    old_time.parentNode.insertBefore(time, old_time);
    old_time.parentNode.removeChild(old_time);
    
    var brace = new_story.querySelector(".brace");
    
    brace.appendChild(p);
    
    if (link != null) brace.appendChild(loadAvatarHere(link));
    
    return new_story;
};



// Return a new relationship_updated (for changed role/orientation) element reflecting the given v2 story
//
function buildOrientationUpdated(base, avatar) {

    var new_story = buildGenericStory(avatar);
    
    new_story.className = "relationship_updated";

    var p = document.createElement("p");
    p.className = "mbn";
    
    var link = avatar.cloneNode(true);
    link.innerHTML = base.innerHTML.split(" ")[0];
    
    p.appendChild(link);

    p.innerHTML += " is now " + base.innerHTML.substr(base.innerHTML.lastIndexOf(" to ") + 4);

    var old_time = p.getElementsByTagName("span")[0];

    var time = document.createElement("time");
    time.className = "timeago xxs q un nowrap";
    time.innerHTML = old_time.innerHTML;
    
    old_time.parentNode.insertBefore(time, old_time);
    old_time.parentNode.removeChild(old_time);
    
    var brace = new_story.querySelector(".brace");
    
    brace.appendChild(p);
    
    return new_story;
};



// Return a new friend_created element reflecting the given v2 story
//
function buildFriendCreated(base, avatar) {

    var new_story = buildGenericStory(avatar);
    
    new_story.className = "friend_created";
    
    var p = document.createElement("p");
    p.className = "mbn";
    
    var link = avatar.cloneNode(true);
    link.innerHTML = base.innerHTML.split(" ")[0];
    
    p.appendChild(link);
    
    p.innerHTML += " became friends with: ";
    
    var time = document.createElement("time");
    time.className = "timeago xxs q un nowrap";
    time.innerHTML = lastNode(base.getElementsByTagName("span")).innerHTML;
    
    p.appendChild(time);
    
    var brace = new_story.querySelector(".brace");
    
    brace.appendChild(p);
    
    link = base.getElementsByTagName("a")[0];
    
    brace.appendChild(loadAvatarHere(link));
    
    return new_story;
};



// Return a new event_created element reflecting the given v2 story
//
function buildEventCreated(base, avatar) {

    var new_story = buildGenericStory(avatar);
    
    new_story.className = "event_created";
    
    var p = document.createElement("p");
    p.className = "mbn";
    
    link = avatar.cloneNode(true);
    link.innerHTML = base.innerHTML.split(" ")[0];
    
    p.appendChild(link);

    var base_spans = base.getElementsByTagName("span");
    
    p.innerHTML += " " + base_spans[0].innerHTML;
    
    var time = document.createElement("time");
    time.className = "timeago xxs q un nowrap";
    time.innerHTML = base_spans[1].innerHTML;
    
    p.appendChild(time);
    
    var brace = new_story.querySelector(".brace");
    
    brace.appendChild(p);
    
    return new_story;
};



// Return a new rsvp_created element reflecting the given v2 story
//
function buildRSVPCreated(base, avatar) {

    var new_story = buildGenericStory(avatar);
    
    new_story.className = "rsvp_created";
    
    var p = document.createElement("p");
    p.className = "mbn";
    
    link = avatar.cloneNode(true);
    link.innerHTML = base.innerHTML.split(" ")[0];
    
    p.appendChild(link);

    var base_spans = base.getElementsByTagName("span");
    
    p.innerHTML += " " + base_spans[0].innerHTML;
    
    var time = document.createElement("time");
    time.className = "timeago xxs q un nowrap";
    time.innerHTML = base_spans[1].innerHTML;
    
    p.appendChild(time);
    
    var brace = new_story.querySelector(".brace");
    
    brace.appendChild(p);
    
    return new_story;
};



// Return a new rsvp_created element reflecting the given v2 story
//
function buildRSVPCreated(base, avatar) {

    var new_story = buildGenericStory(avatar);
    
    new_story.className = "rsvp_created";
    
    var p = document.createElement("p");
    p.className = "mbn";
    
    link = avatar.cloneNode(true);
    link.innerHTML = base.innerHTML.split(" ")[0];
    
    p.appendChild(link);

    var base_spans = base.getElementsByTagName("span");
    
    p.innerHTML += " " + base_spans[0].innerHTML;
    
    var time = document.createElement("time");
    time.className = "timeago xxs q un nowrap";
    time.innerHTML = base_spans[1].innerHTML;
    
    p.appendChild(time);
    
    var brace = new_story.querySelector(".brace");
    
    brace.appendChild(p);
    
    return new_story;
};



// Return a new rsvp_updated element reflecting the given v2 story
//
function buildRSVPUpdated(base, avatar) {

    var new_story = buildGenericStory(avatar);
    
    new_story.className = "rsvp_updated";
    
    var p = document.createElement("p");
    p.className = "mbn";
    
    link = avatar.cloneNode(true);
    link.innerHTML = base.innerHTML.split(" ")[0];
    
    p.appendChild(link);

    var base_spans = base.getElementsByTagName("span");
    
    var old_status = base_spans[0].innerHTML.match("went from (is|might be) going to")[0];
    
    p.innerHTML += base_spans[0].innerHTML.replace(old_status, "now <b><i>").replace(" going to", "</i></b> going to") + " ";
    
    var time = document.createElement("time");
    time.className = "timeago xxs q un nowrap";
    time.innerHTML = base_spans[1].innerHTML;
    
    p.appendChild(time);
    
    var brace = new_story.querySelector(".brace");
    
    brace.appendChild(p);
    
    return new_story;
};



// Return a new profile_updated element reflecting the given v2 story
//
function buildProfileUpdated(base, avatar) {

    var new_story = buildGenericStory(avatar);
    
    new_story.className = "profile_updated";
    
    var p = document.createElement("p");
    p.className = "mbn";
    
    var link = avatar.cloneNode(true);
    link.innerHTML = base.innerHTML.split(" ")[0];
    
    p.appendChild(link);
    
    var base_spans = base.getElementsByTagName("span");
    
    p.innerHTML += base_spans[0].innerHTML.replace("the about section on ", " ").replace("profile", "<a>about me</a> section");
    
    var time = document.createElement("time");
    time.className = "timeago xxs q un nowrap";
    time.innerHTML = base_spans[1].innerHTML;
    
    p.appendChild(time);
    
    link = p.getElementsByTagName("a")[1];
    link.href = avatar.getAttribute("href") + "#about";
    
    var brace = new_story.querySelector(".brace");
    
    brace.appendChild(p);
    
    return new_story;
};



// Return a new profile_updated (for websites) element reflecting the given v2 story
//
function buildWebsitesUpdated(base, avatar) {

    var new_story = buildGenericStory(avatar);
    
    new_story.className = "profile_updated";
    
    var p = document.createElement("p");
    p.className = "mbn";
    
    var link = avatar.cloneNode(true);
    link.innerHTML = base.innerHTML.split(" ")[0];
    
    p.appendChild(link);
    
    p.innerHTML += base.innerHTML.substr(base.innerHTML.indexOf(" ")).replace("websites", "<a>websites</a>");
    
    var old_time = p.getElementsByTagName("span")[0];

    var time = document.createElement("time");
    time.className = "timeago xxs q un nowrap";
    time.innerHTML = old_time.innerHTML;
    
    old_time.parentNode.insertBefore(time, old_time);
    old_time.parentNode.removeChild(old_time);
    
    var link = p.getElementsByTagName("a")[1];
    link.href = avatar.getAttribute("href") + "#websites";
    
    var brace = new_story.querySelector(".brace");
    
    brace.appendChild(p);
    
    return new_story;
};



// Return a new profile_updated (for changed avatar) element reflecting the given v2 story
//
function buildAvatarChanged(base, avatar) {

    var new_story = buildGenericStory(avatar);
    
    new_story.className = "profile_updated";
    
    var brace = new_story.querySelector(".brace");
    
    var link = avatar.cloneNode(true);
    link.innerHTML = base.innerHTML.split(" ")[0];
    
    brace.appendChild(link);
    
    var base_spans = base.getElementsByTagName("span");
    
    brace.innerHTML += base_spans[0].innerHTML.replace("profile picture", "<a>profile picture</a>") + " ";
    
    link = brace.getElementsByTagName("a")[1];
    link.href = avatar.getAttribute("href") + "#avatar";
    
    var time = document.createElement("time");
    time.className = "timeago xxs q un nowrap";
    time.innerHTML = base_spans[1].innerHTML;
    
    brace.appendChild(time);
    
    link = base.getElementsByTagName("a")[0].cloneNode(true);
    link.className = "fl mrs";
    
    var img = link.getElementsByTagName("img")[0];
    img.className = "picture s50 fl";
    img.removeAttribute("width");
    img.removeAttribute("height");
    
    updateContentServer(img);

    var div = document.createElement("div");
    div.className = "mhs mts group";
    div.appendChild(link);
    
    brace.appendChild(div);
   
    return new_story;
};



// Return a new profile_updated (for supports FetLife) element reflecting the given v2 story
//
function buildSupportsFetLife(base, avatar) {

    var new_story = buildGenericStory(avatar);
    
    new_story.className = "profile_updated";
    
    var p = document.createElement("p");
    p.className = "mbn";
    
    var link = avatar.cloneNode(true);
    link.innerHTML = base.innerHTML.split(" ")[0];
    
    p.appendChild(link);
    
    p.innerHTML += " ";
    
    link = base.getElementsByTagName("a")[0].cloneNode(true);
    
    p.appendChild(link);
    
    var time = document.createElement("time");
    time.className = "timeago xxs q un nowrap";
    time.innerHTML = base.getElementsByTagName("span")[1].innerHTML;
    
    p.innerHTML += " ";
    
    p.appendChild(time);
    
    var brace = new_story.querySelector(".brace");
    
    brace.appendChild(p);
    
    return new_story;
};



// Return a new people_into_created (new Fetish) element reflecting the given v2 story
//
function buildPeopleIntoCreated(base, avatar) {

    var new_story = buildGenericStory(avatar);
    
    new_story.className = "people_into_created";
    
    var p = document.createElement("p");
    p.className = "mbn";
    
    var link = avatar.cloneNode(true);
    link.innerHTML = base.innerHTML.split(" ")[0];
    
    p.appendChild(link);
    
    p.innerHTML += base.innerHTML.substr(base.innerHTML.indexOf(" ")).replace("it <a ", "<a ");
    
    var old_time = p.getElementsByTagName("span")[0];

    var time = document.createElement("time");
    time.className = "timeago xxs q un nowrap";
    time.innerHTML = old_time.innerHTML;
    
    old_time.parentNode.insertBefore(time, old_time);
    old_time.parentNode.removeChild(old_time);
    
    var brace = new_story.querySelector(".brace");
    
    brace.appendChild(p);
    
    return new_story;
};



// Return a new people_into_created (Fetish updated) element reflecting the given v2 story
//
function buildFetishUpdated(base, avatar) {

    var new_story = buildGenericStory(avatar);
    
    new_story.className = "people_into_created";
    
    var p = document.createElement("p");
    p.className = "mbn";
    
    p.innerHTML = "&rdquo; to &ldquo;";
    
    var quote_pattern = RegExp(p.innerHTML);
    
    p.innerHTML = "";
    
    var link = avatar.cloneNode(true);
    link.innerHTML = base.innerHTML.split(" ")[0];
    
    p.appendChild(link);
    
    var new_status = base.innerHTML.substring(base.innerHTML.search(quote_pattern) + 6, base.innerHTML.indexOf("<a ") - 2);

    if (new_status.substr(new_status.length - 3,3) == " it") new_status = new_status.substr(0, new_status.length - 3);
    
    p.innerHTML += " is now " + new_status + " ";
    
    p.appendChild(base.getElementsByTagName("a")[0].cloneNode(true));
    
    p.innerHTML += ". ";
    
    var time = document.createElement("time");
    time.className = "timeago xxs q un nowrap";
    time.innerHTML = base.getElementsByTagName("span")[0].innerHTML;
    
    p.appendChild(time);
    
    var brace = new_story.querySelector(".brace");
    
    brace.appendChild(p);
    
    return new_story;
};



// Return a new status_creaated element reflecting the given v2 story
//
function buildStatusCreated(base, avatar) {

    var status_story_id = base.getElementsByTagName("a")[0].href;
    
    status_story_id = status_story_id.substr(status_story_id.lastIndexOf("/") + 1);

    var new_story = buildGenericStory(avatar);
    
    new_story.className = "status_created";
    
    new_story.id = "status_story_" + status_story_id;
    
    var p = document.createElement("p");
    p.className = "mbn";
    
    var link = avatar.cloneNode(true);
    link.innerHTML = base.innerHTML.split(" ")[0];
    
    p.appendChild(link);
    
    var base_spans = base.getElementsByTagName("span");
    
    p.innerHTML += base_spans[0].innerHTML;
    
    var time = document.createElement("time");
    time.className = "timeago xxs q un nowrap";
    time.innerHTML = base_spans[1].getElementsByTagName("a")[0].innerHTML;
    
    var span = document.createElement("span");
    span.className = "q xxs un nowrap lhn au1";
    
    span.appendChild(time);
    
    span.innerHTML += " | ";
    
    link = document.createElement("a");
    link.href = avatar.getAttribute("href") + "/statuses/" + status_story_id;
    link.innerHTML = "read comments";
    
    span.appendChild(link);

    p.appendChild(span);
    
    var brace = new_story.querySelector(".brace");
    
    brace.appendChild(p);
    
    return new_story;
};



// Return a new status_comment_created element reflecting the given v2 story
//
function buildStatusCommentCreated(base, avatar) {

    var new_story = buildGenericStory(avatar);
    
    new_story.className = "status_comment_created";
    
    var p = document.createElement("p");
    p.className = "mbn";
    
    link = avatar.cloneNode(true);
    link.innerHTML = base.innerHTML.split(" ")[0];
    
    p.appendChild(link);

    var base_spans = base.getElementsByTagName("span");
    
    p.innerHTML += " " + base_spans[0].innerHTML.replace(" one of ", " ").replace("'s statuses", "'s status");

    var time = document.createElement("time");
    time.className = "timeago xxs q un nowrap";
    time.innerHTML = base_spans[1].innerHTML;
    
    p.appendChild(time);
    
    var brace = new_story.querySelector(".brace");
    
    brace.appendChild(p);
    
    p = document.createElement("p");
    p.className = "mbn q s";
    p.innerHTML = base.getElementsByTagName("blockquote")[0].innerHTML;
    
    link = p.getElementsByTagName("a")[0];
    
    if (link != null) link.className = "xs nowrap";
    
    var div = document.createElement("div");
    div.className = "mhs pts s";
    div.appendChild(p);
    
    brace.appendChild(div);
    
    return new_story;
};



// Return a new wall_post_creaated element reflecting the given v2 story
//
function buildWallPostCreated(base, avatar) {

    var new_story = buildGenericStory(avatar);
    
    new_story.className = "wall_post_created";
    
    var p = document.createElement("p");
    p.className = "mbn";
    
    var link = avatar.cloneNode(true);
    link.innerHTML = base.innerHTML.split(" ")[0];
    
    p.appendChild(link);
    
    p.innerHTML += " wrote on ";
    
    link = base.getElementsByTagName("a")[0].cloneNode(true);
    
    p.appendChild(link);
    
    p.innerHTML += "'s ";
    
    link = base.getElementsByTagName("a")[0].cloneNode(true);
    link.href = link.getAttribute("href") + "#wall";
    link.innerHTML = "wall";
    
    p.appendChild(link);
    
    p.innerHTML += ". ";
        
    var time = document.createElement("time");
    time.className = "timeago xxs q un nowrap";
    time.innerHTML = base.getElementsByTagName("span")[1].innerHTML;
    
    p.appendChild(time);
    
    var brace = new_story.querySelector("div.brace");
    
    brace.appendChild(p);
    
    p = document.createElement("p");
    p.className = "mbn q s";
    p.innerHTML = base.getElementsByTagName("blockquote")[0].innerHTML;
    
    link = p.getElementsByTagName("a")[0];
    
    if (link != null) link.className = "xs nowrap";
    
    var div = document.createElement("div");
    div.className = "mhs pts s";
    div.appendChild(p);
    
    brace.appendChild(div);
    
    return new_story;
};



// Return a new post_created element reflecting the given v2 story
//
function buildPostCreated(base, avatar) {

    var new_story = buildGenericStory(avatar);
    
    new_story.className = "post_created";
    
    var p = document.createElement("p");
    p.className = "mbn";
    
    var link = avatar.cloneNode(true);
    link.innerHTML = base.innerHTML.split(" ")[0];
    
    p.appendChild(link);
    
    p.innerHTML += " posted a new ";
    
    link = base.getElementsByTagName("a")[0].cloneNode(true);
    link.innerHTML = base.innerHTML.match(/(note|journal entry|erotica)/)[0];
    
    p.appendChild(link);
    
    p.innerHTML += ": ";
    
    var time = document.createElement("time");
    time.className = "timeago xxs q un nowrap";
    time.innerHTML = base.getElementsByTagName("span")[1].innerHTML;
    
    p.appendChild(time);

    var brace = new_story.querySelector("div.brace");
    
    brace.appendChild(p);
    
    p = document.createElement("p");
    p.className = "mbn";
    
    link = base.getElementsByTagName("a")[0].cloneNode(true);
    link.className = "l b";
    
    p.appendChild(link);
    
    var span = document.createElement("span");
    span.className = "extract q s";
    
    span.innerHTML = base.getElementsByTagName("blockquote")[0].innerHTML + " ";
    
    link = span.getElementsByTagName("a")[0];
    if (link != null) link.parentNode.removeChild(link);
    
    link = base.getElementsByTagName("a")[0].cloneNode(true);
    link.innerHTML = "continue reading »";
    
    span.appendChild(link);

    p.appendChild(span);
    
    var div = document.createElement("div");
    div.className = "mhs pts s";
    div.appendChild(p);
    
    brace.appendChild(div);
    
    return new_story;
};



// Return a new post_updated element reflecting the given v2 story
//
function buildPostUpdated(base, avatar) {

    var new_story = buildGenericStory(avatar);
    
    new_story.className = "post_updated";
    
    var p = document.createElement("p");
    p.className = "mbn";
    
    link = avatar.cloneNode(true);
    link.innerHTML = base.innerHTML.split(" ")[0];
    
    p.appendChild(link);

    var base_spans = base.getElementsByTagName("span");
    
    p.innerHTML += " " + base_spans[0].innerHTML;
    
    var time = document.createElement("time");
    time.className = "timeago xxs q un nowrap";
    time.innerHTML = base_spans[1].innerHTML;
    
    p.appendChild(time);
    
    var brace = new_story.querySelector(".brace");
    
    brace.appendChild(p);
    
    return new_story;
};



// Return a new post_comment_creaated element reflecting the given v2 story 
//
function buildPostCommentCreated(base, avatar) {

    var new_story = buildGenericStory(avatar);
    
    new_story.className = "post_comment_created";
    
    var p = document.createElement("p");
    p.className = "mbn";
    
    var link = avatar.cloneNode(true);
    link.innerHTML = base.innerHTML.split(" ")[0];
    
    p.appendChild(link);
    
    p.innerHTML += " commented on ";
    
    p.appendChild(base.getElementsByTagName("a")[0].cloneNode(true));
    
    p.innerHTML += "'s ";
    
    p.appendChild(base.getElementsByTagName("a")[1].cloneNode(true));
    
    p.innerHTML += " ";
    
    p.appendChild(base.getElementsByTagName("a")[2].cloneNode(true));
    
    p.innerHTML += ": ";
    
    var time = document.createElement("time");
    time.className = "timeago xxs q un nowrap";
    time.innerHTML = base.getElementsByTagName("span")[1].innerHTML;
    
    p.appendChild(time);

    var brace = new_story.querySelector("div.brace");
    
    brace.appendChild(p);
    
    p = document.createElement("p");
    p.className = "mbn q s";
    p.innerHTML = base.getElementsByTagName("blockquote")[0].innerHTML;
    
    link = p.getElementsByTagName("a")[0];
    
    if (link != null) link.className = "xs nowrap";
    
    var div = document.createElement("div");
    div.className = "mhs pts s";
    div.appendChild(p);
    
    brace.appendChild(div);
    
    return new_story;
};



// Return a new group_membership_created element reflecting the given v2 story
//
function buildGroupMembershipCreated(base, avatar) {

    var new_story = buildGenericStory(avatar);
    
    new_story.className = "group_membership_created";
    
    var p = document.createElement("p");
    p.className = "mbn";
    
    link = avatar.cloneNode(true);
    link.innerHTML = base.innerHTML.split(" ")[0];
    
    p.appendChild(link);

    var base_spans = base.getElementsByTagName("span");
    
    p.innerHTML += " " + base_spans[0].innerHTML;
    
    var time = document.createElement("time");
    time.className = "timeago xxs q un nowrap";
    time.innerHTML = base_spans[1].innerHTML;
    
    p.appendChild(time);
    
    var brace = new_story.querySelector(".brace");
    
    brace.appendChild(p);
    
    return new_story;
};



// Return a new promoted_to_group_leader element reflecting the given v2 story
//
function buildPromotedToGroupLeader(base, avatar) {

    var new_story = buildGenericStory(avatar);
    
    new_story.className = "promoted_to_group_leader";
    
    var p = document.createElement("p");
    p.className = "mbn";
    
    link = avatar.cloneNode(true);
    link.innerHTML = base.innerHTML.split(" ")[0];
    
    p.appendChild(link);

    var base_spans = base.getElementsByTagName("span");
    
    p.innerHTML += " " + base_spans[0].innerHTML;
    
    var time = document.createElement("time");
    time.className = "timeago xxs q un nowrap";
    time.innerHTML = base_spans[1].innerHTML;
    
    p.appendChild(time);
    
    var brace = new_story.querySelector(".brace");
    
    brace.appendChild(p);
    
    return new_story;
};



// Return a new group_post_created element reflecting the given v2 story
//
function buildGroupPostCreated(base, avatar) {

    var new_story = buildGenericStory(avatar);
    
    new_story.className = "group_post_created";
    
    var base_links = base.getElementsByTagName("a");
    
    var span = document.createElement("span");
    span.className = "quiet xxs q un nowrap db";
    span.appendChild(base_links[1].cloneNode(true));
    
    var brace = new_story.querySelector("div.brace");
    
    brace.appendChild(span);
    
    span = document.createElement("span");
    span.className = "b l";
    span.appendChild(base_links[0].cloneNode(true));
    
    var div = document.createElement("span");
    div.className = "db";
    div.appendChild(span);
    
    span = document.createElement("span");
    span.className = "s q";
    span.innerHTML = base.getElementsByTagName("blockquote")[0].innerHTML;
    
    var link = span.getElementsByTagName("a")[0];
    
    if (link != null) link.parentNode.removeChild(link);

    div.appendChild(span);
    
    brace.appendChild(div);
    
    link = avatar.cloneNode(true);
    link.innerHTML = base.innerHTML.split(" ")[0];

    span = document.createElement("span");
    span.className = "q xxs un db";
    span.innerHTML = "- ";

    span.appendChild(link);
    
    span.innerHTML += " | ";
    
    link = base_links[0].cloneNode(true);
    link.href = link.getAttribute("href") + "#new_group_post_comment_message";
    link.title = "";
    link.innerHTML = "Comment";
    link.removeAttribute("class");
    
    span.appendChild(link);
    
    span.innerHTML += " | ";
    
    var time = document.createElement("time");
    time.className = "timeago xxs q un nowrap";
    time.innerHTML = base.getElementsByTagName("span")[1].innerHTML;
    
    span.appendChild(time);

    brace.appendChild(span);

    return new_story;
};



// Return a new group_comment_creaated element reflecting the given v2 story
//
function buildGroupCommentCreated(base, avatar) {

    var new_story = buildGenericStory(avatar);
    
    new_story.className = "group_comment_created";
    
    var p = document.createElement("p");
    p.className = "mbn";
    
    var link = avatar.cloneNode(true);
    link.innerHTML = base.innerHTML.split(" ")[0];
    
    p.appendChild(link);
    
    p.innerHTML += " commented on ";
    
    p.appendChild(base.getElementsByTagName("a")[1].cloneNode(true));
    
    p.innerHTML += " in ";
    
    p.appendChild(base.getElementsByTagName("a")[2].cloneNode(true));
    
    p.innerHTML += ": ";
    
    var time = document.createElement("time");
    time.className = "timeago xxs q un nowrap";
    time.innerHTML = base.getElementsByTagName("span")[1].innerHTML;
    
    p.appendChild(time);

    var brace = new_story.querySelector("div.brace");
    
    brace.appendChild(p);
    
    p = document.createElement("p");
    p.className = "q mbn";
    p.innerHTML = base.getElementsByTagName("blockquote")[0].innerHTML;
    
    link = p.getElementsByTagName("a")[0];
    
    if (link != null) link.className = "xs i";
    
    var div = document.createElement("div");
    div.className = "mhs pts s";
    div.appendChild(p);
    
    brace.appendChild(div);
    
    return new_story;
};



// Return a new suggestion_created element reflecting the given v2 story
//
function buildSuggestionCreated(base, avatar) {

    var new_story = buildGenericStory(avatar);
    
    new_story.className = "suggestion_created";
    
    var p = document.createElement("p");
    p.className = "mbn";
    
    var link = avatar.cloneNode(true);
    link.innerHTML = base.innerHTML.split(" ")[0];
    
    p.appendChild(link);
    
    p.innerHTML += " created a new suggestion titled ";
    
    p.appendChild(base.getElementsByTagName("a")[0].cloneNode(true));
    
    p.innerHTML += ": ";
    
    var time = document.createElement("time");
    time.className = "timeago xxs q un nowrap";
    time.innerHTML = base.getElementsByTagName("span")[1].innerHTML;
    
    p.appendChild(time);

    var brace = new_story.querySelector("div.brace");
    
    brace.appendChild(p);
    
    p = document.createElement("p");
    p.className = "q mbn";
    p.innerHTML = base.getElementsByTagName("blockquote")[0].innerHTML;
    
    link = p.getElementsByTagName("a")[0];
    
    if (link != null) link.className = "xs i";
    
    var div = document.createElement("div");
    div.className = "mhs pts s";
    div.appendChild(p);
    
    brace.appendChild(div);
    
    return new_story;
};



// Return a new group_comment_created (for a Comment on a Suggestion) element reflecting the given v2 story
//
function buildSuggestionCommentCreated(base, avatar) {

    var new_story = buildGenericStory(avatar);
    
    new_story.className = "group_comment_created";
    
    var p = document.createElement("p");
    p.className = "mbn";
    
    var link = avatar.cloneNode(true);
    link.innerHTML = base.innerHTML.split(" ")[0];
    
    p.appendChild(link);
    
    p.innerHTML += " commented on “";
    
    p.appendChild(base.getElementsByTagName("a")[0].cloneNode(true));
    
    p.innerHTML += "” in the ";
    
    p.appendChild(base.getElementsByTagName("a")[1].cloneNode(true));
    
    p.innerHTML += ": ";
    
    var time = document.createElement("time");
    time.className = "timeago xxs q un nowrap";
    time.innerHTML = base.getElementsByTagName("span")[1].innerHTML;
    
    p.appendChild(time);

    var brace = new_story.querySelector("div.brace");
    
    brace.appendChild(p);
    
    p = document.createElement("p");
    p.className = "q mbn";
    p.innerHTML = base.getElementsByTagName("blockquote")[0].innerHTML;
    
    link = p.getElementsByTagName("a")[0];
    
    if (link != null) link.className = "xs i";
    
    var div = document.createElement("div");
    div.className = "mhs pts s";
    div.appendChild(p);
    
    brace.appendChild(div);
    
    return new_story;
};



// Return a new suggestion_created element reflecting the given v2 story
//
function buildVoteCreated(base, avatar) {

    var new_story = buildGenericStory(avatar);
    
    new_story.className = "vote_created";
    
    var p = document.createElement("p");
    p.className = "mbn";
    
    link = avatar.cloneNode(true);
    link.innerHTML = base.innerHTML.split(" ")[0];
    
    p.appendChild(link);

    var base_spans = base.getElementsByTagName("span");
    
    p.innerHTML += " " + base_spans[0].innerHTML;
    
    var time = document.createElement("time");
    time.className = "timeago xxs q un nowrap";
    time.innerHTML = base_spans[1].innerHTML;
    
    p.appendChild(time);
    
    var brace = new_story.querySelector(".brace");
    
    brace.appendChild(p);
    
    return new_story;
};



// Return a new video_comment_created element reflecting the given v2 story
//
function buildVideoCommentCreated(base, avatar) {

    var new_story = buildGenericStory(avatar);
    
    new_story.className = "video_comment_created";
    
    var brace = new_story.querySelector(".brace");
    
    var link = avatar.cloneNode(true);
    link.innerHTML = base.innerHTML.split(" ")[0];
    
    brace.appendChild(link);
    
    brace.innerHTML += " commented on one of ";
    
    brace.appendChild(base.getElementsByTagName("a")[0].cloneNode(true));
    
    brace.innerHTML += "'s ";
    
    link = base.getElementsByTagName("a")[0].cloneNode(true);
    link.href = link.getAttribute("href") + "/videos";
    link.innerHTML = "videos";

    brace.appendChild(link);
    
    brace.innerHTML += ": ";
    
    var base_spans = base.getElementsByTagName("span");
    
    var time = document.createElement("time");
    time.className = "timeago xxs q un nowrap";
    time.innerHTML = base_spans[1].innerHTML;
    
    brace.appendChild(time);
    

    var p = document.createElement("p");
    p.className = "mbn pts s q";
    p.innerHTML = base.getElementsByTagName("blockquote")[0].innerHTML;
    
    link = p.getElementsByTagName("a")[0];
    
    if (link != null) { 
        link.className = "q xs i";
        link.innerHTML = "view comment";
    }
    
    link = base_spans[2].getElementsByTagName("a")[0].cloneNode(true);
    link.className = "fl mrs pr un";
    
    var img = link.getElementsByTagName("img")[0];
    img.className = "video_sg s50";
    img.removeAttribute("width");
    
    var span = document.createElement("span");
    span.className = "picto for_video_sg s50";
    span.innerHTML = "4";
    
    link.appendChild(span);

    var div = document.createElement("div");
    div.className = "mhs mts group";
    div.appendChild(link);
    div.appendChild(p);
    
    brace.appendChild(div);
    
    return new_story;
};



// Return a new comment_created element reflecting the given v2 story
//
function buildCommentCreated(base, avatar) {

    var new_story = buildGenericStory(avatar);
    
    new_story.className = "comment_created";
    
    var p = document.createElement("p");
    p.className = "mbn";
    
    var link = avatar.cloneNode(true);
    link.innerHTML = base.innerHTML.split(" ")[0];
    
    p.appendChild(link);
    
    p.innerHTML += " commented on “";
    
    p.appendChild(base.getElementsByTagName("a")[0].cloneNode(true));
    
    p.innerHTML += "'s ";
    
    link = base.getElementsByTagName("a")[0].cloneNode(true);
    link.href = link.getAttribute("href") + "/pictures";
    link.innerHTML = "pic";

    p.appendChild(link);
    
    p.innerHTML += ": ";
    
    var base_spans = base.getElementsByTagName("span");
    
    var time = document.createElement("time");
    time.className = "timeago xxs q un nowrap";
    time.innerHTML = base_spans[1].innerHTML;
    
    p.appendChild(time);
    
    var brace = new_story.querySelector(".brace");
    
    brace.appendChild(p);
    
    p = document.createElement("p");
    p.className = "pts s q";
    p.innerHTML = base_spans[3].innerHTML;
    
    link = p.getElementsByTagName("a")[0];
    
    if (link != null) link.className = "q xs";
    
    link = base_spans[2].getElementsByTagName("a")[0].cloneNode(true);
    link.className = "fl mrs";
    
    var img = link.getElementsByTagName("img")[0];
    img.className = "picture s50 fl";
    img.removeAttribute("width");
    img.removeAttribute("height");

    updateContentServer(img);

    var div = document.createElement("div");
    div.className = "mhs mts group";
    div.appendChild(link);
    div.appendChild(p);
    
    brace.appendChild(div);
    
    return new_story;
};



// Return a new like_created (for Loved Writing) element reflecting the given v2 story
//
function buildLikeWritingCreated(base, avatar) {

    var new_story = buildGenericStory(avatar);
    
    new_story.className = "like_created";
    
    var brace = new_story.querySelector(".brace");
    
    var link = avatar.cloneNode(true);
    link.innerHTML = base.innerHTML.split(" ")[0];
    
    brace.appendChild(link);
    
    brace.innerHTML += " loved one of ";
    
    brace.appendChild(base.getElementsByTagName("a")[0].cloneNode(true));
    
    brace.innerHTML += "'s posts: ";
    
    var base_spans = base.getElementsByTagName("span");
    
    var time = document.createElement("time");
    time.className = "timeago xxs q un nowrap";
    time.innerHTML = base_spans[1].innerHTML;
    
    brace.appendChild(time);
    
    var p = document.createElement("p");
    p.className = "q mbn";
    p.innerHTML = base.getElementsByTagName("blockquote")[0].innerHTML;
    
    link = p.getElementsByTagName("a")[0];
    
    if (link != null) link.className = "xs i";
    
    var div = document.createElement("div");
    div.className = "mhs pts s";
    div.appendChild(p);
    
    brace.appendChild(div);
    
    return new_story;
};



// Return a new like_created (for a Loved Pic) element reflecting the given v2 story
//
function buildLikePictureCreated(base, avatar) {

    var new_story = buildGenericStory(avatar);
    
    new_story.className = "like_created";
    
    var brace = new_story.querySelector(".brace");
    
    var link = avatar.cloneNode(true);
    link.innerHTML = base.innerHTML.split(" ")[0];
    
    brace.appendChild(link);
    
    brace.innerHTML += " loved one of ";
    
    brace.appendChild(base.getElementsByTagName("a")[0].cloneNode(true));
    
    brace.innerHTML += "'s ";
    
    link = base.getElementsByTagName("a")[0].cloneNode(true);
    link.href = link.getAttribute("href") + "/pictures";
    link.innerHTML = "pictures";

    brace.appendChild(link);
    
    brace.innerHTML += ": ";
    
    var base_spans = base.getElementsByTagName("span");
    
    var time = document.createElement("time");
    time.className = "timeago xxs q un nowrap";
    time.innerHTML = base_spans[1].innerHTML;
    
    brace.appendChild(time);
    
    link = base_spans[2].getElementsByTagName("a")[0].cloneNode(true);
    link.className = "fl mrs";
    
    var img = link.getElementsByTagName("img")[0];
    img.className = "picture s50 fl";
    img.removeAttribute("width");
    img.removeAttribute("height");

    var div = document.createElement("div");
    div.className = "mhs mts group";
    div.appendChild(link);
    
    brace.appendChild(div);
    
    return new_story;
};



// Return a new like_created (for a Loved Video) element reflecting the given v2 story
//
function buildLikeVideoCreated(base, avatar) {

    var new_story = buildGenericStory(avatar);
    
    new_story.className = "like_created";
    
    var brace = new_story.querySelector(".brace");
    
    var link = avatar.cloneNode(true);
    link.innerHTML = base.innerHTML.split(" ")[0];
    
    brace.appendChild(link);
    
    brace.innerHTML += " loved one of ";
    
    brace.appendChild(base.getElementsByTagName("a")[0].cloneNode(true));
    
    brace.innerHTML += "'s ";
    
    link = base.getElementsByTagName("a")[0].cloneNode(true);
    link.href = link.getAttribute("href") + "/videos";
    link.innerHTML = "videos";

    brace.appendChild(link);
    
    brace.innerHTML += ": ";
    
    var base_spans = base.getElementsByTagName("span");
    
    var time = document.createElement("time");
    time.className = "timeago xxs q un nowrap";
    time.innerHTML = base_spans[1].innerHTML;
    
    brace.appendChild(time);
    
    link = base_spans[2].getElementsByTagName("a")[0].cloneNode(true);
    link.className = "fl mrs pr un";
    
    var img = link.getElementsByTagName("img")[0];
    img.className = "video_sg s50";
    img.removeAttribute("width");

    var span = document.createElement("span");
    span.className = "picto for_video_sg s50";
    span.innerHTML = "4";
    
    link.appendChild(span);

    var div = document.createElement("div");
    div.className = "mhs mts group";
    div.appendChild(link);
    
    brace.appendChild(div);
    
    return new_story;
};



// Return a new picture_created element reflecting the given v2 story
//
function buildPictureCreated(base, avatar) {

    var new_story = buildGenericStory(avatar);
    
    new_story.className = "picture_created";
    
    var p = document.createElement("p");
    p.className = "mbn";
    
    var link = avatar.cloneNode(true);
    link.innerHTML = base.innerHTML.split(" ")[0];
    
    p.appendChild(link);
    
    p.innerHTML += " uploaded a new picture: ";
    
    var base_spans = base.getElementsByTagName("span");
    
    var time = document.createElement("time");
    time.className = "timeago xxs q un nowrap";
    time.innerHTML = base_spans[1].innerHTML;
    
    p.appendChild(time);
    
    var brace = new_story.querySelector(".brace");
    
    brace.appendChild(p);
    
    p = document.createElement("p");
    p.className = "mbs q s i";
    p.innerHTML = base_spans[3].innerHTML;
    
    link = p.getElementsByTagName("a")[0];
    if (link != null) link.parentNode.removeChild(link);

    var div = document.createElement("div");
    div.className = "pts";
    div.appendChild(p);
    
    link = base_spans[2].getElementsByTagName("a")[0].cloneNode(true);
    link.className = "xs";
    link.innerHTML = "View Picture »";
    
    p = document.createElement("p");
    p.className = "mbn xxs q";
    p.appendChild(link);
    
    div.appendChild(p);
    
    p = div;
    
    link = base_spans[2].getElementsByTagName("a")[0].cloneNode(true);
    link.className = "fl mrs";
    
    var img = link.getElementsByTagName("img")[0];
    img.className = "picture s80 fl";
    img.removeAttribute("width");
    img.removeAttribute("height");
    img.src = img.src.replace("_60.jpg", "_110.jpg");

    updateContentServer(img);

    var div = document.createElement("div");
    div.className = "mhs mts group";
    div.appendChild(link);
    div.appendChild(p);
    
    brace.appendChild(div);
    
    return new_story;
};



// Return a new video_created element reflecting the given v2 story
//
function buildVideoCreated(base, avatar) {

    var new_story = buildGenericStory(avatar);
    
    new_story.className = "video_created";
    
    var p = document.createElement("p");
    p.className = "mbn";
    
    var link = avatar.cloneNode(true);
    link.innerHTML = base.innerHTML.split(" ")[0];
    
    p.appendChild(link);
    
    p.innerHTML += " uploaded a new ";
    
    link = document.createElement("a");
    link.href = base.getElementsByTagName("a")[0].getAttribute("href");
    link.innerHTML = "video";
    
    p.appendChild(link);
    
    p.innerHTML += ": ";
    
    var base_spans = base.getElementsByTagName("span");
    
    var time = document.createElement("time");
    time.className = "timeago xxs q un nowrap";
    time.innerHTML = base_spans[1].innerHTML;
    
    p.appendChild(time);
    
    var brace = new_story.querySelector(".brace");
    
    brace.appendChild(p);
    
    p = base_spans[3].getElementsByTagName("p")[0].cloneNode(true);
    p.className = "mbs s";
    p.getElementsByTagName("span")[0].className = "q i";
    
    var del = p.getElementsByTagName("a")[0];
    if (del != null) del.parentNode.removeChild(del);

    var div = document.createElement("div");
    div.className = "pts";
    div.appendChild(p);
    
    link = link.cloneNode(true);
    link.className = "xs";
    link.innerHTML = "View Video »";
    
    p = document.createElement("p");
    p.className = "mbn xxs q";
    p.appendChild(link);
    
    div.appendChild(p);
    
    p = div;
    
    link = base.getElementsByTagName("a")[0].cloneNode(true);
    link.className = "fl mrs pr un";
    
    var img = link.getElementsByTagName("img")[0];
    img.className = "video_sg s80";
    img.removeAttribute("width");

    var span = document.createElement("span");
    span.className = "picto for_video_sg s80";
    span.innerHTML = "4";
    
    link.appendChild(span);

    var div = document.createElement("div");
    div.className = "mhs mts group";
    div.appendChild(link);
    div.appendChild(p);
    
    brace.appendChild(div);
    
    return new_story;
};



// Return a new story element using the given avatar
//
function buildGenericStory(avatar) {

    var user = document.createElement("td");
    user.className = "user";
    
    user.appendChild(avatar.cloneNode(true));
    
    avatar = user.querySelector("img.profile_avatar");
    
    removeClass(avatar, "s60");
    addClass(avatar, "s35");
    avatar.setAttribute("width", "35");
    avatar.setAttribute("height", "35");
    avatar.src = avatar.src.replace("_60.jpg","_35.jpg");

    
    var story = document.createElement("td");
    story.className = "story";

    var brace = document.createElement("div");
    brace.className = "brace";
    
    story.appendChild(brace);
    
    
    var options = document.createElement("td");
    options.className = "options";
    
    var menu_item = document.createElement("a");
    menu_item.innerHTML = "Hot List Injected:<br>&nbsp; &nbsp; &nbsp; &nbsp; to gag them, just stop " + Verbs[1].toLowerCase() + " them";
    
    var menu = document.createElement("li");
    menu.appendChild(menu_item);
    menu_item = menu;
    
    menu = document.createElement("ul");
    menu.className = "open";
    menu.appendChild(menu_item);
    menu_item = menu;
    
    var sprite = document.createElement("a");
    sprite.className = "picto q story_options";
    sprite.href = "#";
    sprite.innerHTML = "x";
    
    menu = document.createElement("li");
    menu.appendChild(sprite);
    menu.appendChild(menu_item);
    menu_item = menu;
    
    menu = document.createElement("ul");
    menu.className = "pdv";
    menu.appendChild(menu_item);
    menu_item = menu;
    
    menu = document.createElement("div");
    menu.setAttribute("data-bind", "visible: customizeFeedEnabled() && page() != 'trends_feed'");
    
    if (document.querySelector("section.customize_feed form") == null)
    
        menu.setAttribute("style", "display: none;");
    
    menu.appendChild(menu_item);
    
    options.appendChild(menu);
    
    menu = document.createElement("div");
    menu.setAttribute("data-bind", "visible: !customizeFeedEnabled()");
    
    options.appendChild(menu);
    
    var new_story = document.createElement("tr");
    
    new_story.appendChild(user);
    new_story.appendChild(story);
    new_story.appendChild(options);
    
    return new_story;
};



// Approximate the timestamp for the given story from its timeago contents
//
function timeStamp(story, min_offset, min_age) {

    var date = new Date();
    
    var time = story.getElementsByTagName("time")[0];
    
    var timeago = time.innerHTML;
    
    if (timeago.match(/\d+ year[s]* ago/))
    
        date.setFullYear(date.getFullYear() - Number(timeago.match(/\d+/)[0]));
    
     else if (timeago.match(/\d+ month[s]* ago/))
     
        date.setMonth(date.getMonth() - Number(timeago.match(/\d+/)[0]));

     else if (timeago.match(/\d+ day[s]* ago/))

        date.setDate(date.getDate() - Number(timeago.match(/\d+/)[0]));

     else if (timeago.match(/\d+ hour[s]* ago/))

        date.setHours(date.getHours() - Number(timeago.match(/\d+/)[0]));

     else if (timeago.match(/\d+ minute[s]* ago/))

        date.setMinutes(date.getMinutes() - Number(timeago.match(/\d+/)[0]));

     else if (timeago.match(/\d+ second[s]* ago/))

        date.setSeconds(date.getSeconds() - Number(timeago.match(/\d+/)[0]));
        
    if (min_age != null) {
    
        min_age = new Date(min_age);
        
        if (date > min_age) date = min_age;
    };
        
    date.setSeconds(date.getSeconds() - min_offset);

    time.setAttribute("datetime", date.toUTCString());

};



// Compare the story/new_story with the one alreay_injected and answer if they're the same or not
//
function isDuplicateStory(new_story, already_injected) {

    var story_type = new_story.className;
    
    if (! hasClass(already_injected, story_type)) return false;
    
    new_story = new_story.querySelector("td.story div.brace");
    already_injected = already_injected.querySelector("td.story div.brace");
    
    switch (story_type) {
    
        case "group_comment_created":
        case "status_comment_created":
        case "post_comment_created":
        case "wall_post_created":
        
            if (new_story.getElementsByTagName("a")[1].href != already_injected.getElementsByTagName("a")[1].href) return false;

            var quote = new_story.querySelector("div.mhs p.mbn").cloneNode(true);
            var link = quote.getElementsByTagName("a")[0];

            if (link != null) link.parentNode.removeChild(link);
            quote = quote.innerHTML.trim();
            
            return (already_injected.innerHTML.indexOf(quote) != -1);

        case "comment_created":
        case "video_comment_created":
        
            if (new_story.querySelector("div.mhs a.fl.mrs").href != already_injected.querySelector("div.mhs a.fl.mrs").href) return false;
        
            var quote = new_story.querySelector("div.mhs p.pts").cloneNode(true);
            var link = quote.getElementsByTagName("a")[0];

            if (link != null) link.parentNode.removeChild(link);
            quote = quote.innerHTML.trim();
            
            return (already_injected.innerHTML.indexOf(quote) != -1);

        case "profile_updated":
        
            return (new_story.getElementsByTagName("a")[1].innerHTML == already_injected.getElementsByTagName("a")[1].innerHTML);

        case "rsvp_created":
        case "rsvp_updated":
        case "people_into_created":
        
            if (new_story.getElementsByTagName("a")[1].href != already_injected.getElementsByTagName("a")[1].href)
            
                return false;

            quote = new_story.querySelector("p.mbn").innerHTML.match(/<\/a>[\s\S]+<a/)[0];
            quote = quote.substr(4,quote.length - 6).trim();
           
            return (already_injected.innerHTML.indexOf(quote) != -1);

        case "group_membership_created":
        case "group_post_created":
        case "post_created":
        case "post_updated":
        case "status_created":
        case "suggestion_created":
        case "friend_created":
        case "promoted_to_group_leader":
        
            return (new_story.getElementsByTagName("a")[1].href == already_injected.getElementsByTagName("a")[1].href);

        case "picture_created":
        case "video_created":
        case "like_created":
        case "vote_created":
        case "event_created":
        
            return (lastNode(new_story.getElementsByTagName("a")).href == lastNode(already_injected.getElementsByTagName("a")).href);

        case "relationship_created":
        case "relationship_updated":
        case "ds_relationship_created":
        case "ds_relationship_updated":
        
            var quote = new_story.querySelector("div.brace p.mbn").cloneNode(true);

            var fluff = quote.getElementsByTagName("a")[0];
            if (fluff != null) fluff.parentNode.removeChild(fluff);

            fluff = quote.getElementsByTagName("time")[0];
            if (fluff != null) fluff.parentNode.removeChild(fluff);

            quote = quote.innerHTML.trim();
            
            if (already_injected.innerHTML.indexOf(quote) == -1) return false;
        
            var with_who = new_story.getElementsByTagName("a")[1];
            if (with_who != null) with_who.href.match(/\/users\/\d+/)[0];
        
            var with_already = already_injected.getElementsByTagName("a")[1];
            if (with_already != null) with_already.href.match(/\/users\/\d+/)[0];
            
            return (with_who == with_already);

        default:
        
            alert("Story type comparison not handled yet... " + story_type);

    };
    
    return false;

};



// Return an array of stories built from the given stories and avatar
//
//   if a story is built identical to the given already_injected story,
//   then stop building
//
function buildStoryCollection(stories, avatar, already_injected) {

    var collection = [];
    
    for(var i = 0; i < stories.length; i++) {
    
        var story = stories[i];

        var new_story = null;

        var story_time = story.getElementsByTagName("span")[1];

        if ((story_time != null) && (story_time.getElementsByTagName("a").length != 0))

            new_story = buildStatusCreated(story, avatar);

         else if (story.innerHTML.indexOf("statuses") != -1)

            new_story = buildStatusCommentCreated(story, avatar);
            
         else if (story.innerHTML.match(/ updated .*(his|her|their) profile/))

            new_story = buildProfileUpdated(story, avatar);

         else if (story.innerHTML.match(/ updated .*(his|her|their) websites/))

            new_story = buildWebsitesUpdated(story, avatar);

         else if (story.innerHTML.match(/ changed (his|her|their) profile picture /))

            new_story = buildAvatarChanged(story, avatar);

         else if (story.innerHTML.match(/ joined the group /))

            new_story = buildGroupMembershipCreated(story, avatar);
            
         else if (story.innerHTML.match(/ made a group leader /))

            new_story = buildPromotedToGroupLeader(story, avatar);
            
         else if (story.innerHTML.match(/ started a new discussion /))

            new_story = buildGroupPostCreated(story, avatar);
            
         else if (story.innerHTML.match(/ responded to [\s\S]+ thread titled [\s\S]+ in the group /))

            new_story = buildGroupCommentCreated(story, avatar);
            
         else if (story.innerHTML.match(/ created a new suggestion /))

            new_story = buildSuggestionCreated(story, avatar);
            
         else if (story.innerHTML.match(/ commented on [\s\S]+ in the[\s\S]+Suggestion Box/))

            new_story = buildSuggestionCommentCreated(story, avatar);
            
         else if (story.innerHTML.match(/ voted for [\s\S]+ suggestion/))

            new_story = buildVoteCreated(story, avatar);
            
         else if (story.innerHTML.match(/commented on [\s\S]+writing[\s\S]+ titled /))

            new_story = buildPostCommentCreated(story, avatar);
            
         else if (story.innerHTML.match(/updated (his|her|their) writing titled /))

            new_story = buildPostUpdated(story, avatar);
            
         else if (story.innerHTML.match(/uploaded a new picture/))

            new_story = buildPictureCreated(story, avatar);
            
         else if (story.innerHTML.match(/uploaded a new video/))

            new_story = buildVideoCreated(story, avatar);
            
         else if (story.innerHTML.match(/commented on [\s\S]+ pictures/))

            new_story = buildCommentCreated(story, avatar);
            
         else if (story.innerHTML.match(/commented on [\s\S]+ videos/))

            new_story = buildVideoCommentCreated(story, avatar);
            
         else if (story.innerHTML.match(/loved [\s\S]+ posts/))

            new_story = buildLikeWritingCreated(story, avatar);
            
         else if (story.innerHTML.match(/loved [\s\S]+ pictures/))

            new_story = buildLikePictureCreated(story, avatar);
            
         else if (story.innerHTML.match(/loved [\s\S]+ videos/))

            new_story = buildLikeVideoCreated(story, avatar);
            
         else if (story.innerHTML.match(/ posted a (note|journal entry|erotica) on (his|her|their) profile/))

            new_story = buildPostCreated(story, avatar);
            
         else if (story.innerHTML.match(/ wrote on [\s\S]+'s wall/))

            new_story = buildWallPostCreated(story, avatar);
            
         else if (story.innerHTML.match(/ is organizing /))

            new_story = buildEventCreated(story, avatar);

         else if (story.innerHTML.match(/ went from (is|might be) going to (is|might be) going to /))

            new_story = buildRSVPUpdated(story, avatar);

         else if (story.innerHTML.match(/ (is|might be) going to /))

            new_story = buildRSVPCreated(story, avatar);

         else if (story.innerHTML.match(/ is (curious about|into) /))

            new_story = buildPeopleIntoCreated(story, avatar);

         else if (story.innerHTML.match(/ went from [\s\S]+ to /))

            new_story = buildFetishUpdated(story, avatar);

         else if (story.innerHTML.match(/ became friends with /))

            new_story = buildFriendCreated(story, avatar);

         else if (story.innerHTML.match(/ changed (his|her|their) (D\/s |)relationship /))

            new_story = buildRelationshipUpdated(story, avatar);

         else if (story.innerHTML.search(/\S+  is /) == 0)

            new_story = buildRelationshipCreated(story, avatar);

         else if (story.innerHTML.match(/ changed (his|her|their) [\s\S]+ to [\s\S]+\./))

            new_story = buildOrientationUpdated(story, avatar);

         else if (story.innerHTML.match(/>supports FetLife</))

            new_story = buildSupportsFetLife(story, avatar);
            
            
        if (new_story == null) appendStatus("Unknown Story", "!", story.ownerDocument.location.href);
        
          else if ((already_injected != null) && isDuplicateStory(new_story, already_injected)) break;
          
          else collection.push(new_story);

    };
    
    return collection;
};



// Inject the stories contained in the given mini_feed,
//   each story's avatar should be based on the one given,
//   and (if view_more is given) the last story should include
//   a view_more link based on the one given
//
function injectStories(mini_feed, avatar, view_more, old_story) {

    var raw_feed = document.getElementById("stories");
    
    if (raw_feed == null) return;
    if ((raw_feed.firstChild != null) && (raw_feed.firstChild.nodeName == "TBODY")) raw_feed = raw_feed.firstChild;
    
    var injection_cache = document.getElementById("injection_cache");
    
    var stories = mini_feed.getElementsByTagName("li");
    
    stories = buildStoryCollection(stories, avatar, old_story);

    for(i = stories.length - 1; i != -1; --i)
    
        timeStamp(stories[i], i, mini_feed.getAttribute("timestamp"));
    
    if (view_more != null) {
    
        if (stories[0] != null)
        
            stories[0].setAttribute("feed_top", view_more.href);
    
        if (stories[11] != null) {
    
            var link = document.createElement("a");
            link.className = "view_more";
            link.href = view_more.href;
            link.innerHTML = "Dig Deeper";

            link.addEventListener("click", digDeeper, false);

            stories[11].querySelector("td.story").appendChild(link);
            
        };
    };

    for (var i = 0; i < stories.length; i++) {
    
        var new_story = stories[i];

        story_time = storyTime(new_story);
        
        if (story_time == null) {
        
            appendStatus("Error: No Story Time", "!", mini_feed.ownerDocument.location.href);
            continue;
            
        };
        
        addClass(new_story, "injected");
        
        if (raw_feed.getAttribute("aborting") == "feed cleared") {
            FrameQueue = [];
            break;
        };

        var old_stories = raw_feed.getElementsByTagName("tr");
        
        var j = indexOfStoryOlderThan(old_stories, story_time);

        if (j == -1) { 
        
            old_stories = injection_cache.getElementsByTagName("tr");
            
            j = indexOfStoryOlderThan(old_stories, story_time);
            
            if (j == -1) {
            
                injection_cache.appendChild(new_story);
            
                link = document.getElementById("stale_activity_link");
          
                removeClass(link, "hide");
          
                link = document.getElementById("inject_cached_link");
          
                if (link != null) removeClass(link, "hide");

                // #NOTE: DON'T add the listener to "raw_feed" as raw_feed may be the TBODY inside "stories" and not "stories" itself
    
                document.getElementById("stories").addEventListener("DOMNodeInserted", organizeStories, false);
              
              } else injection_cache.insertBefore(new_story, old_stories[j]);

          } else { 
          
              raw_feed.insertBefore(new_story, old_stories[j]);
	      
	      autoDig(new_story);
              
          };
        
    };
    
    loadNextFrame();
};



// Find the last (oldest) injected story associated with the given UID
//
function getLastStoryByUID(uid) {

    var injection_cache = document.getElementById("injection_cache");
    
    var stories = injection_cache.getElementsByTagName("tr");
    
    for(var i = stories.length - 1; i != -1; --i)
    
        if (stories[i].querySelector("td.user a").getAttribute("href").substr(7) == uid)
        
            return stories[i];


    stories = document.getElementById("stories");
    
    stories = stories.querySelectorAll("tr.injected");
    
    for(i = stories.length - 1; i != -1; --i)
    
        if (stories[i].querySelector("td.user a").getAttribute("href").substr(7) == uid)
        
            return stories[i];
            

    stories = document.getElementById("stories-" + uid);
    
    if (stories != null) return lastNode(stories.querySelectorAll("tr.injected"));
    
    return null;
};



// Find the first (most recent) injected story associated with the given UID
//
function getFirstStoryByUID(uid) {

    stories = document.getElementById("stories");
    
    stories = stories.querySelectorAll("tr.injected");
    
    for(var i = 0; i < stories.length; i++)
    
        if (stories[i].querySelector("td.user a").getAttribute("href").substr(7) == uid)
        
            return stories[i];


    stories = document.getElementById("stories-" + uid);
    
    if (stories != null) {
    
        stories = stories.querySelector("tr.injected");

        if (stories != null) return stories;
    };
    

    var injection_cache = document.getElementById("injection_cache");
    
    var stories = injection_cache.getElementsByTagName("tr");
    
    for(i = 0; i < stories.length; i++)
    
        if (stories[i].querySelector("td.user a").getAttribute("href").substr(7) == uid)
        
            return stories[i];

    return null;
};



// Process the loaded mini-feed and inject the stories into the main feed
//
function injectMiniFeed(e) {

    var iframe = e.target;
    
    if (iframe == null) iframe = e;
    
      else e.preventDefault();
    
    var mini_feed = iframe.contentDocument.getElementById("mini_feed");

    var uid = iframe.getAttribute("src");
    uid = uid.match(/\/users\/\d+/)[0].substr(7);

    if (mini_feed != null) {
    
        var avatar = iframe.contentDocument.querySelector("img.profile_avatar");
        
        if (avatar == null) return appendStatus("No Avatar", "!", iframe.src);
        
        var username = avatar.getAttribute("alt");
        
        if (username != null) associateNameWithUID(username, uid);
        
        displayStatus("Injecting " + uidToName(uid), ";");
        
        avatar = avatar.parentNode;
        
        var view_more = iframe.contentDocument.querySelector("#view_more #view_more_link a");
        
        var old_story = getFirstStoryByUID(uid);
        
        if (old_story != null) {

            var link = old_story.getAttribute("feed_top");
            
            if (link == view_more.href) mini_feed = null;
        };
        
        if (mini_feed != null)
        
            injectStories(mini_feed, avatar, view_more, old_story);
                
    } else appendStatus("No Feed for " + uidToName(uid), "!", "/conversations/with?with=" + uid);
    
    var hotlist = iframe.getAttribute("hot_list");
    
    hotlist = ((hotlist == null) || (hotlist.length == 0)) ? [] : hotlist.split(",");
    
    if (hotlist.length == 0) {
    
        displayStatus("Hot List Injected","i");
    
        iframe.parentNode.removeChild(iframe);
        
        var link = document.getElementById("hl_injector").getElementsByTagName("a")[0];
        removeClass(link, "hide");
        
        return;
    };
    
    var next_uid = hotlist.pop();
    
    iframe.setAttribute("hot_list", hotlist.toString());
    
    displayStatus(Verbs[2] + " " + uidToName(next_uid), "E");
    
    iframe.src = "/users/" + next_uid + "/activity";
};



// Check if we're *starting* with an empty feed (no friend activity shown)
//
//
function fixEmptyFeed(feed) {

    if (feed.querySelector("tr") != null) return;
    
    var hli_timestamp = document.createElement("tr");
    hli_timestamp.id = "hli_timestamp";
    hli_timestamp.className = "zerotime";
    
    var time = document.createElement("time");
    time.className = "timeago xxs q un nowrap";
    
    var zeroTime = new Date();
    
    zeroTime.setTime(0);
    
    time.setAttribute("datetime", zeroTime.toUTCString());
        
    hli_timestamp.appendChild(time);
                        
    feed.appendChild(hli_timestamp);
    
    var empty_feed_box = document.querySelector("div.boxshadow.paxl");
    
    var rock_bottom = document.querySelector("section.phxl");
    
    if ((empty_feed_box != null) && (rock_bottom != null)) {

        addClass(empty_feed_box, "hide");
        
        rock_bottom.setAttribute("data-bind", empty_feed_box.getAttribute("data-bind"));
        
        rock_bottom.removeAttribute("style");
    };

};



// Dig deeper into the linked activity feed
//
function digDeeper(e) {

    if (e.target == null) {
    
        var iframe = document.getElementById(e);
        
        var mini_feed = iframe.contentDocument.getElementById("mini_feed");
        
        var avatar = iframe.contentDocument.querySelector("img.profile_avatar");
        
        avatar = avatar.parentNode;
        
        var view_more = iframe.contentDocument.querySelector("#view_more #view_more_link a");
        
        injectStories(mini_feed, avatar, view_more);
        
        iframe.parentNode.removeChild(iframe);
        
        return;
    };
    
    // if this was called by an event listener,
    //  then we still have work to do to get an iframe
    //  with the stories of interest in a mini_feed

    e.preventDefault();
    
    switch (e.target.nodeName) {
    
        case "A":
    
            var link = e.target;
            
            var href = link.getAttribute("href");
            
            var uid = href.match(/\/users\/\d+/)[0].substr(7);
            
            var iframe = document.createElement("iframe");
            iframe.id = "digger_" + uid;
            iframe.style.display = "none";
            
            iframe.setAttribute("view_more", href);
            
            iframe.addEventListener("load", digDeeper, false);

            link.parentNode.insertBefore(iframe, link);
            
            link.parentNode.removeChild(link);
            
            iframe.src = href.substr(0, href.indexOf("/more"));
            
            break;
    
        case "IFRAME":
    
            var iframe = e.target;
            
            iframe.removeEventListener("load", digDeeper, false);
            
            var mini_feed = iframe.contentDocument.getElementById("mini_feed");
            
            var story_time = storyTime(iframe.parentNode);
            
            mini_feed.setAttribute("timestamp", story_time.toUTCString());
            
            var stories = mini_feed.getElementsByTagName("li");
            
            while(stories.length != 0) stories[0].parentNode.removeChild(stories[0]);
            
            mini_feed.setAttribute("digger_id", iframe.id);
            
            mini_feed.addEventListener("DOMNodeInserted", digDeeper, false);
            
            var link = iframe.contentDocument.querySelector("#view_more #view_more_link a");
            
            link.href = iframe.getAttribute("view_more");
            
            link.click();
            
            break;

        case "LI":
    
            var mini_feed = e.target.parentNode;
            
            mini_feed.removeEventListener("DOMNodeInserted", digDeeper, false);
            
            setTimeout((function (n) { return function () { digDeeper(n); } })(mini_feed.getAttribute("digger_id")), 100);
            
        default:
    };
};



// Start loading mini-feeds in the background and inject them into the main feed
//
function injectHotListMiniFeeds(e) {

    e.preventDefault();
    
    clearLog();

    displayStatus("Injecting...", "e");

    var stories = document.getElementById("stories");
    
    var hotlist = loadHotList();

    if (hotlist.length == 0)
    
        return displayStatus("Nothing to Inject", "!");
        
    fixEmptyFeed(stories);
    
    var first_uid = hotlist.pop();
    
    var iframe = document.createElement("iframe");
    iframe.id = "hot_list_injector";
    
    iframe.setAttribute("style", "display: none;");
    
    iframe.setAttribute("hot_list", hotlist.toString());
    
    stories.parentNode.insertBefore(iframe,stories);
    
    iframe.addEventListener("load", injectMiniFeed, false);
    
    displayStatus(Verbs[2] + " " + uidToName(first_uid), "E");

    iframe.src = "/users/" + first_uid + "/activity";
};



// Detected new stories being added
//
//      make sure injected stories are properly reordered and made visible
//
function organizeStories(e) {

    var feed = document.getElementById("stories");
    
    var cache = document.getElementById("injection_cache");
    
    // remove listener while we manipulate the nodes under the target
    
    feed.removeEventListener("DOMNodeInserted", organizeStories, false);
    
    var stories = feed.getElementsByTagName("tr");
    
    var injected = cache.getElementsByTagName("tr");
    
    var i = indexOfStoryOlderThan(injected, storyTime(lastNode(stories)));
    
    if (i == -1) i = injected.length;
    
    for(--i; i != -1; i--) {
    
        var story = injected[i];
    
        var j = indexOfStoryOlderThan(stories, storyTime(story));
        
        if (j == -1) break;  // this should never happen
        
        story.parentNode.removeChild(story);
        
        stories[j].parentNode.insertBefore(story, stories[j]);
        
        autoDig(story);
    };
    
    if (injected.length == 0) {

        // no more work to be done, no more listening required
        
        var link = document.getElementById("stale_activity_link");
        
        addClass(link, "hide");
        
        return;
    };
    
    // there are still stories left in the cache, start listening again
    
    feed.addEventListener("DOMNodeInserted", organizeStories, false);
    
};



// We've hit rock bottom
//
//      show any remaining injected activities and stop listening for more stories
//
function showStaleActivity(e) {

    e.preventDefault();
    
    addClass(e.target.parentNode.parentNode, "hide");

    var feed = document.getElementById("stories");
    
    feed.removeEventListener("DOMNodeInserted", organizeStories, false);
    
    var injection_cache = document.getElementById("injection_cache");
    
    removeClass(injection_cache, "hide");

};



// Create an invisible container to hold stories which need injection "after" the end of the displayed feed
//
function clearInjectionCache() {

    var feed = document.getElementById("stories");
    
    var old_cache = document.getElementById("injection_cache");

    var cache = document.createElement("table");
    cache.id = "injection_cache";
    
    cache.className = addClass(feed.className, "hide");
    
    if (old_cache == null) {
    
        feed.parentNode.insertBefore(cache, feed);
        feed.parentNode.insertBefore(feed, cache);
    } else {
    
        old_cache.parentNode.insertBefore(cache, old_cache);
        old_cache.parentNode.removeChild(old_cache);
    };

    var link = document.getElementById("stale_activity_link");

    addClass(link, "hide");

};



// Delete any appended status messages
//
function clearLog() {

    var status = document.querySelector("#hl_injector a.status");
    
    status = nextElement(status);
    
    while(status != null) {
    
        var next_status = nextElement(status);
        
        status.parentNode.removeChild(status);
        
        status = next_status;
    };
};



// Append a status message to the log
//
function appendStatus(message, picto, href) {

    var menu_item = document.getElementById("hl_injector");
    
    var span = document.createElement("span");
    span.className = "picto au2";
    span.innerHTML = picto;
    
    var link = document.createElement("a");
    link.className = "db un";
    link.appendChild(span);
    link.innerHTML += " " + message;
    
    link.title = message;
    
    if (href != null) { 
    
        link.href = href;
        
        link.title += "\n (" + href + ")";
    };
    
    menu_item.appendChild(link);

};



// Display the given status message
//
function displayStatus(message, picto) {

    var menu_item = document.getElementById("hl_injector");
    
    var link = menu_item.getElementsByTagName("a")[0];
    addClass(link, "hide");
    
    link = menu_item.querySelector("a.status");
    removeClass(link, "hide");
    link.innerHTML = "";
    
    var span = document.createElement("span");
    span.className = "picto au2";
    span.innerHTML = picto;
    
    link.appendChild(span);
    link.innerHTML += " " + message;
    
    link.title = message;

};



// Subfeed has changed, abort injection
//
function feedCleared() {

    var feed = document.getElementById("stories");
    
    feed.removeEventListener("DOMNodeInserted", organizeStories, false);
    
    var injector = document.getElementById("hot_list_injector");
    
    if (injector != null) {

        displayStatus("Aborting ...", "!");
        
        injector.parentNode.removeChild(injector);

        injector.setAttribute("aborting", "feed cleared");
        
        injector.removeAttribute("hot_list");
        
        if ((feed.firstChild != null) && (feed.firstChild.nodeName == "TBODY"))  feed = feed.firstChild;
        
        feed.setAttribute("aborting", "feed cleared");
    };
    
    clearInjectionCache();
    
    feed.removeAttribute("aborting");
    
    var menu_item = document.getElementById("hl_injector");
    
    var link = menu_item.querySelector("a.status");
    addClass(link, "hide");

    link = menu_item.getElementsByTagName("a")[0];
    removeClass(link, "hide");

};



// Add a listener to detect when the subfeed has changed
//
function hookFeedTitle() {

    var spans = document.getElementsByTagName("span");
    
    for (var i = 0; i < spans.length; i++)
    
        if (spans[i].getAttribute("data-bind") == "text: subfeedLabel()") break;
        
    if (i == spans.length) return alert("Subfeed Label Not Found!");
    
    spans[i].addEventListener("DOMSubtreeModified", feedCleared, false);

};



// Build a link for "Hit Rock Bottom" to reveal any remaining "stale" injected stories
//
function insertShowStaleActivityLink() {

    var link = document.createElement("a");
    link.href = "#";
    link.className = "xxl";
    link.innerHTML = "Show Stale Activity";
    
    link.addEventListener("click", showStaleActivity, false);
   
    var span = document.createElement("span");
    span.className = "l";
    span.appendChild(link);
    
    var list_item = document.createElement("li");
    list_item.className = "mbl lh4 hide";
    list_item.id = "stale_activity_link";

    list_item.setAttribute("data-bind", "visible: subfeed() == 'everything'");

    list_item.appendChild(span);
    
    list_item.appendChild(document.createElement("br"));
    
    span = document.createElement("span");
    span.className = "xs q";
    span.innerHTML = "A few injected activities were left hidden due to age."
    
    list_item.appendChild(span);
    
    var rock_bottom = document.querySelector("section.phxl");
    
    if (rock_bottom != null) rock_bottom = rock_bottom.querySelector("li.mbl.lh4");
    
    if (rock_bottom == "null") return alert("Rock Bottom Not Found!");
    
    rock_bottom.parentNode.insertBefore(list_item, rock_bottom);
};



// Build our UI link/status indicator and insert into the document
//
function insertInjectionLink() {

    var link = document.createElement("a");
    link.href = "#";
    link.className = "db un";
    
    var span = document.createElement("span");
    span.className = "picto au2";
    span.innerHTML = "s";
    
    link.appendChild(span);
    link.innerHTML += " Inject Hot List";
    
    link.addEventListener("click", injectHotListMiniFeeds, false);
    link.title = "click to start scanning your hot list and injecting activities";
    
    var menu_item = document.createElement("li");
    menu_item.id = "hl_injector";
    menu_item.setAttribute("data-bind", "visible: subfeed() == 'everything'");
    menu_item.appendChild(link);
    
    link = document.createElement("a");
    link.className = "db un status hide";

    span = document.createElement("span");
    span.className = "picto au2";
    span.innerHTML = "e";

    link.appendChild(span);
    link.innerHTML += " Injecting...";
    
    menu_item.appendChild(link);

    var menu = lastNode(document.querySelectorAll("#activity_feed_container nav ul li"));
    if (menu == null) return alert("Feed Menu Not Found!");
    
    menu.parentNode.appendChild(menu_item);

};



// Check if the given story has a "Dig Deeper" link
//  and auto-click it if we haven't hit "Rock Bottom" yet
//
function autoDig(story) {

    var link = story.querySelector("a.view_more");
              
    if (link == null) return;
    
    if (link.innerHTML != "Dig Deeper") return badViewMoreLink(link);
    
    var rock_bottom = document.getElementById("stale_activity_link");
    
    while (rock_bottom != null)

        if ((rock_bottom = rock_bottom.parentNode).nodeName == "SECTION") break;
	
    if (rock_bottom == null) return alert("No Bottom Found!");
    
    if ((rock_bottom.style != null) && (rock_bottom.style.display == "none"))
    
        link.click();

};



// A bad "view_more" link has creeped into injected stories
//  do our best to track down the source and notify the user
//
function badViewMoreLink(link) {

    appendStatus("Bad View More...", "!", link);

};



// Hide or delete elements on the page associated with
// "work-in-progress" or incompatible features
//
function hideWorkInProgress() {

    addGlobalStyle("td.story a.view_more {display: none;}");
    
    badViewMoreLink = (function () { return; });

};



// Main function
//
function init() {

    Verbs = GM_getValue("u" + getMyUID() + ".verbs", "Follow,Following,checking").split(",");
    
    var stories = document.getElementById("stories");
    
    if (stories == null) return profileHotListBadge();
    
    insertShowStaleActivityLink();
    
    insertInjectionLink();
    
    clearInjectionCache();
    
    hookFeedTitle();
    
    hideWorkInProgress();
    
};



// Call our main function.
//

init();

//end