// ==UserScript==
// @name           TA Page Titles
// @namespace      userscripts.org/102624
// @author         Lozzy - http://www.trueachievements.com/gamer.aspx?gamerid=45660
// @description    Adds more page titles to TrueAchievements.com
// @include        http://*.trueachievements.com/*
// @run-at         document-start
// @version        0.2
// @updateURL      http://userscripts.org/scripts/source/102624.meta.js
// @installURL     http://userscripts.org/scripts/source/102624.user.js
// ==/UserScript==

var doc=document, t=doc.title;
var p=location.pathname + location.search + location.hash;
p = p.toLowerCase();

main_content();

function main_content(){
	
	//Pages to bypass
	if ((p === '/')||(p === '/forum/boardindex.aspx')) {return;}
	
	var rtnH='',suffix=' - TrueAchievements';
	var h=getHeader();
	
	//Try to find the first valid header on the page
	if (t==='TrueAchievements - Xbox 360 Achievement Tracking'){
		
		var h1 = h;
		var re = /\([0-9,]+\)/;
		
		if (!re.test(h1)&&(h1!== '')) {
			rtnH=h1;
		}
		else {
			var h2 = getHeader("id('oHeader')");
			if (!re.test(h2)&&(h2!== '')) {
				rtnH=h2;
				}
				else {
					var h3 = getHeader("id('maincontent')/h1");
					if (!re.test(h3)&&(h3!== '')) {
						rtnH=h3;
						}
					}			
			}
	}
	

	
	//Custom title for forum boards
	if (( p.indexOf('/forum/viewboard.aspx') !== -1 ) || ( p.indexOf('/forum/boardindex.aspx') !== -1 )) {
		rtnH=h;
		suffix=' - TA Forums';
	}
	//Custom title for Chat Room
	else if ( p.indexOf('chat.aspx') !== -1 ) {
		if (h.indexOf('TrueAchievement') !== -1 ) {rtnH='Chat Room';}
		else {suffix = ' - TrueAchievements';}
	}
	//Custom title for gaming sessions
	else if ( p.indexOf('/gamingsession.aspx') !== -1 ) {
		rtnH=getHeader("(id('maincontent')//h1)[2]");
		suffix='';
	}
	
	else if (p === '/newslist.aspx'){
		rtnH=getHeader();
		suffix='';
	}
	
	//Must go at end of if statement
//	else if (h.indexOf('TrueAchievement') !== -1 ) {suffix='';}
	
	if (rtnH !== '') {
		document.title=rtnH+suffix;
	}
}


function getHeader(xpath){
	//Finds the first header on the page and returns the element node
	xpath = typeof(xpath) != 'undefined' ? xpath : "id('maincontent')//h1['title'][@class != 'mainlink']";
	var element=document.evaluate(xpath,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	
	if (element !== null){
		return element.textContent;
	}
		else {
		return '';
	}

}

