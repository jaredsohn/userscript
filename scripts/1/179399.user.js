// ==UserScript==
// @name           DD_ Hide sections of Facebook
// @author   	   d4005
// @description    Hide sections of Facebook and previously read posts
// @run-at         document-end
// @match          https://www.facebook.com/*
// @include        https://www.facebook.com/*
// @grant          none
// @version        2.00
// ==/UserScript==

(function(){
	var timeout = 100;												//check every 100ms, once the page settles though, there'll be almost nothing todo until they scroll to get more
	var sections = [
		"rightCol",													//entire right hand side column
		"pagelet_friends_online",									//left hand side chat thing that shows who's online
		"listsNav",													//the section on the left entitled FRIENDS
		"appsNav",													//the section on the left entitled APPS
		"pagesNav",													//the section on the left entitled PAGES
		"groupsNav",												//the section on the left entitled GROUPS
		"developerNav",												//the section on the left entitled DEVELOPER
		"interestsNav",												//the section on the left entitled INTERESTS
		"pagelet_stream_pager",
		"pageFooter",
		"ChatTabsPagelet",
		"BuddylistPagelet",
		"navItem_app_2344061033",
		"endOfFeedPymlContainer"
	];
	var subjects = [
		"Suggested Post",
		"Recently Released Albums",
		"Upcoming Events",
		"Today's Birthdays",
		"your friends are playing"
	];
	var divsByTitle=[ { title:"you may like", parents:2 }
					];
	var LIlengthLastTime = -1;
	var DIVlengthLastTime = -1;
	function hide(elem,parents) {
		if(elem) {
			for(var i=0;i<parents;i++)
				elem = elem.parentNode;
			elem.style.display="none";
		}
	}

	function click(elem){var ev;
		ev=document.createEvent("MouseEvents");ev.initEvent("mousedown",true,true);	elem.dispatchEvent(ev);
		ev=document.createEvent("MouseEvents");ev.initEvent("click",true,true);		elem.dispatchEvent(ev);
		ev=document.createEvent("MouseEvents");ev.initEvent("mouseup",true,true);	elem.dispatchEvent(ev);
	}

	function clickCloseWhenItAppears() {

		//check if there are any Close buttons need clicking (following a hide)
		var hide1 = "This post is now hidden from your News Feed";

		var inputs = document.getElementsByTagName("input");	//get all the "input" elements
		for(var i=0;i<inputs.length;i++) {		//loop through them looking for a "Close" "button" one
			var input = inputs[i];
			var typ = input.getAttribute("type");
			var title = input.getAttribute("title");
			if(title && (title=="Close" || title=="Remove") && typ && typ=="button" && !input.getAttribute("already_clicked")) {
				try{
					var inp = input.parentNode.parentNode.parentNode.innerHTML;
					if(inp.indexOf(hide1) > -1) {
						click(input);	//finally it appeared, click it and stop this current timeout sequence by returning
						input.setAttribute("already_clicked","true");
						return;
					}
				}catch(e){}
			}
		}

		//some browsers use tag "button" with type "submit" instead of tag "input" and type "button"

		var buttons = document.getElementsByTagName("button");	//get all the "button" elements
		for(var i=0;i<buttons.length;i++) {		//loop through them looking for a "Close" "button" one
			var button = buttons[i];
			var typ = button.getAttribute("type");
			var title = button.getAttribute("title");
			if(title && (title=="Close" || title=="Remove") && typ && typ=="submit" && !button.getAttribute("already_clicked")) {
				try{
					var par = button.parentNode.parentNode.parentNode.innerHTML;
					if(par.indexOf(hide1) > -1) {
						click(button);	//finally it appeared, click it and stop this current timeout sequence by returning
						button.setAttribute("already_clicked","true");
						return;
					}
				}catch(e){}
			}
		}
		setTimeout(clickCloseWhenItAppears,10);
	}

	function executeFacebook() {

		//check if we selected a post's drop-down menu (meaning we want to hide this post), if so, automatically click it

		var as = document.getElementsByTagName("a");		//get all the "a" elements
		for(var i=0;i<as.length;i++) {		//loop through them looking for an ajaxify one with "I don't want to see this"
			var a = as[i];
			if(!a.getAttribute("already_clicked") && a.getAttribute("ajaxify") && a.textContent.indexOf("I don't want to see this")>-1) {
				a.setAttribute("already_clicked","true");
				click(a);		//now we've auto-clicked on the "I don't want to see this" link, there'll be a close button to look for
				setTimeout(clickCloseWhenItAppears,10);
			}
		}

		//deal with sections we don't want to see

		for(var i=0;i<sections.length;i++) {						//loop through looking for the sections by their id
			var section = document.getElementById(sections[i]);		//see if we found that section
			if(section)section.parentNode.removeChild(section);		//remove it from the DOM
		}

		//deal with posts we don't want to see (by subject)

		var posts = document.getElementsByTagName("li");			//get all the "LI" elements
		if(posts.length != LIlengthLastTime) {						//if there is a different number of them than there was last time we were here
			LIlengthLastTime = posts.length;						//record the count of them this time (for checking the next time)
			for(var i=0;i<posts.length;i++) {						//loop through them, some of which will be post stories
				var p = posts[i];
				if(p.id&&p.id.indexOf("stream_story_")>-1) {		//if this LI has an id, and it contains "stream_story"
					for(var h=0;h<subjects.length;h++) {			//then loop through all the post subjects we want to hide
						if(p.textContent.indexOf(subjects[h])>-1) {	//if this post contains this text from the subjectstohide array
							p.parentNode.removeChild(p);			//then remove it from the DOM
							break;									//and stop looping, we already found a reason to hide it and hid it
						}
					}
				}
			}
		}

		//deal with posts we don't want in another way

		var divs = document.getElementsByTagName("div");			//get all the "DIV" elements
		if(divs.length != DIVlengthLastTime) {						//if there is a different number of them than there was last time we were here
			DIVlengthLastTime = divs.length;						//record the count of them this time (for checking the next time)
			for(var i=0;i<divs.length;i++) {						//loop through them, some of which will be post stories
				var div = divs[i];
				for(var t=0;t<divsByTitle.length;t++) {
					if(div.title && div.title.toLowerCase().indexOf(divsByTitle[t].title)>-1) {	//if this DIV's title contains you may like, we don't like
						hide(div,divsByTitle[t].parents);			//then hide it
					}
				}
			}
		}
		setTimeout(executeFacebook,timeout);						//come back in 100ms
	}
	executeFacebook();
	setInterval(function(){LIlengthLastTime = DIVlengthLastTime = -1;},1000);
})();
