// ==UserScript==
// @id             arch.413chan.net-580a3d1c-2425-453d-9c9f-1b9f1d6c0630@scriptish
// @name           4chan cap helper
// @version        3.77
var version = 3.77
// anybody with half a brain will tell you that duplicated variables like this is bad. Tough shit.
// @namespace      
// @author         subby
// @description    hides posts that are not selected with the tickbox, for capping
// @include        http://arch.413chan.net/*
// @include        *boards.4chan.org/*/thread/*
// @include        *archive.heinessen.com/*/thread/*
// @run-at         document-end
// ==/UserScript==
var postStyle = "";
var despoilcount = 0;
var heinessen = false;
function showPosts() {
    if(heinessen) {
        var posts = [].slice.call(document.getElementsByClassName("reply"));
        for (var i = 0; i < posts.length; ++i) {
            posts[i].parentNode.parentNode.parentNode.hidden = false;
        }
        //special case for OP
        var OP = document.getElementsByName("delete").item(0).parentNode.parentNode;
        OP.hidden = false;
        
    }
    else {
	   var posts = [].slice.call(document.getElementsByClassName("thread").item(0).childNodes);
	   posts[0].firstChild.style.display = postStyle;
	   posts[0].hidden = false;/*
	   posts[0].firstChild.firstChild.hidden = false;
	   posts[0].firstChild.childNodes.item(1).hidden = false;
	   posts[0].firstChild.childNodes.item(2).hidden = false;*/
	   for (var i = 1; i < posts.length; ++i) {
	   	posts[i].hidden = false;
	   }
	}
    startbutton.setAttribute('value', 'Hide unchecked posts'); // What the enduser sees on button
	startbutton.onclick = function() {
	   hidePosts();
	   onClick();
	};
	
}
function hidePosts() {
    if(heinessen) {
        var posts = [].slice.call(document.getElementsByClassName("reply"));
        for (var i = 0; i < posts.length; ++i) {
            if(posts[i].getElementsByTagName("label").item(0).firstChild.checked == true) {
                posts[i].getElementsByTagName("label").item(0).firstChild.checked = false;
            }
            else {
                posts[i].parentNode.parentNode.parentNode.hidden = true;
            }
        }
        //special case for OP
        var OP = document.getElementsByName("delete").item(0).parentNode.parentNode;
        if(OP.getElementsByTagName("label").item(0).firstChild.checked == true) {
            OP.getElementsByTagName("label").item(0).firstChild.checked = false;
        }
        else {
            OP.hidden = true;
        }
    }
	else {
    	var thread = document.getElementsByClassName("thread").item(0);
    	var posts = [].slice.call(thread.childNodes);
    	//check if 4chanx is enabled. 4chanx loads slower (or at least our canary does) so we do it here rather than at start.
    	var chanxenabled = 1;
    	if(document.getElementsByClassName("gecko fourchan_x").item(0) == null) {
    		chanxenabled = 0;
    	}
    	if(chanxenabled) {
    		//now lets find the inline posts from 4chanx
    		var xpostlist = document.getElementsByClassName("inline");
    		var xposts = [];
    		//and stick them in a static array
    		for (var i = 0; i < xpostlist.length; ++i) {
    			xposts[i] = xpostlist[i];
    		}
    		for(var i = 0; i < xposts.length; i++) {
    			var el = xposts[i].firstChild;
    			if(el.lastChild.childNodes.item(1).firstChild.checked == true) {
    				var postid = el.id;
    				postid = postid.substring(postid.indexOf("_pc")+1);
    				var postToGo = document.getElementById(postid);
    				postToGo.lastChild.childNodes.item(1).firstChild.checked = true;
    				el.lastChild.childNodes.item(1).firstChild.checked = false;
    				//moves the check from the inline reply to the actual reply
    			}
    			//special case for OP
    			else if(el.firstChild.childNodes.item(2).childNodes.item(1).checked == true) {
    				posts[0].lastChild.childNodes.item(2).childNodes.item(1).checked = true;
    				el.firstChild.childNodes.item(2).childNodes.item(1).checked = false;
    			}
    		}
    	}
    	//special case for OP
    	if(posts[0].lastChild.childNodes.item(2).firstChild.checked == true) {
    		posts[0].lastChild.childNodes.item(2).firstChild.checked = false;
    	}
    	else if (posts[0].lastChild.childNodes.item(2).childNodes.item(1).checked == true) {
    		posts[0].lastChild.childNodes.item(2).childNodes.item(1).checked = false;
    	}
    	else if (posts[0].lastChild.childNodes.item(1).firstChild.checked == true) {
    		posts[0].lastChild.childNodes.item(1).firstChild.checked = false;
    	}
    	else {
    		//save the default display style for showposts because I'm too lazy to find out what it is and make it constant
    		postStyle = posts[0].firstChild.style.display;
    		posts[0].hidden = true;
    	}
    	//if post "i" does not have a checked box, hide it.
    	for(var i=1; i < posts.length; i++) {
    	   if(posts[i].id != "unread-line") {
    		   if(posts[i].lastChild.childNodes.item(0).firstChild.checked == false) { 
    			 posts[i].hidden = true;
    		   } 
    		   else {
    			 posts[i].lastChild.childNodes.item(0).firstChild.checked = false;
    	   	   }
    		}
    	}
	}
	startbutton.setAttribute('value', 'Reveal hidden posts'); // What the enduser sees on button
	startbutton.setAttribute('name', 'gottagofast');
	startbutton.onclick = function() {
		showPosts();
		onClick();
	};
}
function removeSpoilers() {
	var s = document.createElement("style");
	s.innerHTML = "s, s a:not(:hover) {background: none repeat scroll 0% 0% #000000 ! important;color: #ffffff ! important;text-decoration: none;} .spoiler {background: none repeat scroll 0% 0% #000000 ! important;color: #ffffff ! important;text-decoration: none;}";
	s.setAttribute("id","despoilsheet"+despoilcount);
	document.getElementsByTagName("head")[0].appendChild(s);
	document.getElementById("styleSelector").setAttribute("onchange" , "document.getElementById('despoilsheet" + despoilcount + "').disabled = true; setActiveStyleSheet(this.value);document.getElementById('despoilbutton').click(); return false;");
	despoilcount++;
	despoil.setAttribute('value', 'Hide spoilers'); // What the enduser sees on button
	despoil.onclick = function() {
		returnSpoilers();
		onClick();
	};
}
function returnSpoilers() {
	var s = document.createElement("style");
	s.innerHTML = "s, s a:not(:hover) {background: none repeat scroll 0% 0% #000000 ! important;color: #000000 ! important;text-decoration: none;} .spoiler {background: none repeat scroll 0% 0% #000000 ! important;color: #000000 ! important;text-decoration: none;}";
	s.setAttribute("id","despoilsheet"+despoilcount);
	document.getElementsByTagName("head")[0].appendChild(s);
	document.getElementById("styleSelector").setAttribute("onchange" , "document.getElementById('despoilsheet" + despoilcount + "').disabled = true; setActiveStyleSheet(this.value); return false;");
	despoilcount++;
	despoil.setAttribute('value', 'Show spoilers'); // What the enduser sees on button
	despoil.onclick = function() {
		removeSpoilers();
		onClick();
	};
}
function removeBacklinks() {
	var nodelist = document.getElementsByClassName("container");
	var backlinks = [];
	for (var i = 0; i < nodelist.length; ++i) {
		backlinks[i] = nodelist[i];
	}
	for (var i = 0; i < backlinks.length; ++i) {
		backlinks[i].hidden = true;
	}
}
// find the bottom
var bottom = document.getElementsByClassName("absBotText").item(0);
if(window.location.href.indexOf("archive.heinessen.com") != -1) {
    bottom = document.getElementsByClassName("content").item(0);
    heinessen = true;
}
bottom.innerHTML = bottom.innerHTML + '<br>4chan Cap Helper is running, Version: ' + version + ' You can always find the latest version of 4chan Cap helper at <a rel="nofollow" target="_top" href="http://userscripts.org/scripts/show/147520">userscripts.org</a><br>';
// init hideposts button
var startbutton = document.createElement('input');
startbutton.setAttribute('type', 'button');
startbutton.setAttribute('value', 'Hide unchecked posts'); // What the enduser sees on button
startbutton.setAttribute('name', 'gottagofast');
startbutton.onclick = function() {
	hidePosts();
	onClick();
};
bottom.appendChild(startbutton);
// init despoil button
var despoil = document.createElement('input');
despoil.setAttribute('id', 'despoilbutton');
despoil.setAttribute('type', 'button');
despoil.setAttribute('value', 'Show spoilers'); // What the enduser sees on button
despoil.setAttribute('name', 'despoiler');
despoil.onclick = function() {
	removeSpoilers();
	onClick();
};
bottom.appendChild(despoil);
// init remove backlinks button
if(!heinessen) {
    var remBack = document.createElement('input');
    remBack.setAttribute('type', 'button');
    remBack.setAttribute('value', 'Remove Backlinks'); // What the enduser sees on button
    remBack.setAttribute('name', 'rembacklinks');
    remBack.onclick = function() {
    	removeBacklinks();
    	onClick();
    };
}
bottom.appendChild(remBack);