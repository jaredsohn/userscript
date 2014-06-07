// del.icio.us Backpack - release 0.1
// 
// A Greasemonkey script to display your most recent del.icio.us
// posts on your Backpack home page. The script will prompt you
// for your del.icio.us username and number of links to display 
// upon the first run.  You can later change these values through 
// the Greasemonkey User Script Commands menu.
// 
// This script licensed under the MIT license.  Play nice. :-)
// ----------------------------------------------------------------
//
// Copyright (c) 2007 Thomas Mayfield
//
// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation
// files (the "Software"), to deal in the Software without
// restriction, including without limitation the rights to use,
// copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the
// Software is furnished to do so, subject to the following
// conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
// OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
// HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
// WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
// OTHER DEALINGS IN THE SOFTWARE.
//
// ----------------------------------------------------------------
//
// ==UserScript==
// @name          del.icio.us Backpack
// @namespace     http://www.zen-hacking.com/
// @description   Displays recent del.icio.us posts on backpack
// @include       http://*.backpackit.com/
// ==/UserScript==

if (!GM_xmlhttpRequest || !GM_getValue || !GM_registerMenuCommand) {
    alert('Please upgrade to the latest version of Greasemonkey.');
    return;
}

function setUserName(){ 
    var username = prompt("Enter del.icio.us username: ");
    GM_setValue('username', username);
    return username;
}

function setNumLinks(){ 
    var numlinks = prompt("How many links do you want to display?");
    GM_setValue('numlinks', numlinks);
    return numlinks;
}

GM_registerMenuCommand('Set del.icio.us username', setUserName);
GM_registerMenuCommand('Set number of links displayed', setNumLinks);

var username = GM_getValue('username');
if (!username)
    username = setUserName();

var numlinks = GM_getValue('numlinks'); 
if (!numlinks) 
    numlinks = setNumLinks();

GM_xmlhttpRequest({method: 'get',
	    url:'http://del.icio.us/feeds/json/'+username+'?count='+numlinks+'&raw=true',
	    onload:	function(data){
	    try{
		var links = eval(data.responseText);
		var wrapper = document.createElement('div')
		    for (var i in links) {
			var post = links[i];
			var post_wrapper = document.createElement('div');
			post_wrapper.style.marginLeft = "10px;";
			post_wrapper.style.paddingLeft = "3px";
			post_wrapper.style.paddingBottom = "10px;"
			
			var a = document.createElement('a');
			a.setAttribute('href', post.u);
			a.style.paddingLeft = "0px";
			a.style.paddingBottom = "0px";
			a.appendChild(document.createTextNode(post.d))
			post_wrapper.appendChild(a);

			if(post.n){
			    var note = document.createElement('div');
			    note.innerHTML = post.n;
			    note.style.color = "#555";
			    post_wrapper.appendChild(note);
			}
			wrapper.appendChild(post_wrapper);

		    }
		var header = document.createElement('h3');
		header.style.paddingLeft = "12px;";
		header.style.paddingBottom = "0px;";
		header.style.marginLeft = "3px";
		header.style.borderBottom = "1px solid #bbb";
		header.innerHTML = "My del.icio.us links";
		document.getElementById('Pages').appendChild(header);
		document.getElementById('Pages').appendChild(wrapper);
	    }
	    catch(e){
		var error = "Something exploded while fetching your del.icio.us links.  Sad panda!  Details of error:"+e.toString();
		document.getElementById('Pages').appendChild(document.createTextNode(error));
	    }
	}
    })

