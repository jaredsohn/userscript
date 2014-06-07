// Queue object available here http://safalra.com/web-design/javascript/queues/
// Idea and core functionality based on Google Reader Preview available here http://userscripts.org/scripts/review/8561
// Copyright (c) 2010, kossib
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// --------------------------------------------------------------------
// ==UserScript==
// @namespace     localhost
// @name          Previewer
// @description   Google Reader Demotywatory & mistrzowie org, naprawilem.pl Displays the big image in google reader preview.
// @include         *reader.google.*/reader/*
// @include         *www.google.*/reader/*
// @version         0.24
// ==/UserScript==




function Queue(){var _1=[];var _2=0;this.getSize=function(){return _1.length-_2;};this.isEmpty=function(){return (_1.length==0);};this.enqueue=function(_3){_1.push(_3);};this.dequeue=function(){var _4=undefined;if(_1.length){_4=_1[_2];if(++_2*2>=_1.length){_1=_1.slice(_2);_2=0;}}return _4;};this.getOldestElement=function(){var _5=undefined;if(_1.length){_5=_1[_2];}return _5;};}
var q = new Queue();


document.getElementsByClassName = function(className, parentNode) {
  var elements = [];
  var parent = parentNode;
  if (parentNode == undefined) {
	  parent = document.body;
  }
  if (parent.getElementsByTagName == undefined) {
	  return elements;
  }
  var children = parent.getElementsByTagName('*');
  for (var i = 0; i < children.length; i ++) {
	var child = children[i];
    if (child.className.match(new RegExp("(^|\\s)" + className + "(\\s|$)"))) {
      elements[elements.length] = child;
	}
  }
  return elements;
}

var decorate_new_elements = function(e) {
	var element = e.target;
	 if (element.className != "entry-container" && element.className.lastIndexOf("entry entry-")<0) {
		return;
	}
	var elements = document.getElementsByClassName("entry-title", element);
	if ((elements == undefined) || (elements.length == 0)) {
		return;
	}
	var entry_title = elements[elements.length - 1];
	var href_array = /href=\"(http:\/\/[^\"]*)\"/.exec(e.target.innerHTML);


	if (href_array == undefined || href_array.length == 0) {
		return;
	}
	var href = unescapeHTML(href_array[1]);
	
	elements = document.getElementsByClassName("entry-body", element);
	if (elements != undefined && (elements.length > 0)) {
	GM_log('new link: '+href);	
		// Turn on preview for URLs that match the strings below.
		/*
		if ((href.toLowerCase().lastIndexOf("demotywatory.pl")>-1))
		{
			q.enqueue( {body:elements[elements.length-1], href:href} );
			if (q.getSize()==1)
				setTimeout(processQueue, 0);
			return;
		};
		*/
		if (href.toLowerCase().lastIndexOf("mistrzowie.org")>-1)
		{
			q.enqueue( {body:elements[elements.length-1], href:href} );
			if (q.getSize()==1)
				setTimeout(processQueue_mistrzowie_org, 0);
			return;
		};
		// if (href.toLowerCase().lastIndexOf("nomusk.pl")>-1)
		// {
			// q.enqueue( {body:elements[elements.length-1], href:href} );
			// if (q.getSize()==1)
				// setTimeout(processQueue_nomusk, 0);
			// return;
		// };
		if (href.toLowerCase().lastIndexOf("naprawilem.pl")>-1)
		{
			var tmp2 = /[0-9]{3,}/.exec(entry_title.innerHTML);
			elements[elements.length - 1].innerHTML = '<img src="http://www.naprawilem.pl/upload/file/' +tmp2 + '.jpg">';
			return;
		};
		if (href.toLowerCase().lastIndexOf("feedsportal.com")>-1)
		{
		var elements2 = elements[elements.length-1].parentNode.parentNode.getElementsByTagName("a");
		 // GM_log('par: '+elements2[0].parentNode.innerHTML);	
		var txt = elements2[0].parentNode.innerHTML;
			// GM_log('link: '+txt);	
		txt = txt.replace(/0B/gi, ".");
		txt = txt.replace(/0C/gi, "/");
		txt = txt.replace(/0H/gi, ",");
		txt = txt.replace(/0A/gi, "0");
		txt = txt.replace(/0I/gi, "_");
		txt = txt.replace(/0E/gi, "-");
		txt = txt.replace(/0s/gi, "");
		txt = txt.replace(/0n/gi, ".com");
		txt = txt.replace(/http[\S]*l\/0L/, "http://");
		txt = txt.replace(/\/story[\S]*\.htm/gi, "");
			// GM_log('new link: '+txt);	
	
		elements2[0].parentNode.innerHTML = txt;
		elements2 = document.getElementsByClassName("view-enclosure-parent", elements[elements.length-1].parentNode);	
		elements2[0].parentNode.removeChild(elements2[0]);
			return;
		};
	}
}
var processing = false;



function processQueue() {
	if(q.getSize() == 0) {
		setTimeout(processQueue, 1000);
		return;
	}
	if (processing)
		return;
		
	processing = true;
	var itm = q.getOldestElement();
	GM_xmlhttpRequest({
		method:"GET",
		url:itm.href,
		onload:function(xmlhttp) {
			var itm = q.dequeue();
			processing = false;
			if (q.getSize()>0)
				setTimeout(processQueue, 100);
			if (!(xmlhttp.readyState==4 && xmlhttp.status==200))
				return;
			var bigurl = /bigurl=\"(http:\/\/[^\"]*)\"/.exec(xmlhttp.responseText); 
			itm.body.innerHTML = (bigurl != undefined && bigurl.length > 0) 
									? "<img src='"+ bigurl[1]+"'></img>"
									: "deleted";
			// console.log('itm.body.innerHTML = ', itm.body.innerHTML);
		}
	});
}

function processQueue_mistrzowie_org() {
	if(q.getSize() == 0) {
		setTimeout(processQueue_mistrzowie_org, 1000);
		return;
	}
	if (processing)
		return;
		
	processing = true;
	var itm = q.getOldestElement();
	GM_xmlhttpRequest({
		method:"GET",
		url:itm.href,
		onload:function(xmlhttp) {
			var itm = q.dequeue();
			processing = false;
			if (q.getSize()>0)
				setTimeout(processQueue_mistrzowie_org, 100);
			if (!(xmlhttp.readyState==4 && xmlhttp.status==200))
				return;
			 GM_log('href: '+itm.href);		
			// var bigurl = /bigurl=\"(uimages\/[^\"]*)\"/.exec(xmlhttp.responseText); 
			// http://mistrzowie.org/uimages/services/mistrzowie/i18n/pl_PL//201108/1312461505_by_zembol94_org.JPG
			// var bigurl = /\"http:\/\/.mistrzowie\.org\/(uimages\/[^\"]*)jpg\"/.exec(xmlhttp.responseText); 
			// var bigurl = /src=\"http:\/\/mistrzowie\.org\/\/(uimages\/services\/mistrzowie[^\"]*)\.jpg\"/.exec(xmlhttp.responseText); 
			// var bigurl = /src=\"http:\/\/mistrzowie\.org\/\/(uimages\/services\/mistrzowie[^\"]*)\.jpg\?[0-9]{5,}\"/.exec(xmlhttp.responseText); 
			// /[^\"]*\.jpg\?[0-9]{5,}\"/.exec(document.documentElement.outerHTML)
			var bigurl = /[^\"]*\.jpg\?[0-9]{5,}/.exec(xmlhttp.responseText); 
			
			// for(var i = 0; i< bigurl.length ; i++){
			GM_log('link: '+bigurl[0]);		
			itm.body.innerHTML = (bigurl != undefined && bigurl.length > 0) 
									? '<img src="http://mistrzowie.org/'+ bigurl[0]+'"></img>'
									: "deleted"; 
									// }
		}
	});
}

function processQueue_nomusk() {
	if(q.getSize() == 0) {
		setTimeout(processQueue_mistrzowie_org, 1000);
		return;
	}
	if (processing)
		return;
		
	processing = true;
	var itm = q.getOldestElement();
	GM_xmlhttpRequest({
		method:"GET",
		url:itm.href,
		onload:function(xmlhttp) {
			var itm = q.dequeue();
			processing = false;
			if (q.getSize()>0)
				setTimeout(processQueue_mistrzowie_org, 100);
			if (!(xmlhttp.readyState==4 && xmlhttp.status==200))
				return;
			// GM_log('href: '+itm.href);		
			// var bigurl = /bigurl=\"(uimages\/[^\"]*)\"/.exec(xmlhttp.responseText); 
			var bigurl = /\"http:\/\/static\.nomusk\.pl\/([^\"]*)\"/.exec(xmlhttp.responseText); 
			// for(var i = 0; i< bigurl.length ; i++){
			// GM_log('link: '+bigurl[0]);		
			itm.body.innerHTML = (bigurl != undefined && bigurl.length > 0) 
									? "<img src="+ bigurl[0]+"></img>"
									: "deleted"; 
									// }
		}
	});
}


function unescapeHTML(html) {
var htmlNode = document.createElement("DIV");
htmlNode.innerHTML = html;
if(htmlNode.innerText)
	return htmlNode.innerText; // IE
return htmlNode.textContent; // FF
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

addGlobalStyle('html , body {height:100% !important;}');
document.body.addEventListener('DOMNodeInserted', decorate_new_elements, false);

// document.body.addEventListener('DOMNodeInsertedIntoDocument', decorate_new_elements, false);
//.user.js