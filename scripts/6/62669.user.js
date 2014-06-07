// ==UserScript==
// @name           Userscripts.org Forum Post Reply Link
// @namespace      KHMI - Greasemonkey
// @include        http://userscripts.org/topics/*
// @description    adds a "Reply" link to each post on the userscripts.org forum
// ==/UserScript==

// regex patterns
var user_id_re = /user_id="(\d{1,7})"/;
var user_name_re = /text="(.+?)"/;

// get the current page of the topic
var page = window.location.href.split("/")[4];

var post_hentry = getElements("*", "class", "post hentry ");

// add a button for each post
for(var i=0;i<post_hentry.length;i++){	
	// create reply html
	var row = post_hentry[i];
	var post_id = row.id.replace(/row-/, "");
	var user_id = row.innerHTML.match(user_id_re)[1];
	var user_name = row.innerHTML.match(user_name_re)[1];
	var user_content = row.cells[1].innerHTML.replace(/<!-- .* -->/, "");
	var html = '<blockquote>\r\n' +
		'<strong><a href="/users/' + user_id + '">' + user_name + '</a></strong>&nbsp;<a href="/topics/' + page + '#posts-'+ post_id + '">wrote</a>:\r\n' +
		user_content + '\r\n' +
		'</blockquote>';
		
	// create the reply link
	var author_vcard = post_hentry[i].cells[0];
	var span = document.createElement("span");
	span.setAttribute("class","replyquote");
	var link = document.createElement("a");
	link.setAttribute("onclick","ReplyForm.init(); return false;");
	
	// add the click event
	link.addEventListener('click', (function(n) {
		return function (e) {
			e.preventDefault();
			copytoreply(n);
		};
	})(html), true);

	link.setAttribute("href","#");
	link.setAttribute("class","quote");
	link.setAttribute("title", "Reply directly to this post");
	link.innerHTML = "Reply";
	span.appendChild(link);
	author_vcard.appendChild(span);
}

// inject the CSS
var css = 'a.quote { color:#CC0000 !important; font-weight:normal; text-decoration:underline !important; }' +
	'.replyquote { display:block; clear:left; padding-top:10px;} ';
addGlobalStyle(css);

function copytoreply(html) {
	var post_body = document.getElementById("post_body");
	post_body.value = html;
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function getElements(element, classname, value){      
   var elements = [];   
   var xpathExp = "//" + element;   
   
   if(classname != undefined)
      if(value != undefined)
         xpathExp = xpathExp + "[@" + classname + "='" + value + "']";
      else
         xpathExp = xpathExp + "[@" + classname + "]";  
         
   var allElements = document.evaluate(xpathExp, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
   for (var i = 0; i < allElements.snapshotLength; i++)
      elements.push(allElements.snapshotItem(i))
      
   return elements;
}