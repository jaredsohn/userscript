// ==UserScript==
// @name           Single page doujins (TheDoujin)
// @namespace      fuck that
// @description    Adds pagination and inline image expansion
// @version        2.1
// @author         lukini
// @include        http://*thedoujin.com/index.php?page=post&s=list&tags=parent:*
// ==/UserScript==

var enableToggle = true;
var singleExpand = true;

GM_addStyle("\
.all, .next5 {text-align: center; cursor: pointer; font-weight: bold; margin-bottom: 15px;}\
.next5 {font-size: 30px;}\
span[expanded='false']:hover span {display: block; cursor: pointer;}\
span[expanded='true'] img {border: 1px solid black; margin: 10px;}\
span[expanded='true'] {width: auto; height: auto;}\
.content span span {display: none;}\
.content span span:hover, .all:hover, .next5:hover {text-decoration: underline;}\
.content a:focus {outline: none;}\
.content p img {border: 1px solid black;}");

var all = document.createElement("div");
all.className = "all";
all.innerHTML = "View entire doujin";
all.addEventListener("click", allPages, true);

var linksDiv = document.createElement("div");
linksDiv.className = "all";
linksDiv.innerHTML = "Generate direct links";
linksDiv.addEventListener("click", allLinks, true);

var content = $(".content");
content.insertBefore(all, content.firstChild);
content.insertBefore(linksDiv, content.firstChild);

var links = $("a", content);
for (i in links) {
	var link = document.createElement("span");
	link.id = i;
	link.innerHTML = "Start here";
	link.addEventListener("click", firstPages, true);
	links[i].parentNode.appendChild(link);
	if (enableToggle) {
		links[i].parentNode.setAttribute("expanded", false);
		links[i].addEventListener("click", toggle, true);
	}
}

function $(selectors, root) {
	if (root) return root.querySelectorAll(selectors);
	return document.querySelector(selectors);
}

function parseImages(event) {
	var i = parseInt(event.target.id || "0");
	for (pages = []; i < links.length; i++)
		pages.push(links[i].firstChild.src.replace("thumbs", "/images").replace("thumbnail_", ""));
	count = pages.length;
	index = 0;
	content.innerHTML = "";
}

function allPages(event) {
	parseImages(event);
	addPages();
}

function addPages() {
	if (index < count) {
		content.innerHTML += "<p><a name='"+index+"' href='#"+(index+1)+"'><img src='"+pages[index++]+"'></a></p>";
		setTimeout(addPages, 50);
	}
}

function allLinks(event) {
	parseImages(event);
	addLinks();
}

function addLinks() {
	if (index < count) {
		content.innerHTML += "<a href='"+pages[index++]+"'>"+index+"</a>" + (index%10==0 ? "<br>" : "");
		setTimeout(addLinks, 10);
	}
}

function firstPages(event) {
	parseImages(event);
	for (; index < count && index < 5; index++)
		content.innerHTML += "<p><a name='"+index+"' href='#"+(index+1)+"'><img src='"+pages[index]+"'></a></p>";
	if (index < count) {
		next5 = document.createElement("p");
		next5.className = "next5";
		next5.innerHTML = "Next pages";
		next5.addEventListener("click", nextPages, true);
		content.appendChild(next5);
	}
}

function nextPages(event) {
	if (event.ctrlKey) {
		content.removeChild(next5);
		addPages();
		return;
	}
	for (var end = index+5; index < count && index < end; index++) {
		var p = document.createElement("p");
		p.innerHTML = "<a name='"+index+"' href='#"+(index+1)+"'><img src='"+pages[index]+"'></a>";
		content.insertBefore(p, next5);
	}
	if (index >= count)
		content.removeChild(next5);
}

function collapse(image, span) {
	image.src = image.src.replace("/images", "thumbs").replace(/\/(\d+)\//, "/$1/thumbnail_");
	span.setAttribute("expanded", false);
}

function toggle(event) {
	if (event.ctrlKey) return;
	var image = event.target;
	var span = image.parentNode.parentNode;
	if (span.getAttribute("expanded") == "false") {
		if (singleExpand) {
			var expanded = $(".thumb[expanded='true']");
			if (expanded) collapse(expanded.firstChild.firstChild, expanded);
		}
		image.src = image.src.replace("thumbs", "/images").replace("thumbnail_", "");
		span.setAttribute("expanded", true);
	} else {
		collapse(image, span);
	}
	event.preventDefault();
}