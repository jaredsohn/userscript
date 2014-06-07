// ==UserScript==
// @name		Facepunch: Alternate Quick Reply Box
// @description	Adds a floating reply box to Facepunch forums
// @author		Vampired (http://forums.facepunchstudios.com/Vampired)
// @include		http://forums.facepunchstudios.com/showthread.php*
// @version		1.0.2
// ==/UserScript==


/*

Features

# Hotkey to open
# Follows window while you scroll.
# Emote and tags list
# Press tab to insert a tab (4 spaces?)
# Edit and post replies without leaving the page
# Quote multiple posts at once without leaving the page
# Confirmation to clear textbox before exitting page
# Button to pop up a preview window
# Does nothing if the thread is locked.
# Reply buttons still work if you want to open in a new tab or window.
# The window fucking slides from the bottom of the screen!

*/

// Helper functions


// These are a few functions to make life easier

function $(el)
{
	if(typeof el == "string")
		return document.getElementById(el);
	return el;
}


function $x(xpath)
{
	var item, arr = [], xpr = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for(var i = 0; item = xpr.snapshotItem(i); i++)
		arr.push(item);
	return arr;
}

function $X(xpath)
{
	var arr = $x(xpath);
	return (arr.length == 0 ? null : (arr.length == 1 ? arr[0] : arr));
}

function $A(iterable)
{
	if (!iterable)
		return [];
	if (iterable.toArray)
		return iterable.toArray();
	var length = iterable.length || 0, results = new Array(length);
	while (length--)
		results[length] = iterable[length];
	return results;
}

Function.prototype.bind = function()
{
	var __method = this, args = $A(arguments), object = args.shift();
	return function()
	{
		return __method.apply(object, args.concat($A(arguments)));
	}
} 

// Easy adding events and DOM elements

var Event = {
	add: function(t, ev, fn)
	{
		$(t).addEventListener(ev, fn, false)
	},
	remove: function(t, ev, fn)
	{
		$(t).removeEventListener(ev, fn, false)
	}
};
var Dom = {
	add: function(dest, type)
	{
		var el = document.createElement(type);
		var dest = $(dest);
		dest.appendChild(el);
		return el;
	},
	addBefore: function(dest, type)
	{
		var dest = $(dest);
		var parent = dest.parentNode;
		
		var newel = document.createElement(type);
		parent.insertBefore(newel, dest)
		return newel;
	},
	addAfter: function(dest, type)
	{
		var dest = $(dest);
		var parent = dest.parentNode;
		
		var newel = document.createElement( type );
		parent.insertBefore(newel, dest.nextSibling)
		return newel;
	},
	addText: function(dest, text)
	{
		var node = document.createTextNode(text);
		$(dest).appendChild(node);
		return node;
	},
	remove: function(el)
	{
		var el = $(el);
		el.parentNode.removeChild(el);
	},
	removeAll: function(el)
	{
		el = $(el);
		if(el.hasChildNodes())
		{
			while(el.childNodes.length >= 1)
			{
				Dom.remove(el.firstChild);
			} 
		}
	}
}


function getChildrenByTagName(el, tagname)
{
	var children = [];
	for(var i = 0; i < el.childNodes.length; i++)
	{
		if(el.childNodes[i].nodeName.toLowerCase() == tagname.toLowerCase())
		{
			children.push(el.childNodes[i]);
		}
	}
	return children;
}

function log(str)
{
	if(unsafeWindow.console)
		unsafeWindow.console.log(str);
}

function trim(str)
{
	return str.replace(/^[\s]+/g, "").replace(/[\s]+$/g, "");
}

function left(hay, needle)
{
	return hay.substr(0, needle.length) == needle;
}

function quad_in(p, start, end)
{
	return (end-start)*p*p + start;
}
function quad_out(p, start, end)
{
	return -(end-start)*p*(p-2) + start
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Convert images to base64 strings
// Thanks, http://www.famfamfam.com/lab/icons/silk/
// And, http://www.greywyvern.com/code/php/binary2base64

var bg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAIklEQVQ4jWNkYGB4xkBFwERNw0YNHDVw1MBRA0cNHEoGAgAxHgEO2fqKUQAAAABJRU5ErkJggg%3D%3D"
var closebtn = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIhSURBVDjLlZPrThNRFIWJicmJz6BWiYbIkYDEG0JbBiitDQgm0PuFXqSAtKXtpE2hNuoPTXwSnwtExd6w0pl2OtPlrphKLSXhx07OZM769qy19wwAGLhM1ddC184+d18QMzoq3lfsD3LZ7Y3XbE5DL6Atzuyilc5Ciyd7IHVfgNcDYTQ2tvDr5crn6uLSvX+Av2Lk36FFpSVENDe3OxDZu8apO5rROJDLo30+Nlvj5RnTlVNAKs1aCVFr7b4BPn6Cls21AWgEQlz2+Dl1h7IdA+i97A/geP65WhbmrnZZ0GIJpr6OqZqYAd5/gJpKox4Mg7pD2YoC2b0/54rJQuJZdm6Izcgma4TW1WZ0h+y8BfbyJMwBmSxkjw+VObNanp5h/adwGhaTXF4NWbLj9gEONyCmUZmd10pGgf1/vwcgOT3tUQE0DdicwIod2EmSbwsKE1P8QoDkcHPJ5YESjgBJkYQpIEZ2KEB51Y6y3ojvY+P8XEDN7uKS0w0ltA7QGCWHCxSWWpwyaCeLy0BkA7UXyyg8fIzDoWHeBaDN4tQdSvAVdU1Aok+nsNTipIEVnkywo/FHatVkBoIhnFisOBoZxcGtQd4B0GYJNZsDSiAEadUBCkstPtN3Avs2Msa+Dt9XfxoFSNYF/Bh9gP0bOqHLAm2WUF1YQskwrVFYPWkf3h1iXwbvqGfFPSGW9Eah8HSS9fuZDnS32f71m8KFY7xs/QZyu6TH2+2+FAAAAABJRU5ErkJggg%3D%3D";
var loadingbtn = "data:image/gif;base64,R0lGODlhEAAQAPIAAAAAAP///zw8PLy8vP///5ycnHx8fGxsbCH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA%3D%3D";
var codetag = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEXSURBVDjLY/j//z8DJZhhmBpg2POQn2wDDDof8HvOe3osYtXzDzCxuM2vP3gvfn4MJIfXAP22e0Ies58eK9r2+r//3Kf3YOIhq17eK9v95j9ITrv2jhBWA/Ra7kVEr375vXDrq/9+s57eUy+4IY0kJx2w6Nk9kFzE0uffgXIRKAboNtxlC1/+/GPljjdABc9+q+ZcM0Z3qmb5LWOQXOmml/8DZz7+qJB0hQ3FBerFNyNC5z/9nrXqxX+Pvgf35OMuSSPJSXtPfXQPJBc089F3oFwE1jBQTLkiZNtw51jq4qf/XVvuwsPAa9Kjexkrnv8HyclFXxTCGwsyERf4LctvHvPuvAePBf8pDz/Y1N45BpIbKUmZFAwAR3nW32nUrY0AAAAASUVORK5CYII%3D";
var emote = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJcSURBVDjLpZPNS9RRFIaf+5tx/JqxUZGKQtEkyJBKw1ZhG0mSFkW1aVW7Wgpusv4CoX20KIgIKowgZSgwrIVghFQbM2swQRM/xmx05jf33nNaBJNWtKizPJzzcDjv+xpV5X8q+mvDPTdxVXpV6BahQxVUGBchpcL1xEnNbp43my9wz02nCrdMfV+jSXagsRpQj+aW8JkJwg8DaREuVJ/S0d8AbsSc0mTnYLDjPFqxDb8xiYTLqMuDKSMoa8bYgPDzA8KF0dN15/RREWBHTI0qM5HWe3EJ1vD5NNhviAtRn/8BEcWU1hMpbeXr2MWsCA07z+tKAKBCb9DQH9cYSJgGt87I4yWQAvgCL56B2Cxu7R0+/EjFvv64eHoBAgARekz1ESSfRl0OFcuxE+WoWNRbjnZmUQlRm8Wtviaa3It4eooqiNBCaRWSW2X6bTWYBJhf5FFF3Qq7a54CId7TWASokFOXj+EdNQ3tVNTuwQSRrfviWV94g64NgSoiRH5e4EljcwchRmU8R2J7M0G0ZAvA2xC/PIwJKhAfxYZMb/7BkF2awMTqCcJR7MYcsNmhil37CMv3iVYdILc0gy0wVJQxM2jqRPgUP3InLvY9bn2GSLKHkmQbqCdcfElh9iaR8l2YquPMPLmUdZamQ1d0sWikxfvmTLSu60FZ/WmIfMNlXuFzc6jLY6IJIomDeJrITA6TmUqdbevXh79Zef6u6RLPjcqWvsZY7X6CkgDE4ULP+vwUX8YG0s5yuf2qpv6YBYDZ2yYunj4Rur2nwxXAWcadJeUsA4ev/SVM/1LfAVOtXW4xpbWpAAAAAElFTkSuQmCC";

var pencil = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFUSURBVDjLrZM/SAJxGIZdWwuDlnCplkAEm1zkaIiGFFpyMIwGK5KGoK2lphDKkMDg3LLUSIJsSKhIi+684CokOtTiMizCGuzEU5K3vOEgKvtBDe/2Pc8H3x8NAM1fQlx4H9M3pcOWp6TXWmM8A7j0629v1nraiAVC0IrrwATKIgs5xyG5QiE+Z4iQdoeU2oAsnqCSO1NSTu+D9VhqRLD8nIB8F0Q2MgmJDyipCzjvYJkIfpN2UBLG8MpP4dxvQ3ZzGuyyBQ2H+AnOOCBd9aL6soh81A5hyYSGWyCFvxUcerqI4S+CvYVOFPMHxLAq8I3qdHVY5LbBhJzEsCrwutpRFBlUHy6wO2tEYtWAzLELPN2P03kjfj3luqDycV2F8AgefWbEnVqEHa2IznSD6BdsVDNStB0lfh0FPoQjdx8RrAqGzC0YprSgxzsUMOY2bf37N/6Ud1Vc9yYcH50CAAAAAElFTkSuQmCC";
var comment_add = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGkSURBVDjLrZJPKINhHMd3UsrJTcpBDi6UC+3ookQ5OOBAaCh2cFQ40GqTzURTihI54DRp8dqBg3BQw5BtNmxe/4flT9re5+v3vJvF2l6Kp749Pe/7fj7P7/09jwqA6i9R/ZugVr+cSZmlvFOgEIGSl0xgnVt3IRyRoDSWtn1c4qakxQW0yKBEJMbw+MpwHWIQnxgCDwxnQQbvHYP7RoLnJirvntrkkuKvghytZU1+eUWg+MjgJ/j0nuEkBh9dSTgQo4KB+R0uqEgquCD4PBiDbxlc11HYSfBuILUg/gu8fB/t6rmVcEzw4aWEfYIdAS6IyILe6S0uUCdtIpd8Hbwah1+SxQlNTE91jJHPI5tcPoiLrBsL6BxrQOtQFep0pc/lXYU9P14kkngugy/onxlF30ITlpwWOEQB5tV21JgLUNKRZVSCTeM2J6/kuV5fFrbuD8N6OCJXY7S3wGxv44K3VHAuxUvR8HVldxFszolvvVncs3DB7+67Wpv9Nig0Qy80yrB+pVG5gsTQh7pqYz5Mgkbemc98rdiDJBIDJcTLjs0G/vwDCw/6dFwBuzsAAAAASUVORK5CYII%3D";

var facepunch = "http://forums.facepunchstudios.com/";

var MODE_NONE = 0;
var MODE_POST = 1;
var MODE_EDIT = 2;

// Code begins.

var QuickReply = {
	
	// Vars ////////////////////
	
	versionString: "1.0.2, 2009-01-02",
	
	awaitingAJAX: false,
	posting: false,
	scrolledEnough: false,
	open: false,	// window open?
	threadid: -1,
	postid: -1,		// if editting post
	postmode: MODE_NONE,
	
	generatedEmotes: false,
	generatedTags: false,
	
	window: null,	// main window
	textbox: null,	// textarea
	loading: null,	// loading image, to show and hide
	posticon: null, // posting or editting icon.
	form: null,		// form element
	previewWin: null,
	
	// ajax
	
	ajax_lastpost: null,	// time in seconds of last post (from unsafeWindow)
	ajax_allow: true,		// if we're not on the last page (from unsafeWindow)
	ajax_sucks: false,		// if errors, resubmit form with this set to true
	
	// animation
	
	anim_starttime: 0,	// start time
	anim_startval: 0,	// starting value
	anim_current: 0,	// current value
	anim_endval: 0,		// end value
	anim_length: 2000,	// time in ms to slide
	anim_func: null, 	// function to use (percent, startval, endval)
	anim_timeout: null, // timeout object(?)
	
	options: {
		popuponscroll: false,
		keycommand: 114,	// r
		tabtotab: true,
	},
	
	
	// Functions ///////////////
	
	init: function()
	{
		// qr_threadid is a hidden element of the quick reply form, its value stores
		// the thread id. Lets nab it.
		this.threadid = $("qr_threadid").value;
		
		// Grab the lastpost time from document in seconds
		this.ajax_lastpost = unsafeWindow.ajax_last_post;
		this.ajax_allow = unsafeWindow.allow_ajax_qr;
		
		
		// Add new reply button after all existing reply buttons
	
		this.setupReplyButtons();
		
		// Setup page
		this.setupPage();
		
		this.createReplyWindow();
		
		// Confirmation box to exit page.
		Event.add(window, "beforeunload", this.event_beforeUnload.bind(this));
		Event.add(window, "keypress", this.event_keypress.bind(this));
		Event.add(window, "mousemove", this.event_mousemove.bind(this));
		
		if(this.options.popuponscroll)
			Event.add(window, "scroll", this.event_scroll.bind(this));
	},
	
	setupReplyButtons: function()
	{
		// XPath yum yum :)		divs where class = postbit####
		var posts = $x("//div[starts-with(@class,'postbit')]");
		
		for(var i=0; i < posts.length; i++)
		{
			// When new posts are added from AJAX, this function is run again.
			// We don't want to mess with posts we've already gone through.
			// Just assign a temp var to the object and ignore if it's already set.
			
			if(posts[i].v_alternateQuickReply)
				continue;
			
			this.insertNewReplyButton(posts[i]);
			posts[i].v_alternateQuickReply = true;
		}
	},
	
	setupPage: function()
	{
		var div = Dom.addBefore("qrform", "div");
		div.style.borderLeft = div.style.borderRight = "1px solid #888888";
		div.style.textAlign = "center";
		div.className = "panelsurround";
		
		var input = Dom.add(div, "input");
		input.type = "button";
		input.value = "Quick Reply (Ctrl-"+String.fromCharCode(this.options.keycommand)+")";
		input.setAttribute("style", "margin: 20px auto; height: 50px; background-color: #88CCFF; width: 90%");
		Event.add(input, "click", this.event_replyclick.bind(this));

		document.body.style.marginBottom = "100px";
		
		// hide default form.
		$("qrform").style.display = "none";


	},
	
	insertNewReplyButton: function(post)
	{
		// Post id
		var id = post.id.substr(4);	// Should be a string of numbers
		
		// Get div children of this element.
		// There should be 4 with classnames
		// header, userinfo, message, footer respectively.
		// todo: do this with xpath?
		var children = getChildrenByTagName(post, "div");
		
		// Now we loop through all the divs of footer.
		var buttons = getChildrenByTagName(children[3], "div");
		
		for(var i=0; i<buttons.length; i++)
		{
			var btn = buttons[i];
			// ignore divs which aren't cbutton class
			if(btn.className != "cbutton") continue;
			
			if(btn.firstChild.href.indexOf("editpost.php") > -1) // edit button :D
			{
				// Remove 'onclick= blah blah'
				// but keep the a href link so we can permalink to it or whatever
				btn.setAttribute("onclick", "");
				
				Event.add(btn, "click", function(ev)
				{
					QuickReply.editPost(id);
					
					ev.stopPropagation();
					ev.preventDefault();
				});
			}
			else if(btn.firstChild.href.indexOf("newreply.php") > -1) // reply
			{
				btn.setAttribute("onclick", "");
				// When we click reply button...
				
				Event.add(btn, "click", function(ev)
				{
					QuickReply.quotePost(id);
					
					ev.stopPropagation();
					ev.preventDefault();
				});
			}
		}
	
	},
	
	generateEmoteBar: function()
	{
		this.generatedEmotes = true;
		
		var emotebar = $("qr2_emotebar");
		var container = Dom.add(emotebar, "div");
		
		for(var i=0; i<emotes.length; i++)
		{
			var a = Dom.add(container, "a");
			
			if(emotes[i][2])
			{
				a.style.backgroundColor = "#ffffff";
				a.style.padding = "1px";
			}
			a.href = "javascript:qr2_insertText('"+emotes[i][0]+"');";
			
			var img = Dom.add(a, "img");
			img.src = "/images/smilies/"+emotes[i][1];
			img.title = emotes[i][0];
		}
	},
	generateTagBar: function()
	{
		this.generatedTags = true;
		
		var tagbar = $("qr2_tagbar");
		var container = Dom.add(tagbar, "div");
		
		for(var i=0; i<bbcode.length; i++)
		{
			var tag = bbcode[i].replace(/&/, "");
			var tagdisplay = bbcode[i].replace(/&(.)/, "<u>$1</u>");
			
			
			var a = Dom.add(container, "a");
			a.innerHTML = tagdisplay;
			a.href = "javascript:qr2_insertTag('"+tag+"');";
		}
	},
	
	createReplyWindow: function()
	{
		this.window = Dom.add(document.body, "div");
		this.window.id = "qr2_main";
		
		GM_addStyle([
		"#qr2_main{ padding:10px; background:transparent url('"+bg+"') repeat scroll 0px 0px; position:fixed; bottom:-300px; left:0px; width:100%; z-index:50; border-top:2px solid #666666;  }",
		
		"#qr2_main .container{ width:92%; margin:5px auto; }",
		"#qr2_main td{ font-family: Tahoma; font-size: 11px; color: #666666; }",
		"#qr2_textbox{ width:100%; margin:-4px; }",
		"#qr2_submit{ float:left; }",
		"#qr2_orbtn { margin-left: 5px; float:left; color:#AAAAAA }",
		"#qr2_orbtn a{ color:#CCCCCC; text-decoration:underline }",
		
		"#qr2_loading{ visibility:hidden; margin-top:5px; }",
		"#qr2_posticon{ margin-top:5px; }",
		
		"#qr2_tabs{ float:right }",
		"#qr2_tabs a{ padding: 4px; margin: 0px 4px }",
		
		
		"#qr2_emotebar{ padding:5px; display:none; margin-bottom: 2px; padding:1px; overflow:hidden; }",
		"#qr2_emotebar > div { text-align:center; width:4000px; position:relative }",
		"#qr2_emotebar a{ margin:4px; }",
		
		
		"#qr2_tagbar{ text-align:center; display:none; margin-bottom: 5px; }",
		"#qr2_tagbar a{ padding: 5px; margin: 1px; color:#AAAAAA; }",
		"#qr2_tagbar a:hover{ background-color: #CCCCCC; color:#000000; }",
		
		
		"#qr2_tagpanel ul{ margin:0px; padding:0px; }",
		"#qr2_tagpanel li{ list-style: none; float: left; width: 70px; margin:1px; padding:1px; }",
		"#qr2_tagpanel li a{ width:100%; display:block; color:#666666; }",
		].join(""));
		
		
		this.window.innerHTML = [
		
		"<div class=\"container\">",
			"<div id=\"qr2_emotebar\"></div>",
			"<div id=\"qr2_tagbar\"></div>",
			"<form action=\"\" method=\"post\" id=\"qr2_form\">",
			
				"<input type=\"hidden\" id=\"qr2_do\" name=\"do\" value=\"?\">",
				"<input type=\"hidden\" id=\"qr2_t\" name=\"t\" value=\"?\">",
				"<input type=\"hidden\" id=\"qr2_p\" name=\"p\" value=\"?\">",
				"<input type=\"hidden\" name=\"fromquickreply\" value=\"1\">",
				
				"<table width=\"100%\" cellspacing=\"0\" cellpadding=\"5\" border=\"0\">",
					"<tr>",
						"<td width=\"16\" rowspan=\"2\" valign=\"top\">",
							"<a href=\"javascript:;\" onclick=\"closeReplyWindow()\"><img src=\""+closebtn+"\"></a><br>",
							"<img src=\"\" id=\"qr2_posticon\">",
							"<img src=\""+loadingbtn+"\" id=\"qr2_loading\">",
						"</td>",
						"<td width=\"70%\" rowspan=\"2\">",
							"<textarea id=\"qr2_textbox\" name=\"message\" rows=\"8\"></textarea>",
						"</td>",
						"<td valign=\"top\">",
							"<div id=\"qr2_defaultpanel\">",
								"<a href=\"http://forums.facepunchstudios.com/member.php?u=5035\">Vampired's</a> alternate quick reply<br><br>",
								"Version "+this.versionString+"",
							"</div>",
						"</td>",
					"</tr>",
					
					"<tr>",
						"<td valign=\"top\" height=\"34\">",
							"<input type=\"submit\" value=\"Post Reply\" id=\"qr2_submit\">",
							"<span id=\"qr2_orbtn\">or <a href=\"javascript:;\" id=\"qr2_preview\">preview</a></span>",
							"<div id=\"qr2_tabs\">",
								"<a href=\"javascript:;\" onclick=\"qr2_openBar(0)\"><img src=\""+emote+"\"></a>",
								"<a href=\"javascript:;\" onclick=\"qr2_openBar(1)\"><img src=\""+codetag+"\"></a>",
							"</div>",
						"</td>",
					"</tr>",
				"</table>",
			"</form>",
		"</div>"].join("");
		
		this.textbox = $("qr2_textbox");
		this.loading = $("qr2_loading");
		this.posticon = $("qr2_posticon");
		this.form = $("qr2_form");
		
		//this.generateEmoteTab();
		//this.generateTagTab();
		
		// Move it off screen, ready for animations
		this.anim_current = -this.window.clientHeight-5;
		this.window.style.bottom = this.anim_current+"px";
		
		Event.add(this.form, "submit", this.event_submit.bind(this));
		Event.add(this.textbox, "keypress", this.event_textboxkeypress.bind(this));
		Event.add("qr2_preview", "click", this.event_previewClick.bind(this));
	},
	
	insertText: function(text)
	{
		// When value is modified the textbox will scroll to the top.
		// Store the current scroll values and apply them afterwards.
		
		var sLeft = this.textbox.scrollLeft;
		var sTop = this.textbox.scrollTop;
		
		var left = this.textbox.value.substr(0, this.textbox.selectionStart);
		var right = this.textbox.value.substr(this.textbox.selectionEnd);
		
		this.textbox.value = left + text + right;
		
		this.textbox.selectionStart = this.textbox.selectionEnd = left.length + text.length;
		
		this.textbox.scrollLeft = sLeft;
		this.textbox.scrollTop = sTop;
		
		// And focus
		this.textbox.focus();
	},
	
	insertTag: function(tag)
	{
		var oldtext = this.textbox.value;
		var selstart = this.textbox.selectionStart;
		var selend = this.textbox.selectionEnd;
		
		// left<middle>right where middle is selected
		var left = oldtext.substr(0, selstart);
		var middle = oldtext.substr(selstart, selend-selstart);
		var right = oldtext.substr(selend);
		
		var tagleft = "["+tag+"]";
		var tagright = "[/"+tag+"]";
		
		// Special case for list tag.
		// It sucks. most of it is trial and error.
		if(tag == "list")
		{
			var parts = trim(middle).split("\n");
		
			middle = "\n";
			for(var i in parts)
			{
				middle += "[*]"+parts[i]+"\n";
			}
			
			// Cursor outside of a [list] tag?
			if(left.lastIndexOf(tagleft) <= left.lastIndexOf(tagright))
			{
				// ...[list]...[/list]...<middle>...
				//middle = tagleft + middle + tagright;
				
				this.textbox.value = left + tagleft + middle + tagright + right;
				/*this.textbox.selectionStart = left.length + tagleft.length;
				this.textbox.selectionEnd = left.length + tagleft.length + middle.length;*/
				this.textbox.selectionStart = this.textbox.selectionEnd = left.length + tagleft.length + middle.length;
				this.textbox.focus();
			}
			else
			{
				middle = trim(middle);
				this.textbox.value = left + middle + right;
				this.textbox.selectionStart = this.textbox.selectionEnd = left.length + middle.length;
				this.textbox.focus();
			}
			
			return;
		}
		
		// left[tagleft]middle[tagright]right
		this.textbox.value = left + tagleft + middle + tagright + right;
		this.textbox.selectionStart = left.length + tagleft.length;
		this.textbox.selectionEnd = left.length + tagleft.length + middle.length;
		this.textbox.focus();
	},
	
	setLoadingImage: function(bool)
	{
		this.loading.style.visibility = bool ? "visible" : "hidden";
	},
	
	openBar: function(id)
	{
		var bars = [$("qr2_emotebar"), $("qr2_tagbar")];
		var newbar = bars[id];
		
		var drink = (newbar.style.display != "none" && newbar.style.display != "");
		
		if(id == 0 && !this.generatedEmotes) this.generateEmoteBar();
		
		if(id == 1 && !this.generatedTags) this.generateTagBar();
		
		bars[id].style.display = drink ? "none" : "block";
		bars[1-id].style.display = "none";
		
	},
	
	toggleReplyWindow: function()
	{
		// Toggle window, return true if window will be open, false if close
		if(this.open)
			return this.closeReplyWindow();
		else
			return this.openReplyWindow();
	},
	
	openReplyWindow: function()
	{
		// Return true if window is opened
		
		if(this.open)
			return;
		
		this.open = true;
		
		this.textbox.focus();
		
		//this.window.style.display = "block";
		
		this.animate(
			0,								 // to zero px (bottom of screen)
			500,							 // in 500 ms
			quad_out						 // using quad_out equation
		);
		
		return true;
	},
	closeReplyWindow: function()
	{
		// Return false if window is closed
		
		if(!this.open)
			return false;
		
		if(!this.posting && this.textbox.value.length > 0)
			if(!confirm("Closing this will remove current reply text"))
				return true;
		
		this.open = false;
		
		this.animate(
			-this.window.clientHeight-5, // to minus its height (off screen)
			500,							 // in 500 ms
			quad_in							 // using quad_in equation
		);
		
		this.textbox.value = "";
		this.textbox.blur();
		
		this.setPostingMode(MODE_NONE);
		
		return false;
	},
	
	setPostingMode: function(mode, text)
	{
		this.postmode = mode;
		this.posticon.src = (mode == MODE_EDIT) ? pencil : comment_add;
		this.posticon.title = text;
	},
	
	editPost: function(postid)
	{
		this.postid = postid;
		this.setPostingMode(MODE_EDIT, "Editing post "+this.postid);
		this.syncEditText(postid);
		this.openReplyWindow();
	},
	
	quotePost: function(postid)
	{
		// This allows us to quote shit while editting our post.
		if(this.postmode != MODE_EDIT)
			this.setPostingMode(MODE_POST, "Replying to thread "+this.threadid);
		this.syncQuoteText(postid);
		this.openReplyWindow();
	},
	
	showPreview: function(text)
	{
		// Fuck you valid HTML
		var html = ["<html>",
		"<head>",
		"<title>Post Preview</title>",
		"<style>",
		// http://forums.facepunchstudios.com/styles.css
		"body { font-family: Tahoma; font-size: 13px; font-size-adjust: none; font-style: normal; font-variant: normal; font-weight: normal; line-height: normal; }",
		".quote { background:#CCDDEE none repeat scroll 0%; border:1px dotted #AAAAAA; color:#333344; font-size:10px; padding:5px; }",
		".quotename { background:#667788 none repeat scroll 0%; border-color:#AAAAAA rgb(170, 170, 170) -moz-use-text-color; border-style:dotted dotted none; border-width:1px 1px 0px; color:#FFFFFF; font-size:10px; padding:2px; }",
		"pre.code, div.code { background-color:#EEEEEE; border:1px dashed #AAAAAA; font-family:Fixed,monospace; font-size:11px; overflow-x:auto; overflow-y:hidden; padding:15px 5px 20px; }",
		".highlight { color:#FF0000; font-weight:bold; }",
		".inlineimg { vertical-align:middle; }",
		"img { border:0pt none; vertical-align:middle; }",
		"img.bbimg { background-color:#FFFFAA; border:1px solid black; }",
		
		"#post { color: #222222; margin: 20px; }",
		"</style>",
		"</head>",
		"<body>",
		"<div id=\"post\">",
		text,
		"</div>",
		"</body>",
		"</html>"].join("");
		
		if(this.previewWin)
		{
			this.previewWin.close();
		}
		
		this.previewWin = document.open("about:blank", "qr2_previewWindow", "width=800,height=200,directories=no,menubar=no,location=no,resizable=yes,scrollbars=yes,status=yes");
		if(!this.previewWin)
		{
			alert("Your browser has blocked windows openening :(");
			return;
		}
		
		this.previewWin.document.write(html);
		this.previewWin.document.close();
	},
	
	syncPreview: function()
	{
		if(this.awaitingAJAX)
		{
			alert("Busy");
			return;
		}
		
		var threadid = this.threadid;
		var message = this.textbox.value;
		
		GM_xmlhttpRequest({
			method: "POST",
			headers: {"Content-type":"application/x-www-form-urlencoded"},
			url: facepunch+"newreply.php",
			data: "preview=1&wysiwyg=0&parseurl=1&s=&signature=1&fromquickreply=1&p=who+cares&do=postreply&message="+encodeURIComponent(message)+"&t="+threadid,
			onload: this.callback_syncPreview.bind(this),
		});
		
		this.awaitingAJAX = true;
		this.setLoadingImage(true);
	},
	
	syncEditText: function(postid)
	{
		if(this.awaitingAJAX)
		{
			alert("Busy");
			return;
		}
		
		GM_xmlhttpRequest({
			method: "GET",
			url: facepunch+"editpost.php?do=editpost&p="+postid,
			onload: this.callback_syncEdit.bind(this),
		});
		
		this.awaitingAJAX = true;
		this.setLoadingImage(true);
	},
	
	syncQuoteText: function(postid)
	{
		if(this.awaitingAJAX)
		{
			alert("Busy");
			return;
		}
		
		
		GM_xmlhttpRequest({
			method: "GET",
			url: facepunch+"newreply.php?do=newreply&p="+postid,
			onload: this.callback_syncQuote.bind(this),
		});
		
		this.awaitingAJAX = true;
		this.setLoadingImage(true);
	},
	
	sendPost: function(threadid, message)
	{
		
		GM_xmlhttpRequest({
			method: "POST",
			headers: {"Content-type":"application/x-www-form-urlencoded"},
			url: facepunch+"newreply.php",
			data: "wysiwyg=0&ajax_lastpost="+this.ajax_lastpost+"&parseurl=1&s=&signature=1&fromquickreply=1&ajax=1&p=who+cares&do=postreply&message="+encodeURIComponent(message)+"&t="+threadid,
			onload: this.callback_sendPost.bind(this),
		});
		
		this.setLoadingImage(true);
		
		return false;
	},
	
	setupFormItems: function()
	{
		var editting = this.postmode == MODE_EDIT;
		
		$("qr2_form").setAttribute("action", editting ? "editpost.php" : "newreply.php");
		
		$("qr2_p").value = editting ? this.postid : "who cares";
		$("qr2_do").value = editting ? "updatepost" : "postreply";
		
		$("qr2_t").value = this.threadid;
		
	},
	
	// Callbacks ////////////////
	//{{{
	
	callback_sendPost: function(response)
	{
		this.setLoadingImage(false);
		
		var text = response.responseText;
		
		if(text.match(/^<!-- postbit ok -->/))
		{
			// The server returns a time value. This is the time when we last got posts.
			// So if we were to request again, we send this time value and it would retrieve
			// posts from this value to the current time.
			
			var time_match;
			if(time_match = text.match(/^<!-- postbit ok --><!-- time ([0-9]+)/))
			{
				// Store it as global.
				this.ajax_lastpost = time_match[1];
			}
			
			// VBulletin has a <div id="lastpost"> in the HTML which is for
			// adding new posts before it.
			var newdiv = Dom.addBefore("lastpost", "div");
			newdiv.innerHTML = text;
			
			// Call the setup reply buttons function.
			// This makes the reply and/or edit buttons into Javascript links that
			// open the quick reply box.
			this.setupReplyButtons();
		}
		else
		{
			// This will be run if the server gives us an error.
			// Maybe if thread is locked or some other forum related error??
			
			log("callback error");
			log(text);
			this.ajax_sucks = true;
			this.form.submit();
		}

		// Not posting any more?
		// (closeReplyWindow would otherwise say Are you sure?)
		this.posting = false;
		
		// todo: make sure we really want to clear textbox;
		this.textbox.value = "";
		this.closeReplyWindow();
	},
	
	callback_syncPreview: function(response)
	{
		// Scrape the HTML from the preview page.
		
		this.awaitingAJAX = false;
		this.setLoadingImage(false);
		
		/*
			<td class="alt1">
			
				<!-- icon and title --> 
				<div class="smallfont"> 
				<strong>Re: Title</strong> 
				</div> 
				<hr size="1" style="color:#888" /> 
				<!-- / icon and title --> 
				
				Words
			
			</td> 
		 */
		var text = response.responseText;
		
		// \s is whitespace. \S is not whitespace
		var m = text.match(/<!-- \/ icon and title -->[\s]*([\s\S]+?)[\s]*<\/td>[\s]*<\/tr>[\s]*<\/table>/);
		if(!m)
		{
			alert("Can't find preview text, maybe script needs updating?");
			log(text);
			return;
		}
		
		this.showPreview(m[1]);
	},
	
	callback_syncEdit: function(response)
	{
		// This is very poor function.
		// Scrape the page and find whatever text would be there if
		// we were to actually go to the page in our browser.
		
		this.awaitingAJAX = false;
		this.setLoadingImage(false);
		
		var text = response.responseText.substr(14000); // cut out loads
	
		var m;
		if(m = text.match(/<textarea name=\"message\".+?>([\s\S]+?)<\/textarea>/))
		{
			// Quotes, angle brackets and amperstands are encoded.
			
			var str = m[1];
			var f = [/&lt;/g, /&gt;/g, /&quot;/g, /&amp;/g];
			var r = ["<", ">", "\"", "&"];
		
			for(var i=0; i<f.length; i++)
				str = str.replace(f[i], r[i]);
	
			text = str;
		}
		else
		{
			alert("Can't find edit text, maybe script needs updating?");
			text = "";
		}
		
		this.textbox.value = text;
		
		// scroll to top (nah)
		//this.textbox.scrollTop = 0;
	},
	
	callback_syncQuote: function(response)
	{
		// This is very poor function.
		// Scrape the page and find whatever text would be there if
		// we were to actually go to the page in our browser.
		
		
		var text = response.responseText.substr(14000); // cut out loads
	
		var m;
		if(m = text.match(/<textarea name=\"message\".+?>([\s\S]+?)<\/textarea>/))
		{
			// Quotes, angle brackets and amperstands are encoded.
			
			var str = m[1];
			var f = [/&lt;/g, /&gt;/g, /&quot;/g, /&amp;/g];
			var r = ["<", ">", "\"", "&"];
		
			for(var i=0; i<f.length; i++)
				str = str.replace(f[i], r[i]);
	
			text = str;
		}
		else
		{
			alert("Can't find quote text, maybe script needs updating?");
			text = "";
		}
		
		// If we quote a few posts spread them out with two new lines.
		var old = trim(this.textbox.value);
		this.textbox.value = (old.length > 0 ? old + "\n\n" : "") + text;
		
		// scroll to bottom
		this.textbox.scrollTop = 9999;
		
		this.awaitingAJAX = false;
		this.setLoadingImage(false);
	},

	
	
	//}}}
	
	
	// Events ///////////////////
	//{{{ 
	
	event_submit: function(ev)
	{
		try
		{
			if(this.postmode == MODE_NONE)
			{
				log("post mode = none");
				ev.preventDefault();
				return;
			}
			
			if(!this.open)
			{
				// Maybe we pressed the submit button using enter or something
				alert("Failed to send message: reply box is closed.");
				ev.preventDefault();
				return;
			}
			
			if(this.posting)
			{
				alert("Busy");
				ev.preventDefault();
				return;
			}
			
			// Make sure all items are setup correctly, depending on postting/editting
			this.setupFormItems();
			
			// COMMENCE POSTING INITIALIZATION MODE: GO!
			
			this.posting = true;
			
			
			if(this.postmode == MODE_EDIT)
			{
				// Post through HTML
				return;
			}
			
			
			if(this.ajax_sucks)
			{
				alert("Ajax sucks");
				
				// Post through HTML
				return;
			}
			if(!this.ajax_allow)
			{
				// Post through HTML
				return;
			}
			
			
			
			var message = this.textbox.value;
			
			if(!this.sendPost(this.threadid, message))
				ev.preventDefault();
			else
				return; // Post through HTML
		}
		catch(e)
		{
			// If something errors, best not to send the form :(
			ev.preventDefault();
			log("E: "+e);
		}
	},
	
	event_previewClick: function(ev)
	{
		this.syncPreview();
	},
	
	event_beforeUnload: function(ev)
	{
		// If sending AJAX
		if(this.awaitingAJAX)
		{
			ev.returnValue = "Currently sending AJAX request. Continuing may cause bad things to happen.";
			return;
		}
		
		// If we're actually submitting the stuff.
		if(!this.posting && this.textbox.value.length > 0)
		{
			ev.returnValue = "You have started a reply, changes will be lost if you exit this page.";
			return;
		}
		
		// meh
		this.closeReplyWindow();
	},
	
	event_scroll: function(ev)
	{
		if(window.scrollY > window.scrollMaxY-50)
		{
			if(!this.scrolledEnough)
			{
				if(this.postmode != MODE_EDIT)
					this.setPostingMode(MODE_POST, "Replying to thread "+this.threadid);
				this.openReplyWindow();
			}
			this.scrolledEnough = true;
		}
		else
		{
			this.scrolledEnough = false;
		}
	},
	
	event_keypress: function(ev)
	{
		if(ev.keyCode == 27 && this.open) // esc
		{
			this.closeReplyWindow();
			ev.preventDefault();
			
			return;
		}
		
		if(ev.ctrlKey)
		{
			if(ev.charCode == this.options.keycommand)
			{
				
				if(this.toggleReplyWindow())
				{
					if(this.postmode == MODE_EDIT)
						this.textbox.value = "";
					this.setPostingMode(MODE_POST, "Replying to thread "+this.threadid);
				}
				ev.preventDefault();
			}
		}
	},
	
	event_textboxkeypress: function(ev)
	{
		if(ev.ctrlKey)
		{
			switch(String.fromCharCode(ev.charCode).toLowerCase())
			{
				case "b": this.insertTag("b"); break;
				case "i": this.insertTag("i"); break;
				case "u": this.insertTag("u"); break;
				case "q": this.insertTag("quote"); break;
				default: return;
			}
			ev.preventDefault();
		}
		if(ev.keyCode == 9)	// tab
		{
			if(this.options.tabtotab)
			{
				this.insertText("    ");
				ev.preventDefault();
			}
		}
		
		//log(ev.keyCode);
	},
	
	event_replyclick: function(ev)
	{
		this.openReplyWindow();
		
		if(this.postmode == MODE_EDIT)
			this.textbox.value = "";
		this.setPostingMode(MODE_POST, "Replying to thread "+this.threadid);
	},
	
	event_mousemove: function(ev)
	{
		var emotebar = $("qr2_emotebar");
		if(emotebar && emotebar.style.display == "block" && emotebar.firstChild)
		{
			var p = (ev.clientX-emotebar.offsetLeft) / emotebar.clientWidth;
			p = Math.min(Math.max(p, 0), 1);
			var v = -p*(4000-emotebar.clientWidth);
			
			emotebar.firstChild.style.left = (v || 0) + "px";
		}
	},
	
	//}}}
	
	
	// Animation /////////////
	//{{{ 
	
	animate: function(target, time, func)
	{
		var now = Number(new Date());
		
		//if(now < this.anim_starttime + this.anim_length)
		if(this.anim_timeout)
		{
			// animation playing
			clearTimeout(this.anim_timeout);
			//return;
		}
		
		this.anim_starttime = now;
		this.anim_length = time;
		this.anim_startval = this.anim_current; //start;
		this.anim_endval = target;
		this.anim_func = func;
		this.anim_current = this.anim_startval;
		this.animationLoop();
	},
	
	animationLoop: function()
	{
		var now = Number(new Date());
		if(now >= this.anim_starttime)
		{
			var percent = (now - this.anim_starttime) / this.anim_length;
			
			if(percent < 1)
			{
				this.anim_current = this.anim_func(percent, this.anim_startval, this.anim_endval)
				this.window.style.bottom = this.anim_current + "px";
				
				this.anim_timeout = setTimeout(this.animationLoop.bind(this), 33);	// 30 fps
			}
			else
			{
				this.anim_current = this.anim_endval;
				this.window.style.bottom = this.anim_current + "px";
				clearTimeout(this.anim_timeout);
			}
		}
	},
	
	//}}}
	
}




//unsafeWindow.openReplyWindow = QuickReply.openReplyWindow.bind(QuickReply);
unsafeWindow.closeReplyWindow = QuickReply.closeReplyWindow.bind(QuickReply);
unsafeWindow.toggleReplyWindow = QuickReply.toggleReplyWindow.bind(QuickReply);
unsafeWindow.qr2_insertText = QuickReply.insertText.bind(QuickReply);
unsafeWindow.qr2_insertTag = QuickReply.insertTag.bind(QuickReply);
unsafeWindow.qr2_openBar = QuickReply.openBar.bind(QuickReply);

//// Emotes ///////////////////////////////////


var bbcode = [
	"&b", "&i", "&u", "&quote", "lua", "code", "highlight", "sp", "indent", "noparse", "url", "img", "img_thumb", "release", "list"
];

// The extra 'true' means use a white background, otherwise they look shit on black.
// #109
var emotes = [
	[":(",			"frown.png"],
	[":)",			"smile.png"],
	[":04:",		"emot-04.gif",			true],
	[":10bux:",		"emot-10bux.gif"],
	[":20bux:",		"emot-20bux.gif"],
	[":3:",			"3.gif"],
	[":4chan:",		"4chan.gif"],
	[":911:",		"emot-911.gif"],
	[":D",			"biggrin.png"],
	[":ahaw:",		"emot-haw.gif"],
	[":argh:",		"emot-argh.gif"],
	[":banjo:",		"emot-banjo.gif"],
	[":beerbear:",	"emot-beerbear.png"],
	[":bees:",		"panic.gif"],
	[":britain:",	"emot-britain.gif"],
	[":burger:",	"emot-burger.gif"],
	[":c00l:",		"emot-c00l.gif"],
	[":canada:",	"emot-canada.gif"],
	[":cheers:",	"emot-cheers.png"],
	[":chef:",		"emot-chef.png"],
	[":chicago:",	"emot-chicago.gif"],
	[":china:",		"emot-china.gif"],
	[":clint:",		"emot-clint.gif"],
	[":coal:",		"emot-coal.png"],
	[":comeback:",	"emot-comeback.gif"],
	[":confused:",	"confused.png"],
	[":cool:",		"cool.png"],
	[":cop:",		"emot-cop.gif"],
	[":cow:",		"emot-cow.gif"],
	[":crying:",	"emot-crying.gif"],
	[":cthulhu:",	"emot-cthulhu.gif"],
	[":dance:",		"emot-dance.gif"],
	[":denmark:",	"emot-denmark.gif"],
	[":derp:",		"emot-derp.gif",		true],
	[":dog:",		"emot-dog.png"],
	[":downs:",		"emot-downs.png"],
	[":eek:",		"emot-eek.png"],
	[":emo:",		"emot-emo.gif"],
	[":eng101:",	"emot-eng101.png"],
	[":ese:",		"emot-ese.gif"],
	[":excited:",	"emotboingpn7.gif"],
	[":fap:",		"emot-fap.gif"],
	[":foxnews:",	"emot-foxnews.gif"],
	[":freeman:",	"emot-freeman.gif"],
	[":geno:",		"emot-geno.png"],
	[":ghost:",		"emot-ghost.gif"],
	[":girlv:",		"emot-j.gif"],
	[":goatse:",	"emot-goatse.gif"],
	[":ham:",		"emot-ham.png"],
	[":hellnaw:",	"emot-hellnaw.gif",		true],
	[":holy:",		"emot-holy.gif"],
	[":howdy:",		"howdy.gif"],
	[":huh:",		"emot-huh.gif"],
	[":jewish:",	"emot-jewish.png"],
	[":jihad:",		"emot-jihad.png"],
	[":keke:",		"emot-keke.png"],
	[":krad:",		"emot-krad2.gif"],
	[":laffo:",		"emot-laffo.gif",		true],
	[":laugh:",		"emot-laugh.gif"],
	[":lepard:",	"leperdancenb0.gif"],
	[":lol:",		"emot-lol.gif",			true],
	[":loleyes:",	"emot-loleyes.gif",		true],
	[":love:",		"emot-love.gif"],
	[":mad:",		"mad.png"],
	[":mario:",		"emot-mario.gif"],
	[":meatwad:",	"emot-meatwad.gif"],
	[":megaman:",	"emot-megaman.gif"],
	[":megamonoc:",	"emot-megamonocle.gif"],
	[":metis:",		"emot-metis.gif"],
	[":mmph:",		"emotowvr9.png"],
	[":monocle:",	"emot-monocle.gif"],
	[":moore:",		"emot-moore.gif"],
	[":ninja:",		"emot-ninja.gif"],
	[":nws:",		"emot-nws.gif",			true],
	[":nyd:",		"emot-nyd.gif"],
	[":o",			"redface.png"],
	[":patriot:",	"emot-patriot.png"],
	[":pirate:",	"emot-pirate.gif"],
	[":pwn:",		"emot-pwn.png"],
	[":q:",			"emot-q.png"],
	[":quagmire:",	"emot-quagmire.gif"],
	[":question:",	"emot-question.gif"],
	[":raise:",		"emot-raise.gif"],
	[":rock:",		"emot-rock.gif"],
	[":rolleye:",	"emot-rolleye.png"],
	[":sax:",		"emot-sax.png"],
	[":scax:",		"emot-scax.png"],
	[":science:",	"emot-science.gif"],
	[":sg:",		"emot-sg.gif"],
	[":sigh:",		"emot-sigh.gif"],
	[":silent:",	"emot-silent.png"],
	[":siren:",		"emot-siren.gif",		true],
	[":specialschool:",	"emotengdownsdancevd9.gif"],
	[":ssh:",		"emot-ssh.png"],
	[":ssj:",		"emot-ssj.gif"],
	[":tama:",		"rk8yfp.gif"],
	[":tinfoil:",	"emot-tinfoil.gif"],
	[":tizzy:",		"emot-tizzy.gif"],
	[":ussr:",		"emot-ussr.gif"],
	[":v:",			"emot-v.png"],
	[":weed:",		"emot-weed.png"],
	[":witch:",		"emot-witch.png"],
	[":wooow:",		"wooow.gif"],
	[":words:",		"emot-words.gif"],
	[":wtf:",		"emot-wtf.gif",			true],
	[":xbox:",		"emot-xbox.png"],
	[":xd:",		"emot-xd.png"],
	[":yarr:",		"emot-yarr.png"],
	[":yoshi:",		"emot-yoshi.gif"],
	[":zoid:",		"emot-zoid.gif"],
	[";)",			"wink.png"],
];


//// Start Code ///////////////////////////////

// If qrform doesn't exist then the thread is locked and we can't reply anyway.
if(document.body && $("qrform"))
{
	
	QuickReply.init();

}