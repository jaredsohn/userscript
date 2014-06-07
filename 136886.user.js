// ==UserScript==
// @name       diary internal sharing
// @namespace  http://userscripts.org/scripts/show/136886
// @author     dpleshakov (http://userscripts.org/users/473776)
// @version    2.3
// @description  Makes sharing on diary.ru internal.
// @include    *://*diary.ru/*
// ==/UserScript==

function FindElementByClass(parentElement, elementType, elementClass) {
  childElements = parentElement.getElementsByTagName(elementType);
  for (var j = 0; j < childElements.length; j++) {
    currentLi = childElements[j];
    liClass = currentLi.getAttribute("class");
    if (liClass && liClass.indexOf(elementClass) != -1) {
      return currentLi;
    }
  }
  return null;
}

function ReplaceLink(sharingElement, sharingLink) {
  sharingElement.setAttribute("onclick", '');
  sharingElement.setAttribute("href", sharingLink);
}

function RegradeSharing(postsAreaName, singlePostName, quotePostName) {
  postsArea = document.getElementById(postsAreaName);
  if (postsArea) {
    postsAreaDivs = postsArea.getElementsByTagName('div');
    for (var i = 0; i < postsAreaDivs.length; i++) {
      currentDiv = postsAreaDivs[i];
      currentDivClass = currentDiv.getAttribute("class");
      if (currentDivClass && currentDivClass.indexOf(singlePostName) != -1) {
        parentSharingElement = FindElementByClass(postsAreaDivs[i], "li", quotePostName);
        if (parentSharingElement) {
          sharingElement = parentSharingElement.getElementsByTagName("a")[0];
          socialIconsElement = parentSharingElement.getElementsByTagName("div")[0].getElementsByTagName("a")[0];
          sharingLink = socialIconsElement.getAttribute("href");
          ReplaceLink(sharingElement, sharingLink);
        }
      }
    }
  }
}

RegradeSharing("postsArea", "singlePost", "quote_post");
RegradeSharing("commentsArea", "singleComment", "quote_comment");