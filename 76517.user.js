// ==UserScript==
// @name           Opera link delete function enchancer
// @namespace      ryotsuke
// @description    Pushing delete button do not redirects to other page. Bulk deletion enabled.
// @include        http://my.opera.com/*/account/link/bookmarks/*
// ==/UserScript==

var links = document.getElementsByTagName("a");

function openLinkInIframe() {

   attachLinkIframe(this.parentNode, this.href);
   return false;
}
function deleteSelected() {
  var links = document.getElementsByTagName("input");
  for(var i = 0; i < links.length; i++) {
	
	var link = links[i];
	if(link.className=='delete_checkbox') {
      if(link.checked) {
        attachLinkIframe(document.getElementById("linksbox2"),link.getAttribute("url"));
      }             		
	}
}
}
function invertSelected() {
  var links = document.getElementsByTagName("input");
  for(var i = 0; i < links.length; i++) {
	
	var link = links[i];
	if(link.className=='delete_checkbox') {
      if(link.checked) {
        link.checked=false;
      } else {
        link.checked=true;
      }            		
	}
}
}

function attachLinkIframe(el, hr) {
   ifrm = document.createElement("IFRAME"); 
   ifrm.setAttribute("src", hr); 
   ifrm.style.width = 640+"px"; 
   ifrm.style.height = 50+"px"; 
   el.appendChild(ifrm);
}

for(var i = 0; i < links.length; i++) {
	
	var link = links[i];
	if(link.className=='delete') {
      		link.onclick=openLinkInIframe;
      		inpt = document.createElement("INPUT");
      		inpt.setAttribute("type", "checkbox");
      		inpt.setAttribute("url", link.href);
      		inpt.setAttribute("class", "delete_checkbox");
      		inpt.style.width = 16+"px"; 
          inpt.style.height = 16+"px";
          inpt.style.float = "right";
          inpt.style.position = "absolute";
          inpt.style.marginTop = "-20px";
          inpt.style.marginLeft = "-20px";          
          inpt.style.zIndex = "7";                   
          link.parentNode.appendChild(inpt);
                          		
	}
}

var linkBox = document.getElementById("linksbox2");
ifrm = document.createElement("P"); 
ifrm.setAttribute("class", "add"); 
ifrm.innerHTML = "[<a onclick='deleteSelected()'>Delete selected</a>]&nbsp;[<a onclick='invertSelected()'>Invert selection</a>]"; 
linkBox.appendChild(ifrm);    
