// Copyright (C) 2009 by Lucian Ciufudean (lucian.ciufudean@gmail.com)

// This file is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published
// by the Free Software Foundation

// ==UserScript==
// @name          Google Reader links
// @namespace     lucian.ciufudean@gmail.com
// @description   Auguments the google reader page with:
//                  - a link to blogger
//                  - a modified gmail link that displays the number of unread emails. This requires that you first login to gmail. It does not use a gmail API, so it might have to be adapted for future gmail versions
// @include       https://www.google.*/reader*
// @include       http://www.google.*/reader*
// ==/UserScript==

/* ADD LINK TO BLOGGER */
links = document.getElementsByTagName("a");
for (i = 0; i < links.length; i++) {
	link = links[i];
	if (link.href.indexOf("options") != -1) {
		break;
	}
}
if (link) {
	var barNode = document.createTextNode(" | ");
	var bloggerLinkNode = document.createElement("a");
	bloggerLinkNode.href = "http://www.google.com/blogger";
	bloggerLinkNode.textContent = "Blogger";
	bloggerLinkNode.target = "_blank";
	bloggerLinkNode.class = "gb1";
	link.parentNode.insertBefore(bloggerLinkNode, link.nextSibling);
	link.parentNode.insertBefore(barNode, link.nextSibling);
}

/* GET UNREAD EMAIL# */
var unknownUnreadCount = '?';

function setUnreadCountOnLink(unreadCount) {
  gmailLink = document.getElementsByTagName("nobr")[0].getElementsByTagName("a")[0];
  gmailLink.textContent = "Mail (" + unreadCount + ")";
  gmailLink.title = unreadCount + ' unread email(s)';
  if (unreadCount > 0) {
    gmailLink.style.fontWeight = "bold";
  }
  else {
    gmailLink.style.fontWeight = "normal";
  }
  if (unreadCount == unknownUnreadCount) {
    gmailLink.title = 'Login to GMail first';
  }
}

function gmailXmlHttpRequest() {
  GM_xmlhttpRequest({
    method:"GET",
    url:"http://mail.google.com/mail/#inbox",
    onload:function(response) {
      if (response.readyState == 4 && response.status == 200) {
        gmailString = response.responseText;
        unreadCountSectionStartString = '"ld",[["^i",';
        unreadCountSectionStartIndex = gmailString.indexOf(unreadCountSectionStartString);
        if (unreadCountSectionStartIndex == -1) {
           setUnreadCountOnLink(unknownUnreadCount);
        }
        else {
          unreadCountSectionCommaAfterIndex = gmailString.indexOf(',', unreadCountSectionStartIndex + unreadCountSectionStartString.length);
          unreadCount = gmailString.substring(unreadCountSectionStartIndex + unreadCountSectionStartString.length, unreadCountSectionCommaAfterIndex);
          setUnreadCountOnLink(unreadCount);
        }
      }
    }
  });
  setTimeout(gmailXmlHttpRequest, 120000);
}

gmailXmlHttpRequest();