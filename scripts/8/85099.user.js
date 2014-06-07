// ==UserScript==
// @name           digghunter
// @namespace      zmarn
// @description    Marks digguser on reddit
// @include        http://*.reddit.com/*
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


	function get_userdata(username, blame) {
		var x = new XMLHttpRequest();
		GM_xmlhttpRequest({
			method: 'GET',
			url: "http://www.digg.com/" + username,
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'application/atom+xml,application/xml,text/xml',
			},
			onload: function(responseDetails) {
				if(responseDetails.status != 404){
					blame(responseDetails);
				}
			}
		});		
	}

	function check_username(node) {
		var username = $X("./a", node);
		var blame = function(response) {			
			var tags = $X("./span[@class='userattrs']", node);
								
			var diggs = response.responseText.split("stats-bottom group")[1].split("</dd>")[0].split("<dd>")[1];
			
			var wtag = document.createElement("a");
			wtag.innerHTML = " [Digger]";
			wtag.href = "http://digg.com/" + username.innerHTML;
			wtag.title = "The enemy is within our ranks! And has " + diggs + "diggs!" ;
			wtag.style.color = "red";
			
			tags.insertBefore(wtag, tags.firstChild);
			
		};
		if(username){
			get_userdata(username.innerHTML, blame);
		}
	}
	

	var usernames = $x("//p[@class='tagline']", document);
	for (var i = 0; i < usernames.length; ++i) {
		check_username(usernames[i]);
	}
	
	