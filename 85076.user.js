// ==UserScript==
// @name          Mark weak accounts
// @namespace     --
// @description    Marks weaker accounts with a star
// @include         http://*.reddit.com/*
// @exclude        http://*.reddit.com/compose/*
// @exclude        http://*.reddit.com/prefs/*
// @exclude        http://*.reddit.com/message/moderator/*
// @exclude        http://*.reddit.com/message/messages/*
// @exclude        http://*.reddit.com/compose
// @exclude        http://*.reddit.com/reddits/*
// ==/UserScript==

/*Copyright (c) 2010 Michael McKinley and than someone did something

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
if(document.evaluate( '//*[contains(concat( " ", @class, " " ), concat( " ", "user", " " ))]//a', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue){
	var selfname = document.evaluate( '//*[contains(concat( " ", @class, " " ), concat( " ", "user", " " ))]//a', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.textContent;  
	var selfkarma; 
	 
	function $x( xpath, root ) {
	  var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;
	  var got = doc.evaluate( xpath, root||doc, null, 0, null ), result = [];
	  switch (got.resultType) {
		case got.STRING_TYPE:
		  return got.stringValue;
		case got.NUMBER_TYPE:
		  return got.numberValue;
		case got.BOOLEAN_TYPE:
		  return got.booleanValue;
		default:
		  while ((next = got.iterateNext()))
		result.push( next );
		  return result;
	  }
	}

	function $X( xpath, root ) {
	  var got = $x( xpath, root );
	  return got instanceof Array ? got[0] : got;
	}


	function get_userdata(username, show_age) {
		var x = new XMLHttpRequest();
		x.open("GET", "http://www.reddit.com/user/" + username + "/about.json", true);
		x.onreadystatechange=function() {
			
			if (x.readyState==4 && x.status==200) {
				show_age(x.responseText);
			}
		};
		x.send();
	}

	function check_username(node) {
		var username = $X("./a", node);
		var show_age = function(json) {
			var jdats = JSON.parse(json);		
			var karma = jdats.data.link_karma + jdats.data.comment_karma;
			
			if (karma < selfkarma) {
				var tags = $X("./span[@class='userattrs']", node);
								
				var wtag = document.createElement("span");
				wtag.innerHTML = unescape("%u2605");
				wtag.title = karma + " combikarma";
				wtag.style.color = "#F0D100";
			
				tags.insertBefore(wtag, tags.firstChild);
			}
		};
		if(username){
			get_userdata(username.innerHTML, show_age);
		}
	}

	var check_users = function(json) {
		var jdats = JSON.parse(json);
		
		selfkarma = jdats.data.link_karma + jdats.data.comment_karma;
		
		var usernames = $x("//p[@class='tagline']", document);
		for (var i = 0; i < usernames.length; ++i) {
			check_username(usernames[i]);
		}
	}

	get_userdata(selfname, check_users);
}