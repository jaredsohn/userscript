// ==UserScript==
// @name           NFOHump Modding Script
// @namespace      nfohump
// @version        1.1
// @include        http://www.nfohump.com/forum/*
// @include        http://nfohump.com/forum/*
// ==/UserScript==

//For extension compatibility.
var doc = document;

var css = "#headerlogonav_hump { background-image: url(http://i44.tinypic.com/vgsqt.gif) !important; } #navcontainer { font-size: 1px; color: rgb(80, 99, 134); }";
var heads = doc.getElementsByTagName("head");
if (heads.length > 0) {
    var node = doc.createElement("style");
    node.type = "text/css";
    node.appendChild(doc.createTextNode(css));
    heads[0].appendChild(node);
}

function loadScript(data) {
    var e = doc.createElement("script");
    e.type = "text/javascript";
    e.appendChild(doc.createTextNode(data));
    doc.getElementsByTagName("head")[0].appendChild(e);
}

var innerScript = "var names = []; \n\
var fields = []; \n\
var colors = []; \n\
var sync = 0; \n\
function loadExternalScript(url) \n\
{ \n\
	var e = document.createElement(\"script\"); \n\
	e.type = \"text/javascript\"; \n\
	e.src = url; \n\
	document.getElementsByTagName(\"head\")[0].appendChild(e); \n\
} \n\
function getElementsById(id, element) \n\
{ \n\
	var retVal = new Array(); \n\
	var j = 0; \n\
	var allElements = element.getElementsByTagName(\"*\"); \n\
	for (var i = 0; i < allElements.length; i++) \n\
	{ \n\
		if (allElements[i].id == id) \n\
			retVal[j++] = allElements[i]; \n\
	} \n\
	return retVal; \n\
} \n\
function createCookie(name, value, days) \n\
{ \n\
	if (days) { \n\
		var date = new Date(); \n\
		date.setTime(date.getTime()+(days*24*60*60*1000)); \n\
		var expires = \"; expires=\"+date.toGMTString(); \n\
	} \n\
	else var expires = \"\"; \n\
	document.cookie = name+\"=\"+value+expires+\"; path=/\"; \n\
} \n\
function readCookie(name) \n\
{ \n\
	var nameEQ = name + \"=\"; \n\
	var ca = document.cookie.split(';'); \n\
	for(var i=0;i < ca.length;i++) \n\
    { \n\
		var c = ca[i]; \n\
		while (c.charAt(0)==' ') c = c.substring(1,c.length); \n\
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length); \n\
	} \n\
	return \"1111111111\"; \n\
} \n\
function getUser(innerHTML) \n\
{ \n\
	var index1 = innerHTML.search(/<b>/i) + 3; \n\
	var index2 = innerHTML.search(/<\\/b>/i); \n\
    var name = innerHTML.slice(index1, index2); \n\
    if(name.indexOf(\"<spa\") === 0) \n\
    { \n\
        index1 = 29; \n\
        index2 = name.search(/<\\/span>/i); \n\
        name = name.slice(index1, index2); \n\
    } \n\
	return name; \n\
} \n\
var imga = \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAm9JREFUOE+lk+1Lk1EYh/1b9EuBkNQwCwU1pQQL5SmbTVHRabqcsyk627O5dLoXnbR0m/hSURu6jUa6Tbfp8AUzcWrpIvXZUKKNIghqw6+/nqdwUyw/1A2/Lweu65z7PuckAEj4n5xYUHuakhSuRrLTyafaJ+si4lc1kZaXlZTQUk7yx0qSThWoPUKie7ox/GK9H6vhRfi/bmD9ywqmgzZIXfWoNbLD3Gc3iT8KfsOCqCdgw/6PAGY/OWGkhvB0RwfbnhFLn+egWhChbLQgyhnKJ44JVG5hIg2HpnbNCHzfxsi2Fo/XFND4OqHzqzHgV0Gz2YGpfRtIFw9Fhmuhwv6cxJiAhiX6ZTk+fNukdxxA/5YKyjdSHJZ8TQTxIg+S5QY49qy4PZqL/EeZkpigw1FPOYNW+qgm9KzK0LUihmiWHxPUWTlomSmH0F2CwXdqaJfacVWTTsUEkonaA+9HJ/Tv1TTchr+VYLoYkvlamP0jyFanHcQEbTbuwWRwHKoNEjJf86kC0lsDi38YGQpWXNBsraAMPhV0W0q0veZBMF8JruXWMZDJfRcHep8cvd4HuCRPibcgGC+V3LUQsAfNEM1XodFb9qvnowK+g42mqRLYd0240pcG1sPk+BB5puLE6udFIdJVhwlqLDYwBmxwMGFgDiZ3jLhnvsPAoRTp2fg1Mql4UkiUDl+Pttqr4KAlBl83yJlqiN1VMKx2wU7DPDMbLFlylIaPP6TDsAfzCEKXGy4YzELfAgnTWx1MGzoova3I7k1l4PBR+ISAyQ1tVlJeXwaZ03OZylSmRtK7z0cudp6jLsiSyRTpmdM/07/kJ0FGyx8G8LP3AAAAAElFTkSuQmCC\"; \n\
var imgb = \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJdSURBVDjLpZP7S1NhGMf9W7YfogSJboSEUVCY8zJ31trcps6zTI9bLGJpjp1hmkGNxVz4Q6ildtXKXzJNbJRaRmrXoeWx8tJOTWptnrNryre5YCYuI3rh+8vL+/m8PA/PkwIg5X+y5mJWrxfOUBXm91QZM6UluUmthntHqplxUml2lciF6wrmdHriI0Wx3xw2hAediLwZRWRkCPzdDswaSvGqkGCfq8VEUsEyPF1O8Qu3O7A09RbRvjuIttsRbT6HHzebsDjcB4/JgFFlNv9MnkmsEszodIIY7Oaut2OJcSF68Qx8dgv8tmqEL1gQaaARtp5A+N4NzB0lMXxon/uxbI8gIYjB9HytGYuusfiPIQcN71kjgnW6VeFOkgh3XcHLvAwMSDPohOADdYQJdF1FtLMZPmslvhZJk2ahkgRvq4HHUoWHRDqTEDDl2mDkfheiDgt8pw340/EocuClCuFvboQzb0cwIZgki4KhzlaE6w0InipbVzBfqoK/qRH94i0rgokSFeO11iBkp8EdV8cfJo0yD75aE2ZNRvSJ0lZKcBXLaUYmQrCzDT6tDN5SyRqYlWeDLZAg0H4JQ+Jt6M3atNLE10VSwQsN4Z6r0CBwqzXesHmV+BeoyAUri8EyMfi2FowXS5dhd7doo2DVII0V5BAjigP89GEVAtda8b2ehodU4rNaAW+dGfzlFkyo89GTlcrHYCLpKD+V7yeeHNzLjkp24Uu1Ed6G8/F8qjqGRzlbl2H2dzjpMg1KdwsHxOlmJ7GTeZC/nesXbeZ6c9OYnuxUc3fmBuFft/Ff8xMd0s65SXIb/gAAAABJRU5ErkJggg==\"; \n\
function setVotesValues(data) \n\
{ \n\
	updateVoteCounts(data, true); \n\
} \n\
function updateVoteValue(data) \n\
{ \n\
	updateVoteCounts(data, false); \n\
} \n\
function updateVoteCounts(data, useThird) \n\
{ \n\
	var inc = 2; \n\
	if(useThird) \n\
		inc = 3; \n\
	for(i = 0; i < data.posts.length; i += inc) \n\
	{ \n\
		var mySpan = document.getElementById(\"span\" + data.posts[i]); \n\
		mySpan.childNodes[1].innerHTML = data.posts[i + 1]; \n\
		if(useThird && data.posts[i + 2] == \"1\") \n\
		{ \n\
			mySpan.innerHTML += \"<img id=\\\"imgp\" + data.posts[i] + \"\\\" name=\\\"imgp\" + data.posts[i] + \"\\\" src=\\\"\" + imga + \"\\\" alt=\\\"\" + data.posts[i] + \"\\\" onclick=\\\"javascript:voteFor(this);\\\" style=\\\"cursor:pointer\\\"/>\"; \n\
			\n\//mySpan.innerHTML += \"<img id=\\\"imgm\" + data.posts[i] + \"\\\" name=\\\"imgm\" + data.posts[i] + \"\\\" src=\\\"\" + imgb + \"\\\" alt=\\\"\" + data.posts[i] + \"\\\" onclick=\\\"javascript:voteFor(this);\\\" style=\\\"cursor:pointer\\\"/>\"; \n\
		} \n\
	} \n\
} \n\
function voteFor(img) \n\
{ \n\
	var mySpan = document.getElementById(\"span\" + img.alt); \n\
	//mySpan.removeChild(img); \n\
	var images = getElementsById(\"imgp\" + img.alt, mySpan); \n\
	mySpan.removeChild(images[0]); \n\
	\n\//images = getElementsById(\"imgm\" + img.alt, mySpan); \n\
	\n\//mySpan.removeChild(images[0]); \n\
	loadExternalScript(\"http://nfohump.showsdb.org/posts/vote?id=\" + img.alt); \n\
} \n\
function fillText(name) \n\
{\n\
    var element = document.getElementsByName(\"message\")[0]; \n\
    var slash = \"\"; \n\
    element.value += \"@[b]\" + name + \"[/b] \"; \n\
    element.focus(); \n\
}\n\
function putLink(child) \n\
{ \n\
    var index1 = child.innerHTML.search(/<b>/i) + 3; \n\
	var index2 = child.innerHTML.search(/<\\/b>/i); \n\
    var index4; \n\
    var name = child.innerHTML.slice(index1, index2); \n\
    var fullName = name; \n\
    var long = false; \n\
    var sets = getSettings(); \n\
    var color = \"#FFFFFF\"; \n\
    if(name.indexOf(\"<spa\") === 0) \n\
    { \n\
        index4 = name.search(/<\\/span>/i); \n\
        name = name.slice(29, index4); \n\
        long = true; \n\
    } \n\
    if(sets.charAt(0) == '1' && long) \n\
    { \n\
        var index = fullName.indexOf(\"#\"); \n\
        color = fullName.slice(index, index + 6); \n\
    } \n\
    if(sets.charAt(0) == '1' && colors[name.toLowerCase()]) \n\
        color = colors[name.toLowerCase()]; \n\
    var newHTML = child.innerHTML.slice(0, index1) + \"<b><a href=\\\"javascript:fillText('\" + name + \"');\\\" style='color: \" + color + \"; font-size: 11px; font-weight: bold;'>\" + name + \"</a></b>\" + child.innerHTML.slice(index2); \n\
    child.innerHTML = newHTML; \n\
} \n\
function getSettings() \n\
{ \n\
    return readCookie(\"modMyHumpSettings\"); \n\
} \n\
function saveSettings() \n\
{ \n\
    var unneeded = \"111111\"; \n\
    var colors = (document.getElementById(\"modMyHumpColors\").checked == true ? '1' : '0'); \n\
    var titles = (document.getElementById(\"modMyHumpTitles\").checked == true ? '1' : '0'); \n\
    var fields = (document.getElementById(\"modMyHumpFields\").checked == true ? '1' : '0'); \n\
    var votes  = (document.getElementById(\"modMyHumpVotes\").checked  == true ? '1' : '0'); \n\
    var sets = colors + titles + fields + votes + unneeded; \n\
    return createCookie(\"modMyHumpSettings\", sets, 365); \n\
} \n\
function putOptions() \n\
{ \n\
    var sets = getSettings(); \n\
    var str = \"<div id=\\\"menuLeftHeader3\\\">&nbsp;</div><div class=\\\"menuLeftContainer\\\"><form><ul class=\\\"menuLeftList\\\">\" + \n\
    \"<li><input type=\\\"checkbox\\\" id=\\\"modMyHumpColors\\\"\"; \n\
    if(sets.charAt(0) == '1') str += \"checked=checked\"; \n\
    str += \" onClick = \\\"javascript:saveSettings();\\\">Colors</input></li>\" + \n\
    \"<li><input type=\\\"checkbox\\\" id=\\\"modMyHumpTitles\\\"\"; \n\
    if(sets.charAt(1) == '1') str += \"checked=checked\"; \n\
    str += \" onClick = \\\"javascript:saveSettings();\\\">Titles</input></li>\" + \n\
    \"<li><input type=\\\"checkbox\\\" id=\\\"modMyHumpFields\\\"\"; \n\
    if(sets.charAt(2) == '1') str += \"checked=checked\"; \n\
    str += \" onClick = \\\"javascript:saveSettings();\\\">Fields</input></li>\" + \n\
    \"<li><input type=\\\"checkbox\\\" id=\\\"modMyHumpVotes\\\"\"; \n\
    if(sets.charAt(3) == '1') str += \"checked=checked\"; \n\
    str += \" onClick = \\\"javascript:saveSettings();\\\">Votes</input></li>\" + \n\
    \"</ul></form></div><div class=\\\"menuLeftFooter\\\">&nbsp;</div>\" \n\
    document.getElementById(\"leftdiv\").innerHTML += str; \n\
} \n\
function replaceCustomContent() \n\
{ \n\
    putOptions(); \n\
	var posts = getElementsById(\"userprofile\", document); \n\
    var sets = getSettings(); \n\
	for (var i = 0; i < posts.length; i++) \n\
	{ \n\
		var name = getUser(posts[i].childNodes[1].innerHTML); \n\
		if (sets.charAt(1) == '1' && names[name.toLowerCase()]) \n\
		{ \n\
			var index = posts[i].childNodes[4].innerHTML.indexOf(\"<\"); \n\
			if(posts[i].childNodes[4].innerHTML.slice(0, index) != \"Banned\") \n\
				posts[i].childNodes[4].innerHTML = names[name.toLowerCase()] + posts[i].childNodes[4].innerHTML.slice(index); \n\
		} \n\
		if (sets.charAt(2) == '1' && name.toLowerCase() != \"ronhrin\" && fields[name.toLowerCase()]) \n\
		{ \n\
			var obj = JSON.parse(fields[name.toLowerCase()]); \n\
			var splits = posts[i].childNodes[4].innerHTML.split(/Posts: [0-9]*<br>/i); \n\
			var postCount = posts[i].childNodes[4].innerHTML.match(/Posts: [0-9]*<br>/i)[0]; \n\
			var finalRes = \"\"; \n\
			for (var field in obj.fields) \n\
				finalRes += field + \": <font color=\\\"\" + obj.fields[field].color + \"\\\">\" + obj.fields[field].text + \"</font><br>\"; \n\
			posts[i].childNodes[4].innerHTML = splits[0] + postCount + finalRes + splits[1]; \n\
		} \n\
	} \n\
	var postsStr = \"\"; \n\
	var first = true; \n\
	for (var i = 0; i < posts.length; i++) \n\
	{ \n\
        putLink(posts[i].childNodes[1]); \n\
        if(sets.charAt(3) == '1') \n\
        { \n\
		    var postnum = posts[i].innerHTML.match(/\"[0-9]*\"/)[0].replace(/\"/g, \"\"); \n\
		    posts[i].childNodes[4].innerHTML += \"<div id=\\\"span\" + postnum + \"\\\">Votes: <span name=\\\"votes\\\"></span> </div>\"; \n\
		    if(!first) \n\
			    postsStr += \"|\"; \n\
		    else \n\
			    first = !first; \n\
		    postsStr += postnum; \n\
        } \n\
	} \n\
	if(postsStr != \"\") \n\
		loadExternalScript(\"http://nfohump.showsdb.org/posts/list?ids=\" + postsStr); \n\
}\n\
function populateFields(data) \n\
{ \n\
	for (var i in data) \n\
		fields[i.toLowerCase()] = JSON.stringify(data[i]); \n\
}\n\
function populateNames(data) \n\
{ \n\
	for(i = 0; i < data.names.length; i+=2) \n\
		names[data.names[i].toLowerCase()] = data.names[i + 1]; \n\
} \n\
function populateColors(data) \n\
{ \n\
	for(i = 0; i < data.names.length; i+=2) \n\
    { \n\
		colors[data.names[i].toLowerCase()] = data.names[i + 1]; \n\
    } \n\
} \n\
function parseNames(data) \n\
{\n\
	populateNames(data); \n\
    sync++; \n\
    if(sync == 3) \n\
	    replaceCustomContent(); \n\
} \n\
function parseColors(data) \n\
{\n\
	populateColors(data); \n\
    sync++; \n\
    if(sync == 3) \n\
	    replaceCustomContent(); \n\
} \n\
function parseFields(data) \n\
{ \n\
	populateFields(data); \n\
    sync++; \n\
    if(sync == 3) \n\
	    replaceCustomContent(); \n\
} \n\
loadExternalScript(\"http://nfohump.showsdb.org/titles_json\"); \n\
loadExternalScript(\"http://nfohump.showsdb.org/colors_json\"); \n\
loadExternalScript(\"http://nfohump.showsdb.org/fields_json\"); \n"; //end of innerScript

loadScript(innerScript);