// ==UserScript==
// @name          Meebome (webchat) addition to flickr
// @namespace     http://e-chiceros.com/flickr/meebo
// @description   With meebome you can chat with any Meebo IM user from his/her photostream.
// @include       http://www.flickr.com/*
// @include       http://flickr.com/*
// ==/UserScript==

/* README *****************************************************************

Hi! I've writen a (I think) nice script to allow anybody to init a chat session from flickr. It integrates Del.icio.us, Meebo and Flickr... it has been very funny to write, hope you'll try it.

Of course, you will need to install it from here.

After that, you'll need a funcy Del.icio.us account: it's used as a way of sharing data between flickr's users. If in some moment you need to login on Del.icio.us do it, it's safe: the box comes from their website.

Go to http://del.icio.us and fill the "Sign up Now" form. You can choose any username and password for del.icio.us but please... remember it ^_^ Ok, first step done.
 
 
Now you need to sign in meebome. Go to http://www.mebomee.com and follow the forms... they're really really easy. Please, be sure to choose "regular size" for your widget (it's the default option, so stay calm). If you don't have a meebo account, just sign up for us in the second step of the registration. Okz! At the third step you will see something like this:
 
Take a look at the part marked with ah... huh... kinda circle. This is your meebome code. 

Now go to your home page and click on your icon: you'll see a "Register meebome code". Select it and paste *exactly* that code (cEUMMzwcgB in my example screenshot). 

Open meebo (http://www.meebo.com) and sign in with the meebome account. It's the greatest web application I've ever use after flickr ;-) A really powerful IM web client with an innovative design. The messages that you will *receive* will appear on this window.

Now you are a happy flickr meebome user! (aplauses).

You'll find the option "Try to Chat" under any other user icon and selecting it should open a chat box... no? perhaps you need to allow flickr to open new windows, and by the way, don't do it on a new tab (the Tools -> Options -> Tabs of Firefox is the place to change this).

Just tell me what do you thing about all this thing. Perhaps it's useful, or perhaps not... the script can be greatly improved but I was more interested in see how much time would I need to write it that in possible enhancements. Anyway, please please please, I'm looking for feedback (by the way, I haven't done too much testing!!).

Enjoy ;-)

ps: yes, yes, I'm still trying to learn English... ;-)

*/

GM_log('Iniciando FMeebo.');

var FLICKR_MEEBOME_CODE_PREFIX = "flickr:meebome:code:" ;

function postToDeliciousResponseReceived(request) {
    alert(request.responseText);
}



function postToDelicious(url, tags, description, listener) {
    if (!description) var description = "Empty.";
    if (!listener) var listener = postToDeliciousResponseReceived;
    var post = "https://api.del.icio.us/v1/posts/add?" + 
                "url=" +escape(url)+ "&" + 
                "description=" + escape(description) + "&" +
                "tags=" + escape(tags);
    GM_log("post: " + post);
    var request = GM_xmlhttpRequest({method: 'GET',url: post, onload: listener});
   
}

function getFromDeliciousResponseReceived(request) {
	alert(request.responseText);
}

function getFromDelicious(url, tags, listener) {

    if (!tags) var tags="";
    if (!listener) var listener = getFromDeliciousResponseReceived;
    var get = "https://api.del.icio.us/v1/posts/get?" + 
               "url=" +escape(url)+ "&" + 
               "tag=" + escape(tags);
    GM_log("get: " + get);
    var request = GM_xmlhttpRequest({method: 'GET',url: get, onload: listener});
}

function currentUserRegistered(request) {
    global_ahrefRegister.innerHTML = "Register again";
    unsafeWindow._ge('person_hover').hover_toggle_menu();
    if (request.status != 200) {
        alert("Registration failed :-(\n\n" + request.responseText);
    } else {
        GM_setValue("meebome_currentUserRegistered", true);
    }
}
unsafeWindow.currentUserRegistered = currentUserRegistered;

function getUserDeliciousURL(nsid) {
    return "http://www.flickr.com/" + nsid + "/meebome/code";
}

function registerCurrentUser(ahref) {
    global_ahrefRegister.innerHTML = "Registration in process";
    var code = prompt("Introduce your Meebome code, please");
    if (code != "") {
		postToDelicious(getUserDeliciousURL(unsafeWindow.global_nsid),
		                FLICKR_MEEBOME_CODE_PREFIX + code,
		                "Flickr user's meebome code.",
		                unsafeWindow.currentUserRegistered);
		ahref.innerHTML = "Registering";
    }
}
unsafeWindow.registerCurrentUser = registerCurrentUser;


function openChatWindow(code) {
    var box = document.createElement("embed");
    box.src = "http://widget.meebo.com/mm.swf?" + code;
    box.type= "application/x-shockwave-flash";
    box.width = 190;
    box.height = 275;
    
    var features = "left=500,top=150,innerHeight=285,innerWidth=203,menubar=no,toolbar=no,"+
                    "location=no,status=no,scrollbars=no,dialog=true,alwaysRaised=yes";
    var win = window.open("", "", features);
    win.document.getElementsByTagName("body").item(0).appendChild(box);
    unsafeWindow._ge('person_hover').hover_toggle_menu();
}

function chatWithResponseReceived(request) {
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(request.responseText, "application/xml");

    var tagNode = document.evaluate("/posts/post[1]/@tag", xmlDoc, null,
                 XPathResult.ANY_TYPE,null).iterateNext();
        
    if (tagNode == null) {
        alert("This user doesn't seems to be registered with fmeebo...");
    } else {
        var code = tagNode.value.substring(FLICKR_MEEBOME_CODE_PREFIX.length);
        openChatWindow(code);
    }
}

function chatWith(nsid) {
    getFromDelicious(getUserDeliciousURL(nsid), null, chatWithResponseReceived);
}
unsafeWindow.chatWith = chatWith;

function allowUserRegistration(container) {
	var currentUserRegistered = GM_getValue("meebome_currentUserRegistered", false);
	global_ahrefRegister = document.createElement("a");
	global_ahrefRegister.id = "personmenu_registerMeebome_link";
	global_ahrefRegister.className = "block";
	global_ahrefRegister.href="javascript:registerCurrentUser(this);";
	if (currentUserRegistered == false) {
		global_ahrefRegister.appendChild(document.createTextNode("Register Meebome code"));
    } else {
		global_ahrefRegister.appendChild(document.createTextNode("Register again"));
    }
	container.appendChild(global_ahrefRegister);
}

function allowChatWithOtherAvatar(container) {
	var ahrefChat = document.createElement("a");
	ahrefChat.id = "personmenu_chatMeebome_link";
	ahrefChat.className = "block";
	ahrefChat.href="javascript:chatWith(findTargetNSID());";
    ahrefChat.appendChild(document.createTextNode("Try to Chat"));
	container.appendChild(ahrefChat);
}

function findTargetNSID() {  
    // TODO: do it with regexp
    var nsid = "";
    // Find it on the stream page
    var element = document.getElementById("AtomRSS");
    if (element != null) {
        var chunk = element.innerHTML;
        var p0 = chunk.indexOf("id=") + "id=".length;
        var pf = chunk.indexOf("&");
        nsid = chunk.substring(p0, pf);
    } else {
        // on the avatar
        element = document.getElementById("personmenu_mail_link");
        if (element != null) {
            var chunk = element.href;
            var p0 = chunk.indexOf("?to=") + "?to=".length;
            nsid = chunk.substring(p0);
        } else { 
            //on any avalaible place!!!!
            element = document.evaluate("//*[@class='photosText']", document, null, 
                                               XPathResult.ANY_TYPE,null).iterateNext();
                                               
            if (element != null) {
                var chunk = element.id; 
                var p0 = "photosText_stream".length;
                var nsid = chunk.substring(p0);
            }
              
        }
    }
    
    
    return nsid;
}
unsafeWindow.findTargetNSID = findTargetNSID;

function allowChatWithOtherLinks(container) {
    var img = document.createElement("img");
    img.src = "/images/subnavi_dots.gif";
    img.height="11";
    img.width = "1";
    container.appendChild(img);
    
	var ahrefChat = document.createElement("a");
	ahrefChat.id = "personmenu_chatMeebome_link";
	ahrefChat.className = "block";
	ahrefChat.href="javascript:chatWith(findTargetNSID());";
    ahrefChat.appendChild(document.createTextNode("Chat"));
	container.appendChild(ahrefChat);
}

/* MAIN */

var global_yourMenu =  document.getElementById("person_menu_you_div");
var global_otherMenu =  document.getElementById("person_menu_other_div");

var global_linksList =  document.evaluate("//*[@class='Links']", document, null, 
                                           XPathResult.ANY_TYPE,null);
                                           
var global_links = (global_linksList) ? global_linksList.iterateNext() : null;

var global_contactList =  document.evaluate("//*[@class='rightSideContactChanger']", document, null, 
                                           XPathResult.ANY_TYPE,null);
                                           
var global_contact = (global_contactList) ? global_contactList.iterateNext() : null;


// In your own page...
if (global_yourMenu != null) {
    allowUserRegistration(global_yourMenu);
}

// In one of your pages, in the comments section
if (global_otherMenu != null) {
    allowChatWithOtherAvatar(global_otherMenu);
}


// In another's user photostream...
if (global_links != null) {
    allowChatWithOtherLinks(global_links);
}

// Looking at another user picture
if (global_contact != null) {
    allowChatWithOtherLinks(global_contact);
}

 /*


<!-- Beginning of meebo me widget code.
Want to talk with visitors on your page?  
Go to http://www.meebome.com/ and get your widget! -->
<embed src="http://widget.meebo.com/mm.swf?wnnxyOKzOp" type="application/x-shockwave-flash" 
width="190" height="275"></embed>

*/