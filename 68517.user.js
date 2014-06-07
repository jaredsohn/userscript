// Ultimate SBN
// version .5
// 2010-02-10
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Ultimate SBN", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Ultimate SBN
// @namespace     none
// @description   Script to prevent and highlight display of posts of users on SBN 2.0 boards
// @include       http://www.japersrink.com/*
// ==/UserScript==
//Based on an SBN script by ab03

var allLinks, thisLink, uidtext, favidtxt, i, j, k, l;

//Sets refresh speed (in milliseconds)
refreshspeed = 5000;				


//Sets the text that appears instead of the post
replacementtext = "--Ignored--";			


//Enter screen name of person you want to block - this is case sensitive. 
//Enter "%20" for spaces eg Persons Name is entered as Persons%20Name
//Enter commas between names, e.g.: favs = ["zephyr","J.P."]; 
ignores = [""]; 
favs = ["J.P.","Fehr%20and%20Balanced"]; 


timeout();
function timeout() {


allLinks = document.evaluate(
    '//a[@href]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (i = 0; i < allLinks.snapshotLength; i++) {
    	
	thisLink = allLinks.snapshotItem(i);

	for (j = 0; j < ignores.length; j++) {
		uidtext = new String("http://www.japersrink.com/users/"+ignores[j]);
		uidtext2 = new String("http://www.sbnation.com/users/"+ignores[j]);
		if (thisLink.href == uidtext || thisLink.href ==uidtext2){
			
			var pBody1=thisLink.parentNode;   
			var pBody2=pBody1.parentNode;
			var pBody3=pBody2.parentNode;
			
			//Ignores comments without avatar
			if (pBody2.getAttribute('class') == "comment not-new clearfix" || pBody2.getAttribute('class') == "comment new clearfix" ) {
			//Blocks rec'd comments too
			//if (pBody2.getAttribute('class') == "comment not-new clearfix" || pBody2.getAttribute('class') == "comment new clearfix" || pBody2.getAttribute('class') == "comment recommended not-new clearfix") {
				
				var logo = document.createElement("div");
				logo.innerHTML = '<div class="citem"><div class="comment clearfix"><h5 class="comment_title">'+replacementtext+'</h5></div></div>';
				pBody3.parentNode.replaceChild(logo, pBody3);
				//var logo = document.createElement("div");			
			}

			//Ignores comments of users with avatar
			if (pBody2.getAttribute('class') == "comment cpic not-new clearfix" || pBody2.getAttribute('class') == "comment cpic new clearfix" ) {
				//Blocks rec'd comments too 
				//if (pBody2.getAttribute('class') == "comment cpic not-new clearfix" || pBody2.getAttribute('class') == "comment cpic new clearfix" || pBody2.getAttribute('class') == "comment cpic recommended not-new clearfix") { 
					
				var logo = document.createElement("div");
				logo.innerHTML = '<div class="citem"><div class="comment cpic clearfix"><h5 class="comment_title"><i>'+replacementtext+'</i></h5></div></div>';
				pBody3.parentNode.replaceChild(logo, pBody3);
				i=i+3;			
			}

			//Blocks diaries
		/*	if (pBody2.getAttribute('class') == "byline") {
				var pBody3=pBody2.parentNode;

				var logo = document.createElement("div");
				logo.innerHTML = '<div class="entry clearfix "><h5>'+replacementtext+'</h5></div>';
				pBody3.parentNode.replaceChild(logo, pBody3);			
			}
		*/	
			
		}
	}
	
	for (l = 0; l < favs.length; l++) {
		favidtxt = new String("http://www.japersrink.com/users/"+favs[l]);
		favidtxt2 = new String("http://www.sbnation.com/users/"+favs[l]);
		if (thisLink.href == favidtxt || thisLink.href ==favidtxt2){

			var pBody1=thisLink.parentNode;   
			var pBody2=pBody1.parentNode;
			
			//Marks comment as favorite without avatar 
			if (pBody2.getAttribute('class') == "comment not-new clearfix" || pBody2.getAttribute('class') == "comment new clearfix" ) {
			pBody2.style.backgroundColor = '#ccff99';
			pBody2.setAttribute('class', 'comment cpic clearfix')		
			}
			
			//Marks comment that is rec'd as favorite 
		/*	if (pBody2.getAttribute('class') == "comment cpic recommended not-new clearfix") {
			pBody2.style.backgroundColor = '#ccffcc';
			pBody2.setAttribute('class', 'comment cpic clearfix')		
			}
		*/
			
			//Marks comment with avatar as favorite
	  		if (pBody2.getAttribute('class') == "comment cpic not-new clearfix" || pBody2.getAttribute('class') == "comment cpic new clearfix" ) {
			pBody2.style.backgroundColor = '#ccff99';
			pBody2.setAttribute('class', 'comment cpic clearfix')
		//	pBody2.setAttribute('class' , 'cpic recommended not-new clearfix')
		//	thisLink.setAttribute('href', 'http://www.japersrink.com')
			k=k+3;			
			}
			
		}
	}
}
}
setInterval(timeout,refreshspeed);