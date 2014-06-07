// ==UserScript==
// @name           cinetopia - enhance userstyle 'blog-/cover-view with titles' with date
// @namespace      http://userscripts.org/scripts/show/89334
// @description    Enhances the userstyle 'blog-/cover-view with titles' by adding the upload-date 
// @author         iþ
// @include        http://cinetopia.ws/?layout=blog
// @include        http://cinetopia.ws/*?layout=blog
// ==/UserScript==

var main_content = document.getElementById("main_content");
for (iMC = 0; iMC < main_content.childNodes.length; iMC++){
    if(main_content.childNodes[iMC].nodeName == "DIV" 
	  && main_content.childNodes[iMC].id == ""
	  && main_content.childNodes[iMC].className == ""
	  && main_content.childNodes[iMC].getAttribute("style") != null){
	    var blogList = main_content.childNodes[iMC];
		for (iBL = 0; iBL < blogList.childNodes.length; iBL++){
			if(blogList.childNodes[iBL].nodeName == "DIV" && blogList.childNodes[iBL].className == "container"){
				var containerDiv = blogList.childNodes[iBL];
				for (iA = 0; iA < containerDiv.childNodes.length; iA++){
					if(containerDiv.childNodes[iA].nodeName == "A"){
						var link = containerDiv.childNodes[iA];
						var hrefSplit = containerDiv.childNodes[iA].getAttribute("href").split("/");
						var newSpan = document.createElement("span");
						var newSpanText = document.createTextNode(hrefSplit[3] + "-" + hrefSplit[4] + "-" + hrefSplit[5]);
						var classNode = document.createAttribute("class");
						classNode.nodeValue = "boxDate";
						newSpan.setAttributeNode(classNode);
						newSpan.appendChild(newSpanText);
						link.appendChild(newSpan);
						
						if(link.childNodes[0].height == 0) { 
						    var newSpanText = document.createTextNode("[no pic]");
							var newSpan = document.createElement("span");
							var classNode = document.createAttribute("class");
						    classNode.nodeValue = "noPic";
							newSpan.setAttributeNode(classNode);
						    newSpan.appendChild(newSpanText);
							link.replaceChild(newSpan, link.childNodes[0]);
						}
						
					}
				}
			}
		}
	}
 }