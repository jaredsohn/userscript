// ==UserScript==
// @name Stevenson Search Quicklinks
// @namespace http://zach.dremann.net
// @description Add suggestions to the Stevenson Homepage
// @match http://www.stevenson.edu/
// @match http://stevenson.edu/
// @version 2.0
// ==/UserScript== 

/*
Copyright (c) 2014 Zachary Dremann

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

var quicklinks = [
	{
		keywords:["blackboard"],
		text:"Blackboard",
		link:"https://blackboard.stevenson.edu/webapps/portal/frameset.jsp"
	}, {
		keywords:["campus", "security"],
		text:"Campus Security",
		link:"http://www.stevenson.edu/about/campus-services/campus-security/index.html"
	}, {
		keywords:["catalog"],
		text:"Catalog", link:"http://catalog.stevenson.edu/"
	}, {
		keywords:["dining", "services", "hall", "rockland"],
		text:"Dining Services",
		link:"http://stevensondiningservices.com/"
	}, {
		keywords:["esuds", "clothes", "clothing"],
		text:"eSuds",
		link:"http://stevenson.esuds.net/RoomStatus/showRoomStatus.do?campusId=1153"
	}, {
		keywords:["facilities", "request"],
		text:"Facilities Request",
		link:"https://helpdesk.stevenson.edu/helpdesk/WebObjects/Helpdesk.woa"
	}, {
		keywords:["financial", "aid"],
		text:"Financial Aid",
		link:"http://www.stevenson.edu/admissions-aid/financial-aid-scholarships/"
	}, {
		keywords:["help", "desk"],
		text:"Help Desk",
		link:"https://helpdesk.stevenson.edu/helpdesk/WebObjects/Helpdesk"
	}, {
		keywords:["email", "outlook", "web", "access"],
		text:"Outlook Web Access",
		link:"https://owa.stevenson.edu/"
	}, {
		keywords:["registrar"],
		text:"Registrar",
		link:"http://ssc.stevensonuniversity.org/registrar/"
	}, {
		keywords:["remote", "application", "gateway"],
		text:"Remote Application Gateway",
		link:"https://remoteaccess.stevenson.edu/CITRIX/XENAPP/auth/silentDetection.aspx"
	}, {
		keywords:["schedule", "of", "classes", "class"],
		text:"Schedule of Classes",
		link:"http://www.stevenson.edu/about/campus-services/schedule-of-classes/"
	}, {
		keywords:["smartthinking", "smart", "thinking"],
		text:"Smarthinking",
		link:"http://academiclink.stevensonuniversity.org/smarthinking/"
	}, {
		keywords:["career", "connections", "stevenson"],
		text:"Stevenson Career Connections",
		link:"https://stevenson-csm.symplicity.com/students/index.php"
	}, {
		keywords:["student", "accounts"],
		text:"Student Accounts",
		link:"http://www.stevenson.edu/about/campus-services/student-accounts/index.html"
	}, {
		keywords:["sualert", "opt-in", "opt", "in", "su", "alert", "and"],
		text:"SUAlert and OPT-IN",
		link:"http://www.stevenson.edu/about/campus-services/alert/"
	}, {
		keywords:["cloud", "su"],
		text:"SU Cloud",
		link:"https://sucloud.stevenson.edu/"
	}, {
		keywords:["tech", "connection"],
		text:"Tech Connection",
		link:"http://oit.stevensonuniversity.org/"
	}, {
		keywords:["university", "store"],
		text:"University Store", link:"http://store.stevenson.edu/villaj/default.asp"
	}, {
		keywords:["webxpress", "web", "xpress", "webexpress", "express"],
		text:"WebXpress",
		link:"https://webxpress.stevenson.edu/WebAdvisor/WebAdvisor"
	}
];

function stringMatch(query) {
	"use strict";
	var words = query.toLowerCase().split(' ');
	var bestLinks = [];
	for(var i=0; i < quicklinks.length; i++) {
		var link = quicklinks[i];
		var keywords = link.keywords;
		var value = 0;
		for(var j=0; j < words.length; j++) {
			var word = words[j];
			if(word.length == 0) {
				break;
			}
			var wordValue = 0;
			for(var k=0; k < keywords.length; k++) {
				var keyword = keywords[k];
				var index = keyword.indexOf(word);
				if(index == 0) {
					// Exact match
					if(keyword.length == word.length) {
						wordValue = 4 + (word.length / keyword.length) + (1 - k / keywords.length);
						break;
					}
					// Prefix match
					else
						wordValue = Math.max(2 + (word.length / keyword.length) + (1 - k / keywords.length), wordValue);
				}
				// Match somewhere
				else if(index != -1) {
					wordValue = Math.max(0 + (word.length / keyword.length) + (1 - k / keywords.length), wordValue);
				}
				// No match, don't touch wordValue, it defaults to zero
			}
			value += wordValue;
		}
		if(value > 0)
			bestLinks.push({value:value, link:link});
	}
	
	bestLinks.sort(
		function(a, b) {
			if(a.value > b.value)
				return -1;
			else if(b.value > a.value)
				return 1;
			else
				return a.link.text.localeCompare(b.link.text);
		}
	);
	return bestLinks;
}


var fn = function() {
	"use strict";
var searchBox     = document.getElementById("gsc-i-id1");
if(searchBox == null) {
	setTimeout(fn, 500);
	return;
}
var searchForm    = document.getElementById("gsc");
//while(searchForm != null && searchForm.tagName != "FORM")
//	searchForm = searchForm.parentElement;

var suggestions   = document.createElement("ul");


searchBox.style.cssFloat = "none";
searchBox.autocomplete = "off";

suggestions.style.listStyle = "none";
suggestions.style.padding = "0";
suggestions.style.zIndex = "100000";
suggestions.style.position = "absolute";
suggestions.style.backgroundColor = "white";
suggestions.style.display = "none";

window.onresize = function() {
	suggestions.style.width = searchForm.offsetWidth + "px";
}

window.onresize();

for(var i = 0; i < quicklinks.length; i++) {
	var link = quicklinks[i];
	var listItem = document.createElement("li");
	var listLink = document.createElement("a");
	listLink.target = "_blank";
	listLink.href = link.link;
	listLink.innerHTML = link.text;
	listItem.appendChild(listLink);
	listItem.style.padding = "10px 10px";
	//listItem.style.borderTop = "1px solid black";
	listItem.style.borderBottom = "1px solid black";
	suggestions.appendChild(listItem);
	link.item = listItem;
}

searchForm.appendChild(suggestions);
searchForm.addEventListener("keyup", function(e) {
	if(e.which == 13) {
		for(var i = 0; i < quicklinks.length; i++) {
			if(searchBox.value != "" && quicklinks[i].text.toLowerCase().indexOf(searchBox.value.toLowerCase()) != -1) {
				e.preventDefault();
				e.stopPropagation();
				window.location = quicklinks[i].link;
				break;
			}
		}
	}
}, false);


searchBox.addEventListener("input", function() {
	var matches = stringMatch(searchBox.value);
	// empty suggestions
	while(suggestions.lastChild) {
		suggestions.removeChild(suggestions.lastChild);
	}
	
	for(var i = 0; i < matches.length; i++) {
		suggestions.appendChild(matches[i].link.item);
	}
	
	if(searchBox.value == "") {
		suggestions.style.display = "none";
	} else {
		suggestions.style.display = "block";
	}
}, false);
};

fn();