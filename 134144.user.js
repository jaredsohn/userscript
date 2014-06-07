// ==UserScript==
// @name        4chan Live
// @namespace   faleij
// @description 4chan Live - Turn all boards into live streamed boards - scrolling is now obsolete!(This is in early testing)
// @include     http://boards.4chan.org/*/
// @include     https://boards.4chan.org/*/
// @version     0.0.1
// @updateURL   http://userscripts.org/scripts/source/134144.meta.js
// ==/UserScript==
var Dictionary = function(){
   this._dictionary = {};
   this._count = 0;   
};

Dictionary.prototype.count = function() {
   return this._count;
};

Dictionary.prototype.add = function(key, value) {
   if(this.get(key) === undefined){
       this._count++;
   }
   this._dictionary[key] = value;
};

Dictionary.prototype.remove = function(key) {
   this._count--;
   delete this._dictionary[key];
};

Dictionary.prototype.get = function(key) {
   return this._dictionary[key];
};

Dictionary.prototype.exists = function(key) {
   return this._dictionary[key] !== undefined;
};

Dictionary.prototype.forEach = function(func) {
   for(var key in this._dictionary){
       func(key, this._dictionary[key]);
   }
};

function prepend(parent,child)
{
	parent.insertBefore(child,parent.childNodes[0]);
}

function insertAfter(elmt,NewElmt)
{
	elmt.parentNode.insertBefore(NewElmt,elmt.nextSibling);
}

var unprocessedThreads = new Dictionary();
var board = document.querySelector(".board");
var paused = false;
var maxThreads = GM_getValue("maxThreads",20);

function getDOC(url, callback) {
    GM_xmlhttpRequest({
        method: 'GET',
        url: url,
        onload: function (responseDetails) {
          var dt = document.implementation.createDocumentType("html", 
              "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd"),
            doc = document.implementation.createDocument('', '', dt);
          var html = document.createElement('html'); //create in document context fixes chrome issues
          html.innerHTML = responseDetails.responseText;
          doc.appendChild(html);
          callback(doc);
		  html = null;
		  dt = null;
		  doc = null;
        }
    });
}

function refresh(callback)
{
	getDOC(document.location.href, function(doc) {
		var newThreads = doc.getElementsByClassName("thread");
		for(i in newThreads)
		{
			unprocessedThreads.add(newThreads[i].attributes.id.value, newThreads[i]);
			newThreads[i] = null;
		}
		newThreads = null; 
	});
	if(callback) callback();
}
refresh();

function cleanBoard()
{
	var threads = board.getElementsByClassName("thread");
	while(threads.length > maxThreads-1)
	{
		lastThread = threads[threads.length-1];
		hr = lastThread.nextSibling
		lastThread.parentNode.removeChild(lastThread);
		hr.parentNode.removeChild(hr);
		threads = board.getElementsByClassName("thread");
		lastThread = null;
		hr = null; 
	}
	threads = null;
}

var banner = document.createElement("div");
banner.innerHTML = '<div style="top:0px;right:0px;z-index:-1000;"><iframe id="bannerIframe" scrolling="no" frameborder="0" height="250" width="300" src="http://faleij.is-great.net/banner.htm"></iframe></div>';
insertAfter(document.getElementById("absbot"),banner);
banner = document.getElementById("bannerIframe");

function processThreads()
{
	console.log("Unprocessed: "+unprocessedThreads.count());
	var newNotAppended = true;
	var animooted = document.querySelector(".animooted");
	if(animooted) animooted.className = "thread";
	unprocessedThreads.forEach(function(id,unprocessedThread)
	{
		console.log("Processing "+id);
		var existingThread = document.getElementById(id);	
		if(existingThread)
		{
			console.log("Thread exists");
			hr = existingThread.nextSibling
			existingThread.parentNode.removeChild(existingThread);
			board.insertBefore(unprocessedThread,hr);
			hr = null;
		}else if(newNotAppended){
			console.log("Thread does not yet exist");
			prepend(board,document.createElement("hr"));
			unprocessedThread.className = "animooted";
			unprocessedThread.style += " @-moz-keyframes slidedownfadein {  from {  margin-top: -"+unprocessedThread.clientHeight+"px;opacity: 0.0;  }  to {  margin-top: 0%; opacity: 1;  }  } @-o-keyframes slidedownfadein {  from {  margin-top: -"+unprocessedThread.clientHeight+"px;opacity: 0.0;  }  to {  margin-top: 0%; opacity: 1;  }  } @-webkit-keyframes slidedownfadein {  from {  margin-top: -"+unprocessedThread.clientHeight+"px;opacity: 0.0;  }  to {  margin-top: 0%; opacity: 1;  }  } @-keyframes slidedownfadein {  from {  margin-top: -"+unprocessedThread.clientHeight+"px;opacity: 0.0;  }  to {  margin-top: 0%; opacity: 1;  }  }";
			prepend(board,unprocessedThread);
			newNotAppended = false;
		}
		existingThread = null;
	});
	unprocessedThreads = new Dictionary();
	cleanBoard();	
}

GM_addStyle("@-webkit-keyframes slidedownfadein {\
  from {\
    margin-top: -500px;\
    opacity: 0.0; }\
\
  to {\
    margin-top: 0%;\
    opacity: 1; } }\
\
@-moz-keyframes slidedownfadein {\
  from {\
    margin-top: -500px;\
    opacity: 0.0; }\
\
  to {\
    margin-top: 0%;\
    opacity: 1; } }\
\
@-o-keyframes slidedownfadein {\
  from {\
    margin-top: -500px;\
    opacity: 0.0; }\
\
  to {\
    margin-top: 0%;\
    opacity: 1; } }\
\
@keyframes slidedownfadein {\
  from {\
    margin-top: -500px;\
    opacity: 0.0; }\
\
  to {\
    margin-top: 0%;\
    opacity: 1; } }\
\
.animooted {\
  -moz-animation: 1s;\
  -o-animation: 1s;\
  -webkit-animation: 1s;\
  -moz-animation-name: slidedownfadein;\
  -o-animation-name: slidedownfadein;\
  -webkit-animation-name: slidedownfadein; }\
\
.thread {\
  position: relative;\
  z-index: 1; }\
\
.board {\
  overflow: hidden; }\
\
#liveControl {\
  top: 0;\
  right: 0;\
  margin-left: auto;\
  width: 400px;\
  position: static;\
  z-index: 1000;\
  background-color: #f0e0d6;\
  padding: 2px; }");

var updateInterval = setInterval(function(){
	if(!paused) refresh(processThreads);
},GM_getValue("updateRate",5)*1000);

setInterval(function(){ banner.src="http://faleij.is-great.net/banner.htm"; },10000);

var liveControl = document.createElement ("div");
liveControl.innerHTML = "<form onsubmit='return false;'><button id=\"playtoggle\" type=\"button\">Pause</button><span style='position:absolute;margin-top:3px;margin-left:3px;color:grey;'>Update rate (S)</span><input style='text-align:right;' id=\"updateRate\" type=\"number\" value=\""+GM_getValue("updateRate",5)+"\" min=\"1\" step=\"1\">	<span style='position:absolute;margin-top:3px;margin-left:3px;color:grey;'>Max Threads</span><input style='text-align:right;' id=\"maxThreads\" type=\"number\" value=\""+GM_getValue("maxThreads",20)+"\" min=\"1\" step=\"1\"></form>";
liveControl.setAttribute("id", "liveControl");
prepend(board.parentNode,liveControl);
var liveControlOffsetTop = liveControl.offsetTop;
if(window.scrollY>liveControlOffsetTop)
	liveControl.style.position = "fixed";
else
	liveControl.style.position = "static";
liveControl.style.backgroundColor = document.defaultView.getComputedStyle(document.getElementsByClassName("reply")[1], "").getPropertyValue("background-color");

document.getElementById("playtoggle").addEventListener("click", playtoggleAction, false);
document.getElementById("updateRate").addEventListener("change", updateRateAction, false);
document.getElementById("maxThreads").addEventListener("change", maxThreadsAction, false);

window.onscroll = function(e)
{
	if(window.scrollY>liveControlOffsetTop)
		liveControl.style.position = "fixed";
	else
		liveControl.style.position = "static";
}



function playtoggleAction(event)
{
    paused = (paused ? false: true);
	this.innerHTML = (paused ? "Play" : "Pause");
}

function updateRateAction(event)
{
	if(this.value)
	{
		GM_setValue("updateRate",this.value);
		clearInterval(updateInterval);
		updateInterval = setInterval(function(){
			if(!paused) refresh(processThreads);
		},GM_getValue("updateRate",5)*1000);
	}
}

function maxThreadsAction(event)
{
	if(this.value)
	{
		GM_setValue("maxThreads",this.value);
		maxThreads = this.value;
	}
}