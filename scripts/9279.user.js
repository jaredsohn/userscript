// ==UserScript==
// @name          Basecamp Client Collapse
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
// @description	  Expand/Collapse Clients
// ==/UserScript==

//Last updated: 2007-05-22

var clients, client, postDetails, postBody,
    projects, projects, tagBoxes, tagBox;

clients = document.evaluate("//div[@class='ActiveClients']/div[@class='Client']/h1",
            document, null, 6, null);

projects = document.evaluate("//div[@class='ActiveClients']/div[@class='Client']/div[@class='Project']",
             document, null, 6, null);

if(!clients) return;

for(var i = 0; i < clients.snapshotLength; i++) {
  client = clients.snapshotItem(i);

  /* Hide these */
  project = projects.snapshotItem(i);project.style.display = "none"; 

  client.style.marginTop = "-1px";
  client.style.cursor = "pointer";
  client.style.color = "#666";
  client.style.fontWeight = "normal";
  client.style.display = "block";
  client.style.border = "1px outset #000";
  client.style.background = "#EEE url(/images/tab-bg.gif) top";
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
	  pProject.style.marginTop = "-1px";
	  pProject.style.padding = ".5em 0";
  	  pProject.style.border = "1px outset #000";
	  pProject.style.background = "#FFF";
      this.title = "Click to collapse";
    } else {
      pProject.style.display = "none";
      this.title = "Click to expand";
    }
  }, false);
}