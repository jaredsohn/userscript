// ==UserScript==
// @name          Basecamp To Do List Collapse
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
// @description	   Expand/Collapse To Do Lists
// ==/UserScript==

//Last updated: 10-12-2007

var clients, client, postDetails, postBody,
    projects, projects, tagBoxes, tagBox;

clients = document.evaluate("//div[@class='todo_list']/h2/a",
            document, null, 6, null);

projects = document.evaluate("//div[@class='todo_list']/table[@class='todolist']",
             document, null, 6, null);

//alert(clients.snapshotLength);

if(!clients) return;

for(var i = 0; i < clients.snapshotLength; i++) {
  client = clients.snapshotItem(i);

  /* uncomment the following line if you want to collapse everything by default */
  //project = projects.snapshotItem(i);project.style.display = "none"; 


  client.style.display = "block";

  client.title = "Click to expand";
  client.href="#";
  client.setAttribute("idx", i);
  client.addEventListener("click", function(event) {
	var idx = this.getAttribute("idx");
	//alert("div[@idx='"+idx+"']");
    var pProjects = document.evaluate("//div[@class='todo_list']/table[@class='todolist']",
             document, null, 6, null);
	pProject = pProjects.snapshotItem(idx);

    if(pProject.style.display == "none") {
      pProject.style.display = "block";

      this.title = "Click to collapse";
    } else {
      pProject.style.display = "none";
      this.title = "Click to expand";
    }
  }, false);
}