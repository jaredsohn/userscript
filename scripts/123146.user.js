// ==UserScript==
// @name          Kongregate ForumMute
// @description   Can hide the existence of trolls (who are on the mute list) on the kongregate forums.
// @version       1.1.0
// @namespace     http://www.kongregate.com/
// @include       http://www.kongregate.com/forums/*
// ==/UserScript==

var REGEXP_TEST = /^\/(([\\\/]|[^\/])+)\/(i?)$/;
var REGEXP_CONTENT = 1;
var REGEXP_FLAGS = 3;

GM_setValue("version", 2);
var trolls = loadTrolls();
var time = Math.floor((new Date().getTime())/86400000);
var forum = location.toString().match(/\/forums\/([0-9]+)/)[1];
var forumWatch = !!GM_getValue("TWMemory_"+forum, false), page;
var settings = JSON.parse(GM_getValue("settings", "{\"hidePosts\":true, \"quoteHandle\":0}"));

try {
	if(/^https?:\/\/www\.kongregate\.com\/forums\/.+\/topics\/[0-9].+$/.test(location.toString())) {
		if(settings.hidePosts || settings.guoteHandle != 2) hideTrolls();
	} else if(/^https?:\/\/www\.kongregate\.com\/forums\/[0-9]+[^\/]*$/.test(location.toString())) {
		page = parseInt(document.getElementsByClassName("current")[0].innerHTML);
		tw_active = page < 4;
		appendUtility();
		if(forumWatch && page < 4) hideTrollThreads();
	}
} catch(e) {
	
}

function hideTrolls() {
	var tableNodes = document.getElementsByClassName("posts")[0].childNodes[1].childNodes;
	var posts = document.getElementsByClassName("post hentry"), i;
	var spaces = document.getElementsByClassName("spacer");
	var len = posts.length, span, link, quotes, j, qlink;
	
	for(i=len;i--;) {
		span = getPostSpan(posts[i]);
		link = getPostLink(span);
		if(settings.hidePosts && isTroll(link.innerHTML)) {
			deletePost(posts, spaces, i); //Deleting posts made by trolls.
			continue;
		}
		if(settings.quoteHandle != 2) {
			quotes = posts[i].getElementsByTagName("blockquote");
			for(j=quotes.length;j--;) {
				qlink = quotes[j].getElementsByTagName("a");
				if(!qlink.length) continue;
				if(isTroll(qlink[0].innerHTML)) {
					if(settings.quoteHandle) {
						quotes[j].parentNode.removeChild(quotes[j]);
					} else {
						deletePost(posts, spaces, i); //Deleting posts quoting trolls.
						break;
					}
				}
			}
		}
	}
	
	var doubleSpacer = true, lastSpacer; //Double spacer is true to delete the unfitting lower spacers.
	
	for(i=tableNodes.length;i--;) {
		if(tableNodes[i].nodeType == 1) {
			if(tableNodes[i].className == "spacer") {
				if(doubleSpacer) {
					tableNodes[i].parentNode.removeChild(tableNodes[i]); //Deleting spacers.
				} else {
					doubleSpacer = true;
					lastSpacer = tableNodes[i];
				}
			} else {
				doubleSpacer = false;
			}
		}
	}
	
	if(doubleSpacer) lastSpacer.parentNode.removeChild(lastSpacer); //Deleting those pesky upper spacers.
}

function deletePost(posts, spaces, index) {
	posts[index].parentNode.removeChild(posts[index]);
}

function getPostSpan(post) {
	return post.getElementsByTagName("td")[0].getElementsByClassName("fn")[0];
}

function getPostLink(span) {
	return span.getElementsByTagName("a")[0];
}

//

function parseKnownList() { //Loading the known memory of troll threads.
	var list = [], str = GM_getValue("TWMemory_"+forum, "");
	if(str == "ACTIVE") {
		return [[],[]];
	}
	var list2 = [];
	var len = str.length, i=0, n;
	while(i<len) {
		n = [parseInt(str[i++]+str[i++]+str[i++]+str[i++]+str[i++],36),
			parseInt(str[i++]+str[i++]+str[i++]+str[i++],36),str[i++]]; //Decrypting the encoding.
		//topic{5}-time{4}-letter{1}
		if(n[1]+3 > time) {
			list2[n[0]] = list.length;
			list.push(n);
		}
	}
	
	return [list,list2];
	/*
	[
		[
			[
				Thread ID,
				Date,
				Troll
			], etc
		],
		[?{
			Hashmap:
			At the index thread ID is a pointer to the description in the previous list.
		}?]
	]
	*/
}

function hideTrollThreads() {
	var list = parseKnownList();
	var threads = document.getElementsByClassName("hentry");
	var len = threads.length, i, tid;
	var unknownThreads = [];
	for(i=len;i--;) {
		tid = threads[i].getElementsByClassName("c2")[0].innerHTML.match(/\/topics\/([0-9]+)/)[1];
		if(list[1][tid] !== undefined) {
			list[0][list[1][tid]][1] = time; //Updating time register.
			if(list[0][list[1][tid]][2] == "1") {
				deleteThread(threads[i]); //Deleting known troll treads.
			}
		} else {
			unknownThreads.push([tid, threads[i]]); //Flagging unknown troll rads to be scanned.
		}
	}
	if(unknownThreads.length) {
		for(i=0;i<unknownThreads.length;i++) {
			scanThread(unknownThreads[i][0], list, unknownThreads[i][1]); //Scanning unknown treads.
		}
	} else saveList(list[0]);
}

function scanThread(tid, list, thread) {
	if(page < 4)
	GM_xmlhttpRequest({
		url: "/forums/"+forum+"/topics/"+tid,
		method: "GET",
		onload: function(r) {
			var username = r.responseText.match(/<a href="\/accounts\/([^"]+)" class="post_creator[^"]*">/)[1]; //Name of the OP.
			if(isTroll(username)) { //If the OP is a troll.
				deleteThread(thread)
				list[0].push([tid,time,1]);
			} else {
				list[0].push([tid,time,0]);
			}
			saveList(list[0]);
		}
	});
}

function deleteThread(thread) {
	thread.parentNode.removeChild(thread); //Removing a thread from the list.
}

function saveList(list) { //Encoding and saving the list.
	if(page > 3 || !tw_active) return; //Do not save the list on pages with a too high number to prevent saving old threads.
	var synth = "", i, str;
	for(i=0;i<list.length;i++) {
		str = parseInt(list[i][0]).toString(36);
		while(str.length<5) str = "0"+str;
		synth += str;
		str = list[i][1].toString(36);
		while(str.length<4) str = "0"+str;
		synth += str;
		synth += list[i][2];
	}
	GM_setValue("TWMemory_"+forum, synth);
}

function appendUtility() {
	var container = document.getElementById("featurewide").getElementsByClassName("bd")[0], i;
	
	container.appendChild(document.createTextNode(" "));
	var watchSpan = document.createElement("span"); //Construction the UI for the checkbox.
	watchSpan.className = "watch_topic";
	var watchBox = document.createElement("input");
	watchBox.setAttribute("type", "checkbox");
	watchBox.id = "threadwatch_box";
	watchBox.checked = forumWatch;
	watchSpan.appendChild(watchBox);
	var watchLabel = document.createElement("label");
	watchLabel.setAttribute("for", "threadwatch_box");
	watchLabel.innerHTML = forumWatch ? "Threadwatch enabled" : "Enable threadwatch";
	watchSpan.appendChild(watchLabel);
	container.appendChild(watchSpan);
	container.appendChild(document.createTextNode(" "));
	
	var trollEditLink = document.createElement("a");
	trollEditLink.innerHTML = "Edit mute list";
	trollEditLink.className = "utility";
	trollEditLink.href = "javascript:void(0);";
	container.appendChild(trollEditLink);
	container.appendChild(document.createTextNode(" "));
	
	var hideEditLink = document.createElement("a");
	hideEditLink.innerHTML = "ForumMute settings";
	hideEditLink.className = "utility";
	hideEditLink.href = "javascript:void(0);";
	container.appendChild(hideEditLink);
	
	var trollList = document.createElement("div");
	trollList.appendChild(document.createElement("br"));
	trollList.appendChild(document.createTextNode("Forum mute list:"));
	trollList.appendChild(document.createElement("br"));
	var trollInput = document.createElement("textarea");
	trollInput.setAttribute("style", "width:240px;height:200px");
	trollInput.value = trolls ? trolls.join("\n") : "";
	trollList.appendChild(trollInput);
	trollList.appendChild(document.createElement("br"));
	var trollConfirmButton = document.createElement("input");
	trollConfirmButton.setAttribute("type", "button");
	trollConfirmButton.value = "Confirm";
	trollList.appendChild(trollConfirmButton);
	var trollListVisible = false;
	
	var deleteUI = document.createElement("div");
	deleteUI.className = "watch_topic";
	deleteUI.appendChild(document.createElement("br"));
	var nodeContainer = document.createElement("p");
	var hidePostCheck = document.createElement("input");
	hidePostCheck.setAttribute("type", "checkbox");
	hidePostCheck.checked = settings.hidePosts;
	nodeContainer.appendChild(hidePostCheck);
	label(hidePostCheck, "Hide muted posts", "hidePostCheckbox");
	deleteUI.appendChild(nodeContainer);
	var quoteOptions = [], quoteRadio, hideOptionsVisible = false;
	for(i=0;i<3;i++) {
		nodeContainer = document.createElement("p");
		quoteRadio = document.createElement("input");
		quoteRadio.setAttribute("type", "radio");
		quoteRadio.setAttribute("name", "quoteRadio");
		quoteRadio.checked = i == settings.quoteHandle;
		nodeContainer.appendChild(quoteRadio);
		label(quoteRadio, [
			"Hide posts quoting muted users",
			"Hide quotes quoting muted users",
			"Do not handle posts quoting muted users"
		][i], "quoteRadio"+i);
		quoteOptions.push(quoteRadio);
		deleteUI.appendChild(nodeContainer);
	}
	var settingsConfirmButton = document.createElement("a");
	settingsConfirmButton.href = "javascript:void(0);";
	settingsConfirmButton.innerHTML = "Save";
	deleteUI.appendChild(settingsConfirmButton);
	
	//Adding listeners
	
	watchBox.addEventListener("click", function(event) {
		if(watchBox.checked) {
			tw_active = true;
			watchLabel.innerHTML = "Threadwatch enabled";
			GM_setValue("TWMemory_"+forum, "ACTIVE");
			GM_setValue("TWActiveForums", GM_getValue("TWActiveForums", "")+";"+forum);
			hideTrollThreads();
		} else {
			tw_active = false;
			watchLabel.innerHTML = "Enable threadwatch";
			GM_deleteValue("TWMemory_"+forum);
			var activeForums = GM_getValue("TWActiveForums", "").split(";");
			activeForums.splice(activeForums.indexOf(forum), 1);
			GM_setValue("TWActiveForums", activeForums.join(";"));
		}
	}, false);
	
	trollEditLink.addEventListener("click", function(event) {
		if(!trollListVisible) {
			container.appendChild(trollList);
			trollListVisible = true;
		}
	}, false);
	
	hideEditLink.addEventListener("click", function(event) {
		if(!hideOptionsVisible) {
			container.appendChild(deleteUI);
			hideOptionsVisible = true;
		}
	}, false);
	
	trollConfirmButton.addEventListener("click", function(event) {
		try {
			if(trollListVisible) {
				var input = trollInput.value.replace(/[\n\r]+/g, "\n").replace(/[ ;]/g, "").split("\n"), i;
				for(i=input.length;i--;) {
					if(REGEXP_TEST.test(input[i])) {
						input[i] = parseRegExp(input[i]);
					} else if(/^\W*\w+\W*$/.test(input[i])) {
						input[i] = input[i].match(/\w+/)[0];
					} else {
						if(/^\W*$/.test(input[i])) {
							input.splice(i,1);
						} else {
							alert("An error occured while parsing the mute list.\nPlease put every user on a separate line.");
							return;
						}
					}
				}
				var inputCheck = input.slice(), l;
				var modify = false;
				for(i=trolls.length;i--;) {
					if((l = inputCheck.indexOf(trolls[i])) != -1) {
						inputCheck.splice(l, 1);
					} else {
						modify = true;
					}
				}
				modify = modify || inputCheck.length;
				
				if(modify) redefineMemory();
				
				trolls = input;
				GM_setValue("trolls", input.join(";")); //Regular expressions will automatically be converted to a readable form?
				trollListVisible = false;
				container.removeChild(trollList);
			}
		} catch(e) {

		}
	}, false);
	
	settingsConfirmButton.addEventListener("click", function(event) {
		if(hideOptionsVisible) {
			container.removeChild(deleteUI);
			hideOptionsVisible = false;
			settings.hidePosts = hidePostCheck.checked;
			for(i=0;i<3;i++) {
				if(quoteOptions[i].checked) {
					settings.quoteHandle = i;
					break;
				}
			}
			GM_setValue("settings", JSON.stringify(settings));
		}
	}, false);
}

function label(elem, text, id) {
	var _label = document.createElement("label");
	_label.appendChild(document.createTextNode(text));
	if(!elem.id) elem.id = id;
	_label.setAttribute("for", elem.id);
	elem.parentNode.appendChild(_label);
}

function redefineMemory(defTroll, defValid) {
	var activeForums = GM_getValue("TWActiveForums", "").split(";");
	activeForums.shift();
	var forumMemory, i;
	for(i=activeForums.length;i--;) {
		GM_setValue("TWMemory_"+activeForums[i], "ACTIVE");
	}
}

function loadTrolls() {
	var data = GM_getValue("trolls", "").split(";");
	for(var i in data) {
		if(REGEXP_TEST.test(data[i]))
		data[i] = parseRegExp(data[i]);
	}
	if(data[0] == "") data.shift();
	
	return data;
}

function isTroll(user) {
	for each(var i in trolls) {
		if(i == user) return true;
		else if(typeof i == "object") //If it's an object, it must be a regular expression.
		if(i.test(user)) return true;
	}
	return false;
}

function parseRegExp(source) {
	var data = REGEXP_TEST.exec(source);
	return new RegExp(data[REGEXP_CONTENT], data[REGEXP_FLAGS]);
}