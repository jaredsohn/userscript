// ==UserScript==
// @name         G3PO Productivity PlugIn 
// @namespace     http://www.CollectItStoreIt.com/GCloud_About.html
// @description   Adds Toodle Do, Zoho projects, and Zoho notebook to Gmail 3.0 
// @include       http*toodledo.com*
// @include       http*flowchart.com*
// @include       http*zoho.com*
// @include       http*mail.google.com*
// ==/UserScript==

/*
 * Version 1.2 March 12, 2009
 * Written by Benjamin Paige III
 * This script is Public Domain. You are welcome to use it in any way you like.
 */

//############################## Toodle-Do ##############################//  BEGIN 
if(G3PO) {
	var productName = "ToodleDo";
	var host = "www.toodledo.com";
	var createLink = "http://www.toodledo.com/folders.php";
	var icon = "http://www.toodledo.com/favicon.ico";
	var logo = "http://www.kolabora.com/news/images/toodledo_logo.gif";
	var urlRegEx = /toodledo/;
	
	G3PO.addSite(productName,host,createLink,icon,logo,urlRegEx);
	
	if(document.location.host == "www.toodledo.com")
		toodleDo_injectSiteClouds();
}

function toodleDo_injectSiteClouds() {
		
	var divs = document.getElementsByTagName("DIV");
	for(var i in divs)
		if(/^tab(on)?$/.test(divs[i].className))
			addToodleDoCloud(divs[i]);
			
	var overflowcount = 0;
	setInterval(function(){
		var taboverflow = document.getElementById("taboverflow");
		if(taboverflow.childNodes.length > 0 && taboverflow.childNodes.length != overflowcount) {
		
			addToodleDoCloud(taboverflow);
			
			overflowcount = taboverflow.childNodes.length;
		}
	},1000);
}

function addToodleDoCloud(targetNode) {
 
	var anchors = targetNode.getElementsByTagName("A");
	
	for (var i in anchors) {
		var btnGCloud = G3PO.getCloudIcon();
		targetNode.insertBefore(btnGCloud,anchors[i].nextSibling);
		btnGCloud.addEventListener("click", function(){G3PO.launchComposeGmail("","",this.previousSibling.innerHTML,this.previousSibling.href,"todo task tasks dos do",true)},false);
	}
}
//############################## Toodle-Do ##############################//  END 

//############################## Flowchart ##############################//  BEGIN 
if(G3PO) {

	var productName = "Flowchart";
	var host = "www.flowchart.com";
	var createLink = "http://www.flowchart.com/editor/";
	var icon = "http://www.xmenus.com/LabelLinks/icons/flowchart.gif";
	var logo = "http://www.tradevibes.com/ugenimage/logo/company_13699/50176.png";
	var urlRegEx = /flowchart\.com/i;
	
	G3PO.addSite(productName,host,createLink,icon,logo,urlRegEx);
	
	if(document.location.host == host)
		flowchart_injectSiteClouds();
}

function flowchart_injectSiteClouds() {

	var elements = document.getElementsByTagName("div");
	
	var done = false;
	setInterval(function(){
	if(!done)
		for(var i in elements) {
			
			if(elements[i].className == 'ObjectsPanel Panel') {
				done = true;
				var btnGCloud = G3PO.getCloudIcon();
				elements[i].appendChild(btnGCloud);
				btnGCloud.addEventListener("click", function(){G3PO.launchComposeGmail("","",flowchart_getName(),document.URL,"flowchart visio",true)},false);
				break;
			}
		}
	},1000);
}

function flowchart_getName() {

	var elements = document.getElementsByTagName("div");
	
	for(var i in elements)
		if(elements[i].className == "TabPart TabPart-center")
			return elements[i].innerHTML;
}

//############################## Flowchart ##############################//  END 


//############################## Notebook ##############################//  BEGIN 
if(G3PO) {

	var productName = "Notebook";
	var host = "notebook.zoho.com";
	var createLink = "https://notebook.zoho.com/nb/index.do";
	var icon = "http://www.zoho.com/images/notebook.gif";
	var logo = "http://notebook.zoho.com/nb/images/notelogo.gif";
	var urlRegEx = /notebook\.zoho/;
	
	G3PO.addSite(productName,host,createLink,icon,logo,urlRegEx);
	
	if(document.location.host == host)
		zoho_notebook_injectSiteClouds();
}

function zoho_notebook_injectSiteClouds() {
	
	var state = "";
	setInterval(function(){
		var bookContainer = document.getElementById('mybooklist');
		if(bookContainer && state != bookContainer.innerHTML) {
			state = bookContainer.innerHTML;
			var bookIcons  = bookContainer.getElementsByTagName('img');
			
			for(var i in bookIcons) {
						
				var btnGCloud = G3PO.getCloudIcon();
				btnGCloud.style.marginRight = "2px";
				bookIcons[i].parentNode.replaceChild(btnGCloud,bookIcons[i]);
				btnGCloud.addEventListener("click", function(){G3PO.launchComposeGmail("","",this.nextSibling.textContent,zoho_notebook_getIdLinkFromIcon(this),"draw scribble notebook",true)},false);
			}
		}
	},1000);
		
}

function zoho_notebook_getIdLinkFromIcon(icon) {

	var id = icon.parentNode.id;
	return "https://notebook.zoho.com/nb/index.do#bookId=" + id.match(/\d+/)[0];
}
//############################## Notebook ##############################//  END 

//############################## Project ##############################//  BEGIN 
if(G3PO) {

	var productName = "Project";
	var host = "projects.zoho.com";
	var createLink = "https://projects.zoho.com/login.do";
	var icon = "https://projects.zoho.com/images20/favicon.ico";
	var logo = "http://www.arflex.com.tw/tw/product/zoho/zoho-projects-logo.gif";
	var urlRegEx = /projects\.zoho/;
	
	G3PO.addSite(productName,host,createLink,icon,logo,urlRegEx);
	
	if(/projects.zoho.com/.test(document.location.host))
		zoho_projects_injectSiteClouds();
}

function zoho_projects_injectSiteClouds() {

	var projectContainer = document.getElementById('lnavcont');
	
	if(projectContainer) {
	
		var rows  = projectContainer.getElementsByTagName('tr');
		for(var i in rows) {
		
			var btnGCloud = G3PO.getCloudIcon();
			rows[i].lastChild.appendChild(btnGCloud);
			btnGCloud.addEventListener("click", function(){G3PO.launchComposeGmail("","",this.parentNode.previousSibling.childNodes[1].innerHTML,"https://projects.zoho.com?gCloud=" + this.previousSibling.id,"draw scribble notebook",true)},false);	
		}
	}
	
}
//############################## Project ##############################//  END 
