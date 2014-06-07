// ==UserScript==
// @name           Enhanced Basecamp Client Collapse
// @include        http://*.clientsection.com/*
// @include        http://*.grouphub.com/*
// @include        http://*.projectpath.com/*
// @include        http://*.seework.com/*
// @include        http://*.updatelog.com/*
// @include        https://*.clientsection.com/*
// @include        https://*.grouphub.com/*
// @include        https://*.projectpath.com/*
// @include        https://*.seework.com/*
// @include        https://*.updatelog.com/*
// @include        https://*.basecamphq.com/*
// @description	  Expand/Collapse Clients, Display Total Projects
// ==/UserScript==

//based off of "Basecamp Client Collapse" by Josh Miller. http://userscripts.org/scripts/show/9279

var clients, client, postDetails, postBody,
    projects, projects, tagBoxes, tagBox, lists, list, totals, total;

lists = document.evaluate("//div[@class='ActiveClients']/div[@class='Client']/div[@class='Project']/a",
             document, null, 6, null);

clients = document.evaluate("//div[@class='ActiveClients']/div[@class='Client']/h1",
            document, null, 6, null);

projects = document.evaluate("//div[@class='ActiveClients']/div[@class='Client']/div[@class='Project']",
             document, null, 6, null);

totals = document.evaluate("//div[@class='SectionHeader']/h1",
             document, null, 6, null);

if(!clients) return;


//Count projects, add to page

var cnt = lists.snapshotLength;
var newSpan = document.createElement("span"); 
newSpan.id = "totalNum";

total = totals.snapshotItem(i);
newSpan.appendChild(total.cloneNode(true));
total.parentNode.replaceChild(newSpan, total);
document.getElementById('totalNum').firstChild.innerHTML += ': '+cnt


// Loop through, add list item and style

for(var i = 0; i < lists.snapshotLength; i++) {
var newLi = document.createElement("li"); 

	list = lists.snapshotItem(i);
	list.style.paddingTop = "4px"; 
	list.style.paddingBottom = "4px"; 
	list.style.paddingLeft = "0px"; 
	list.style.marginLeft = "-3px"; 

newLi.appendChild(list.cloneNode(true));
list.parentNode.replaceChild(newLi, list);

newLi.style.marginLeft= "8px";
newLi.style.paddingRight= "18px";
newLi.style.listStyleImage="url('http://franklinshared.com/images/block.png')"
}


for(var i = 0; i < clients.snapshotLength; i++) {
  client = clients.snapshotItem(i);

/* Hide these */
  project = projects.snapshotItem(i);project.style.display = "none"; 

    client.style.fontSize = "14px";
    client.style.marginTop = "8px";
    client.style.cursor = "pointer";
//  client.style.color = "#666";
//  client.style.fontWeight = "normal";
    client.style.display = "block";
//  client.style.border = "1px outset #000";
//  client.style.background = "#EEE url(/images/tab-bg.gif) top";
    client.title = "Click to expand";
    client.setAttribute("idx", i);
    
	client.addEventListener("click", function(event) {
	var idx = this.getAttribute("idx");
	//alert("div[@idx='"+idx+"']");
    var pProjects = document.evaluate("//div[@class='ActiveClients']/div[@class='Client']/div[@class='Project']",
             document, null, 6, null);
		pProject = pProjects.snapshotItem(idx);

    if(pProject.style.display == "none") {
      pProject.style.display = "block";
	  pProject.style.marginTop = "2px";
	  pProject.style.marginLeft = "12px";	  
//	  pProject.style.padding = "51px";
//    pProject.style.border = "1px outset #000";
//    pProject.style.background = "#d9d9d9";

	  this.title = "Click to collapse";


    } else {
      pProject.style.display = "none";
      this.title = "Click to expand";
    }

 }, false);
}