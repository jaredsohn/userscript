// ==UserScript==
// @name WebCT fixer
// @namespace http://my.opera.com/splondike/
// @description Attempts to make webct (tested on version 4.1.5.8) more user-friendly
// @include http://webct.anu.edu.au/*
// ==/UserScript==

(function(){
//The following boolean values (ie. true/false) turn on and off each of the additional functions

//Direct links to discussion boards on the homearea page
var directLinks = true;
//Reverses the order of discussion board topics (newest at the top)
var reverseTopics = true;
//Replaces attatchments with direct links (bypasses the attatchment window)
var directAttach = true;
//Makes the subject line the window title, rather than "Discussions"
//Also makes the window icon different
var addSubject = true;
//Makes the subject line a hyperlink to the discussion post in the discussion listing
var hyperLinkDiscussionSubject = true;
//This script adds a proper href attribute to links, meaning that 'Open in new tab' type things work.
//Set this attribute to true to make the new tab use frames (eg. navigation, logo) around the page, false for just the page
var useFramesInHref = true;

//Greasemonkey only uses 'load'
var evType = window.opera ? "DOMContentLoaded" : "load";
window.addEventListener(evType, function(e){
	//I'm typing this alot in the script
	var winLoc = window.location;
	var winTop = top.window.location;
	var baseURL = winLoc.protocol + "//" + winLoc.hostname;

	//Adds direct links to the discussion boards on the 'homearea' page if they don't already exist
	if(directLinks && winLoc.pathname.indexOf("homearea") != -1){
		var trs = getElementsByClassName("termtable")[0].getElementsByTagName("tr");
		//x=1 because the first tr is 'coursehead'
		for(var x=1;x<trs.length;x++){
			if(!trs[x].className)continue;

			if((x+2) >= trs.length || trs[x+2].className){
				var td = makeElement("td",{},"\u00a0\u00a0News:\u00a0");
				var a = makeElement("a",{ 
					href:trs[x+1].getElementsByTagName("a")[0].href.replace("serve_home", "student/serve_bulletin")
				});
				var img = makeElement("img",{
					src:"/web-ct/gb8/img/homearea/channels/large_discussions.gif",
					className:"alignMiddle",
					width:"20",
					height:"20",
					style:{
						opacity:"0.5",
						border:"0"
					}
				});
				a.appendChild(img);
				td.appendChild(a);
				var tr = document.createElement("tr");
				tr.appendChild(td);
				trs[0].parentNode.insertBefore(tr, trs[x+1].nextSibling);
			}
		}
	}

	//Makes the 'hash' links work (reads main frame url from the url hash)
	if((winLoc.search.length < 2) && (winLoc.pathname.indexOf("serve_home") != -1) || (winLoc.pathname.indexOf("serve_bulletin"))){
		//Adds a hash argument to set the location of the main frame
		var args = extractArgs(winLoc.hash);
		if(args['mainframeurl']){
			var name = args['mainframename'] || 'Webpage';
			//Overwrite function called to make the breadcrumbs (necessary; normally changes url) 
			if(!window.opera){
				unsafeWindow.update_breadcrumb(name, args['mainframeurl'],'',1,1,1,0);
			}else{
				window['bootstrap_course_nav'] = function(){
					write_course_nav_bar();
					//Also changes the main frame url
					top.update_breadcrumb(name, args['mainframeurl'],'',1,1,1,0);
				}
			}
		}
	}

	//Adds a normal href to the javascript links, allowing open-in-new-tab 
	var alinks = document.getElementsByTagName("a");
	Array.forEach(alinks, function(link){
		var oc = link.getAttribute("onclick");
		var href = link.href;

		if(!oc)return;
		if(oc.indexOf("update_breadcrumb") != -1){
			var chunks = oc.match("\\('(.+?)', '(.+?)'(?:.+?url_encoded\\('(.+?)')?");
			if(useFramesInHref){
				href = baseURL + winTop.pathname + winTop.search + "#mainframeurl=" + escape(chunks[2]);
				if(chunks[3])href += escape(chunks[3]);
				if(chunks[1])href += "&mainframename=" + escape(chunks[1]);
			}else{
				href = chunks[2];
				if(chunks[3])href += chunks[3];
			}
		}else if(oc.indexOf("doWindowOpen") != -1){
			href = oc.match("\\('(.+?)'")[1];
		}else if(oc.indexOf("go_home") != -1){
			href = (winTop+'').replace("student/serve_bulletin", "serve_home");
		}else if(oc.indexOf("go_to_mywebct") != -1){
			href = oc.match("'(.*?)'")[1];
		}else if(oc.indexOf("parent.location=") != -1){
			href = oc.match("'(.*?)'")[1];
		}else if(oc.indexOf("main_win.location=") != -1){
			href = oc.match("'(.*?)student")[1] + "serve_home";
		}
		link.href = href;
	});

	if(winLoc.search.indexOf("ACTION=LIST") != -1){
		//Reverses the order of the posts in discussion boards
		//TODO: Screws up if you 'expand' a topic inline
		if(reverseTopics){ 
		var tables = getElementsByClassName("datatable", "table");
		Array.forEach(tables, function(table){
			if(winLoc.search.indexOf("ARG2=Unread") == -1){
			var newTable = table.cloneNode(true);
			var newRows = newTable.getElementsByTagName("tr");
			var newTabBody = newRows[0].parentNode;

			for(var y=newRows.length - 4;y>=2;y--)
				newTabBody.appendChild(newRows[y]);
			for(var y=0;y<3;y++)
				newTabBody.appendChild(newRows[2]);

			table.parentNode.replaceChild(newTable, table);
			}
		});
		}

		//Makes the subject line a hyperlink to the topic
		if(hyperLinkDiscussionSubject){
			var links = getElementsByClassName("inline", "a");
			Array.forEach(links, function(link){
				link.appendChild(link.nextSibling.nextSibling);
			});
		}
	}

	//Replaces the attatchment window in discussion boards by direct links
	if(winLoc.search.indexOf("COMPILETHREAD") != -1){
		if(directAttach){
		var dividers = getElementsByClassName("divider", "tr");
		Array.forEach(dividers, function(divider){
			var attLink = divider.getElementsByTagName("a")[0];
			if(attLink){
			var attId = attLink.getAttribute("onclick").match(/([0-9]+)/)[0];
			XHRGet(baseURL + winLoc.pathname + "?VIEWMAILATTACH1+BULLETIN+" + attId, function(req, refLink){
				if(!req)return;

				var regex = new RegExp('href="(.+)"(?= target="right").+?>(.+)</a></label>(?:\\n|\\r)+<br>(\\(.+?\\))', 'gi');
				var attatchments = new Array();
				var matches;
				while(matches = regex.exec(req.responseText))
					attatchments.push(matches);

				Array.forEach(attatchments, function(chunks){
					var newLink = makeElement("a", {
						href:baseURL + chunks[1] + "+SAVE",
						style:{
							padding:"2px 0 2px 10px",
							marginRight:"5px",
							background:"url('/web-ct/en8/img/small_attachment.gif') no-repeat"
						}
					}, chunks[2] + " " + chunks[3]);
					refLink.parentNode.insertBefore(newLink, refLink);
				});
				refLink.parentNode.removeChild(refLink);
			}, attLink);
			}
		});
		}
		//Changes the subject line and title of threads
		if(addSubject){
			var subLine = getElementsByClassName("fieldvalue", "span")[0].childNodes[0].nodeValue;
			document.title = subLine;
			var link = makeElement("link", {rel:"icon", href:"/web-ct/en8/img/small_all_messages.gif"});
			document.getElementsByTagName("head")[0].appendChild(link);
		}
	}
},false);

//creates an element, and/or sets it's properties
function makeElement(elm, propArr, text){
	//Hackish fix for greasemonkey style object not being instanceof Object??
	elm = (elm.charAt)?document.createElement(elm):elm;
	for(var key in propArr)
		if(propArr[key] instanceof Object)
			makeElement(elm[key], propArr[key]);
		else
			elm[key] = propArr[key];

	if(text)elm.appendChild(document.createTextNode(text));
	return elm;
}

//Fixes the annoying 'unsupported' popup, and the back button for opera
if(window.opera){
	var oDMV = function(name, rtn){opera.defineMagicVariable(name, function(){return rtn}, null);}
	oDMV('is_js'   ,1.5);
	oDMV('is_opera',false);
	oDMV('is_gecko',true);
	oDMV('is_moz'  ,true);
	oDMV('is_moz17',true);
	opera.setOverrideHistoryNavigationMode("compatible");
}

// From dean.edwards.name, enumeration for objects with .length
if (!Array.forEach) { // mozilla already supports this
    Array.forEach = function(object, block, context) {
        for (var i = 0; i < object.length; i++) {
            block.call(context, object[i], i, object);
        }
    };
}

//Adapted from http://phpfi.com/238008 
function getElementsByClassName(className, tag, elm){
        var re = [];
        var xpathResult = document.evaluate(".//"+(tag||"*")+"[contains(concat(' ', @class, ' '), ' " + className + " ')]", elm || document, null, 0, null);
        var ele;
        while ((ele = xpathResult.iterateNext()))
            re.push(ele)
        return re;
}

function XHRGet(url, callback, extras){
	var req = new XMLHttpRequest();
	req.open("GET", url, true);
	req.onreadystatechange = function(){
		if(req.readyState != 4)return;
		if(req.status == 200){
			callback(req, extras);		
		}else{
			callback(false, extras);
		}
	}
	req.send("");
}

//Extracts arguments in the (encoded) arg1=foo&arg2=bar form and returns a dictionary
function extractArgs(argString){
	var rtnObj = new Object();
	if(!argString){return rtnObj;}
	var chunks = argString.replace("#","").split("&");
	Array.forEach(chunks, function(chunk){
		var nvPair = chunk.split("=");
		rtnObj[unescape(nvPair[0])] = unescape(nvPair[1]);
	}, this);
	return rtnObj;
}
})();