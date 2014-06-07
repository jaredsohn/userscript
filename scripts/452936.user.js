// ==UserScript==
// @name           ouija-board
// @namespace      http://userscripts.org/users/133663
// @description    Integrates Fuuka archiver with original 4chan boards to a very limited degree: allows 4chan posters to communicate with spirits!
// @include        http://warosu.org/*/thread/*
// @include        https://warosu.org/*/thread/*
// @include        http://boards.4chan.org/*/res/*
// @include        https://boards.4chan.org/*/res/*

// @grant GM_setValue
// @grant GM_getValue
// @grant GM_setClipboard
// @grant unsafeWindow

// @version        0.14
// ==/UserScript==

// Configuration defaults block
// next -> put these in cookies and have a configuration pop-up

var img_ghost = "data:image/gif;base64,R0lGODlhDgAOANEBAAAAAN7e3v8AAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQJFAAAACwAAAAADgAOAAACJIQdGcegvxiEZ05kHw5CpK44Csh52YlO5Gpyn7mmVygutIhVBQAh+QQJFAAAACwAAAAADgAOAAACJYQdGcegvxiEZ05kHw5CpK44Csh52YlO5Gpyn7mmmZjQS41VSwEAOw==";
var img_trash = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAytJREFUeNp8VEtIVFEY/s+5d4YRyzszampiPphqIUILgzAxFITQna4EgxFBEoxctHEXuJDCnQsfCW4iBMOVboQiH01YEZQTPmZGG1LyNT7G0Jm5557Tf65zZaTycP97zv3Pf77z/a9LhBDwghCwBkcxUC5nZFzLrqy8JwDwAUIY45uzs29OTk42KSoonB9q6gfDfafbXaxSqlX39w+4NO02i0YRSoDqdsNWc/O7952djxNCHEX399dSDxPJaAgZxfHjjtfbfevhwyfk6EghlNp+1NaC4Nw0VJxOKJqaAiMS0YWmJeZ7e59+GR/vdUgQaWC6hp58amt7xpaXxWpmpgjabCJAqVjB7VQJKooIqqoIFxUJFgjE573enmFFcQ5YQB8aGx8xn08ECgvFN1QtoPj/I3JP2gQ9HpGYmBBTdXXtQwA5ppsnu7v7JC0NslpagNpsMrTwz4GXQtJVrusYUCfoBwdR1MZNoKXp6ZeusbGK6x5Pe6izEyQoUVVQ7HZgx8eIS0BJTweOa24YIOJx8AwPw9eRkec/fb5RmWgzizK/B2trS3o4DCQ/H4oHB0HJzZU6uNrVBVmtrRAJhcBeWgrFfX2gUwpsYwMifv9nIwlyVg4KgI3FYpDZ1ASHhMxf6egANS8PaFlZ8FJ19S9pmOP1soO0tI+5DQ0gbfGM3QoCTfXfQBGMwaHfvyeTwDBesXD4N9vaihvIAhIJfri4uAe4lrap41yBcgmEwcSbqFwzFCJthCC6tUcINXC+GCjZHvKgZKRbmbLWMmO4lpfw02r+G0gqORqKUxbmzFLcZsmknAFdwIhIINM9IbhIZcG5sNiZ/JJAVqDFuabFwxxrx1AUcGRnOzjOTMbE5VIxuEpcgqgqcWRlORKyrlD0JEliMZKvaCAQctXUQHhyEpx2+93vAwOwg7USW1m5ue3z5UfQxj86atMMoyI0MwOZ5eWwt76+SlO7X/6PENpxv6fndXpBQX0cAWTRUaxsglVs/pAcDjCwdlRkmV5SAtsLC6/ednc/UE5zdA5ItoV2o6qq3qZpTtzgVlPL6az7KKWxnZ3dlbm5SdQdW/o/AgwAlbfHKhLH3GsAAAAASUVORK5CYII=";
var img_config = ""; // this isn't used yet obviously

var css_ghostreply = "td.ghostreply{border:1px solid #D9BFB7;border-left:none;border-top:none;padding:2px;}.ghostreply {background:none repeat scroll 0 0 #98c1a9;color:#000000;}";
var css_deletedreply = "td.deletedreply{border:1px solid #6E6E6E;border-left:none;border-top:none;padding:2px;}.deletedreply {background:none repeat scroll 0 0 #BDBDBD;color:#000000;}";

var dsp_ghostreply = true;
var dsp_deletedreply = true;
var dsp_submitchan = false; // It doesn't work

// End configuration


var board,thread;

if (/4chan/.test(window.location.href)){
	board = /http:\/\/boards\.4chan\.org\/([^\/]+)/.exec(window.location.href)[1];
	thread = /http:\/\/boards\.4chan\.org\/[^\/]+\/res\/(\d+)/.exec(window.location.href)[1];
	addCss(".code { white-space: pre }.o { text-decoration: overline; }.u { text-decoration: underline; }.aa { font-family:Mona,'MS PGothic' !important; }.s { text-decoration: line-through; }.banned { font-weight: bold; color: red; }.admin{ color: #c00000 !important; }.mod{ color: #800080 !important; }"); // bbcode
	if (dsp_ghostreply) { addCss(css_ghostreply); }
	if (dsp_deletedreply) { addCss(css_deletedreply); }
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://warosu.org/"+board+"/thread/"+thread,
		onload: function(response) {
			if (!response.responseXML) {
				response.responseXML = new DOMParser().parseFromString(response.responseText, "text/xml");
			}
			if (dsp_ghostreply) {
				var ghstrep = getElementsByAttribute(response.responseXML,"td","class","postContainer replyContaine");
				for(var i = ghstrep.length-2; i >= 0; i--){
					var j = /p(\d+)/.exec(ghstrep[i].getAttribute("id"))[1];
					var k = "id"; // this is awfully crude but it should fix first replies
					if (j == thread) { j = "doubledash"; k = "class"; }
					var ot = getElementsByAttribute(document,"td",k,j)[0].parentNode.parentNode.parentNode;
					insertAfter(ot.parentNode, formatAsGhostPost(ghstrep[i].innerHTML), ot);
					var ah = document.createElement("a"); ah.setAttribute("name",/p(.+)/.exec(ghstrep[i].getAttribute("id"))[1]);
					insertAfter(ot.parentNode, ah, ot);
				}
			}
			if (dsp_deletedreply) {
				var delrep = getElementsByAttribute(response.responseXML,"td","class","thread");
				for(var i = delrep.length-1; i >= 0; i--){ 
					if (/\[DELETED\]/.test(delrep[i].innerHTML)){
						var j,k;
						if (i==0) {
							j = "doubledash"; k = "class";
						} else {
							j = /p(\d+)/.exec(delrep[i-1].getAttribute("id"))[1];
							k = "id";
						}
						var ot = getElementsByAttribute(document,"td",k,j)[0].parentNode.parentNode.parentNode;
						insertAfter(ot.parentNode, formatAsDeletedPost(delrep[i].innerHTML), ot);
						var ah = document.createElement("a"); ah.setAttribute("name",/p(.+)/.exec(delrep[i].getAttribute("id"))[1]);
						insertAfter(ot.parentNode, ah, ot);
					}
				}
			}
		}
	});
} else {
	board = /http:\/\/warosu\.org\/([^\/]+)/.exec(window.location.href)[1];
	thread = /http:\/\/warosu\.org\/[^\/]+\/thread\/S*(\d+)/.exec(window.location.href)[1];
	if (dsp_postchan){
		var tooltip = getElementsByAttribute(document,"a","href","#");
		for(var i in tooltip){
			tooltip[i].innerHTML=tooltip[i].innerHTML.replace("Don't expect anything heroic. Your post will not be uploaded to original board.","Expect great things.");
		}
		var botan = getElementsByAttribute(document,"input","value","Submit");
		var addthis = document.createElement("input");
		addthis.setAttribute("type","button");
		addthis.setAttribute("value","Post to /"+board+"/");
		addthis.addEventListener("click", heroism, false);
		insertAfter(botan[1].parentNode, addthis, botan[1]);
	}
}

// These functions are just placeholder garbage that gets the job done, pending json
function formatAsGhostPost(postCode) {
	var nt = document.createElement("table");
	var nb = document.createElement("tbody");
	var nr = document.createElement("tr");
	var ndash = document.createElement("td");
	ndash.setAttribute("class","doubledash");
	ndash.innerHTML = "&gt;&gt;";
	var nrep = document.createElement("td");
	nrep.setAttribute("class","ghostreply");
	nrep.innerHTML = postCode;
	nrep.innerHTML = nrep.innerHTML.replace("[INTERNAL]","[GHOST]");
	nrep.innerHTML = nrep.innerHTML.replace("This is not an archived reply","This post was made from beyond the grave");
	nrep.innerHTML = nrep.innerHTML.replace('/media/internal.png',img_ghost);
	nrep.innerHTML = nrep.innerHTML.replace('/media/deleted.png',img_trash);
	nr.appendChild(ndash);
	nr.appendChild(nrep);
	nb.appendChild(nr);
	nt.appendChild(nb);
	return nt;
}
function formatAsDeletedPost(postCode) {
	var nt = document.createElement("table");
	var nb = document.createElement("tbody");
	var nr = document.createElement("tr");
	var ndash = document.createElement("td");
	ndash.setAttribute("class","doubledash");
	ndash.innerHTML = "&gt;&gt;";
	var nrep = document.createElement("td");
	nrep.setAttribute("class","deletedreply");
	nrep.innerHTML = postCode;
	nrep.innerHTML = nrep.innerHTML.replace('/media/deleted.png',img_trash);
	nrep.innerHTML = nrep.innerHTML.replace('src="/board/jp/thumb/','src="http://warosu.org/board/jp/thumb/');
	nr.appendChild(ndash);
	nr.appendChild(nrep);
	nb.appendChild(nr);
	nt.appendChild(nb);
	return nt;
}

// Broken pile of shit, because GM_xmlhttpRequest isn't passing the right headers
// Fix this
function heroism() {
	var snam = document.getElementsByName("NAMAE")[0].value;
	var sema = document.getElementsByName("MERU")[0].value;
	var ssub = document.getElementsByName("subject")[0].value;
	var scom = document.getElementsByName("KOMENTO")[0].value;
	var spwd = document.getElementsByName("delpass")[0].value;
	var reqdata = "resto="+thread+"&name="+snam+"&email="+sema+"&sub="+ssub+"&com="+scom+"&pwd="+spwd+"&mode=regist";
	GM_xmlhttpRequest({
		method: "POST",
		url: "http://sys.4chan.org/"+board+"/post",
		data: reqdata,
		headers: {
			"Referer": "http://boards.4chan.org/"+board+"/res/"+thread,
			"Content-Type": "application/x-www-form-urlencoded"
		},
		onload: function(response) {
			if(/Detected JavaScript \+ cookies \+ blocked referer/.test(response.responseText)){
				alert("Detected JavaScript + cookies + blocked referer. ¯\\(°_o)/¯");
			}
		}
	});
}

// Generic code - I can't believe Javascript doesn't have this!
function getElementsByAttribute(oElm, strTagName, strAttributeName, strAttributeValue){
	var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
	var arrReturnElements = new Array();
	var oAttributeValue = (typeof strAttributeValue != "undefined")? new RegExp("(^|\\s)" + strAttributeValue + "(\\s|$)", "i") : null;
	var oCurrent;
	var oAttribute;
	for(var i=0; i<arrElements.length; i++){
		oCurrent = arrElements[i];
		oAttribute = oCurrent.getAttribute && oCurrent.getAttribute(strAttributeName);
		if(typeof oAttribute == "string" && oAttribute.length > 0){
			if(typeof strAttributeValue == "undefined" || (oAttributeValue && oAttributeValue.test(oAttribute))){
				arrReturnElements.push(oCurrent);
    }}} return arrReturnElements;
}
function insertAfter(parent, node, referenceNode) {
	parent.insertBefore(node, referenceNode.nextSibling);
}
function addCss(cssCode) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = cssCode;
	} else {
		styleElement.appendChild(document.createTextNode(cssCode));
	}
	document.getElementsByTagName("head")[0].appendChild(styleElement);
}