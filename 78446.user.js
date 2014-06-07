// ==UserScript==
// @name           OKC Left Menu
// @namespace      http://userscripts.org/users/48349
// @description    Restores the  left side menu on okcupid.com
// @include        http://*.okcupid.com/*
// ==/UserScript==


var inboxCount = document.evaluate("//a[@href='/messages']/span[@class='count']/span[@class='value']",	
			document, null,XPathResult.STRING_TYPE, null).stringValue;
			

var menuHeader = e('h4',null,[t('Your Profile')]);

var inboxCountText;
if(inboxCount == null || inboxCount == 0 ){
    inboxCountText = t('(0)')
} else{
    var countSpan = e('span',{style:'color:yellow'},[t(inboxCount)]);	
    inboxCountText = e('span',null,[t('('),countSpan,t(')')]);
}


var inboxLink = e('a',{href:'http://www.okcupid.com/messages'},[t('Inbox'),inboxCountText]);
var sentLink = e('a',{href:'http://www.okcupid.com/messages?folder=2'},[t('Sent')]);
var visitorsLink = e('a',{href:'http://www.okcupid.com/visitors'},[t('Visitors')]);
var journalLink = e('a',{href:'http://www.okcupid.com/journal'},[t('Journal')]);
var commentsLink = e('a',{href:'http://www.okcupid.com/relevant?mycomm=1'},[t('Comments')]);
var favsCommentsLink = e('a',{href:'http://www.okcupid.com/relevant?comments=1'},[t('Favorites')]);

var menuList = e('ul',{style:'margin-left:25px;'},[createLi(inboxLink),createLi(sentLink),createLi(visitorsLink),
                  createLi(journalLink),createLi(favsCommentsLink), createLi(commentsLink)]);

var menuSection = e('div',{class:'section menu'},[menuHeader,menuList]);
 var favoritesMenu = document.evaluate("//div[contains(@class,'section favorites')]",	
		document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

if(favoritesMenu != null){
	favoritesMenu.parentNode.insertBefore(menuSection,favoritesMenu);
}


function createLi(element){
  return e('li',null,[element]);	

}

function e(name, attribs, children) {

	//make an element with some attributes and children.

	var r = document.createElement(name);

	for (var i in attribs) {

		r.setAttribute(i, attribs[i]);

	}

	for (var i = 0; i < children.length; i++) {

		r.appendChild(children[i]);

	} 

	return r;

}

function t(text) {

	//make a text node.

	return document.createTextNode(text);

}
